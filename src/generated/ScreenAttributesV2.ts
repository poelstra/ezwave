/**
 * Command Class Screen Attributes, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ScreenAttributesV2Commands {
	ScreenAttributesGet = 0x01,
	ScreenAttributesReport = 0x02,
	ScreenAttributesReportLegacy = 0x03,
}

export interface ScreenAttributesV2ScreenAttributesReportData {
	escapeSequence: boolean; // properties1[5]
	numberOfLines: number; // properties1[4..0]
	numberOfCharactersPerLine: number; // 1 byte unsigned integer
	sizeOfLineBuffer: number; // 1 byte unsigned integer
	numericalPresentationOfACharacter: number; // 1 byte unsigned integer
	screenTimeout: number; // 1 byte unsigned integer
}

export interface ScreenAttributesV2ScreenAttributesReportLegacyData {
	escapeSequence: boolean; // properties1[5]
	numberOfLines: number; // properties1[4..0]
	numberOfCharactersPerLine: number; // 1 byte unsigned integer
	sizeOfLineBuffer: number; // 1 byte unsigned integer
	numericalPresentationOfACharacter: number; // 1 byte unsigned integer
	screenTimeout: number; // 1 byte unsigned integer
}

export class ScreenAttributesV2 extends CommandClassPacket<ScreenAttributesV2Commands> {
	public static readonly commandClass = CommandClasses.ScreenAttributes; // 0x93 (147)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ScreenAttributesV2, commandAndPayload);
	}

	public static readonly ScreenAttributesGet = class ScreenAttributesGet extends CommandPacket<void> {
		public static readonly CommandClass = ScreenAttributesV2;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "ScreenAttributesGet",
			"help": "Screen Attributes Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScreenAttributesV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ScreenAttributesGet, data);
		}
	};

	public static readonly ScreenAttributesReport = class ScreenAttributesReport extends CommandPacket<ScreenAttributesV2ScreenAttributesReportData> {
		public static readonly CommandClass = ScreenAttributesV2;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "ScreenAttributesReport",
			"help": "Screen Attributes Report",
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
							"name": "reserved",
							"mask": 192,
							"shift": 6,
							"reserved": true
						},
						{
							"type": "boolean",
							"name": "escapeSequence",
							"mask": 32,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "numberOfLines",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "numberOfCharactersPerLine",
					"help": "Number of Characters per Line",
					"length": 1
				},
				{
					"type": "integer",
					"name": "sizeOfLineBuffer",
					"help": "Size of Line Buffer",
					"length": 1
				},
				{
					"type": "integer",
					"name": "numericalPresentationOfACharacter",
					"help": "Numerical Presentation of a Character",
					"length": 1
				},
				{
					"type": "integer",
					"name": "screenTimeout",
					"help": "Screen Timeout",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScreenAttributesV2)?.command === this.command;
		}

		constructor(data: Buffer | ScreenAttributesV2ScreenAttributesReportData) {
			super(ScreenAttributesReport, data);
		}
	};

	public static readonly ScreenAttributesReportLegacy = class ScreenAttributesReportLegacy extends CommandPacket<ScreenAttributesV2ScreenAttributesReportLegacyData> {
		public static readonly CommandClass = ScreenAttributesV2;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "ScreenAttributesReportLegacy",
			"help": "Screen Attributes Report",
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
							"name": "reserved",
							"mask": 192,
							"shift": 6,
							"reserved": true
						},
						{
							"type": "boolean",
							"name": "escapeSequence",
							"mask": 32,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "numberOfLines",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "numberOfCharactersPerLine",
					"help": "Number of Characters per Line",
					"length": 1
				},
				{
					"type": "integer",
					"name": "sizeOfLineBuffer",
					"help": "Size of Line Buffer",
					"length": 1
				},
				{
					"type": "integer",
					"name": "numericalPresentationOfACharacter",
					"help": "Numerical Presentation of a Character",
					"length": 1
				},
				{
					"type": "integer",
					"name": "screenTimeout",
					"help": "Screen Timeout",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScreenAttributesV2)?.command === this.command;
		}

		constructor(data: Buffer | ScreenAttributesV2ScreenAttributesReportLegacyData) {
			super(ScreenAttributesReportLegacy, data);
		}
	};
}

export namespace ScreenAttributesV2 {
	export type ScreenAttributesGet = InstanceType<typeof ScreenAttributesV2.ScreenAttributesGet>;
	export type ScreenAttributesReport = InstanceType<typeof ScreenAttributesV2.ScreenAttributesReport>;
	export type ScreenAttributesReportLegacy = InstanceType<typeof ScreenAttributesV2.ScreenAttributesReportLegacy>;
}
