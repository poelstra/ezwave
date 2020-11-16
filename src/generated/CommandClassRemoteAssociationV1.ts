/* Auto-generated */

// obsolete
export class CommandClassRemoteAssociationV1 {
	public static readonly commandClass = 0x7d; // (125);
	public static readonly definition = {"id":125,"name":"COMMAND_CLASS_REMOTE_ASSOCIATION","status":"obsolete","version":1,"commands":[{"id":2,"name":"REMOTE_ASSOCIATION_CONFIGURATION_GET","status":"active","params":[{"type":"integer","name":"Local Grouping identifier","length":1}]},{"id":3,"name":"REMOTE_ASSOCIATION_CONFIGURATION_REPORT","status":"active","params":[{"type":"integer","name":"Local Grouping identifier","length":1,"values":{"0":"erase all lin"}},{"type":"integer","name":"Remote NodeID","length":1,"valueType":"NODE_NUMBER","values":{"0":"remove a link"}},{"type":"integer","name":"Remote Grouping identifier","length":1}]},{"id":1,"name":"REMOTE_ASSOCIATION_CONFIGURATION_SET","status":"active","params":[{"type":"integer","name":"Local Grouping identifier","length":1,"values":{"0":"erase all lin"}},{"type":"integer","name":"Remote NodeID","length":1,"valueType":"NODE_NUMBER","values":{"0":"remove a link"}},{"type":"integer","name":"Remote Grouping identifier","length":1}]}]};
}

export interface RemoteAssociationConfigurationGet {
	_commandClass: 0x7d; // (125)
	_command: 0x2; // (2)
	localGroupingIdentifier: number; // 1 byte unsigned integer
}

export interface RemoteAssociationConfigurationReport {
	_commandClass: 0x7d; // (125)
	_command: 0x3; // (3)
	localGroupingIdentifier: number; // 1 byte unsigned integer
	remoteNodeID: number; // 1 byte unsigned integer
	remoteGroupingIdentifier: number; // 1 byte unsigned integer
}

export interface RemoteAssociationConfigurationSet {
	_commandClass: 0x7d; // (125)
	_command: 0x1; // (1)
	localGroupingIdentifier: number; // 1 byte unsigned integer
	remoteNodeID: number; // 1 byte unsigned integer
	remoteGroupingIdentifier: number; // 1 byte unsigned integer
}
