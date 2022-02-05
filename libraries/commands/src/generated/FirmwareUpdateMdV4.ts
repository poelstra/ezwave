/**
 * Command Class Firmware Update Md, version 4.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandClasses, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum FirmwareUpdateMdV4Commands {
	FirmwareMdGet = 0x01,
	FirmwareMdReport = 0x02,
	FirmwareUpdateMdGet = 0x05,
	FirmwareUpdateMdReport = 0x06,
	FirmwareUpdateMdRequestGet = 0x03,
	FirmwareUpdateMdRequestReport = 0x04,
	FirmwareUpdateMdStatusReport = 0x07,
	FirmwareUpdateActivationSet = 0x08,
	FirmwareUpdateActivationStatusReport = 0x09,
}

export interface FirmwareUpdateMdV4FirmwareMdReportData {
	manufacturerId: number; // 2 byte unsigned integer
	firmware0Id: number; // 2 byte unsigned integer
	firmware0Checksum: number; // 2 byte unsigned integer
	firmwareUpgradable: number; // 1 byte unsigned integer
	maxFragmentSize: number; // 2 byte unsigned integer
	vg1: Array<{ // variable length
		firmwareId: number; // 2 byte unsigned integer
	}>;
}

export interface FirmwareUpdateMdV4FirmwareUpdateMdGetData {
	numberOfReports: number; // 1 byte unsigned integer
	zero: boolean; // properties1[7]
	reportNumber1: number; // properties1[6..0]
	reportNumber2: number; // 1 byte unsigned integer
}

export interface FirmwareUpdateMdV4FirmwareUpdateMdReportData {
	last: boolean; // properties1[7]
	reportNumber1: number; // properties1[6..0]
	reportNumber2: number; // 1 byte unsigned integer
	data: Buffer; // automatic length
	checksum: number; // 2 byte unsigned integer
}

export interface FirmwareUpdateMdV4FirmwareUpdateMdRequestGetData {
	manufacturerId: number; // 2 byte unsigned integer
	firmwareId: number; // 2 byte unsigned integer
	checksum: number; // 2 byte unsigned integer
	firmwareTarget: number; // 1 byte unsigned integer
	fragmentSize: number; // 2 byte unsigned integer
	activation: boolean; // properties1[0]
}

export interface FirmwareUpdateMdV4FirmwareUpdateMdRequestReportData {
	status: StatusEnum; // 1 byte enum value
}

export interface FirmwareUpdateMdV4FirmwareUpdateMdStatusReportData {
	status: Status2Enum; // 1 byte enum value
	waitTime: number; // 2 byte unsigned integer
}

export interface FirmwareUpdateMdV4FirmwareUpdateActivationSetData {
	manufacturerId: number; // 2 byte unsigned integer
	firmwareId: number; // 2 byte unsigned integer
	checksum: number; // 2 byte unsigned integer
	firmwareTarget: number; // 1 byte unsigned integer
}

export interface FirmwareUpdateMdV4FirmwareUpdateActivationStatusReportData {
	manufacturerId: number; // 2 byte unsigned integer
	firmwareId: number; // 2 byte unsigned integer
	checksum: number; // 2 byte unsigned integer
	firmwareTarget: number; // 1 byte unsigned integer
	firmwareUpdateStatus: FirmwareUpdateStatusEnum; // 1 byte enum value
}

export enum StatusEnum {
	InvalidCombination = 0x0,
	RequiresAuthentication = 0x1,
	InvalidFragmentSize = 0x2,
	NotUpgradable = 0x3,
	ValidCombination = 0xff,
}

export enum Status2Enum {
	UnableToReceiveWithoutChecksumError = 0x0,
	UnableToReceive = 0x1,
	DoesNotMatchTheManufacturerID = 0x2,
	DoesNotMatchTheFirmwareID = 0x3,
	DoesNotMatchTheFirmwareTarget = 0x4,
	InvalidFileHeaderInformation = 0x5,
	InvalidFileHeaderFormat = 0x6,
	InsufficientMemory = 0x7,
	SuccessfullyWaitingForActivation = 0xfd,
	SuccessfullyStored = 0xfe,
	Successfully = 0xff,
}

export enum FirmwareUpdateStatusEnum {
	InvalidCombination = 0x0,
	ErrorActivatingTheFirmware = 0x1,
	FirmwareUpdateCompletedSuccessfully = 0xff,
}

export class FirmwareUpdateMdV4 extends CommandClassPacket<FirmwareUpdateMdV4Commands> {
	public static readonly commandClass = CommandClasses.FirmwareUpdateMd; // 0x7a (122)
	public static readonly version = 4;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(FirmwareUpdateMdV4, commandAndPayload);
	}

	public static readonly FirmwareMdGet = class FirmwareMdGet extends CommandPacket<void> {
		public static readonly CommandClass = FirmwareUpdateMdV4;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "FirmwareMdGet",
			"help": "Firmware Md Get",
			"status": "Active",
			"params": []
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(FirmwareUpdateMdV4)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(FirmwareMdGet, data);
		}
	};

	public static readonly FirmwareMdReport = class FirmwareMdReport extends CommandPacket<FirmwareUpdateMdV4FirmwareMdReportData> {
		public static readonly CommandClass = FirmwareUpdateMdV4;
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
					"name": "firmware0Id",
					"help": "Firmware 0 ID",
					"length": 2
				},
				{
					"type": "Integer",
					"name": "firmware0Checksum",
					"help": "Firmware 0 Checksum",
					"length": 2
				},
				{
					"type": "Integer",
					"name": "firmwareUpgradable",
					"help": "Firmware Upgradable",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "numberOfFirmwareTargets",
					"help": "Number of Firmware Targets",
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
					"name": "maxFragmentSize",
					"help": "Max Fragment Size",
					"length": 2
				},
				{
					"type": "Group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"lengthType": "Ref",
						"from": {
							"ref": "numberOfFirmwareTargets"
						}
					},
					"params": [
						{
							"type": "Integer",
							"name": "firmwareId",
							"help": "Firmware ID",
							"length": 2
						}
					]
				}
			]
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(FirmwareUpdateMdV4)?.command === this.command;
		}

		constructor(data: Buffer | FirmwareUpdateMdV4FirmwareMdReportData) {
			super(FirmwareMdReport, data);
		}
	};

	public static readonly FirmwareUpdateMdGet = class FirmwareUpdateMdGet extends CommandPacket<FirmwareUpdateMdV4FirmwareUpdateMdGetData> {
		public static readonly CommandClass = FirmwareUpdateMdV4;
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
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(FirmwareUpdateMdV4)?.command === this.command;
		}

		constructor(data: Buffer | FirmwareUpdateMdV4FirmwareUpdateMdGetData) {
			super(FirmwareUpdateMdGet, data);
		}
	};

	public static readonly FirmwareUpdateMdReport = class FirmwareUpdateMdReport extends CommandPacket<FirmwareUpdateMdV4FirmwareUpdateMdReportData> {
		public static readonly CommandClass = FirmwareUpdateMdV4;
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
			return packet.tryAs(FirmwareUpdateMdV4)?.command === this.command;
		}

		constructor(data: Buffer | FirmwareUpdateMdV4FirmwareUpdateMdReportData) {
			super(FirmwareUpdateMdReport, data);
		}
	};

	public static readonly FirmwareUpdateMdRequestGet = class FirmwareUpdateMdRequestGet extends CommandPacket<FirmwareUpdateMdV4FirmwareUpdateMdRequestGetData> {
		public static readonly CommandClass = FirmwareUpdateMdV4;
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
				},
				{
					"type": "Integer",
					"name": "firmwareTarget",
					"help": "Firmware Target",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "fragmentSize",
					"help": "Fragment Size",
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
							"name": "activation",
							"mask": 1,
							"shift": 0
						}
					]
				}
			]
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(FirmwareUpdateMdV4)?.command === this.command;
		}

		constructor(data: Buffer | FirmwareUpdateMdV4FirmwareUpdateMdRequestGetData) {
			super(FirmwareUpdateMdRequestGet, data);
		}
	};

	public static readonly FirmwareUpdateMdRequestReport = class FirmwareUpdateMdRequestReport extends CommandPacket<FirmwareUpdateMdV4FirmwareUpdateMdRequestReportData> {
		public static readonly CommandClass = FirmwareUpdateMdV4;
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
						"2": {
							"name": "InvalidFragmentSize",
							"help": "Invalid Fragment Size"
						},
						"3": {
							"name": "NotUpgradable",
							"help": "Not upgradable"
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
			return packet.tryAs(FirmwareUpdateMdV4)?.command === this.command;
		}

		constructor(data: Buffer | FirmwareUpdateMdV4FirmwareUpdateMdRequestReportData) {
			super(FirmwareUpdateMdRequestReport, data);
		}
	};

	public static readonly FirmwareUpdateMdStatusReport = class FirmwareUpdateMdStatusReport extends CommandPacket<FirmwareUpdateMdV4FirmwareUpdateMdStatusReportData> {
		public static readonly CommandClass = FirmwareUpdateMdV4;
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
						"2": {
							"name": "DoesNotMatchTheManufacturerID",
							"help": "does not match the Manufacturer ID"
						},
						"3": {
							"name": "DoesNotMatchTheFirmwareID",
							"help": "does not match the Firmware ID"
						},
						"4": {
							"name": "DoesNotMatchTheFirmwareTarget",
							"help": "does not match the Firmware Target"
						},
						"5": {
							"name": "InvalidFileHeaderInformation",
							"help": "Invalid file header information"
						},
						"6": {
							"name": "InvalidFileHeaderFormat",
							"help": "Invalid file header format"
						},
						"7": {
							"name": "InsufficientMemory",
							"help": "Insufficient memory"
						},
						"253": {
							"name": "SuccessfullyWaitingForActivation",
							"help": "successfully, waiting for activation"
						},
						"254": {
							"name": "SuccessfullyStored",
							"help": "successfully stored"
						},
						"255": {
							"name": "Successfully",
							"help": "successfully"
						}
					}
				},
				{
					"type": "Integer",
					"name": "waitTime",
					"help": "WaitTime",
					"length": 2
				}
			]
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(FirmwareUpdateMdV4)?.command === this.command;
		}

		constructor(data: Buffer | FirmwareUpdateMdV4FirmwareUpdateMdStatusReportData) {
			super(FirmwareUpdateMdStatusReport, data);
		}
	};

	public static readonly FirmwareUpdateActivationSet = class FirmwareUpdateActivationSet extends CommandPacket<FirmwareUpdateMdV4FirmwareUpdateActivationSetData> {
		public static readonly CommandClass = FirmwareUpdateMdV4;
		public static readonly command = 0x08;
		public static readonly definition = convertFromJsonCommand({
			"command": 8,
			"name": "FirmwareUpdateActivationSet",
			"help": "Firmware Update Activation Set Command",
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
				},
				{
					"type": "Integer",
					"name": "firmwareTarget",
					"help": "Firmware Target",
					"length": 1
				}
			]
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(FirmwareUpdateMdV4)?.command === this.command;
		}

		constructor(data: Buffer | FirmwareUpdateMdV4FirmwareUpdateActivationSetData) {
			super(FirmwareUpdateActivationSet, data);
		}
	};

	public static readonly FirmwareUpdateActivationStatusReport = class FirmwareUpdateActivationStatusReport extends CommandPacket<FirmwareUpdateMdV4FirmwareUpdateActivationStatusReportData> {
		public static readonly CommandClass = FirmwareUpdateMdV4;
		public static readonly command = 0x09;
		public static readonly definition = convertFromJsonCommand({
			"command": 9,
			"name": "FirmwareUpdateActivationStatusReport",
			"help": "Firmware Update Activation Status Report",
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
				},
				{
					"type": "Integer",
					"name": "firmwareTarget",
					"help": "Firmware Target",
					"length": 1
				},
				{
					"type": "Enum",
					"name": "firmwareUpdateStatus",
					"help": "Firmware Update Status",
					"length": 1,
					"values": {
						"0": {
							"name": "InvalidCombination",
							"help": "Invalid combination"
						},
						"1": {
							"name": "ErrorActivatingTheFirmware",
							"help": "Error activating the firmware"
						},
						"255": {
							"name": "FirmwareUpdateCompletedSuccessfully",
							"help": "Firmware update completed successfully"
						}
					}
				}
			]
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(FirmwareUpdateMdV4)?.command === this.command;
		}

		constructor(data: Buffer | FirmwareUpdateMdV4FirmwareUpdateActivationStatusReportData) {
			super(FirmwareUpdateActivationStatusReport, data);
		}
	};
}

export namespace FirmwareUpdateMdV4 {
	export type FirmwareMdGet = InstanceType<typeof FirmwareUpdateMdV4.FirmwareMdGet>;
	export type FirmwareMdReport = InstanceType<typeof FirmwareUpdateMdV4.FirmwareMdReport>;
	export type FirmwareUpdateMdGet = InstanceType<typeof FirmwareUpdateMdV4.FirmwareUpdateMdGet>;
	export type FirmwareUpdateMdReport = InstanceType<typeof FirmwareUpdateMdV4.FirmwareUpdateMdReport>;
	export type FirmwareUpdateMdRequestGet = InstanceType<typeof FirmwareUpdateMdV4.FirmwareUpdateMdRequestGet>;
	export type FirmwareUpdateMdRequestReport = InstanceType<typeof FirmwareUpdateMdV4.FirmwareUpdateMdRequestReport>;
	export type FirmwareUpdateMdStatusReport = InstanceType<typeof FirmwareUpdateMdV4.FirmwareUpdateMdStatusReport>;
	export type FirmwareUpdateActivationSet = InstanceType<typeof FirmwareUpdateMdV4.FirmwareUpdateActivationSet>;
	export type FirmwareUpdateActivationStatusReport = InstanceType<typeof FirmwareUpdateMdV4.FirmwareUpdateActivationStatusReport>;
}
