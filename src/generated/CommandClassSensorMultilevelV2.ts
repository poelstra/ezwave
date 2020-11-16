/* Auto-generated */

export class CommandClassSensorMultilevelV2 {
	public static readonly commandClass = 0x31; // (49);
	public static readonly definition = {"id":49,"name":"COMMAND_CLASS_SENSOR_MULTILEVEL","status":"active","version":2,"commands":[{"id":4,"name":"SENSOR_MULTILEVEL_GET","status":"active","params":[]},{"id":5,"name":"SENSOR_MULTILEVEL_REPORT","status":"active","params":[{"type":"enum","name":"Sensor Type","length":1,"values":{"1":"Temperature (version 1)","2":"General purpose value (version 1)","3":"Luminance (version 1)","4":"Power (version 2)","5":"Relative humidity (version 2)","6":"Velocity (version 2)","7":"Direction (version 2)","8":"Atmospheric pressure (version 2)","9":"Barometric pressure (version 2)","10":"Solar radiation (version 2)","11":"Dew point (version 2)","12":"Rain rate (version 2)","13":"Tide level (version 2)"}},{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"int","name":"Size","mask":7,"shift":0},{"type":"int","name":"Scale","mask":24,"shift":3},{"type":"int","name":"Precision","mask":224,"shift":5}]},{"type":"blob","name":"Sensor Value","length":{"name":"Level","mask":7,"shift":0}}]}]};
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
}
