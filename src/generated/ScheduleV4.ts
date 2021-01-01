/**
 * Command Class Schedule, version 4.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ScheduleV4Commands {
	ScheduleSupportedGet = 0x01,
	ScheduleSupportedReport = 0x02,
	CommandScheduleSet = 0x03,
	CommandScheduleGet = 0x04,
	CommandScheduleReport = 0x05,
	ScheduleRemove = 0x06,
	ScheduleStateSet = 0x07,
	ScheduleStateGet = 0x08,
	ScheduleStateReport = 0x09,
	ScheduleSupportedCommandsGet = 0x0a,
	ScheduleSupportedCommandsReport = 0x0b,
}

export interface ScheduleV4ScheduleSupportedGetData {
	scheduleIDBlock: number; // 1 byte unsigned integer
}

export interface ScheduleV4ScheduleSupportedReportData {
	numberOfSupportedScheduleID: number; // 1 byte unsigned integer
	supportEnableDisable: boolean; // properties1[7]
	fallbackSupport: boolean; // properties1[6]
	startTimeSupport: number; // properties1[5..0]
	numberOfSupportedCC: number; // 1 byte unsigned integer
	// TODO param vg1 type group
	overrideSupport: boolean; // properties3[7]
	supportedOverrideTypes: number; // properties3[6..0]
	scheduleIDBlock: number; // 1 byte unsigned integer
	numberOfSupportedScheduleBlocks: number; // 1 byte unsigned integer
}

export interface ScheduleV4CommandScheduleSetData {
	scheduleID: number; // 1 byte unsigned integer
	scheduleIDBlock: number; // 1 byte unsigned integer
	startYear: number; // 1 byte unsigned integer
	recurrenceOffset: number; // properties1[7..4]
	startMonth: number; // properties1[3..0]
	recurrenceMode: RecurrenceModeEnum; // properties2[6..5]
	startDayOfMonth: number; // properties2[4..0]
	startWeekday: number; // properties3[6..0]
	durationType: number; // properties4[7..5]
	startHour: number; // properties4[4..0]
	relative: boolean; // properties5[6]
	startMinute: number; // properties5[5..0]
	durationByte: number; // 2 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	numberOfCmdToFollow: number; // 1 byte unsigned integer
	// TODO param vg1 type group
}

export interface ScheduleV4CommandScheduleGetData {
	scheduleID: number; // 1 byte unsigned integer
	scheduleIDBlock: number; // 1 byte unsigned integer
	aidRoCtl: boolean; // properties1[7]
}

export interface ScheduleV4CommandScheduleReportData {
	scheduleID: number; // 1 byte unsigned integer
	scheduleIDBlock: number; // 1 byte unsigned integer
	startYear: number; // 1 byte unsigned integer
	aidRo: number; // properties1[7..4]
	startMonth: number; // properties1[3..0]
	aidRoCtl: boolean; // properties2[7]
	recurrenceMode: RecurrenceModeEnum; // properties2[6..5]
	startDayOfMonth: number; // properties2[4..0]
	startWeekday: number; // properties3[6..0]
	durationType: number; // properties4[7..5]
	startHour: number; // properties4[4..0]
	relative: boolean; // properties5[6]
	startMinute: number; // properties5[5..0]
	durationByte: number; // 2 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	numberOfCmdToFollow: number; // 1 byte unsigned integer
	// TODO param vg1 type group
}

export interface ScheduleV4ScheduleRemoveData {
	scheduleID: number; // 1 byte unsigned integer
	scheduleIDBlock: number; // 1 byte unsigned integer
}

export interface ScheduleV4ScheduleStateSetData {
	scheduleID: number; // 1 byte unsigned integer
	scheduleState: number; // 1 byte unsigned integer
	scheduleIDBlock: number; // 1 byte unsigned integer
}

export interface ScheduleV4ScheduleStateGetData {
	scheduleIDBlock: number; // 1 byte unsigned integer
}

export interface ScheduleV4ScheduleStateReportData {
	numberOfSupportedScheduleID: number; // 1 byte unsigned integer
	reportsToFollow: number; // properties1[7..1]
	override: boolean; // properties1[0]
	// TODO param vg1 type group
	scheduleIDBlock: number; // 1 byte unsigned integer
}

export interface ScheduleV4ScheduleSupportedCommandsGetData {
	scheduleIDBlock: number; // 1 byte unsigned integer
}

export interface ScheduleV4ScheduleSupportedCommandsReportData {
	scheduleIDBlock: number; // 1 byte unsigned integer
	commandClassListLength: number; // 1 byte unsigned integer
	// TODO param vg1 type group
}

export enum RecurrenceModeEnum {
	RepeatEveryNHours = 0x0,
	RepeatEveryNDays = 0x1,
	RepeatEveryNWeeks = 0x2,
}

export class ScheduleV4 extends CommandClassPacket<ScheduleV4Commands> {
	public static readonly commandClass = CommandClasses.Schedule; // 0x53 (83)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ScheduleV4, commandAndPayload);
	}

	public static readonly ScheduleSupportedGet = class ScheduleSupportedGet extends CommandPacket<ScheduleV4ScheduleSupportedGetData> {
		public static readonly CommandClass = ScheduleV4;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "ScheduleSupportedGet",
			"help": "Schedule Support Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "scheduleIDBlock",
					"help": "Schedule ID Block",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleV4)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV4ScheduleSupportedGetData) {
			super(ScheduleSupportedGet, data);
		}
	};

	public static readonly ScheduleSupportedReport = class ScheduleSupportedReport extends CommandPacket<ScheduleV4ScheduleSupportedReportData> {
		public static readonly CommandClass = ScheduleV4;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "ScheduleSupportedReport",
			"help": "Schedule Support Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "numberOfSupportedScheduleID",
					"help": "Number of Supported Schedule ID",
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
							"name": "supportEnableDisable",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "boolean",
							"name": "fallbackSupport",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "integer",
							"name": "startTimeSupport",
							"mask": 63,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "numberOfSupportedCC",
					"help": "Number of supported CC",
					"length": 1
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"ref": "numberOfSupportedCC"
					},
					"params": [
						{
							"type": "integer",
							"name": "supportedCC",
							"help": "Supported CC",
							"length": 1
						},
						{
							"type": "bitfield",
							"name": "properties2",
							"help": "Properties2",
							"length": 1,
							"fields": [
								{
									"type": "integer",
									"name": "supportedCommand",
									"mask": 3,
									"shift": 0
								},
								{
									"type": "integer",
									"name": "reserved",
									"mask": 252,
									"shift": 2,
									"reserved": true
								}
							]
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "overrideSupport",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "supportedOverrideTypes",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "scheduleIDBlock",
					"help": "Schedule ID Block",
					"length": 1
				},
				{
					"type": "integer",
					"name": "numberOfSupportedScheduleBlocks",
					"help": "Number of Supported Schedule Blocks",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleV4)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV4ScheduleSupportedReportData) {
			super(ScheduleSupportedReport, data);
		}
	};

	public static readonly CommandScheduleSet = class CommandScheduleSet extends CommandPacket<ScheduleV4CommandScheduleSetData> {
		public static readonly CommandClass = ScheduleV4;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "CommandScheduleSet",
			"help": "Schedule Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "scheduleID",
					"help": "Schedule ID",
					"length": 1
				},
				{
					"type": "integer",
					"name": "scheduleIDBlock",
					"help": "Schedule ID Block",
					"length": 1
				},
				{
					"type": "integer",
					"name": "startYear",
					"help": "Start Year",
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
							"name": "recurrenceOffset",
							"mask": 240,
							"shift": 4
						},
						{
							"type": "integer",
							"name": "startMonth",
							"mask": 15,
							"shift": 0
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "reserved1",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"type": "enum",
							"name": "recurrenceMode",
							"mask": 96,
							"shift": 5,
							"values": {
								"0": {
									"name": "RepeatEveryNHours",
									"help": "Repeat every n hours"
								},
								"1": {
									"name": "RepeatEveryNDays",
									"help": "Repeat every n days"
								},
								"2": {
									"name": "RepeatEveryNWeeks",
									"help": "Repeat every n weeks"
								}
							}
						},
						{
							"type": "integer",
							"name": "startDayOfMonth",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "reserved2",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "startWeekday",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties4",
					"help": "Properties4",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "durationType",
							"mask": 224,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "startHour",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties5",
					"help": "Properties5",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "reserved3",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"type": "boolean",
							"name": "relative",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "integer",
							"name": "startMinute",
							"mask": 63,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "durationByte",
					"help": "Duration Byte",
					"length": 2
				},
				{
					"type": "integer",
					"name": "reportsToFollow",
					"help": "Reports to Follow",
					"length": 1
				},
				{
					"type": "integer",
					"name": "numberOfCmdToFollow",
					"help": "Number of Cmd to Follow",
					"length": 1
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"ref": "numberOfCmdToFollow"
					},
					"params": [
						{
							"type": "integer",
							"name": "cmdLength",
							"help": "Cmd Length",
							"length": 1
						},
						{
							"type": "blob",
							"name": "cmdByte",
							"help": "Cmd Byte",
							"length": {
								"ref": "cmdLength"
							}
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleV4)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV4CommandScheduleSetData) {
			super(CommandScheduleSet, data);
		}
	};

	public static readonly CommandScheduleGet = class CommandScheduleGet extends CommandPacket<ScheduleV4CommandScheduleGetData> {
		public static readonly CommandClass = ScheduleV4;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "CommandScheduleGet",
			"help": "Schedule Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "scheduleID",
					"help": "Schedule ID",
					"length": 1
				},
				{
					"type": "integer",
					"name": "scheduleIDBlock",
					"help": "Schedule ID Block",
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
							"name": "aidRoCtl",
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
			return packet.tryAs(ScheduleV4)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV4CommandScheduleGetData) {
			super(CommandScheduleGet, data);
		}
	};

	public static readonly CommandScheduleReport = class CommandScheduleReport extends CommandPacket<ScheduleV4CommandScheduleReportData> {
		public static readonly CommandClass = ScheduleV4;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "CommandScheduleReport",
			"help": "Schedule Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "scheduleID",
					"help": "Schedule ID",
					"length": 1
				},
				{
					"type": "integer",
					"name": "scheduleIDBlock",
					"help": "Schedule ID Block",
					"length": 1
				},
				{
					"type": "integer",
					"name": "startYear",
					"help": "Start Year",
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
							"name": "aidRo",
							"mask": 240,
							"shift": 4
						},
						{
							"type": "integer",
							"name": "startMonth",
							"mask": 15,
							"shift": 0
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "aidRoCtl",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "enum",
							"name": "recurrenceMode",
							"mask": 96,
							"shift": 5,
							"values": {
								"0": {
									"name": "RepeatEveryNHours",
									"help": "Repeat every n hours"
								},
								"1": {
									"name": "RepeatEveryNDays",
									"help": "Repeat every n days"
								},
								"2": {
									"name": "RepeatEveryNWeeks",
									"help": "Repeat every n weeks"
								}
							}
						},
						{
							"type": "integer",
							"name": "startDayOfMonth",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "reserved1",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "startWeekday",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties4",
					"help": "Properties4",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "durationType",
							"mask": 224,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "startHour",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties5",
					"help": "Properties5",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "reserved2",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"type": "boolean",
							"name": "relative",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "integer",
							"name": "startMinute",
							"mask": 63,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "durationByte",
					"help": "Duration Byte",
					"length": 2
				},
				{
					"type": "integer",
					"name": "reportsToFollow",
					"help": "Reports to Follow",
					"length": 1
				},
				{
					"type": "integer",
					"name": "numberOfCmdToFollow",
					"help": "Number of Cmd to Follow",
					"length": 1
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"ref": "numberOfCmdToFollow"
					},
					"params": [
						{
							"type": "integer",
							"name": "cmdLength",
							"help": "Cmd Length",
							"length": 1
						},
						{
							"type": "blob",
							"name": "cmdByte",
							"help": "Cmd Byte",
							"length": {
								"ref": "cmdLength"
							}
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleV4)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV4CommandScheduleReportData) {
			super(CommandScheduleReport, data);
		}
	};

	public static readonly ScheduleRemove = class ScheduleRemove extends CommandPacket<ScheduleV4ScheduleRemoveData> {
		public static readonly CommandClass = ScheduleV4;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "ScheduleRemove",
			"help": "Schedule Remove",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "scheduleID",
					"help": "Schedule ID",
					"length": 1
				},
				{
					"type": "integer",
					"name": "scheduleIDBlock",
					"help": "Schedule ID Block",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleV4)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV4ScheduleRemoveData) {
			super(ScheduleRemove, data);
		}
	};

	public static readonly ScheduleStateSet = class ScheduleStateSet extends CommandPacket<ScheduleV4ScheduleStateSetData> {
		public static readonly CommandClass = ScheduleV4;
		public static readonly command = 0x07;
		public static readonly definition = {
			"command": 7,
			"name": "ScheduleStateSet",
			"help": "Schedule State Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "scheduleID",
					"help": "Schedule ID",
					"length": 1
				},
				{
					"type": "integer",
					"name": "scheduleState",
					"help": "Schedule State",
					"length": 1
				},
				{
					"type": "integer",
					"name": "scheduleIDBlock",
					"help": "Schedule ID Block",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleV4)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV4ScheduleStateSetData) {
			super(ScheduleStateSet, data);
		}
	};

	public static readonly ScheduleStateGet = class ScheduleStateGet extends CommandPacket<ScheduleV4ScheduleStateGetData> {
		public static readonly CommandClass = ScheduleV4;
		public static readonly command = 0x08;
		public static readonly definition = {
			"command": 8,
			"name": "ScheduleStateGet",
			"help": "Schedule State Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "scheduleIDBlock",
					"help": "Schedule ID Block",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleV4)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV4ScheduleStateGetData) {
			super(ScheduleStateGet, data);
		}
	};

	public static readonly ScheduleStateReport = class ScheduleStateReport extends CommandPacket<ScheduleV4ScheduleStateReportData> {
		public static readonly CommandClass = ScheduleV4;
		public static readonly command = 0x09;
		public static readonly definition = {
			"command": 9,
			"name": "ScheduleStateReport",
			"help": "Schedule State Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "numberOfSupportedScheduleID",
					"help": "Number of Supported Schedule ID",
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
							"name": "reportsToFollow",
							"mask": 254,
							"shift": 1
						},
						{
							"type": "boolean",
							"name": "override",
							"mask": 1,
							"shift": 0
						}
					]
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": "auto",
					"params": [
						{
							"type": "bitfield",
							"name": "properties2",
							"help": "Properties2",
							"length": 1,
							"fields": [
								{
									"type": "integer",
									"name": "activeID1",
									"mask": 15,
									"shift": 0
								},
								{
									"type": "integer",
									"name": "activeID2",
									"mask": 240,
									"shift": 4
								}
							]
						}
					]
				},
				{
					"type": "integer",
					"name": "scheduleIDBlock",
					"help": "Schedule ID Block",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleV4)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV4ScheduleStateReportData) {
			super(ScheduleStateReport, data);
		}
	};

	public static readonly ScheduleSupportedCommandsGet = class ScheduleSupportedCommandsGet extends CommandPacket<ScheduleV4ScheduleSupportedCommandsGetData> {
		public static readonly CommandClass = ScheduleV4;
		public static readonly command = 0x0a;
		public static readonly definition = {
			"command": 10,
			"name": "ScheduleSupportedCommandsGet",
			"help": "Schedule Supported Commands Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "scheduleIDBlock",
					"help": "Schedule ID Block",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleV4)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV4ScheduleSupportedCommandsGetData) {
			super(ScheduleSupportedCommandsGet, data);
		}
	};

	public static readonly ScheduleSupportedCommandsReport = class ScheduleSupportedCommandsReport extends CommandPacket<ScheduleV4ScheduleSupportedCommandsReportData> {
		public static readonly CommandClass = ScheduleV4;
		public static readonly command = 0x0b;
		public static readonly definition = {
			"command": 11,
			"name": "ScheduleSupportedCommandsReport",
			"help": "Schedule Supported Commands Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "scheduleIDBlock",
					"help": "Schedule ID Block",
					"length": 1
				},
				{
					"type": "integer",
					"name": "commandClassListLength",
					"help": "Command Class List Length",
					"length": 1
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"ref": "commandClassListLength"
					},
					"params": [
						{
							"type": "integer",
							"name": "commandClass",
							"help": "Command Class",
							"length": 1,
							"valueType": "CMD_CLASS_REF"
						},
						{
							"type": "integer",
							"name": "supportedCommandListLength",
							"help": "Supported Command List Length",
							"length": 1
						},
						{
							"type": "blob",
							"name": "supportedCommand",
							"help": "Supported Command",
							"length": {
								"ref": "supportedCommandListLength"
							}
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleV4)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV4ScheduleSupportedCommandsReportData) {
			super(ScheduleSupportedCommandsReport, data);
		}
	};
}

export namespace ScheduleV4 {
	export type ScheduleSupportedGet = InstanceType<typeof ScheduleV4.ScheduleSupportedGet>;
	export type ScheduleSupportedReport = InstanceType<typeof ScheduleV4.ScheduleSupportedReport>;
	export type CommandScheduleSet = InstanceType<typeof ScheduleV4.CommandScheduleSet>;
	export type CommandScheduleGet = InstanceType<typeof ScheduleV4.CommandScheduleGet>;
	export type CommandScheduleReport = InstanceType<typeof ScheduleV4.CommandScheduleReport>;
	export type ScheduleRemove = InstanceType<typeof ScheduleV4.ScheduleRemove>;
	export type ScheduleStateSet = InstanceType<typeof ScheduleV4.ScheduleStateSet>;
	export type ScheduleStateGet = InstanceType<typeof ScheduleV4.ScheduleStateGet>;
	export type ScheduleStateReport = InstanceType<typeof ScheduleV4.ScheduleStateReport>;
	export type ScheduleSupportedCommandsGet = InstanceType<typeof ScheduleV4.ScheduleSupportedCommandsGet>;
	export type ScheduleSupportedCommandsReport = InstanceType<typeof ScheduleV4.ScheduleSupportedCommandsReport>;
}
