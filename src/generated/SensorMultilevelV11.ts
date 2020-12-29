/**
 * Command Class Sensor Multilevel, version 11.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum SensorMultilevelV11Commands {
	SensorMultilevelGet = 0x04,
	SensorMultilevelReport = 0x05,
	SensorMultilevelSupportedGetSensor = 0x01,
	SensorMultilevelSupportedSensorReport = 0x02,
	SensorMultilevelSupportedGetScale = 0x03,
	SensorMultilevelSupportedScaleReport = 0x06,
}

export interface SensorMultilevelV11SensorMultilevelGetData {
	sensorType: SensorTypeEnum; // 1 byte enum value
	// TODO param properties1 type bitfield
}

export interface SensorMultilevelV11SensorMultilevelReportData {
	sensorType: SensorTypeEnum; // 1 byte enum value
	// TODO param level type bitfield
	// TODO param sensorValue type blob
}

export interface SensorMultilevelV11SensorMultilevelSupportedSensorReportData {
	bitMask: number; // 0 byte unsigned integer
}

export interface SensorMultilevelV11SensorMultilevelSupportedGetScaleData {
	sensorType: SensorTypeEnum; // 1 byte enum value
}

export interface SensorMultilevelV11SensorMultilevelSupportedScaleReportData {
	sensorType: SensorTypeEnum; // 1 byte enum value
	// TODO param properties1 type bitfield
}

export class SensorMultilevelV11 extends CommandClassPacket<SensorMultilevelV11Commands> {
	public static readonly commandClass = CommandClasses.SensorMultilevel; // 0x31 (49)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SensorMultilevelV11, commandAndPayload);
	}

	public static readonly SensorMultilevelGet = class SensorMultilevelGet extends CommandPacket<SensorMultilevelV11SensorMultilevelGetData> {
		public static readonly CommandClass = SensorMultilevelV11;
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
						"31": "Moisture (v5)",
						"32": "Frequency (v6)",
						"33": "Time (v6)",
						"34": "Target Temperature (v6)",
						"35": "Particulate Matter 2.5 (v7)",
						"36": "Formaldehyde CH2O-level (v7)",
						"37": "Radon Concentration (v7)",
						"38": "Methane Density CH4 (v7)",
						"39": "Volatile Organic Compound (v7)",
						"40": "Carbon Monoxide CO-level (v7)",
						"41": "Soil Humidity (v7)",
						"42": "Soil Reactivity (v7)",
						"43": "Soil Salinity (v7)",
						"44": "Heart Rate (v7)",
						"45": "Blood Pressure (v7)",
						"46": "Muscle Mass (v7)",
						"47": "Fat Mass (v7)",
						"48": "Bone Mass (v7)",
						"49": "Total Body Water, TBW (v7)",
						"50": "Basic Metabolic Rate, BMR (v7)",
						"51": "Body Mass Index, BMI (v7)",
						"52": "Acceleration X-axis (v8)",
						"53": "Acceleration Y-axis (v8)",
						"54": "Acceleration Z-axis (v8)",
						"55": "Smoke Density (v8)",
						"56": "Water Flow (v9)",
						"57": "Water Pressure (v9)",
						"58": "RF Signal Strength (v9)",
						"59": "Particulate Matter (v10)",
						"60": "Respiratory Rate (v10)",
						"61": "Relative Modulation level",
						"62": "Boiler water temperature",
						"63": "Domestic Hot Water temperature",
						"64": "Outside temperature",
						"65": "Exhaust temperature",
						"66": "Water Chlorine level",
						"67": "Water acidity",
						"68": "Water Oxidation reduction potential",
						"69": "Heart Rate LF/HF ratio"
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
			return packet.tryAs(SensorMultilevelV11)?.command === this.command;
		}

		constructor(data: Buffer | SensorMultilevelV11SensorMultilevelGetData) {
			super(SensorMultilevelGet, data);
		}
	};

	public static readonly SensorMultilevelReport = class SensorMultilevelReport extends CommandPacket<SensorMultilevelV11SensorMultilevelReportData> {
		public static readonly CommandClass = SensorMultilevelV11;
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
						"31": "Moisture (v5)",
						"32": "Frequency (v6)",
						"33": "Time (v6)",
						"34": "Target Temperature (v6)",
						"35": "Particulate Matter 2.5 (v7)",
						"36": "Formaldehyde CH2O-level (v7)",
						"37": "Radon Concentration (v7)",
						"38": "Methane Density CH4 (v7)",
						"39": "Volatile Organic Compound (v7)",
						"40": "Carbon Monoxide CO-level (v7)",
						"41": "Soil Humidity (v7)",
						"42": "Soil Reactivity (v7)",
						"43": "Soil Salinity (v7)",
						"44": "Heart Rate (v7)",
						"45": "Blood Pressure (v7)",
						"46": "Muscle Mass (v7)",
						"47": "Fat Mass (v7)",
						"48": "Bone Mass (v7)",
						"49": "Total Body Water, TBW (v7)",
						"50": "Basic Metabolic Rate, BMR (v7)",
						"51": "Body Mass Index, BMI (v7)",
						"52": "Acceleration X-axis (v8)",
						"53": "Acceleration Y-axis (v8)",
						"54": "Acceleration Z-axis (v8)",
						"55": "Smoke Density (v8)",
						"56": "Water Flow (v9)",
						"57": "Water Pressure (v9)",
						"58": "RF Signal Strength (v9)",
						"59": "Particulate Matter (v10)",
						"60": "Respiratory Rate (v10)",
						"61": "Relative Modulation level",
						"62": "Boiler water temperature",
						"63": "Domestic Hot Water temperature",
						"64": "Outside temperature",
						"65": "Exhaust temperature",
						"66": "Water Chlorine level",
						"67": "Water acidity",
						"68": "Water Oxidation reduction potential",
						"69": "Heart Rate LF/HF ratio"
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
			return packet.tryAs(SensorMultilevelV11)?.command === this.command;
		}

		constructor(data: Buffer | SensorMultilevelV11SensorMultilevelReportData) {
			super(SensorMultilevelReport, data);
		}
	};

	public static readonly SensorMultilevelSupportedGetSensor = class SensorMultilevelSupportedGetSensor extends CommandPacket<void> {
		public static readonly CommandClass = SensorMultilevelV11;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "SensorMultilevelSupportedGetSensor",
			"help": "Multilevel Sensor Get Supported Sensor",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SensorMultilevelV11)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SensorMultilevelSupportedGetSensor, data);
		}
	};

	public static readonly SensorMultilevelSupportedSensorReport = class SensorMultilevelSupportedSensorReport extends CommandPacket<SensorMultilevelV11SensorMultilevelSupportedSensorReportData> {
		public static readonly CommandClass = SensorMultilevelV11;
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
			return packet.tryAs(SensorMultilevelV11)?.command === this.command;
		}

		constructor(data: Buffer | SensorMultilevelV11SensorMultilevelSupportedSensorReportData) {
			super(SensorMultilevelSupportedSensorReport, data);
		}
	};

	public static readonly SensorMultilevelSupportedGetScale = class SensorMultilevelSupportedGetScale extends CommandPacket<SensorMultilevelV11SensorMultilevelSupportedGetScaleData> {
		public static readonly CommandClass = SensorMultilevelV11;
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
						"31": "Moisture (v5)",
						"32": "Frequency (v6)",
						"33": "Time (v6)",
						"34": "Target Temperature (v6)",
						"35": "Particulate Matter 2.5 (v7)",
						"36": "Formaldehyde CH2O-level (v7)",
						"37": "Radon Concentration (v7)",
						"38": "Methane Density CH4 (v7)",
						"39": "Volatile Organic Compound (v7)",
						"40": "Carbon Monoxide CO-level (v7)",
						"41": "Soil Humidity (v7)",
						"42": "Soil Reactivity (v7)",
						"43": "Soil Salinity (v7)",
						"44": "Heart Rate (v7)",
						"45": "Blood Pressure (v7)",
						"46": "Muscle Mass (v7)",
						"47": "Fat Mass (v7)",
						"48": "Bone Mass (v7)",
						"49": "Total Body Water, TBW (v7)",
						"50": "Basic Metabolic Rate, BMR (v7)",
						"51": "Body Mass Index, BMI (v7)",
						"52": "Acceleration X-axis (v8)",
						"53": "Acceleration Y-axis (v8)",
						"54": "Acceleration Z-axis (v8)",
						"55": "Smoke Density (v8)",
						"56": "Water Flow (v9)",
						"57": "Water Pressure (v9)",
						"58": "RF Signal Strength (v9)",
						"59": "Particulate Matter (v10)",
						"60": "Respiratory Rate (v10)",
						"61": "Relative Modulation level",
						"62": "Boiler water temperature",
						"63": "Domestic Hot Water temperature",
						"64": "Outside temperature",
						"65": "Exhaust temperature",
						"66": "Water Chlorine level",
						"67": "Water acidity",
						"68": "Water Oxidation reduction potential",
						"69": "Heart Rate LF/HF ratio"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SensorMultilevelV11)?.command === this.command;
		}

		constructor(data: Buffer | SensorMultilevelV11SensorMultilevelSupportedGetScaleData) {
			super(SensorMultilevelSupportedGetScale, data);
		}
	};

	public static readonly SensorMultilevelSupportedScaleReport = class SensorMultilevelSupportedScaleReport extends CommandPacket<SensorMultilevelV11SensorMultilevelSupportedScaleReportData> {
		public static readonly CommandClass = SensorMultilevelV11;
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
						"31": "Moisture (v5)",
						"32": "Frequency (v6)",
						"33": "Time (v6)",
						"34": "Target Temperature (v6)",
						"35": "Particulate Matter 2.5 (v7)",
						"36": "Formaldehyde CH2O-level (v7)",
						"37": "Radon Concentration (v7)",
						"38": "Methane Density CH4 (v7)",
						"39": "Volatile Organic Compound (v7)",
						"40": "Carbon Monoxide CO-level (v7)",
						"41": "Soil Humidity (v7)",
						"42": "Soil Reactivity (v7)",
						"43": "Soil Salinity (v7)",
						"44": "Heart Rate (v7)",
						"45": "Blood Pressure (v7)",
						"46": "Muscle Mass (v7)",
						"47": "Fat Mass (v7)",
						"48": "Bone Mass (v7)",
						"49": "Total Body Water, TBW (v7)",
						"50": "Basic Metabolic Rate, BMR (v7)",
						"51": "Body Mass Index, BMI (v7)",
						"52": "Acceleration X-axis (v8)",
						"53": "Acceleration Y-axis (v8)",
						"54": "Acceleration Z-axis (v8)",
						"55": "Smoke Density (v8)",
						"56": "Water Flow (v9)",
						"57": "Water Pressure (v9)",
						"58": "RF Signal Strength (v9)",
						"59": "Particulate Matter (v10)",
						"60": "Respiratory Rate (v10)",
						"61": "Relative Modulation level",
						"62": "Boiler water temperature",
						"63": "Domestic Hot Water temperature",
						"64": "Outside temperature",
						"65": "Exhaust temperature",
						"66": "Water Chlorine level",
						"67": "Water acidity",
						"68": "Water Oxidation reduction potential",
						"69": "Heart Rate LF/HF ratio"
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
			return packet.tryAs(SensorMultilevelV11)?.command === this.command;
		}

		constructor(data: Buffer | SensorMultilevelV11SensorMultilevelSupportedScaleReportData) {
			super(SensorMultilevelSupportedScaleReport, data);
		}
	};
}

export namespace SensorMultilevelV11 {
	export type SensorMultilevelGet = InstanceType<typeof SensorMultilevelV11.SensorMultilevelGet>;
	export type SensorMultilevelReport = InstanceType<typeof SensorMultilevelV11.SensorMultilevelReport>;
	export type SensorMultilevelSupportedGetSensor = InstanceType<typeof SensorMultilevelV11.SensorMultilevelSupportedGetSensor>;
	export type SensorMultilevelSupportedSensorReport = InstanceType<typeof SensorMultilevelV11.SensorMultilevelSupportedSensorReport>;
	export type SensorMultilevelSupportedGetScale = InstanceType<typeof SensorMultilevelV11.SensorMultilevelSupportedGetScale>;
	export type SensorMultilevelSupportedScaleReport = InstanceType<typeof SensorMultilevelV11.SensorMultilevelSupportedScaleReport>;
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
	FrequencyV6 = 0x20,
	TimeV6 = 0x21,
	TargetTemperatureV6 = 0x22,
	ParticulateMatter25V7 = 0x23,
	FormaldehydeCH2OLevelV7 = 0x24,
	RadonConcentrationV7 = 0x25,
	MethaneDensityCH4V7 = 0x26,
	VolatileOrganicCompoundV7 = 0x27,
	CarbonMonoxideCOLevelV7 = 0x28,
	SoilHumidityV7 = 0x29,
	SoilReactivityV7 = 0x2a,
	SoilSalinityV7 = 0x2b,
	HeartRateV7 = 0x2c,
	BloodPressureV7 = 0x2d,
	MuscleMassV7 = 0x2e,
	FatMassV7 = 0x2f,
	BoneMassV7 = 0x30,
	TotalBodyWaterTBWV7 = 0x31,
	BasicMetabolicRateBMRV7 = 0x32,
	BodyMassIndexBMIV7 = 0x33,
	AccelerationXAxisV8 = 0x34,
	AccelerationYAxisV8 = 0x35,
	AccelerationZAxisV8 = 0x36,
	SmokeDensityV8 = 0x37,
	WaterFlowV9 = 0x38,
	WaterPressureV9 = 0x39,
	RFSignalStrengthV9 = 0x3a,
	ParticulateMatterV10 = 0x3b,
	RespiratoryRateV10 = 0x3c,
	RelativeModulationLevel = 0x3d,
	BoilerWaterTemperature = 0x3e,
	DomesticHotWaterTemperature = 0x3f,
	OutsideTemperature = 0x40,
	ExhaustTemperature = 0x41,
	WaterChlorineLevel = 0x42,
	WaterAcidity = 0x43,
	WaterOxidationReductionPotential = 0x44,
	HeartRateLFHFRatio = 0x45,
}
