/**
 * Command Class Security Panel Zone, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	public static readonly commandClass: number = CommandClasses.SecurityPanelZone; // 0x2e (46)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(SecurityPanelZoneV1, commandAndPayload);
	}
}

export class SecurityPanelZoneNumberSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof SecurityPanelZoneV1 = SecurityPanelZoneV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "SecurityPanelZoneNumberSupportedGet",
		"help": "Security Panel Zone Number Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SecurityPanelZoneV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(SecurityPanelZoneNumberSupportedGet, data);
	}
};

export class SecurityPanelZoneStateGet extends CommandPacket<SecurityPanelZoneV1SecurityPanelZoneStateGetData> {
	public static readonly CommandClass: typeof SecurityPanelZoneV1 = SecurityPanelZoneV1;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "SecurityPanelZoneStateGet",
		"help": "Security Panel Zone State Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "zoneNumber",
				"help": "Zone Number",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SecurityPanelZoneV1)?.command === this.command;
	}

	public constructor(data: Buffer | SecurityPanelZoneV1SecurityPanelZoneStateGetData) {
		super(SecurityPanelZoneStateGet, data);
	}
};

export class SecurityPanelZoneStateReport extends CommandPacket<SecurityPanelZoneV1SecurityPanelZoneStateReportData> {
	public static readonly CommandClass: typeof SecurityPanelZoneV1 = SecurityPanelZoneV1;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 6,
		"name": "SecurityPanelZoneStateReport",
		"help": "Security Panel Zone State Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "zoneNumber",
				"help": "Zone number",
				"length": 1
			},
			{
				"type": "Integer",
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SecurityPanelZoneV1)?.command === this.command;
	}

	public constructor(data: Buffer | SecurityPanelZoneV1SecurityPanelZoneStateReportData) {
		super(SecurityPanelZoneStateReport, data);
	}
};

export class SecurityPanelZoneSupportedReport extends CommandPacket<SecurityPanelZoneV1SecurityPanelZoneSupportedReportData> {
	public static readonly CommandClass: typeof SecurityPanelZoneV1 = SecurityPanelZoneV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "SecurityPanelZoneSupportedReport",
		"help": "Security Panel Zone Supported Report",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "parameters1",
				"help": "Parameters1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "zm",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "zonesSupported",
						"mask": 127,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SecurityPanelZoneV1)?.command === this.command;
	}

	public constructor(data: Buffer | SecurityPanelZoneV1SecurityPanelZoneSupportedReportData) {
		super(SecurityPanelZoneSupportedReport, data);
	}
};

export class SecurityPanelZoneTypeGet extends CommandPacket<SecurityPanelZoneV1SecurityPanelZoneTypeGetData> {
	public static readonly CommandClass: typeof SecurityPanelZoneV1 = SecurityPanelZoneV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "SecurityPanelZoneTypeGet",
		"help": "Security Panel Zone Type Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "zoneNumber",
				"help": "Zone Number",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SecurityPanelZoneV1)?.command === this.command;
	}

	public constructor(data: Buffer | SecurityPanelZoneV1SecurityPanelZoneTypeGetData) {
		super(SecurityPanelZoneTypeGet, data);
	}
};

export class SecurityPanelZoneTypeReport extends CommandPacket<SecurityPanelZoneV1SecurityPanelZoneTypeReportData> {
	public static readonly CommandClass: typeof SecurityPanelZoneV1 = SecurityPanelZoneV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "SecurityPanelZoneTypeReport",
		"help": "Security Panel Zone Type Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "zoneNumber",
				"help": "Zone Number",
				"length": 1
			},
			{
				"type": "Integer",
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SecurityPanelZoneV1)?.command === this.command;
	}

	public constructor(data: Buffer | SecurityPanelZoneV1SecurityPanelZoneTypeReportData) {
		super(SecurityPanelZoneTypeReport, data);
	}
};
