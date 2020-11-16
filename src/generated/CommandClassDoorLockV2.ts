/* Auto-generated */

export class CommandClassDoorLockV2 {
	public static readonly commandClass = 0x62; // (98);
	public static readonly definition = {"id":98,"name":"COMMAND_CLASS_DOOR_LOCK","status":"active","version":2,"commands":[{"id":5,"name":"DOOR_LOCK_CONFIGURATION_GET","status":"active","params":[]},{"id":6,"name":"DOOR_LOCK_CONFIGURATION_REPORT","status":"active","params":[{"type":"enum","name":"Operation Type","length":1,"values":{"1":"Constant operation","2":"Timed operation"}},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Inside Door Handles State","mask":15,"shift":0},{"type":"int","name":"Outside Door Handles State","mask":240,"shift":4}]},{"type":"integer","name":"Lock Timeout Minutes","length":1},{"type":"integer","name":"Lock Timeout Seconds","length":1}]},{"id":4,"name":"DOOR_LOCK_CONFIGURATION_SET","status":"active","params":[{"type":"enum","name":"Operation Type","length":1,"values":{"1":"Constant operation","2":"Timed operation"}},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Inside Door Handles State","mask":15,"shift":0},{"type":"int","name":"Outside Door Handles State","mask":240,"shift":4}]},{"type":"integer","name":"Lock Timeout Minutes","length":1},{"type":"integer","name":"Lock Timeout Seconds","length":1}]},{"id":2,"name":"DOOR_LOCK_OPERATION_GET","status":"active","params":[]},{"id":3,"name":"DOOR_LOCK_OPERATION_REPORT","status":"active","params":[{"type":"enum","name":"Door Lock Mode","length":1,"values":{"0":"Door Unsecured","1":"Door Unsecured with timeout","16":"Door Unsecured for inside Door Handles","17":"Door Unsecured for inside Door Handles with timeout","32":"Door Unsecured for outside Door Handles","33":"Door Unsecured for outside Door Handles with timeout","254":"Door/Lock State Unknown","255":"Door Secured"}},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Inside Door Handles Mode","mask":15,"shift":0},{"type":"int","name":"Outside Door Handles Mode","mask":240,"shift":4}]},{"type":"integer","name":"Door Condition","length":1},{"type":"integer","name":"Lock Timeout Minutes","length":1},{"type":"integer","name":"Lock Timeout Seconds","length":1}]},{"id":1,"name":"DOOR_LOCK_OPERATION_SET","status":"active","params":[{"type":"enum","name":"Door Lock Mode","length":1,"values":{"0":"Door Unsecured","1":"Door Unsecured with timeout","16":"Door Unsecured for inside Door Handles","17":"Door Unsecured for inside Door Handles with timeout","32":"Door Unsecured for outside Door Handles","33":"Door Unsecured for outside Door Handles with timeout","254":"Door/Lock State Unknown","255":"Door Secured"}}]}]};
}

export interface DoorLockConfigurationGet {
	_commandClass: 0x62; // (98)
	_command: 0x5; // (5)
}

export interface DoorLockConfigurationReport {
	_commandClass: 0x62; // (98)
	_command: 0x6; // (6)
	operationType: OperationTypeEnum; // 1 byte enum value
	// TODO param Properties1 type bitfield
	lockTimeoutMinutes: number; // 1 byte unsigned integer
	lockTimeoutSeconds: number; // 1 byte unsigned integer
}

export interface DoorLockConfigurationSet {
	_commandClass: 0x62; // (98)
	_command: 0x4; // (4)
	operationType: OperationTypeEnum; // 1 byte enum value
	// TODO param Properties1 type bitfield
	lockTimeoutMinutes: number; // 1 byte unsigned integer
	lockTimeoutSeconds: number; // 1 byte unsigned integer
}

export interface DoorLockOperationGet {
	_commandClass: 0x62; // (98)
	_command: 0x2; // (2)
}

export interface DoorLockOperationReport {
	_commandClass: 0x62; // (98)
	_command: 0x3; // (3)
	doorLockMode: DoorLockModeEnum; // 1 byte enum value
	// TODO param Properties1 type bitfield
	doorCondition: number; // 1 byte unsigned integer
	lockTimeoutMinutes: number; // 1 byte unsigned integer
	lockTimeoutSeconds: number; // 1 byte unsigned integer
}

export interface DoorLockOperationSet {
	_commandClass: 0x62; // (98)
	_command: 0x1; // (1)
	doorLockMode: DoorLockModeEnum; // 1 byte enum value
}

export enum OperationTypeEnum {
	ConstantOperation = 0x1,
	TimedOperation = 0x2,
}

export enum DoorLockModeEnum {
	DoorUnsecured = 0x0,
	DoorUnsecuredWithTimeout = 0x1,
	DoorUnsecuredForInsideDoorHandles = 0x10,
	DoorUnsecuredForInsideDoorHandlesWithTimeout = 0x11,
	DoorUnsecuredForOutsideDoorHandles = 0x20,
	DoorUnsecuredForOutsideDoorHandlesWithTimeout = 0x21,
	DoorLockStateUnknown = 0xfe,
	DoorSecured = 0xff,
}
