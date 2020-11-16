/* Auto-generated */

export class CommandClassWakeUpV1 {
	public static readonly commandClass = 0x84; // (132);
	public static readonly definition = {"id":132,"name":"COMMAND_CLASS_WAKE_UP","status":"active","version":1,"commands":[{"id":5,"name":"WAKE_UP_INTERVAL_GET","status":"active","params":[]},{"id":6,"name":"WAKE_UP_INTERVAL_REPORT","status":"active","params":[{"type":"integer","name":"Seconds","length":3},{"type":"integer","name":"NodeID","length":1,"valueType":"NODE_NUMBER"}]},{"id":4,"name":"WAKE_UP_INTERVAL_SET","status":"active","params":[{"type":"integer","name":"Seconds","length":3},{"type":"integer","name":"NodeID","length":1,"valueType":"NODE_NUMBER"}]},{"id":8,"name":"WAKE_UP_NO_MORE_INFORMATION","status":"active","params":[]},{"id":7,"name":"WAKE_UP_NOTIFICATION","status":"active","params":[]}]};
}

export interface WakeUpIntervalGet {
	_commandClass: 0x84; // (132)
	_command: 0x5; // (5)
}

export interface WakeUpIntervalReport {
	_commandClass: 0x84; // (132)
	_command: 0x6; // (6)
	seconds: number; // 3 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export interface WakeUpIntervalSet {
	_commandClass: 0x84; // (132)
	_command: 0x4; // (4)
	seconds: number; // 3 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export interface WakeUpNoMoreInformation {
	_commandClass: 0x84; // (132)
	_command: 0x8; // (8)
}

export interface WakeUpNotification {
	_commandClass: 0x84; // (132)
	_command: 0x7; // (7)
}
