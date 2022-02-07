/**
 * Command Class Time, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum TimeV2Commands {
	DateGet = 0x03,
	DateReport = 0x04,
	TimeGet = 0x01,
	TimeOffsetGet = 0x06,
	TimeOffsetReport = 0x07,
	TimeOffsetSet = 0x05,
	TimeReport = 0x02,
}

export interface TimeV2DateReportData {
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
}

export interface TimeV2TimeOffsetReportData {
	signTzo: boolean; // level[7]
	hourTzo: number; // level[6..0]
	minuteTzo: number; // 1 byte unsigned integer
	signOffsetDst: boolean; // level2[7]
	minuteOffsetDst: number; // level2[6..0]
	monthStartDst: number; // 1 byte unsigned integer
	dayStartDst: number; // 1 byte unsigned integer
	hourStartDst: number; // 1 byte unsigned integer
	monthEndDst: number; // 1 byte unsigned integer
	dayEndDst: number; // 1 byte unsigned integer
	hourEndDst: number; // 1 byte unsigned integer
}

export interface TimeV2TimeOffsetSetData {
	signTzo: boolean; // level[7]
	hourTzo: number; // level[6..0]
	minuteTzo: number; // 1 byte unsigned integer
	signOffsetDst: boolean; // level2[7]
	minuteOffsetDst: number; // level2[6..0]
	monthStartDst: number; // 1 byte unsigned integer
	dayStartDst: number; // 1 byte unsigned integer
	hourStartDst: number; // 1 byte unsigned integer
	monthEndDst: number; // 1 byte unsigned integer
	dayEndDst: number; // 1 byte unsigned integer
	hourEndDst: number; // 1 byte unsigned integer
}

export interface TimeV2TimeReportData {
	rtcFailure: boolean; // properties1[7]
	hourLocalTime: number; // properties1[4..0]
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
}

export class TimeV2 extends CommandClassPacket<TimeV2Commands> {
	public static readonly commandClass = CommandClasses.Time; // 0x8a (138)
	public static readonly version = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(TimeV2, commandAndPayload);
	}
}

export class DateGet extends CommandPacket<void> {
	public static readonly CommandClass = TimeV2;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "DateGet",
		"help": "Date Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(TimeV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(DateGet, data);
	}
};

export class DateReport extends CommandPacket<TimeV2DateReportData> {
	public static readonly CommandClass = TimeV2;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
		"command": 4,
		"name": "DateReport",
		"help": "Date Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "year",
				"help": "Year",
				"length": 2
			},
			{
				"type": "Integer",
				"name": "month",
				"help": "Month",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "day",
				"help": "Day",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(TimeV2)?.command === this.command;
	}

	public constructor(data: Buffer | TimeV2DateReportData) {
		super(DateReport, data);
	}
};

export class TimeGet extends CommandPacket<void> {
	public static readonly CommandClass = TimeV2;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "TimeGet",
		"help": "Time Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(TimeV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(TimeGet, data);
	}
};

export class TimeOffsetGet extends CommandPacket<void> {
	public static readonly CommandClass = TimeV2;
	public static readonly command = 0x06; // 6
	public static readonly definition = convertFromJsonCommand({
		"command": 6,
		"name": "TimeOffsetGet",
		"help": "Time Offset Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(TimeV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(TimeOffsetGet, data);
	}
};

export class TimeOffsetReport extends CommandPacket<TimeV2TimeOffsetReportData> {
	public static readonly CommandClass = TimeV2;
	public static readonly command = 0x07; // 7
	public static readonly definition = convertFromJsonCommand({
		"command": 7,
		"name": "TimeOffsetReport",
		"help": "Time Offset Report",
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
			},
			{
				"type": "Integer",
				"name": "monthStartDst",
				"help": "Month Start DST",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "dayStartDst",
				"help": "Day Start DST",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "hourStartDst",
				"help": "Hour Start DST",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "monthEndDst",
				"help": "Month End DST",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "dayEndDst",
				"help": "Day End DST",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "hourEndDst",
				"help": "Hour End DST",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(TimeV2)?.command === this.command;
	}

	public constructor(data: Buffer | TimeV2TimeOffsetReportData) {
		super(TimeOffsetReport, data);
	}
};

export class TimeOffsetSet extends CommandPacket<TimeV2TimeOffsetSetData> {
	public static readonly CommandClass = TimeV2;
	public static readonly command = 0x05; // 5
	public static readonly definition = convertFromJsonCommand({
		"command": 5,
		"name": "TimeOffsetSet",
		"help": "Time Offset Set",
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
			},
			{
				"type": "Integer",
				"name": "monthStartDst",
				"help": "Month Start DST",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "dayStartDst",
				"help": "Day Start DST",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "hourStartDst",
				"help": "Hour Start DST",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "monthEndDst",
				"help": "Month End DST",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "dayEndDst",
				"help": "Day End DST",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "hourEndDst",
				"help": "Hour End DST",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(TimeV2)?.command === this.command;
	}

	public constructor(data: Buffer | TimeV2TimeOffsetSetData) {
		super(TimeOffsetSet, data);
	}
};

export class TimeReport extends CommandPacket<TimeV2TimeReportData> {
	public static readonly CommandClass = TimeV2;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "TimeReport",
		"help": "Time Report",
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
						"name": "rtcFailure",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 96,
						"shift": 5,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "hourLocalTime",
						"mask": 31,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "minuteLocalTime",
				"help": "Minute Local Time",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "secondLocalTime",
				"help": "Second Local Time",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(TimeV2)?.command === this.command;
	}

	public constructor(data: Buffer | TimeV2TimeReportData) {
		super(TimeReport, data);
	}
};
