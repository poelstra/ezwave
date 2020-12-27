/* Auto-generated */

// deprecated
export class CommandClassGroupingNameV1 {
	public static readonly commandClass = 0x7b; // (123);
	public static readonly definition = {"id":123,"name":"COMMAND_CLASS_GROUPING_NAME","status":"deprecated","version":1,"commands":[{"id":2,"name":"GROUPING_NAME_GET","status":"active","params":[{"type":"integer","name":"Grouping identifier","length":1}]},{"id":3,"name":"GROUPING_NAME_REPORT","status":"active","params":[{"type":"integer","name":"Grouping identifier","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Char. Presentation","mask":7,"shift":0},{"type":"integer","name":"Reserved","mask":248,"shift":3}]},{"type":"text","name":"Grouping Name","length":16}]},{"id":1,"name":"GROUPING_NAME_SET","status":"active","params":[{"type":"integer","name":"Grouping identifier","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Char. Presentation","mask":7,"shift":0},{"type":"integer","name":"Reserved","mask":248,"shift":3}]},{"type":"text","name":"Grouping Name","length":16}]}]};
}

export interface GroupingNameGet {
	_commandClass: 0x7b; // (123)
	_command: 0x2; // (2)
	groupingIdentifier: number; // 1 byte unsigned integer
}

export interface GroupingNameReport {
	_commandClass: 0x7b; // (123)
	_command: 0x3; // (3)
	groupingIdentifier: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param Grouping Name type text
}

export interface GroupingNameSet {
	_commandClass: 0x7b; // (123)
	_command: 0x1; // (1)
	groupingIdentifier: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param Grouping Name type text
}
