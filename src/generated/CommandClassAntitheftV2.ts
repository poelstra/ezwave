/* Auto-generated */

export class CommandClassAntitheftV2 {
	public static readonly commandClass = 0x5d; // (93);
	public static readonly definition = {"id":93,"name":"COMMAND_CLASS_ANTITHEFT","status":"active","version":2,"commands":[{"id":1,"name":"ANTITHEFT_SET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Number of Magic Code bytes","mask":127,"shift":0},{"type":"bool","name":"Enable","mask":128,"shift":7}]},{"type":"blob","name":"Magic Code","length":{"name":"Properties1","mask":127,"shift":0}},{"type":"integer","name":"Manufacturer ID","length":2},{"type":"integer","name":"Anti-theft Hint Number Bytes","length":1},{"type":"blob","name":"Anti-theft Hint Byte","length":{"name":"Anti-theft Hint Number Bytes","mask":255,"shift":0}}]},{"id":2,"name":"ANTITHEFT_GET","status":"active","params":[]},{"id":3,"name":"ANTITHEFT_REPORT","status":"active","params":[{"type":"integer","name":"Anti-theft Protection Status","length":1},{"type":"integer","name":"Manufacturer ID","length":2},{"type":"integer","name":"Anti-theft Hint Number Bytes","length":1},{"type":"blob","name":"Anti-theft Hint Byte","length":{"name":"Anti-theft Hint Number Bytes","mask":255,"shift":0}}]}]};
}

export interface AntitheftSet {
	_commandClass: 0x5d; // (93)
	_command: 0x1; // (1)
	// TODO param Properties1 type bitfield
	// TODO param Magic Code type blob
	manufacturerID: number; // 2 byte unsigned integer
	antiTheftHintNumberBytes: number; // 1 byte unsigned integer
	// TODO param Anti-theft Hint Byte type blob
}

export interface AntitheftGet {
	_commandClass: 0x5d; // (93)
	_command: 0x2; // (2)
}

export interface AntitheftReport {
	_commandClass: 0x5d; // (93)
	_command: 0x3; // (3)
	antiTheftProtectionStatus: number; // 1 byte unsigned integer
	manufacturerID: number; // 2 byte unsigned integer
	antiTheftHintNumberBytes: number; // 1 byte unsigned integer
	// TODO param Anti-theft Hint Byte type blob
}
