import { RequestRunner } from "../RequestRunner";
import { ResponseRequestBuilder } from "../requests";
import { SerialApiCommandCode } from "../serialApiCommandCode";

export interface ZwIsFailedNodeRequest {
	nodeId: number;
}

/**
 * Checks whether the controller currently considers the given node
 * to be on its internal list of failing nodes.
 *
 * Note that this list is maintained by the Z-Wave protocol itself:
 * a node is only added to it after the controller has actually tried
 * (and failed) to communicate with it. Simply being unreachable is
 * not enough; something (e.g. a `ZW_SEND_DATA`) must have failed
 * against it first. `ZW_REPLACE_FAILED_NODE` and `ZW_REMOVE_FAILED_NODE_ID`
 * both require the node to be on this list, and otherwise reject with
 * a 'node not found' type error.
 */
export function zwIsFailedNodeBuilder(
	request: ZwIsFailedNodeRequest
): ResponseRequestBuilder<boolean> {
	return () => ({
		command: SerialApiCommandCode.ZW_IS_FAILED_NODE_ID,
		params: Buffer.from([request.nodeId]),
		parseResponse: (response: Buffer): boolean => {
			if (response.length < 1) {
				throw new Error(
					`command ${SerialApiCommandCode[SerialApiCommandCode.ZW_IS_FAILED_NODE_ID]} failed: got zero-length response from Z-Wave Serial device`
				);
			}
			return response[0] !== 0;
		},
	});
}

export class ZwIsFailedNode extends RequestRunner<
	typeof zwIsFailedNodeBuilder
> {
	public constructor(request: ZwIsFailedNodeRequest) {
		super(zwIsFailedNodeBuilder, request);
	}
}
