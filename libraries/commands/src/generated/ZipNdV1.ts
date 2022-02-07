/**
 * Command Class Z/IP-ND, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum ZipNdV1Commands {
	ZipNodeSolicitation = 0x03,
	ZipInvNodeSolicitation = 0x04,
	ZipNodeAdvertisement = 0x01,
}

export interface ZipNdV1ZipNodeSolicitationData {
	nodeId: number; // 1 byte unsigned integer
	ipv6Address: Buffer; // 16 bytes
}

export interface ZipNdV1ZipInvNodeSolicitationData {
	local: boolean; // properties1[2]
	nodeId: number; // 1 byte unsigned integer
}

export interface ZipNdV1ZipNodeAdvertisementData {
	local: boolean; // properties1[2]
	validity: ValidityEnum; // properties1[1..0]
	nodeId: number; // 1 byte unsigned integer
	ipv6Address: Buffer; // 16 bytes
	homeId: Buffer; // 4 bytes
}

export enum ValidityEnum {
	InformationOk = 0x0,
	InformationObsolete = 0x1,
	InformationNotFound = 0x2,
}

export class ZipNdV1 extends CommandClassPacket<ZipNdV1Commands> {
	public static readonly commandClass = CommandClasses.ZipNd; // 0x58 (88)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ZipNdV1, commandAndPayload);
	}
}

export class ZipNodeSolicitation extends CommandPacket<ZipNdV1ZipNodeSolicitationData> {
	public static readonly CommandClass = ZipNdV1;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "ZipNodeSolicitation",
		"help": "Zip Node Solicitation",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "reserved",
				"help": "Reserved",
				"length": 1,
				"reserved": true
			},
			{
				"type": "Integer",
				"name": "nodeId",
				"help": "Node ID",
				"length": 1,
				"valueType": "NodeNumber"
			},
			{
				"type": "Blob",
				"name": "ipv6Address",
				"help": "IPv6 Address",
				"length": 16
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZipNdV1)?.command === this.command;
	}

	public constructor(data: Buffer | ZipNdV1ZipNodeSolicitationData) {
		super(ZipNodeSolicitation, data);
	}
};

export class ZipInvNodeSolicitation extends CommandPacket<ZipNdV1ZipInvNodeSolicitationData> {
	public static readonly CommandClass = ZipNdV1;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
		"command": 4,
		"name": "ZipInvNodeSolicitation",
		"help": "Zip Inverse Node Solicitation",
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
						"name": "reserved2",
						"mask": 248,
						"shift": 3,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "local",
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
				"type": "Integer",
				"name": "nodeId",
				"help": "Node ID",
				"length": 1,
				"valueType": "NodeNumber"
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZipNdV1)?.command === this.command;
	}

	public constructor(data: Buffer | ZipNdV1ZipInvNodeSolicitationData) {
		super(ZipInvNodeSolicitation, data);
	}
};

export class ZipNodeAdvertisement extends CommandPacket<ZipNdV1ZipNodeAdvertisementData> {
	public static readonly CommandClass = ZipNdV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "ZipNodeAdvertisement",
		"help": "Zip Node Advertisement",
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
						"mask": 248,
						"shift": 3,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "local",
						"mask": 4,
						"shift": 2
					},
					{
						"fieldType": "Enum",
						"name": "validity",
						"mask": 3,
						"shift": 0,
						"values": {
							"0": {
								"name": "InformationOk",
								"help": "INFORMATION_OK"
							},
							"1": {
								"name": "InformationObsolete",
								"help": "INFORMATION_OBSOLETE"
							},
							"2": {
								"name": "InformationNotFound",
								"help": "INFORMATION_NOT_FOUND"
							}
						}
					}
				]
			},
			{
				"type": "Integer",
				"name": "nodeId",
				"help": "Node ID",
				"length": 1,
				"valueType": "NodeNumber"
			},
			{
				"type": "Blob",
				"name": "ipv6Address",
				"help": "IPv6 Address",
				"length": 16
			},
			{
				"type": "Blob",
				"name": "homeId",
				"help": "Home ID",
				"length": 4
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ZipNdV1)?.command === this.command;
	}

	public constructor(data: Buffer | ZipNdV1ZipNodeAdvertisementData) {
		super(ZipNodeAdvertisement, data);
	}
};
