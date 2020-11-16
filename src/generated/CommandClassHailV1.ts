/* Auto-generated */

// obsolete
export class CommandClassHailV1 {
	public static readonly commandClass = 0x82; // (130);
	public static readonly definition = {"id":130,"name":"COMMAND_CLASS_HAIL","status":"obsolete","version":1,"commands":[{"id":1,"name":"HAIL","status":"active","params":[]}]};
}

export interface Hail {
	_commandClass: 0x82; // (130)
	_command: 0x1; // (1)
}
