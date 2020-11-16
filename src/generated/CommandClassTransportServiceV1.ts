/* Auto-generated */

// obsolete
export class CommandClassTransportServiceV1 {
	public static readonly commandClass = 0x55; // (85);
	public static readonly definition = {"id":85,"name":"COMMAND_CLASS_TRANSPORT_SERVICE","status":"obsolete","version":1,"commands":[{"id":192,"name":"COMMAND_FIRST_FRAGMENT","status":"active","cmdMask":248,"params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"datagram_size_1","mask":7,"shift":0}],"cmdMask":7},{"type":"integer","name":"datagram_size_2","length":1},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"int","name":"Sequence No","mask":15,"shift":0},{"type":"int","name":"Reserved","mask":240,"shift":4}]},{"type":"blob","name":"Payload","length":"auto"},{"type":"integer","name":"Checksum","length":2}]},{"id":224,"name":"COMMAND_SUBSEQUENT_FRAGMENT","status":"active","cmdMask":248,"params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"datagram_size_1","mask":7,"shift":0}],"cmdMask":7},{"type":"integer","name":"datagram_size_2","length":1},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"int","name":"datagram_offset_1","mask":7,"shift":0},{"type":"int","name":"Sequence No","mask":120,"shift":3},{"type":"bool","name":"Reserved","mask":128,"shift":7}]},{"type":"integer","name":"datagram_offset_2","length":1},{"type":"blob","name":"Payload","length":"auto"},{"type":"integer","name":"Checksum","length":2}]}]};
}

export interface CommandFirstFragment {
	_commandClass: 0x55; // (85)
	_command: 0xc0; // (192)
	// TODO param Properties1 type bitfield
	datagramSize2: number; // 1 byte unsigned integer
	// TODO param Properties2 type bitfield
	// TODO param Payload type blob
	checksum: number; // 2 byte unsigned integer
}

export interface CommandSubsequentFragment {
	_commandClass: 0x55; // (85)
	_command: 0xe0; // (224)
	// TODO param Properties1 type bitfield
	datagramSize2: number; // 1 byte unsigned integer
	// TODO param Properties2 type bitfield
	datagramOffset2: number; // 1 byte unsigned integer
	// TODO param Payload type blob
	checksum: number; // 2 byte unsigned integer
}
