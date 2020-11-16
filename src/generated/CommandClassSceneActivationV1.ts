/* Auto-generated */

export class CommandClassSceneActivationV1 {
	public static readonly commandClass = 0x2b; // (43);
	public static readonly definition = {"id":43,"name":"COMMAND_CLASS_SCENE_ACTIVATION","status":"active","version":1,"commands":[{"id":1,"name":"SCENE_ACTIVATION_SET","status":"active","params":[{"type":"integer","name":"Scene ID","length":1},{"type":"integer","name":"Dimming Duration","length":1,"values":{"0":"Instantly","255":"configured dimming duration"}}]}]};
}

export interface SceneActivationSet {
	_commandClass: 0x2b; // (43)
	_command: 0x1; // (1)
	sceneID: number; // 1 byte unsigned integer
	dimmingDuration: number; // 1 byte unsigned integer
}
