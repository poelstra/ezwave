/* Auto-generated */

export class CommandClassMeterTblPushV1 {
	public static readonly commandClass = 0x3e; // (62);
	public static readonly definition = {"id":62,"name":"COMMAND_CLASS_METER_TBL_PUSH","status":"active","version":1,"commands":[{"id":2,"name":"METER_TBL_PUSH_CONFIGURATION_GET","status":"active","params":[]},{"id":3,"name":"METER_TBL_PUSH_CONFIGURATION_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Operating Status Push Mode","mask":15,"shift":0},{"type":"bool","name":"PS","mask":16,"shift":4},{"type":"integer","name":"Reserved","mask":224,"shift":5}]},{"type":"integer","name":"Push Dataset","length":3},{"type":"integer","name":"Interval Months","length":1},{"type":"integer","name":"Interval Days","length":1},{"type":"integer","name":"Interval Hours","length":1},{"type":"integer","name":"Interval Minutes","length":1},{"type":"integer","name":"Push Node ID","length":1,"valueType":"NODE_NUMBER"}]},{"id":1,"name":"METER_TBL_PUSH_CONFIGURATION_SET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Operating Status Push Mode","mask":15,"shift":0},{"type":"bool","name":"PS","mask":16,"shift":4},{"type":"integer","name":"Reserved","mask":224,"shift":5}]},{"type":"integer","name":"Push Dataset","length":3},{"type":"integer","name":"Interval Months","length":1},{"type":"integer","name":"Interval Days","length":1},{"type":"integer","name":"Interval Hours","length":1},{"type":"integer","name":"Interval Minutes","length":1},{"type":"integer","name":"Push Node ID","length":1,"valueType":"NODE_NUMBER"}]}]};
}

export interface MeterTblPushConfigurationGet {
	_commandClass: 0x3e; // (62)
	_command: 0x2; // (2)
}

export interface MeterTblPushConfigurationReport {
	_commandClass: 0x3e; // (62)
	_command: 0x3; // (3)
	// TODO param Properties1 type bitfield
	pushDataset: number; // 3 byte unsigned integer
	intervalMonths: number; // 1 byte unsigned integer
	intervalDays: number; // 1 byte unsigned integer
	intervalHours: number; // 1 byte unsigned integer
	intervalMinutes: number; // 1 byte unsigned integer
	pushNodeID: number; // 1 byte unsigned integer
}

export interface MeterTblPushConfigurationSet {
	_commandClass: 0x3e; // (62)
	_command: 0x1; // (1)
	// TODO param Properties1 type bitfield
	pushDataset: number; // 3 byte unsigned integer
	intervalMonths: number; // 1 byte unsigned integer
	intervalDays: number; // 1 byte unsigned integer
	intervalHours: number; // 1 byte unsigned integer
	intervalMinutes: number; // 1 byte unsigned integer
	pushNodeID: number; // 1 byte unsigned integer
}
