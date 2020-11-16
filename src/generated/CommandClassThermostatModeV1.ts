/* Auto-generated */

export class CommandClassThermostatModeV1 {
	public static readonly commandClass = 0x40; // (64);
	public static readonly definition = {"id":64,"name":"COMMAND_CLASS_THERMOSTAT_MODE","status":"active","version":1,"commands":[{"id":2,"name":"THERMOSTAT_MODE_GET","status":"active","params":[]},{"id":3,"name":"THERMOSTAT_MODE_REPORT","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"enum","name":"Mode","mask":31,"shift":0,"values":{"0":"Off","1":"Heat","2":"Cool","3":"Auto","4":"Auxiliary Heat","5":"Resume","6":"Fan Only","7":"Furnace","8":"Dry Air","9":"Moist Air","10":"Auto Changeover"}},{"type":"int","name":"Reserved","mask":224,"shift":5}]}]},{"id":1,"name":"THERMOSTAT_MODE_SET","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"enum","name":"Mode","mask":31,"shift":0,"values":{"0":"Off","1":"Heat","2":"Cool","3":"Auto","4":"Auxiliary Heat","5":"Resume","6":"Fan Only","7":"Furnace","8":"Dry Air","9":"Moist Air","10":"Auto Changeover"}},{"type":"int","name":"Reserved","mask":224,"shift":5}]}]},{"id":4,"name":"THERMOSTAT_MODE_SUPPORTED_GET","status":"active","params":[]},{"id":5,"name":"THERMOSTAT_MODE_SUPPORTED_REPORT","status":"active","params":[{"type":"integer","name":"Bit Mask","length":0}]}]};
}

export interface ThermostatModeGet {
	_commandClass: 0x40; // (64)
	_command: 0x2; // (2)
}

export interface ThermostatModeReport {
	_commandClass: 0x40; // (64)
	_command: 0x3; // (3)
	// TODO param Level type bitfield
}

export interface ThermostatModeSet {
	_commandClass: 0x40; // (64)
	_command: 0x1; // (1)
	// TODO param Level type bitfield
}

export interface ThermostatModeSupportedGet {
	_commandClass: 0x40; // (64)
	_command: 0x4; // (4)
}

export interface ThermostatModeSupportedReport {
	_commandClass: 0x40; // (64)
	_command: 0x5; // (5)
	bitMask: number; // 0 byte unsigned integer
}
