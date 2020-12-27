/* Auto-generated */

export class CommandClassMeterTblMonitorV3 {
	public static readonly commandClass = 0x3d; // (61);
	public static readonly definition = {"id":61,"name":"COMMAND_CLASS_METER_TBL_MONITOR","status":"active","version":3,"commands":[{"id":11,"name":"METER_TBL_STATUS_REPORT","status":"active","params":[{"type":"integer","name":"Reports to follow","length":1},{"type":"integer","name":"Current Operating Status","length":3},{"type":"group","name":"vg","length":{"name":"Reports to follow","mask":255,"shift":0},"params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Operating Status Event ID","mask":31,"shift":0},{"type":"integer","name":"Reserved","mask":96,"shift":5},{"type":"bool","name":"Type","mask":128,"shift":7}]},{"type":"integer","name":"Year","length":2},{"type":"integer","name":"Month","length":1},{"type":"integer","name":"Day","length":1},{"type":"integer","name":"Hour Local Time","length":1},{"type":"integer","name":"Minute Local Time","length":1},{"type":"integer","name":"Second Local Time","length":1}]}]},{"id":10,"name":"METER_TBL_STATUS_DATE_GET","status":"active","params":[{"type":"integer","name":"Maximum Reports","length":1},{"type":"integer","name":"Start Year","length":2},{"type":"integer","name":"Start Month","length":1},{"type":"integer","name":"Start Day","length":1},{"type":"integer","name":"Start Hour Local Time","length":1},{"type":"integer","name":"Start Minute Local Time","length":1},{"type":"integer","name":"Start Second Local Time","length":1},{"type":"integer","name":"Stop Year","length":2},{"type":"integer","name":"Stop Month","length":1},{"type":"integer","name":"Stop Day","length":1},{"type":"integer","name":"Stop Hour Local Time","length":1},{"type":"integer","name":"Stop Minute Local Time","length":1},{"type":"integer","name":"Stop Second Local Time","length":1}]},{"id":9,"name":"METER_TBL_STATUS_DEPTH_GET","status":"active","params":[{"type":"integer","name":"Status Event Log Depth","length":1}]},{"id":7,"name":"METER_TBL_STATUS_SUPPORTED_GET","status":"active","params":[]},{"id":8,"name":"METER_TBL_STATUS_SUPPORTED_REPORT","status":"active","params":[{"type":"integer","name":"Supported Operating Status","length":3},{"type":"integer","name":"Status Event Log Depth","length":1}]},{"id":12,"name":"METER_TBL_CURRENT_DATA_GET","status":"active","params":[{"type":"integer","name":"Dataset Requested","length":3}]},{"id":13,"name":"METER_TBL_CURRENT_DATA_REPORT","status":"active","params":[{"type":"integer","name":"Reports to Follow","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Rate Type","mask":3,"shift":0},{"type":"integer","name":"Reserved","mask":124,"shift":2},{"type":"bool","name":"Operating Status Indication","mask":128,"shift":7}]},{"type":"integer","name":"Dataset","length":3},{"type":"integer","name":"Year","length":2},{"type":"integer","name":"Month","length":1},{"type":"integer","name":"Day","length":1},{"type":"integer","name":"Hour Local Time","length":1},{"type":"integer","name":"Minute Local Time","length":1},{"type":"integer","name":"Second Local Time","length":1},{"type":"group","name":"vg","length":{"name":"Reports to Follow","mask":255,"shift":0},"params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Current Scale","mask":31,"shift":0},{"type":"integer","name":"Current Precision","mask":224,"shift":5}]},{"type":"integer","name":"Current Value","length":4}]}]},{"id":14,"name":"METER_TBL_HISTORICAL_DATA_GET","status":"active","params":[{"type":"integer","name":"Maximum Reports","length":1},{"type":"integer","name":"Historical Dataset Requested","length":3},{"type":"integer","name":"Start Year","length":2},{"type":"integer","name":"Start Month","length":1},{"type":"integer","name":"Start Day","length":1},{"type":"integer","name":"Start Hour Local Time","length":1},{"type":"integer","name":"Start Minute Local Time","length":1},{"type":"integer","name":"Start Second Local Time","length":1},{"type":"integer","name":"Stop Year","length":2},{"type":"integer","name":"Stop Month","length":1},{"type":"integer","name":"Stop Day","length":1},{"type":"integer","name":"Stop Hour Local Time","length":1},{"type":"integer","name":"Stop Minute Local Time","length":1},{"type":"integer","name":"Stop Second Local Time","length":1}]},{"id":15,"name":"METER_TBL_HISTORICAL_DATA_REPORT","status":"active","params":[{"type":"integer","name":"Reports to Follow","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Rate Type","mask":3,"shift":0},{"type":"integer","name":"Reserved","mask":124,"shift":2},{"type":"bool","name":"Operating Status Indication","mask":128,"shift":7}]},{"type":"integer","name":"Dataset","length":3},{"type":"integer","name":"Year","length":2},{"type":"integer","name":"Month","length":1},{"type":"integer","name":"Day","length":1},{"type":"integer","name":"Hour Local Time","length":1},{"type":"integer","name":"Minute Local Time","length":1},{"type":"integer","name":"Second Local Time","length":1},{"type":"group","name":"vg","length":{"name":"Reports to Follow","mask":255,"shift":0},"params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Historical Scale","mask":31,"shift":0},{"type":"integer","name":"Historical Precision","mask":224,"shift":5}]},{"type":"integer","name":"Historical Value","length":4}]}]},{"id":6,"name":"METER_TBL_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Meter Type","mask":63,"shift":0},{"type":"integer","name":"Rate Type","mask":192,"shift":6}]},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"enum","name":"Pay Meter","mask":15,"shift":0,"values":{"0":"Reserved","1":"Creditmeter","2":"Prepayment meter","3":"Prepayment meter debt"}},{"type":"integer","name":"Reserved","mask":240,"shift":4}]},{"type":"integer","name":"Dataset Supported","length":3},{"type":"integer","name":"Dataset History Supported","length":3},{"type":"integer","name":"Data History Supported","length":3}]},{"id":5,"name":"METER_TBL_TABLE_CAPABILITY_GET","status":"active","params":[]},{"id":3,"name":"METER_TBL_TABLE_ID_GET","status":"active","params":[]},{"id":4,"name":"METER_TBL_TABLE_ID_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Number of Characters","mask":31,"shift":0},{"type":"integer","name":"Reserved","mask":224,"shift":5}]},{"type":"blob","name":"Meter ID Character","length":{"name":"Properties1","mask":31,"shift":0}}]},{"id":1,"name":"METER_TBL_TABLE_POINT_ADM_NO_GET","status":"active","params":[]},{"id":2,"name":"METER_TBL_TABLE_POINT_ADM_NO_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Number of Characters","mask":31,"shift":0},{"type":"integer","name":"Reserved","mask":224,"shift":5}]},{"type":"blob","name":"Meter Point Adm Number Character","length":{"name":"Properties1","mask":31,"shift":0}}]}]};
}

export interface MeterTblStatusReport {
	_commandClass: 0x3d; // (61)
	_command: 0xb; // (11)
	reportsToFollow: number; // 1 byte unsigned integer
	currentOperatingStatus: number; // 3 byte unsigned integer
	// TODO param vg type group
}

export interface MeterTblStatusDateGet {
	_commandClass: 0x3d; // (61)
	_command: 0xa; // (10)
	maximumReports: number; // 1 byte unsigned integer
	startYear: number; // 2 byte unsigned integer
	startMonth: number; // 1 byte unsigned integer
	startDay: number; // 1 byte unsigned integer
	startHourLocalTime: number; // 1 byte unsigned integer
	startMinuteLocalTime: number; // 1 byte unsigned integer
	startSecondLocalTime: number; // 1 byte unsigned integer
	stopYear: number; // 2 byte unsigned integer
	stopMonth: number; // 1 byte unsigned integer
	stopDay: number; // 1 byte unsigned integer
	stopHourLocalTime: number; // 1 byte unsigned integer
	stopMinuteLocalTime: number; // 1 byte unsigned integer
	stopSecondLocalTime: number; // 1 byte unsigned integer
}

export interface MeterTblStatusDepthGet {
	_commandClass: 0x3d; // (61)
	_command: 0x9; // (9)
	statusEventLogDepth: number; // 1 byte unsigned integer
}

export interface MeterTblStatusSupportedGet {
	_commandClass: 0x3d; // (61)
	_command: 0x7; // (7)
}

export interface MeterTblStatusSupportedReport {
	_commandClass: 0x3d; // (61)
	_command: 0x8; // (8)
	supportedOperatingStatus: number; // 3 byte unsigned integer
	statusEventLogDepth: number; // 1 byte unsigned integer
}

export interface MeterTblCurrentDataGet {
	_commandClass: 0x3d; // (61)
	_command: 0xc; // (12)
	datasetRequested: number; // 3 byte unsigned integer
}

export interface MeterTblCurrentDataReport {
	_commandClass: 0x3d; // (61)
	_command: 0xd; // (13)
	reportsToFollow: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	dataset: number; // 3 byte unsigned integer
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourLocalTime: number; // 1 byte unsigned integer
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
	// TODO param vg type group
}

export interface MeterTblHistoricalDataGet {
	_commandClass: 0x3d; // (61)
	_command: 0xe; // (14)
	maximumReports: number; // 1 byte unsigned integer
	historicalDatasetRequested: number; // 3 byte unsigned integer
	startYear: number; // 2 byte unsigned integer
	startMonth: number; // 1 byte unsigned integer
	startDay: number; // 1 byte unsigned integer
	startHourLocalTime: number; // 1 byte unsigned integer
	startMinuteLocalTime: number; // 1 byte unsigned integer
	startSecondLocalTime: number; // 1 byte unsigned integer
	stopYear: number; // 2 byte unsigned integer
	stopMonth: number; // 1 byte unsigned integer
	stopDay: number; // 1 byte unsigned integer
	stopHourLocalTime: number; // 1 byte unsigned integer
	stopMinuteLocalTime: number; // 1 byte unsigned integer
	stopSecondLocalTime: number; // 1 byte unsigned integer
}

export interface MeterTblHistoricalDataReport {
	_commandClass: 0x3d; // (61)
	_command: 0xf; // (15)
	reportsToFollow: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	dataset: number; // 3 byte unsigned integer
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourLocalTime: number; // 1 byte unsigned integer
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
	// TODO param vg type group
}

export interface MeterTblReport {
	_commandClass: 0x3d; // (61)
	_command: 0x6; // (6)
	// TODO param Properties1 type bitfield
	// TODO param Properties2 type bitfield
	datasetSupported: number; // 3 byte unsigned integer
	datasetHistorySupported: number; // 3 byte unsigned integer
	dataHistorySupported: number; // 3 byte unsigned integer
}

export interface MeterTblTableCapabilityGet {
	_commandClass: 0x3d; // (61)
	_command: 0x5; // (5)
}

export interface MeterTblTableIdGet {
	_commandClass: 0x3d; // (61)
	_command: 0x3; // (3)
}

export interface MeterTblTableIdReport {
	_commandClass: 0x3d; // (61)
	_command: 0x4; // (4)
	// TODO param Properties1 type bitfield
	// TODO param Meter ID Character type blob
}

export interface MeterTblTablePointAdmNoGet {
	_commandClass: 0x3d; // (61)
	_command: 0x1; // (1)
}

export interface MeterTblTablePointAdmNoReport {
	_commandClass: 0x3d; // (61)
	_command: 0x2; // (2)
	// TODO param Properties1 type bitfield
	// TODO param Meter Point Adm Number Character type blob
}
