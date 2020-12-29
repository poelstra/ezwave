/**
 * Command Class Sensor Multilevel, version 5.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum SensorMultilevelV5Commands {
	SensorMultilevelGet = 0x04,
	SensorMultilevelReport = 0x05,
	SensorMultilevelSupportedGetSensor = 0x01,
	SensorMultilevelSupportedSensorReport = 0x02,
	SensorMultilevelSupportedGetScale = 0x03,
	SensorMultilevelSupportedScaleReport = 0x06,
}

export interface SensorMultilevelV5SensorMultilevelGetData {
	sensorType: SensorTypeEnum; // 1 byte enum value
	// TODO param properties1 type bitfield
}

export interface SensorMultilevelV5SensorMultilevelReportData {
	sensorType: SensorTypeEnum; // 1 byte enum value
	// TODO param level type bitfield
	// TODO param sensorValue type blob
}

export interface SensorMultilevelV5SensorMultilevelSupportedSensorReportData {
	bitMask: number; // 0 byte unsigned integer
}

export interface SensorMultilevelV5SensorMultilevelSupportedGetScaleData {
	sensorType: SensorTypeEnum; // 1 byte enum value
}

export interface SensorMultilevelV5SensorMultilevelSupportedScaleReportData {
	sensorType: SensorTypeEnum; // 1 byte enum value
	// TODO param properties1 type bitfield
}

export class SensorMultilevelV5 extends CommandClassPacket<SensorMultilevelV5Commands> {
	public static readonly commandClass = CommandClasses.SensorMultilevel; // 0x31 (49)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SensorMultilevelV5, commandAndPayload);
	}

	public static readonly SensorMultilevelGet = class SensorMultilevelGet extends CommandPacket<SensorMultilevelV5SensorMultilevelGetData> {
		public static readonly CommandClass = SensorMultilevelV5;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "SensorMultilevelGet",
			"help": "Multilevel Sensor Get",
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
						"21": "Angle Position (version 4)",
						"22": "Rotation (v5)",
						"23": "Water temperature (v5)",
						"24": "Soil temperature (v5)",
						"25": "Seismic intensity (v5)",
						"26": "Seismic magnitude (v5)",
						"27": "Ultraviolet (v5)",
						"28": "Electrical resistivity (v5)",
						"29": "Electrical conductivity (v5)",
						"30": "Loudness (v5)",
						"31": "Moisture (v5)"
					}
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Reserved1",
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
							"name": "Reserved2",
							"mask": 224,
							"shift": 5
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SensorMultilevelV5)?.command === this.command;
		}

		constructor(data: Buffer | SensorMultilevelV5SensorMultilevelGetData) {
			super(SensorMultilevelGet, data);
		}
	};

	public static readonly SensorMultilevelReport = class SensorMultilevelReport extends CommandPacket<SensorMultilevelV5SensorMultilevelReportData> {
		public static readonly CommandClass = SensorMultilevelV5;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "SensorMultilevelReport",
			"help": "Multilevel Sensor Report",
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
						"21": "Angle Position (version 4)",
						"22": "Rotation (v5)",
						"23": "Water temperature (v5)",
						"24": "Soil temperature (v5)",
						"25": "Seismic intensity (v5)",
						"26": "Seismic magnitude (v5)",
						"27": "Ultraviolet (v5)",
						"28": "Electrical resistivity (v5)",
						"29": "Electrical conductivity (v5)",
						"30": "Loudness (v5)",
						"31": "Moisture (v5)"
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
			return packet.tryAs(SensorMultilevelV5)?.command === this.command;
		}

		constructor(data: Buffer | SensorMultilevelV5SensorMultilevelReportData) {
			super(SensorMultilevelReport, data);
		}
	};

	public static readonly SensorMultilevelSupportedGetSensor = class SensorMultilevelSupportedGetSensor extends CommandPacket<void> {
		public static readonly CommandClass = SensorMultilevelV5;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "SensorMultilevelSupportedGetSensor",
			"help": "Multilevel Sensor Get Supported Sensor",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SensorMultilevelV5)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SensorMultilevelSupportedGetSensor, data);
		}
	};

	public static readonly SensorMultilevelSupportedSensorReport = class SensorMultilevelSupportedSensorReport extends CommandPacket<SensorMultilevelV5SensorMultilevelSupportedSensorReportData> {
		public static readonly CommandClass = SensorMultilevelV5;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "SensorMultilevelSupportedSensorReport",
			"help": "Multilevel Sensor Supported Sensor Report",
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
			return packet.tryAs(SensorMultilevelV5)?.command === this.command;
		}

		constructor(data: Buffer | SensorMultilevelV5SensorMultilevelSupportedSensorReportData) {
			super(SensorMultilevelSupportedSensorReport, data);
		}
	};

	public static readonly SensorMultilevelSupportedGetScale = class SensorMultilevelSupportedGetScale extends CommandPacket<SensorMultilevelV5SensorMultilevelSupportedGetScaleData> {
		public static readonly CommandClass = SensorMultilevelV5;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "SensorMultilevelSupportedGetScale",
			"help": "Multilevel Sensor Get Supported Scale",
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
						"21": "Angle Position (version 4)",
						"22": "Rotation (v5)",
						"23": "Water temperature (v5)",
						"24": "Soil temperature (v5)",
						"25": "Seismic intensity (v5)",
						"26": "Seismic magnitude (v5)",
						"27": "Ultraviolet (v5)",
						"28": "Electrical resistivity (v5)",
						"29": "Electrical conductivity (v5)",
						"30": "Loudness (v5)",
						"31": "Moisture (v5)"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SensorMultilevelV5)?.command === this.command;
		}

		constructor(data: Buffer | SensorMultilevelV5SensorMultilevelSupportedGetScaleData) {
			super(SensorMultilevelSupportedGetScale, data);
		}
	};

	public static readonly SensorMultilevelSupportedScaleReport = class SensorMultilevelSupportedScaleReport extends CommandPacket<SensorMultilevelV5SensorMultilevelSupportedScaleReportData> {
		public static readonly CommandClass = SensorMultilevelV5;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "SensorMultilevelSupportedScaleReport",
			"help": "Multilevel Sensor Supported Scale Report",
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
						"21": "Angle Position (version 4)",
						"22": "Rotation (v5)",
						"23": "Water temperature (v5)",
						"24": "Soil temperature (v5)",
						"25": "Seismic intensity (v5)",
						"26": "Seismic magnitude (v5)",
						"27": "Ultraviolet (v5)",
						"28": "Electrical resistivity (v5)",
						"29": "Electrical conductivity (v5)",
						"30": "Loudness (v5)",
						"31": "Moisture (v5)"
					}
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Scale Bit Mask",
							"mask": 15,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 240,
							"shift": 4
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SensorMultilevelV5)?.command === this.command;
		}

		constructor(data: Buffer | SensorMultilevelV5SensorMultilevelSupportedScaleReportData) {
			super(SensorMultilevelSupportedScaleReport, data);
		}
	};
}

export namespace SensorMultilevelV5 {
	export type SensorMultilevelGet = InstanceType<typeof SensorMultilevelV5.SensorMultilevelGet>;
	export type SensorMultilevelReport = InstanceType<typeof SensorMultilevelV5.SensorMultilevelReport>;
	export type SensorMultilevelSupportedGetSensor = InstanceType<typeof SensorMultilevelV5.SensorMultilevelSupportedGetSensor>;
	export type SensorMultilevelSupportedSensorReport = InstanceType<typeof SensorMultilevelV5.SensorMultilevelSupportedSensorReport>;
	export type SensorMultilevelSupportedGetScale = InstanceType<typeof SensorMultilevelV5.SensorMultilevelSupportedGetScale>;
	export type SensorMultilevelSupportedScaleReport = InstanceType<typeof SensorMultilevelV5.SensorMultilevelSupportedScaleReport>;
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
	RotationV5 = 0x16,
	WaterTemperatureV5 = 0x17,
	SoilTemperatureV5 = 0x18,
	SeismicIntensityV5 = 0x19,
	SeismicMagnitudeV5 = 0x1a,
	UltravioletV5 = 0x1b,
	ElectricalResistivityV5 = 0x1c,
	ElectricalConductivityV5 = 0x1d,
	LoudnessV5 = 0x1e,
	MoistureV5 = 0x1f,
}
