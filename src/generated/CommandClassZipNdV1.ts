/* Auto-generated */

export class CommandClassZipNdV1 {
	public static readonly commandClass = 0x58; // (88);
	public static readonly definition = {"id":88,"name":"COMMAND_CLASS_ZIP_ND","status":"active","version":1,"commands":[{"id":3,"name":"ZIP_NODE_SOLICITATION","status":"active","params":[{"type":"integer","name":"Reserved","length":1},{"type":"integer","name":"Node ID","length":1,"valueType":"NODE_NUMBER"},{"type":"blob","name":"IPv6 Address","length":16}]},{"id":4,"name":"ZIP_INV_NODE_SOLICITATION","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Reserved1","mask":3,"shift":0},{"type":"bool","name":"Local","mask":4,"shift":2},{"type":"integer","name":"Reserved2","mask":248,"shift":3}]},{"type":"integer","name":"Node ID","length":1,"valueType":"NODE_NUMBER"}]},{"id":1,"name":"ZIP_NODE_ADVERTISEMENT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Validity","mask":3,"shift":0,"values":{"0":"INFORMATION_OK","1":"INFORMATION_OBSOLETE","2":"INFORMATION_NOT_FOUND"}},{"type":"bool","name":"Local","mask":4,"shift":2},{"type":"integer","name":"Reserved","mask":248,"shift":3}]},{"type":"integer","name":"Node ID","length":1,"valueType":"NODE_NUMBER"},{"type":"blob","name":"IPv6 Address","length":16},{"type":"blob","name":"Home ID","length":4}]}]};
}

export interface ZipNodeSolicitation {
	_commandClass: 0x58; // (88)
	_command: 0x3; // (3)
	reserved: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
	// TODO param IPv6 Address type blob
}

export interface ZipInvNodeSolicitation {
	_commandClass: 0x58; // (88)
	_command: 0x4; // (4)
	// TODO param Properties1 type bitfield
	nodeID: number; // 1 byte unsigned integer
}

export interface ZipNodeAdvertisement {
	_commandClass: 0x58; // (88)
	_command: 0x1; // (1)
	// TODO param Properties1 type bitfield
	nodeID: number; // 1 byte unsigned integer
	// TODO param IPv6 Address type blob
	// TODO param Home ID type blob
}
