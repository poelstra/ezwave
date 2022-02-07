/**
 * Command Class Time Parameters, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(TimeParametersV1, commandAndPayload);
	}
}

export class TimeParametersGet extends CommandPacket<void> {
	public static readonly CommandClass = TimeParametersV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "TimeParametersGet",
		"help": "Time Parameters Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(TimeParametersV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(TimeParametersGet, data);
	}
};

export class TimeParametersReport extends CommandPacket<TimeParametersV1TimeParametersReportData> {
	public static readonly CommandClass = TimeParametersV1;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "TimeParametersReport",
		"help": "Time Parameters Report",
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
			},
			{
				"type": "Integer",
				"name": "hourUtc",
				"help": "Hour UTC",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "minuteUtc",
				"help": "Minute UTC",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "secondUtc",
				"help": "Second UTC",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(TimeParametersV1)?.command === this.command;
	}

	public constructor(data: Buffer | TimeParametersV1TimeParametersReportData) {
		super(TimeParametersReport, data);
	}
};

export class TimeParametersSet extends CommandPacket<TimeParametersV1TimeParametersSetData> {
	public static readonly CommandClass = TimeParametersV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "TimeParametersSet",
		"help": "Time Parameters Set",
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
			},
			{
				"type": "Integer",
				"name": "hourUtc",
				"help": "Hour UTC",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "minuteUtc",
				"help": "Minute UTC",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "secondUtc",
				"help": "Second UTC",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(TimeParametersV1)?.command === this.command;
	}

	public constructor(data: Buffer | TimeParametersV1TimeParametersSetData) {
		super(TimeParametersSet, data);
	}
};
