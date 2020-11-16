/* Auto-generated */

export class CommandClassControllerReplicationV1 {
	public static readonly commandClass = 0x21; // (33);
	public static readonly definition = {"id":33,"name":"COMMAND_CLASS_CONTROLLER_REPLICATION","status":"active","version":1,"commands":[{"id":49,"name":"CTRL_REPLICATION_TRANSFER_GROUP","status":"active","params":[{"type":"integer","name":"Sequence Number","length":1},{"type":"integer","name":"Group ID","length":1},{"type":"integer","name":"Node ID","length":1,"valueType":"NODE_NUMBER"}]},{"id":50,"name":"CTRL_REPLICATION_TRANSFER_GROUP_NAME","status":"active","params":[{"type":"integer","name":"Sequence Number","length":1},{"type":"integer","name":"Group ID","length":1},{"type":"blob","name":"Group Name","length":"auto"}]},{"id":51,"name":"CTRL_REPLICATION_TRANSFER_SCENE","status":"active","params":[{"type":"integer","name":"Sequence Number","length":1},{"type":"integer","name":"Scene ID","length":1},{"type":"integer","name":"Node ID","length":1,"valueType":"NODE_NUMBER"},{"type":"integer","name":"Level","length":1}]},{"id":52,"name":"CTRL_REPLICATION_TRANSFER_SCENE_NAME","status":"active","params":[{"type":"integer","name":"Sequence Number","length":1},{"type":"integer","name":"Scene ID","length":1},{"type":"blob","name":"Scene Name","length":"auto"}]}]};
}

export interface CtrlReplicationTransferGroup {
	_commandClass: 0x21; // (33)
	_command: 0x31; // (49)
	sequenceNumber: number; // 1 byte unsigned integer
	groupID: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export interface CtrlReplicationTransferGroupName {
	_commandClass: 0x21; // (33)
	_command: 0x32; // (50)
	sequenceNumber: number; // 1 byte unsigned integer
	groupID: number; // 1 byte unsigned integer
	// TODO param Group Name type blob
}

export interface CtrlReplicationTransferScene {
	_commandClass: 0x21; // (33)
	_command: 0x33; // (51)
	sequenceNumber: number; // 1 byte unsigned integer
	sceneID: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
	level: number; // 1 byte unsigned integer
}

export interface CtrlReplicationTransferSceneName {
	_commandClass: 0x21; // (33)
	_command: 0x34; // (52)
	sequenceNumber: number; // 1 byte unsigned integer
	sceneID: number; // 1 byte unsigned integer
	// TODO param Scene Name type blob
}
