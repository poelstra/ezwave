import { parseCommandClassInfo } from "@ezwave/codec";
import { RequestRunner } from "../RequestRunner";
import { CallbackRequestBuilder } from "../requests";
import { SerialApiCommandCode } from "../serialApiCommandCode";
import { verifyTransmitResponse } from "../transport/zwSendData";
import { NodeInfoResponse } from "../types";

enum UpdateState {
	NodeInfoReceived = 0x84,
	NodeInfoReqDone = 0x82,
	NodeInfoReqFailed = 0x81,
	RoutingPending = 0x80,
	NewIDAssigned = 0x40,
	DeleteDone = 0x20,
	SucID = 0x10,
}

export interface ZwRequestNodeInfoRequest {
	nodeId: number;
}

const DEFAULT_ZW_REQUEST_NODE_INFO_TIMEOUT = 10 * 1000; // TODO what should this be? I've seen a request to a dead node being timed out by the Z-Wave chip in 8s.

export function zwRequestNodeInfoBuilder(
	request: ZwRequestNodeInfoRequest
): CallbackRequestBuilder<NodeInfoResponse, NodeInfoResponse> {
	return () => {
		return {
			command: SerialApiCommandCode.ZW_REQUEST_NODE_INFO,
			params: Buffer.from([request.nodeId]),
			parseResponse: verifyTransmitResponse,
			tryParseEvent: (
				command: SerialApiCommandCode,
				params: Buffer
			): NodeInfoResponse | undefined => {
				if (command !== SerialApiCommandCode.ZW_APPLICATION_UPDATE) {
					return;
				}
				if (params.length < 1) {
					return;
				}
				const bStatus = params[0];
				if (bStatus === UpdateState.NodeInfoReqFailed) {
					throw new Error(
						`node ${request.nodeId} did not respond with Node Information Frame`
					);
				}
				// TODO There's also NodeInfoReqDone, but no idea when you'd get one
				if (bStatus !== UpdateState.NodeInfoReceived) {
					return;
				}
				if (params.length < 6) {
					return;
				}
				// INS13954-7 4.3.1.8 ApplicationControllerUpdate
				// Example response:
				// NodeID | bLen | basic | generic | specific | commandclasses[]
				// 10       1a     04      11        01         5e 20 86 72 26 5a 59 85 73 98 7a 56 70 31 32 8e 60 75 71 27 22 ef 2b
				const bNodeId = params[1];
				const bLen = params[2];
				const basicClass = params[3];
				const genericClass = params[4];
				const specificClass = params[5];
				const commandClassesRaw = params.slice(6);
				if (bNodeId !== request.nodeId) {
					return;
				}
				if (bLen !== params.length - 3 || bLen < 3) {
					return;
				}
				const commandClasses = parseCommandClassInfo(commandClassesRaw);
				return {
					nodeId: bNodeId,
					basicClass,
					genericClass,
					specificClass,
					commandClasses,
				};
			},
			handleEvents: (events) =>
				events.get(DEFAULT_ZW_REQUEST_NODE_INFO_TIMEOUT),
		};
	};
}

export class ZwRequestNodeInfo extends RequestRunner<
	typeof zwRequestNodeInfoBuilder
> {
	public constructor(request: ZwRequestNodeInfoRequest) {
		super(zwRequestNodeInfoBuilder, request);
	}
}
