/* Auto-generated */

export class CommandClassScreenAttributesV2 {
	public static readonly commandClass = 0x93; // (147);
	public static readonly definition = {"id":147,"name":"COMMAND_CLASS_SCREEN_ATTRIBUTES","status":"active","version":2,"commands":[{"id":1,"name":"SCREEN_ATTRIBUTES_GET","status":"active","params":[]},{"id":3,"name":"SCREEN_ATTRIBUTES_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Number of Lines","mask":31,"shift":0},{"type":"bool","name":"Escape Sequence","mask":32,"shift":5},{"type":"int","name":"Reserved","mask":192,"shift":6}]},{"type":"integer","name":"Number of Characters per Line","length":1},{"type":"integer","name":"Size of Line Buffer","length":1},{"type":"integer","name":"Numerical Presentation of a Character","length":1},{"type":"integer","name":"Screen Timeout","length":1}]}]};
}

export interface ScreenAttributesGet {
	_commandClass: 0x93; // (147)
	_command: 0x1; // (1)
}

export interface ScreenAttributesReport {
	_commandClass: 0x93; // (147)
	_command: 0x3; // (3)
	// TODO param Properties1 type bitfield
	numberOfCharactersPerLine: number; // 1 byte unsigned integer
	sizeOfLineBuffer: number; // 1 byte unsigned integer
	numericalPresentationOfACharacter: number; // 1 byte unsigned integer
	screenTimeout: number; // 1 byte unsigned integer
}
