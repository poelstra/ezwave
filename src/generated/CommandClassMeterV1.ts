/* Auto-generated */

export class CommandClassMeterV1 {
	public static readonly commandClass = 0x32; // (50);
	public static readonly definition = {"id":50,"name":"COMMAND_CLASS_METER","status":"active","version":1,"commands":[{"id":1,"name":"METER_GET","status":"active","params":[]},{"id":2,"name":"METER_REPORT","status":"active","params":[{"type":"enum","name":"Meter Type","length":1,"values":{"1":"Electric meter","2":"Gas meter","3":"Water meter"}},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Size","mask":7,"shift":0},{"type":"integer","name":"Scale","mask":24,"shift":3},{"type":"integer","name":"Precision","mask":224,"shift":5}]},{"type":"blob","name":"Meter Value","length":{"name":"Properties1","mask":7,"shift":0}}]}]};
}

export interface MeterGet {
	_commandClass: 0x32; // (50)
	_command: 0x1; // (1)
}

export interface MeterReport {
	_commandClass: 0x32; // (50)
	_command: 0x2; // (2)
	meterType: MeterTypeEnum; // 1 byte enum value
	// TODO param Properties1 type bitfield
	// TODO param Meter Value type blob
}

export enum MeterTypeEnum {
	ElectricMeter = 0x1,
	GasMeter = 0x2,
	WaterMeter = 0x3,
}
