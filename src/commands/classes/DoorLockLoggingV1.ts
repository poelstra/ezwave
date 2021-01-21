/**
 * Command Class Door Lock Logging, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

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
	public static readonly commandClass = CommandClasses.DoorLockLogging; // 0x4c (76)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(DoorLockLoggingV1, commandAndPayload);
	}

	public static readonly DoorLockLoggingRecordsSupportedGet = class DoorLockLoggingRecordsSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = DoorLockLoggingV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "DoorLockLoggingRecordsSupportedGet",
			"help": "Door Lock Logging Records Supported Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(DoorLockLoggingV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(DoorLockLoggingRecordsSupportedGet, data);
		}
	};

	public static readonly DoorLockLoggingRecordsSupportedReport = class DoorLockLoggingRecordsSupportedReport extends CommandPacket<DoorLockLoggingV1DoorLockLoggingRecordsSupportedReportData> {
		public static readonly CommandClass = DoorLockLoggingV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(DoorLockLoggingV1)?.command === this.command;
		}

		constructor(data: Buffer | DoorLockLoggingV1DoorLockLoggingRecordsSupportedReportData) {
			super(DoorLockLoggingRecordsSupportedReport, data);
		}
	};

	public static readonly RecordGet = class RecordGet extends CommandPacket<DoorLockLoggingV1RecordGetData> {
		public static readonly CommandClass = DoorLockLoggingV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(DoorLockLoggingV1)?.command === this.command;
		}

		constructor(data: Buffer | DoorLockLoggingV1RecordGetData) {
			super(RecordGet, data);
		}
	};

	public static readonly RecordReport = class RecordReport extends CommandPacket<DoorLockLoggingV1RecordReportData> {
		public static readonly CommandClass = DoorLockLoggingV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(DoorLockLoggingV1)?.command === this.command;
		}

		constructor(data: Buffer | DoorLockLoggingV1RecordReportData) {
			super(RecordReport, data);
		}
	};
}

export namespace DoorLockLoggingV1 {
	export type DoorLockLoggingRecordsSupportedGet = InstanceType<typeof DoorLockLoggingV1.DoorLockLoggingRecordsSupportedGet>;
	export type DoorLockLoggingRecordsSupportedReport = InstanceType<typeof DoorLockLoggingV1.DoorLockLoggingRecordsSupportedReport>;
	export type RecordGet = InstanceType<typeof DoorLockLoggingV1.RecordGet>;
	export type RecordReport = InstanceType<typeof DoorLockLoggingV1.RecordReport>;
}
