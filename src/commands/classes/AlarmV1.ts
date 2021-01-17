/**
 * Command Class Alarm, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

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

// Deprecated
export class AlarmV1 extends CommandClassPacket<AlarmV1Commands> {
	public static readonly commandClass = CommandClasses.Alarm; // 0x71 (113)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(AlarmV1, commandAndPayload);
	}

	public static readonly AlarmGet = class AlarmGet extends CommandPacket<AlarmV1AlarmGetData> {
		public static readonly CommandClass = AlarmV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AlarmV1)?.command === this.command;
		}

		constructor(data: Buffer | AlarmV1AlarmGetData) {
			super(AlarmGet, data);
		}
	};

	public static readonly AlarmReport = class AlarmReport extends CommandPacket<AlarmV1AlarmReportData> {
		public static readonly CommandClass = AlarmV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AlarmV1)?.command === this.command;
		}

		constructor(data: Buffer | AlarmV1AlarmReportData) {
			super(AlarmReport, data);
		}
	};
}

export namespace AlarmV1 {
	export type AlarmGet = InstanceType<typeof AlarmV1.AlarmGet>;
	export type AlarmReport = InstanceType<typeof AlarmV1.AlarmReport>;
}
