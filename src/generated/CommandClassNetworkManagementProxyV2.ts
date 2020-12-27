/* Auto-generated */

export class CommandClassNetworkManagementProxyV2 {
	public static readonly commandClass = 0x52; // (82);
	public static readonly definition = {"id":82,"name":"COMMAND_CLASS_NETWORK_MANAGEMENT_PROXY","status":"active","version":2,"commands":[{"id":3,"name":"NODE_INFO_CACHED_GET","status":"active","params":[{"type":"integer","name":"Seq. No","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Max Age","mask":15,"shift":0},{"type":"integer","name":"Reserved","mask":240,"shift":4}]},{"type":"integer","name":"Node ID","length":1,"valueType":"NODE_NUMBER"}]},{"id":4,"name":"NODE_INFO_CACHED_REPORT","status":"active","params":[{"type":"integer","name":"Seq. No","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Age","mask":15,"shift":0},{"type":"enum","name":"Status","mask":240,"shift":4,"values":{"0":"STATUS_OK","1":"STATUS_NOT_RESPONDING","2":"STATUS_UNKNOWN"}}]},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Z-Wave Protocol Specific Part 1","mask":127,"shift":0},{"type":"bool","name":"Listening","mask":128,"shift":7}]},{"type":"bitfield","name":"Properties3","length":1,"fields":[{"type":"integer","name":"Z-Wave Protocol Specific Part 2","mask":127,"shift":0},{"type":"bool","name":"Opt","mask":128,"shift":7}]},{"type":"integer","name":"Granted Keys","length":1},{"type":"integer","name":"Basic Device Class","length":1,"valueType":"BAS_DEV_REF"},{"type":"integer","name":"Generic Device Class","length":1,"valueType":"GEN_DEV_REF"},{"type":"integer","name":"Specific Device Class","length":1,"valueType":"SPEC_DEV_REF"},{"type":"enumarray","name":"Command Class","length":"auto","valueType":"CMD_CLASS_REF"}]},{"id":1,"name":"NODE_LIST_GET","status":"active","params":[{"type":"integer","name":"Seq. No","length":1}]},{"id":2,"name":"NODE_LIST_REPORT","status":"active","params":[{"type":"integer","name":"Seq. No","length":1},{"type":"integer","name":"Status","length":1,"values":{"0":"Latest","1":"May not be the latest"}},{"type":"integer","name":"Node List Controller ID","length":1},{"type":"integer","name":"Node List Data","length":0}]},{"id":5,"name":"NM_MULTI_CHANNEL_END_POINT_GET","status":"active","params":[{"type":"integer","name":"Seq No","length":1},{"type":"integer","name":"NodeID","length":1,"valueType":"NODE_NUMBER"}]},{"id":6,"name":"NM_MULTI_CHANNEL_END_POINT_REPORT","status":"active","params":[{"type":"integer","name":"Seq No","length":1},{"type":"integer","name":"NodeID","length":1,"valueType":"NODE_NUMBER"},{"type":"integer","name":"Reserved","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Individual End Points","mask":127,"shift":0},{"type":"bool","name":"Res1","mask":128,"shift":7}]},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Aggregated End Points","mask":127,"shift":0},{"type":"bool","name":"Res2","mask":128,"shift":7}]}]},{"id":7,"name":"NM_MULTI_CHANNEL_CAPABILITY_GET","status":"active","params":[{"type":"integer","name":"Seq No","length":1},{"type":"integer","name":"NodeID","length":1,"valueType":"NODE_NUMBER"},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"End Point","mask":127,"shift":0},{"type":"bool","name":"Res1","mask":128,"shift":7}]}]},{"id":8,"name":"NM_MULTI_CHANNEL_CAPABILITY_REPORT","status":"active","params":[{"type":"integer","name":"Seq No","length":1},{"type":"integer","name":"NodeID","length":1,"valueType":"NODE_NUMBER"},{"type":"integer","name":"Command Class Length","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"End Point","mask":127,"shift":0},{"type":"bool","name":"Res1","mask":128,"shift":7}]},{"type":"integer","name":"Generic Device Class","length":1,"valueType":"GEN_DEV_REF"},{"type":"integer","name":"Specific Device Class","length":1,"valueType":"SPEC_DEV_REF"},{"type":"enumarray","name":"Command Class","length":"auto","valueType":"CMD_CLASS_REF"}]},{"id":9,"name":"NM_MULTI_CHANNEL_AGGREGATED_MEMBERS_GET","status":"active","params":[{"type":"integer","name":"Seq No","length":1},{"type":"integer","name":"NodeID","length":1,"valueType":"NODE_NUMBER"},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Aggregated End Point","mask":127,"shift":0},{"type":"bool","name":"Res1","mask":128,"shift":7}]}]},{"id":10,"name":"NM_MULTI_CHANNEL_AGGREGATED_MEMBERS_REPORT","status":"active","params":[{"type":"integer","name":"Seq No","length":1},{"type":"integer","name":"NodeID","length":1,"valueType":"NODE_NUMBER"},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Aggregated End Point","mask":127,"shift":0},{"type":"bool","name":"Res1","mask":128,"shift":7}]},{"type":"integer","name":"Number of Members","length":1},{"type":"group","name":"vg1","length":"auto","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Member Endpoint","mask":127,"shift":0},{"type":"bool","name":"Res2","mask":128,"shift":7}]}]}]}]};
}

export interface NodeInfoCachedGet {
	_commandClass: 0x52; // (82)
	_command: 0x3; // (3)
	seqNo: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	nodeID: number; // 1 byte unsigned integer
}

export interface NodeInfoCachedReport {
	_commandClass: 0x52; // (82)
	_command: 0x4; // (4)
	seqNo: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param Properties2 type bitfield
	// TODO param Properties3 type bitfield
	grantedKeys: number; // 1 byte unsigned integer
	basicDeviceClass: number; // 1 byte unsigned integer
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
	// TODO param Command Class type enumarray
}

export interface NodeListGet {
	_commandClass: 0x52; // (82)
	_command: 0x1; // (1)
	seqNo: number; // 1 byte unsigned integer
}

export interface NodeListReport {
	_commandClass: 0x52; // (82)
	_command: 0x2; // (2)
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	nodeListControllerID: number; // 1 byte unsigned integer
	nodeListData: number; // 0 byte unsigned integer
}

export interface NmMultiChannelEndPointGet {
	_commandClass: 0x52; // (82)
	_command: 0x5; // (5)
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export interface NmMultiChannelEndPointReport {
	_commandClass: 0x52; // (82)
	_command: 0x6; // (6)
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
	reserved: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param Properties2 type bitfield
}

export interface NmMultiChannelCapabilityGet {
	_commandClass: 0x52; // (82)
	_command: 0x7; // (7)
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
}

export interface NmMultiChannelCapabilityReport {
	_commandClass: 0x52; // (82)
	_command: 0x8; // (8)
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
	commandClassLength: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
	// TODO param Command Class type enumarray
}

export interface NmMultiChannelAggregatedMembersGet {
	_commandClass: 0x52; // (82)
	_command: 0x9; // (9)
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
}

export interface NmMultiChannelAggregatedMembersReport {
	_commandClass: 0x52; // (82)
	_command: 0xa; // (10)
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	numberOfMembers: number; // 1 byte unsigned integer
	// TODO param vg1 type group
}
