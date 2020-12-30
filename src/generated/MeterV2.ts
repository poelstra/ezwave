/**
 * Command Class Meter, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum MeterV2Commands {
	MeterGet = 0x01,
	MeterReport = 0x02,
	MeterReset = 0x05,
	MeterSupportedGet = 0x03,
	MeterSupportedReport = 0x04,
}

export interface MeterV2MeterGetData {
	scale: number; // properties1[4..3]
}

export interface MeterV2MeterReportData {
	rateType: number; // properties1[6..5]
	meterType: number; // properties1[4..0]
	precision: number; // properties2[7..5]
	scale: number; // properties2[4..3]
	size: number; // properties2[2..0]
	// TODO param meterValue type blob
	deltaTime: number; // 2 byte unsigned integer
	// TODO param previousMeterValue type blob
}

export interface MeterV2MeterSupportedReportData {
	meterReset: boolean; // properties1[7]
	meterType: number; // properties1[4..0]
	scaleSupported: number; // properties2[3..0]
}

export class MeterV2 extends CommandClassPacket<MeterV2Commands> {
	public static readonly commandClass = CommandClasses.Meter; // 0x32 (50)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(MeterV2, commandAndPayload);
	}

	public static readonly MeterGet = class MeterGet extends CommandPacket<MeterV2MeterGetData> {
		public static readonly CommandClass = MeterV2;
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
							"type": "integer",
							"name": "reserved2",
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "scale",
							"mask": 24,
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
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterV2)?.command === this.command;
		}

		constructor(data: Buffer | MeterV2MeterGetData) {
			super(MeterGet, data);
		}
	};

	public static readonly MeterReport = class MeterReport extends CommandPacket<MeterV2MeterReportData> {
		public static readonly CommandClass = MeterV2;
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
							"name": "reserved",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "rateType",
							"mask": 96,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "meterType",
							"mask": 31,
							"shift": 0
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
							"name": "scale",
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
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterV2)?.command === this.command;
		}

		constructor(data: Buffer | MeterV2MeterReportData) {
			super(MeterReport, data);
		}
	};

	public static readonly MeterReset = class MeterReset extends CommandPacket<void> {
		public static readonly CommandClass = MeterV2;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "MeterReset",
			"help": "Meter Reset",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(MeterReset, data);
		}
	};

	public static readonly MeterSupportedGet = class MeterSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = MeterV2;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "MeterSupportedGet",
			"help": "Meter Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(MeterSupportedGet, data);
		}
	};

	public static readonly MeterSupportedReport = class MeterSupportedReport extends CommandPacket<MeterV2MeterSupportedReportData> {
		public static readonly CommandClass = MeterV2;
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
							"type": "integer",
							"name": "reserved1",
							"mask": 96,
							"shift": 5,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "meterType",
							"mask": 31,
							"shift": 0
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
							"name": "reserved2",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "scaleSupported",
							"mask": 15,
							"shift": 0
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterV2)?.command === this.command;
		}

		constructor(data: Buffer | MeterV2MeterSupportedReportData) {
			super(MeterSupportedReport, data);
		}
	};
}

export namespace MeterV2 {
	export type MeterGet = InstanceType<typeof MeterV2.MeterGet>;
	export type MeterReport = InstanceType<typeof MeterV2.MeterReport>;
	export type MeterReset = InstanceType<typeof MeterV2.MeterReset>;
	export type MeterSupportedGet = InstanceType<typeof MeterV2.MeterSupportedGet>;
	export type MeterSupportedReport = InstanceType<typeof MeterV2.MeterSupportedReport>;
}
