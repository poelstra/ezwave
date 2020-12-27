/* Auto-generated */

export class CommandClassNetworkManagementPrimaryV1 {
	public static readonly commandClass = 0x54; // (84);
	public static readonly definition = {"id":84,"name":"COMMAND_CLASS_NETWORK_MANAGEMENT_PRIMARY","status":"active","version":1,"commands":[{"id":1,"name":"CONTROLLER_CHANGE","status":"active","params":[{"type":"integer","name":"Seq. No","length":1},{"type":"integer","name":"Reserved","length":1},{"type":"integer","name":"Mode","length":1,"values":{"2":"CONTROLLER_CHANGE_START","5":"CONTROLLER_CHANGE_STOP"}},{"type":"integer","name":"tx Options","length":0}]},{"id":2,"name":"CONTROLLER_CHANGE_STATUS","status":"active","params":[{"type":"integer","name":"Seq. No","length":1},{"type":"integer","name":"Status","length":1,"values":{"6":"NODE_ADD_STATUS_DONE","7":"NODE_ADD_STATUS_FAILED","9":"NODE_ADD_STATUS_SECURITY_FAILED"}},{"type":"integer","name":"Reserved","length":1},{"type":"integer","name":"New Node ID","length":1,"valueType":"NODE_NUMBER"},{"type":"integer","name":"Node Info Length","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Z-Wave Protocol Specific Part 1","mask":127,"shift":0},{"type":"bool","name":"Listening","mask":128,"shift":7}]},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Z-Wave Protocol Specific Part 2","mask":127,"shift":0},{"type":"bool","name":"Opt","mask":128,"shift":7}]},{"type":"integer","name":"Basic Device Class","length":1,"valueType":"BAS_DEV_REF"},{"type":"integer","name":"Generic Device Class","length":1,"valueType":"GEN_DEV_REF"},{"type":"integer","name":"Specific Device Class","length":1,"valueType":"SPEC_DEV_REF"},{"type":"enumarray","name":"Command Class","length":"auto","valueType":"CMD_CLASS_REF"}]}]};
}

export interface ControllerChange {
	_commandClass: 0x54; // (84)
	_command: 0x1; // (1)
	seqNo: number; // 1 byte unsigned integer
	reserved: number; // 1 byte unsigned integer
	mode: number; // 1 byte unsigned integer
	txOptions: number; // 0 byte unsigned integer
}

export interface ControllerChangeStatus {
	_commandClass: 0x54; // (84)
	_command: 0x2; // (2)
	seqNo: number; // 1 byte unsigned integer
	status: number; // 1 byte unsigned integer
	reserved: number; // 1 byte unsigned integer
	newNodeID: number; // 1 byte unsigned integer
	nodeInfoLength: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param Properties2 type bitfield
	basicDeviceClass: number; // 1 byte unsigned integer
	genericDeviceClass: number; // 1 byte unsigned integer
	specificDeviceClass: number; // 1 byte unsigned integer
	// TODO param Command Class type enumarray
}
