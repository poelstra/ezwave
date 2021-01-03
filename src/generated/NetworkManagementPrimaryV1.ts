/**
 * Command Class Network Management Primary, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum NetworkManagementPrimaryV1Commands {
	ControllerChange = 0x01,
	ControllerChangeStatus = 0x02,
}

export interface NetworkManagementPrimaryV1ControllerChangeData {
	seqNo: number; // 1 byte unsigned integer
	mode: number; // 1 byte unsigned integer
	// TODO param txOptions type bitmask or marker
}

export interface NetworkManagementPrimaryV1ControllerChangeStatusData {
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	newNodeID: number; // 1 byte unsigned integer
	nodeInfoLength: number; // 1 byte unsigned integer
	listening: boolean; // properties1[7]
	zWaveProtocolSpecificPart1: number; // properties1[6..0]
	opt: boolean; // properties2[7]
	zWaveProtocolSpecificPart2: number; // properties2[6..0]
	basicDeviceClass: number; // 1 byte unsigned integer
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
	// TODO param commandClass type enumarray
}

export class NetworkManagementPrimaryV1 extends CommandClassPacket<NetworkManagementPrimaryV1Commands> {
	public static readonly commandClass = CommandClasses.NetworkManagementPrimary; // 0x54 (84)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(NetworkManagementPrimaryV1, commandAndPayload);
	}

	// TODO This command is not yet fully supported by the decoder/encoder
	public static readonly ControllerChange = class ControllerChange extends CommandPacket<NetworkManagementPrimaryV1ControllerChangeData> {
		public static readonly CommandClass = NetworkManagementPrimaryV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "ControllerChange",
			"help": "Controller Change",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "seqNo",
					"help": "Seq. No",
					"length": 1
				},
				{
					"type": "integer",
					"name": "reserved",
					"help": "Reserved",
					"length": 1,
					"reserved": true
				},
				{
					"type": "integer",
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
					"type": "integer",
					"name": "txOptions",
					"help": "tx Options",
					"length": 0
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementPrimaryV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementPrimaryV1ControllerChangeData) {
			super(ControllerChange, data);
		}
	};

	// TODO This command is not yet fully supported by the decoder/encoder
	public static readonly ControllerChangeStatus = class ControllerChangeStatus extends CommandPacket<NetworkManagementPrimaryV1ControllerChangeStatusData> {
		public static readonly CommandClass = NetworkManagementPrimaryV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "ControllerChangeStatus",
			"help": "Controller Change Status",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "seqNo",
					"help": "Seq. No",
					"length": 1
				},
				{
					"type": "integer",
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
					"type": "integer",
					"name": "reserved",
					"help": "Reserved",
					"length": 1,
					"reserved": true
				},
				{
					"type": "integer",
					"name": "newNodeID",
					"help": "New Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "integer",
					"name": "nodeInfoLength",
					"help": "Node Info Length",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "listening",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "zWaveProtocolSpecificPart1",
							"mask": 127,
							"shift": 0
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
							"type": "boolean",
							"name": "opt",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "zWaveProtocolSpecificPart2",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "basicDeviceClass",
					"help": "Basic Device Class",
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
					"name": "commandClass",
					"help": "Command Class",
					"length": {
						"lengthType": "auto",
						"endOffset": 0
					},
					"valueType": "CMD_CLASS_REF"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NetworkManagementPrimaryV1)?.command === this.command;
		}

		constructor(data: Buffer | NetworkManagementPrimaryV1ControllerChangeStatusData) {
			super(ControllerChangeStatus, data);
		}
	};
}

export namespace NetworkManagementPrimaryV1 {
	export type ControllerChange = InstanceType<typeof NetworkManagementPrimaryV1.ControllerChange>;
	export type ControllerChangeStatus = InstanceType<typeof NetworkManagementPrimaryV1.ControllerChangeStatus>;
}
