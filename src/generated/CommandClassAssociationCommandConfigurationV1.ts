/* Auto-generated */

export class CommandClassAssociationCommandConfigurationV1 {
	public static readonly commandClass = 0x9b; // (155);
	public static readonly definition = {"id":155,"name":"COMMAND_CLASS_ASSOCIATION_COMMAND_CONFIGURATION","status":"active","version":1,"commands":[{"id":4,"name":"COMMAND_CONFIGURATION_GET","status":"active","params":[{"type":"integer","name":"Grouping identifier","length":1},{"type":"integer","name":"Node ID","length":1,"valueType":"NODE_NUMBER"}]},{"id":5,"name":"COMMAND_CONFIGURATION_REPORT","status":"active","params":[{"type":"integer","name":"Grouping identifier","length":1},{"type":"integer","name":"Node ID","length":1,"valueType":"NODE_NUMBER"},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Reports to follow","mask":15,"shift":0},{"type":"integer","name":"Reserved","mask":112,"shift":4},{"type":"bool","name":"First","mask":128,"shift":7}]},{"type":"integer","name":"Command length","length":1},{"type":"integer","name":"Command Class identifier","length":1,"valueType":"CMD_CLASS_REF"},{"type":"integer","name":"Command identifier","length":1,"valueType":"CMD_REF"},{"type":"blob","name":"Command byte","length":"auto","blobType":"CMD_DATA"}]},{"id":3,"name":"COMMAND_CONFIGURATION_SET","status":"active","params":[{"type":"integer","name":"Grouping identifier","length":1},{"type":"integer","name":"Node ID","length":1,"valueType":"NODE_NUMBER"},{"type":"integer","name":"Command length","length":1},{"type":"integer","name":"Command Class identifier","length":1,"valueType":"CMD_CLASS_REF"},{"type":"integer","name":"Command identifier","length":1,"valueType":"CMD_REF"},{"type":"blob","name":"Command byte","length":"auto","blobType":"CMD_DATA"}]},{"id":1,"name":"COMMAND_RECORDS_SUPPORTED_GET","status":"active","params":[]},{"id":2,"name":"COMMAND_RECORDS_SUPPORTED_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Conf. Cmd","mask":1,"shift":0},{"type":"bool","name":"V/C","mask":2,"shift":1},{"type":"integer","name":"Max command length","mask":252,"shift":2}]},{"type":"integer","name":"Free Command records","length":2},{"type":"integer","name":"Max Command records","length":2}]}]};
}

export interface CommandConfigurationGet {
	_commandClass: 0x9b; // (155)
	_command: 0x4; // (4)
	groupingIdentifier: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export interface CommandConfigurationReport {
	_commandClass: 0x9b; // (155)
	_command: 0x5; // (5)
	groupingIdentifier: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	commandLength: number; // 1 byte unsigned integer
	commandClassIdentifier: number; // 1 byte unsigned integer
	commandIdentifier: number; // 1 byte unsigned integer
	// TODO param Command byte type blob
}

export interface CommandConfigurationSet {
	_commandClass: 0x9b; // (155)
	_command: 0x3; // (3)
	groupingIdentifier: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
	commandLength: number; // 1 byte unsigned integer
	commandClassIdentifier: number; // 1 byte unsigned integer
	commandIdentifier: number; // 1 byte unsigned integer
	// TODO param Command byte type blob
}

export interface CommandRecordsSupportedGet {
	_commandClass: 0x9b; // (155)
	_command: 0x1; // (1)
}

export interface CommandRecordsSupportedReport {
	_commandClass: 0x9b; // (155)
	_command: 0x2; // (2)
	// TODO param Properties1 type bitfield
	freeCommandRecords: number; // 2 byte unsigned integer
	maxCommandRecords: number; // 2 byte unsigned integer
}
