/* Auto-generated */

export class CommandClassHrvStatusV1 {
	public static readonly commandClass = 0x37; // (55);
	public static readonly definition = {"id":55,"name":"COMMAND_CLASS_HRV_STATUS","status":"active","version":1,"commands":[{"id":1,"name":"HRV_STATUS_GET","status":"active","params":[{"type":"enum","name":"Status Parameter","length":1,"values":{"0":"Outdoor Air temperature","1":"Supply Air temperature","2":"Exhaust Air temperature","3":"Discharge Air temperature","4":"Room temperature","5":"Relative Humidity in room","6":"Remaining filter life"}}]},{"id":2,"name":"HRV_STATUS_REPORT","status":"active","params":[{"type":"enum","name":"Status Parameter","length":1,"values":{"0":"Outdoor Air temperature","1":"Supply Air temperature","2":"Exhaust Air temperature","3":"Discharge Air temperature","4":"Room temperature","5":"Relative Humidity in room","6":"Remaining filter life"}},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Size","mask":7,"shift":0},{"type":"integer","name":"Scale","mask":24,"shift":3},{"type":"integer","name":"Precision","mask":224,"shift":5}]},{"type":"blob","name":"Value","length":"auto"}]},{"id":3,"name":"HRV_STATUS_SUPPORTED_GET","status":"active","params":[]},{"id":4,"name":"HRV_STATUS_SUPPORTED_REPORT","status":"active","params":[{"type":"integer","name":"Bit Mask","length":0}]}]};
}

export interface HrvStatusGet {
	_commandClass: 0x37; // (55)
	_command: 0x1; // (1)
	statusParameter: StatusParameterEnum; // 1 byte enum value
}

export interface HrvStatusReport {
	_commandClass: 0x37; // (55)
	_command: 0x2; // (2)
	statusParameter: StatusParameterEnum; // 1 byte enum value
	// TODO param Properties1 type bitfield
	// TODO param Value type blob
}

export interface HrvStatusSupportedGet {
	_commandClass: 0x37; // (55)
	_command: 0x3; // (3)
}

export interface HrvStatusSupportedReport {
	_commandClass: 0x37; // (55)
	_command: 0x4; // (4)
	bitMask: number; // 0 byte unsigned integer
}

export enum StatusParameterEnum {
	OutdoorAirTemperature = 0x0,
	SupplyAirTemperature = 0x1,
	ExhaustAirTemperature = 0x2,
	DischargeAirTemperature = 0x3,
	RoomTemperature = 0x4,
	RelativeHumidityInRoom = 0x5,
	RemainingFilterLife = 0x6,
}
