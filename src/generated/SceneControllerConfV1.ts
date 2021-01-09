/**
 * Command Class Scene Controller Conf, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum SceneControllerConfV1Commands {
	SceneControllerConfGet = 0x02,
	SceneControllerConfReport = 0x03,
	SceneControllerConfSet = 0x01,
}

export interface SceneControllerConfV1SceneControllerConfGetData {
	groupID: number; // 1 byte unsigned integer
}

export interface SceneControllerConfV1SceneControllerConfReportData {
	groupID: number; // 1 byte unsigned integer
	sceneID: number; // 1 byte unsigned integer
	dimmingDuration: number; // 1 byte unsigned integer
}

export interface SceneControllerConfV1SceneControllerConfSetData {
	groupID: number; // 1 byte unsigned integer
	sceneID: number; // 1 byte unsigned integer
	dimmingDuration: number; // 1 byte unsigned integer
}

export class SceneControllerConfV1 extends CommandClassPacket<SceneControllerConfV1Commands> {
	public static readonly commandClass = CommandClasses.SceneControllerConf; // 0x2d (45)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SceneControllerConfV1, commandAndPayload);
	}

	public static readonly SceneControllerConfGet = class SceneControllerConfGet extends CommandPacket<SceneControllerConfV1SceneControllerConfGetData> {
		public static readonly CommandClass = SceneControllerConfV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "SceneControllerConfGet",
			"help": "Scene Controller Conf Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "groupID",
					"help": "Group ID",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SceneControllerConfV1)?.command === this.command;
		}

		constructor(data: Buffer | SceneControllerConfV1SceneControllerConfGetData) {
			super(SceneControllerConfGet, data);
		}
	};

	public static readonly SceneControllerConfReport = class SceneControllerConfReport extends CommandPacket<SceneControllerConfV1SceneControllerConfReportData> {
		public static readonly CommandClass = SceneControllerConfV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "SceneControllerConfReport",
			"help": "Scene Controller Conf Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "groupID",
					"help": "Group ID",
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SceneControllerConfV1)?.command === this.command;
		}

		constructor(data: Buffer | SceneControllerConfV1SceneControllerConfReportData) {
			super(SceneControllerConfReport, data);
		}
	};

	public static readonly SceneControllerConfSet = class SceneControllerConfSet extends CommandPacket<SceneControllerConfV1SceneControllerConfSetData> {
		public static readonly CommandClass = SceneControllerConfV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "SceneControllerConfSet",
			"help": "Scene Controller Conf Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "groupID",
					"help": "Group ID",
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SceneControllerConfV1)?.command === this.command;
		}

		constructor(data: Buffer | SceneControllerConfV1SceneControllerConfSetData) {
			super(SceneControllerConfSet, data);
		}
	};
}

export namespace SceneControllerConfV1 {
	export type SceneControllerConfGet = InstanceType<typeof SceneControllerConfV1.SceneControllerConfGet>;
	export type SceneControllerConfReport = InstanceType<typeof SceneControllerConfV1.SceneControllerConfReport>;
	export type SceneControllerConfSet = InstanceType<typeof SceneControllerConfV1.SceneControllerConfSet>;
}
