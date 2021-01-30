import { decodeParams } from "../../../commands/decode";
import { BitmaskType, ParameterType } from "../../../commands/spec";
import { convertFromJsonParams } from "../../../commands/specHelpers";
import { SerialApiCommandCode } from "../../serialApiCommandCode";
import { SerialApiResponseVoidCommand } from "../../serialApiResponseCommand";

export interface SerialAPICapabilities {
	applVersion: number;
	applRevision: number;
	manufacturerId: number;
	manufacturerProductType: number;
	manufacturerProductId: number;
	supportedFunctions: Set<SerialApiCommandCode>;
}

export class SerialApiGetCapabilitiesCommand extends SerialApiResponseVoidCommand<SerialAPICapabilities> {
	constructor() {
		super(SerialApiCommandCode.SERIAL_API_GET_CAPABILITIES);
	}

	parseResponse(response: Buffer): SerialAPICapabilities {
		return decodeParams<SerialAPICapabilities>(
			SERIAL_API_CAPABILITIES_PARAMS,
			response
		);
	}
}

const SERIAL_API_CAPABILITIES_PARAMS = convertFromJsonParams([
	{ type: ParameterType.Integer, length: 1, name: "applVersion", help: "" },
	{ type: ParameterType.Integer, length: 1, name: "applRevision", help: "" },
	{
		type: ParameterType.Integer,
		length: 2,
		name: "manufacturerId",
		help: "",
	},
	{
		type: ParameterType.Integer,
		length: 2,
		name: "manufacturerProductType",
		help: "",
	},
	{
		type: ParameterType.Integer,
		length: 2,
		name: "manufacturerProductId",
		help: "",
	},
	{
		type: ParameterType.Bitmask,
		length: 256 / 8,
		name: "supportedFunctions",
		help: "",
		bitmaskType: BitmaskType.NodeNumber, // Not the right type to use, but applies a bit offset of 1
	},
]);
