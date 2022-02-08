import { timeout, toHex } from "@ezwave/shared";
import { Events } from "../events";
import { ICommandSession } from "../ICommandSession";
import { RequestRunner } from "../RequestRunner";
import { CallbackRequestBuilder } from "../requests";
import { SerialApiCommandCode } from "../serialApiCommandCode";
import { ZwSendDataAbort } from "./zwSendDataAbort";

export enum TransmitOptions {
	Ack = 0x01,
	AutoRoute = 0x04,
	Explore = 0x20, // reduce powerlevel by 6dB
}

export enum TxStatus {
	Ok = 0x00,
	NoAck = 0x01, // Node may be sleeping
	Fail = 0x02, // Network busy
	NotIdle = 0x03, // TODO
	NoRoute = 0x04, // TODO
}

export const ZW_SEND_DATA_TIMEOUT: number = 65 * 1000; // See INS13954-Instruction-Z-Wave-500-Series-Appl-Programmers-Guide-v6_81_0x.pdf, fig 9

export interface ZwSendDataRequest {
	nodeId: number;
	payload: Buffer;
	timeout?: number;
	afterSend?: () => void;
	// TODO Add txOptions
}

export interface ZwSendDataResponse {
	transmitTime?: number; // in milliseconds
}

export class ZwSendDataError extends Error {
	public readonly txStatus: TxStatus;

	public constructor(txStatus: TxStatus, message: string) {
		super(message);
		this.txStatus = txStatus;
	}
}

export function verifyTransmitResponse(response: Buffer): void {
	if (response.length < 1) {
		throw new Error(`got zero-length response from Z-Wave Serial device`);
	}
	if (response[0] === 0) {
		throw new Error(`failed: request could not be queued`);
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

export function zwSendDataBuilder(
	request: ZwSendDataRequest
): CallbackRequestBuilder<ZwSendDataResponse, ZwSendDataResponse> {
	return (transactionId) => {
		// TODO INS13954 4.3.3.1 Prevent sending to virtual nodes inside the controller/bridge itself
		// TODO INS13954 4.3.3.1.5 Implement checks for minimum/maximum payload size:
		// Transmit option             non-secure  S0 secure
		// TRANSMIT_OPTION_EXPLORE     46 bytes    26 bytes
		// TRANSMIT_OPTION_AUTO_ROUTE  48 bytes    28 bytes
		// TRANSMIT_OPTION_NO_ROUTE    54 bytes    34 bytes
		const txOptions =
			// eslint-disable-next-line no-bitwise
			TransmitOptions.Ack |
			TransmitOptions.AutoRoute |
			TransmitOptions.Explore;
		return {
			command: SerialApiCommandCode.ZW_SEND_DATA,
			params: Buffer.from([
				request.nodeId,
				request.payload.length,
				...request.payload,
				txOptions,
				transactionId,
			]),
			parseResponse: verifyTransmitResponse,
			tryParseEvent: buildCallbackParser(
				SerialApiCommandCode.ZW_SEND_DATA,
				transactionId,
				(payload: Buffer): ZwSendDataResponse => {
					if (payload.length < 1) {
						throw new Error("invalid ZwSendData response");
					}
					const txStatus: TxStatus = payload[0];
					if (txStatus !== TxStatus.Ok) {
						throw new ZwSendDataError(
							txStatus,
							`error sending command to node ${request.nodeId}: ${
								TxStatus[txStatus] ?? `0x${toHex(txStatus)}`
							}`
						);
					}
					let transmitTime: number | undefined;
					if (payload.length >= 3) {
						// DevKit 6.51+ added time measurement to response
						transmitTime = payload.readUInt16BE(1) * 10; // in ms
					}
					return {
						transmitTime,
					};
				}
			),
			handleEvents: async (
				events: Events<ZwSendDataResponse>,
				commandSession: ICommandSession
			): Promise<ZwSendDataResponse> => {
				try {
					request.afterSend?.();
					return await timeout(
						events.get(),
						request.timeout ?? ZW_SEND_DATA_TIMEOUT
					);
				} catch (err) {
					// INS13954 4.3.3.1.6 Exception recovery:
					// If a timeout occurs, it is important to call ZW_SendDataAbort to stop the sending of the frame.
					// We also execute it for other types of failures, e.g. parse errors, or error on afterSend.
					try {
						await commandSession.execute(new ZwSendDataAbort());
					} catch {
						// ignore follow-up error (likely protocol close)
					}
					throw err;
				}
			},
		};
	};
}

export class ZwSendData extends RequestRunner<typeof zwSendDataBuilder> {
	public constructor(request: ZwSendDataRequest) {
		super(zwSendDataBuilder, request);
	}
}
