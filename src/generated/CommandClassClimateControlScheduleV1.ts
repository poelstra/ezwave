/* Auto-generated */

// deprecated
export class CommandClassClimateControlScheduleV1 {
	public static readonly commandClass = 0x46; // (70);
	public static readonly definition = {"id":70,"name":"COMMAND_CLASS_CLIMATE_CONTROL_SCHEDULE","status":"deprecated","version":1,"commands":[{"id":4,"name":"SCHEDULE_CHANGED_GET","status":"active","params":[]},{"id":5,"name":"SCHEDULE_CHANGED_REPORT","status":"active","params":[{"type":"integer","name":"ChangeCounter","length":1}]},{"id":2,"name":"SCHEDULE_GET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Weekday","mask":7,"shift":0},{"type":"integer","name":"Reserved","mask":248,"shift":3}]}]},{"id":7,"name":"SCHEDULE_OVERRIDE_GET","status":"active","params":[]},{"id":8,"name":"SCHEDULE_OVERRIDE_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Override Type","mask":3,"shift":0},{"type":"integer","name":"Reserved","mask":252,"shift":2}]},{"type":"enum","name":"Override State","length":1,"values":{"0":"No override","1":"Temporary override","2":"Permanent override","3":"Reserved"}}]},{"id":6,"name":"SCHEDULE_OVERRIDE_SET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Override Type","mask":3,"shift":0},{"type":"integer","name":"Reserved","mask":252,"shift":2}]},{"type":"enum","name":"Override State","length":1,"values":{"0":"No override","1":"Temporary override","2":"Permanent override","3":"Reserved"}}]},{"id":3,"name":"SCHEDULE_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Weekday","mask":7,"shift":0},{"type":"integer","name":"Reserved","mask":248,"shift":3}]},{"type":"integer","name":"Switchpoint 0","length":3},{"type":"integer","name":"Switchpoint 1","length":3},{"type":"integer","name":"Switchpoint 2","length":3},{"type":"integer","name":"Switchpoint 3","length":3},{"type":"integer","name":"Switchpoint 4","length":3},{"type":"integer","name":"Switchpoint 5","length":3},{"type":"integer","name":"Switchpoint 6","length":3},{"type":"integer","name":"Switchpoint 7","length":3},{"type":"integer","name":"Switchpoint 8","length":3}]},{"id":1,"name":"SCHEDULE_SET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Weekday","mask":7,"shift":0},{"type":"integer","name":"Reserved","mask":248,"shift":3}]},{"type":"integer","name":"Switchpoint 0","length":3},{"type":"integer","name":"Switchpoint 1","length":3},{"type":"integer","name":"Switchpoint 2","length":3},{"type":"integer","name":"Switchpoint 3","length":3},{"type":"integer","name":"Switchpoint 4","length":3},{"type":"integer","name":"Switchpoint 5","length":3},{"type":"integer","name":"Switchpoint 6","length":3},{"type":"integer","name":"Switchpoint 7","length":3},{"type":"integer","name":"Switchpoint 8","length":3}]}]};
}

export interface ScheduleChangedGet {
	_commandClass: 0x46; // (70)
	_command: 0x4; // (4)
}

export interface ScheduleChangedReport {
	_commandClass: 0x46; // (70)
	_command: 0x5; // (5)
	changeCounter: number; // 1 byte unsigned integer
}

export interface ScheduleGet {
	_commandClass: 0x46; // (70)
	_command: 0x2; // (2)
	// TODO param Properties1 type bitfield
}

export interface ScheduleOverrideGet {
	_commandClass: 0x46; // (70)
	_command: 0x7; // (7)
}

export interface ScheduleOverrideReport {
	_commandClass: 0x46; // (70)
	_command: 0x8; // (8)
	// TODO param Properties1 type bitfield
	overrideState: OverrideStateEnum; // 1 byte enum value
}

export interface ScheduleOverrideSet {
	_commandClass: 0x46; // (70)
	_command: 0x6; // (6)
	// TODO param Properties1 type bitfield
	overrideState: OverrideStateEnum; // 1 byte enum value
}

export interface ScheduleReport {
	_commandClass: 0x46; // (70)
	_command: 0x3; // (3)
	// TODO param Properties1 type bitfield
	switchpoint0: number; // 3 byte unsigned integer
	switchpoint1: number; // 3 byte unsigned integer
	switchpoint2: number; // 3 byte unsigned integer
	switchpoint3: number; // 3 byte unsigned integer
	switchpoint4: number; // 3 byte unsigned integer
	switchpoint5: number; // 3 byte unsigned integer
	switchpoint6: number; // 3 byte unsigned integer
	switchpoint7: number; // 3 byte unsigned integer
	switchpoint8: number; // 3 byte unsigned integer
}

export interface ScheduleSet {
	_commandClass: 0x46; // (70)
	_command: 0x1; // (1)
	// TODO param Properties1 type bitfield
	switchpoint0: number; // 3 byte unsigned integer
	switchpoint1: number; // 3 byte unsigned integer
	switchpoint2: number; // 3 byte unsigned integer
	switchpoint3: number; // 3 byte unsigned integer
	switchpoint4: number; // 3 byte unsigned integer
	switchpoint5: number; // 3 byte unsigned integer
	switchpoint6: number; // 3 byte unsigned integer
	switchpoint7: number; // 3 byte unsigned integer
	switchpoint8: number; // 3 byte unsigned integer
}

export enum OverrideStateEnum {
	NoOverride = 0x0,
	TemporaryOverride = 0x1,
	PermanentOverride = 0x2,
	Reserved = 0x3,
}
