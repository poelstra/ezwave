/* Auto-generated */

export class CommandClassMultiChannelV3 {
	public static readonly commandClass = 0x60; // (96);
	public static readonly definition = {"id":96,"name":"COMMAND_CLASS_MULTI_CHANNEL","status":"active","version":3,"commands":[{"id":9,"name":"MULTI_CHANNEL_CAPABILITY_GET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"End Point","mask":127,"shift":0},{"type":"bool","name":"Res","mask":128,"shift":7}]}]},{"id":10,"name":"MULTI_CHANNEL_CAPABILITY_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"End Point","mask":127,"shift":0},{"type":"bool","name":"Dynamic","mask":128,"shift":7}]},{"type":"integer","name":"Generic Device Class","length":1,"valueType":"GEN_DEV_REF"},{"type":"integer","name":"Specific Device Class","length":1,"valueType":"SPEC_DEV_REF"},{"type":"enumarray","name":"Command Class","length":"auto","valueType":"CMD_CLASS_REF"}]},{"id":13,"name":"MULTI_CHANNEL_CMD_ENCAP","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Source End Point","mask":127,"shift":0},{"type":"bool","name":"Res","mask":128,"shift":7}]},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Destination End Point","mask":127,"shift":0},{"type":"bool","name":"Bit address","mask":128,"shift":7}]},{"type":"integer","name":"Command Class","length":1,"valueType":"CMD_CLASS_REF"},{"type":"integer","name":"Command","length":1,"valueType":"CMD_REF"},{"type":"blob","name":"Parameter","length":"auto","blobType":"CMD_DATA"}]},{"id":11,"name":"MULTI_CHANNEL_END_POINT_FIND","status":"active","params":[{"type":"integer","name":"Generic Device Class","length":1,"valueType":"GEN_DEV_REF"},{"type":"integer","name":"Specific Device Class","length":1,"valueType":"SPEC_DEV_REF"}]},{"id":12,"name":"MULTI_CHANNEL_END_POINT_FIND_REPORT","status":"active","params":[{"type":"integer","name":"Reports to Follow","length":1},{"type":"integer","name":"Generic Device Class","length":1,"valueType":"GEN_DEV_REF"},{"type":"integer","name":"Specific Device Class","length":1,"valueType":"SPEC_DEV_REF"},{"type":"group","name":"vg","length":"auto","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"End Point","mask":127,"shift":0},{"type":"bool","name":"Res","mask":128,"shift":7}]}]}]},{"id":7,"name":"MULTI_CHANNEL_END_POINT_GET","status":"active","params":[]},{"id":8,"name":"MULTI_CHANNEL_END_POINT_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Res1","mask":63,"shift":0},{"type":"bool","name":"Identical","mask":64,"shift":6},{"type":"bool","name":"Dynamic","mask":128,"shift":7}]},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"End Points","mask":127,"shift":0},{"type":"bool","name":"Res2","mask":128,"shift":7}]}]},{"id":6,"name":"MULTI_INSTANCE_CMD_ENCAP","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Instance","mask":127,"shift":0},{"type":"bool","name":"Res","mask":128,"shift":7}]},{"type":"integer","name":"Command Class","length":1,"valueType":"CMD_CLASS_REF"},{"type":"integer","name":"Command","length":1,"valueType":"CMD_REF"},{"type":"blob","name":"Parameter","length":"auto","blobType":"CMD_DATA"}]},{"id":4,"name":"MULTI_INSTANCE_GET","status":"active","params":[{"type":"integer","name":"Command Class","length":1,"valueType":"CMD_CLASS_REF"}]},{"id":5,"name":"MULTI_INSTANCE_REPORT","status":"active","params":[{"type":"integer","name":"Command Class","length":1,"valueType":"CMD_CLASS_REF"},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Instances","mask":127,"shift":0},{"type":"bool","name":"Res","mask":128,"shift":7}]}]}]};
}

export interface MultiChannelCapabilityGet {
	_commandClass: 0x60; // (96)
	_command: 0x9; // (9)
	// TODO param Properties1 type bitfield
}

export interface MultiChannelCapabilityReport {
	_commandClass: 0x60; // (96)
	_command: 0xa; // (10)
	// TODO param Properties1 type bitfield
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
	// TODO param Command Class type enumarray
}

export interface MultiChannelCmdEncap {
	_commandClass: 0x60; // (96)
	_command: 0xd; // (13)
	// TODO param Properties1 type bitfield
	// TODO param Properties2 type bitfield
	commandClass: number; // 1 byte unsigned integer
	command: number; // 1 byte unsigned integer
	// TODO param Parameter type blob
}

export interface MultiChannelEndPointFind {
	_commandClass: 0x60; // (96)
	_command: 0xb; // (11)
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
}

export interface MultiChannelEndPointFindReport {
	_commandClass: 0x60; // (96)
	_command: 0xc; // (12)
	reportsToFollow: number; // 1 byte unsigned integer
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
	// TODO param vg type group
}

export interface MultiChannelEndPointGet {
	_commandClass: 0x60; // (96)
	_command: 0x7; // (7)
}

export interface MultiChannelEndPointReport {
	_commandClass: 0x60; // (96)
	_command: 0x8; // (8)
	// TODO param Properties1 type bitfield
	// TODO param Properties2 type bitfield
}

export interface MultiInstanceCmdEncap {
	_commandClass: 0x60; // (96)
	_command: 0x6; // (6)
	// TODO param Properties1 type bitfield
	commandClass: number; // 1 byte unsigned integer
	command: number; // 1 byte unsigned integer
	// TODO param Parameter type blob
}

export interface MultiInstanceGet {
	_commandClass: 0x60; // (96)
	_command: 0x4; // (4)
	commandClass: number; // 1 byte unsigned integer
}

export interface MultiInstanceReport {
	_commandClass: 0x60; // (96)
	_command: 0x5; // (5)
	commandClass: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
}
