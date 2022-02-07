/**
 * Command Class Meter, version 4.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum MeterV4Commands {
	MeterGet = 0x01,
	MeterReport = 0x02,
	MeterReset = 0x05,
	MeterSupportedGet = 0x03,
	MeterSupportedReport = 0x04,
}

export interface MeterV4MeterGetData {
	rateType: RateTypeEnum; // properties1[7..6]
	scale: number; // properties1[5..3]
	scale2: number; // 1 byte unsigned integer
}

export interface MeterV4MeterReportData {
	scaleBit2: boolean; // properties1[7]
	rateType: RateTypeEnum; // properties1[6..5]
	meterType: MeterTypeEnum; // properties1[4..0]
	precision: number; // properties2[7..5]
	scaleBits10: number; // properties2[4..3]
	meterValue: Buffer; // variable length
	deltaTime: number; // 2 byte unsigned integer
	previousMeterValue?: Buffer; // variable length
	scale2: number; // 1 byte unsigned integer
}

export interface MeterV4MeterSupportedReportData {
	meterReset: boolean; // properties1[7]
	rateType: RateType2Enum; // properties1[6..5]
	meterType: MeterTypeEnum; // properties1[4..0]
	mST: boolean; // properties2[7]
	scaleSupported0: number; // properties2[6..0]
	scaleSupported: Buffer; // variable length
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
}

export enum RateType2Enum {
	Reserved = 0x0,
	ImportOnly = 0x1,
	ExportOnly = 0x2,
	ImportAndExport = 0x3,
}

export class MeterV4 extends CommandClassPacket<MeterV4Commands> {
	public static readonly commandClass = CommandClasses.Meter; // 0x32 (50)
	public static readonly version = 4;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(MeterV4, commandAndPayload);
	}
}

export class MeterGet extends CommandPacket<MeterV4MeterGetData> {
	public static readonly CommandClass = MeterV4;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "MeterGet",
		"help": "Meter Get",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Enum",
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
						"fieldType": "Integer",
						"name": "scale",
						"mask": 56,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 7,
						"shift": 0,
						"reserved": true
					}
				]
			},
			{
				"type": "Integer",
				"name": "scale2",
				"help": "Scale 2",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterV4)?.command === this.command;
	}

	public constructor(data: Buffer | MeterV4MeterGetData) {
		super(MeterGet, data);
	}
};

export class MeterReport extends CommandPacket<MeterV4MeterReportData> {
	public static readonly CommandClass = MeterV4;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "MeterReport",
		"help": "Meter Report",
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
						"name": "scaleBit2",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Enum",
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
						"fieldType": "Enum",
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
							}
						}
					}
				]
			},
			{
				"type": "Bitfield",
				"name": "properties2",
				"help": "Properties2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "precision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "scaleBits10",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "size",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"meterValue",
								"previousMeterValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "meterValue",
				"help": "Meter Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties2.size"
					}
				}
			},
			{
				"type": "Integer",
				"name": "deltaTime",
				"help": "Delta Time",
				"length": 2,
				"presenceOf": {
					"refs": [
						"previousMeterValue"
					]
				}
			},
			{
				"type": "Blob",
				"name": "previousMeterValue",
				"help": "Previous Meter Value",
				"optional": {
					"ref": "deltaTime"
				},
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties2.size"
					}
				}
			},
			{
				"type": "Integer",
				"name": "scale2",
				"help": "Scale 2",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterV4)?.command === this.command;
	}

	public constructor(data: Buffer | MeterV4MeterReportData) {
		super(MeterReport, data);
	}
};

export class MeterReset extends CommandPacket<void> {
	public static readonly CommandClass = MeterV4;
	public static readonly command = 0x05; // 5
	public static readonly definition = convertFromJsonCommand({
		"command": 5,
		"name": "MeterReset",
		"help": "Meter Reset",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterV4)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(MeterReset, data);
	}
};

export class MeterSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass = MeterV4;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "MeterSupportedGet",
		"help": "Meter Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterV4)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(MeterSupportedGet, data);
	}
};

export class MeterSupportedReport extends CommandPacket<MeterV4MeterSupportedReportData> {
	public static readonly CommandClass = MeterV4;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
		"command": 4,
		"name": "MeterSupportedReport",
		"help": "Meter Supported Report",
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
						"name": "meterReset",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Enum",
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
						"fieldType": "Enum",
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
							}
						}
					}
				]
			},
			{
				"type": "Bitfield",
				"name": "properties2",
				"help": "Properties2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "mST",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "scaleSupported0",
						"mask": 127,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "numberOfScaleSupportedBytesToFollow",
				"help": "Number of Scale Supported Bytes to Follow",
				"length": 1,
				"lengthOf": {
					"refs": [
						"scaleSupported"
					]
				},
				"isAutogenerated": true
			},
			{
				"type": "Blob",
				"name": "scaleSupported",
				"help": "Scale Supported",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "numberOfScaleSupportedBytesToFollow"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterV4)?.command === this.command;
	}

	public constructor(data: Buffer | MeterV4MeterSupportedReportData) {
		super(MeterSupportedReport, data);
	}
};
