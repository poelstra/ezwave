/* Auto-generated */

export class CommandClassSwitchMultilevelV4 {
	public static readonly commandClass = 0x26; // (38);
	public static readonly definition = {"id":38,"name":"COMMAND_CLASS_SWITCH_MULTILEVEL","status":"active","version":4,"commands":[{"id":2,"name":"SWITCH_MULTILEVEL_GET","status":"active","params":[]},{"id":3,"name":"SWITCH_MULTILEVEL_REPORT","status":"active","params":[{"type":"integer","name":"Current Value","length":1,"values":{"0":"off/disable","255":"on/enable"}},{"type":"integer","name":"Target Value","length":1},{"type":"enum","name":"Duration","length":1,"values":{"0":"Already at the Target Value","254":"Unknown duration","255":"Reserved"}}]},{"id":1,"name":"SWITCH_MULTILEVEL_SET","status":"active","params":[{"type":"integer","name":"Value","length":1,"values":{"0":"off/disable","255":"on/enable"}},{"type":"enum","name":"Dimming Duration","length":1,"values":{"0":"Instantly","255":"Default"}}]},{"id":4,"name":"SWITCH_MULTILEVEL_START_LEVEL_CHANGE","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Reserved","mask":7,"shift":0},{"type":"enum","name":"Inc Dec","mask":24,"shift":3,"values":{"0":"Increment","1":"Decrement","2":"Reserved","3":"None"}},{"type":"bool","name":"Ignore Start Level","mask":32,"shift":5},{"type":"enum","name":"Up Down","mask":192,"shift":6,"values":{"0":"Up","1":"Down","2":"Reserved","3":"None"}}]},{"type":"integer","name":"Start Level","length":1},{"type":"integer","name":"Dimming Duration","length":1},{"type":"integer","name":"Step Size","length":1}]},{"id":5,"name":"SWITCH_MULTILEVEL_STOP_LEVEL_CHANGE","status":"active","params":[]},{"id":6,"name":"SWITCH_MULTILEVEL_SUPPORTED_GET","status":"active","params":[]},{"id":7,"name":"SWITCH_MULTILEVEL_SUPPORTED_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Primary Switch Type","mask":31,"shift":0},{"type":"int","name":"Reserved1","mask":224,"shift":5}]},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"int","name":"Secondary Switch Type","mask":31,"shift":0},{"type":"int","name":"Reserved2","mask":224,"shift":5}]}]}]};
}

export interface SwitchMultilevelGet {
	_commandClass: 0x26; // (38)
	_command: 0x2; // (2)
}

export interface SwitchMultilevelReport {
	_commandClass: 0x26; // (38)
	_command: 0x3; // (3)
	currentValue: number; // 1 byte unsigned integer
	targetValue: number; // 1 byte unsigned integer
	duration: DurationEnum; // 1 byte enum value
}

export interface SwitchMultilevelSet {
	_commandClass: 0x26; // (38)
	_command: 0x1; // (1)
	value: number; // 1 byte unsigned integer
	dimmingDuration: DimmingDurationEnum; // 1 byte enum value
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

export enum DurationEnum {
	AlreadyAtTheTargetValue = 0x0,
	UnknownDuration = 0xfe,
	Reserved = 0xff,
}

export enum DimmingDurationEnum {
	Instantly = 0x0,
	Default = 0xff,
}
