/* Auto-generated */

export class CommandClassThermostatOperatingStateV1 {
	public static readonly commandClass = 0x42; // (66);
	public static readonly definition = {"id":66,"name":"COMMAND_CLASS_THERMOSTAT_OPERATING_STATE","status":"active","version":1,"commands":[{"id":2,"name":"THERMOSTAT_OPERATING_STATE_GET","status":"active","params":[]},{"id":3,"name":"THERMOSTAT_OPERATING_STATE_REPORT","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"enum","name":"Operating State","mask":15,"shift":0,"values":{"0":"Idle","1":"Heating","2":"Cooling","3":"Fan Only","4":"Pending Heat","5":"Pending Cool","6":"Vent/Economizer"}},{"type":"int","name":"Reserved","mask":240,"shift":4}]}]}]};
}

export interface ThermostatOperatingStateGet {
	_commandClass: 0x42; // (66)
	_command: 0x2; // (2)
}

export interface ThermostatOperatingStateReport {
	_commandClass: 0x42; // (66)
	_command: 0x3; // (3)
	// TODO param Level type bitfield
}
