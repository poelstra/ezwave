/**
 * Command Class Time Parameters, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum TimeParametersV1Commands {
	TimeParametersGet = 0x02,
	TimeParametersReport = 0x03,
	TimeParametersSet = 0x01,
}

export interface TimeParametersV1TimeParametersReportData {
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourUtc: number; // 1 byte unsigned integer
	minuteUtc: number; // 1 byte unsigned integer
	secondUtc: number; // 1 byte unsigned integer
}

export interface TimeParametersV1TimeParametersSetData {
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourUtc: number; // 1 byte unsigned integer
	minuteUtc: number; // 1 byte unsigned integer
	secondUtc: number; // 1 byte unsigned integer
}

export class TimeParametersV1 extends CommandClassPacket<TimeParametersV1Commands> {
	public static readonly commandClass = CommandClasses.TimeParameters; // 0x8b (139)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(TimeParametersV1, commandAndPayload);
	}

	public static readonly TimeParametersGet = class TimeParametersGet extends CommandPacket<void> {
		public static readonly CommandClass = TimeParametersV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "TimeParametersGet",
			"help": "Time Parameters Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(TimeParametersV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(TimeParametersGet, data);
		}
	};

	public static readonly TimeParametersReport = class TimeParametersReport extends CommandPacket<TimeParametersV1TimeParametersReportData> {
		public static readonly CommandClass = TimeParametersV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "TimeParametersReport",
			"help": "Time Parameters Report",
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
				},
				{
					"type": "integer",
					"name": "hourUtc",
					"help": "Hour UTC",
					"length": 1
				},
				{
					"type": "integer",
					"name": "minuteUtc",
					"help": "Minute UTC",
					"length": 1
				},
				{
					"type": "integer",
					"name": "secondUtc",
					"help": "Second UTC",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(TimeParametersV1)?.command === this.command;
		}

		constructor(data: Buffer | TimeParametersV1TimeParametersReportData) {
			super(TimeParametersReport, data);
		}
	};

	public static readonly TimeParametersSet = class TimeParametersSet extends CommandPacket<TimeParametersV1TimeParametersSetData> {
		public static readonly CommandClass = TimeParametersV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "TimeParametersSet",
			"help": "Time Parameters Set",
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
				},
				{
					"type": "integer",
					"name": "hourUtc",
					"help": "Hour UTC",
					"length": 1
				},
				{
					"type": "integer",
					"name": "minuteUtc",
					"help": "Minute UTC",
					"length": 1
				},
				{
					"type": "integer",
					"name": "secondUtc",
					"help": "Second UTC",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(TimeParametersV1)?.command === this.command;
		}

		constructor(data: Buffer | TimeParametersV1TimeParametersSetData) {
			super(TimeParametersSet, data);
		}
	};
}

export namespace TimeParametersV1 {
	export type TimeParametersGet = InstanceType<typeof TimeParametersV1.TimeParametersGet>;
	export type TimeParametersReport = InstanceType<typeof TimeParametersV1.TimeParametersReport>;
	export type TimeParametersSet = InstanceType<typeof TimeParametersV1.TimeParametersSet>;
}
