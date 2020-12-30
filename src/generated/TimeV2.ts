/**
 * Command Class Time, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

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
	signTZO: boolean; // level[7]
	hourTZO: number; // level[6..0]
	minuteTZO: number; // 1 byte unsigned integer
	signOffsetDST: boolean; // level2[7]
	minuteOffsetDST: number; // level2[6..0]
	monthStartDST: number; // 1 byte unsigned integer
	dayStartDST: number; // 1 byte unsigned integer
	hourStartDST: number; // 1 byte unsigned integer
	monthEndDST: number; // 1 byte unsigned integer
	dayEndDST: number; // 1 byte unsigned integer
	hourEndDST: number; // 1 byte unsigned integer
}

export interface TimeV2TimeOffsetSetData {
	signTZO: boolean; // level[7]
	hourTZO: number; // level[6..0]
	minuteTZO: number; // 1 byte unsigned integer
	signOffsetDST: boolean; // level2[7]
	minuteOffsetDST: number; // level2[6..0]
	monthStartDST: number; // 1 byte unsigned integer
	dayStartDST: number; // 1 byte unsigned integer
	hourStartDST: number; // 1 byte unsigned integer
	monthEndDST: number; // 1 byte unsigned integer
	dayEndDST: number; // 1 byte unsigned integer
	hourEndDST: number; // 1 byte unsigned integer
}

export interface TimeV2TimeReportData {
	rTCFailure: boolean; // properties1[7]
	hourLocalTime: number; // properties1[4..0]
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
}

export class TimeV2 extends CommandClassPacket<TimeV2Commands> {
	public static readonly commandClass = CommandClasses.Time; // 0x8a (138)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(TimeV2, commandAndPayload);
	}

	public static readonly DateGet = class DateGet extends CommandPacket<void> {
		public static readonly CommandClass = TimeV2;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "DateGet",
			"help": "Date Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TimeV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(DateGet, data);
		}
	};

	public static readonly DateReport = class DateReport extends CommandPacket<TimeV2DateReportData> {
		public static readonly CommandClass = TimeV2;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "DateReport",
			"help": "Date Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "year",
					"help": "Year",
					"length": 2
				},
				{
					"type": "integer",
					"name": "month",
					"help": "Month",
					"length": 1
				},
				{
					"type": "integer",
					"name": "day",
					"help": "Day",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TimeV2)?.command === this.command;
		}

		constructor(data: Buffer | TimeV2DateReportData) {
			super(DateReport, data);
		}
	};

	public static readonly TimeGet = class TimeGet extends CommandPacket<void> {
		public static readonly CommandClass = TimeV2;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "TimeGet",
			"help": "Time Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TimeV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(TimeGet, data);
		}
	};

	public static readonly TimeOffsetGet = class TimeOffsetGet extends CommandPacket<void> {
		public static readonly CommandClass = TimeV2;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "TimeOffsetGet",
			"help": "Time Offset Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TimeV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(TimeOffsetGet, data);
		}
	};

	public static readonly TimeOffsetReport = class TimeOffsetReport extends CommandPacket<TimeV2TimeOffsetReportData> {
		public static readonly CommandClass = TimeV2;
		public static readonly command = 0x07;
		public static readonly definition = {
			"command": 7,
			"name": "TimeOffsetReport",
			"help": "Time Offset Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "signTZO",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "hourTZO",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "minuteTZO",
					"help": "Minute TZO",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "level2",
					"help": "Level2",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "signOffsetDST",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "minuteOffsetDST",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "monthStartDST",
					"help": "Month Start DST",
					"length": 1
				},
				{
					"type": "integer",
					"name": "dayStartDST",
					"help": "Day Start DST",
					"length": 1
				},
				{
					"type": "integer",
					"name": "hourStartDST",
					"help": "Hour Start DST",
					"length": 1
				},
				{
					"type": "integer",
					"name": "monthEndDST",
					"help": "Month End DST",
					"length": 1
				},
				{
					"type": "integer",
					"name": "dayEndDST",
					"help": "Day End DST",
					"length": 1
				},
				{
					"type": "integer",
					"name": "hourEndDST",
					"help": "Hour End DST",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TimeV2)?.command === this.command;
		}

		constructor(data: Buffer | TimeV2TimeOffsetReportData) {
			super(TimeOffsetReport, data);
		}
	};

	public static readonly TimeOffsetSet = class TimeOffsetSet extends CommandPacket<TimeV2TimeOffsetSetData> {
		public static readonly CommandClass = TimeV2;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "TimeOffsetSet",
			"help": "Time Offset Set",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "signTZO",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "hourTZO",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "minuteTZO",
					"help": "Minute TZO",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "level2",
					"help": "Level2",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "signOffsetDST",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "minuteOffsetDST",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "monthStartDST",
					"help": "Month Start DST",
					"length": 1
				},
				{
					"type": "integer",
					"name": "dayStartDST",
					"help": "Day Start DST",
					"length": 1
				},
				{
					"type": "integer",
					"name": "hourStartDST",
					"help": "Hour Start DST",
					"length": 1
				},
				{
					"type": "integer",
					"name": "monthEndDST",
					"help": "Month End DST",
					"length": 1
				},
				{
					"type": "integer",
					"name": "dayEndDST",
					"help": "Day End DST",
					"length": 1
				},
				{
					"type": "integer",
					"name": "hourEndDST",
					"help": "Hour End DST",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TimeV2)?.command === this.command;
		}

		constructor(data: Buffer | TimeV2TimeOffsetSetData) {
			super(TimeOffsetSet, data);
		}
	};

	public static readonly TimeReport = class TimeReport extends CommandPacket<TimeV2TimeReportData> {
		public static readonly CommandClass = TimeV2;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "TimeReport",
			"help": "Time Report",
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
							"name": "rTCFailure",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "reserved",
							"mask": 96,
							"shift": 5,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "hourLocalTime",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "minuteLocalTime",
					"help": "Minute Local Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "secondLocalTime",
					"help": "Second Local Time",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TimeV2)?.command === this.command;
		}

		constructor(data: Buffer | TimeV2TimeReportData) {
			super(TimeReport, data);
		}
	};
}

export namespace TimeV2 {
	export type DateGet = InstanceType<typeof TimeV2.DateGet>;
	export type DateReport = InstanceType<typeof TimeV2.DateReport>;
	export type TimeGet = InstanceType<typeof TimeV2.TimeGet>;
	export type TimeOffsetGet = InstanceType<typeof TimeV2.TimeOffsetGet>;
	export type TimeOffsetReport = InstanceType<typeof TimeV2.TimeOffsetReport>;
	export type TimeOffsetSet = InstanceType<typeof TimeV2.TimeOffsetSet>;
	export type TimeReport = InstanceType<typeof TimeV2.TimeReport>;
}
