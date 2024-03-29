/**
 * Command Class Security Panel Zone Sensor, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum SecurityPanelZoneSensorV1Commands {
	CommandClassSecurityPanelZoneSensorInstalledReport = 0x02,
	SecurityPanelZoneSensorTypeGet = 0x03,
	SecurityPanelZoneSensorTypeReport = 0x04,
	SecurityPanelZoneSensorInstalledGet = 0x01,
	SecurityPanelZoneSensorStateGet = 0x05,
	SecurityPanelZoneSensorStateReport = 0x06,
}

export interface SecurityPanelZoneSensorV1CommandClassSecurityPanelZoneSensorInstalledReportData {
	zoneNumber: number; // 1 byte unsigned integer
	numberOfSensors: number; // 1 byte unsigned integer
}

export interface SecurityPanelZoneSensorV1SecurityPanelZoneSensorTypeGetData {
	zoneNumber: number; // 1 byte unsigned integer
	sensorNumber: number; // 1 byte unsigned integer
}

export interface SecurityPanelZoneSensorV1SecurityPanelZoneSensorTypeReportData {
	zoneNumber: number; // 1 byte unsigned integer
	sensorNumber: number; // 1 byte unsigned integer
	zwaveAlarmType: number; // 1 byte unsigned integer
}

export interface SecurityPanelZoneSensorV1SecurityPanelZoneSensorInstalledGetData {
	zoneNumber: number; // 1 byte unsigned integer
}

export interface SecurityPanelZoneSensorV1SecurityPanelZoneSensorStateGetData {
	zoneNumber: number; // 1 byte unsigned integer
	sensorNumber: number; // 1 byte unsigned integer
}

export interface SecurityPanelZoneSensorV1SecurityPanelZoneSensorStateReportData {
	zoneNumber: number; // 1 byte unsigned integer
	sensorNumber: number; // 1 byte unsigned integer
	zwaveAlarmType: number; // 1 byte unsigned integer
	zwaveAlarmEvent: number; // 1 byte unsigned integer
	eventParameters: number; // 1 byte unsigned integer
}

export class SecurityPanelZoneSensorV1 extends CommandClassPacket<SecurityPanelZoneSensorV1Commands> {
	public static readonly commandClass: number = CommandClasses.SecurityPanelZoneSensor; // 0x2f (47)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(SecurityPanelZoneSensorV1, commandAndPayload);
	}
}

export class CommandClassSecurityPanelZoneSensorInstalledReport extends CommandPacket<SecurityPanelZoneSensorV1CommandClassSecurityPanelZoneSensorInstalledReportData> {
	public static readonly CommandClass: typeof SecurityPanelZoneSensorV1 = SecurityPanelZoneSensorV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "CommandClassSecurityPanelZoneSensorInstalledReport",
		"help": "Command Class Security Panel Zone Sensor Installed Report",
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
				"name": "numberOfSensors",
				"help": "Number of Sensors",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SecurityPanelZoneSensorV1)?.command === this.command;
	}

	public constructor(data: Buffer | SecurityPanelZoneSensorV1CommandClassSecurityPanelZoneSensorInstalledReportData) {
		super(CommandClassSecurityPanelZoneSensorInstalledReport, data);
	}
};

export class SecurityPanelZoneSensorTypeGet extends CommandPacket<SecurityPanelZoneSensorV1SecurityPanelZoneSensorTypeGetData> {
	public static readonly CommandClass: typeof SecurityPanelZoneSensorV1 = SecurityPanelZoneSensorV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "SecurityPanelZoneSensorTypeGet",
		"help": "Security Panel Zone Sensor Type Get",
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
				"name": "sensorNumber",
				"help": "Sensor Number",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SecurityPanelZoneSensorV1)?.command === this.command;
	}

	public constructor(data: Buffer | SecurityPanelZoneSensorV1SecurityPanelZoneSensorTypeGetData) {
		super(SecurityPanelZoneSensorTypeGet, data);
	}
};

export class SecurityPanelZoneSensorTypeReport extends CommandPacket<SecurityPanelZoneSensorV1SecurityPanelZoneSensorTypeReportData> {
	public static readonly CommandClass: typeof SecurityPanelZoneSensorV1 = SecurityPanelZoneSensorV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "SecurityPanelZoneSensorTypeReport",
		"help": "Security Panel Zone Sensor Type Report",
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
				"name": "sensorNumber",
				"help": "Sensor Number",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "zwaveAlarmType",
				"help": "ZWave Alarm Type",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SecurityPanelZoneSensorV1)?.command === this.command;
	}

	public constructor(data: Buffer | SecurityPanelZoneSensorV1SecurityPanelZoneSensorTypeReportData) {
		super(SecurityPanelZoneSensorTypeReport, data);
	}
};

export class SecurityPanelZoneSensorInstalledGet extends CommandPacket<SecurityPanelZoneSensorV1SecurityPanelZoneSensorInstalledGetData> {
	public static readonly CommandClass: typeof SecurityPanelZoneSensorV1 = SecurityPanelZoneSensorV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "SecurityPanelZoneSensorInstalledGet",
		"help": "Security Panel Zone Sensor Installed Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "zoneNumber",
				"help": "Zone number",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SecurityPanelZoneSensorV1)?.command === this.command;
	}

	public constructor(data: Buffer | SecurityPanelZoneSensorV1SecurityPanelZoneSensorInstalledGetData) {
		super(SecurityPanelZoneSensorInstalledGet, data);
	}
};

export class SecurityPanelZoneSensorStateGet extends CommandPacket<SecurityPanelZoneSensorV1SecurityPanelZoneSensorStateGetData> {
	public static readonly CommandClass: typeof SecurityPanelZoneSensorV1 = SecurityPanelZoneSensorV1;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "SecurityPanelZoneSensorStateGet",
		"help": "Security Panel Zone Sensor State Get",
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
				"name": "sensorNumber",
				"help": "Sensor Number",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SecurityPanelZoneSensorV1)?.command === this.command;
	}

	public constructor(data: Buffer | SecurityPanelZoneSensorV1SecurityPanelZoneSensorStateGetData) {
		super(SecurityPanelZoneSensorStateGet, data);
	}
};

export class SecurityPanelZoneSensorStateReport extends CommandPacket<SecurityPanelZoneSensorV1SecurityPanelZoneSensorStateReportData> {
	public static readonly CommandClass: typeof SecurityPanelZoneSensorV1 = SecurityPanelZoneSensorV1;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 6,
		"name": "SecurityPanelZoneSensorStateReport",
		"help": "Security Panel Zone Sensor State Report",
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
				"name": "sensorNumber",
				"help": "Sensor Number",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "zwaveAlarmType",
				"help": "ZWave Alarm Type",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "zwaveAlarmEvent",
				"help": "ZWave Alarm Event",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "eventParameters",
				"help": "Event Parameters",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SecurityPanelZoneSensorV1)?.command === this.command;
	}

	public constructor(data: Buffer | SecurityPanelZoneSensorV1SecurityPanelZoneSensorStateReportData) {
		super(SecurityPanelZoneSensorStateReport, data);
	}
};
