/**
 * Command Class Anti-theft, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum AntitheftV1Commands {
	AntitheftSet = 0x01,
	AntitheftGet = 0x02,
	AntitheftReport = 0x03,
}

export interface AntitheftV1AntitheftSetData {
	// TODO param properties1 type bitfield
	// TODO param magicCode type blob
	manufacturerID: number; // 2 byte unsigned integer
	antiTheftHintNumberBytes: number; // 1 byte unsigned integer
	// TODO param antiTheftHintByte type blob
}

export interface AntitheftV1AntitheftReportData {
	antiTheftProtectionStatus: number; // 1 byte unsigned integer
	manufacturerID: number; // 2 byte unsigned integer
	antiTheftHintNumberBytes: number; // 1 byte unsigned integer
	// TODO param antiTheftHintByte type blob
}

// Obsolete
export class AntitheftV1 extends CommandClassPacket<AntitheftV1Commands> {
	public static readonly commandClass = CommandClasses.Antitheft; // 0x5d (93)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(AntitheftV1, commandAndPayload);
	}

	public static readonly AntitheftSet = class AntitheftSet extends CommandPacket<AntitheftV1AntitheftSetData> {
		public static readonly CommandClass = AntitheftV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "AntitheftSet",
			"help": "Anti-theft Set",
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
							"name": "Number of Magic Code bytes",
							"mask": 127,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Enable",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "blob",
					"name": "magicCode",
					"help": "Magic Code",
					"length": {
						"name": "Properties1",
						"mask": 127,
						"shift": 0
					}
				},
				{
					"type": "integer",
					"name": "manufacturerID",
					"help": "Manufacturer ID",
					"length": 2
				},
				{
					"type": "integer",
					"name": "antiTheftHintNumberBytes",
					"help": "Anti-theft Hint Number Bytes",
					"length": 1
				},
				{
					"type": "blob",
					"name": "antiTheftHintByte",
					"help": "Anti-theft Hint Byte",
					"length": {
						"name": "Anti-theft Hint Number Bytes",
						"mask": 255,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(AntitheftV1)?.command === this.command;
		}

		constructor(data: Buffer | AntitheftV1AntitheftSetData) {
			super(AntitheftSet, data);
		}
	};

	public static readonly AntitheftGet = class AntitheftGet extends CommandPacket<void> {
		public static readonly CommandClass = AntitheftV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "AntitheftGet",
			"help": "Anti-theft Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(AntitheftV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AntitheftGet, data);
		}
	};

	public static readonly AntitheftReport = class AntitheftReport extends CommandPacket<AntitheftV1AntitheftReportData> {
		public static readonly CommandClass = AntitheftV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "AntitheftReport",
			"help": "Anti-theft Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "antiTheftProtectionStatus",
					"help": "Anti-theft Protection Status",
					"length": 1
				},
				{
					"type": "integer",
					"name": "manufacturerID",
					"help": "Manufacturer ID",
					"length": 2
				},
				{
					"type": "integer",
					"name": "antiTheftHintNumberBytes",
					"help": "Anti-theft Hint Number Bytes",
					"length": 1
				},
				{
					"type": "blob",
					"name": "antiTheftHintByte",
					"help": "Anti-theft Hint Byte",
					"length": {
						"name": "Anti-theft Hint Number Bytes",
						"mask": 255,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(AntitheftV1)?.command === this.command;
		}

		constructor(data: Buffer | AntitheftV1AntitheftReportData) {
			super(AntitheftReport, data);
		}
	};
}

export namespace AntitheftV1 {
	export type AntitheftSet = InstanceType<typeof AntitheftV1.AntitheftSet>;
	export type AntitheftGet = InstanceType<typeof AntitheftV1.AntitheftGet>;
	export type AntitheftReport = InstanceType<typeof AntitheftV1.AntitheftReport>;
}
