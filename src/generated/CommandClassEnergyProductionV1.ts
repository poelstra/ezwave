/* Auto-generated */

export class CommandClassEnergyProductionV1 {
	public static readonly commandClass = 0x90; // (144);
	public static readonly definition = {"id":144,"name":"COMMAND_CLASS_ENERGY_PRODUCTION","status":"active","version":1,"commands":[{"id":2,"name":"ENERGY_PRODUCTION_GET","status":"active","params":[{"type":"enum","name":"Parameter Number","length":1,"values":{"0":"Instant energy production","1":"Total energy production","2":"Energy production today","3":"Total production time"}}]},{"id":3,"name":"ENERGY_PRODUCTION_REPORT","status":"active","params":[{"type":"enum","name":"Parameter Number","length":1,"values":{"0":"Instant energy production","1":"Total energy production","2":"Energy production today","3":"Total production time"}},{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"int","name":"Size","mask":7,"shift":0},{"type":"int","name":"Scale","mask":24,"shift":3},{"type":"int","name":"Precision","mask":224,"shift":5}]},{"type":"blob","name":"Value","length":{"name":"Level","mask":7,"shift":0}}]}]};
}

export interface EnergyProductionGet {
	_commandClass: 0x90; // (144)
	_command: 0x2; // (2)
	parameterNumber: ParameterNumberEnum; // 1 byte enum value
}

export interface EnergyProductionReport {
	_commandClass: 0x90; // (144)
	_command: 0x3; // (3)
	parameterNumber: ParameterNumberEnum; // 1 byte enum value
	// TODO param Level type bitfield
	// TODO param Value type blob
}

export enum ParameterNumberEnum {
	InstantEnergyProduction = 0x0,
	TotalEnergyProduction = 0x1,
	EnergyProductionToday = 0x2,
	TotalProductionTime = 0x3,
}
