/**
 * Command Class Meter Tbl Config, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum MeterTblConfigV1Commands {
	MeterTblTablePointAdmNoSet = 0x01,
}

export interface MeterTblConfigV1MeterTblTablePointAdmNoSetData {
	numberOfCharacters: number; // properties1[4..0]
	// TODO param meterPointAdmNumberCharacter type blob
}

export class MeterTblConfigV1 extends CommandClassPacket<MeterTblConfigV1Commands> {
	public static readonly commandClass = CommandClasses.MeterTblConfig; // 0x3c (60)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(MeterTblConfigV1, commandAndPayload);
	}

	public static readonly MeterTblTablePointAdmNoSet = class MeterTblTablePointAdmNoSet extends CommandPacket<MeterTblConfigV1MeterTblTablePointAdmNoSetData> {
		public static readonly CommandClass = MeterTblConfigV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "MeterTblTablePointAdmNoSet",
			"help": "Meter Tbl Table Point Adm No Set",
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
							"name": "reserved",
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "numberOfCharacters",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "blob",
					"name": "meterPointAdmNumberCharacter",
					"help": "Meter Point Adm Number Character",
					"length": {
						"name": "Properties1",
						"bitfield": {
							"mask": 31,
							"shift": 0,
							"name": "numberOfCharacters"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterTblConfigV1)?.command === this.command;
		}

		constructor(data: Buffer | MeterTblConfigV1MeterTblTablePointAdmNoSetData) {
			super(MeterTblTablePointAdmNoSet, data);
		}
	};
}

export namespace MeterTblConfigV1 {
	export type MeterTblTablePointAdmNoSet = InstanceType<typeof MeterTblConfigV1.MeterTblTablePointAdmNoSet>;
}
