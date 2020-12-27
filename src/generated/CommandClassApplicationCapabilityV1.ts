/* Auto-generated */

// obsolete
export class CommandClassApplicationCapabilityV1 {
	public static readonly commandClass = 0x57; // (87);
	public static readonly definition = {"id":87,"name":"COMMAND_CLASS_APPLICATION_CAPABILITY","status":"obsolete","version":1,"commands":[{"id":1,"name":"COMMAND_COMMAND_CLASS_NOT_SUPPORTED","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Reserved","mask":127,"shift":0},{"type":"bool","name":"Dynamic","mask":128,"shift":7}]},{"type":"integer","name":"Offending Command Class","length":1,"valueType":"CMD_CLASS_REF"},{"type":"integer","name":"Offending Command","length":1,"valueType":"CMD_REF"}]}]};
}

export interface CommandCommandClassNotSupported {
	_commandClass: 0x57; // (87)
	_command: 0x1; // (1)
	// TODO param Properties1 type bitfield
	offendingCommandClass: number; // 1 byte unsigned integer
	offendingCommand: number; // 1 byte unsigned integer
}
