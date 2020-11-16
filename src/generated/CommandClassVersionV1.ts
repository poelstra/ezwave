/* Auto-generated */

export class CommandClassVersionV1 {
	public static readonly commandClass = 0x86; // (134);
	public static readonly definition = {"id":134,"name":"COMMAND_CLASS_VERSION","status":"active","version":1,"commands":[{"id":19,"name":"VERSION_COMMAND_CLASS_GET","status":"active","params":[{"type":"integer","name":"Requested Command Class","length":1,"valueType":"CMD_CLASS_REF"}]},{"id":20,"name":"VERSION_COMMAND_CLASS_REPORT","status":"active","params":[{"type":"integer","name":"Requested Command Class","length":1,"valueType":"CMD_CLASS_REF"},{"type":"integer","name":"Command Class Version","length":1}]},{"id":17,"name":"VERSION_GET","status":"active","params":[]},{"id":18,"name":"VERSION_REPORT","status":"active","params":[{"type":"integer","name":"Z-Wave Library Type","length":1},{"type":"integer","name":"Z-Wave Protocol Version","length":1},{"type":"integer","name":"Z-Wave Protocol Sub Version","length":1},{"type":"integer","name":"Application Version","length":1},{"type":"integer","name":"Application Sub Version","length":1}]}]};
}

export interface VersionCommandClassGet {
	_commandClass: 0x86; // (134)
	_command: 0x13; // (19)
	requestedCommandClass: number; // 1 byte unsigned integer
}

export interface VersionCommandClassReport {
	_commandClass: 0x86; // (134)
	_command: 0x14; // (20)
	requestedCommandClass: number; // 1 byte unsigned integer
	commandClassVersion: number; // 1 byte unsigned integer
}

export interface VersionGet {
	_commandClass: 0x86; // (134)
	_command: 0x11; // (17)
}

export interface VersionReport {
	_commandClass: 0x86; // (134)
	_command: 0x12; // (18)
	zWaveLibraryType: number; // 1 byte unsigned integer
	zWaveProtocolVersion: number; // 1 byte unsigned integer
	zWaveProtocolSubVersion: number; // 1 byte unsigned integer
	applicationVersion: number; // 1 byte unsigned integer
	applicationSubVersion: number; // 1 byte unsigned integer
}
