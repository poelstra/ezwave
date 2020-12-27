/* Auto-generated */

export class CommandClassSensorMultilevelV4 {
	public static readonly commandClass = 0x31; // (49);
	public static readonly definition = {"id":49,"name":"COMMAND_CLASS_SENSOR_MULTILEVEL","status":"active","version":4,"commands":[{"id":4,"name":"SENSOR_MULTILEVEL_GET","status":"active","params":[]},{"id":5,"name":"SENSOR_MULTILEVEL_REPORT","status":"active","params":[{"type":"enum","name":"Sensor Type","length":1,"values":{"1":"Temperature (version 1)","2":"General purpose value (version 1)","3":"Luminance (version 1)","4":"Power (version 2)","5":"Relative humidity (version 2)","6":"Velocity (version 2)","7":"Direction (version 2)","8":"Atmospheric pressure (version 2)","9":"Barometric pressure (version 2)","10":"Solar radiation (version 2)","11":"Dew point (version 2)","12":"Rain rate (version 2)","13":"Tide level (version 2)","14":"Weight (version 3)","15":"Voltage (version 3)","16":"Current (version 3)","17":"CO2-level (version 3)","18":"Air flow (version 3)","19":"Tank capacity (version 3)","20":"Distance (version 3)","21":"Angle Position (version 4)"}},{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"integer","name":"Size","mask":7,"shift":0},{"type":"integer","name":"Scale","mask":24,"shift":3},{"type":"integer","name":"Precision","mask":224,"shift":5}]},{"type":"blob","name":"Sensor Value","length":{"name":"Level","mask":7,"shift":0}}]}]};
}

export interface SensorMultilevelGet {
	_commandClass: 0x31; // (49)
	_command: 0x4; // (4)
}

export interface SensorMultilevelReport {
	_commandClass: 0x31; // (49)
	_command: 0x5; // (5)
	sensorType: SensorTypeEnum; // 1 byte enum value
	// TODO param Level type bitfield
	// TODO param Sensor Value type blob
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
