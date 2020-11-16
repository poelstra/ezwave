/* Auto-generated */

export class CommandClassCentralSceneV2 {
	public static readonly commandClass = 0x5b; // (91);
	public static readonly definition = {"id":91,"name":"COMMAND_CLASS_CENTRAL_SCENE","status":"active","version":2,"commands":[{"id":1,"name":"CENTRAL_SCENE_SUPPORTED_GET","status":"active","params":[]},{"id":2,"name":"CENTRAL_SCENE_SUPPORTED_REPORT","status":"active","params":[{"type":"integer","name":"Supported Scenes","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Identical","mask":1,"shift":0},{"type":"int","name":"Number of Bit Mask Bytes","mask":6,"shift":1},{"type":"int","name":"Reserved","mask":248,"shift":3}]},{"type":"group","name":"vg1","length":{"name":"Supported Scenes","mask":255,"shift":0},"params":[{"type":"integer","name":"Supported Key Attributes for Scene","length":0}]}]},{"id":3,"name":"CENTRAL_SCENE_NOTIFICATION","status":"active","params":[{"type":"integer","name":"Sequence Number","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Key Attributes","mask":7,"shift":0,"values":{"0":"Key Pressed 1 time","1":"Key Released","2":"Key Held Down","3":"Key Pressed 2 times","4":"Key Pressed 3 times","5":"Key Pressed 4 times","6":"Key Pressed 5 times"}},{"type":"int","name":"Reserved","mask":248,"shift":3}]},{"type":"integer","name":"Scene Number","length":1}]}]};
}

export interface CentralSceneSupportedGet {
	_commandClass: 0x5b; // (91)
	_command: 0x1; // (1)
}

export interface CentralSceneSupportedReport {
	_commandClass: 0x5b; // (91)
	_command: 0x2; // (2)
	supportedScenes: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param vg1 type group
}

export interface CentralSceneNotification {
	_commandClass: 0x5b; // (91)
	_command: 0x3; // (3)
	sequenceNumber: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	sceneNumber: number; // 1 byte unsigned integer
}
