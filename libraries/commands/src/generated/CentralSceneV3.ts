/**
 * Command Class Central Scene, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum CentralSceneV3Commands {
	CentralSceneSupportedGet = 0x01,
	CentralSceneSupportedReport = 0x02,
	CentralSceneNotification = 0x03,
	CentralSceneConfigurationSet = 0x04,
	CentralSceneConfigurationGet = 0x05,
	CentralSceneConfigurationReport = 0x06,
}

export interface CentralSceneV3CentralSceneSupportedReportData {
	slowRefreshSupport: boolean; // properties1[7]
	identical: boolean; // properties1[0]
	vg1: Array<{ // variable length
		supportedKeyAttributesForScene: Set<SupportedKeyAttributesForSceneEnum>; // variable length
	}>;
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

export enum SupportedKeyAttributesForSceneEnum {
	KeyPressed1Time = 0x0,
	KeyReleased = 0x1,
	KeyHeldDown = 0x2,
	KeyPressed2Times = 0x3,
	KeyPressed3Times = 0x4,
	KeyPressed4Times = 0x5,
	KeyPressed5Times = 0x6,
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
	public static readonly commandClass: number = CommandClasses.CentralScene; // 0x5b (91)
	public static readonly version: number = 3;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(CentralSceneV3, commandAndPayload);
	}
}

export class CentralSceneSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof CentralSceneV3 = CentralSceneV3;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "CentralSceneSupportedGet",
		"help": "Central Scene Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(CentralSceneV3)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(CentralSceneSupportedGet, data);
	}
};

export class CentralSceneSupportedReport extends CommandPacket<CentralSceneV3CentralSceneSupportedReportData> {
	public static readonly CommandClass: typeof CentralSceneV3 = CentralSceneV3;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "CentralSceneSupportedReport",
		"help": "Central Scene Supported Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "supportedScenes",
				"help": "Supported Scenes",
				"length": 1,
				"lengthOf": {
					"refs": [
						"vg1"
					]
				},
				"isAutogenerated": true
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "slowRefreshSupport",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 120,
						"shift": 3,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "numberOfBitMaskBytes",
						"mask": 6,
						"shift": 1,
						"lengthOf": {
							"refs": [
								"vg1.supportedKeyAttributesForScene"
							]
						},
						"isAutogenerated": true
					},
					{
						"fieldType": "Boolean",
						"name": "identical",
						"mask": 1,
						"shift": 0
					}
				]
			},
			{
				"type": "Group",
				"name": "vg1",
				"help": "vg1",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "supportedScenes"
					}
				},
				"params": [
					{
						"type": "Bitmask",
						"name": "supportedKeyAttributesForScene",
						"help": "Supported Key Attributes for Scene",
						"length": {
							"lengthType": "Ref",
							"from": {
								"ref": "properties1.numberOfBitMaskBytes"
							}
						},
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
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(CentralSceneV3)?.command === this.command;
	}

	public constructor(data: Buffer | CentralSceneV3CentralSceneSupportedReportData) {
		super(CentralSceneSupportedReport, data);
	}
};

export class CentralSceneNotification extends CommandPacket<CentralSceneV3CentralSceneNotificationData> {
	public static readonly CommandClass: typeof CentralSceneV3 = CentralSceneV3;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "CentralSceneNotification",
		"help": "Central Scene Notification",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "sequenceNumber",
				"help": "Sequence Number",
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
						"name": "slowRefresh",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 120,
						"shift": 3,
						"reserved": true
					},
					{
						"fieldType": "Enum",
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
				"type": "Integer",
				"name": "sceneNumber",
				"help": "Scene Number",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(CentralSceneV3)?.command === this.command;
	}

	public constructor(data: Buffer | CentralSceneV3CentralSceneNotificationData) {
		super(CentralSceneNotification, data);
	}
};

export class CentralSceneConfigurationSet extends CommandPacket<CentralSceneV3CentralSceneConfigurationSetData> {
	public static readonly CommandClass: typeof CentralSceneV3 = CentralSceneV3;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "CentralSceneConfigurationSet",
		"help": "Central Scene Configuration Set",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "slowRefresh",
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
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(CentralSceneV3)?.command === this.command;
	}

	public constructor(data: Buffer | CentralSceneV3CentralSceneConfigurationSetData) {
		super(CentralSceneConfigurationSet, data);
	}
};

export class CentralSceneConfigurationGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof CentralSceneV3 = CentralSceneV3;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "CentralSceneConfigurationGet",
		"help": "Central Scene Configuration Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(CentralSceneV3)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(CentralSceneConfigurationGet, data);
	}
};

export class CentralSceneConfigurationReport extends CommandPacket<CentralSceneV3CentralSceneConfigurationReportData> {
	public static readonly CommandClass: typeof CentralSceneV3 = CentralSceneV3;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 6,
		"name": "CentralSceneConfigurationReport",
		"help": "Central Scene Configuration Report",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "slowRefresh",
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
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(CentralSceneV3)?.command === this.command;
	}

	public constructor(data: Buffer | CentralSceneV3CentralSceneConfigurationReportData) {
		super(CentralSceneConfigurationReport, data);
	}
};
