/* Auto-generated */

// obsolete
export class CommandClassMultiInstanceAssociationV1 {
	public static readonly commandClass = 0x8e; // (142);
	public static readonly definition = {"id":142,"name":"COMMAND_CLASS_MULTI_INSTANCE_ASSOCIATION","status":"obsolete","version":1,"commands":[{"id":2,"name":"MULTI_INSTANCE_ASSOCIATION_GET","status":"active","params":[{"type":"integer","name":"Grouping Identifier","length":1}]},{"id":5,"name":"MULTI_INSTANCE_ASSOCIATION_GROUPINGS_GET","status":"active","params":[]},{"id":6,"name":"MULTI_INSTANCE_ASSOCIATION_GROUPINGS_REPORT","status":"active","params":[{"type":"integer","name":"Supported Groupings","length":1}]},{"id":4,"name":"MULTI_INSTANCE_ASSOCIATION_REMOVE","status":"active","params":[{"type":"integer","name":"Grouping identifier","length":1},{"type":"enumarray","name":"Node ID","length":"auto","valueType":"NODE_NUMBER"},{"type":"integer","name":"Marker","length":0},{"type":"group","name":"vg","length":{"name":"Grouping identifier","mask":255,"shift":0},"params":[{"type":"integer","name":"Multi Instance Node ID","length":1,"valueType":"NODE_NUMBER"},{"type":"integer","name":"Instance","length":1}]}]},{"id":3,"name":"MULTI_INSTANCE_ASSOCIATION_REPORT","status":"active","params":[{"type":"integer","name":"Grouping Identifier","length":1},{"type":"integer","name":"Max Nodes Supported","length":1},{"type":"integer","name":"Reports to Follow","length":1},{"type":"enumarray","name":"Node ID","length":"auto","valueType":"NODE_NUMBER"},{"type":"integer","name":"Marker","length":0},{"type":"group","name":"vg","length":{"name":"Grouping Identifier","mask":255,"shift":0},"params":[{"type":"integer","name":"Multi Instance Node ID","length":1,"valueType":"NODE_NUMBER"},{"type":"integer","name":"Instance","length":1}]}]},{"id":1,"name":"MULTI_INSTANCE_ASSOCIATION_SET","status":"active","params":[{"type":"integer","name":"Grouping identifier","length":1},{"type":"enumarray","name":"Node ID","length":"auto","valueType":"NODE_NUMBER"},{"type":"integer","name":"Marker","length":0},{"type":"group","name":"vg","length":{"name":"Grouping identifier","mask":255,"shift":0},"params":[{"type":"integer","name":"Multi Instance Node ID","length":1,"valueType":"NODE_NUMBER"},{"type":"integer","name":"Instance","length":1}]}]}]};
}

export interface MultiInstanceAssociationGet {
	_commandClass: 0x8e; // (142)
	_command: 0x2; // (2)
	groupingIdentifier: number; // 1 byte unsigned integer
}

export interface MultiInstanceAssociationGroupingsGet {
	_commandClass: 0x8e; // (142)
	_command: 0x5; // (5)
}

export interface MultiInstanceAssociationGroupingsReport {
	_commandClass: 0x8e; // (142)
	_command: 0x6; // (6)
	supportedGroupings: number; // 1 byte unsigned integer
}

export interface MultiInstanceAssociationRemove {
	_commandClass: 0x8e; // (142)
	_command: 0x4; // (4)
	groupingIdentifier: number; // 1 byte unsigned integer
	// TODO param Node ID type enumarray
	marker: number; // 0 byte unsigned integer
	// TODO param vg type group
}

export interface MultiInstanceAssociationReport {
	_commandClass: 0x8e; // (142)
	_command: 0x3; // (3)
	groupingIdentifier: number; // 1 byte unsigned integer
	maxNodesSupported: number; // 1 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	// TODO param Node ID type enumarray
	marker: number; // 0 byte unsigned integer
	// TODO param vg type group
}

export interface MultiInstanceAssociationSet {
	_commandClass: 0x8e; // (142)
	_command: 0x1; // (1)
	groupingIdentifier: number; // 1 byte unsigned integer
	// TODO param Node ID type enumarray
	marker: number; // 0 byte unsigned integer
	// TODO param vg type group
}
