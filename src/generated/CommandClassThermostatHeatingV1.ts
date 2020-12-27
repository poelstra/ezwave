/* Auto-generated */

export class CommandClassThermostatHeatingV1 {
	public static readonly commandClass = 0x38; // (56);
	public static readonly definition = {"id":56,"name":"COMMAND_CLASS_THERMOSTAT_HEATING","status":"active","version":1,"commands":[{"id":13,"name":"THERMOSTAT_HEATING_STATUS_REPORT","status":"active","params":[{"type":"enum","name":"Status","length":1,"values":{"0":"Heating","1":"Cooling"}}]},{"id":2,"name":"THERMOSTAT_HEATING_MODE_GET","status":"active","params":[]},{"id":3,"name":"THERMOSTAT_HEATING_MODE_REPORT","status":"active","params":[{"type":"enum","name":"Mode","length":1,"values":{"0":"Off","1":"Off timed","2":"Off 3 hours","3":"Anti freeze","4":"Manual","5":"Temporary Manual","6":"Automatic","7":"Manual timed"}}]},{"id":1,"name":"THERMOSTAT_HEATING_MODE_SET","status":"active","params":[{"type":"enum","name":"Mode","length":1,"values":{"0":"Off","1":"Off timed","2":"Off 3 hours","3":"Anti freeze","4":"Manual","5":"Temporary Manual","6":"Automatic","7":"Manual timed"}}]},{"id":9,"name":"THERMOSTAT_HEATING_RELAY_STATUS_GET","status":"active","params":[]},{"id":10,"name":"THERMOSTAT_HEATING_RELAY_STATUS_REPORT","status":"active","params":[{"type":"enum","name":"Relay Status","length":1,"values":{"0":"off","1":"on"}}]},{"id":5,"name":"THERMOSTAT_HEATING_SETPOINT_GET","status":"active","params":[{"type":"integer","name":"Setpoint Nr","length":1}]},{"id":6,"name":"THERMOSTAT_HEATING_SETPOINT_REPORT","status":"active","params":[{"type":"integer","name":"Setpoint Nr","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Size","mask":7,"shift":0},{"type":"integer","name":"Scale","mask":24,"shift":3},{"type":"integer","name":"Precision","mask":224,"shift":5}]},{"type":"blob","name":"Value","length":{"name":"Properties1","mask":7,"shift":0}}]},{"id":4,"name":"THERMOSTAT_HEATING_SETPOINT_SET","status":"active","params":[{"type":"integer","name":"Setpoint Nr","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Size","mask":7,"shift":0},{"type":"integer","name":"Scale","mask":24,"shift":3},{"type":"integer","name":"Precision","mask":224,"shift":5}]},{"type":"blob","name":"Value","length":{"name":"Properties1","mask":7,"shift":0}}]},{"id":12,"name":"THERMOSTAT_HEATING_STATUS_GET","status":"active","params":[]},{"id":11,"name":"THERMOSTAT_HEATING_STATUS_SET","status":"active","params":[{"type":"enum","name":"Status","length":1,"values":{"0":"Heating","1":"Cooling"}}]},{"id":17,"name":"THERMOSTAT_HEATING_TIMED_OFF_SET","status":"active","params":[{"type":"integer","name":"Minutes","length":1},{"type":"integer","name":"Hours","length":1}]}]};
}

export interface ThermostatHeatingStatusReport {
	_commandClass: 0x38; // (56)
	_command: 0xd; // (13)
	status: StatusEnum; // 1 byte enum value
}

export interface ThermostatHeatingModeGet {
	_commandClass: 0x38; // (56)
	_command: 0x2; // (2)
}

export interface ThermostatHeatingModeReport {
	_commandClass: 0x38; // (56)
	_command: 0x3; // (3)
	mode: ModeEnum; // 1 byte enum value
}

export interface ThermostatHeatingModeSet {
	_commandClass: 0x38; // (56)
	_command: 0x1; // (1)
	mode: ModeEnum; // 1 byte enum value
}

export interface ThermostatHeatingRelayStatusGet {
	_commandClass: 0x38; // (56)
	_command: 0x9; // (9)
}

export interface ThermostatHeatingRelayStatusReport {
	_commandClass: 0x38; // (56)
	_command: 0xa; // (10)
	relayStatus: RelayStatusEnum; // 1 byte enum value
}

export interface ThermostatHeatingSetpointGet {
	_commandClass: 0x38; // (56)
	_command: 0x5; // (5)
	setpointNr: number; // 1 byte unsigned integer
}

export interface ThermostatHeatingSetpointReport {
	_commandClass: 0x38; // (56)
	_command: 0x6; // (6)
	setpointNr: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param Value type blob
}

export interface ThermostatHeatingSetpointSet {
	_commandClass: 0x38; // (56)
	_command: 0x4; // (4)
	setpointNr: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param Value type blob
}

export interface ThermostatHeatingStatusGet {
	_commandClass: 0x38; // (56)
	_command: 0xc; // (12)
}

export interface ThermostatHeatingStatusSet {
	_commandClass: 0x38; // (56)
	_command: 0xb; // (11)
	status: StatusEnum; // 1 byte enum value
}

export interface ThermostatHeatingTimedOffSet {
	_commandClass: 0x38; // (56)
	_command: 0x11; // (17)
	minutes: number; // 1 byte unsigned integer
	hours: number; // 1 byte unsigned integer
}

export enum StatusEnum {
	Heating = 0x0,
	Cooling = 0x1,
}

export enum ModeEnum {
	Off = 0x0,
	OffTimed = 0x1,
	Off3Hours = 0x2,
	AntiFreeze = 0x3,
	Manual = 0x4,
	TemporaryManual = 0x5,
	Automatic = 0x6,
	ManualTimed = 0x7,
}

export enum RelayStatusEnum {
	Off = 0x0,
	On = 0x1,
}
