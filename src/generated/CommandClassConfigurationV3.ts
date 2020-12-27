/* Auto-generated */

export class CommandClassConfigurationV3 {
	public static readonly commandClass = 0x70; // (112);
	public static readonly definition = {"id":112,"name":"COMMAND_CLASS_CONFIGURATION","status":"active","version":3,"commands":[{"id":8,"name":"CONFIGURATION_BULK_GET","status":"active","params":[{"type":"integer","name":"Parameter Offset","length":2},{"type":"integer","name":"Number of Parameters","length":1}]},{"id":9,"name":"CONFIGURATION_BULK_REPORT","status":"active","params":[{"type":"integer","name":"Parameter Offset","length":2},{"type":"integer","name":"Number of Parameters","length":1},{"type":"integer","name":"Reports to follow","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Size","mask":7,"shift":0},{"type":"integer","name":"Reserved","mask":56,"shift":3},{"type":"bool","name":"Handshake","mask":64,"shift":6},{"type":"bool","name":"Default","mask":128,"shift":7}]},{"type":"group","name":"vg","length":{"name":"Number of Parameters","mask":255,"shift":0},"params":[{"type":"blob","name":"Parameter","length":{"name":"Properties1","isParentReference":true,"mask":7,"shift":0}}]}]},{"id":7,"name":"CONFIGURATION_BULK_SET","status":"active","params":[{"type":"integer","name":"Parameter Offset","length":2},{"type":"integer","name":"Number of Parameters","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Size","mask":7,"shift":0},{"type":"integer","name":"Reserved","mask":56,"shift":3},{"type":"bool","name":"Handshake","mask":64,"shift":6},{"type":"bool","name":"Default","mask":128,"shift":7}]},{"type":"group","name":"vg","length":{"name":"Number of Parameters","mask":255,"shift":0},"params":[{"type":"blob","name":"Parameter","length":{"name":"Properties1","isParentReference":true,"mask":7,"shift":0}}]}]},{"id":5,"name":"CONFIGURATION_GET","status":"active","params":[{"type":"integer","name":"Parameter Number","length":1}]},{"id":6,"name":"CONFIGURATION_REPORT","status":"active","params":[{"type":"integer","name":"Parameter Number","length":1},{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"integer","name":"Size","mask":7,"shift":0},{"type":"integer","name":"Reserved","mask":248,"shift":3}]},{"type":"blob","name":"Configuration Value","length":{"name":"Level","mask":7,"shift":0}}]},{"id":4,"name":"CONFIGURATION_SET","status":"active","params":[{"type":"integer","name":"Parameter Number","length":1},{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"integer","name":"Size","mask":7,"shift":0},{"type":"integer","name":"Reserved","mask":120,"shift":3},{"type":"bool","name":"Default","mask":128,"shift":7}]},{"type":"blob","name":"Configuration Value","length":{"name":"Level","mask":7,"shift":0}}]},{"id":10,"name":"CONFIGURATION_NAME_GET","status":"active","params":[{"type":"integer","name":"Parameter Number","length":2}]},{"id":11,"name":"CONFIGURATION_NAME_REPORT","status":"active","params":[{"type":"integer","name":"Parameter Number","length":2},{"type":"integer","name":"Reports to follow","length":1},{"type":"blob","name":"Name","length":"auto"}]},{"id":12,"name":"CONFIGURATION_INFO_GET","status":"active","params":[{"type":"integer","name":"Parameter Number","length":2}]},{"id":13,"name":"CONFIGURATION_INFO_REPORT","status":"active","params":[{"type":"integer","name":"Parameter Number","length":2},{"type":"integer","name":"Reports to follow","length":1},{"type":"blob","name":"Info","length":"auto"}]},{"id":14,"name":"CONFIGURATION_PROPERTIES_GET","status":"active","params":[{"type":"integer","name":"Parameter Number","length":2}]},{"id":15,"name":"CONFIGURATION_PROPERTIES_REPORT","status":"active","params":[{"type":"integer","name":"Parameter Number","length":2},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Size","mask":7,"shift":0},{"type":"enum","name":"Format","mask":56,"shift":3,"values":{"0":"Signed Integer","1":"Unsigned Integer","2":"Enumerated","3":"Bit field"}},{"type":"integer","name":"Reserved","mask":192,"shift":6}]},{"type":"blob","name":"Min Value","length":{"name":"Properties1","mask":7,"shift":0}},{"type":"blob","name":"Max Value","length":{"name":"Properties1","mask":7,"shift":0}},{"type":"blob","name":"Default Value","length":{"name":"Properties1","mask":7,"shift":0}},{"type":"integer","name":"Next Parameter Number","length":2}]}]};
}

export interface ConfigurationBulkGet {
	_commandClass: 0x70; // (112)
	_command: 0x8; // (8)
	parameterOffset: number; // 2 byte unsigned integer
	numberOfParameters: number; // 1 byte unsigned integer
}

export interface ConfigurationBulkReport {
	_commandClass: 0x70; // (112)
	_command: 0x9; // (9)
	parameterOffset: number; // 2 byte unsigned integer
	numberOfParameters: number; // 1 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param vg type group
}

export interface ConfigurationBulkSet {
	_commandClass: 0x70; // (112)
	_command: 0x7; // (7)
	parameterOffset: number; // 2 byte unsigned integer
	numberOfParameters: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param vg type group
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

export interface ConfigurationNameGet {
	_commandClass: 0x70; // (112)
	_command: 0xa; // (10)
	parameterNumber: number; // 2 byte unsigned integer
}

export interface ConfigurationNameReport {
	_commandClass: 0x70; // (112)
	_command: 0xb; // (11)
	parameterNumber: number; // 2 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	// TODO param Name type blob
}

export interface ConfigurationInfoGet {
	_commandClass: 0x70; // (112)
	_command: 0xc; // (12)
	parameterNumber: number; // 2 byte unsigned integer
}

export interface ConfigurationInfoReport {
	_commandClass: 0x70; // (112)
	_command: 0xd; // (13)
	parameterNumber: number; // 2 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	// TODO param Info type blob
}

export interface ConfigurationPropertiesGet {
	_commandClass: 0x70; // (112)
	_command: 0xe; // (14)
	parameterNumber: number; // 2 byte unsigned integer
}

export interface ConfigurationPropertiesReport {
	_commandClass: 0x70; // (112)
	_command: 0xf; // (15)
	parameterNumber: number; // 2 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param Min Value type blob
	// TODO param Max Value type blob
	// TODO param Default Value type blob
	nextParameterNumber: number; // 2 byte unsigned integer
}
