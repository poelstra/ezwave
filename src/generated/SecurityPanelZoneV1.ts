/**
 * Command Class Security Panel Zone, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum SecurityPanelZoneV1Commands {
	SecurityPanelZoneNumberSupportedGet = 0x01,
	SecurityPanelZoneStateGet = 0x05,
	SecurityPanelZoneStateReport = 0x06,
	SecurityPanelZoneSupportedReport = 0x02,
	SecurityPanelZoneTypeGet = 0x03,
	SecurityPanelZoneTypeReport = 0x04,
}

export interface SecurityPanelZoneV1SecurityPanelZoneStateGetData {
	zoneNumber: number; // 1 byte unsigned integer
}

export interface SecurityPanelZoneV1SecurityPanelZoneStateReportData {
	zoneNumber: number; // 1 byte unsigned integer
	zoneState: number; // 1 byte unsigned integer
}

export interface SecurityPanelZoneV1SecurityPanelZoneSupportedReportData {
	zm: boolean; // parameters1[7]
	zonesSupported: number; // parameters1[6..0]
}

export interface SecurityPanelZoneV1SecurityPanelZoneTypeGetData {
	zoneNumber: number; // 1 byte unsigned integer
}

export interface SecurityPanelZoneV1SecurityPanelZoneTypeReportData {
	zoneNumber: number; // 1 byte unsigned integer
	zoneType: number; // 1 byte unsigned integer
}

export class SecurityPanelZoneV1 extends CommandClassPacket<SecurityPanelZoneV1Commands> {
	public static readonly commandClass = CommandClasses.SecurityPanelZone; // 0x2e (46)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SecurityPanelZoneV1, commandAndPayload);
	}

	public static readonly SecurityPanelZoneNumberSupportedGet = class SecurityPanelZoneNumberSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = SecurityPanelZoneV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "SecurityPanelZoneNumberSupportedGet",
			"help": "Security Panel Zone Number Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityPanelZoneV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SecurityPanelZoneNumberSupportedGet, data);
		}
	};

	public static readonly SecurityPanelZoneStateGet = class SecurityPanelZoneStateGet extends CommandPacket<SecurityPanelZoneV1SecurityPanelZoneStateGetData> {
		public static readonly CommandClass = SecurityPanelZoneV1;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "SecurityPanelZoneStateGet",
			"help": "Security Panel Zone State Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "zoneNumber",
					"help": "Zone Number",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityPanelZoneV1)?.command === this.command;
		}

		constructor(data: Buffer | SecurityPanelZoneV1SecurityPanelZoneStateGetData) {
			super(SecurityPanelZoneStateGet, data);
		}
	};

	public static readonly SecurityPanelZoneStateReport = class SecurityPanelZoneStateReport extends CommandPacket<SecurityPanelZoneV1SecurityPanelZoneStateReportData> {
		public static readonly CommandClass = SecurityPanelZoneV1;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "SecurityPanelZoneStateReport",
			"help": "Security Panel Zone State Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "zoneNumber",
					"help": "Zone number",
					"length": 1
				},
				{
					"type": "integer",
					"name": "zoneState",
					"help": "Zone State",
					"length": 1,
					"values": {
						"0": {
							"name": "Faulted",
							"help": "Faulted"
						},
						"1": {
							"name": "NotFaulted",
							"help": "Not-Faulted"
						},
						"2": {
							"name": "BypassFaulted",
							"help": "Bypass Faulted"
						},
						"3": {
							"name": "BypassNotFaulted",
							"help": "Bypass Not-Faulted"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityPanelZoneV1)?.command === this.command;
		}

		constructor(data: Buffer | SecurityPanelZoneV1SecurityPanelZoneStateReportData) {
			super(SecurityPanelZoneStateReport, data);
		}
	};

	public static readonly SecurityPanelZoneSupportedReport = class SecurityPanelZoneSupportedReport extends CommandPacket<SecurityPanelZoneV1SecurityPanelZoneSupportedReportData> {
		public static readonly CommandClass = SecurityPanelZoneV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "SecurityPanelZoneSupportedReport",
			"help": "Security Panel Zone Supported Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "parameters1",
					"help": "Parameters1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "zm",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "zonesSupported",
							"mask": 127,
							"shift": 0
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityPanelZoneV1)?.command === this.command;
		}

		constructor(data: Buffer | SecurityPanelZoneV1SecurityPanelZoneSupportedReportData) {
			super(SecurityPanelZoneSupportedReport, data);
		}
	};

	public static readonly SecurityPanelZoneTypeGet = class SecurityPanelZoneTypeGet extends CommandPacket<SecurityPanelZoneV1SecurityPanelZoneTypeGetData> {
		public static readonly CommandClass = SecurityPanelZoneV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "SecurityPanelZoneTypeGet",
			"help": "Security Panel Zone Type Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "zoneNumber",
					"help": "Zone Number",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityPanelZoneV1)?.command === this.command;
		}

		constructor(data: Buffer | SecurityPanelZoneV1SecurityPanelZoneTypeGetData) {
			super(SecurityPanelZoneTypeGet, data);
		}
	};

	public static readonly SecurityPanelZoneTypeReport = class SecurityPanelZoneTypeReport extends CommandPacket<SecurityPanelZoneV1SecurityPanelZoneTypeReportData> {
		public static readonly CommandClass = SecurityPanelZoneV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "SecurityPanelZoneTypeReport",
			"help": "Security Panel Zone Type Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "zoneNumber",
					"help": "Zone Number",
					"length": 1
				},
				{
					"type": "integer",
					"name": "zoneType",
					"help": "Zone Type",
					"length": 1,
					"values": {
						"1": {
							"name": "AlarmZone",
							"help": "Alarm Zone"
						},
						"2": {
							"name": "NotificationZone",
							"help": "Notification Zone"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityPanelZoneV1)?.command === this.command;
		}

		constructor(data: Buffer | SecurityPanelZoneV1SecurityPanelZoneTypeReportData) {
			super(SecurityPanelZoneTypeReport, data);
		}
	};
}

export namespace SecurityPanelZoneV1 {
	export type SecurityPanelZoneNumberSupportedGet = InstanceType<typeof SecurityPanelZoneV1.SecurityPanelZoneNumberSupportedGet>;
	export type SecurityPanelZoneStateGet = InstanceType<typeof SecurityPanelZoneV1.SecurityPanelZoneStateGet>;
	export type SecurityPanelZoneStateReport = InstanceType<typeof SecurityPanelZoneV1.SecurityPanelZoneStateReport>;
	export type SecurityPanelZoneSupportedReport = InstanceType<typeof SecurityPanelZoneV1.SecurityPanelZoneSupportedReport>;
	export type SecurityPanelZoneTypeGet = InstanceType<typeof SecurityPanelZoneV1.SecurityPanelZoneTypeGet>;
	export type SecurityPanelZoneTypeReport = InstanceType<typeof SecurityPanelZoneV1.SecurityPanelZoneTypeReport>;
}
