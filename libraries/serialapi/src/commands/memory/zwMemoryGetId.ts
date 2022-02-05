import { decodeParams } from "@ezwave/codec";
import { convertFromJsonParams, ParameterType } from "@ezwave/spec";
import { RequestRunner } from "../RequestRunner";
import { ResponseRequestBuilder } from "../requests";
import { SerialApiCommandCode } from "../serialApiCommandCode";
import { HomeAndNodeId } from "../types";

const ZW_MEMORY_GET_ID_PARAMS = convertFromJsonParams([
	{ type: ParameterType.Integer, length: 4, name: "homeId", help: "" },
	{ type: ParameterType.Integer, length: 1, name: "nodeId", help: "" },
]);

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
