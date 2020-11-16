/**
 * Serial stream packetizer.
 *
 * Converts protocol packets (ACK, CAN, NAK and SOF data frames) into
 * low-level byte stream and vice-versa.
 * Detects line-errors and low-level data frame read timeouts, but
 * leaves handling of the protocol statemachine to a higher level
 * layer (protocol.ts).
 */

// TODO It's probably better to convert this class into a
// pair of simple functions that either convert a packet
// into a Buffer, or a Buffer into a packet.
// However, when a SOF (Start Of Frame) byte is encountered,
// a timeout timer needs to be started, so decoding is not
// entirely stateless.

import * as stream from "stream";
import { Timer } from "../common/util";

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

export enum LineError {
	ChecksumFailed,
	ParamsTooShort,
	InvalidLength,
	ReadDataFrameTimeout,
}

export interface SimplePacket {
	frameType: FrameType.ACK | FrameType.NAK | FrameType.CAN;
}

export interface DataPacket {
	frameType: FrameType.SOF;
	dataType: DataType;
	command: number;
	params: Buffer;
}

/**
 * Throw whenever host-side passes invalid data to
 * be sent to chip. This is always a programming error
 * (e.g. because higher layer failed to properly validate
 * its own input arguments).
 */
export class CodecError extends Error {}

export type Packet = SimplePacket | DataPacket;

const FRAME_READ_TIMEOUT = 1500; // INS12350 6.2.1 Data frame reception timeout

export interface CodecEvents {
	on(event: "lineError", listener: (lineError: LineError) => void): this;
}

export class Codec extends stream.Duplex implements CodecEvents {
	private _buf = Buffer.alloc(0);
	private _timer: Timer;
	private _stream: stream.Duplex;

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

	public _write(
		packet: Packet,
		_encoding: string,
		callback: (error?: Error | null) => void
	): void {
		const buffer = this._encodePacket(packet);
		this._stream.write(buffer, callback);
	}

	public _read(size: number): void {
		/* no-op, will always simply push data whenever it's available on our source stream */
	}

	private _handleTimeout(): void {
		this.clear();
		this.emit("lineError", LineError.ReadDataFrameTimeout);
	}

	private _handleData(chunk: Buffer): void {
		this._buf = Buffer.concat([this._buf, chunk]);
		let packet;
		while ((packet = this._decodePacket())) {
			this.push(packet);
		}
	}

	private _decodePacket(): Packet | undefined {
		while (this._buf.length > 0) {
			const frameType: FrameType = this._buf[0];
			switch (frameType) {
				case FrameType.ACK:
				case FrameType.NAK:
				case FrameType.CAN:
					this._buf = this._buf.slice(1);
					return { frameType };
				case FrameType.SOF:
					return this._decodeSOF();
				default:
					// Probably garbage byte, skip to the next one
					this._buf = this._buf.slice(1);
			}
		}
		return undefined;
	}

	private _decodeSOF(): Packet | undefined {
		//assert(this._buf[0] === FrameType.SOF);

		// INS12350 6.2.1 Data frame reception timeout
		// Start receive timeout timer upon receiving the
		// SOF byte. Note that we will come here multiple
		// times if reception happens in chunks, but the
		// timer is only really started on the first iteration.
		this._timer.start();

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
		// And in case there was a random byte that looked like SOF,
		// we'll resync later anyway.
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
		const command: number = packet[3];
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
					throw new CodecError("packet too long");
				}
				if (
					packet.dataType !== DataType.REQ &&
					packet.dataType !== DataType.RES
				) {
					throw new CodecError("invalid data type");
				}
				if (packet.params.length < 1) {
					// INS12350 5.4.5 Serial API Command Parameters
					throw new CodecError("params too short");
				}
				const buffer = Buffer.concat([
					Buffer.from([
						FrameType.SOF,
						length,
						packet.dataType,
						packet.command,
					]),
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
				throw new CodecError("cannot encode packet: invalid type");
		}
	}
}
