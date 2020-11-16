/* Auto-generated */

export class CommandClassTimeParametersV1 {
	public static readonly commandClass = 0x8b; // (139);
	public static readonly definition = {"id":139,"name":"COMMAND_CLASS_TIME_PARAMETERS","status":"active","version":1,"commands":[{"id":2,"name":"TIME_PARAMETERS_GET","status":"active","params":[]},{"id":3,"name":"TIME_PARAMETERS_REPORT","status":"active","params":[{"type":"integer","name":"Year","length":2},{"type":"integer","name":"Month","length":1},{"type":"integer","name":"Day","length":1},{"type":"integer","name":"Hour UTC","length":1},{"type":"integer","name":"Minute UTC","length":1},{"type":"integer","name":"Second UTC","length":1}]},{"id":1,"name":"TIME_PARAMETERS_SET","status":"active","params":[{"type":"integer","name":"Year","length":2},{"type":"integer","name":"Month","length":1},{"type":"integer","name":"Day","length":1},{"type":"integer","name":"Hour UTC","length":1},{"type":"integer","name":"Minute UTC","length":1},{"type":"integer","name":"Second UTC","length":1}]}]};
}

export interface TimeParametersGet {
	_commandClass: 0x8b; // (139)
	_command: 0x2; // (2)
}

export interface TimeParametersReport {
	_commandClass: 0x8b; // (139)
	_command: 0x3; // (3)
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourUTC: number; // 1 byte unsigned integer
	minuteUTC: number; // 1 byte unsigned integer
	secondUTC: number; // 1 byte unsigned integer
}

export interface TimeParametersSet {
	_commandClass: 0x8b; // (139)
	_command: 0x1; // (1)
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourUTC: number; // 1 byte unsigned integer
	minuteUTC: number; // 1 byte unsigned integer
	secondUTC: number; // 1 byte unsigned integer
}
