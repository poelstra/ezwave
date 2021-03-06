import { decodeParams } from "../../../commands/decode";
import { BitmaskType, ParameterType } from "../../../commands/spec";
import { convertFromJsonParams } from "../../../commands/specHelpers";
import { ResponseRequestBuilder } from "../requests";
import { RequestRunner } from "../RequestRunner";
import { SerialApiCommandCode } from "../serialApiCommandCode";

export interface SerialAPICapabilities {
	applVersion: number;
	applRevision: number;
	manufacturerId: number;
	manufacturerProductType: number;
	manufacturerProductId: number;
	supportedFunctions: Set<SerialApiCommandCode>;
}

export function serialApiGetCapabilitiesBuilder(): ResponseRequestBuilder<SerialAPICapabilities> {
	return () => ({
		command: SerialApiCommandCode.SERIAL_API_GET_CAPABILITIES,
		parseResponse: (response) =>
			decodeParams<SerialAPICapabilities>(
				SERIAL_API_CAPABILITIES_PARAMS,
				response
			),
	});
}

export class SerialApiGetCapabilities extends RequestRunner<
	typeof serialApiGetCapabilitiesBuilder
> {
	constructor() {
		super(serialApiGetCapabilitiesBuilder, undefined);
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
