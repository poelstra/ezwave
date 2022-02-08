/**
 * Command Class Alarm, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum AlarmV1Commands {
	AlarmGet = 0x04,
	AlarmReport = 0x05,
}

export interface AlarmV1AlarmGetData {
	alarmType: number; // 1 byte unsigned integer
}

export interface AlarmV1AlarmReportData {
	alarmType: number; // 1 byte unsigned integer
	alarmLevel: number; // 1 byte unsigned integer
}

// This (version of the) command class is Deprecated
export class AlarmV1 extends CommandClassPacket<AlarmV1Commands> {
	public static readonly commandClass: number = CommandClasses.Alarm; // 0x71 (113)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(AlarmV1, commandAndPayload);
	}
}

export class AlarmGet extends CommandPacket<AlarmV1AlarmGetData> {
	public static readonly CommandClass: typeof AlarmV1 = AlarmV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "AlarmGet",
		"help": "Alarm Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "alarmType",
				"help": "Alarm Type",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AlarmV1)?.command === this.command;
	}

	public constructor(data: Buffer | AlarmV1AlarmGetData) {
		super(AlarmGet, data);
	}
};

export class AlarmReport extends CommandPacket<AlarmV1AlarmReportData> {
	public static readonly CommandClass: typeof AlarmV1 = AlarmV1;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "AlarmReport",
		"help": "Alarm Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "alarmType",
				"help": "Alarm Type",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "alarmLevel",
				"help": "Alarm Level",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AlarmV1)?.command === this.command;
	}

	public constructor(data: Buffer | AlarmV1AlarmReportData) {
		super(AlarmReport, data);
	}
};
