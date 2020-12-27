/* Auto-generated */

export class CommandClassDoorLockV4 {
	public static readonly commandClass = 0x62; // (98);
	public static readonly definition = {"id":98,"name":"COMMAND_CLASS_DOOR_LOCK","status":"active","version":4,"commands":[{"id":5,"name":"DOOR_LOCK_CONFIGURATION_GET","status":"active","params":[]},{"id":6,"name":"DOOR_LOCK_CONFIGURATION_REPORT","status":"active","params":[{"type":"enum","name":"Operation Type","length":1,"values":{"1":"Constant operation","2":"Timed operation"}},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Inside Door Handles State","mask":15,"shift":0},{"type":"integer","name":"Outside Door Handles State","mask":240,"shift":4}]},{"type":"integer","name":"Lock Timeout Minutes","length":1},{"type":"integer","name":"Lock Timeout Seconds","length":1},{"type":"integer","name":"Auto-relock time","length":2},{"type":"integer","name":"Hold and release time","length":2},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"bool","name":"TA","mask":1,"shift":0},{"type":"bool","name":"BTB","mask":2,"shift":1},{"type":"integer","name":"Reserved","mask":252,"shift":2}]}]},{"id":4,"name":"DOOR_LOCK_CONFIGURATION_SET","status":"active","params":[{"type":"enum","name":"Operation Type","length":1,"values":{"1":"Constant operation","2":"Timed operation"}},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Inside Door Handles State","mask":15,"shift":0},{"type":"integer","name":"Outside Door Handles State","mask":240,"shift":4}]},{"type":"integer","name":"Lock Timeout Minutes","length":1},{"type":"integer","name":"Lock Timeout Seconds","length":1}]},{"id":2,"name":"DOOR_LOCK_OPERATION_GET","status":"active","params":[]},{"id":3,"name":"DOOR_LOCK_OPERATION_REPORT","status":"active","params":[{"type":"enum","name":"Current Door Lock Mode","length":1,"values":{"0":"Door Unsecured","1":"Door Unsecured with timeout","16":"Door Unsecured for inside Door Handles","17":"Door Unsecured for inside Door Handles with timeout","32":"Door Unsecured for outside Door Handles","33":"Door Unsecured for outside Door Handles with timeout","254":"Door/Lock State Unknown","255":"Door Secured"}},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Inside Door Handles Mode","mask":15,"shift":0},{"type":"integer","name":"Outside Door Handles Mode","mask":240,"shift":4}]},{"type":"integer","name":"Door Condition","length":1},{"type":"integer","name":"Lock Timeout Minutes","length":1},{"type":"integer","name":"Lock Timeout Seconds","length":1},{"type":"enum","name":"Target Door Lock Mode","length":1,"values":{"0":"Door Unsecured","1":"Door Unsecured with timeout","16":"Door Unsecured for inside Door Handles","17":"Door Unsecured for inside Door Handles with timeout","32":"Door Unsecured for outside Door Handles","33":"Door Unsecured for outside Door Handles with timeout","254":"Door/Lock State Unknown","255":"Door Secured"}},{"type":"enum","name":"Duration","length":1,"values":{"0":"Already at the Target Value","254":"Unknown duration","255":"Reserved"}}]},{"id":1,"name":"DOOR_LOCK_OPERATION_SET","status":"active","params":[{"type":"enum","name":"Door Lock Mode","length":1,"values":{"0":"Door Unsecured","1":"Door Unsecured with timeout","16":"Door Unsecured for inside Door Handles","17":"Door Unsecured for inside Door Handles with timeout","32":"Door Unsecured for outside Door Handles","33":"Door Unsecured for outside Door Handles with timeout","254":"Door/Lock State Unknown","255":"Door Secured"}}]},{"id":7,"name":"DOOR_LOCK_CAPABILITIES_GET","status":"active","params":[]},{"id":8,"name":"DOOR_LOCK_CAPABILITIES_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Supported Operation type Bit Mask Length","mask":31,"shift":0},{"type":"integer","name":"Reserved","mask":224,"shift":5}]},{"type":"blob","name":"Supported Operation Type Bit Mask","length":{"name":"Properties1","mask":31,"shift":0}},{"type":"integer","name":"Supported Door Lock Mode List Length","length":1},{"type":"blob","name":"Supported Door Lock Mode","length":{"name":"Supported Door Lock Mode List Length","mask":255,"shift":0}},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Supported Inside Handle Modes Bitmask","mask":15,"shift":0},{"type":"integer","name":"Supported Outside Handle Modes Bitmask","mask":240,"shift":4}]},{"type":"integer","name":"Supported door components","length":1},{"type":"bitfield","name":"Properties3","length":1,"fields":[{"type":"bool","name":"BTBS","mask":1,"shift":0},{"type":"bool","name":"TAS","mask":2,"shift":1},{"type":"bool","name":"HRS","mask":4,"shift":2},{"type":"bool","name":"ARS","mask":8,"shift":3},{"type":"integer","name":"Reserved","mask":240,"shift":4}]}]}]};
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
	autoRelockTime: number; // 2 byte unsigned integer
	holdAndReleaseTime: number; // 2 byte unsigned integer
	// TODO param Properties2 type bitfield
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
	currentDoorLockMode: CurrentDoorLockModeEnum; // 1 byte enum value
	// TODO param Properties1 type bitfield
	doorCondition: number; // 1 byte unsigned integer
	lockTimeoutMinutes: number; // 1 byte unsigned integer
	lockTimeoutSeconds: number; // 1 byte unsigned integer
	targetDoorLockMode: TargetDoorLockModeEnum; // 1 byte enum value
	duration: DurationEnum; // 1 byte enum value
}

export interface DoorLockOperationSet {
	_commandClass: 0x62; // (98)
	_command: 0x1; // (1)
	doorLockMode: DoorLockModeEnum; // 1 byte enum value
}

export interface DoorLockCapabilitiesGet {
	_commandClass: 0x62; // (98)
	_command: 0x7; // (7)
}

export interface DoorLockCapabilitiesReport {
	_commandClass: 0x62; // (98)
	_command: 0x8; // (8)
	// TODO param Properties1 type bitfield
	// TODO param Supported Operation Type Bit Mask type blob
	supportedDoorLockModeListLength: number; // 1 byte unsigned integer
	// TODO param Supported Door Lock Mode type blob
	// TODO param Properties2 type bitfield
	supportedDoorComponents: number; // 1 byte unsigned integer
	// TODO param Properties3 type bitfield
}

export enum OperationTypeEnum {
	ConstantOperation = 0x1,
	TimedOperation = 0x2,
}

export enum CurrentDoorLockModeEnum {
	DoorUnsecured = 0x0,
	DoorUnsecuredWithTimeout = 0x1,
	DoorUnsecuredForInsideDoorHandles = 0x10,
	DoorUnsecuredForInsideDoorHandlesWithTimeout = 0x11,
	DoorUnsecuredForOutsideDoorHandles = 0x20,
	DoorUnsecuredForOutsideDoorHandlesWithTimeout = 0x21,
	DoorLockStateUnknown = 0xfe,
	DoorSecured = 0xff,
}

export enum TargetDoorLockModeEnum {
	DoorUnsecured = 0x0,
	DoorUnsecuredWithTimeout = 0x1,
	DoorUnsecuredForInsideDoorHandles = 0x10,
	DoorUnsecuredForInsideDoorHandlesWithTimeout = 0x11,
	DoorUnsecuredForOutsideDoorHandles = 0x20,
	DoorUnsecuredForOutsideDoorHandlesWithTimeout = 0x21,
	DoorLockStateUnknown = 0xfe,
	DoorSecured = 0xff,
}

export enum DurationEnum {
	AlreadyAtTheTargetValue = 0x0,
	UnknownDuration = 0xfe,
	Reserved = 0xff,
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
