/* Auto-generated */

export class CommandClassRateTblMonitorV1 {
	public static readonly commandClass = 0x49; // (73);
	public static readonly definition = {"id":73,"name":"COMMAND_CLASS_RATE_TBL_MONITOR","status":"active","version":1,"commands":[{"id":5,"name":"RATE_TBL_ACTIVE_RATE_GET","status":"active","params":[]},{"id":6,"name":"RATE_TBL_ACTIVE_RATE_REPORT","status":"active","params":[{"type":"integer","name":"Rate Parameter Set ID","length":1}]},{"id":7,"name":"RATE_TBL_CURRENT_DATA_GET","status":"active","params":[{"type":"integer","name":"Rate Parameter Set ID","length":1},{"type":"integer","name":"Dataset Requested","length":3}]},{"id":8,"name":"RATE_TBL_CURRENT_DATA_REPORT","status":"active","params":[{"type":"integer","name":"Reports to Follow","length":1},{"type":"integer","name":"Rate Parameter Set ID","length":1},{"type":"integer","name":"Dataset","length":3},{"type":"integer","name":"Year","length":2},{"type":"integer","name":"Month","length":1},{"type":"integer","name":"Day","length":1},{"type":"integer","name":"Hour Local Time","length":1},{"type":"integer","name":"Minute Local Time","length":1},{"type":"integer","name":"Second Local Time","length":1},{"type":"group","name":"vg","length":{"name":"Reports to Follow","mask":255,"shift":0},"params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Current Scale","mask":31,"shift":0},{"type":"int","name":"Current Precision","mask":224,"shift":5}]},{"type":"integer","name":"Current Value","length":4}]}]},{"id":3,"name":"RATE_TBL_GET","status":"active","params":[{"type":"integer","name":"Rate Parameter Set ID","length":1}]},{"id":9,"name":"RATE_TBL_HISTORICAL_DATA_GET","status":"active","params":[{"type":"integer","name":"Maximum Reports","length":1},{"type":"integer","name":"Rate Parameter Set ID","length":1},{"type":"integer","name":"Dataset Requested","length":3},{"type":"integer","name":"Start Year","length":2},{"type":"integer","name":"Start Month","length":1},{"type":"integer","name":"Start Day","length":1},{"type":"integer","name":"Start Hour Local Time","length":1},{"type":"integer","name":"Start Minute Local Time","length":1},{"type":"integer","name":"Start Second Local Time","length":1},{"type":"integer","name":"Stop Year","length":2},{"type":"integer","name":"Stop Month","length":1},{"type":"integer","name":"Stop Day","length":1},{"type":"integer","name":"Stop Hour Local Time","length":1},{"type":"integer","name":"Stop Minute Local Time","length":1},{"type":"integer","name":"Stop Second Local Time","length":1}]},{"id":10,"name":"RATE_TBL_HISTORICAL_DATA_REPORT","status":"active","params":[{"type":"integer","name":"Reports to Follow","length":1},{"type":"integer","name":"Rate Parameter Set ID","length":1},{"type":"integer","name":"Dataset","length":3},{"type":"integer","name":"Year","length":2},{"type":"integer","name":"Month","length":1},{"type":"integer","name":"Day","length":1},{"type":"integer","name":"Hour Local Time","length":1},{"type":"integer","name":"Minute Local Time","length":1},{"type":"integer","name":"Second Local Time","length":1},{"type":"group","name":"vg","length":{"name":"Reports to Follow","mask":255,"shift":0},"params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Historical Scale","mask":31,"shift":0},{"type":"int","name":"Historical Precision","mask":224,"shift":5}]},{"type":"integer","name":"Historical Value","length":4}]}]},{"id":4,"name":"RATE_TBL_REPORT","status":"active","params":[{"type":"integer","name":"Rate Parameter Set ID","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Number of Rate Char","mask":31,"shift":0},{"type":"int","name":"Rate Type","mask":96,"shift":5},{"type":"bool","name":"Reserved","mask":128,"shift":7}]},{"type":"blob","name":"Rate Character","length":{"name":"Properties1","mask":31,"shift":0}},{"type":"integer","name":"Start Hour Local Time","length":1},{"type":"integer","name":"Start Minute Local Time","length":1},{"type":"integer","name":"Duration Minute","length":2},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"int","name":"Consumption Scale","mask":31,"shift":0},{"type":"int","name":"Consumption Precision","mask":224,"shift":5}]},{"type":"integer","name":"Min Consumption Value","length":4},{"type":"integer","name":"Max Consumption Value","length":4},{"type":"bitfield","name":"Properties3","length":1,"fields":[{"type":"int","name":"Max Demand Scale","mask":31,"shift":0},{"type":"int","name":"Max Demand Precision","mask":224,"shift":5}]},{"type":"integer","name":"Max Demand Value","length":4},{"type":"integer","name":"DCP Rate ID","length":1}]},{"id":1,"name":"RATE_TBL_SUPPORTED_GET","status":"active","params":[]},{"id":2,"name":"RATE_TBL_SUPPORTED_REPORT","status":"active","params":[{"type":"integer","name":"Rates Supported","length":1},{"type":"integer","name":"Parameter Set Supported Bit Mask","length":2}]}]};
}

export interface RateTblActiveRateGet {
	_commandClass: 0x49; // (73)
	_command: 0x5; // (5)
}

export interface RateTblActiveRateReport {
	_commandClass: 0x49; // (73)
	_command: 0x6; // (6)
	rateParameterSetID: number; // 1 byte unsigned integer
}

export interface RateTblCurrentDataGet {
	_commandClass: 0x49; // (73)
	_command: 0x7; // (7)
	rateParameterSetID: number; // 1 byte unsigned integer
	datasetRequested: number; // 3 byte unsigned integer
}

export interface RateTblCurrentDataReport {
	_commandClass: 0x49; // (73)
	_command: 0x8; // (8)
	reportsToFollow: number; // 1 byte unsigned integer
	rateParameterSetID: number; // 1 byte unsigned integer
	dataset: number; // 3 byte unsigned integer
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourLocalTime: number; // 1 byte unsigned integer
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
	// TODO param vg type group
}

export interface RateTblGet {
	_commandClass: 0x49; // (73)
	_command: 0x3; // (3)
	rateParameterSetID: number; // 1 byte unsigned integer
}

export interface RateTblHistoricalDataGet {
	_commandClass: 0x49; // (73)
	_command: 0x9; // (9)
	maximumReports: number; // 1 byte unsigned integer
	rateParameterSetID: number; // 1 byte unsigned integer
	datasetRequested: number; // 3 byte unsigned integer
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

export interface RateTblHistoricalDataReport {
	_commandClass: 0x49; // (73)
	_command: 0xa; // (10)
	reportsToFollow: number; // 1 byte unsigned integer
	rateParameterSetID: number; // 1 byte unsigned integer
	dataset: number; // 3 byte unsigned integer
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourLocalTime: number; // 1 byte unsigned integer
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
	// TODO param vg type group
}

export interface RateTblReport {
	_commandClass: 0x49; // (73)
	_command: 0x4; // (4)
	rateParameterSetID: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param Rate Character type blob
	startHourLocalTime: number; // 1 byte unsigned integer
	startMinuteLocalTime: number; // 1 byte unsigned integer
	durationMinute: number; // 2 byte unsigned integer
	// TODO param Properties2 type bitfield
	minConsumptionValue: number; // 4 byte unsigned integer
	maxConsumptionValue: number; // 4 byte unsigned integer
	// TODO param Properties3 type bitfield
	maxDemandValue: number; // 4 byte unsigned integer
	dCPRateID: number; // 1 byte unsigned integer
}

export interface RateTblSupportedGet {
	_commandClass: 0x49; // (73)
	_command: 0x1; // (1)
}

export interface RateTblSupportedReport {
	_commandClass: 0x49; // (73)
	_command: 0x2; // (2)
	ratesSupported: number; // 1 byte unsigned integer
	parameterSetSupportedBitMask: number; // 2 byte unsigned integer
}
