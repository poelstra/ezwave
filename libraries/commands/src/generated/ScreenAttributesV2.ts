/**
 * Command Class Screen Attributes, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	public static readonly commandClass: number = CommandClasses.ScreenAttributes; // 0x93 (147)
	public static readonly version: number = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ScreenAttributesV2, commandAndPayload);
	}
}

export class ScreenAttributesGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof ScreenAttributesV2 = ScreenAttributesV2;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "ScreenAttributesGet",
		"help": "Screen Attributes Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ScreenAttributesV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ScreenAttributesGet, data);
	}
};

export class ScreenAttributesReport extends CommandPacket<ScreenAttributesV2ScreenAttributesReportData> {
	public static readonly CommandClass: typeof ScreenAttributesV2 = ScreenAttributesV2;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "ScreenAttributesReport",
		"help": "Screen Attributes Report",
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
						"name": "reserved",
						"mask": 192,
						"shift": 6,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "escapeSequence",
						"mask": 32,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "numberOfLines",
						"mask": 31,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "numberOfCharactersPerLine",
				"help": "Number of Characters per Line",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "sizeOfLineBuffer",
				"help": "Size of Line Buffer",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "numericalPresentationOfACharacter",
				"help": "Numerical Presentation of a Character",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "screenTimeout",
				"help": "Screen Timeout",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ScreenAttributesV2)?.command === this.command;
	}

	public constructor(data: Buffer | ScreenAttributesV2ScreenAttributesReportData) {
		super(ScreenAttributesReport, data);
	}
};

export class ScreenAttributesReportLegacy extends CommandPacket<ScreenAttributesV2ScreenAttributesReportLegacyData> {
	public static readonly CommandClass: typeof ScreenAttributesV2 = ScreenAttributesV2;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "ScreenAttributesReportLegacy",
		"help": "Screen Attributes Report",
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
						"name": "reserved",
						"mask": 192,
						"shift": 6,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "escapeSequence",
						"mask": 32,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "numberOfLines",
						"mask": 31,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "numberOfCharactersPerLine",
				"help": "Number of Characters per Line",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "sizeOfLineBuffer",
				"help": "Size of Line Buffer",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "numericalPresentationOfACharacter",
				"help": "Numerical Presentation of a Character",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "screenTimeout",
				"help": "Screen Timeout",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ScreenAttributesV2)?.command === this.command;
	}

	public constructor(data: Buffer | ScreenAttributesV2ScreenAttributesReportLegacyData) {
		super(ScreenAttributesReportLegacy, data);
	}
};
