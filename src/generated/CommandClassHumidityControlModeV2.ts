/* Auto-generated */

export class CommandClassHumidityControlModeV2 {
	public static readonly commandClass = 0x6d; // (109);
	public static readonly definition = {"id":109,"name":"COMMAND_CLASS_HUMIDITY_CONTROL_MODE","status":"active","version":2,"commands":[{"id":1,"name":"HUMIDITY_CONTROL_MODE_SET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Mode","mask":15,"shift":0,"values":{"0":"Off","1":"Humidify","2":"Dehumidify","3":"Auto"}},{"type":"integer","name":"Reserved","mask":240,"shift":4}]}]},{"id":2,"name":"HUMIDITY_CONTROL_MODE_GET","status":"active","params":[]},{"id":3,"name":"HUMIDITY_CONTROL_MODE_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Mode","mask":15,"shift":0,"values":{"0":"Off","1":"Humidify","2":"Dehumidify","3":"Auto"}},{"type":"integer","name":"Reserved","mask":240,"shift":4}]}]},{"id":4,"name":"HUMIDITY_CONTROL_MODE_SUPPORTED_GET","status":"active","params":[]},{"id":5,"name":"HUMIDITY_CONTROL_MODE_SUPPORTED_REPORT","status":"active","params":[{"type":"integer","name":"Bit Mask","length":0}]}]};
}

export interface HumidityControlModeSet {
	_commandClass: 0x6d; // (109)
	_command: 0x1; // (1)
	// TODO param Properties1 type bitfield
}

export interface HumidityControlModeGet {
	_commandClass: 0x6d; // (109)
	_command: 0x2; // (2)
}

export interface HumidityControlModeReport {
	_commandClass: 0x6d; // (109)
	_command: 0x3; // (3)
	// TODO param Properties1 type bitfield
}

export interface HumidityControlModeSupportedGet {
	_commandClass: 0x6d; // (109)
	_command: 0x4; // (4)
}

export interface HumidityControlModeSupportedReport {
	_commandClass: 0x6d; // (109)
	_command: 0x5; // (5)
	bitMask: number; // 0 byte unsigned integer
}
