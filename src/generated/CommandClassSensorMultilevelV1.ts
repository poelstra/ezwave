/* Auto-generated */

export class CommandClassSensorMultilevelV1 {
	public static readonly commandClass = 0x31; // (49);
	public static readonly definition = {"id":49,"name":"COMMAND_CLASS_SENSOR_MULTILEVEL","status":"active","version":1,"commands":[{"id":4,"name":"SENSOR_MULTILEVEL_GET","status":"active","params":[]},{"id":5,"name":"SENSOR_MULTILEVEL_REPORT","status":"active","params":[{"type":"enum","name":"Sensor Type","length":1,"values":{"1":"Temperature (version 1)","2":"General purpose value (version 1)","3":"Luminance (version 1)"}},{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"integer","name":"Size","mask":7,"shift":0},{"type":"integer","name":"Scale","mask":24,"shift":3},{"type":"integer","name":"Precision","mask":224,"shift":5}]},{"type":"blob","name":"Sensor Value","length":{"name":"Level","mask":7,"shift":0}}]}]};
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
}
