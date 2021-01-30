import { toHex } from "../../../common/util";
import { SerialApiCommandCode } from "../../serialApiCommandCode";
import { SerialApiFuncIdCommand } from "../../serialApiFuncCommand";

export enum TransmitOptions {
	Ack = 0x01,
	AutoRoute = 0x04,
	Explore = 0x20, // reduce powerlevel by 6dB
}

enum TxStatus {
	Ok = 0x00,
	NoAck = 0x01, // Node may be sleeping
	Fail = 0x02, // Network busy
	NotIdle = 0x03, // TODO
	NoRoute = 0x04, // TODO
}

export const ZW_SEND_DATA_TIMEOUT = 65 * 1000; // See INS13954-Instruction-Z-Wave-500-Series-Appl-Programmers-Guide-v6_81_0x.pdf, fig 9

export interface ZwSendDataRequest {
	nodeId: number;
	payload: Buffer;
}

export interface ZwSendDataResponse {
	transmitTime?: number; // in milliseconds
}

export class ZwSendDataCommand extends SerialApiFuncIdCommand<
	ZwSendDataRequest,
	ZwSendDataResponse
> {
	constructor(request: ZwSendDataRequest) {
		super(SerialApiCommandCode.ZW_SEND_DATA, request);
	}

	public serializeRequest(transactionId: number): Buffer {
		// TODO INS13954 4.3.3.1 Prevent sending to virtual nodes inside the controller/bridge itself
		// TODO INS13954 4.3.3.1.5 Implement checks for minimum/maximum payload size:
		// Transmit option             non-secure  S0 secure
		// TRANSMIT_OPTION_EXPLORE     46 bytes    26 bytes
		// TRANSMIT_OPTION_AUTO_ROUTE  48 bytes    28 bytes
		// TRANSMIT_OPTION_NO_ROUTE    54 bytes    34 bytes
		// TODO Allow to specify TxOptions
		const txOptions =
			TransmitOptions.Ack |
			TransmitOptions.AutoRoute |
			TransmitOptions.Explore;
		return Buffer.from([
			this.request.nodeId,
			this.request.payload.length,
			...this.request.payload,
			txOptions,
			transactionId,
		]);
	}

	parsePayload(payload: Buffer): ZwSendDataResponse {
		if (payload.length < 1) {
			throw new Error("invalid ZwSendData response");
		}
		const txStatus: TxStatus = payload[0];
		if (txStatus !== TxStatus.Ok) {
			throw new Error(
				`error sending command to node ${this.request.nodeId}: ${
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
}
