import { decodeParams } from "@ezwave/codec";
import { convertFromJsonParams, Parameter, ParameterType } from "@ezwave/spec";
import { RequestRunner } from "../RequestRunner";
import { ResponseRequestBuilder } from "../requests";
import { SerialApiCommandCode } from "../serialApiCommandCode";
import { ZwLibraryType } from "../types";

export interface ZwVersionInfo {
	libraryVersion: string;
	libraryType: ZwLibraryType;
}

const ZW_GET_VERSION_PARAMS: Parameter[] = convertFromJsonParams([
	{ type: ParameterType.Text, length: 12, name: "libraryVersion", help: "" },
	{ type: ParameterType.Integer, length: 1, name: "libraryType", help: "" },
]);

export function zwGetVersionBuilder(): ResponseRequestBuilder<ZwVersionInfo> {
	return () => ({
		command: SerialApiCommandCode.ZW_GET_VERSION,
		parseResponse: (response) =>
			decodeParams(ZW_GET_VERSION_PARAMS, response),
	});
}

export class ZwGetVersion extends RequestRunner<typeof zwGetVersionBuilder> {
	public constructor() {
		super(zwGetVersionBuilder, undefined);
	}
}
