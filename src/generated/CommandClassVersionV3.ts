/* Auto-generated */

export class CommandClassVersionV3 {
	public static readonly commandClass = 0x86; // (134);
	public static readonly definition = {"id":134,"name":"COMMAND_CLASS_VERSION","status":"active","version":3,"commands":[{"id":19,"name":"VERSION_COMMAND_CLASS_GET","status":"active","params":[{"type":"integer","name":"Requested Command Class","length":1,"valueType":"CMD_CLASS_REF"}]},{"id":20,"name":"VERSION_COMMAND_CLASS_REPORT","status":"active","params":[{"type":"integer","name":"Requested Command Class","length":1,"valueType":"CMD_CLASS_REF"},{"type":"integer","name":"Command Class Version","length":1}]},{"id":17,"name":"VERSION_GET","status":"active","params":[]},{"id":18,"name":"VERSION_REPORT","status":"active","params":[{"type":"integer","name":"Z-Wave Library Type","length":1},{"type":"integer","name":"Z-Wave Protocol Version","length":1},{"type":"integer","name":"Z-Wave Protocol Sub Version","length":1},{"type":"integer","name":"Firmware 0 Version","length":1},{"type":"integer","name":"Firmware 0 Sub Version","length":1},{"type":"integer","name":"Hardware Version","length":1},{"type":"integer","name":"Number of firmware targets","length":1},{"type":"group","name":"vg","length":{"name":"Number of firmware targets","mask":255,"shift":0},"params":[{"type":"integer","name":"Firmware Version","length":1},{"type":"integer","name":"Firmware Sub Version","length":1}]}]},{"id":21,"name":"VERSION_CAPABILITIES_GET","status":"active","params":[]},{"id":22,"name":"VERSION_CAPABILITIES_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Version","mask":1,"shift":0},{"type":"bool","name":"Command Class","mask":2,"shift":1},{"type":"bool","name":"Z-Wave Software","mask":4,"shift":2},{"type":"int","name":"Reserved1","mask":248,"shift":3}]}]},{"id":23,"name":"VERSION_ZWAVE_SOFTWARE_GET","status":"active","params":[]},{"id":24,"name":"VERSION_ZWAVE_SOFTWARE_REPORT","status":"active","params":[{"type":"integer","name":"SDK version","length":3},{"type":"integer","name":"Application Framework API Version","length":3},{"type":"integer","name":"Application Framework Build Number","length":2},{"type":"integer","name":"Host Interface Version","length":3},{"type":"integer","name":"Host Interface Build Number","length":2},{"type":"integer","name":"Z-Wave Protocol Version","length":3},{"type":"integer","name":"Z-Wave Protocol Build Number","length":2},{"type":"integer","name":"Application Version","length":3},{"type":"integer","name":"Application Build Number","length":2}]}]};
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

export interface VersionCapabilitiesGet {
	_commandClass: 0x86; // (134)
	_command: 0x15; // (21)
}

export interface VersionCapabilitiesReport {
	_commandClass: 0x86; // (134)
	_command: 0x16; // (22)
	// TODO param Properties1 type bitfield
}

export interface VersionZwaveSoftwareGet {
	_commandClass: 0x86; // (134)
	_command: 0x17; // (23)
}

export interface VersionZwaveSoftwareReport {
	_commandClass: 0x86; // (134)
	_command: 0x18; // (24)
	sDKVersion: number; // 3 byte unsigned integer
	applicationFrameworkAPIVersion: number; // 3 byte unsigned integer
	applicationFrameworkBuildNumber: number; // 2 byte unsigned integer
	hostInterfaceVersion: number; // 3 byte unsigned integer
	hostInterfaceBuildNumber: number; // 2 byte unsigned integer
	zWaveProtocolVersion: number; // 3 byte unsigned integer
	zWaveProtocolBuildNumber: number; // 2 byte unsigned integer
	applicationVersion: number; // 3 byte unsigned integer
	applicationBuildNumber: number; // 2 byte unsigned integer
}
