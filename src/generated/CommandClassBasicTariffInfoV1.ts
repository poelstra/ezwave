/* Auto-generated */

export class CommandClassBasicTariffInfoV1 {
	public static readonly commandClass = 0x36; // (54);
	public static readonly definition = {"id":54,"name":"COMMAND_CLASS_BASIC_TARIFF_INFO","status":"active","version":1,"commands":[{"id":1,"name":"BASIC_TARIFF_INFO_GET","status":"active","params":[]},{"id":2,"name":"BASIC_TARIFF_INFO_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Total No. Import Rates","mask":15,"shift":0},{"type":"int","name":"Reserved1","mask":112,"shift":4},{"type":"bool","name":"Dual","mask":128,"shift":7}]},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"int","name":"E1 Current Rate in Use","mask":15,"shift":0},{"type":"int","name":"Reserved2","mask":240,"shift":4}]},{"type":"integer","name":"E1 Rate Consumption Register","length":4},{"type":"integer","name":"E1 Time for Next Rate Hours","length":1},{"type":"integer","name":"E1 Time for Next Rate Minutes","length":1},{"type":"integer","name":"E1 Time for Next Rate Seconds","length":1},{"type":"bitfield","name":"Properties3","length":1,"fields":[{"type":"int","name":"E2 Current Rate in Use","mask":15,"shift":0},{"type":"int","name":"Reserved3","mask":240,"shift":4}]},{"type":"integer","name":"E2 Rate Consumption Register","length":4}]}]};
}

export interface BasicTariffInfoGet {
	_commandClass: 0x36; // (54)
	_command: 0x1; // (1)
}

export interface BasicTariffInfoReport {
	_commandClass: 0x36; // (54)
	_command: 0x2; // (2)
	// TODO param Properties1 type bitfield
	// TODO param Properties2 type bitfield
	e1RateConsumptionRegister: number; // 4 byte unsigned integer
	e1TimeForNextRateHours: number; // 1 byte unsigned integer
	e1TimeForNextRateMinutes: number; // 1 byte unsigned integer
	e1TimeForNextRateSeconds: number; // 1 byte unsigned integer
	// TODO param Properties3 type bitfield
	e2RateConsumptionRegister: number; // 4 byte unsigned integer
}
