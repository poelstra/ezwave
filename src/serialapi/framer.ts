/**
 * Z-Wave Serial API stream framing.
 *
 * Converts protocol frames (ACK, CAN, NAK and data frames) into
 * low-level byte stream and vice-versa.
 */

import debug from "debug";
import { EventEmitter } from "events";
import * as stream from "stream";
import { promisify } from "util";
import { bufferToString, Timer } from "../common/util";

const log = debug("zwave:framer");
const logData = log.extend("data");

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

export enum FrameError {
	/**
	 * Unexpected data bytes received. Only emitted on the first
	 * unexpected byte in a sequence, until a valid frame is received.
	 * Note: a single ACK/NAK/CAN is considered a valid frame.
	 */
	SyncLost,

	/**
	 * Invalid data frame: data frame length too small.
	 *
	 * Typically emitted when length byte is invalid, but can also be
	 * emitted when EOF is received while parsing a SOF frame.
	 */
	FrameTooSmall,

	/**
	 * Invalid data frame: checksum mismatch.
	 */
	ChecksumFailed,

	/**
	 * Invalid data frame: unknown data type, should be REQ or RES.
	 */
	UnknownDataType,

	/**
	 * Invalid data frame: timeout waiting for full frame to be received.
	 */
	ReadDataFrameTimeout,
}

export interface SimpleFrame {
	frameType: FrameType.ACK | FrameType.NAK | FrameType.CAN;
}

export interface DataFrame {
	frameType: FrameType.SOF;
	dataType: DataType;
	command: number;
	params: Buffer;
}

/**
 * Thrown whenever host-side passes invalid data to
 * be sent to chip. This is always a programming error
 * (e.g. because higher layer failed to properly validate
 * its own input arguments).
 *
 * This error is not thrown when invalid data is received
 * from the Z-Wave chip, as it could have been damaged by
 * e.g. noise, or newer version of the protocol.
 */
export class FramerError extends Error {}

export type Frame = SimpleFrame | DataFrame;

const FRAME_READ_TIMEOUT = 1500; // INS12350 6.2.1 Data frame reception timeout

const ACK_FRAME = Buffer.from([FrameType.ACK]);
const NAK_FRAME = Buffer.from([FrameType.NAK]);
const CAN_FRAME = Buffer.from([FrameType.CAN]);

/**
 * Framer interface.
 */
export interface IFramer extends EventEmitter {
	/**
	 * Valid frame received.
	 */
	on(event: "frame", listener: (frame: Frame) => void): this;

	/**
	 * Frame error occurred.
	 * This is a non-fatal error, but the protocol should handle it
	 * to correctly re-sync.
	 */
	on(event: "frameError", listener: (frameError: FrameError) => void): this;

	/**
	 * Source stream has indicated end-of-file.
	 * No frames will be emitted from the framer afterwards.
	 * Only emitted when the source stream cleanly ended its stream,
	 * i.e. not in case it is errored or prematurely closed.
	 */
	on(event: "end", listener: () => void): this;

	/**
	 * Framer experienced a fatal error, typically because source
	 * stream emitted an error.
	 * No further frames will be emitted from this point, and the
	 * framer will be closed.
	 *
	 * Note that frame send errors are returned to the caller.
	 */
	on(event: "error", listener: (err: Error) => void): this;

	/**
	 * Framer is closed.
	 *
	 * No further events will be emitted, and no frames can
	 * be sent anymore.
	 * This will event will also be emitted after an "error" event.
	 */
	on(event: "close", listener: () => void): this;

	/**
	 * Send frame to serial API stream.
	 */
	send(frame: Frame): Promise<void>;

	/**
	 * Close framer.
	 *
	 * This will issue an end to the serial API stream.
	 */
	close(): Promise<void>;
}

/**
 * Events emitted from Framer.
 */
export interface Framer {
	on(event: "frameError", listener: (frameError: FrameError) => void): this;
	on(event: "frame", listener: (frame: Frame) => void): this;
	on(event: "error", listener: (err: Error) => void): this;
	on(event: "end", listener: () => void): this;
	on(event: "close", listener: () => void): this;
}

enum FramerState {
	Open,
	Closing,
	Closed,
}

function frameToString(frame: Frame): string {
	if (frame.frameType === FrameType.SOF) {
		return `<Frame ${FrameType[frame.frameType]} type=${
			DataType[frame.dataType]
		} command=${frame.command} params=[${bufferToString(frame.params)}]>`;
	} else {
		return `<Frame ${FrameType[frame.frameType]}>`;
	}
}

/**
 * Z-Wave Serial API stream framer.
 *
 * Converts protocol frames (ACK, CAN, NAK and data frames) into
 * low-level byte stream and vice-versa.
 */
export class Framer extends EventEmitter implements IFramer {
	private _buf = Buffer.alloc(0);
	private _timer: Timer;
	private _stream: stream.Duplex;
	private _inSync: boolean = true;
	private _writer: (chunk: Buffer) => Promise<void>;
	private _state: FramerState = FramerState.Open;
	private _errored: boolean = false; // true when we emitted an "error" event already
	private _ended: boolean = false; // true when we emitted an "end" event

	/**
	 * Construct new framer.
	 *
	 * @param stream Serial port byte stream.
	 */
	constructor(stream: stream.Duplex) {
		super();
		this._stream = stream;
		this._timer = new Timer(FRAME_READ_TIMEOUT, () =>
			this._handleTimeout()
		);
		this._stream.on("data", (chunk) => this._handleData(chunk));
		this._stream.on("end", () => this._handleEnd());
		this._stream.on("close", () => this._handleClose());
		this._stream.on("error", (err: Error) => this._handleError(err));
		this._writer = promisify(this._stream.write).bind(this._stream);
		log("constructed");
	}

	public async send(frame: Frame): Promise<void> {
		if (this._state !== FramerState.Open) {
			throw new FramerError("cannot send frame: not open");
		}
		if (logData.enabled) {
			logData(`send ${frameToString(frame)}`);
		}
		const buffer = this._encodeFrame(frame);
		await this._writer(buffer);
	}

	public async close(): Promise<void> {
		if (this._state !== FramerState.Open) {
			throw new FramerError("cannot close framer: not open");
		}
		log("closing");
		this._state = FramerState.Closing;
		// Tell stream we'll no longer be sending stuff
		if (!this._stream.destroyed) {
			if (!this._errored) {
				await new Promise((resolve) => this._stream.end(resolve));
			} else {
				this._stream.destroy();
			}
		}
		// Stream should emit end, but not all implementations do,
		// so let's make sure to emit an error for the possibly left
		// unprocessed data.
		this._clearAndEmitFrameTooSmallIfNecessary();
		this._state = FramerState.Closed;
		log("close");
		this._safeEmit("close");
	}

	private _clear(): void {
		this._buf = Buffer.alloc(0);
		this._timer.stop();
	}

	private _clearAndEmitFrameTooSmallIfNecessary() {
		if (this._buf.length > 0) {
			// Data can only remain in buffer when we're waiting for
			// further data to arrive for a data frame.
			// Indicate a truncated frame.
			log("frameError", FrameError[FrameError.FrameTooSmall]);
			this._safeEmit("frameError", FrameError.FrameTooSmall);
		}
		this._clear();
	}

	private _end(): void {
		// "end" event signals 'clean' end-of-file, so only emit it
		// when this is still the case.
		if (
			this._ended ||
			this._errored ||
			this._state === FramerState.Closed
		) {
			return;
		}
		this._ended = true;
		this._clearAndEmitFrameTooSmallIfNecessary();
		log("end");
		this._safeEmit("end");
	}

	private _handleTimeout(): void {
		this._clear();
		log("frameError", FrameError[FrameError.ReadDataFrameTimeout]);
		this._safeEmit("frameError", FrameError.ReadDataFrameTimeout);
	}

	private _handleData(chunk: Buffer): void {
		if (this._state !== FramerState.Open) {
			// Ignore further emits when we're closing
			return;
		}
		this._buf = Buffer.concat([this._buf, chunk]);
		let frame;
		while ((frame = this._decodeFrame())) {
			if (logData.enabled) {
				logData("receive", frameToString(frame));
			}
			this._safeEmit("frame", frame);
		}
	}

	private _handleEnd(): void {
		this._end();
	}

	private _handleClose(): void {
		if (this._state === FramerState.Open) {
			this.close().catch(() => {
				/* ignore follow-up errors */
			});
		}
	}

	private _handleError(err: Error): void {
		if (this._errored) {
			return;
		}
		this._errored = true;
		log("error", err);
		this._safeEmit("error", err);

		if (this._state === FramerState.Open) {
			this.close().catch((ignoredErr) => {
				/* ignore follow-up errors */
				log("swallow error", ignoredErr);
			});
		}
	}

	private _decodeFrame(): Frame | undefined {
		while (this._buf.length > 0) {
			const frameType: FrameType = this._buf[0];
			switch (frameType) {
				case FrameType.ACK:
				case FrameType.NAK:
				case FrameType.CAN:
					this._inSync = true;
					this._buf = this._buf.slice(1);
					return { frameType };
				case FrameType.SOF:
					const dataFrame = this._decodeSOF();
					if (dataFrame === true) {
						// Frame not complete yet, stop decoding for now
						return undefined;
					} else if (dataFrame !== false) {
						// Valid frame found, return it
						return dataFrame;
					}
					// Error encountered while decoding, invalid frame was
					// removed from buffer, try decoding the rest.
					break;
				default:
					// Probably garbage byte, skip to the next one
					this._buf = this._buf.slice(1);
					if (this._inSync) {
						this._inSync = false;
						log("frameError", FrameError[FrameError.SyncLost]);
						this._safeEmit("frameError", FrameError.SyncLost);
					}
			}
		}
		return undefined;
	}

	/**
	 * Given that first byte in buffer is a SOF (Start Of Frame),
	 * try to decode it.
	 * @return Valid DataFrame if it was decoded.
	 * @return true if there's only a partial frame so far
	 * @return false if there was an error decoding the frame, and it was discarded
	 */
	private _decodeSOF(): DataFrame | boolean {
		//assert(this._buf[0] === FrameType.SOF);

		// INS12350 6.2.1 Data frame reception timeout
		// Start receive timeout timer upon receiving the
		// SOF byte. Note that we will come here multiple
		// times if reception happens in chunks, but the
		// timer is only really started on the first iteration.
		this._timer.start();

		// Decode frame length.
		// This includes dataType, command, data bytes and checksum.
		if (this._buf.length < 2) {
			return true;
		}
		const length = this._buf[1];
		if (length < 4) {
			// INS12350 5.4.5 Serial API Command Parameters
			// Parameters (payload) must be at least 1 byte, so length must
			// be at least 4 bytes.
			this._clear();
			log("frameError", FrameError[FrameError.FrameTooSmall]);
			this._safeEmit("frameError", FrameError.FrameTooSmall);
			return false;
		}

		// Wait until we have the full frame, including checksum
		if (this._buf.length < length + 2) {
			return true;
		}

		// Cut frame from buffer.
		// We're going to discard it completely, even if checksum
		// failed (because it's more likely that there was a single
		// bit error, than a random SOF start byte).
		// And in case there was a random byte that looked like SOF,
		// we'll resync later anyway.
		this._timer.stop();
		const frame = this._buf.slice(0, length + 2);
		this._buf = this._buf.slice(length + 2);

		// Verify checksum
		let ist = 0xff;
		for (let i = 1; i < length + 1; i++) {
			ist = ist ^ frame[i];
		}
		const soll = frame[length + 1];
		if (ist !== soll) {
			log("frameError", FrameError[FrameError.ChecksumFailed]);
			this._safeEmit("frameError", FrameError.ChecksumFailed);
			return false;
		}

		const dataType: DataType = frame[2];
		if (dataType !== DataType.REQ && dataType !== DataType.RES) {
			// INS12350 5.4.3 Data frame type
			log("frameError", FrameError[FrameError.UnknownDataType]);
			this._safeEmit("frameError", FrameError.UnknownDataType);
			return false;
		}

		const command: number = frame[3];
		const params = frame.slice(4, length + 1);

		this._inSync = true;
		return {
			frameType: FrameType.SOF,
			dataType,
			command,
			params,
		};
	}

	private _encodeFrame(frame: Frame): Buffer {
		switch (frame.frameType) {
			case FrameType.ACK:
				return ACK_FRAME;
			case FrameType.NAK:
				return NAK_FRAME;
			case FrameType.CAN:
				return CAN_FRAME;
			case FrameType.SOF:
				if (
					frame.dataType !== DataType.REQ &&
					frame.dataType !== DataType.RES
				) {
					throw new FramerError(
						"cannot encode frame: invalid data type"
					);
				}
				// Total frame length becomes type, command, parameters and checksum
				const length = frame.params.length + 3;
				if (length > 255) {
					throw new FramerError(
						"cannot encode frame: frame too long"
					);
				}
				if (frame.params.length < 1) {
					// INS12350 5.4.5 Serial API Command Parameters
					throw new FramerError(
						"cannot encode frame: params too short"
					);
				}
				const buffer = Buffer.concat([
					Buffer.from([
						FrameType.SOF,
						length,
						frame.dataType,
						frame.command,
					]),
					frame.params,
					Buffer.alloc(1), // checksum
				]);
				let checksum = 0xff;
				for (let i = 1; i < length + 1; i++) {
					checksum = checksum ^ buffer[i];
				}
				buffer[length + 1] = checksum;
				return buffer;
			default:
				throw new FramerError(
					"cannot encode frame: invalid frame type"
				);
		}
	}

	private _safeEmit(event: string, ...args: any[]): void {
		try {
			this.emit(event, ...args);
		} catch (err) {
			if (this._state === FramerState.Closed || this._errored) {
				// No way to report it anymore, let it explode as uncaught error
				log("unhandled error", err);
				process.nextTick(() => {
					throw err;
				});
				return;
			}
			const error =
				typeof err === "object" && err instanceof Error
					? err
					: new Error("unknown error");
			const eventHandlerError = new Error(
				`error in framer event handler for '${event}': ${error.name}: ${error.message}`
			);
			this._handleError(eventHandlerError);
		}
	}
}
