/**
 * Command Class Door Lock Logging, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum DoorLockLoggingV1Commands {
	DoorLockLoggingRecordsSupportedGet = 0x01,
	DoorLockLoggingRecordsSupportedReport = 0x02,
	RecordGet = 0x03,
	RecordReport = 0x04,
}

export interface DoorLockLoggingV1DoorLockLoggingRecordsSupportedReportData {
	maxRecordsStored: number; // 1 byte unsigned integer
}

export interface DoorLockLoggingV1RecordGetData {
	recordNumber: number; // 1 byte unsigned integer
}

export interface DoorLockLoggingV1RecordReportData {
	recordNumber: number; // 1 byte unsigned integer
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	recordStatus: number; // properties1[7..5]
	hourLocalTime: number; // properties1[4..0]
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
	eventType: number; // 1 byte unsigned integer
	userIdentifier: number; // 1 byte unsigned integer
	userCodeLength: number; // 1 byte unsigned integer
	userCode: Buffer; // automatic length
}

export class DoorLockLoggingV1 extends CommandClassPacket<DoorLockLoggingV1Commands> {
	public static readonly commandClass: number = CommandClasses.DoorLockLogging; // 0x4c (76)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(DoorLockLoggingV1, commandAndPayload);
	}
}

export class DoorLockLoggingRecordsSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof DoorLockLoggingV1 = DoorLockLoggingV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "DoorLockLoggingRecordsSupportedGet",
		"help": "Door Lock Logging Records Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DoorLockLoggingV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(DoorLockLoggingRecordsSupportedGet, data);
	}
};

export class DoorLockLoggingRecordsSupportedReport extends CommandPacket<DoorLockLoggingV1DoorLockLoggingRecordsSupportedReportData> {
	public static readonly CommandClass: typeof DoorLockLoggingV1 = DoorLockLoggingV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "DoorLockLoggingRecordsSupportedReport",
		"help": "Door Lock Logging Records Supported Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "maxRecordsStored",
				"help": "Max records stored",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DoorLockLoggingV1)?.command === this.command;
	}

	public constructor(data: Buffer | DoorLockLoggingV1DoorLockLoggingRecordsSupportedReportData) {
		super(DoorLockLoggingRecordsSupportedReport, data);
	}
};

export class RecordGet extends CommandPacket<DoorLockLoggingV1RecordGetData> {
	public static readonly CommandClass: typeof DoorLockLoggingV1 = DoorLockLoggingV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "RecordGet",
		"help": "Record Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "recordNumber",
				"help": "Record number",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DoorLockLoggingV1)?.command === this.command;
	}

	public constructor(data: Buffer | DoorLockLoggingV1RecordGetData) {
		super(RecordGet, data);
	}
};

export class RecordReport extends CommandPacket<DoorLockLoggingV1RecordReportData> {
	public static readonly CommandClass: typeof DoorLockLoggingV1 = DoorLockLoggingV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "RecordReport",
		"help": "Record Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "recordNumber",
				"help": "Record number",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "year",
				"help": "Year",
				"length": 2
			},
			{
				"type": "Integer",
				"name": "month",
				"help": "Month",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "day",
				"help": "Day",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "recordStatus",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "hourLocalTime",
						"mask": 31,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "minuteLocalTime",
				"help": "Minute Local Time",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "secondLocalTime",
				"help": "Second Local Time",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "eventType",
				"help": "Event Type",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "userIdentifier",
				"help": "User Identifier",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "userCodeLength",
				"help": "User Code Length",
				"length": 1
			},
			{
				"type": "Blob",
				"name": "userCode",
				"help": "USER_CODE",
				"length": {
					"lengthType": "Auto"
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DoorLockLoggingV1)?.command === this.command;
	}

	public constructor(data: Buffer | DoorLockLoggingV1RecordReportData) {
		super(RecordReport, data);
	}
};
