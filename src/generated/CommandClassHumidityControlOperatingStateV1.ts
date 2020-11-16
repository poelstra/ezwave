/* Auto-generated */

export class CommandClassHumidityControlOperatingStateV1 {
	public static readonly commandClass = 0x6e; // (110);
	public static readonly definition = {"id":110,"name":"COMMAND_CLASS_HUMIDITY_CONTROL_OPERATING_STATE","status":"active","version":1,"commands":[{"id":1,"name":"HUMIDITY_CONTROL_OPERATING_STATE_GET","status":"active","params":[]},{"id":2,"name":"HUMIDITY_CONTROL_OPERATING_STATE_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Operating State","mask":15,"shift":0,"values":{"0":"Idle","1":"Humidifying","2":"Dehumidifying"}},{"type":"int","name":"Reserved","mask":240,"shift":4}]}]}]};
}

export interface HumidityControlOperatingStateGet {
	_commandClass: 0x6e; // (110)
	_command: 0x1; // (1)
}

export interface HumidityControlOperatingStateReport {
	_commandClass: 0x6e; // (110)
	_command: 0x2; // (2)
	// TODO param Properties1 type bitfield
}
