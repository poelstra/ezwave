/* Auto-generated */

// obsolete
export class CommandClassBasicWindowCoveringV1 {
	public static readonly commandClass = 0x50; // (80);
	public static readonly definition = {"id":80,"name":"COMMAND_CLASS_BASIC_WINDOW_COVERING","status":"obsolete","version":1,"commands":[{"id":1,"name":"BASIC_WINDOW_COVERING_START_LEVEL_CHANGE","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"int","name":"Reserved1","mask":63,"shift":0},{"type":"bool","name":"Open/ Close","mask":64,"shift":6},{"type":"bool","name":"Reserved2","mask":128,"shift":7}]}]},{"id":2,"name":"BASIC_WINDOW_COVERING_STOP_LEVEL_CHANGE","status":"active","params":[]}]};
}

export interface BasicWindowCoveringStartLevelChange {
	_commandClass: 0x50; // (80)
	_command: 0x1; // (1)
	// TODO param Level type bitfield
}

export interface BasicWindowCoveringStopLevelChange {
	_commandClass: 0x50; // (80)
	_command: 0x2; // (2)
}
