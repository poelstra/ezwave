/**
 * Command Class User Code, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandClasses, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum UserCodeV1Commands {
	UserCodeGet = 0x02,
	UserCodeReport = 0x03,
	UserCodeSet = 0x01,
	UsersNumberGet = 0x04,
	UsersNumberReport = 0x05,
}

export interface UserCodeV1UserCodeGetData {
	userIdentifier: number; // 1 byte unsigned integer
}

export interface UserCodeV1UserCodeReportData {
	userIdentifier: number; // 1 byte unsigned integer
	userIdStatus: UserIdStatusEnum; // 1 byte enum value
	userCode: string; // automatic length
}

export interface UserCodeV1UserCodeSetData {
	userIdentifier: number; // 1 byte unsigned integer
	userIdStatus: UserIdStatusEnum; // 1 byte enum value
	userCode: string; // automatic length
}

export interface UserCodeV1UsersNumberReportData {
	supportedUsers: number; // 1 byte unsigned integer
}

export enum UserIdStatusEnum {
	AvailableNotSet = 0x0,
	Occupied = 0x1,
	ReservedByAdministrator = 0x2,
	StatusNotAvailable = 0xfe,
}

export class UserCodeV1 extends CommandClassPacket<UserCodeV1Commands> {
	public static readonly commandClass = CommandClasses.UserCode; // 0x63 (99)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(UserCodeV1, commandAndPayload);
	}

	public static readonly UserCodeGet = class UserCodeGet extends CommandPacket<UserCodeV1UserCodeGetData> {
		public static readonly CommandClass = UserCodeV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
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

		static matches(packet: Packet): boolean {
			return packet.tryAs(UserCodeV1)?.command === this.command;
		}

		constructor(data: Buffer | UserCodeV1UserCodeGetData) {
			super(UserCodeGet, data);
		}
	};

	public static readonly UserCodeReport = class UserCodeReport extends CommandPacket<UserCodeV1UserCodeReportData> {
		public static readonly CommandClass = UserCodeV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
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
							"name": "AvailableNotSet",
							"help": "Available (not set)"
						},
						"1": {
							"name": "Occupied",
							"help": "Occupied"
						},
						"2": {
							"name": "ReservedByAdministrator",
							"help": "Reserved by administrator"
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

		static matches(packet: Packet): boolean {
			return packet.tryAs(UserCodeV1)?.command === this.command;
		}

		constructor(data: Buffer | UserCodeV1UserCodeReportData) {
			super(UserCodeReport, data);
		}
	};

	public static readonly UserCodeSet = class UserCodeSet extends CommandPacket<UserCodeV1UserCodeSetData> {
		public static readonly CommandClass = UserCodeV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
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
							"name": "AvailableNotSet",
							"help": "Available (not set)"
						},
						"1": {
							"name": "Occupied",
							"help": "Occupied"
						},
						"2": {
							"name": "ReservedByAdministrator",
							"help": "Reserved by administrator"
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

		static matches(packet: Packet): boolean {
			return packet.tryAs(UserCodeV1)?.command === this.command;
		}

		constructor(data: Buffer | UserCodeV1UserCodeSetData) {
			super(UserCodeSet, data);
		}
	};

	public static readonly UsersNumberGet = class UsersNumberGet extends CommandPacket<void> {
		public static readonly CommandClass = UserCodeV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "UsersNumberGet",
			"help": "Users Number Get",
			"status": "Active",
			"params": []
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(UserCodeV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(UsersNumberGet, data);
		}
	};

	public static readonly UsersNumberReport = class UsersNumberReport extends CommandPacket<UserCodeV1UsersNumberReportData> {
		public static readonly CommandClass = UserCodeV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
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
				}
			]
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(UserCodeV1)?.command === this.command;
		}

		constructor(data: Buffer | UserCodeV1UsersNumberReportData) {
			super(UsersNumberReport, data);
		}
	};
}

export namespace UserCodeV1 {
	export type UserCodeGet = InstanceType<typeof UserCodeV1.UserCodeGet>;
	export type UserCodeReport = InstanceType<typeof UserCodeV1.UserCodeReport>;
	export type UserCodeSet = InstanceType<typeof UserCodeV1.UserCodeSet>;
	export type UsersNumberGet = InstanceType<typeof UserCodeV1.UsersNumberGet>;
	export type UsersNumberReport = InstanceType<typeof UserCodeV1.UsersNumberReport>;
}
