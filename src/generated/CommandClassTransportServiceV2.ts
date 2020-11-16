/* Auto-generated */

export class CommandClassTransportServiceV2 {
	public static readonly commandClass = 0x55; // (85);
	public static readonly definition = {"id":85,"name":"COMMAND_CLASS_TRANSPORT_SERVICE","status":"active","version":2,"commands":[{"id":192,"name":"COMMAND_FIRST_SEGMENT","status":"active","cmdMask":248,"params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"datagram_size_1","mask":7,"shift":0}],"cmdMask":7},{"type":"integer","name":"datagram_size_2","length":1},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"int","name":"Reserved","mask":7,"shift":0},{"type":"bool","name":"Ext","mask":8,"shift":3},{"type":"int","name":"Session ID","mask":240,"shift":4}]},{"type":"integer","name":"Header Extension Length","optional":{"name":"Properties2","mask":8},"length":1},{"type":"blob","name":"Header Extension","optional":{"name":"Properties2","mask":8},"length":{"name":"Header Extension Length","mask":255,"shift":0}},{"type":"blob","name":"Payload","length":"auto"},{"type":"integer","name":"Frame Check Sequence","length":2}]},{"id":232,"name":"COMMAND_SEGMENT_COMPLETE","status":"active","cmdMask":248,"params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"reserved","mask":7,"shift":0}],"cmdMask":7},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"int","name":"reserved2","mask":15,"shift":0},{"type":"int","name":"Session ID","mask":240,"shift":4}]}]},{"id":200,"name":"COMMAND_SEGMENT_REQUEST","status":"active","cmdMask":248,"params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"reserved","mask":7,"shift":0}],"cmdMask":7},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"int","name":"datagram_offset_1","mask":7,"shift":0},{"type":"bool","name":"reserved2","mask":8,"shift":3},{"type":"int","name":"Session ID","mask":240,"shift":4}]},{"type":"integer","name":"datagram_offset_2","length":1}]},{"id":240,"name":"COMMAND_SEGMENT_WAIT","status":"active","cmdMask":248,"params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"reserved","mask":7,"shift":0}],"cmdMask":7},{"type":"integer","name":"pending_fragments","length":1}]},{"id":224,"name":"COMMAND_SUBSEQUENT_SEGMENT","status":"active","cmdMask":248,"params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"datagram_size_1","mask":7,"shift":0}],"cmdMask":7},{"type":"integer","name":"datagram_size_2","length":1},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"int","name":"datagram_offset_1","mask":7,"shift":0},{"type":"int","name":"Session ID","mask":240,"shift":4},{"type":"bool","name":"Ext","mask":8,"shift":3}]},{"type":"integer","name":"datagram_offset_2","length":1},{"type":"integer","name":"Header Extension Length","optional":{"name":"Properties2","mask":8},"length":1},{"type":"blob","name":"Header Extension","optional":{"name":"Properties2","mask":8},"length":{"name":"Header Extension Length","mask":255,"shift":0}},{"type":"blob","name":"Payload","length":"auto"},{"type":"integer","name":"Frame Check Sequence","length":2}]}]};
}

export interface CommandFirstSegment {
	_commandClass: 0x55; // (85)
	_command: 0xc0; // (192)
	// TODO param Properties1 type bitfield
	datagramSize2: number; // 1 byte unsigned integer
	// TODO param Properties2 type bitfield
	headerExtensionLength?: number; // 1 byte unsigned integer
	// TODO param Header Extension type blob
	// TODO param Payload type blob
	frameCheckSequence: number; // 2 byte unsigned integer
}

export interface CommandSegmentComplete {
	_commandClass: 0x55; // (85)
	_command: 0xe8; // (232)
	// TODO param Properties1 type bitfield
	// TODO param Properties2 type bitfield
}

export interface CommandSegmentRequest {
	_commandClass: 0x55; // (85)
	_command: 0xc8; // (200)
	// TODO param Properties1 type bitfield
	// TODO param Properties2 type bitfield
	datagramOffset2: number; // 1 byte unsigned integer
}

export interface CommandSegmentWait {
	_commandClass: 0x55; // (85)
	_command: 0xf0; // (240)
	// TODO param Properties1 type bitfield
	pendingFragments: number; // 1 byte unsigned integer
}

export interface CommandSubsequentSegment {
	_commandClass: 0x55; // (85)
	_command: 0xe0; // (224)
	// TODO param Properties1 type bitfield
	datagramSize2: number; // 1 byte unsigned integer
	// TODO param Properties2 type bitfield
	datagramOffset2: number; // 1 byte unsigned integer
	headerExtensionLength?: number; // 1 byte unsigned integer
	// TODO param Header Extension type blob
	// TODO param Payload type blob
	frameCheckSequence: number; // 2 byte unsigned integer
}
