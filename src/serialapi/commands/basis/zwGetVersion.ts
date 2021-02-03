import { decodeParams } from "../../../commands/decode";
import { ParameterType } from "../../../commands/spec";
import { convertFromJsonParams } from "../../../commands/specHelpers";
import { SerialApiCommandCode } from "../serialApiCommandCode";
import { SerialApiResponseVoidCommand } from "../serialApiResponseCommand";
import { ZwLibraryType } from "../../types";

export interface ZwVersionInfo {
	libraryVersion: string;
	libraryType: ZwLibraryType;
}

export class ZwGetVersionCommand extends SerialApiResponseVoidCommand<ZwVersionInfo> {
	constructor() {
		super(SerialApiCommandCode.ZW_GET_VERSION);
	}

	parseResponse(response: Buffer): ZwVersionInfo {
		return decodeParams<ZwVersionInfo>(ZW_GET_VERSION_PARAMS, response);
	}
}

const ZW_GET_VERSION_PARAMS = convertFromJsonParams([
	{ type: ParameterType.Text, length: 12, name: "libraryVersion", help: "" },
	{ type: ParameterType.Integer, length: 1, name: "libraryType", help: "" },
]);
