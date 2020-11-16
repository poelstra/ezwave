/* Auto-generated */

export class CommandClassIndicatorV1 {
	public static readonly commandClass = 0x87; // (135);
	public static readonly definition = {"id":135,"name":"COMMAND_CLASS_INDICATOR","status":"active","version":1,"commands":[{"id":2,"name":"INDICATOR_GET","status":"active","params":[]},{"id":3,"name":"INDICATOR_REPORT","status":"active","params":[{"type":"integer","name":"Value","length":1,"values":{"0":"off/disable","255":"on/enable"}}]},{"id":1,"name":"INDICATOR_SET","status":"active","params":[{"type":"integer","name":"Value","length":1,"values":{"0":"off/disable","255":"on/enable"}}]}]};
}

export interface IndicatorGet {
	_commandClass: 0x87; // (135)
	_command: 0x2; // (2)
}

export interface IndicatorReport {
	_commandClass: 0x87; // (135)
	_command: 0x3; // (3)
	value: number; // 1 byte unsigned integer
}

export interface IndicatorSet {
	_commandClass: 0x87; // (135)
	_command: 0x1; // (1)
	value: number; // 1 byte unsigned integer
}
