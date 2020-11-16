/* Auto-generated */

export class CommandClassNetworkManagementBasicV2 {
	public static readonly commandClass = 0x4d; // (77);
	public static readonly definition = {"id":77,"name":"COMMAND_CLASS_NETWORK_MANAGEMENT_BASIC","status":"active","version":2,"commands":[{"id":1,"name":"LEARN_MODE_SET","status":"active","params":[{"type":"integer","name":"Seq. No","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Return interview status","mask":1,"shift":0},{"type":"int","name":"Reserved","mask":254,"shift":1}]},{"type":"integer","name":"Mode","length":1,"values":{"0":"LEARN_MODE_SET_DISABLE","1":"LEARN_MODE_SET_CLASSIC","2":"LEARN_MODE_SET_NWI"}}]},{"id":2,"name":"LEARN_MODE_SET_STATUS","status":"active","params":[{"type":"integer","name":"Seq. No","length":1},{"type":"integer","name":"Status","length":1,"values":{"1":"LEARN_MODE_FAILED_TIMEOUT","6":"LEARN_MODE_DONE","7":"LEARN_MODE_FAILED","9":"LEARN_MODE_SECURITY_FAILED"}},{"type":"integer","name":"Reserved","length":1},{"type":"integer","name":"New Node ID","length":1,"valueType":"NODE_NUMBER"},{"type":"integer","name":"Granted Keys","length":1},{"type":"blob","name":"DSK","length":16}]},{"id":5,"name":"NODE_INFORMATION_SEND","status":"active","params":[{"type":"integer","name":"Seq. No","length":1},{"type":"integer","name":"Reserved","length":1},{"type":"integer","name":"Destination Node ID","length":1,"valueType":"NODE_NUMBER"},{"type":"integer","name":"tx Options","length":0}]},{"id":3,"name":"NETWORK_UPDATE_REQUEST","status":"active","params":[{"type":"integer","name":"Seq. No","length":1}]},{"id":4,"name":"NETWORK_UPDATE_REQUEST_STATUS","status":"active","params":[{"type":"integer","name":"Seq. No","length":1},{"type":"integer","name":"Status","length":1,"values":{"0":"SUC_UPDATE_DONE","1":"SUC_UPDATE_ABORT","2":"SUC_UPDATE_WAIT","3":"SUC_UPDATE_DISABLED","4":"SUC_UPDATE_OVERFLOW"}}]},{"id":6,"name":"DEFAULT_SET","status":"active","params":[{"type":"integer","name":"Seq. No","length":1}]},{"id":7,"name":"DEFAULT_SET_COMPLETE","status":"active","params":[{"type":"integer","name":"Seq. No","length":1},{"type":"integer","name":"Status","length":1,"values":{"6":"DEFAULT_SET_DONE","7":"DEFAULT_SET_BUSY"}}]},{"id":8,"name":"DSK_GET","status":"active","params":[{"type":"integer","name":"Seq No","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Add mode","mask":1,"shift":0},{"type":"int","name":"Reserved","mask":254,"shift":1}]}]},{"id":9,"name":"DSK_REPORT","status":"active","params":[{"type":"integer","name":"Seq No","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Add mode","mask":1,"shift":0},{"type":"int","name":"Reserved","mask":254,"shift":1}]},{"type":"blob","name":"DSK","length":16}]}]};
}

export interface LearnModeSet {
	_commandClass: 0x4d; // (77)
	_command: 0x1; // (1)
	seqNo: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	mode: number; // 1 byte unsigned integer
}

export interface LearnModeSetStatus {
	_commandClass: 0x4d; // (77)
	_command: 0x2; // (2)
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	reserved: number; // 1 byte unsigned integer
	newNodeID: number; // 1 byte unsigned integer
	grantedKeys: number; // 1 byte unsigned integer
	// TODO param DSK type blob
}

export interface NodeInformationSend {
	_commandClass: 0x4d; // (77)
	_command: 0x5; // (5)
	seqNo: number; // 1 byte unsigned integer
	reserved: number; // 1 byte unsigned integer
	destinationNodeID: number; // 1 byte unsigned integer
	txOptions: number; // 0 byte unsigned integer
}

export interface NetworkUpdateRequest {
	_commandClass: 0x4d; // (77)
	_command: 0x3; // (3)
	seqNo: number; // 1 byte unsigned integer
}

export interface NetworkUpdateRequestStatus {
	_commandClass: 0x4d; // (77)
	_command: 0x4; // (4)
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export interface DefaultSet {
	_commandClass: 0x4d; // (77)
	_command: 0x6; // (6)
	seqNo: number; // 1 byte unsigned integer
}

export interface DefaultSetComplete {
	_commandClass: 0x4d; // (77)
	_command: 0x7; // (7)
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
}

export interface DskGet {
	_commandClass: 0x4d; // (77)
	_command: 0x8; // (8)
	seqNo: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
}

export interface DskReport {
	_commandClass: 0x4d; // (77)
	_command: 0x9; // (9)
	seqNo: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param DSK type blob
}
