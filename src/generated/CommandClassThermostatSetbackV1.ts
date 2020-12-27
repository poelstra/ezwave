/* Auto-generated */

export class CommandClassThermostatSetbackV1 {
	public static readonly commandClass = 0x47; // (71);
	public static readonly definition = {"id":71,"name":"COMMAND_CLASS_THERMOSTAT_SETBACK","status":"active","version":1,"commands":[{"id":2,"name":"THERMOSTAT_SETBACK_GET","status":"active","params":[]},{"id":3,"name":"THERMOSTAT_SETBACK_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Setback Type","mask":3,"shift":0,"values":{"0":"No override","1":"Temporary override","2":"Permanent override","3":"Reserved"}},{"type":"integer","name":"Reserved","mask":252,"shift":2}]},{"type":"integer","name":"Setback State","length":1,"values":{"121":"Frost Protection","122":"Energy Saving Mode","123":"Reserved","124":"Reserved","125":"Reserved","126":"Reserved","127":"Unused State"}}]},{"id":1,"name":"THERMOSTAT_SETBACK_SET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Setback Type","mask":3,"shift":0,"values":{"0":"No override","1":"Temporary override","2":"Permanent override","3":"Reserved"}},{"type":"integer","name":"Reserved","mask":252,"shift":2}]},{"type":"integer","name":"Setback State","length":1,"values":{"121":"Frost Protection","122":"Energy Saving Mode","123":"Reserved","124":"Reserved","125":"Reserved","126":"Reserved","127":"Unused State"}}]}]};
}

export interface ThermostatSetbackGet {
	_commandClass: 0x47; // (71)
	_command: 0x2; // (2)
}

export interface ThermostatSetbackReport {
	_commandClass: 0x47; // (71)
	_command: 0x3; // (3)
	// TODO param Properties1 type bitfield
	setbackState: number; // 1 byte unsigned integer
}

export interface ThermostatSetbackSet {
	_commandClass: 0x47; // (71)
	_command: 0x1; // (1)
	// TODO param Properties1 type bitfield
	setbackState: number; // 1 byte unsigned integer
}
