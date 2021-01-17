/**
 * Command Class Sensor Binary, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum SensorBinaryV1Commands {
	SensorBinaryGet = 0x02,
	SensorBinaryReport = 0x03,
}

export interface SensorBinaryV1SensorBinaryReportData {
	sensorValue: SensorValueEnum; // 1 byte enum value
}

export enum SensorValueEnum {
	Idle = 0x0,
	DetectedAnEvent = 0xff,
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
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "SensorBinaryGet",
			"help": "Sensor Binary Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "SensorBinaryReport",
			"help": "Sensor Binary Report",
			"status": "Active",
			"params": [
				{
					"type": "Enum",
					"name": "sensorValue",
					"help": "Sensor Value",
					"length": 1,
					"values": {
						"0": {
							"name": "Idle",
							"help": "idle"
						},
						"255": {
							"name": "DetectedAnEvent",
							"help": "detected an event"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

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
