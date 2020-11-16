/* Auto-generated */

export class CommandClassClockV1 {
	public static readonly commandClass = 0x81; // (129);
	public static readonly definition = {"id":129,"name":"COMMAND_CLASS_CLOCK","status":"active","version":1,"commands":[{"id":5,"name":"CLOCK_GET","status":"active","params":[]},{"id":6,"name":"CLOCK_REPORT","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"int","name":"Hour","mask":31,"shift":0},{"type":"int","name":"Weekday","mask":224,"shift":5}]},{"type":"integer","name":"Minute","length":1}]},{"id":4,"name":"CLOCK_SET","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"int","name":"Hour","mask":31,"shift":0},{"type":"int","name":"Weekday","mask":224,"shift":5}]},{"type":"integer","name":"Minute","length":1}]}]};
}

export interface ClockGet {
	_commandClass: 0x81; // (129)
	_command: 0x5; // (5)
}

export interface ClockReport {
	_commandClass: 0x81; // (129)
	_command: 0x6; // (6)
	// TODO param Level type bitfield
	minute: number; // 1 byte unsigned integer
}

export interface ClockSet {
	_commandClass: 0x81; // (129)
	_command: 0x4; // (4)
	// TODO param Level type bitfield
	minute: number; // 1 byte unsigned integer
}
