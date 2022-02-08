/**
 * Command Class Firmware Update Md, version 5.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum FirmwareUpdateMdV5Commands {
	FirmwareMdGet = 0x01,
	FirmwareMdReport = 0x02,
	FirmwareUpdateMdGet = 0x05,
	FirmwareUpdateMdReport = 0x06,
	FirmwareUpdateMdRequestGet = 0x03,
	FirmwareUpdateMdRequestReport = 0x04,
	FirmwareUpdateMdStatusReport = 0x07,
	FirmwareUpdateActivationSet = 0x08,
	FirmwareUpdateActivationStatusReport = 0x09,
	FirmwareUpdateMdPrepareGet = 0x0a,
	FirmwareUpdateMdPrepareReport = 0x0b,
}

export interface FirmwareUpdateMdV5FirmwareMdReportData {
	manufacturerId: number; // 2 byte unsigned integer
	firmware0Id: number; // 2 byte unsigned integer
	firmware0Checksum: number; // 2 byte unsigned integer
	firmwareUpgradable: number; // 1 byte unsigned integer
	maxFragmentSize: number; // 2 byte unsigned integer
	vg1: Array<{ // variable length
		firmwareId: number; // 2 byte unsigned integer
	}>;
	hardwareVersion: number; // 1 byte unsigned integer
}

export interface FirmwareUpdateMdV5FirmwareUpdateMdGetData {
	numberOfReports: number; // 1 byte unsigned integer
	zero: boolean; // properties1[7]
	reportNumber1: number; // properties1[6..0]
	reportNumber2: number; // 1 byte unsigned integer
}

export interface FirmwareUpdateMdV5FirmwareUpdateMdReportData {
	last: boolean; // properties1[7]
	reportNumber1: number; // properties1[6..0]
	reportNumber2: number; // 1 byte unsigned integer
	data: Buffer; // automatic length
	checksum: number; // 2 byte unsigned integer
}

export interface FirmwareUpdateMdV5FirmwareUpdateMdRequestGetData {
	manufacturerId: number; // 2 byte unsigned integer
	firmwareId: number; // 2 byte unsigned integer
	checksum: number; // 2 byte unsigned integer
	firmwareTarget: number; // 1 byte unsigned integer
	fragmentSize: number; // 2 byte unsigned integer
	activation: boolean; // properties1[0]
	hardwareVersion: number; // 1 byte unsigned integer
}

export interface FirmwareUpdateMdV5FirmwareUpdateMdRequestReportData {
	status: StatusEnum; // 1 byte enum value
}

export interface FirmwareUpdateMdV5FirmwareUpdateMdStatusReportData {
	status: Status2Enum; // 1 byte enum value
	waitTime: number; // 2 byte unsigned integer
}

export interface FirmwareUpdateMdV5FirmwareUpdateActivationSetData {
	manufacturerId: number; // 2 byte unsigned integer
	firmwareId: number; // 2 byte unsigned integer
	checksum: number; // 2 byte unsigned integer
	firmwareTarget: number; // 1 byte unsigned integer
	hardwareVersion: number; // 1 byte unsigned integer
}

export interface FirmwareUpdateMdV5FirmwareUpdateActivationStatusReportData {
	manufacturerId: number; // 2 byte unsigned integer
	firmwareId: number; // 2 byte unsigned integer
	checksum: number; // 2 byte unsigned integer
	firmwareTarget: number; // 1 byte unsigned integer
	firmwareUpdateStatus: FirmwareUpdateStatusEnum; // 1 byte enum value
	hardwareVersion: number; // 1 byte unsigned integer
}

export interface FirmwareUpdateMdV5FirmwareUpdateMdPrepareGetData {
	manufacturerId: number; // 2 byte unsigned integer
	firmwareId: number; // 2 byte unsigned integer
	firmwareTarget: number; // 1 byte unsigned integer
	fragmentSize: number; // 2 byte unsigned integer
	hardwareVersion: number; // 1 byte unsigned integer
}

export interface FirmwareUpdateMdV5FirmwareUpdateMdPrepareReportData {
	status: Status3Enum; // 1 byte enum value
	firmwareChecksum: number; // 2 byte unsigned integer
}

export enum StatusEnum {
	InvalidCombination = 0x0,
	RequiresAuthentication = 0x1,
	InvalidFragmentSize = 0x2,
	NotUpgradable = 0x3,
	InvalidHardwareVersion = 0x4,
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
	DoesNotMatchTheHardwareVersion = 0x8,
	SuccessfullyWaitingForActivation = 0xfd,
	SuccessfullyStored = 0xfe,
	Successfully = 0xff,
}

export enum FirmwareUpdateStatusEnum {
	InvalidCombination = 0x0,
	ErrorActivatingTheFirmware = 0x1,
	FirmwareUpdateCompletedSuccessfully = 0xff,
}

export enum Status3Enum {
	InvalidCombination = 0x0,
	RequiresAuthentication = 0x1,
	InvalidFragmentSize = 0x2,
	NotDownloadable = 0x3,
	InvalidHardwareVersion = 0x4,
	ValidCombination = 0xff,
}

export class FirmwareUpdateMdV5 extends CommandClassPacket<FirmwareUpdateMdV5Commands> {
	public static readonly commandClass: number = CommandClasses.FirmwareUpdateMd; // 0x7a (122)
	public static readonly version: number = 5;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(FirmwareUpdateMdV5, commandAndPayload);
	}
}

export class FirmwareMdGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof FirmwareUpdateMdV5 = FirmwareUpdateMdV5;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "FirmwareMdGet",
		"help": "Firmware Md Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(FirmwareUpdateMdV5)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(FirmwareMdGet, data);
	}
};

export class FirmwareMdReport extends CommandPacket<FirmwareUpdateMdV5FirmwareMdReportData> {
	public static readonly CommandClass: typeof FirmwareUpdateMdV5 = FirmwareUpdateMdV5;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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
			},
			{
				"type": "Integer",
				"name": "hardwareVersion",
				"help": "Hardware Version",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(FirmwareUpdateMdV5)?.command === this.command;
	}

	public constructor(data: Buffer | FirmwareUpdateMdV5FirmwareMdReportData) {
		super(FirmwareMdReport, data);
	}
};

export class FirmwareUpdateMdGet extends CommandPacket<FirmwareUpdateMdV5FirmwareUpdateMdGetData> {
	public static readonly CommandClass: typeof FirmwareUpdateMdV5 = FirmwareUpdateMdV5;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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

	public static matches(packet: Packet): boolean {
		return packet.tryAs(FirmwareUpdateMdV5)?.command === this.command;
	}

	public constructor(data: Buffer | FirmwareUpdateMdV5FirmwareUpdateMdGetData) {
		super(FirmwareUpdateMdGet, data);
	}
};

export class FirmwareUpdateMdReport extends CommandPacket<FirmwareUpdateMdV5FirmwareUpdateMdReportData> {
	public static readonly CommandClass: typeof FirmwareUpdateMdV5 = FirmwareUpdateMdV5;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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

	public static matches(packet: Packet): boolean {
		return packet.tryAs(FirmwareUpdateMdV5)?.command === this.command;
	}

	public constructor(data: Buffer | FirmwareUpdateMdV5FirmwareUpdateMdReportData) {
		super(FirmwareUpdateMdReport, data);
	}
};

export class FirmwareUpdateMdRequestGet extends CommandPacket<FirmwareUpdateMdV5FirmwareUpdateMdRequestGetData> {
	public static readonly CommandClass: typeof FirmwareUpdateMdV5 = FirmwareUpdateMdV5;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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
			},
			{
				"type": "Integer",
				"name": "hardwareVersion",
				"help": "Hardware Version",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(FirmwareUpdateMdV5)?.command === this.command;
	}

	public constructor(data: Buffer | FirmwareUpdateMdV5FirmwareUpdateMdRequestGetData) {
		super(FirmwareUpdateMdRequestGet, data);
	}
};

export class FirmwareUpdateMdRequestReport extends CommandPacket<FirmwareUpdateMdV5FirmwareUpdateMdRequestReportData> {
	public static readonly CommandClass: typeof FirmwareUpdateMdV5 = FirmwareUpdateMdV5;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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
					"4": {
						"name": "InvalidHardwareVersion",
						"help": "Invalid Hardware Version"
					},
					"255": {
						"name": "ValidCombination",
						"help": "Valid combination"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(FirmwareUpdateMdV5)?.command === this.command;
	}

	public constructor(data: Buffer | FirmwareUpdateMdV5FirmwareUpdateMdRequestReportData) {
		super(FirmwareUpdateMdRequestReport, data);
	}
};

export class FirmwareUpdateMdStatusReport extends CommandPacket<FirmwareUpdateMdV5FirmwareUpdateMdStatusReportData> {
	public static readonly CommandClass: typeof FirmwareUpdateMdV5 = FirmwareUpdateMdV5;
	public static readonly command: number = 0x07; // 7
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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
					"8": {
						"name": "DoesNotMatchTheHardwareVersion",
						"help": "does not match the Hardware version"
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

	public static matches(packet: Packet): boolean {
		return packet.tryAs(FirmwareUpdateMdV5)?.command === this.command;
	}

	public constructor(data: Buffer | FirmwareUpdateMdV5FirmwareUpdateMdStatusReportData) {
		super(FirmwareUpdateMdStatusReport, data);
	}
};

export class FirmwareUpdateActivationSet extends CommandPacket<FirmwareUpdateMdV5FirmwareUpdateActivationSetData> {
	public static readonly CommandClass: typeof FirmwareUpdateMdV5 = FirmwareUpdateMdV5;
	public static readonly command: number = 0x08; // 8
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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
			},
			{
				"type": "Integer",
				"name": "hardwareVersion",
				"help": "Hardware Version",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(FirmwareUpdateMdV5)?.command === this.command;
	}

	public constructor(data: Buffer | FirmwareUpdateMdV5FirmwareUpdateActivationSetData) {
		super(FirmwareUpdateActivationSet, data);
	}
};

export class FirmwareUpdateActivationStatusReport extends CommandPacket<FirmwareUpdateMdV5FirmwareUpdateActivationStatusReportData> {
	public static readonly CommandClass: typeof FirmwareUpdateMdV5 = FirmwareUpdateMdV5;
	public static readonly command: number = 0x09; // 9
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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
			},
			{
				"type": "Integer",
				"name": "hardwareVersion",
				"help": "Hardware Version",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(FirmwareUpdateMdV5)?.command === this.command;
	}

	public constructor(data: Buffer | FirmwareUpdateMdV5FirmwareUpdateActivationStatusReportData) {
		super(FirmwareUpdateActivationStatusReport, data);
	}
};

export class FirmwareUpdateMdPrepareGet extends CommandPacket<FirmwareUpdateMdV5FirmwareUpdateMdPrepareGetData> {
	public static readonly CommandClass: typeof FirmwareUpdateMdV5 = FirmwareUpdateMdV5;
	public static readonly command: number = 0x0a; // 10
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 10,
		"name": "FirmwareUpdateMdPrepareGet",
		"help": "Firmware Update MD Prepare Get",
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
				"type": "Integer",
				"name": "hardwareVersion",
				"help": "Hardware Version",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(FirmwareUpdateMdV5)?.command === this.command;
	}

	public constructor(data: Buffer | FirmwareUpdateMdV5FirmwareUpdateMdPrepareGetData) {
		super(FirmwareUpdateMdPrepareGet, data);
	}
};

export class FirmwareUpdateMdPrepareReport extends CommandPacket<FirmwareUpdateMdV5FirmwareUpdateMdPrepareReportData> {
	public static readonly CommandClass: typeof FirmwareUpdateMdV5 = FirmwareUpdateMdV5;
	public static readonly command: number = 0x0b; // 11
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 11,
		"name": "FirmwareUpdateMdPrepareReport",
		"help": "Firmware Update MD Prepare Report",
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
						"name": "NotDownloadable",
						"help": "Not downloadable"
					},
					"4": {
						"name": "InvalidHardwareVersion",
						"help": "Invalid Hardware Version"
					},
					"255": {
						"name": "ValidCombination",
						"help": "Valid combination"
					}
				}
			},
			{
				"type": "Integer",
				"name": "firmwareChecksum",
				"help": "Firmware Checksum",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(FirmwareUpdateMdV5)?.command === this.command;
	}

	public constructor(data: Buffer | FirmwareUpdateMdV5FirmwareUpdateMdPrepareReportData) {
		super(FirmwareUpdateMdPrepareReport, data);
	}
};
