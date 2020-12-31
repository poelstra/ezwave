/**
 * Command Class Central Scene, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum CentralSceneV3Commands {
	CentralSceneSupportedGet = 0x01,
	CentralSceneSupportedReport = 0x02,
	CentralSceneNotification = 0x03,
	CentralSceneConfigurationSet = 0x04,
	CentralSceneConfigurationGet = 0x05,
	CentralSceneConfigurationReport = 0x06,
}

export interface CentralSceneV3CentralSceneSupportedReportData {
	supportedScenes: number; // 1 byte unsigned integer
	slowRefreshSupport: boolean; // properties1[7]
	numberOfBitMaskBytes: number; // properties1[2..1]
	identical: boolean; // properties1[0]
	// TODO param vg1 type group
}

export interface CentralSceneV3CentralSceneNotificationData {
	sequenceNumber: number; // 1 byte unsigned integer
	slowRefresh: boolean; // properties1[7]
	keyAttributes: KeyAttributesEnum; // properties1[2..0]
	sceneNumber: number; // 1 byte unsigned integer
}

export interface CentralSceneV3CentralSceneConfigurationSetData {
	slowRefresh: boolean; // properties1[7]
}

export interface CentralSceneV3CentralSceneConfigurationReportData {
	slowRefresh: boolean; // properties1[7]
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

export class CentralSceneV3 extends CommandClassPacket<CentralSceneV3Commands> {
	public static readonly commandClass = CommandClasses.CentralScene; // 0x5b (91)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(CentralSceneV3, commandAndPayload);
	}

	public static readonly CentralSceneSupportedGet = class CentralSceneSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = CentralSceneV3;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "CentralSceneSupportedGet",
			"help": "Central Scene Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(CentralSceneV3)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(CentralSceneSupportedGet, data);
		}
	};

	public static readonly CentralSceneSupportedReport = class CentralSceneSupportedReport extends CommandPacket<CentralSceneV3CentralSceneSupportedReportData> {
		public static readonly CommandClass = CentralSceneV3;
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
							"type": "boolean",
							"name": "slowRefreshSupport",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "reserved",
							"mask": 120,
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
			return packet.tryAs(CentralSceneV3)?.command === this.command;
		}

		constructor(data: Buffer | CentralSceneV3CentralSceneSupportedReportData) {
			super(CentralSceneSupportedReport, data);
		}
	};

	public static readonly CentralSceneNotification = class CentralSceneNotification extends CommandPacket<CentralSceneV3CentralSceneNotificationData> {
		public static readonly CommandClass = CentralSceneV3;
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
							"type": "boolean",
							"name": "slowRefresh",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "reserved",
							"mask": 120,
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
			return packet.tryAs(CentralSceneV3)?.command === this.command;
		}

		constructor(data: Buffer | CentralSceneV3CentralSceneNotificationData) {
			super(CentralSceneNotification, data);
		}
	};

	public static readonly CentralSceneConfigurationSet = class CentralSceneConfigurationSet extends CommandPacket<CentralSceneV3CentralSceneConfigurationSetData> {
		public static readonly CommandClass = CentralSceneV3;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "CentralSceneConfigurationSet",
			"help": "Central Scene Configuration Set",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "slowRefresh",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "reserved",
							"mask": 127,
							"shift": 0,
							"reserved": true
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(CentralSceneV3)?.command === this.command;
		}

		constructor(data: Buffer | CentralSceneV3CentralSceneConfigurationSetData) {
			super(CentralSceneConfigurationSet, data);
		}
	};

	public static readonly CentralSceneConfigurationGet = class CentralSceneConfigurationGet extends CommandPacket<void> {
		public static readonly CommandClass = CentralSceneV3;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "CentralSceneConfigurationGet",
			"help": "Central Scene Configuration Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(CentralSceneV3)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(CentralSceneConfigurationGet, data);
		}
	};

	public static readonly CentralSceneConfigurationReport = class CentralSceneConfigurationReport extends CommandPacket<CentralSceneV3CentralSceneConfigurationReportData> {
		public static readonly CommandClass = CentralSceneV3;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "CentralSceneConfigurationReport",
			"help": "Central Scene Configuration Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "slowRefresh",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "reserved",
							"mask": 127,
							"shift": 0,
							"reserved": true
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(CentralSceneV3)?.command === this.command;
		}

		constructor(data: Buffer | CentralSceneV3CentralSceneConfigurationReportData) {
			super(CentralSceneConfigurationReport, data);
		}
	};
}

export namespace CentralSceneV3 {
	export type CentralSceneSupportedGet = InstanceType<typeof CentralSceneV3.CentralSceneSupportedGet>;
	export type CentralSceneSupportedReport = InstanceType<typeof CentralSceneV3.CentralSceneSupportedReport>;
	export type CentralSceneNotification = InstanceType<typeof CentralSceneV3.CentralSceneNotification>;
	export type CentralSceneConfigurationSet = InstanceType<typeof CentralSceneV3.CentralSceneConfigurationSet>;
	export type CentralSceneConfigurationGet = InstanceType<typeof CentralSceneV3.CentralSceneConfigurationGet>;
	export type CentralSceneConfigurationReport = InstanceType<typeof CentralSceneV3.CentralSceneConfigurationReport>;
}
