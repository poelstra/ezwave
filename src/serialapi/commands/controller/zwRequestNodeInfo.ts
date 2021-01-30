import {
	CommandClassInfo,
	parseCommandClassInfo,
} from "../../../commands/commandClassInfo";
import { SerialApiCallbackCommand } from "../../serialApiCallbackCommand";
import { SerialApiCommandCode } from "../../serialApiCommandCode";

export interface NodeInfoResponse {
	nodeId: number;
	basicClass: number; // TODO BasicDeviceClassEnum
	genericClass: number; // TODO GenericDeviceClassEnum
	specificClass: number; // 'subclass' within GenericDeviceClassEnum
	commandClasses: CommandClassInfo;
}

enum UpdateState {
	NodeInfoReceived = 0x84,
	NodeInfoReqDone = 0x82,
	NodeInfoReqFailed = 0x81,
	RoutingPending = 0x80,
	NewIDAssigned = 0x40,
	DeleteDone = 0x20,
	SucID = 0x10,
}

export interface NodeInfoRequest {
	nodeId: number;
}

export class ZwRequestNodeInfoCommand extends SerialApiCallbackCommand<
	NodeInfoRequest,
	NodeInfoResponse
> {
	constructor(request: NodeInfoRequest) {
		super(SerialApiCommandCode.ZW_REQUEST_NODE_INFO, request);
	}

	serializeRequest(): Buffer {
		return Buffer.from([this.request.nodeId]);
	}

	tryParseCallback(
		command: SerialApiCommandCode,
		params: Buffer
	): NodeInfoResponse | undefined {
		if (command !== SerialApiCommandCode.ZW_APPLICATION_UPDATE) {
			return;
		}
		if (params.length < 6) {
			return;
		}
		const bStatus = params[0];
		if (bStatus === UpdateState.NodeInfoReqFailed) {
			throw new Error(
				`node ${this.request.nodeId} did not respond with Node Information Frame`
			);
		}
		// TODO There's also NodeInfoReqDone, but no idea when you'd get one
		if (bStatus !== UpdateState.NodeInfoReceived) {
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
		if (bNodeId !== this.request.nodeId) {
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
	}
}
