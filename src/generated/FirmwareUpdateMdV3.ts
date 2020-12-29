/**
 * Command Class Firmware Update Md, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum FirmwareUpdateMdV3Commands {
	FirmwareMdGet = 0x01,
	FirmwareMdReport = 0x02,
	FirmwareUpdateMdGet = 0x05,
	FirmwareUpdateMdReport = 0x06,
	FirmwareUpdateMdRequestGet = 0x03,
	FirmwareUpdateMdRequestReport = 0x04,
	FirmwareUpdateMdStatusReport = 0x07,
}

export interface FirmwareUpdateMdV3FirmwareMdReportData {
	manufacturerID: number; // 2 byte unsigned integer
	firmware0ID: number; // 2 byte unsigned integer
	firmware0Checksum: number; // 2 byte unsigned integer
	firmwareUpgradable: number; // 1 byte unsigned integer
	numberOfFirmwareTargets: number; // 1 byte unsigned integer
	maxFragmentSize: number; // 2 byte unsigned integer
	// TODO param vg1 type group
}

export interface FirmwareUpdateMdV3FirmwareUpdateMdGetData {
	numberOfReports: number; // 1 byte unsigned integer
	// TODO param properties1 type bitfield
	reportNumber2: number; // 1 byte unsigned integer
}

export interface FirmwareUpdateMdV3FirmwareUpdateMdReportData {
	// TODO param properties1 type bitfield
	reportNumber2: number; // 1 byte unsigned integer
	// TODO param data type blob
	checksum: number; // 2 byte unsigned integer
}

export interface FirmwareUpdateMdV3FirmwareUpdateMdRequestGetData {
	manufacturerID: number; // 2 byte unsigned integer
	firmwareID: number; // 2 byte unsigned integer
	checksum: number; // 2 byte unsigned integer
	firmwareTarget: number; // 1 byte unsigned integer
	fragmentSize: number; // 2 byte unsigned integer
}

export interface FirmwareUpdateMdV3FirmwareUpdateMdRequestReportData {
	status: StatusEnum; // 1 byte enum value
}

export interface FirmwareUpdateMdV3FirmwareUpdateMdStatusReportData {
	status: Status2Enum; // 1 byte enum value
	waitTime: number; // 2 byte unsigned integer
}

export class FirmwareUpdateMdV3 extends CommandClassPacket<FirmwareUpdateMdV3Commands> {
	public static readonly commandClass = CommandClasses.FirmwareUpdateMd; // 0x7a (122)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(FirmwareUpdateMdV3, commandAndPayload);
	}

	public static readonly FirmwareMdGet = class FirmwareMdGet extends CommandPacket<void> {
		public static readonly CommandClass = FirmwareUpdateMdV3;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "FirmwareMdGet",
			"help": "Firmware Md Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(FirmwareUpdateMdV3)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(FirmwareMdGet, data);
		}
	};

	public static readonly FirmwareMdReport = class FirmwareMdReport extends CommandPacket<FirmwareUpdateMdV3FirmwareMdReportData> {
		public static readonly CommandClass = FirmwareUpdateMdV3;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "FirmwareMdReport",
			"help": "Firmware Md Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "manufacturerID",
					"help": "Manufacturer ID",
					"length": 2
				},
				{
					"type": "integer",
					"name": "firmware0ID",
					"help": "Firmware 0 ID",
					"length": 2
				},
				{
					"type": "integer",
					"name": "firmware0Checksum",
					"help": "Firmware 0 Checksum",
					"length": 2
				},
				{
					"type": "integer",
					"name": "firmwareUpgradable",
					"help": "Firmware Upgradable",
					"length": 1
				},
				{
					"type": "integer",
					"name": "numberOfFirmwareTargets",
					"help": "Number of Firmware Targets",
					"length": 1
				},
				{
					"type": "integer",
					"name": "maxFragmentSize",
					"help": "Max Fragment Size",
					"length": 2
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"name": "Number of Firmware Targets",
						"mask": 255,
						"shift": 0
					},
					"params": [
						{
							"type": "integer",
							"name": "firmwareID",
							"help": "Firmware ID",
							"length": 2
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(FirmwareUpdateMdV3)?.command === this.command;
		}

		constructor(data: Buffer | FirmwareUpdateMdV3FirmwareMdReportData) {
			super(FirmwareMdReport, data);
		}
	};

	public static readonly FirmwareUpdateMdGet = class FirmwareUpdateMdGet extends CommandPacket<FirmwareUpdateMdV3FirmwareUpdateMdGetData> {
		public static readonly CommandClass = FirmwareUpdateMdV3;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "FirmwareUpdateMdGet",
			"help": "Firmware Update Md Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "numberOfReports",
					"help": "Number of Reports",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Report number 1",
							"mask": 127,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "zero",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "integer",
					"name": "reportNumber2",
					"help": "Report number 2",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(FirmwareUpdateMdV3)?.command === this.command;
		}

		constructor(data: Buffer | FirmwareUpdateMdV3FirmwareUpdateMdGetData) {
			super(FirmwareUpdateMdGet, data);
		}
	};

	public static readonly FirmwareUpdateMdReport = class FirmwareUpdateMdReport extends CommandPacket<FirmwareUpdateMdV3FirmwareUpdateMdReportData> {
		public static readonly CommandClass = FirmwareUpdateMdV3;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "FirmwareUpdateMdReport",
			"help": "Firmware Update Md Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Report number 1",
							"mask": 127,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Last",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "integer",
					"name": "reportNumber2",
					"help": "Report number 2",
					"length": 1
				},
				{
					"type": "blob",
					"name": "data",
					"help": "Data",
					"length": "auto"
				},
				{
					"type": "integer",
					"name": "checksum",
					"help": "Checksum",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(FirmwareUpdateMdV3)?.command === this.command;
		}

		constructor(data: Buffer | FirmwareUpdateMdV3FirmwareUpdateMdReportData) {
			super(FirmwareUpdateMdReport, data);
		}
	};

	public static readonly FirmwareUpdateMdRequestGet = class FirmwareUpdateMdRequestGet extends CommandPacket<FirmwareUpdateMdV3FirmwareUpdateMdRequestGetData> {
		public static readonly CommandClass = FirmwareUpdateMdV3;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "FirmwareUpdateMdRequestGet",
			"help": "Firmware Update Md Request Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "manufacturerID",
					"help": "Manufacturer ID",
					"length": 2
				},
				{
					"type": "integer",
					"name": "firmwareID",
					"help": "Firmware ID",
					"length": 2
				},
				{
					"type": "integer",
					"name": "checksum",
					"help": "Checksum",
					"length": 2
				},
				{
					"type": "integer",
					"name": "firmwareTarget",
					"help": "Firmware Target",
					"length": 1
				},
				{
					"type": "integer",
					"name": "fragmentSize",
					"help": "Fragment Size",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(FirmwareUpdateMdV3)?.command === this.command;
		}

		constructor(data: Buffer | FirmwareUpdateMdV3FirmwareUpdateMdRequestGetData) {
			super(FirmwareUpdateMdRequestGet, data);
		}
	};

	public static readonly FirmwareUpdateMdRequestReport = class FirmwareUpdateMdRequestReport extends CommandPacket<FirmwareUpdateMdV3FirmwareUpdateMdRequestReportData> {
		public static readonly CommandClass = FirmwareUpdateMdV3;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "FirmwareUpdateMdRequestReport",
			"help": "Firmware Update Md Request Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "status",
					"help": "Status",
					"length": 1,
					"values": {
						"0": "Invalid combination",
						"1": "Requires authentication",
						"2": "Invalid Fragment Size",
						"3": "Not upgradable",
						"255": "Valid combination"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(FirmwareUpdateMdV3)?.command === this.command;
		}

		constructor(data: Buffer | FirmwareUpdateMdV3FirmwareUpdateMdRequestReportData) {
			super(FirmwareUpdateMdRequestReport, data);
		}
	};

	public static readonly FirmwareUpdateMdStatusReport = class FirmwareUpdateMdStatusReport extends CommandPacket<FirmwareUpdateMdV3FirmwareUpdateMdStatusReportData> {
		public static readonly CommandClass = FirmwareUpdateMdV3;
		public static readonly command = 0x07;
		public static readonly definition = {
			"command": 7,
			"name": "FirmwareUpdateMdStatusReport",
			"help": "Firmware Update Md Status Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "status",
					"help": "Status",
					"length": 1,
					"values": {
						"0": "unable to receive without checksum error",
						"1": "unable to receive",
						"254": "successfully stored",
						"255": "successfully"
					}
				},
				{
					"type": "integer",
					"name": "waitTime",
					"help": "WaitTime",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(FirmwareUpdateMdV3)?.command === this.command;
		}

		constructor(data: Buffer | FirmwareUpdateMdV3FirmwareUpdateMdStatusReportData) {
			super(FirmwareUpdateMdStatusReport, data);
		}
	};
}

export namespace FirmwareUpdateMdV3 {
	export type FirmwareMdGet = InstanceType<typeof FirmwareUpdateMdV3.FirmwareMdGet>;
	export type FirmwareMdReport = InstanceType<typeof FirmwareUpdateMdV3.FirmwareMdReport>;
	export type FirmwareUpdateMdGet = InstanceType<typeof FirmwareUpdateMdV3.FirmwareUpdateMdGet>;
	export type FirmwareUpdateMdReport = InstanceType<typeof FirmwareUpdateMdV3.FirmwareUpdateMdReport>;
	export type FirmwareUpdateMdRequestGet = InstanceType<typeof FirmwareUpdateMdV3.FirmwareUpdateMdRequestGet>;
	export type FirmwareUpdateMdRequestReport = InstanceType<typeof FirmwareUpdateMdV3.FirmwareUpdateMdRequestReport>;
	export type FirmwareUpdateMdStatusReport = InstanceType<typeof FirmwareUpdateMdV3.FirmwareUpdateMdStatusReport>;
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
	SuccessfullyStored = 0xfe,
	Successfully = 0xff,
}
