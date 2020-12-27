/* Auto-generated */

export class CommandClassZipV4 {
	public static readonly commandClass = 0x23; // (35);
	public static readonly definition = {"id":35,"name":"COMMAND_CLASS_ZIP","status":"active","version":4,"commands":[{"id":2,"name":"COMMAND_ZIP_PACKET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Ack Request","mask":128,"shift":7},{"type":"bool","name":"NAck - Option Error","mask":4,"shift":2},{"type":"bool","name":"NAck - Queue Full","mask":8,"shift":3},{"type":"bool","name":"NAck - Waiting","mask":16,"shift":4},{"type":"bool","name":"NAck Response","mask":32,"shift":5},{"type":"bool","name":"Ack Response","mask":64,"shift":6},{"type":"integer","name":"Reserved1","mask":3,"shift":0}]},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Reserved2","mask":15,"shift":0},{"type":"bool","name":"Secure Origin","mask":16,"shift":4},{"type":"bool","name":"More Information","mask":32,"shift":5},{"type":"bool","name":"Z-Wave Cmd Included","mask":64,"shift":6},{"type":"bool","name":"Header ext. included","mask":128,"shift":7}]},{"type":"integer","name":"Seq No","length":1},{"type":"bitfield","name":"Properties3","length":1,"fields":[{"type":"integer","name":"Source End Point","mask":127,"shift":0},{"type":"bool","name":"Reserved3","mask":128,"shift":7}]},{"type":"bitfield","name":"Properties4","length":1,"fields":[{"type":"integer","name":"Destination End Point","mask":127,"shift":0},{"type":"bool","name":"Bit Address","mask":128,"shift":7}]},{"type":"integer","name":"Header Length","optional":{"name":"Properties2","mask":128},"length":1},{"type":"blob","name":"Header extension","optional":{"name":"Properties2","mask":128},"length":{"name":"Header Length","mask":255,"shift":0},"includeBytesBefore":1},{"type":"blob","name":"Z-Wave command","optional":{"name":"Properties2","mask":64},"length":"auto"}]},{"id":3,"name":"COMMAND_ZIP_KEEP_ALIVE","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Reserved","mask":63,"shift":0},{"type":"bool","name":"Ack Responce","mask":64,"shift":6},{"type":"bool","name":"Ack Request","mask":128,"shift":7}]}]}]};
}

export interface CommandZipPacket {
	_commandClass: 0x23; // (35)
	_command: 0x2; // (2)
	// TODO param Properties1 type bitfield
	// TODO param Properties2 type bitfield
	seqNo: number; // 1 byte unsigned integer
	// TODO param Properties3 type bitfield
	// TODO param Properties4 type bitfield
	headerLength?: number; // 1 byte unsigned integer
	// TODO param Header extension type blob
	// TODO param Z-Wave command type blob
}

export interface CommandZipKeepAlive {
	_commandClass: 0x23; // (35)
	_command: 0x3; // (3)
	// TODO param Properties1 type bitfield
}
