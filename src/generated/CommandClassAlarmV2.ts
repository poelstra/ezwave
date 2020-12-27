/* Auto-generated */

// deprecated
export class CommandClassAlarmV2 {
	public static readonly commandClass = 0x71; // (113);
	public static readonly definition = {"id":113,"name":"COMMAND_CLASS_ALARM","status":"deprecated","version":2,"commands":[{"id":4,"name":"ALARM_GET","status":"active","params":[{"type":"integer","name":"Alarm Type","length":1},{"type":"enum","name":"ZWave Alarm Type","length":1,"values":{"0":"Reserved","1":"Smoke","2":"CO","3":"CO2","4":"Heat","5":"Water","6":"Access Control","7":"Burglar","8":"Power Management","9":"System","10":"Emergency","11":"Clock","255":"First"}}]},{"id":5,"name":"ALARM_REPORT","status":"active","params":[{"type":"integer","name":"Alarm Type","length":1},{"type":"integer","name":"Alarm Level","length":1},{"type":"integer","name":"Zensor Net Source Node ID","length":1,"valueType":"NODE_NUMBER"},{"type":"integer","name":"ZWave Alarm Status","length":1,"values":{"0":"Off","255":"On"}},{"type":"enum","name":"ZWave Alarm Type","length":1,"values":{"0":"Reserved","1":"Smoke","2":"CO","3":"CO2","4":"Heat","5":"Water","6":"Access Control","7":"Burglar","8":"Power Management","9":"System","10":"Emergency","11":"Clock","255":"First"}},{"type":"integer","name":"ZWave Alarm Event","length":1},{"type":"integer","name":"Number of Event Parameters","length":1},{"type":"blob","name":"Event Parameter","length":{"name":"Number of Event Parameters","mask":255,"shift":0}}]},{"id":6,"name":"ALARM_SET","status":"active","params":[{"type":"enum","name":"ZWave Alarm Type","length":1,"values":{"0":"Reserved","1":"Smoke","2":"CO","3":"CO2","4":"Heat","5":"Water","6":"Access Control","7":"Burglar","8":"Power Management","9":"System","10":"Emergency","11":"Clock","255":"First"}},{"type":"integer","name":"ZWave Alarm Status","length":1,"values":{"0":"Off","255":"On"}}]},{"id":7,"name":"ALARM_TYPE_SUPPORTED_GET","status":"active","params":[]},{"id":8,"name":"ALARM_TYPE_SUPPORTED_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Number of Bit Masks","mask":31,"shift":0},{"type":"integer","name":"Reserved","mask":96,"shift":5},{"type":"bool","name":"V1 Alarm","mask":128,"shift":7}]},{"type":"integer","name":"Bit Mask","length":0}]}]};
}

export interface AlarmGet {
	_commandClass: 0x71; // (113)
	_command: 0x4; // (4)
	alarmType: number; // 1 byte unsigned integer
	zWaveAlarmType: ZWaveAlarmTypeEnum; // 1 byte enum value
}

export interface AlarmReport {
	_commandClass: 0x71; // (113)
	_command: 0x5; // (5)
	alarmType: number; // 1 byte unsigned integer
	alarmLevel: number; // 1 byte unsigned integer
	zensorNetSourceNodeID: number; // 1 byte unsigned integer
	zWaveAlarmStatus: number; // 1 byte unsigned integer
	zWaveAlarmType: ZWaveAlarmTypeEnum; // 1 byte enum value
	zWaveAlarmEvent: number; // 1 byte unsigned integer
	numberOfEventParameters: number; // 1 byte unsigned integer
	// TODO param Event Parameter type blob
}

export interface AlarmSet {
	_commandClass: 0x71; // (113)
	_command: 0x6; // (6)
	zWaveAlarmType: ZWaveAlarmTypeEnum; // 1 byte enum value
	zWaveAlarmStatus: number; // 1 byte unsigned integer
}

export interface AlarmTypeSupportedGet {
	_commandClass: 0x71; // (113)
	_command: 0x7; // (7)
}

export interface AlarmTypeSupportedReport {
	_commandClass: 0x71; // (113)
	_command: 0x8; // (8)
	// TODO param Properties1 type bitfield
	bitMask: number; // 0 byte unsigned integer
}

export enum ZWaveAlarmTypeEnum {
	Reserved = 0x0,
	Smoke = 0x1,
	Co = 0x2,
	Co2 = 0x3,
	Heat = 0x4,
	Water = 0x5,
	AccessControl = 0x6,
	Burglar = 0x7,
	PowerManagement = 0x8,
	System = 0x9,
	Emergency = 0xa,
	Clock = 0xb,
	First = 0xff,
}
