/**
 * Command Class Schedule Entry Lock, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum ScheduleEntryLockV2Commands {
	ScheduleEntryLockEnableAllSet = 0x02,
	ScheduleEntryLockEnableSet = 0x01,
	ScheduleEntryLockTimeOffsetGet = 0x0b,
	ScheduleEntryLockTimeOffsetReport = 0x0c,
	ScheduleEntryLockTimeOffsetSet = 0x0d,
	ScheduleEntryLockWeekDayGet = 0x04,
	ScheduleEntryLockWeekDayReport = 0x05,
	ScheduleEntryLockWeekDaySet = 0x03,
	ScheduleEntryLockYearDayGet = 0x07,
	ScheduleEntryLockYearDayReport = 0x08,
	ScheduleEntryLockYearDaySet = 0x06,
	ScheduleEntryTypeSupportedGet = 0x09,
	ScheduleEntryTypeSupportedReport = 0x0a,
}

export interface ScheduleEntryLockV2ScheduleEntryLockEnableAllSetData {
	enabled: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockV2ScheduleEntryLockEnableSetData {
	userIdentifier: number; // 1 byte unsigned integer
	enabled: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockV2ScheduleEntryLockTimeOffsetReportData {
	signTzo: boolean; // level[7]
	hourTzo: number; // level[6..0]
	minuteTzo: number; // 1 byte unsigned integer
	signOffsetDst: boolean; // level2[7]
	minuteOffsetDst: number; // level2[6..0]
}

export interface ScheduleEntryLockV2ScheduleEntryLockTimeOffsetSetData {
	signTzo: boolean; // level[7]
	hourTzo: number; // level[6..0]
	minuteTzo: number; // 1 byte unsigned integer
	signOffsetDst: boolean; // level2[7]
	minuteOffsetDst: number; // level2[6..0]
}

export interface ScheduleEntryLockV2ScheduleEntryLockWeekDayGetData {
	userIdentifier: number; // 1 byte unsigned integer
	scheduleSlotId: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockV2ScheduleEntryLockWeekDayReportData {
	userIdentifier: number; // 1 byte unsigned integer
	scheduleSlotId: number; // 1 byte unsigned integer
	dayOfWeek: number; // 1 byte unsigned integer
	startHour: number; // 1 byte unsigned integer
	startMinute: number; // 1 byte unsigned integer
	stopHour: number; // 1 byte unsigned integer
	stopMinute: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockV2ScheduleEntryLockWeekDaySetData {
	setAction: number; // 1 byte unsigned integer
	userIdentifier: number; // 1 byte unsigned integer
	scheduleSlotId: number; // 1 byte unsigned integer
	dayOfWeek: number; // 1 byte unsigned integer
	startHour: number; // 1 byte unsigned integer
	startMinute: number; // 1 byte unsigned integer
	stopHour: number; // 1 byte unsigned integer
	stopMinute: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockV2ScheduleEntryLockYearDayGetData {
	userIdentifier: number; // 1 byte unsigned integer
	scheduleSlotId: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockV2ScheduleEntryLockYearDayReportData {
	userIdentifier: number; // 1 byte unsigned integer
	scheduleSlotId: number; // 1 byte unsigned integer
	startYear: number; // 1 byte unsigned integer
	startMonth: number; // 1 byte unsigned integer
	startDay: number; // 1 byte unsigned integer
	startHour: number; // 1 byte unsigned integer
	startMinute: number; // 1 byte unsigned integer
	stopYear: number; // 1 byte unsigned integer
	stopMonth: number; // 1 byte unsigned integer
	stopDay: number; // 1 byte unsigned integer
	stopHour: number; // 1 byte unsigned integer
	stopMinute: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockV2ScheduleEntryLockYearDaySetData {
	setAction: number; // 1 byte unsigned integer
	userIdentifier: number; // 1 byte unsigned integer
	scheduleSlotId: number; // 1 byte unsigned integer
	startYear: number; // 1 byte unsigned integer
	startMonth: number; // 1 byte unsigned integer
	startDay: number; // 1 byte unsigned integer
	startHour: number; // 1 byte unsigned integer
	startMinute: number; // 1 byte unsigned integer
	stopYear: number; // 1 byte unsigned integer
	stopMonth: number; // 1 byte unsigned integer
	stopDay: number; // 1 byte unsigned integer
	stopHour: number; // 1 byte unsigned integer
	stopMinute: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockV2ScheduleEntryTypeSupportedReportData {
	numberOfSlotsWeekDay: number; // 1 byte unsigned integer
	numberOfSlotsYearDay: number; // 1 byte unsigned integer
}

// Deprecated
export class ScheduleEntryLockV2 extends CommandClassPacket<ScheduleEntryLockV2Commands> {
	public static readonly commandClass = CommandClasses.ScheduleEntryLock; // 0x4e (78)
	public static readonly version = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ScheduleEntryLockV2, commandAndPayload);
	}

	public static readonly ScheduleEntryLockEnableAllSet = class ScheduleEntryLockEnableAllSet extends CommandPacket<ScheduleEntryLockV2ScheduleEntryLockEnableAllSetData> {
		public static readonly CommandClass = ScheduleEntryLockV2;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "ScheduleEntryLockEnableAllSet",
			"help": "Schedule Entry Lock Enable All Set",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "enabled",
					"help": "Enabled",
					"length": 1,
					"values": {
						"0": {
							"name": "Disabled",
							"help": "disabled"
						},
						"1": {
							"name": "Enabled",
							"help": "enabled"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleEntryLockV2)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleEntryLockV2ScheduleEntryLockEnableAllSetData) {
			super(ScheduleEntryLockEnableAllSet, data);
		}
	};

	public static readonly ScheduleEntryLockEnableSet = class ScheduleEntryLockEnableSet extends CommandPacket<ScheduleEntryLockV2ScheduleEntryLockEnableSetData> {
		public static readonly CommandClass = ScheduleEntryLockV2;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "ScheduleEntryLockEnableSet",
			"help": "Schedule Entry Lock Enable Set",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "userIdentifier",
					"help": "User Identifier",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "enabled",
					"help": "Enabled",
					"length": 1,
					"values": {
						"0": {
							"name": "Disabled",
							"help": "disabled"
						},
						"1": {
							"name": "Enabled",
							"help": "enabled"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleEntryLockV2)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleEntryLockV2ScheduleEntryLockEnableSetData) {
			super(ScheduleEntryLockEnableSet, data);
		}
	};

	public static readonly ScheduleEntryLockTimeOffsetGet = class ScheduleEntryLockTimeOffsetGet extends CommandPacket<void> {
		public static readonly CommandClass = ScheduleEntryLockV2;
		public static readonly command = 0x0b;
		public static readonly definition = convertFromJsonCommand({
			"command": 11,
			"name": "ScheduleEntryLockTimeOffsetGet",
			"help": "Schedule Entry Lock Time Offset Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleEntryLockV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ScheduleEntryLockTimeOffsetGet, data);
		}
	};

	public static readonly ScheduleEntryLockTimeOffsetReport = class ScheduleEntryLockTimeOffsetReport extends CommandPacket<ScheduleEntryLockV2ScheduleEntryLockTimeOffsetReportData> {
		public static readonly CommandClass = ScheduleEntryLockV2;
		public static readonly command = 0x0c;
		public static readonly definition = convertFromJsonCommand({
			"command": 12,
			"name": "ScheduleEntryLockTimeOffsetReport",
			"help": "Schedule Entry Lock Time Offset Report",
			"status": "Active",
			"params": [
				{
					"type": "Bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"fieldType": "Boolean",
							"name": "signTzo",
							"mask": 128,
							"shift": 7
						},
						{
							"fieldType": "Integer",
							"name": "hourTzo",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "Integer",
					"name": "minuteTzo",
					"help": "Minute TZO",
					"length": 1
				},
				{
					"type": "Bitfield",
					"name": "level2",
					"help": "Level2",
					"length": 1,
					"fields": [
						{
							"fieldType": "Boolean",
							"name": "signOffsetDst",
							"mask": 128,
							"shift": 7
						},
						{
							"fieldType": "Integer",
							"name": "minuteOffsetDst",
							"mask": 127,
							"shift": 0
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleEntryLockV2)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleEntryLockV2ScheduleEntryLockTimeOffsetReportData) {
			super(ScheduleEntryLockTimeOffsetReport, data);
		}
	};

	public static readonly ScheduleEntryLockTimeOffsetSet = class ScheduleEntryLockTimeOffsetSet extends CommandPacket<ScheduleEntryLockV2ScheduleEntryLockTimeOffsetSetData> {
		public static readonly CommandClass = ScheduleEntryLockV2;
		public static readonly command = 0x0d;
		public static readonly definition = convertFromJsonCommand({
			"command": 13,
			"name": "ScheduleEntryLockTimeOffsetSet",
			"help": "Schedule Entry Lock Time Offset Set",
			"status": "Active",
			"params": [
				{
					"type": "Bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"fieldType": "Boolean",
							"name": "signTzo",
							"mask": 128,
							"shift": 7
						},
						{
							"fieldType": "Integer",
							"name": "hourTzo",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "Integer",
					"name": "minuteTzo",
					"help": "Minute TZO",
					"length": 1
				},
				{
					"type": "Bitfield",
					"name": "level2",
					"help": "Level2",
					"length": 1,
					"fields": [
						{
							"fieldType": "Boolean",
							"name": "signOffsetDst",
							"mask": 128,
							"shift": 7
						},
						{
							"fieldType": "Integer",
							"name": "minuteOffsetDst",
							"mask": 127,
							"shift": 0
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleEntryLockV2)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleEntryLockV2ScheduleEntryLockTimeOffsetSetData) {
			super(ScheduleEntryLockTimeOffsetSet, data);
		}
	};

	public static readonly ScheduleEntryLockWeekDayGet = class ScheduleEntryLockWeekDayGet extends CommandPacket<ScheduleEntryLockV2ScheduleEntryLockWeekDayGetData> {
		public static readonly CommandClass = ScheduleEntryLockV2;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "ScheduleEntryLockWeekDayGet",
			"help": "Schedule Entry Lock Week Day Get",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "userIdentifier",
					"help": "User Identifier",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "scheduleSlotId",
					"help": "Schedule Slot ID",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleEntryLockV2)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleEntryLockV2ScheduleEntryLockWeekDayGetData) {
			super(ScheduleEntryLockWeekDayGet, data);
		}
	};

	public static readonly ScheduleEntryLockWeekDayReport = class ScheduleEntryLockWeekDayReport extends CommandPacket<ScheduleEntryLockV2ScheduleEntryLockWeekDayReportData> {
		public static readonly CommandClass = ScheduleEntryLockV2;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "ScheduleEntryLockWeekDayReport",
			"help": "Schedule Entry Lock Week Day Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "userIdentifier",
					"help": "User Identifier",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "scheduleSlotId",
					"help": "Schedule Slot ID",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "dayOfWeek",
					"help": "Day of Week",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "startHour",
					"help": "Start Hour",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "startMinute",
					"help": "Start Minute",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "stopHour",
					"help": "Stop Hour",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "stopMinute",
					"help": "Stop Minute",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleEntryLockV2)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleEntryLockV2ScheduleEntryLockWeekDayReportData) {
			super(ScheduleEntryLockWeekDayReport, data);
		}
	};

	public static readonly ScheduleEntryLockWeekDaySet = class ScheduleEntryLockWeekDaySet extends CommandPacket<ScheduleEntryLockV2ScheduleEntryLockWeekDaySetData> {
		public static readonly CommandClass = ScheduleEntryLockV2;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "ScheduleEntryLockWeekDaySet",
			"help": "Schedule Entry Lock Week Day Set",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "setAction",
					"help": "Set Action",
					"length": 1,
					"values": {
						"0": {
							"name": "Erase",
							"help": "Erase"
						},
						"1": {
							"name": "Modify",
							"help": "Modify"
						}
					}
				},
				{
					"type": "Integer",
					"name": "userIdentifier",
					"help": "User Identifier",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "scheduleSlotId",
					"help": "Schedule Slot ID",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "dayOfWeek",
					"help": "Day of Week",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "startHour",
					"help": "Start Hour",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "startMinute",
					"help": "Start Minute",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "stopHour",
					"help": "Stop Hour",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "stopMinute",
					"help": "Stop Minute",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleEntryLockV2)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleEntryLockV2ScheduleEntryLockWeekDaySetData) {
			super(ScheduleEntryLockWeekDaySet, data);
		}
	};

	public static readonly ScheduleEntryLockYearDayGet = class ScheduleEntryLockYearDayGet extends CommandPacket<ScheduleEntryLockV2ScheduleEntryLockYearDayGetData> {
		public static readonly CommandClass = ScheduleEntryLockV2;
		public static readonly command = 0x07;
		public static readonly definition = convertFromJsonCommand({
			"command": 7,
			"name": "ScheduleEntryLockYearDayGet",
			"help": "Schedule Entry Lock Year Day Get",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "userIdentifier",
					"help": "User Identifier",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "scheduleSlotId",
					"help": "Schedule Slot ID",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleEntryLockV2)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleEntryLockV2ScheduleEntryLockYearDayGetData) {
			super(ScheduleEntryLockYearDayGet, data);
		}
	};

	public static readonly ScheduleEntryLockYearDayReport = class ScheduleEntryLockYearDayReport extends CommandPacket<ScheduleEntryLockV2ScheduleEntryLockYearDayReportData> {
		public static readonly CommandClass = ScheduleEntryLockV2;
		public static readonly command = 0x08;
		public static readonly definition = convertFromJsonCommand({
			"command": 8,
			"name": "ScheduleEntryLockYearDayReport",
			"help": "Schedule Entry Lock Year Day Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "userIdentifier",
					"help": "User Identifier",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "scheduleSlotId",
					"help": "Schedule Slot ID",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "startYear",
					"help": "Start Year",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "startMonth",
					"help": "Start Month",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "startDay",
					"help": "Start Day",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "startHour",
					"help": "Start Hour",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "startMinute",
					"help": "Start Minute",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "stopYear",
					"help": "Stop Year",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "stopMonth",
					"help": "Stop Month",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "stopDay",
					"help": "Stop Day",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "stopHour",
					"help": "Stop Hour",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "stopMinute",
					"help": "Stop Minute",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleEntryLockV2)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleEntryLockV2ScheduleEntryLockYearDayReportData) {
			super(ScheduleEntryLockYearDayReport, data);
		}
	};

	public static readonly ScheduleEntryLockYearDaySet = class ScheduleEntryLockYearDaySet extends CommandPacket<ScheduleEntryLockV2ScheduleEntryLockYearDaySetData> {
		public static readonly CommandClass = ScheduleEntryLockV2;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "ScheduleEntryLockYearDaySet",
			"help": "Schedule Entry Lock Year Day Set",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "setAction",
					"help": "Set Action",
					"length": 1,
					"values": {
						"0": {
							"name": "Erase",
							"help": "Erase"
						},
						"1": {
							"name": "Modify",
							"help": "Modify"
						}
					}
				},
				{
					"type": "Integer",
					"name": "userIdentifier",
					"help": "User Identifier",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "scheduleSlotId",
					"help": "Schedule Slot ID",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "startYear",
					"help": "Start Year",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "startMonth",
					"help": "Start Month",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "startDay",
					"help": "Start Day",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "startHour",
					"help": "Start Hour",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "startMinute",
					"help": "Start Minute",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "stopYear",
					"help": "Stop Year",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "stopMonth",
					"help": "Stop Month",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "stopDay",
					"help": "Stop Day",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "stopHour",
					"help": "Stop Hour",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "stopMinute",
					"help": "Stop Minute",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleEntryLockV2)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleEntryLockV2ScheduleEntryLockYearDaySetData) {
			super(ScheduleEntryLockYearDaySet, data);
		}
	};

	public static readonly ScheduleEntryTypeSupportedGet = class ScheduleEntryTypeSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = ScheduleEntryLockV2;
		public static readonly command = 0x09;
		public static readonly definition = convertFromJsonCommand({
			"command": 9,
			"name": "ScheduleEntryTypeSupportedGet",
			"help": "Schedule Entry Type Supported Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleEntryLockV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ScheduleEntryTypeSupportedGet, data);
		}
	};

	public static readonly ScheduleEntryTypeSupportedReport = class ScheduleEntryTypeSupportedReport extends CommandPacket<ScheduleEntryLockV2ScheduleEntryTypeSupportedReportData> {
		public static readonly CommandClass = ScheduleEntryLockV2;
		public static readonly command = 0x0a;
		public static readonly definition = convertFromJsonCommand({
			"command": 10,
			"name": "ScheduleEntryTypeSupportedReport",
			"help": "Schedule Entry Type Supported Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "numberOfSlotsWeekDay",
					"help": "Number of Slots Week Day",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "numberOfSlotsYearDay",
					"help": "Number of Slots Year Day",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleEntryLockV2)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleEntryLockV2ScheduleEntryTypeSupportedReportData) {
			super(ScheduleEntryTypeSupportedReport, data);
		}
	};
}

export namespace ScheduleEntryLockV2 {
	export type ScheduleEntryLockEnableAllSet = InstanceType<typeof ScheduleEntryLockV2.ScheduleEntryLockEnableAllSet>;
	export type ScheduleEntryLockEnableSet = InstanceType<typeof ScheduleEntryLockV2.ScheduleEntryLockEnableSet>;
	export type ScheduleEntryLockTimeOffsetGet = InstanceType<typeof ScheduleEntryLockV2.ScheduleEntryLockTimeOffsetGet>;
	export type ScheduleEntryLockTimeOffsetReport = InstanceType<typeof ScheduleEntryLockV2.ScheduleEntryLockTimeOffsetReport>;
	export type ScheduleEntryLockTimeOffsetSet = InstanceType<typeof ScheduleEntryLockV2.ScheduleEntryLockTimeOffsetSet>;
	export type ScheduleEntryLockWeekDayGet = InstanceType<typeof ScheduleEntryLockV2.ScheduleEntryLockWeekDayGet>;
	export type ScheduleEntryLockWeekDayReport = InstanceType<typeof ScheduleEntryLockV2.ScheduleEntryLockWeekDayReport>;
	export type ScheduleEntryLockWeekDaySet = InstanceType<typeof ScheduleEntryLockV2.ScheduleEntryLockWeekDaySet>;
	export type ScheduleEntryLockYearDayGet = InstanceType<typeof ScheduleEntryLockV2.ScheduleEntryLockYearDayGet>;
	export type ScheduleEntryLockYearDayReport = InstanceType<typeof ScheduleEntryLockV2.ScheduleEntryLockYearDayReport>;
	export type ScheduleEntryLockYearDaySet = InstanceType<typeof ScheduleEntryLockV2.ScheduleEntryLockYearDaySet>;
	export type ScheduleEntryTypeSupportedGet = InstanceType<typeof ScheduleEntryLockV2.ScheduleEntryTypeSupportedGet>;
	export type ScheduleEntryTypeSupportedReport = InstanceType<typeof ScheduleEntryLockV2.ScheduleEntryTypeSupportedReport>;
}
