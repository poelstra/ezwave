/* Auto-generated */

export class CommandClassScheduleV4 {
	public static readonly commandClass = 0x53; // (83);
	public static readonly definition = {"id":83,"name":"COMMAND_CLASS_SCHEDULE","status":"active","version":4,"commands":[{"id":1,"name":"SCHEDULE_SUPPORTED_GET","status":"active","params":[{"type":"integer","name":"Schedule ID Block","length":1}]},{"id":2,"name":"SCHEDULE_SUPPORTED_REPORT","status":"active","params":[{"type":"integer","name":"Number of Supported Schedule ID","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Start Time Support","mask":63,"shift":0},{"type":"bool","name":"Fallback Support","mask":64,"shift":6},{"type":"bool","name":"Support Enable/Disable","mask":128,"shift":7}]},{"type":"integer","name":"Number of supported CC","length":1},{"type":"group","name":"vg1","length":{"name":"Number of supported CC","mask":255,"shift":0},"params":[{"type":"integer","name":"Supported CC","length":1},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Supported Command","mask":3,"shift":0},{"type":"integer","name":"Reserved","mask":252,"shift":2}]}]},{"type":"bitfield","name":"Properties3","length":1,"fields":[{"type":"integer","name":"Supported Override Types","mask":127,"shift":0},{"type":"bool","name":"Override Support","mask":128,"shift":7}]},{"type":"integer","name":"Schedule ID Block","length":1},{"type":"integer","name":"Number of Supported Schedule Blocks","length":1}]},{"id":3,"name":"COMMAND_SCHEDULE_SET","status":"active","params":[{"type":"integer","name":"Schedule ID","length":1},{"type":"integer","name":"Schedule ID Block","length":1},{"type":"integer","name":"Start Year","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Start Month","mask":15,"shift":0},{"type":"integer","name":"Recurrence Offset","mask":240,"shift":4}]},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Start Day of Month","mask":31,"shift":0},{"type":"enum","name":"Recurrence Mode","mask":96,"shift":5,"values":{"0":"Repeat every n hours","1":"Repeat every n days","2":"Repeat every n weeks"}},{"type":"bool","name":"Reserved1","mask":128,"shift":7}]},{"type":"bitfield","name":"Properties3","length":1,"fields":[{"type":"integer","name":"Start Weekday","mask":127,"shift":0},{"type":"bool","name":"Reserved2","mask":128,"shift":7}]},{"type":"bitfield","name":"Properties4","length":1,"fields":[{"type":"integer","name":"Start Hour","mask":31,"shift":0},{"type":"integer","name":"Duration Type","mask":224,"shift":5}]},{"type":"bitfield","name":"Properties5","length":1,"fields":[{"type":"integer","name":"Start Minute","mask":63,"shift":0},{"type":"bool","name":"Relative","mask":64,"shift":6},{"type":"bool","name":"Reserved3","mask":128,"shift":7}]},{"type":"integer","name":"Duration Byte","length":2},{"type":"integer","name":"Reports to Follow","length":1},{"type":"integer","name":"Number of Cmd to Follow","length":1},{"type":"group","name":"vg1","length":{"name":"Number of Cmd to Follow","mask":255,"shift":0},"params":[{"type":"integer","name":"Cmd Length","length":1},{"type":"blob","name":"Cmd Byte","length":{"name":"Cmd Length","mask":255,"shift":0}}]}]},{"id":4,"name":"COMMAND_SCHEDULE_GET","status":"active","params":[{"type":"integer","name":"Schedule ID","length":1},{"type":"integer","name":"Schedule ID Block","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Reserved","mask":127,"shift":0},{"type":"bool","name":"AID_RO_CTL","mask":128,"shift":7}]}]},{"id":5,"name":"COMMAND_SCHEDULE_REPORT","status":"active","params":[{"type":"integer","name":"Schedule ID","length":1},{"type":"integer","name":"Schedule ID Block","length":1},{"type":"integer","name":"Start Year","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Start Month","mask":15,"shift":0},{"type":"integer","name":"AID_RO","mask":240,"shift":4}]},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Start Day of Month","mask":31,"shift":0},{"type":"enum","name":"Recurrence Mode","mask":96,"shift":5,"values":{"0":"Repeat every n hours","1":"Repeat every n days","2":"Repeat every n weeks"}},{"type":"bool","name":"AID_RO_CTL","mask":128,"shift":7}]},{"type":"bitfield","name":"Properties3","length":1,"fields":[{"type":"integer","name":"Start Weekday","mask":127,"shift":0},{"type":"bool","name":"Reserved1","mask":128,"shift":7}]},{"type":"bitfield","name":"Properties4","length":1,"fields":[{"type":"integer","name":"Start Hour","mask":31,"shift":0},{"type":"integer","name":"Duration Type","mask":224,"shift":5}]},{"type":"bitfield","name":"Properties5","length":1,"fields":[{"type":"integer","name":"Start Minute","mask":63,"shift":0},{"type":"bool","name":"Relative","mask":64,"shift":6},{"type":"bool","name":"Reserved2","mask":128,"shift":7}]},{"type":"integer","name":"Duration Byte","length":2},{"type":"integer","name":"Reports to Follow","length":1},{"type":"integer","name":"Number of Cmd to Follow","length":1},{"type":"group","name":"vg1","length":{"name":"Number of Cmd to Follow","mask":255,"shift":0},"params":[{"type":"integer","name":"Cmd Length","length":1},{"type":"blob","name":"Cmd Byte","length":{"name":"Cmd Length","mask":255,"shift":0}}]}]},{"id":6,"name":"SCHEDULE_REMOVE","status":"active","params":[{"type":"integer","name":"Schedule ID","length":1},{"type":"integer","name":"Schedule ID Block","length":1}]},{"id":7,"name":"SCHEDULE_STATE_SET","status":"active","params":[{"type":"integer","name":"Schedule ID","length":1},{"type":"integer","name":"Schedule State","length":1},{"type":"integer","name":"Schedule ID Block","length":1}]},{"id":8,"name":"SCHEDULE_STATE_GET","status":"active","params":[{"type":"integer","name":"Schedule ID Block","length":1}]},{"id":9,"name":"SCHEDULE_STATE_REPORT","status":"active","params":[{"type":"integer","name":"Number of Supported Schedule ID","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Override","mask":1,"shift":0},{"type":"integer","name":"Reports to Follow","mask":254,"shift":1}]},{"type":"group","name":"vg1","length":"auto","params":[{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Active_ID 1","mask":15,"shift":0},{"type":"integer","name":"Active_ID 2","mask":240,"shift":4}]}]},{"type":"integer","name":"Schedule ID Block","length":1}]},{"id":10,"name":"SCHEDULE_SUPPORTED_COMMANDS_GET","status":"active","params":[{"type":"integer","name":"Schedule ID Block","length":1}]},{"id":11,"name":"SCHEDULE_SUPPORTED_COMMANDS_REPORT","status":"active","params":[{"type":"integer","name":"Schedule ID Block","length":1},{"type":"integer","name":"Command Class List Length","length":1},{"type":"group","name":"vg1","length":{"name":"Command Class List Length","mask":255,"shift":0},"params":[{"type":"integer","name":"Command Class","length":1,"valueType":"CMD_CLASS_REF"},{"type":"integer","name":"Supported Command List Length","length":1},{"type":"blob","name":"Supported Command","length":{"name":"Supported Command List Length","mask":255,"shift":0}}]}]}]};
}

export interface ScheduleSupportedGet {
	_commandClass: 0x53; // (83)
	_command: 0x1; // (1)
	scheduleIDBlock: number; // 1 byte unsigned integer
}

export interface ScheduleSupportedReport {
	_commandClass: 0x53; // (83)
	_command: 0x2; // (2)
	numberOfSupportedScheduleID: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	numberOfSupportedCC: number; // 1 byte unsigned integer
	// TODO param vg1 type group
	// TODO param Properties3 type bitfield
	scheduleIDBlock: number; // 1 byte unsigned integer
	numberOfSupportedScheduleBlocks: number; // 1 byte unsigned integer
}

export interface CommandScheduleSet {
	_commandClass: 0x53; // (83)
	_command: 0x3; // (3)
	scheduleID: number; // 1 byte unsigned integer
	scheduleIDBlock: number; // 1 byte unsigned integer
	startYear: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param Properties2 type bitfield
	// TODO param Properties3 type bitfield
	// TODO param Properties4 type bitfield
	// TODO param Properties5 type bitfield
	durationByte: number; // 2 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	numberOfCmdToFollow: number; // 1 byte unsigned integer
	// TODO param vg1 type group
}

export interface CommandScheduleGet {
	_commandClass: 0x53; // (83)
	_command: 0x4; // (4)
	scheduleID: number; // 1 byte unsigned integer
	scheduleIDBlock: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
}

export interface CommandScheduleReport {
	_commandClass: 0x53; // (83)
	_command: 0x5; // (5)
	scheduleID: number; // 1 byte unsigned integer
	scheduleIDBlock: number; // 1 byte unsigned integer
	startYear: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param Properties2 type bitfield
	// TODO param Properties3 type bitfield
	// TODO param Properties4 type bitfield
	// TODO param Properties5 type bitfield
	durationByte: number; // 2 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	numberOfCmdToFollow: number; // 1 byte unsigned integer
	// TODO param vg1 type group
}

export interface ScheduleRemove {
	_commandClass: 0x53; // (83)
	_command: 0x6; // (6)
	scheduleID: number; // 1 byte unsigned integer
	scheduleIDBlock: number; // 1 byte unsigned integer
}

export interface ScheduleStateSet {
	_commandClass: 0x53; // (83)
	_command: 0x7; // (7)
	scheduleID: number; // 1 byte unsigned integer
	scheduleState: number; // 1 byte unsigned integer
	scheduleIDBlock: number; // 1 byte unsigned integer
}

export interface ScheduleStateGet {
	_commandClass: 0x53; // (83)
	_command: 0x8; // (8)
	scheduleIDBlock: number; // 1 byte unsigned integer
}

export interface ScheduleStateReport {
	_commandClass: 0x53; // (83)
	_command: 0x9; // (9)
	numberOfSupportedScheduleID: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param vg1 type group
	scheduleIDBlock: number; // 1 byte unsigned integer
}

export interface ScheduleSupportedCommandsGet {
	_commandClass: 0x53; // (83)
	_command: 0xa; // (10)
	scheduleIDBlock: number; // 1 byte unsigned integer
}

export interface ScheduleSupportedCommandsReport {
	_commandClass: 0x53; // (83)
	_command: 0xb; // (11)
	scheduleIDBlock: number; // 1 byte unsigned integer
	commandClassListLength: number; // 1 byte unsigned integer
	// TODO param vg1 type group
}
