/**
 * Command Class Sensor Binary, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum SensorBinaryV2Commands {
	SensorBinaryGet = 0x02,
	SensorBinaryReport = 0x03,
	SensorBinarySupportedGetSensor = 0x01,
	SensorBinarySupportedSensorReport = 0x04,
}

export interface SensorBinaryV2SensorBinaryGetData {
	sensorType: number; // 1 byte unsigned integer
}

export interface SensorBinaryV2SensorBinaryReportData {
	sensorValue: SensorValueEnum; // 1 byte enum value
	sensorType: number; // 1 byte unsigned integer
}

export interface SensorBinaryV2SensorBinarySupportedSensorReportData {
	bitMask: number; // 0 byte unsigned integer
}

// Deprecated
export class SensorBinaryV2 extends CommandClassPacket<SensorBinaryV2Commands> {
	public static readonly commandClass = CommandClasses.SensorBinary; // 0x30 (48)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SensorBinaryV2, commandAndPayload);
	}

	public static readonly SensorBinaryGet = class SensorBinaryGet extends CommandPacket<SensorBinaryV2SensorBinaryGetData> {
		public static readonly CommandClass = SensorBinaryV2;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "SensorBinaryGet",
			"help": "Sensor Binary Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "sensorType",
					"help": "Sensor Type",
					"length": 1,
					"values": {
						"0": "Reserved",
						"1": "General",
						"2": "Smoke",
						"3": "CO",
						"4": "CO2",
						"5": "Heat",
						"6": "Water",
						"7": "Freeze",
						"8": "Tamper",
						"9": "Aux",
						"10": "Door/Window",
						"11": "Tilt",
						"12": "Motion",
						"13": "Glass Break",
						"255": "First"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SensorBinaryV2)?.command === this.command;
		}

		constructor(data: Buffer | SensorBinaryV2SensorBinaryGetData) {
			super(SensorBinaryGet, data);
		}
	};

	public static readonly SensorBinaryReport = class SensorBinaryReport extends CommandPacket<SensorBinaryV2SensorBinaryReportData> {
		public static readonly CommandClass = SensorBinaryV2;
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
				},
				{
					"type": "integer",
					"name": "sensorType",
					"help": "Sensor Type",
					"length": 1,
					"values": {
						"0": "Reserved",
						"1": "General",
						"2": "Smoke",
						"3": "CO",
						"4": "CO2",
						"5": "Heat",
						"6": "Water",
						"7": "Freeze",
						"8": "Tamper",
						"9": "Aux",
						"10": "Door/Window",
						"11": "Tilt",
						"12": "Motion",
						"13": "Glass Break",
						"255": "First"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SensorBinaryV2)?.command === this.command;
		}

		constructor(data: Buffer | SensorBinaryV2SensorBinaryReportData) {
			super(SensorBinaryReport, data);
		}
	};

	public static readonly SensorBinarySupportedGetSensor = class SensorBinarySupportedGetSensor extends CommandPacket<void> {
		public static readonly CommandClass = SensorBinaryV2;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "SensorBinarySupportedGetSensor",
			"help": "Sensor Binary Supported Get Sensor",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SensorBinaryV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SensorBinarySupportedGetSensor, data);
		}
	};

	public static readonly SensorBinarySupportedSensorReport = class SensorBinarySupportedSensorReport extends CommandPacket<SensorBinaryV2SensorBinarySupportedSensorReportData> {
		public static readonly CommandClass = SensorBinaryV2;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "SensorBinarySupportedSensorReport",
			"help": "Sensor Binary Supported Sensor Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "bitMask",
					"help": "Bit Mask",
					"length": 0
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SensorBinaryV2)?.command === this.command;
		}

		constructor(data: Buffer | SensorBinaryV2SensorBinarySupportedSensorReportData) {
			super(SensorBinarySupportedSensorReport, data);
		}
	};
}

export namespace SensorBinaryV2 {
	export type SensorBinaryGet = InstanceType<typeof SensorBinaryV2.SensorBinaryGet>;
	export type SensorBinaryReport = InstanceType<typeof SensorBinaryV2.SensorBinaryReport>;
	export type SensorBinarySupportedGetSensor = InstanceType<typeof SensorBinaryV2.SensorBinarySupportedGetSensor>;
	export type SensorBinarySupportedSensorReport = InstanceType<typeof SensorBinaryV2.SensorBinarySupportedSensorReport>;
}

export enum SensorValueEnum {
	Idle = 0x0,
	DetectedAnEvent = 0xff,
}
