/**
 * Command Class Geographic Location, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

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
	public static readonly commandClass = CommandClasses.GeographicLocation; // 0x8c (140)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(GeographicLocationV1, commandAndPayload);
	}

	public static readonly GeographicLocationGet = class GeographicLocationGet extends CommandPacket<void> {
		public static readonly CommandClass = GeographicLocationV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "GeographicLocationGet",
			"help": "Geographic Location Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(GeographicLocationV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(GeographicLocationGet, data);
		}
	};

	public static readonly GeographicLocationReport = class GeographicLocationReport extends CommandPacket<GeographicLocationV1GeographicLocationReportData> {
		public static readonly CommandClass = GeographicLocationV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "GeographicLocationReport",
			"help": "Geographic Location Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "longitudeDegrees",
					"help": "Longitude Degrees",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "longSign",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "longitudeMinutes",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "latitudeDegrees",
					"help": "Latitude Degrees",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "level2",
					"help": "Level2",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "latSign",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "latitudeMinutes",
							"mask": 127,
							"shift": 0
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(GeographicLocationV1)?.command === this.command;
		}

		constructor(data: Buffer | GeographicLocationV1GeographicLocationReportData) {
			super(GeographicLocationReport, data);
		}
	};

	public static readonly GeographicLocationSet = class GeographicLocationSet extends CommandPacket<GeographicLocationV1GeographicLocationSetData> {
		public static readonly CommandClass = GeographicLocationV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "GeographicLocationSet",
			"help": "Geographic Location Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "longitudeDegrees",
					"help": "Longitude Degrees",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "longSign",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "longitudeMinutes",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "latitudeDegrees",
					"help": "Latitude Degrees",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "level2",
					"help": "Level2",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "latSign",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "latitudeMinutes",
							"mask": 127,
							"shift": 0
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(GeographicLocationV1)?.command === this.command;
		}

		constructor(data: Buffer | GeographicLocationV1GeographicLocationSetData) {
			super(GeographicLocationSet, data);
		}
	};
}

export namespace GeographicLocationV1 {
	export type GeographicLocationGet = InstanceType<typeof GeographicLocationV1.GeographicLocationGet>;
	export type GeographicLocationReport = InstanceType<typeof GeographicLocationV1.GeographicLocationReport>;
	export type GeographicLocationSet = InstanceType<typeof GeographicLocationV1.GeographicLocationSet>;
}
