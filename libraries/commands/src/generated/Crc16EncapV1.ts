/**
 * Command Class CRC16 Encap, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(Crc16EncapV1, commandAndPayload);
	}
}

export class Crc16Encap extends CommandPacket<Crc16EncapV1Crc16EncapData> {
	public static readonly CommandClass = Crc16EncapV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "Crc16Encap",
		"help": "CRC16 Encap",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "commandClass",
				"help": "Command Class",
				"length": 1,
				"valueType": "CommandClass"
			},
			{
				"type": "Integer",
				"name": "command",
				"help": "Command",
				"length": 1,
				"valueType": "Command"
			},
			{
				"type": "Blob",
				"name": "data",
				"help": "Data",
				"length": {
					"lengthType": "Auto"
				},
				"blobType": "CommandData"
			},
			{
				"type": "Integer",
				"name": "checksum",
				"help": "Checksum",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(Crc16EncapV1)?.command === this.command;
	}

	public constructor(data: Buffer | Crc16EncapV1Crc16EncapData) {
		super(Crc16Encap, data);
	}
};
