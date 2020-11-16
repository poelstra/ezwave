/* Auto-generated */

export class CommandClassSensorAlarmV1 {
	public static readonly commandClass = 0x9c; // (156);
	public static readonly definition = {"id":156,"name":"COMMAND_CLASS_SENSOR_ALARM","status":"active","version":1,"commands":[{"id":1,"name":"SENSOR_ALARM_GET","status":"active","params":[{"type":"integer","name":"Sensor Type","length":1,"values":{"0":"General Purpose Alarm","1":"Smoke Alarm","2":"CO Alarm","3":"CO2 Alarm","4":"Heat Alarm","5":"Water Leak Alarm","255":"Return first Alarm on supported list"}}]},{"id":2,"name":"SENSOR_ALARM_REPORT","status":"active","params":[{"type":"integer","name":"Source Node ID","length":1,"valueType":"NODE_NUMBER"},{"type":"integer","name":"Sensor Type","length":1,"values":{"0":"General Purpose Alarm","1":"Smoke Alarm","2":"CO Alarm","3":"CO2 Alarm","4":"Heat Alarm","5":"Water Leak Alarm","255":"Return first Alarm on supported list"}},{"type":"integer","name":"Sensor State","length":1,"values":{"0":"no alarm","255":"alarm"}},{"type":"integer","name":"Seconds","length":2}]},{"id":3,"name":"SENSOR_ALARM_SUPPORTED_GET","status":"active","params":[]},{"id":4,"name":"SENSOR_ALARM_SUPPORTED_REPORT","status":"active","params":[{"type":"integer","name":"Number of Bit Masks","length":1},{"type":"blob","name":"Bit Mask","length":{"name":"Number of Bit Masks","mask":255,"shift":0}}]}]};
}

export interface SensorAlarmGet {
	_commandClass: 0x9c; // (156)
	_command: 0x1; // (1)
	sensorType: number; // 1 byte unsigned integer
}

export interface SensorAlarmReport {
	_commandClass: 0x9c; // (156)
	_command: 0x2; // (2)
	sourceNodeID: number; // 1 byte unsigned integer
	sensorType: number; // 1 byte unsigned integer
	sensorState: number; // 1 byte unsigned integer
	seconds: number; // 2 byte unsigned integer
}

export interface SensorAlarmSupportedGet {
	_commandClass: 0x9c; // (156)
	_command: 0x3; // (3)
}

export interface SensorAlarmSupportedReport {
	_commandClass: 0x9c; // (156)
	_command: 0x4; // (4)
	numberOfBitMasks: number; // 1 byte unsigned integer
	// TODO param Bit Mask type blob
}
