/**
 * Command Class Transport Service, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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

// This (version of the) command class is Obsolete
export class TransportServiceV1 extends CommandClassPacket<TransportServiceV1Commands> {
	public static readonly commandClass: number = CommandClasses.TransportService; // 0x55 (85)
	public static readonly version: number = 1;
	public static readonly commandMask: number = 0xf8;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(TransportServiceV1, commandAndPayload);
	}
}

export class CommandFirstFragment extends CommandPacket<TransportServiceV1CommandFirstFragmentData> {
	public static readonly CommandClass: typeof TransportServiceV1 = TransportServiceV1;
	public static readonly command: number = 0xc0; // 192
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 192,
		"name": "CommandFirstFragment",
		"help": "First Fragment",
		"status": "Active",
		"cmdMask": 248,
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "datagramSize1",
						"mask": 7,
						"shift": 0
					}
				],
				"cmdMask": 7
			},
			{
				"type": "Integer",
				"name": "datagramSize2",
				"help": "datagram_size_2",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "properties2",
				"help": "Properties2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 240,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "sequenceNo",
						"mask": 15,
						"shift": 0
					}
				]
			},
			{
				"type": "Blob",
				"name": "payload",
				"help": "Payload",
				"length": {
					"lengthType": "Auto"
				}
			},
			{
				"type": "Integer",
				"name": "checksum",
				"help": "Checksum",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(TransportServiceV1)?.command === this.command;
	}

	public constructor(data: Buffer | TransportServiceV1CommandFirstFragmentData) {
		super(CommandFirstFragment, data);
	}
};

export class CommandSubsequentFragment extends CommandPacket<TransportServiceV1CommandSubsequentFragmentData> {
	public static readonly CommandClass: typeof TransportServiceV1 = TransportServiceV1;
	public static readonly command: number = 0xe0; // 224
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 224,
		"name": "CommandSubsequentFragment",
		"help": "Subsequent Fragment",
		"status": "Active",
		"cmdMask": 248,
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "datagramSize1",
						"mask": 7,
						"shift": 0
					}
				],
				"cmdMask": 7
			},
			{
				"type": "Integer",
				"name": "datagramSize2",
				"help": "datagram_size_2",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "properties2",
				"help": "Properties2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "reserved",
						"mask": 128,
						"shift": 7,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "sequenceNo",
						"mask": 120,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "datagramOffset1",
						"mask": 7,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "datagramOffset2",
				"help": "datagram_offset_2",
				"length": 1
			},
			{
				"type": "Blob",
				"name": "payload",
				"help": "Payload",
				"length": {
					"lengthType": "Auto"
				}
			},
			{
				"type": "Integer",
				"name": "checksum",
				"help": "Checksum",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(TransportServiceV1)?.command === this.command;
	}

	public constructor(data: Buffer | TransportServiceV1CommandSubsequentFragmentData) {
		super(CommandSubsequentFragment, data);
	}
};
