/**
 * Command Class Screen Md, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ScreenMdV1Commands {
	ScreenMdGet = 0x01,
	ScreenMdReport = 0x02,
}

export interface ScreenMdV1ScreenMdGetData {
	numberOfReports: number; // 1 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export interface ScreenMdV1ScreenMdReportData {
	moreData: boolean; // properties1[7]
	screenSettings: number; // properties1[5..3]
	charPresentation: number; // properties1[2..0]
	// TODO param vg type group
}

export class ScreenMdV1 extends CommandClassPacket<ScreenMdV1Commands> {
	public static readonly commandClass = CommandClasses.ScreenMd; // 0x92 (146)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ScreenMdV1, commandAndPayload);
	}

	public static readonly ScreenMdGet = class ScreenMdGet extends CommandPacket<ScreenMdV1ScreenMdGetData> {
		public static readonly CommandClass = ScreenMdV1;
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
			return packet.tryAs(ScreenMdV1)?.command === this.command;
		}

		constructor(data: Buffer | ScreenMdV1ScreenMdGetData) {
			super(ScreenMdGet, data);
		}
	};

	public static readonly ScreenMdReport = class ScreenMdReport extends CommandPacket<ScreenMdV1ScreenMdReportData> {
		public static readonly CommandClass = ScreenMdV1;
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
							"type": "boolean",
							"name": "moreData",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "boolean",
							"name": "reserved",
							"mask": 64,
							"shift": 6,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "screenSettings",
							"mask": 56,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "charPresentation",
							"mask": 7,
							"shift": 0
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
									"name": "lineNumber",
									"mask": 15,
									"shift": 0
								},
								{
									"type": "boolean",
									"name": "clear",
									"mask": 16,
									"shift": 4
								},
								{
									"type": "integer",
									"name": "lineSettings",
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
							"length": 1,
							"lengthOf": {
								"refs": [
									{
										"name": "character"
									}
								]
							}
						},
						{
							"type": "blob",
							"name": "character",
							"help": "Character",
							"length": {
								"ref": "numberOfCharacters"
							}
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScreenMdV1)?.command === this.command;
		}

		constructor(data: Buffer | ScreenMdV1ScreenMdReportData) {
			super(ScreenMdReport, data);
		}
	};
}

export namespace ScreenMdV1 {
	export type ScreenMdGet = InstanceType<typeof ScreenMdV1.ScreenMdGet>;
	export type ScreenMdReport = InstanceType<typeof ScreenMdV1.ScreenMdReport>;
}
