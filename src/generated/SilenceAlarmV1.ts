/**
 * Command Class Silence Alarm, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum SilenceAlarmV1Commands {
	SensorAlarmSet = 0x01,
}

export interface SilenceAlarmV1SensorAlarmSetData {
	mode: number; // 1 byte unsigned integer
	seconds: number; // 2 byte unsigned integer
	numberOfBitMasks: number; // 1 byte unsigned integer
	// TODO param bitMask type blob
}

export class SilenceAlarmV1 extends CommandClassPacket<SilenceAlarmV1Commands> {
	public static readonly commandClass = CommandClasses.SilenceAlarm; // 0x9d (157)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SilenceAlarmV1, commandAndPayload);
	}

	public static readonly SensorAlarmSet = class SensorAlarmSet extends CommandPacket<SilenceAlarmV1SensorAlarmSetData> {
		public static readonly CommandClass = SilenceAlarmV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "SensorAlarmSet",
			"help": "Sensor Alarm Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "mode",
					"help": "Mode",
					"length": 1,
					"values": {
						"0": "Disable sounding of all sensor alarms",
						"1": "Disable sounding of all sensor alarms independent of bit mask which have received the alarm",
						"2": "Disable sounding of all sensor alarms according to bit mask",
						"3": "Disable sounding of all sensor alarms according to bit mask which have received the alarm"
					}
				},
				{
					"type": "integer",
					"name": "seconds",
					"help": "Seconds",
					"length": 2
				},
				{
					"type": "integer",
					"name": "numberOfBitMasks",
					"help": "Number of Bit Masks",
					"length": 1
				},
				{
					"type": "blob",
					"name": "bitMask",
					"help": "Bit Mask",
					"length": {
						"name": "Number of Bit Masks",
						"mask": 255,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SilenceAlarmV1)?.command === this.command;
		}

		constructor(data: Buffer | SilenceAlarmV1SensorAlarmSetData) {
			super(SensorAlarmSet, data);
		}
	};
}

export namespace SilenceAlarmV1 {
	export type SensorAlarmSet = InstanceType<typeof SilenceAlarmV1.SensorAlarmSet>;
}
