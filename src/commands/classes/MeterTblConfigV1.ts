/**
 * Command Class Meter Tbl Config, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum MeterTblConfigV1Commands {
	MeterTblTablePointAdmNoSet = 0x01,
}

export interface MeterTblConfigV1MeterTblTablePointAdmNoSetData {
	meterPointAdmNumberCharacter: Buffer; // variable length
}

export class MeterTblConfigV1 extends CommandClassPacket<MeterTblConfigV1Commands> {
	public static readonly commandClass = CommandClasses.MeterTblConfig; // 0x3c (60)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(MeterTblConfigV1, commandAndPayload);
	}

	public static readonly MeterTblTablePointAdmNoSet = class MeterTblTablePointAdmNoSet extends CommandPacket<MeterTblConfigV1MeterTblTablePointAdmNoSetData> {
		public static readonly CommandClass = MeterTblConfigV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "MeterTblTablePointAdmNoSet",
			"help": "Meter Tbl Table Point Adm No Set",
			"status": "Active",
			"params": [
				{
					"type": "Bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "Integer",
							"name": "reserved",
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"fieldType": "Integer",
							"name": "numberOfCharacters",
							"mask": 31,
							"shift": 0,
							"lengthOf": {
								"refs": [
									"meterPointAdmNumberCharacter"
								]
							},
							"isAutogenerated": true
						}
					]
				},
				{
					"type": "Blob",
					"name": "meterPointAdmNumberCharacter",
					"help": "Meter Point Adm Number Character",
					"length": {
						"lengthType": "Ref",
						"from": {
							"ref": "properties1.numberOfCharacters"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

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
