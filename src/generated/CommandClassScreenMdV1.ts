/* Auto-generated */

export class CommandClassScreenMdV1 {
	public static readonly commandClass = 0x92; // (146);
	public static readonly definition = {"id":146,"name":"COMMAND_CLASS_SCREEN_MD","status":"active","version":1,"commands":[{"id":1,"name":"SCREEN_MD_GET","status":"active","params":[{"type":"integer","name":"Number of Reports","length":1},{"type":"integer","name":"Node ID","length":1,"valueType":"NODE_NUMBER"}]},{"id":2,"name":"SCREEN_MD_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Char. Presentation","mask":7,"shift":0},{"type":"integer","name":"Screen Settings","mask":56,"shift":3},{"type":"bool","name":"Reserved","mask":64,"shift":6},{"type":"bool","name":"More Data","mask":128,"shift":7}]},{"type":"group","name":"vg","length":"auto","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Line Number","mask":15,"shift":0},{"type":"bool","name":"Clear","mask":16,"shift":4},{"type":"integer","name":"Line Settings","mask":224,"shift":5}]},{"type":"integer","name":"Character Position","length":1},{"type":"integer","name":"Number of Characters","length":1},{"type":"blob","name":"Character","length":{"name":"Number of Characters","mask":255,"shift":0}}]}]}]};
}

export interface ScreenMdGet {
	_commandClass: 0x92; // (146)
	_command: 0x1; // (1)
	numberOfReports: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export interface ScreenMdReport {
	_commandClass: 0x92; // (146)
	_command: 0x2; // (2)
	// TODO param Properties1 type bitfield
	// TODO param vg type group
}
