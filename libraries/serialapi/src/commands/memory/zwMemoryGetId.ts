import { decodeParams } from "@ezwave/codec";
import { ParameterType } from "@ezwave/codec";
import { convertFromJsonParams } from "@ezwave/codec";
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
