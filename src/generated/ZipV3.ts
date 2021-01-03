/**
 * Command Class Z/IP, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ZipV3Commands {
	CommandZipPacket = 0x02,
}

export interface ZipV3CommandZipPacketData {
	ackRequest: boolean; // properties1[7]
	ackResponse: boolean; // properties1[6]
	nAckResponse: boolean; // properties1[5]
	nAckWaiting: boolean; // properties1[4]
	nAckQueueFull: boolean; // properties1[3]
	nAckOptionError: boolean; // properties1[2]
	moreInformation: boolean; // properties2[5]
	secureOrigin: boolean; // properties2[4]
	seqNo: number; // 1 byte unsigned integer
	sourceEndPoint: number; // properties3[6..0]
	bitAddress: boolean; // properties4[7]
	destinationEndPoint: number; // properties4[6..0]
	headerExtension?: Buffer; // variable length
	zWaveCommand?: Buffer; // automatic length
}

export class ZipV3 extends CommandClassPacket<ZipV3Commands> {
	public static readonly commandClass = CommandClasses.Zip; // 0x23 (35)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ZipV3, commandAndPayload);
	}

	public static readonly CommandZipPacket = class CommandZipPacket extends CommandPacket<ZipV3CommandZipPacketData> {
		public static readonly CommandClass = ZipV3;
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
							"name": "ackRequest",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "boolean",
							"name": "ackResponse",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "boolean",
							"name": "nAckResponse",
							"mask": 32,
							"shift": 5
						},
						{
							"type": "boolean",
							"name": "nAckWaiting",
							"mask": 16,
							"shift": 4
						},
						{
							"type": "boolean",
							"name": "nAckQueueFull",
							"mask": 8,
							"shift": 3
						},
						{
							"type": "boolean",
							"name": "nAckOptionError",
							"mask": 4,
							"shift": 2
						},
						{
							"type": "integer",
							"name": "reserved1",
							"mask": 3,
							"shift": 0,
							"reserved": true
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
							"type": "boolean",
							"name": "headerExtIncluded",
							"mask": 128,
							"shift": 7,
							"presenceOf": {
								"refs": [
									{
										"name": "headerLength"
									},
									{
										"name": "headerExtension"
									}
								]
							}
						},
						{
							"type": "boolean",
							"name": "zWaveCmdIncluded",
							"mask": 64,
							"shift": 6,
							"presenceOf": {
								"refs": [
									{
										"name": "zWaveCommand"
									}
								]
							}
						},
						{
							"type": "boolean",
							"name": "moreInformation",
							"mask": 32,
							"shift": 5
						},
						{
							"type": "boolean",
							"name": "secureOrigin",
							"mask": 16,
							"shift": 4
						},
						{
							"type": "integer",
							"name": "reserved2",
							"mask": 15,
							"shift": 0,
							"reserved": true
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
							"type": "boolean",
							"name": "reserved3",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "sourceEndPoint",
							"mask": 127,
							"shift": 0
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
							"type": "boolean",
							"name": "bitAddress",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "destinationEndPoint",
							"mask": 127,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "headerLength",
					"help": "Header Length",
					"optional": {
						"ref": "properties2",
						"bitfield": {
							"mask": 128,
							"shift": 7,
							"name": "headerExtIncluded"
						}
					},
					"length": 1,
					"lengthOf": {
						"refs": [
							{
								"name": "headerExtension"
							}
						]
					}
				},
				{
					"type": "blob",
					"name": "headerExtension",
					"help": "Header extension",
					"optional": {
						"ref": "properties2",
						"bitfield": {
							"mask": 128,
							"shift": 7,
							"name": "headerExtIncluded"
						}
					},
					"length": {
						"lengthType": "ref",
						"ref": "headerLength"
					},
					"includeBytesBefore": 1
				},
				{
					"type": "blob",
					"name": "zWaveCommand",
					"help": "Z-Wave command",
					"optional": {
						"ref": "properties2",
						"bitfield": {
							"mask": 64,
							"shift": 6,
							"name": "zWaveCmdIncluded"
						}
					},
					"length": {
						"lengthType": "auto",
						"endOffset": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipV3)?.command === this.command;
		}

		constructor(data: Buffer | ZipV3CommandZipPacketData) {
			super(CommandZipPacket, data);
		}
	};
}

export namespace ZipV3 {
	export type CommandZipPacket = InstanceType<typeof ZipV3.CommandZipPacket>;
}
