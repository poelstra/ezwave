/**
 * Command Class Schedule, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum ScheduleV2Commands {
	ScheduleSupportedGet = 0x01,
	ScheduleSupportedReport = 0x02,
	CommandScheduleSet = 0x03,
	CommandScheduleGet = 0x04,
	CommandScheduleReport = 0x05,
	ScheduleRemove = 0x06,
	ScheduleStateSet = 0x07,
	ScheduleStateGet = 0x08,
	ScheduleStateReport = 0x09,
}

export interface ScheduleV2ScheduleSupportedGetData {
	scheduleIdBlock: number; // 1 byte unsigned integer
}

export interface ScheduleV2ScheduleSupportedReportData {
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

export interface ScheduleV2CommandScheduleSetData {
	scheduleId: number; // 1 byte unsigned integer
	scheduleIdBlock: number; // 1 byte unsigned integer
	startYear: number; // 1 byte unsigned integer
	startMonth: number; // properties1[3..0]
	startDayOfMonth: number; // properties2[4..0]
	startWeekday: number; // properties3[6..0]
	durationType: number; // properties4[7..5]
	startHour: number; // properties4[4..0]
	startMinute: number; // properties5[5..0]
	duration: number; // 2 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	vg1: Array<{ // variable length
		cmd: Buffer; // variable length
	}>;
}

export interface ScheduleV2CommandScheduleGetData {
	scheduleId: number; // 1 byte unsigned integer
	scheduleIdBlock: number; // 1 byte unsigned integer
}

export interface ScheduleV2CommandScheduleReportData {
	scheduleId: number; // 1 byte unsigned integer
	scheduleIdBlock: number; // 1 byte unsigned integer
	startYear: number; // 1 byte unsigned integer
	activeId: number; // properties1[7..4]
	startMonth: number; // properties1[3..0]
	startDayOfMonth: number; // properties2[4..0]
	startWeekday: number; // properties3[6..0]
	durationType: number; // properties4[7..5]
	startHour: number; // properties4[4..0]
	startMinute: number; // properties5[5..0]
	duration: number; // 2 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	vg1: Array<{ // variable length
		cmd: Buffer; // variable length
	}>;
}

export interface ScheduleV2ScheduleRemoveData {
	scheduleId: number; // 1 byte unsigned integer
	scheduleIdBlock: number; // 1 byte unsigned integer
}

export interface ScheduleV2ScheduleStateSetData {
	scheduleId: number; // 1 byte unsigned integer
	scheduleState: number; // 1 byte unsigned integer
	scheduleIdBlock: number; // 1 byte unsigned integer
}

export interface ScheduleV2ScheduleStateGetData {
	scheduleIdBlock: number; // 1 byte unsigned integer
}

export interface ScheduleV2ScheduleStateReportData {
	numberOfSupportedScheduleId: number; // 1 byte unsigned integer
	reportsToFollow: number; // properties1[7..1]
	override: boolean; // properties1[0]
	vg1: Array<{ // automatic length
		activeId2: number; // properties2[7..4]
		activeId1: number; // properties2[3..0]
	}>;
	scheduleIdBlock: number; // 1 byte unsigned integer
}

export class ScheduleV2 extends CommandClassPacket<ScheduleV2Commands> {
	public static readonly commandClass = CommandClasses.Schedule; // 0x53 (83)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ScheduleV2, commandAndPayload);
	}

	public static readonly ScheduleSupportedGet = class ScheduleSupportedGet extends CommandPacket<ScheduleV2ScheduleSupportedGetData> {
		public static readonly CommandClass = ScheduleV2;
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
			return packet.tryAs(ScheduleV2)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV2ScheduleSupportedGetData) {
			super(ScheduleSupportedGet, data);
		}
	};

	public static readonly ScheduleSupportedReport = class ScheduleSupportedReport extends CommandPacket<ScheduleV2ScheduleSupportedReportData> {
		public static readonly CommandClass = ScheduleV2;
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
			return packet.tryAs(ScheduleV2)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV2ScheduleSupportedReportData) {
			super(ScheduleSupportedReport, data);
		}
	};

	public static readonly CommandScheduleSet = class CommandScheduleSet extends CommandPacket<ScheduleV2CommandScheduleSetData> {
		public static readonly CommandClass = ScheduleV2;
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
							"name": "reserved0",
							"mask": 240,
							"shift": 4,
							"reserved": true
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
							"fieldType": "Integer",
							"name": "reserved1",
							"mask": 224,
							"shift": 5,
							"reserved": true
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
							"fieldType": "Integer",
							"name": "reserved3",
							"mask": 192,
							"shift": 6,
							"reserved": true
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
			return packet.tryAs(ScheduleV2)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV2CommandScheduleSetData) {
			super(CommandScheduleSet, data);
		}
	};

	public static readonly CommandScheduleGet = class CommandScheduleGet extends CommandPacket<ScheduleV2CommandScheduleGetData> {
		public static readonly CommandClass = ScheduleV2;
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
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleV2)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV2CommandScheduleGetData) {
			super(CommandScheduleGet, data);
		}
	};

	public static readonly CommandScheduleReport = class CommandScheduleReport extends CommandPacket<ScheduleV2CommandScheduleReportData> {
		public static readonly CommandClass = ScheduleV2;
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
							"name": "activeId",
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
							"fieldType": "Enum",
							"name": "reserved0",
							"mask": 224,
							"shift": 5,
							"reserved": true,
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
							"fieldType": "Integer",
							"name": "reserved2",
							"mask": 192,
							"shift": 6,
							"reserved": true
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
			return packet.tryAs(ScheduleV2)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV2CommandScheduleReportData) {
			super(CommandScheduleReport, data);
		}
	};

	public static readonly ScheduleRemove = class ScheduleRemove extends CommandPacket<ScheduleV2ScheduleRemoveData> {
		public static readonly CommandClass = ScheduleV2;
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
			return packet.tryAs(ScheduleV2)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV2ScheduleRemoveData) {
			super(ScheduleRemove, data);
		}
	};

	public static readonly ScheduleStateSet = class ScheduleStateSet extends CommandPacket<ScheduleV2ScheduleStateSetData> {
		public static readonly CommandClass = ScheduleV2;
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
			return packet.tryAs(ScheduleV2)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV2ScheduleStateSetData) {
			super(ScheduleStateSet, data);
		}
	};

	public static readonly ScheduleStateGet = class ScheduleStateGet extends CommandPacket<ScheduleV2ScheduleStateGetData> {
		public static readonly CommandClass = ScheduleV2;
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
			return packet.tryAs(ScheduleV2)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV2ScheduleStateGetData) {
			super(ScheduleStateGet, data);
		}
	};

	public static readonly ScheduleStateReport = class ScheduleStateReport extends CommandPacket<ScheduleV2ScheduleStateReportData> {
		public static readonly CommandClass = ScheduleV2;
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
			return packet.tryAs(ScheduleV2)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV2ScheduleStateReportData) {
			super(ScheduleStateReport, data);
		}
	};
}

export namespace ScheduleV2 {
	export type ScheduleSupportedGet = InstanceType<typeof ScheduleV2.ScheduleSupportedGet>;
	export type ScheduleSupportedReport = InstanceType<typeof ScheduleV2.ScheduleSupportedReport>;
	export type CommandScheduleSet = InstanceType<typeof ScheduleV2.CommandScheduleSet>;
	export type CommandScheduleGet = InstanceType<typeof ScheduleV2.CommandScheduleGet>;
	export type CommandScheduleReport = InstanceType<typeof ScheduleV2.CommandScheduleReport>;
	export type ScheduleRemove = InstanceType<typeof ScheduleV2.ScheduleRemove>;
	export type ScheduleStateSet = InstanceType<typeof ScheduleV2.ScheduleStateSet>;
	export type ScheduleStateGet = InstanceType<typeof ScheduleV2.ScheduleStateGet>;
	export type ScheduleStateReport = InstanceType<typeof ScheduleV2.ScheduleStateReport>;
}
