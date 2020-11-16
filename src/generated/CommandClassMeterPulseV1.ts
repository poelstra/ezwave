/* Auto-generated */

// deprecated
export class CommandClassMeterPulseV1 {
	public static readonly commandClass = 0x35; // (53);
	public static readonly definition = {"id":53,"name":"COMMAND_CLASS_METER_PULSE","status":"deprecated","version":1,"commands":[{"id":4,"name":"METER_PULSE_GET","status":"active","params":[]},{"id":5,"name":"METER_PULSE_REPORT","status":"active","params":[{"type":"integer","name":"Pulse Count","length":4}]}]};
}

export interface MeterPulseGet {
	_commandClass: 0x35; // (53)
	_command: 0x4; // (4)
}

export interface MeterPulseReport {
	_commandClass: 0x35; // (53)
	_command: 0x5; // (5)
	pulseCount: number; // 4 byte unsigned integer
}
