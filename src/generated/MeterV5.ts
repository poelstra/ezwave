/**
 * Command Class Meter, version 5.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum MeterV5Commands {
	MeterGet = 0x01,
	MeterReport = 0x02,
	MeterReset = 0x05,
	MeterSupportedGet = 0x03,
	MeterSupportedReport = 0x04,
}

export interface MeterV5MeterGetData {
	rateType: RateTypeEnum; // properties1[7..6]
	scale: number; // properties1[5..3]
	scale2: number; // 1 byte unsigned integer
}

export interface MeterV5MeterReportData {
	scaleBit2: boolean; // properties1[7]
	rateType: RateTypeEnum; // properties1[6..5]
	meterType: MeterTypeEnum; // properties1[4..0]
	precision: number; // properties2[7..5]
	scaleBits10: number; // properties2[4..3]
	size: number; // properties2[2..0]
	// TODO param meterValue type blob
	deltaTime: number; // 2 byte unsigned integer
	// TODO param previousMeterValue type blob
	scale2: number; // 1 byte unsigned integer
}

export interface MeterV5MeterSupportedReportData {
	meterReset: boolean; // properties1[7]
	rateType: RateType2Enum; // properties1[6..5]
	meterType: MeterTypeEnum; // properties1[4..0]
	mST: boolean; // properties2[7]
	scaleSupported0: number; // properties2[6..0]
	numberOfScaleSupportedBytesToFollow: number; // 1 byte unsigned integer
	// TODO param scaleSupported type blob
}

export enum RateTypeEnum {
	Reserved = 0x0,
	Import = 0x1,
	Export = 0x2,
	NotToBeUsed = 0x3,
}

export enum MeterTypeEnum {
	Reserved = 0x0,
	ElectricMeter = 0x1,
	GasMeter = 0x2,
	WaterMeter = 0x3,
	HeatingMeter = 0x4,
	CoolingMeter = 0x5,
}

export enum RateType2Enum {
	Reserved = 0x0,
	ImportOnly = 0x1,
	ExportOnly = 0x2,
	ImportAndExport = 0x3,
}

export class MeterV5 extends CommandClassPacket<MeterV5Commands> {
	public static readonly commandClass = CommandClasses.Meter; // 0x32 (50)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(MeterV5, commandAndPayload);
	}

	public static readonly MeterGet = class MeterGet extends CommandPacket<MeterV5MeterGetData> {
		public static readonly CommandClass = MeterV5;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "MeterGet",
			"help": "Meter Get",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "enum",
							"name": "rateType",
							"mask": 192,
							"shift": 6,
							"values": {
								"0": {
									"name": "Reserved",
									"help": "Reserved"
								},
								"1": {
									"name": "Import",
									"help": "Import"
								},
								"2": {
									"name": "Export",
									"help": "Export"
								},
								"3": {
									"name": "NotToBeUsed",
									"help": "Not to be used"
								}
							}
						},
						{
							"type": "integer",
							"name": "scale",
							"mask": 56,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "reserved",
							"mask": 7,
							"shift": 0,
							"reserved": true
						}
					]
				},
				{
					"type": "integer",
					"name": "scale2",
					"help": "Scale 2",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterV5)?.command === this.command;
		}

		constructor(data: Buffer | MeterV5MeterGetData) {
			super(MeterGet, data);
		}
	};

	public static readonly MeterReport = class MeterReport extends CommandPacket<MeterV5MeterReportData> {
		public static readonly CommandClass = MeterV5;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "MeterReport",
			"help": "Meter Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "scaleBit2",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "enum",
							"name": "rateType",
							"mask": 96,
							"shift": 5,
							"values": {
								"0": {
									"name": "Reserved",
									"help": "Reserved"
								},
								"1": {
									"name": "Import",
									"help": "Import"
								},
								"2": {
									"name": "Export",
									"help": "Export"
								},
								"3": {
									"name": "NotToBeUsed",
									"help": "Not to be used"
								}
							}
						},
						{
							"type": "enum",
							"name": "meterType",
							"mask": 31,
							"shift": 0,
							"values": {
								"0": {
									"name": "Reserved",
									"help": "Reserved"
								},
								"1": {
									"name": "ElectricMeter",
									"help": "Electric meter"
								},
								"2": {
									"name": "GasMeter",
									"help": "Gas meter"
								},
								"3": {
									"name": "WaterMeter",
									"help": "Water meter"
								},
								"4": {
									"name": "HeatingMeter",
									"help": "Heating meter"
								},
								"5": {
									"name": "CoolingMeter",
									"help": "Cooling meter"
								}
							}
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "precision",
							"mask": 224,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "scaleBits10",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "size",
							"mask": 7,
							"shift": 0
						}
					]
				},
				{
					"type": "blob",
					"name": "meterValue",
					"help": "Meter Value",
					"length": {
						"name": "Properties2",
						"bitfield": {
							"mask": 7,
							"shift": 0,
							"name": "size"
						}
					}
				},
				{
					"type": "integer",
					"name": "deltaTime",
					"help": "Delta Time",
					"length": 2
				},
				{
					"type": "blob",
					"name": "previousMeterValue",
					"help": "Previous Meter Value",
					"optional": {
						"name": "Delta Time"
					},
					"length": {
						"name": "Properties2",
						"bitfield": {
							"mask": 7,
							"shift": 0,
							"name": "size"
						}
					}
				},
				{
					"type": "integer",
					"name": "scale2",
					"help": "Scale 2",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterV5)?.command === this.command;
		}

		constructor(data: Buffer | MeterV5MeterReportData) {
			super(MeterReport, data);
		}
	};

	public static readonly MeterReset = class MeterReset extends CommandPacket<void> {
		public static readonly CommandClass = MeterV5;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "MeterReset",
			"help": "Meter Reset",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterV5)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(MeterReset, data);
		}
	};

	public static readonly MeterSupportedGet = class MeterSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = MeterV5;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "MeterSupportedGet",
			"help": "Meter Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterV5)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(MeterSupportedGet, data);
		}
	};

	public static readonly MeterSupportedReport = class MeterSupportedReport extends CommandPacket<MeterV5MeterSupportedReportData> {
		public static readonly CommandClass = MeterV5;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "MeterSupportedReport",
			"help": "Meter Supported Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "meterReset",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "enum",
							"name": "rateType",
							"mask": 96,
							"shift": 5,
							"values": {
								"0": {
									"name": "Reserved",
									"help": "Reserved"
								},
								"1": {
									"name": "ImportOnly",
									"help": "Import only"
								},
								"2": {
									"name": "ExportOnly",
									"help": "Export only"
								},
								"3": {
									"name": "ImportAndExport",
									"help": "Import and Export"
								}
							}
						},
						{
							"type": "enum",
							"name": "meterType",
							"mask": 31,
							"shift": 0,
							"values": {
								"0": {
									"name": "Reserved",
									"help": "Reserved"
								},
								"1": {
									"name": "ElectricMeter",
									"help": "Electric meter"
								},
								"2": {
									"name": "GasMeter",
									"help": "Gas meter"
								},
								"3": {
									"name": "WaterMeter",
									"help": "Water meter"
								},
								"4": {
									"name": "HeatingMeter",
									"help": "Heating meter"
								},
								"5": {
									"name": "CoolingMeter",
									"help": "Cooling meter"
								}
							}
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "mST",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "scaleSupported0",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "numberOfScaleSupportedBytesToFollow",
					"help": "Number of Scale Supported Bytes to Follow",
					"length": 1
				},
				{
					"type": "blob",
					"name": "scaleSupported",
					"help": "Scale Supported",
					"length": {
						"name": "Number of Scale Supported Bytes to Follow"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterV5)?.command === this.command;
		}

		constructor(data: Buffer | MeterV5MeterSupportedReportData) {
			super(MeterSupportedReport, data);
		}
	};
}

export namespace MeterV5 {
	export type MeterGet = InstanceType<typeof MeterV5.MeterGet>;
	export type MeterReport = InstanceType<typeof MeterV5.MeterReport>;
	export type MeterReset = InstanceType<typeof MeterV5.MeterReset>;
	export type MeterSupportedGet = InstanceType<typeof MeterV5.MeterSupportedGet>;
	export type MeterSupportedReport = InstanceType<typeof MeterV5.MeterSupportedReport>;
}
