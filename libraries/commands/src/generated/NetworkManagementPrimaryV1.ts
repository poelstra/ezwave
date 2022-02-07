/**
 * Command Class Network Management Primary, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum NetworkManagementPrimaryV1Commands {
	ControllerChange = 0x01,
	ControllerChangeStatus = 0x02,
}

export interface NetworkManagementPrimaryV1ControllerChangeData {
	seqNo: number; // 1 byte unsigned integer
	mode: number; // 1 byte unsigned integer
	txOptions: Set<TxOptionsEnum>; // 1 bytes
}

export interface NetworkManagementPrimaryV1ControllerChangeStatusData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	newNodeId: number; // 1 byte unsigned integer
	nodeInfoLength: number; // 1 byte unsigned integer
	listening: boolean; // properties1[7]
	zWaveProtocolSpecificPart1: number; // properties1[6..0]
	opt: boolean; // properties2[7]
	zWaveProtocolSpecificPart2: number; // properties2[6..0]
	basicDeviceClass: number; // 1 byte unsigned integer
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
	commandClasses: CommandClasses[]; // automatic length
}

export enum TxOptionsEnum {
	Ack = 0x0,
	LowPower = 0x1,
	AutoRoute = 0x2,
	Reserved = 0x3,
	NoRoute = 0x4,
	Explore = 0x5,
	NoRetransmission = 0x6,
	HighPower = 0x7,
}

export class NetworkManagementPrimaryV1 extends CommandClassPacket<NetworkManagementPrimaryV1Commands> {
	public static readonly commandClass = CommandClasses.NetworkManagementPrimary; // 0x54 (84)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(NetworkManagementPrimaryV1, commandAndPayload);
	}
}

export class ControllerChange extends CommandPacket<NetworkManagementPrimaryV1ControllerChangeData> {
	public static readonly CommandClass = NetworkManagementPrimaryV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "ControllerChange",
		"help": "Controller Change",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "seqNo",
				"help": "Seq. No",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "reserved",
				"help": "Reserved",
				"length": 1,
				"reserved": true
			},
			{
				"type": "Integer",
				"name": "mode",
				"help": "Mode",
				"length": 1,
				"values": {
					"2": {
						"name": "ControllerChangeStart",
						"help": "CONTROLLER_CHANGE_START"
					},
					"5": {
						"name": "ControllerChangeStop",
						"help": "CONTROLLER_CHANGE_STOP"
					}
				}
			},
			{
				"type": "Bitmask",
				"name": "txOptions",
				"help": "tx Options",
				"length": 1,
				"values": {
					"0": {
						"name": "Ack",
						"help": "Ack"
					},
					"1": {
						"name": "LowPower",
						"help": "Low Power"
					},
					"2": {
						"name": "AutoRoute",
						"help": "Auto Route"
					},
					"3": {
						"name": "Reserved",
						"help": "Reserved"
					},
					"4": {
						"name": "NoRoute",
						"help": "No Route"
					},
					"5": {
						"name": "Explore",
						"help": "Explore"
					},
					"6": {
						"name": "NoRetransmission",
						"help": "No Retransmission"
					},
					"7": {
						"name": "HighPower",
						"help": "High Power"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(NetworkManagementPrimaryV1)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementPrimaryV1ControllerChangeData) {
		super(ControllerChange, data);
	}
};

export class ControllerChangeStatus extends CommandPacket<NetworkManagementPrimaryV1ControllerChangeStatusData> {
	public static readonly CommandClass = NetworkManagementPrimaryV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "ControllerChangeStatus",
		"help": "Controller Change Status",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "seqNo",
				"help": "Seq. No",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "status",
				"help": "Status",
				"length": 1,
				"values": {
					"6": {
						"name": "NodeAddStatusDone",
						"help": "NODE_ADD_STATUS_DONE"
					},
					"7": {
						"name": "NodeAddStatusFailed",
						"help": "NODE_ADD_STATUS_FAILED"
					},
					"9": {
						"name": "NodeAddStatusSecurityFailed",
						"help": "NODE_ADD_STATUS_SECURITY_FAILED"
					}
				}
			},
			{
				"type": "Integer",
				"name": "reserved",
				"help": "Reserved",
				"length": 1,
				"reserved": true
			},
			{
				"type": "Integer",
				"name": "newNodeId",
				"help": "New Node ID",
				"length": 1,
				"valueType": "NodeNumber"
			},
			{
				"type": "Integer",
				"name": "nodeInfoLength",
				"help": "Node Info Length",
				"length": 1
			},
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
						"fieldType": "Integer",
						"name": "zWaveProtocolSpecificPart1",
						"mask": 127,
						"shift": 0
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
						"name": "opt",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "zWaveProtocolSpecificPart2",
						"mask": 127,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "basicDeviceClass",
				"help": "Basic Device Class",
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
		return packet.tryAs(NetworkManagementPrimaryV1)?.command === this.command;
	}

	public constructor(data: Buffer | NetworkManagementPrimaryV1ControllerChangeStatusData) {
		super(ControllerChangeStatus, data);
	}
};
