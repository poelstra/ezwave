/* Auto-generated */

export class CommandClassBasicV2 {
	public static readonly commandClass = 0x20; // (32);
	public static readonly definition = {"id":32,"name":"COMMAND_CLASS_BASIC","status":"active","version":2,"commands":[{"id":2,"name":"BASIC_GET","status":"active","params":[]},{"id":3,"name":"BASIC_REPORT","status":"active","params":[{"type":"integer","name":"Current Value","length":1},{"type":"integer","name":"Target Value","length":1},{"type":"integer","name":"Duration","length":1}]},{"id":1,"name":"BASIC_SET","status":"active","params":[{"type":"integer","name":"Value","length":1}]}]};
}

export interface BasicGet {
	_commandClass: 0x20; // (32)
	_command: 0x2; // (2)
}

export interface BasicReport {
	_commandClass: 0x20; // (32)
	_command: 0x3; // (3)
	currentValue: number; // 1 byte unsigned integer
	targetValue: number; // 1 byte unsigned integer
	duration: number; // 1 byte unsigned integer
}

export interface BasicSet {
	_commandClass: 0x20; // (32)
	_command: 0x1; // (1)
	value: number; // 1 byte unsigned integer
}
