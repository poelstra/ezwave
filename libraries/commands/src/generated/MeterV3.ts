/**
 * Command Class Meter, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum MeterV3Commands {
	MeterGet = 0x01,
	MeterReport = 0x02,
	MeterReset = 0x05,
	MeterSupportedGet = 0x03,
	MeterSupportedReport = 0x04,
}

export interface MeterV3MeterGetData {
	scale: number; // properties1[5..3]
}

export interface MeterV3MeterReportData {
	scaleBit2: boolean; // properties1[7]
	rateType: number; // properties1[6..5]
	meterType: number; // properties1[4..0]
	precision: number; // properties2[7..5]
	scaleBits10: number; // properties2[4..3]
	meterValue: Buffer; // variable length
	deltaTime: number; // 2 byte unsigned integer
	previousMeterValue?: Buffer; // variable length
}

export interface MeterV3MeterSupportedReportData {
	meterReset: boolean; // properties1[7]
	meterType: number; // properties1[4..0]
	scaleSupported: number; // 1 byte unsigned integer
}

export class MeterV3 extends CommandClassPacket<MeterV3Commands> {
	public static readonly commandClass: number = CommandClasses.Meter; // 0x32 (50)
	public static readonly version: number = 3;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(MeterV3, commandAndPayload);
	}
}

export class MeterGet extends CommandPacket<MeterV3MeterGetData> {
	public static readonly CommandClass: typeof MeterV3 = MeterV3;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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
						"fieldType": "Integer",
						"name": "reserved2",
						"mask": 192,
						"shift": 6,
						"reserved": true
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
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MeterV3)?.command === this.command;
	}

	public constructor(data: Buffer | MeterV3MeterGetData) {
		super(MeterGet, data);
	}
};

export class MeterReport extends CommandPacket<MeterV3MeterReportData> {
	public static readonly CommandClass: typeof MeterV3 = MeterV3;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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
						"fieldType": "Integer",
						"name": "rateType",
						"mask": 96,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "meterType",
						"mask": 31,
						"shift": 0
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
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MeterV3)?.command === this.command;
	}

	public constructor(data: Buffer | MeterV3MeterReportData) {
		super(MeterReport, data);
	}
};

export class MeterReset extends CommandPacket<void> {
	public static readonly CommandClass: typeof MeterV3 = MeterV3;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "MeterReset",
		"help": "Meter Reset",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MeterV3)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(MeterReset, data);
	}
};

export class MeterSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof MeterV3 = MeterV3;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "MeterSupportedGet",
		"help": "Meter Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MeterV3)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(MeterSupportedGet, data);
	}
};

export class MeterSupportedReport extends CommandPacket<MeterV3MeterSupportedReportData> {
	public static readonly CommandClass: typeof MeterV3 = MeterV3;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 96,
						"shift": 5,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "meterType",
						"mask": 31,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "scaleSupported",
				"help": "Scale Supported",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MeterV3)?.command === this.command;
	}

	public constructor(data: Buffer | MeterV3MeterSupportedReportData) {
		super(MeterSupportedReport, data);
	}
};
