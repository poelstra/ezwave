import { decodeParams } from "@ezwave/codec";
import {
	BitmaskType,
	convertFromJsonParams,
	ParameterType,
} from "@ezwave/spec";
import { RequestRunner } from "../RequestRunner";
import { ResponseRequestBuilder } from "../requests";
import { SerialApiCommandCode } from "../serialApiCommandCode";

export interface SerialAPICapabilities {
	applVersion: number;
	applRevision: number;
	manufacturerId: number;
	manufacturerProductType: number;
	manufacturerProductId: number;
	supportedFunctions: Set<SerialApiCommandCode>;
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
	public constructor() {
		super(serialApiGetCapabilitiesBuilder, undefined);
	}
}
