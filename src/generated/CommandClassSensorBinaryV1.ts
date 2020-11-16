/* Auto-generated */

// deprecated
export class CommandClassSensorBinaryV1 {
	public static readonly commandClass = 0x30; // (48);
	public static readonly definition = {"id":48,"name":"COMMAND_CLASS_SENSOR_BINARY","status":"deprecated","version":1,"commands":[{"id":2,"name":"SENSOR_BINARY_GET","status":"active","params":[]},{"id":3,"name":"SENSOR_BINARY_REPORT","status":"active","params":[{"type":"enum","name":"Sensor Value","length":1,"values":{"0":"idle","255":"detected an event"}}]}]};
}

export interface SensorBinaryGet {
	_commandClass: 0x30; // (48)
	_command: 0x2; // (2)
}

export interface SensorBinaryReport {
	_commandClass: 0x30; // (48)
	_command: 0x3; // (3)
	sensorValue: SensorValueEnum; // 1 byte enum value
}

export enum SensorValueEnum {
	Idle = 0x0,
	DetectedAnEvent = 0xff,
}
