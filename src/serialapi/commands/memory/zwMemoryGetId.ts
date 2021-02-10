import { decodeParams } from "../../../commands/decode";
import { ParameterType } from "../../../commands/spec";
import { convertFromJsonParams } from "../../../commands/specHelpers";
import { ResponseRequestBuilder } from "../requests";
import { RequestRunner } from "../RequestRunner";
import { SerialApiCommandCode } from "../serialApiCommandCode";
import { HomeAndNodeId } from "../types";

export function zwMemoryGetIdBuilder(): ResponseRequestBuilder<HomeAndNodeId> {
	return () => ({
		command: SerialApiCommandCode.ZW_MEMORY_GET_ID,
		parseResponse: (response) =>
			decodeParams<HomeAndNodeId>(ZW_MEMORY_GET_ID_PARAMS, response),
	});
}

export class ZwMemoryGetId extends RequestRunner<typeof zwMemoryGetIdBuilder> {
	constructor() {
		super(zwMemoryGetIdBuilder, undefined);
	}
}

const ZW_MEMORY_GET_ID_PARAMS = convertFromJsonParams([
	{ type: ParameterType.Integer, length: 4, name: "homeId", help: "" },
	{ type: ParameterType.Integer, length: 1, name: "nodeId", help: "" },
]);
