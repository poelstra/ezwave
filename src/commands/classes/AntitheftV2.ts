/**
 * Command Class Anti-theft, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum AntitheftV2Commands {
	AntitheftSet = 0x01,
	AntitheftGet = 0x02,
	AntitheftReport = 0x03,
}

export interface AntitheftV2AntitheftSetData {
	enable: boolean; // properties1[7]
	magicCode: Buffer; // variable length
	manufacturerId: number; // 2 byte unsigned integer
	antiTheftHint: Buffer; // variable length
}

export interface AntitheftV2AntitheftReportData {
	antiTheftProtectionStatus: number; // 1 byte unsigned integer
	manufacturerId: number; // 2 byte unsigned integer
	antiTheftHint: Buffer; // variable length
}

export class AntitheftV2 extends CommandClassPacket<AntitheftV2Commands> {
	public static readonly commandClass = CommandClasses.Antitheft; // 0x5d (93)
	public static readonly version = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(AntitheftV2, commandAndPayload);
	}

	public static readonly AntitheftSet = class AntitheftSet extends CommandPacket<AntitheftV2AntitheftSetData> {
		public static readonly CommandClass = AntitheftV2;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "AntitheftSet",
			"help": "Anti-theft Set",
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
							"name": "enable",
							"mask": 128,
							"shift": 7
						},
						{
							"fieldType": "Integer",
							"name": "numberOfMagicCodeBytes",
							"mask": 127,
							"shift": 0,
							"lengthOf": {
								"refs": [
									"magicCode"
								]
							},
							"isAutogenerated": true
						}
					]
				},
				{
					"type": "Blob",
					"name": "magicCode",
					"help": "Magic Code",
					"length": {
						"lengthType": "Ref",
						"from": {
							"ref": "properties1.numberOfMagicCodeBytes"
						}
					}
				},
				{
					"type": "Integer",
					"name": "manufacturerId",
					"help": "Manufacturer ID",
					"length": 2
				},
				{
					"type": "Integer",
					"name": "antiTheftHintNumberBytes",
					"help": "Anti-theft Hint Number Bytes",
					"length": 1,
					"lengthOf": {
						"refs": [
							"antiTheftHint"
						]
					},
					"isAutogenerated": true
				},
				{
					"type": "Blob",
					"name": "antiTheftHint",
					"help": "Anti-theft Hint ",
					"length": {
						"lengthType": "Ref",
						"from": {
							"ref": "antiTheftHintNumberBytes"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "AntitheftGet",
			"help": "Anti-theft Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "AntitheftReport",
			"help": "Anti-theft Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "antiTheftProtectionStatus",
					"help": "Anti-theft Protection Status",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "manufacturerId",
					"help": "Manufacturer ID",
					"length": 2
				},
				{
					"type": "Integer",
					"name": "antiTheftHintNumberBytes",
					"help": "Anti-theft Hint Number Bytes",
					"length": 1,
					"lengthOf": {
						"refs": [
							"antiTheftHint"
						]
					},
					"isAutogenerated": true
				},
				{
					"type": "Blob",
					"name": "antiTheftHint",
					"help": "Anti-theft Hint ",
					"length": {
						"lengthType": "Ref",
						"from": {
							"ref": "antiTheftHintNumberBytes"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

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
