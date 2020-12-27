/* Auto-generated */

export class CommandClassSimpleAvControlV1 {
	public static readonly commandClass = 0x94; // (148);
	public static readonly definition = {"id":148,"name":"COMMAND_CLASS_SIMPLE_AV_CONTROL","status":"active","version":1,"commands":[{"id":2,"name":"SIMPLE_AV_CONTROL_GET","status":"active","params":[]},{"id":3,"name":"SIMPLE_AV_CONTROL_REPORT","status":"active","params":[{"type":"integer","name":"Number of reports","length":1}]},{"id":1,"name":"SIMPLE_AV_CONTROL_SET","status":"active","params":[{"type":"integer","name":"Sequence Number","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Key Attributes","mask":7,"shift":0},{"type":"integer","name":"Reserved","mask":248,"shift":3}]},{"type":"integer","name":"Reserved2","length":2},{"type":"group","name":"vg","length":"auto","params":[{"type":"integer","name":"Command","length":2}]}]},{"id":4,"name":"SIMPLE_AV_CONTROL_SUPPORTED_GET","status":"active","params":[{"type":"integer","name":"Report No","length":1}]},{"id":5,"name":"SIMPLE_AV_CONTROL_SUPPORTED_REPORT","status":"active","params":[{"type":"integer","name":"Report No","length":1},{"type":"integer","name":"Bit Mask","length":0}]}]};
}

export interface SimpleAvControlGet {
	_commandClass: 0x94; // (148)
	_command: 0x2; // (2)
}

export interface SimpleAvControlReport {
	_commandClass: 0x94; // (148)
	_command: 0x3; // (3)
	numberOfReports: number; // 1 byte unsigned integer
}

export interface SimpleAvControlSet {
	_commandClass: 0x94; // (148)
	_command: 0x1; // (1)
	sequenceNumber: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	reserved2: number; // 2 byte unsigned integer
	// TODO param vg type group
}

export interface SimpleAvControlSupportedGet {
	_commandClass: 0x94; // (148)
	_command: 0x4; // (4)
	reportNo: number; // 1 byte unsigned integer
}

export interface SimpleAvControlSupportedReport {
	_commandClass: 0x94; // (148)
	_command: 0x5; // (5)
	reportNo: number; // 1 byte unsigned integer
	bitMask: number; // 0 byte unsigned integer
}
