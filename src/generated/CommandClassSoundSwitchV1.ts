/* Auto-generated */

export class CommandClassSoundSwitchV1 {
	public static readonly commandClass = 0x79; // (121);
	public static readonly definition = {"id":121,"name":"COMMAND_CLASS_SOUND_SWITCH","status":"active","version":1,"commands":[{"id":1,"name":"SOUND_SWITCH_TONES_NUMBER_GET","status":"active","params":[]},{"id":2,"name":"SOUND_SWITCH_TONES_NUMBER_REPORT","status":"active","params":[{"type":"integer","name":"Supported Tones","length":1}]},{"id":3,"name":"SOUND_SWITCH_TONE_INFO_GET","status":"active","params":[{"type":"integer","name":"Tone Identifier","length":1}]},{"id":4,"name":"SOUND_SWITCH_TONE_INFO_REPORT","status":"active","params":[{"type":"integer","name":"Tone Identifier","length":1},{"type":"integer","name":"Tone Duration","length":2},{"type":"integer","name":"Name Length","length":1},{"type":"text","name":"Name","length":{"name":"Name Length","mask":255,"shift":0}}]},{"id":5,"name":"SOUND_SWITCH_CONFIGURATION_SET","status":"active","params":[{"type":"integer","name":"Volume","length":1},{"type":"integer","name":"Default Tone Identifier","length":1}]},{"id":6,"name":"SOUND_SWITCH_CONFIGURATION_GET","status":"active","params":[]},{"id":7,"name":"SOUND_SWITCH_CONFIGURATION_REPORT","status":"active","params":[{"type":"integer","name":"Volume","length":1},{"type":"integer","name":"Default Tone Identifer","length":1}]},{"id":8,"name":"SOUND_SWITCH_TONE_PLAY_SET","status":"active","params":[{"type":"integer","name":"Tone identifier","length":1}]},{"id":9,"name":"SOUND_SWITCH_TONE_PLAY_GET","status":"active","params":[]},{"id":10,"name":"SOUND_SWITCH_TONE_PLAY_REPORT","status":"active","params":[{"type":"integer","name":"Tone Identifier","length":1}]}]};
}

export interface SoundSwitchTonesNumberGet {
	_commandClass: 0x79; // (121)
	_command: 0x1; // (1)
}

export interface SoundSwitchTonesNumberReport {
	_commandClass: 0x79; // (121)
	_command: 0x2; // (2)
	supportedTones: number; // 1 byte unsigned integer
}

export interface SoundSwitchToneInfoGet {
	_commandClass: 0x79; // (121)
	_command: 0x3; // (3)
	toneIdentifier: number; // 1 byte unsigned integer
}

export interface SoundSwitchToneInfoReport {
	_commandClass: 0x79; // (121)
	_command: 0x4; // (4)
	toneIdentifier: number; // 1 byte unsigned integer
	toneDuration: number; // 2 byte unsigned integer
	nameLength: number; // 1 byte unsigned integer
	// TODO param Name type text
}

export interface SoundSwitchConfigurationSet {
	_commandClass: 0x79; // (121)
	_command: 0x5; // (5)
	volume: number; // 1 byte unsigned integer
	defaultToneIdentifier: number; // 1 byte unsigned integer
}

export interface SoundSwitchConfigurationGet {
	_commandClass: 0x79; // (121)
	_command: 0x6; // (6)
}

export interface SoundSwitchConfigurationReport {
	_commandClass: 0x79; // (121)
	_command: 0x7; // (7)
	volume: number; // 1 byte unsigned integer
	defaultToneIdentifer: number; // 1 byte unsigned integer
}

export interface SoundSwitchTonePlaySet {
	_commandClass: 0x79; // (121)
	_command: 0x8; // (8)
	toneIdentifier: number; // 1 byte unsigned integer
}

export interface SoundSwitchTonePlayGet {
	_commandClass: 0x79; // (121)
	_command: 0x9; // (9)
}

export interface SoundSwitchTonePlayReport {
	_commandClass: 0x79; // (121)
	_command: 0xa; // (10)
	toneIdentifier: number; // 1 byte unsigned integer
}
