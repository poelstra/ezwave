/* Auto-generated */

export class CommandClassHrvControlV1 {
	public static readonly commandClass = 0x39; // (57);
	public static readonly definition = {"id":57,"name":"COMMAND_CLASS_HRV_CONTROL","status":"active","version":1,"commands":[{"id":5,"name":"HRV_CONTROL_BYPASS_GET","status":"active","params":[]},{"id":6,"name":"HRV_CONTROL_BYPASS_REPORT","status":"active","params":[{"type":"integer","name":"Bypass","length":1}]},{"id":4,"name":"HRV_CONTROL_BYPASS_SET","status":"active","params":[{"type":"integer","name":"Bypass","length":1}]},{"id":2,"name":"HRV_CONTROL_MODE_GET","status":"active","params":[]},{"id":3,"name":"HRV_CONTROL_MODE_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Mode","mask":31,"shift":0,"values":{"0":"Off","1":"Demand Automatic","2":"Schedule","3":"Energy Savings Mode","4":"Manual"}},{"type":"integer","name":"Reserved","mask":224,"shift":5}]}]},{"id":1,"name":"HRV_CONTROL_MODE_SET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Mode","mask":31,"shift":0,"values":{"0":"Off","1":"Demand Automatic","2":"Schedule","3":"Energy Savings Mode","4":"Manual"}},{"type":"integer","name":"Reserved","mask":224,"shift":5}]}]},{"id":10,"name":"HRV_CONTROL_MODE_SUPPORTED_GET","status":"active","params":[]},{"id":11,"name":"HRV_CONTROL_MODE_SUPPORTED_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Manual Control Supported","mask":15,"shift":0,"values":{"0":"Bypass Open Close","1":"Bypass Auto","2":"Modulated Bypass","3":"Ventilation Rate"}},{"type":"integer","name":"Reserved","mask":240,"shift":4}]},{"type":"integer","name":"Bit Mask","length":0}]},{"id":8,"name":"HRV_CONTROL_VENTILATION_RATE_GET","status":"active","params":[]},{"id":9,"name":"HRV_CONTROL_VENTILATION_RATE_REPORT","status":"active","params":[{"type":"integer","name":"Ventilation Rate","length":1}]},{"id":7,"name":"HRV_CONTROL_VENTILATION_RATE_SET","status":"active","params":[{"type":"integer","name":"Ventilation Rate","length":1}]}]};
}

export interface HrvControlBypassGet {
	_commandClass: 0x39; // (57)
	_command: 0x5; // (5)
}

export interface HrvControlBypassReport {
	_commandClass: 0x39; // (57)
	_command: 0x6; // (6)
	bypass: number; // 1 byte unsigned integer
}

export interface HrvControlBypassSet {
	_commandClass: 0x39; // (57)
	_command: 0x4; // (4)
	bypass: number; // 1 byte unsigned integer
}

export interface HrvControlModeGet {
	_commandClass: 0x39; // (57)
	_command: 0x2; // (2)
}

export interface HrvControlModeReport {
	_commandClass: 0x39; // (57)
	_command: 0x3; // (3)
	// TODO param Properties1 type bitfield
}

export interface HrvControlModeSet {
	_commandClass: 0x39; // (57)
	_command: 0x1; // (1)
	// TODO param Properties1 type bitfield
}

export interface HrvControlModeSupportedGet {
	_commandClass: 0x39; // (57)
	_command: 0xa; // (10)
}

export interface HrvControlModeSupportedReport {
	_commandClass: 0x39; // (57)
	_command: 0xb; // (11)
	// TODO param Properties1 type bitfield
	bitMask: number; // 0 byte unsigned integer
}

export interface HrvControlVentilationRateGet {
	_commandClass: 0x39; // (57)
	_command: 0x8; // (8)
}

export interface HrvControlVentilationRateReport {
	_commandClass: 0x39; // (57)
	_command: 0x9; // (9)
	ventilationRate: number; // 1 byte unsigned integer
}

export interface HrvControlVentilationRateSet {
	_commandClass: 0x39; // (57)
	_command: 0x7; // (7)
	ventilationRate: number; // 1 byte unsigned integer
}
