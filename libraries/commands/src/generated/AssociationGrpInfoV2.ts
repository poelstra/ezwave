/**
 * Command Class Association Group Info, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum AssociationGrpInfoV2Commands {
	AssociationGroupNameGet = 0x01,
	AssociationGroupNameReport = 0x02,
	AssociationGroupInfoGet = 0x03,
	AssociationGroupInfoReport = 0x04,
	AssociationGroupCommandListGet = 0x05,
	AssociationGroupCommandListReport = 0x06,
}

export interface AssociationGrpInfoV2AssociationGroupNameGetData {
	groupingIdentifier: number; // 1 byte unsigned integer
}

export interface AssociationGrpInfoV2AssociationGroupNameReportData {
	groupingIdentifier: number; // 1 byte unsigned integer
	name: string; // variable length
}

export interface AssociationGrpInfoV2AssociationGroupInfoGetData {
	refreshCache: boolean; // properties1[7]
	listMode: boolean; // properties1[6]
	groupingIdentifier: number; // 1 byte unsigned integer
}

export interface AssociationGrpInfoV2AssociationGroupInfoReportData {
	listMode: boolean; // properties1[7]
	dynamicInfo: boolean; // properties1[6]
	vg1: Array<{ // variable length
		groupingIdentifier: number; // 1 byte unsigned integer
		mode: number; // 1 byte unsigned integer
		profile1: Profile1Enum; // 1 byte enum value
		profile2: ProfileGeneralEnum | ProfileControlEnum | ProfileSensorEnum | ProfileMeterEnum | ProfileNotificationEnum; // enum chosen by vg1.profile1, 1 byte
		eventCode: number; // 2 byte unsigned integer
	}>;
}

export interface AssociationGrpInfoV2AssociationGroupCommandListGetData {
	allowCache: boolean; // properties1[7]
	groupingIdentifier: number; // 1 byte unsigned integer
}

export interface AssociationGrpInfoV2AssociationGroupCommandListReportData {
	groupingIdentifier: number; // 1 byte unsigned integer
	command: Buffer; // variable length
}

export enum Profile1Enum {
	ProfileGeneral = 0x0,
	ProfileControl = 0x20,
	ProfileSensor = 0x31,
	ProfileMeter = 0x32,
	ProfileNotification = 0x71,
}

export enum ProfileGeneralEnum {
	ProfileGeneralNA = 0x0,
	ProfileGeneralLifeline = 0x1,
}

export enum ProfileControlEnum {
	ProfileControlKEY01 = 0x1,
	ProfileControlKEY02 = 0x2,
	ProfileControlKEY03 = 0x3,
	ProfileControlKEY04 = 0x4,
	ProfileControlKEY05 = 0x5,
	ProfileControlKEY06 = 0x6,
	ProfileControlKEY07 = 0x7,
	ProfileControlKEY08 = 0x8,
	ProfileControlKEY09 = 0x9,
	ProfileControlKEY10 = 0xa,
	ProfileControlKEY11 = 0xb,
	ProfileControlKEY12 = 0xc,
	ProfileControlKEY13 = 0xd,
	ProfileControlKEY14 = 0xe,
	ProfileControlKEY15 = 0xf,
	ProfileControlKEY16 = 0x10,
	ProfileControlKEY17 = 0x11,
	ProfileControlKEY18 = 0x12,
	ProfileControlKEY19 = 0x13,
	ProfileControlKEY20 = 0x14,
	ProfileControlKEY21 = 0x15,
	ProfileControlKEY22 = 0x16,
	ProfileControlKEY23 = 0x17,
	ProfileControlKEY24 = 0x18,
	ProfileControlKEY25 = 0x19,
	ProfileControlKEY26 = 0x1a,
	ProfileControlKEY27 = 0x1b,
	ProfileControlKEY28 = 0x1c,
	ProfileControlKEY29 = 0x1d,
	ProfileControlKEY30 = 0x1e,
	ProfileControlKEY31 = 0x1f,
	ProfileControlKEY32 = 0x20,
}

export enum ProfileSensorEnum {
	ProfileMULTILEVELSENSORTYPETEMPERATURE = 0x1,
	ProfileMULTILEVELSENSORTYPEHUMIDITY = 0x5,
}

export enum ProfileMeterEnum {
	ProfileMETERTYPEELECTRIC = 0x1,
	ProfileMETERTYPEGAS = 0x2,
	ProfileMETERTYPEWATER = 0x3,
}

export enum ProfileNotificationEnum {
	ProfileNOTIFICATIONTYPESMOKE = 0x1,
	ProfileNOTIFICATIONTYPECO2 = 0x3,
}

export class AssociationGrpInfoV2 extends CommandClassPacket<AssociationGrpInfoV2Commands> {
	public static readonly commandClass: number = CommandClasses.AssociationGrpInfo; // 0x59 (89)
	public static readonly version: number = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(AssociationGrpInfoV2, commandAndPayload);
	}
}

export class AssociationGroupNameGet extends CommandPacket<AssociationGrpInfoV2AssociationGroupNameGetData> {
	public static readonly CommandClass: typeof AssociationGrpInfoV2 = AssociationGrpInfoV2;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "AssociationGroupNameGet",
		"help": "Association Group Name Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "groupingIdentifier",
				"help": "Grouping Identifier",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AssociationGrpInfoV2)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationGrpInfoV2AssociationGroupNameGetData) {
		super(AssociationGroupNameGet, data);
	}
};

export class AssociationGroupNameReport extends CommandPacket<AssociationGrpInfoV2AssociationGroupNameReportData> {
	public static readonly CommandClass: typeof AssociationGrpInfoV2 = AssociationGrpInfoV2;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "AssociationGroupNameReport",
		"help": "Association Group Name Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "groupingIdentifier",
				"help": "Grouping Identifier",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "lengthOfName",
				"help": "Length of Name",
				"length": 1,
				"lengthOf": {
					"refs": [
						"name"
					]
				},
				"isAutogenerated": true
			},
			{
				"type": "Text",
				"name": "name",
				"help": "Name",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "lengthOfName"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AssociationGrpInfoV2)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationGrpInfoV2AssociationGroupNameReportData) {
		super(AssociationGroupNameReport, data);
	}
};

export class AssociationGroupInfoGet extends CommandPacket<AssociationGrpInfoV2AssociationGroupInfoGetData> {
	public static readonly CommandClass: typeof AssociationGrpInfoV2 = AssociationGrpInfoV2;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "AssociationGroupInfoGet",
		"help": "Association Group Info Get",
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
						"name": "refreshCache",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Boolean",
						"name": "listMode",
						"mask": 64,
						"shift": 6
					},
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 63,
						"shift": 0,
						"reserved": true
					}
				]
			},
			{
				"type": "Integer",
				"name": "groupingIdentifier",
				"help": "Grouping Identifier",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AssociationGrpInfoV2)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationGrpInfoV2AssociationGroupInfoGetData) {
		super(AssociationGroupInfoGet, data);
	}
};

export class AssociationGroupInfoReport extends CommandPacket<AssociationGrpInfoV2AssociationGroupInfoReportData> {
	public static readonly CommandClass: typeof AssociationGrpInfoV2 = AssociationGrpInfoV2;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "AssociationGroupInfoReport",
		"help": "Association Group Info Report",
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
						"name": "listMode",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Boolean",
						"name": "dynamicInfo",
						"mask": 64,
						"shift": 6
					},
					{
						"fieldType": "Integer",
						"name": "groupCount",
						"mask": 63,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"vg1"
							]
						},
						"isAutogenerated": true
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
						"ref": "properties1.groupCount"
					}
				},
				"params": [
					{
						"type": "Integer",
						"name": "groupingIdentifier",
						"help": "Grouping Identifier",
						"length": 1
					},
					{
						"type": "Integer",
						"name": "mode",
						"help": "Mode",
						"length": 1
					},
					{
						"type": "Enum",
						"name": "profile1",
						"help": "Profile1",
						"length": 1,
						"values": {
							"0": {
								"name": "ProfileGeneral",
								"help": "Profile General"
							},
							"32": {
								"name": "ProfileControl",
								"help": "Profile Control"
							},
							"49": {
								"name": "ProfileSensor",
								"help": "Profile Sensor"
							},
							"50": {
								"name": "ProfileMeter",
								"help": "Profile Meter"
							},
							"113": {
								"name": "ProfileNotification",
								"help": "Profile Notification"
							}
						}
					},
					{
						"type": "EnumUnion",
						"name": "profile2",
						"help": "Profile2",
						"length": 1,
						"reference": {
							"ref": "vg1.profile1"
						},
						"enums": {
							"0": {
								"0": {
									"name": "ProfileGeneralNA",
									"help": "Profile General NA"
								},
								"1": {
									"name": "ProfileGeneralLifeline",
									"help": "Profile General Lifeline"
								}
							},
							"32": {
								"1": {
									"name": "ProfileControlKEY01",
									"help": "Profile Control KEY01"
								},
								"2": {
									"name": "ProfileControlKEY02",
									"help": "Profile Control KEY02"
								},
								"3": {
									"name": "ProfileControlKEY03",
									"help": "Profile Control KEY03"
								},
								"4": {
									"name": "ProfileControlKEY04",
									"help": "Profile Control KEY04"
								},
								"5": {
									"name": "ProfileControlKEY05",
									"help": "Profile Control KEY05"
								},
								"6": {
									"name": "ProfileControlKEY06",
									"help": "Profile Control KEY06"
								},
								"7": {
									"name": "ProfileControlKEY07",
									"help": "Profile Control KEY07"
								},
								"8": {
									"name": "ProfileControlKEY08",
									"help": "Profile Control KEY08"
								},
								"9": {
									"name": "ProfileControlKEY09",
									"help": "Profile Control KEY09"
								},
								"10": {
									"name": "ProfileControlKEY10",
									"help": "Profile Control KEY10"
								},
								"11": {
									"name": "ProfileControlKEY11",
									"help": "Profile Control KEY11"
								},
								"12": {
									"name": "ProfileControlKEY12",
									"help": "Profile Control KEY12"
								},
								"13": {
									"name": "ProfileControlKEY13",
									"help": "Profile Control KEY13"
								},
								"14": {
									"name": "ProfileControlKEY14",
									"help": "Profile Control KEY14"
								},
								"15": {
									"name": "ProfileControlKEY15",
									"help": "Profile Control KEY15"
								},
								"16": {
									"name": "ProfileControlKEY16",
									"help": "Profile Control KEY16"
								},
								"17": {
									"name": "ProfileControlKEY17",
									"help": "Profile Control KEY17"
								},
								"18": {
									"name": "ProfileControlKEY18",
									"help": "Profile Control KEY18"
								},
								"19": {
									"name": "ProfileControlKEY19",
									"help": "Profile Control KEY19"
								},
								"20": {
									"name": "ProfileControlKEY20",
									"help": "Profile Control KEY20"
								},
								"21": {
									"name": "ProfileControlKEY21",
									"help": "Profile Control KEY21"
								},
								"22": {
									"name": "ProfileControlKEY22",
									"help": "Profile Control KEY22"
								},
								"23": {
									"name": "ProfileControlKEY23",
									"help": "Profile Control KEY23"
								},
								"24": {
									"name": "ProfileControlKEY24",
									"help": "Profile Control KEY24"
								},
								"25": {
									"name": "ProfileControlKEY25",
									"help": "Profile Control KEY25"
								},
								"26": {
									"name": "ProfileControlKEY26",
									"help": "Profile Control KEY26"
								},
								"27": {
									"name": "ProfileControlKEY27",
									"help": "Profile Control KEY27"
								},
								"28": {
									"name": "ProfileControlKEY28",
									"help": "Profile Control KEY28"
								},
								"29": {
									"name": "ProfileControlKEY29",
									"help": "Profile Control KEY29"
								},
								"30": {
									"name": "ProfileControlKEY30",
									"help": "Profile Control KEY30"
								},
								"31": {
									"name": "ProfileControlKEY31",
									"help": "Profile Control KEY31"
								},
								"32": {
									"name": "ProfileControlKEY32",
									"help": "Profile Control KEY32"
								}
							},
							"49": {
								"1": {
									"name": "ProfileMULTILEVELSENSORTYPETEMPERATURE",
									"help": "Profile MULTILEVEL_SENSOR_TYPE_TEMPERATURE"
								},
								"5": {
									"name": "ProfileMULTILEVELSENSORTYPEHUMIDITY",
									"help": "Profile MULTILEVEL_SENSOR_TYPE_HUMIDITY"
								}
							},
							"50": {
								"1": {
									"name": "ProfileMETERTYPEELECTRIC",
									"help": "Profile METER_TYPE_ELECTRIC"
								},
								"2": {
									"name": "ProfileMETERTYPEGAS",
									"help": "Profile METER_TYPE_GAS"
								},
								"3": {
									"name": "ProfileMETERTYPEWATER",
									"help": "Profile METER_TYPE_WATER"
								}
							},
							"113": {
								"1": {
									"name": "ProfileNOTIFICATIONTYPESMOKE",
									"help": "Profile NOTIFICATION_TYPE_SMOKE"
								},
								"3": {
									"name": "ProfileNOTIFICATIONTYPECO2",
									"help": "Profile NOTIFICATION_TYPE_CO2"
								}
							}
						}
					},
					{
						"type": "Integer",
						"name": "reserved",
						"help": "Reserved",
						"length": 1,
						"reserved": true
					},
					{
						"type": "Integer",
						"name": "eventCode",
						"help": "Event Code",
						"length": 2
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AssociationGrpInfoV2)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationGrpInfoV2AssociationGroupInfoReportData) {
		super(AssociationGroupInfoReport, data);
	}
};

export class AssociationGroupCommandListGet extends CommandPacket<AssociationGrpInfoV2AssociationGroupCommandListGetData> {
	public static readonly CommandClass: typeof AssociationGrpInfoV2 = AssociationGrpInfoV2;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "AssociationGroupCommandListGet",
		"help": "Association Group Command List Get",
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
						"name": "allowCache",
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
				"name": "groupingIdentifier",
				"help": "Grouping Identifier",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AssociationGrpInfoV2)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationGrpInfoV2AssociationGroupCommandListGetData) {
		super(AssociationGroupCommandListGet, data);
	}
};

export class AssociationGroupCommandListReport extends CommandPacket<AssociationGrpInfoV2AssociationGroupCommandListReportData> {
	public static readonly CommandClass: typeof AssociationGrpInfoV2 = AssociationGrpInfoV2;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 6,
		"name": "AssociationGroupCommandListReport",
		"help": "Association Group Command List Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "groupingIdentifier",
				"help": "Grouping Identifier",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "listLength",
				"help": "List Length",
				"length": 1,
				"lengthOf": {
					"refs": [
						"command"
					]
				},
				"isAutogenerated": true
			},
			{
				"type": "Blob",
				"name": "command",
				"help": "Command",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "listLength"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AssociationGrpInfoV2)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationGrpInfoV2AssociationGroupCommandListReportData) {
		super(AssociationGroupCommandListReport, data);
	}
};
