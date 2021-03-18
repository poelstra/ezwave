import { decodeParams } from "../../../commands/decode";
import { ParameterType } from "../../../commands/spec";
import { convertFromJsonParams } from "../../../commands/specHelpers";
import { ResponseRequestBuilder } from "../requests";
import { RequestRunner } from "../RequestRunner";
import { SerialApiCommandCode } from "../serialApiCommandCode";
import { ZwLibraryType } from "../types";

export interface ZwVersionInfo {
	libraryVersion: string;
	libraryType: ZwLibraryType;
}

export function zwGetVersionBuilder(): ResponseRequestBuilder<ZwVersionInfo> {
	return () => ({
		command: SerialApiCommandCode.ZW_GET_VERSION,
		parseResponse: (response) =>
			decodeParams(ZW_GET_VERSION_PARAMS, response),
	});
}

export class ZwGetVersion extends RequestRunner<typeof zwGetVersionBuilder> {
	constructor() {
		super(zwGetVersionBuilder, undefined);
	}
}

const ZW_GET_VERSION_PARAMS = convertFromJsonParams([
	{ type: ParameterType.Text, length: 12, name: "libraryVersion", help: "" },
	{ type: ParameterType.Integer, length: 1, name: "libraryType", help: "" },
]);
