import debug from "debug";
import { EventEmitter } from "events";
import * as util from "util";
import { Queue } from "../common/queue";
import { defer, enumToString, noop, timeout, toHex } from "../common/util";
import {
	ZwGetVersionCommand,
	ZwVersionInfo,
} from "./commands/basis/zwGetVersion";
import { ZwMemoryGetIdCommand } from "./commands/memory/zwMemoryGetId";
import {
	SerialAPICapabilities,
	SerialApiGetCapabilitiesCommand,
} from "./commands/serialApi/serialApiGetCapabilities";
import {
	NodeCapabilityFlags,
	SerialApiGetInitDataCommand,
	SerialAPIInitData,
} from "./commands/serialApi/serialApiGetInitData";
import {
	CallbackTypeOf,
	isCallbackCommand,
	SerialApiCallbackCommand,
} from "./commands/serialApiCallbackCommand";
import { SerialApiCommandCode } from "./commands/serialApiCommandCode";
import {
	EventTypeOf,
	isTransactionCommand,
	SerialApiTransactionCommand,
	TransactionEventGetter,
	TransactionResultTypeOf,
	TransactionSender,
} from "./commands/serialApiTransactionCommand";
import {
	isResponseCommand,
	ResponseTypeOf,
	SerialApiResponseCommand,
} from "./commands/serialApiResponseCommand";
import { SerialApiSimpleCommand } from "./commands/serialApiSimpleCommand";
import { IProtocol } from "./protocol";
import { HomeAndNodeId, ZwLibraryType } from "./types";
import { SerialApiTransmitCallbackCommand } from "./commands/serialApiTransmitCallbackCommand";

const log = debug("zwave:serialapi");

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

interface CallbackListener<T> {
	mapper: (command: SerialApiCommandCode, params: Buffer) => T | undefined;
	resolve: (value: T | PromiseLike<T>) => void;
	reject: (err: Error) => void;
}

// Set of functions assumed to exist on the Serial API before we
// even tried to query it for its list of supported functions.
// Note: SERIAL_API_GET_CAPABILITIES is only supported starting from
// Serial API version 4, so this is actually not entirely correct,
// but I don't have older versions, and didn't try to figure out
// how to detect these older versions correctly.
const DEFAULT_SUPPORTED_FUNCTIONS = new Set([
	SerialApiCommandCode.SERIAL_API_GET_CAPABILITIES,
	SerialApiCommandCode.ZW_GET_VERSION,
	SerialApiCommandCode.SERIAL_API_GET_INIT_DATA,
	SerialApiCommandCode.ZW_MEMORY_GET_ID,
]);

/**
 * Timeout in milliseconds used by default for SerialApiCallbackCommand's.
 */
const DEFAULT_CALLBACK_TIMEOUT = 10 * 1000;

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
	private _state = SerialApiState.Constructed;
	private _protocol: IProtocol;
	private _supportedFunctions: Set<SerialApiCommandCode> = DEFAULT_SUPPORTED_FUNCTIONS;
	private _capabilities?: SerialAPICapabilities;
	private _initData?: SerialAPIInitData;
	private _homeAndNodeId?: HomeAndNodeId;
	private _versionInfo?: ZwVersionInfo;
	private _callbackId: number = 0;
	private _requests = new Queue();
	private _callbackListener: CallbackListener<any> | undefined;

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

		this._protocol.on("callback", (command, params) =>
			this._handleCallback(command, params)
		);
		this._protocol.on("reset", () => this._handleProtocolReset());
		this._protocol.on("error", (error) => this._handleProtocolError(error));
		this._protocol.on("close", () => this._handleProtocolClose());
	}

	/**
	 * Determine whether connected Z-Wave chip is controller or slave.
	 *
	 * The instance needs to be initialized with `init()` first.
	 */
	public isController(): boolean {
		this._verifyInitialized(this._initData);
		return !this._initData.capabilities.has(NodeCapabilityFlags.SlaveAPI);
	}

	/**
	 * Get set of nodes as reported in last `serialGetInitData()` or `init()` call.
	 *
	 * To refresh the node list (e.g. after inclusion), call `serialGetInitData(true)`.
	 *
	 * The instance needs to be initialized with `init()` first.
	 */
	public getNodes(): Set<number> {
		this._verifyInitialized(this._initData);
		return this._initData.nodes;
	}

	/**
	 * Get currently assigned home and node ID, as reported by last
	 * call to `zwMemoryGetId()` or `init()`.
	 *
	 * To refresh the node list (e.g. after inclusion), call `serialGetInitData(true)`.
	 *
	 * The instance needs to be initialized with `init()` first.
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
	 * Execute command on Z-Wave serial API.
	 *
	 * This overload executes a command that issues a REQuest, waits for and processes
	 * a RESponse (if the command expects one) and then waits for multiple callback
	 * REQuests to be emitted from the device. A statemachine (defined by the command)
	 * is called that responds to each of these events, optionally responding with
	 * additional (internal) commands, etc. and finally returning a single result of the
	 * overall operation.
	 *
	 * Throws an exception if e.g. the command is not supported by the connected serial
	 * device, isn't accepted, cannot successfully be sent, invalid response is received,
	 * or the given timeout occurs.
	 *
	 * @param command Callback command to send.
	 */
	public async send<T extends SerialApiTransactionCommand<any, any, any>>(
		command: T
	): Promise<TransactionResultTypeOf<T>>;
	/**
	 * Execute command on Z-Wave serial API.
	 *
	 * This overload executes a command that issues a REQuest, waits for and processes
	 * a RESponse (if the command expects one) and then waits for a callback REQuest
	 * to be emitted from the device with the final result.
	 *
	 * Throws an exception if e.g. the command is not supported by the connected serial
	 * device, isn't accepted, cannot successfully be sent, invalid response is received,
	 * or the given timeout occurs.
	 *
	 * Note that when the command times out, some commands (e.g. ZwSendData) require custom
	 * cleanup to cleanly abort the command (e.g. ZwSendDataAbort). Such cleanup is not
	 * performed by this function.
	 *
	 * @param command Callback command to send.
	 */
	public async send<T extends SerialApiCallbackCommand<any, any>>(
		command: T
	): Promise<CallbackTypeOf<T>>;
	/**
	 * Execute command on Z-Wave serial API.
	 *
	 * This overload executes a command that issues a REQuest, and expects a RESponse.
	 *
	 * Throws an exception if e.g. the command is not supported by the connected serial
	 * device, isn't accepted, invalid response is received, or timeout occurs.
	 *
	 * @param command Callback command to send.
	 */
	public async send<T extends SerialApiResponseCommand<any, any>>(
		command: T
	): Promise<ResponseTypeOf<T>>;
	/**
	 * Execute command on Z-Wave serial API.
	 *
	 * This overload executes a command that only issues a REQuest, and does not expect
	 * a RESponse.
	 *
	 * Throws an exception if e.g. the command is not supported by the connected serial
	 * device, or isn't accepted, or a timeout occurs.
	 *
	 * @param command Callback command to send.
	 */
	public async send<T extends SerialApiSimpleCommand<any>>(
		command: T
	): Promise<void>;
	public async send(
		command:
			| SerialApiSimpleCommand<any>
			| SerialApiResponseCommand<any, any>
			| SerialApiCallbackCommand<any, any>
			| SerialApiTransactionCommand<any, any, any>
	): Promise<any> {
		this._verifyCommandSupportedAndReady(command.command);
		if (isTransactionCommand(command)) {
			return this._doTransaction(command);
		} else if (isCallbackCommand(command)) {
			return this._requestAndWait(command);
		} else if (isResponseCommand(command)) {
			return this._request(command);
		} else {
			return this._send(command);
		}
	}

	private async _send<T extends SerialApiSimpleCommand<any>>(
		command: T
	): Promise<void> {
		return this._requests.add(() =>
			this._protocol.send(
				command.command,
				command.serializeRequest(this._getNextCallbackId())
			)
		);
	}

	private async _request<T extends SerialApiResponseCommand<any, any>>(
		command: T,
		timeoutInMs?: number
	): Promise<ResponseTypeOf<T>> {
		const transactionId = this._getNextCallbackId();
		const response = await this._requests.add(() =>
			this._protocol.request(
				command.command,
				command.serializeRequest(transactionId),
				timeoutInMs
			)
		);
		const result = command.parseResponse(response);
		return result;
	}

	private async _requestAndWait<T extends SerialApiCallbackCommand<any, any>>(
		message: T
	): Promise<CallbackTypeOf<T>> {
		const transactionId = this._getNextCallbackId();
		try {
			log(
				`${
					SerialApiCommandCode[message.command]
				} begin: transactionId=${transactionId} args=${util.inspect(
					message.request
				)}`
			);

			const result = await this._requests.add(async () => {
				const resultDef = defer<CallbackTypeOf<T>>();
				if (this._callbackListener) {
					throw new Error(
						"programming error: callbackListener still present"
					);
				}
				const mapper = (
					command: SerialApiCommandCode,
					params: Buffer
				) => message.tryParseCallback(command, params, transactionId);
				this._callbackListener = {
					mapper,
					resolve: resultDef.resolve,
					reject: resultDef.reject,
				};
				// Prevent unhandled rejection if aborted before _sendCallbackOrTransactionRequest() returns
				resultDef.promise.catch(noop);
				try {
					await this._sendCallbackOrTransactionRequest(
						message,
						transactionId
					);
					return await timeout(resultDef.promise, message.timeout);
				} finally {
					this._callbackListener = undefined;
				}
			});

			log(
				`${
					SerialApiCommandCode[message.command]
				} ok: transactionId=${transactionId} result=${util.inspect(
					result
				)}`
			);
			return result;
		} catch (err) {
			log(
				`${
					SerialApiCommandCode[message.command]
				} failed: transactionId=${transactionId} error=${util.inspect(
					err
				)}`
			);
			throw err;
		}
	}

	private async _doTransaction<
		T extends SerialApiTransactionCommand<any, any, any>,
		E extends EventTypeOf<T>,
		R extends TransactionResultTypeOf<T>
	>(command: T): Promise<R> {
		const transactionId = this._getNextCallbackId();
		try {
			log(
				`${
					SerialApiCommandCode[command.command]
				} begin: transactionId=${transactionId} args=${util.inspect(
					command.request
				)}`
			);

			const result = await this._requests.add(async () => {
				const resultDef = defer<never>();
				if (this._callbackListener) {
					throw new Error(
						"programming error: callbackListener still present"
					);
				}
				const events: E[] = [];
				const getters: Array<(value: E | PromiseLike<E>) => void> = [];
				const pumpEvents = () => {
					while (events.length > 0 && getters.length > 0) {
						const event = events.shift()!;
						const getter = getters.shift()!;
						getter(event);
					}
				};
				const mapper = (
					cmd: SerialApiCommandCode,
					params: Buffer
				): void => {
					const event = command.tryParseCallback(
						cmd,
						params,
						transactionId
					);
					if (event) {
						events.push(event);
						pumpEvents();
					}
				};
				this._callbackListener = {
					mapper,
					resolve: noop,
					reject: resultDef.reject,
				};
				// Prevent unhandled rejection if aborted before _sendCallbackOrTransactionRequest() returns
				resultDef.promise.catch(noop);
				let inTransaction = true;
				try {
					await this._sendCallbackOrTransactionRequest(
						command,
						transactionId
					);

					const send: TransactionSender = async (
						command: any
					): Promise<void> => {
						if (!inTransaction) {
							throw new Error("transaction ended");
						}
						//return this.sendInternal();
						console.log("TODO SEND", command);
					};
					const getEvent: TransactionEventGetter<E> = async (
						timeoutInMs
					) => {
						if (!inTransaction) {
							throw new Error("transaction ended");
						}
						const d = defer<E>();
						getters.push(d.resolve);
						try {
							pumpEvents();
							return await timeout(d.promise, timeoutInMs);
						} finally {
							// Remove timed-out getter, if necessary, to prevent
							// event getting lost
							const index = getters.indexOf(d.resolve);
							if (index >= 0) {
								getters.splice(index, 1);
							}
						}
					};
					return await command.execute(send, getEvent);
				} finally {
					inTransaction = false;
					this._callbackListener = undefined;
					while (getters.length > 0) {
						const getter = getters.shift()!;
						getter(Promise.reject(new Error("transaction ended")));
					}
				}
			});

			log(
				`${
					SerialApiCommandCode[command.command]
				} ok: transactionId=${transactionId} result=${util.inspect(
					result
				)}`
			);
			return result;
		} catch (err) {
			log(
				`${
					SerialApiCommandCode[command.command]
				} failed: transactionId=${transactionId} error=${util.inspect(
					err
				)}`
			);
			throw err;
		}
	}

	private async _sendCallbackOrTransactionRequest(
		command:
			| SerialApiCallbackCommand<any, any>
			| SerialApiTransactionCommand<any, any, any>,
		transactionId: number
	): Promise<void> {
		if (command.verifyResponse) {
			// Note: No timeout is given to request(), as its timeout
			// is spec'ed in the standard, and should only really happen
			// if e.g. the device got stuck, not due to 'normal' issues
			// such as RF noise.
			const commandResponse = await this._protocol.request(
				command.command,
				command.serializeRequest(transactionId)
			);
			command.verifyResponse(commandResponse);
		} else {
			await this._protocol.send(
				command.command,
				command.serializeRequest(transactionId)
			);
		}
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
		await this._serialGetCapabilities(true);
		await this._zwGetVersion();
		await this._serialGetInitData(true);
		await this._zwMemoryGetId(true);
		this._state = SerialApiState.Ready;
		log("initialized");
	}

	/**
	 * Determine basic information about connected Z-Wave chip such
	 * as manufacturer/produce information, and which serial API functions are
	 * supported.
	 *
	 * Automatically called during init().
	 *
	 * @param forceRefresh (Optional) when false (default) returns cached info when available,
	 *                     when true, will always request fresh data from chip.
	 */
	private async _serialGetCapabilities(
		forceRefresh: boolean = false
	): Promise<SerialAPICapabilities> {
		if (this._capabilities && !forceRefresh) {
			return this._capabilities;
		}
		const cmd = new SerialApiGetCapabilitiesCommand();
		this._capabilities = await this.send(cmd);
		this._supportedFunctions = this._capabilities.supportedFunctions;
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
	 *
	 * @param forceRefresh (Optional) when false (default) returns cached info when available,
	 *                     when true, will always request fresh data from chip.
	 */
	private async _serialGetInitData(
		forceRefresh: boolean = false
	): Promise<SerialAPIInitData> {
		if (this._initData && !forceRefresh) {
			return this._initData;
		}

		this._initData = await this.send(new SerialApiGetInitDataCommand());
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
	 *
	 * @param forceRefresh (Optional) when false (default) returns cached info when available,
	 *                     when true, will always request fresh data from chip.
	 */
	private async _zwMemoryGetId(
		forceRefresh: boolean = false
	): Promise<HomeAndNodeId> {
		if (this._homeAndNodeId && !forceRefresh) {
			return this._homeAndNodeId;
		}

		this._homeAndNodeId = await this.send(new ZwMemoryGetIdCommand());
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
		this._versionInfo = await this.send(new ZwGetVersionCommand());
		const info = this._versionInfo;
		log(
			`zwGetVersion: libraryVersion="${
				info.libraryVersion
			}" libraryType=${ZwLibraryType[info.libraryType]}`
		);
		return this._versionInfo;
	}

	private _verifyCommandSupportedAndReady(
		command: SerialApiCommandCode
	): void {
		if (this._state === SerialApiState.Closed) {
			throw new Error(`Serial API closed`);
		}
		if (!this._supportedFunctions.has(command)) {
			throw new Error(
				`Serial API command ${enumToString(
					command,
					SerialApiCommandCode
				)} not supported by device`
			);
		}
	}

	private _handleCallback(
		command: SerialApiCommandCode,
		params: Buffer
	): void {
		if (this._callbackListener) {
			try {
				const mapper = this._callbackListener.mapper;
				const result = mapper(command, params);
				if (result !== undefined) {
					this._callbackListener.resolve(result);
					this._callbackListener = undefined;
				}
			} catch (err) {
				this._callbackListener?.reject(err);
				this._callbackListener = undefined;
			}
		}

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

	private _getNextCallbackId(): number {
		this._callbackId++;
		if (this._callbackId > 0xff) {
			// Note: not 0, because that means we don't want feedback
			this._callbackId = 1;
		}
		return this._callbackId;
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

	private _safeEmit(event: string, ...args: any[]): void {
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
		if (this._callbackListener) {
			this._callbackListener.reject(error);
			this._callbackListener = undefined;
		}
		this._requests.abortPending(error);
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
