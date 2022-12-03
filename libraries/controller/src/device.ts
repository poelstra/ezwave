import { CommandClasses, Packet } from "@ezwave/codec";
import { NoOperationV1, WakeUpV2 } from "@ezwave/commands";
import {
	Profile1Enum,
	ProfileGeneralEnum,
} from "@ezwave/commands/lib/generated/AssociationGrpInfoV3";
import { WakeUpNotification } from "@ezwave/commands/lib/generated/WakeUpV2";
import { LayerEvent, layerEventToString } from "@ezwave/layers";
import {
	DestinationType,
	NodeInfoResponse,
	ZwAssignReturnRoute,
	ZwGetNodeInfoProtocolData,
	ZwNodeInfoProtocolData,
	ZwRequestNodeInfo,
} from "@ezwave/serialapi";
import { defer, Deferred, delay, noop } from "@ezwave/shared";
import assert from "assert";
import debug from "debug";
import EventEmitter from "events";
import { inspect } from "util";
import {
	buildInterviewVersions,
	ep,
	InterviewedVersions,
	VersionInfo,
} from ".";
import { Controller } from "./controller";
import {
	AssociationGroupInfo,
	buildAddAssociation,
	buildInterviewAssociations,
	buildRemoveAssociation,
	Profile,
} from "./interview/association";
import { ControllerSessionRunner } from "./session";
import { JsonValue } from "./types";

export enum FlirsMode {
	NonFlirs,
	Flirs250ms,
	Flirs1000ms,
}

export class Device extends EventEmitter {
	public readonly nodeId: number;
	private readonly _controller: Controller;

	private readonly _attachHandler: typeof this._attach =
		this._attach.bind(this);
	private readonly _detachHandler: typeof this._detach =
		this._detach.bind(this);
	private readonly _eventHandler: typeof this._handleEvent =
		this._handleEvent.bind(this);

	private _ready: Deferred<void> = defer();
	private _log: debug.Debugger;
	private _logData: debug.Debugger;

	private _needsSetup: boolean = false;
	private _needsInit: boolean = true;
	private _protocolData?: ZwNodeInfoProtocolData;
	private _nodeInformationFrame?: NodeInfoResponse;
	private _versions?: InterviewedVersions;
	private _associations?: Map<number, AssociationGroupInfo>;

	public constructor(
		controller: Controller,
		nodeId: number,
		cached?: JsonValue
	) {
		super();
		this._controller = controller;
		this.nodeId = nodeId;
		this._log = debug(`zwave:device:${nodeId}`);
		this._logData = debug(`zwave:device:${nodeId}:data`);

		if (cached) {
			this._loadFromCache(cached);
		}
	}

	/**
	 * Load basic protocol info from SerialAPI to be able to
	 * answer the most basic queries if needed.
	 */
	public async initProtocolData(): Promise<void> {
		if (this._protocolData) {
			return;
		}
		this._log("initProtocolInfo");
		this._protocolData = await this._controller.executeSerialCommand(
			new ZwGetNodeInfoProtocolData({
				nodeId: this.nodeId,
			})
		);
	}

	/**
	 * Resolves when device is ready for use,
	 * i.e. interviewing has been completed.
	 *
	 * If interviewing fails, this promise is rejected, but
	 * whatever progress was made might be enough for the device
	 * to be useable (e.g. to explicitly trigger another
	 * initialization, perform further configuration, etc.).
	 */
	public ready(): Promise<void> {
		return this._ready.promise;
	}

	/**
	 * True when node is always listening (AL).
	 * False for Frequently Listening (FL / FLiRS) and Non-Listening (NL) nodes.
	 */
	public isListening(): boolean {
		if (!this._protocolData) {
			throw new Error("protocolData not initialized");
		}
		return this._protocolData.listening;
	}

	/**
	 * FLiRS node with 1000ms wake-up beam.
	 */
	public isFlirs(): FlirsMode {
		if (!this._protocolData) {
			throw new Error("protocolData not initialized");
		}
		if (this._protocolData.sensor250ms) {
			return FlirsMode.Flirs250ms;
		}
		if (this._protocolData.sensor1000ms) {
			return FlirsMode.Flirs1000ms;
		}
		return FlirsMode.NonFlirs;
	}

	public supports(commandClass: CommandClasses): undefined | number {
		if (!this._versions) {
			throw new Error("node interview not completed yet");
		}
		return this._versions.supportedVersions.get(commandClass);
	}

	public start(): void {
		this._controller.on("attach", this._attachHandler);
		this._controller.on("detach", this._detachHandler);
		this._controller.on("event", this._eventHandler);

		if (this._controller.isAttached()) {
			this._attach();
		}
	}

	public stop(): void {
		if (this._controller.isAttached()) {
			this._detach();
		}
		this._controller.off("attach", this._attachHandler);
		this._controller.off("detach", this._detachHandler);
		this._controller.off("event", this._eventHandler);
	}

	/**
	 * After SerialAPI performed inclusion and assigned a node ID,
	 * perform remaining inclusion steps (security bootstrap,
	 * interviewing, etc.)
	 */
	public async completeInclusion(): Promise<void> {
		// TODO Add request params to determine security level
		await this._initNodeInformationFrame();

		this._needsSetup = true;
		this._emitCache();
		await this._bootstrapSecurity();
		await this._assignReturnRoute();
		await this._init();
	}

	/**
	 * Force (re-)setup of device, such as lifeline assignment,
	 * association return routes, etc.
	 */
	public async setup(): Promise<void> {
		// Remember that someone told us to setup, even if it's
		// prematurely interrupted.
		this._needsSetup = true;
		this._emitCache();
		await this._init();
	}

	private _attach(): void {
		this._init().catch((err) => {
			this._log("initialization failed", err);
			// Ignore error, no need to redo the interview right now,
			// just keep going until user explicitly requests something
		});
	}

	private _detach(): void {}

	private _handleEvent(event: LayerEvent<Packet>): void {
		if (event.endpoint.nodeId !== this.nodeId) {
			return;
		}
		this._logData("event", layerEventToString(event));
		if (event.packet.is(WakeUpNotification)) {
			this._handleWakeUpNotification(event).catch((err) => {
				this._log("handleWakeUpNotification failed:", err);
			});
		}
	}

	private async _handleWakeUpNotification(
		event: LayerEvent<Packet>
	): Promise<void> {
		const isBroadcastWakeup =
			event.destinationType === DestinationType.Broadcast;
		if (isBroadcastWakeup) {
			// CC:0084.01.07.12.002 - Upon receiving this command via broadcast, a receiving node
			// SHOULD configure a relevant Wake Up destination issuing a Wake Up Interval Set Command to the
			// node that issued this command via broadcast.
			if (this._controller.nodeId === this._getSucId()) {
				await this._setupWakeUpCommandClass();
			}
		}

		if (this._needsInit || this._needsSetup) {
			// Init also performs setup afterwards if needed.
			await this._init();
			// TODO Mark init as no longer needed at this stage?
			// Otherwise, it might keep trying to interview on every node
			// wakeup, which may be very (battery-)expensive...
		}

		// TODO Empty queue if needed

		if (!isBroadcastWakeup) {
			// CC:0084.01.07.11.002 - A receiving node MUST NOT return a Wake Up No More Information Command in response to
			// this command issued via broadcast.
			await this._execute((session) =>
				// TODO Configure send options to not wait for ACK / don't resend?
				// And/or tune the timeout to the typical node's response time
				session.send(new WakeUpV2.WakeUpNoMoreInformation())
			);
		}
	}

	private async _init(): Promise<void> {
		let fail: unknown;
		for (let attempt = 1; attempt <= 3; attempt++) {
			try {
				if (this._needsInit || this._needsSetup) {
					const awake = await this._tryPing();
					if (!awake) {
						// TODO Add other forms of awake detection (e.g. receiving anything from it, in case of non-WakeUp nodes)
						this._log(
							"init: device unreachable, delaying init until awake"
						);
						return;
					}
					await this._doInit(attempt);
				}
				// If we didn't need init, or it was just completed, we're now ready
				if (!(this._needsInit || this._needsSetup)) {
					this._log("ready");
					this._ready.resolve();
					// Allow re-initialization and waiting for it
					this._ready = defer();
				}
				return;
			} catch (err) {
				fail = err;
				if (attempt > 1) {
					const backOffSeconds = 10;
					this._log(
						`init sleeping for ${backOffSeconds}s before retry...`
					);
					await delay(backOffSeconds * 1000);
				}
			}
		}
		this._ready.promise.catch(noop); // Prevent unhandled rejection
		this._ready.reject(fail as Error);
		// Allow re-initialization and waiting for it
		this._ready = defer();
		throw fail;
	}

	private async _tryPing(): Promise<boolean> {
		try {
			await this._execute(async (session) => {
				await session.send(
					new NoOperationV1.NoOperationV1(Buffer.alloc(0))
				);
			});
			return true;
		} catch (err) {
			return false;
		}
	}

	private async _doInit(attempt: number): Promise<void> {
		try {
			this._log(
				`init begin attempt=${attempt} needsInit=${this._needsInit} needsSetup=${this._needsSetup}`
			);
			await this.initProtocolData();

			if (this.nodeId !== this._controller.nodeId) {
				await this._interview();

				if (this._needsSetup) {
					await this._setupLifeline();
					await this._assignAssociationRoutes();
					await this._setupWakeUpCommandClass(); // 6.3.9.1
					this._needsSetup = false;
					this._emitCache();
				}
			} else {
				this._needsSetup = false;
				this._emitCache();
			}

			if (this._needsInit) {
				this._needsInit = false;
				this._emitCache();
			}
			this._log("init complete");
		} catch (err) {
			this._log("init failed", err);
			throw err;
		}
	}

	private async _interview(): Promise<void> {
		await this._initNodeInformationFrame();

		await this._interviewVersions();
		await this._interviewEndpoints();
		await this._interviewAssociations(); // 6.3.1.1 (single channel) & 6.3.7.1 (multi channel), then 6.3.2.1 (assoc group info)

		await this._batteryLevelGet(); // 6.3.3.1
	}

	private async _initNodeInformationFrame(): Promise<void> {
		if (this._nodeInformationFrame) {
			return;
		}
		// TODO It seems possible to 'manually' emit ZWaveV1.RequestNodeInfo and
		// thus obtain the supported/controlled command classes etc.
		// This would enable interview logic to be used outside of a controller session.
		this._log("initNodeInformationFrame");
		this._nodeInformationFrame =
			await this._controller.executeSerialCommand(
				new ZwRequestNodeInfo({ nodeId: this.nodeId })
			);
		this._log(
			"nif supported names",
			this._nodeInformationFrame.commandClasses.supported.map(
				(cc) => CommandClasses[cc]
			)
		);
		this._log(
			"nif controlled names",
			this._nodeInformationFrame.commandClasses.controlled.map(
				(cc) => CommandClasses[cc]
			)
		);
		this._emitCache();
	}

	private async _bootstrapSecurity(): Promise<void> {
		//this._log("bootstrapSecurity");
		// TODO Implement
		//this._emitCache();
	}

	private async _assignReturnRoute(): Promise<void> {
		const sucId = this._getSucId();
		this._log(`assignReturnRoute sucId=${sucId}`);
		await this._controller.executeSerialCommand(
			// TODO According to NWK spec (Z-Wave and Z-Wave Long Range Network Layer Specification.pdf),
			// we should explicitly send ZwAssignSucReturnRoute, but blog post by DrZwave says it's just
			// a shorthand...
			new ZwAssignReturnRoute({
				sourceId: this.nodeId,
				destinationId: sucId,
			})
		);
	}

	private async _interviewEndpoints(): Promise<void> {}

	private async _interviewAssociations(): Promise<void> {
		if (this._associations) {
			return;
		}
		if (!this.supports(CommandClasses.Association)) {
			this._log("interviewAssociations skipped: not supported by node");
			this._associations = new Map();
			return;
		}
		this._log("interviewAssociations start");
		this._associations = await this._execute(
			buildInterviewAssociations({
				interviewAssociationGroupInfo: !!this.supports(
					CommandClasses.AssociationGrpInfo
				),
				refreshCache: false,
			})
		);
		this._emitCache();

		// 	let numberOfMultiChannelGroupings = 0;
		// 	if (this.supports(CommandClasses.MultiChannelAssociation)) {
		// 		numberOfMultiChannelGroupings = await this._execute(async (runner) => {
		// 			await runner.send(new MultiChannelAssociationV2.MultiChannelAssociationGroupingsGet());
		// 		const result = await runner.waitFor(MultiChannelAssociationV2.MultiChannelAssociationGroupingsReport);
		// 		return result.supportedGroupings;
		// 	});
		// }
		this._log("interviewAssociations complete", this._associations);
	}

	// public async addAssociation(groupId: number, source: EndPoint, destination: EndPoint): Promise<void> {
	// 	// Verify groupId. Must be >0, and consecutively assigned (i.e. first ID1 is used, then ID2, etc).
	// 	// Verify nodes have same security level
	// 	// Use AGI to check which commands will be sent, and ensure destination supports these (unless
	// 	// destination is a gateway)
	// 	// Assign routes
	// }

	private async _setupLifeline(): Promise<void> {
		assert(this._associations);
		const lifelineGroups = new Set(
			[...this._associations.values()].filter(
				(group) =>
					group.profile?.category === Profile1Enum.ProfileGeneral &&
					group.profile?.profile ===
						ProfileGeneralEnum.ProfileGeneralLifeline &&
					group.maxNodesSupported > 0
			)
		);
		const lifelineGroupIds = [...lifelineGroups].map(
			(group) => group.groupingIdentifier
		);
		if (lifelineGroupIds.length === 0) {
			this._log(`setupLifeline skipped, no lifeline association groups`);
			return;
		}
		const sucId = this._getSucId();
		this._log(
			`setupLifeline sucId=${sucId} groupIds=${inspect(lifelineGroupIds)}`
		);
		for (const group of lifelineGroups) {
			if (group.nodeIds.includes(sucId)) {
				// Already ok
				this._logData(
					`setupLifeline skip groupId=${group.groupingIdentifier}, already ok`
				);
				continue;
			}
			if (group.nodeIds.length >= group.maxNodesSupported) {
				// Make room first by clearing all associations. Lifelines should have maxNodesSupported === 1 anyway.
				this._logData(
					`setupLifeline clear groupId=${group.groupingIdentifier}`
				);
				await this._execute(
					buildRemoveAssociation({
						groupingIdentifier: group.groupingIdentifier,
					})
				);
			}
			// Note: setup of the SucReturnRoute is already done earlier, and will
			// (redundantly) be re-done when setting up associationRoutes
			this._logData(
				`setupLifeline assign groupId=${group.groupingIdentifier}`
			);
			await this._execute(
				buildAddAssociation({
					groupingIdentifier: group.groupingIdentifier,
					nodeIds: [sucId],
				})
			);
		}
	}

	private async _assignAssociationRoutes(): Promise<void> {
		assert(this._associations);
		const nodeIds = new Set(
			[...this._associations.values()].flatMap((group) => group.nodeIds)
		);
		if (nodeIds.size === 0) {
			this._log(
				`assignAssociationRoutes skipped, empty or no associations`
			);
			return;
		}
		this._log(
			`assignAssociationRoutes nodeIds=${inspect(nodeIds.values())}`
		);
		for (const nodeId of nodeIds) {
			this._logData(
				`assignAssociationRoutes sourceId=${nodeId} destinationId=${nodeId}`
			);
			await this._controller.executeSerialCommand(
				new ZwAssignReturnRoute({
					sourceId: this.nodeId,
					destinationId: nodeId,
				})
			);
		}
	}

	private async _setupWakeUpCommandClass(): Promise<void> {
		function roundInterval(
			value: number,
			min: number,
			max: number,
			step: number
		): number {
			if (step === 0) {
				// Only min and max are supported, return closest value
				if (max - value < value - min) {
					return max;
				} else {
					return min;
				}
			}
			step = Math.min(step, max - min); // sanitize step
			value -= min;
			value /= step;
			value = Math.floor(value);
			value *= step;
			value += min;
			value = Math.min(value, max);
			return value;
		}
		function limit(min: number, value: number, max: number): number {
			return Math.max(min, Math.min(value, max));
		}

		const wakeUpVersion = this.supports(CommandClasses.WakeUp);
		if (!wakeUpVersion) {
			this._log("setupWakeUpCommandClass skipped, not supported");
			return;
		}
		const sucId = this._getSucId();
		await this._execute(async (session) => {
			await session.send(new WakeUpV2.WakeUpIntervalGet());
			const existing = await session.waitFor(
				WakeUpV2.WakeUpIntervalReport
			);
			this._log("setupWakeUpCommandClass before:", existing);

			let requestedWakeUpInterval = 86400; // one day // TODO make configurable
			if (wakeUpVersion >= 2) {
				await session.send(
					new WakeUpV2.WakeUpIntervalCapabilitiesGet()
				);
				const capabilities = await session.waitFor(
					WakeUpV2.WakeUpIntervalCapabilitiesReport
				);
				this._log(
					`setupWakeUpCommandClass capabilities:`,
					capabilities
				);
				// Min = 0 means device supports wakeup on user interaction
				// Step = 0 means only min and max values are supported. It must be zero if min and max are equal.
				if (capabilities.maximumWakeUpIntervalSeconds === 0) {
					// Max = 0 means only wakeup on user interaction (button press) is supported, min and default should be 0
					requestedWakeUpInterval = 0;
				} else {
					// Let's override a default of 0 to configure at least some periodic reporting to detect dead nodes,
					// but try to use the default wakeup within limits.
					if (capabilities.defaultWakeUpIntervalSeconds > 0) {
						requestedWakeUpInterval = limit(
							3600,
							capabilities.defaultWakeUpIntervalSeconds,
							requestedWakeUpInterval
						);
					}
					requestedWakeUpInterval = roundInterval(
						requestedWakeUpInterval,
						capabilities.minimumWakeUpIntervalSeconds,
						capabilities.maximumWakeUpIntervalSeconds,
						capabilities.wakeUpIntervalStepSeconds
					);
				}
			}
			this._log(
				`setupWakeUpCommandClass setting interval=${requestedWakeUpInterval} seconds (${(
					requestedWakeUpInterval / 3600
				).toFixed(2)} hours)`
			);
			await session.send(
				new WakeUpV2.WakeUpIntervalSet({
					seconds: requestedWakeUpInterval,
					nodeId: sucId,
				})
			);
		});
	}

	private async _batteryLevelGet(): Promise<void> {
		// CL:0080.01.52.01.1 Unless unsolicited Battery Report Commands are received, a controlling node SHOULD Probe the
		// current battery level at least every month
		// CL:0080.01.51.02.1 A controlling node MUST indicate to the end user that the battery needs to be replaced or reloaded
		// when the supporting node issues a Battery Report with the Battery Level field set to 0xFF.
		//this._emitCache();
	}

	private async _interviewVersions(): Promise<void> {
		if (this._versions) {
			return;
		}
		assert(this._nodeInformationFrame);
		this._versions = await this._execute(
			buildInterviewVersions(this._nodeInformationFrame)
		);
		this._emitCache();
	}

	private _getSucId(): number {
		// TODO Determine actual SUC id (via controller, via SerialAPI)
		return this._controller.nodeId;
	}

	private async _execute<T>(runner: ControllerSessionRunner<T>): Promise<T> {
		let description = runner.inspect?.() ?? runner.name;
		if (description === "") {
			description = "<AnonymousRunner>";
		}
		try {
			this._logData(`execute start ${description}`);
			const result = await this._controller.execute(
				ep(this.nodeId),
				runner
			);
			this._logData(`execute end`, result);
			return result;
		} catch (err) {
			this._log(`execute failed ${description}:`, err);
			throw err;
		}
	}

	private _loadFromCache(value: JsonValue): void {
		if (typeof value === "undefined") {
			return;
		}
		if (typeof value !== "object" || !value || Array.isArray(value)) {
			throw new Error(
				"invalid object cache, expected an object or undefined"
			);
		}
		if (!("version" in value)) {
			throw new Error("invalid object cache, expected version field");
		}
		const cached = value as unknown as CachedInfo;
		if (cached.version !== 1) {
			return;
		}
		this._needsSetup = cached.needsSetup;
		this._needsInit = cached.needsInit;
		this._protocolData = cached.protocolData;
		this._nodeInformationFrame = cached.nodeInformationFrame;
		this._versions = fromCachedVersions(cached.versions);
		this._associations = fromCachedAssociations(cached.associations);
	}

	private _emitCache(): void {
		const cachedVersions: CachedVersions | undefined = toCachedVersions(
			this._versions
		);
		const cachedAssociations: CachedAssociations | undefined =
			toCachedAssociations(this._associations);
		const cache: CachedInfoV1 = {
			version: 1,
			needsSetup: this._needsSetup,
			needsInit: this._needsInit,
			protocolData: this._protocolData,
			nodeInformationFrame: this._nodeInformationFrame,
			versions: cachedVersions,
			associations: cachedAssociations,
		};
		this.emit("cache", cache);
	}
}

type CachedInfo = CachedInfoV1;

// TODO It's probably better to explicitly copy the referenced types, such
// that their serialization remains correct.
interface CachedInfoV1 {
	version: 1;
	needsSetup: boolean;
	needsInit: boolean;
	protocolData?: ZwNodeInfoProtocolData;
	nodeInformationFrame?: NodeInfoResponse;
	versions?: CachedVersions;
	associations?: CachedAssociations;
}

interface CachedVersions {
	versionInfo: VersionInfo | undefined;

	supportedNonSecure: Array<CommandClasses>;
	controlledNonSecure: Array<CommandClasses>;
	supportedSecureS0: Array<CommandClasses>;
	controlledSecureS0: Array<CommandClasses>;
	supportedVersions: Partial<Record<CommandClasses, number>>;
	controlledVersions: Partial<Record<CommandClasses, number>>;
	isSecureS0: boolean;
}

type CachedAssociations = Record<number, CachedAssociation>;

interface CachedAssociation {
	maxNodesSupported: number;
	nodeIds: number[];
	name?: string;
	profile?: Profile;
	controlledCommands?: Partial<Record<CommandClasses, number[]>>;
}

function toCachedVersions(
	versions: InterviewedVersions | undefined
): CachedVersions | undefined {
	if (!versions) {
		return undefined;
	}
	return {
		versionInfo: versions.versionInfo,
		supportedNonSecure: Array.from(versions.supportedNonSecure),
		controlledNonSecure: Array.from(versions.controlledNonSecure),
		supportedSecureS0: Array.from(versions.supportedSecureS0),
		controlledSecureS0: Array.from(versions.controlledSecureS0),
		supportedVersions: Object.fromEntries(versions.supportedVersions),
		controlledVersions: Object.fromEntries(versions.controlledVersions),
		isSecureS0: versions.isSecureS0,
	};
}

function toCachedAssociations(
	assocs: Map<number, AssociationGroupInfo> | undefined
): CachedAssociations | undefined {
	if (!assocs) {
		return undefined;
	}
	return Object.fromEntries(
		Array.from(assocs.entries()).map(([groupId, assoc]) => [
			groupId,
			toCachedAssociation(assoc),
		])
	);
}

function toCachedAssociation(assoc: AssociationGroupInfo): CachedAssociation {
	return {
		maxNodesSupported: assoc.maxNodesSupported,
		nodeIds: assoc.nodeIds,
		name: assoc.name,
		profile: assoc.profile,
		controlledCommands: assoc.controlledCommands
			? Object.fromEntries(assoc.controlledCommands)
			: undefined,
	};
}

function fromCachedVersions(
	cached: CachedVersions | undefined
): InterviewedVersions | undefined {
	if (!cached) {
		return undefined;
	}
	return {
		versionInfo: cached.versionInfo,
		supportedNonSecure: new Set(cached.supportedNonSecure),
		controlledNonSecure: new Set(cached.controlledNonSecure),
		supportedSecureS0: new Set(cached.supportedSecureS0),
		controlledSecureS0: new Set(cached.controlledSecureS0),
		supportedVersions: fromCachedNumericMap(cached.supportedVersions),
		controlledVersions: fromCachedNumericMap(cached.controlledVersions),
		isSecureS0: cached.isSecureS0,
	};
}

function fromCachedAssociations(
	cached: CachedAssociations | undefined
): Map<number, AssociationGroupInfo> | undefined {
	if (!cached) {
		return undefined;
	}
	return new Map(
		Array.from(Object.entries(cached)).map(([k, v]) => [
			parseInt(k, 10),
			fromCachedAssociation(parseInt(k, 10), v),
		])
	);
}

function fromCachedAssociation(
	id: number,
	cached: CachedAssociation
): AssociationGroupInfo {
	return {
		groupingIdentifier: id,
		maxNodesSupported: cached.maxNodesSupported,
		nodeIds: cached.nodeIds,
		name: cached.name,
		profile: cached.profile,
		controlledCommands: cached.controlledCommands
			? fromCachedNumericMap(cached.controlledCommands)
			: undefined,
	};
}

function fromCachedNumericMap<K extends number, V>(
	cached: Partial<Record<K, V>>
): Map<K, V> {
	return new Map(
		Array.from(Object.entries(cached as { [k: string]: V })).map(
			([k, v]) => [parseInt(k, 10) as K, v]
		)
	);
}
