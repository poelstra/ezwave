/* Auto-generated */

export class CommandClassIpAssociationV1 {
	public static readonly commandClass = 0x5c; // (92);
	public static readonly definition = {"id":92,"name":"COMMAND_CLASS_IP_ASSOCIATION","status":"active","version":1,"commands":[{"id":1,"name":"IP_ASSOCIATION_SET","status":"active","params":[{"type":"integer","name":"Grouping Identifier","length":1},{"type":"blob","name":"IPv6 Address","length":16},{"type":"integer","name":"End Point","length":1}]},{"id":2,"name":"IP_ASSOCIATION_GET","status":"active","params":[{"type":"integer","name":"Grouping Identifier","length":1},{"type":"integer","name":"Index","length":1}]},{"id":3,"name":"IP_ASSOCIATION_REPORT","status":"active","params":[{"type":"integer","name":"Grouping Identifier","length":1},{"type":"integer","name":"Index","length":1},{"type":"integer","name":"Actual Nodes","length":1},{"type":"blob","name":"IPv6 Address","length":16},{"type":"integer","name":"End Point","length":1}]},{"id":4,"name":"IP_ASSOCIATION_REMOVE","status":"active","params":[{"type":"integer","name":"Grouping Identifier","length":1},{"type":"blob","name":"IPv6 Address","length":16},{"type":"integer","name":"End Point","length":1}]}]};
}

export interface IpAssociationSet {
	_commandClass: 0x5c; // (92)
	_command: 0x1; // (1)
	groupingIdentifier: number; // 1 byte unsigned integer
	// TODO param IPv6 Address type blob
	endPoint: number; // 1 byte unsigned integer
}

export interface IpAssociationGet {
	_commandClass: 0x5c; // (92)
	_command: 0x2; // (2)
	groupingIdentifier: number; // 1 byte unsigned integer
	index: number; // 1 byte unsigned integer
}

export interface IpAssociationReport {
	_commandClass: 0x5c; // (92)
	_command: 0x3; // (3)
	groupingIdentifier: number; // 1 byte unsigned integer
	index: number; // 1 byte unsigned integer
	actualNodes: number; // 1 byte unsigned integer
	// TODO param IPv6 Address type blob
	endPoint: number; // 1 byte unsigned integer
}

export interface IpAssociationRemove {
	_commandClass: 0x5c; // (92)
	_command: 0x4; // (4)
	groupingIdentifier: number; // 1 byte unsigned integer
	// TODO param IPv6 Address type blob
	endPoint: number; // 1 byte unsigned integer
}
