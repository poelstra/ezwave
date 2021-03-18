/**
 * Command Class Firmware Update Md, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum FirmwareUpdateMdV1Commands {
	FirmwareMdGet = 0x01,
	FirmwareMdReport = 0x02,
	FirmwareUpdateMdGet = 0x05,
	FirmwareUpdateMdReport = 0x06,
	FirmwareUpdateMdRequestGet = 0x03,
	FirmwareUpdateMdRequestReport = 0x04,
	FirmwareUpdateMdStatusReport = 0x07,
}

export interface FirmwareUpdateMdV1FirmwareMdReportData {
	manufacturerId: number; // 2 byte unsigned integer
	firmwareId: number; // 2 byte unsigned integer
	checksum: number; // 2 byte unsigned integer
}

export interface FirmwareUpdateMdV1FirmwareUpdateMdGetData {
	numberOfReports: number; // 1 byte unsigned integer
	zero: boolean; // properties1[7]
	reportNumber1: number; // properties1[6..0]
	reportNumber2: number; // 1 byte unsigned integer
}

export interface FirmwareUpdateMdV1FirmwareUpdateMdReportData {
	last: boolean; // properties1[7]
	reportNumber1: number; // properties1[6..0]
	reportNumber2: number; // 1 byte unsigned integer
	data: Buffer; // automatic length
}

export interface FirmwareUpdateMdV1FirmwareUpdateMdRequestGetData {
	manufacturerId: number; // 2 byte unsigned integer
	firmwareId: number; // 2 byte unsigned integer
	checksum: number; // 2 byte unsigned integer
}

export interface FirmwareUpdateMdV1FirmwareUpdateMdRequestReportData {
	status: StatusEnum; // 1 byte enum value
}

export interface FirmwareUpdateMdV1FirmwareUpdateMdStatusReportData {
	status: Status2Enum; // 1 byte enum value
}

export enum StatusEnum {
	InvalidCombination = 0x0,
	RequiresAuthentication = 0x1,
	ValidCombination = 0xff,
}

export enum Status2Enum {
	UnableToReceiveWithoutChecksumError = 0x0,
	UnableToReceive = 0x1,
	Successfully = 0xff,
}

// Deprecated
export class FirmwareUpdateMdV1 extends CommandClassPacket<FirmwareUpdateMdV1Commands> {
	public static readonly commandClass = CommandClasses.FirmwareUpdateMd; // 0x7a (122)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(FirmwareUpdateMdV1, commandAndPayload);
	}

	public static readonly FirmwareMdGet = class FirmwareMdGet extends CommandPacket<void> {
		public static readonly CommandClass = FirmwareUpdateMdV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "FirmwareMdGet",
			"help": "Firmware Md Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(FirmwareUpdateMdV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(FirmwareMdGet, data);
		}
	};

	public static readonly FirmwareMdReport = class FirmwareMdReport extends CommandPacket<FirmwareUpdateMdV1FirmwareMdReportData> {
		public static readonly CommandClass = FirmwareUpdateMdV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "FirmwareMdReport",
			"help": "Firmware Md Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "manufacturerId",
					"help": "Manufacturer ID",
					"length": 2
				},
				{
					"type": "Integer",
					"name": "firmwareId",
					"help": "Firmware ID",
					"length": 2
				},
				{
					"type": "Integer",
					"name": "checksum",
					"help": "Checksum",
					"length": 2
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(FirmwareUpdateMdV1)?.command === this.command;
		}

		constructor(data: Buffer | FirmwareUpdateMdV1FirmwareMdReportData) {
			super(FirmwareMdReport, data);
		}
	};

	public static readonly FirmwareUpdateMdGet = class FirmwareUpdateMdGet extends CommandPacket<FirmwareUpdateMdV1FirmwareUpdateMdGetData> {
		public static readonly CommandClass = FirmwareUpdateMdV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "FirmwareUpdateMdGet",
			"help": "Firmware Update Md Get",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "numberOfReports",
					"help": "Number of Reports",
					"length": 1
				},
				{
					"type": "Bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "Boolean",
							"name": "zero",
							"mask": 128,
							"shift": 7
						},
						{
							"fieldType": "Integer",
							"name": "reportNumber1",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "Integer",
					"name": "reportNumber2",
					"help": "Report number 2",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(FirmwareUpdateMdV1)?.command === this.command;
		}

		constructor(data: Buffer | FirmwareUpdateMdV1FirmwareUpdateMdGetData) {
			super(FirmwareUpdateMdGet, data);
		}
	};

	public static readonly FirmwareUpdateMdReport = class FirmwareUpdateMdReport extends CommandPacket<FirmwareUpdateMdV1FirmwareUpdateMdReportData> {
		public static readonly CommandClass = FirmwareUpdateMdV1;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "FirmwareUpdateMdReport",
			"help": "Firmware Update Md Report",
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
							"name": "last",
							"mask": 128,
							"shift": 7
						},
						{
							"fieldType": "Integer",
							"name": "reportNumber1",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "Integer",
					"name": "reportNumber2",
					"help": "Report number 2",
					"length": 1
				},
				{
					"type": "Blob",
					"name": "data",
					"help": "Data",
					"length": {
						"lengthType": "Auto"
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(FirmwareUpdateMdV1)?.command === this.command;
		}

		constructor(data: Buffer | FirmwareUpdateMdV1FirmwareUpdateMdReportData) {
			super(FirmwareUpdateMdReport, data);
		}
	};

	public static readonly FirmwareUpdateMdRequestGet = class FirmwareUpdateMdRequestGet extends CommandPacket<FirmwareUpdateMdV1FirmwareUpdateMdRequestGetData> {
		public static readonly CommandClass = FirmwareUpdateMdV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "FirmwareUpdateMdRequestGet",
			"help": "Firmware Update Md Request Get",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "manufacturerId",
					"help": "Manufacturer ID",
					"length": 2
				},
				{
					"type": "Integer",
					"name": "firmwareId",
					"help": "Firmware ID",
					"length": 2
				},
				{
					"type": "Integer",
					"name": "checksum",
					"help": "Checksum",
					"length": 2
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(FirmwareUpdateMdV1)?.command === this.command;
		}

		constructor(data: Buffer | FirmwareUpdateMdV1FirmwareUpdateMdRequestGetData) {
			super(FirmwareUpdateMdRequestGet, data);
		}
	};

	public static readonly FirmwareUpdateMdRequestReport = class FirmwareUpdateMdRequestReport extends CommandPacket<FirmwareUpdateMdV1FirmwareUpdateMdRequestReportData> {
		public static readonly CommandClass = FirmwareUpdateMdV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "FirmwareUpdateMdRequestReport",
			"help": "Firmware Update Md Request Report",
			"status": "Active",
			"params": [
				{
					"type": "Enum",
					"name": "status",
					"help": "Status",
					"length": 1,
					"values": {
						"0": {
							"name": "InvalidCombination",
							"help": "Invalid combination"
						},
						"1": {
							"name": "RequiresAuthentication",
							"help": "Requires authentication"
						},
						"255": {
							"name": "ValidCombination",
							"help": "Valid combination"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(FirmwareUpdateMdV1)?.command === this.command;
		}

		constructor(data: Buffer | FirmwareUpdateMdV1FirmwareUpdateMdRequestReportData) {
			super(FirmwareUpdateMdRequestReport, data);
		}
	};

	public static readonly FirmwareUpdateMdStatusReport = class FirmwareUpdateMdStatusReport extends CommandPacket<FirmwareUpdateMdV1FirmwareUpdateMdStatusReportData> {
		public static readonly CommandClass = FirmwareUpdateMdV1;
		public static readonly command = 0x07;
		public static readonly definition = convertFromJsonCommand({
			"command": 7,
			"name": "FirmwareUpdateMdStatusReport",
			"help": "Firmware Update Md Status Report",
			"status": "Active",
			"params": [
				{
					"type": "Enum",
					"name": "status",
					"help": "Status",
					"length": 1,
					"values": {
						"0": {
							"name": "UnableToReceiveWithoutChecksumError",
							"help": "unable to receive without checksum error"
						},
						"1": {
							"name": "UnableToReceive",
							"help": "unable to receive"
						},
						"255": {
							"name": "Successfully",
							"help": "successfully"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(FirmwareUpdateMdV1)?.command === this.command;
		}

		constructor(data: Buffer | FirmwareUpdateMdV1FirmwareUpdateMdStatusReportData) {
			super(FirmwareUpdateMdStatusReport, data);
		}
	};
}

export namespace FirmwareUpdateMdV1 {
	export type FirmwareMdGet = InstanceType<typeof FirmwareUpdateMdV1.FirmwareMdGet>;
	export type FirmwareMdReport = InstanceType<typeof FirmwareUpdateMdV1.FirmwareMdReport>;
	export type FirmwareUpdateMdGet = InstanceType<typeof FirmwareUpdateMdV1.FirmwareUpdateMdGet>;
	export type FirmwareUpdateMdReport = InstanceType<typeof FirmwareUpdateMdV1.FirmwareUpdateMdReport>;
	export type FirmwareUpdateMdRequestGet = InstanceType<typeof FirmwareUpdateMdV1.FirmwareUpdateMdRequestGet>;
	export type FirmwareUpdateMdRequestReport = InstanceType<typeof FirmwareUpdateMdV1.FirmwareUpdateMdRequestReport>;
	export type FirmwareUpdateMdStatusReport = InstanceType<typeof FirmwareUpdateMdV1.FirmwareUpdateMdStatusReport>;
}
