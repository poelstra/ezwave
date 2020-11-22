/* Auto-generated */

// obsolete
export class CommandClassZipV1 {
	public static readonly commandClass = 0x23; // (35);
	public static readonly definition = {"id":35,"name":"COMMAND_CLASS_ZIP","status":"obsolete","version":1,"commands":[{"id":2,"name":"COMMAND_ZIP_PACKET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Ack Request","mask":128,"shift":7},{"type":"bool","name":"NAck - Option Error","mask":4,"shift":2},{"type":"bool","name":"NAck - Queue Full","mask":8,"shift":3},{"type":"bool","name":"NAck - Waiting","mask":16,"shift":4},{"type":"bool","name":"NAck Response","mask":32,"shift":5},{"type":"bool","name":"Ack Response","mask":64,"shift":6},{"type":"int","name":"Reserved1","mask":3,"shift":0}]},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"int","name":"Reserved2","mask":31,"shift":0},{"type":"bool","name":"More Information","mask":32,"shift":5},{"type":"bool","name":"Z-Wave Cmd Included","mask":64,"shift":6},{"type":"bool","name":"Header ext. included","mask":128,"shift":7}]},{"type":"integer","name":"Seq No","length":1},{"type":"bitfield","name":"Properties3","length":1,"fields":[{"type":"int","name":"Source End Point","mask":127,"shift":0},{"type":"bool","name":"Reserved3","mask":128,"shift":7}]},{"type":"bitfield","name":"Properties4","length":1,"fields":[{"type":"int","name":"Destination End Point","mask":127,"shift":0},{"type":"bool","name":"Bit Address","mask":128,"shift":7}]},{"type":"blob","name":"Header extension","optional":{"name":"Properties2","mask":128},"length":"auto"},{"type":"blob","name":"Z-Wave command","optional":{"name":"Properties2","mask":64},"length":"auto"}]}]};
}

export interface CommandZipPacket {
	_commandClass: 0x23; // (35)
	_command: 0x2; // (2)
	// TODO param Properties1 type bitfield
	// TODO param Properties2 type bitfield
	seqNo: number; // 1 byte unsigned integer
	// TODO param Properties3 type bitfield
	// TODO param Properties4 type bitfield
	// TODO param Header extension type blob
	// TODO param Z-Wave command type blob
}