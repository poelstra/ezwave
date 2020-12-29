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
	// TODO param level type bitfield
	// TODO param sensorValue type blob
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
						"1": "Temperature (version 1)",
						"2": "General purpose value (version 1)",
						"3": "Luminance (version 1)",
						"4": "Power (version 2)",
						"5": "Relative humidity (version 2)",
						"6": "Velocity (version 2)",
						"7": "Direction (version 2)",
						"8": "Atmospheric pressure (version 2)",
						"9": "Barometric pressure (version 2)",
						"10": "Solar radiation (version 2)",
						"11": "Dew point (version 2)",
						"12": "Rain rate (version 2)",
						"13": "Tide level (version 2)",
						"14": "Weight (version 3)",
						"15": "Voltage (version 3)",
						"16": "Current (version 3)",
						"17": "CO2-level (version 3)",
						"18": "Air flow (version 3)",
						"19": "Tank capacity (version 3)",
						"20": "Distance (version 3)",
						"21": "Angle Position (version 4)"
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
							"name": "Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "sensorValue",
					"help": "Sensor Value",
					"length": {
						"name": "Level",
						"mask": 7,
						"shift": 0
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
