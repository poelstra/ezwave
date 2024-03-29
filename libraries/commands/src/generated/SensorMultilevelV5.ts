/**
 * Command Class Sensor Multilevel, version 5.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	scale: number; // properties1[4..3]
}

export interface SensorMultilevelV5SensorMultilevelReportData {
	sensorType: SensorTypeEnum; // 1 byte enum value
	precision: number; // level[7..5]
	scale: number; // level[4..3]
	sensorValue: Buffer; // variable length
}

export interface SensorMultilevelV5SensorMultilevelSupportedSensorReportData {
	bitMask: Set<BitMaskEnum>; // automatic length
}

export interface SensorMultilevelV5SensorMultilevelSupportedGetScaleData {
	sensorType: SensorTypeEnum; // 1 byte enum value
}

export interface SensorMultilevelV5SensorMultilevelSupportedScaleReportData {
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
}

export class SensorMultilevelV5 extends CommandClassPacket<SensorMultilevelV5Commands> {
	public static readonly commandClass: number = CommandClasses.SensorMultilevel; // 0x31 (49)
	public static readonly version: number = 5;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(SensorMultilevelV5, commandAndPayload);
	}
}

export class SensorMultilevelGet extends CommandPacket<SensorMultilevelV5SensorMultilevelGetData> {
	public static readonly CommandClass: typeof SensorMultilevelV5 = SensorMultilevelV5;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SensorMultilevelV5)?.command === this.command;
	}

	public constructor(data: Buffer | SensorMultilevelV5SensorMultilevelGetData) {
		super(SensorMultilevelGet, data);
	}
};

export class SensorMultilevelReport extends CommandPacket<SensorMultilevelV5SensorMultilevelReportData> {
	public static readonly CommandClass: typeof SensorMultilevelV5 = SensorMultilevelV5;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SensorMultilevelV5)?.command === this.command;
	}

	public constructor(data: Buffer | SensorMultilevelV5SensorMultilevelReportData) {
		super(SensorMultilevelReport, data);
	}
};

export class SensorMultilevelSupportedGetSensor extends CommandPacket<void> {
	public static readonly CommandClass: typeof SensorMultilevelV5 = SensorMultilevelV5;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "SensorMultilevelSupportedGetSensor",
		"help": "Multilevel Sensor Get Supported Sensor",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SensorMultilevelV5)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(SensorMultilevelSupportedGetSensor, data);
	}
};

export class SensorMultilevelSupportedSensorReport extends CommandPacket<SensorMultilevelV5SensorMultilevelSupportedSensorReportData> {
	public static readonly CommandClass: typeof SensorMultilevelV5 = SensorMultilevelV5;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SensorMultilevelV5)?.command === this.command;
	}

	public constructor(data: Buffer | SensorMultilevelV5SensorMultilevelSupportedSensorReportData) {
		super(SensorMultilevelSupportedSensorReport, data);
	}
};

export class SensorMultilevelSupportedGetScale extends CommandPacket<SensorMultilevelV5SensorMultilevelSupportedGetScaleData> {
	public static readonly CommandClass: typeof SensorMultilevelV5 = SensorMultilevelV5;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SensorMultilevelV5)?.command === this.command;
	}

	public constructor(data: Buffer | SensorMultilevelV5SensorMultilevelSupportedGetScaleData) {
		super(SensorMultilevelSupportedGetScale, data);
	}
};

export class SensorMultilevelSupportedScaleReport extends CommandPacket<SensorMultilevelV5SensorMultilevelSupportedScaleReportData> {
	public static readonly CommandClass: typeof SensorMultilevelV5 = SensorMultilevelV5;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SensorMultilevelV5)?.command === this.command;
	}

	public constructor(data: Buffer | SensorMultilevelV5SensorMultilevelSupportedScaleReportData) {
		super(SensorMultilevelSupportedScaleReport, data);
	}
};
