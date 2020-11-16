/* Auto-generated */

export class CommandClassProtectionV1 {
	public static readonly commandClass = 0x75; // (117);
	public static readonly definition = {"id":117,"name":"COMMAND_CLASS_PROTECTION","status":"active","version":1,"commands":[{"id":2,"name":"PROTECTION_GET","status":"active","params":[]},{"id":3,"name":"PROTECTION_REPORT","status":"active","params":[{"type":"enum","name":"Protection State","length":1,"values":{"0":"Unprotected","1":"Protection by sequence","2":"No operation possible"}}]},{"id":1,"name":"PROTECTION_SET","status":"active","params":[{"type":"enum","name":"Protection State","length":1,"values":{"0":"Unprotected","1":"Protection by sequence","2":"No operation possible"}}]}]};
}

export interface ProtectionGet {
	_commandClass: 0x75; // (117)
	_command: 0x2; // (2)
}

export interface ProtectionReport {
	_commandClass: 0x75; // (117)
	_command: 0x3; // (3)
	protectionState: ProtectionStateEnum; // 1 byte enum value
}

export interface ProtectionSet {
	_commandClass: 0x75; // (117)
	_command: 0x1; // (1)
	protectionState: ProtectionStateEnum; // 1 byte enum value
}

export enum ProtectionStateEnum {
	Unprotected = 0x0,
	ProtectionBySequence = 0x1,
	NoOperationPossible = 0x2,
}
