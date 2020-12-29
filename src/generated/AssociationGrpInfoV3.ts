/**
 * Command Class Association Group Info, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

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
	lengthOfName: number; // 1 byte unsigned integer
	// TODO param name type text
}

export interface AssociationGrpInfoV3AssociationGroupInfoGetData {
	// TODO param properties1 type bitfield
	groupingIdentifier: number; // 1 byte unsigned integer
}

export interface AssociationGrpInfoV3AssociationGroupInfoReportData {
	// TODO param properties1 type bitfield
	// TODO param vg1 type group
}

export interface AssociationGrpInfoV3AssociationGroupCommandListGetData {
	// TODO param properties1 type bitfield
	groupingIdentifier: number; // 1 byte unsigned integer
}

export interface AssociationGrpInfoV3AssociationGroupCommandListReportData {
	groupingIdentifier: number; // 1 byte unsigned integer
	listLength: number; // 1 byte unsigned integer
	// TODO param command type blob
}

export class AssociationGrpInfoV3 extends CommandClassPacket<AssociationGrpInfoV3Commands> {
	public static readonly commandClass = CommandClasses.AssociationGrpInfo; // 0x59 (89)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(AssociationGrpInfoV3, commandAndPayload);
	}

	public static readonly AssociationGroupNameGet = class AssociationGroupNameGet extends CommandPacket<AssociationGrpInfoV3AssociationGroupNameGetData> {
		public static readonly CommandClass = AssociationGrpInfoV3;
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
			return packet.tryAs(AssociationGrpInfoV3)?.command === this.command;
		}

		constructor(data: Buffer | AssociationGrpInfoV3AssociationGroupNameGetData) {
			super(AssociationGroupNameGet, data);
		}
	};

	public static readonly AssociationGroupNameReport = class AssociationGroupNameReport extends CommandPacket<AssociationGrpInfoV3AssociationGroupNameReportData> {
		public static readonly CommandClass = AssociationGrpInfoV3;
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
						"name": "Length of Name",
						"mask": 255,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(AssociationGrpInfoV3)?.command === this.command;
		}

		constructor(data: Buffer | AssociationGrpInfoV3AssociationGroupNameReportData) {
			super(AssociationGroupNameReport, data);
		}
	};

	public static readonly AssociationGroupInfoGet = class AssociationGroupInfoGet extends CommandPacket<AssociationGrpInfoV3AssociationGroupInfoGetData> {
		public static readonly CommandClass = AssociationGrpInfoV3;
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
							"type": "integer",
							"name": "Reserved",
							"mask": 63,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "List Mode",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "boolean",
							"name": "Refresh cache",
							"mask": 128,
							"shift": 7
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
			return packet.tryAs(AssociationGrpInfoV3)?.command === this.command;
		}

		constructor(data: Buffer | AssociationGrpInfoV3AssociationGroupInfoGetData) {
			super(AssociationGroupInfoGet, data);
		}
	};

	public static readonly AssociationGroupInfoReport = class AssociationGroupInfoReport extends CommandPacket<AssociationGrpInfoV3AssociationGroupInfoReportData> {
		public static readonly CommandClass = AssociationGrpInfoV3;
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
							"type": "integer",
							"name": "Group Count",
							"mask": 63,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Dynamic Info",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "boolean",
							"name": "List mode",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"name": "Properties1",
						"mask": 63,
						"shift": 0
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
								"0": "Profile General",
								"32": "Profile Control",
								"49": "Profile Sensor",
								"50": "Profile Meter",
								"107": "Profile Irrigation",
								"113": "Profile Notification"
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
									"0": "Profile General NA",
									"1": "Profile General Lifeline"
								},
								"32": {
									"1": "Profile Control KEY01",
									"2": "Profile Control KEY02",
									"3": "Profile Control KEY03",
									"4": "Profile Control KEY04",
									"5": "Profile Control KEY05",
									"6": "Profile Control KEY06",
									"7": "Profile Control KEY07",
									"8": "Profile Control KEY08",
									"9": "Profile Control KEY09",
									"10": "Profile Control KEY10",
									"11": "Profile Control KEY11",
									"12": "Profile Control KEY12",
									"13": "Profile Control KEY13",
									"14": "Profile Control KEY14",
									"15": "Profile Control KEY15",
									"16": "Profile Control KEY16",
									"17": "Profile Control KEY17",
									"18": "Profile Control KEY18",
									"19": "Profile Control KEY19",
									"20": "Profile Control KEY20",
									"21": "Profile Control KEY21",
									"22": "Profile Control KEY22",
									"23": "Profile Control KEY23",
									"24": "Profile Control KEY24",
									"25": "Profile Control KEY25",
									"26": "Profile Control KEY26",
									"27": "Profile Control KEY27",
									"28": "Profile Control KEY28",
									"29": "Profile Control KEY29",
									"30": "Profile Control KEY30",
									"31": "Profile Control KEY31",
									"32": "Profile Control KEY32"
								},
								"49": {
									"1": "Profile MULTILEVEL_SENSOR_TYPE_TEMPERATURE",
									"5": "Profile MULTILEVEL_SENSOR_TYPE_HUMIDITY"
								},
								"50": {
									"1": "Profile METER_TYPE_ELECTRIC",
									"2": "Profile METER_TYPE_GAS",
									"3": "Profile METER_TYPE_WATER"
								},
								"107": {
									"1": "Irrigation Channel 01",
									"2": "Irrigation Channel 02",
									"3": "Irrigation Channel 03",
									"4": "Irrigation Channel 04",
									"5": "Irrigation Channel 05",
									"6": "Irrigation Channel 06",
									"7": "Irrigation Channel 07",
									"8": "Irrigation Channel 08",
									"9": "Irrigation Channel 09",
									"10": "Irrigation Channel 10",
									"11": "Irrigation Channel 11",
									"12": "Irrigation Channel 12",
									"13": "Irrigation Channel 13",
									"14": "Irrigation Channel 14",
									"15": "Irrigation Channel 15",
									"16": "Irrigation Channel 16",
									"17": "Irrigation Channel 17",
									"18": "Irrigation Channel 18",
									"19": "Irrigation Channel 19",
									"20": "Irrigation Channel 20",
									"21": "Irrigation Channel 21",
									"22": "Irrigation Channel 22",
									"23": "Irrigation Channel 23",
									"24": "Irrigation Channel 24",
									"25": "Irrigation Channel 25",
									"26": "Irrigation Channel 26",
									"27": "Irrigation Channel 27",
									"28": "Irrigation Channel 28",
									"29": "Irrigation Channel 29",
									"30": "Irrigation Channel 30",
									"31": "Irrigation Channel 31",
									"32": "Irrigation Channel 32"
								},
								"113": {
									"1": "Profile NOTIFICATION_TYPE_SMOKE",
									"3": "Profile NOTIFICATION_TYPE_CO2"
								}
							}
						},
						{
							"type": "integer",
							"name": "reserved",
							"help": "Reserved",
							"length": 1
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
			return packet.tryAs(AssociationGrpInfoV3)?.command === this.command;
		}

		constructor(data: Buffer | AssociationGrpInfoV3AssociationGroupInfoReportData) {
			super(AssociationGroupInfoReport, data);
		}
	};

	public static readonly AssociationGroupCommandListGet = class AssociationGroupCommandListGet extends CommandPacket<AssociationGrpInfoV3AssociationGroupCommandListGetData> {
		public static readonly CommandClass = AssociationGrpInfoV3;
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
							"type": "integer",
							"name": "Reserved",
							"mask": 127,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Allow cache",
							"mask": 128,
							"shift": 7
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
			return packet.tryAs(AssociationGrpInfoV3)?.command === this.command;
		}

		constructor(data: Buffer | AssociationGrpInfoV3AssociationGroupCommandListGetData) {
			super(AssociationGroupCommandListGet, data);
		}
	};

	public static readonly AssociationGroupCommandListReport = class AssociationGroupCommandListReport extends CommandPacket<AssociationGrpInfoV3AssociationGroupCommandListReportData> {
		public static readonly CommandClass = AssociationGrpInfoV3;
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
						"name": "List Length",
						"mask": 255,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(AssociationGrpInfoV3)?.command === this.command;
		}

		constructor(data: Buffer | AssociationGrpInfoV3AssociationGroupCommandListReportData) {
			super(AssociationGroupCommandListReport, data);
		}
	};
}

export namespace AssociationGrpInfoV3 {
	export type AssociationGroupNameGet = InstanceType<typeof AssociationGrpInfoV3.AssociationGroupNameGet>;
	export type AssociationGroupNameReport = InstanceType<typeof AssociationGrpInfoV3.AssociationGroupNameReport>;
	export type AssociationGroupInfoGet = InstanceType<typeof AssociationGrpInfoV3.AssociationGroupInfoGet>;
	export type AssociationGroupInfoReport = InstanceType<typeof AssociationGrpInfoV3.AssociationGroupInfoReport>;
	export type AssociationGroupCommandListGet = InstanceType<typeof AssociationGrpInfoV3.AssociationGroupCommandListGet>;
	export type AssociationGroupCommandListReport = InstanceType<typeof AssociationGrpInfoV3.AssociationGroupCommandListReport>;
}
