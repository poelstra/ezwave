/* Auto-generated */

export class CommandClassThermostatFanStateV2 {
	public static readonly commandClass = 0x45; // (69);
	public static readonly definition = {"id":69,"name":"COMMAND_CLASS_THERMOSTAT_FAN_STATE","status":"active","version":2,"commands":[{"id":2,"name":"THERMOSTAT_FAN_STATE_GET","status":"active","params":[]},{"id":3,"name":"THERMOSTAT_FAN_STATE_REPORT","status":"active","params":[{"type":"bitfield","name":"Level","length":1,"fields":[{"type":"enum","name":"Fan Operating State","mask":15,"shift":0,"values":{"0":"Idle","1":"Running","2":"Running High","3":"Running Medium","4":"Circulation","5":"Humidity Circulation","6":"Right-Left Circulation","7":"Up-Down Circulation","8":"Quiet Circulation"}},{"type":"integer","name":"Reserved","mask":240,"shift":4}]}]}]};
}

export interface ThermostatFanStateGet {
	_commandClass: 0x45; // (69)
	_command: 0x2; // (2)
}

export interface ThermostatFanStateReport {
	_commandClass: 0x45; // (69)
	_command: 0x3; // (3)
	// TODO param Level type bitfield
}
