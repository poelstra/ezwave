/* Auto-generated */

export class CommandClassCrc16EncapV1 {
	public static readonly commandClass = 0x56; // (86);
	public static readonly definition = {"id":86,"name":"COMMAND_CLASS_CRC_16_ENCAP","status":"active","version":1,"commands":[{"id":1,"name":"CRC_16_ENCAP","status":"active","params":[{"type":"integer","name":"Command Class","length":1,"valueType":"CMD_CLASS_REF"},{"type":"integer","name":"Command","length":1,"valueType":"CMD_REF"},{"type":"blob","name":"Data","length":"auto","blobType":"CMD_DATA"},{"type":"integer","name":"Checksum","length":2}]}]};
}

export interface Crc16Encap {
	_commandClass: 0x56; // (86)
	_command: 0x1; // (1)
	commandClass: number; // 1 byte unsigned integer
	command: number; // 1 byte unsigned integer
	// TODO param Data type blob
	checksum: number; // 2 byte unsigned integer
}
