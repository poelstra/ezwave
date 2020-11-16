/* Auto-generated */

export class CommandClassSceneControllerConfV1 {
	public static readonly commandClass = 0x2d; // (45);
	public static readonly definition = {"id":45,"name":"COMMAND_CLASS_SCENE_CONTROLLER_CONF","status":"active","version":1,"commands":[{"id":2,"name":"SCENE_CONTROLLER_CONF_GET","status":"active","params":[{"type":"integer","name":"Group ID","length":1}]},{"id":3,"name":"SCENE_CONTROLLER_CONF_REPORT","status":"active","params":[{"type":"integer","name":"Group ID","length":1},{"type":"integer","name":"Scene ID","length":1},{"type":"integer","name":"Dimming Duration","length":1,"values":{"0":"Instantly"}}]},{"id":1,"name":"SCENE_CONTROLLER_CONF_SET","status":"active","params":[{"type":"integer","name":"Group ID","length":1},{"type":"integer","name":"Scene ID","length":1},{"type":"integer","name":"Dimming Duration","length":1,"values":{"0":"Instantly","255":"factory default"}}]}]};
}

export interface SceneControllerConfGet {
	_commandClass: 0x2d; // (45)
	_command: 0x2; // (2)
	groupID: number; // 1 byte unsigned integer
}

export interface SceneControllerConfReport {
	_commandClass: 0x2d; // (45)
	_command: 0x3; // (3)
	groupID: number; // 1 byte unsigned integer
	sceneID: number; // 1 byte unsigned integer
	dimmingDuration: number; // 1 byte unsigned integer
}

export interface SceneControllerConfSet {
	_commandClass: 0x2d; // (45)
	_command: 0x1; // (1)
	groupID: number; // 1 byte unsigned integer
	sceneID: number; // 1 byte unsigned integer
	dimmingDuration: number; // 1 byte unsigned integer
}
