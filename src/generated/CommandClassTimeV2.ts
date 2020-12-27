/* Auto-generated */

export class CommandClassTimeV2 {
	public static readonly commandClass = 0x8a; // (138);
	public static readonly definition = {"id":138,"name":"COMMAND_CLASS_TIME","status":"active","version":2,"commands":[{"id":3,"name":"DATE_GET","status":"active","params":[]},{"id":4,"name":"DATE_REPORT","status":"active","params":[{"type":"integer","name":"Year","length":2},{"type":"integer","name":"Month","length":1},{"type":"integer","name":"Day","length":1}]},{"id":1,"name":"TIME_GET","status":"active","params":[]},{"id":6,"name":"TIME_OFFSET_GET","status":"active","params":[]},{"id":7,"name":"TIME_OFFSET_REPORT","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"integer","name":"Hour TZO","mask":127,"shift":0},{"type":"bool","name":"Sign TZO","mask":128,"shift":7}]},{"type":"integer","name":"Minute TZO","length":1},{"type":"bitfield","name":"Level2","length":1,"fields":[{"type":"integer","name":"Minute Offset DST","mask":127,"shift":0},{"type":"bool","name":"Sign Offset DST","mask":128,"shift":7}]},{"type":"integer","name":"Month Start DST","length":1},{"type":"integer","name":"Day Start DST","length":1},{"type":"integer","name":"Hour Start DST","length":1},{"type":"integer","name":"Month End DST","length":1},{"type":"integer","name":"Day End DST","length":1},{"type":"integer","name":"Hour End DST","length":1}]},{"id":5,"name":"TIME_OFFSET_SET","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"integer","name":"Hour TZO","mask":127,"shift":0},{"type":"bool","name":"Sign TZO","mask":128,"shift":7}]},{"type":"integer","name":"Minute TZO","length":1},{"type":"bitfield","name":"Level2","length":1,"fields":[{"type":"integer","name":"Minute Offset DST","mask":127,"shift":0},{"type":"bool","name":"Sign Offset DST","mask":128,"shift":7}]},{"type":"integer","name":"Month Start DST","length":1},{"type":"integer","name":"Day Start DST","length":1},{"type":"integer","name":"Hour Start DST","length":1},{"type":"integer","name":"Month End DST","length":1},{"type":"integer","name":"Day End DST","length":1},{"type":"integer","name":"Hour End DST","length":1}]},{"id":2,"name":"TIME_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Hour Local Time","mask":31,"shift":0},{"type":"integer","name":"Reserved","mask":96,"shift":5},{"type":"bool","name":"RTC failure","mask":128,"shift":7}]},{"type":"integer","name":"Minute Local Time","length":1},{"type":"integer","name":"Second Local Time","length":1}]}]};
}

export interface DateGet {
	_commandClass: 0x8a; // (138)
	_command: 0x3; // (3)
}

export interface DateReport {
	_commandClass: 0x8a; // (138)
	_command: 0x4; // (4)
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
}

export interface TimeGet {
	_commandClass: 0x8a; // (138)
	_command: 0x1; // (1)
}

export interface TimeOffsetGet {
	_commandClass: 0x8a; // (138)
	_command: 0x6; // (6)
}

export interface TimeOffsetReport {
	_commandClass: 0x8a; // (138)
	_command: 0x7; // (7)
	// TODO param Level type bitfield
	minuteTZO: number; // 1 byte unsigned integer
	// TODO param Level2 type bitfield
	monthStartDST: number; // 1 byte unsigned integer
	dayStartDST: number; // 1 byte unsigned integer
	hourStartDST: number; // 1 byte unsigned integer
	monthEndDST: number; // 1 byte unsigned integer
	dayEndDST: number; // 1 byte unsigned integer
	hourEndDST: number; // 1 byte unsigned integer
}

export interface TimeOffsetSet {
	_commandClass: 0x8a; // (138)
	_command: 0x5; // (5)
	// TODO param Level type bitfield
	minuteTZO: number; // 1 byte unsigned integer
	// TODO param Level2 type bitfield
	monthStartDST: number; // 1 byte unsigned integer
	dayStartDST: number; // 1 byte unsigned integer
	hourStartDST: number; // 1 byte unsigned integer
	monthEndDST: number; // 1 byte unsigned integer
	dayEndDST: number; // 1 byte unsigned integer
	hourEndDST: number; // 1 byte unsigned integer
}

export interface TimeReport {
	_commandClass: 0x8a; // (138)
	_command: 0x2; // (2)
	// TODO param Properties1 type bitfield
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
}
