/**
 * Command Class Schedule Entry Lock, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum ScheduleEntryLockV3Commands {
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
	ScheduleEntryLockDailyRepeatingGet = 0x0e,
	ScheduleEntryLockDailyRepeatingReport = 0x0f,
	ScheduleEntryLockDailyRepeatingSet = 0x10,
}

export interface ScheduleEntryLockV3ScheduleEntryLockEnableAllSetData {
	enabled: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockV3ScheduleEntryLockEnableSetData {
	userIdentifier: number; // 1 byte unsigned integer
	enabled: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockV3ScheduleEntryLockTimeOffsetReportData {
	signTzo: boolean; // level[7]
	hourTzo: number; // level[6..0]
	minuteTzo: number; // 1 byte unsigned integer
	signOffsetDst: boolean; // level2[7]
	minuteOffsetDst: number; // level2[6..0]
}

export interface ScheduleEntryLockV3ScheduleEntryLockTimeOffsetSetData {
	signTzo: boolean; // level[7]
	hourTzo: number; // level[6..0]
	minuteTzo: number; // 1 byte unsigned integer
	signOffsetDst: boolean; // level2[7]
	minuteOffsetDst: number; // level2[6..0]
}

export interface ScheduleEntryLockV3ScheduleEntryLockWeekDayGetData {
	userIdentifier: number; // 1 byte unsigned integer
	scheduleSlotId: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockV3ScheduleEntryLockWeekDayReportData {
	userIdentifier: number; // 1 byte unsigned integer
	scheduleSlotId: number; // 1 byte unsigned integer
	dayOfWeek: number; // 1 byte unsigned integer
	startHour: number; // 1 byte unsigned integer
	startMinute: number; // 1 byte unsigned integer
	stopHour: number; // 1 byte unsigned integer
	stopMinute: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockV3ScheduleEntryLockWeekDaySetData {
	setAction: number; // 1 byte unsigned integer
	userIdentifier: number; // 1 byte unsigned integer
	scheduleSlotId: number; // 1 byte unsigned integer
	dayOfWeek: number; // 1 byte unsigned integer
	startHour: number; // 1 byte unsigned integer
	startMinute: number; // 1 byte unsigned integer
	stopHour: number; // 1 byte unsigned integer
	stopMinute: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockV3ScheduleEntryLockYearDayGetData {
	userIdentifier: number; // 1 byte unsigned integer
	scheduleSlotId: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockV3ScheduleEntryLockYearDayReportData {
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

export interface ScheduleEntryLockV3ScheduleEntryLockYearDaySetData {
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

export interface ScheduleEntryLockV3ScheduleEntryTypeSupportedReportData {
	numberOfSlotsWeekDay: number; // 1 byte unsigned integer
	numberOfSlotsYearDay: number; // 1 byte unsigned integer
	numberOfSlotsDailyRepeating: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockV3ScheduleEntryLockDailyRepeatingGetData {
	userIdentifier: number; // 1 byte unsigned integer
	scheduleSlotId: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockV3ScheduleEntryLockDailyRepeatingReportData {
	userIdentifier: number; // 1 byte unsigned integer
	scheduleSlotId: number; // 1 byte unsigned integer
	weekDayBitmask: number; // 1 byte unsigned integer
	startHour: number; // 1 byte unsigned integer
	startMinute: number; // 1 byte unsigned integer
	durationHour: number; // 1 byte unsigned integer
	durationMinute: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockV3ScheduleEntryLockDailyRepeatingSetData {
	setAction: number; // 1 byte unsigned integer
	userIdentifier: number; // 1 byte unsigned integer
	scheduleSlotId: number; // 1 byte unsigned integer
	weekDayBitmask: number; // 1 byte unsigned integer
	startHour: number; // 1 byte unsigned integer
	startMinute: number; // 1 byte unsigned integer
	durationHour: number; // 1 byte unsigned integer
	durationMinute: number; // 1 byte unsigned integer
}

// Deprecated
export class ScheduleEntryLockV3 extends CommandClassPacket<ScheduleEntryLockV3Commands> {
	public static readonly commandClass = CommandClasses.ScheduleEntryLock; // 0x4e (78)
	public static readonly version = 3;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ScheduleEntryLockV3, commandAndPayload);
	}
}

export class ScheduleEntryLockEnableAllSet extends CommandPacket<ScheduleEntryLockV3ScheduleEntryLockEnableAllSetData> {
	public static readonly CommandClass = ScheduleEntryLockV3;
	public static readonly command = 0x02; // 2
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleEntryLockV3)?.command === this.command;
	}

	constructor(data: Buffer | ScheduleEntryLockV3ScheduleEntryLockEnableAllSetData) {
		super(ScheduleEntryLockEnableAllSet, data);
	}
};

export class ScheduleEntryLockEnableSet extends CommandPacket<ScheduleEntryLockV3ScheduleEntryLockEnableSetData> {
	public static readonly CommandClass = ScheduleEntryLockV3;
	public static readonly command = 0x01; // 1
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleEntryLockV3)?.command === this.command;
	}

	constructor(data: Buffer | ScheduleEntryLockV3ScheduleEntryLockEnableSetData) {
		super(ScheduleEntryLockEnableSet, data);
	}
};

export class ScheduleEntryLockTimeOffsetGet extends CommandPacket<void> {
	public static readonly CommandClass = ScheduleEntryLockV3;
	public static readonly command = 0x0b; // 11
	public static readonly definition = convertFromJsonCommand({
		"command": 11,
		"name": "ScheduleEntryLockTimeOffsetGet",
		"help": "Schedule Entry Lock Time Offset Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleEntryLockV3)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(ScheduleEntryLockTimeOffsetGet, data);
	}
};

export class ScheduleEntryLockTimeOffsetReport extends CommandPacket<ScheduleEntryLockV3ScheduleEntryLockTimeOffsetReportData> {
	public static readonly CommandClass = ScheduleEntryLockV3;
	public static readonly command = 0x0c; // 12
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleEntryLockV3)?.command === this.command;
	}

	constructor(data: Buffer | ScheduleEntryLockV3ScheduleEntryLockTimeOffsetReportData) {
		super(ScheduleEntryLockTimeOffsetReport, data);
	}
};

export class ScheduleEntryLockTimeOffsetSet extends CommandPacket<ScheduleEntryLockV3ScheduleEntryLockTimeOffsetSetData> {
	public static readonly CommandClass = ScheduleEntryLockV3;
	public static readonly command = 0x0d; // 13
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleEntryLockV3)?.command === this.command;
	}

	constructor(data: Buffer | ScheduleEntryLockV3ScheduleEntryLockTimeOffsetSetData) {
		super(ScheduleEntryLockTimeOffsetSet, data);
	}
};

export class ScheduleEntryLockWeekDayGet extends CommandPacket<ScheduleEntryLockV3ScheduleEntryLockWeekDayGetData> {
	public static readonly CommandClass = ScheduleEntryLockV3;
	public static readonly command = 0x04; // 4
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleEntryLockV3)?.command === this.command;
	}

	constructor(data: Buffer | ScheduleEntryLockV3ScheduleEntryLockWeekDayGetData) {
		super(ScheduleEntryLockWeekDayGet, data);
	}
};

export class ScheduleEntryLockWeekDayReport extends CommandPacket<ScheduleEntryLockV3ScheduleEntryLockWeekDayReportData> {
	public static readonly CommandClass = ScheduleEntryLockV3;
	public static readonly command = 0x05; // 5
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleEntryLockV3)?.command === this.command;
	}

	constructor(data: Buffer | ScheduleEntryLockV3ScheduleEntryLockWeekDayReportData) {
		super(ScheduleEntryLockWeekDayReport, data);
	}
};

export class ScheduleEntryLockWeekDaySet extends CommandPacket<ScheduleEntryLockV3ScheduleEntryLockWeekDaySetData> {
	public static readonly CommandClass = ScheduleEntryLockV3;
	public static readonly command = 0x03; // 3
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleEntryLockV3)?.command === this.command;
	}

	constructor(data: Buffer | ScheduleEntryLockV3ScheduleEntryLockWeekDaySetData) {
		super(ScheduleEntryLockWeekDaySet, data);
	}
};

export class ScheduleEntryLockYearDayGet extends CommandPacket<ScheduleEntryLockV3ScheduleEntryLockYearDayGetData> {
	public static readonly CommandClass = ScheduleEntryLockV3;
	public static readonly command = 0x07; // 7
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleEntryLockV3)?.command === this.command;
	}

	constructor(data: Buffer | ScheduleEntryLockV3ScheduleEntryLockYearDayGetData) {
		super(ScheduleEntryLockYearDayGet, data);
	}
};

export class ScheduleEntryLockYearDayReport extends CommandPacket<ScheduleEntryLockV3ScheduleEntryLockYearDayReportData> {
	public static readonly CommandClass = ScheduleEntryLockV3;
	public static readonly command = 0x08; // 8
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleEntryLockV3)?.command === this.command;
	}

	constructor(data: Buffer | ScheduleEntryLockV3ScheduleEntryLockYearDayReportData) {
		super(ScheduleEntryLockYearDayReport, data);
	}
};

export class ScheduleEntryLockYearDaySet extends CommandPacket<ScheduleEntryLockV3ScheduleEntryLockYearDaySetData> {
	public static readonly CommandClass = ScheduleEntryLockV3;
	public static readonly command = 0x06; // 6
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleEntryLockV3)?.command === this.command;
	}

	constructor(data: Buffer | ScheduleEntryLockV3ScheduleEntryLockYearDaySetData) {
		super(ScheduleEntryLockYearDaySet, data);
	}
};

export class ScheduleEntryTypeSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass = ScheduleEntryLockV3;
	public static readonly command = 0x09; // 9
	public static readonly definition = convertFromJsonCommand({
		"command": 9,
		"name": "ScheduleEntryTypeSupportedGet",
		"help": "Schedule Entry Type Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleEntryLockV3)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(ScheduleEntryTypeSupportedGet, data);
	}
};

export class ScheduleEntryTypeSupportedReport extends CommandPacket<ScheduleEntryLockV3ScheduleEntryTypeSupportedReportData> {
	public static readonly CommandClass = ScheduleEntryLockV3;
	public static readonly command = 0x0a; // 10
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
			},
			{
				"type": "Integer",
				"name": "numberOfSlotsDailyRepeating",
				"help": "Number of Slots Daily Repeating",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleEntryLockV3)?.command === this.command;
	}

	constructor(data: Buffer | ScheduleEntryLockV3ScheduleEntryTypeSupportedReportData) {
		super(ScheduleEntryTypeSupportedReport, data);
	}
};

export class ScheduleEntryLockDailyRepeatingGet extends CommandPacket<ScheduleEntryLockV3ScheduleEntryLockDailyRepeatingGetData> {
	public static readonly CommandClass = ScheduleEntryLockV3;
	public static readonly command = 0x0e; // 14
	public static readonly definition = convertFromJsonCommand({
		"command": 14,
		"name": "ScheduleEntryLockDailyRepeatingGet",
		"help": "Schedule Entry Lock Daily Repeating Get",
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleEntryLockV3)?.command === this.command;
	}

	constructor(data: Buffer | ScheduleEntryLockV3ScheduleEntryLockDailyRepeatingGetData) {
		super(ScheduleEntryLockDailyRepeatingGet, data);
	}
};

export class ScheduleEntryLockDailyRepeatingReport extends CommandPacket<ScheduleEntryLockV3ScheduleEntryLockDailyRepeatingReportData> {
	public static readonly CommandClass = ScheduleEntryLockV3;
	public static readonly command = 0x0f; // 15
	public static readonly definition = convertFromJsonCommand({
		"command": 15,
		"name": "ScheduleEntryLockDailyRepeatingReport",
		"help": "Schedule Entry Lock Daily Repeating Report",
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
				"name": "weekDayBitmask",
				"help": "Week Day Bitmask",
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
				"name": "durationHour",
				"help": "Duration Hour",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "durationMinute",
				"help": "Duration Minute",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleEntryLockV3)?.command === this.command;
	}

	constructor(data: Buffer | ScheduleEntryLockV3ScheduleEntryLockDailyRepeatingReportData) {
		super(ScheduleEntryLockDailyRepeatingReport, data);
	}
};

export class ScheduleEntryLockDailyRepeatingSet extends CommandPacket<ScheduleEntryLockV3ScheduleEntryLockDailyRepeatingSetData> {
	public static readonly CommandClass = ScheduleEntryLockV3;
	public static readonly command = 0x10; // 16
	public static readonly definition = convertFromJsonCommand({
		"command": 16,
		"name": "ScheduleEntryLockDailyRepeatingSet",
		"help": "Schedule Entry Lock Daily Repeating Set",
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
				"name": "weekDayBitmask",
				"help": "Week Day Bitmask",
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
				"name": "durationHour",
				"help": "Duration Hour",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "durationMinute",
				"help": "Duration Minute",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleEntryLockV3)?.command === this.command;
	}

	constructor(data: Buffer | ScheduleEntryLockV3ScheduleEntryLockDailyRepeatingSetData) {
		super(ScheduleEntryLockDailyRepeatingSet, data);
	}
};
