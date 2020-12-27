/* Auto-generated */

export class CommandClassSwitchColorV3 {
	public static readonly commandClass = 0x33; // (51);
	public static readonly definition = {"id":51,"name":"COMMAND_CLASS_SWITCH_COLOR","status":"active","version":3,"commands":[{"id":1,"name":"SWITCH_COLOR_SUPPORTED_GET","status":"active","params":[]},{"id":2,"name":"SWITCH_COLOR_SUPPORTED_REPORT","status":"active","params":[{"type":"integer","name":"Color Component mask","length":2}]},{"id":3,"name":"SWITCH_COLOR_GET","status":"active","params":[{"type":"integer","name":"Color Component ID","length":1}]},{"id":4,"name":"SWITCH_COLOR_REPORT","status":"active","params":[{"type":"integer","name":"Color Component ID","length":1},{"type":"integer","name":"Current Value","length":1},{"type":"integer","name":"Target Value","length":1},{"type":"enum","name":"Duration","length":1,"values":{"0":"Already at the Target Value","254":"Unknown duration","255":"Reserved"}}]},{"id":5,"name":"SWITCH_COLOR_SET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Color Component Count","mask":31,"shift":0},{"type":"integer","name":"Reserved","mask":224,"shift":5}]},{"type":"group","name":"vg1","length":{"name":"Properties1","mask":31,"shift":0},"params":[{"type":"integer","name":"Color Component ID","length":1},{"type":"integer","name":"Value","length":1}]},{"type":"enum","name":"Duration","length":1,"values":{"0":"Instantly","255":"Default"}}]},{"id":6,"name":"SWITCH_COLOR_START_LEVEL_CHANGE","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Res1","mask":31,"shift":0},{"type":"bool","name":"Ignore Start State","mask":32,"shift":5},{"type":"bool","name":"Up/Down","mask":64,"shift":6},{"type":"bool","name":"Res2","mask":128,"shift":7}]},{"type":"integer","name":"Color Component ID","length":1},{"type":"integer","name":"Start Level","length":1},{"type":"enum","name":"Duration","length":1,"values":{"0":"Instantly","255":"Default"}}]},{"id":7,"name":"SWITCH_COLOR_STOP_LEVEL_CHANGE","status":"active","params":[{"type":"integer","name":"Color Component ID","length":1}]}]};
}

export interface SwitchColorSupportedGet {
	_commandClass: 0x33; // (51)
	_command: 0x1; // (1)
}

export interface SwitchColorSupportedReport {
	_commandClass: 0x33; // (51)
	_command: 0x2; // (2)
	colorComponentMask: number; // 2 byte unsigned integer
}

export interface SwitchColorGet {
	_commandClass: 0x33; // (51)
	_command: 0x3; // (3)
	colorComponentID: number; // 1 byte unsigned integer
}

export interface SwitchColorReport {
	_commandClass: 0x33; // (51)
	_command: 0x4; // (4)
	colorComponentID: number; // 1 byte unsigned integer
	currentValue: number; // 1 byte unsigned integer
	targetValue: number; // 1 byte unsigned integer
	duration: DurationEnum; // 1 byte enum value
}

export interface SwitchColorSet {
	_commandClass: 0x33; // (51)
	_command: 0x5; // (5)
	// TODO param Properties1 type bitfield
	// TODO param vg1 type group
	duration: Duration2Enum; // 1 byte enum value
}

export interface SwitchColorStartLevelChange {
	_commandClass: 0x33; // (51)
	_command: 0x6; // (6)
	// TODO param Properties1 type bitfield
	colorComponentID: number; // 1 byte unsigned integer
	startLevel: number; // 1 byte unsigned integer
	duration: Duration2Enum; // 1 byte enum value
}

export interface SwitchColorStopLevelChange {
	_commandClass: 0x33; // (51)
	_command: 0x7; // (7)
	colorComponentID: number; // 1 byte unsigned integer
}

export enum DurationEnum {
	AlreadyAtTheTargetValue = 0x0,
	UnknownDuration = 0xfe,
	Reserved = 0xff,
}

export enum Duration2Enum {
	Instantly = 0x0,
	Default = 0xff,
}
