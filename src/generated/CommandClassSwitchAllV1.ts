/* Auto-generated */

export class CommandClassSwitchAllV1 {
	public static readonly commandClass = 0x27; // (39);
	public static readonly definition = {"id":39,"name":"COMMAND_CLASS_SWITCH_ALL","status":"active","version":1,"commands":[{"id":2,"name":"SWITCH_ALL_GET","status":"active","params":[]},{"id":5,"name":"SWITCH_ALL_OFF","status":"active","params":[]},{"id":4,"name":"SWITCH_ALL_ON","status":"active","params":[]},{"id":3,"name":"SWITCH_ALL_REPORT","status":"active","params":[{"type":"enum","name":"Mode","length":1,"values":{"0":"excluded from the all on/all off functionality","1":"excluded from the all on functionality but not all off","2":"excluded from the all off functionality but not all on","255":"included in the all on/all off functionality"}}]},{"id":1,"name":"SWITCH_ALL_SET","status":"active","params":[{"type":"enum","name":"Mode","length":1,"values":{"0":"excluded from the all on/all off functionality","1":"excluded from the all on functionality but not all off","2":"excluded from the all off functionality but not all on","255":"included in the all on/all off functionality"}}]}]};
}

export interface SwitchAllGet {
	_commandClass: 0x27; // (39)
	_command: 0x2; // (2)
}

export interface SwitchAllOff {
	_commandClass: 0x27; // (39)
	_command: 0x5; // (5)
}

export interface SwitchAllOn {
	_commandClass: 0x27; // (39)
	_command: 0x4; // (4)
}

export interface SwitchAllReport {
	_commandClass: 0x27; // (39)
	_command: 0x3; // (3)
	mode: ModeEnum; // 1 byte enum value
}

export interface SwitchAllSet {
	_commandClass: 0x27; // (39)
	_command: 0x1; // (1)
	mode: ModeEnum; // 1 byte enum value
}

export enum ModeEnum {
	ExcludedFromTheAllOnAllOffFunctionality = 0x0,
	ExcludedFromTheAllOnFunctionalityButNotAllOff = 0x1,
	ExcludedFromTheAllOffFunctionalityButNotAllOn = 0x2,
	IncludedInTheAllOnAllOffFunctionality = 0xff,
}
