/**
 * Command Class Meter, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum MeterV3Commands {
	MeterGet = 0x01,
	MeterReport = 0x02,
	MeterReset = 0x05,
	MeterSupportedGet = 0x03,
	MeterSupportedReport = 0x04,
}

export interface MeterV3MeterGetData {
	// TODO param properties1 type bitfield
}

export interface MeterV3MeterReportData {
	// TODO param properties1 type bitfield
	// TODO param properties2 type bitfield
	// TODO param meterValue type blob
	deltaTime: number; // 2 byte unsigned integer
	// TODO param previousMeterValue type blob
}

export interface MeterV3MeterSupportedReportData {
	// TODO param properties1 type bitfield
	scaleSupported: number; // 1 byte unsigned integer
}

export class MeterV3 extends CommandClassPacket<MeterV3Commands> {
	public static readonly commandClass = CommandClasses.Meter; // 0x32 (50)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(MeterV3, commandAndPayload);
	}

	public static readonly MeterGet = class MeterGet extends CommandPacket<MeterV3MeterGetData> {
		public static readonly CommandClass = MeterV3;
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
							"name": "Reserved",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Scale",
							"mask": 56,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Reserved2",
							"mask": 192,
							"shift": 6
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterV3)?.command === this.command;
		}

		constructor(data: Buffer | MeterV3MeterGetData) {
			super(MeterGet, data);
		}
	};

	public static readonly MeterReport = class MeterReport extends CommandPacket<MeterV3MeterReportData> {
		public static readonly CommandClass = MeterV3;
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
							"type": "integer",
							"name": "Meter Type",
							"mask": 31,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Rate Type",
							"mask": 96,
							"shift": 5
						},
						{
							"type": "boolean",
							"name": "Scale bit 2",
							"mask": 128,
							"shift": 7
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
							"name": "Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Scale bits 10",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "meterValue",
					"help": "Meter Value",
					"length": {
						"name": "Properties2",
						"mask": 7,
						"shift": 0
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
						"name": "Delta Time",
						"mask": 255
					},
					"length": {
						"name": "Properties2",
						"mask": 7,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterV3)?.command === this.command;
		}

		constructor(data: Buffer | MeterV3MeterReportData) {
			super(MeterReport, data);
		}
	};

	public static readonly MeterReset = class MeterReset extends CommandPacket<void> {
		public static readonly CommandClass = MeterV3;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "MeterReset",
			"help": "Meter Reset",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterV3)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(MeterReset, data);
		}
	};

	public static readonly MeterSupportedGet = class MeterSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = MeterV3;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "MeterSupportedGet",
			"help": "Meter Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterV3)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(MeterSupportedGet, data);
		}
	};

	public static readonly MeterSupportedReport = class MeterSupportedReport extends CommandPacket<MeterV3MeterSupportedReportData> {
		public static readonly CommandClass = MeterV3;
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
							"type": "integer",
							"name": "Meter Type",
							"mask": 31,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 96,
							"shift": 5
						},
						{
							"type": "boolean",
							"name": "Meter Reset",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "integer",
					"name": "scaleSupported",
					"help": "Scale Supported",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterV3)?.command === this.command;
		}

		constructor(data: Buffer | MeterV3MeterSupportedReportData) {
			super(MeterSupportedReport, data);
		}
	};
}

export namespace MeterV3 {
	export type MeterGet = InstanceType<typeof MeterV3.MeterGet>;
	export type MeterReport = InstanceType<typeof MeterV3.MeterReport>;
	export type MeterReset = InstanceType<typeof MeterV3.MeterReset>;
	export type MeterSupportedGet = InstanceType<typeof MeterV3.MeterSupportedGet>;
	export type MeterSupportedReport = InstanceType<typeof MeterV3.MeterSupportedReport>;
}
