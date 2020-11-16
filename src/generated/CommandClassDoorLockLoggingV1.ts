/* Auto-generated */

export class CommandClassDoorLockLoggingV1 {
	public static readonly commandClass = 0x4c; // (76);
	public static readonly definition = {"id":76,"name":"COMMAND_CLASS_DOOR_LOCK_LOGGING","status":"active","version":1,"commands":[{"id":1,"name":"DOOR_LOCK_LOGGING_RECORDS_SUPPORTED_GET","status":"active","params":[]},{"id":2,"name":"DOOR_LOCK_LOGGING_RECORDS_SUPPORTED_REPORT","status":"active","params":[{"type":"integer","name":"Max records stored","length":1}]},{"id":3,"name":"RECORD_GET","status":"active","params":[{"type":"integer","name":"Record number","length":1}]},{"id":4,"name":"RECORD_REPORT","status":"active","params":[{"type":"integer","name":"Record number","length":1},{"type":"integer","name":"Year","length":2},{"type":"integer","name":"Month","length":1},{"type":"integer","name":"Day","length":1},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Hour Local Time","mask":31,"shift":0},{"type":"int","name":"Record status","mask":224,"shift":5}]},{"type":"integer","name":"Minute Local Time","length":1},{"type":"integer","name":"Second Local Time","length":1},{"type":"integer","name":"Event Type","length":1},{"type":"integer","name":"User Identifier","length":1},{"type":"integer","name":"User Code Length","length":1},{"type":"blob","name":"USER_CODE","length":"auto"}]}]};
}

export interface DoorLockLoggingRecordsSupportedGet {
	_commandClass: 0x4c; // (76)
	_command: 0x1; // (1)
}

export interface DoorLockLoggingRecordsSupportedReport {
	_commandClass: 0x4c; // (76)
	_command: 0x2; // (2)
	maxRecordsStored: number; // 1 byte unsigned integer
}

export interface RecordGet {
	_commandClass: 0x4c; // (76)
	_command: 0x3; // (3)
	recordNumber: number; // 1 byte unsigned integer
}

export interface RecordReport {
	_commandClass: 0x4c; // (76)
	_command: 0x4; // (4)
	recordNumber: number; // 1 byte unsigned integer
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
	eventType: number; // 1 byte unsigned integer
	userIdentifier: number; // 1 byte unsigned integer
	userCodeLength: number; // 1 byte unsigned integer
	// TODO param USER_CODE type blob
}
