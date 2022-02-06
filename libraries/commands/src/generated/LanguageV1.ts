/**
 * Command Class Language, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum LanguageV1Commands {
	LanguageGet = 0x02,
	LanguageReport = 0x03,
	LanguageSet = 0x01,
}

export interface LanguageV1LanguageReportData {
	language: number; // 3 byte unsigned integer
	country: number; // 2 byte unsigned integer
}

export interface LanguageV1LanguageSetData {
	language: number; // 3 byte unsigned integer
	country: number; // 2 byte unsigned integer
}

export class LanguageV1 extends CommandClassPacket<LanguageV1Commands> {
	public static readonly commandClass = CommandClasses.Language; // 0x89 (137)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(LanguageV1, commandAndPayload);
	}
}

export class LanguageGet extends CommandPacket<void> {
	public static readonly CommandClass = LanguageV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "LanguageGet",
		"help": "Language Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(LanguageV1)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(LanguageGet, data);
	}
};

export class LanguageReport extends CommandPacket<LanguageV1LanguageReportData> {
	public static readonly CommandClass = LanguageV1;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "LanguageReport",
		"help": "Language Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "language",
				"help": "Language",
				"length": 3
			},
			{
				"type": "Integer",
				"name": "country",
				"help": "Country",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(LanguageV1)?.command === this.command;
	}

	constructor(data: Buffer | LanguageV1LanguageReportData) {
		super(LanguageReport, data);
	}
};

export class LanguageSet extends CommandPacket<LanguageV1LanguageSetData> {
	public static readonly CommandClass = LanguageV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "LanguageSet",
		"help": "Language Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "language",
				"help": "Language",
				"length": 3
			},
			{
				"type": "Integer",
				"name": "country",
				"help": "Country",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(LanguageV1)?.command === this.command;
	}

	constructor(data: Buffer | LanguageV1LanguageSetData) {
		super(LanguageSet, data);
	}
};
