/**
 * Command Class Screen Md, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum ScreenMdV2Commands {
	ScreenMdGet = 0x01,
	ScreenMdReport = 0x02,
	ScreenMdReportLegacy = 0x03,
}

export interface ScreenMdV2ScreenMdGetData {
	numberOfReports: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
}

export interface ScreenMdV2ScreenMdReportData {
	moreData: boolean; // properties1[7]
	screenSettings: number; // properties1[5..3]
	charPresentation: number; // properties1[2..0]
	vg: Array<{ // automatic length
		lineSettings: number; // properties1[7..5]
		clear: boolean; // properties1[4]
		lineNumber: number; // properties1[3..0]
		characterPosition: number; // 1 byte unsigned integer
		character: Buffer; // variable length
	}>;
	screenTimeout: boolean; // properties2[0]
}

export interface ScreenMdV2ScreenMdReportLegacyData {
	moreData: boolean; // properties1[7]
	screenSettings: number; // properties1[5..3]
	charPresentation: number; // properties1[2..0]
	vg: Array<{ // automatic length
		lineSettings: number; // properties1[7..5]
		clear: boolean; // properties1[4]
		lineNumber: number; // properties1[3..0]
		characterPosition: number; // 1 byte unsigned integer
		character: Buffer; // variable length
	}>;
	screenTimeout: boolean; // properties2[0]
}

export class ScreenMdV2 extends CommandClassPacket<ScreenMdV2Commands> {
	public static readonly commandClass = CommandClasses.ScreenMd; // 0x92 (146)
	public static readonly version = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ScreenMdV2, commandAndPayload);
	}
}

export class ScreenMdGet extends CommandPacket<ScreenMdV2ScreenMdGetData> {
	public static readonly CommandClass = ScreenMdV2;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "ScreenMdGet",
		"help": "Screen Md Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "numberOfReports",
				"help": "Number of Reports",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "nodeId",
				"help": "Node ID",
				"length": 1,
				"valueType": "NodeNumber"
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ScreenMdV2)?.command === this.command;
	}

	constructor(data: Buffer | ScreenMdV2ScreenMdGetData) {
		super(ScreenMdGet, data);
	}
};

export class ScreenMdReport extends CommandPacket<ScreenMdV2ScreenMdReportData> {
	public static readonly CommandClass = ScreenMdV2;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "ScreenMdReport",
		"help": "Screen Md Report",
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
						"name": "moreData",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Boolean",
						"name": "reserved1",
						"mask": 64,
						"shift": 6,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "screenSettings",
						"mask": 56,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "charPresentation",
						"mask": 7,
						"shift": 0
					}
				]
			},
			{
				"type": "Group",
				"name": "vg",
				"help": "vg",
				"length": {
					"lengthType": "Auto"
				},
				"params": [
					{
						"type": "Bitfield",
						"name": "properties1",
						"help": "Properties1",
						"length": 1,
						"fields": [
							{
								"fieldType": "Integer",
								"name": "lineSettings",
								"mask": 224,
								"shift": 5
							},
							{
								"fieldType": "Boolean",
								"name": "clear",
								"mask": 16,
								"shift": 4
							},
							{
								"fieldType": "Integer",
								"name": "lineNumber",
								"mask": 15,
								"shift": 0
							}
						]
					},
					{
						"type": "Integer",
						"name": "characterPosition",
						"help": "Character Position",
						"length": 1
					},
					{
						"type": "Integer",
						"name": "numberOfCharacters",
						"help": "Number of Characters",
						"length": 1,
						"lengthOf": {
							"refs": [
								"vg.character"
							]
						},
						"isAutogenerated": true
					},
					{
						"type": "Blob",
						"name": "character",
						"help": "Character",
						"length": {
							"lengthType": "Ref",
							"from": {
								"ref": "vg.numberOfCharacters"
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
						"name": "reserved2",
						"mask": 254,
						"shift": 1,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "screenTimeout",
						"mask": 1,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ScreenMdV2)?.command === this.command;
	}

	constructor(data: Buffer | ScreenMdV2ScreenMdReportData) {
		super(ScreenMdReport, data);
	}
};

export class ScreenMdReportLegacy extends CommandPacket<ScreenMdV2ScreenMdReportLegacyData> {
	public static readonly CommandClass = ScreenMdV2;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "ScreenMdReportLegacy",
		"help": "Screen Md Report",
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
						"name": "moreData",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Boolean",
						"name": "reserved1",
						"mask": 64,
						"shift": 6,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "screenSettings",
						"mask": 56,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "charPresentation",
						"mask": 7,
						"shift": 0
					}
				]
			},
			{
				"type": "Group",
				"name": "vg",
				"help": "vg",
				"length": {
					"lengthType": "Auto"
				},
				"params": [
					{
						"type": "Bitfield",
						"name": "properties1",
						"help": "Properties1",
						"length": 1,
						"fields": [
							{
								"fieldType": "Integer",
								"name": "lineSettings",
								"mask": 224,
								"shift": 5
							},
							{
								"fieldType": "Boolean",
								"name": "clear",
								"mask": 16,
								"shift": 4
							},
							{
								"fieldType": "Integer",
								"name": "lineNumber",
								"mask": 15,
								"shift": 0
							}
						]
					},
					{
						"type": "Integer",
						"name": "characterPosition",
						"help": "Character Position",
						"length": 1
					},
					{
						"type": "Integer",
						"name": "numberOfCharacters",
						"help": "Number of Characters",
						"length": 1,
						"lengthOf": {
							"refs": [
								"vg.character"
							]
						},
						"isAutogenerated": true
					},
					{
						"type": "Blob",
						"name": "character",
						"help": "Character",
						"length": {
							"lengthType": "Ref",
							"from": {
								"ref": "vg.numberOfCharacters"
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
						"name": "reserved2",
						"mask": 254,
						"shift": 1,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "screenTimeout",
						"mask": 1,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ScreenMdV2)?.command === this.command;
	}

	constructor(data: Buffer | ScreenMdV2ScreenMdReportLegacyData) {
		super(ScreenMdReportLegacy, data);
	}
};