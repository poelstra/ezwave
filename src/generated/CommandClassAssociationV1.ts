/* Auto-generated */

export class CommandClassAssociationV1 {
	public static readonly commandClass = 0x85; // (133);
	public static readonly definition = {"id":133,"name":"COMMAND_CLASS_ASSOCIATION","status":"active","version":1,"commands":[{"id":2,"name":"ASSOCIATION_GET","status":"active","params":[{"type":"integer","name":"Grouping Identifier","length":1}]},{"id":5,"name":"ASSOCIATION_GROUPINGS_GET","status":"active","params":[]},{"id":6,"name":"ASSOCIATION_GROUPINGS_REPORT","status":"active","params":[{"type":"integer","name":"Supported Groupings","length":1}]},{"id":4,"name":"ASSOCIATION_REMOVE","status":"active","params":[{"type":"integer","name":"Grouping Identifier","length":1},{"type":"enumarray","name":"Node ID","length":"auto","valueType":"NODE_NUMBER"}]},{"id":3,"name":"ASSOCIATION_REPORT","status":"active","params":[{"type":"integer","name":"Grouping Identifier","length":1},{"type":"integer","name":"Max Nodes Supported","length":1},{"type":"integer","name":"Reports to Follow","length":1},{"type":"enumarray","name":"NodeID","length":"auto","valueType":"NODE_NUMBER"}]},{"id":1,"name":"ASSOCIATION_SET","status":"active","params":[{"type":"integer","name":"Grouping Identifier","length":1},{"type":"enumarray","name":"Node ID","length":"auto","valueType":"NODE_NUMBER"}]}]};
}

export interface AssociationGet {
	_commandClass: 0x85; // (133)
	_command: 0x2; // (2)
	groupingIdentifier: number; // 1 byte unsigned integer
}

export interface AssociationGroupingsGet {
	_commandClass: 0x85; // (133)
	_command: 0x5; // (5)
}

export interface AssociationGroupingsReport {
	_commandClass: 0x85; // (133)
	_command: 0x6; // (6)
	supportedGroupings: number; // 1 byte unsigned integer
}

export interface AssociationRemove {
	_commandClass: 0x85; // (133)
	_command: 0x4; // (4)
	groupingIdentifier: number; // 1 byte unsigned integer
	// TODO param Node ID type enumarray
}

export interface AssociationReport {
	_commandClass: 0x85; // (133)
	_command: 0x3; // (3)
	groupingIdentifier: number; // 1 byte unsigned integer
	maxNodesSupported: number; // 1 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	// TODO param NodeID type enumarray
}

export interface AssociationSet {
	_commandClass: 0x85; // (133)
	_command: 0x1; // (1)
	groupingIdentifier: number; // 1 byte unsigned integer
	// TODO param Node ID type enumarray
}
