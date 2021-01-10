/**
 * Command Class Central Scene, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum CentralSceneV1Commands {
	CentralSceneSupportedGet = 0x01,
	CentralSceneSupportedReport = 0x02,
	CentralSceneNotification = 0x03,
}

export interface CentralSceneV1CentralSceneSupportedReportData {
	supportedScenes: number; // 1 byte unsigned integer
}

export interface CentralSceneV1CentralSceneNotificationData {
	sequenceNumber: number; // 1 byte unsigned integer
	keyAttributes: number; // properties1[2..0]
	sceneNumber: number; // 1 byte unsigned integer
}

export class CentralSceneV1 extends CommandClassPacket<CentralSceneV1Commands> {
	public static readonly commandClass = CommandClasses.CentralScene; // 0x5b (91)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(CentralSceneV1, commandAndPayload);
	}

	public static readonly CentralSceneSupportedGet = class CentralSceneSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = CentralSceneV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "CentralSceneSupportedGet",
			"help": "Central Scene Supported Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(CentralSceneV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(CentralSceneSupportedGet, data);
		}
	};

	public static readonly CentralSceneSupportedReport = class CentralSceneSupportedReport extends CommandPacket<CentralSceneV1CentralSceneSupportedReportData> {
		public static readonly CommandClass = CentralSceneV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "CentralSceneSupportedReport",
			"help": "Central Scene Supported Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "supportedScenes",
					"help": "Supported Scenes",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(CentralSceneV1)?.command === this.command;
		}

		constructor(data: Buffer | CentralSceneV1CentralSceneSupportedReportData) {
			super(CentralSceneSupportedReport, data);
		}
	};

	public static readonly CentralSceneNotification = class CentralSceneNotification extends CommandPacket<CentralSceneV1CentralSceneNotificationData> {
		public static readonly CommandClass = CentralSceneV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "CentralSceneNotification",
			"help": "Central Scene Notification",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "sequenceNumber",
					"help": "Sequence Number",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "reserved",
							"mask": 248,
							"shift": 3,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "keyAttributes",
							"mask": 7,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "sceneNumber",
					"help": "Scene Number",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(CentralSceneV1)?.command === this.command;
		}

		constructor(data: Buffer | CentralSceneV1CentralSceneNotificationData) {
			super(CentralSceneNotification, data);
		}
	};
}

export namespace CentralSceneV1 {
	export type CentralSceneSupportedGet = InstanceType<typeof CentralSceneV1.CentralSceneSupportedGet>;
	export type CentralSceneSupportedReport = InstanceType<typeof CentralSceneV1.CentralSceneSupportedReport>;
	export type CentralSceneNotification = InstanceType<typeof CentralSceneV1.CentralSceneNotification>;
}