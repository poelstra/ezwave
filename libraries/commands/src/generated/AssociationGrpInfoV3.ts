/**
 * Command Class Association Group Info, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum AssociationGrpInfoV3Commands {
	AssociationGroupNameGet = 0x01,
	AssociationGroupNameReport = 0x02,
	AssociationGroupInfoGet = 0x03,
	AssociationGroupInfoReport = 0x04,
	AssociationGroupCommandListGet = 0x05,
	AssociationGroupCommandListReport = 0x06,
}

export interface AssociationGrpInfoV3AssociationGroupNameGetData {
	groupingIdentifier: number; // 1 byte unsigned integer
}

export interface AssociationGrpInfoV3AssociationGroupNameReportData {
	groupingIdentifier: number; // 1 byte unsigned integer
	name: string; // variable length
}

export interface AssociationGrpInfoV3AssociationGroupInfoGetData {
	refreshCache: boolean; // properties1[7]
	listMode: boolean; // properties1[6]
	groupingIdentifier: number; // 1 byte unsigned integer
}

export interface AssociationGrpInfoV3AssociationGroupInfoReportData {
	listMode: boolean; // properties1[7]
	dynamicInfo: boolean; // properties1[6]
	vg1: Array<{ // variable length
		groupingIdentifier: number; // 1 byte unsigned integer
		mode: number; // 1 byte unsigned integer
		profile1: Profile1Enum; // 1 byte enum value
		profile2: ProfileGeneralEnum | ProfileControlEnum | ProfileSensorEnum | ProfileMeterEnum | ProfileIrrigationEnum | ProfileNotificationEnum; // enum chosen by vg1.profile1, 1 byte
		eventCode: number; // 2 byte unsigned integer
	}>;
}

export interface AssociationGrpInfoV3AssociationGroupCommandListGetData {
	allowCache: boolean; // properties1[7]
	groupingIdentifier: number; // 1 byte unsigned integer
}

export interface AssociationGrpInfoV3AssociationGroupCommandListReportData {
	groupingIdentifier: number; // 1 byte unsigned integer
	command: Buffer; // variable length
}

export enum Profile1Enum {
	ProfileGeneral = 0x0,
	ProfileControl = 0x20,
	ProfileSensor = 0x31,
	ProfileMeter = 0x32,
	ProfileIrrigation = 0x6b,
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

export enum ProfileIrrigationEnum {
	IrrigationChannel01 = 0x1,
	IrrigationChannel02 = 0x2,
	IrrigationChannel03 = 0x3,
	IrrigationChannel04 = 0x4,
	IrrigationChannel05 = 0x5,
	IrrigationChannel06 = 0x6,
	IrrigationChannel07 = 0x7,
	IrrigationChannel08 = 0x8,
	IrrigationChannel09 = 0x9,
	IrrigationChannel10 = 0xa,
	IrrigationChannel11 = 0xb,
	IrrigationChannel12 = 0xc,
	IrrigationChannel13 = 0xd,
	IrrigationChannel14 = 0xe,
	IrrigationChannel15 = 0xf,
	IrrigationChannel16 = 0x10,
	IrrigationChannel17 = 0x11,
	IrrigationChannel18 = 0x12,
	IrrigationChannel19 = 0x13,
	IrrigationChannel20 = 0x14,
	IrrigationChannel21 = 0x15,
	IrrigationChannel22 = 0x16,
	IrrigationChannel23 = 0x17,
	IrrigationChannel24 = 0x18,
	IrrigationChannel25 = 0x19,
	IrrigationChannel26 = 0x1a,
	IrrigationChannel27 = 0x1b,
	IrrigationChannel28 = 0x1c,
	IrrigationChannel29 = 0x1d,
	IrrigationChannel30 = 0x1e,
	IrrigationChannel31 = 0x1f,
	IrrigationChannel32 = 0x20,
}

export enum ProfileNotificationEnum {
	ProfileNOTIFICATIONTYPESMOKE = 0x1,
	ProfileNOTIFICATIONTYPECO2 = 0x3,
}

export class AssociationGrpInfoV3 extends CommandClassPacket<AssociationGrpInfoV3Commands> {
	public static readonly commandClass: number = CommandClasses.AssociationGrpInfo; // 0x59 (89)
	public static readonly version: number = 3;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(AssociationGrpInfoV3, commandAndPayload);
	}
}

export class AssociationGroupNameGet extends CommandPacket<AssociationGrpInfoV3AssociationGroupNameGetData> {
	public static readonly CommandClass: typeof AssociationGrpInfoV3 = AssociationGrpInfoV3;
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
		return packet.tryAs(AssociationGrpInfoV3)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationGrpInfoV3AssociationGroupNameGetData) {
		super(AssociationGroupNameGet, data);
	}
};

export class AssociationGroupNameReport extends CommandPacket<AssociationGrpInfoV3AssociationGroupNameReportData> {
	public static readonly CommandClass: typeof AssociationGrpInfoV3 = AssociationGrpInfoV3;
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
		return packet.tryAs(AssociationGrpInfoV3)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationGrpInfoV3AssociationGroupNameReportData) {
		super(AssociationGroupNameReport, data);
	}
};

export class AssociationGroupInfoGet extends CommandPacket<AssociationGrpInfoV3AssociationGroupInfoGetData> {
	public static readonly CommandClass: typeof AssociationGrpInfoV3 = AssociationGrpInfoV3;
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
		return packet.tryAs(AssociationGrpInfoV3)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationGrpInfoV3AssociationGroupInfoGetData) {
		super(AssociationGroupInfoGet, data);
	}
};

export class AssociationGroupInfoReport extends CommandPacket<AssociationGrpInfoV3AssociationGroupInfoReportData> {
	public static readonly CommandClass: typeof AssociationGrpInfoV3 = AssociationGrpInfoV3;
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
							"107": {
								"name": "ProfileIrrigation",
								"help": "Profile Irrigation"
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
							"107": {
								"1": {
									"name": "IrrigationChannel01",
									"help": "Irrigation Channel 01"
								},
								"2": {
									"name": "IrrigationChannel02",
									"help": "Irrigation Channel 02"
								},
								"3": {
									"name": "IrrigationChannel03",
									"help": "Irrigation Channel 03"
								},
								"4": {
									"name": "IrrigationChannel04",
									"help": "Irrigation Channel 04"
								},
								"5": {
									"name": "IrrigationChannel05",
									"help": "Irrigation Channel 05"
								},
								"6": {
									"name": "IrrigationChannel06",
									"help": "Irrigation Channel 06"
								},
								"7": {
									"name": "IrrigationChannel07",
									"help": "Irrigation Channel 07"
								},
								"8": {
									"name": "IrrigationChannel08",
									"help": "Irrigation Channel 08"
								},
								"9": {
									"name": "IrrigationChannel09",
									"help": "Irrigation Channel 09"
								},
								"10": {
									"name": "IrrigationChannel10",
									"help": "Irrigation Channel 10"
								},
								"11": {
									"name": "IrrigationChannel11",
									"help": "Irrigation Channel 11"
								},
								"12": {
									"name": "IrrigationChannel12",
									"help": "Irrigation Channel 12"
								},
								"13": {
									"name": "IrrigationChannel13",
									"help": "Irrigation Channel 13"
								},
								"14": {
									"name": "IrrigationChannel14",
									"help": "Irrigation Channel 14"
								},
								"15": {
									"name": "IrrigationChannel15",
									"help": "Irrigation Channel 15"
								},
								"16": {
									"name": "IrrigationChannel16",
									"help": "Irrigation Channel 16"
								},
								"17": {
									"name": "IrrigationChannel17",
									"help": "Irrigation Channel 17"
								},
								"18": {
									"name": "IrrigationChannel18",
									"help": "Irrigation Channel 18"
								},
								"19": {
									"name": "IrrigationChannel19",
									"help": "Irrigation Channel 19"
								},
								"20": {
									"name": "IrrigationChannel20",
									"help": "Irrigation Channel 20"
								},
								"21": {
									"name": "IrrigationChannel21",
									"help": "Irrigation Channel 21"
								},
								"22": {
									"name": "IrrigationChannel22",
									"help": "Irrigation Channel 22"
								},
								"23": {
									"name": "IrrigationChannel23",
									"help": "Irrigation Channel 23"
								},
								"24": {
									"name": "IrrigationChannel24",
									"help": "Irrigation Channel 24"
								},
								"25": {
									"name": "IrrigationChannel25",
									"help": "Irrigation Channel 25"
								},
								"26": {
									"name": "IrrigationChannel26",
									"help": "Irrigation Channel 26"
								},
								"27": {
									"name": "IrrigationChannel27",
									"help": "Irrigation Channel 27"
								},
								"28": {
									"name": "IrrigationChannel28",
									"help": "Irrigation Channel 28"
								},
								"29": {
									"name": "IrrigationChannel29",
									"help": "Irrigation Channel 29"
								},
								"30": {
									"name": "IrrigationChannel30",
									"help": "Irrigation Channel 30"
								},
								"31": {
									"name": "IrrigationChannel31",
									"help": "Irrigation Channel 31"
								},
								"32": {
									"name": "IrrigationChannel32",
									"help": "Irrigation Channel 32"
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
		return packet.tryAs(AssociationGrpInfoV3)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationGrpInfoV3AssociationGroupInfoReportData) {
		super(AssociationGroupInfoReport, data);
	}
};

export class AssociationGroupCommandListGet extends CommandPacket<AssociationGrpInfoV3AssociationGroupCommandListGetData> {
	public static readonly CommandClass: typeof AssociationGrpInfoV3 = AssociationGrpInfoV3;
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
		return packet.tryAs(AssociationGrpInfoV3)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationGrpInfoV3AssociationGroupCommandListGetData) {
		super(AssociationGroupCommandListGet, data);
	}
};

export class AssociationGroupCommandListReport extends CommandPacket<AssociationGrpInfoV3AssociationGroupCommandListReportData> {
	public static readonly CommandClass: typeof AssociationGrpInfoV3 = AssociationGrpInfoV3;
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
		return packet.tryAs(AssociationGrpInfoV3)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationGrpInfoV3AssociationGroupCommandListReportData) {
		super(AssociationGroupCommandListReport, data);
	}
};
