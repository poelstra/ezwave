/**
 * Command Class Schedule, version 4.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

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
	scheduleIdBlock: number; // 1 byte unsigned integer
}

export interface ScheduleV4ScheduleSupportedReportData {
	numberOfSupportedScheduleId: number; // 1 byte unsigned integer
	supportEnableDisable: boolean; // properties1[7]
	fallbackSupport: boolean; // properties1[6]
	startTimeSupport: number; // properties1[5..0]
	vg1: Array<{ // variable length
		supportedCc: number; // 1 byte unsigned integer
		supportedCommand: number; // properties2[1..0]
	}>;
	overrideSupport: boolean; // properties3[7]
	supportedOverrideTypes: number; // properties3[6..0]
	scheduleIdBlock: number; // 1 byte unsigned integer
	numberOfSupportedScheduleBlocks: number; // 1 byte unsigned integer
}

export interface ScheduleV4CommandScheduleSetData {
	scheduleId: number; // 1 byte unsigned integer
	scheduleIdBlock: number; // 1 byte unsigned integer
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
	duration: number; // 2 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	vg1: Array<{ // variable length
		cmd: Buffer; // variable length
	}>;
}

export interface ScheduleV4CommandScheduleGetData {
	scheduleId: number; // 1 byte unsigned integer
	scheduleIdBlock: number; // 1 byte unsigned integer
	aidRoCtl: boolean; // properties1[7]
}

export interface ScheduleV4CommandScheduleReportData {
	scheduleId: number; // 1 byte unsigned integer
	scheduleIdBlock: number; // 1 byte unsigned integer
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
	duration: number; // 2 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	vg1: Array<{ // variable length
		cmd: Buffer; // variable length
	}>;
}

export interface ScheduleV4ScheduleRemoveData {
	scheduleId: number; // 1 byte unsigned integer
	scheduleIdBlock: number; // 1 byte unsigned integer
}

export interface ScheduleV4ScheduleStateSetData {
	scheduleId: number; // 1 byte unsigned integer
	scheduleState: number; // 1 byte unsigned integer
	scheduleIdBlock: number; // 1 byte unsigned integer
}

export interface ScheduleV4ScheduleStateGetData {
	scheduleIdBlock: number; // 1 byte unsigned integer
}

export interface ScheduleV4ScheduleStateReportData {
	numberOfSupportedScheduleId: number; // 1 byte unsigned integer
	reportsToFollow: number; // properties1[7..1]
	override: boolean; // properties1[0]
	vg1: Array<{ // automatic length
		activeId2: number; // properties2[7..4]
		activeId1: number; // properties2[3..0]
	}>;
	scheduleIdBlock: number; // 1 byte unsigned integer
}

export interface ScheduleV4ScheduleSupportedCommandsGetData {
	scheduleIdBlock: number; // 1 byte unsigned integer
}

export interface ScheduleV4ScheduleSupportedCommandsReportData {
	scheduleIdBlock: number; // 1 byte unsigned integer
	vg1: Array<{ // variable length
		commandClass: number; // 1 byte unsigned integer
		supportedCommand: Buffer; // variable length
	}>;
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
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "ScheduleSupportedGet",
			"help": "Schedule Support Get",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "scheduleIdBlock",
					"help": "Schedule ID Block",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "ScheduleSupportedReport",
			"help": "Schedule Support Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "numberOfSupportedScheduleId",
					"help": "Number of Supported Schedule ID",
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
							"name": "supportEnableDisable",
							"mask": 128,
							"shift": 7
						},
						{
							"fieldType": "Boolean",
							"name": "fallbackSupport",
							"mask": 64,
							"shift": 6
						},
						{
							"fieldType": "Integer",
							"name": "startTimeSupport",
							"mask": 63,
							"shift": 0
						}
					]
				},
				{
					"type": "Integer",
					"name": "numberOfSupportedCc",
					"help": "Number of supported CC",
					"length": 1,
					"lengthOf": {
						"refs": [
							"vg1"
						]
					},
					"isAutogenerated": true
				},
				{
					"type": "Group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"lengthType": "Ref",
						"from": {
							"ref": "numberOfSupportedCc"
						}
					},
					"params": [
						{
							"type": "Integer",
							"name": "supportedCc",
							"help": "Supported CC",
							"length": 1
						},
						{
							"type": "Bitfield",
							"name": "properties2",
							"help": "Properties2",
							"length": 1,
							"fields": [
								{
									"fieldType": "Integer",
									"name": "reserved",
									"mask": 252,
									"shift": 2,
									"reserved": true
								},
								{
									"fieldType": "Integer",
									"name": "supportedCommand",
									"mask": 3,
									"shift": 0
								}
							]
						}
					]
				},
				{
					"type": "Bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"fieldType": "Boolean",
							"name": "overrideSupport",
							"mask": 128,
							"shift": 7
						},
						{
							"fieldType": "Integer",
							"name": "supportedOverrideTypes",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "Integer",
					"name": "scheduleIdBlock",
					"help": "Schedule ID Block",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "numberOfSupportedScheduleBlocks",
					"help": "Number of Supported Schedule Blocks",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "CommandScheduleSet",
			"help": "Schedule Set",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "scheduleId",
					"help": "Schedule ID",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "scheduleIdBlock",
					"help": "Schedule ID Block",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "startYear",
					"help": "Start Year",
					"length": 1
				},
				{
					"type": "Bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "Integer",
							"name": "recurrenceOffset",
							"mask": 240,
							"shift": 4
						},
						{
							"fieldType": "Integer",
							"name": "startMonth",
							"mask": 15,
							"shift": 0
						}
					]
				},
				{
					"type": "Bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"fieldType": "Boolean",
							"name": "reserved1",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"fieldType": "Enum",
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
							"fieldType": "Integer",
							"name": "startDayOfMonth",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "Bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"fieldType": "Boolean",
							"name": "reserved2",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"fieldType": "Integer",
							"name": "startWeekday",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "Bitfield",
					"name": "properties4",
					"help": "Properties4",
					"length": 1,
					"fields": [
						{
							"fieldType": "Integer",
							"name": "durationType",
							"mask": 224,
							"shift": 5
						},
						{
							"fieldType": "Integer",
							"name": "startHour",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "Bitfield",
					"name": "properties5",
					"help": "Properties5",
					"length": 1,
					"fields": [
						{
							"fieldType": "Boolean",
							"name": "reserved3",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"fieldType": "Boolean",
							"name": "relative",
							"mask": 64,
							"shift": 6
						},
						{
							"fieldType": "Integer",
							"name": "startMinute",
							"mask": 63,
							"shift": 0
						}
					]
				},
				{
					"type": "Integer",
					"name": "duration",
					"help": "Duration ",
					"length": 2
				},
				{
					"type": "Integer",
					"name": "reportsToFollow",
					"help": "Reports to Follow",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "numberOfCmdToFollow",
					"help": "Number of Cmd to Follow",
					"length": 1,
					"lengthOf": {
						"refs": [
							"vg1"
						]
					},
					"isAutogenerated": true
				},
				{
					"type": "Group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"lengthType": "Ref",
						"from": {
							"ref": "numberOfCmdToFollow"
						}
					},
					"params": [
						{
							"type": "Integer",
							"name": "cmdLength",
							"help": "Cmd Length",
							"length": 1,
							"lengthOf": {
								"refs": [
									"vg1.cmd"
								]
							},
							"isAutogenerated": true
						},
						{
							"type": "Blob",
							"name": "cmd",
							"help": "Cmd ",
							"length": {
								"lengthType": "Ref",
								"from": {
									"ref": "vg1.cmdLength"
								}
							}
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "CommandScheduleGet",
			"help": "Schedule Get",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "scheduleId",
					"help": "Schedule ID",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "scheduleIdBlock",
					"help": "Schedule ID Block",
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
							"name": "aidRoCtl",
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
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "CommandScheduleReport",
			"help": "Schedule Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "scheduleId",
					"help": "Schedule ID",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "scheduleIdBlock",
					"help": "Schedule ID Block",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "startYear",
					"help": "Start Year",
					"length": 1
				},
				{
					"type": "Bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "Integer",
							"name": "aidRo",
							"mask": 240,
							"shift": 4
						},
						{
							"fieldType": "Integer",
							"name": "startMonth",
							"mask": 15,
							"shift": 0
						}
					]
				},
				{
					"type": "Bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"fieldType": "Boolean",
							"name": "aidRoCtl",
							"mask": 128,
							"shift": 7
						},
						{
							"fieldType": "Enum",
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
							"fieldType": "Integer",
							"name": "startDayOfMonth",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "Bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"fieldType": "Boolean",
							"name": "reserved1",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"fieldType": "Integer",
							"name": "startWeekday",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "Bitfield",
					"name": "properties4",
					"help": "Properties4",
					"length": 1,
					"fields": [
						{
							"fieldType": "Integer",
							"name": "durationType",
							"mask": 224,
							"shift": 5
						},
						{
							"fieldType": "Integer",
							"name": "startHour",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "Bitfield",
					"name": "properties5",
					"help": "Properties5",
					"length": 1,
					"fields": [
						{
							"fieldType": "Boolean",
							"name": "reserved2",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"fieldType": "Boolean",
							"name": "relative",
							"mask": 64,
							"shift": 6
						},
						{
							"fieldType": "Integer",
							"name": "startMinute",
							"mask": 63,
							"shift": 0
						}
					]
				},
				{
					"type": "Integer",
					"name": "duration",
					"help": "Duration ",
					"length": 2
				},
				{
					"type": "Integer",
					"name": "reportsToFollow",
					"help": "Reports to Follow",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "numberOfCmdToFollow",
					"help": "Number of Cmd to Follow",
					"length": 1,
					"lengthOf": {
						"refs": [
							"vg1"
						]
					},
					"isAutogenerated": true
				},
				{
					"type": "Group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"lengthType": "Ref",
						"from": {
							"ref": "numberOfCmdToFollow"
						}
					},
					"params": [
						{
							"type": "Integer",
							"name": "cmdLength",
							"help": "Cmd Length",
							"length": 1,
							"lengthOf": {
								"refs": [
									"vg1.cmd"
								]
							},
							"isAutogenerated": true
						},
						{
							"type": "Blob",
							"name": "cmd",
							"help": "Cmd ",
							"length": {
								"lengthType": "Ref",
								"from": {
									"ref": "vg1.cmdLength"
								}
							}
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "ScheduleRemove",
			"help": "Schedule Remove",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "scheduleId",
					"help": "Schedule ID",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "scheduleIdBlock",
					"help": "Schedule ID Block",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 7,
			"name": "ScheduleStateSet",
			"help": "Schedule State Set",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "scheduleId",
					"help": "Schedule ID",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "scheduleState",
					"help": "Schedule State",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "scheduleIdBlock",
					"help": "Schedule ID Block",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 8,
			"name": "ScheduleStateGet",
			"help": "Schedule State Get",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "scheduleIdBlock",
					"help": "Schedule ID Block",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 9,
			"name": "ScheduleStateReport",
			"help": "Schedule State Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "numberOfSupportedScheduleId",
					"help": "Number of Supported Schedule ID",
					"length": 1
				},
				{
					"type": "Bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "Integer",
							"name": "reportsToFollow",
							"mask": 254,
							"shift": 1
						},
						{
							"fieldType": "Boolean",
							"name": "override",
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
						"lengthType": "Auto"
					},
					"params": [
						{
							"type": "Bitfield",
							"name": "properties2",
							"help": "Properties2",
							"length": 1,
							"fields": [
								{
									"fieldType": "Integer",
									"name": "activeId2",
									"mask": 240,
									"shift": 4
								},
								{
									"fieldType": "Integer",
									"name": "activeId1",
									"mask": 15,
									"shift": 0
								}
							]
						}
					]
				},
				{
					"type": "Integer",
					"name": "scheduleIdBlock",
					"help": "Schedule ID Block",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 10,
			"name": "ScheduleSupportedCommandsGet",
			"help": "Schedule Supported Commands Get",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "scheduleIdBlock",
					"help": "Schedule ID Block",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 11,
			"name": "ScheduleSupportedCommandsReport",
			"help": "Schedule Supported Commands Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "scheduleIdBlock",
					"help": "Schedule ID Block",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "commandClassListLength",
					"help": "Command Class List Length",
					"length": 1,
					"lengthOf": {
						"refs": [
							"vg1"
						]
					},
					"isAutogenerated": true
				},
				{
					"type": "Group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"lengthType": "Ref",
						"from": {
							"ref": "commandClassListLength"
						}
					},
					"params": [
						{
							"type": "Integer",
							"name": "commandClass",
							"help": "Command Class",
							"length": 1,
							"valueType": "CommandClass"
						},
						{
							"type": "Integer",
							"name": "supportedCommandListLength",
							"help": "Supported Command List Length",
							"length": 1,
							"lengthOf": {
								"refs": [
									"vg1.supportedCommand"
								]
							},
							"isAutogenerated": true
						},
						{
							"type": "Blob",
							"name": "supportedCommand",
							"help": "Supported Command",
							"length": {
								"lengthType": "Ref",
								"from": {
									"ref": "vg1.supportedCommandListLength"
								}
							}
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

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
