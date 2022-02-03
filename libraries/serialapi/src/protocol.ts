/**
 * Z-Wave Serial API protocol encoder/decoder.
 *
 * Handles frame-level handshaking of requests and responses
 * to and from the Z-Wave chip, including timeout handling
 * of requests sent to the chip, and detecting unresponsive
 * chip / serial port.
 */

import debug from "debug";
import { EventEmitter } from "events";
import {
	bufferToString,
	defer,
	Deferred,
	delay,
	noop,
	Timer,
} from "@ezwave/shared";
import {
	SerialApiCommandCode,
	serialApiCommandToString,
} from "./commands/serialApiCommandCode";
import {
	DataFrame,
	DataType,
	Frame,
	FrameError,
	FrameType,
	IFramer,
	SimpleFrame,
} from "./framer";

const log = debug("zwave:protocol");
const logData = log.extend("data");

const ACK_FRAME: SimpleFrame = { frameType: FrameType.ACK };
const NAK_FRAME: SimpleFrame = { frameType: FrameType.NAK };
const ONE_BYTE_DUMMY_BUFFER = Buffer.alloc(1);

const ACK_TIMEOUT_SENTINEL = "ACK_TIMEOUT_SENTINEL";
type AckTimeoutSentinel = typeof ACK_TIMEOUT_SENTINEL;

function createDataFrame(
	command: SerialApiCommandCode,
	params?: Buffer
): DataFrame {
	return {
		frameType: FrameType.SOF,
		dataType: DataType.REQ,
		command,
		params: params ? params : ONE_BYTE_DUMMY_BUFFER,
	};
}

const ACK_TIMEOUT = 1600; // INS12350-14 6.2.2 Data frame delivery timeout
const RES_TIMEOUT = 5000; // INS12350-14 6.6.3 Host Request/Response Session
const MAX_RETRANSMISSIONS = 3;

const HARD_RESET_DELAY = 500; // INS12350 6.1.1 With hard reset
const SOFT_RESET_DELAY = 1500; // INS12350 6.1.2 Without hard reset

export interface IProtocol extends EventEmitter {
	/**
	 * Emitted whenever an explicit reset request is initiated/indicated
	 * through `softReset()` or `hardResetted()`.
	 */
	on(event: "reset", listener: () => void): this;

	/**
	 * Emitted whenever the device is initialized after a soft
	 * or hard reset.
	 */
	on(event: "init", listener: () => void): this;

	/**
	 * Emitted when a request message is received from the
	 * Z-Wave chip. For example, due to a Z-Wave command addressed
	 * to us.
	 */
	on(
		event: "callback",
		listener: (command: number, params: Buffer) => void
	): this;

	/**
	 * Emitted when an unexpected event is detected, such
	 * as line errors from the framer.
	 *
	 * The event can be used to aid in troubleshooting low-level
	 * protocol issues, and is informational only.
	 *
	 * The event is not emitted for situations which can already
	 * be observed from method calls to the protocol, e.g. a
	 * `send()` time out.
	 */
	on(event: "warning", listener: (message: string) => void): this;

	/**
	 * Emitted when the Z-Wave chip is detected as being stuck.
	 * It is recommended to issue a hard reset upon receiving
	 * this event, or a soft reset if a hard reset is not available.
	 */
	on(event: "stuck", listener: () => void): this;

	/**
	 * Emitted when a non-recoverable error is detected.
	 * The protocol will be closed immediately afterwards.
	 *
	 * Typically emitted when e.g. event dispatch threw an
	 * error, or the framer failed with an error.
	 */
	on(event: "error", listener: (error: Error) => void): this;

	/**
	 * Emitted when the protocol is closed.
	 *
	 * Typically emitted when the framer is closed, or a
	 * non-recoverable error occurred.
	 */
	on(event: "close", listener: () => void): this;

	/**
	 * Indicate that Z-Wave chip was hard-resetted, by triggering
	 * any external reset mechanism.
	 *
	 * Any pending request will be cancelled.
	 * Will wait for necessary hard-reset time before issueing
	 * new requests.
	 *
	 * Either hardResetted() or softReset is required before data
	 * can be transmitted after constructing this class.
	 */
	hardResetted(): Promise<void>;

	/**
	 * Perform soft-reset of Z-Wave chip.
	 *
	 * Any pending request will be cancelled.
	 * Note: sending a soft-reset to a USB device will cause its
	 * serial port to be closed, which will in turn cause this
	 * protocol instance to be closed.
	 *
	 * Either hardResetted() or softReset is required before data
	 * can be transmitted after constructing this class.
	 */
	softReset(): Promise<void>;

	/**
	 * Send REQ command to Z-Wave chip that does not return a RES result.
	 *
	 * Only a single send() or request() can be ongoing at the same time,
	 * and the protocol must be initialized and not closed yet.
	 *
	 * @param command Serial API command code to send
	 * @param params Parameters for command, if necessary.
	 * @returns Promise for successful send of command.
	 */
	send(command: SerialApiCommandCode, params?: Buffer): Promise<void>;

	/**
	 * Send REQ command to Z-Wave chip and wait for corresponding RES result
	 * to be returned.
	 *
	 * Only a single send() or request() can be ongoing at the same time,
	 * and the protocol must be initialized and not closed yet.
	 *
	 * Note: unsollicited messages can still be received while a request
	 * is ongoing.
	 *
	 * @param command Serial API command code to send
	 * @param params Parameters for command, if necessary.
	 * @param timeout Optional timeout, uses default of RES_TIMEOUT (5s) if not specified.
	 * @returns Promise for payload of returned RES message.
	 */
	request(
		command: SerialApiCommandCode,
		params?: Buffer,
		timeout?: number
	): Promise<Buffer>;

	/**
	 * Cancel any in-progress request (through `send()` or `request()`),
	 * which will be rejected with the given reason.
	 *
	 * Note that any existing request's promise must still be
	 * awaited (i.e. most likely its rejection) before the next
	 * request can be made.
	 */
	cancel(reason: Error): void;
}

enum ProtocolState {
	/**
	 * Waiting for reset sequence to complete.
	 */
	Uninitialized,

	/**
	 * Waiting for new send()/request() or unsollicited message.
	 */
	Idle,

	/**
	 * Sending a REQ from send()/request().
	 */
	Sending,

	/**
	 * Waiting for RES from request().
	 */
	Receiving,

	/**
	 * Protocol closed, no further send/request possible,
	 * no further events will be emitted.
	 * Because framer closed, and/or error occurred.
	 */
	Closed,
}

/**
 * Events emitted from Protocol.
 * This is just for TypeScript type-safety, and duplicated from the interface.
 */
export interface Protocol {
	on(event: "reset", listener: () => void): this;
	on(event: "init", listener: () => void): this;
	on(
		event: "callback",
		listener: (command: number, params: Buffer) => void
	): this;
	on(event: "warning", listener: (message: string) => void): this;
	on(event: "stuck", listener: () => void): this;
	on(event: "error", listener: (error: Error) => void): this;
	on(event: "close", listener: () => void): this;
}

/**
 * Z-Wave Serial API protocol encoder/decoder.
 *
 * Handles frame-level handshaking of requests and responses
 * to and from the Z-Wave chip, including timeout handling
 * of requests sent to the chip, and detecting unresponsive
 * chip / serial port.
 */
export class Protocol extends EventEmitter implements IProtocol {
	/**
	 * Convert frames into serial byte stream and vice-versa.
	 * Detects checksum errors and low-level frame read time-outs.
	 */
	private _framer: IFramer;

	/**
	 * State of protocol encoder/decoder.
	 */
	private _state: ProtocolState = ProtocolState.Uninitialized;

	/**
	 * Number of consecutive data frames with errors.
	 * When it becomes too large, a "stuck" event is emitted to trigger
	 * a soft or hard reset.
	 */
	private _invalidFrames = 0;

	/**
	 * Resolved to result of ACK/NAK/CAN/timeout when sending a REQ.
	 */
	private _ackResult: Deferred<SimpleFrame | AckTimeoutSentinel> | undefined;

	/**
	 * Detect timeout of ACK/NAK/CAN when sending a REQ.
	 * Resolves _ackResult with ACK_TIMEOUT_SENTINEL if it triggers.
	 */
	private _ackTimer: Timer;

	/**
	 * Resolved to RES frame after sending REQ (and getting ACK).
	 */
	private _resResult: Deferred<DataFrame> | undefined;

	/**
	 * Original frame sent as REQ when waiting for RES, to verify whether
	 * RES command indeed matches the request.
	 */
	private _reqFrame: DataFrame | undefined;

	/**
	 * Detect timeout of REQ/RES pair.
	 */
	private _resTimer: Timer | undefined;

	/**
	 * Construct new Z-Wave Serial API protocol encoder/decoder.
	 *
	 * Before the protocol can be used, either:
	 * - await `hardResetted()`, in case port was opened after a hard reset, or
	 * - await `softReset()`, to soft-reset the chip in case a hard reset is not available.
	 *
	 * @param framer IFramer to convert frames to serial byte stream and vice-versa.
	 */
	constructor(framer: IFramer) {
		super();

		this._framer = framer;
		this._framer.on("frame", (frame) => this._handleFrame(frame)); // TODO handle async
		this._framer.on("frameError", (frameError) =>
			this._handleFrameError(frameError)
		);
		this._framer.on("close", () => this._handleClose());
		this._framer.on("error", (error) => this._handleError(error));

		this._ackTimer = new Timer(ACK_TIMEOUT, () => this._handleAckTimeout());
	}

	/**
	 * Indicate that Z-Wave chip was hard-resetted, by triggering
	 * any external reset mechanism.
	 *
	 * Any pending request will be cancelled.
	 * Will wait for necessary hard-reset time before issueing
	 * new requests.
	 *
	 * Either hardResetted() or softReset is required before data
	 * can be transmitted after constructing this class.
	 */
	public async hardResetted(): Promise<void> {
		// TODO handle nested reset
		if (this._state === ProtocolState.Closed) {
			throw new Error("cannot reset protocol: already closed");
		}
		this._state = ProtocolState.Uninitialized;
		this._safeEmit("reset");
		this._abort(new Error("request aborted: hard reset"));
		// Assume port was hard-resetted, so we only need to
		// apply the 'boot delay'
		await delay(HARD_RESET_DELAY);
		this._invalidFrames = 0;
		this._state = ProtocolState.Idle;
		this._safeEmit("init");
	}

	/**
	 * Perform soft-reset of Z-Wave chip.
	 *
	 * Any pending request will be cancelled.
	 * Note: sending a soft-reset to a USB device will cause its
	 * serial port to be closed, which will in turn cause this
	 * protocol instance to be closed.
	 *
	 * Either hardResetted() or softReset is required before data
	 * can be transmitted after constructing this class.
	 */
	public async softReset(): Promise<void> {
		// TODO handle nested reset
		if (this._state === ProtocolState.Closed) {
			throw new Error("cannot reset protocol: already closed");
		}
		this._state = ProtocolState.Uninitialized;
		this._safeEmit("reset");
		this._abort(new Error("request aborted: soft reset"));
		this._invalidFrames = 0;
		// INS12350 6.1.2 Without hard reset
		// Warning: when sent to a USB ZWave device, this will trigger a
		// USB disconnect, and will cause the underlying file descriptor
		// to be closed.
		await this._sendRaw(NAK_FRAME);
		await this._sendRaw(
			createDataFrame(SerialApiCommandCode.SERIAL_API_SOFT_RESET)
		);
		await delay(SOFT_RESET_DELAY);
		this._state = ProtocolState.Idle;
		this._safeEmit("init");
	}

	/**
	 * Send REQ command to Z-Wave chip that does not return a RES result.
	 *
	 * Only a single send() or request() can be ongoing at the same time,
	 * and the protocol must be initialized and not closed yet.
	 *
	 * @param command Serial API command code to send
	 * @param params Parameters for command, if necessary.
	 * @returns Promise for successful send of command.
	 */
	public async send(
		command: SerialApiCommandCode,
		params?: Buffer
	): Promise<void> {
		if (this._state !== ProtocolState.Idle) {
			throw new Error("cannot send command: protocol not idle");
		}
		if (logData.enabled) {
			logData(
				"send",
				`cmd=${serialApiCommandToString(command)} params=[${
					params ? bufferToString(params) : ""
				}]`
			);
		}
		this._state = ProtocolState.Sending;
		try {
			const request = createDataFrame(command, params);
			await this._send(request);
			logData("send ok");
		} catch (err) {
			// Keep info together, but do show errors in 'normal' log if
			// it would otherwise be hidden
			if (logData.enabled) {
				logData("send error", err);
			} else {
				log("send error", err);
			}
			throw err;
		} finally {
			// Only go back to Idle if we weren't interrupted somehow
			if (this._state === ProtocolState.Sending) {
				this._state = ProtocolState.Idle;
			}
		}
	}

	/**
	 * Send REQ command to Z-Wave chip and wait for corresponding RES result
	 * to be returned.
	 *
	 * Only a single send() or request() can be ongoing at the same time,
	 * and the protocol must be initialized and not closed yet.
	 *
	 * Note: unsollicited messages can still be received while a request
	 * is ongoing.
	 *
	 * @param command Serial API command code to send
	 * @param params Parameters for command, if necessary.
	 * @param timeout Optional timeout, uses default of RES_TIMEOUT (5s) if not specified.
	 * @returns Promise for payload of returned RES message.
	 */
	public async request(
		command: SerialApiCommandCode,
		params?: Buffer,
		timeout: number = RES_TIMEOUT
	): Promise<Buffer> {
		if (this._state !== ProtocolState.Idle) {
			throw new Error("cannot send request: protocol not idle");
		}
		if (logData.enabled) {
			logData(
				"request",
				`cmd=${serialApiCommandToString(command)} params=[${
					params ? bufferToString(params) : ""
				}]`
			);
		}
		this._state = ProtocolState.Sending;
		try {
			const request = createDataFrame(command, params);
			this._resResult = defer<DataFrame>();
			const result = this._resResult.promise;
			// Prevent unhandled rejection when send is aborted. The actual error
			// will be returned from this._send(), so it will be handled correctly.
			result.catch(noop);
			this._reqFrame = request;
			this._resTimer = new Timer(timeout, () => this._handleResTimeout());
			this._resTimer.start(); // According to spec, RES timer needs to be started before the send
			await this._send(request);
			// @ts-ignore Typescript thinks this._state must be Sending by now, but see explanation below
			if (this._state === ProtocolState.Uninitialized) {
				// There's a small window where ack is received, but the
				// send() above did not return yet, and *then* the protocol
				// is reset. In this case, protocol state will be Uninitialized.
				// However, the overal request (waiting for RES) will have been
				// aborted correctly, so just return that early.
				await result; // should throw with original reset reason
				// otherwise, explicitly throw
				throw new Error("internal error: unexpected protocol state");
			}
			if (this._state !== ProtocolState.Sending) {
				throw new Error("internal error: unexpected protocol state");
			}
			this._state = ProtocolState.Receiving;
			const resultFrame = await result;
			if (logData.enabled) {
				logData(
					"request ok",
					`result=[${bufferToString(resultFrame.params)}]`
				);
			}
			return resultFrame.params;
		} catch (err) {
			if (logData.enabled) {
				logData("request error", err);
			} else {
				log("request error", err);
			}
			throw err;
		} finally {
			if (this._resTimer) {
				this._resTimer.stop();
				this._resTimer = undefined;
			}
			// Only go back to Idle if we weren't interrupted somehow
			if (
				this._state === ProtocolState.Sending ||
				this._state === ProtocolState.Receiving
			) {
				this._state = ProtocolState.Idle;
			}
		}
	}

	/**
	 * Cancel any in-progress request (through `send()` or `request()`),
	 * which will be rejected with the given reason.
	 *
	 * Note that any existing request's promise must still be
	 * awaited (i.e. most likely its rejection) before the next
	 * request can be made.
	 */
	public cancel(reason: Error): void {
		this._abort(reason);
	}

	private _abort(error: Error): void {
		if (this._ackResult) {
			this._ackTimer.stop();
			this._ackResult.reject(error);
			this._ackResult = undefined;
		}
		this._reqFrame = undefined;
		if (this._resResult) {
			this._resResult.reject(error);
			this._resResult = undefined;
		}
		if (this._resTimer) {
			this._resTimer.stop();
			this._resTimer = undefined;
		}
	}

	private async _handleFrame(frame: Frame): Promise<void> {
		if (this._state === ProtocolState.Uninitialized) {
			log("info", "Discarding received frame, not initialized yet");
			return;
		}
		if (this._state === ProtocolState.Closed) {
			log("info", "Discarding received frame, protocol closed");
			return;
		}
		switch (frame.frameType) {
			case FrameType.ACK:
			case FrameType.NAK:
			case FrameType.CAN:
				// Retransmissions are handled in _send()
				if (this._ackResult) {
					this._ackTimer.stop();
					this._ackResult.resolve(frame);
					this._ackResult = undefined;
				}
				break;
			case FrameType.SOF:
				switch (frame.dataType) {
					case DataType.REQ:
						this._invalidFrames = 0;
						await this._sendRaw(ACK_FRAME);
						if (logData.enabled) {
							logData(
								"callback",
								`cmd=${serialApiCommandToString(
									frame.command
								)} params=[${
									frame.params
										? bufferToString(frame.params)
										: ""
								}]`
							);
						}
						this._safeEmit("callback", frame.command, frame.params);
						break;
					case DataType.RES:
						this._invalidFrames = 0;
						await this._sendRaw(ACK_FRAME);
						if (
							this._resResult &&
							this._reqFrame &&
							this._reqFrame.command === frame.command
						) {
							this._reqFrame = undefined;
							this._resResult.resolve(frame);
							this._resResult = undefined;
							if (this._resTimer) {
								this._resTimer.stop();
								this._resTimer = undefined;
							}
						} else {
							log(
								"info",
								"received response, but no request pending"
							);
						}
						break;
					default:
						// INS12350 5.4.3 Type
						// A receiving end MUST ignore reserved Type values
						const dataType = frame.dataType as number;
						const msg = `received unsupported data type 0x${dataType.toString(
							16
						)}`;
						log("warning", msg);
						this._safeEmit("warning", msg);
				}
				break;
		}
	}

	private _handleFrameError(frameError: FrameError): void {
		if (
			this._state === ProtocolState.Uninitialized ||
			this._state === ProtocolState.Closed
		) {
			// Ignore frame errors during reset or close
			return;
		}
		const frameErrorMsg = `frameError ${FrameError[frameError]}`;
		log("warning", frameErrorMsg);
		this._safeEmit("warning", frameErrorMsg);

		// Send back NAK on checksum error, and frame-too-small error (which
		// is something the 'normal' protocol would detect as a checksum error
		// or timeout instead).
		switch (frameError) {
			case FrameError.ChecksumFailed:
			case FrameError.FrameTooSmall:
				this._sendRaw(NAK_FRAME);

				// INS12350 6.4.2 Persistent CRC errors
				// SHOULD issue a hard reset, or soft reset if hard reset is not available.
				this._invalidFrames++;
				if (this._invalidFrames === 3) {
					log(
						"stuck",
						"Persistent CRC errors detected, Z-Wave chip stuck"
					);
					this._safeEmit("stuck");
				}
				break;
		}
	}

	private _handleClose(): void {
		if (this._state === ProtocolState.Closed) {
			return;
		}
		log("close");
		this._state = ProtocolState.Closed;
		this._abort(new Error("framer closed"));
		this._safeEmit("close");
	}

	private _handleError(error: Error): void {
		if (this._state === ProtocolState.Closed) {
			return;
		}
		const protocolError = new Error(
			`framer errored: ${error.name}: ${error.message}`
		);
		log("error", protocolError);
		this._state = ProtocolState.Closed;
		this._abort(protocolError);
		this._safeEmit("error", protocolError);
		log("close");
		this._safeEmit("close");
	}

	private _handleAckTimeout(): void {
		if (this._ackResult) {
			log("warning", "ACK timeout");
			this._safeEmit("warning", "ACK timeout");
			this._ackResult.resolve(ACK_TIMEOUT_SENTINEL);
			this._ackResult = undefined;
		}
	}

	private _handleResTimeout(): void {
		this._reqFrame = undefined;
		if (this._resResult) {
			log("warning", "RES timeout"); // no emit of event, already observable through request()
			// TODO Create the error somewhere in the stack of request() to
			// give a more meaningful backtrace
			this._resResult.reject(
				new Error(
					"request timeout: Z-Wave chip did not respond with result"
				)
			);
			this._resResult = undefined;
		}
	}

	private async _send(frame: DataFrame): Promise<void> {
		let retransmissions = 0;
		while (true) {
			const result = await this._sendDataFrameAndWaitForResponse(frame);
			if (
				result !== ACK_TIMEOUT_SENTINEL &&
				result.frameType === FrameType.ACK
			) {
				// Done
				return;
			}

			// CAN / NAK / Timeout
			if (retransmissions === MAX_RETRANSMISSIONS) {
				break;
			}

			// Retransmit after waiting period
			let backOffDelay = 100 + retransmissions * 1000;
			retransmissions++;

			// In case of timeout, the timeout waiting period may be subtracted
			// from the backOffDelay.
			if (result === ACK_TIMEOUT_SENTINEL) {
				backOffDelay -= ACK_TIMEOUT;
			}

			if (backOffDelay > 0) {
				await delay(backOffDelay);
			}
		}

		// Spec recommends to reset chip after it 3 failed retransmissions.
		log("stuck", "Persistent ACK timeouts detected, Z-Wave chip stuck");
		this._safeEmit("stuck");

		// 3 consecutive failed retransmissions, abort send
		throw new Error("send failed: Z-Wave chip did not acknowledge");
	}

	private async _sendDataFrameAndWaitForResponse(
		frame: DataFrame
	): Promise<SimpleFrame | AckTimeoutSentinel> {
		this._ackResult = defer();
		const result = this._ackResult.promise;
		this._ackTimer.start();
		try {
			// Await both promises to:
			//   1) allow early return on abort
			//   2) prevent unhandled rejection when sendRaw blocks while result is rejected
			await Promise.all([this._sendRaw(frame), result]);
		} catch (err) {
			this._ackTimer.stop();
			this._ackResult = undefined;
			throw err;
		}
		return result;
	}

	private _sendRaw(frame: Frame): Promise<void> {
		return this._framer.send(frame);
	}

	private _safeEmit(event: string, ...args: any[]): void {
		try {
			this.emit(event, ...args);
		} catch (err) {
			if (this._state === ProtocolState.Closed) {
				// No way to report it anymore, let it explode as uncaught error
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
				`error in protocol event handler for '${event}': ${error.name}: ${error.message}`
			);
			log("error", eventHandlerError);
			this._state = ProtocolState.Closed;
			this._abort(eventHandlerError);
			this._safeEmit("error", eventHandlerError);
			log("close");
			this._safeEmit("close");
		}
	}
}
