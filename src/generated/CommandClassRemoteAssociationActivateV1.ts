/* Auto-generated */

// obsolete
export class CommandClassRemoteAssociationActivateV1 {
	public static readonly commandClass = 0x7c; // (124);
	public static readonly definition = {"id":124,"name":"COMMAND_CLASS_REMOTE_ASSOCIATION_ACTIVATE","status":"obsolete","version":1,"commands":[{"id":1,"name":"REMOTE_ASSOCIATION_ACTIVATE","status":"active","params":[{"type":"integer","name":"Grouping identifier","length":1}]}]};
}

export interface RemoteAssociationActivate {
	_commandClass: 0x7c; // (124)
	_command: 0x1; // (1)
	groupingIdentifier: number; // 1 byte unsigned integer
}
