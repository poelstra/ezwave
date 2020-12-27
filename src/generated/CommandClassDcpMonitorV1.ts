/* Auto-generated */

export class CommandClassDcpMonitorV1 {
	public static readonly commandClass = 0x3b; // (59);
	public static readonly definition = {"id":59,"name":"COMMAND_CLASS_DCP_MONITOR","status":"active","version":1,"commands":[{"id":3,"name":"DCP_EVENT_STATUS_GET","status":"active","params":[{"type":"integer","name":"Year","length":2},{"type":"integer","name":"Month","length":1},{"type":"integer","name":"Day","length":1},{"type":"integer","name":"Hour Local Time","length":1},{"type":"integer","name":"Minute Local Time","length":1},{"type":"integer","name":"Second Local Time","length":1}]},{"id":4,"name":"DCP_EVENT_STATUS_REPORT","status":"active","params":[{"type":"integer","name":"Year","length":2},{"type":"integer","name":"Month","length":1},{"type":"integer","name":"Day","length":1},{"type":"integer","name":"Hour Local Time","length":1},{"type":"integer","name":"Minute Local Time","length":1},{"type":"integer","name":"Second Local Time","length":1},{"type":"integer","name":"Event status","length":1,"values":{"0":"Reserved","1":"Event Started","2":"Event Completed","3":"Event Rejected","4":"Event not Applicable"}}]},{"id":1,"name":"DCP_LIST_GET","status":"active","params":[]},{"id":2,"name":"DCP_LIST_REPORT","status":"active","params":[{"type":"integer","name":"Reports to Follow","length":1},{"type":"integer","name":"Year","length":2},{"type":"integer","name":"Month","length":1},{"type":"integer","name":"Day","length":1},{"type":"integer","name":"Hour Local Time","length":1},{"type":"integer","name":"Minute Local Time","length":1},{"type":"integer","name":"Second Local Time","length":1},{"type":"integer","name":"DCP ID","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Number of DC","mask":3,"shift":0},{"type":"integer","name":"Reserved","mask":252,"shift":2}]},{"type":"group","name":"vg1","length":{"name":"Reports to Follow","mask":255,"shift":0},"params":[{"type":"integer","name":"Generic Device Class","length":1,"valueType":"GEN_DEV_REF"},{"type":"integer","name":"Specific Device Class","length":1,"valueType":"SPEC_DEV_REF"}]},{"type":"integer","name":"Start Year","length":2},{"type":"integer","name":"Start Month","length":1},{"type":"integer","name":"Start Day","length":1},{"type":"integer","name":"Start Hour Local Time","length":1},{"type":"integer","name":"Start Minute Local Time","length":1},{"type":"integer","name":"Start Second Local Time","length":1},{"type":"integer","name":"Duration Hour Time","length":1},{"type":"integer","name":"Duration Minute Time","length":1},{"type":"integer","name":"Duration Second Time","length":1},{"type":"integer","name":"Event Priority","length":1},{"type":"integer","name":"Load shedding","length":1},{"type":"integer","name":"Start Association Group","length":1},{"type":"integer","name":"Stop Association Group","length":1},{"type":"integer","name":"Randomization interval","length":1}]}]};
}

export interface DcpEventStatusGet {
	_commandClass: 0x3b; // (59)
	_command: 0x3; // (3)
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourLocalTime: number; // 1 byte unsigned integer
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
}

export interface DcpEventStatusReport {
	_commandClass: 0x3b; // (59)
	_command: 0x4; // (4)
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourLocalTime: number; // 1 byte unsigned integer
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
	eventStatus: number; // 1 byte unsigned integer
}

export interface DcpListGet {
	_commandClass: 0x3b; // (59)
	_command: 0x1; // (1)
}

export interface DcpListReport {
	_commandClass: 0x3b; // (59)
	_command: 0x2; // (2)
	reportsToFollow: number; // 1 byte unsigned integer
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourLocalTime: number; // 1 byte unsigned integer
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
	dcpId: number; // 1 byte unsigned integer
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
