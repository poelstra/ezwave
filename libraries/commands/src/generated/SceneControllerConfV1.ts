/**
 * Command Class Scene Controller Conf, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum SceneControllerConfV1Commands {
	SceneControllerConfGet = 0x02,
	SceneControllerConfReport = 0x03,
	SceneControllerConfSet = 0x01,
}

export interface SceneControllerConfV1SceneControllerConfGetData {
	groupId: number; // 1 byte unsigned integer
}

export interface SceneControllerConfV1SceneControllerConfReportData {
	groupId: number; // 1 byte unsigned integer
	sceneId: number; // 1 byte unsigned integer
	dimmingDuration: number; // 1 byte unsigned integer
}

export interface SceneControllerConfV1SceneControllerConfSetData {
	groupId: number; // 1 byte unsigned integer
	sceneId: number; // 1 byte unsigned integer
	dimmingDuration: number; // 1 byte unsigned integer
}

export class SceneControllerConfV1 extends CommandClassPacket<SceneControllerConfV1Commands> {
	public static readonly commandClass = CommandClasses.SceneControllerConf; // 0x2d (45)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(SceneControllerConfV1, commandAndPayload);
	}
}

export class SceneControllerConfGet extends CommandPacket<SceneControllerConfV1SceneControllerConfGetData> {
	public static readonly CommandClass = SceneControllerConfV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "SceneControllerConfGet",
		"help": "Scene Controller Conf Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "groupId",
				"help": "Group ID",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SceneControllerConfV1)?.command === this.command;
	}

	public constructor(data: Buffer | SceneControllerConfV1SceneControllerConfGetData) {
		super(SceneControllerConfGet, data);
	}
};

export class SceneControllerConfReport extends CommandPacket<SceneControllerConfV1SceneControllerConfReportData> {
	public static readonly CommandClass = SceneControllerConfV1;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "SceneControllerConfReport",
		"help": "Scene Controller Conf Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "groupId",
				"help": "Group ID",
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
				"name": "dimmingDuration",
				"help": "Dimming Duration",
				"length": 1,
				"values": {
					"0": {
						"name": "Instantly",
						"help": "Instantly"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SceneControllerConfV1)?.command === this.command;
	}

	public constructor(data: Buffer | SceneControllerConfV1SceneControllerConfReportData) {
		super(SceneControllerConfReport, data);
	}
};

export class SceneControllerConfSet extends CommandPacket<SceneControllerConfV1SceneControllerConfSetData> {
	public static readonly CommandClass = SceneControllerConfV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "SceneControllerConfSet",
		"help": "Scene Controller Conf Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "groupId",
				"help": "Group ID",
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
				"name": "dimmingDuration",
				"help": "Dimming Duration",
				"length": 1,
				"values": {
					"0": {
						"name": "Instantly",
						"help": "Instantly"
					},
					"255": {
						"name": "FactoryDefault",
						"help": "factory default"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SceneControllerConfV1)?.command === this.command;
	}

	public constructor(data: Buffer | SceneControllerConfV1SceneControllerConfSetData) {
		super(SceneControllerConfSet, data);
	}
};
