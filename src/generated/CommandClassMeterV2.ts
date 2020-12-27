/* Auto-generated */

export class CommandClassMeterV2 {
	public static readonly commandClass = 0x32; // (50);
	public static readonly definition = {"id":50,"name":"COMMAND_CLASS_METER","status":"active","version":2,"commands":[{"id":1,"name":"METER_GET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Reserved","mask":7,"shift":0},{"type":"integer","name":"Scale","mask":24,"shift":3},{"type":"integer","name":"Reserved2","mask":224,"shift":5}]}]},{"id":2,"name":"METER_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Meter Type","mask":31,"shift":0},{"type":"integer","name":"Rate Type","mask":96,"shift":5},{"type":"bool","name":"Reserved","mask":128,"shift":7}]},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Size","mask":7,"shift":0},{"type":"integer","name":"Scale","mask":24,"shift":3},{"type":"integer","name":"Precision","mask":224,"shift":5}]},{"type":"blob","name":"Meter Value","length":{"name":"Properties2","mask":7,"shift":0}},{"type":"integer","name":"Delta Time","length":2},{"type":"blob","name":"Previous Meter Value","optional":{"name":"Delta Time","mask":255},"length":{"name":"Properties2","mask":7,"shift":0}}]},{"id":5,"name":"METER_RESET","status":"active","params":[]},{"id":3,"name":"METER_SUPPORTED_GET","status":"active","params":[]},{"id":4,"name":"METER_SUPPORTED_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Meter Type","mask":31,"shift":0},{"type":"integer","name":"Reserved1","mask":96,"shift":5},{"type":"bool","name":"Meter Reset","mask":128,"shift":7}]},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Scale Supported","mask":15,"shift":0},{"type":"integer","name":"Reserved2","mask":240,"shift":4}]}]}]};
}

export interface MeterGet {
	_commandClass: 0x32; // (50)
	_command: 0x1; // (1)
	// TODO param Properties1 type bitfield
}

export interface MeterReport {
	_commandClass: 0x32; // (50)
	_command: 0x2; // (2)
	// TODO param Properties1 type bitfield
	// TODO param Properties2 type bitfield
	// TODO param Meter Value type blob
	deltaTime: number; // 2 byte unsigned integer
	// TODO param Previous Meter Value type blob
}

export interface MeterReset {
	_commandClass: 0x32; // (50)
	_command: 0x5; // (5)
}

export interface MeterSupportedGet {
	_commandClass: 0x32; // (50)
	_command: 0x3; // (3)
}

export interface MeterSupportedReport {
	_commandClass: 0x32; // (50)
	_command: 0x4; // (4)
	// TODO param Properties1 type bitfield
	// TODO param Properties2 type bitfield
}
