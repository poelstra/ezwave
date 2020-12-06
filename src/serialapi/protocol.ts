import {
	Framer,
	DataType,
	Frame,
	FrameType,
	LineError,
	DataFrame,
	SimpleFrame,
	IFramer,
} from "./framer";
import { EventEmitter } from "events";
import * as Queue from "promise-queue";
import { Timer, delay, Deferred, defer, bufferToString } from "../common/util";

export enum SerialAPICommand {
	FUNC_ID_SERIAL_API_GET_INIT_DATA = 0x02,
	FUNC_ID_SERIAL_API_APPL_NODE_INFORMATION = 0x03,
	FUNC_ID_APPLICATION_COMMAND_HANDLER = 0x04,
	FUNC_ID_ZW_GET_CONTROLLER_CAPABILITIES = 0x05,
	FUNC_ID_SERIAL_API_SET_TIMEOUTS = 0x06,
	FUNC_ID_SERIAL_API_GET_CAPABILITIES = 0x07,
	FUNC_ID_SERIAL_API_SOFT_RESET = 0x08,
	FUNC_ID_ZW_SEND_NODE_INFORMATION = 0x12,
	FUNC_ID_ZW_SEND_DATA = 0x13,
	FUNC_ID_ZW_GET_VERSION = 0x15,
	FUNC_ID_ZW_R_F_POWER_LEVEL_SET = 0x17,
	FUNC_ID_ZW_GET_RANDOM = 0x1c,
	FUNC_ID_ZW_MEMORY_GET_ID = 0x20,
	FUNC_ID_MEMORY_GET_BYTE = 0x21,
	FUNC_ID_ZW_READ_MEMORY = 0x23,
	FUNC_ID_ZW_SET_LEARN_NODE_STATE = 0x40,
	FUNC_ID_ZW_GET_NODE_PROTOCOL_INFO = 0x41,
	FUNC_ID_ZW_SET_DEFAULT = 0x42,
	FUNC_ID_ZW_NEW_CONTROLLER = 0x43,
	FUNC_ID_ZW_REPLICATION_COMMAND_COMPLETE = 0x44,
	FUNC_ID_ZW_REPLICATION_SEND_DATA = 0x45,
	FUNC_ID_ZW_ASSIGN_RETURN_ROUTE = 0x46,
	FUNC_ID_ZW_DELETE_RETURN_ROUTE = 0x47,
	FUNC_ID_ZW_REQUEST_NODE_NEIGHBOR_UPDATE = 0x48,
	FUNC_ID_ZW_APPLICATION_UPDATE = 0x49,
	FUNC_ID_ZW_ADD_NODE_TO_NETWORK = 0x4a,
	FUNC_ID_ZW_REMOVE_NODE_FROM_NETWORK = 0x4b,
	FUNC_ID_ZW_CREATE_NEW_PRIMARY = 0x4c,
	FUNC_ID_ZW_CONTROLLER_CHANGE = 0x4d,
	FUNC_ID_ZW_SET_LEARN_MODE = 0x50,
	FUNC_ID_ZW_ASSIGN_SUC_RETURN_ROUTE = 0x51,
	FUNC_ID_ZW_ENABLE_SUC = 0x52,
	FUNC_ID_ZW_REQUEST_NETWORK_UPDATE = 0x53,
	FUNC_ID_ZW_SET_SUC_NODE_ID = 0x54,
	FUNC_ID_ZW_DELETE_SUC_RETURN_ROUTE = 0x55,
	FUNC_ID_ZW_GET_SUC_NODE_ID = 0x56,
	FUNC_ID_ZW_REQUEST_NODE_NEIGHBOR_UPDATE_OPTIONS = 0x5a,
	FUNC_ID_ZW_EXPLORE_REQUEST_INCLUSION = 0x5e,
	FUNC_ID_ZW_REQUEST_NODE_INFO = 0x60,
	FUNC_ID_ZW_REMOVE_FAILED_NODE_ID = 0x61,
	FUNC_ID_ZW_IS_FAILED_NODE_ID = 0x62,
	FUNC_ID_ZW_REPLACE_FAILED_NODE = 0x63,
	FUNC_ID_ZW_GET_ROUTING_INFO = 0x80,
	FUNC_ID_SERIAL_API_SLAVE_NODE_INFO = 0xa0,
	FUNC_ID_APPLICATION_SLAVE_COMMAND_HANDLER = 0xa1,
	FUNC_ID_ZW_SEND_SLAVE_NODE_INFO = 0xa2,
	FUNC_ID_ZW_SEND_SLAVE_DATA = 0xa3,
	FUNC_ID_ZW_SET_SLAVE_LEARN_MODE = 0xa4,
	FUNC_ID_ZW_GET_VIRTUAL_NODES = 0xa5,
	FUNC_ID_ZW_IS_VIRTUAL_NODE = 0xa6,
	FUNC_ID_ZW_SET_PROMISCUOUS_MODE = 0xd0,
	FUNC_ID_PROMISCUOUS_APPLICATION_COMMAND_HANDLER = 0xd1,
}

function packetToString(packet: Frame): string {
	switch (packet.frameType) {
		case FrameType.ACK:
		case FrameType.NAK:
		case FrameType.CAN:
			return `<Packet ${FrameType[packet.frameType]}>`;
		case FrameType.SOF:
			const cmd =
				SerialAPICommand[packet.command] ||
				`0x${packet.command.toString(16)}`;
			const params = `[${bufferToString(packet.params)}]`;
			return `<Packet DATA type=${
				DataType[packet.dataType]
			} cmd=${cmd} params=${params}>`;
	}
}

const ACK_PACKET: SimpleFrame = { frameType: FrameType.ACK };
const NAK_PACKET: SimpleFrame = { frameType: FrameType.NAK };

function createDataPacket(
	command: SerialAPICommand,
	params?: Buffer
): DataFrame {
	return {
		frameType: FrameType.SOF,
		dataType: DataType.REQ,
		command,
		params: params ? params : Buffer.alloc(1),
	};
}

const ACK_TIMEOUT = 1600; // INS12350 6.2.2 Data frame delivery timeout
const REQ_TIMEOUT = 5000; // TODO: random value for now, should depend on specific call? See INS12350 6.4.3 Missing callbacks
const MAX_RETRANSMISSIONS = 3;

const HARD_RESET_DELAY = 500; // INS12350 6.1.1 With hard reset
const SOFT_RESET_DELAY = 1500; // INS12350 6.1.2 Without hard reset

export interface Protocol {
	on(
		event: "event",
		listener: (command: number, params: Buffer) => void
	): this;
}

export type HardResetHandler = () =>
	| Framer
	| Promise<Framer>
	| void
	| undefined;

export class Protocol extends EventEmitter {
	private _codec!: IFramer;
	private _hardResetHandler: HardResetHandler | undefined;
	private _invalidPackets = 0;
	private _requests = new Queue(1, Infinity);
	private _ackResult: ((packet: SimpleFrame) => void) | undefined;
	private _ackTimer: Timer;
	private _reqResult: Deferred<DataFrame> | undefined;
	private _reqPacket: DataFrame | undefined;
	private _reqTimer: Timer;

	constructor(codec: IFramer, hardResetHandler?: HardResetHandler) {
		super();

		this._hardResetHandler = hardResetHandler;
		this._assignCodec(codec);

		if (this._hardResetHandler) {
			// Assume port was hard-resetted, so we only need to
			// apply the 'boot delay'
			this._requests.add(() => delay(HARD_RESET_DELAY));
		} else {
			// Assume port was attached, but because no hard-reset
			// was possible, wait for the soft-reset delay in case
			// the device was freshly booted.
			this._requests.add(() => delay(SOFT_RESET_DELAY));
		}

		this._ackTimer = new Timer(ACK_TIMEOUT, () => this._handleAckTimeout());
		this._reqTimer = new Timer(REQ_TIMEOUT, () => this._handleReqTimeout());
	}

	private _assignCodec(framer: IFramer): void {
		if (this._codec) {
			this._codec.off("frame", this._handleFrame);
			this._codec.off("lineError", this._handleLineError);
			this._codec.off("close", this._handleClose);
		}
		this._codec = framer;
		this._codec.on("frame", this._handleFrame);
		this._codec.on("lineError", this._handleLineError);
		this._codec.on("close", this._handleClose);
	}

	/**
	 * Reset ZWave chip using hard or soft reset as necessary.
	 */
	public async reset(): Promise<void> {
		if (this._hardResetHandler) {
			return this._hardReset();
		} else {
			return this._softReset();
		}
	}

	public async send(cmd: SerialAPICommand, params?: Buffer): Promise<void> {
		const packet = createDataPacket(cmd, params);
		return this._requests.add(() => this._send(packet));
	}

	public async request(
		cmd: SerialAPICommand,
		params?: Buffer
	): Promise<Buffer> {
		const request: DataFrame = {
			frameType: FrameType.SOF,
			dataType: DataType.REQ,
			command: cmd,
			params: params ? params : Buffer.alloc(1),
		};
		return this._requests.add(
			async (): Promise<Buffer> => {
				console.log(
					"\tBEGIN REQUEST",
					`cmd=${cmd}`,
					`params=[${params ? bufferToString(params) : ""}]`
				);
				this._reqResult = defer<DataFrame>();
				const result = this._reqResult.promise;
				this._reqPacket = request;
				this._reqTimer.start();
				await this._send(request);
				const resultPacket = await result;
				console.log(
					"\tEND REQUEST",
					`result=[${bufferToString(resultPacket.params)}]`
				);
				return resultPacket.params;
			}
		);
	}

	private _handleFrame = (packet: Frame): void => {
		console.log("\t\tRECV", packetToString(packet));
		switch (packet.frameType) {
			case FrameType.ACK:
			case FrameType.NAK:
			case FrameType.CAN:
				// Retransmissions are handled in _send()
				if (this._ackResult) {
					this._ackResult(packet);
					this._ackResult = undefined;
					this._ackTimer.stop();
				}
				break;
			case FrameType.SOF:
				switch (packet.dataType) {
					case DataType.REQ:
						this._sendRaw(ACK_PACKET);
						this.emit("event", packet.command, packet.params);
						break;
					case DataType.RES:
						this._sendRaw(ACK_PACKET);
						if (
							this._reqResult &&
							this._reqPacket &&
							this._reqPacket.command === packet.command
						) {
							this._reqResult.resolve(packet);
							this._reqResult = undefined;
							this._reqPacket = undefined;
							this._reqTimer.stop();
						} else {
							console.warn(
								"WARN",
								"received response, but no corresponding request found"
							);
						}
						break;
					default:
					// INS12350 5.4.3 Type
					// A receiving end MUST ignore reserved Type values
				}
				break;
		}
	};

	private _handleLineError = (lineError: LineError): void => {
		console.warn("WARN", LineError[lineError]);
		this._sendRaw(NAK_PACKET);

		// INS12350 6.4.2 Persistent CRC errors
		this._invalidPackets++;
		if (this._invalidPackets === 3) {
			this._hardReset(); // TODO Catch rejected promise, convert to error event?
			return;
		}
	};

	private _handleClose = (): void => {
		if (!this._hardResetHandler) {
			// Port is closed, but we can only do a soft-reset,
			// for which we'd need to send data. Stuck.
			// TODO Emit error/close event?
			return;
		}
		this._hardReset(); // TODO Catch rejected promise, convert to error event?
	};

	private _handleAckTimeout(): void {
		console.warn("WARN", "ACK timeout");
		if (this._ackResult) {
			// INS12350 6.2.2
			// The loss of a Data frame MUST be treated as the reception of a NAK frame; refer to 6.3.
			this._ackResult(NAK_PACKET);
			this._ackResult = undefined;
		}
	}

	private _handleReqTimeout(): void {
		console.warn("WARN", "REQ timeout");
		if (this._reqResult) {
			this._reqResult.reject(new Error("timeout"));
			this._reqResult = undefined;
		}
	}

	private async _send(packet: DataFrame): Promise<void> {
		for (let i = 0; i <= MAX_RETRANSMISSIONS; i++) {
			const result = await this._sendDataAndWaitForACK(packet);
			if (result.frameType === FrameType.ACK) {
				// Done
				return;
			}
			// Retransmit after waiting period
			// TODO To speed up retransmissions, it is allowed to subtract
			// any time already passed waiting for the ACK from this timeout.
			await delay(100 + i * 1000);
		}
		this.reset();
	}

	private async _sendDataAndWaitForACK(
		packet: DataFrame
	): Promise<SimpleFrame> {
		return new Promise<SimpleFrame>((resolve) => {
			if (this._ackResult) {
				throw new Error(
					"internal error: previous request still pending"
				);
			}
			this._ackTimer.start();
			this._ackResult = resolve;
			this._sendRaw(packet);
		});
	}

	private _sendRaw(frame: Frame): void {
		console.log("\t\tSEND", packetToString(frame));
		this._codec.send(frame);
	}

	private async _hardReset(): Promise<void> {
		if (!this._hardResetHandler) {
			throw new Error("cannot hard reset: not available");
		}

		const newCodec = await this._hardResetHandler();
		if (newCodec && newCodec !== this._codec) {
			this._assignCodec(newCodec);
		}

		await delay(HARD_RESET_DELAY);
	}

	private async _softReset(): Promise<void> {
		// INS12350 6.1.2 Without hard reset
		// Warning: when sent to a USB ZWave device, this will trigger a USB disconnect,
		// and will cause the underlying file descriptor to be closed.
		await this._sendRaw(NAK_PACKET);
		await this._sendRaw(
			createDataPacket(SerialAPICommand.FUNC_ID_SERIAL_API_SOFT_RESET)
		);
		await delay(SOFT_RESET_DELAY);
	}
}
