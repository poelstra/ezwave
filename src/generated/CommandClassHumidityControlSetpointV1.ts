/* Auto-generated */

export class CommandClassHumidityControlSetpointV1 {
	public static readonly commandClass = 0x64; // (100);
	public static readonly definition = {"id":100,"name":"COMMAND_CLASS_HUMIDITY_CONTROL_SETPOINT","status":"active","version":1,"commands":[{"id":1,"name":"HUMIDITY_CONTROL_SETPOINT_SET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Setpoint Type","mask":15,"shift":0,"values":{"1":"Humidifier","2":"Dehumidifier"}},{"type":"integer","name":"Reserved","mask":240,"shift":4}]},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Size","mask":7,"shift":0},{"type":"enum","name":"Scale","mask":24,"shift":3,"values":{"0":"Percentage","1":"Absolute"}},{"type":"integer","name":"Precision","mask":224,"shift":5}]},{"type":"blob","name":"Value","length":{"name":"Properties2","mask":7,"shift":0}}]},{"id":2,"name":"HUMIDITY_CONTROL_SETPOINT_GET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Setpoint Type","mask":15,"shift":0,"values":{"1":"Humidifier","2":"Dehumidifier"}},{"type":"integer","name":"Reserved","mask":240,"shift":4}]}]},{"id":3,"name":"HUMIDITY_CONTROL_SETPOINT_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Setpoint Type","mask":15,"shift":0,"values":{"1":"Humidifier","2":"Dehumidifier"}},{"type":"integer","name":"Reserved","mask":240,"shift":4}]},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Size","mask":7,"shift":0},{"type":"enum","name":"Scale","mask":24,"shift":3,"values":{"0":"Percentage","1":"Absolute"}},{"type":"integer","name":"Precision","mask":224,"shift":5}]},{"type":"blob","name":"Value","length":{"name":"Properties2","mask":7,"shift":0}}]},{"id":4,"name":"HUMIDITY_CONTROL_SETPOINT_SUPPORTED_GET","status":"active","params":[]},{"id":5,"name":"HUMIDITY_CONTROL_SETPOINT_SUPPORTED_REPORT","status":"active","params":[{"type":"integer","name":"Bit Mask","length":0}]},{"id":6,"name":"HUMIDITY_CONTROL_SETPOINT_SCALE_SUPPORTED_GET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Setpoint Type","mask":15,"shift":0,"values":{"1":"Humidifier","2":"Dehumidifier"}},{"type":"integer","name":"Reserved","mask":240,"shift":4}]}]},{"id":7,"name":"HUMIDITY_CONTROL_SETPOINT_SCALE_SUPPORTED_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Scale Bit Mask","mask":15,"shift":0,"values":{"0":"Percentage","1":"Absolute"}},{"type":"integer","name":"Reserved","mask":240,"shift":4}]}]},{"id":8,"name":"HUMIDITY_CONTROL_SETPOINT_CAPABILITIES_GET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Setpoint Type","mask":15,"shift":0,"values":{"1":"Humidifier","2":"Dehumidifier"}},{"type":"integer","name":"Reserved","mask":240,"shift":4}]}]},{"id":9,"name":"HUMIDITY_CONTROL_SETPOINT_CAPABILITIES_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Setpoint Type","mask":15,"shift":0,"values":{"1":"Humidifier","2":"Dehumidifier"}},{"type":"integer","name":"Reserved","mask":240,"shift":4}]},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Size1","mask":7,"shift":0},{"type":"enum","name":"Scale1","mask":24,"shift":3,"values":{"0":"Percentage","1":"Absolute"}},{"type":"integer","name":"Precision1","mask":224,"shift":5}]},{"type":"blob","name":"Minimum Value","length":{"name":"Properties2","mask":7,"shift":0}},{"type":"bitfield","name":"Properties3","length":1,"fields":[{"type":"integer","name":"Size2","mask":7,"shift":0},{"type":"enum","name":"Scale2","mask":24,"shift":3,"values":{"0":"Percentage","1":"Absolute"}},{"type":"integer","name":"Precision2","mask":224,"shift":5}]},{"type":"blob","name":"Maximum Value","length":{"name":"Properties3","mask":7,"shift":0}}]}]};
}

export interface HumidityControlSetpointSet {
	_commandClass: 0x64; // (100)
	_command: 0x1; // (1)
	// TODO param Properties1 type bitfield
	// TODO param Properties2 type bitfield
	// TODO param Value type blob
}

export interface HumidityControlSetpointGet {
	_commandClass: 0x64; // (100)
	_command: 0x2; // (2)
	// TODO param Properties1 type bitfield
}

export interface HumidityControlSetpointReport {
	_commandClass: 0x64; // (100)
	_command: 0x3; // (3)
	// TODO param Properties1 type bitfield
	// TODO param Properties2 type bitfield
	// TODO param Value type blob
}

export interface HumidityControlSetpointSupportedGet {
	_commandClass: 0x64; // (100)
	_command: 0x4; // (4)
}

export interface HumidityControlSetpointSupportedReport {
	_commandClass: 0x64; // (100)
	_command: 0x5; // (5)
	bitMask: number; // 0 byte unsigned integer
}

export interface HumidityControlSetpointScaleSupportedGet {
	_commandClass: 0x64; // (100)
	_command: 0x6; // (6)
	// TODO param Properties1 type bitfield
}

export interface HumidityControlSetpointScaleSupportedReport {
	_commandClass: 0x64; // (100)
	_command: 0x7; // (7)
	// TODO param Properties1 type bitfield
}

export interface HumidityControlSetpointCapabilitiesGet {
	_commandClass: 0x64; // (100)
	_command: 0x8; // (8)
	// TODO param Properties1 type bitfield
}

export interface HumidityControlSetpointCapabilitiesReport {
	_commandClass: 0x64; // (100)
	_command: 0x9; // (9)
	// TODO param Properties1 type bitfield
	// TODO param Properties2 type bitfield
	// TODO param Minimum Value type blob
	// TODO param Properties3 type bitfield
	// TODO param Maximum Value type blob
}
