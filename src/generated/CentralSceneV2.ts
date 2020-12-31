/**
 * Command Class Central Scene, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum CentralSceneV2Commands {
	CentralSceneSupportedGet = 0x01,
	CentralSceneSupportedReport = 0x02,
	CentralSceneNotification = 0x03,
}

export interface CentralSceneV2CentralSceneSupportedReportData {
	supportedScenes: number; // 1 byte unsigned integer
	numberOfBitMaskBytes: number; // properties1[2..1]
	identical: boolean; // properties1[0]
	// TODO param vg1 type group
}

export interface CentralSceneV2CentralSceneNotificationData {
	sequenceNumber: number; // 1 byte unsigned integer
	keyAttributes: KeyAttributesEnum; // properties1[2..0]
	sceneNumber: number; // 1 byte unsigned integer
}

export enum KeyAttributesEnum {
	KeyPressed1Time = 0x0,
	KeyReleased = 0x1,
	KeyHeldDown = 0x2,
	KeyPressed2Times = 0x3,
	KeyPressed3Times = 0x4,
	KeyPressed4Times = 0x5,
	KeyPressed5Times = 0x6,
}

export class CentralSceneV2 extends CommandClassPacket<CentralSceneV2Commands> {
	public static readonly commandClass = CommandClasses.CentralScene; // 0x5b (91)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(CentralSceneV2, commandAndPayload);
	}

	public static readonly CentralSceneSupportedGet = class CentralSceneSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = CentralSceneV2;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "CentralSceneSupportedGet",
			"help": "Central Scene Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(CentralSceneV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(CentralSceneSupportedGet, data);
		}
	};

	public static readonly CentralSceneSupportedReport = class CentralSceneSupportedReport extends CommandPacket<CentralSceneV2CentralSceneSupportedReportData> {
		public static readonly CommandClass = CentralSceneV2;
		public static readonly command = 0x02;
		public static readonly definition = {
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
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved",
							"mask": 248,
							"shift": 3,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "numberOfBitMaskBytes",
							"mask": 6,
							"shift": 1
						},
						{
							"type": "boolean",
							"name": "identical",
							"mask": 1,
							"shift": 0
						}
					]
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"name": "supportedScenes"
					},
					"params": [
						{
							"type": "integer",
							"name": "supportedKeyAttributesForScene",
							"help": "Supported Key Attributes for Scene",
							"length": 0
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(CentralSceneV2)?.command === this.command;
		}

		constructor(data: Buffer | CentralSceneV2CentralSceneSupportedReportData) {
			super(CentralSceneSupportedReport, data);
		}
	};

	public static readonly CentralSceneNotification = class CentralSceneNotification extends CommandPacket<CentralSceneV2CentralSceneNotificationData> {
		public static readonly CommandClass = CentralSceneV2;
		public static readonly command = 0x03;
		public static readonly definition = {
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
							"type": "integer",
							"name": "reserved",
							"mask": 248,
							"shift": 3,
							"reserved": true
						},
						{
							"type": "enum",
							"name": "keyAttributes",
							"mask": 7,
							"shift": 0,
							"values": {
								"0": {
									"name": "KeyPressed1Time",
									"help": "Key Pressed 1 time"
								},
								"1": {
									"name": "KeyReleased",
									"help": "Key Released"
								},
								"2": {
									"name": "KeyHeldDown",
									"help": "Key Held Down"
								},
								"3": {
									"name": "KeyPressed2Times",
									"help": "Key Pressed 2 times"
								},
								"4": {
									"name": "KeyPressed3Times",
									"help": "Key Pressed 3 times"
								},
								"5": {
									"name": "KeyPressed4Times",
									"help": "Key Pressed 4 times"
								},
								"6": {
									"name": "KeyPressed5Times",
									"help": "Key Pressed 5 times"
								}
							}
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
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(CentralSceneV2)?.command === this.command;
		}

		constructor(data: Buffer | CentralSceneV2CentralSceneNotificationData) {
			super(CentralSceneNotification, data);
		}
	};
}

export namespace CentralSceneV2 {
	export type CentralSceneSupportedGet = InstanceType<typeof CentralSceneV2.CentralSceneSupportedGet>;
	export type CentralSceneSupportedReport = InstanceType<typeof CentralSceneV2.CentralSceneSupportedReport>;
	export type CentralSceneNotification = InstanceType<typeof CentralSceneV2.CentralSceneNotification>;
}
