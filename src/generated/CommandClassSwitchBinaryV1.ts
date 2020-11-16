/* Auto-generated */

export class CommandClassSwitchBinaryV1 {
	public static readonly commandClass = 0x25; // (37);
	public static readonly definition = {"id":37,"name":"COMMAND_CLASS_SWITCH_BINARY","status":"active","version":1,"commands":[{"id":2,"name":"SWITCH_BINARY_GET","status":"active","params":[]},{"id":3,"name":"SWITCH_BINARY_REPORT","status":"active","params":[{"type":"integer","name":"Value","length":1,"values":{"0":"off/disable","255":"on/enable"}}]},{"id":1,"name":"SWITCH_BINARY_SET","status":"active","params":[{"type":"integer","name":"Switch Value","length":1,"values":{"0":"off/disable","255":"on/enable"}}]}]};
}

export interface SwitchBinaryGet {
	_commandClass: 0x25; // (37)
	_command: 0x2; // (2)
}

export interface SwitchBinaryReport {
	_commandClass: 0x25; // (37)
	_command: 0x3; // (3)
	value: number; // 1 byte unsigned integer
}

export interface SwitchBinarySet {
	_commandClass: 0x25; // (37)
	_command: 0x1; // (1)
	switchValue: number; // 1 byte unsigned integer
}
