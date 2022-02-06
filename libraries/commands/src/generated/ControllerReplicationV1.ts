/**
 * Command Class Controller Replication, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum ControllerReplicationV1Commands {
	CtrlReplicationTransferGroup = 0x31,
	CtrlReplicationTransferGroupName = 0x32,
	CtrlReplicationTransferScene = 0x33,
	CtrlReplicationTransferSceneName = 0x34,
}

export interface ControllerReplicationV1CtrlReplicationTransferGroupData {
	sequenceNumber: number; // 1 byte unsigned integer
	groupId: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
}

export interface ControllerReplicationV1CtrlReplicationTransferGroupNameData {
	sequenceNumber: number; // 1 byte unsigned integer
	groupId: number; // 1 byte unsigned integer
	groupName: Buffer; // automatic length
}

export interface ControllerReplicationV1CtrlReplicationTransferSceneData {
	sequenceNumber: number; // 1 byte unsigned integer
	sceneId: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
	level: number; // 1 byte unsigned integer
}

export interface ControllerReplicationV1CtrlReplicationTransferSceneNameData {
	sequenceNumber: number; // 1 byte unsigned integer
	sceneId: number; // 1 byte unsigned integer
	sceneName: Buffer; // automatic length
}

export class ControllerReplicationV1 extends CommandClassPacket<ControllerReplicationV1Commands> {
	public static readonly commandClass = CommandClasses.ControllerReplication; // 0x21 (33)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ControllerReplicationV1, commandAndPayload);
	}
}

export class CtrlReplicationTransferGroup extends CommandPacket<ControllerReplicationV1CtrlReplicationTransferGroupData> {
	public static readonly CommandClass = ControllerReplicationV1;
	public static readonly command = 0x31; // 49
	public static readonly definition = convertFromJsonCommand({
		"command": 49,
		"name": "CtrlReplicationTransferGroup",
		"help": "Ctrl Replication Transfer Group",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "sequenceNumber",
				"help": "Sequence Number",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "groupId",
				"help": "Group ID",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "nodeId",
				"help": "Node ID",
				"length": 1,
				"valueType": "NodeNumber"
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ControllerReplicationV1)?.command === this.command;
	}

	constructor(data: Buffer | ControllerReplicationV1CtrlReplicationTransferGroupData) {
		super(CtrlReplicationTransferGroup, data);
	}
};

export class CtrlReplicationTransferGroupName extends CommandPacket<ControllerReplicationV1CtrlReplicationTransferGroupNameData> {
	public static readonly CommandClass = ControllerReplicationV1;
	public static readonly command = 0x32; // 50
	public static readonly definition = convertFromJsonCommand({
		"command": 50,
		"name": "CtrlReplicationTransferGroupName",
		"help": "Ctrl Replication Transfer Group Name",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "sequenceNumber",
				"help": "Sequence Number",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "groupId",
				"help": "Group ID",
				"length": 1
			},
			{
				"type": "Blob",
				"name": "groupName",
				"help": "Group Name",
				"length": {
					"lengthType": "Auto"
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ControllerReplicationV1)?.command === this.command;
	}

	constructor(data: Buffer | ControllerReplicationV1CtrlReplicationTransferGroupNameData) {
		super(CtrlReplicationTransferGroupName, data);
	}
};

export class CtrlReplicationTransferScene extends CommandPacket<ControllerReplicationV1CtrlReplicationTransferSceneData> {
	public static readonly CommandClass = ControllerReplicationV1;
	public static readonly command = 0x33; // 51
	public static readonly definition = convertFromJsonCommand({
		"command": 51,
		"name": "CtrlReplicationTransferScene",
		"help": "Ctrl Replication Transfer Scene",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "sequenceNumber",
				"help": "Sequence Number",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "sceneId",
				"help": "Scene ID",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "nodeId",
				"help": "Node ID",
				"length": 1,
				"valueType": "NodeNumber"
			},
			{
				"type": "Integer",
				"name": "level",
				"help": "Level",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ControllerReplicationV1)?.command === this.command;
	}

	constructor(data: Buffer | ControllerReplicationV1CtrlReplicationTransferSceneData) {
		super(CtrlReplicationTransferScene, data);
	}
};

export class CtrlReplicationTransferSceneName extends CommandPacket<ControllerReplicationV1CtrlReplicationTransferSceneNameData> {
	public static readonly CommandClass = ControllerReplicationV1;
	public static readonly command = 0x34; // 52
	public static readonly definition = convertFromJsonCommand({
		"command": 52,
		"name": "CtrlReplicationTransferSceneName",
		"help": "Ctrl Replication Transfer Scene Name",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "sequenceNumber",
				"help": "Sequence Number",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "sceneId",
				"help": "Scene ID",
				"length": 1
			},
			{
				"type": "Blob",
				"name": "sceneName",
				"help": "Scene Name",
				"length": {
					"lengthType": "Auto"
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ControllerReplicationV1)?.command === this.command;
	}

	constructor(data: Buffer | ControllerReplicationV1CtrlReplicationTransferSceneNameData) {
		super(CtrlReplicationTransferSceneName, data);
	}
};
