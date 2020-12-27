/* Auto-generated */

export class CommandClassThermostatSetpointV1 {
	public static readonly commandClass = 0x43; // (67);
	public static readonly definition = {"id":67,"name":"COMMAND_CLASS_THERMOSTAT_SETPOINT","status":"active","version":1,"commands":[{"id":2,"name":"THERMOSTAT_SETPOINT_GET","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"enum","name":"Setpoint Type","mask":15,"shift":0,"values":{"0":"not supported","1":"Heating 1","2":"Cooling 1","3":"not supported1","4":"not supported2","5":"not supported3","6":"not supported4","7":"Furnace","8":"Dry Air","9":"Moist Air","10":"Auto changeover"}},{"type":"integer","name":"Reserved","mask":240,"shift":4}]}]},{"id":3,"name":"THERMOSTAT_SETPOINT_REPORT","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"enum","name":"Setpoint Type","mask":15,"shift":0,"values":{"0":"not supported","1":"Heating 1","2":"Cooling 1","3":"not supported1","4":"not supported2","5":"not supported3","6":"not supported4","7":"Furnace","8":"Dry Air","9":"Moist Air","10":"Auto changeover"}},{"type":"integer","name":"Reserved","mask":240,"shift":4}]},{"type":"bitfield","name":"Level2","length":1,"fields":[{"type":"integer","name":"Size","mask":7,"shift":0},{"type":"integer","name":"Scale","mask":24,"shift":3},{"type":"integer","name":"Precision","mask":224,"shift":5}]},{"type":"blob","name":"Value","length":{"name":"Level2","mask":7,"shift":0}}]},{"id":1,"name":"THERMOSTAT_SETPOINT_SET","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"enum","name":"Setpoint Type","mask":15,"shift":0,"values":{"0":"not supported","1":"Heating 1","2":"Cooling 1","3":"not supported1","4":"not supported2","5":"not supported3","6":"not supported4","7":"Furnace","8":"Dry Air","9":"Moist Air","10":"Auto changeover"}},{"type":"integer","name":"Reserved","mask":240,"shift":4}]},{"type":"bitfield","name":"Level2","length":1,"fields":[{"type":"integer","name":"Size","mask":7,"shift":0},{"type":"integer","name":"Scale","mask":24,"shift":3},{"type":"integer","name":"Precision","mask":224,"shift":5}]},{"type":"blob","name":"Value","length":{"name":"Level2","mask":7,"shift":0}}]},{"id":4,"name":"THERMOSTAT_SETPOINT_SUPPORTED_GET","status":"active","params":[]},{"id":5,"name":"THERMOSTAT_SETPOINT_SUPPORTED_REPORT","status":"active","params":[{"type":"integer","name":"Bit Mask","length":0}]}]};
}

export interface ThermostatSetpointGet {
	_commandClass: 0x43; // (67)
	_command: 0x2; // (2)
	// TODO param Level type bitfield
}

export interface ThermostatSetpointReport {
	_commandClass: 0x43; // (67)
	_command: 0x3; // (3)
	// TODO param Level type bitfield
	// TODO param Level2 type bitfield
	// TODO param Value type blob
}

export interface ThermostatSetpointSet {
	_commandClass: 0x43; // (67)
	_command: 0x1; // (1)
	// TODO param Level type bitfield
	// TODO param Level2 type bitfield
	// TODO param Value type blob
}

export interface ThermostatSetpointSupportedGet {
	_commandClass: 0x43; // (67)
	_command: 0x4; // (4)
}

export interface ThermostatSetpointSupportedReport {
	_commandClass: 0x43; // (67)
	_command: 0x5; // (5)
	bitMask: number; // 0 byte unsigned integer
}
