import { Parser } from "binary-parser";
import debug from "debug";
import { EventEmitter } from "events";
import * as Queue from "promise-queue";
import { bufferToString, defer, Timer } from "../common/util";
import {
	CommandClassInfo,
	parseCommandClassInfo,
} from "../commands/commandClassInfo";
import { Protocol } from "./protocol";
import { SerialAPICommand } from "./serialApiCommand";

const log = debug("zwave:serialapi");
const logData = log.extend("data");

export interface SerialAPICapabilities {
	applVersion: number;
	applRevision: number;
	manufacturerId: number;
	manufacturerProductType: number;
	manufacturerProductId: number;
	supportedFunctions: number[];
}

export enum NodeCapabilityFlags {
	SlaveAPI = 0x01, // Otherwise ControllerAPI
	TimerSupported = 0x02,
	PrimaryController = 0x04, // Otherwise Secondary
	IsSIS = 0x08,
}

export interface SerialAPIInitData {
	apiVersion: number;
	capabilities: number; // See NodeCapabilityFlags
	nodesLength: number;
	nodes: number[];
	chipType: number;
	chipVersion: number;
}

enum TxStatus {
	Ok = 0x00,
	NoAck = 0x01, // Node may be sleeping
	Fail = 0x02, // Network busy
	NotIdle = 0x03, // TODO
	NoRoute = 0x04, // TODO
}

enum ApplicationSlaveUpdateStatus {
	UPDATE_STATE_NODE_INFO_RECEIVED = 0x84,
}

// TODO move to Host
export class Node {
	private _host: SerialApi;
	private _id: number;

	constructor(host: SerialApi, id: number) {
		this._host = host;
		this._id = id;
	}
}

export interface NodeInfo {
	nodeId: number;
	basicClass: number; // TODO BasicDeviceClassEnum
	genericClass: number; // TODO GenericDeviceClassEnum
	specificClass: number; // 'subclass' within GenericDeviceClassEnum
	commandClasses: CommandClassInfo;
}

const MAX_NODES = 232; // Maximum number of nodes in one Z-Wave network
const ZW_SEND_DATA_TIMEOUT = 65 * 1000; // See INS13954-Instruction-Z-Wave-500-Series-Appl-Programmers-Guide-v6_81_0x.pdf, fig 9

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

// TODO Rename to SerialApiEvent
export interface HostEvent {
	rxStatus: RxStatus;
	sourceNode: number;
	data: Buffer;
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

export interface SerialApi {
	on(event: "event", listener: (event: HostEvent) => void): this;
}

export class SerialApi extends EventEmitter {
	private _protocol: Protocol;
	private _capabilities?: SerialAPICapabilities;
	private _initData?: SerialAPIInitData;
	//private _supportedAPIs: boolean[] = [];
	private _nodes = new Map<number, Node>();
	private _callbackId: number = 0xef; // Arbitrary start value that's easy to recognize in streams
	private _requests = new Queue(1, Infinity);

	constructor(protocol: Protocol) {
		super();
		this._protocol = protocol;

		this._protocol.on("message", (command, params) =>
			this._handleMessage(command, params)
		);
	}

	public async init(): Promise<void> {
		const caps = await this.serialGetCapabilities();
		this._capabilities = caps;
		// TODO extend with more useful info
		log(
			`serialGetCapabilities: applicationVersion=${caps.applVersion}.${caps.applRevision}`
		);

		this._initData = await this.serialGetInitData();
		// TODO decode capabilities
		log(
			`serialGetInitData: apiVersion=${
				this._initData.apiVersion
			} capabilities=0x${this._initData.capabilities.toString(
				16
			)} chipType=0x${this._initData.chipType.toString(
				16
			)} chipVersion=0x${this._initData.chipVersion.toString(16)}`
		);
		if (this._initData.nodes.length > 0) {
			for (let i = 0; i < MAX_NODES; i++) {
				const hasNode =
					(this._initData.nodes[Math.trunc(i / 8)] &
						Math.pow(2, i % 8)) >
					0;
				if (hasNode) {
					this._nodes.set(i, new Node(this, i));
				}
			}
			log("nodes", this._nodes.keys());
		}
	}

	public isController(): boolean {
		return (
			(this._initData &&
				(this._initData.capabilities & NodeCapabilityFlags.SlaveAPI) ===
					0) ||
			false
		);
	}

	public async serialGetCapabilities(): Promise<SerialAPICapabilities> {
		return this._requests.add(async () => {
			const response = await this._protocol.request(
				SerialAPICommand.FUNC_ID_SERIAL_API_GET_CAPABILITIES
			);
			return (new Parser()
				.endianess("big")
				.uint8("applVersion")
				.uint8("applRevision")
				.uint16("manufacturerId")
				.uint16("manufacturerProductType")
				.uint16("manufacturerProductId")
				.array("supportedFunctions", {
					type: "uint8",
					length: 256 / 8,
				})
				.parse(response) as any) as SerialAPICapabilities;
		});
	}

	public async serialGetInitData(): Promise<SerialAPIInitData> {
		return this._requests.add(async () => {
			const response = await this._protocol.request(
				SerialAPICommand.FUNC_ID_SERIAL_API_GET_INIT_DATA
			);
			return (new Parser()
				.endianess("big")
				.uint8("apiVersion")
				.uint8("capabilities")
				.uint8("nodesLength")
				.array("nodes", {
					type: "uint8",
					length: "nodesLength",
				})
				.uint8("chipType")
				.uint8("chipVersion")
				.parse(response) as any) as SerialAPIInitData;
		});
	}

	public async zwGetVersion(): Promise<Buffer> {
		return this._requests.add(async () => {
			return await this._protocol.request(
				SerialAPICommand.FUNC_ID_ZW_GET_VERSION
			);
		});
	}

	/**
	 * Send data to specified node or all nodes.
	 *
	 * @param nodeId Node ID to send data to, or 0xff to broadcast to all nodes
	 * @param data   Data to transmit
	 */
	public async zwSendData(nodeId: number, data: Buffer): Promise<boolean> {
		return this._requests.add(() => this._internalZwSendData(nodeId, data));
	}

	public async zwRequestNodeInfo(nodeId: number): Promise<NodeInfo> {
		return this._requests.add(async () => {
			console.log("\tBEGIN ZW_REQUEST_NODE_INFO", `node=${nodeId}`);
			const params = Buffer.from([nodeId]);

			const returnValue = await this._protocol.request(
				SerialAPICommand.FUNC_ID_ZW_REQUEST_NODE_INFO,
				params
			);
			// TODO dedup this logic
			if (returnValue.length !== 1) {
				throw new Error("invalid response from controller");
			}
			if (returnValue[0] === 0) {
				console.log("\tEND ZW_REQUEST_NODE_INFO", "FAILED");
				throw new Error(
					"command accepted by controller, but could not be delivered to network"
				);
			}

			// Reply expected, in the form of a ZW_SEND_DATA REQuest from controller to us
			const sendResult = await this._waitForREQ(
				ZW_SEND_DATA_TIMEOUT,
				(command: SerialAPICommand, params: Buffer) => {
					console.log("WAIT", SerialAPICommand[command], params);
					if (
						command !==
						SerialAPICommand.FUNC_ID_ZW_APPLICATION_UPDATE
					) {
						return;
					}
					if (params.length < 6) {
						return;
					}
					// INS13954-7 4.3.1.7 ApplicationSlaveUpdate
					const bStatus = params[0];
					const bNodeId = params[1];
					const bLen = params[2];
					const basicClass = params[3];
					const genericClass = params[4];
					const specificClass = params[5];
					const commandClassesRaw = params.slice(6);
					if (
						bStatus !==
						ApplicationSlaveUpdateStatus.UPDATE_STATE_NODE_INFO_RECEIVED
					) {
						return;
					}
					if (bNodeId !== nodeId) {
						return;
					}
					if (bLen !== params.length - 3 || bLen < 3) {
						return;
					}
					// NodeID | bLen | basic | generic | specific | commandclasses[ ]
					// 10       1a     04      11        01         5e 20 86 72 26 5a 59 85 73 98 7a 56 70 31 32 8e 60 75 71 27 22 ef 2b
					const commandClasses = parseCommandClassInfo(
						commandClassesRaw
					);
					return {
						nodeId,
						basicClass,
						genericClass,
						specificClass,
						commandClasses,
					};
				}
			);

			console.log(
				"\tEND ZW_REQUEST_NODE_INFO",
				`sendResult=`,
				sendResult
			);
			return sendResult;
		});
	}

	private _handleMessage(command: SerialAPICommand, params: Buffer): void {
		console.log(
			`\tSERIALAPI CALLBACK command=${
				SerialAPICommand[command]
			} params=[${bufferToString(params)}]`
		);
		if (command === SerialAPICommand.FUNC_ID_APPLICATION_COMMAND_HANDLER) {
			const rxStatus = parseRxStatus(params[0]);
			const sourceNode = params[1];
			const cmdLength = params[2];
			const payload = params.slice(3, 3 + cmdLength);
			// const rxRSSIVal = params[params.length - 2];
			// const securityKey = params[params.length - 1];
			const event: HostEvent = {
				rxStatus,
				sourceNode,
				data: payload,
			};
			process.nextTick(() => this.emit("event", event));
		}
	}

	private async _waitForREQ<T>(
		timeout: number,
		handler: (command: SerialAPICommand, params: Buffer) => T | undefined
	): Promise<T> {
		const waiter = defer<T>();
		const messageHandler = (command: SerialAPICommand, params: Buffer) => {
			try {
				const result = handler(command, params);
				if (result !== undefined) {
					waiter.resolve(result);
				}
			} catch (err) {
				waiter.reject(err);
			}
		};
		this._protocol.on("message", messageHandler);
		const timer = new Timer(timeout, () =>
			waiter.reject(new Error("timeout"))
		);
		timer.start();
		let result;
		try {
			result = await waiter.promise;
		} finally {
			timer.stop();
			this._protocol.removeListener("message", messageHandler);
		}
		return result;
	}

	private async _internalZwSendData(
		nodeId: number,
		data: Buffer
	): Promise<boolean> {
		// TODO INS13954 4.3.3.1 Prevent sending to virtual nodes inside the controller/bridge itself
		// TODO INS13954 4.3.3.1.5 Implement checks for minimum/maximum payload size:
		// Transmit option             non-secure  S0 secure
		// TRANSMIT_OPTION_EXPLORE     46 bytes    26 bytes
		// TRANSMIT_OPTION_AUTO_ROUTE  48 bytes    28 bytes
		// TRANSMIT_OPTION_NO_ROUTE    54 bytes    34 bytes
		// Payload must be minimum 1 byte

		// TODO INS13954 4.3.3.1.6 Exception recovery: If a timeout occurs, it is important to call ZW_SendDataAbortto stop the sending of the frame

		console.log(
			"\tBEGIN ZW_SEND_DATA",
			`node=${nodeId}`,
			`payload=[${bufferToString(data)}]`
		);
		enum TransmitOptions {
			Ack = 0x01,
			AutoRoute = 0x04,
			Explore = 0x20, // reduce powerlevel by 6dB
		}

		const txOptions = TransmitOptions.Ack | TransmitOptions.AutoRoute;
		const funcId = this._getNextCallbackId();
		const params = Buffer.from([
			nodeId,
			data.length,
			...data,
			txOptions,
			funcId,
		]);

		const returnValue = await this._protocol.request(
			SerialAPICommand.FUNC_ID_ZW_SEND_DATA,
			params
		);
		if (returnValue.length !== 1) {
			throw new Error("invalid response from controller");
		}
		if (returnValue[0] === 0) {
			console.log("\tEND ZW_SEND_DATA", "FAILED");
			throw new Error(
				"command accepted by controller, but could not be delivered to network"
			);
		}

		// TODO: make sure that events cannot get lost (e.g. if promise resolve takes
		// a bit too long, and event was received before handler is attached)
		// Need a different architecture of this part for that, but don't know if the
		// current approach is what is needed anyway...

		// Reply expected, in the form of a ZW_SEND_DATA REQuest from controller to us
		const sendResult = await this._waitForREQ(
			ZW_SEND_DATA_TIMEOUT,
			(command: SerialAPICommand, params: Buffer) => {
				if (command !== SerialAPICommand.FUNC_ID_ZW_SEND_DATA) {
					return;
				}
				if (params.length < 2) {
					return;
				}
				// Spec: INS13954, 4.3.3.1.7
				if (params[0] !== funcId) {
					console.warn(`unexpected callback ID received, ignoring`);
					return;
				}
				const txStatus: TxStatus = params[1];
				if (txStatus !== 0) {
					// txStatus
					console.warn(
						`error sending command (received code ${txStatus} (${TxStatus[txStatus]}))`
					);
					return false;
				}
				if (params.length >= 4) {
					// DevKit 6.51+ added time measurement to response
					const transmitTime = params.readUInt16BE(2) * 10; // in ms
					console.log(
						`\tZW_SEND_DATA transmit time ${transmitTime}ms`
					);
				}
				return true;
			}
		);

		console.log("\tEND ZW_SEND_DATA", `sendResult=${sendResult}`);
		return sendResult;
	}

	private _getNextCallbackId(): number {
		this._callbackId++;
		if (this._callbackId === 0x100) {
			// Note: not 0, because that means we don't want feedback
			this._callbackId = 1;
		}
		return this._callbackId;
	}
}
