/**
 * Command Class Z/IP, version 4.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum ZipV4Commands {
	CommandZipPacket = 0x02,
	CommandZipKeepAlive = 0x03,
}

export interface ZipV4CommandZipPacketData {
	ackRequest: boolean; // properties1[7]
	ackResponse: boolean; // properties1[6]
	nackResponse: boolean; // properties1[5]
	nackWaiting: boolean; // properties1[4]
	nackQueueFull: boolean; // properties1[3]
	nackOptionError: boolean; // properties1[2]
	moreInformation: boolean; // properties2[5]
	secureOrigin: boolean; // properties2[4]
	seqNo: number; // 1 byte unsigned integer
	sourceEndPoint: number; // properties3[6..0]
	bitAddress: boolean; // properties4[7]
	destinationEndPoint: number; // properties4[6..0]
	headerExtension?: Buffer; // variable length
	zWaveCommand?: Buffer; // automatic length
}

export interface ZipV4CommandZipKeepAliveData {
	ackRequest: boolean; // properties1[7]
	ackResponce: boolean; // properties1[6]
}

export class ZipV4 extends CommandClassPacket<ZipV4Commands> {
	public static readonly commandClass: number = CommandClasses.Zip; // 0x23 (35)
	public static readonly version: number = 4;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ZipV4, commandAndPayload);
	}
}

export class CommandZipPacket extends CommandPacket<ZipV4CommandZipPacketData> {
	public static readonly CommandClass: typeof ZipV4 = ZipV4;
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
								"headerLength",
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
						"fieldType": "Boolean",
						"name": "secureOrigin",
						"mask": 16,
						"shift": 4
					},
					{
						"fieldType": "Integer",
						"name": "reserved2",
						"mask": 15,
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
				"type": "Integer",
				"name": "headerLength",
				"help": "Header Length",
				"optional": {
					"ref": "properties2.headerExtIncluded"
				},
				"length": 1,
				"lengthOf": {
					"refs": [
						"headerExtension"
					]
				},
				"isAutogenerated": true
			},
			{
				"type": "Blob",
				"name": "headerExtension",
				"help": "Header extension",
				"optional": {
					"ref": "properties2.headerExtIncluded"
				},
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "headerLength"
					},
					"offset": 1
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
		return packet.tryAs(ZipV4)?.command === this.command;
	}

	public constructor(data: Buffer | ZipV4CommandZipPacketData) {
		super(CommandZipPacket, data);
	}
};

export class CommandZipKeepAlive extends CommandPacket<ZipV4CommandZipKeepAliveData> {
	public static readonly CommandClass: typeof ZipV4 = ZipV4;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "CommandZipKeepAlive",
		"help": "Zip Keep Alive",
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
						"name": "ackResponce",
						"mask": 64,
						"shift": 6
					},
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 63,
						"shift": 0,
						"reserved": true
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ZipV4)?.command === this.command;
	}

	public constructor(data: Buffer | ZipV4CommandZipKeepAliveData) {
		super(CommandZipKeepAlive, data);
	}
};
