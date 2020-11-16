/* Auto-generated */

export class CommandClassTimeV1 {
	public static readonly commandClass = 0x8a; // (138);
	public static readonly definition = {"id":138,"name":"COMMAND_CLASS_TIME","status":"active","version":1,"commands":[{"id":3,"name":"DATE_GET","status":"active","params":[]},{"id":4,"name":"DATE_REPORT","status":"active","params":[{"type":"integer","name":"Year","length":2},{"type":"integer","name":"Month","length":1},{"type":"integer","name":"Day","length":1}]},{"id":1,"name":"TIME_GET","status":"active","params":[]},{"id":2,"name":"TIME_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Hour Local Time","mask":31,"shift":0},{"type":"int","name":"Reserved","mask":96,"shift":5},{"type":"bool","name":"RTC failure","mask":128,"shift":7}]},{"type":"integer","name":"Minute Local Time","length":1},{"type":"integer","name":"Second Local Time","length":1}]}]};
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

export interface TimeReport {
	_commandClass: 0x8a; // (138)
	_command: 0x2; // (2)
	// TODO param Properties1 type bitfield
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
}
