import {
	buildTransmitCallbackParser,
	DEFAULT_ZWAVE_TRANSMIT_TIMEOUT,
	verifyTransmitResponse,
} from "../callbackRequest";
import { RequestRunner } from "../RequestRunner";
import { CallbackRequestBuilder } from "../requests";
import { SerialApiCommandCode } from "../serialApiCommandCode";

export interface ZwAssignReturnRouteRequest {
	/**
	 * Source node.
	 *
	 * This is the Node to which 4 routes will be sent,
	 * which it can use to reach `destinationId`.
	 */
	sourceId: number;

	/**
	 * Destination node.
	 *
	 * This is the destination as seen from `sourceId`,
	 * i.e. not the node that the route table will be sent to.
	 */
	destinationId: number;

	/**
	 * Optional timeout to use. Defaults to 65 seconds.
	 */
	timeout?: number;
}

// Internal, use class instead
export function zwAssignReturnRouteBuilder(
	request: ZwAssignReturnRouteRequest
): CallbackRequestBuilder<boolean, void> {
	return (transactionId) => ({
		command: SerialApiCommandCode.ZW_ASSIGN_RETURN_ROUTE,
		params: Buffer.from([
			request.sourceId,
			request.destinationId,
			transactionId,
		]),
		parseResponse: verifyTransmitResponse,
		tryParseEvent: buildTransmitCallbackParser(
			SerialApiCommandCode.ZW_ASSIGN_RETURN_ROUTE,
			transactionId
		),
		handleEvents: async (events) => {
			await events.get(request.timeout ?? DEFAULT_ZWAVE_TRANSMIT_TIMEOUT);
		},
	});
}

/**
 * Assigns 4 controller computed routes between 2 nodes.
 *
 * This command should be called directly after inclusion to
 * set up a route to the SUC and/or Primary Controller.
 * It should also be called after making an association between
 * two nodes, or when the network topology has changed (e.g.
 * nodes added/removed/moved).
 */
export class ZwAssignReturnRoute extends RequestRunner<
	typeof zwAssignReturnRouteBuilder
> {
	public constructor(request: ZwAssignReturnRouteRequest) {
		super(zwAssignReturnRouteBuilder, request);
	}
}
