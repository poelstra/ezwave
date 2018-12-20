import { Timer } from "./util";
import * as stream from "stream";

export enum FrameType {
	ACK = 0x06,
	NAK = 0x15,
	CAN = 0x18,
	SOF = 0x01,
}

export enum DataType {
	REQ = 0x00,
	RES = 0x01,
}

export enum SerialAPICommand {
	FUNC_ID_SERIAL_API_GET_INIT_DATA                = 0x02,
	FUNC_ID_SERIAL_API_APPL_NODE_INFORMATION        = 0x03,
	FUNC_ID_APPLICATION_COMMAND_HANDLER             = 0x04,
	FUNC_ID_ZW_GET_CONTROLLER_CAPABILITIES          = 0x05,
	FUNC_ID_SERIAL_API_SET_TIMEOUTS                 = 0x06,
	FUNC_ID_SERIAL_API_GET_CAPABILITIES             = 0x07,
	FUNC_ID_SERIAL_API_SOFT_RESET                   = 0x08,
	FUNC_ID_ZW_SEND_NODE_INFORMATION                = 0x12,
	FUNC_ID_ZW_SEND_DATA                            = 0x13,
	FUNC_ID_ZW_GET_VERSION                          = 0x15,
	FUNC_ID_ZW_R_F_POWER_LEVEL_SET                  = 0x17,
	FUNC_ID_ZW_GET_RANDOM                           = 0x1c,
	FUNC_ID_ZW_MEMORY_GET_ID                        = 0x20,
	FUNC_ID_MEMORY_GET_BYTE                         = 0x21,
	FUNC_ID_ZW_READ_MEMORY                          = 0x23,
	FUNC_ID_ZW_SET_LEARN_NODE_STATE                 = 0x40,
	FUNC_ID_ZW_GET_NODE_PROTOCOL_INFO               = 0x41,
	FUNC_ID_ZW_SET_DEFAULT                          = 0x42,
	FUNC_ID_ZW_NEW_CONTROLLER                       = 0x43,
	FUNC_ID_ZW_REPLICATION_COMMAND_COMPLETE         = 0x44,
	FUNC_ID_ZW_REPLICATION_SEND_DATA                = 0x45,
	FUNC_ID_ZW_ASSIGN_RETURN_ROUTE                  = 0x46,
	FUNC_ID_ZW_DELETE_RETURN_ROUTE                  = 0x47,
	FUNC_ID_ZW_REQUEST_NODE_NEIGHBOR_UPDATE         = 0x48,
	FUNC_ID_ZW_APPLICATION_UPDATE                   = 0x49,
	FUNC_ID_ZW_ADD_NODE_TO_NETWORK                  = 0x4a,
	FUNC_ID_ZW_REMOVE_NODE_FROM_NETWORK             = 0x4b,
	FUNC_ID_ZW_CREATE_NEW_PRIMARY                   = 0x4c,
	FUNC_ID_ZW_CONTROLLER_CHANGE                    = 0x4d,
	FUNC_ID_ZW_SET_LEARN_MODE                       = 0x50,
	FUNC_ID_ZW_ASSIGN_SUC_RETURN_ROUTE              = 0x51,
	FUNC_ID_ZW_ENABLE_SUC                           = 0x52,
	FUNC_ID_ZW_REQUEST_NETWORK_UPDATE               = 0x53,
	FUNC_ID_ZW_SET_SUC_NODE_ID                      = 0x54,
	FUNC_ID_ZW_DELETE_SUC_RETURN_ROUTE              = 0x55,
	FUNC_ID_ZW_GET_SUC_NODE_ID                      = 0x56,
	FUNC_ID_ZW_REQUEST_NODE_NEIGHBOR_UPDATE_OPTIONS = 0x5a,
	FUNC_ID_ZW_EXPLORE_REQUEST_INCLUSION            = 0x5e,
	FUNC_ID_ZW_REQUEST_NODE_INFO                    = 0x60,
	FUNC_ID_ZW_REMOVE_FAILED_NODE_ID                = 0x61,
	FUNC_ID_ZW_IS_FAILED_NODE_ID                    = 0x62,
	FUNC_ID_ZW_REPLACE_FAILED_NODE                  = 0x63,
	FUNC_ID_ZW_GET_ROUTING_INFO                     = 0x80,
	FUNC_ID_SERIAL_API_SLAVE_NODE_INFO              = 0xA0,
	FUNC_ID_APPLICATION_SLAVE_COMMAND_HANDLER       = 0xA1,
	FUNC_ID_ZW_SEND_SLAVE_NODE_INFO                 = 0xA2,
	FUNC_ID_ZW_SEND_SLAVE_DATA                      = 0xA3,
	FUNC_ID_ZW_SET_SLAVE_LEARN_MODE                 = 0xA4,
	FUNC_ID_ZW_GET_VIRTUAL_NODES                    = 0xA5,
	FUNC_ID_ZW_IS_VIRTUAL_NODE                      = 0xA6,
	FUNC_ID_ZW_SET_PROMISCUOUS_MODE                 = 0xD0,
	FUNC_ID_PROMISCUOUS_APPLICATION_COMMAND_HANDLER = 0xD1,
}

export enum LineError {
	ChecksumFailed,
	ParamsTooShort,
	InvalidLength,
}

export interface SimplePacket {
	frameType: FrameType.ACK | FrameType.NAK | FrameType.CAN;
}

export interface DataPacket {
	frameType: FrameType.SOF;
	dataType: DataType;
	command: SerialAPICommand;
	params: Buffer;
}

/*export interface InvalidPacket {
	type: PacketType.Invalid;
	reason: InvalidPacketReason;
}*/

export type Packet = SimplePacket | DataPacket;

export function bufferToString(buffer: Buffer): string {
	return [...buffer].map((n) => n.toString(16).padStart(2, "0")).join(" ");
}

export function packetToString(packet: Packet): string {
	switch (packet.frameType) {
		case FrameType.ACK:
		case FrameType.NAK:
		case FrameType.CAN:
			return `<Packet ${FrameType[packet.frameType]}>`;
		case FrameType.SOF:
			const cmd = SerialAPICommand[packet.command] || `0x${packet.command.toString(16)}`;
			const params = `[${bufferToString(packet.params)}]`;
			return `<Packet DATA type=${DataType[packet.dataType]} cmd=${cmd} params=${params}>`;
	}
}

const FRAME_READ_TIMEOUT = 1500;

export class Codec extends stream.Duplex {
	private _buf = Buffer.alloc(0);
	private _timer: Timer;
	private _stream: stream.Duplex;

	public verbose: boolean = false;

	constructor(stream: stream.Duplex) {
		super({ objectMode: true });
		this._stream = stream;
		this._timer = new Timer(FRAME_READ_TIMEOUT, () => this._handleTimeout);
		this._stream.on("data", (chunk) => this._handleData(chunk));
	}

	public clear(): void {
		this._buf = Buffer.alloc(0);
		this._timer.stop();
	}

	public _write(packet: Packet, _encoding: string, callback: (error?: Error | null) => void): void {
		const buffer = this._encodePacket(packet);
		if (this.verbose) {
			console.log("\t\t>", buffer);
		}
		this._stream.write(buffer);
		callback();
	}

	public _read(size: number): void {
		/* no-op, will always simply push data whenever it's available on our source stream */
	}

	private _handleTimeout(): void {
		console.log("timeout waiting for packet");
		this.clear();
	}

	private _handleData(chunk: Buffer): void {
		if (this.verbose) {
			console.log("\t\t<", chunk);
		}
		this._buf = Buffer.concat([this._buf, chunk]);
		let packet;
		while (packet = this._decodePacket()) {
			this.push(packet);
		}
	}

	private _decodePacket(): Packet | undefined {
		while (this._buf.length > 0) {
			const frameType: FrameType = this._buf[0];
			switch (frameType) {
				case FrameType.ACK:
					this._buf = this._buf.slice(1);
					return { frameType };
				case FrameType.SOF:
					return this._decodeSOF();
				default:
					// Probably garbage byte, resync
					this._buf = this._buf.slice(1);
			}
		}
		return undefined;
	}

	private _decodeSOF(): Packet | undefined {
		//assert(this._buf[0] === FrameType.SOF);
		this._timer.start(); // INS12350 6.2.1 Data frame reception timeout

		// Decode packet length
		if (this._buf.length < 2) {
			return undefined;
		}
		const length = this._buf[1];
		if (length < 4) {
			this.clear();
			this.emit("lineError", LineError.InvalidLength);
			return;
		}

		// Wait until we have the full packet, including checksum
		if (this._buf.length < length + 2) {
			return undefined;
		}

		// Cut packet from buffer.
		// We're going to discard it completely, even if checksum
		// failed (because it's more likely that there was a single
		// bit error, than a random SOF start byte).
		const packet = this._buf.slice(0, length + 2);
		this._buf = this._buf.slice(length + 2);
		this._timer.stop();

		// Verify checksum
		let ist = 0xff;
		for (let i = 1; i < length + 1; i++) {
			ist = ist ^ packet[i];
		}
		const soll = packet[length + 1];
		if (ist !== soll) {
			this.emit("lineError", LineError.ChecksumFailed);
			return;
		}

		const dataType: DataType = packet[2];
		const command: SerialAPICommand = packet[3];
		const params = packet.slice(4, length + 1);
		if (params.length < 1) {
			// INS12350 5.4.5 Serial API Command Parameters
			this.emit("lineError", LineError.ParamsTooShort);
			return;
		}

		return {
			frameType: FrameType.SOF,
			dataType,
			command,
			params,
		};
	}

	private _encodePacket(packet: Packet): Buffer {
		switch (packet.frameType) {
			case FrameType.ACK:
				return Buffer.from([FrameType.ACK]);
			case FrameType.NAK:
				return Buffer.from([FrameType.NAK]);
			case FrameType.CAN:
				return Buffer.from([FrameType.CAN]);
			case FrameType.SOF:
				const length = packet.params.length + 3;
				if (length > 255) {
					throw new Error("packet too long");
				}
				if (packet.dataType !== DataType.REQ && packet.dataType !== DataType.RES) {
					throw new Error("invalid data type");
				}
				if (packet.params.length < 1) {
					// INS12350 5.4.5 Serial API Command Parameters
					throw new Error("params too short");
				}
				// TODO verify command?
				const buffer = Buffer.concat([
					Buffer.from([FrameType.SOF, length, packet.dataType, packet.command]),
					packet.params,
					Buffer.alloc(1), // checksum
				]);
				let checksum = 0xff;
				for (let i = 1; i < length + 1; i++) {
					checksum = checksum ^ buffer[i];
				}
				buffer[length + 1] = checksum;
				return buffer;
			default:
				throw new Error("cannot encode packet: invalid type");
		}
	}
}
