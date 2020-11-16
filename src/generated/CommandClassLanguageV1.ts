/* Auto-generated */

export class CommandClassLanguageV1 {
	public static readonly commandClass = 0x89; // (137);
	public static readonly definition = {"id":137,"name":"COMMAND_CLASS_LANGUAGE","status":"active","version":1,"commands":[{"id":2,"name":"LANGUAGE_GET","status":"active","params":[]},{"id":3,"name":"LANGUAGE_REPORT","status":"active","params":[{"type":"integer","name":"Language","length":3},{"type":"integer","name":"Country","length":2}]},{"id":1,"name":"LANGUAGE_SET","status":"active","params":[{"type":"integer","name":"Language","length":3},{"type":"integer","name":"Country","length":2}]}]};
}

export interface LanguageGet {
	_commandClass: 0x89; // (137)
	_command: 0x2; // (2)
}

export interface LanguageReport {
	_commandClass: 0x89; // (137)
	_command: 0x3; // (3)
	language: number; // 3 byte unsigned integer
	country: number; // 2 byte unsigned integer
}

export interface LanguageSet {
	_commandClass: 0x89; // (137)
	_command: 0x1; // (1)
	language: number; // 3 byte unsigned integer
	country: number; // 2 byte unsigned integer
}
