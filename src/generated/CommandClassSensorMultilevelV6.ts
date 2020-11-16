/* Auto-generated */

export class CommandClassSensorMultilevelV6 {
	public static readonly commandClass = 0x31; // (49);
	public static readonly definition = {"id":49,"name":"COMMAND_CLASS_SENSOR_MULTILEVEL","status":"active","version":6,"commands":[{"id":4,"name":"SENSOR_MULTILEVEL_GET","status":"active","params":[{"type":"enum","name":"Sensor Type","length":1,"values":{"1":"Temperature (version 1)","2":"General purpose value (version 1)","3":"Luminance (version 1)","4":"Power (version 2)","5":"Relative humidity (version 2)","6":"Velocity (version 2)","7":"Direction (version 2)","8":"Atmospheric pressure (version 2)","9":"Barometric pressure (version 2)","10":"Solar radiation (version 2)","11":"Dew point (version 2)","12":"Rain rate (version 2)","13":"Tide level (version 2)","14":"Weight (version 3)","15":"Voltage (version 3)","16":"Current (version 3)","17":"CO2-level (version 3)","18":"Air flow (version 3)","19":"Tank capacity (version 3)","20":"Distance (version 3)","21":"Angle Position (version 4)","22":"Rotation (v5)","23":"Water temperature (v5)","24":"Soil temperature (v5)","25":"Seismic intensity (v5)","26":"Seismic magnitude (v5)","27":"Ultraviolet (v5)","28":"Electrical resistivity (v5)","29":"Electrical conductivity (v5)","30":"Loudness (v5)","31":"Moisture (v5)","32":"Frequency (v6)","33":"Time (v6)","34":"Target Temperature (v6)"}},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Reserved1","mask":7,"shift":0},{"type":"int","name":"Scale","mask":24,"shift":3},{"type":"int","name":"Reserved2","mask":224,"shift":5}]}]},{"id":5,"name":"SENSOR_MULTILEVEL_REPORT","status":"active","params":[{"type":"enum","name":"Sensor Type","length":1,"values":{"1":"Temperature (version 1)","2":"General purpose value (version 1)","3":"Luminance (version 1)","4":"Power (version 2)","5":"Relative humidity (version 2)","6":"Velocity (version 2)","7":"Direction (version 2)","8":"Atmospheric pressure (version 2)","9":"Barometric pressure (version 2)","10":"Solar radiation (version 2)","11":"Dew point (version 2)","12":"Rain rate (version 2)","13":"Tide level (version 2)","14":"Weight (version 3)","15":"Voltage (version 3)","16":"Current (version 3)","17":"CO2-level (version 3)","18":"Air flow (version 3)","19":"Tank capacity (version 3)","20":"Distance (version 3)","21":"Angle Position (version 4)","22":"Rotation (v5)","23":"Water temperature (v5)","24":"Soil temperature (v5)","25":"Seismic intensity (v5)","26":"Seismic magnitude (v5)","27":"Ultraviolet (v5)","28":"Electrical resistivity (v5)","29":"Electrical conductivity (v5)","30":"Loudness (v5)","31":"Moisture (v5)","32":"Frequency (v6)","33":"Time (v6)","34":"Target Temperature (v6)"}},{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"int","name":"Size","mask":7,"shift":0},{"type":"int","name":"Scale","mask":24,"shift":3},{"type":"int","name":"Precision","mask":224,"shift":5}]},{"type":"blob","name":"Sensor Value","length":{"name":"Level","mask":7,"shift":0}}]},{"id":1,"name":"SENSOR_MULTILEVEL_SUPPORTED_GET_SENSOR","status":"active","params":[]},{"id":2,"name":"SENSOR_MULTILEVEL_SUPPORTED_SENSOR_REPORT","status":"active","params":[{"type":"integer","name":"Bit Mask","length":0}]},{"id":3,"name":"SENSOR_MULTILEVEL_SUPPORTED_GET_SCALE","status":"active","params":[{"type":"enum","name":"Sensor Type","length":1,"values":{"1":"Temperature (version 1)","2":"General purpose value (version 1)","3":"Luminance (version 1)","4":"Power (version 2)","5":"Relative humidity (version 2)","6":"Velocity (version 2)","7":"Direction (version 2)","8":"Atmospheric pressure (version 2)","9":"Barometric pressure (version 2)","10":"Solar radiation (version 2)","11":"Dew point (version 2)","12":"Rain rate (version 2)","13":"Tide level (version 2)","14":"Weight (version 3)","15":"Voltage (version 3)","16":"Current (version 3)","17":"CO2-level (version 3)","18":"Air flow (version 3)","19":"Tank capacity (version 3)","20":"Distance (version 3)","21":"Angle Position (version 4)","22":"Rotation (v5)","23":"Water temperature (v5)","24":"Soil temperature (v5)","25":"Seismic intensity (v5)","26":"Seismic magnitude (v5)","27":"Ultraviolet (v5)","28":"Electrical resistivity (v5)","29":"Electrical conductivity (v5)","30":"Loudness (v5)","31":"Moisture (v5)","32":"Frequency (v6)","33":"Time (v6)","34":"Target Temperature (v6)"}}]},{"id":6,"name":"SENSOR_MULTILEVEL_SUPPORTED_SCALE_REPORT","status":"active","params":[{"type":"enum","name":"Sensor Type","length":1,"values":{"1":"Temperature (version 1)","2":"General purpose value (version 1)","3":"Luminance (version 1)","4":"Power (version 2)","5":"Relative humidity (version 2)","6":"Velocity (version 2)","7":"Direction (version 2)","8":"Atmospheric pressure (version 2)","9":"Barometric pressure (version 2)","10":"Solar radiation (version 2)","11":"Dew point (version 2)","12":"Rain rate (version 2)","13":"Tide level (version 2)","14":"Weight (version 3)","15":"Voltage (version 3)","16":"Current (version 3)","17":"CO2-level (version 3)","18":"Air flow (version 3)","19":"Tank capacity (version 3)","20":"Distance (version 3)","21":"Angle Position (version 4)","22":"Rotation (v5)","23":"Water temperature (v5)","24":"Soil temperature (v5)","25":"Seismic intensity (v5)","26":"Seismic magnitude (v5)","27":"Ultraviolet (v5)","28":"Electrical resistivity (v5)","29":"Electrical conductivity (v5)","30":"Loudness (v5)","31":"Moisture (v5)","32":"Frequency (v6)","33":"Time (v6)","34":"Target Temperature (v6)"}},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Scale Bit Mask","mask":15,"shift":0},{"type":"int","name":"Reserved","mask":240,"shift":4}]}]}]};
}

export interface SensorMultilevelGet {
	_commandClass: 0x31; // (49)
	_command: 0x4; // (4)
	sensorType: SensorTypeEnum; // 1 byte enum value
	// TODO param Properties1 type bitfield
}

export interface SensorMultilevelReport {
	_commandClass: 0x31; // (49)
	_command: 0x5; // (5)
	sensorType: SensorTypeEnum; // 1 byte enum value
	// TODO param Level type bitfield
	// TODO param Sensor Value type blob
}

export interface SensorMultilevelSupportedGetSensor {
	_commandClass: 0x31; // (49)
	_command: 0x1; // (1)
}

export interface SensorMultilevelSupportedSensorReport {
	_commandClass: 0x31; // (49)
	_command: 0x2; // (2)
	bitMask: number; // 0 byte unsigned integer
}

export interface SensorMultilevelSupportedGetScale {
	_commandClass: 0x31; // (49)
	_command: 0x3; // (3)
	sensorType: SensorTypeEnum; // 1 byte enum value
}

export interface SensorMultilevelSupportedScaleReport {
	_commandClass: 0x31; // (49)
	_command: 0x6; // (6)
	sensorType: SensorTypeEnum; // 1 byte enum value
	// TODO param Properties1 type bitfield
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
}
