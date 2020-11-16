/* Auto-generated */

// obsolete
export class CommandClassMultiInstanceV1 {
	public static readonly commandClass = 0x60; // (96);
	public static readonly definition = {"id":96,"name":"COMMAND_CLASS_MULTI_INSTANCE","status":"obsolete","version":1,"commands":[{"id":6,"name":"MULTI_INSTANCE_CMD_ENCAP","status":"active","params":[{"type":"integer","name":"Instance","length":1},{"type":"integer","name":"Command Class","length":1,"valueType":"CMD_CLASS_REF"},{"type":"integer","name":"Command","length":1,"valueType":"CMD_REF"},{"type":"blob","name":"Parameter","length":"auto","blobType":"CMD_DATA"}]},{"id":4,"name":"MULTI_INSTANCE_GET","status":"active","params":[{"type":"integer","name":"Command Class","length":1,"valueType":"CMD_CLASS_REF"}]},{"id":5,"name":"MULTI_INSTANCE_REPORT","status":"active","params":[{"type":"integer","name":"Command Class","length":1,"valueType":"CMD_CLASS_REF"},{"type":"integer","name":"Instances","length":1}]}]};
}

export interface MultiInstanceCmdEncap {
	_commandClass: 0x60; // (96)
	_command: 0x6; // (6)
	instance: number; // 1 byte unsigned integer
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
	instances: number; // 1 byte unsigned integer
}
