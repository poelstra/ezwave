/* Auto-generated */

// deprecated
export class CommandClassLockV1 {
	public static readonly commandClass = 0x76; // (118);
	public static readonly definition = {"id":118,"name":"COMMAND_CLASS_LOCK","status":"deprecated","version":1,"commands":[{"id":2,"name":"LOCK_GET","status":"active","params":[]},{"id":3,"name":"LOCK_REPORT","status":"active","params":[{"type":"integer","name":"Lock State","length":1,"values":{"0":"unlocked","1":"locked"}}]},{"id":1,"name":"LOCK_SET","status":"active","params":[{"type":"integer","name":"Lock State","length":1,"values":{"0":"unlocked","1":"locked"}}]}]};
}

export interface LockGet {
	_commandClass: 0x76; // (118)
	_command: 0x2; // (2)
}

export interface LockReport {
	_commandClass: 0x76; // (118)
	_command: 0x3; // (3)
	lockState: number; // 1 byte unsigned integer
}

export interface LockSet {
	_commandClass: 0x76; // (118)
	_command: 0x1; // (1)
	lockState: number; // 1 byte unsigned integer
}
