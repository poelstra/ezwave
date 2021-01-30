import { decodeParams } from "../../../commands/decode";
import { ParameterType, LengthType, BitmaskType } from "../../../commands/spec";
import { convertFromJsonParams } from "../../../commands/specHelpers";
import { SerialApiCommandCode } from "../../serialApiCommandCode";
import { SerialApiResponseVoidCommand } from "../../serialApiResponseCommand";

export enum NodeCapabilityFlags {
	SlaveAPI = 0, // Otherwise ControllerAPI
	TimerSupported = 1,
	SecondaryController = 2, // Otherwise Primary
	IsSIS = 3,
}

export interface SerialAPIInitData {
	apiVersion: number;
	capabilities: Set<NodeCapabilityFlags>;
	nodes: Set<number>;
	chipType: number;
	chipVersion: number;
}

export class SerialApiGetInitDataCommand extends SerialApiResponseVoidCommand<SerialAPIInitData> {
	constructor() {
		super(SerialApiCommandCode.SERIAL_API_GET_INIT_DATA);
	}

	parseResponse(response: Buffer): SerialAPIInitData {
		return decodeParams<SerialAPIInitData>(
			SERIAL_API_INIT_DATA_PARAMS,
			response
		);
	}
}

const SERIAL_API_INIT_DATA_PARAMS = convertFromJsonParams([
	{ type: ParameterType.Integer, length: 1, name: "apiVersion", help: "" },
	{ type: ParameterType.Bitmask, length: 1, name: "capabilities", help: "" },
	{
		type: ParameterType.Integer,
		length: 1,
		name: "nodesLength",
		help: "",
		isAutogenerated: true,
		lengthOf: { refs: ["nodes"] },
	},
	{
		type: ParameterType.Bitmask,
		name: "nodes",
		help: "",
		length: {
			lengthType: LengthType.ParameterReference,
			from: { ref: "nodesLength" },
		},
		bitmaskType: BitmaskType.NodeNumber,
	},
	{
		type: ParameterType.Integer,
		length: 1,
		name: "chipType",
		help: "",
	},
	{
		type: ParameterType.Integer,
		length: 1,
		name: "chipVersion",
		help: "",
	},
]);
