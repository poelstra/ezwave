/* Auto-generated */

export class CommandClassVersionV2 {
	public static readonly commandClass = 0x86; // (134);
	public static readonly definition = {"id":134,"name":"COMMAND_CLASS_VERSION","status":"active","version":2,"commands":[{"id":19,"name":"VERSION_COMMAND_CLASS_GET","status":"active","params":[{"type":"integer","name":"Requested Command Class","length":1,"valueType":"CMD_CLASS_REF"}]},{"id":20,"name":"VERSION_COMMAND_CLASS_REPORT","status":"active","params":[{"type":"integer","name":"Requested Command Class","length":1,"valueType":"CMD_CLASS_REF"},{"type":"integer","name":"Command Class Version","length":1}]},{"id":17,"name":"VERSION_GET","status":"active","params":[]},{"id":18,"name":"VERSION_REPORT","status":"active","params":[{"type":"integer","name":"Z-Wave Library Type","length":1},{"type":"integer","name":"Z-Wave Protocol Version","length":1},{"type":"integer","name":"Z-Wave Protocol Sub Version","length":1},{"type":"integer","name":"Firmware 0 Version","length":1},{"type":"integer","name":"Firmware 0 Sub Version","length":1},{"type":"integer","name":"Hardware Version","length":1},{"type":"integer","name":"Number of firmware targets","length":1},{"type":"group","name":"vg","length":{"name":"Number of firmware targets","mask":255,"shift":0},"params":[{"type":"integer","name":"Firmware Version","length":1},{"type":"integer","name":"Firmware Sub Version","length":1}]}]}]};
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
	firmware0Version: number; // 1 byte unsigned integer
	firmware0SubVersion: number; // 1 byte unsigned integer
	hardwareVersion: number; // 1 byte unsigned integer
	numberOfFirmwareTargets: number; // 1 byte unsigned integer
	// TODO param vg type group
}
