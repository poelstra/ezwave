/**
 * Command Class Time, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum TimeV1Commands {
	DateGet = 0x03,
	DateReport = 0x04,
	TimeGet = 0x01,
	TimeReport = 0x02,
}

export interface TimeV1DateReportData {
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
}

export interface TimeV1TimeReportData {
	// TODO param properties1 type bitfield
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
}

export class TimeV1 extends CommandClassPacket<TimeV1Commands> {
	public static readonly commandClass = CommandClasses.Time; // 0x8a (138)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(TimeV1, commandAndPayload);
	}

	public static readonly DateGet = class DateGet extends CommandPacket<void> {
		public static readonly CommandClass = TimeV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "DateGet",
			"help": "Date Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TimeV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(DateGet, data);
		}
	};

	public static readonly DateReport = class DateReport extends CommandPacket<TimeV1DateReportData> {
		public static readonly CommandClass = TimeV1;
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
			return packet.tryAs(TimeV1)?.command === this.command;
		}

		constructor(data: Buffer | TimeV1DateReportData) {
			super(DateReport, data);
		}
	};

	public static readonly TimeGet = class TimeGet extends CommandPacket<void> {
		public static readonly CommandClass = TimeV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "TimeGet",
			"help": "Time Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TimeV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(TimeGet, data);
		}
	};

	public static readonly TimeReport = class TimeReport extends CommandPacket<TimeV1TimeReportData> {
		public static readonly CommandClass = TimeV1;
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
							"type": "integer",
							"name": "Hour Local Time",
							"mask": 31,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 96,
							"shift": 5
						},
						{
							"type": "boolean",
							"name": "RTC failure",
							"mask": 128,
							"shift": 7
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
			return packet.tryAs(TimeV1)?.command === this.command;
		}

		constructor(data: Buffer | TimeV1TimeReportData) {
			super(TimeReport, data);
		}
	};
}

export namespace TimeV1 {
	export type DateGet = InstanceType<typeof TimeV1.DateGet>;
	export type DateReport = InstanceType<typeof TimeV1.DateReport>;
	export type TimeGet = InstanceType<typeof TimeV1.TimeGet>;
	export type TimeReport = InstanceType<typeof TimeV1.TimeReport>;
}
