/* Auto-generated */

export class CommandClassCentralSceneV1 {
	public static readonly commandClass = 0x5b; // (91);
	public static readonly definition = {"id":91,"name":"COMMAND_CLASS_CENTRAL_SCENE","status":"active","version":1,"commands":[{"id":1,"name":"CENTRAL_SCENE_SUPPORTED_GET","status":"active","params":[]},{"id":2,"name":"CENTRAL_SCENE_SUPPORTED_REPORT","status":"active","params":[{"type":"integer","name":"Supported Scenes","length":1}]},{"id":3,"name":"CENTRAL_SCENE_NOTIFICATION","status":"active","params":[{"type":"integer","name":"Sequence Number","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Key Attributes","mask":7,"shift":0},{"type":"int","name":"Reserved","mask":248,"shift":3}]},{"type":"integer","name":"Scene Number","length":1}]}]};
}

export interface CentralSceneSupportedGet {
	_commandClass: 0x5b; // (91)
	_command: 0x1; // (1)
}

export interface CentralSceneSupportedReport {
	_commandClass: 0x5b; // (91)
	_command: 0x2; // (2)
	supportedScenes: number; // 1 byte unsigned integer
}

export interface CentralSceneNotification {
	_commandClass: 0x5b; // (91)
	_command: 0x3; // (3)
	sequenceNumber: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	sceneNumber: number; // 1 byte unsigned integer
}
