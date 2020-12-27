/* Auto-generated */

export class CommandClassUserCodeV2 {
	public static readonly commandClass = 0x63; // (99);
	public static readonly definition = {"id":99,"name":"COMMAND_CLASS_USER_CODE","status":"active","version":2,"commands":[{"id":2,"name":"USER_CODE_GET","status":"active","params":[{"type":"integer","name":"User Identifier","length":1}]},{"id":3,"name":"USER_CODE_REPORT","status":"active","params":[{"type":"integer","name":"User Identifier","length":1},{"type":"enum","name":"User ID Status","length":1,"values":{"0":"Available","1":"Enabled / Grant Access","2":"Disabled","3":"Messaging","4":"Passage Mode","254":"Status not available"}},{"type":"text","name":"USER_CODE","length":"auto"}]},{"id":1,"name":"USER_CODE_SET","status":"active","params":[{"type":"integer","name":"User Identifier","length":1},{"type":"enum","name":"User ID Status","length":1,"values":{"0":"Available","1":"Enabled / Grant Access","2":"Disabled","3":"Messaging","4":"Passage Mode","254":"Status not available"}},{"type":"text","name":"USER_CODE","length":"auto"}]},{"id":4,"name":"USERS_NUMBER_GET","status":"active","params":[]},{"id":5,"name":"USERS_NUMBER_REPORT","status":"active","params":[{"type":"integer","name":"Supported Users","length":1},{"type":"integer","name":"Extended Supported Users","length":2}]},{"id":11,"name":"EXTENDED_USER_CODE_SET","status":"active","params":[{"type":"integer","name":"Number of User Codes","length":1},{"type":"group","name":"vg1","length":{"name":"Number of User Codes","mask":255,"shift":0},"params":[{"type":"integer","name":"User Identifier","length":2},{"type":"enum","name":"User ID Status","length":1,"values":{"0":"Available","1":"Enabled / Grant Access","2":"Disabled","3":"Messaging","4":"Passage Mode","254":"Status not available"}},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"User Code Length","mask":15,"shift":0},{"type":"integer","name":"Reserved","mask":240,"shift":4}]},{"type":"blob","name":"User Code","length":{"name":"Properties1","mask":15,"shift":0}}]}]},{"id":12,"name":"EXTENDED_USER_CODE_GET","status":"active","params":[{"type":"integer","name":"User Identifier","length":2},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"bool","name":"Report more","mask":1,"shift":0},{"type":"integer","name":"Reserved","mask":254,"shift":1}]}]},{"id":13,"name":"EXTENDED_USER_CODE_REPORT","status":"active","params":[{"type":"integer","name":"Number of User Codes","length":1},{"type":"integer","name":"Next User Identifier","length":2},{"type":"group","name":"vg1","optional":{"name":"Number of User Codes","mask":255},"length":"auto","params":[{"type":"integer","name":"User Identifier","length":2},{"type":"enum","name":"User ID Status","length":1,"values":{"0":"Available","1":"Enabled / Grant Access","2":"Disabled","3":"Messaging","4":"Passage Mode","254":"Status not available"}},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"User Code Length","mask":15,"shift":0},{"type":"integer","name":"Reserved","mask":240,"shift":4}]},{"type":"blob","name":"User Code","length":{"name":"Properties1","mask":15,"shift":0}}]}]},{"id":6,"name":"USER_CODE_CAPABILITIES_GET","status":"active","params":[]},{"id":7,"name":"USER_CODE_CAPABILITIES_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Supported User ID Status Bit Mask Length","mask":31,"shift":0},{"type":"bool","name":"Reserved","mask":32,"shift":5},{"type":"bool","name":"MCD Support","mask":64,"shift":6},{"type":"bool","name":"MC Support","mask":128,"shift":7}]},{"type":"blob","name":"Supported User ID Status Bit Mask","length":{"name":"Properties1","mask":31,"shift":0}},{"type":"bitfield","name":"Properties2","length":1,"fields":[{"type":"integer","name":"Supported Keypad Modes Bit Mask Length","mask":31,"shift":0},{"type":"bool","name":"MUCS Support","mask":32,"shift":5},{"type":"bool","name":"MUCR Support","mask":64,"shift":6},{"type":"bool","name":"UCC Support","mask":128,"shift":7}]},{"type":"blob","name":"Supported Keypad Modes Bit Mask","length":{"name":"Properties2","mask":31,"shift":0}},{"type":"bitfield","name":"Properties3","length":1,"fields":[{"type":"integer","name":"Supported Keys Bit Mask Length","mask":15,"shift":0},{"type":"integer","name":"Reserved","mask":240,"shift":4}]},{"type":"blob","name":"Supported Keys Bit Mask","length":{"name":"Properties3","mask":15,"shift":0}}]},{"id":8,"name":"USER_CODE_KEYPAD_MODE_SET","status":"active","params":[{"type":"enum","name":"Keypad Mode","length":1,"values":{"0":"Normal mode","1":"Vacation mode","2":"Privacy mode","3":"Locked Out mode"}}]},{"id":9,"name":"USER_CODE_KEYPAD_MODE_GET","status":"active","params":[]},{"id":10,"name":"USER_CODE_KEYPAD_MODE_REPORT","status":"active","params":[{"type":"enum","name":"Keypad Mode","length":1,"values":{"0":"Normal mode","1":"Vacation mode","2":"Privacy mode","3":"Locked Out mode"}}]},{"id":14,"name":"MASTER_CODE_SET","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Master Code Length","mask":15,"shift":0},{"type":"integer","name":"Reserved","mask":240,"shift":4}]},{"type":"blob","name":"Master Code","length":{"name":"Properties1","mask":15,"shift":0}}]},{"id":15,"name":"MASTER_CODE_GET","status":"active","params":[]},{"id":16,"name":"MASTER_CODE_REPORT","status":"active","params":[{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"integer","name":"Master Code Length","mask":15,"shift":0},{"type":"integer","name":"Reserved","mask":240,"shift":4}]},{"type":"blob","name":"Master Code","length":{"name":"Properties1","mask":15,"shift":0}}]},{"id":17,"name":"USER_CODE_CHECKSUM_GET","status":"active","params":[]},{"id":18,"name":"USER_CODE_CHECKSUM_REPORT","status":"active","params":[{"type":"integer","name":"User Code Checksum","length":2}]}]};
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
	extendedSupportedUsers: number; // 2 byte unsigned integer
}

export interface ExtendedUserCodeSet {
	_commandClass: 0x63; // (99)
	_command: 0xb; // (11)
	numberOfUserCodes: number; // 1 byte unsigned integer
	// TODO param vg1 type group
}

export interface ExtendedUserCodeGet {
	_commandClass: 0x63; // (99)
	_command: 0xc; // (12)
	userIdentifier: number; // 2 byte unsigned integer
	// TODO param Properties1 type bitfield
}

export interface ExtendedUserCodeReport {
	_commandClass: 0x63; // (99)
	_command: 0xd; // (13)
	numberOfUserCodes: number; // 1 byte unsigned integer
	nextUserIdentifier: number; // 2 byte unsigned integer
	// TODO param vg1 type group
}

export interface UserCodeCapabilitiesGet {
	_commandClass: 0x63; // (99)
	_command: 0x6; // (6)
}

export interface UserCodeCapabilitiesReport {
	_commandClass: 0x63; // (99)
	_command: 0x7; // (7)
	// TODO param Properties1 type bitfield
	// TODO param Supported User ID Status Bit Mask type blob
	// TODO param Properties2 type bitfield
	// TODO param Supported Keypad Modes Bit Mask type blob
	// TODO param Properties3 type bitfield
	// TODO param Supported Keys Bit Mask type blob
}

export interface UserCodeKeypadModeSet {
	_commandClass: 0x63; // (99)
	_command: 0x8; // (8)
	keypadMode: KeypadModeEnum; // 1 byte enum value
}

export interface UserCodeKeypadModeGet {
	_commandClass: 0x63; // (99)
	_command: 0x9; // (9)
}

export interface UserCodeKeypadModeReport {
	_commandClass: 0x63; // (99)
	_command: 0xa; // (10)
	keypadMode: KeypadModeEnum; // 1 byte enum value
}

export interface MasterCodeSet {
	_commandClass: 0x63; // (99)
	_command: 0xe; // (14)
	// TODO param Properties1 type bitfield
	// TODO param Master Code type blob
}

export interface MasterCodeGet {
	_commandClass: 0x63; // (99)
	_command: 0xf; // (15)
}

export interface MasterCodeReport {
	_commandClass: 0x63; // (99)
	_command: 0x10; // (16)
	// TODO param Properties1 type bitfield
	// TODO param Master Code type blob
}

export interface UserCodeChecksumGet {
	_commandClass: 0x63; // (99)
	_command: 0x11; // (17)
}

export interface UserCodeChecksumReport {
	_commandClass: 0x63; // (99)
	_command: 0x12; // (18)
	userCodeChecksum: number; // 2 byte unsigned integer
}

export enum UserIDStatusEnum {
	Available = 0x0,
	EnabledGrantAccess = 0x1,
	Disabled = 0x2,
	Messaging = 0x3,
	PassageMode = 0x4,
	StatusNotAvailable = 0xfe,
}

export enum KeypadModeEnum {
	NormalMode = 0x0,
	VacationMode = 0x1,
	PrivacyMode = 0x2,
	LockedOutMode = 0x3,
}
