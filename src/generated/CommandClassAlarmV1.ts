/* Auto-generated */

// deprecated
export class CommandClassAlarmV1 {
	public static readonly commandClass = 0x71; // (113);
	public static readonly definition = {"id":113,"name":"COMMAND_CLASS_ALARM","status":"deprecated","version":1,"commands":[{"id":4,"name":"ALARM_GET","status":"active","params":[{"type":"integer","name":"Alarm Type","length":1}]},{"id":5,"name":"ALARM_REPORT","status":"active","params":[{"type":"integer","name":"Alarm Type","length":1},{"type":"integer","name":"Alarm Level","length":1}]}]};
}

export interface AlarmGet {
	_commandClass: 0x71; // (113)
	_command: 0x4; // (4)
	alarmType: number; // 1 byte unsigned integer
}

export interface AlarmReport {
	_commandClass: 0x71; // (113)
	_command: 0x5; // (5)
	alarmType: number; // 1 byte unsigned integer
	alarmLevel: number; // 1 byte unsigned integer
}
