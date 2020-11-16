/* Auto-generated */

export class CommandClassBatteryV1 {
	public static readonly commandClass = 0x80; // (128);
	public static readonly definition = {"id":128,"name":"COMMAND_CLASS_BATTERY","status":"active","version":1,"commands":[{"id":2,"name":"BATTERY_GET","status":"active","params":[]},{"id":3,"name":"BATTERY_REPORT","status":"active","params":[{"type":"integer","name":"Battery Level","length":1,"values":{"255":"battery low warning"}}]}]};
}

export interface BatteryGet {
	_commandClass: 0x80; // (128)
	_command: 0x2; // (2)
}

export interface BatteryReport {
	_commandClass: 0x80; // (128)
	_command: 0x3; // (3)
	batteryLevel: number; // 1 byte unsigned integer
}
