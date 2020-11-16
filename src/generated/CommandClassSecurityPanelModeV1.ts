/* Auto-generated */

export class CommandClassSecurityPanelModeV1 {
	public static readonly commandClass = 0x24; // (36);
	public static readonly definition = {"id":36,"name":"COMMAND_CLASS_SECURITY_PANEL_MODE","status":"active","version":1,"commands":[{"id":3,"name":"SECURITY_PANEL_MODE_GET","status":"active","params":[]},{"id":4,"name":"SECURITY_PANEL_MODE_REPORT","status":"active","params":[{"type":"integer","name":"MODE","length":1,"values":{"1":"Arm Home","2":"Arm Away, No Delay","3":"Arm Away, Delayed","4":"Disarm","5":"Alarm Trigger"}}]},{"id":5,"name":"SECURITY_PANEL_MODE_SET","status":"active","params":[{"type":"integer","name":"MODE","length":1,"values":{"1":"Arm Home","2":"Arm Away, No Delay","3":"Arm Away, Delayed","4":"Disarm","5":"Alarm Trigger"}}]},{"id":1,"name":"SECURITY_PANEL_MODE_SUPPORTED_GET","status":"active","params":[]},{"id":2,"name":"SECURITY_PANEL_MODE_SUPPORTED_REPORT","status":"active","params":[{"type":"integer","name":"Supported Mode Bit Mask","length":2}]}]};
}

export interface SecurityPanelModeGet {
	_commandClass: 0x24; // (36)
	_command: 0x3; // (3)
}

export interface SecurityPanelModeReport {
	_commandClass: 0x24; // (36)
	_command: 0x4; // (4)
	mode: number; // 1 byte unsigned integer
}

export interface SecurityPanelModeSet {
	_commandClass: 0x24; // (36)
	_command: 0x5; // (5)
	mode: number; // 1 byte unsigned integer
}

export interface SecurityPanelModeSupportedGet {
	_commandClass: 0x24; // (36)
	_command: 0x1; // (1)
}

export interface SecurityPanelModeSupportedReport {
	_commandClass: 0x24; // (36)
	_command: 0x2; // (2)
	supportedModeBitMask: number; // 2 byte unsigned integer
}
