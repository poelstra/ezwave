/* Auto-generated */

// obsolete
export class CommandClassSensorConfigurationV1 {
	public static readonly commandClass = 0x9e; // (158);
	public static readonly definition = {"id":158,"name":"COMMAND_CLASS_SENSOR_CONFIGURATION","status":"obsolete","version":1,"commands":[{"id":2,"name":"SENSOR_TRIGGER_LEVEL_GET","status":"active","params":[]},{"id":3,"name":"SENSOR_TRIGGER_LEVEL_REPORT","status":"active","params":[{"type":"integer","name":"Sensor Type","length":1,"values":{"1":"Temperature","2":"General purpose value","3":"Luminance","4":"Power","5":"Relative humidity","6":"Velocity","7":"Direction","8":"Atmospheric pressure","9":"Barometric pressure","10":"Solar radiation","11":"Dew point","12":"Rain rate","13":"Tide level"}},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Size","mask":7,"shift":0},{"type":"integer","name":"Scale","mask":24,"shift":3},{"type":"integer","name":"Precision","mask":224,"shift":5}]},{"type":"blob","name":"Trigger Value","length":{"name":"Properties1","mask":7,"shift":0}}]},{"id":1,"name":"SENSOR_TRIGGER_LEVEL_SET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Reserved","mask":63,"shift":0},{"type":"bool","name":"Current","mask":64,"shift":6},{"type":"bool","name":"Default","mask":128,"shift":7}]},{"type":"integer","name":"Sensor Type","length":1,"values":{"1":"Temperature","2":"General purpose value","3":"Luminance","4":"Power","5":"Relative humidity","6":"Velocity","7":"Direction","8":"Atmospheric pressure","9":"Barometric pressure","10":"Solar radiation","11":"Dew point","12":"Rain rate","13":"Tide level"}},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Size","mask":7,"shift":0},{"type":"integer","name":"Scale","mask":24,"shift":3},{"type":"integer","name":"Precision","mask":224,"shift":5}]},{"type":"blob","name":"Trigger Value","length":{"name":"Properties2","mask":7,"shift":0}}]}]};
}

export interface SensorTriggerLevelGet {
	_commandClass: 0x9e; // (158)
	_command: 0x2; // (2)
}

export interface SensorTriggerLevelReport {
	_commandClass: 0x9e; // (158)
	_command: 0x3; // (3)
	sensorType: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param Trigger Value type blob
}

export interface SensorTriggerLevelSet {
	_commandClass: 0x9e; // (158)
	_command: 0x1; // (1)
	// TODO param Properties1 type bitfield
	sensorType: number; // 1 byte unsigned integer
	// TODO param Properties2 type bitfield
	// TODO param Trigger Value type blob
}
