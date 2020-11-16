/* Auto-generated */

export class CommandClassZipGatewayV1 {
	public static readonly commandClass = 0x5f; // (95);
	public static readonly definition = {"id":95,"name":"COMMAND_CLASS_ZIP_GATEWAY","status":"active","version":1,"commands":[{"id":1,"name":"GATEWAY_MODE_SET","status":"active","params":[{"type":"enum","name":"Mode","length":1,"values":{"1":"Stand-alone","2":"Portal"}}]},{"id":2,"name":"GATEWAY_MODE_GET","status":"active","params":[]},{"id":3,"name":"GATEWAY_MODE_REPORT","status":"active","params":[{"type":"enum","name":"Mode","length":1,"values":{"1":"Stand-alone","2":"Portal"}}]},{"id":4,"name":"GATEWAY_PEER_SET","status":"active","params":[{"type":"integer","name":"Peer Profile","length":1},{"type":"blob","name":"IPv6 Address","length":16},{"type":"integer","name":"Port","length":2},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Peer Name Length","mask":63,"shift":0},{"type":"int","name":"Reserved","mask":192,"shift":6}]},{"type":"blob","name":"Peer Name","length":{"name":"Properties1","mask":63,"shift":0}}]},{"id":5,"name":"GATEWAY_PEER_GET","status":"active","params":[{"type":"integer","name":"Peer Profile","length":1}]},{"id":6,"name":"GATEWAY_PEER_REPORT","status":"active","params":[{"type":"integer","name":"Peer Profile","length":1},{"type":"integer","name":"Peer Count","length":1},{"type":"blob","name":"IPv6 Address","length":16},{"type":"integer","name":"Port","length":2},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Peer Name Length","mask":63,"shift":0},{"type":"int","name":"Reserved","mask":192,"shift":6}]},{"type":"blob","name":"Peer Name","length":{"name":"Properties1","mask":63,"shift":0}}]},{"id":7,"name":"GATEWAY_LOCK_SET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Lock","mask":1,"shift":0},{"type":"bool","name":"Show","mask":2,"shift":1},{"type":"int","name":"Reserved","mask":252,"shift":2}]}]},{"id":8,"name":"UNSOLICITED_DESTINATION_SET","status":"active","params":[{"type":"blob","name":"Unsolicited IPv6 Destination","length":16},{"type":"integer","name":"Unsolicited Destination Port","length":2}]},{"id":9,"name":"UNSOLICITED_DESTINATION_GET","status":"active","params":[]},{"id":10,"name":"UNSOLICITED_DESTINATION_REPORT","status":"active","params":[{"type":"blob","name":"Unsolicited IPv6 Destination","length":16},{"type":"integer","name":"Unsolicited Destination Port","length":2}]},{"id":11,"name":"COMMAND_APPLICATION_NODE_INFO_SET","status":"active","params":[{"type":"blob","name":"Non-Secure Command Class","length":"auto"},{"type":"integer","name":"Security Scheme 0 MARK","length":0},{"type":"blob","name":"Security Scheme 0 Command Class","length":"auto"}]},{"id":12,"name":"COMMAND_APPLICATION_NODE_INFO_GET","status":"active","params":[]},{"id":13,"name":"COMMAND_APPLICATION_NODE_INFO_REPORT","status":"active","params":[{"type":"blob","name":"Non-Secure Command Class","length":"auto"},{"type":"integer","name":"Security Scheme 0 MARK","length":0},{"type":"blob","name":"Security Scheme 0 Command Class","length":"auto"}]}]};
}

export interface GatewayModeSet {
	_commandClass: 0x5f; // (95)
	_command: 0x1; // (1)
	mode: ModeEnum; // 1 byte enum value
}

export interface GatewayModeGet {
	_commandClass: 0x5f; // (95)
	_command: 0x2; // (2)
}

export interface GatewayModeReport {
	_commandClass: 0x5f; // (95)
	_command: 0x3; // (3)
	mode: ModeEnum; // 1 byte enum value
}

export interface GatewayPeerSet {
	_commandClass: 0x5f; // (95)
	_command: 0x4; // (4)
	peerProfile: number; // 1 byte unsigned integer
	// TODO param IPv6 Address type blob
	port: number; // 2 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param Peer Name type blob
}

export interface GatewayPeerGet {
	_commandClass: 0x5f; // (95)
	_command: 0x5; // (5)
	peerProfile: number; // 1 byte unsigned integer
}

export interface GatewayPeerReport {
	_commandClass: 0x5f; // (95)
	_command: 0x6; // (6)
	peerProfile: number; // 1 byte unsigned integer
	peerCount: number; // 1 byte unsigned integer
	// TODO param IPv6 Address type blob
	port: number; // 2 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param Peer Name type blob
}

export interface GatewayLockSet {
	_commandClass: 0x5f; // (95)
	_command: 0x7; // (7)
	// TODO param Properties1 type bitfield
}

export interface UnsolicitedDestinationSet {
	_commandClass: 0x5f; // (95)
	_command: 0x8; // (8)
	// TODO param Unsolicited IPv6 Destination type blob
	unsolicitedDestinationPort: number; // 2 byte unsigned integer
}

export interface UnsolicitedDestinationGet {
	_commandClass: 0x5f; // (95)
	_command: 0x9; // (9)
}

export interface UnsolicitedDestinationReport {
	_commandClass: 0x5f; // (95)
	_command: 0xa; // (10)
	// TODO param Unsolicited IPv6 Destination type blob
	unsolicitedDestinationPort: number; // 2 byte unsigned integer
}

export interface CommandApplicationNodeInfoSet {
	_commandClass: 0x5f; // (95)
	_command: 0xb; // (11)
	// TODO param Non-Secure Command Class type blob
	securityScheme0MARK: number; // 0 byte unsigned integer
	// TODO param Security Scheme 0 Command Class type blob
}

export interface CommandApplicationNodeInfoGet {
	_commandClass: 0x5f; // (95)
	_command: 0xc; // (12)
}

export interface CommandApplicationNodeInfoReport {
	_commandClass: 0x5f; // (95)
	_command: 0xd; // (13)
	// TODO param Non-Secure Command Class type blob
	securityScheme0MARK: number; // 0 byte unsigned integer
	// TODO param Security Scheme 0 Command Class type blob
}

export enum ModeEnum {
	StandAlone = 0x1,
	Portal = 0x2,
}
