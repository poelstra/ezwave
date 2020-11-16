/* Auto-generated */

export class CommandClassZip6lowpanV1 {
	public static readonly commandClass = 0x4f; // (79);
	public static readonly definition = {"id":79,"name":"COMMAND_CLASS_ZIP_6LOWPAN","status":"active","version":1,"commands":[{"id":192,"name":"LOWPAN_FIRST_FRAGMENT","status":"active","cmdMask":248,"params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Datagram Size 1","mask":7,"shift":0}],"cmdMask":7},{"type":"integer","name":"Datagram Size 2","length":1},{"type":"integer","name":"Datagram Tag","length":1},{"type":"blob","name":"Payload","length":"auto"}]},{"id":224,"name":"LOWPAN_SUBSEQUENT_FRAGMENT","status":"active","cmdMask":248,"params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Datagram Size 1","mask":7,"shift":0}],"cmdMask":7},{"type":"integer","name":"Datagram Size 2","length":1},{"type":"integer","name":"Datagram Tag","length":1},{"type":"integer","name":"Datagram Offset","length":1},{"type":"blob","name":"Payload","length":"auto"}]}]};
}

export interface LowpanFirstFragment {
	_commandClass: 0x4f; // (79)
	_command: 0xc0; // (192)
	// TODO param Properties1 type bitfield
	datagramSize2: number; // 1 byte unsigned integer
	datagramTag: number; // 1 byte unsigned integer
	// TODO param Payload type blob
}

export interface LowpanSubsequentFragment {
	_commandClass: 0x4f; // (79)
	_command: 0xe0; // (224)
	// TODO param Properties1 type bitfield
	datagramSize2: number; // 1 byte unsigned integer
	datagramTag: number; // 1 byte unsigned integer
	datagramOffset: number; // 1 byte unsigned integer
	// TODO param Payload type blob
}
