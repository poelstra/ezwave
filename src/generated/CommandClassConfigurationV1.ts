/* Auto-generated */

export class CommandClassConfigurationV1 {
	public static readonly commandClass = 0x70; // (112);
	public static readonly definition = {"id":112,"name":"COMMAND_CLASS_CONFIGURATION","status":"active","version":1,"commands":[{"id":5,"name":"CONFIGURATION_GET","status":"active","params":[{"type":"integer","name":"Parameter Number","length":1}]},{"id":6,"name":"CONFIGURATION_REPORT","status":"active","params":[{"type":"integer","name":"Parameter Number","length":1},{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"integer","name":"Size","mask":7,"shift":0},{"type":"integer","name":"Reserved","mask":248,"shift":3}]},{"type":"blob","name":"Configuration Value","length":{"name":"Level","mask":7,"shift":0}}]},{"id":4,"name":"CONFIGURATION_SET","status":"active","params":[{"type":"integer","name":"Parameter Number","length":1},{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"integer","name":"Size","mask":7,"shift":0},{"type":"integer","name":"Reserved","mask":120,"shift":3},{"type":"bool","name":"Default","mask":128,"shift":7}]},{"type":"blob","name":"Configuration Value","length":{"name":"Level","mask":7,"shift":0}}]}]};
}

export interface ConfigurationGet {
	_commandClass: 0x70; // (112)
	_command: 0x5; // (5)
	parameterNumber: number; // 1 byte unsigned integer
}

export interface ConfigurationReport {
	_commandClass: 0x70; // (112)
	_command: 0x6; // (6)
	parameterNumber: number; // 1 byte unsigned integer
	// TODO param Level type bitfield
	// TODO param Configuration Value type blob
}

export interface ConfigurationSet {
	_commandClass: 0x70; // (112)
	_command: 0x4; // (4)
	parameterNumber: number; // 1 byte unsigned integer
	// TODO param Level type bitfield
	// TODO param Configuration Value type blob
}
