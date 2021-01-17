/**
 * Command Class Schedule Entry Lock, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum ScheduleEntryLockV1Commands {
	ScheduleEntryLockEnableAllSet = 0x02,
	ScheduleEntryLockEnableSet = 0x01,
	ScheduleEntryLockWeekDayGet = 0x04,
	ScheduleEntryLockWeekDayReport = 0x05,
	ScheduleEntryLockWeekDaySet = 0x03,
	ScheduleEntryLockYearDayGet = 0x07,
	ScheduleEntryLockYearDayReport = 0x08,
	ScheduleEntryLockYearDaySet = 0x06,
	ScheduleEntryTypeSupportedGet = 0x09,
	ScheduleEntryTypeSupportedReport = 0x0a,
}

export interface ScheduleEntryLockV1ScheduleEntryLockEnableAllSetData {
	enabled: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockV1ScheduleEntryLockEnableSetData {
	userIdentifier: number; // 1 byte unsigned integer
	enabled: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockV1ScheduleEntryLockWeekDayGetData {
	userIdentifier: number; // 1 byte unsigned integer
	scheduleSlotId: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockV1ScheduleEntryLockWeekDayReportData {
	userIdentifier: number; // 1 byte unsigned integer
	scheduleSlotId: number; // 1 byte unsigned integer
	dayOfWeek: number; // 1 byte unsigned integer
	startHour: number; // 1 byte unsigned integer
	startMinute: number; // 1 byte unsigned integer
	stopHour: number; // 1 byte unsigned integer
	stopMinute: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockV1ScheduleEntryLockWeekDaySetData {
	setAction: number; // 1 byte unsigned integer
	userIdentifier: number; // 1 byte unsigned integer
	scheduleSlotId: number; // 1 byte unsigned integer
	dayOfWeek: number; // 1 byte unsigned integer
	startHour: number; // 1 byte unsigned integer
	startMinute: number; // 1 byte unsigned integer
	stopHour: number; // 1 byte unsigned integer
	stopMinute: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockV1ScheduleEntryLockYearDayGetData {
	userIdentifier: number; // 1 byte unsigned integer
	scheduleSlotId: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockV1ScheduleEntryLockYearDayReportData {
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

export interface ScheduleEntryLockV1ScheduleEntryLockYearDaySetData {
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

export interface ScheduleEntryLockV1ScheduleEntryTypeSupportedReportData {
	numberOfSlotsWeekDay: number; // 1 byte unsigned integer
	numberOfSlotsYearDay: number; // 1 byte unsigned integer
}

// Deprecated
export class ScheduleEntryLockV1 extends CommandClassPacket<ScheduleEntryLockV1Commands> {
	public static readonly commandClass = CommandClasses.ScheduleEntryLock; // 0x4e (78)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ScheduleEntryLockV1, commandAndPayload);
	}

	public static readonly ScheduleEntryLockEnableAllSet = class ScheduleEntryLockEnableAllSet extends CommandPacket<ScheduleEntryLockV1ScheduleEntryLockEnableAllSetData> {
		public static readonly CommandClass = ScheduleEntryLockV1;
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
			return packet.tryAs(ScheduleEntryLockV1)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleEntryLockV1ScheduleEntryLockEnableAllSetData) {
			super(ScheduleEntryLockEnableAllSet, data);
		}
	};

	public static readonly ScheduleEntryLockEnableSet = class ScheduleEntryLockEnableSet extends CommandPacket<ScheduleEntryLockV1ScheduleEntryLockEnableSetData> {
		public static readonly CommandClass = ScheduleEntryLockV1;
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
			return packet.tryAs(ScheduleEntryLockV1)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleEntryLockV1ScheduleEntryLockEnableSetData) {
			super(ScheduleEntryLockEnableSet, data);
		}
	};

	public static readonly ScheduleEntryLockWeekDayGet = class ScheduleEntryLockWeekDayGet extends CommandPacket<ScheduleEntryLockV1ScheduleEntryLockWeekDayGetData> {
		public static readonly CommandClass = ScheduleEntryLockV1;
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
			return packet.tryAs(ScheduleEntryLockV1)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleEntryLockV1ScheduleEntryLockWeekDayGetData) {
			super(ScheduleEntryLockWeekDayGet, data);
		}
	};

	public static readonly ScheduleEntryLockWeekDayReport = class ScheduleEntryLockWeekDayReport extends CommandPacket<ScheduleEntryLockV1ScheduleEntryLockWeekDayReportData> {
		public static readonly CommandClass = ScheduleEntryLockV1;
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
			return packet.tryAs(ScheduleEntryLockV1)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleEntryLockV1ScheduleEntryLockWeekDayReportData) {
			super(ScheduleEntryLockWeekDayReport, data);
		}
	};

	public static readonly ScheduleEntryLockWeekDaySet = class ScheduleEntryLockWeekDaySet extends CommandPacket<ScheduleEntryLockV1ScheduleEntryLockWeekDaySetData> {
		public static readonly CommandClass = ScheduleEntryLockV1;
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
			return packet.tryAs(ScheduleEntryLockV1)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleEntryLockV1ScheduleEntryLockWeekDaySetData) {
			super(ScheduleEntryLockWeekDaySet, data);
		}
	};

	public static readonly ScheduleEntryLockYearDayGet = class ScheduleEntryLockYearDayGet extends CommandPacket<ScheduleEntryLockV1ScheduleEntryLockYearDayGetData> {
		public static readonly CommandClass = ScheduleEntryLockV1;
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
			return packet.tryAs(ScheduleEntryLockV1)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleEntryLockV1ScheduleEntryLockYearDayGetData) {
			super(ScheduleEntryLockYearDayGet, data);
		}
	};

	public static readonly ScheduleEntryLockYearDayReport = class ScheduleEntryLockYearDayReport extends CommandPacket<ScheduleEntryLockV1ScheduleEntryLockYearDayReportData> {
		public static readonly CommandClass = ScheduleEntryLockV1;
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
			return packet.tryAs(ScheduleEntryLockV1)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleEntryLockV1ScheduleEntryLockYearDayReportData) {
			super(ScheduleEntryLockYearDayReport, data);
		}
	};

	public static readonly ScheduleEntryLockYearDaySet = class ScheduleEntryLockYearDaySet extends CommandPacket<ScheduleEntryLockV1ScheduleEntryLockYearDaySetData> {
		public static readonly CommandClass = ScheduleEntryLockV1;
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
			return packet.tryAs(ScheduleEntryLockV1)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleEntryLockV1ScheduleEntryLockYearDaySetData) {
			super(ScheduleEntryLockYearDaySet, data);
		}
	};

	public static readonly ScheduleEntryTypeSupportedGet = class ScheduleEntryTypeSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = ScheduleEntryLockV1;
		public static readonly command = 0x09;
		public static readonly definition = convertFromJsonCommand({
			"command": 9,
			"name": "ScheduleEntryTypeSupportedGet",
			"help": "Schedule Entry Type Supported Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleEntryLockV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ScheduleEntryTypeSupportedGet, data);
		}
	};

	public static readonly ScheduleEntryTypeSupportedReport = class ScheduleEntryTypeSupportedReport extends CommandPacket<ScheduleEntryLockV1ScheduleEntryTypeSupportedReportData> {
		public static readonly CommandClass = ScheduleEntryLockV1;
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
			return packet.tryAs(ScheduleEntryLockV1)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleEntryLockV1ScheduleEntryTypeSupportedReportData) {
			super(ScheduleEntryTypeSupportedReport, data);
		}
	};
}

export namespace ScheduleEntryLockV1 {
	export type ScheduleEntryLockEnableAllSet = InstanceType<typeof ScheduleEntryLockV1.ScheduleEntryLockEnableAllSet>;
	export type ScheduleEntryLockEnableSet = InstanceType<typeof ScheduleEntryLockV1.ScheduleEntryLockEnableSet>;
	export type ScheduleEntryLockWeekDayGet = InstanceType<typeof ScheduleEntryLockV1.ScheduleEntryLockWeekDayGet>;
	export type ScheduleEntryLockWeekDayReport = InstanceType<typeof ScheduleEntryLockV1.ScheduleEntryLockWeekDayReport>;
	export type ScheduleEntryLockWeekDaySet = InstanceType<typeof ScheduleEntryLockV1.ScheduleEntryLockWeekDaySet>;
	export type ScheduleEntryLockYearDayGet = InstanceType<typeof ScheduleEntryLockV1.ScheduleEntryLockYearDayGet>;
	export type ScheduleEntryLockYearDayReport = InstanceType<typeof ScheduleEntryLockV1.ScheduleEntryLockYearDayReport>;
	export type ScheduleEntryLockYearDaySet = InstanceType<typeof ScheduleEntryLockV1.ScheduleEntryLockYearDaySet>;
	export type ScheduleEntryTypeSupportedGet = InstanceType<typeof ScheduleEntryLockV1.ScheduleEntryTypeSupportedGet>;
	export type ScheduleEntryTypeSupportedReport = InstanceType<typeof ScheduleEntryLockV1.ScheduleEntryTypeSupportedReport>;
}
