import { noop, toHex } from "@ezwave/shared";
import debug from "debug";
import { EventEmitter } from "events";
import { ZwGetVersion, ZwVersionInfo } from "./commands/basis/zwGetVersion";
import { CommandSession } from "./commands/commandSession";
import { ICommandSessionRunner } from "./commands/ICommandSession";
import { ZwMemoryGetId } from "./commands/memory/zwMemoryGetId";
import { ProtocolManager } from "./commands/protocolManager";
import {
	SerialAPICapabilities,
	SerialApiGetCapabilities,
} from "./commands/serialApi/serialApiGetCapabilities";
import {
	NodeCapabilityFlags,
	SerialApiGetInitData,
	SerialAPIInitData,
} from "./commands/serialApi/serialApiGetInitData";
import { SerialApiCommandCode } from "./commands/serialApiCommandCode";
import { HomeAndNodeId, ZwLibraryType } from "./commands/types";
import { IProtocol } from "./protocol";

/* eslint-disable no-bitwise */

const log: debug.Debugger = debug("zwave:serialapi");

export enum DestinationType {
	Singlecast,
	Broadcast,
	Multicast,
}

export interface RxStatus {
	routedBusy: boolean; // A response route is locked by the application
	lowPower: boolean; // Received at low output power level
	destinationType: DestinationType; // Single/broadcast/multicast frame received
	explore: boolean; // Received an explore frame
	foreignFrame: boolean; // The received frame is not addressed to this node (Only valid in promiscuous mode)
	foreignHomeId: boolean; // The received frame is received from a foreign HomeID. Only Controllers in Smart Start AddNode mode can receive this status
}

export interface SerialApiCommandEvent {
	rxStatus: RxStatus;
	sourceNode: number;
	command: Buffer;
}

export function rxStatusToString(rxStatus: RxStatus): string {
	return [
		DestinationType[rxStatus.destinationType],
		rxStatus.routedBusy ? ",routedBusy" : "",
		rxStatus.lowPower ? ",lowPower" : "",
		rxStatus.explore ? ",explore" : "",
		rxStatus.foreignFrame ? ",foreignFrame" : "",
		rxStatus.foreignHomeId ? ",foreignHomeId" : "",
	].join("");
}

function parseRxStatus(value: number): RxStatus {
	return {
		routedBusy: (value & 0b00000001) > 0,
		lowPower: (value & 0b00000010) > 0,
		destinationType: (value & 0b00001100) >> 2,
		explore: (value & 0b00011000) === 0b00010000,
		foreignFrame: (value & 0b01000000) > 0,
		foreignHomeId: (value & 0b10000000) > 0,
	};
}

// Set of functions assumed to exist on the Serial API before we
// even tried to query it for its list of supported functions.
// Note: SERIAL_API_GET_CAPABILITIES is only supported starting from
// Serial API version 4, so this is actually not entirely correct,
// but I don't have older versions, and didn't try to figure out
// how to detect these older versions correctly.
const DEFAULT_SUPPORTED_FUNCTIONS: Set<SerialApiCommandCode> = new Set([
	SerialApiCommandCode.SERIAL_API_GET_CAPABILITIES,
	SerialApiCommandCode.ZW_GET_VERSION,
	SerialApiCommandCode.SERIAL_API_GET_INIT_DATA,
	SerialApiCommandCode.ZW_MEMORY_GET_ID,
]);

enum SerialApiState {
	/**
	 * Waiting for init sequence to complete.
	 */
	Constructed,

	/**
	 * Busy initializing.
	 */
	Initializing,

	/**
	 * Initialized, ready to accept calls and process callbacks
	 * from Z-Wave chip.
	 */
	Ready,

	/**
	 * API closed, no further calls possible, no further events will
	 * be emitted.
	 * Because protocol closed, and/or error occurred.
	 */
	Closed,
}

export interface SerialApi {
	/**
	 * Z-Wave message (command) received on network.
	 */
	on(
		event: "command",
		listener: (command: SerialApiCommandEvent) => void
	): this;
	on(event: "error", listener: (error: Error) => void): this;
	on(event: "close", listener: () => void): this;
}

/**
 * Expose Z-Wave Serial API commands.
 *
 * These commands can be used to determine capabilities of the connected
 * Z-Wave device, send messages to the Z-Wave network (commands), etc.
 */
export class SerialApi extends EventEmitter {
	private _state: SerialApiState = SerialApiState.Constructed;
	private _protocol: IProtocol;
	private _rootSession: CommandSession;
	private _capabilities?: SerialAPICapabilities;
	private _initData?: SerialAPIInitData;
	private _homeAndNodeId?: HomeAndNodeId;
	private _versionInfo?: ZwVersionInfo;
	private _protocolManager: ProtocolManager;

	/**
	 * Construct and initialize Serial API using given Z-Wave Serial Protocol
	 * encoder/decoder.
	 *
	 * The given protocol must already be initialized.
	 * When the protocol is reset, after or during initialization of the Serial
	 * API, it will be closed and a new instance needs to be created.
	 *
	 * @param protocol Serial Protocol encoder/decoder, must be already initialized (i.e. soft/hard-resetted).
	 */
	public static async create(protocol: IProtocol): Promise<SerialApi> {
		const serialApi = new SerialApi(protocol);
		serialApi.on("error", noop); // Prevent unhandled error due to no attached handlers when init() errors
		await serialApi._init();
		serialApi.off("error", noop);
		return serialApi;
	}

	private constructor(protocol: IProtocol) {
		super();
		this._protocol = protocol;
		this._protocolManager = new ProtocolManager(protocol);
		this._protocolManager.setSupportedFunctions(
			DEFAULT_SUPPORTED_FUNCTIONS
		);
		this._rootSession = new CommandSession(this._protocolManager);

		this._protocol.on("callback", (command, params) =>
			this._handleCallback(command, params)
		);
		this._protocol.on("reset", () => this._handleProtocolReset());
		this._protocol.on("error", (error) => this._handleProtocolError(error));
		this._protocol.on("close", () => this._handleProtocolClose());
	}

	/**
	 * Determine whether connected Z-Wave chip is controller or slave.
	 */
	public isController(): boolean {
		this._verifyInitialized(this._initData);
		return !this._initData.capabilities.has(NodeCapabilityFlags.SlaveAPI);
	}

	/**
	 * Get set of node IDs as present when this SerialAPI instance was created.
	 */
	public getNodes(): Set<number> {
		this._verifyInitialized(this._initData);
		return this._initData.nodes;
	}

	/**
	 * Get currently assigned home and node ID.
	 */
	public getHomeAndNodeId(): HomeAndNodeId {
		this._verifyInitialized(this._homeAndNodeId);
		return this._homeAndNodeId;
	}

	public getLibraryType(): ZwLibraryType {
		this._verifyInitialized(this._versionInfo);
		return this._versionInfo.libraryType;
	}

	/**
	 * Execute Serial API command(s).
	 *
	 * The runner is passed a session, which allows sending commands
	 * and waiting for their responses as long as the runner is executing.
	 * When the runner completes, the session is closed to prevent furher
	 * direct access to the serial API.
	 *
	 * The runner is only started when the previous runner (if any)
	 * has completed.
	 *
	 * The Z-Wave Serial API is not designed for concurrent access,
	 * and e.g. shares the same transmit queue between commands
	 * (see INS13954-7 section 4.1.3).
	 * This mechanism ensures that only a single command has access to the API
	 * at any time. Note that a session can explicitly 'fork' itself to
	 * allow e.g. sub-commands to be executed if necessary.
	 *
	 * @see ICommandSessionRunner and @see ICommandSession for details
	 * and example usage.
	 *
	 * @param runner Runner class of which the `run()` method is passed
	 *     a session that can be used to send/receive Serial API commands
	 *     and events as long as the runner is executing.
	 *     The `runner.toString()` method is used for logging which
	 *     session is being started.
	 */
	public execute<T>(runner: ICommandSessionRunner<T>): Promise<T> {
		return this._rootSession.execute(runner);
	}

	/**
	 * Initialize SerialApi.
	 *
	 * Afterwards, calls like `getNodes()`, `isController()` and `getHomeAndNodeId()`
	 * will be possible.
	 */
	private async _init(): Promise<void> {
		log("initializing");
		this._state = SerialApiState.Initializing;
		await this._serialGetCapabilities();
		await this._zwGetVersion();
		await this._serialGetInitData();
		await this._zwMemoryGetId();
		this._state = SerialApiState.Ready;
		log("ready");
	}

	/**
	 * Determine basic information about connected Z-Wave chip such
	 * as manufacturer/produce information, and which serial API functions are
	 * supported.
	 *
	 * Automatically called during init().
	 */
	private async _serialGetCapabilities(): Promise<SerialAPICapabilities> {
		this._capabilities = await this.execute(new SerialApiGetCapabilities());
		this._protocolManager.setSupportedFunctions(
			this._capabilities.supportedFunctions
		);
		const caps = this._capabilities;
		log(
			`serialGetCapabilities:`,
			`applicationVersion=${caps.applVersion}.${
				caps.applRevision
			} manufacturerId=0x${toHex(
				caps.manufacturerId,
				4
			)} manufacturerProductType=0x${toHex(
				caps.manufacturerProductType,
				4
			)} manufacturerProductId=0x${toHex(caps.manufacturerProductId, 4)}`
		);
		log(
			`serialGetCapabilities supported functions: [${[
				...caps.supportedFunctions.values(),
			].map((func) => SerialApiCommandCode[func] ?? `0x${toHex(func)}`)}]`
		);
		return this._capabilities;
	}

	/**
	 * Determine role of connected chip (controller/slave etc), serial API version
	 * and list of nodes stored in RAM (for controllers).
	 *
	 * Automatically called during init().
	 */
	private async _serialGetInitData(): Promise<SerialAPIInitData> {
		this._initData = await this.execute(new SerialApiGetInitData());
		const init = this._initData;
		const roleText = init.capabilities.has(NodeCapabilityFlags.SlaveAPI)
			? "slave"
			: init.capabilities.has(NodeCapabilityFlags.SecondaryController)
			? "secondaryController"
			: `primaryController isSIS=${init.capabilities.has(
					NodeCapabilityFlags.IsSIS
			  )}`;
		// Determine readable chip name (INS12350-Serial-API-Host-Appl.-Prg.-Guide - section 7.4)
		let chipName: string = "unknown";
		switch (init.chipType) {
			case 0x01:
				switch (init.chipVersion) {
					case 0x02:
						chipName = "ZW0102";
						break;
				}
				break;
			case 0x02:
				switch (init.chipVersion) {
					case 0x01:
						chipName = "ZW0201";
						break;
				}
				break;
			case 0x03:
				switch (init.chipVersion) {
					case 0x01:
						chipName = "ZW0301";
						break;
				}
				break;
			case 0x04:
				switch (init.chipVersion) {
					case 0x01:
						chipName = "ZM0401/ZM4102/SD3402";
						break;
				}
				break;
			case 0x05:
				switch (init.chipVersion) {
					case 0x00:
						chipName = "ZW050x";
						break;
				}
				break;
		}
		log(
			`serialGetInitData:`,
			`apiVersion=${init.apiVersion}`,
			`role=${roleText}`,
			`chipType=0x${init.chipType.toString(16)}`,
			`chipVersion=0x${init.chipVersion.toString(16)}`,
			`chipName=${chipName}`,
			`nodes=[${[...init.nodes.values()]}]`
		);

		return this._initData;
	}

	/**
	 * Retrieve Home ID and Node ID from connected serial chip.
	 */
	private async _zwMemoryGetId(): Promise<HomeAndNodeId> {
		this._homeAndNodeId = await this.execute(new ZwMemoryGetId());
		const homeAndId = this._homeAndNodeId;
		log(
			`zwMemoryGetId: homeId=0x${toHex(
				homeAndId.homeId,
				8
			)} nodeId=${homeAndId.nodeId.toString()}`
		);
		return this._homeAndNodeId;
	}

	/**
	 * Obtain Z-Wave chip's library version in human-readable form,
	 * and what type it is.
	 */
	private async _zwGetVersion(): Promise<ZwVersionInfo> {
		this._versionInfo = await this.execute(new ZwGetVersion());
		const info = this._versionInfo;
		log(
			`zwGetVersion: libraryVersion="${
				info.libraryVersion
			}" libraryType=${ZwLibraryType[info.libraryType]}`
		);
		return this._versionInfo;
	}

	private _handleCallback(
		command: SerialApiCommandCode,
		params: Buffer
	): void {
		if (command === SerialApiCommandCode.APPLICATION_COMMAND_HANDLER) {
			const rxStatus = parseRxStatus(params[0]);
			const sourceNode = params[1];
			const cmdLength = params[2];
			const cmdPayload = params.slice(3, 3 + cmdLength);
			// const rxRSSIVal = params[params.length - 2];
			// const securityKey = params[params.length - 1];
			const event: SerialApiCommandEvent = {
				rxStatus,
				sourceNode,
				command: cmdPayload,
			};
			log("emit command", event);
			process.nextTick(() => this._safeEmit("command", event));
		}

		// TODO Handle FUNC_ID_SERIAL_API_STARTED to trigger _handleProtocolReset()?
		// I have no way to test this, because USB devices also disconnect from the USB
		// bus during a reset.
	}

	private _verifyInitialized<T>(value: T | undefined): asserts value is T {
		if (this._state !== SerialApiState.Ready) {
			throw new Error(
				`SerialAPI is not initialized (currently in state ${
					SerialApiState[this._state]
				})`
			);
		}
		if (!value) {
			// Programming error
			throw new Error("internal error");
		}
	}

	private _handleProtocolReset(): void {
		if (
			this._state === SerialApiState.Closed ||
			this._state === SerialApiState.Constructed
		) {
			return;
		}
		this._abortAndClose(new Error("protocol reset"));
	}

	private _handleProtocolClose(): void {
		if (this._state === SerialApiState.Closed) {
			return;
		}
		log("close");
		this._state = SerialApiState.Closed;
		this._abort(new Error("protocol closed"));
		this._safeEmit("close");
	}

	private _handleProtocolError(error: Error): void {
		if (this._state === SerialApiState.Closed) {
			return;
		}
		this._abortAndClose(
			new Error(`protocol errored: ${error.name}: ${error.message}`)
		);
	}

	private _safeEmit(event: string, ...args: unknown[]): void {
		try {
			this.emit(event, ...args);
		} catch (err) {
			const error =
				typeof err === "object" && err instanceof Error
					? err
					: new Error("unknown error");
			const eventHandlerError = new Error(
				`unhandled error in SerialApi event handler for '${event}': ${error.name}: ${error.message}`
			);
			if (this._state === SerialApiState.Closed) {
				// No way to report it anymore, let it explode as uncaught error
				process.nextTick(() => {
					throw error;
				});
				return;
			}
			this._abortAndClose(eventHandlerError);
		}
	}

	private _abort(error: Error): void {
		this._protocol.cancel(error);
		this._rootSession.close(error);
	}

	private _abortAndClose(error: Error): void {
		if (this._state === SerialApiState.Closed) {
			// Ignore follow-up errors
			return;
		}
		log("error", error);
		this._state = SerialApiState.Closed;
		this._abort(error);
		this._safeEmit("error", error);
		log("close");
		this._safeEmit("close");
	}
}
