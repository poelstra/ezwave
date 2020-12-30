/**
 * Command Class Association Group Info, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum AssociationGrpInfoV1Commands {
	AssociationGroupNameGet = 0x01,
	AssociationGroupNameReport = 0x02,
	AssociationGroupInfoGet = 0x03,
	AssociationGroupInfoReport = 0x04,
	AssociationGroupCommandListGet = 0x05,
	AssociationGroupCommandListReport = 0x06,
}

export interface AssociationGrpInfoV1AssociationGroupNameGetData {
	groupingIdentifier: number; // 1 byte unsigned integer
}

export interface AssociationGrpInfoV1AssociationGroupNameReportData {
	groupingIdentifier: number; // 1 byte unsigned integer
	lengthOfName: number; // 1 byte unsigned integer
	// TODO param name type text
}

export interface AssociationGrpInfoV1AssociationGroupInfoGetData {
	refreshCache: boolean; // properties1[7]
	listMode: boolean; // properties1[6]
	groupingIdentifier: number; // 1 byte unsigned integer
}

export interface AssociationGrpInfoV1AssociationGroupInfoReportData {
	listMode: boolean; // properties1[7]
	dynamicInfo: boolean; // properties1[6]
	groupCount: number; // properties1[5..0]
	// TODO param vg1 type group
}

export interface AssociationGrpInfoV1AssociationGroupCommandListGetData {
	allowCache: boolean; // properties1[7]
	groupingIdentifier: number; // 1 byte unsigned integer
}

export interface AssociationGrpInfoV1AssociationGroupCommandListReportData {
	groupingIdentifier: number; // 1 byte unsigned integer
	listLength: number; // 1 byte unsigned integer
	// TODO param command type blob
}

export class AssociationGrpInfoV1 extends CommandClassPacket<AssociationGrpInfoV1Commands> {
	public static readonly commandClass = CommandClasses.AssociationGrpInfo; // 0x59 (89)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(AssociationGrpInfoV1, commandAndPayload);
	}

	public static readonly AssociationGroupNameGet = class AssociationGroupNameGet extends CommandPacket<AssociationGrpInfoV1AssociationGroupNameGetData> {
		public static readonly CommandClass = AssociationGrpInfoV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "AssociationGroupNameGet",
			"help": "Association Group Name Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "groupingIdentifier",
					"help": "Grouping Identifier",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(AssociationGrpInfoV1)?.command === this.command;
		}

		constructor(data: Buffer | AssociationGrpInfoV1AssociationGroupNameGetData) {
			super(AssociationGroupNameGet, data);
		}
	};

	public static readonly AssociationGroupNameReport = class AssociationGroupNameReport extends CommandPacket<AssociationGrpInfoV1AssociationGroupNameReportData> {
		public static readonly CommandClass = AssociationGrpInfoV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "AssociationGroupNameReport",
			"help": "Association Group Name Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "groupingIdentifier",
					"help": "Grouping Identifier",
					"length": 1
				},
				{
					"type": "integer",
					"name": "lengthOfName",
					"help": "Length of Name",
					"length": 1
				},
				{
					"type": "text",
					"name": "name",
					"help": "Name",
					"length": {
						"name": "Length of Name"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(AssociationGrpInfoV1)?.command === this.command;
		}

		constructor(data: Buffer | AssociationGrpInfoV1AssociationGroupNameReportData) {
			super(AssociationGroupNameReport, data);
		}
	};

	public static readonly AssociationGroupInfoGet = class AssociationGroupInfoGet extends CommandPacket<AssociationGrpInfoV1AssociationGroupInfoGetData> {
		public static readonly CommandClass = AssociationGrpInfoV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "AssociationGroupInfoGet",
			"help": "Association Group Info Get",
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
							"name": "refreshCache",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "boolean",
							"name": "listMode",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "integer",
							"name": "reserved",
							"mask": 63,
							"shift": 0,
							"reserved": true
						}
					]
				},
				{
					"type": "integer",
					"name": "groupingIdentifier",
					"help": "Grouping Identifier",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(AssociationGrpInfoV1)?.command === this.command;
		}

		constructor(data: Buffer | AssociationGrpInfoV1AssociationGroupInfoGetData) {
			super(AssociationGroupInfoGet, data);
		}
	};

	public static readonly AssociationGroupInfoReport = class AssociationGroupInfoReport extends CommandPacket<AssociationGrpInfoV1AssociationGroupInfoReportData> {
		public static readonly CommandClass = AssociationGrpInfoV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "AssociationGroupInfoReport",
			"help": "Association Group Info Report",
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
							"name": "listMode",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "boolean",
							"name": "dynamicInfo",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "integer",
							"name": "groupCount",
							"mask": 63,
							"shift": 0
						}
					]
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"name": "Properties1",
						"bitfield": {
							"mask": 63,
							"shift": 0,
							"name": "groupCount"
						}
					},
					"params": [
						{
							"type": "integer",
							"name": "groupingIdentifier",
							"help": "Grouping Identifier",
							"length": 1
						},
						{
							"type": "integer",
							"name": "mode",
							"help": "Mode",
							"length": 1
						},
						{
							"type": "enum",
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
								"113": {
									"name": "ProfileNotification",
									"help": "Profile Notification"
								}
							}
						},
						{
							"type": "enumunion",
							"name": "profile2",
							"help": "Profile2",
							"length": 1,
							"reference": {
								"name": "Profile1"
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
								}
							}
						},
						{
							"type": "integer",
							"name": "reserved",
							"help": "Reserved",
							"length": 1,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "eventCode",
							"help": "Event Code",
							"length": 2
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(AssociationGrpInfoV1)?.command === this.command;
		}

		constructor(data: Buffer | AssociationGrpInfoV1AssociationGroupInfoReportData) {
			super(AssociationGroupInfoReport, data);
		}
	};

	public static readonly AssociationGroupCommandListGet = class AssociationGroupCommandListGet extends CommandPacket<AssociationGrpInfoV1AssociationGroupCommandListGetData> {
		public static readonly CommandClass = AssociationGrpInfoV1;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "AssociationGroupCommandListGet",
			"help": "Association Group Command List Get",
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
							"name": "allowCache",
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
				},
				{
					"type": "integer",
					"name": "groupingIdentifier",
					"help": "Grouping Identifier",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(AssociationGrpInfoV1)?.command === this.command;
		}

		constructor(data: Buffer | AssociationGrpInfoV1AssociationGroupCommandListGetData) {
			super(AssociationGroupCommandListGet, data);
		}
	};

	public static readonly AssociationGroupCommandListReport = class AssociationGroupCommandListReport extends CommandPacket<AssociationGrpInfoV1AssociationGroupCommandListReportData> {
		public static readonly CommandClass = AssociationGrpInfoV1;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "AssociationGroupCommandListReport",
			"help": "Association Group Command List Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "groupingIdentifier",
					"help": "Grouping Identifier",
					"length": 1
				},
				{
					"type": "integer",
					"name": "listLength",
					"help": "List Length",
					"length": 1
				},
				{
					"type": "blob",
					"name": "command",
					"help": "Command",
					"length": {
						"name": "List Length"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(AssociationGrpInfoV1)?.command === this.command;
		}

		constructor(data: Buffer | AssociationGrpInfoV1AssociationGroupCommandListReportData) {
			super(AssociationGroupCommandListReport, data);
		}
	};
}

export namespace AssociationGrpInfoV1 {
	export type AssociationGroupNameGet = InstanceType<typeof AssociationGrpInfoV1.AssociationGroupNameGet>;
	export type AssociationGroupNameReport = InstanceType<typeof AssociationGrpInfoV1.AssociationGroupNameReport>;
	export type AssociationGroupInfoGet = InstanceType<typeof AssociationGrpInfoV1.AssociationGroupInfoGet>;
	export type AssociationGroupInfoReport = InstanceType<typeof AssociationGrpInfoV1.AssociationGroupInfoReport>;
	export type AssociationGroupCommandListGet = InstanceType<typeof AssociationGrpInfoV1.AssociationGroupCommandListGet>;
	export type AssociationGroupCommandListReport = InstanceType<typeof AssociationGrpInfoV1.AssociationGroupCommandListReport>;
}
