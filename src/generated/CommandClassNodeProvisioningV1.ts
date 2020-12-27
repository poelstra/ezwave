/* Auto-generated */

export class CommandClassNodeProvisioningV1 {
	public static readonly commandClass = 0x78; // (120);
	public static readonly definition = {"id":120,"name":"COMMAND_CLASS_NODE_PROVISIONING","status":"active","version":1,"commands":[{"id":1,"name":"NODE_PROVISIONING_SET","status":"active","params":[{"type":"integer","name":"Seq No","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"DSK Length","mask":31,"shift":0},{"type":"integer","name":"Reserved1","mask":224,"shift":5}]},{"type":"blob","name":"DSK","length":{"name":"Properties1","mask":31,"shift":0}},{"type":"group","name":"vg1","length":"auto","params":[{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"bool","name":"Critical","mask":1,"shift":0},{"type":"integer","name":"Meta Data Type","mask":254,"shift":1}]},{"type":"integer","name":"Length","length":1},{"type":"blob","name":"Value","length":{"name":"Length","mask":255,"shift":0}}]}]},{"id":2,"name":"NODE_PROVISIONING_DELETE","status":"active","params":[{"type":"integer","name":"Seq No","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"DSK Length","mask":31,"shift":0},{"type":"integer","name":"Reserved1","mask":224,"shift":5}]},{"type":"blob","name":"DSK","length":{"name":"Properties1","mask":31,"shift":0}}]},{"id":3,"name":"NODE_PROVISIONING_LIST_ITERATION_GET","status":"active","params":[{"type":"integer","name":"Seq No","length":1},{"type":"integer","name":"Remaining Counter","length":1}]},{"id":4,"name":"NODE_PROVISIONING_LIST_ITERATION_REPORT","status":"active","params":[{"type":"integer","name":"Seq No","length":1},{"type":"integer","name":"Remaining Count","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"DSK Length","mask":31,"shift":0},{"type":"integer","name":"Reserved1","mask":224,"shift":5}]},{"type":"blob","name":"DSK","length":{"name":"Properties1","mask":31,"shift":0}},{"type":"group","name":"vg1","length":"auto","params":[{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"bool","name":"Critical","mask":1,"shift":0},{"type":"integer","name":"Meta Data Type","mask":254,"shift":1}]},{"type":"integer","name":"Length","length":1},{"type":"blob","name":"Value","length":{"name":"Length","mask":255,"shift":0}}]}]},{"id":5,"name":"NODE_PROVISIONING_GET","status":"active","params":[{"type":"integer","name":"Seq No","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"DSK Length","mask":31,"shift":0},{"type":"integer","name":"Reserved1","mask":224,"shift":5}]},{"type":"blob","name":"DSK","length":{"name":"Properties1","mask":31,"shift":0}}]},{"id":6,"name":"NODE_PROVISIONING_REPORT","status":"active","params":[{"type":"integer","name":"Seq No","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"DSK Length","mask":31,"shift":0},{"type":"integer","name":"Reserved","mask":224,"shift":5}]},{"type":"blob","name":"DSK","length":{"name":"Properties1","mask":31,"shift":0}},{"type":"group","name":"vg1","length":"auto","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Critical","mask":1,"shift":0},{"type":"integer","name":"Meta Data Type","mask":254,"shift":1}]},{"type":"integer","name":"Length","length":1},{"type":"blob","name":"Value","length":{"name":"Length","mask":255,"shift":0}}]}]}]};
}

export interface NodeProvisioningSet {
	_commandClass: 0x78; // (120)
	_command: 0x1; // (1)
	seqNo: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param DSK type blob
	// TODO param vg1 type group
}

export interface NodeProvisioningDelete {
	_commandClass: 0x78; // (120)
	_command: 0x2; // (2)
	seqNo: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param DSK type blob
}

export interface NodeProvisioningListIterationGet {
	_commandClass: 0x78; // (120)
	_command: 0x3; // (3)
	seqNo: number; // 1 byte unsigned integer
	remainingCounter: number; // 1 byte unsigned integer
}

export interface NodeProvisioningListIterationReport {
	_commandClass: 0x78; // (120)
	_command: 0x4; // (4)
	seqNo: number; // 1 byte unsigned integer
	remainingCount: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param DSK type blob
	// TODO param vg1 type group
}

export interface NodeProvisioningGet {
	_commandClass: 0x78; // (120)
	_command: 0x5; // (5)
	seqNo: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param DSK type blob
}

export interface NodeProvisioningReport {
	_commandClass: 0x78; // (120)
	_command: 0x6; // (6)
	seqNo: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param DSK type blob
	// TODO param vg1 type group
}
