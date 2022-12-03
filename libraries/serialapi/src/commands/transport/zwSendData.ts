import {
	buildTransmitCallbackParser,
	verifyTransmitResponse,
} from "../callbackRequest";
import { Events } from "../events";
import { ICommandSession } from "../ICommandSession";
import { RequestRunner } from "../RequestRunner";
import { CallbackRequestBuilder } from "../requests";
import { SerialApiCommandCode } from "../serialApiCommandCode";
import { ZwSendDataAbort } from "./zwSendDataAbort";

export enum TransmitOptions {
	/**
	 * This option is used to request the destination node to return an MPDU acknowledgement.
	 * This option SHOULD be used by a host application for all communication. If the destina-
	 * tion NodeID is the broadcast NodeID, the Z-Wave Module MUST ignore this bit.
	 */
	Ack = 0x01,

	/**
	 * This option is OBSOLETED. This option MUST NOT be used by a sending interface and
	 * MUST be ignored by a receiving interface.
	 */
	LowPower = 0x02,

	/**
	 * This option is used to enable automatic routing. The Z-Wave library runs on the Z-Wave
	 * Module will try transmitting the frame via repeater nodes in case destination node is out of
	 * direct range. Controller nodes MAY use this bit to enable routing via Last Working Routes,
	 * calculated routes and routes discovered via dynamic route resolution. End Nodes MAY use this
	 * bit to enable routing via return routes for the actual destination nodeID (if any exist). If the
	 * destination is the broadcast NodeID, the Z-Wave Module MUST ignore this option.
	 */
	AutoRoute = 0x04,

	//Reserved1 = 0x08,

	/**
	 * This option is used to explicitly disable any routing. This option MAY be used to force
	 * the Z-Wave Module to send the frame without routing. All available routing information
	 * will be ignored. This option SHOULD NOT be specified for normal application communi-
	 * cation. If the destination is the broadcast NodeID, the Z-Wave Module MUST ignore this
	 * option.
	 */
	NoRoute = 0x10,

	/**
	 * This option is used to enable the usage of Explore NPDUs if needed. The transmit op- tion
	 * TRANSMIT_OPTION_EXPLORE MAY be used to enable dynamic route resolution.
	 * Dynamic route resolution allows a node to discover new routes if all known routes are
	 * failing.
	 * An Explore NPDU cannot wake up FLiRS nodes. An Explore NPDU uses normal RF
	 * power level minus 6dB. This is also the power level used by a node finding its neighbors.
	 * For backwards compatibility reasons, Z-Wave Module SHOULD ignore this option if the
	 * destination NodeID does not support Explore NDPUs.
	 */
	Explore = 0x20,

	// Reserved2 = 0x40,
	// Reserved3 = 0x80,
}

export const ZW_SEND_DATA_TIMEOUT: number = 65 * 1000; // See INS13954-Instruction-Z-Wave-500-Series-Appl-Programmers-Guide-v6_81_0x.pdf, fig 9
export const ZW_SEND_DATA_DEFAULT_TRANSMIT_OPTIONS: TransmitOptions = // eslint-disable-next-line no-bitwise
	TransmitOptions.Ack | TransmitOptions.AutoRoute | TransmitOptions.Explore;

export interface ZwSendDataRequest {
	/**
	 * Destination node ID.
	 */
	nodeId: number;

	/**
	 * Z-Wave command class payload.
	 */
	payload: Buffer;

	/**
	 * Transmit timeout.
	 *
	 * Defaults to 65 seconds.
	 */
	timeout?: number;

	/**
	 * Optional callback that will be called just after transmission is
	 * completed. Can be used to e.g. install event listeners at the
	 * latest moment in time, to avoid getting outdated responses from
	 * previous (un)solicited events.
	 */
	afterSend?: () => void;

	/**
	 * Transmit options.
	 * Defaults to TransmitOptions.Ack | TransmitOptions.AutoRoute | TransmitOptions.Explore;
	 */
	txOptions?: TransmitOptions;
}

export interface ZwSendDataResponse {
	transmitTime?: number; // in milliseconds
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
		return {
			command: SerialApiCommandCode.ZW_SEND_DATA,
			params: Buffer.from([
				request.nodeId,
				request.payload.length,
				...request.payload,
				request.txOptions ?? ZW_SEND_DATA_DEFAULT_TRANSMIT_OPTIONS,
				transactionId,
			]),
			parseResponse: verifyTransmitResponse,
			tryParseEvent: buildTransmitCallbackParser(
				SerialApiCommandCode.ZW_SEND_DATA,
				transactionId,
				(remainingPayload: Buffer): ZwSendDataResponse => {
					let transmitTime: number | undefined;
					if (remainingPayload.length >= 2) {
						// DevKit 6.51+ added time measurement to response
						transmitTime = remainingPayload.readUInt16BE(0) * 10; // in ms
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
					return events.get(request.timeout ?? ZW_SEND_DATA_TIMEOUT);
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
