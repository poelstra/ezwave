/**
 * Command Class Language, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

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

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(LanguageV1, commandAndPayload);
	}

	public static readonly LanguageGet = class LanguageGet extends CommandPacket<void> {
		public static readonly CommandClass = LanguageV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "LanguageGet",
			"help": "Language Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(LanguageV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(LanguageGet, data);
		}
	};

	public static readonly LanguageReport = class LanguageReport extends CommandPacket<LanguageV1LanguageReportData> {
		public static readonly CommandClass = LanguageV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "LanguageReport",
			"help": "Language Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "language",
					"help": "Language",
					"length": 3
				},
				{
					"type": "integer",
					"name": "country",
					"help": "Country",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(LanguageV1)?.command === this.command;
		}

		constructor(data: Buffer | LanguageV1LanguageReportData) {
			super(LanguageReport, data);
		}
	};

	public static readonly LanguageSet = class LanguageSet extends CommandPacket<LanguageV1LanguageSetData> {
		public static readonly CommandClass = LanguageV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "LanguageSet",
			"help": "Language Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "language",
					"help": "Language",
					"length": 3
				},
				{
					"type": "integer",
					"name": "country",
					"help": "Country",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(LanguageV1)?.command === this.command;
		}

		constructor(data: Buffer | LanguageV1LanguageSetData) {
			super(LanguageSet, data);
		}
	};
}

export namespace LanguageV1 {
	export type LanguageGet = InstanceType<typeof LanguageV1.LanguageGet>;
	export type LanguageReport = InstanceType<typeof LanguageV1.LanguageReport>;
	export type LanguageSet = InstanceType<typeof LanguageV1.LanguageSet>;
}
