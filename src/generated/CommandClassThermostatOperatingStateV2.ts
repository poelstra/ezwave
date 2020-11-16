/* Auto-generated */

export class CommandClassThermostatOperatingStateV2 {
	public static readonly commandClass = 0x42; // (66);
	public static readonly definition = {"id":66,"name":"COMMAND_CLASS_THERMOSTAT_OPERATING_STATE","status":"active","version":2,"commands":[{"id":2,"name":"THERMOSTAT_OPERATING_STATE_GET","status":"active","params":[]},{"id":3,"name":"THERMOSTAT_OPERATING_STATE_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Operating State","mask":15,"shift":0,"values":{"0":"Idle","1":"Heating","2":"Cooling","3":"Fan Only","4":"Pending Heat","5":"Pending Cool","6":"Vent/Economizer","7":"Aux Heating","8":"2nd Stage Heating","9":"2nd Stage Cooling","10":"2nd Stage Aux Heat","11":"3rd Stage Aux Heat"}},{"type":"int","name":"Reserved","mask":240,"shift":4}]}]},{"id":1,"name":"THERMOSTAT_OPERATING_STATE_LOGGING_SUPPORTED_GET","status":"active","params":[]},{"id":4,"name":"THERMOSTAT_OPERATING_LOGGING_SUPPORTED_REPORT","status":"active","params":[{"type":"integer","name":"Bit Mask","length":0}]},{"id":5,"name":"THERMOSTAT_OPERATING_STATE_LOGGING_GET","status":"active","params":[{"type":"integer","name":"Bit Mask","length":0}]},{"id":6,"name":"THERMOSTAT_OPERATING_STATE_LOGGING_REPORT","status":"active","params":[{"type":"integer","name":"Reports to Follow","length":1},{"type":"group","name":"vg1","length":{"name":"Reports to Follow","mask":255,"shift":0},"params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Operating State Log Type","mask":15,"shift":0},{"type":"int","name":"Reserved","mask":240,"shift":4}]},{"type":"integer","name":"Usage Today (Hours)","length":1},{"type":"integer","name":"Usage Today (Minutes)","length":1},{"type":"integer","name":"Usage Yesterday (Hours)","length":1},{"type":"integer","name":"Usage Yesterday (Minutes)","length":1}]}]}]};
}

export interface ThermostatOperatingStateGet {
	_commandClass: 0x42; // (66)
	_command: 0x2; // (2)
}

export interface ThermostatOperatingStateReport {
	_commandClass: 0x42; // (66)
	_command: 0x3; // (3)
	// TODO param Properties1 type bitfield
}

export interface ThermostatOperatingStateLoggingSupportedGet {
	_commandClass: 0x42; // (66)
	_command: 0x1; // (1)
}

export interface ThermostatOperatingLoggingSupportedReport {
	_commandClass: 0x42; // (66)
	_command: 0x4; // (4)
	bitMask: number; // 0 byte unsigned integer
}

export interface ThermostatOperatingStateLoggingGet {
	_commandClass: 0x42; // (66)
	_command: 0x5; // (5)
	bitMask: number; // 0 byte unsigned integer
}

export interface ThermostatOperatingStateLoggingReport {
	_commandClass: 0x42; // (66)
	_command: 0x6; // (6)
	reportsToFollow: number; // 1 byte unsigned integer
	// TODO param vg1 type group
}
