/**
 * Command Class CRC16 Encap, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum Crc16EncapV1Commands {
	Crc16Encap = 0x01,
}

export interface Crc16EncapV1Crc16EncapData {
	commandClass: number; // 1 byte unsigned integer
	command: number; // 1 byte unsigned integer
	data: Buffer; // automatic length
	checksum: number; // 2 byte unsigned integer
}

export class Crc16EncapV1 extends CommandClassPacket<Crc16EncapV1Commands> {
	public static readonly commandClass = CommandClasses.Crc16Encap; // 0x56 (86)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(Crc16EncapV1, commandAndPayload);
	}

	public static readonly Crc16Encap = class Crc16Encap extends CommandPacket<Crc16EncapV1Crc16EncapData> {
		public static readonly CommandClass = Crc16EncapV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "Crc16Encap",
			"help": "CRC16 Encap",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "commandClass",
					"help": "Command Class",
					"length": 1,
					"valueType": "CMD_CLASS_REF"
				},
				{
					"type": "integer",
					"name": "command",
					"help": "Command",
					"length": 1,
					"valueType": "CMD_REF"
				},
				{
					"type": "blob",
					"name": "data",
					"help": "Data",
					"length": {
						"lengthType": "auto"
					},
					"blobType": "CommandData"
				},
				{
					"type": "integer",
					"name": "checksum",
					"help": "Checksum",
					"length": 2
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(Crc16EncapV1)?.command === this.command;
		}

		constructor(data: Buffer | Crc16EncapV1Crc16EncapData) {
			super(Crc16Encap, data);
		}
	};
}

export namespace Crc16EncapV1 {
	export type Crc16Encap = InstanceType<typeof Crc16EncapV1.Crc16Encap>;
}
