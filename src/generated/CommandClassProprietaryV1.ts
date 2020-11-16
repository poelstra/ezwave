/* Auto-generated */

// deprecated
export class CommandClassProprietaryV1 {
	public static readonly commandClass = 0x88; // (136);
	public static readonly definition = {"id":136,"name":"COMMAND_CLASS_PROPRIETARY","status":"deprecated","version":1,"commands":[{"id":2,"name":"PROPRIETARY_GET","status":"active","params":[{"type":"blob","name":"Data","length":"auto"}]},{"id":3,"name":"PROPRIETARY_REPORT","status":"active","params":[{"type":"blob","name":"Data","length":"auto"}]},{"id":1,"name":"PROPRIETARY_SET","status":"active","params":[{"type":"blob","name":"Data","length":"auto"}]}]};
}

export interface ProprietaryGet {
	_commandClass: 0x88; // (136)
	_command: 0x2; // (2)
	// TODO param Data type blob
}

export interface ProprietaryReport {
	_commandClass: 0x88; // (136)
	_command: 0x3; // (3)
	// TODO param Data type blob
}

export interface ProprietarySet {
	_commandClass: 0x88; // (136)
	_command: 0x1; // (1)
	// TODO param Data type blob
}
