/* Auto-generated */

export class CommandClassSecurityV1 {
	public static readonly commandClass = 0x98; // (152);
	public static readonly definition = {"id":152,"name":"COMMAND_CLASS_SECURITY","status":"active","version":1,"commands":[{"id":6,"name":"NETWORK_KEY_SET","status":"active","params":[{"type":"blob","name":"Network Key byte","length":"auto"}]},{"id":7,"name":"NETWORK_KEY_VERIFY","status":"active","params":[]},{"id":2,"name":"SECURITY_COMMANDS_SUPPORTED_GET","status":"active","params":[]},{"id":3,"name":"SECURITY_COMMANDS_SUPPORTED_REPORT","status":"active","params":[{"type":"integer","name":"Reports to follow","length":1},{"type":"enumarray","name":"Command Class support","length":"auto","valueType":"CMD_CLASS_REF"},{"type":"integer","name":"COMMAND_CLASS_MARK","length":0},{"type":"enumarray","name":"Command Class control","length":"auto","valueType":"CMD_CLASS_REF"}]},{"id":129,"name":"SECURITY_MESSAGE_ENCAPSULATION","status":"active","params":[{"type":"blob","name":"Initialization Vector byte","length":8},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Sequence Counter","mask":15,"shift":0},{"type":"bool","name":"Sequenced","mask":16,"shift":4},{"type":"bool","name":"Second Frame","mask":32,"shift":5},{"type":"int","name":"Reserved","mask":192,"shift":6}]},{"type":"blob","name":"Command byte","length":"auto"},{"type":"integer","name":"Receivers nonce Identifier","length":1},{"type":"blob","name":"Message Authentication Code byte","length":8}]},{"id":193,"name":"SECURITY_MESSAGE_ENCAPSULATION_NONCE_GET","status":"active","params":[{"type":"blob","name":"Initialization Vector byte","length":8},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Sequence Counter","mask":15,"shift":0},{"type":"bool","name":"Sequenced","mask":16,"shift":4},{"type":"bool","name":"Second Frame","mask":32,"shift":5},{"type":"int","name":"Reserved","mask":192,"shift":6}]},{"type":"blob","name":"Command byte","length":"auto"},{"type":"integer","name":"Receivers nonce Identifier","length":1},{"type":"blob","name":"Message Authentication Code byte","length":8}]},{"id":64,"name":"SECURITY_NONCE_GET","status":"active","params":[]},{"id":128,"name":"SECURITY_NONCE_REPORT","status":"active","params":[{"type":"blob","name":"Nonce byte","length":"auto"}]},{"id":4,"name":"SECURITY_SCHEME_GET","status":"active","params":[{"type":"integer","name":"Supported Security Schemes","length":1}]},{"id":8,"name":"SECURITY_SCHEME_INHERIT","status":"active","params":[{"type":"integer","name":"Supported Security Schemes","length":1}]},{"id":5,"name":"SECURITY_SCHEME_REPORT","status":"active","params":[{"type":"integer","name":"Supported Security Schemes","length":1}]}]};
}

export interface NetworkKeySet {
	_commandClass: 0x98; // (152)
	_command: 0x6; // (6)
	// TODO param Network Key byte type blob
}

export interface NetworkKeyVerify {
	_commandClass: 0x98; // (152)
	_command: 0x7; // (7)
}

export interface SecurityCommandsSupportedGet {
	_commandClass: 0x98; // (152)
	_command: 0x2; // (2)
}

export interface SecurityCommandsSupportedReport {
	_commandClass: 0x98; // (152)
	_command: 0x3; // (3)
	reportsToFollow: number; // 1 byte unsigned integer
	// TODO param Command Class support type enumarray
	commandClassMark: number; // 0 byte unsigned integer
	// TODO param Command Class control type enumarray
}

export interface SecurityMessageEncapsulation {
	_commandClass: 0x98; // (152)
	_command: 0x81; // (129)
	// TODO param Initialization Vector byte type blob
	// TODO param Properties1 type bitfield
	// TODO param Command byte type blob
	receiversNonceIdentifier: number; // 1 byte unsigned integer
	// TODO param Message Authentication Code byte type blob
}

export interface SecurityMessageEncapsulationNonceGet {
	_commandClass: 0x98; // (152)
	_command: 0xc1; // (193)
	// TODO param Initialization Vector byte type blob
	// TODO param Properties1 type bitfield
	// TODO param Command byte type blob
	receiversNonceIdentifier: number; // 1 byte unsigned integer
	// TODO param Message Authentication Code byte type blob
}

export interface SecurityNonceGet {
	_commandClass: 0x98; // (152)
	_command: 0x40; // (64)
}

export interface SecurityNonceReport {
	_commandClass: 0x98; // (152)
	_command: 0x80; // (128)
	// TODO param Nonce byte type blob
}

export interface SecuritySchemeGet {
	_commandClass: 0x98; // (152)
	_command: 0x4; // (4)
	supportedSecuritySchemes: number; // 1 byte unsigned integer
}

export interface SecuritySchemeInherit {
	_commandClass: 0x98; // (152)
	_command: 0x8; // (8)
	supportedSecuritySchemes: number; // 1 byte unsigned integer
}

export interface SecuritySchemeReport {
	_commandClass: 0x98; // (152)
	_command: 0x5; // (5)
	supportedSecuritySchemes: number; // 1 byte unsigned integer
}
