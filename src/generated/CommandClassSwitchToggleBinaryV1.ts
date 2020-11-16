/* Auto-generated */

// deprecated
export class CommandClassSwitchToggleBinaryV1 {
	public static readonly commandClass = 0x28; // (40);
	public static readonly definition = {"id":40,"name":"COMMAND_CLASS_SWITCH_TOGGLE_BINARY","status":"deprecated","version":1,"commands":[{"id":1,"name":"SWITCH_TOGGLE_BINARY_SET","status":"active","params":[]},{"id":2,"name":"SWITCH_TOGGLE_BINARY_GET","status":"active","params":[]},{"id":3,"name":"SWITCH_TOGGLE_BINARY_REPORT","status":"active","params":[{"type":"integer","name":"Value","length":1,"values":{"0":"off","255":"on"}}]}]};
}

export interface SwitchToggleBinarySet {
	_commandClass: 0x28; // (40)
	_command: 0x1; // (1)
}

export interface SwitchToggleBinaryGet {
	_commandClass: 0x28; // (40)
	_command: 0x2; // (2)
}

export interface SwitchToggleBinaryReport {
	_commandClass: 0x28; // (40)
	_command: 0x3; // (3)
	value: number; // 1 byte unsigned integer
}
