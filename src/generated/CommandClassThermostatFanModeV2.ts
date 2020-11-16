/* Auto-generated */

export class CommandClassThermostatFanModeV2 {
	public static readonly commandClass = 0x44; // (68);
	public static readonly definition = {"id":68,"name":"COMMAND_CLASS_THERMOSTAT_FAN_MODE","status":"active","version":2,"commands":[{"id":2,"name":"THERMOSTAT_FAN_MODE_GET","status":"active","params":[]},{"id":3,"name":"THERMOSTAT_FAN_MODE_REPORT","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"enum","name":"Fan Mode","mask":15,"shift":0,"values":{"0":"Auto Low","1":"Low","2":"Auto High","3":"High","4":"Auto Medium","5":"Medium"}},{"type":"int","name":"Reserved","mask":240,"shift":4}]}]},{"id":1,"name":"THERMOSTAT_FAN_MODE_SET","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"enum","name":"Fan Mode","mask":15,"shift":0,"values":{"0":"Auto Low","1":"Low","2":"Auto High","3":"High","4":"Auto Medium","5":"Medium"}},{"type":"int","name":"Reserved","mask":112,"shift":4},{"type":"bool","name":"Off","mask":128,"shift":7}]}]},{"id":4,"name":"THERMOSTAT_FAN_MODE_SUPPORTED_GET","status":"active","params":[]},{"id":5,"name":"THERMOSTAT_FAN_MODE_SUPPORTED_REPORT","status":"active","params":[{"type":"integer","name":"Bit Mask","length":0}]}]};
}

export interface ThermostatFanModeGet {
	_commandClass: 0x44; // (68)
	_command: 0x2; // (2)
}

export interface ThermostatFanModeReport {
	_commandClass: 0x44; // (68)
	_command: 0x3; // (3)
	// TODO param Level type bitfield
}

export interface ThermostatFanModeSet {
	_commandClass: 0x44; // (68)
	_command: 0x1; // (1)
	// TODO param Level type bitfield
}

export interface ThermostatFanModeSupportedGet {
	_commandClass: 0x44; // (68)
	_command: 0x4; // (4)
}

export interface ThermostatFanModeSupportedReport {
	_commandClass: 0x44; // (68)
	_command: 0x5; // (5)
	bitMask: number; // 0 byte unsigned integer
}
