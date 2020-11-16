/* Auto-generated */

export class CommandClassAvContentSearchMdV1 {
	public static readonly commandClass = 0x97; // (151);
	public static readonly definition = {"id":151,"name":"COMMAND_CLASS_AV_CONTENT_SEARCH_MD","status":"active","version":1,"commands":[{"id":1,"name":"AV_CONTENT_SEARCH_MD_GET","status":"active","params":[]},{"id":2,"name":"AV_CONTENT_SEARCH_MD_REPORT","status":"active","params":[]}]};
}

export interface AvContentSearchMdGet {
	_commandClass: 0x97; // (151)
	_command: 0x1; // (1)
}

export interface AvContentSearchMdReport {
	_commandClass: 0x97; // (151)
	_command: 0x2; // (2)
}
