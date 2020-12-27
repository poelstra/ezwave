/* Auto-generated */

export class CommandClassEntryControlV1 {
	public static readonly commandClass = 0x6f; // (111);
	public static readonly definition = {"id":111,"name":"COMMAND_CLASS_ENTRY_CONTROL","status":"active","version":1,"commands":[{"id":1,"name":"ENTRY_CONTROL_NOTIFICATION","status":"active","params":[{"type":"integer","name":"Sequence Number","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"enum","name":"Data Type","mask":3,"shift":0,"values":{"0":"NA","1":"RAW","2":"ASCII","3":"MD5"}},{"type":"integer","name":"Reserved","mask":252,"shift":2}]},{"type":"enum","name":"Event Type","length":1,"values":{"0":"CACHING","1":"CACHED_KEYS","2":"ENTER","3":"DISARM_ALL","4":"ARM_ALL","5":"ARM_AWAY","6":"ARM_HOME","7":"EXIT_DELAY","8":"ARM_1","9":"ARM_2","10":"ARM_3","11":"ARM_4","12":"ARM_5","13":"ARM_6","14":"RFID","15":"BELL","16":"FIRE","17":"POLICE","18":"ALERT_PANIC","19":"ALERT_MEDICAL","20":"GATE_OPEN","21":"GATE_CLOSE","22":"LOCK","23":"UNLOCK","24":"TEST","25":"CANCEL"}},{"type":"integer","name":"Event Data Length","length":1},{"type":"blob","name":"Event Data","optional":{"name":"Sequence Number","mask":255},"length":{"name":"Event Data Length","mask":255,"shift":0}}]},{"id":2,"name":"ENTRY_CONTROL_KEY_SUPPORTED_GET","status":"active","params":[]},{"id":3,"name":"ENTRY_CONTROL_KEY_SUPPORTED_REPORT","status":"active","params":[{"type":"integer","name":"Key Supported Bit Mask Length","length":1},{"type":"integer","name":"Key Supported Bit Mask","length":0}]},{"id":4,"name":"ENTRY_CONTROL_EVENT_SUPPORTED_GET","status":"active","params":[]},{"id":5,"name":"ENTRY_CONTROL_EVENT_SUPPORTED_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Data Type Supported Bit Mask Length","mask":3,"shift":0},{"type":"integer","name":"Reserved1","mask":252,"shift":2}]},{"type":"integer","name":"Data Type Supported Bit Mask","length":0},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Event Supported Bit Mask Length","mask":31,"shift":0},{"type":"integer","name":"Reserved2","mask":224,"shift":5}]},{"type":"integer","name":"Event Type Supported Bit Mask","length":0},{"type":"integer","name":"Key Cached Size supported Minimum","length":1},{"type":"integer","name":"Key Cached Size supported Maximum","length":1},{"type":"integer","name":"Key Cached Timeout supported Minimum","length":1},{"type":"integer","name":"Key Cached Timeout supported Maximum","length":1}]},{"id":6,"name":"ENTRY_CONTROL_CONFIGURATION_SET","status":"active","params":[{"type":"integer","name":"Key Cache Size","length":1},{"type":"integer","name":"Key Cache Timeout","length":1}]},{"id":7,"name":"ENTRY_CONTROL_CONFIGURATION_GET","status":"active","params":[]},{"id":8,"name":"ENTRY_CONTROL_CONFIGURATION_REPORT","status":"active","params":[{"type":"integer","name":"Key Cache Size","length":1},{"type":"integer","name":"Key Cache Timeout","length":1}]}]};
}

export interface EntryControlNotification {
	_commandClass: 0x6f; // (111)
	_command: 0x1; // (1)
	sequenceNumber: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	eventType: EventTypeEnum; // 1 byte enum value
	eventDataLength: number; // 1 byte unsigned integer
	// TODO param Event Data type blob
}

export interface EntryControlKeySupportedGet {
	_commandClass: 0x6f; // (111)
	_command: 0x2; // (2)
}

export interface EntryControlKeySupportedReport {
	_commandClass: 0x6f; // (111)
	_command: 0x3; // (3)
	keySupportedBitMaskLength: number; // 1 byte unsigned integer
	keySupportedBitMask: number; // 0 byte unsigned integer
}

export interface EntryControlEventSupportedGet {
	_commandClass: 0x6f; // (111)
	_command: 0x4; // (4)
}

export interface EntryControlEventSupportedReport {
	_commandClass: 0x6f; // (111)
	_command: 0x5; // (5)
	// TODO param Properties1 type bitfield
	dataTypeSupportedBitMask: number; // 0 byte unsigned integer
	// TODO param Properties2 type bitfield
	eventTypeSupportedBitMask: number; // 0 byte unsigned integer
	keyCachedSizeSupportedMinimum: number; // 1 byte unsigned integer
	keyCachedSizeSupportedMaximum: number; // 1 byte unsigned integer
	keyCachedTimeoutSupportedMinimum: number; // 1 byte unsigned integer
	keyCachedTimeoutSupportedMaximum: number; // 1 byte unsigned integer
}

export interface EntryControlConfigurationSet {
	_commandClass: 0x6f; // (111)
	_command: 0x6; // (6)
	keyCacheSize: number; // 1 byte unsigned integer
	keyCacheTimeout: number; // 1 byte unsigned integer
}

export interface EntryControlConfigurationGet {
	_commandClass: 0x6f; // (111)
	_command: 0x7; // (7)
}

export interface EntryControlConfigurationReport {
	_commandClass: 0x6f; // (111)
	_command: 0x8; // (8)
	keyCacheSize: number; // 1 byte unsigned integer
	keyCacheTimeout: number; // 1 byte unsigned integer
}

export enum EventTypeEnum {
	Caching = 0x0,
	CachedKeys = 0x1,
	Enter = 0x2,
	DisarmAll = 0x3,
	ArmAll = 0x4,
	ArmAway = 0x5,
	ArmHome = 0x6,
	ExitDelay = 0x7,
	Arm1 = 0x8,
	Arm2 = 0x9,
	Arm3 = 0xa,
	Arm4 = 0xb,
	Arm5 = 0xc,
	Arm6 = 0xd,
	Rfid = 0xe,
	Bell = 0xf,
	Fire = 0x10,
	Police = 0x11,
	AlertPanic = 0x12,
	AlertMedical = 0x13,
	GateOpen = 0x14,
	GateClose = 0x15,
	Lock = 0x16,
	Unlock = 0x17,
	Test = 0x18,
	Cancel = 0x19,
}
