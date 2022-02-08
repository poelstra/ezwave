/**
 * Command Class Z/IP, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum ZipV1Commands {
	CommandZipPacket = 0x02,
}

export interface ZipV1CommandZipPacketData {
	ackRequest: boolean; // properties1[7]
	ackResponse: boolean; // properties1[6]
	nackResponse: boolean; // properties1[5]
	nackWaiting: boolean; // properties1[4]
	nackQueueFull: boolean; // properties1[3]
	nackOptionError: boolean; // properties1[2]
	moreInformation: boolean; // properties2[5]
	seqNo: number; // 1 byte unsigned integer
	sourceEndPoint: number; // properties3[6..0]
	bitAddress: boolean; // properties4[7]
	destinationEndPoint: number; // properties4[6..0]
	headerExtension?: Buffer; // automatic length
	zWaveCommand?: Buffer; // automatic length
}

// This (version of the) command class is Obsolete
export class ZipV1 extends CommandClassPacket<ZipV1Commands> {
	public static readonly commandClass: number = CommandClasses.Zip; // 0x23 (35)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ZipV1, commandAndPayload);
	}
}

export class CommandZipPacket extends CommandPacket<ZipV1CommandZipPacketData> {
	public static readonly CommandClass: typeof ZipV1 = ZipV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "CommandZipPacket",
		"help": "Zip Packet",
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
						"name": "ackRequest",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Boolean",
						"name": "ackResponse",
						"mask": 64,
						"shift": 6
					},
					{
						"fieldType": "Boolean",
						"name": "nackResponse",
						"mask": 32,
						"shift": 5
					},
					{
						"fieldType": "Boolean",
						"name": "nackWaiting",
						"mask": 16,
						"shift": 4
					},
					{
						"fieldType": "Boolean",
						"name": "nackQueueFull",
						"mask": 8,
						"shift": 3
					},
					{
						"fieldType": "Boolean",
						"name": "nackOptionError",
						"mask": 4,
						"shift": 2
					},
					{
						"fieldType": "Integer",
						"name": "reserved1",
						"mask": 3,
						"shift": 0,
						"reserved": true
					}
				]
			},
			{
				"type": "Bitfield",
				"name": "properties2",
				"help": "Properties2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "headerExtIncluded",
						"mask": 128,
						"shift": 7,
						"presenceOf": {
							"refs": [
								"headerExtension"
							]
						},
						"isAutogenerated": true
					},
					{
						"fieldType": "Boolean",
						"name": "zWaveCmdIncluded",
						"mask": 64,
						"shift": 6,
						"presenceOf": {
							"refs": [
								"zWaveCommand"
							]
						},
						"isAutogenerated": true
					},
					{
						"fieldType": "Boolean",
						"name": "moreInformation",
						"mask": 32,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "reserved2",
						"mask": 31,
						"shift": 0,
						"reserved": true
					}
				]
			},
			{
				"type": "Integer",
				"name": "seqNo",
				"help": "Seq No",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "properties3",
				"help": "Properties3",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "reserved3",
						"mask": 128,
						"shift": 7,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "sourceEndPoint",
						"mask": 127,
						"shift": 0
					}
				]
			},
			{
				"type": "Bitfield",
				"name": "properties4",
				"help": "Properties4",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "bitAddress",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "destinationEndPoint",
						"mask": 127,
						"shift": 0
					}
				]
			},
			{
				"type": "Blob",
				"name": "headerExtension",
				"help": "Header extension",
				"optional": {
					"ref": "properties2.headerExtIncluded"
				},
				"length": {
					"lengthType": "Auto"
				}
			},
			{
				"type": "Blob",
				"name": "zWaveCommand",
				"help": "Z-Wave command",
				"optional": {
					"ref": "properties2.zWaveCmdIncluded"
				},
				"length": {
					"lengthType": "Auto"
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ZipV1)?.command === this.command;
	}

	public constructor(data: Buffer | ZipV1CommandZipPacketData) {
		super(CommandZipPacket, data);
	}
};
