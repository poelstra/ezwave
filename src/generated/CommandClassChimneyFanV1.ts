/* Auto-generated */

export class CommandClassChimneyFanV1 {
	public static readonly commandClass = 0x2a; // (42);
	public static readonly definition = {"id":42,"name":"COMMAND_CLASS_CHIMNEY_FAN","status":"active","version":1,"commands":[{"id":32,"name":"CHIMNEY_FAN_ALARM_LOG_GET","status":"active","params":[]},{"id":33,"name":"CHIMNEY_FAN_ALARM_LOG_REPORT","status":"active","params":[{"type":"bitfield","name":"Alarm Event 1","length":1,"fields":[{"type":"bool","name":"Reserved11","mask":1,"shift":0},{"type":"bool","name":"External Alarm 1","mask":2,"shift":1},{"type":"bool","name":"Sensor Error 1","mask":4,"shift":2},{"type":"bool","name":"Alarm Temperature Exceeded 1","mask":8,"shift":3},{"type":"int","name":"Reserved12","mask":112,"shift":4},{"type":"bool","name":"Alarm still active 1","mask":128,"shift":7}]},{"type":"bitfield","name":"Alarm Event 2","length":1,"fields":[{"type":"bool","name":"Reserved21","mask":1,"shift":0},{"type":"bool","name":"External Alarm 2","mask":2,"shift":1},{"type":"bool","name":"Sensor Error 2","mask":4,"shift":2},{"type":"bool","name":"Alarm Temperature Exceeded 2","mask":8,"shift":3},{"type":"int","name":"Reserved22","mask":112,"shift":4},{"type":"bool","name":"Alarm still active 2","mask":128,"shift":7}]},{"type":"bitfield","name":"Alarm Event 3","length":1,"fields":[{"type":"bool","name":"Reserved31","mask":1,"shift":0},{"type":"bool","name":"External Alarm 3","mask":2,"shift":1},{"type":"bool","name":"Sensor Error 3","mask":4,"shift":2},{"type":"bool","name":"Alarm Temperature Exceeded 3","mask":8,"shift":3},{"type":"int","name":"Reserved32","mask":112,"shift":4},{"type":"bool","name":"Alarm still active 3","mask":128,"shift":7}]},{"type":"bitfield","name":"Alarm Event 4","length":1,"fields":[{"type":"bool","name":"Reserved41","mask":1,"shift":0},{"type":"bool","name":"External Alarm 4","mask":2,"shift":1},{"type":"bool","name":"Sensor Error 4","mask":4,"shift":2},{"type":"bool","name":"Alarm Temperature Exceeded 4","mask":8,"shift":3},{"type":"int","name":"Reserved42","mask":112,"shift":4},{"type":"bool","name":"Alarm still active 4","mask":128,"shift":7}]},{"type":"bitfield","name":"Alarm Event 5","length":1,"fields":[{"type":"bool","name":"Reserved51","mask":1,"shift":0},{"type":"bool","name":"External Alarm 5","mask":2,"shift":1},{"type":"bool","name":"Sensor Error 5","mask":4,"shift":2},{"type":"bool","name":"Alarm Temperature Exceeded 5","mask":8,"shift":3},{"type":"int","name":"Reserved52","mask":112,"shift":4},{"type":"bool","name":"Alarm still active 5","mask":128,"shift":7}]}]},{"id":31,"name":"CHIMNEY_FAN_ALARM_LOG_SET","status":"active","params":[{"type":"enum","name":"Message","length":1,"values":{"8":"Reset log"}}]},{"id":35,"name":"CHIMNEY_FAN_ALARM_STATUS_GET","status":"active","params":[]},{"id":36,"name":"CHIMNEY_FAN_ALARM_STATUS_REPORT","status":"active","params":[{"type":"bitfield","name":"Alarm Status","length":1,"fields":[{"type":"bool","name":"Service","mask":1,"shift":0},{"type":"bool","name":"External Alarm","mask":2,"shift":1},{"type":"bool","name":"Sensor Error","mask":4,"shift":2},{"type":"bool","name":"Alarm Temperature Exceeded","mask":8,"shift":3},{"type":"int","name":"Not Used","mask":48,"shift":4},{"type":"bool","name":"Speed change Enable","mask":64,"shift":6},{"type":"bool","name":"Start Temperature Exceeded","mask":128,"shift":7}]}]},{"id":34,"name":"CHIMNEY_FAN_ALARM_STATUS_SET","status":"active","params":[{"type":"bitfield","name":"Message","length":1,"fields":[{"type":"bool","name":"Not Used1","mask":1,"shift":0},{"type":"bool","name":"Acknowledge External Alarm","mask":2,"shift":1},{"type":"bool","name":"Acknowledge Sensor Error","mask":4,"shift":2},{"type":"bool","name":"Acknowledge Alarm Temperature Exceeded","mask":8,"shift":3},{"type":"int","name":"Not Used2","mask":240,"shift":4}]}]},{"id":14,"name":"CHIMNEY_FAN_ALARM_TEMP_GET","status":"active","params":[]},{"id":15,"name":"CHIMNEY_FAN_ALARM_TEMP_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Size","mask":7,"shift":0},{"type":"int","name":"Scale","mask":24,"shift":3},{"type":"int","name":"Precision","mask":224,"shift":5}]},{"type":"blob","name":"Value","length":{"name":"Properties1","mask":7,"shift":0}}]},{"id":13,"name":"CHIMNEY_FAN_ALARM_TEMP_SET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Size","mask":7,"shift":0},{"type":"int","name":"Scale","mask":24,"shift":3},{"type":"int","name":"Precision","mask":224,"shift":5}]},{"type":"blob","name":"Value","length":{"name":"Properties1","mask":7,"shift":0}}]},{"id":17,"name":"CHIMNEY_FAN_BOOST_TIME_GET","status":"active","params":[]},{"id":18,"name":"CHIMNEY_FAN_BOOST_TIME_REPORT","status":"active","params":[{"type":"integer","name":"Time","length":1}]},{"id":16,"name":"CHIMNEY_FAN_BOOST_TIME_SET","status":"active","params":[{"type":"integer","name":"Time","length":1}]},{"id":40,"name":"CHIMNEY_FAN_DEFAULT_SET","status":"active","params":[]},{"id":38,"name":"CHIMNEY_FAN_MIN_SPEED_GET","status":"active","params":[]},{"id":39,"name":"CHIMNEY_FAN_MIN_SPEED_REPORT","status":"active","params":[{"type":"integer","name":"Min Speed","length":1}]},{"id":37,"name":"CHIMNEY_FAN_MIN_SPEED_SET","status":"active","params":[{"type":"integer","name":"Min Speed","length":1}]},{"id":23,"name":"CHIMNEY_FAN_MODE_GET","status":"active","params":[]},{"id":24,"name":"CHIMNEY_FAN_MODE_REPORT","status":"active","params":[{"type":"enum","name":"Mode","length":1,"values":{"0":"Off","255":"ON"}}]},{"id":22,"name":"CHIMNEY_FAN_MODE_SET","status":"active","params":[{"type":"enum","name":"Mode","length":1,"values":{"0":"Off","255":"ON"}}]},{"id":26,"name":"CHIMNEY_FAN_SETUP_GET","status":"active","params":[]},{"id":27,"name":"CHIMNEY_FAN_SETUP_REPORT","status":"active","params":[{"type":"enum","name":"Mode","length":1,"values":{"0":"Off","255":"ON"}},{"type":"integer","name":"Boost Time","length":1},{"type":"integer","name":"Stop Time","length":1},{"type":"integer","name":"Min. Speed","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Size 1","mask":7,"shift":0},{"type":"int","name":"Scale 1","mask":24,"shift":3},{"type":"int","name":"Precision 1","mask":224,"shift":5}]},{"type":"blob","name":"Start Temperature","length":{"name":"Properties1","mask":7,"shift":0}},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"int","name":"Size 2","mask":7,"shift":0},{"type":"int","name":"Scale 2","mask":24,"shift":3},{"type":"int","name":"Precision 2","mask":224,"shift":5}]},{"type":"blob","name":"Stop Temperature","length":{"name":"Properties2","mask":7,"shift":0}},{"type":"bitfield","name":"Properties3","length":1,"fields":[{"type":"int","name":"Size 3","mask":7,"shift":0},{"type":"int","name":"Scale 3","mask":24,"shift":3},{"type":"int","name":"Precision 3","mask":224,"shift":5}]},{"type":"blob","name":"Alarm Temperature Value","length":{"name":"Properties3","mask":7,"shift":0}}]},{"id":25,"name":"CHIMNEY_FAN_SETUP_SET","status":"active","params":[{"type":"enum","name":"Mode","length":1,"values":{"0":"Off","255":"ON"}},{"type":"integer","name":"Boost Time","length":1},{"type":"integer","name":"Stop Time","length":1},{"type":"integer","name":"Min. Speed","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Size 1","mask":7,"shift":0},{"type":"int","name":"Scale 1","mask":24,"shift":3},{"type":"int","name":"Precision 1","mask":224,"shift":5}]},{"type":"blob","name":"Start Temperature","length":{"name":"Properties1","mask":7,"shift":0}},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"int","name":"Size 2","mask":7,"shift":0},{"type":"int","name":"Scale 2","mask":24,"shift":3},{"type":"int","name":"Precision 2","mask":224,"shift":5}]},{"type":"blob","name":"Stop Temperature","length":{"name":"Properties2","mask":7,"shift":0}},{"type":"bitfield","name":"Properties3","length":1,"fields":[{"type":"int","name":"Size 3","mask":7,"shift":0},{"type":"int","name":"Scale 3","mask":24,"shift":3},{"type":"int","name":"Precision 3","mask":224,"shift":5}]},{"type":"blob","name":"Alarm Temperature Value","length":{"name":"Properties3","mask":7,"shift":0}}]},{"id":5,"name":"CHIMNEY_FAN_SPEED_GET","status":"active","params":[]},{"id":6,"name":"CHIMNEY_FAN_SPEED_REPORT","status":"active","params":[{"type":"integer","name":"Speed","length":1}]},{"id":4,"name":"CHIMNEY_FAN_SPEED_SET","status":"active","params":[{"type":"integer","name":"Speed","length":1,"values":{"101":"Speed down","200":"Speed up"}}]},{"id":8,"name":"CHIMNEY_FAN_START_TEMP_GET","status":"active","params":[]},{"id":9,"name":"CHIMNEY_FAN_START_TEMP_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Size","mask":7,"shift":0},{"type":"int","name":"Scale","mask":24,"shift":3},{"type":"int","name":"Precision","mask":224,"shift":5}]},{"type":"blob","name":"Value","length":{"name":"Properties1","mask":7,"shift":0}}]},{"id":7,"name":"CHIMNEY_FAN_START_TEMP_SET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Size","mask":7,"shift":0},{"type":"int","name":"Scale","mask":24,"shift":3},{"type":"int","name":"Precision","mask":224,"shift":5}]},{"type":"blob","name":"Value","length":{"name":"Properties1","mask":7,"shift":0}}]},{"id":2,"name":"CHIMNEY_FAN_STATE_GET","status":"active","params":[]},{"id":3,"name":"CHIMNEY_FAN_STATE_REPORT","status":"active","params":[{"type":"enum","name":"State","length":1,"values":{"0":"Off","1":"Boost","2":"Exhaust","3":"Reload","4":"Venting","5":"Stop","6":"Venting_EX","7":"Service","8":"Sensor Failure","9":"Chimney Fire","10":"External alarm"}}]},{"id":1,"name":"CHIMNEY_FAN_STATE_SET","status":"active","params":[{"type":"enum","name":"State","length":1,"values":{"1":"Next State"}}]},{"id":29,"name":"CHIMNEY_FAN_STATUS_GET","status":"active","params":[]},{"id":30,"name":"CHIMNEY_FAN_STATUS_REPORT","status":"active","params":[{"type":"enum","name":"State","length":1,"values":{"0":"Off","1":"Boost","2":"Exhaust","3":"Reload","4":"Venting","5":"Stop","6":"Venting_EX","7":"Service","8":"Sensor Failure","9":"Chimney Fire","10":"External alarm"}},{"type":"integer","name":"Speed","length":1},{"type":"bitfield","name":"Alarm Status","length":1,"fields":[{"type":"bool","name":"Service","mask":1,"shift":0},{"type":"bool","name":"External Alarm","mask":2,"shift":1},{"type":"bool","name":"Sensor Error","mask":4,"shift":2},{"type":"bool","name":"Alarm Temperature Exceeded","mask":8,"shift":3},{"type":"int","name":"Not Used","mask":48,"shift":4},{"type":"bool","name":"Speed change Enable","mask":64,"shift":6},{"type":"bool","name":"Start Temperature Exceeded","mask":128,"shift":7}]},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Size","mask":7,"shift":0},{"type":"int","name":"Scale","mask":24,"shift":3},{"type":"int","name":"Precision","mask":224,"shift":5}]},{"type":"blob","name":"Value","length":{"name":"Properties1","mask":7,"shift":0}}]},{"id":11,"name":"CHIMNEY_FAN_STOP_TEMP_GET","status":"active","params":[]},{"id":12,"name":"CHIMNEY_FAN_STOP_TEMP_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Size","mask":7,"shift":0},{"type":"int","name":"Scale","mask":24,"shift":3},{"type":"int","name":"Precision","mask":224,"shift":5}]},{"type":"blob","name":"Value","length":{"name":"Properties1","mask":7,"shift":0}}]},{"id":10,"name":"CHIMNEY_FAN_STOP_TEMP_SET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Size","mask":7,"shift":0},{"type":"int","name":"Scale","mask":24,"shift":3},{"type":"int","name":"Precision","mask":224,"shift":5}]},{"type":"blob","name":"Value","length":{"name":"Properties1","mask":7,"shift":0}}]},{"id":20,"name":"CHIMNEY_FAN_STOP_TIME_GET","status":"active","params":[]},{"id":21,"name":"CHIMNEY_FAN_STOP_TIME_REPORT","status":"active","params":[{"type":"integer","name":"Time","length":1}]},{"id":19,"name":"CHIMNEY_FAN_STOP_TIME_SET","status":"active","params":[{"type":"integer","name":"Time","length":1}]}]};
}

export interface ChimneyFanAlarmLogGet {
	_commandClass: 0x2a; // (42)
	_command: 0x20; // (32)
}

export interface ChimneyFanAlarmLogReport {
	_commandClass: 0x2a; // (42)
	_command: 0x21; // (33)
	// TODO param Alarm Event 1 type bitfield
	// TODO param Alarm Event 2 type bitfield
	// TODO param Alarm Event 3 type bitfield
	// TODO param Alarm Event 4 type bitfield
	// TODO param Alarm Event 5 type bitfield
}

export interface ChimneyFanAlarmLogSet {
	_commandClass: 0x2a; // (42)
	_command: 0x1f; // (31)
	message: MessageEnum; // 1 byte enum value
}

export interface ChimneyFanAlarmStatusGet {
	_commandClass: 0x2a; // (42)
	_command: 0x23; // (35)
}

export interface ChimneyFanAlarmStatusReport {
	_commandClass: 0x2a; // (42)
	_command: 0x24; // (36)
	// TODO param Alarm Status type bitfield
}

export interface ChimneyFanAlarmStatusSet {
	_commandClass: 0x2a; // (42)
	_command: 0x22; // (34)
	// TODO param Message type bitfield
}

export interface ChimneyFanAlarmTempGet {
	_commandClass: 0x2a; // (42)
	_command: 0xe; // (14)
}

export interface ChimneyFanAlarmTempReport {
	_commandClass: 0x2a; // (42)
	_command: 0xf; // (15)
	// TODO param Properties1 type bitfield
	// TODO param Value type blob
}

export interface ChimneyFanAlarmTempSet {
	_commandClass: 0x2a; // (42)
	_command: 0xd; // (13)
	// TODO param Properties1 type bitfield
	// TODO param Value type blob
}

export interface ChimneyFanBoostTimeGet {
	_commandClass: 0x2a; // (42)
	_command: 0x11; // (17)
}

export interface ChimneyFanBoostTimeReport {
	_commandClass: 0x2a; // (42)
	_command: 0x12; // (18)
	time: number; // 1 byte unsigned integer
}

export interface ChimneyFanBoostTimeSet {
	_commandClass: 0x2a; // (42)
	_command: 0x10; // (16)
	time: number; // 1 byte unsigned integer
}

export interface ChimneyFanDefaultSet {
	_commandClass: 0x2a; // (42)
	_command: 0x28; // (40)
}

export interface ChimneyFanMinSpeedGet {
	_commandClass: 0x2a; // (42)
	_command: 0x26; // (38)
}

export interface ChimneyFanMinSpeedReport {
	_commandClass: 0x2a; // (42)
	_command: 0x27; // (39)
	minSpeed: number; // 1 byte unsigned integer
}

export interface ChimneyFanMinSpeedSet {
	_commandClass: 0x2a; // (42)
	_command: 0x25; // (37)
	minSpeed: number; // 1 byte unsigned integer
}

export interface ChimneyFanModeGet {
	_commandClass: 0x2a; // (42)
	_command: 0x17; // (23)
}

export interface ChimneyFanModeReport {
	_commandClass: 0x2a; // (42)
	_command: 0x18; // (24)
	mode: ModeEnum; // 1 byte enum value
}

export interface ChimneyFanModeSet {
	_commandClass: 0x2a; // (42)
	_command: 0x16; // (22)
	mode: ModeEnum; // 1 byte enum value
}

export interface ChimneyFanSetupGet {
	_commandClass: 0x2a; // (42)
	_command: 0x1a; // (26)
}

export interface ChimneyFanSetupReport {
	_commandClass: 0x2a; // (42)
	_command: 0x1b; // (27)
	mode: ModeEnum; // 1 byte enum value
	boostTime: number; // 1 byte unsigned integer
	stopTime: number; // 1 byte unsigned integer
	minSpeed: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param Start Temperature type blob
	// TODO param Properties2 type bitfield
	// TODO param Stop Temperature type blob
	// TODO param Properties3 type bitfield
	// TODO param Alarm Temperature Value type blob
}

export interface ChimneyFanSetupSet {
	_commandClass: 0x2a; // (42)
	_command: 0x19; // (25)
	mode: ModeEnum; // 1 byte enum value
	boostTime: number; // 1 byte unsigned integer
	stopTime: number; // 1 byte unsigned integer
	minSpeed: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param Start Temperature type blob
	// TODO param Properties2 type bitfield
	// TODO param Stop Temperature type blob
	// TODO param Properties3 type bitfield
	// TODO param Alarm Temperature Value type blob
}

export interface ChimneyFanSpeedGet {
	_commandClass: 0x2a; // (42)
	_command: 0x5; // (5)
}

export interface ChimneyFanSpeedReport {
	_commandClass: 0x2a; // (42)
	_command: 0x6; // (6)
	speed: number; // 1 byte unsigned integer
}

export interface ChimneyFanSpeedSet {
	_commandClass: 0x2a; // (42)
	_command: 0x4; // (4)
	speed: number; // 1 byte unsigned integer
}

export interface ChimneyFanStartTempGet {
	_commandClass: 0x2a; // (42)
	_command: 0x8; // (8)
}

export interface ChimneyFanStartTempReport {
	_commandClass: 0x2a; // (42)
	_command: 0x9; // (9)
	// TODO param Properties1 type bitfield
	// TODO param Value type blob
}

export interface ChimneyFanStartTempSet {
	_commandClass: 0x2a; // (42)
	_command: 0x7; // (7)
	// TODO param Properties1 type bitfield
	// TODO param Value type blob
}

export interface ChimneyFanStateGet {
	_commandClass: 0x2a; // (42)
	_command: 0x2; // (2)
}

export interface ChimneyFanStateReport {
	_commandClass: 0x2a; // (42)
	_command: 0x3; // (3)
	state: StateEnum; // 1 byte enum value
}

export interface ChimneyFanStateSet {
	_commandClass: 0x2a; // (42)
	_command: 0x1; // (1)
	state: State2Enum; // 1 byte enum value
}

export interface ChimneyFanStatusGet {
	_commandClass: 0x2a; // (42)
	_command: 0x1d; // (29)
}

export interface ChimneyFanStatusReport {
	_commandClass: 0x2a; // (42)
	_command: 0x1e; // (30)
	state: StateEnum; // 1 byte enum value
	speed: number; // 1 byte unsigned integer
	// TODO param Alarm Status type bitfield
	// TODO param Properties1 type bitfield
	// TODO param Value type blob
}

export interface ChimneyFanStopTempGet {
	_commandClass: 0x2a; // (42)
	_command: 0xb; // (11)
}

export interface ChimneyFanStopTempReport {
	_commandClass: 0x2a; // (42)
	_command: 0xc; // (12)
	// TODO param Properties1 type bitfield
	// TODO param Value type blob
}

export interface ChimneyFanStopTempSet {
	_commandClass: 0x2a; // (42)
	_command: 0xa; // (10)
	// TODO param Properties1 type bitfield
	// TODO param Value type blob
}

export interface ChimneyFanStopTimeGet {
	_commandClass: 0x2a; // (42)
	_command: 0x14; // (20)
}

export interface ChimneyFanStopTimeReport {
	_commandClass: 0x2a; // (42)
	_command: 0x15; // (21)
	time: number; // 1 byte unsigned integer
}

export interface ChimneyFanStopTimeSet {
	_commandClass: 0x2a; // (42)
	_command: 0x13; // (19)
	time: number; // 1 byte unsigned integer
}

export enum MessageEnum {
	ResetLog = 0x8,
}

export enum ModeEnum {
	Off = 0x0,
	On = 0xff,
}

export enum StateEnum {
	Off = 0x0,
	Boost = 0x1,
	Exhaust = 0x2,
	Reload = 0x3,
	Venting = 0x4,
	Stop = 0x5,
	VentingEX = 0x6,
	Service = 0x7,
	SensorFailure = 0x8,
	ChimneyFire = 0x9,
	ExternalAlarm = 0xa,
}

export enum State2Enum {
	NextState = 0x1,
}
