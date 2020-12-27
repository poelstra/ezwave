/* Auto-generated */

export class CommandClassSwitchMultilevelV3 {
	public static readonly commandClass = 0x26; // (38);
	public static readonly definition = {"id":38,"name":"COMMAND_CLASS_SWITCH_MULTILEVEL","status":"active","version":3,"commands":[{"id":2,"name":"SWITCH_MULTILEVEL_GET","status":"active","params":[]},{"id":3,"name":"SWITCH_MULTILEVEL_REPORT","status":"active","params":[{"type":"integer","name":"Value","length":1,"values":{"0":"off/disable","255":"on/enable"}}]},{"id":1,"name":"SWITCH_MULTILEVEL_SET","status":"active","params":[{"type":"integer","name":"Value","length":1,"values":{"0":"off/disable","255":"on/enable"}},{"type":"integer","name":"Dimming Duration","length":1,"values":{"0":"Instantly","255":"Factory default"}}]},{"id":4,"name":"SWITCH_MULTILEVEL_START_LEVEL_CHANGE","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Reserved","mask":7,"shift":0},{"type":"enum","name":"Inc Dec","mask":24,"shift":3,"values":{"0":"Increment","1":"Decrement","2":"Reserved","3":"None"}},{"type":"bool","name":"Ignore Start Level","mask":32,"shift":5},{"type":"enum","name":"Up Down","mask":192,"shift":6,"values":{"0":"Up","1":"Down","2":"Reserved","3":"None"}}]},{"type":"integer","name":"Start Level","length":1},{"type":"integer","name":"Dimming Duration","length":1},{"type":"integer","name":"Step Size","length":1}]},{"id":5,"name":"SWITCH_MULTILEVEL_STOP_LEVEL_CHANGE","status":"active","params":[]},{"id":6,"name":"SWITCH_MULTILEVEL_SUPPORTED_GET","status":"active","params":[]},{"id":7,"name":"SWITCH_MULTILEVEL_SUPPORTED_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Primary Switch Type","mask":31,"shift":0},{"type":"integer","name":"Reserved1","mask":224,"shift":5}]},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Secondary Switch Type","mask":31,"shift":0},{"type":"integer","name":"Reserved2","mask":224,"shift":5}]}]}]};
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
	dimmingDuration: number; // 1 byte unsigned integer
}

export interface SwitchMultilevelStartLevelChange {
	_commandClass: 0x26; // (38)
	_command: 0x4; // (4)
	// TODO param Properties1 type bitfield
	startLevel: number; // 1 byte unsigned integer
	dimmingDuration: number; // 1 byte unsigned integer
	stepSize: number; // 1 byte unsigned integer
}

export interface SwitchMultilevelStopLevelChange {
	_commandClass: 0x26; // (38)
	_command: 0x5; // (5)
}

export interface SwitchMultilevelSupportedGet {
	_commandClass: 0x26; // (38)
	_command: 0x6; // (6)
}

export interface SwitchMultilevelSupportedReport {
	_commandClass: 0x26; // (38)
	_command: 0x7; // (7)
	// TODO param Properties1 type bitfield
	// TODO param Properties2 type bitfield
}
