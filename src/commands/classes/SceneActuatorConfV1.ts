/**
 * Command Class Scene Actuator Conf, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum SceneActuatorConfV1Commands {
	SceneActuatorConfGet = 0x02,
	SceneActuatorConfReport = 0x03,
	SceneActuatorConfSet = 0x01,
}

export interface SceneActuatorConfV1SceneActuatorConfGetData {
	sceneId: number; // 1 byte unsigned integer
}

export interface SceneActuatorConfV1SceneActuatorConfReportData {
	sceneId: number; // 1 byte unsigned integer
	level: number; // 1 byte unsigned integer
	dimmingDuration: number; // 1 byte unsigned integer
}

export interface SceneActuatorConfV1SceneActuatorConfSetData {
	sceneId: number; // 1 byte unsigned integer
	dimmingDuration: number; // 1 byte unsigned integer
	override: boolean; // level2[7]
	level: number; // 1 byte unsigned integer
}

export class SceneActuatorConfV1 extends CommandClassPacket<SceneActuatorConfV1Commands> {
	public static readonly commandClass = CommandClasses.SceneActuatorConf; // 0x2c (44)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SceneActuatorConfV1, commandAndPayload);
	}

	public static readonly SceneActuatorConfGet = class SceneActuatorConfGet extends CommandPacket<SceneActuatorConfV1SceneActuatorConfGetData> {
		public static readonly CommandClass = SceneActuatorConfV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "SceneActuatorConfGet",
			"help": "Scene Actuator Conf Get",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "sceneId",
					"help": "Scene ID",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SceneActuatorConfV1)?.command === this.command;
		}

		constructor(data: Buffer | SceneActuatorConfV1SceneActuatorConfGetData) {
			super(SceneActuatorConfGet, data);
		}
	};

	public static readonly SceneActuatorConfReport = class SceneActuatorConfReport extends CommandPacket<SceneActuatorConfV1SceneActuatorConfReportData> {
		public static readonly CommandClass = SceneActuatorConfV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "SceneActuatorConfReport",
			"help": "Scene Actuator Conf Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "sceneId",
					"help": "Scene ID",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "level",
					"help": "Level",
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SceneActuatorConfV1)?.command === this.command;
		}

		constructor(data: Buffer | SceneActuatorConfV1SceneActuatorConfReportData) {
			super(SceneActuatorConfReport, data);
		}
	};

	public static readonly SceneActuatorConfSet = class SceneActuatorConfSet extends CommandPacket<SceneActuatorConfV1SceneActuatorConfSetData> {
		public static readonly CommandClass = SceneActuatorConfV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "SceneActuatorConfSet",
			"help": "Scene Actuator Conf Set",
			"status": "Active",
			"params": [
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
							"name": "SpecifyInstantly",
							"help": "Specify Instantly"
						},
						"255": {
							"name": "FactoryDefault",
							"help": "factory default"
						}
					}
				},
				{
					"type": "Bitfield",
					"name": "level2",
					"help": "Level2",
					"length": 1,
					"fields": [
						{
							"fieldType": "Boolean",
							"name": "override",
							"mask": 128,
							"shift": 7
						},
						{
							"fieldType": "Integer",
							"name": "reserved",
							"mask": 127,
							"shift": 0,
							"reserved": true
						}
					]
				},
				{
					"type": "Integer",
					"name": "level",
					"help": "Level",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SceneActuatorConfV1)?.command === this.command;
		}

		constructor(data: Buffer | SceneActuatorConfV1SceneActuatorConfSetData) {
			super(SceneActuatorConfSet, data);
		}
	};
}

export namespace SceneActuatorConfV1 {
	export type SceneActuatorConfGet = InstanceType<typeof SceneActuatorConfV1.SceneActuatorConfGet>;
	export type SceneActuatorConfReport = InstanceType<typeof SceneActuatorConfV1.SceneActuatorConfReport>;
	export type SceneActuatorConfSet = InstanceType<typeof SceneActuatorConfV1.SceneActuatorConfSet>;
}
