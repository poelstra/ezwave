/**
 * Command Class User Code, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum UserCodeV2Commands {
	UserCodeGet = 0x02,
	UserCodeReport = 0x03,
	UserCodeSet = 0x01,
	UsersNumberGet = 0x04,
	UsersNumberReport = 0x05,
	ExtendedUserCodeSet = 0x0b,
	ExtendedUserCodeGet = 0x0c,
	ExtendedUserCodeReport = 0x0d,
	UserCodeCapabilitiesGet = 0x06,
	UserCodeCapabilitiesReport = 0x07,
	UserCodeKeypadModeSet = 0x08,
	UserCodeKeypadModeGet = 0x09,
	UserCodeKeypadModeReport = 0x0a,
	MasterCodeSet = 0x0e,
	MasterCodeGet = 0x0f,
	MasterCodeReport = 0x10,
	UserCodeChecksumGet = 0x11,
	UserCodeChecksumReport = 0x12,
}

export interface UserCodeV2UserCodeGetData {
	userIdentifier: number; // 1 byte unsigned integer
}

export interface UserCodeV2UserCodeReportData {
	userIdentifier: number; // 1 byte unsigned integer
	userIdStatus: UserIdStatusEnum; // 1 byte enum value
	userCode: string; // automatic length
}

export interface UserCodeV2UserCodeSetData {
	userIdentifier: number; // 1 byte unsigned integer
	userIdStatus: UserIdStatusEnum; // 1 byte enum value
	userCode: string; // automatic length
}

export interface UserCodeV2UsersNumberReportData {
	supportedUsers: number; // 1 byte unsigned integer
	extendedSupportedUsers: number; // 2 byte unsigned integer
}

export interface UserCodeV2ExtendedUserCodeSetData {
	vg1: Array<{ // variable length
		userIdentifier: number; // 2 byte unsigned integer
		userIdStatus: UserIdStatusEnum; // 1 byte enum value
		userCode: Buffer; // variable length
	}>;
}

export interface UserCodeV2ExtendedUserCodeGetData {
	userIdentifier: number; // 2 byte unsigned integer
	reportMore: boolean; // properties1[0]
}

export interface UserCodeV2ExtendedUserCodeReportData {
	nextUserIdentifier: number; // 2 byte unsigned integer
	vg1: Array<{ // variable length
		userIdentifier: number; // 2 byte unsigned integer
		userIdStatus: UserIdStatusEnum; // 1 byte enum value
		userCode: Buffer; // variable length
	}>;
}

export interface UserCodeV2UserCodeCapabilitiesReportData {
	mcSupport: boolean; // properties1[7]
	mcdSupport: boolean; // properties1[6]
	supportedUserIdStatusBitMask: Buffer; // variable length
	uccSupport: boolean; // properties2[7]
	mucrSupport: boolean; // properties2[6]
	mucsSupport: boolean; // properties2[5]
	supportedKeypadModesBitMask: Buffer; // variable length
	supportedKeysBitMask: Buffer; // variable length
}

export interface UserCodeV2UserCodeKeypadModeSetData {
	keypadMode: KeypadModeEnum; // 1 byte enum value
}

export interface UserCodeV2UserCodeKeypadModeReportData {
	keypadMode: KeypadModeEnum; // 1 byte enum value
}

export interface UserCodeV2MasterCodeSetData {
	masterCode: Buffer; // variable length
}

export interface UserCodeV2MasterCodeReportData {
	masterCode: Buffer; // variable length
}

export interface UserCodeV2UserCodeChecksumReportData {
	userCodeChecksum: number; // 2 byte unsigned integer
}

export enum UserIdStatusEnum {
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

export class UserCodeV2 extends CommandClassPacket<UserCodeV2Commands> {
	public static readonly commandClass: number = CommandClasses.UserCode; // 0x63 (99)
	public static readonly version: number = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(UserCodeV2, commandAndPayload);
	}
}

export class UserCodeGet extends CommandPacket<UserCodeV2UserCodeGetData> {
	public static readonly CommandClass: typeof UserCodeV2 = UserCodeV2;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "UserCodeGet",
		"help": "User Code Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "userIdentifier",
				"help": "User Identifier",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(UserCodeV2)?.command === this.command;
	}

	public constructor(data: Buffer | UserCodeV2UserCodeGetData) {
		super(UserCodeGet, data);
	}
};

export class UserCodeReport extends CommandPacket<UserCodeV2UserCodeReportData> {
	public static readonly CommandClass: typeof UserCodeV2 = UserCodeV2;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "UserCodeReport",
		"help": "User Code Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "userIdentifier",
				"help": "User Identifier",
				"length": 1
			},
			{
				"type": "Enum",
				"name": "userIdStatus",
				"help": "User ID Status",
				"length": 1,
				"values": {
					"0": {
						"name": "Available",
						"help": "Available"
					},
					"1": {
						"name": "EnabledGrantAccess",
						"help": "Enabled / Grant Access"
					},
					"2": {
						"name": "Disabled",
						"help": "Disabled"
					},
					"3": {
						"name": "Messaging",
						"help": "Messaging"
					},
					"4": {
						"name": "PassageMode",
						"help": "Passage Mode"
					},
					"254": {
						"name": "StatusNotAvailable",
						"help": "Status not available"
					}
				}
			},
			{
				"type": "Text",
				"name": "userCode",
				"help": "USER_CODE",
				"length": {
					"lengthType": "Auto"
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(UserCodeV2)?.command === this.command;
	}

	public constructor(data: Buffer | UserCodeV2UserCodeReportData) {
		super(UserCodeReport, data);
	}
};

export class UserCodeSet extends CommandPacket<UserCodeV2UserCodeSetData> {
	public static readonly CommandClass: typeof UserCodeV2 = UserCodeV2;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "UserCodeSet",
		"help": "User Code Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "userIdentifier",
				"help": "User Identifier",
				"length": 1
			},
			{
				"type": "Enum",
				"name": "userIdStatus",
				"help": "User ID Status",
				"length": 1,
				"values": {
					"0": {
						"name": "Available",
						"help": "Available"
					},
					"1": {
						"name": "EnabledGrantAccess",
						"help": "Enabled / Grant Access"
					},
					"2": {
						"name": "Disabled",
						"help": "Disabled"
					},
					"3": {
						"name": "Messaging",
						"help": "Messaging"
					},
					"4": {
						"name": "PassageMode",
						"help": "Passage Mode"
					},
					"254": {
						"name": "StatusNotAvailable",
						"help": "Status not available"
					}
				}
			},
			{
				"type": "Text",
				"name": "userCode",
				"help": "USER_CODE",
				"length": {
					"lengthType": "Auto"
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(UserCodeV2)?.command === this.command;
	}

	public constructor(data: Buffer | UserCodeV2UserCodeSetData) {
		super(UserCodeSet, data);
	}
};

export class UsersNumberGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof UserCodeV2 = UserCodeV2;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "UsersNumberGet",
		"help": "Users Number Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(UserCodeV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(UsersNumberGet, data);
	}
};

export class UsersNumberReport extends CommandPacket<UserCodeV2UsersNumberReportData> {
	public static readonly CommandClass: typeof UserCodeV2 = UserCodeV2;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "UsersNumberReport",
		"help": "Users Number Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "supportedUsers",
				"help": "Supported Users",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "extendedSupportedUsers",
				"help": "Extended Supported Users",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(UserCodeV2)?.command === this.command;
	}

	public constructor(data: Buffer | UserCodeV2UsersNumberReportData) {
		super(UsersNumberReport, data);
	}
};

export class ExtendedUserCodeSet extends CommandPacket<UserCodeV2ExtendedUserCodeSetData> {
	public static readonly CommandClass: typeof UserCodeV2 = UserCodeV2;
	public static readonly command: number = 0x0b; // 11
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 11,
		"name": "ExtendedUserCodeSet",
		"help": "Extended User Code Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "numberOfUserCodes",
				"help": "Number of User Codes",
				"length": 1,
				"lengthOf": {
					"refs": [
						"vg1"
					]
				},
				"isAutogenerated": true
			},
			{
				"type": "Group",
				"name": "vg1",
				"help": "vg1",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "numberOfUserCodes"
					}
				},
				"params": [
					{
						"type": "Integer",
						"name": "userIdentifier",
						"help": "User Identifier",
						"length": 2
					},
					{
						"type": "Enum",
						"name": "userIdStatus",
						"help": "User ID Status",
						"length": 1,
						"values": {
							"0": {
								"name": "Available",
								"help": "Available"
							},
							"1": {
								"name": "EnabledGrantAccess",
								"help": "Enabled / Grant Access"
							},
							"2": {
								"name": "Disabled",
								"help": "Disabled"
							},
							"3": {
								"name": "Messaging",
								"help": "Messaging"
							},
							"4": {
								"name": "PassageMode",
								"help": "Passage Mode"
							},
							"254": {
								"name": "StatusNotAvailable",
								"help": "Status not available"
							}
						}
					},
					{
						"type": "Bitfield",
						"name": "properties1",
						"help": "Properties1",
						"length": 1,
						"fields": [
							{
								"fieldType": "Integer",
								"name": "reserved",
								"mask": 240,
								"shift": 4,
								"reserved": true
							},
							{
								"fieldType": "Integer",
								"name": "userCodeLength",
								"mask": 15,
								"shift": 0,
								"lengthOf": {
									"refs": [
										"vg1.userCode"
									]
								},
								"isAutogenerated": true
							}
						]
					},
					{
						"type": "Blob",
						"name": "userCode",
						"help": "User Code",
						"length": {
							"lengthType": "Ref",
							"from": {
								"ref": "vg1.properties1.userCodeLength"
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(UserCodeV2)?.command === this.command;
	}

	public constructor(data: Buffer | UserCodeV2ExtendedUserCodeSetData) {
		super(ExtendedUserCodeSet, data);
	}
};

export class ExtendedUserCodeGet extends CommandPacket<UserCodeV2ExtendedUserCodeGetData> {
	public static readonly CommandClass: typeof UserCodeV2 = UserCodeV2;
	public static readonly command: number = 0x0c; // 12
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 12,
		"name": "ExtendedUserCodeGet",
		"help": "Extended User Code Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "userIdentifier",
				"help": "User Identifier",
				"length": 2
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 254,
						"shift": 1,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "reportMore",
						"mask": 1,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(UserCodeV2)?.command === this.command;
	}

	public constructor(data: Buffer | UserCodeV2ExtendedUserCodeGetData) {
		super(ExtendedUserCodeGet, data);
	}
};

export class ExtendedUserCodeReport extends CommandPacket<UserCodeV2ExtendedUserCodeReportData> {
	public static readonly CommandClass: typeof UserCodeV2 = UserCodeV2;
	public static readonly command: number = 0x0d; // 13
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 13,
		"name": "ExtendedUserCodeReport",
		"help": "Extended User Code Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "numberOfUserCodes",
				"help": "Number of User Codes",
				"length": 1,
				"lengthOf": {
					"refs": [
						"vg1"
					]
				},
				"isAutogenerated": true
			},
			{
				"type": "Integer",
				"name": "nextUserIdentifier",
				"help": "Next User Identifier",
				"length": 2
			},
			{
				"type": "Group",
				"name": "vg1",
				"help": "vg1",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "numberOfUserCodes"
					}
				},
				"params": [
					{
						"type": "Integer",
						"name": "userIdentifier",
						"help": "User Identifier",
						"length": 2
					},
					{
						"type": "Enum",
						"name": "userIdStatus",
						"help": "User ID Status",
						"length": 1,
						"values": {
							"0": {
								"name": "Available",
								"help": "Available"
							},
							"1": {
								"name": "EnabledGrantAccess",
								"help": "Enabled / Grant Access"
							},
							"2": {
								"name": "Disabled",
								"help": "Disabled"
							},
							"3": {
								"name": "Messaging",
								"help": "Messaging"
							},
							"4": {
								"name": "PassageMode",
								"help": "Passage Mode"
							},
							"254": {
								"name": "StatusNotAvailable",
								"help": "Status not available"
							}
						}
					},
					{
						"type": "Bitfield",
						"name": "properties1",
						"help": "Properties1",
						"length": 1,
						"fields": [
							{
								"fieldType": "Integer",
								"name": "reserved",
								"mask": 240,
								"shift": 4,
								"reserved": true
							},
							{
								"fieldType": "Integer",
								"name": "userCodeLength",
								"mask": 15,
								"shift": 0,
								"lengthOf": {
									"refs": [
										"vg1.userCode"
									]
								},
								"isAutogenerated": true
							}
						]
					},
					{
						"type": "Blob",
						"name": "userCode",
						"help": "User Code",
						"length": {
							"lengthType": "Ref",
							"from": {
								"ref": "vg1.properties1.userCodeLength"
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(UserCodeV2)?.command === this.command;
	}

	public constructor(data: Buffer | UserCodeV2ExtendedUserCodeReportData) {
		super(ExtendedUserCodeReport, data);
	}
};

export class UserCodeCapabilitiesGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof UserCodeV2 = UserCodeV2;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 6,
		"name": "UserCodeCapabilitiesGet",
		"help": "User Code Capabilities Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(UserCodeV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(UserCodeCapabilitiesGet, data);
	}
};

export class UserCodeCapabilitiesReport extends CommandPacket<UserCodeV2UserCodeCapabilitiesReportData> {
	public static readonly CommandClass: typeof UserCodeV2 = UserCodeV2;
	public static readonly command: number = 0x07; // 7
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 7,
		"name": "UserCodeCapabilitiesReport",
		"help": "User Code Capabilities Report",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "mcSupport",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Boolean",
						"name": "mcdSupport",
						"mask": 64,
						"shift": 6
					},
					{
						"fieldType": "Boolean",
						"name": "reserved",
						"mask": 32,
						"shift": 5,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "supportedUserIdStatusBitMaskLength",
						"mask": 31,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"supportedUserIdStatusBitMask"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "supportedUserIdStatusBitMask",
				"help": "Supported User ID Status Bit Mask",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.supportedUserIdStatusBitMaskLength"
					}
				}
			},
			{
				"type": "Bitfield",
				"name": "properties2",
				"help": "Properties2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "uccSupport",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Boolean",
						"name": "mucrSupport",
						"mask": 64,
						"shift": 6
					},
					{
						"fieldType": "Boolean",
						"name": "mucsSupport",
						"mask": 32,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "supportedKeypadModesBitMaskLength",
						"mask": 31,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"supportedKeypadModesBitMask"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "supportedKeypadModesBitMask",
				"help": "Supported Keypad Modes Bit Mask",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties2.supportedKeypadModesBitMaskLength"
					}
				}
			},
			{
				"type": "Bitfield",
				"name": "properties3",
				"help": "Properties3",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 240,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "supportedKeysBitMaskLength",
						"mask": 15,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"supportedKeysBitMask"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "supportedKeysBitMask",
				"help": "Supported Keys Bit Mask",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties3.supportedKeysBitMaskLength"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(UserCodeV2)?.command === this.command;
	}

	public constructor(data: Buffer | UserCodeV2UserCodeCapabilitiesReportData) {
		super(UserCodeCapabilitiesReport, data);
	}
};

export class UserCodeKeypadModeSet extends CommandPacket<UserCodeV2UserCodeKeypadModeSetData> {
	public static readonly CommandClass: typeof UserCodeV2 = UserCodeV2;
	public static readonly command: number = 0x08; // 8
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 8,
		"name": "UserCodeKeypadModeSet",
		"help": "User Code Keypad Mode Set",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "keypadMode",
				"help": "Keypad Mode",
				"length": 1,
				"values": {
					"0": {
						"name": "NormalMode",
						"help": "Normal mode"
					},
					"1": {
						"name": "VacationMode",
						"help": "Vacation mode"
					},
					"2": {
						"name": "PrivacyMode",
						"help": "Privacy mode"
					},
					"3": {
						"name": "LockedOutMode",
						"help": "Locked Out mode"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(UserCodeV2)?.command === this.command;
	}

	public constructor(data: Buffer | UserCodeV2UserCodeKeypadModeSetData) {
		super(UserCodeKeypadModeSet, data);
	}
};

export class UserCodeKeypadModeGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof UserCodeV2 = UserCodeV2;
	public static readonly command: number = 0x09; // 9
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 9,
		"name": "UserCodeKeypadModeGet",
		"help": "User Code Keypad Mode Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(UserCodeV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(UserCodeKeypadModeGet, data);
	}
};

export class UserCodeKeypadModeReport extends CommandPacket<UserCodeV2UserCodeKeypadModeReportData> {
	public static readonly CommandClass: typeof UserCodeV2 = UserCodeV2;
	public static readonly command: number = 0x0a; // 10
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 10,
		"name": "UserCodeKeypadModeReport",
		"help": "User Code Keypad Mode Report",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "keypadMode",
				"help": "Keypad Mode",
				"length": 1,
				"values": {
					"0": {
						"name": "NormalMode",
						"help": "Normal mode"
					},
					"1": {
						"name": "VacationMode",
						"help": "Vacation mode"
					},
					"2": {
						"name": "PrivacyMode",
						"help": "Privacy mode"
					},
					"3": {
						"name": "LockedOutMode",
						"help": "Locked Out mode"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(UserCodeV2)?.command === this.command;
	}

	public constructor(data: Buffer | UserCodeV2UserCodeKeypadModeReportData) {
		super(UserCodeKeypadModeReport, data);
	}
};

export class MasterCodeSet extends CommandPacket<UserCodeV2MasterCodeSetData> {
	public static readonly CommandClass: typeof UserCodeV2 = UserCodeV2;
	public static readonly command: number = 0x0e; // 14
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 14,
		"name": "MasterCodeSet",
		"help": "Master Code Set",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 240,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "masterCodeLength",
						"mask": 15,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"masterCode"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "masterCode",
				"help": "Master Code",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.masterCodeLength"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(UserCodeV2)?.command === this.command;
	}

	public constructor(data: Buffer | UserCodeV2MasterCodeSetData) {
		super(MasterCodeSet, data);
	}
};

export class MasterCodeGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof UserCodeV2 = UserCodeV2;
	public static readonly command: number = 0x0f; // 15
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 15,
		"name": "MasterCodeGet",
		"help": "Master Code Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(UserCodeV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(MasterCodeGet, data);
	}
};

export class MasterCodeReport extends CommandPacket<UserCodeV2MasterCodeReportData> {
	public static readonly CommandClass: typeof UserCodeV2 = UserCodeV2;
	public static readonly command: number = 0x10; // 16
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 16,
		"name": "MasterCodeReport",
		"help": "Master Code Report",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 240,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "masterCodeLength",
						"mask": 15,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"masterCode"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "masterCode",
				"help": "Master Code",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.masterCodeLength"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(UserCodeV2)?.command === this.command;
	}

	public constructor(data: Buffer | UserCodeV2MasterCodeReportData) {
		super(MasterCodeReport, data);
	}
};

export class UserCodeChecksumGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof UserCodeV2 = UserCodeV2;
	public static readonly command: number = 0x11; // 17
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 17,
		"name": "UserCodeChecksumGet",
		"help": "User Code Checksum Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(UserCodeV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(UserCodeChecksumGet, data);
	}
};

export class UserCodeChecksumReport extends CommandPacket<UserCodeV2UserCodeChecksumReportData> {
	public static readonly CommandClass: typeof UserCodeV2 = UserCodeV2;
	public static readonly command: number = 0x12; // 18
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 18,
		"name": "UserCodeChecksumReport",
		"help": "User Code Checksum Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "userCodeChecksum",
				"help": "User Code Checksum",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(UserCodeV2)?.command === this.command;
	}

	public constructor(data: Buffer | UserCodeV2UserCodeChecksumReportData) {
		super(UserCodeChecksumReport, data);
	}
};
