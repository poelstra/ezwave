/* Auto-generated */

export class CommandClassSupervisionV1 {
	public static readonly commandClass = 0x6c; // (108);
	public static readonly definition = {"id":108,"name":"COMMAND_CLASS_SUPERVISION","status":"active","version":1,"commands":[{"id":1,"name":"SUPERVISION_GET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Session ID","mask":63,"shift":0},{"type":"bool","name":"Reserved","mask":64,"shift":6},{"type":"bool","name":"Status Updates","mask":128,"shift":7}]},{"type":"integer","name":"Encapsulated Command Length","length":1},{"type":"blob","name":"Encapsulated Command","length":{"name":"Encapsulated Command Length","mask":255,"shift":0},"blobType":"CMD_ENCAP"}]},{"id":2,"name":"SUPERVISION_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Session ID","mask":63,"shift":0},{"type":"bool","name":"Reserved","mask":64,"shift":6},{"type":"bool","name":"More Status Updates","mask":128,"shift":7}]},{"type":"enum","name":"Status","length":1,"values":{"0":"NO_SUPPORT","1":"WORKING","2":"FAIL","3":"BUSY","255":"SUCCESS"}},{"type":"integer","name":"Duration","length":1}]}]};
}

export interface SupervisionGet {
	_commandClass: 0x6c; // (108)
	_command: 0x1; // (1)
	// TODO param Properties1 type bitfield
	encapsulatedCommandLength: number; // 1 byte unsigned integer
	// TODO param Encapsulated Command type blob
}

export interface SupervisionReport {
	_commandClass: 0x6c; // (108)
	_command: 0x2; // (2)
	// TODO param Properties1 type bitfield
	status: StatusEnum; // 1 byte enum value
	duration: number; // 1 byte unsigned integer
}

export enum StatusEnum {
	NoSupport = 0x0,
	Working = 0x1,
	Fail = 0x2,
	Busy = 0x3,
	Success = 0xff,
}
