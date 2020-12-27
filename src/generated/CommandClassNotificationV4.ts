/* Auto-generated */

// deprecated
export class CommandClassNotificationV4 {
	public static readonly commandClass = 0x71; // (113);
	public static readonly definition = {"id":113,"name":"COMMAND_CLASS_NOTIFICATION","status":"deprecated","version":4,"commands":[{"id":4,"name":"NOTIFICATION_GET","status":"active","params":[{"type":"integer","name":"V1 Alarm Type","length":1},{"type":"enum","name":"Notification Type","length":1,"values":{"0":"Reserved","1":"Smoke","2":"CO","3":"CO2","4":"Heat","5":"Water","6":"Access Control","7":"Home Security","8":"Power Management","9":"System","10":"Emergency","11":"Clock","12":"Appliance","13":"Home Health","255":"First"}},{"type":"integer","name":"Event","length":1}]},{"id":5,"name":"NOTIFICATION_REPORT","status":"active","params":[{"type":"integer","name":"V1 Alarm Type","length":1},{"type":"integer","name":"V1 Alarm Level","length":1},{"type":"integer","name":"Reserved","length":1},{"type":"enum","name":"Notification Status","length":1,"values":{"0":"Off","254":"No pending notifications","255":"On"}},{"type":"enum","name":"Notification Type","length":1,"values":{"0":"Reserved","1":"Smoke","2":"CO","3":"CO2","4":"Heat","5":"Water","6":"Access Control","7":"Home Security","8":"Power Management","9":"System","10":"Emergency","11":"Clock","12":"Appliance","13":"Home Health","255":"First"}},{"type":"integer","name":"Event","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Event Parameters Length","mask":31,"shift":0},{"type":"integer","name":"Reserved2","mask":96,"shift":5},{"type":"bool","name":"Sequence","mask":128,"shift":7}]},{"type":"blob","name":"Event Parameter","length":{"name":"Properties1","mask":31,"shift":0}},{"type":"integer","name":"Sequence Number","length":1}]},{"id":6,"name":"NOTIFICATION_SET","status":"active","params":[{"type":"enum","name":"Notification Type","length":1,"values":{"0":"Reserved","1":"Smoke","2":"CO","3":"CO2","4":"Heat","5":"Water","6":"Access Control","7":"Home Security","8":"Power Management","9":"System","10":"Emergency","11":"Clock","12":"Appliance","13":"Home Health","255":"First"}},{"type":"enum","name":"Notification Status","length":1,"values":{"0":"Off","254":"No pending notifications","255":"On"}}]},{"id":7,"name":"NOTIFICATION_SUPPORTED_GET","status":"active","params":[]},{"id":8,"name":"NOTIFICATION_SUPPORTED_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Number of Bit Masks","mask":31,"shift":0},{"type":"integer","name":"Reserved","mask":96,"shift":5},{"type":"bool","name":"V1 Alarm","mask":128,"shift":7}]},{"type":"integer","name":"Bit Mask","length":0}]},{"id":1,"name":"EVENT_SUPPORTED_GET","status":"active","params":[{"type":"enum","name":"Notification Type","length":1,"values":{"0":"Reserved","1":"Smoke","2":"CO","3":"CO2","4":"Heat","5":"Water","6":"Access Control","7":"Home Security","8":"Power Management","9":"System","10":"Emergency","11":"Clock","12":"Appliance","13":"Home Health","255":"First"}}]},{"id":2,"name":"EVENT_SUPPORTED_REPORT","status":"active","params":[{"type":"enum","name":"Notification Type","length":1,"values":{"0":"Reserved","1":"Smoke","2":"CO","3":"CO2","4":"Heat","5":"Water","6":"Access Control","7":"Home Security","8":"Power Management","9":"System","10":"Emergency","11":"Clock","12":"Appliance","13":"Home Health","255":"First"}},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Number of Bit Masks","mask":31,"shift":0},{"type":"integer","name":"Reserved","mask":224,"shift":5}]},{"type":"integer","name":"Bit Mask","length":0}]}]};
}

export interface NotificationGet {
	_commandClass: 0x71; // (113)
	_command: 0x4; // (4)
	v1AlarmType: number; // 1 byte unsigned integer
	notificationType: NotificationTypeEnum; // 1 byte enum value
	event: number; // 1 byte unsigned integer
}

export interface NotificationReport {
	_commandClass: 0x71; // (113)
	_command: 0x5; // (5)
	v1AlarmType: number; // 1 byte unsigned integer
	v1AlarmLevel: number; // 1 byte unsigned integer
	reserved: number; // 1 byte unsigned integer
	notificationStatus: NotificationStatusEnum; // 1 byte enum value
	notificationType: NotificationTypeEnum; // 1 byte enum value
	event: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param Event Parameter type blob
	sequenceNumber: number; // 1 byte unsigned integer
}

export interface NotificationSet {
	_commandClass: 0x71; // (113)
	_command: 0x6; // (6)
	notificationType: NotificationTypeEnum; // 1 byte enum value
	notificationStatus: NotificationStatusEnum; // 1 byte enum value
}

export interface NotificationSupportedGet {
	_commandClass: 0x71; // (113)
	_command: 0x7; // (7)
}

export interface NotificationSupportedReport {
	_commandClass: 0x71; // (113)
	_command: 0x8; // (8)
	// TODO param Properties1 type bitfield
	bitMask: number; // 0 byte unsigned integer
}

export interface EventSupportedGet {
	_commandClass: 0x71; // (113)
	_command: 0x1; // (1)
	notificationType: NotificationTypeEnum; // 1 byte enum value
}

export interface EventSupportedReport {
	_commandClass: 0x71; // (113)
	_command: 0x2; // (2)
	notificationType: NotificationTypeEnum; // 1 byte enum value
	// TODO param Properties1 type bitfield
	bitMask: number; // 0 byte unsigned integer
}

export enum NotificationTypeEnum {
	Reserved = 0x0,
	Smoke = 0x1,
	Co = 0x2,
	Co2 = 0x3,
	Heat = 0x4,
	Water = 0x5,
	AccessControl = 0x6,
	HomeSecurity = 0x7,
	PowerManagement = 0x8,
	System = 0x9,
	Emergency = 0xa,
	Clock = 0xb,
	Appliance = 0xc,
	HomeHealth = 0xd,
	First = 0xff,
}

export enum NotificationStatusEnum {
	Off = 0x0,
	NoPendingNotifications = 0xfe,
	On = 0xff,
}
