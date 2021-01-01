/**
 * Command Class User Code, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

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
	userIDStatus: UserIDStatusEnum; // 1 byte enum value
	// TODO param userCode type text
}

export interface UserCodeV2UserCodeSetData {
	userIdentifier: number; // 1 byte unsigned integer
	userIDStatus: UserIDStatusEnum; // 1 byte enum value
	// TODO param userCode type text
}

export interface UserCodeV2UsersNumberReportData {
	supportedUsers: number; // 1 byte unsigned integer
	extendedSupportedUsers: number; // 2 byte unsigned integer
}

export interface UserCodeV2ExtendedUserCodeSetData {
	numberOfUserCodes: number; // 1 byte unsigned integer
	// TODO param vg1 type group
}

export interface UserCodeV2ExtendedUserCodeGetData {
	userIdentifier: number; // 2 byte unsigned integer
	reportMore: boolean; // properties1[0]
}

export interface UserCodeV2ExtendedUserCodeReportData {
	numberOfUserCodes: number; // 1 byte unsigned integer
	nextUserIdentifier: number; // 2 byte unsigned integer
	// TODO param vg1 type group
}

export interface UserCodeV2UserCodeCapabilitiesReportData {
	mCSupport: boolean; // properties1[7]
	mCDSupport: boolean; // properties1[6]
	supportedUserIDStatusBitMaskLength: number; // properties1[4..0]
	// TODO param supportedUserIDStatusBitMask type blob
	uCCSupport: boolean; // properties2[7]
	mUCRSupport: boolean; // properties2[6]
	mUCSSupport: boolean; // properties2[5]
	supportedKeypadModesBitMaskLength: number; // properties2[4..0]
	// TODO param supportedKeypadModesBitMask type blob
	supportedKeysBitMaskLength: number; // properties3[3..0]
	// TODO param supportedKeysBitMask type blob
}

export interface UserCodeV2UserCodeKeypadModeSetData {
	keypadMode: KeypadModeEnum; // 1 byte enum value
}

export interface UserCodeV2UserCodeKeypadModeReportData {
	keypadMode: KeypadModeEnum; // 1 byte enum value
}

export interface UserCodeV2MasterCodeSetData {
	masterCodeLength: number; // properties1[3..0]
	// TODO param masterCode type blob
}

export interface UserCodeV2MasterCodeReportData {
	masterCodeLength: number; // properties1[3..0]
	// TODO param masterCode type blob
}

export interface UserCodeV2UserCodeChecksumReportData {
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

export class UserCodeV2 extends CommandClassPacket<UserCodeV2Commands> {
	public static readonly commandClass = CommandClasses.UserCode; // 0x63 (99)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(UserCodeV2, commandAndPayload);
	}

	public static readonly UserCodeGet = class UserCodeGet extends CommandPacket<UserCodeV2UserCodeGetData> {
		public static readonly CommandClass = UserCodeV2;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "UserCodeGet",
			"help": "User Code Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "userIdentifier",
					"help": "User Identifier",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(UserCodeV2)?.command === this.command;
		}

		constructor(data: Buffer | UserCodeV2UserCodeGetData) {
			super(UserCodeGet, data);
		}
	};

	public static readonly UserCodeReport = class UserCodeReport extends CommandPacket<UserCodeV2UserCodeReportData> {
		public static readonly CommandClass = UserCodeV2;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "UserCodeReport",
			"help": "User Code Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "userIdentifier",
					"help": "User Identifier",
					"length": 1
				},
				{
					"type": "enum",
					"name": "userIDStatus",
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
					"type": "text",
					"name": "userCode",
					"help": "USER_CODE",
					"length": "auto"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(UserCodeV2)?.command === this.command;
		}

		constructor(data: Buffer | UserCodeV2UserCodeReportData) {
			super(UserCodeReport, data);
		}
	};

	public static readonly UserCodeSet = class UserCodeSet extends CommandPacket<UserCodeV2UserCodeSetData> {
		public static readonly CommandClass = UserCodeV2;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "UserCodeSet",
			"help": "User Code Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "userIdentifier",
					"help": "User Identifier",
					"length": 1
				},
				{
					"type": "enum",
					"name": "userIDStatus",
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
					"type": "text",
					"name": "userCode",
					"help": "USER_CODE",
					"length": "auto"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(UserCodeV2)?.command === this.command;
		}

		constructor(data: Buffer | UserCodeV2UserCodeSetData) {
			super(UserCodeSet, data);
		}
	};

	public static readonly UsersNumberGet = class UsersNumberGet extends CommandPacket<void> {
		public static readonly CommandClass = UserCodeV2;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "UsersNumberGet",
			"help": "Users Number Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(UserCodeV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(UsersNumberGet, data);
		}
	};

	public static readonly UsersNumberReport = class UsersNumberReport extends CommandPacket<UserCodeV2UsersNumberReportData> {
		public static readonly CommandClass = UserCodeV2;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "UsersNumberReport",
			"help": "Users Number Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "supportedUsers",
					"help": "Supported Users",
					"length": 1
				},
				{
					"type": "integer",
					"name": "extendedSupportedUsers",
					"help": "Extended Supported Users",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(UserCodeV2)?.command === this.command;
		}

		constructor(data: Buffer | UserCodeV2UsersNumberReportData) {
			super(UsersNumberReport, data);
		}
	};

	public static readonly ExtendedUserCodeSet = class ExtendedUserCodeSet extends CommandPacket<UserCodeV2ExtendedUserCodeSetData> {
		public static readonly CommandClass = UserCodeV2;
		public static readonly command = 0x0b;
		public static readonly definition = {
			"command": 11,
			"name": "ExtendedUserCodeSet",
			"help": "Extended User Code Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "numberOfUserCodes",
					"help": "Number of User Codes",
					"length": 1
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"ref": "numberOfUserCodes"
					},
					"params": [
						{
							"type": "integer",
							"name": "userIdentifier",
							"help": "User Identifier",
							"length": 2
						},
						{
							"type": "enum",
							"name": "userIDStatus",
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
							"type": "bitfield",
							"name": "properties1",
							"help": "Properties1",
							"length": 1,
							"fields": [
								{
									"type": "integer",
									"name": "userCodeLength",
									"mask": 15,
									"shift": 0
								},
								{
									"type": "integer",
									"name": "reserved",
									"mask": 240,
									"shift": 4,
									"reserved": true
								}
							]
						},
						{
							"type": "blob",
							"name": "userCode",
							"help": "User Code",
							"length": {
								"ref": "properties1",
								"bitfield": {
									"mask": 15,
									"shift": 0,
									"name": "userCodeLength"
								}
							}
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(UserCodeV2)?.command === this.command;
		}

		constructor(data: Buffer | UserCodeV2ExtendedUserCodeSetData) {
			super(ExtendedUserCodeSet, data);
		}
	};

	public static readonly ExtendedUserCodeGet = class ExtendedUserCodeGet extends CommandPacket<UserCodeV2ExtendedUserCodeGetData> {
		public static readonly CommandClass = UserCodeV2;
		public static readonly command = 0x0c;
		public static readonly definition = {
			"command": 12,
			"name": "ExtendedUserCodeGet",
			"help": "Extended User Code Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "userIdentifier",
					"help": "User Identifier",
					"length": 2
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved",
							"mask": 254,
							"shift": 1,
							"reserved": true
						},
						{
							"type": "boolean",
							"name": "reportMore",
							"mask": 1,
							"shift": 0
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(UserCodeV2)?.command === this.command;
		}

		constructor(data: Buffer | UserCodeV2ExtendedUserCodeGetData) {
			super(ExtendedUserCodeGet, data);
		}
	};

	public static readonly ExtendedUserCodeReport = class ExtendedUserCodeReport extends CommandPacket<UserCodeV2ExtendedUserCodeReportData> {
		public static readonly CommandClass = UserCodeV2;
		public static readonly command = 0x0d;
		public static readonly definition = {
			"command": 13,
			"name": "ExtendedUserCodeReport",
			"help": "Extended User Code Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "numberOfUserCodes",
					"help": "Number of User Codes",
					"length": 1
				},
				{
					"type": "integer",
					"name": "nextUserIdentifier",
					"help": "Next User Identifier",
					"length": 2
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"optional": {
						"ref": "numberOfUserCodes"
					},
					"length": "auto",
					"params": [
						{
							"type": "integer",
							"name": "userIdentifier",
							"help": "User Identifier",
							"length": 2
						},
						{
							"type": "enum",
							"name": "userIDStatus",
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
							"type": "bitfield",
							"name": "properties1",
							"help": "Properties1",
							"length": 1,
							"fields": [
								{
									"type": "integer",
									"name": "userCodeLength",
									"mask": 15,
									"shift": 0
								},
								{
									"type": "integer",
									"name": "reserved",
									"mask": 240,
									"shift": 4,
									"reserved": true
								}
							]
						},
						{
							"type": "blob",
							"name": "userCode",
							"help": "User Code",
							"length": {
								"ref": "properties1",
								"bitfield": {
									"mask": 15,
									"shift": 0,
									"name": "userCodeLength"
								}
							}
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(UserCodeV2)?.command === this.command;
		}

		constructor(data: Buffer | UserCodeV2ExtendedUserCodeReportData) {
			super(ExtendedUserCodeReport, data);
		}
	};

	public static readonly UserCodeCapabilitiesGet = class UserCodeCapabilitiesGet extends CommandPacket<void> {
		public static readonly CommandClass = UserCodeV2;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "UserCodeCapabilitiesGet",
			"help": "User Code Capabilities Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(UserCodeV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(UserCodeCapabilitiesGet, data);
		}
	};

	public static readonly UserCodeCapabilitiesReport = class UserCodeCapabilitiesReport extends CommandPacket<UserCodeV2UserCodeCapabilitiesReportData> {
		public static readonly CommandClass = UserCodeV2;
		public static readonly command = 0x07;
		public static readonly definition = {
			"command": 7,
			"name": "UserCodeCapabilitiesReport",
			"help": "User Code Capabilities Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "mCSupport",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "boolean",
							"name": "mCDSupport",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "boolean",
							"name": "reserved",
							"mask": 32,
							"shift": 5,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "supportedUserIDStatusBitMaskLength",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "blob",
					"name": "supportedUserIDStatusBitMask",
					"help": "Supported User ID Status Bit Mask",
					"length": {
						"ref": "properties1",
						"bitfield": {
							"mask": 31,
							"shift": 0,
							"name": "supportedUserIDStatusBitMaskLength"
						}
					}
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "uCCSupport",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "boolean",
							"name": "mUCRSupport",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "boolean",
							"name": "mUCSSupport",
							"mask": 32,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "supportedKeypadModesBitMaskLength",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "blob",
					"name": "supportedKeypadModesBitMask",
					"help": "Supported Keypad Modes Bit Mask",
					"length": {
						"ref": "properties2",
						"bitfield": {
							"mask": 31,
							"shift": 0,
							"name": "supportedKeypadModesBitMaskLength"
						}
					}
				},
				{
					"type": "bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "supportedKeysBitMaskLength",
							"mask": 15,
							"shift": 0
						}
					]
				},
				{
					"type": "blob",
					"name": "supportedKeysBitMask",
					"help": "Supported Keys Bit Mask",
					"length": {
						"ref": "properties3",
						"bitfield": {
							"mask": 15,
							"shift": 0,
							"name": "supportedKeysBitMaskLength"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(UserCodeV2)?.command === this.command;
		}

		constructor(data: Buffer | UserCodeV2UserCodeCapabilitiesReportData) {
			super(UserCodeCapabilitiesReport, data);
		}
	};

	public static readonly UserCodeKeypadModeSet = class UserCodeKeypadModeSet extends CommandPacket<UserCodeV2UserCodeKeypadModeSetData> {
		public static readonly CommandClass = UserCodeV2;
		public static readonly command = 0x08;
		public static readonly definition = {
			"command": 8,
			"name": "UserCodeKeypadModeSet",
			"help": "User Code Keypad Mode Set",
			"status": "active",
			"params": [
				{
					"type": "enum",
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
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(UserCodeV2)?.command === this.command;
		}

		constructor(data: Buffer | UserCodeV2UserCodeKeypadModeSetData) {
			super(UserCodeKeypadModeSet, data);
		}
	};

	public static readonly UserCodeKeypadModeGet = class UserCodeKeypadModeGet extends CommandPacket<void> {
		public static readonly CommandClass = UserCodeV2;
		public static readonly command = 0x09;
		public static readonly definition = {
			"command": 9,
			"name": "UserCodeKeypadModeGet",
			"help": "User Code Keypad Mode Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(UserCodeV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(UserCodeKeypadModeGet, data);
		}
	};

	public static readonly UserCodeKeypadModeReport = class UserCodeKeypadModeReport extends CommandPacket<UserCodeV2UserCodeKeypadModeReportData> {
		public static readonly CommandClass = UserCodeV2;
		public static readonly command = 0x0a;
		public static readonly definition = {
			"command": 10,
			"name": "UserCodeKeypadModeReport",
			"help": "User Code Keypad Mode Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
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
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(UserCodeV2)?.command === this.command;
		}

		constructor(data: Buffer | UserCodeV2UserCodeKeypadModeReportData) {
			super(UserCodeKeypadModeReport, data);
		}
	};

	public static readonly MasterCodeSet = class MasterCodeSet extends CommandPacket<UserCodeV2MasterCodeSetData> {
		public static readonly CommandClass = UserCodeV2;
		public static readonly command = 0x0e;
		public static readonly definition = {
			"command": 14,
			"name": "MasterCodeSet",
			"help": "Master Code Set",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "masterCodeLength",
							"mask": 15,
							"shift": 0
						}
					]
				},
				{
					"type": "blob",
					"name": "masterCode",
					"help": "Master Code",
					"length": {
						"ref": "properties1",
						"bitfield": {
							"mask": 15,
							"shift": 0,
							"name": "masterCodeLength"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(UserCodeV2)?.command === this.command;
		}

		constructor(data: Buffer | UserCodeV2MasterCodeSetData) {
			super(MasterCodeSet, data);
		}
	};

	public static readonly MasterCodeGet = class MasterCodeGet extends CommandPacket<void> {
		public static readonly CommandClass = UserCodeV2;
		public static readonly command = 0x0f;
		public static readonly definition = {
			"command": 15,
			"name": "MasterCodeGet",
			"help": "Master Code Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(UserCodeV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(MasterCodeGet, data);
		}
	};

	public static readonly MasterCodeReport = class MasterCodeReport extends CommandPacket<UserCodeV2MasterCodeReportData> {
		public static readonly CommandClass = UserCodeV2;
		public static readonly command = 0x10;
		public static readonly definition = {
			"command": 16,
			"name": "MasterCodeReport",
			"help": "Master Code Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "masterCodeLength",
							"mask": 15,
							"shift": 0
						}
					]
				},
				{
					"type": "blob",
					"name": "masterCode",
					"help": "Master Code",
					"length": {
						"ref": "properties1",
						"bitfield": {
							"mask": 15,
							"shift": 0,
							"name": "masterCodeLength"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(UserCodeV2)?.command === this.command;
		}

		constructor(data: Buffer | UserCodeV2MasterCodeReportData) {
			super(MasterCodeReport, data);
		}
	};

	public static readonly UserCodeChecksumGet = class UserCodeChecksumGet extends CommandPacket<void> {
		public static readonly CommandClass = UserCodeV2;
		public static readonly command = 0x11;
		public static readonly definition = {
			"command": 17,
			"name": "UserCodeChecksumGet",
			"help": "User Code Checksum Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(UserCodeV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(UserCodeChecksumGet, data);
		}
	};

	public static readonly UserCodeChecksumReport = class UserCodeChecksumReport extends CommandPacket<UserCodeV2UserCodeChecksumReportData> {
		public static readonly CommandClass = UserCodeV2;
		public static readonly command = 0x12;
		public static readonly definition = {
			"command": 18,
			"name": "UserCodeChecksumReport",
			"help": "User Code Checksum Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "userCodeChecksum",
					"help": "User Code Checksum",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(UserCodeV2)?.command === this.command;
		}

		constructor(data: Buffer | UserCodeV2UserCodeChecksumReportData) {
			super(UserCodeChecksumReport, data);
		}
	};
}

export namespace UserCodeV2 {
	export type UserCodeGet = InstanceType<typeof UserCodeV2.UserCodeGet>;
	export type UserCodeReport = InstanceType<typeof UserCodeV2.UserCodeReport>;
	export type UserCodeSet = InstanceType<typeof UserCodeV2.UserCodeSet>;
	export type UsersNumberGet = InstanceType<typeof UserCodeV2.UsersNumberGet>;
	export type UsersNumberReport = InstanceType<typeof UserCodeV2.UsersNumberReport>;
	export type ExtendedUserCodeSet = InstanceType<typeof UserCodeV2.ExtendedUserCodeSet>;
	export type ExtendedUserCodeGet = InstanceType<typeof UserCodeV2.ExtendedUserCodeGet>;
	export type ExtendedUserCodeReport = InstanceType<typeof UserCodeV2.ExtendedUserCodeReport>;
	export type UserCodeCapabilitiesGet = InstanceType<typeof UserCodeV2.UserCodeCapabilitiesGet>;
	export type UserCodeCapabilitiesReport = InstanceType<typeof UserCodeV2.UserCodeCapabilitiesReport>;
	export type UserCodeKeypadModeSet = InstanceType<typeof UserCodeV2.UserCodeKeypadModeSet>;
	export type UserCodeKeypadModeGet = InstanceType<typeof UserCodeV2.UserCodeKeypadModeGet>;
	export type UserCodeKeypadModeReport = InstanceType<typeof UserCodeV2.UserCodeKeypadModeReport>;
	export type MasterCodeSet = InstanceType<typeof UserCodeV2.MasterCodeSet>;
	export type MasterCodeGet = InstanceType<typeof UserCodeV2.MasterCodeGet>;
	export type MasterCodeReport = InstanceType<typeof UserCodeV2.MasterCodeReport>;
	export type UserCodeChecksumGet = InstanceType<typeof UserCodeV2.UserCodeChecksumGet>;
	export type UserCodeChecksumReport = InstanceType<typeof UserCodeV2.UserCodeChecksumReport>;
}
