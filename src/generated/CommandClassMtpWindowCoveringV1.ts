/* Auto-generated */

// obsolete
export class CommandClassMtpWindowCoveringV1 {
	public static readonly commandClass = 0x51; // (81);
	public static readonly definition = {"id":81,"name":"COMMAND_CLASS_MTP_WINDOW_COVERING","status":"obsolete","version":1,"commands":[{"id":2,"name":"MOVE_TO_POSITION_GET","status":"active","params":[]},{"id":3,"name":"MOVE_TO_POSITION_REPORT","status":"active","params":[{"type":"integer","name":"Value","length":1,"values":{"0":"close","255":"open"}}]},{"id":1,"name":"MOVE_TO_POSITION_SET","status":"active","params":[{"type":"integer","name":"Value","length":1,"values":{"0":"close","255":"open"}}]}]};
}

export interface MoveToPositionGet {
	_commandClass: 0x51; // (81)
	_command: 0x2; // (2)
}

export interface MoveToPositionReport {
	_commandClass: 0x51; // (81)
	_command: 0x3; // (3)
	value: number; // 1 byte unsigned integer
}

export interface MoveToPositionSet {
	_commandClass: 0x51; // (81)
	_command: 0x1; // (1)
	value: number; // 1 byte unsigned integer
}
