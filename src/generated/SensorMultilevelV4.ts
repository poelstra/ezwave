/**
 * Command Class Sensor Multilevel, version 4.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum SensorMultilevelV4Commands {
	SensorMultilevelGet = 0x04,
	SensorMultilevelReport = 0x05,
}

export interface SensorMultilevelV4SensorMultilevelReportData {
	sensorType: SensorTypeEnum; // 1 byte enum value
	precision: number; // level[7..5]
	scale: number; // level[4..3]
	size: number; // level[2..0]
	// TODO param sensorValue type blob
}

export enum SensorTypeEnum {
	TemperatureVersion1 = 0x1,
	GeneralPurposeValueVersion1 = 0x2,
	LuminanceVersion1 = 0x3,
	PowerVersion2 = 0x4,
	RelativeHumidityVersion2 = 0x5,
	VelocityVersion2 = 0x6,
	DirectionVersion2 = 0x7,
	AtmosphericPressureVersion2 = 0x8,
	BarometricPressureVersion2 = 0x9,
	SolarRadiationVersion2 = 0xa,
	DewPointVersion2 = 0xb,
	RainRateVersion2 = 0xc,
	TideLevelVersion2 = 0xd,
	WeightVersion3 = 0xe,
	VoltageVersion3 = 0xf,
	CurrentVersion3 = 0x10,
	CO2LevelVersion3 = 0x11,
	AirFlowVersion3 = 0x12,
	TankCapacityVersion3 = 0x13,
	DistanceVersion3 = 0x14,
	AnglePositionVersion4 = 0x15,
}

export class SensorMultilevelV4 extends CommandClassPacket<SensorMultilevelV4Commands> {
	public static readonly commandClass = CommandClasses.SensorMultilevel; // 0x31 (49)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SensorMultilevelV4, commandAndPayload);
	}

	public static readonly SensorMultilevelGet = class SensorMultilevelGet extends CommandPacket<void> {
		public static readonly CommandClass = SensorMultilevelV4;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "SensorMultilevelGet",
			"help": "Sensor Multilevel Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SensorMultilevelV4)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SensorMultilevelGet, data);
		}
	};

	public static readonly SensorMultilevelReport = class SensorMultilevelReport extends CommandPacket<SensorMultilevelV4SensorMultilevelReportData> {
		public static readonly CommandClass = SensorMultilevelV4;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "SensorMultilevelReport",
			"help": "Sensor Multilevel Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "sensorType",
					"help": "Sensor Type",
					"length": 1,
					"values": {
						"1": {
							"name": "TemperatureVersion1",
							"help": "Temperature (version 1)"
						},
						"2": {
							"name": "GeneralPurposeValueVersion1",
							"help": "General purpose value (version 1)"
						},
						"3": {
							"name": "LuminanceVersion1",
							"help": "Luminance (version 1)"
						},
						"4": {
							"name": "PowerVersion2",
							"help": "Power (version 2)"
						},
						"5": {
							"name": "RelativeHumidityVersion2",
							"help": "Relative humidity (version 2)"
						},
						"6": {
							"name": "VelocityVersion2",
							"help": "Velocity (version 2)"
						},
						"7": {
							"name": "DirectionVersion2",
							"help": "Direction (version 2)"
						},
						"8": {
							"name": "AtmosphericPressureVersion2",
							"help": "Atmospheric pressure (version 2)"
						},
						"9": {
							"name": "BarometricPressureVersion2",
							"help": "Barometric pressure (version 2)"
						},
						"10": {
							"name": "SolarRadiationVersion2",
							"help": "Solar radiation (version 2)"
						},
						"11": {
							"name": "DewPointVersion2",
							"help": "Dew point (version 2)"
						},
						"12": {
							"name": "RainRateVersion2",
							"help": "Rain rate (version 2)"
						},
						"13": {
							"name": "TideLevelVersion2",
							"help": "Tide level (version 2)"
						},
						"14": {
							"name": "WeightVersion3",
							"help": "Weight (version 3)"
						},
						"15": {
							"name": "VoltageVersion3",
							"help": "Voltage (version 3)"
						},
						"16": {
							"name": "CurrentVersion3",
							"help": "Current (version 3)"
						},
						"17": {
							"name": "CO2LevelVersion3",
							"help": "CO2-level (version 3)"
						},
						"18": {
							"name": "AirFlowVersion3",
							"help": "Air flow (version 3)"
						},
						"19": {
							"name": "TankCapacityVersion3",
							"help": "Tank capacity (version 3)"
						},
						"20": {
							"name": "DistanceVersion3",
							"help": "Distance (version 3)"
						},
						"21": {
							"name": "AnglePositionVersion4",
							"help": "Angle Position (version 4)"
						}
					}
				},
				{
					"type": "bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "precision",
							"mask": 224,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "size",
							"mask": 7,
							"shift": 0
						}
					]
				},
				{
					"type": "blob",
					"name": "sensorValue",
					"help": "Sensor Value",
					"length": {
						"name": "Level",
						"bitfield": {
							"mask": 7,
							"shift": 0,
							"name": "size"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SensorMultilevelV4)?.command === this.command;
		}

		constructor(data: Buffer | SensorMultilevelV4SensorMultilevelReportData) {
			super(SensorMultilevelReport, data);
		}
	};
}

export namespace SensorMultilevelV4 {
	export type SensorMultilevelGet = InstanceType<typeof SensorMultilevelV4.SensorMultilevelGet>;
	export type SensorMultilevelReport = InstanceType<typeof SensorMultilevelV4.SensorMultilevelReport>;
}
