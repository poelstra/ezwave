import { Parser } from "binary-parser";
import * as Queue from "promise-queue";

import { Protocol } from "./protocol";
import { packetToString, SerialAPICommand, bufferToString, DataPacket, DataType } from "./codec";
import { defer, Timer } from "./util";
import { EventEmitter } from "events";
import CommandClasses from "../generated/CommandClasses";

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
	applVersion: number;
	capabilities: number;
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

export class Node {
	private _host: Host;
	private _id: number;

	constructor(host: Host, id: number) {
		this._host = host;
		this._id = id;
	}
}

export class Command {
	public commandClass: number;
	public command: number;
	public payload: Buffer;

	constructor(commandClass: number, command: number, payload?: Buffer | number[]) {
		this.commandClass = commandClass;
		this.command = command;
		this.payload = Buffer.isBuffer(payload) ? payload : Buffer.from(payload || []);
	}

	public getBuffer(): Buffer {
		// TODO 2-digit class
		return Buffer.from([
			this.commandClass,
			this.command,
			...(this.payload || [])
		]);
	}
}

export class BinarySwitchCommand extends Command {
	constructor(command: number, payload?: Buffer | number[]) {
		super(CommandClasses.COMMAND_CLASS_SWITCH_BINARY, command, payload);
	}
}

export class BinarySwitchGetCommand extends BinarySwitchCommand {
	constructor(payload?: Buffer | number[]) {
		super(BINARY_SWITCH_GET, payload);
	}
}

export class BinarySwitchGetV1Command extends BinarySwitchGetCommand {
	constructor(payload?: Buffer | number[]) {
		super(payload);
	}
}

const COMMAND_CLASS_BASIC = 0x20;
const COMMAND_CLASS_BINARY = 0x25;
const BINARY_SWITCH_SET = 0x01;
const BINARY_SWITCH_GET = 0x02;
const BINARY_SWITCH_REPORT = 0x03;

/*export class BinarySwitchGetV1Command extends Command {
	constructor() {
		super(COMMAND_CLASS_BASIC, GET);
	}
}

export class BinarySwitchReportV1Command extends Command {
	constructor(currentValue: boolean) {
		super(COMMAND_CLASS_BASIC, REPORT, [currentValue ? 0xFF : 0x00]);
	}
}*/

const MAX_NODES = 232; // Maximum number of nodes in one Z-Wave network
const ZW_SEND_DATA_TIMEOUT = 10 * 1000;

export class Host extends EventEmitter {
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

		this._protocol.on("event", (packet) => this._handleEvent(packet));
		this._protocol.on("reset", () => console.log("RESET"));
	}

	public async init(): Promise<void> {
		// INS12350 6.1.2 Without hard reset
		// (Not necessary on USB device)
		//await this._protocol.sendRaw({ frameType: FrameType.NAK });
		//await this._protocol.request(SerialAPICommand.FUNC_ID_SERIAL_API_SOFT_RESET);
		//await delay(1500);

		const caps = await this.serialGetCapabilities();
		this._capabilities = caps;
		console.debug(`Initialized device with application version ${caps.applVersion}.${caps.applRevision}`);

		this._initData = await this.serialGetInitData();
		if (this._initData.nodes.length > 0) {
			console.info("Nodes found:")
			for (let i = 0; i < MAX_NODES; i++) {
				const hasNode = (this._initData.nodes[Math.trunc(i / 8)] & Math.pow(2, i % 8)) > 0;
				if (hasNode) {
					console.log("\tNode", i);
					this._nodes.set(i, new Node(this, i));
				}
			}
		}
	}

	public isController(): boolean {
		return this._initData && (this._initData.capabilities & NodeCapabilityFlags.SlaveAPI) === 0 || false;
	}

	public async serialGetCapabilities(): Promise<SerialAPICapabilities> {
		return this._requests.add(async () => {
			const response = await this._protocol.request(SerialAPICommand.FUNC_ID_SERIAL_API_GET_CAPABILITIES);
			return new Parser()
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
				.parse(response) as any as SerialAPICapabilities;
		});
	}

	public async serialGetInitData(): Promise<SerialAPIInitData> {
		return this._requests.add(async () => {
			const response = await this._protocol.request(SerialAPICommand.FUNC_ID_SERIAL_API_GET_INIT_DATA);
			return new Parser()
				.endianess("big")
				.uint8("applVersion")
				.uint8("capabilities")
				.uint8("nodesLength")
				.array("nodes", {
					type: "uint8",
					length: "nodesLength",
				})
				.uint8("chipType")
				.uint8("chipVersion")
				.parse(response) as any as SerialAPIInitData;
		});
	}

	private _handleEvent(packet: DataPacket): void {
		console.log("EVENT", packetToString(packet));
		if (packet.command === SerialAPICommand.FUNC_ID_APPLICATION_COMMAND_HANDLER) {
			const payload = packet.params.slice(3, 3 + packet.params[2]);
			const isSimpleClass = payload[0] <= 0xF0;
			const event = {
				rxStatus: packet.params[0],
				sourceNode: packet.params[1],
				commandClass: isSimpleClass ? payload[0] : payload.readUInt16BE(0),
				command: payload[isSimpleClass ? 1 : 2],
				payload: payload.slice(isSimpleClass ? 2 : 3),
			};
			this.emit("event", event);
		}
	}

	private async _waitForREQ<T>(timeout: number, handler: (packet: DataPacket) => T | undefined): Promise<T> {
		const waiter = defer<T>();
		const eventHandler = (packet: DataPacket) => {
			try {
				const result = handler(packet);
				if (result !== undefined) {
					waiter.resolve(result);
				}
			} catch (err) {
				waiter.reject(err);
			}
		};
		this._protocol.on("event", eventHandler);
		const timer = new Timer(timeout, () => waiter.reject(new Error("timeout")));
		timer.start();
		let result;
		try {
			result = await waiter.promise;
		} finally {
			timer.stop();
			this._protocol.removeListener("event", eventHandler);
		}
		return result;
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

	public async sendCommand(nodeId: number, command: Command): Promise<void> {
		const result = this._requests.add(() => this._internalZwSendData(nodeId, command.getBuffer()));
		if (!result) {
			throw new Error("command failed");
		}
	}

	public async sendCommandRequest(nodeId: number, command: Command): Promise<boolean> {
		return this._requests.add(() => this._internalZwSendData(nodeId, command.getBuffer()));
	}

	private async _internalZwSendData(nodeId: number, data: Buffer): Promise<boolean> {
		console.log("BEGIN ZW_SEND_DATA", nodeId, bufferToString(data));
		// TODO Verify maximum payload etc
		enum TransmitOptions {
			Ack = 0x01,
			AutoRoute = 0x04,
			Explore = 0x20,
		};
		const txOptions = TransmitOptions.Ack | TransmitOptions.AutoRoute | TransmitOptions.Explore;
		const funcId = this._getNextCallbackId();
		const params = Buffer.from([
			nodeId,
			data.length,
			...data,
			txOptions,
			funcId,
		]);

		const returnValue = await this._protocol.request(SerialAPICommand.FUNC_ID_ZW_SEND_DATA, params);
		if (returnValue.length !== 1) {
			throw new Error("invalid response");
		}
		if (returnValue[0] === 0) {
			console.log("END ZW_SEND_DATA", "FAILED");
			throw new Error("command accepted by controller, but could not deliver to network");
		}

		// TODO: make sure that events cannot get lost (e.g. if promise resolve takes
		// a bit too long, and event was received before handler is attached)
		// Need a different architecture of this part for that, but don't know if the
		// current approach is what is needed anyway...

		// Reply expected, in the form of a ZW_SEND_DATA REQuest from controller to us
		const sendResult = await this._waitForREQ(ZW_SEND_DATA_TIMEOUT, (packet: DataPacket) => {
			if (packet.command !== SerialAPICommand.FUNC_ID_ZW_SEND_DATA) {
				return;
			}
			const params = packet.params;
			if (params.length < 2) {
				return;
			}
			// Spec: INS13954, 4.3.3.1.7
			if (params[0] !== funcId) {
				console.warn(`unexpected callback ID received, ignoring`);
				return;
			}
			const txStatus: TxStatus = params[1];
			if (txStatus !== 0) { // txStatus
				console.warn(`error sending command (received code ${txStatus} (${TxStatus[txStatus]}))`);
				return false;
			}
			if (params.length <= 4) {
				// DevKit 6.51+ added time measurement to response
				const transmitTime = params.readUInt16BE(2) * 10; // in ms
				console.info(`ZW_SEND_DATA transmit time ${transmitTime}ms`);
			}
			return true;
		});

		console.log("END ZW_SEND_DATA", sendResult);
		return sendResult;
	}

	public async zwGetVersion(): Promise<Buffer> {
		return this._requests.add(async () => {
			return await this._protocol.request(SerialAPICommand.FUNC_ID_ZW_GET_VERSION);
		});
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