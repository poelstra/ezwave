/**
 * Command Class Transport Service, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum TransportServiceV1Commands {
	CommandFirstFragment = 0xc0,
	CommandSubsequentFragment = 0xe0,
}

export interface TransportServiceV1CommandFirstFragmentData {
	datagramSize1: number; // properties1[2..0]
	datagramSize2: number; // 1 byte unsigned integer
	sequenceNo: number; // properties2[3..0]
	payload: Buffer; // automatic length
	checksum: number; // 2 byte unsigned integer
}

export interface TransportServiceV1CommandSubsequentFragmentData {
	datagramSize1: number; // properties1[2..0]
	datagramSize2: number; // 1 byte unsigned integer
	sequenceNo: number; // properties2[6..3]
	datagramOffset1: number; // properties2[2..0]
	datagramOffset2: number; // 1 byte unsigned integer
	payload: Buffer; // automatic length
	checksum: number; // 2 byte unsigned integer
}

// Obsolete
export class TransportServiceV1 extends CommandClassPacket<TransportServiceV1Commands> {
	public static readonly commandClass = CommandClasses.TransportService; // 0x55 (85)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(TransportServiceV1, commandAndPayload);
	}

	public static readonly CommandFirstFragment = class CommandFirstFragment extends CommandPacket<TransportServiceV1CommandFirstFragmentData> {
		public static readonly CommandClass = TransportServiceV1;
		public static readonly command = 0xc0;
		public static readonly definition = {
			"command": 192,
			"name": "CommandFirstFragment",
			"help": "First Fragment",
			"status": "active",
			"cmdMask": 248,
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "datagramSize1",
							"mask": 7,
							"shift": 0
						}
					],
					"cmdMask": 7
				},
				{
					"type": "integer",
					"name": "datagramSize2",
					"help": "datagram_size_2",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "sequenceNo",
							"mask": 15,
							"shift": 0
						}
					]
				},
				{
					"type": "blob",
					"name": "payload",
					"help": "Payload",
					"length": {
						"lengthType": "auto",
						"endOffset": 2
					}
				},
				{
					"type": "integer",
					"name": "checksum",
					"help": "Checksum",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TransportServiceV1)?.command === this.command;
		}

		constructor(data: Buffer | TransportServiceV1CommandFirstFragmentData) {
			super(CommandFirstFragment, data);
		}
	};

	public static readonly CommandSubsequentFragment = class CommandSubsequentFragment extends CommandPacket<TransportServiceV1CommandSubsequentFragmentData> {
		public static readonly CommandClass = TransportServiceV1;
		public static readonly command = 0xe0;
		public static readonly definition = {
			"command": 224,
			"name": "CommandSubsequentFragment",
			"help": "Subsequent Fragment",
			"status": "active",
			"cmdMask": 248,
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "datagramSize1",
							"mask": 7,
							"shift": 0
						}
					],
					"cmdMask": 7
				},
				{
					"type": "integer",
					"name": "datagramSize2",
					"help": "datagram_size_2",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "reserved",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "sequenceNo",
							"mask": 120,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "datagramOffset1",
							"mask": 7,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "datagramOffset2",
					"help": "datagram_offset_2",
					"length": 1
				},
				{
					"type": "blob",
					"name": "payload",
					"help": "Payload",
					"length": {
						"lengthType": "auto",
						"endOffset": 2
					}
				},
				{
					"type": "integer",
					"name": "checksum",
					"help": "Checksum",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TransportServiceV1)?.command === this.command;
		}

		constructor(data: Buffer | TransportServiceV1CommandSubsequentFragmentData) {
			super(CommandSubsequentFragment, data);
		}
	};
}

export namespace TransportServiceV1 {
	export type CommandFirstFragment = InstanceType<typeof TransportServiceV1.CommandFirstFragment>;
	export type CommandSubsequentFragment = InstanceType<typeof TransportServiceV1.CommandSubsequentFragment>;
}
