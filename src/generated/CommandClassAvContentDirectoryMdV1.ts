/* Auto-generated */

export class CommandClassAvContentDirectoryMdV1 {
	public static readonly commandClass = 0x95; // (149);
	public static readonly definition = {"id":149,"name":"COMMAND_CLASS_AV_CONTENT_DIRECTORY_MD","status":"active","version":1,"commands":[{"id":3,"name":"AV_CONTENT_BROWSE_MD_BY_LETTER_GET","status":"active","params":[]},{"id":4,"name":"AV_CONTENT_BROWSE_MD_BY_LETTER_REPORT","status":"active","params":[]},{"id":5,"name":"AV_CONTENT_BROWSE_MD_CHILD_COUNT_GET","status":"active","params":[]},{"id":6,"name":"AV_CONTENT_BROWSE_MD_CHILD_COUNT_REPORT","status":"active","params":[]},{"id":1,"name":"AV_CONTENT_BROWSE_MD_GET","status":"active","params":[]},{"id":2,"name":"AV_CONTENT_BROWSE_MD_REPORT","status":"active","params":[]},{"id":7,"name":"AV_MATCH_ITEM_TO_RENDERER_MD_GET","status":"active","params":[]},{"id":8,"name":"AV_MATCH_ITEM_TO_RENDERER_MD_REPORT","status":"active","params":[]}]};
}

export interface AvContentBrowseMdByLetterGet {
	_commandClass: 0x95; // (149)
	_command: 0x3; // (3)
}

export interface AvContentBrowseMdByLetterReport {
	_commandClass: 0x95; // (149)
	_command: 0x4; // (4)
}

export interface AvContentBrowseMdChildCountGet {
	_commandClass: 0x95; // (149)
	_command: 0x5; // (5)
}

export interface AvContentBrowseMdChildCountReport {
	_commandClass: 0x95; // (149)
	_command: 0x6; // (6)
}

export interface AvContentBrowseMdGet {
	_commandClass: 0x95; // (149)
	_command: 0x1; // (1)
}

export interface AvContentBrowseMdReport {
	_commandClass: 0x95; // (149)
	_command: 0x2; // (2)
}

export interface AvMatchItemToRendererMdGet {
	_commandClass: 0x95; // (149)
	_command: 0x7; // (7)
}

export interface AvMatchItemToRendererMdReport {
	_commandClass: 0x95; // (149)
	_command: 0x8; // (8)
}
