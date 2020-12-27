/* Auto-generated */

export class CommandClassSwitchMultilevelV1 {
	public static readonly commandClass = 0x26; // (38);
	public static readonly definition = {"id":38,"name":"COMMAND_CLASS_SWITCH_MULTILEVEL","status":"active","version":1,"commands":[{"id":2,"name":"SWITCH_MULTILEVEL_GET","status":"active","params":[]},{"id":3,"name":"SWITCH_MULTILEVEL_REPORT","status":"active","params":[{"type":"integer","name":"Value","length":1,"values":{"0":"off/disable","255":"on/enable"}}]},{"id":1,"name":"SWITCH_MULTILEVEL_SET","status":"active","params":[{"type":"integer","name":"Value","length":1,"values":{"0":"off/disable","255":"on/enable"}}]},{"id":4,"name":"SWITCH_MULTILEVEL_START_LEVEL_CHANGE","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"integer","name":"Reserved1","mask":31,"shift":0},{"type":"bool","name":"Ignore Start Level","mask":32,"shift":5},{"type":"bool","name":"Up/ Down","mask":64,"shift":6},{"type":"bool","name":"Reserved2","mask":128,"shift":7}]},{"type":"integer","name":"Start Level","length":1}]},{"id":5,"name":"SWITCH_MULTILEVEL_STOP_LEVEL_CHANGE","status":"active","params":[]}]};
}

export interface SwitchMultilevelGet {
	_commandClass: 0x26; // (38)
	_command: 0x2; // (2)
}

export interface SwitchMultilevelReport {
	_commandClass: 0x26; // (38)
	_command: 0x3; // (3)
	value: number; // 1 byte unsigned integer
}

export interface SwitchMultilevelSet {
	_commandClass: 0x26; // (38)
	_command: 0x1; // (1)
	value: number; // 1 byte unsigned integer
}

export interface SwitchMultilevelStartLevelChange {
	_commandClass: 0x26; // (38)
	_command: 0x4; // (4)
	// TODO param Level type bitfield
	startLevel: number; // 1 byte unsigned integer
}

export interface SwitchMultilevelStopLevelChange {
	_commandClass: 0x26; // (38)
	_command: 0x5; // (5)
}
