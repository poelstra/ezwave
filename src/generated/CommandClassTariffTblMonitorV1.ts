/* Auto-generated */

export class CommandClassTariffTblMonitorV1 {
	public static readonly commandClass = 0x4b; // (75);
	public static readonly definition = {"id":75,"name":"COMMAND_CLASS_TARIFF_TBL_MONITOR","status":"active","version":1,"commands":[{"id":5,"name":"TARIFF_TBL_COST_GET","status":"active","params":[{"type":"integer","name":"Rate Parameter Set ID","length":1},{"type":"integer","name":"Start Year","length":2},{"type":"integer","name":"Start Month","length":1},{"type":"integer","name":"Start Day","length":1},{"type":"integer","name":"Start Hour Local Time","length":1},{"type":"integer","name":"Start Minute Local Time","length":1},{"type":"integer","name":"Stop Year","length":2},{"type":"integer","name":"Stop Month","length":1},{"type":"integer","name":"Stop Day","length":1},{"type":"integer","name":"Stop Hour Local Time","length":1},{"type":"integer","name":"Stop Minute Local Time","length":1}]},{"id":6,"name":"TARIFF_TBL_COST_REPORT","status":"active","params":[{"type":"integer","name":"Rate Parameter Set ID","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Rate Type","mask":3,"shift":0},{"type":"int","name":"Reserved1","mask":252,"shift":2}]},{"type":"integer","name":"Start Year","length":2},{"type":"integer","name":"Start Month","length":1},{"type":"integer","name":"Start Day","length":1},{"type":"integer","name":"Start Hour Local Time","length":1},{"type":"integer","name":"Start Minute Local Time","length":1},{"type":"integer","name":"Stop Year","length":2},{"type":"integer","name":"Stop Month","length":1},{"type":"integer","name":"Stop Day","length":1},{"type":"integer","name":"Stop Hour Local Time","length":1},{"type":"integer","name":"Stop Minute Local Time","length":1},{"type":"integer","name":"Currency","length":3},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"int","name":"Reserved2","mask":31,"shift":0},{"type":"int","name":"Cost Precision","mask":224,"shift":5}]},{"type":"integer","name":"Cost Value","length":4}]},{"id":3,"name":"TARIFF_TBL_GET","status":"active","params":[{"type":"integer","name":"Rate Parameter Set ID","length":1}]},{"id":4,"name":"TARIFF_TBL_REPORT","status":"active","params":[{"type":"integer","name":"Rate Parameter Set ID","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Reserved","mask":31,"shift":0},{"type":"int","name":"Tariff Precision","mask":224,"shift":5}]},{"type":"integer","name":"Tariff Value","length":4}]},{"id":1,"name":"TARIFF_TBL_SUPPLIER_GET","status":"active","params":[]},{"id":2,"name":"TARIFF_TBL_SUPPLIER_REPORT","status":"active","params":[{"type":"integer","name":"Year","length":2},{"type":"integer","name":"Month","length":1},{"type":"integer","name":"Day","length":1},{"type":"integer","name":"Hour Local Time","length":1},{"type":"integer","name":"Minute Local Time","length":1},{"type":"integer","name":"Second Local Time","length":1},{"type":"integer","name":"Currency","length":3},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Standing Charge Period","mask":31,"shift":0},{"type":"int","name":"Standing Charge Precision","mask":224,"shift":5}]},{"type":"integer","name":"Standing Charge Value","length":4},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"int","name":"Number of Supplier Characters","mask":31,"shift":0},{"type":"int","name":"Reserved","mask":224,"shift":5}]},{"type":"blob","name":"Supplier Character","length":{"name":"Properties2","mask":31,"shift":0}}]}]};
}

export interface TariffTblCostGet {
	_commandClass: 0x4b; // (75)
	_command: 0x5; // (5)
	rateParameterSetID: number; // 1 byte unsigned integer
	startYear: number; // 2 byte unsigned integer
	startMonth: number; // 1 byte unsigned integer
	startDay: number; // 1 byte unsigned integer
	startHourLocalTime: number; // 1 byte unsigned integer
	startMinuteLocalTime: number; // 1 byte unsigned integer
	stopYear: number; // 2 byte unsigned integer
	stopMonth: number; // 1 byte unsigned integer
	stopDay: number; // 1 byte unsigned integer
	stopHourLocalTime: number; // 1 byte unsigned integer
	stopMinuteLocalTime: number; // 1 byte unsigned integer
}

export interface TariffTblCostReport {
	_commandClass: 0x4b; // (75)
	_command: 0x6; // (6)
	rateParameterSetID: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	startYear: number; // 2 byte unsigned integer
	startMonth: number; // 1 byte unsigned integer
	startDay: number; // 1 byte unsigned integer
	startHourLocalTime: number; // 1 byte unsigned integer
	startMinuteLocalTime: number; // 1 byte unsigned integer
	stopYear: number; // 2 byte unsigned integer
	stopMonth: number; // 1 byte unsigned integer
	stopDay: number; // 1 byte unsigned integer
	stopHourLocalTime: number; // 1 byte unsigned integer
	stopMinuteLocalTime: number; // 1 byte unsigned integer
	currency: number; // 3 byte unsigned integer
	// TODO param Properties2 type bitfield
	costValue: number; // 4 byte unsigned integer
}

export interface TariffTblGet {
	_commandClass: 0x4b; // (75)
	_command: 0x3; // (3)
	rateParameterSetID: number; // 1 byte unsigned integer
}

export interface TariffTblReport {
	_commandClass: 0x4b; // (75)
	_command: 0x4; // (4)
	rateParameterSetID: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	tariffValue: number; // 4 byte unsigned integer
}

export interface TariffTblSupplierGet {
	_commandClass: 0x4b; // (75)
	_command: 0x1; // (1)
}

export interface TariffTblSupplierReport {
	_commandClass: 0x4b; // (75)
	_command: 0x2; // (2)
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourLocalTime: number; // 1 byte unsigned integer
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
	currency: number; // 3 byte unsigned integer
	// TODO param Properties1 type bitfield
	standingChargeValue: number; // 4 byte unsigned integer
	// TODO param Properties2 type bitfield
	// TODO param Supplier Character type blob
}
