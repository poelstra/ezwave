/**
 * Z-Wave protocol Command Class, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum ZwaveV1Commands {
	AcceptLost = 0x17,
	AssignId = 0x03,
	AssignReturnRoute = 0x0c,
	CmdAssignSucReturnRoute = 0x14,
	CmdAutomaticControllerUpdateStart = 0x10,
	CmdNodesExist = 0x1f,
	CmdNodesExistReply = 0x20,
	CmdSetNwiMode = 0x22,
	CommandComplete = 0x07,
	FindNodesInRange = 0x04,
	GetNodesInRange = 0x05,
	Lost = 0x16,
	NewNodeRegistered = 0x0d,
	NewRangeRegistered = 0x0e,
	NodeInfo = 0x01,
	NodeRangeInfo = 0x06,
	ZwaveCmdNop = 0x00,
	CmdNopPower = 0x18,
	RequestNodeInfo = 0x02,
	ZwaveCmdReserveNodeIds = 0x19,
	CmdReservedIds = 0x1a,
	CmdSetSuc = 0x12,
	CmdSetSucAck = 0x13,
	CmdStaticRouteRequest = 0x15,
	CmdSucNodeId = 0x11,
	TransferEnd = 0x0b,
	TransferNewPrimaryComplete = 0x0f,
	TransferNodeInfo = 0x09,
	TransferPresentation = 0x08,
	TransferRangeInfo = 0x0a,
	ExcludeRequest = 0x23,
	AssignReturnRoutePriority = 0x24,
	AssignSucReturnRoutePriority = 0x25,
	IncludedNodeInfo = 0x26,
	SmartStartPrime = 0x27,
	SmartStartInclude = 0x28,
}

export interface ZwaveV1NodeInfoData {
	listening: boolean; // properties1[7]
	routing: boolean; // properties1[6]
	maxBaudRate: MaxBaudRateEnum; // properties1[5..3]
	protocolVersion: ProtocolVersionEnum; // properties1[2..0]
	optionalFunctionality: boolean; // properties2[7]
	sensor1000ms: boolean; // properties2[6]
	sensor250ms: boolean; // properties2[5]
	beamCapability: boolean; // properties2[4]
	routingSlave: boolean; // properties2[3]
	specificDevice: boolean; // properties2[2]
	controller: boolean; // properties2[1]
	security: boolean; // properties2[0]
	speedExtension: SpeedExtensionEnum; // properties3[2..0]
	basicDeviceClass?: number; // 1 byte unsigned integer
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
	commandClasses: CommandClasses[]; // automatic length
}

export enum MaxBaudRateEnum {
	Reserved = 0x0,
	_96Kbps = 0x1,
	_40Kbps = 0x2,
}

export enum ProtocolVersionEnum {
	Reserved = 0x0,
	ZWaveVersion20 = 0x1,
	ZWaveVersionZDK50xZDK42x = 0x2,
	ZWaveVersionZDK45xAndZDK60x = 0x3,
	Reserved0 = 0x4,
	Reserved1 = 0x5,
	Reserved2 = 0x6,
	Reserved3 = 0x7,
}

export enum SpeedExtensionEnum {
	Reserved = 0x0,
	_100Kbps = 0x1,
	_200Kbps = 0x2,
}

export class ZwaveV1 extends CommandClassPacket<ZwaveV1Commands> {
	public static readonly commandClass = CommandClasses.Zwave; // 0x01 (1)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ZwaveV1, commandAndPayload);
	}
}

export class AcceptLost extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x17; // 23
	public static readonly definition = convertFromJsonCommand({
		"command": 23,
		"name": "AcceptLost",
		"help": "Accept Lost",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(AcceptLost, data);
	}
};

export class AssignId extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "AssignId",
		"help": "Assign Id",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(AssignId, data);
	}
};

export class AssignReturnRoute extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x0c; // 12
	public static readonly definition = convertFromJsonCommand({
		"command": 12,
		"name": "AssignReturnRoute",
		"help": "Assign Return Route",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(AssignReturnRoute, data);
	}
};

export class CmdAssignSucReturnRoute extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x14; // 20
	public static readonly definition = convertFromJsonCommand({
		"command": 20,
		"name": "CmdAssignSucReturnRoute",
		"help": "Assign SUC Return Route",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(CmdAssignSucReturnRoute, data);
	}
};

export class CmdAutomaticControllerUpdateStart extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x10; // 16
	public static readonly definition = convertFromJsonCommand({
		"command": 16,
		"name": "CmdAutomaticControllerUpdateStart",
		"help": "Automatic Controller Update Start",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(CmdAutomaticControllerUpdateStart, data);
	}
};

export class CmdNodesExist extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x1f; // 31
	public static readonly definition = convertFromJsonCommand({
		"command": 31,
		"name": "CmdNodesExist",
		"help": "Cmd Nodes Exist",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(CmdNodesExist, data);
	}
};

export class CmdNodesExistReply extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x20; // 32
	public static readonly definition = convertFromJsonCommand({
		"command": 32,
		"name": "CmdNodesExistReply",
		"help": "Cmd Nodes Exist Reply",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(CmdNodesExistReply, data);
	}
};

export class CmdSetNwiMode extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x22; // 34
	public static readonly definition = convertFromJsonCommand({
		"command": 34,
		"name": "CmdSetNwiMode",
		"help": "Cmd Set Nwi Mode",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(CmdSetNwiMode, data);
	}
};

export class CommandComplete extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x07; // 7
	public static readonly definition = convertFromJsonCommand({
		"command": 7,
		"name": "CommandComplete",
		"help": "Command Complete",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(CommandComplete, data);
	}
};

export class FindNodesInRange extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
		"command": 4,
		"name": "FindNodesInRange",
		"help": "Find Nodes In Range",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(FindNodesInRange, data);
	}
};

export class GetNodesInRange extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x05; // 5
	public static readonly definition = convertFromJsonCommand({
		"command": 5,
		"name": "GetNodesInRange",
		"help": "Get Nodes In Range",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(GetNodesInRange, data);
	}
};

export class Lost extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x16; // 22
	public static readonly definition = convertFromJsonCommand({
		"command": 22,
		"name": "Lost",
		"help": "Lost",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(Lost, data);
	}
};

export class NewNodeRegistered extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x0d; // 13
	public static readonly definition = convertFromJsonCommand({
		"command": 13,
		"name": "NewNodeRegistered",
		"help": "New Node Registered",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(NewNodeRegistered, data);
	}
};

export class NewRangeRegistered extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x0e; // 14
	public static readonly definition = convertFromJsonCommand({
		"command": 14,
		"name": "NewRangeRegistered",
		"help": "New Range Registered",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(NewRangeRegistered, data);
	}
};

export class NodeInfo extends CommandPacket<ZwaveV1NodeInfoData> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "NodeInfo",
		"help": "Node Info",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "listening",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Boolean",
						"name": "routing",
						"mask": 64,
						"shift": 6
					},
					{
						"fieldType": "Enum",
						"name": "maxBaudRate",
						"mask": 56,
						"shift": 3,
						"values": {
							"0": {
								"name": "Reserved",
								"help": "Reserved"
							},
							"1": {
								"name": "96Kbps",
								"help": "9.6 kbps"
							},
							"2": {
								"name": "40Kbps",
								"help": "40 kbps"
							}
						}
					},
					{
						"fieldType": "Enum",
						"name": "protocolVersion",
						"mask": 7,
						"shift": 0,
						"values": {
							"0": {
								"name": "Reserved",
								"help": "Reserved"
							},
							"1": {
								"name": "ZWaveVersion20",
								"help": "Z-Wave Version 2.0"
							},
							"2": {
								"name": "ZWaveVersionZDK50xZDK42x",
								"help": "Z-Wave version ZDK 5.0x, ZDK 4.2x"
							},
							"3": {
								"name": "ZWaveVersionZDK45xAndZDK60x",
								"help": "Z-Wave version ZDK 4.5x and ZDK 6.0x"
							},
							"4": {
								"name": "Reserved",
								"help": "Reserved"
							},
							"5": {
								"name": "Reserved",
								"help": "Reserved"
							},
							"6": {
								"name": "Reserved",
								"help": "Reserved"
							},
							"7": {
								"name": "Reserved",
								"help": "Reserved"
							}
						}
					}
				]
			},
			{
				"type": "Bitfield",
				"name": "properties2",
				"help": "Properties2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "optionalFunctionality",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Boolean",
						"name": "sensor1000ms",
						"mask": 64,
						"shift": 6
					},
					{
						"fieldType": "Boolean",
						"name": "sensor250ms",
						"mask": 32,
						"shift": 5
					},
					{
						"fieldType": "Boolean",
						"name": "beamCapability",
						"mask": 16,
						"shift": 4
					},
					{
						"fieldType": "Boolean",
						"name": "routingSlave",
						"mask": 8,
						"shift": 3
					},
					{
						"fieldType": "Boolean",
						"name": "specificDevice",
						"mask": 4,
						"shift": 2
					},
					{
						"fieldType": "Boolean",
						"name": "controller",
						"mask": 2,
						"shift": 1,
						"presenceOf": {
							"refs": [
								"basicDeviceClass"
							]
						},
						"isAutogenerated": false
					},
					{
						"fieldType": "Boolean",
						"name": "security",
						"mask": 1,
						"shift": 0
					}
				]
			},
			{
				"type": "Bitfield",
				"name": "properties3",
				"help": "Properties3",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved2",
						"mask": 248,
						"shift": 3,
						"reserved": true
					},
					{
						"fieldType": "Enum",
						"name": "speedExtension",
						"mask": 7,
						"shift": 0,
						"values": {
							"0": {
								"name": "Reserved",
								"help": "Reserved"
							},
							"1": {
								"name": "100Kbps",
								"help": "100 kbps"
							},
							"2": {
								"name": "200Kbps",
								"help": "200 kbps"
							}
						}
					}
				]
			},
			{
				"type": "Integer",
				"name": "basicDeviceClass",
				"help": "Basic Device Class",
				"optional": {
					"ref": "properties2.controller"
				},
				"length": 1,
				"valueType": "BasicDevice"
			},
			{
				"type": "Integer",
				"name": "genericDeviceClass",
				"help": "Generic Device Class",
				"length": 1,
				"valueType": "GenericDevice"
			},
			{
				"type": "Integer",
				"name": "specificDeviceClass",
				"help": "Specific Device Class",
				"length": 1,
				"valueType": "SpecificDevice"
			},
			{
				"type": "Blob",
				"name": "commandClasses",
				"help": "Command Classes",
				"length": {
					"lengthType": "Auto"
				},
				"blobType": "CommandClasses"
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | ZwaveV1NodeInfoData) {
		super(NodeInfo, data);
	}
};

export class NodeRangeInfo extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x06; // 6
	public static readonly definition = convertFromJsonCommand({
		"command": 6,
		"name": "NodeRangeInfo",
		"help": "Node Range Info",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(NodeRangeInfo, data);
	}
};

export class ZwaveCmdNop extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x00; // 0
	public static readonly definition = convertFromJsonCommand({
		"command": 0,
		"name": "ZwaveCmdNop",
		"help": "NOP",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ZwaveCmdNop, data);
	}
};

export class CmdNopPower extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x18; // 24
	public static readonly definition = convertFromJsonCommand({
		"command": 24,
		"name": "CmdNopPower",
		"help": "NOP Power",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(CmdNopPower, data);
	}
};

export class RequestNodeInfo extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "RequestNodeInfo",
		"help": "Request Node Info",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(RequestNodeInfo, data);
	}
};

export class ZwaveCmdReserveNodeIds extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x19; // 25
	public static readonly definition = convertFromJsonCommand({
		"command": 25,
		"name": "ZwaveCmdReserveNodeIds",
		"help": "Reserve Node ID",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ZwaveCmdReserveNodeIds, data);
	}
};

export class CmdReservedIds extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x1a; // 26
	public static readonly definition = convertFromJsonCommand({
		"command": 26,
		"name": "CmdReservedIds",
		"help": "Reserved ID",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(CmdReservedIds, data);
	}
};

export class CmdSetSuc extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x12; // 18
	public static readonly definition = convertFromJsonCommand({
		"command": 18,
		"name": "CmdSetSuc",
		"help": "Set SUC",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(CmdSetSuc, data);
	}
};

export class CmdSetSucAck extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x13; // 19
	public static readonly definition = convertFromJsonCommand({
		"command": 19,
		"name": "CmdSetSucAck",
		"help": "Set SUC ACK",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(CmdSetSucAck, data);
	}
};

export class CmdStaticRouteRequest extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x15; // 21
	public static readonly definition = convertFromJsonCommand({
		"command": 21,
		"name": "CmdStaticRouteRequest",
		"help": "Static Route Request",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(CmdStaticRouteRequest, data);
	}
};

export class CmdSucNodeId extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x11; // 17
	public static readonly definition = convertFromJsonCommand({
		"command": 17,
		"name": "CmdSucNodeId",
		"help": "SUC Node ID",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(CmdSucNodeId, data);
	}
};

export class TransferEnd extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x0b; // 11
	public static readonly definition = convertFromJsonCommand({
		"command": 11,
		"name": "TransferEnd",
		"help": "Transfer End",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(TransferEnd, data);
	}
};

export class TransferNewPrimaryComplete extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x0f; // 15
	public static readonly definition = convertFromJsonCommand({
		"command": 15,
		"name": "TransferNewPrimaryComplete",
		"help": "Transfer New Primary Complete",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(TransferNewPrimaryComplete, data);
	}
};

export class TransferNodeInfo extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x09; // 9
	public static readonly definition = convertFromJsonCommand({
		"command": 9,
		"name": "TransferNodeInfo",
		"help": "Transfer Node Info",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(TransferNodeInfo, data);
	}
};

export class TransferPresentation extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x08; // 8
	public static readonly definition = convertFromJsonCommand({
		"command": 8,
		"name": "TransferPresentation",
		"help": "Transfer Presentation",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(TransferPresentation, data);
	}
};

export class TransferRangeInfo extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x0a; // 10
	public static readonly definition = convertFromJsonCommand({
		"command": 10,
		"name": "TransferRangeInfo",
		"help": "Transfer Range Info",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(TransferRangeInfo, data);
	}
};

export class ExcludeRequest extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x23; // 35
	public static readonly definition = convertFromJsonCommand({
		"command": 35,
		"name": "ExcludeRequest",
		"help": "Exclude Request",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ExcludeRequest, data);
	}
};

export class AssignReturnRoutePriority extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x24; // 36
	public static readonly definition = convertFromJsonCommand({
		"command": 36,
		"name": "AssignReturnRoutePriority",
		"help": "Assign Return Route Priority",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(AssignReturnRoutePriority, data);
	}
};

export class AssignSucReturnRoutePriority extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x25; // 37
	public static readonly definition = convertFromJsonCommand({
		"command": 37,
		"name": "AssignSucReturnRoutePriority",
		"help": "Assign SUC Return Route Priority",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(AssignSucReturnRoutePriority, data);
	}
};

export class IncludedNodeInfo extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x26; // 38
	public static readonly definition = convertFromJsonCommand({
		"command": 38,
		"name": "IncludedNodeInfo",
		"help": "Included Node Info",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(IncludedNodeInfo, data);
	}
};

export class SmartStartPrime extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x27; // 39
	public static readonly definition = convertFromJsonCommand({
		"command": 39,
		"name": "SmartStartPrime",
		"help": "Smart Start Prime",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(SmartStartPrime, data);
	}
};

export class SmartStartInclude extends CommandPacket<void> {
	public static readonly CommandClass = ZwaveV1;
	public static readonly command = 0x28; // 40
	public static readonly definition = convertFromJsonCommand({
		"command": 40,
		"name": "SmartStartInclude",
		"help": "Smart Start Include",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZwaveV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(SmartStartInclude, data);
	}
};
