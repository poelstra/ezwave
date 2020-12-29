/**
 * Command Class Screen Md, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ScreenMdV2Commands {
	ScreenMdGet = 0x01,
	ScreenMdReport = 0x02,
	ScreenMdReportLegacy = 0x03,
}

export interface ScreenMdV2ScreenMdGetData {
	numberOfReports: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export interface ScreenMdV2ScreenMdReportData {
	// TODO param properties1 type bitfield
	// TODO param vg type group
	// TODO param properties2 type bitfield
}

export interface ScreenMdV2ScreenMdReportLegacyData {
	// TODO param properties1 type bitfield
	// TODO param vg type group
	// TODO param properties2 type bitfield
}

export class ScreenMdV2 extends CommandClassPacket<ScreenMdV2Commands> {
	public static readonly commandClass = CommandClasses.ScreenMd; // 0x92 (146)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ScreenMdV2, commandAndPayload);
	}

	public static readonly ScreenMdGet = class ScreenMdGet extends CommandPacket<ScreenMdV2ScreenMdGetData> {
		public static readonly CommandClass = ScreenMdV2;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "ScreenMdGet",
			"help": "Screen Md Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "numberOfReports",
					"help": "Number of Reports",
					"length": 1
				},
				{
					"type": "integer",
					"name": "nodeID",
					"help": "Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScreenMdV2)?.command === this.command;
		}

		constructor(data: Buffer | ScreenMdV2ScreenMdGetData) {
			super(ScreenMdGet, data);
		}
	};

	public static readonly ScreenMdReport = class ScreenMdReport extends CommandPacket<ScreenMdV2ScreenMdReportData> {
		public static readonly CommandClass = ScreenMdV2;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "ScreenMdReport",
			"help": "Screen Md Report",
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
							"name": "Char. Presentation",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Screen Settings",
							"mask": 56,
							"shift": 3
						},
						{
							"type": "boolean",
							"name": "Reserved1",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "boolean",
							"name": "More Data",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "group",
					"name": "vg",
					"help": "vg",
					"length": "auto",
					"params": [
						{
							"type": "bitfield",
							"name": "properties1",
							"help": "Properties1",
							"length": 1,
							"fields": [
								{
									"type": "integer",
									"name": "Line Number",
									"mask": 15,
									"shift": 0
								},
								{
									"type": "boolean",
									"name": "Clear",
									"mask": 16,
									"shift": 4
								},
								{
									"type": "integer",
									"name": "Line Settings",
									"mask": 224,
									"shift": 5
								}
							]
						},
						{
							"type": "integer",
							"name": "characterPosition",
							"help": "Character Position",
							"length": 1
						},
						{
							"type": "integer",
							"name": "numberOfCharacters",
							"help": "Number of Characters",
							"length": 1
						},
						{
							"type": "blob",
							"name": "character",
							"help": "Character",
							"length": {
								"name": "Number of Characters",
								"mask": 255,
								"shift": 0
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
							"name": "Screen Timeout",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved2",
							"mask": 254,
							"shift": 1
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScreenMdV2)?.command === this.command;
		}

		constructor(data: Buffer | ScreenMdV2ScreenMdReportData) {
			super(ScreenMdReport, data);
		}
	};

	public static readonly ScreenMdReportLegacy = class ScreenMdReportLegacy extends CommandPacket<ScreenMdV2ScreenMdReportLegacyData> {
		public static readonly CommandClass = ScreenMdV2;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "ScreenMdReportLegacy",
			"help": "Screen Md Report",
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
							"name": "Char. Presentation",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Screen Settings",
							"mask": 56,
							"shift": 3
						},
						{
							"type": "boolean",
							"name": "Reserved1",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "boolean",
							"name": "More Data",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "group",
					"name": "vg",
					"help": "vg",
					"length": "auto",
					"params": [
						{
							"type": "bitfield",
							"name": "properties1",
							"help": "Properties1",
							"length": 1,
							"fields": [
								{
									"type": "integer",
									"name": "Line Number",
									"mask": 15,
									"shift": 0
								},
								{
									"type": "boolean",
									"name": "Clear",
									"mask": 16,
									"shift": 4
								},
								{
									"type": "integer",
									"name": "Line Settings",
									"mask": 224,
									"shift": 5
								}
							]
						},
						{
							"type": "integer",
							"name": "characterPosition",
							"help": "Character Position",
							"length": 1
						},
						{
							"type": "integer",
							"name": "numberOfCharacters",
							"help": "Number of Characters",
							"length": 1
						},
						{
							"type": "blob",
							"name": "character",
							"help": "Character",
							"length": {
								"name": "Number of Characters",
								"mask": 255,
								"shift": 0
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
							"name": "Screen Timeout",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved2",
							"mask": 254,
							"shift": 1
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScreenMdV2)?.command === this.command;
		}

		constructor(data: Buffer | ScreenMdV2ScreenMdReportLegacyData) {
			super(ScreenMdReportLegacy, data);
		}
	};
}

export namespace ScreenMdV2 {
	export type ScreenMdGet = InstanceType<typeof ScreenMdV2.ScreenMdGet>;
	export type ScreenMdReport = InstanceType<typeof ScreenMdV2.ScreenMdReport>;
	export type ScreenMdReportLegacy = InstanceType<typeof ScreenMdV2.ScreenMdReportLegacy>;
}
