/* Auto-generated */

export class CommandClassNetworkManagementInclusionV3 {
	public static readonly commandClass = 0x34; // (52);
	public static readonly definition = {"id":52,"name":"COMMAND_CLASS_NETWORK_MANAGEMENT_INCLUSION","status":"active","version":3,"commands":[{"id":7,"name":"FAILED_NODE_REMOVE","status":"active","params":[{"type":"integer","name":"Seq. No","length":1},{"type":"integer","name":"Node ID","length":1,"valueType":"NODE_NUMBER"}]},{"id":8,"name":"FAILED_NODE_REMOVE_STATUS","status":"active","params":[{"type":"integer","name":"Seq. No","length":1},{"type":"integer","name":"Node ID","length":1,"valueType":"NODE_NUMBER"},{"type":"integer","name":"Status","length":1,"values":{"0":"FAILED_NODE_NOT_FOUND","1":"DONE","2":"FAILED_NODE_REMOVE_FAIL"}}]},{"id":1,"name":"NODE_ADD","status":"active","params":[{"type":"integer","name":"Seq. No","length":1},{"type":"integer","name":"Reserved","length":1},{"type":"integer","name":"Mode","length":1,"values":{"1":"NODE_ADD_ANY","2":"NODE_ADD_CONTROLLER","3":"NODE_ADD_SLAVE","4":"NODE_ADD_EXISTING","5":"NODE_ADD_STOP","6":"NODE_ADD_STOP_FAILED","7":"NODE_ADD_ANY_S2"}},{"type":"integer","name":"tx Options","length":0}]},{"id":2,"name":"NODE_ADD_STATUS","status":"active","params":[{"type":"integer","name":"Seq. No","length":1},{"type":"integer","name":"Status","length":1,"values":{"6":"NODE_ADD_STATUS_DONE","7":"NODE_ADD_STATUS_FAILED","9":"NODE_ADD_STATUS_SECURITY_FAILED"}},{"type":"integer","name":"Reserved1","length":1},{"type":"integer","name":"New Node ID","length":1,"valueType":"NODE_NUMBER"},{"type":"integer","name":"Node Info Length","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Z-Wave Protocol Specific Part 1","mask":127,"shift":0},{"type":"bool","name":"Listening","mask":128,"shift":7}]},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Z-Wave Protocol Specific Part 2","mask":127,"shift":0},{"type":"bool","name":"Opt","mask":128,"shift":7}]},{"type":"integer","name":"Basic Device Class","length":1,"valueType":"BAS_DEV_REF"},{"type":"integer","name":"Generic Device Class","length":1,"valueType":"GEN_DEV_REF"},{"type":"integer","name":"Specific Device Class","length":1,"valueType":"SPEC_DEV_REF"},{"type":"enumarray","name":"Command Class","length":{"name":"Node Info Length","mask":255,"shift":0},"valueType":"CMD_CLASS_REF"},{"type":"integer","name":"Granted Keys","length":1},{"type":"integer","name":"KEX Fail Type","length":1},{"type":"bitfield","name":"Properties3","length":1,"fields":[{"type":"integer","name":"DSK Length","mask":31,"shift":0},{"type":"integer","name":"Reserved2","mask":224,"shift":5}]},{"type":"blob","name":"DSK","length":{"name":"Properties3","mask":31,"shift":0}}]},{"id":3,"name":"NODE_REMOVE","status":"active","params":[{"type":"integer","name":"Seq. No","length":1},{"type":"integer","name":"Reserved","length":1},{"type":"integer","name":"Mode","length":1,"values":{"1":"NODE_REMOVE_ANY","2":"NODE_REMOVE_CONTROLLER","3":"NODE_REMOVE_SLAVE","5":"NODE_REMOVE_STOP"}}]},{"id":4,"name":"NODE_REMOVE_STATUS","status":"active","params":[{"type":"integer","name":"Seq. No","length":1},{"type":"integer","name":"Status","length":1,"values":{"6":"NODE_REMOVE_STATUS_DONE","7":"NODE_REMOVE_STATUS_FAILED"}},{"type":"integer","name":"NodeID","length":1,"valueType":"NODE_NUMBER"}]},{"id":9,"name":"FAILED_NODE_REPLACE","status":"active","params":[{"type":"integer","name":"Seq. No","length":1},{"type":"integer","name":"Node ID","length":1,"valueType":"NODE_NUMBER"},{"type":"integer","name":"tx Options","length":0},{"type":"integer","name":"Mode","length":1}]},{"id":10,"name":"FAILED_NODE_REPLACE_STATUS","status":"active","params":[{"type":"integer","name":"Seq. No","length":1},{"type":"integer","name":"Status","length":1,"values":{"4":"DONE","5":"FAILED_NODE_REPLACE_FAIL","9":"FAILED_NODE_REPLACE_SECURITY_FAILED"}},{"type":"integer","name":"Node ID","length":1,"valueType":"NODE_NUMBER"},{"type":"integer","name":"Granted Keys","length":1},{"type":"integer","name":"KEX Fail Type","length":1}]},{"id":11,"name":"NODE_NEIGHBOR_UPDATE_REQUEST","status":"active","params":[{"type":"integer","name":"Seq. No","length":1},{"type":"integer","name":"Node ID","length":1,"valueType":"NODE_NUMBER"}]},{"id":12,"name":"NODE_NEIGHBOR_UPDATE_STATUS","status":"active","params":[{"type":"integer","name":"Seq. No","length":1},{"type":"integer","name":"Status","length":1,"values":{"34":"NEIGHBOR_UPDATE_STATUS_DONE","35":"NEIGHBOR_UPDATE_STATUS_FAIL"}}]},{"id":13,"name":"RETURN_ROUTE_ASSIGN","status":"active","params":[{"type":"integer","name":"Seq. No","length":1},{"type":"integer","name":"Source Node ID","length":1,"valueType":"NODE_NUMBER"},{"type":"integer","name":"Destination Node ID","length":1,"valueType":"NODE_NUMBER"}]},{"id":14,"name":"RETURN_ROUTE_ASSIGN_COMPLETE","status":"active","params":[{"type":"integer","name":"Seq. No","length":1},{"type":"integer","name":"Status","length":1,"values":{"0":"TRANSMIT_COMPLETE_OK","1":"TRANSMIT_COMPLETE_NO_ACK","2":"TRANSMIT_COMPLETE_FAIL"}}]},{"id":15,"name":"RETURN_ROUTE_DELETE","status":"active","params":[{"type":"integer","name":"Seq. No","length":1},{"type":"integer","name":"Node ID","length":1,"valueType":"NODE_NUMBER"}]},{"id":16,"name":"RETURN_ROUTE_DELETE_COMPLETE","status":"active","params":[{"type":"integer","name":"Seq. No","length":1},{"type":"integer","name":"Status","length":1,"values":{"0":"TRANSMIT_COMPLETE_OK","1":"TRANSMIT_COMPLETE_NO_ACK","2":"TRANSMIT_COMPLETE_FAIL"}}]},{"id":17,"name":"NODE_ADD_KEYS_REPORT","status":"active","params":[{"type":"integer","name":"Seq No","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Request CSA","mask":1,"shift":0},{"type":"integer","name":"Reserved","mask":254,"shift":1}]},{"type":"integer","name":"Requested Keys","length":1}]},{"id":18,"name":"NODE_ADD_KEYS_SET","status":"active","params":[{"type":"integer","name":"Seq No","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Accept","mask":1,"shift":0},{"type":"bool","name":"Grant CSA","mask":2,"shift":1},{"type":"integer","name":"Reserved","mask":252,"shift":2}]},{"type":"integer","name":"Granted Keys","length":1}]},{"id":19,"name":"NODE_ADD_DSK_REPORT","status":"active","params":[{"type":"integer","name":"Seq No","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Input DSK Length","mask":15,"shift":0},{"type":"integer","name":"Reserved","mask":240,"shift":4}]},{"type":"blob","name":"DSK","length":16}]},{"id":20,"name":"NODE_ADD_DSK_SET","status":"active","params":[{"type":"integer","name":"Seq No","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Input DSK Length","mask":15,"shift":0},{"type":"integer","name":"Reserved","mask":112,"shift":4},{"type":"bool","name":"Accept","mask":128,"shift":7}]},{"type":"blob","name":"Input DSK","length":{"name":"Properties1","mask":15,"shift":0}}]},{"id":23,"name":"S2_ADVANCED_JOIN_MODE_GET","status":"active","params":[{"type":"integer","name":"Seq No","length":1}]},{"id":21,"name":"SMART_START_JOIN_STARTED_REPORT","status":"active","params":[{"type":"integer","name":"Seq No","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"DSK Length","mask":31,"shift":0},{"type":"integer","name":"Reserved1","mask":224,"shift":5}]},{"type":"blob","name":"DSK","length":{"name":"Properties1","mask":31,"shift":0}}]},{"id":22,"name":"S2_ADVANCED_JOIN_MODE_SET","status":"active","params":[{"type":"integer","name":"Seq No","length":1},{"type":"integer","name":"S2 Advanced Join Mode","length":1}]},{"id":24,"name":"S2_ADVANCED_JOIN_MODE_REPORT","status":"active","params":[{"type":"integer","name":"Seq No","length":1},{"type":"integer","name":"S2 Advanced Join Mode","length":1}]},{"id":25,"name":"INCLUDED_NIF_REPORT","status":"active","params":[{"type":"integer","name":"Seq No","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"DSK Length","mask":31,"shift":0},{"type":"integer","name":"Reserved1","mask":224,"shift":5}]},{"type":"blob","name":"DSK","length":{"name":"Properties1","mask":31,"shift":0}}]}]};
}

export interface FailedNodeRemove {
	_commandClass: 0x34; // (52)
	_command: 0x7; // (7)
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export interface FailedNodeRemoveStatus {
	_commandClass: 0x34; // (52)
	_command: 0x8; // (8)
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export interface NodeAdd {
	_commandClass: 0x34; // (52)
	_command: 0x1; // (1)
	seqNo: number; // 1 byte unsigned integer
	reserved: number; // 1 byte unsigned integer
	mode: number; // 1 byte unsigned integer
	txOptions: number; // 0 byte unsigned integer
}

export interface NodeAddStatus {
	_commandClass: 0x34; // (52)
	_command: 0x2; // (2)
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	reserved1: number; // 1 byte unsigned integer
	newNodeID: number; // 1 byte unsigned integer
	nodeInfoLength: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param Properties2 type bitfield
	basicDeviceClass: number; // 1 byte unsigned integer
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
	// TODO param Command Class type enumarray
	grantedKeys: number; // 1 byte unsigned integer
	kEXFailType: number; // 1 byte unsigned integer
	// TODO param Properties3 type bitfield
	// TODO param DSK type blob
}

export interface NodeRemove {
	_commandClass: 0x34; // (52)
	_command: 0x3; // (3)
	seqNo: number; // 1 byte unsigned integer
	reserved: number; // 1 byte unsigned integer
	mode: number; // 1 byte unsigned integer
}

export interface NodeRemoveStatus {
	_commandClass: 0x34; // (52)
	_command: 0x4; // (4)
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export interface FailedNodeReplace {
	_commandClass: 0x34; // (52)
	_command: 0x9; // (9)
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
	txOptions: number; // 0 byte unsigned integer
	mode: number; // 1 byte unsigned integer
}

export interface FailedNodeReplaceStatus {
	_commandClass: 0x34; // (52)
	_command: 0xa; // (10)
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
	grantedKeys: number; // 1 byte unsigned integer
	kEXFailType: number; // 1 byte unsigned integer
}

export interface NodeNeighborUpdateRequest {
	_commandClass: 0x34; // (52)
	_command: 0xb; // (11)
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export interface NodeNeighborUpdateStatus {
	_commandClass: 0x34; // (52)
	_command: 0xc; // (12)
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export interface ReturnRouteAssign {
	_commandClass: 0x34; // (52)
	_command: 0xd; // (13)
	seqNo: number; // 1 byte unsigned integer
	sourceNodeID: number; // 1 byte unsigned integer
	destinationNodeID: number; // 1 byte unsigned integer
}

export interface ReturnRouteAssignComplete {
	_commandClass: 0x34; // (52)
	_command: 0xe; // (14)
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export interface ReturnRouteDelete {
	_commandClass: 0x34; // (52)
	_command: 0xf; // (15)
	seqNo: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export interface ReturnRouteDeleteComplete {
	_commandClass: 0x34; // (52)
	_command: 0x10; // (16)
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export interface NodeAddKeysReport {
	_commandClass: 0x34; // (52)
	_command: 0x11; // (17)
	seqNo: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	requestedKeys: number; // 1 byte unsigned integer
}

export interface NodeAddKeysSet {
	_commandClass: 0x34; // (52)
	_command: 0x12; // (18)
	seqNo: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	grantedKeys: number; // 1 byte unsigned integer
}

export interface NodeAddDskReport {
	_commandClass: 0x34; // (52)
	_command: 0x13; // (19)
	seqNo: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param DSK type blob
}

export interface NodeAddDskSet {
	_commandClass: 0x34; // (52)
	_command: 0x14; // (20)
	seqNo: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param Input DSK type blob
}

export interface S2AdvancedJoinModeGet {
	_commandClass: 0x34; // (52)
	_command: 0x17; // (23)
	seqNo: number; // 1 byte unsigned integer
}

export interface SmartStartJoinStartedReport {
	_commandClass: 0x34; // (52)
	_command: 0x15; // (21)
	seqNo: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param DSK type blob
}

export interface S2AdvancedJoinModeSet {
	_commandClass: 0x34; // (52)
	_command: 0x16; // (22)
	seqNo: number; // 1 byte unsigned integer
	s2AdvancedJoinMode: number; // 1 byte unsigned integer
}

export interface S2AdvancedJoinModeReport {
	_commandClass: 0x34; // (52)
	_command: 0x18; // (24)
	seqNo: number; // 1 byte unsigned integer
	s2AdvancedJoinMode: number; // 1 byte unsigned integer
}

export interface IncludedNifReport {
	_commandClass: 0x34; // (52)
	_command: 0x19; // (25)
	seqNo: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param DSK type blob
}
