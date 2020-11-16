/* Auto-generated */

export class CommandClassUserCodeV1 {
	public static readonly commandClass = 0x63; // (99);
	public static readonly definition = {"id":99,"name":"COMMAND_CLASS_USER_CODE","status":"active","version":1,"commands":[{"id":2,"name":"USER_CODE_GET","status":"active","params":[{"type":"integer","name":"User Identifier","length":1}]},{"id":3,"name":"USER_CODE_REPORT","status":"active","params":[{"type":"integer","name":"User Identifier","length":1},{"type":"enum","name":"User ID Status","length":1,"values":{"0":"Available (not set)","1":"Occupied","2":"Reserved by administrator","254":"Status not available"}},{"type":"text","name":"USER_CODE","length":"auto"}]},{"id":1,"name":"USER_CODE_SET","status":"active","params":[{"type":"integer","name":"User Identifier","length":1},{"type":"enum","name":"User ID Status","length":1,"values":{"0":"Available (not set)","1":"Occupied","2":"Reserved by administrator","254":"Status not available"}},{"type":"text","name":"USER_CODE","length":"auto"}]},{"id":4,"name":"USERS_NUMBER_GET","status":"active","params":[]},{"id":5,"name":"USERS_NUMBER_REPORT","status":"active","params":[{"type":"integer","name":"Supported Users","length":1}]}]};
}

export interface UserCodeGet {
	_commandClass: 0x63; // (99)
	_command: 0x2; // (2)
	userIdentifier: number; // 1 byte unsigned integer
}

export interface UserCodeReport {
	_commandClass: 0x63; // (99)
	_command: 0x3; // (3)
	userIdentifier: number; // 1 byte unsigned integer
	userIDStatus: UserIDStatusEnum; // 1 byte enum value
	// TODO param USER_CODE type text
}

export interface UserCodeSet {
	_commandClass: 0x63; // (99)
	_command: 0x1; // (1)
	userIdentifier: number; // 1 byte unsigned integer
	userIDStatus: UserIDStatusEnum; // 1 byte enum value
	// TODO param USER_CODE type text
}

export interface UsersNumberGet {
	_commandClass: 0x63; // (99)
	_command: 0x4; // (4)
}

export interface UsersNumberReport {
	_commandClass: 0x63; // (99)
	_command: 0x5; // (5)
	supportedUsers: number; // 1 byte unsigned integer
}

export enum UserIDStatusEnum {
	AvailableNotSet = 0x0,
	Occupied = 0x1,
	ReservedByAdministrator = 0x2,
	StatusNotAvailable = 0xfe,
}
