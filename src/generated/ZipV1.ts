/**
 * Command Class Z/IP, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ZipV1Commands {
	CommandZipPacket = 0x02,
}

export interface ZipV1CommandZipPacketData {
	// TODO param properties1 type bitfield
	// TODO param properties2 type bitfield
	seqNo: number; // 1 byte unsigned integer
	// TODO param properties3 type bitfield
	// TODO param properties4 type bitfield
	// TODO param headerExtension type blob
	// TODO param zWaveCommand type blob
}

// Obsolete
export class ZipV1 extends CommandClassPacket<ZipV1Commands> {
	public static readonly commandClass = CommandClasses.Zip; // 0x23 (35)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ZipV1, commandAndPayload);
	}

	public static readonly CommandZipPacket = class CommandZipPacket extends CommandPacket<ZipV1CommandZipPacketData> {
		public static readonly CommandClass = ZipV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "CommandZipPacket",
			"help": "Zip Packet",
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
							"name": "Ack Request",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "boolean",
							"name": "NAck - Option Error",
							"mask": 4,
							"shift": 2
						},
						{
							"type": "boolean",
							"name": "NAck - Queue Full",
							"mask": 8,
							"shift": 3
						},
						{
							"type": "boolean",
							"name": "NAck - Waiting",
							"mask": 16,
							"shift": 4
						},
						{
							"type": "boolean",
							"name": "NAck Response",
							"mask": 32,
							"shift": 5
						},
						{
							"type": "boolean",
							"name": "Ack Response",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "integer",
							"name": "Reserved1",
							"mask": 3,
							"shift": 0
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Reserved2",
							"mask": 31,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "More Information",
							"mask": 32,
							"shift": 5
						},
						{
							"type": "boolean",
							"name": "Z-Wave Cmd Included",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "boolean",
							"name": "Header ext. included",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "integer",
					"name": "seqNo",
					"help": "Seq No",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Source End Point",
							"mask": 127,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Reserved3",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties4",
					"help": "Properties4",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Destination End Point",
							"mask": 127,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Bit Address",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "blob",
					"name": "headerExtension",
					"help": "Header extension",
					"optional": {
						"name": "Properties2",
						"mask": 128
					},
					"length": "auto"
				},
				{
					"type": "blob",
					"name": "zWaveCommand",
					"help": "Z-Wave command",
					"optional": {
						"name": "Properties2",
						"mask": 64
					},
					"length": "auto"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipV1)?.command === this.command;
		}

		constructor(data: Buffer | ZipV1CommandZipPacketData) {
			super(CommandZipPacket, data);
		}
	};
}

export namespace ZipV1 {
	export type CommandZipPacket = InstanceType<typeof ZipV1.CommandZipPacket>;
}
