import { decodeParams } from "../../../commands/decode";
import { ParameterType } from "../../../commands/spec";
import { convertFromJsonParams } from "../../../commands/specHelpers";
import { SerialApiCommandCode } from "../serialApiCommandCode";
import { SerialApiResponseVoidCommand } from "../serialApiResponseCommand";
import { HomeAndNodeId } from "../../types";

export class ZwMemoryGetIdCommand extends SerialApiResponseVoidCommand<HomeAndNodeId> {
	constructor() {
		super(SerialApiCommandCode.ZW_MEMORY_GET_ID);
	}

	parseResponse(response: Buffer): HomeAndNodeId {
		return decodeParams<HomeAndNodeId>(ZW_MEMORY_GET_ID_PARAMS, response);
	}
}

const ZW_MEMORY_GET_ID_PARAMS = convertFromJsonParams([
	{ type: ParameterType.Integer, length: 4, name: "homeId", help: "" },
	{ type: ParameterType.Integer, length: 1, name: "nodeId", help: "" },
]);
