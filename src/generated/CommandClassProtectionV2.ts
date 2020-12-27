/* Auto-generated */

export class CommandClassProtectionV2 {
	public static readonly commandClass = 0x75; // (117);
	public static readonly definition = {"id":117,"name":"COMMAND_CLASS_PROTECTION","status":"active","version":2,"commands":[{"id":7,"name":"PROTECTION_EC_GET","status":"active","params":[]},{"id":8,"name":"PROTECTION_EC_REPORT","status":"active","params":[{"type":"integer","name":"Node ID","length":1,"valueType":"NODE_NUMBER"}]},{"id":6,"name":"PROTECTION_EC_SET","status":"active","params":[{"type":"integer","name":"Node ID","length":1,"valueType":"NODE_NUMBER"}]},{"id":2,"name":"PROTECTION_GET","status":"active","params":[]},{"id":3,"name":"PROTECTION_REPORT","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"integer","name":"Local Protection State","mask":15,"shift":0},{"type":"integer","name":"Reserved1","mask":240,"shift":4}]},{"type":"bitfield","name":"Level2","length":1,"fields":[{"type":"integer","name":"RF Protection State","mask":15,"shift":0},{"type":"integer","name":"Reserved2","mask":240,"shift":4}]}]},{"id":1,"name":"PROTECTION_SET","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"integer","name":"Local Protection State","mask":15,"shift":0},{"type":"integer","name":"Reserved1","mask":240,"shift":4}]},{"type":"bitfield","name":"Level2","length":1,"fields":[{"type":"integer","name":"RF Protection State","mask":15,"shift":0},{"type":"integer","name":"Reserved2","mask":240,"shift":4}]}]},{"id":4,"name":"PROTECTION_SUPPORTED_GET","status":"active","params":[]},{"id":5,"name":"PROTECTION_SUPPORTED_REPORT","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"bool","name":"Timeout","mask":1,"shift":0},{"type":"bool","name":"Exclusive Control","mask":2,"shift":1},{"type":"integer","name":"Reserved","mask":252,"shift":2}]},{"type":"integer","name":"Local Protection State","length":2},{"type":"integer","name":"RF Protection State","length":2}]},{"id":10,"name":"PROTECTION_TIMEOUT_GET","status":"active","params":[]},{"id":11,"name":"PROTECTION_TIMEOUT_REPORT","status":"active","params":[{"type":"integer","name":"Timeout","length":1,"values":{"0":"No timer is set","255":"No Timeout is set"}}]},{"id":9,"name":"PROTECTION_TIMEOUT_SET","status":"active","params":[{"type":"integer","name":"Timeout","length":1,"values":{"0":"No timer is set","255":"No Timeout"}}]}]};
}

export interface ProtectionEcGet {
	_commandClass: 0x75; // (117)
	_command: 0x7; // (7)
}

export interface ProtectionEcReport {
	_commandClass: 0x75; // (117)
	_command: 0x8; // (8)
	nodeID: number; // 1 byte unsigned integer
}

export interface ProtectionEcSet {
	_commandClass: 0x75; // (117)
	_command: 0x6; // (6)
	nodeID: number; // 1 byte unsigned integer
}

export interface ProtectionGet {
	_commandClass: 0x75; // (117)
	_command: 0x2; // (2)
}

export interface ProtectionReport {
	_commandClass: 0x75; // (117)
	_command: 0x3; // (3)
	// TODO param Level type bitfield
	// TODO param Level2 type bitfield
}

export interface ProtectionSet {
	_commandClass: 0x75; // (117)
	_command: 0x1; // (1)
	// TODO param Level type bitfield
	// TODO param Level2 type bitfield
}

export interface ProtectionSupportedGet {
	_commandClass: 0x75; // (117)
	_command: 0x4; // (4)
}

export interface ProtectionSupportedReport {
	_commandClass: 0x75; // (117)
	_command: 0x5; // (5)
	// TODO param Level type bitfield
	localProtectionState: number; // 2 byte unsigned integer
	rFProtectionState: number; // 2 byte unsigned integer
}

export interface ProtectionTimeoutGet {
	_commandClass: 0x75; // (117)
	_command: 0xa; // (10)
}

export interface ProtectionTimeoutReport {
	_commandClass: 0x75; // (117)
	_command: 0xb; // (11)
	timeout: number; // 1 byte unsigned integer
}

export interface ProtectionTimeoutSet {
	_commandClass: 0x75; // (117)
	_command: 0x9; // (9)
	timeout: number; // 1 byte unsigned integer
}
