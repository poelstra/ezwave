/* Auto-generated */

// deprecated
export class CommandClassSwitchToggleMultilevelV1 {
	public static readonly commandClass = 0x29; // (41);
	public static readonly definition = {"id":41,"name":"COMMAND_CLASS_SWITCH_TOGGLE_MULTILEVEL","status":"deprecated","version":1,"commands":[{"id":1,"name":"SWITCH_TOGGLE_MULTILEVEL_SET","status":"active","params":[]},{"id":2,"name":"SWITCH_TOGGLE_MULTILEVEL_GET","status":"active","params":[]},{"id":3,"name":"SWITCH_TOGGLE_MULTILEVEL_REPORT","status":"active","params":[{"type":"integer","name":"Value","length":1,"values":{"0":"off/disable","255":"on/enable"}}]},{"id":4,"name":"SWITCH_TOGGLE_MULTILEVEL_START_LEVEL_CHANGE","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"integer","name":"Reserved1","mask":31,"shift":0},{"type":"bool","name":"Ignore Start Level","mask":32,"shift":5},{"type":"bool","name":"Reserved2","mask":64,"shift":6},{"type":"bool","name":"Roll Over","mask":128,"shift":7}]},{"type":"integer","name":"Start Level","length":1}]},{"id":5,"name":"SWITCH_TOGGLE_MULTILEVEL_STOP_LEVEL_CHANGE","status":"active","params":[]}]};
}

export interface SwitchToggleMultilevelSet {
	_commandClass: 0x29; // (41)
	_command: 0x1; // (1)
}

export interface SwitchToggleMultilevelGet {
	_commandClass: 0x29; // (41)
	_command: 0x2; // (2)
}

export interface SwitchToggleMultilevelReport {
	_commandClass: 0x29; // (41)
	_command: 0x3; // (3)
	value: number; // 1 byte unsigned integer
}

export interface SwitchToggleMultilevelStartLevelChange {
	_commandClass: 0x29; // (41)
	_command: 0x4; // (4)
	// TODO param Level type bitfield
	startLevel: number; // 1 byte unsigned integer
}

export interface SwitchToggleMultilevelStopLevelChange {
	_commandClass: 0x29; // (41)
	_command: 0x5; // (5)
}
