/**
 * Command Class Geographic Location, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum GeographicLocationV1Commands {
	GeographicLocationGet = 0x02,
	GeographicLocationReport = 0x03,
	GeographicLocationSet = 0x01,
}

export interface GeographicLocationV1GeographicLocationReportData {
	longitudeDegrees: number; // 1 byte unsigned integer
	longSign: boolean; // level[7]
	longitudeMinutes: number; // level[6..0]
	latitudeDegrees: number; // 1 byte unsigned integer
	latSign: boolean; // level2[7]
	latitudeMinutes: number; // level2[6..0]
}

export interface GeographicLocationV1GeographicLocationSetData {
	longitudeDegrees: number; // 1 byte unsigned integer
	longSign: boolean; // level[7]
	longitudeMinutes: number; // level[6..0]
	latitudeDegrees: number; // 1 byte unsigned integer
	latSign: boolean; // level2[7]
	latitudeMinutes: number; // level2[6..0]
}

export class GeographicLocationV1 extends CommandClassPacket<GeographicLocationV1Commands> {
	public static readonly commandClass: number = CommandClasses.GeographicLocation; // 0x8c (140)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(GeographicLocationV1, commandAndPayload);
	}
}

export class GeographicLocationGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof GeographicLocationV1 = GeographicLocationV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "GeographicLocationGet",
		"help": "Geographic Location Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(GeographicLocationV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(GeographicLocationGet, data);
	}
};

export class GeographicLocationReport extends CommandPacket<GeographicLocationV1GeographicLocationReportData> {
	public static readonly CommandClass: typeof GeographicLocationV1 = GeographicLocationV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "GeographicLocationReport",
		"help": "Geographic Location Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "longitudeDegrees",
				"help": "Longitude Degrees",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "level",
				"help": "Level",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "longSign",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "longitudeMinutes",
						"mask": 127,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "latitudeDegrees",
				"help": "Latitude Degrees",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "level2",
				"help": "Level2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "latSign",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "latitudeMinutes",
						"mask": 127,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(GeographicLocationV1)?.command === this.command;
	}

	public constructor(data: Buffer | GeographicLocationV1GeographicLocationReportData) {
		super(GeographicLocationReport, data);
	}
};

export class GeographicLocationSet extends CommandPacket<GeographicLocationV1GeographicLocationSetData> {
	public static readonly CommandClass: typeof GeographicLocationV1 = GeographicLocationV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "GeographicLocationSet",
		"help": "Geographic Location Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "longitudeDegrees",
				"help": "Longitude Degrees",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "level",
				"help": "Level",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "longSign",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "longitudeMinutes",
						"mask": 127,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "latitudeDegrees",
				"help": "Latitude Degrees",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "level2",
				"help": "Level2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "latSign",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "latitudeMinutes",
						"mask": 127,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(GeographicLocationV1)?.command === this.command;
	}

	public constructor(data: Buffer | GeographicLocationV1GeographicLocationSetData) {
		super(GeographicLocationSet, data);
	}
};
