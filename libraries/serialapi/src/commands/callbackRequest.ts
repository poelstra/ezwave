import { toHex } from "@ezwave/shared";
import { SerialApiCommandCode } from "./serialApiCommandCode";
import { TxStatus } from "./types";

export const DEFAULT_ZWAVE_TRANSMIT_TIMEOUT: number = 65 * 1000; // Based on ZW_SEND_DATA timeout, see INS13954-Instruction-Z-Wave-500-Series-Appl-Programmers-Guide-v6_81_0x.pdf, fig 9

/**
 * Base-class for errors in commands that need to transmit
 * data to another Z-Wave device.
 */
export class TransmitError extends Error {}

/**
 * Indicates an error in transferring transmission to Z-Wave
 * controller (i.e. to the Serial API module, not to the network yet).
 */
export class TransmitResponseError extends TransmitError {}

export function verifyTransmitResponse(response: Buffer): void {
	if (response.length < 1) {
		throw new TransmitResponseError(
			`got zero-length response from Z-Wave Serial device`
		);
	}
	if (response[0] === 0) {
		throw new TransmitResponseError(`failed: request could not be queued`);
	}
	// All other codes must be considered OK
	// See Z-Wave Host API Specification 2021/09/02
	// section 4.2.5 (Response status) and section 4.2.6 (Command status)
}

/**
 * Indicates an invalid callback from Z-Wave module while
 * trying to transmit a command.
 *
 * This is most likely a programming error (in host or Z-Wave module).
 *
 * The command might have been transmitted zero or more times.
 */
export class TransmitCallbackError extends TransmitError {}

/**
 * Indicates an error sending a command to another Z-Wave device.
 *
 * This type of error is to be expected in case a node is e.g. sleeping,
 * network is congested, etc.
 *
 * Read the specific type of failure from `txStatus` field.
 *
 * The command might have been transmitted zero or more times.
 */
export class TransmitDataError extends TransmitError {
	public readonly txStatus: TxStatus;

	public constructor(txStatus: TxStatus, message: string) {
		super(message);
		this.txStatus = txStatus;
	}
}

export function buildCallbackParser<R>(
	command: SerialApiCommandCode,
	transactionId: number,
	parsePayload: (payload: Buffer) => R
): (command: SerialApiCommandCode, params: Buffer) => R | undefined {
	return (cmd: SerialApiCommandCode, params: Buffer) => {
		if (cmd !== command) {
			return;
		}
		if (params.length < 1) {
			return;
		}
		// Spec: INS13954, 4.3.3.1.7
		if (params[0] !== transactionId) {
			return;
		}
		const payload = params.slice(1);
		return parsePayload(payload);
	};
}

export function buildTransmitCallbackParser(
	command: SerialApiCommandCode,
	transactionId: number
): (command: SerialApiCommandCode, params: Buffer) => true | undefined;
export function buildTransmitCallbackParser<R>(
	command: SerialApiCommandCode,
	transactionId: number,
	parseRemainingPayload: (remainingPayload: Buffer) => R
): (command: SerialApiCommandCode, params: Buffer) => R | undefined;
export function buildTransmitCallbackParser<R>(
	command: SerialApiCommandCode,
	transactionId: number,
	parseRemainingPayload?: (remainingPayload: Buffer) => R
): (command: SerialApiCommandCode, params: Buffer) => R | undefined {
	return buildCallbackParser(command, transactionId, (payload: Buffer): R => {
		if (payload.length < 1) {
			throw new TransmitCallbackError(
				`invalid ${SerialApiCommandCode[command]} callback payload: too short`
			);
		}
		const txStatus: TxStatus = payload[0];
		if (!(txStatus === TxStatus.Ok || txStatus === TxStatus.Verified)) {
			throw new TransmitDataError(
				txStatus,
				`error sending ${SerialApiCommandCode[command]}: ${
					TxStatus[txStatus] ?? `0x${toHex(txStatus)}`
				}`
			);
		}
		if (parseRemainingPayload) {
			return parseRemainingPayload(payload.slice(1));
		} else {
			return true as unknown as R;
		}
	});
}
