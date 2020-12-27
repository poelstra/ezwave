/* Auto-generated */

export class CommandClassDmxV1 {
	public static readonly commandClass = 0x65; // (101);
	public static readonly definition = {"id":101,"name":"COMMAND_CLASS_DMX","status":"active","version":1,"commands":[{"id":1,"name":"DMX_ADDRESS_SET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Page ID","mask":15,"shift":0},{"type":"integer","name":"Reserved","mask":240,"shift":4}]},{"type":"integer","name":"Channel ID","length":1}]},{"id":2,"name":"DMX_ADDRESS_GET","status":"active","params":[]},{"id":3,"name":"DMX_ADDRESS_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Page ID","mask":15,"shift":0},{"type":"integer","name":"Reserved","mask":240,"shift":4}]},{"type":"integer","name":"Channel ID","length":1}]},{"id":4,"name":"DMX_CAPABILITY_GET","status":"active","params":[{"type":"integer","name":"Channel ID","length":1}]},{"id":5,"name":"DMX_CAPABILITY_REPORT","status":"active","params":[{"type":"integer","name":"Channel ID","length":1},{"type":"integer","name":"Property ID","length":2},{"type":"integer","name":"Device Channels","length":1},{"type":"integer","name":"Max Channels","length":1}]},{"id":6,"name":"DMX_DATA","status":"active","params":[{"type":"integer","name":"Source","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Page","mask":15,"shift":0},{"type":"integer","name":"Sequence No","mask":48,"shift":4},{"type":"integer","name":"Reserved","mask":192,"shift":6}]},{"type":"blob","name":"DMX channel","length":"auto"}]}]};
}

export interface DmxAddressSet {
	_commandClass: 0x65; // (101)
	_command: 0x1; // (1)
	// TODO param Properties1 type bitfield
	channelID: number; // 1 byte unsigned integer
}

export interface DmxAddressGet {
	_commandClass: 0x65; // (101)
	_command: 0x2; // (2)
}

export interface DmxAddressReport {
	_commandClass: 0x65; // (101)
	_command: 0x3; // (3)
	// TODO param Properties1 type bitfield
	channelID: number; // 1 byte unsigned integer
}

export interface DmxCapabilityGet {
	_commandClass: 0x65; // (101)
	_command: 0x4; // (4)
	channelID: number; // 1 byte unsigned integer
}

export interface DmxCapabilityReport {
	_commandClass: 0x65; // (101)
	_command: 0x5; // (5)
	channelID: number; // 1 byte unsigned integer
	propertyID: number; // 2 byte unsigned integer
	deviceChannels: number; // 1 byte unsigned integer
	maxChannels: number; // 1 byte unsigned integer
}

export interface DmxData {
	_commandClass: 0x65; // (101)
	_command: 0x6; // (6)
	source: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param DMX channel type blob
}
