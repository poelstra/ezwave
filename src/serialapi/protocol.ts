/**
 * Z-Wave Serial API protocol encoder/decoder.
 *
 * Handles frame-level handshaking of requests and responses
 * to and from the Z-Wave chip, including timeout handling
 * of requests sent to the chip, and detecting unresponsive
 * chip / serial port.
 */

import { EventEmitter } from "events";
import { bufferToString, defer, Deferred, delay, Timer } from "../common/util";
import {
	DataFrame,
	DataType,
	Frame,
	FrameError,
	FrameType,
	IFramer,
	SimpleFrame,
} from "./framer";

// TODO move to SerialAPI
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

function frameToString(frame: Frame): string {
	switch (frame.frameType) {
		case FrameType.ACK:
		case FrameType.NAK:
		case FrameType.CAN:
			return `<Frame ${FrameType[frame.frameType]}>`;
		case FrameType.SOF:
			const cmd =
				SerialAPICommand[frame.command] ||
				`0x${frame.command.toString(16)}`;
			const params = `[${bufferToString(frame.params)}]`;
			return `<Frame DATA type=${
				DataType[frame.dataType]
			} cmd=${cmd} params=${params}>`;
	}
}

const ACK_FRAME: SimpleFrame = { frameType: FrameType.ACK };
const NAK_FRAME: SimpleFrame = { frameType: FrameType.NAK };
const ONE_BYTE_DUMMY_BUFFER = Buffer.alloc(1);

const ACK_TIMEOUT_SENTINEL = "ACK_TIMEOUT_SENTINEL";
type AckTimeoutSentinel = typeof ACK_TIMEOUT_SENTINEL;

function createDataFrame(
	command: SerialAPICommand,
	params?: Buffer
): DataFrame {
	return {
		frameType: FrameType.SOF,
		dataType: DataType.REQ,
		command,
		params: params ? params : ONE_BYTE_DUMMY_BUFFER,
	};
}

const ACK_TIMEOUT = 1600; // INS12350 6.2.2 Data frame delivery timeout
const DEFAULT_RES_TIMEOUT = 65 * 1000; // Maximum timeout for ZW_SendData callback, although very unlikely (see INS13954 section 4.3.3.1)
const MAX_RETRANSMISSIONS = 3;

const HARD_RESET_DELAY = 500; // INS12350 6.1.1 With hard reset
const SOFT_RESET_DELAY = 1500; // INS12350 6.1.2 Without hard reset

export interface Protocol {
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
		event: "message",
		listener: (command: number, params: Buffer) => void
	): this;

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
 * Z-Wave Serial API protocol encoder/decoder.
 *
 * Handles frame-level handshaking of requests and responses
 * to and from the Z-Wave chip, including timeout handling
 * of requests sent to the chip, and detecting unresponsive
 * chip / serial port.
 */
export class Protocol extends EventEmitter {
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
		this._abort(new Error("request aborted: hard reset"));
		this._state = ProtocolState.Uninitialized;
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
		this._abort(new Error("request aborted: soft reset"));
		this._invalidFrames = 0;
		// INS12350 6.1.2 Without hard reset
		// Warning: when sent to a USB ZWave device, this will trigger a
		// USB disconnect, and will cause the underlying file descriptor
		// to be closed.
		await this._sendRaw(NAK_FRAME);
		await this._sendRaw(
			createDataFrame(SerialAPICommand.FUNC_ID_SERIAL_API_SOFT_RESET)
		);
		await delay(SOFT_RESET_DELAY);
		this._state = ProtocolState.Idle;
		this._safeEmit("init");
	}

	/**
	 * Send REQ command to Z-Wave chip that does not return a RES result.
	 *
	 * Only a single send() or request() can be ongoing at the same time.
	 */
	public async send(cmd: SerialAPICommand, params?: Buffer): Promise<void> {
		if (this._state !== ProtocolState.Idle) {
			throw new Error("cannot send command: protocol not idle");
		}
		this._state = ProtocolState.Sending;
		try {
			const request = createDataFrame(cmd, params);
			console.log(
				"\tSEND",
				`cmd=${SerialAPICommand[cmd]}`,
				`params=[${params ? bufferToString(params) : ""}]`
			);
			await this._send(request);
			console.log("\tSEND ACK");
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
	 */
	public async request(
		cmd: SerialAPICommand,
		params?: Buffer,
		timeout?: number
	): Promise<Buffer> {
		if (this._state !== ProtocolState.Idle) {
			throw new Error("cannot send request: protocol not idle");
		}
		this._state = ProtocolState.Sending;
		try {
			const request = createDataFrame(cmd, params);
			console.log(
				"\tREQUEST SEND",
				`cmd=${SerialAPICommand[cmd]}`,
				`params=[${params ? bufferToString(params) : ""}]`
			);
			this._resResult = defer<DataFrame>();
			const result = this._resResult.promise;
			// Prevent unhandled rejection when send is aborted. The actual error
			// will be returned from this._send(), so it will be handled correctly.
			result.catch(noop);
			this._reqFrame = request;
			this._resTimer = new Timer(timeout ?? DEFAULT_RES_TIMEOUT, () =>
				this._handleResTimeout()
			);
			this._resTimer.start(); // According to spec, RES timer needs to be started before the send
			await this._send(request);
			console.log("\tREQUEST SEND ACK");
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
			console.log(
				"\tREQUEST RESULT",
				`result=[${bufferToString(resultFrame.params)}]`
			);
			return resultFrame.params;
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
		console.log("\t\tRECV", frameToString(frame));
		if (this._state === ProtocolState.Uninitialized) {
			console.warn(
				"WARN",
				"Discarding received frame, not initialized yet"
			);
			return;
		}
		if (this._state === ProtocolState.Closed) {
			console.warn("WARN", "Discarding received frame, protocol closed");
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
						this._safeEmit("message", frame.command, frame.params);
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
							console.warn(
								"WARN",
								"received response, but no corresponding request found"
							);
						}
						break;
					default:
						// INS12350 5.4.3 Type
						// A receiving end MUST ignore reserved Type values
						console.warn(
							"WARN",
							`received unsupported data type ${frame.dataType}`
						);
				}
				break;
		}
	}

	private _handleFrameError(frameError: FrameError): void {
		console.warn("WARN", FrameError[frameError]);

		if (
			this._state === ProtocolState.Uninitialized ||
			this._state === ProtocolState.Closed
		) {
			// Ignore frame errors during reset or close
			return;
		}

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
					console.warn(
						"WARN Persistent CRC errors detected, Z-Wave chip stuck"
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
		this._state = ProtocolState.Closed;
		this._abort(protocolError);
		this._safeEmit("error", protocolError);
		this._safeEmit("close");
	}

	private _handleAckTimeout(): void {
		console.warn("WARN", "ACK timeout");
		if (this._ackResult) {
			this._ackResult.resolve(ACK_TIMEOUT_SENTINEL);
			this._ackResult = undefined;
		}
	}

	private _handleResTimeout(): void {
		console.warn("WARN", "RES timeout");
		this._reqFrame = undefined;
		if (this._resResult) {
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
		console.warn(
			"WARN Persistent ACK timeouts detected, Z-Wave chip stuck"
		);
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

	private async _sendRaw(frame: Frame): Promise<void> {
		console.log("\t\tSEND", frameToString(frame));
		await this._framer.send(frame);
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
			this._state = ProtocolState.Closed;
			this._abort(eventHandlerError);
			this._safeEmit("error", eventHandlerError);
			this._safeEmit("close");
		}
	}
}
