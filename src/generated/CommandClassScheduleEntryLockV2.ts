/* Auto-generated */

// deprecated
export class CommandClassScheduleEntryLockV2 {
	public static readonly commandClass = 0x4e; // (78);
	public static readonly definition = {"id":78,"name":"COMMAND_CLASS_SCHEDULE_ENTRY_LOCK","status":"deprecated","version":2,"commands":[{"id":2,"name":"SCHEDULE_ENTRY_LOCK_ENABLE_ALL_SET","status":"active","params":[{"type":"integer","name":"Enabled","length":1,"values":{"0":"disabled","1":"enabled"}}]},{"id":1,"name":"SCHEDULE_ENTRY_LOCK_ENABLE_SET","status":"active","params":[{"type":"integer","name":"User Identifier","length":1},{"type":"integer","name":"Enabled","length":1,"values":{"0":"disabled","1":"enabled"}}]},{"id":11,"name":"SCHEDULE_ENTRY_LOCK_TIME_OFFSET_GET","status":"active","params":[]},{"id":12,"name":"SCHEDULE_ENTRY_LOCK_TIME_OFFSET_REPORT","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"integer","name":"Hour TZO","mask":127,"shift":0},{"type":"bool","name":"Sign TZO","mask":128,"shift":7}]},{"type":"integer","name":"Minute TZO","length":1},{"type":"bitfield","name":"Level2","length":1,"fields":[{"type":"integer","name":"Minute Offset DST","mask":127,"shift":0},{"type":"bool","name":"Sign Offset DST","mask":128,"shift":7}]}]},{"id":13,"name":"SCHEDULE_ENTRY_LOCK_TIME_OFFSET_SET","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"integer","name":"Hour TZO","mask":127,"shift":0},{"type":"bool","name":"Sign TZO","mask":128,"shift":7}]},{"type":"integer","name":"Minute TZO","length":1},{"type":"bitfield","name":"Level2","length":1,"fields":[{"type":"integer","name":"Minute Offset DST","mask":127,"shift":0},{"type":"bool","name":"Sign Offset DST","mask":128,"shift":7}]}]},{"id":4,"name":"SCHEDULE_ENTRY_LOCK_WEEK_DAY_GET","status":"active","params":[{"type":"integer","name":"User Identifier","length":1},{"type":"integer","name":"Schedule Slot ID","length":1}]},{"id":5,"name":"SCHEDULE_ENTRY_LOCK_WEEK_DAY_REPORT","status":"active","params":[{"type":"integer","name":"User Identifier","length":1},{"type":"integer","name":"Schedule Slot ID","length":1},{"type":"integer","name":"Day of Week","length":1},{"type":"integer","name":"Start Hour","length":1},{"type":"integer","name":"Start Minute","length":1},{"type":"integer","name":"Stop Hour","length":1},{"type":"integer","name":"Stop Minute","length":1}]},{"id":3,"name":"SCHEDULE_ENTRY_LOCK_WEEK_DAY_SET","status":"active","params":[{"type":"integer","name":"Set Action","length":1,"values":{"0":"Erase","1":"Modify"}},{"type":"integer","name":"User Identifier","length":1},{"type":"integer","name":"Schedule Slot ID","length":1},{"type":"integer","name":"Day of Week","length":1},{"type":"integer","name":"Start Hour","length":1},{"type":"integer","name":"Start Minute","length":1},{"type":"integer","name":"Stop Hour","length":1},{"type":"integer","name":"Stop Minute","length":1}]},{"id":7,"name":"SCHEDULE_ENTRY_LOCK_YEAR_DAY_GET","status":"active","params":[{"type":"integer","name":"User Identifier","length":1},{"type":"integer","name":"Schedule Slot ID","length":1}]},{"id":8,"name":"SCHEDULE_ENTRY_LOCK_YEAR_DAY_REPORT","status":"active","params":[{"type":"integer","name":"User Identifier","length":1},{"type":"integer","name":"Schedule Slot ID","length":1},{"type":"integer","name":"Start Year","length":1},{"type":"integer","name":"Start Month","length":1},{"type":"integer","name":"Start Day","length":1},{"type":"integer","name":"Start Hour","length":1},{"type":"integer","name":"Start Minute","length":1},{"type":"integer","name":"Stop Year","length":1},{"type":"integer","name":"Stop Month","length":1},{"type":"integer","name":"Stop Day","length":1},{"type":"integer","name":"Stop Hour","length":1},{"type":"integer","name":"Stop Minute","length":1}]},{"id":6,"name":"SCHEDULE_ENTRY_LOCK_YEAR_DAY_SET","status":"active","params":[{"type":"integer","name":"Set Action","length":1,"values":{"0":"Erase","1":"Modify"}},{"type":"integer","name":"User Identifier","length":1},{"type":"integer","name":"Schedule Slot ID","length":1},{"type":"integer","name":"Start Year","length":1},{"type":"integer","name":"Start Month","length":1},{"type":"integer","name":"Start Day","length":1},{"type":"integer","name":"Start Hour","length":1},{"type":"integer","name":"Start Minute","length":1},{"type":"integer","name":"Stop Year","length":1},{"type":"integer","name":"Stop Month","length":1},{"type":"integer","name":"Stop Day","length":1},{"type":"integer","name":"Stop Hour","length":1},{"type":"integer","name":"Stop Minute","length":1}]},{"id":9,"name":"SCHEDULE_ENTRY_TYPE_SUPPORTED_GET","status":"active","params":[]},{"id":10,"name":"SCHEDULE_ENTRY_TYPE_SUPPORTED_REPORT","status":"active","params":[{"type":"integer","name":"Number of Slots Week Day","length":1},{"type":"integer","name":"Number of Slots Year Day","length":1}]}]};
}

export interface ScheduleEntryLockEnableAllSet {
	_commandClass: 0x4e; // (78)
	_command: 0x2; // (2)
	enabled: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockEnableSet {
	_commandClass: 0x4e; // (78)
	_command: 0x1; // (1)
	userIdentifier: number; // 1 byte unsigned integer
	enabled: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockTimeOffsetGet {
	_commandClass: 0x4e; // (78)
	_command: 0xb; // (11)
}

export interface ScheduleEntryLockTimeOffsetReport {
	_commandClass: 0x4e; // (78)
	_command: 0xc; // (12)
	// TODO param Level type bitfield
	minuteTZO: number; // 1 byte unsigned integer
	// TODO param Level2 type bitfield
}

export interface ScheduleEntryLockTimeOffsetSet {
	_commandClass: 0x4e; // (78)
	_command: 0xd; // (13)
	// TODO param Level type bitfield
	minuteTZO: number; // 1 byte unsigned integer
	// TODO param Level2 type bitfield
}

export interface ScheduleEntryLockWeekDayGet {
	_commandClass: 0x4e; // (78)
	_command: 0x4; // (4)
	userIdentifier: number; // 1 byte unsigned integer
	scheduleSlotID: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockWeekDayReport {
	_commandClass: 0x4e; // (78)
	_command: 0x5; // (5)
	userIdentifier: number; // 1 byte unsigned integer
	scheduleSlotID: number; // 1 byte unsigned integer
	dayOfWeek: number; // 1 byte unsigned integer
	startHour: number; // 1 byte unsigned integer
	startMinute: number; // 1 byte unsigned integer
	stopHour: number; // 1 byte unsigned integer
	stopMinute: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockWeekDaySet {
	_commandClass: 0x4e; // (78)
	_command: 0x3; // (3)
	setAction: number; // 1 byte unsigned integer
	userIdentifier: number; // 1 byte unsigned integer
	scheduleSlotID: number; // 1 byte unsigned integer
	dayOfWeek: number; // 1 byte unsigned integer
	startHour: number; // 1 byte unsigned integer
	startMinute: number; // 1 byte unsigned integer
	stopHour: number; // 1 byte unsigned integer
	stopMinute: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockYearDayGet {
	_commandClass: 0x4e; // (78)
	_command: 0x7; // (7)
	userIdentifier: number; // 1 byte unsigned integer
	scheduleSlotID: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockYearDayReport {
	_commandClass: 0x4e; // (78)
	_command: 0x8; // (8)
	userIdentifier: number; // 1 byte unsigned integer
	scheduleSlotID: number; // 1 byte unsigned integer
	startYear: number; // 1 byte unsigned integer
	startMonth: number; // 1 byte unsigned integer
	startDay: number; // 1 byte unsigned integer
	startHour: number; // 1 byte unsigned integer
	startMinute: number; // 1 byte unsigned integer
	stopYear: number; // 1 byte unsigned integer
	stopMonth: number; // 1 byte unsigned integer
	stopDay: number; // 1 byte unsigned integer
	stopHour: number; // 1 byte unsigned integer
	stopMinute: number; // 1 byte unsigned integer
}

export interface ScheduleEntryLockYearDaySet {
	_commandClass: 0x4e; // (78)
	_command: 0x6; // (6)
	setAction: number; // 1 byte unsigned integer
	userIdentifier: number; // 1 byte unsigned integer
	scheduleSlotID: number; // 1 byte unsigned integer
	startYear: number; // 1 byte unsigned integer
	startMonth: number; // 1 byte unsigned integer
	startDay: number; // 1 byte unsigned integer
	startHour: number; // 1 byte unsigned integer
	startMinute: number; // 1 byte unsigned integer
	stopYear: number; // 1 byte unsigned integer
	stopMonth: number; // 1 byte unsigned integer
	stopDay: number; // 1 byte unsigned integer
	stopHour: number; // 1 byte unsigned integer
	stopMinute: number; // 1 byte unsigned integer
}

export interface ScheduleEntryTypeSupportedGet {
	_commandClass: 0x4e; // (78)
	_command: 0x9; // (9)
}

export interface ScheduleEntryTypeSupportedReport {
	_commandClass: 0x4e; // (78)
	_command: 0xa; // (10)
	numberOfSlotsWeekDay: number; // 1 byte unsigned integer
	numberOfSlotsYearDay: number; // 1 byte unsigned integer
}
