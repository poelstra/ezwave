/* Auto-generated */

export class CommandClassPowerlevelV1 {
	public static readonly commandClass = 0x73; // (115);
	public static readonly definition = {"id":115,"name":"COMMAND_CLASS_POWERLEVEL","status":"active","version":1,"commands":[{"id":2,"name":"POWERLEVEL_GET","status":"active","params":[]},{"id":3,"name":"POWERLEVEL_REPORT","status":"active","params":[{"type":"enum","name":"Power level","length":1,"values":{"0":"NormalPower","1":"minus1dBm","2":"minus2dBm","3":"minus3dBm","4":"minus4dBm","5":"minus5dBm","6":"minus6dBm","7":"minus7dBm","8":"minus8dBm","9":"minus9dBm"}},{"type":"integer","name":"Timeout","length":1}]},{"id":1,"name":"POWERLEVEL_SET","status":"active","params":[{"type":"enum","name":"Power level","length":1,"values":{"0":"NormalPower","1":"minus1dBm","2":"minus2dBm","3":"minus3dBm","4":"minus4dBm","5":"minus5dBm","6":"minus6dBm","7":"minus7dBm","8":"minus8dBm","9":"minus9dBm"}},{"type":"integer","name":"Timeout","length":1}]},{"id":5,"name":"POWERLEVEL_TEST_NODE_GET","status":"active","params":[]},{"id":6,"name":"POWERLEVEL_TEST_NODE_REPORT","status":"active","params":[{"type":"enum","name":"Test NodeID","length":1,"valueType":"NODE_NUMBER","values":{"0":"ZW_TEST_NOT_A_NODEID"}},{"type":"enum","name":"Status of operation","length":1,"values":{"0":"ZW_TEST_FAILED","1":"ZW_TEST_SUCCES","2":"ZW_TEST_INPROGRESS"}},{"type":"integer","name":"Test Frame Count","length":2}]},{"id":4,"name":"POWERLEVEL_TEST_NODE_SET","status":"active","params":[{"type":"integer","name":"Test NodeID","length":1,"valueType":"NODE_NUMBER"},{"type":"enum","name":"Power level","length":1,"values":{"0":"NormalPower","1":"minus1dBm","2":"minus2dBm","3":"minus3dBm","4":"minus4dBm","5":"minus5dBm","6":"minus6dBm","7":"minus7dBm","8":"minus8dBm","9":"minus9dBm"}},{"type":"integer","name":"Test frame count","length":2}]}]};
}

export interface PowerlevelGet {
	_commandClass: 0x73; // (115)
	_command: 0x2; // (2)
}

export interface PowerlevelReport {
	_commandClass: 0x73; // (115)
	_command: 0x3; // (3)
	powerLevel: PowerLevelEnum; // 1 byte enum value
	timeout: number; // 1 byte unsigned integer
}

export interface PowerlevelSet {
	_commandClass: 0x73; // (115)
	_command: 0x1; // (1)
	powerLevel: PowerLevelEnum; // 1 byte enum value
	timeout: number; // 1 byte unsigned integer
}

export interface PowerlevelTestNodeGet {
	_commandClass: 0x73; // (115)
	_command: 0x5; // (5)
}

export interface PowerlevelTestNodeReport {
	_commandClass: 0x73; // (115)
	_command: 0x6; // (6)
	testNodeID: TestNodeIDEnum; // 1 byte enum value
	statusOfOperation: StatusOfOperationEnum; // 1 byte enum value
	testFrameCount: number; // 2 byte unsigned integer
}

export interface PowerlevelTestNodeSet {
	_commandClass: 0x73; // (115)
	_command: 0x4; // (4)
	testNodeID: number; // 1 byte unsigned integer
	powerLevel: PowerLevelEnum; // 1 byte enum value
	testFrameCount: number; // 2 byte unsigned integer
}

export enum PowerLevelEnum {
	NormalPower = 0x0,
	Minus1dBm = 0x1,
	Minus2dBm = 0x2,
	Minus3dBm = 0x3,
	Minus4dBm = 0x4,
	Minus5dBm = 0x5,
	Minus6dBm = 0x6,
	Minus7dBm = 0x7,
	Minus8dBm = 0x8,
	Minus9dBm = 0x9,
}

export enum TestNodeIDEnum {
	ZwTestNotANodeid = 0x0,
}

export enum StatusOfOperationEnum {
	ZwTestFailed = 0x0,
	ZwTestSucces = 0x1,
	ZwTestInprogress = 0x2,
}
