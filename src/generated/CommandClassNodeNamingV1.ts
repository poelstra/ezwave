/* Auto-generated */

export class CommandClassNodeNamingV1 {
	public static readonly commandClass = 0x77; // (119);
	public static readonly definition = {"id":119,"name":"COMMAND_CLASS_NODE_NAMING","status":"active","version":1,"commands":[{"id":6,"name":"NODE_NAMING_NODE_LOCATION_REPORT","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"int","name":"Char. Presentation","mask":7,"shift":0},{"type":"int","name":"Reserved","mask":248,"shift":3}]},{"type":"text","name":"Node location char","length":16}]},{"id":4,"name":"NODE_NAMING_NODE_LOCATION_SET","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"int","name":"Char. Presentation","mask":7,"shift":0},{"type":"int","name":"Reserved","mask":248,"shift":3}]},{"type":"text","name":"Node location char","length":16}]},{"id":5,"name":"NODE_NAMING_NODE_LOCATION_GET","status":"active","params":[]},{"id":2,"name":"NODE_NAMING_NODE_NAME_GET","status":"active","params":[]},{"id":3,"name":"NODE_NAMING_NODE_NAME_REPORT","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"int","name":"Char. Presentation","mask":7,"shift":0},{"type":"int","name":"Reserved","mask":248,"shift":3}]},{"type":"text","name":"Node name char","length":16}]},{"id":1,"name":"NODE_NAMING_NODE_NAME_SET","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"int","name":"Char. Presentation","mask":7,"shift":0},{"type":"int","name":"Reserved","mask":248,"shift":3}]},{"type":"text","name":"Node name char","length":16}]}]};
}

export interface NodeNamingNodeLocationReport {
	_commandClass: 0x77; // (119)
	_command: 0x6; // (6)
	// TODO param Level type bitfield
	// TODO param Node location char type text
}

export interface NodeNamingNodeLocationSet {
	_commandClass: 0x77; // (119)
	_command: 0x4; // (4)
	// TODO param Level type bitfield
	// TODO param Node location char type text
}

export interface NodeNamingNodeLocationGet {
	_commandClass: 0x77; // (119)
	_command: 0x5; // (5)
}

export interface NodeNamingNodeNameGet {
	_commandClass: 0x77; // (119)
	_command: 0x2; // (2)
}

export interface NodeNamingNodeNameReport {
	_commandClass: 0x77; // (119)
	_command: 0x3; // (3)
	// TODO param Level type bitfield
	// TODO param Node name char type text
}

export interface NodeNamingNodeNameSet {
	_commandClass: 0x77; // (119)
	_command: 0x1; // (1)
	// TODO param Level type bitfield
	// TODO param Node name char type text
}
