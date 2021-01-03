/**
 * Command Class Controller Replication, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ControllerReplicationV1Commands {
	CtrlReplicationTransferGroup = 0x31,
	CtrlReplicationTransferGroupName = 0x32,
	CtrlReplicationTransferScene = 0x33,
	CtrlReplicationTransferSceneName = 0x34,
}

export interface ControllerReplicationV1CtrlReplicationTransferGroupData {
	sequenceNumber: number; // 1 byte unsigned integer
	groupID: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export interface ControllerReplicationV1CtrlReplicationTransferGroupNameData {
	sequenceNumber: number; // 1 byte unsigned integer
	groupID: number; // 1 byte unsigned integer
	groupName: Buffer; // automatic length
}

export interface ControllerReplicationV1CtrlReplicationTransferSceneData {
	sequenceNumber: number; // 1 byte unsigned integer
	sceneID: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
	level: number; // 1 byte unsigned integer
}

export interface ControllerReplicationV1CtrlReplicationTransferSceneNameData {
	sequenceNumber: number; // 1 byte unsigned integer
	sceneID: number; // 1 byte unsigned integer
	sceneName: Buffer; // automatic length
}

export class ControllerReplicationV1 extends CommandClassPacket<ControllerReplicationV1Commands> {
	public static readonly commandClass = CommandClasses.ControllerReplication; // 0x21 (33)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ControllerReplicationV1, commandAndPayload);
	}

	public static readonly CtrlReplicationTransferGroup = class CtrlReplicationTransferGroup extends CommandPacket<ControllerReplicationV1CtrlReplicationTransferGroupData> {
		public static readonly CommandClass = ControllerReplicationV1;
		public static readonly command = 0x31;
		public static readonly definition = {
			"command": 49,
			"name": "CtrlReplicationTransferGroup",
			"help": "Ctrl Replication Transfer Group",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "sequenceNumber",
					"help": "Sequence Number",
					"length": 1
				},
				{
					"type": "integer",
					"name": "groupID",
					"help": "Group ID",
					"length": 1
				},
				{
					"type": "integer",
					"name": "nodeID",
					"help": "Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ControllerReplicationV1)?.command === this.command;
		}

		constructor(data: Buffer | ControllerReplicationV1CtrlReplicationTransferGroupData) {
			super(CtrlReplicationTransferGroup, data);
		}
	};

	public static readonly CtrlReplicationTransferGroupName = class CtrlReplicationTransferGroupName extends CommandPacket<ControllerReplicationV1CtrlReplicationTransferGroupNameData> {
		public static readonly CommandClass = ControllerReplicationV1;
		public static readonly command = 0x32;
		public static readonly definition = {
			"command": 50,
			"name": "CtrlReplicationTransferGroupName",
			"help": "Ctrl Replication Transfer Group Name",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "sequenceNumber",
					"help": "Sequence Number",
					"length": 1
				},
				{
					"type": "integer",
					"name": "groupID",
					"help": "Group ID",
					"length": 1
				},
				{
					"type": "blob",
					"name": "groupName",
					"help": "Group Name",
					"length": {
						"lengthType": "auto",
						"endOffset": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ControllerReplicationV1)?.command === this.command;
		}

		constructor(data: Buffer | ControllerReplicationV1CtrlReplicationTransferGroupNameData) {
			super(CtrlReplicationTransferGroupName, data);
		}
	};

	public static readonly CtrlReplicationTransferScene = class CtrlReplicationTransferScene extends CommandPacket<ControllerReplicationV1CtrlReplicationTransferSceneData> {
		public static readonly CommandClass = ControllerReplicationV1;
		public static readonly command = 0x33;
		public static readonly definition = {
			"command": 51,
			"name": "CtrlReplicationTransferScene",
			"help": "Ctrl Replication Transfer Scene",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "sequenceNumber",
					"help": "Sequence Number",
					"length": 1
				},
				{
					"type": "integer",
					"name": "sceneID",
					"help": "Scene ID",
					"length": 1
				},
				{
					"type": "integer",
					"name": "nodeID",
					"help": "Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "integer",
					"name": "level",
					"help": "Level",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ControllerReplicationV1)?.command === this.command;
		}

		constructor(data: Buffer | ControllerReplicationV1CtrlReplicationTransferSceneData) {
			super(CtrlReplicationTransferScene, data);
		}
	};

	public static readonly CtrlReplicationTransferSceneName = class CtrlReplicationTransferSceneName extends CommandPacket<ControllerReplicationV1CtrlReplicationTransferSceneNameData> {
		public static readonly CommandClass = ControllerReplicationV1;
		public static readonly command = 0x34;
		public static readonly definition = {
			"command": 52,
			"name": "CtrlReplicationTransferSceneName",
			"help": "Ctrl Replication Transfer Scene Name",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "sequenceNumber",
					"help": "Sequence Number",
					"length": 1
				},
				{
					"type": "integer",
					"name": "sceneID",
					"help": "Scene ID",
					"length": 1
				},
				{
					"type": "blob",
					"name": "sceneName",
					"help": "Scene Name",
					"length": {
						"lengthType": "auto",
						"endOffset": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ControllerReplicationV1)?.command === this.command;
		}

		constructor(data: Buffer | ControllerReplicationV1CtrlReplicationTransferSceneNameData) {
			super(CtrlReplicationTransferSceneName, data);
		}
	};
}

export namespace ControllerReplicationV1 {
	export type CtrlReplicationTransferGroup = InstanceType<typeof ControllerReplicationV1.CtrlReplicationTransferGroup>;
	export type CtrlReplicationTransferGroupName = InstanceType<typeof ControllerReplicationV1.CtrlReplicationTransferGroupName>;
	export type CtrlReplicationTransferScene = InstanceType<typeof ControllerReplicationV1.CtrlReplicationTransferScene>;
	export type CtrlReplicationTransferSceneName = InstanceType<typeof ControllerReplicationV1.CtrlReplicationTransferSceneName>;
}
