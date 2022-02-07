/**
 * Command Class Sensor Multilevel, version 11.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	scale: number; // properties1[4..3]
}

export interface SensorMultilevelV11SensorMultilevelReportData {
	sensorType: SensorTypeEnum; // 1 byte enum value
	precision: number; // level[7..5]
	scale: number; // level[4..3]
	sensorValue: Buffer; // variable length
}

export interface SensorMultilevelV11SensorMultilevelSupportedSensorReportData {
	bitMask: Set<BitMaskEnum>; // automatic length
}

export interface SensorMultilevelV11SensorMultilevelSupportedGetScaleData {
	sensorType: SensorTypeEnum; // 1 byte enum value
}

export interface SensorMultilevelV11SensorMultilevelSupportedScaleReportData {
	sensorType: SensorTypeEnum; // 1 byte enum value
	scaleBitMask: number; // properties1[3..0]
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

export enum BitMaskEnum {
	AirTemperature = 0x1,
	GeneralPurposeValue = 0x2,
	Luminance = 0x3,
	Power = 0x4,
	Humidity = 0x5,
	Velocity = 0x6,
	Direction = 0x7,
	AtmosphericPressure = 0x8,
	BarometricPressure = 0x9,
	SolarRadiation = 0xa,
	DewPoint = 0xb,
	RainRate = 0xc,
	TideLevel = 0xd,
	Weight = 0xe,
	Voltage = 0xf,
	Current = 0x10,
	CO2Level = 0x11,
	AirFlow = 0x12,
	TankCapacity = 0x13,
	Distance = 0x14,
	AnglePosition = 0x15,
	Rotation = 0x16,
	WaterTemperature = 0x17,
	SoilTemperature = 0x18,
	SeismicIntensity = 0x19,
	SeismicMagnitude = 0x1a,
	Ultraviolet = 0x1b,
	ElectricalResistivity = 0x1c,
	ElectricalConductivity = 0x1d,
	Loudness = 0x1e,
	Moisture = 0x1f,
	Frequency = 0x20,
	Time = 0x21,
	TargetTemperature = 0x22,
	ParticulateMatter25 = 0x23,
	FormaldehydeCH2OLevel = 0x24,
	RadonConcentration = 0x25,
	MethaneDensityCH4 = 0x26,
	VolatileOrganicCompound = 0x27,
	CarbonMonoxideCOLevel = 0x28,
	SoilHumidity = 0x29,
	SoilReactivity = 0x2a,
	SoilSalinity = 0x2b,
	HeartRate = 0x2c,
	BloodPressure = 0x2d,
	MuscleMass = 0x2e,
	FatMass = 0x2f,
	BoneMass = 0x30,
	TotalBodyWaterTBW = 0x31,
	BasicMetabolicRateBMR = 0x32,
	BodyMassIndexBMI = 0x33,
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
}

export class SensorMultilevelV11 extends CommandClassPacket<SensorMultilevelV11Commands> {
	public static readonly commandClass = CommandClasses.SensorMultilevel; // 0x31 (49)
	public static readonly version = 11;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(SensorMultilevelV11, commandAndPayload);
	}
}

export class SensorMultilevelGet extends CommandPacket<SensorMultilevelV11SensorMultilevelGetData> {
	public static readonly CommandClass = SensorMultilevelV11;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
		"command": 4,
		"name": "SensorMultilevelGet",
		"help": "Multilevel Sensor Get",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
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
					},
					"22": {
						"name": "RotationV5",
						"help": "Rotation (v5)"
					},
					"23": {
						"name": "WaterTemperatureV5",
						"help": "Water temperature (v5)"
					},
					"24": {
						"name": "SoilTemperatureV5",
						"help": "Soil temperature (v5)"
					},
					"25": {
						"name": "SeismicIntensityV5",
						"help": "Seismic intensity (v5)"
					},
					"26": {
						"name": "SeismicMagnitudeV5",
						"help": "Seismic magnitude (v5)"
					},
					"27": {
						"name": "UltravioletV5",
						"help": "Ultraviolet (v5)"
					},
					"28": {
						"name": "ElectricalResistivityV5",
						"help": "Electrical resistivity (v5)"
					},
					"29": {
						"name": "ElectricalConductivityV5",
						"help": "Electrical conductivity (v5)"
					},
					"30": {
						"name": "LoudnessV5",
						"help": "Loudness (v5)"
					},
					"31": {
						"name": "MoistureV5",
						"help": "Moisture (v5)"
					},
					"32": {
						"name": "FrequencyV6",
						"help": "Frequency (v6)"
					},
					"33": {
						"name": "TimeV6",
						"help": "Time (v6)"
					},
					"34": {
						"name": "TargetTemperatureV6",
						"help": "Target Temperature (v6)"
					},
					"35": {
						"name": "ParticulateMatter25V7",
						"help": "Particulate Matter 2.5 (v7)"
					},
					"36": {
						"name": "FormaldehydeCH2OLevelV7",
						"help": "Formaldehyde CH2O-level (v7)"
					},
					"37": {
						"name": "RadonConcentrationV7",
						"help": "Radon Concentration (v7)"
					},
					"38": {
						"name": "MethaneDensityCH4V7",
						"help": "Methane Density CH4 (v7)"
					},
					"39": {
						"name": "VolatileOrganicCompoundV7",
						"help": "Volatile Organic Compound (v7)"
					},
					"40": {
						"name": "CarbonMonoxideCOLevelV7",
						"help": "Carbon Monoxide CO-level (v7)"
					},
					"41": {
						"name": "SoilHumidityV7",
						"help": "Soil Humidity (v7)"
					},
					"42": {
						"name": "SoilReactivityV7",
						"help": "Soil Reactivity (v7)"
					},
					"43": {
						"name": "SoilSalinityV7",
						"help": "Soil Salinity (v7)"
					},
					"44": {
						"name": "HeartRateV7",
						"help": "Heart Rate (v7)"
					},
					"45": {
						"name": "BloodPressureV7",
						"help": "Blood Pressure (v7)"
					},
					"46": {
						"name": "MuscleMassV7",
						"help": "Muscle Mass (v7)"
					},
					"47": {
						"name": "FatMassV7",
						"help": "Fat Mass (v7)"
					},
					"48": {
						"name": "BoneMassV7",
						"help": "Bone Mass (v7)"
					},
					"49": {
						"name": "TotalBodyWaterTBWV7",
						"help": "Total Body Water, TBW (v7)"
					},
					"50": {
						"name": "BasicMetabolicRateBMRV7",
						"help": "Basic Metabolic Rate, BMR (v7)"
					},
					"51": {
						"name": "BodyMassIndexBMIV7",
						"help": "Body Mass Index, BMI (v7)"
					},
					"52": {
						"name": "AccelerationXAxisV8",
						"help": "Acceleration X-axis (v8)"
					},
					"53": {
						"name": "AccelerationYAxisV8",
						"help": "Acceleration Y-axis (v8)"
					},
					"54": {
						"name": "AccelerationZAxisV8",
						"help": "Acceleration Z-axis (v8)"
					},
					"55": {
						"name": "SmokeDensityV8",
						"help": "Smoke Density (v8)"
					},
					"56": {
						"name": "WaterFlowV9",
						"help": "Water Flow (v9)"
					},
					"57": {
						"name": "WaterPressureV9",
						"help": "Water Pressure (v9)"
					},
					"58": {
						"name": "RFSignalStrengthV9",
						"help": "RF Signal Strength (v9)"
					},
					"59": {
						"name": "ParticulateMatterV10",
						"help": "Particulate Matter (v10)"
					},
					"60": {
						"name": "RespiratoryRateV10",
						"help": "Respiratory Rate (v10)"
					},
					"61": {
						"name": "RelativeModulationLevel",
						"help": "Relative Modulation level"
					},
					"62": {
						"name": "BoilerWaterTemperature",
						"help": "Boiler water temperature"
					},
					"63": {
						"name": "DomesticHotWaterTemperature",
						"help": "Domestic Hot Water temperature"
					},
					"64": {
						"name": "OutsideTemperature",
						"help": "Outside temperature"
					},
					"65": {
						"name": "ExhaustTemperature",
						"help": "Exhaust temperature"
					},
					"66": {
						"name": "WaterChlorineLevel",
						"help": "Water Chlorine level"
					},
					"67": {
						"name": "WaterAcidity",
						"help": "Water acidity"
					},
					"68": {
						"name": "WaterOxidationReductionPotential",
						"help": "Water Oxidation reduction potential"
					},
					"69": {
						"name": "HeartRateLFHFRatio",
						"help": "Heart Rate LF/HF ratio"
					}
				}
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved2",
						"mask": 224,
						"shift": 5,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "scale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "reserved1",
						"mask": 7,
						"shift": 0,
						"reserved": true
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SensorMultilevelV11)?.command === this.command;
	}

	public constructor(data: Buffer | SensorMultilevelV11SensorMultilevelGetData) {
		super(SensorMultilevelGet, data);
	}
};

export class SensorMultilevelReport extends CommandPacket<SensorMultilevelV11SensorMultilevelReportData> {
	public static readonly CommandClass = SensorMultilevelV11;
	public static readonly command = 0x05; // 5
	public static readonly definition = convertFromJsonCommand({
		"command": 5,
		"name": "SensorMultilevelReport",
		"help": "Multilevel Sensor Report",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
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
					},
					"22": {
						"name": "RotationV5",
						"help": "Rotation (v5)"
					},
					"23": {
						"name": "WaterTemperatureV5",
						"help": "Water temperature (v5)"
					},
					"24": {
						"name": "SoilTemperatureV5",
						"help": "Soil temperature (v5)"
					},
					"25": {
						"name": "SeismicIntensityV5",
						"help": "Seismic intensity (v5)"
					},
					"26": {
						"name": "SeismicMagnitudeV5",
						"help": "Seismic magnitude (v5)"
					},
					"27": {
						"name": "UltravioletV5",
						"help": "Ultraviolet (v5)"
					},
					"28": {
						"name": "ElectricalResistivityV5",
						"help": "Electrical resistivity (v5)"
					},
					"29": {
						"name": "ElectricalConductivityV5",
						"help": "Electrical conductivity (v5)"
					},
					"30": {
						"name": "LoudnessV5",
						"help": "Loudness (v5)"
					},
					"31": {
						"name": "MoistureV5",
						"help": "Moisture (v5)"
					},
					"32": {
						"name": "FrequencyV6",
						"help": "Frequency (v6)"
					},
					"33": {
						"name": "TimeV6",
						"help": "Time (v6)"
					},
					"34": {
						"name": "TargetTemperatureV6",
						"help": "Target Temperature (v6)"
					},
					"35": {
						"name": "ParticulateMatter25V7",
						"help": "Particulate Matter 2.5 (v7)"
					},
					"36": {
						"name": "FormaldehydeCH2OLevelV7",
						"help": "Formaldehyde CH2O-level (v7)"
					},
					"37": {
						"name": "RadonConcentrationV7",
						"help": "Radon Concentration (v7)"
					},
					"38": {
						"name": "MethaneDensityCH4V7",
						"help": "Methane Density CH4 (v7)"
					},
					"39": {
						"name": "VolatileOrganicCompoundV7",
						"help": "Volatile Organic Compound (v7)"
					},
					"40": {
						"name": "CarbonMonoxideCOLevelV7",
						"help": "Carbon Monoxide CO-level (v7)"
					},
					"41": {
						"name": "SoilHumidityV7",
						"help": "Soil Humidity (v7)"
					},
					"42": {
						"name": "SoilReactivityV7",
						"help": "Soil Reactivity (v7)"
					},
					"43": {
						"name": "SoilSalinityV7",
						"help": "Soil Salinity (v7)"
					},
					"44": {
						"name": "HeartRateV7",
						"help": "Heart Rate (v7)"
					},
					"45": {
						"name": "BloodPressureV7",
						"help": "Blood Pressure (v7)"
					},
					"46": {
						"name": "MuscleMassV7",
						"help": "Muscle Mass (v7)"
					},
					"47": {
						"name": "FatMassV7",
						"help": "Fat Mass (v7)"
					},
					"48": {
						"name": "BoneMassV7",
						"help": "Bone Mass (v7)"
					},
					"49": {
						"name": "TotalBodyWaterTBWV7",
						"help": "Total Body Water, TBW (v7)"
					},
					"50": {
						"name": "BasicMetabolicRateBMRV7",
						"help": "Basic Metabolic Rate, BMR (v7)"
					},
					"51": {
						"name": "BodyMassIndexBMIV7",
						"help": "Body Mass Index, BMI (v7)"
					},
					"52": {
						"name": "AccelerationXAxisV8",
						"help": "Acceleration X-axis (v8)"
					},
					"53": {
						"name": "AccelerationYAxisV8",
						"help": "Acceleration Y-axis (v8)"
					},
					"54": {
						"name": "AccelerationZAxisV8",
						"help": "Acceleration Z-axis (v8)"
					},
					"55": {
						"name": "SmokeDensityV8",
						"help": "Smoke Density (v8)"
					},
					"56": {
						"name": "WaterFlowV9",
						"help": "Water Flow (v9)"
					},
					"57": {
						"name": "WaterPressureV9",
						"help": "Water Pressure (v9)"
					},
					"58": {
						"name": "RFSignalStrengthV9",
						"help": "RF Signal Strength (v9)"
					},
					"59": {
						"name": "ParticulateMatterV10",
						"help": "Particulate Matter (v10)"
					},
					"60": {
						"name": "RespiratoryRateV10",
						"help": "Respiratory Rate (v10)"
					},
					"61": {
						"name": "RelativeModulationLevel",
						"help": "Relative Modulation level"
					},
					"62": {
						"name": "BoilerWaterTemperature",
						"help": "Boiler water temperature"
					},
					"63": {
						"name": "DomesticHotWaterTemperature",
						"help": "Domestic Hot Water temperature"
					},
					"64": {
						"name": "OutsideTemperature",
						"help": "Outside temperature"
					},
					"65": {
						"name": "ExhaustTemperature",
						"help": "Exhaust temperature"
					},
					"66": {
						"name": "WaterChlorineLevel",
						"help": "Water Chlorine level"
					},
					"67": {
						"name": "WaterAcidity",
						"help": "Water acidity"
					},
					"68": {
						"name": "WaterOxidationReductionPotential",
						"help": "Water Oxidation reduction potential"
					},
					"69": {
						"name": "HeartRateLFHFRatio",
						"help": "Heart Rate LF/HF ratio"
					}
				}
			},
			{
				"type": "Bitfield",
				"name": "level",
				"help": "Level",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "precision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "scale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "size",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"sensorValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "sensorValue",
				"help": "Sensor Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "level.size"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SensorMultilevelV11)?.command === this.command;
	}

	public constructor(data: Buffer | SensorMultilevelV11SensorMultilevelReportData) {
		super(SensorMultilevelReport, data);
	}
};

export class SensorMultilevelSupportedGetSensor extends CommandPacket<void> {
	public static readonly CommandClass = SensorMultilevelV11;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "SensorMultilevelSupportedGetSensor",
		"help": "Multilevel Sensor Get Supported Sensor",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SensorMultilevelV11)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(SensorMultilevelSupportedGetSensor, data);
	}
};

export class SensorMultilevelSupportedSensorReport extends CommandPacket<SensorMultilevelV11SensorMultilevelSupportedSensorReportData> {
	public static readonly CommandClass = SensorMultilevelV11;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "SensorMultilevelSupportedSensorReport",
		"help": "Multilevel Sensor Supported Sensor Report",
		"status": "Active",
		"params": [
			{
				"type": "Bitmask",
				"name": "bitMask",
				"help": "Bit Mask",
				"length": {
					"lengthType": "Auto"
				},
				"values": {
					"1": {
						"name": "AirTemperature",
						"help": "Air temperature"
					},
					"2": {
						"name": "GeneralPurposeValue",
						"help": "General purpose value"
					},
					"3": {
						"name": "Luminance",
						"help": "Luminance"
					},
					"4": {
						"name": "Power",
						"help": "Power"
					},
					"5": {
						"name": "Humidity",
						"help": "Humidity"
					},
					"6": {
						"name": "Velocity",
						"help": "Velocity"
					},
					"7": {
						"name": "Direction",
						"help": "Direction"
					},
					"8": {
						"name": "AtmosphericPressure",
						"help": "Atmospheric pressure"
					},
					"9": {
						"name": "BarometricPressure",
						"help": "Barometric pressure"
					},
					"10": {
						"name": "SolarRadiation",
						"help": "Solar radiation"
					},
					"11": {
						"name": "DewPoint",
						"help": "Dew point"
					},
					"12": {
						"name": "RainRate",
						"help": "Rain rate"
					},
					"13": {
						"name": "TideLevel",
						"help": "Tide level"
					},
					"14": {
						"name": "Weight",
						"help": "Weight"
					},
					"15": {
						"name": "Voltage",
						"help": "Voltage"
					},
					"16": {
						"name": "Current",
						"help": "Current"
					},
					"17": {
						"name": "CO2Level",
						"help": "CO2-level"
					},
					"18": {
						"name": "AirFlow",
						"help": "Air flow"
					},
					"19": {
						"name": "TankCapacity",
						"help": "Tank capacity"
					},
					"20": {
						"name": "Distance",
						"help": "Distance"
					},
					"21": {
						"name": "AnglePosition",
						"help": "Angle Position"
					},
					"22": {
						"name": "Rotation",
						"help": "Rotation"
					},
					"23": {
						"name": "WaterTemperature",
						"help": "Water temperature"
					},
					"24": {
						"name": "SoilTemperature",
						"help": "Soil temperature"
					},
					"25": {
						"name": "SeismicIntensity",
						"help": "Seismic intensity"
					},
					"26": {
						"name": "SeismicMagnitude",
						"help": "Seismic magnitude"
					},
					"27": {
						"name": "Ultraviolet",
						"help": "Ultraviolet"
					},
					"28": {
						"name": "ElectricalResistivity",
						"help": "Electrical resistivity"
					},
					"29": {
						"name": "ElectricalConductivity",
						"help": "Electrical conductivity"
					},
					"30": {
						"name": "Loudness",
						"help": "Loudness"
					},
					"31": {
						"name": "Moisture",
						"help": "Moisture"
					},
					"32": {
						"name": "Frequency",
						"help": "Frequency"
					},
					"33": {
						"name": "Time",
						"help": "Time"
					},
					"34": {
						"name": "TargetTemperature",
						"help": "Target Temperature"
					},
					"35": {
						"name": "ParticulateMatter25",
						"help": "Particulate Matter 2.5"
					},
					"36": {
						"name": "FormaldehydeCH2OLevel",
						"help": "Formaldehyde CH2O-level"
					},
					"37": {
						"name": "RadonConcentration",
						"help": "Radon Concentration"
					},
					"38": {
						"name": "MethaneDensityCH4",
						"help": "Methane Density CH4"
					},
					"39": {
						"name": "VolatileOrganicCompound",
						"help": "Volatile Organic Compound"
					},
					"40": {
						"name": "CarbonMonoxideCOLevel",
						"help": "Carbon Monoxide CO-level"
					},
					"41": {
						"name": "SoilHumidity",
						"help": "Soil Humidity"
					},
					"42": {
						"name": "SoilReactivity",
						"help": "Soil Reactivity"
					},
					"43": {
						"name": "SoilSalinity",
						"help": "Soil Salinity"
					},
					"44": {
						"name": "HeartRate",
						"help": "Heart Rate"
					},
					"45": {
						"name": "BloodPressure",
						"help": "Blood Pressure"
					},
					"46": {
						"name": "MuscleMass",
						"help": "Muscle Mass"
					},
					"47": {
						"name": "FatMass",
						"help": "Fat Mass"
					},
					"48": {
						"name": "BoneMass",
						"help": "Bone Mass"
					},
					"49": {
						"name": "TotalBodyWaterTBW",
						"help": "Total Body Water, TBW"
					},
					"50": {
						"name": "BasicMetabolicRateBMR",
						"help": "Basic Metabolic Rate, BMR"
					},
					"51": {
						"name": "BodyMassIndexBMI",
						"help": "Body Mass Index, BMI"
					},
					"52": {
						"name": "AccelerationXAxisV8",
						"help": "Acceleration X-axis (v8)"
					},
					"53": {
						"name": "AccelerationYAxisV8",
						"help": "Acceleration Y-axis (v8)"
					},
					"54": {
						"name": "AccelerationZAxisV8",
						"help": "Acceleration Z-axis (v8)"
					},
					"55": {
						"name": "SmokeDensityV8",
						"help": "Smoke Density (v8)"
					},
					"56": {
						"name": "WaterFlowV9",
						"help": "Water Flow (v9)"
					},
					"57": {
						"name": "WaterPressureV9",
						"help": "Water Pressure (v9)"
					},
					"58": {
						"name": "RFSignalStrengthV9",
						"help": "RF Signal Strength (v9)"
					},
					"59": {
						"name": "ParticulateMatterV10",
						"help": "Particulate Matter (v10)"
					},
					"60": {
						"name": "RespiratoryRateV10",
						"help": "Respiratory Rate (v10)"
					},
					"61": {
						"name": "RelativeModulationLevel",
						"help": "Relative Modulation level"
					},
					"62": {
						"name": "BoilerWaterTemperature",
						"help": "Boiler water temperature"
					},
					"63": {
						"name": "DomesticHotWaterTemperature",
						"help": "Domestic Hot Water temperature"
					},
					"64": {
						"name": "OutsideTemperature",
						"help": "Outside temperature"
					},
					"65": {
						"name": "ExhaustTemperature",
						"help": "Exhaust temperature"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SensorMultilevelV11)?.command === this.command;
	}

	public constructor(data: Buffer | SensorMultilevelV11SensorMultilevelSupportedSensorReportData) {
		super(SensorMultilevelSupportedSensorReport, data);
	}
};

export class SensorMultilevelSupportedGetScale extends CommandPacket<SensorMultilevelV11SensorMultilevelSupportedGetScaleData> {
	public static readonly CommandClass = SensorMultilevelV11;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "SensorMultilevelSupportedGetScale",
		"help": "Multilevel Sensor Get Supported Scale",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
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
					},
					"22": {
						"name": "RotationV5",
						"help": "Rotation (v5)"
					},
					"23": {
						"name": "WaterTemperatureV5",
						"help": "Water temperature (v5)"
					},
					"24": {
						"name": "SoilTemperatureV5",
						"help": "Soil temperature (v5)"
					},
					"25": {
						"name": "SeismicIntensityV5",
						"help": "Seismic intensity (v5)"
					},
					"26": {
						"name": "SeismicMagnitudeV5",
						"help": "Seismic magnitude (v5)"
					},
					"27": {
						"name": "UltravioletV5",
						"help": "Ultraviolet (v5)"
					},
					"28": {
						"name": "ElectricalResistivityV5",
						"help": "Electrical resistivity (v5)"
					},
					"29": {
						"name": "ElectricalConductivityV5",
						"help": "Electrical conductivity (v5)"
					},
					"30": {
						"name": "LoudnessV5",
						"help": "Loudness (v5)"
					},
					"31": {
						"name": "MoistureV5",
						"help": "Moisture (v5)"
					},
					"32": {
						"name": "FrequencyV6",
						"help": "Frequency (v6)"
					},
					"33": {
						"name": "TimeV6",
						"help": "Time (v6)"
					},
					"34": {
						"name": "TargetTemperatureV6",
						"help": "Target Temperature (v6)"
					},
					"35": {
						"name": "ParticulateMatter25V7",
						"help": "Particulate Matter 2.5 (v7)"
					},
					"36": {
						"name": "FormaldehydeCH2OLevelV7",
						"help": "Formaldehyde CH2O-level (v7)"
					},
					"37": {
						"name": "RadonConcentrationV7",
						"help": "Radon Concentration (v7)"
					},
					"38": {
						"name": "MethaneDensityCH4V7",
						"help": "Methane Density CH4 (v7)"
					},
					"39": {
						"name": "VolatileOrganicCompoundV7",
						"help": "Volatile Organic Compound (v7)"
					},
					"40": {
						"name": "CarbonMonoxideCOLevelV7",
						"help": "Carbon Monoxide CO-level (v7)"
					},
					"41": {
						"name": "SoilHumidityV7",
						"help": "Soil Humidity (v7)"
					},
					"42": {
						"name": "SoilReactivityV7",
						"help": "Soil Reactivity (v7)"
					},
					"43": {
						"name": "SoilSalinityV7",
						"help": "Soil Salinity (v7)"
					},
					"44": {
						"name": "HeartRateV7",
						"help": "Heart Rate (v7)"
					},
					"45": {
						"name": "BloodPressureV7",
						"help": "Blood Pressure (v7)"
					},
					"46": {
						"name": "MuscleMassV7",
						"help": "Muscle Mass (v7)"
					},
					"47": {
						"name": "FatMassV7",
						"help": "Fat Mass (v7)"
					},
					"48": {
						"name": "BoneMassV7",
						"help": "Bone Mass (v7)"
					},
					"49": {
						"name": "TotalBodyWaterTBWV7",
						"help": "Total Body Water, TBW (v7)"
					},
					"50": {
						"name": "BasicMetabolicRateBMRV7",
						"help": "Basic Metabolic Rate, BMR (v7)"
					},
					"51": {
						"name": "BodyMassIndexBMIV7",
						"help": "Body Mass Index, BMI (v7)"
					},
					"52": {
						"name": "AccelerationXAxisV8",
						"help": "Acceleration X-axis (v8)"
					},
					"53": {
						"name": "AccelerationYAxisV8",
						"help": "Acceleration Y-axis (v8)"
					},
					"54": {
						"name": "AccelerationZAxisV8",
						"help": "Acceleration Z-axis (v8)"
					},
					"55": {
						"name": "SmokeDensityV8",
						"help": "Smoke Density (v8)"
					},
					"56": {
						"name": "WaterFlowV9",
						"help": "Water Flow (v9)"
					},
					"57": {
						"name": "WaterPressureV9",
						"help": "Water Pressure (v9)"
					},
					"58": {
						"name": "RFSignalStrengthV9",
						"help": "RF Signal Strength (v9)"
					},
					"59": {
						"name": "ParticulateMatterV10",
						"help": "Particulate Matter (v10)"
					},
					"60": {
						"name": "RespiratoryRateV10",
						"help": "Respiratory Rate (v10)"
					},
					"61": {
						"name": "RelativeModulationLevel",
						"help": "Relative Modulation level"
					},
					"62": {
						"name": "BoilerWaterTemperature",
						"help": "Boiler water temperature"
					},
					"63": {
						"name": "DomesticHotWaterTemperature",
						"help": "Domestic Hot Water temperature"
					},
					"64": {
						"name": "OutsideTemperature",
						"help": "Outside temperature"
					},
					"65": {
						"name": "ExhaustTemperature",
						"help": "Exhaust temperature"
					},
					"66": {
						"name": "WaterChlorineLevel",
						"help": "Water Chlorine level"
					},
					"67": {
						"name": "WaterAcidity",
						"help": "Water acidity"
					},
					"68": {
						"name": "WaterOxidationReductionPotential",
						"help": "Water Oxidation reduction potential"
					},
					"69": {
						"name": "HeartRateLFHFRatio",
						"help": "Heart Rate LF/HF ratio"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SensorMultilevelV11)?.command === this.command;
	}

	public constructor(data: Buffer | SensorMultilevelV11SensorMultilevelSupportedGetScaleData) {
		super(SensorMultilevelSupportedGetScale, data);
	}
};

export class SensorMultilevelSupportedScaleReport extends CommandPacket<SensorMultilevelV11SensorMultilevelSupportedScaleReportData> {
	public static readonly CommandClass = SensorMultilevelV11;
	public static readonly command = 0x06; // 6
	public static readonly definition = convertFromJsonCommand({
		"command": 6,
		"name": "SensorMultilevelSupportedScaleReport",
		"help": "Multilevel Sensor Supported Scale Report",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
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
					},
					"22": {
						"name": "RotationV5",
						"help": "Rotation (v5)"
					},
					"23": {
						"name": "WaterTemperatureV5",
						"help": "Water temperature (v5)"
					},
					"24": {
						"name": "SoilTemperatureV5",
						"help": "Soil temperature (v5)"
					},
					"25": {
						"name": "SeismicIntensityV5",
						"help": "Seismic intensity (v5)"
					},
					"26": {
						"name": "SeismicMagnitudeV5",
						"help": "Seismic magnitude (v5)"
					},
					"27": {
						"name": "UltravioletV5",
						"help": "Ultraviolet (v5)"
					},
					"28": {
						"name": "ElectricalResistivityV5",
						"help": "Electrical resistivity (v5)"
					},
					"29": {
						"name": "ElectricalConductivityV5",
						"help": "Electrical conductivity (v5)"
					},
					"30": {
						"name": "LoudnessV5",
						"help": "Loudness (v5)"
					},
					"31": {
						"name": "MoistureV5",
						"help": "Moisture (v5)"
					},
					"32": {
						"name": "FrequencyV6",
						"help": "Frequency (v6)"
					},
					"33": {
						"name": "TimeV6",
						"help": "Time (v6)"
					},
					"34": {
						"name": "TargetTemperatureV6",
						"help": "Target Temperature (v6)"
					},
					"35": {
						"name": "ParticulateMatter25V7",
						"help": "Particulate Matter 2.5 (v7)"
					},
					"36": {
						"name": "FormaldehydeCH2OLevelV7",
						"help": "Formaldehyde CH2O-level (v7)"
					},
					"37": {
						"name": "RadonConcentrationV7",
						"help": "Radon Concentration (v7)"
					},
					"38": {
						"name": "MethaneDensityCH4V7",
						"help": "Methane Density CH4 (v7)"
					},
					"39": {
						"name": "VolatileOrganicCompoundV7",
						"help": "Volatile Organic Compound (v7)"
					},
					"40": {
						"name": "CarbonMonoxideCOLevelV7",
						"help": "Carbon Monoxide CO-level (v7)"
					},
					"41": {
						"name": "SoilHumidityV7",
						"help": "Soil Humidity (v7)"
					},
					"42": {
						"name": "SoilReactivityV7",
						"help": "Soil Reactivity (v7)"
					},
					"43": {
						"name": "SoilSalinityV7",
						"help": "Soil Salinity (v7)"
					},
					"44": {
						"name": "HeartRateV7",
						"help": "Heart Rate (v7)"
					},
					"45": {
						"name": "BloodPressureV7",
						"help": "Blood Pressure (v7)"
					},
					"46": {
						"name": "MuscleMassV7",
						"help": "Muscle Mass (v7)"
					},
					"47": {
						"name": "FatMassV7",
						"help": "Fat Mass (v7)"
					},
					"48": {
						"name": "BoneMassV7",
						"help": "Bone Mass (v7)"
					},
					"49": {
						"name": "TotalBodyWaterTBWV7",
						"help": "Total Body Water, TBW (v7)"
					},
					"50": {
						"name": "BasicMetabolicRateBMRV7",
						"help": "Basic Metabolic Rate, BMR (v7)"
					},
					"51": {
						"name": "BodyMassIndexBMIV7",
						"help": "Body Mass Index, BMI (v7)"
					},
					"52": {
						"name": "AccelerationXAxisV8",
						"help": "Acceleration X-axis (v8)"
					},
					"53": {
						"name": "AccelerationYAxisV8",
						"help": "Acceleration Y-axis (v8)"
					},
					"54": {
						"name": "AccelerationZAxisV8",
						"help": "Acceleration Z-axis (v8)"
					},
					"55": {
						"name": "SmokeDensityV8",
						"help": "Smoke Density (v8)"
					},
					"56": {
						"name": "WaterFlowV9",
						"help": "Water Flow (v9)"
					},
					"57": {
						"name": "WaterPressureV9",
						"help": "Water Pressure (v9)"
					},
					"58": {
						"name": "RFSignalStrengthV9",
						"help": "RF Signal Strength (v9)"
					},
					"59": {
						"name": "ParticulateMatterV10",
						"help": "Particulate Matter (v10)"
					},
					"60": {
						"name": "RespiratoryRateV10",
						"help": "Respiratory Rate (v10)"
					},
					"61": {
						"name": "RelativeModulationLevel",
						"help": "Relative Modulation level"
					},
					"62": {
						"name": "BoilerWaterTemperature",
						"help": "Boiler water temperature"
					},
					"63": {
						"name": "DomesticHotWaterTemperature",
						"help": "Domestic Hot Water temperature"
					},
					"64": {
						"name": "OutsideTemperature",
						"help": "Outside temperature"
					},
					"65": {
						"name": "ExhaustTemperature",
						"help": "Exhaust temperature"
					},
					"66": {
						"name": "WaterChlorineLevel",
						"help": "Water Chlorine level"
					},
					"67": {
						"name": "WaterAcidity",
						"help": "Water acidity"
					},
					"68": {
						"name": "WaterOxidationReductionPotential",
						"help": "Water Oxidation reduction potential"
					},
					"69": {
						"name": "HeartRateLFHFRatio",
						"help": "Heart Rate LF/HF ratio"
					}
				}
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 240,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "scaleBitMask",
						"mask": 15,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SensorMultilevelV11)?.command === this.command;
	}

	public constructor(data: Buffer | SensorMultilevelV11SensorMultilevelSupportedScaleReportData) {
		super(SensorMultilevelSupportedScaleReport, data);
	}
};
