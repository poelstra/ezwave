/* Auto-generated */

export class CommandClassWakeUpV2 {
	public static readonly commandClass = 0x84; // (132);
	public static readonly definition = {"id":132,"name":"COMMAND_CLASS_WAKE_UP","status":"active","version":2,"commands":[{"id":9,"name":"WAKE_UP_INTERVAL_CAPABILITIES_GET","status":"active","params":[]},{"id":10,"name":"WAKE_UP_INTERVAL_CAPABILITIES_REPORT","status":"active","params":[{"type":"integer","name":"Minimum Wake Up Interval Seconds","length":3},{"type":"integer","name":"Maximum Wake Up Interval Seconds","length":3},{"type":"integer","name":"Default Wake Up Interval Seconds","length":3},{"type":"integer","name":"Wake Up Interval Step Seconds","length":3}]},{"id":5,"name":"WAKE_UP_INTERVAL_GET","status":"active","params":[]},{"id":6,"name":"WAKE_UP_INTERVAL_REPORT","status":"active","params":[{"type":"integer","name":"Seconds","length":3},{"type":"integer","name":"NodeID","length":1,"valueType":"NODE_NUMBER"}]},{"id":4,"name":"WAKE_UP_INTERVAL_SET","status":"active","params":[{"type":"integer","name":"Seconds","length":3},{"type":"integer","name":"NodeID","length":1,"valueType":"NODE_NUMBER"}]},{"id":8,"name":"WAKE_UP_NO_MORE_INFORMATION","status":"active","params":[]},{"id":7,"name":"WAKE_UP_NOTIFICATION","status":"active","params":[]}]};
}

export interface WakeUpIntervalCapabilitiesGet {
	_commandClass: 0x84; // (132)
	_command: 0x9; // (9)
}

export interface WakeUpIntervalCapabilitiesReport {
	_commandClass: 0x84; // (132)
	_command: 0xa; // (10)
	minimumWakeUpIntervalSeconds: number; // 3 byte unsigned integer
	maximumWakeUpIntervalSeconds: number; // 3 byte unsigned integer
	defaultWakeUpIntervalSeconds: number; // 3 byte unsigned integer
	wakeUpIntervalStepSeconds: number; // 3 byte unsigned integer
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
