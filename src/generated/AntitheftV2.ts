/**
 * Command Class Anti-theft, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum AntitheftV2Commands {
	AntitheftSet = 0x01,
	AntitheftGet = 0x02,
	AntitheftReport = 0x03,
}

export interface AntitheftV2AntitheftSetData {
	enable: boolean; // properties1[7]
	numberOfMagicCodeBytes: number; // properties1[6..0]
	// TODO param magicCode type blob
	manufacturerID: number; // 2 byte unsigned integer
	antiTheftHintNumberBytes: number; // 1 byte unsigned integer
	// TODO param antiTheftHintByte type blob
}

export interface AntitheftV2AntitheftReportData {
	antiTheftProtectionStatus: number; // 1 byte unsigned integer
	manufacturerID: number; // 2 byte unsigned integer
	antiTheftHintNumberBytes: number; // 1 byte unsigned integer
	// TODO param antiTheftHintByte type blob
}

export class AntitheftV2 extends CommandClassPacket<AntitheftV2Commands> {
	public static readonly commandClass = CommandClasses.Antitheft; // 0x5d (93)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(AntitheftV2, commandAndPayload);
	}

	public static readonly AntitheftSet = class AntitheftSet extends CommandPacket<AntitheftV2AntitheftSetData> {
		public static readonly CommandClass = AntitheftV2;
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
							"type": "boolean",
							"name": "enable",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "numberOfMagicCodeBytes",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "blob",
					"name": "magicCode",
					"help": "Magic Code",
					"length": {
						"ref": "properties1",
						"bitfield": {
							"mask": 127,
							"shift": 0,
							"name": "numberOfMagicCodeBytes"
						}
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
						"ref": "antiTheftHintNumberBytes"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(AntitheftV2)?.command === this.command;
		}

		constructor(data: Buffer | AntitheftV2AntitheftSetData) {
			super(AntitheftSet, data);
		}
	};

	public static readonly AntitheftGet = class AntitheftGet extends CommandPacket<void> {
		public static readonly CommandClass = AntitheftV2;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "AntitheftGet",
			"help": "Anti-theft Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(AntitheftV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AntitheftGet, data);
		}
	};

	public static readonly AntitheftReport = class AntitheftReport extends CommandPacket<AntitheftV2AntitheftReportData> {
		public static readonly CommandClass = AntitheftV2;
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
						"ref": "antiTheftHintNumberBytes"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(AntitheftV2)?.command === this.command;
		}

		constructor(data: Buffer | AntitheftV2AntitheftReportData) {
			super(AntitheftReport, data);
		}
	};
}

export namespace AntitheftV2 {
	export type AntitheftSet = InstanceType<typeof AntitheftV2.AntitheftSet>;
	export type AntitheftGet = InstanceType<typeof AntitheftV2.AntitheftGet>;
	export type AntitheftReport = InstanceType<typeof AntitheftV2.AntitheftReport>;
}
