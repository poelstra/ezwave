/* Auto-generated */

export class CommandClassSecurity2V1 {
	public static readonly commandClass = 0x9f; // (159);
	public static readonly definition = {"id":159,"name":"COMMAND_CLASS_SECURITY_2","status":"active","version":1,"commands":[{"id":1,"name":"SECURITY_2_NONCE_GET","status":"active","params":[{"type":"integer","name":"Sequence Number","length":1}]},{"id":2,"name":"SECURITY_2_NONCE_REPORT","status":"active","params":[{"type":"integer","name":"Sequence Number","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"SOS","mask":1,"shift":0},{"type":"bool","name":"MOS","mask":2,"shift":1},{"type":"integer","name":"Reserved","mask":252,"shift":2}]},{"type":"blob","name":"Receivers Entropy Input","length":"auto"}]},{"id":3,"name":"SECURITY_2_MESSAGE_ENCAPSULATION","status":"active","params":[{"type":"integer","name":"Sequence Number","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Extension","mask":1,"shift":0},{"type":"bool","name":"Encrypted Extension","mask":2,"shift":1},{"type":"integer","name":"Reserved","mask":252,"shift":2}]},{"type":"group","name":"vg1","optional":{"name":"Properties1","mask":1},"length":"auto","moreToFollow":{"name":"Properties1","mask":128},"params":[{"type":"integer","name":"Extension Length","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Type","mask":63,"shift":0},{"type":"bool","name":"Critical","mask":64,"shift":6},{"type":"bool","name":"More to follow","mask":128,"shift":7}]},{"type":"blob","name":"Extension","length":{"name":"Extension Length","mask":255,"shift":0},"includeBytesBefore":2}]},{"type":"blob","name":"CCM Ciphertext Object","length":"auto"}]},{"id":4,"name":"KEX_GET","status":"active","params":[]},{"id":5,"name":"KEX_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Echo","mask":1,"shift":0},{"type":"bool","name":"Request CSA","mask":2,"shift":1},{"type":"integer","name":"Reserved","mask":252,"shift":2}]},{"type":"integer","name":"Supported KEX Schemes","length":1},{"type":"integer","name":"Supported ECDH Profiles","length":1},{"type":"integer","name":"Requested Keys","length":0}]},{"id":6,"name":"KEX_SET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Echo","mask":1,"shift":0},{"type":"bool","name":"Request CSA","mask":2,"shift":1},{"type":"integer","name":"Reserved","mask":252,"shift":2}]},{"type":"integer","name":"Selected KEX Scheme","length":1},{"type":"integer","name":"Selected ECDH Profile","length":1},{"type":"integer","name":"Granted Keys","length":0}]},{"id":7,"name":"KEX_FAIL","status":"active","params":[{"type":"enum","name":"KEX Fail Type","length":1,"values":{"1":"KEX_KEY","2":"KEX_SCHEME","3":"KEX_CURVES","5":"DECRYPT","6":"CANCEL","7":"AUTH","8":"KEY_GET","9":"KEY_VERIFY","10":"KEY_REPORT"}}]},{"id":8,"name":"PUBLIC_KEY_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Including Node","mask":1,"shift":0},{"type":"integer","name":"Reserved","mask":254,"shift":1}]},{"type":"blob","name":"ECDH Public Key","length":"auto"}]},{"id":9,"name":"SECURITY_2_NETWORK_KEY_GET","status":"active","params":[{"type":"integer","name":"Requested Key","length":1,"values":{"0":"Unauthenticated","1":"Authenticated","2":"Access","7":"S0"}}]},{"id":10,"name":"SECURITY_2_NETWORK_KEY_REPORT","status":"active","params":[{"type":"integer","name":"Granted Key","length":1,"values":{"0":"Unauthenticated","1":"Authenticated","2":"Access","7":"S0"}},{"type":"blob","name":"Network Key","length":16}]},{"id":11,"name":"SECURITY_2_NETWORK_KEY_VERIFY","status":"active","params":[]},{"id":12,"name":"SECURITY_2_TRANSFER_END","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Key Request Complete","mask":1,"shift":0},{"type":"bool","name":"Key Verified","mask":2,"shift":1},{"type":"integer","name":"Reserved","mask":252,"shift":2}]}]},{"id":13,"name":"SECURITY_2_COMMANDS_SUPPORTED_GET","status":"active","params":[]},{"id":14,"name":"SECURITY_2_COMMANDS_SUPPORTED_REPORT","status":"active","params":[{"type":"enumarray","name":"Command Class","length":"auto","valueType":"CMD_CLASS_REF"}]}]};
}

export interface Security2NonceGet {
	_commandClass: 0x9f; // (159)
	_command: 0x1; // (1)
	sequenceNumber: number; // 1 byte unsigned integer
}

export interface Security2NonceReport {
	_commandClass: 0x9f; // (159)
	_command: 0x2; // (2)
	sequenceNumber: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param Receivers Entropy Input type blob
}

export interface Security2MessageEncapsulation {
	_commandClass: 0x9f; // (159)
	_command: 0x3; // (3)
	sequenceNumber: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param vg1 type group
	// TODO param CCM Ciphertext Object type blob
}

export interface KexGet {
	_commandClass: 0x9f; // (159)
	_command: 0x4; // (4)
}

export interface KexReport {
	_commandClass: 0x9f; // (159)
	_command: 0x5; // (5)
	// TODO param Properties1 type bitfield
	supportedKEXSchemes: number; // 1 byte unsigned integer
	supportedECDHProfiles: number; // 1 byte unsigned integer
	requestedKeys: number; // 0 byte unsigned integer
}

export interface KexSet {
	_commandClass: 0x9f; // (159)
	_command: 0x6; // (6)
	// TODO param Properties1 type bitfield
	selectedKEXScheme: number; // 1 byte unsigned integer
	selectedECDHProfile: number; // 1 byte unsigned integer
	grantedKeys: number; // 0 byte unsigned integer
}

export interface KexFail {
	_commandClass: 0x9f; // (159)
	_command: 0x7; // (7)
	kEXFailType: KEXFailTypeEnum; // 1 byte enum value
}

export interface PublicKeyReport {
	_commandClass: 0x9f; // (159)
	_command: 0x8; // (8)
	// TODO param Properties1 type bitfield
	// TODO param ECDH Public Key type blob
}

export interface Security2NetworkKeyGet {
	_commandClass: 0x9f; // (159)
	_command: 0x9; // (9)
	requestedKey: number; // 1 byte unsigned integer
}

export interface Security2NetworkKeyReport {
	_commandClass: 0x9f; // (159)
	_command: 0xa; // (10)
	grantedKey: number; // 1 byte unsigned integer
	// TODO param Network Key type blob
}

export interface Security2NetworkKeyVerify {
	_commandClass: 0x9f; // (159)
	_command: 0xb; // (11)
}

export interface Security2TransferEnd {
	_commandClass: 0x9f; // (159)
	_command: 0xc; // (12)
	// TODO param Properties1 type bitfield
}

export interface Security2CommandsSupportedGet {
	_commandClass: 0x9f; // (159)
	_command: 0xd; // (13)
}

export interface Security2CommandsSupportedReport {
	_commandClass: 0x9f; // (159)
	_command: 0xe; // (14)
	// TODO param Command Class type enumarray
}

export enum KEXFailTypeEnum {
	KexKey = 0x1,
	KexScheme = 0x2,
	KexCurves = 0x3,
	Decrypt = 0x5,
	Cancel = 0x6,
	Auth = 0x7,
	KeyGet = 0x8,
	KeyVerify = 0x9,
	KeyReport = 0xa,
}
