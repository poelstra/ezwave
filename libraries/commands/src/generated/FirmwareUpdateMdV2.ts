/**
 * Command Class Firmware Update Md, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum FirmwareUpdateMdV2Commands {
	FirmwareMdGet = 0x01,
	FirmwareMdReport = 0x02,
	FirmwareUpdateMdGet = 0x05,
	FirmwareUpdateMdReport = 0x06,
	FirmwareUpdateMdRequestGet = 0x03,
	FirmwareUpdateMdRequestReport = 0x04,
	FirmwareUpdateMdStatusReport = 0x07,
}

export interface FirmwareUpdateMdV2FirmwareMdReportData {
	manufacturerId: number; // 2 byte unsigned integer
	firmwareId: number; // 2 byte unsigned integer
	checksum: number; // 2 byte unsigned integer
}

export interface FirmwareUpdateMdV2FirmwareUpdateMdGetData {
	numberOfReports: number; // 1 byte unsigned integer
	zero: boolean; // properties1[7]
	reportNumber1: number; // properties1[6..0]
	reportNumber2: number; // 1 byte unsigned integer
}

export interface FirmwareUpdateMdV2FirmwareUpdateMdReportData {
	last: boolean; // properties1[7]
	reportNumber1: number; // properties1[6..0]
	reportNumber2: number; // 1 byte unsigned integer
	data: Buffer; // automatic length
	checksum: number; // 2 byte unsigned integer
}

export interface FirmwareUpdateMdV2FirmwareUpdateMdRequestGetData {
	manufacturerId: number; // 2 byte unsigned integer
	firmwareId: number; // 2 byte unsigned integer
	checksum: number; // 2 byte unsigned integer
}

export interface FirmwareUpdateMdV2FirmwareUpdateMdRequestReportData {
	status: StatusEnum; // 1 byte enum value
}

export interface FirmwareUpdateMdV2FirmwareUpdateMdStatusReportData {
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

export class FirmwareUpdateMdV2 extends CommandClassPacket<FirmwareUpdateMdV2Commands> {
	public static readonly commandClass = CommandClasses.FirmwareUpdateMd; // 0x7a (122)
	public static readonly version = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(FirmwareUpdateMdV2, commandAndPayload);
	}
}

export class FirmwareMdGet extends CommandPacket<void> {
	public static readonly CommandClass = FirmwareUpdateMdV2;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "FirmwareMdGet",
		"help": "Firmware Md Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(FirmwareUpdateMdV2)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(FirmwareMdGet, data);
	}
};

export class FirmwareMdReport extends CommandPacket<FirmwareUpdateMdV2FirmwareMdReportData> {
	public static readonly CommandClass = FirmwareUpdateMdV2;
	public static readonly command = 0x02; // 2
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(FirmwareUpdateMdV2)?.command === this.command;
	}

	constructor(data: Buffer | FirmwareUpdateMdV2FirmwareMdReportData) {
		super(FirmwareMdReport, data);
	}
};

export class FirmwareUpdateMdGet extends CommandPacket<FirmwareUpdateMdV2FirmwareUpdateMdGetData> {
	public static readonly CommandClass = FirmwareUpdateMdV2;
	public static readonly command = 0x05; // 5
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(FirmwareUpdateMdV2)?.command === this.command;
	}

	constructor(data: Buffer | FirmwareUpdateMdV2FirmwareUpdateMdGetData) {
		super(FirmwareUpdateMdGet, data);
	}
};

export class FirmwareUpdateMdReport extends CommandPacket<FirmwareUpdateMdV2FirmwareUpdateMdReportData> {
	public static readonly CommandClass = FirmwareUpdateMdV2;
	public static readonly command = 0x06; // 6
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
			},
			{
				"type": "Integer",
				"name": "checksum",
				"help": "Checksum",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(FirmwareUpdateMdV2)?.command === this.command;
	}

	constructor(data: Buffer | FirmwareUpdateMdV2FirmwareUpdateMdReportData) {
		super(FirmwareUpdateMdReport, data);
	}
};

export class FirmwareUpdateMdRequestGet extends CommandPacket<FirmwareUpdateMdV2FirmwareUpdateMdRequestGetData> {
	public static readonly CommandClass = FirmwareUpdateMdV2;
	public static readonly command = 0x03; // 3
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(FirmwareUpdateMdV2)?.command === this.command;
	}

	constructor(data: Buffer | FirmwareUpdateMdV2FirmwareUpdateMdRequestGetData) {
		super(FirmwareUpdateMdRequestGet, data);
	}
};

export class FirmwareUpdateMdRequestReport extends CommandPacket<FirmwareUpdateMdV2FirmwareUpdateMdRequestReportData> {
	public static readonly CommandClass = FirmwareUpdateMdV2;
	public static readonly command = 0x04; // 4
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(FirmwareUpdateMdV2)?.command === this.command;
	}

	constructor(data: Buffer | FirmwareUpdateMdV2FirmwareUpdateMdRequestReportData) {
		super(FirmwareUpdateMdRequestReport, data);
	}
};

export class FirmwareUpdateMdStatusReport extends CommandPacket<FirmwareUpdateMdV2FirmwareUpdateMdStatusReportData> {
	public static readonly CommandClass = FirmwareUpdateMdV2;
	public static readonly command = 0x07; // 7
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(FirmwareUpdateMdV2)?.command === this.command;
	}

	constructor(data: Buffer | FirmwareUpdateMdV2FirmwareUpdateMdStatusReportData) {
		super(FirmwareUpdateMdStatusReport, data);
	}
};
