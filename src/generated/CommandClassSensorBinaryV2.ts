/* Auto-generated */

// deprecated
export class CommandClassSensorBinaryV2 {
	public static readonly commandClass = 0x30; // (48);
	public static readonly definition = {"id":48,"name":"COMMAND_CLASS_SENSOR_BINARY","status":"deprecated","version":2,"commands":[{"id":2,"name":"SENSOR_BINARY_GET","status":"active","params":[{"type":"integer","name":"Sensor Type","length":1,"values":{"0":"Reserved","1":"General","2":"Smoke","3":"CO","4":"CO2","5":"Heat","6":"Water","7":"Freeze","8":"Tamper","9":"Aux","10":"Door/Window","11":"Tilt","12":"Motion","13":"Glass Break","255":"First"}}]},{"id":3,"name":"SENSOR_BINARY_REPORT","status":"active","params":[{"type":"enum","name":"Sensor Value","length":1,"values":{"0":"idle","255":"detected an event"}},{"type":"integer","name":"Sensor Type","length":1,"values":{"0":"Reserved","1":"General","2":"Smoke","3":"CO","4":"CO2","5":"Heat","6":"Water","7":"Freeze","8":"Tamper","9":"Aux","10":"Door/Window","11":"Tilt","12":"Motion","13":"Glass Break","255":"First"}}]},{"id":1,"name":"SENSOR_BINARY_SUPPORTED_GET_SENSOR","status":"active","params":[]},{"id":4,"name":"SENSOR_BINARY_SUPPORTED_SENSOR_REPORT","status":"active","params":[{"type":"integer","name":"Bit Mask","length":0}]}]};
}

export interface SensorBinaryGet {
	_commandClass: 0x30; // (48)
	_command: 0x2; // (2)
	sensorType: number; // 1 byte unsigned integer
}

export interface SensorBinaryReport {
	_commandClass: 0x30; // (48)
	_command: 0x3; // (3)
	sensorValue: SensorValueEnum; // 1 byte enum value
	sensorType: number; // 1 byte unsigned integer
}

export interface SensorBinarySupportedGetSensor {
	_commandClass: 0x30; // (48)
	_command: 0x1; // (1)
}

export interface SensorBinarySupportedSensorReport {
	_commandClass: 0x30; // (48)
	_command: 0x4; // (4)
	bitMask: number; // 0 byte unsigned integer
}

export enum SensorValueEnum {
	Idle = 0x0,
	DetectedAnEvent = 0xff,
}
