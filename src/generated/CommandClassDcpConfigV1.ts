/* Auto-generated */

export class CommandClassDcpConfigV1 {
	public static readonly commandClass = 0x3a; // (58);
	public static readonly definition = {"id":58,"name":"COMMAND_CLASS_DCP_CONFIG","status":"active","version":1,"commands":[{"id":4,"name":"DCP_LIST_REMOVE","status":"active","params":[{"type":"integer","name":"Year","length":2},{"type":"integer","name":"Month","length":1},{"type":"integer","name":"Day","length":1},{"type":"integer","name":"Hour Local Time","length":1},{"type":"integer","name":"Minute Local Time","length":1},{"type":"integer","name":"Second Local Time","length":1}]},{"id":3,"name":"DCP_LIST_SET","status":"active","params":[{"type":"integer","name":"Year","length":2},{"type":"integer","name":"Month","length":1},{"type":"integer","name":"Day","length":1},{"type":"integer","name":"Hour Local Time","length":1},{"type":"integer","name":"Minute Local Time","length":1},{"type":"integer","name":"Second Local Time","length":1},{"type":"integer","name":"DCP Rate ID","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Number of DC","mask":3,"shift":0},{"type":"integer","name":"Reserved","mask":252,"shift":2}]},{"type":"group","name":"vg1","length":{"name":"Properties1","mask":3,"shift":0},"params":[{"type":"integer","name":"Generic Device Class","length":1,"valueType":"GEN_DEV_REF"},{"type":"integer","name":"Specific Device Class","length":1,"valueType":"SPEC_DEV_REF"}]},{"type":"integer","name":"Start Year","length":2},{"type":"integer","name":"Start Month","length":1},{"type":"integer","name":"Start Day","length":1},{"type":"integer","name":"Start Hour Local Time","length":1},{"type":"integer","name":"Start Minute Local Time","length":1},{"type":"integer","name":"Start Second Local Time","length":1},{"type":"integer","name":"Duration Hour Time","length":1},{"type":"integer","name":"Duration Minute Time","length":1},{"type":"integer","name":"Duration Second Time","length":1},{"type":"integer","name":"Event Priority","length":1},{"type":"integer","name":"Load shedding","length":1},{"type":"integer","name":"Start Association Group","length":1},{"type":"integer","name":"Stop Association Group","length":1},{"type":"integer","name":"Randomization interval","length":1}]},{"id":1,"name":"DCP_LIST_SUPPORTED_GET","status":"active","params":[]},{"id":2,"name":"DCP_LIST_SUPPORTED_REPORT","status":"active","params":[{"type":"integer","name":"DCP List Size","length":1},{"type":"integer","name":"Free DCP List entries","length":1}]}]};
}

export interface DcpListRemove {
	_commandClass: 0x3a; // (58)
	_command: 0x4; // (4)
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourLocalTime: number; // 1 byte unsigned integer
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
}

export interface DcpListSet {
	_commandClass: 0x3a; // (58)
	_command: 0x3; // (3)
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourLocalTime: number; // 1 byte unsigned integer
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
	dCPRateID: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param vg1 type group
	startYear: number; // 2 byte unsigned integer
	startMonth: number; // 1 byte unsigned integer
	startDay: number; // 1 byte unsigned integer
	startHourLocalTime: number; // 1 byte unsigned integer
	startMinuteLocalTime: number; // 1 byte unsigned integer
	startSecondLocalTime: number; // 1 byte unsigned integer
	durationHourTime: number; // 1 byte unsigned integer
	durationMinuteTime: number; // 1 byte unsigned integer
	durationSecondTime: number; // 1 byte unsigned integer
	eventPriority: number; // 1 byte unsigned integer
	loadShedding: number; // 1 byte unsigned integer
	startAssociationGroup: number; // 1 byte unsigned integer
	stopAssociationGroup: number; // 1 byte unsigned integer
	randomizationInterval: number; // 1 byte unsigned integer
}

export interface DcpListSupportedGet {
	_commandClass: 0x3a; // (58)
	_command: 0x1; // (1)
}

export interface DcpListSupportedReport {
	_commandClass: 0x3a; // (58)
	_command: 0x2; // (2)
	dCPListSize: number; // 1 byte unsigned integer
	freeDCPListEntries: number; // 1 byte unsigned integer
}
