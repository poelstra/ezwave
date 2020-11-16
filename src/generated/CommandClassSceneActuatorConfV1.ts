/* Auto-generated */

export class CommandClassSceneActuatorConfV1 {
	public static readonly commandClass = 0x2c; // (44);
	public static readonly definition = {"id":44,"name":"COMMAND_CLASS_SCENE_ACTUATOR_CONF","status":"active","version":1,"commands":[{"id":2,"name":"SCENE_ACTUATOR_CONF_GET","status":"active","params":[{"type":"integer","name":"Scene ID","length":1}]},{"id":3,"name":"SCENE_ACTUATOR_CONF_REPORT","status":"active","params":[{"type":"integer","name":"Scene ID","length":1},{"type":"integer","name":"Level","length":1},{"type":"integer","name":"Dimming Duration","length":1,"values":{"0":"Instantly"}}]},{"id":1,"name":"SCENE_ACTUATOR_CONF_SET","status":"active","params":[{"type":"integer","name":"Scene ID","length":1},{"type":"integer","name":"Dimming Duration","length":1,"values":{"0":"Specify Instantly","255":"factory default"}},{"type":"bitfield","name":"Level2","length":1,"fields":[{"type":"int","name":"Reserved","mask":127,"shift":0},{"type":"bool","name":"Override","mask":128,"shift":7}]},{"type":"integer","name":"Level","length":1}]}]};
}

export interface SceneActuatorConfGet {
	_commandClass: 0x2c; // (44)
	_command: 0x2; // (2)
	sceneID: number; // 1 byte unsigned integer
}

export interface SceneActuatorConfReport {
	_commandClass: 0x2c; // (44)
	_command: 0x3; // (3)
	sceneID: number; // 1 byte unsigned integer
	level: number; // 1 byte unsigned integer
	dimmingDuration: number; // 1 byte unsigned integer
}

export interface SceneActuatorConfSet {
	_commandClass: 0x2c; // (44)
	_command: 0x1; // (1)
	sceneID: number; // 1 byte unsigned integer
	dimmingDuration: number; // 1 byte unsigned integer
	// TODO param Level2 type bitfield
	level: number; // 1 byte unsigned integer
}
