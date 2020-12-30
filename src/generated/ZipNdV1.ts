/**
 * Command Class Z/IP-ND, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ZipNdV1Commands {
	ZipNodeSolicitation = 0x03,
	ZipInvNodeSolicitation = 0x04,
	ZipNodeAdvertisement = 0x01,
}

export interface ZipNdV1ZipNodeSolicitationData {
	nodeID: number; // 1 byte unsigned integer
	// TODO param iPv6Address type blob
}

export interface ZipNdV1ZipInvNodeSolicitationData {
	local: boolean; // properties1[2]
	nodeID: number; // 1 byte unsigned integer
}

export interface ZipNdV1ZipNodeAdvertisementData {
	local: boolean; // properties1[2]
	validity: ValidityEnum; // properties1[1..0]
	nodeID: number; // 1 byte unsigned integer
	// TODO param iPv6Address type blob
	// TODO param homeID type blob
}

export enum ValidityEnum {
	InformationOk = 0x0,
	InformationObsolete = 0x1,
	InformationNotFound = 0x2,
}

export class ZipNdV1 extends CommandClassPacket<ZipNdV1Commands> {
	public static readonly commandClass = CommandClasses.ZipNd; // 0x58 (88)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ZipNdV1, commandAndPayload);
	}

	public static readonly ZipNodeSolicitation = class ZipNodeSolicitation extends CommandPacket<ZipNdV1ZipNodeSolicitationData> {
		public static readonly CommandClass = ZipNdV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "ZipNodeSolicitation",
			"help": "Zip Node Solicitation",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "reserved",
					"help": "Reserved",
					"length": 1,
					"reserved": true
				},
				{
					"type": "integer",
					"name": "nodeID",
					"help": "Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "blob",
					"name": "iPv6Address",
					"help": "IPv6 Address",
					"length": 16
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipNdV1)?.command === this.command;
		}

		constructor(data: Buffer | ZipNdV1ZipNodeSolicitationData) {
			super(ZipNodeSolicitation, data);
		}
	};

	public static readonly ZipInvNodeSolicitation = class ZipInvNodeSolicitation extends CommandPacket<ZipNdV1ZipInvNodeSolicitationData> {
		public static readonly CommandClass = ZipNdV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "ZipInvNodeSolicitation",
			"help": "Zip Inverse Node Solicitation",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved2",
							"mask": 248,
							"shift": 3,
							"reserved": true
						},
						{
							"type": "boolean",
							"name": "local",
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
					"type": "integer",
					"name": "nodeID",
					"help": "Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipNdV1)?.command === this.command;
		}

		constructor(data: Buffer | ZipNdV1ZipInvNodeSolicitationData) {
			super(ZipInvNodeSolicitation, data);
		}
	};

	public static readonly ZipNodeAdvertisement = class ZipNodeAdvertisement extends CommandPacket<ZipNdV1ZipNodeAdvertisementData> {
		public static readonly CommandClass = ZipNdV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "ZipNodeAdvertisement",
			"help": "Zip Node Advertisement",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved",
							"mask": 248,
							"shift": 3,
							"reserved": true
						},
						{
							"type": "boolean",
							"name": "local",
							"mask": 4,
							"shift": 2
						},
						{
							"type": "enum",
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
					"type": "integer",
					"name": "nodeID",
					"help": "Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "blob",
					"name": "iPv6Address",
					"help": "IPv6 Address",
					"length": 16
				},
				{
					"type": "blob",
					"name": "homeID",
					"help": "Home ID",
					"length": 4
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipNdV1)?.command === this.command;
		}

		constructor(data: Buffer | ZipNdV1ZipNodeAdvertisementData) {
			super(ZipNodeAdvertisement, data);
		}
	};
}

export namespace ZipNdV1 {
	export type ZipNodeSolicitation = InstanceType<typeof ZipNdV1.ZipNodeSolicitation>;
	export type ZipInvNodeSolicitation = InstanceType<typeof ZipNdV1.ZipInvNodeSolicitation>;
	export type ZipNodeAdvertisement = InstanceType<typeof ZipNdV1.ZipNodeAdvertisement>;
}
