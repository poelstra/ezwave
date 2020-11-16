/* Auto-generated */

export class CommandClassAvTaggingMdV1 {
	public static readonly commandClass = 0x99; // (153);
	public static readonly definition = {"id":153,"name":"COMMAND_CLASS_AV_TAGGING_MD","status":"active","version":1,"commands":[{"id":1,"name":"AV_TAGGING_MD_GET","status":"active","params":[]},{"id":2,"name":"AV_TAGGING_MD_REPORT","status":"active","params":[]}]};
}

export interface AvTaggingMdGet {
	_commandClass: 0x99; // (153)
	_command: 0x1; // (1)
}

export interface AvTaggingMdReport {
	_commandClass: 0x99; // (153)
	_command: 0x2; // (2)
}
