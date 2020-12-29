/**
 * Command Class Sensor Binary, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum SensorBinaryV1Commands {
	SensorBinaryGet = 0x02,
	SensorBinaryReport = 0x03,
}

export interface SensorBinaryV1SensorBinaryReportData {
	sensorValue: SensorValueEnum; // 1 byte enum value
}

// Deprecated
export class SensorBinaryV1 extends CommandClassPacket<SensorBinaryV1Commands> {
	public static readonly commandClass = CommandClasses.SensorBinary; // 0x30 (48)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SensorBinaryV1, commandAndPayload);
	}

	public static readonly SensorBinaryGet = class SensorBinaryGet extends CommandPacket<void> {
		public static readonly CommandClass = SensorBinaryV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "SensorBinaryGet",
			"help": "Sensor Binary Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SensorBinaryV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SensorBinaryGet, data);
		}
	};

	public static readonly SensorBinaryReport = class SensorBinaryReport extends CommandPacket<SensorBinaryV1SensorBinaryReportData> {
		public static readonly CommandClass = SensorBinaryV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "SensorBinaryReport",
			"help": "Sensor Binary Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "sensorValue",
					"help": "Sensor Value",
					"length": 1,
					"values": {
						"0": "idle",
						"255": "detected an event"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SensorBinaryV1)?.command === this.command;
		}

		constructor(data: Buffer | SensorBinaryV1SensorBinaryReportData) {
			super(SensorBinaryReport, data);
		}
	};
}

export namespace SensorBinaryV1 {
	export type SensorBinaryGet = InstanceType<typeof SensorBinaryV1.SensorBinaryGet>;
	export type SensorBinaryReport = InstanceType<typeof SensorBinaryV1.SensorBinaryReport>;
}

export enum SensorValueEnum {
	Idle = 0x0,
	DetectedAnEvent = 0xff,
}
