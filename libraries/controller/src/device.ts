import {
	CommandClasses,
	CommandPacketConstructor,
	Packet,
} from "@ezwave/codec";
import {
	BatteryV1,
	NoOperationV1,
	NotificationV8,
	SceneActivationV1,
	SensorMultilevelV11,
	SwitchMultilevelV4,
	ThermostatModeV3,
	ThermostatSetpointV3,
	WakeUpV2,
} from "@ezwave/commands";
import {
	Profile1Enum,
	ProfileGeneralEnum,
} from "@ezwave/commands/lib/generated/AssociationGrpInfoV3";
import { Endpoint, ep, LayerEvent, layerEventToString } from "@ezwave/layers";
import {
	DestinationType,
	NodeInfoResponse,
	ZwAssignReturnRoute,
	ZwGetNodeInfoProtocolData,
	ZwNodeInfoProtocolData,
	ZwRequestNodeInfo,
} from "@ezwave/serialapi";
import {
	defer,
	Deferred,
	delay,
	enumToString,
	isDefined,
	neverRejects,
	nextTick,
	noop,
	toHex,
} from "@ezwave/shared";
import assert from "assert";
import debug from "debug";
import EventEmitter from "events";
import { inspect } from "util";
import { getScaleName, namedSessionRunner } from ".";
import {
	AddAssociationTask,
	AssociationGroupInfo,
	buildAddAssociation,
	buildInterviewAssociations,
	buildRemoveAssociation,
	Profile,
	RemoveAssociationTask,
} from "./cc/association";
import { formatBatteryReport } from "./cc/battery";
import {
	buildGetConfigurationParameter,
	buildInterviewConfiguration,
	buildInterviewConfigurationParameter,
	buildSetConfigurationParameter,
	ConfigurationInfo,
	ParameterInfo,
} from "./cc/configuration";
import { SensorMultilevelValue } from "./cc/sensorMultilevel";
import {
	formatSwitchMultilevelReport,
	parseSwitchMultilevelReport,
} from "./cc/switchMultilevel";
import {
	SetpointType,
	TemperatureScale,
	ThermostatMode,
	ThermostatModeEnum,
	ThermostatSetPoint,
} from "./cc/thermostat";
import {
	buildInterviewVersions,
	InterviewedVersions,
	VersionInfo,
} from "./cc/versions";
import { Controller } from "./controller";
import { durationToSeconds, durationToText } from "./conversion";
import { ScaleIndex } from "./scales";
import { SensorType } from "./sensorTypes";
import { ControllerSessionRunner } from "./session";
import { ControllerTask, Task } from "./task";
import { JsonValue } from "./types";
import { enumName } from "./util";

export enum FlirsMode {
	NonFlirs,
	Flirs250ms,
	Flirs1000ms,
}

interface EventDispatcher<T extends Packet> {
	PacketConstructor: CommandPacketConstructor<T>;
	eventHandler: (this: Device, event: LayerEvent<T>) => Promise<void>;
}

export interface SceneActivation {
	sceneId: number;

	/**
	 * Dimming duration in seconds, or "default" for value specified
	 * using Scene Actuator Configuration Set or Scene Controller
	 * Configuration Set.
	 */
	duration: number | "default";
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

	private _running: boolean = false;
	private _stopped: boolean = false;
	private _ready: Deferred<void> = defer();
	private _log: debug.Debugger;
	private _logData: debug.Debugger;

	private _preventNoMoreInformation: boolean = true;
	private _skipPing: boolean = false;
	private _triggerDeferred: Deferred<void> = defer();

	private _needsInit: boolean = true;
	private _needsSetup: boolean = false;
	private _needsInterview: boolean = true;
	private _protocolData?: ZwNodeInfoProtocolData;
	private _nodeInformationFrame?: NodeInfoResponse;
	private _versions?: InterviewedVersions;
	private _associations?: Map<number, AssociationGroupInfo>;
	private _configuration?: ConfigurationInfo;
	// TODO Probably change this to generic 'serializable tasks'
	private _parameterChanges: ParameterChanges = new Map();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private _tasks: QueuedTask<any>[] = [];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private _dispatchers: Set<EventDispatcher<any>> = new Set([
		{
			PacketConstructor: WakeUpV2.WakeUpNotification,
			eventHandler: this._handleWakeUpNotification,
		},
		{
			PacketConstructor: SensorMultilevelV11.SensorMultilevelReport,
			eventHandler: this._handleSensorMultiLevelReport,
		},
		{
			PacketConstructor: SwitchMultilevelV4.SwitchMultilevelReport,
			eventHandler: this._handleSwitchMultiLevelReport,
		},
		{
			PacketConstructor: ThermostatModeV3.ThermostatModeReport,
			eventHandler: this._handleThermostatModeReport,
		},
		{
			PacketConstructor: ThermostatSetpointV3.ThermostatSetpointReport,
			eventHandler: this._handleThermostatSetPointReport,
		},
		{
			PacketConstructor: SceneActivationV1.SceneActivationSet,
			eventHandler: this._handleSceneActivationSet,
		},
		{
			PacketConstructor: BatteryV1.BatteryReport,
			eventHandler: this._handleBatteryReport,
		},
		{
			PacketConstructor: NotificationV8.NotificationReport,
			eventHandler: this._handleNotificationReport,
		},
	]);

	public constructor(
		controller: Controller,
		nodeId: number,
		cached?: JsonValue
	) {
		super();
		this._controller = controller;
		this.nodeId = nodeId;
		// TODO Change homeID to its name
		this._log = debug(
			`zwave:device:${toHex(controller.homeId, 8)}:${nodeId}`
		);
		this._logData = debug(
			`zwave:device:${toHex(controller.homeId, 8)}:${nodeId}:data`
		);

		if (cached) {
			try {
				this._loadFromCache(cached);
			} catch (err) {
				this._log("cache load failed, ignored:", err);
				this._needsInterview = true;
			}
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
		this._emitCache();
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
	public isAlwaysListening(): boolean {
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

	public isNonListening(): boolean {
		return (
			!this.isAlwaysListening() && this.isFlirs() === FlirsMode.NonFlirs
		);
	}

	public supports(commandClass: CommandClasses): undefined | number {
		if (!this._versions) {
			throw new Error("node interview not completed yet");
		}
		return this._versions.supportedVersions.get(commandClass);
	}

	public start(): void {
		if (this._stopped) {
			// Note: cannot be re-used anymore, too tricky right now
			// to be 100% sure the loop is running exactly once.
			throw new Error("Device was stopped, but cannot be restarted");
		}
		if (this._running) {
			throw new Error("Device already started");
		}
		this._running = true;
		this._controller.on("attach", this._attachHandler);
		this._controller.on("detach", this._detachHandler);
		this._controller.on("event", this._eventHandler);

		neverRejects(this._loop());

		if (this._controller.isAttached()) {
			this._attach();
		}
	}

	public stop(): void {
		if (this._stopped) {
			// Note: cannot be re-used anymore, too tricky right now
			// to be 100% sure the loop is running exactly once.
			throw new Error("Device already stopped");
		}
		this._running = false;
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
	 *
	 * This needs to be performed (and awaited) before start()'ing the
	 * device.
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
		this._trigger();
		await this._ready.promise;
	}

	public async setConfiguration(
		parameterNumber: number,
		value: number
	): Promise<void> {
		let paramChange = this._parameterChanges.get(parameterNumber);
		if (paramChange) {
			if (paramChange.newValue === value) {
				return paramChange.deferred.promise;
			}
			paramChange.deferred.reject(new Error("cancelled by newer value"));
		}
		paramChange = {
			newValue: value,
			deferred: defer(),
		};
		this._parameterChanges.set(parameterNumber, paramChange);
		this._emitCache();
		this._trigger();
		return paramChange.deferred.promise;
	}

	/**
	 * Add association from an association group on this root device to another endpoint.
	 */
	public async addAssociations(
		groupId: number,
		destinations: Endpoint[]
	): Promise<void> {
		const request = { groupId, destinations };
		if (request.destinations.some((dest) => (dest.channel ?? 0) !== 0)) {
			throw new Error("MultiChannel associations not supported yet");
		}
		// TODO:
		// - Verify groupId. Must be >0.
		// - Verify nodes have same security level
		// - Use AGI to check which commands will be sent, and ensure destination supports these (unless
		//   destination is a gateway)
		// - Verify available space in source node?
		return this.executeTask(
			new AddAssociationTask(
				this.nodeId,
				groupId,
				destinations.map((dest) => dest.nodeId),
				(updatedDestinations) => {
					// Update our cached copy of the association
					const group = this._associations?.get(groupId);
					if (group) {
						group.nodeIds = updatedDestinations;
						this._emitCache();
					}
				}
			)
		);
	}

	/**
	 * Remove association from an association group on this root device to another endpoint.
	 */
	public async removeAssociations(
		groupId: number,
		destinations?: Endpoint[]
	): Promise<void> {
		const request = { groupId, destinations };
		if (request.destinations?.some((dest) => (dest.channel ?? 0) !== 0)) {
			throw new Error("MultiChannel associations not supported yet");
		}
		return this.executeTask(
			new RemoveAssociationTask(
				groupId,
				destinations?.map((dest) => dest.nodeId),
				(updatedDestinations) => {
					// Update our cached copy of the association
					const group = this._associations?.get(groupId);
					if (group) {
						group.nodeIds = updatedDestinations;
						this._emitCache();
					}
				}
			)
		);
	}

	/**
	 * Execute a task.
	 *
	 * If the node is awake or can be woken (FLiRS), the task will be
	 * executed immediately.
	 * If the node is asleep, the task will be queued instead until
	 * the node wakes up.
	 */
	public async executeTask<T>(task: Task<T>): Promise<T> {
		let queuedTask = this._tasks.find(
			(qt) => task instanceof qt.task.constructor && qt.task.merge?.(task)
		);
		if (!queuedTask) {
			queuedTask = {
				task,
				deferred: defer(),
			};
			this._tasks.push(queuedTask);
			this._log(`enqueue task ${task.inspect()}`);
			this._trigger();
		} else {
			this._log(`merge task ${task.inspect()}`);
		}
		try {
			const result = await queuedTask.deferred.promise;
			this._log(`task done`, result ?? "ok");
			return result;
		} catch (err) {
			this._log(`task failed`, err);
			throw err;
		}
	}

	private _attach(): void {
		this._trigger();
	}

	private _detach(): void {
		this._trigger();
	}

	private _handleEvent(event: LayerEvent<Packet>): void {
		if (event.endpoint.nodeId !== this.nodeId) {
			return;
		}

		this._logData(`event`, layerEventToString(event));
		const dispatchAll = async (): Promise<void> => {
			for (const dispatcher of this._dispatchers) {
				const packetConstructor = dispatcher.PacketConstructor;
				try {
					const decoded = event.packet.tryAs(packetConstructor);
					if (decoded) {
						await dispatcher.eventHandler.bind(this)({
							...event,
							packet: decoded,
						});
					}
				} catch (err) {
					this._log(
						`dispatchEvent failed for ${packetConstructor.name}:`,
						err
					);
				}
			}
		};

		neverRejects(dispatchAll());
	}

	private async _handleSensorMultiLevelReport(
		event: LayerEvent<SensorMultilevelV11.SensorMultilevelReport>
	): Promise<void> {
		const data = event.packet.data;
		// Decode value as signed integer
		let value = parseSignedValue(data.sensorValue);
		// Apply precision (i.e. decimal places)
		value /= Math.pow(10, data.precision);
		const sensorValue: SensorMultilevelValue = {
			sensorType: data.sensorType as number as SensorType,
			scaleIndex: data.scale as number as ScaleIndex,
			value,
		};
		const scaleName =
			getScaleName(sensorValue.sensorType, sensorValue.scaleIndex) ??
			`0x${toHex(sensorValue.scaleIndex)}`;
		this._log(
			`handleSensorMultilevelReport sensorType=${enumToString(
				sensorValue.sensorType,
				SensorType
			)} precision=${data.precision} scale=${scaleName} value=${value}`
		);
		this.emit("sensorMultilevel", sensorValue);
	}

	private async _handleSwitchMultiLevelReport(
		event: LayerEvent<SwitchMultilevelV4.SwitchMultilevelReport>
	): Promise<void> {
		let version = this.supports(CommandClasses.SwitchMultilevel) ?? 1;
		if (version > 4) {
			version = 4;
		}
		const packet = parseSwitchMultilevelReport(
			event.packet,
			version as 1 | 2 | 3 | 4
		);
		const switchValue = formatSwitchMultilevelReport(packet.data);
		this._log(
			[
				`handleSwitchMultilevelReport`,
				`currentValue=${switchValue.currentValue}`,
				switchValue.targetValue !== undefined
					? `targetValue=${switchValue.targetValue}`
					: undefined,
				switchValue.duration !== undefined
					? `duration=${switchValue.duration}`
					: undefined,
			]
				.filter(isDefined)
				.join(" ")
		);
		this.emit("switchMultilevel", switchValue);
	}

	private async _handleThermostatModeReport(
		event: LayerEvent<ThermostatModeV3.ThermostatModeReport>
	): Promise<void> {
		const mode: ThermostatMode = {
			mode: event.packet.data.mode as number as ThermostatModeEnum,
		};
		this._log(
			`handleThermostatModeReport mode=${enumName(
				mode.mode,
				ThermostatModeEnum
			)}`
		);
		this.emit("thermostatMode", mode);
	}

	private async _handleThermostatSetPointReport(
		event: LayerEvent<ThermostatSetpointV3.ThermostatSetpointReport>
	): Promise<void> {
		const data = event.packet.data;
		let value = parseSignedValue(data.value);
		// Apply precision (i.e. decimal places)
		value /= Math.pow(10, data.precision);
		const setpoint: ThermostatSetPoint = {
			setpointType: data.setpointType as number as SetpointType,
			scale: data.scale,
			value,
		};
		this._log(
			`handleThermostatSetPointReport setPointType=${enumName(
				setpoint.setpointType,
				SetpointType
			)} scale=${enumName(data.scale, TemperatureScale)} value=${value}`
		);
		this.emit("thermostatSetpoint", setpoint);
	}

	private async _handleSceneActivationSet(
		event: LayerEvent<SceneActivationV1.SceneActivationSet>
	): Promise<void> {
		const data = event.packet.data;
		const duration = durationToSeconds(data.dimmingDuration);
		this._log(
			`handleSceneActivationSet sceneId=${
				data.sceneId
			} dimmingDuration=${durationToText(data.dimmingDuration)}`
		);
		const sceneActivation: SceneActivation = {
			sceneId: data.sceneId,
			duration: duration,
		};
		this.emit("sceneActivation", sceneActivation);
	}

	private async _handleBatteryReport(
		event: LayerEvent<BatteryV1.BatteryReport>
	): Promise<void> {
		const data = event.packet.data;
		const batteryReport = formatBatteryReport(data);
		const batteryLevelText =
			batteryReport.batteryLevel === "low"
				? "low"
				: `${data.batteryLevel}%`;
		this._log(`handleBatteryReport batteryLevel=${batteryLevelText}`);
		this.emit("battery", batteryReport);
	}

	private async _handleNotificationReport(
		event: LayerEvent<NotificationV8.NotificationReport>
	): Promise<void> {
		const data = event.packet.data;
		this._log(`handleNotificationReport`, data);
		// TODO
		const notificationReport = data;
		this.emit("notification", notificationReport);
	}

	private async _handleWakeUpNotification(
		event: LayerEvent<WakeUpV2.WakeUpNotification>
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

		if (isBroadcastWakeup) {
			this._preventNoMoreInformation = true;
		}
		this._trigger(true);
	}

	private _trigger(skipPing: boolean = false): void {
		if (skipPing) {
			this._skipPing = true;
		}
		this._triggerDeferred.resolve();
		this._triggerDeferred = defer();
	}

	private async _loop(): Promise<void> {
		while (this._running) {
			await this._triggerDeferred.promise;

			try {
				await this._doLoop();
			} catch (err) {
				this._log("loop failed", err);
			}

			// When we went through the loop, we skipped the ping,
			// and we also would have sent the NoMoreInformation message.
			// No need to remember it anymore.
			this._skipPing = false;
			this._preventNoMoreInformation = false;

			// Force a call to _init() once during startup, to mark previously
			// (cached) initialized device as ready by default, then let normal
			// triggers take over.
			this._needsInit = false;
		}
	}

	private async _doLoop(): Promise<void> {
		// Check if we need any init. This will first ping if needed.
		if (this._needsInit || this._needsInterview || this._needsSetup) {
			// Init also performs setup afterwards if needed.
			try {
				await this._init();
				if (this._needsInterview || this._needsSetup) {
					// Node sleeping, try again later.
					return;
				}
			} catch (err) {
				// Mark init as no longer needed at this stage?
				// Otherwise, it might keep trying to interview on every node
				// wakeup / flush, which may be very expensive and annoying in case of repetitive failure
				this._log("warning: init failed, giving up");
				this._needsInterview = false;
				this._needsSetup = false;
				return;
			}
		}

		await this._flush();

		if (
			this.isNonListening() &&
			this.supports(CommandClasses.WakeUp) &&
			!this._preventNoMoreInformation
		) {
			// CC:0084.01.07.11.002 - A receiving node MUST NOT return a Wake Up No More Information Command in response to
			// this command issued via broadcast.
			await this._execute(
				namedSessionRunner(
					"WakeUpNoMoreInformation",
					undefined,
					(session) =>
						// TODO Configure send options to not wait for ACK / don't resend?
						// And/or tune the timeout to the typical node's response time
						session.send(new WakeUpV2.WakeUpNoMoreInformation())
				)
			);
		}
	}

	private async _flush(): Promise<void> {
		if (this._tasks.length === 0 && this._parameterChanges.size === 0) {
			return;
		}

		// If node is a sleeping node, ping it first, otherwise
		// we'll just use direct calls or beaming
		if (this.isNonListening() && !this._skipPing) {
			const awake = await this._tryPing();
			if (!awake) {
				// Wait until we're triggered again, and don't send WakeUpNoMoreInformation
				// because that will also fail.
				this._preventNoMoreInformation = true;
				return;
			}
		}

		let didWork: boolean;
		do {
			didWork = await this._doFlush();

			// Delay sending NoMoreInfo by one macro tick, as it's typical to write code like
			// await dev.executeTask(something); await dev.executeTask(somethingElse);
			// In this case, the second task is injected shortly after the first, but only when
			// the queue is first emptied.
			if (didWork) {
				await nextTick();
			}
		} while (didWork);
	}

	private async _doFlush(): Promise<boolean> {
		let didWork: boolean = false;

		const paramChangesBefore = this._parameterChanges.size;
		if (paramChangesBefore > 0) {
			await this._flushParameters();
			if (this._parameterChanges.size < paramChangesBefore) {
				didWork = true;
			}
		}

		const tasksBefore = this._tasks.length;
		if (tasksBefore > 0) {
			await this._flushTasks();
			if (this._tasks.length < tasksBefore) {
				didWork = true;
			}
		}

		return didWork;
	}

	private async _init(): Promise<void> {
		let fail: unknown;
		for (let attempt = 1; attempt <= 3; attempt++) {
			try {
				if (this._needsInterview || this._needsSetup) {
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
				if (!(this._needsInterview || this._needsSetup)) {
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
			// Don't use `this._execute()` to greatly reduce logging noise in
			// case of failures
			this._logData("ping start");
			await this._controller.execute(ep(this.nodeId), (session) =>
				session.send(new NoOperationV1.NoOperationV1(Buffer.alloc(0)))
			);
			this._logData("ping ok");
			return true;
		} catch (err) {
			this._logData("ping failed");
			return false;
		}
	}

	private async _doInit(attempt: number): Promise<void> {
		try {
			this._log(
				`init begin attempt=${attempt} needsInterview=${this._needsInterview} needsSetup=${this._needsSetup}`
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

			if (this._needsInterview) {
				this._needsInterview = false;
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
		await this._interviewConfiguration();

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

	private async _interviewConfiguration(): Promise<void> {
		if (this._configuration) {
			return;
		}
		const supportedVersion = this.supports(CommandClasses.Configuration);
		if (!supportedVersion) {
			this._log("interviewConfiguration skipped, not supported");
			return;
		}
		this._configuration = await this._execute(
			buildInterviewConfiguration({ supportedVersion: supportedVersion })
		);
		this._log(
			"configuration parameters",
			inspect(this._configuration.parameters, { depth: 10 })
		);
	}

	private _getSucId(): number {
		// TODO Determine actual SUC id (via controller, via SerialAPI)
		return this._controller.nodeId;
	}

	private async _flushParameters(): Promise<void> {
		while (this._parameterChanges.size > 0) {
			// 'Pop' first pending change off of queue, to prevent race condition
			// when new change comes in while we're processing this one
			const first = this._parameterChanges.entries().next();
			assert(!first.done);
			const [parameterNumber, change] = first.value;
			this._parameterChanges.delete(parameterNumber);

			// TODO Use bulk updates if possible
			try {
				let paramInfo: ParameterInfo | undefined =
					this._configuration?.parameters.get(parameterNumber);
				if (!paramInfo) {
					// Determine parameter info on-demand (mostly for V1/V2 nodes which don't
					// support capability interview). We still need to determine their parameter
					// size and encoding correctly.
					const paramResult = await this._execute(
						buildInterviewConfigurationParameter({
							parameterNumber,
							supportedVersion: this.supports(
								CommandClasses.Configuration
							),
						})
					);
					paramInfo = paramResult.info;
					if (!paramInfo) {
						throw new Error(
							`cannot set configuration parameter ${parameterNumber}: cannot determine size/format`
						);
					}
					this._configuration?.parameters.set(
						parameterNumber,
						paramInfo
					);
				}
				// Read back new value, just to make sure (and in case it was
				// e.g. clipped to valid values by remote device)
				await this._execute(
					buildSetConfigurationParameter({
						parameterNumber,
						info: paramInfo,
						newValue: change.newValue,
					})
				);
				const changedParam = await this._execute(
					buildGetConfigurationParameter({
						parameterNumber,
						info: paramInfo,
					})
				);
				paramInfo.value = changedParam;
				change.deferred.resolve();
			} catch (err) {
				this._log(
					`cannot set parameter ${parameterNumber} to value ${change.newValue}:`,
					err
				);
				change.deferred.reject(err as Error);
			} finally {
				this._emitCache();
			}
		}
	}

	private async _flushTasks(): Promise<void> {
		while (this._tasks.length > 0) {
			const task = this._tasks.pop()!;
			const description = task.task.inspect();
			try {
				this._logData(`execute start ${description}`);
				const result = await this._controller.execute(
					ep(this.nodeId),
					(session) => task.task.execute(session)
				);
				this._logData(`execute end`, result ?? "ok");
				task.deferred.resolve(result);
			} catch (err) {
				// Log the error, which is also returned to the original caller,
				// so swallow it here
				this._log(`execute failed ${description}:`, err);
				task.deferred.reject(err as Error);
			}
		}
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
			this._logData(`execute end`, result ?? "ok");
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
		if (cached.version !== 1 && cached.version !== 2) {
			return;
		}
		this._needsSetup = cached.needsSetup;
		this._needsInterview = cached.needsInit;
		this._protocolData = cached.protocolData;
		this._nodeInformationFrame = cached.nodeInformationFrame;
		this._versions = fromCachedVersions(cached.versions);
		this._associations = fromCachedAssociations(cached.associations);
		if (cached.version === 2) {
			this._configuration = fromCachedConfiguration(cached.configuration);
			this._parameterChanges = fromCachedParamChanges(
				cached.parameterChanges
			);
		}

		if (cached.version < 2) {
			this._needsInterview = true;
			this._emitCache();
		}
	}

	private _emitCache(): void {
		const cache: CachedInfoV2 = {
			version: 2,
			needsSetup: this._needsSetup,
			needsInit: this._needsInterview,
			protocolData: this._protocolData,
			nodeInformationFrame: this._nodeInformationFrame,
			versions: toCachedVersions(this._versions),
			associations: toCachedAssociations(this._associations),
			configuration: toCachedConfiguration(this._configuration),
			parameterChanges: toCachedParamChanges(this._parameterChanges),
		};
		this.emit("cache", cache);
	}
}

type ParameterChanges = Map<number, ParameterChange>;

interface ParameterChange {
	newValue: number;
	deferred: Deferred<void>;
}

interface QueuedTask<T> {
	task: ControllerTask<T>;
	deferred: Deferred<T>;
}

type CachedInfo = CachedInfoV1 | CachedInfoV2;

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

interface CachedInfoV2 {
	version: 2;
	needsSetup: boolean;
	// TODO Rename this to needsInterview on next version
	needsInit: boolean;
	protocolData?: ZwNodeInfoProtocolData;
	nodeInformationFrame?: NodeInfoResponse;
	versions?: CachedVersions;
	associations?: CachedAssociations;
	configuration?: CachedConfigurationInfo;
	parameterChanges: CachedParameterChanges;
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

interface CachedConfigurationInfo {
	parameters: Record<number, ParameterInfo>;
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
	return toCachedNumericMap(assocs, toCachedAssociation);
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
	return fromCachedNumericMap(cached, (v, k) => fromCachedAssociation(k, v));
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
): Map<K, V>;
function fromCachedNumericMap<K extends number, VIn, VOut>(
	cached: Partial<Record<K, VIn>>,
	mapper: (cached: VIn, key: K) => VOut
): Map<K, VOut>;
function fromCachedNumericMap<K extends number, VIn, VOut>(
	cached: Partial<Record<K, VIn>>,
	mapper?: (cached: VIn, key: K) => VOut
): Map<K, VOut> {
	const theMapper =
		mapper ?? ((value: VIn): VOut => value as unknown as VOut);
	return new Map(
		Array.from(Object.entries(cached as { [k: string]: VIn })).map(
			([k, v]) => {
				const key = (typeof k === "string" ? parseInt(k, 10) : k) as K;
				return [key, theMapper(v, key)];
			}
		)
	);
}

function toCachedNumericMap<K extends number, V>(
	object: Map<K, V>
): Record<K, V>;
function toCachedNumericMap<K extends number, VIn, VOut>(
	object: Map<K, VIn>,
	mapper: (value: VIn, key: K) => VOut
): Record<K, VOut>;
function toCachedNumericMap<K extends number, VIn, VOut>(
	object: Map<K, VIn>,
	mapper?: (value: VIn, key: K) => VOut
): Record<string, VOut> {
	const theMapper =
		mapper ?? ((value: VIn): VOut => value as unknown as VOut);
	return Object.fromEntries(
		Array.from(object.entries()).map(([key, value]) => [
			key,
			theMapper(value, key),
		])
	);
}

function toCachedConfiguration(
	config: ConfigurationInfo | undefined
): CachedConfigurationInfo | undefined {
	if (!config) {
		return undefined;
	}
	return {
		parameters: Object.fromEntries(
			Array.from(config.parameters.entries()).map(
				([paramNumber, param]) => [paramNumber, param]
			)
		),
	};
}

function fromCachedConfiguration(
	cached: CachedConfigurationInfo | undefined
): ConfigurationInfo | undefined {
	if (!cached) {
		return undefined;
	}
	return {
		parameters: fromCachedNumericMap(cached.parameters),
	};
}

interface CachedParameterChange {
	newValue: number;
}

type CachedParameterChanges = Record<number, CachedParameterChange>;

function toCachedParamChanges(
	changes: ParameterChanges
): CachedParameterChanges {
	return toCachedNumericMap(changes, (change) => ({
		newValue: change.newValue,
	}));
}

function fromCachedParamChanges(
	cached: CachedParameterChanges
): ParameterChanges {
	// Note: this only works correctly for initial loading (which is the
	// only case supported), otherwise any existing promise should be
	// preserved.
	return fromCachedNumericMap(cached, (cachedChange) => {
		const change: ParameterChange = {
			deferred: defer(),
			newValue: cachedChange.newValue,
		};
		// Prevent crash if (after startup) no-one listens to this
		// task anymore
		change.deferred.promise.catch(noop);
		return change;
	});
}

function parseSignedValue(buffer: Buffer): number {
	switch (buffer.length) {
		case 1:
			return buffer.readInt8();
			break;
		case 2:
			return buffer.readInt16BE();
			break;
		case 4:
			return buffer.readInt32BE();
			break;
		default:
			throw new Error(`unsupported value size ${buffer.length}`);
	}
}
