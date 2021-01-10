/**
 * Z-Wave protocol Command Class, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

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
	// TODO param commandClasses type enumarray
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

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ZwaveV1, commandAndPayload);
	}

	public static readonly AcceptLost = class AcceptLost extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x17;
		public static readonly definition = convertFromJsonCommand({
			"command": 23,
			"name": "AcceptLost",
			"help": "Accept Lost",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AcceptLost, data);
		}
	};

	public static readonly AssignId = class AssignId extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "AssignId",
			"help": "Assign Id",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AssignId, data);
		}
	};

	public static readonly AssignReturnRoute = class AssignReturnRoute extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x0c;
		public static readonly definition = convertFromJsonCommand({
			"command": 12,
			"name": "AssignReturnRoute",
			"help": "Assign Return Route",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AssignReturnRoute, data);
		}
	};

	public static readonly CmdAssignSucReturnRoute = class CmdAssignSucReturnRoute extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x14;
		public static readonly definition = convertFromJsonCommand({
			"command": 20,
			"name": "CmdAssignSucReturnRoute",
			"help": "Assign SUC Return Route",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(CmdAssignSucReturnRoute, data);
		}
	};

	public static readonly CmdAutomaticControllerUpdateStart = class CmdAutomaticControllerUpdateStart extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x10;
		public static readonly definition = convertFromJsonCommand({
			"command": 16,
			"name": "CmdAutomaticControllerUpdateStart",
			"help": "Automatic Controller Update Start",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(CmdAutomaticControllerUpdateStart, data);
		}
	};

	public static readonly CmdNodesExist = class CmdNodesExist extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x1f;
		public static readonly definition = convertFromJsonCommand({
			"command": 31,
			"name": "CmdNodesExist",
			"help": "Cmd Nodes Exist",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(CmdNodesExist, data);
		}
	};

	public static readonly CmdNodesExistReply = class CmdNodesExistReply extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x20;
		public static readonly definition = convertFromJsonCommand({
			"command": 32,
			"name": "CmdNodesExistReply",
			"help": "Cmd Nodes Exist Reply",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(CmdNodesExistReply, data);
		}
	};

	public static readonly CmdSetNwiMode = class CmdSetNwiMode extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x22;
		public static readonly definition = convertFromJsonCommand({
			"command": 34,
			"name": "CmdSetNwiMode",
			"help": "Cmd Set Nwi Mode",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(CmdSetNwiMode, data);
		}
	};

	public static readonly CommandComplete = class CommandComplete extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x07;
		public static readonly definition = convertFromJsonCommand({
			"command": 7,
			"name": "CommandComplete",
			"help": "Command Complete",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(CommandComplete, data);
		}
	};

	public static readonly FindNodesInRange = class FindNodesInRange extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "FindNodesInRange",
			"help": "Find Nodes In Range",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(FindNodesInRange, data);
		}
	};

	public static readonly GetNodesInRange = class GetNodesInRange extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "GetNodesInRange",
			"help": "Get Nodes In Range",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(GetNodesInRange, data);
		}
	};

	public static readonly Lost = class Lost extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x16;
		public static readonly definition = convertFromJsonCommand({
			"command": 22,
			"name": "Lost",
			"help": "Lost",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(Lost, data);
		}
	};

	public static readonly NewNodeRegistered = class NewNodeRegistered extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x0d;
		public static readonly definition = convertFromJsonCommand({
			"command": 13,
			"name": "NewNodeRegistered",
			"help": "New Node Registered",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(NewNodeRegistered, data);
		}
	};

	public static readonly NewRangeRegistered = class NewRangeRegistered extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x0e;
		public static readonly definition = convertFromJsonCommand({
			"command": 14,
			"name": "NewRangeRegistered",
			"help": "New Range Registered",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(NewRangeRegistered, data);
		}
	};

	// TODO This command is not yet fully supported by the decoder/encoder
	public static readonly NodeInfo = class NodeInfo extends CommandPacket<ZwaveV1NodeInfoData> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "NodeInfo",
			"help": "Node Info",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "boolean",
							"name": "listening",
							"mask": 128,
							"shift": 7
						},
						{
							"fieldType": "boolean",
							"name": "routing",
							"mask": 64,
							"shift": 6
						},
						{
							"fieldType": "enum",
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
							"fieldType": "enum",
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
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"fieldType": "boolean",
							"name": "optionalFunctionality",
							"mask": 128,
							"shift": 7
						},
						{
							"fieldType": "boolean",
							"name": "sensor1000ms",
							"mask": 64,
							"shift": 6
						},
						{
							"fieldType": "boolean",
							"name": "sensor250ms",
							"mask": 32,
							"shift": 5
						},
						{
							"fieldType": "boolean",
							"name": "beamCapability",
							"mask": 16,
							"shift": 4
						},
						{
							"fieldType": "boolean",
							"name": "routingSlave",
							"mask": 8,
							"shift": 3
						},
						{
							"fieldType": "boolean",
							"name": "specificDevice",
							"mask": 4,
							"shift": 2
						},
						{
							"fieldType": "boolean",
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
							"fieldType": "boolean",
							"name": "security",
							"mask": 1,
							"shift": 0
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "reserved2",
							"mask": 248,
							"shift": 3,
							"reserved": true
						},
						{
							"fieldType": "enum",
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
					"type": "integer",
					"name": "basicDeviceClass",
					"help": "Basic Device Class",
					"optional": {
						"ref": "properties2.controller"
					},
					"length": 1,
					"valueType": "BAS_DEV_REF"
				},
				{
					"type": "integer",
					"name": "genericDeviceClass",
					"help": "Generic Device Class",
					"length": 1,
					"valueType": "GEN_DEV_REF"
				},
				{
					"type": "integer",
					"name": "specificDeviceClass",
					"help": "Specific Device Class",
					"length": 1,
					"valueType": "SPEC_DEV_REF"
				},
				{
					"type": "enumarray",
					"name": "commandClasses",
					"help": "Command Classes",
					"length": {
						"lengthType": "auto"
					},
					"valueType": "CMD_CLASS_REF"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | ZwaveV1NodeInfoData) {
			super(NodeInfo, data);
		}
	};

	public static readonly NodeRangeInfo = class NodeRangeInfo extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "NodeRangeInfo",
			"help": "Node Range Info",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(NodeRangeInfo, data);
		}
	};

	public static readonly ZwaveCmdNop = class ZwaveCmdNop extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x00;
		public static readonly definition = convertFromJsonCommand({
			"command": 0,
			"name": "ZwaveCmdNop",
			"help": "NOP",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ZwaveCmdNop, data);
		}
	};

	public static readonly CmdNopPower = class CmdNopPower extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x18;
		public static readonly definition = convertFromJsonCommand({
			"command": 24,
			"name": "CmdNopPower",
			"help": "NOP Power",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(CmdNopPower, data);
		}
	};

	public static readonly RequestNodeInfo = class RequestNodeInfo extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "RequestNodeInfo",
			"help": "Request Node Info",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(RequestNodeInfo, data);
		}
	};

	public static readonly ZwaveCmdReserveNodeIds = class ZwaveCmdReserveNodeIds extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x19;
		public static readonly definition = convertFromJsonCommand({
			"command": 25,
			"name": "ZwaveCmdReserveNodeIds",
			"help": "Reserve Node ID",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ZwaveCmdReserveNodeIds, data);
		}
	};

	public static readonly CmdReservedIds = class CmdReservedIds extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x1a;
		public static readonly definition = convertFromJsonCommand({
			"command": 26,
			"name": "CmdReservedIds",
			"help": "Reserved ID",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(CmdReservedIds, data);
		}
	};

	public static readonly CmdSetSuc = class CmdSetSuc extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x12;
		public static readonly definition = convertFromJsonCommand({
			"command": 18,
			"name": "CmdSetSuc",
			"help": "Set SUC",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(CmdSetSuc, data);
		}
	};

	public static readonly CmdSetSucAck = class CmdSetSucAck extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x13;
		public static readonly definition = convertFromJsonCommand({
			"command": 19,
			"name": "CmdSetSucAck",
			"help": "Set SUC ACK",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(CmdSetSucAck, data);
		}
	};

	public static readonly CmdStaticRouteRequest = class CmdStaticRouteRequest extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x15;
		public static readonly definition = convertFromJsonCommand({
			"command": 21,
			"name": "CmdStaticRouteRequest",
			"help": "Static Route Request",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(CmdStaticRouteRequest, data);
		}
	};

	public static readonly CmdSucNodeId = class CmdSucNodeId extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x11;
		public static readonly definition = convertFromJsonCommand({
			"command": 17,
			"name": "CmdSucNodeId",
			"help": "SUC Node ID",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(CmdSucNodeId, data);
		}
	};

	public static readonly TransferEnd = class TransferEnd extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x0b;
		public static readonly definition = convertFromJsonCommand({
			"command": 11,
			"name": "TransferEnd",
			"help": "Transfer End",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(TransferEnd, data);
		}
	};

	public static readonly TransferNewPrimaryComplete = class TransferNewPrimaryComplete extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x0f;
		public static readonly definition = convertFromJsonCommand({
			"command": 15,
			"name": "TransferNewPrimaryComplete",
			"help": "Transfer New Primary Complete",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(TransferNewPrimaryComplete, data);
		}
	};

	public static readonly TransferNodeInfo = class TransferNodeInfo extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x09;
		public static readonly definition = convertFromJsonCommand({
			"command": 9,
			"name": "TransferNodeInfo",
			"help": "Transfer Node Info",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(TransferNodeInfo, data);
		}
	};

	public static readonly TransferPresentation = class TransferPresentation extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x08;
		public static readonly definition = convertFromJsonCommand({
			"command": 8,
			"name": "TransferPresentation",
			"help": "Transfer Presentation",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(TransferPresentation, data);
		}
	};

	public static readonly TransferRangeInfo = class TransferRangeInfo extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x0a;
		public static readonly definition = convertFromJsonCommand({
			"command": 10,
			"name": "TransferRangeInfo",
			"help": "Transfer Range Info",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(TransferRangeInfo, data);
		}
	};

	public static readonly ExcludeRequest = class ExcludeRequest extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x23;
		public static readonly definition = convertFromJsonCommand({
			"command": 35,
			"name": "ExcludeRequest",
			"help": "Exclude Request",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ExcludeRequest, data);
		}
	};

	public static readonly AssignReturnRoutePriority = class AssignReturnRoutePriority extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x24;
		public static readonly definition = convertFromJsonCommand({
			"command": 36,
			"name": "AssignReturnRoutePriority",
			"help": "Assign Return Route Priority",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AssignReturnRoutePriority, data);
		}
	};

	public static readonly AssignSucReturnRoutePriority = class AssignSucReturnRoutePriority extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x25;
		public static readonly definition = convertFromJsonCommand({
			"command": 37,
			"name": "AssignSucReturnRoutePriority",
			"help": "Assign SUC Return Route Priority",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AssignSucReturnRoutePriority, data);
		}
	};

	public static readonly IncludedNodeInfo = class IncludedNodeInfo extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x26;
		public static readonly definition = convertFromJsonCommand({
			"command": 38,
			"name": "IncludedNodeInfo",
			"help": "Included Node Info",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(IncludedNodeInfo, data);
		}
	};

	public static readonly SmartStartPrime = class SmartStartPrime extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x27;
		public static readonly definition = convertFromJsonCommand({
			"command": 39,
			"name": "SmartStartPrime",
			"help": "Smart Start Prime",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SmartStartPrime, data);
		}
	};

	public static readonly SmartStartInclude = class SmartStartInclude extends CommandPacket<void> {
		public static readonly CommandClass = ZwaveV1;
		public static readonly command = 0x28;
		public static readonly definition = convertFromJsonCommand({
			"command": 40,
			"name": "SmartStartInclude",
			"help": "Smart Start Include",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZwaveV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SmartStartInclude, data);
		}
	};
}

export namespace ZwaveV1 {
	export type AcceptLost = InstanceType<typeof ZwaveV1.AcceptLost>;
	export type AssignId = InstanceType<typeof ZwaveV1.AssignId>;
	export type AssignReturnRoute = InstanceType<typeof ZwaveV1.AssignReturnRoute>;
	export type CmdAssignSucReturnRoute = InstanceType<typeof ZwaveV1.CmdAssignSucReturnRoute>;
	export type CmdAutomaticControllerUpdateStart = InstanceType<typeof ZwaveV1.CmdAutomaticControllerUpdateStart>;
	export type CmdNodesExist = InstanceType<typeof ZwaveV1.CmdNodesExist>;
	export type CmdNodesExistReply = InstanceType<typeof ZwaveV1.CmdNodesExistReply>;
	export type CmdSetNwiMode = InstanceType<typeof ZwaveV1.CmdSetNwiMode>;
	export type CommandComplete = InstanceType<typeof ZwaveV1.CommandComplete>;
	export type FindNodesInRange = InstanceType<typeof ZwaveV1.FindNodesInRange>;
	export type GetNodesInRange = InstanceType<typeof ZwaveV1.GetNodesInRange>;
	export type Lost = InstanceType<typeof ZwaveV1.Lost>;
	export type NewNodeRegistered = InstanceType<typeof ZwaveV1.NewNodeRegistered>;
	export type NewRangeRegistered = InstanceType<typeof ZwaveV1.NewRangeRegistered>;
	export type NodeInfo = InstanceType<typeof ZwaveV1.NodeInfo>;
	export type NodeRangeInfo = InstanceType<typeof ZwaveV1.NodeRangeInfo>;
	export type ZwaveCmdNop = InstanceType<typeof ZwaveV1.ZwaveCmdNop>;
	export type CmdNopPower = InstanceType<typeof ZwaveV1.CmdNopPower>;
	export type RequestNodeInfo = InstanceType<typeof ZwaveV1.RequestNodeInfo>;
	export type ZwaveCmdReserveNodeIds = InstanceType<typeof ZwaveV1.ZwaveCmdReserveNodeIds>;
	export type CmdReservedIds = InstanceType<typeof ZwaveV1.CmdReservedIds>;
	export type CmdSetSuc = InstanceType<typeof ZwaveV1.CmdSetSuc>;
	export type CmdSetSucAck = InstanceType<typeof ZwaveV1.CmdSetSucAck>;
	export type CmdStaticRouteRequest = InstanceType<typeof ZwaveV1.CmdStaticRouteRequest>;
	export type CmdSucNodeId = InstanceType<typeof ZwaveV1.CmdSucNodeId>;
	export type TransferEnd = InstanceType<typeof ZwaveV1.TransferEnd>;
	export type TransferNewPrimaryComplete = InstanceType<typeof ZwaveV1.TransferNewPrimaryComplete>;
	export type TransferNodeInfo = InstanceType<typeof ZwaveV1.TransferNodeInfo>;
	export type TransferPresentation = InstanceType<typeof ZwaveV1.TransferPresentation>;
	export type TransferRangeInfo = InstanceType<typeof ZwaveV1.TransferRangeInfo>;
	export type ExcludeRequest = InstanceType<typeof ZwaveV1.ExcludeRequest>;
	export type AssignReturnRoutePriority = InstanceType<typeof ZwaveV1.AssignReturnRoutePriority>;
	export type AssignSucReturnRoutePriority = InstanceType<typeof ZwaveV1.AssignSucReturnRoutePriority>;
	export type IncludedNodeInfo = InstanceType<typeof ZwaveV1.IncludedNodeInfo>;
	export type SmartStartPrime = InstanceType<typeof ZwaveV1.SmartStartPrime>;
	export type SmartStartInclude = InstanceType<typeof ZwaveV1.SmartStartInclude>;
}
