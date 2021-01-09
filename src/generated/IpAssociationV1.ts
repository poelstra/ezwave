/**
 * Command Class Ip Association, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum IpAssociationV1Commands {
	IpAssociationSet = 0x01,
	IpAssociationGet = 0x02,
	IpAssociationReport = 0x03,
	IpAssociationRemove = 0x04,
}

export interface IpAssociationV1IpAssociationSetData {
	groupingIdentifier: number; // 1 byte unsigned integer
	iPv6Address: Buffer; // 16 bytes
	endPoint: number; // 1 byte unsigned integer
}

export interface IpAssociationV1IpAssociationGetData {
	groupingIdentifier: number; // 1 byte unsigned integer
	index: number; // 1 byte unsigned integer
}

export interface IpAssociationV1IpAssociationReportData {
	groupingIdentifier: number; // 1 byte unsigned integer
	index: number; // 1 byte unsigned integer
	actualNodes: number; // 1 byte unsigned integer
	iPv6Address: Buffer; // 16 bytes
	endPoint: number; // 1 byte unsigned integer
}

export interface IpAssociationV1IpAssociationRemoveData {
	groupingIdentifier: number; // 1 byte unsigned integer
	iPv6Address: Buffer; // 16 bytes
	endPoint: number; // 1 byte unsigned integer
}

export class IpAssociationV1 extends CommandClassPacket<IpAssociationV1Commands> {
	public static readonly commandClass = CommandClasses.IpAssociation; // 0x5c (92)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(IpAssociationV1, commandAndPayload);
	}

	public static readonly IpAssociationSet = class IpAssociationSet extends CommandPacket<IpAssociationV1IpAssociationSetData> {
		public static readonly CommandClass = IpAssociationV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "IpAssociationSet",
			"help": "IP Association Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "groupingIdentifier",
					"help": "Grouping Identifier",
					"length": 1
				},
				{
					"type": "blob",
					"name": "iPv6Address",
					"help": "IPv6 Address",
					"length": 16
				},
				{
					"type": "integer",
					"name": "endPoint",
					"help": "End Point",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(IpAssociationV1)?.command === this.command;
		}

		constructor(data: Buffer | IpAssociationV1IpAssociationSetData) {
			super(IpAssociationSet, data);
		}
	};

	public static readonly IpAssociationGet = class IpAssociationGet extends CommandPacket<IpAssociationV1IpAssociationGetData> {
		public static readonly CommandClass = IpAssociationV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "IpAssociationGet",
			"help": "IP Association Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "groupingIdentifier",
					"help": "Grouping Identifier",
					"length": 1
				},
				{
					"type": "integer",
					"name": "index",
					"help": "Index",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(IpAssociationV1)?.command === this.command;
		}

		constructor(data: Buffer | IpAssociationV1IpAssociationGetData) {
			super(IpAssociationGet, data);
		}
	};

	public static readonly IpAssociationReport = class IpAssociationReport extends CommandPacket<IpAssociationV1IpAssociationReportData> {
		public static readonly CommandClass = IpAssociationV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "IpAssociationReport",
			"help": "IP Association Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "groupingIdentifier",
					"help": "Grouping Identifier",
					"length": 1
				},
				{
					"type": "integer",
					"name": "index",
					"help": "Index",
					"length": 1
				},
				{
					"type": "integer",
					"name": "actualNodes",
					"help": "Actual Nodes",
					"length": 1
				},
				{
					"type": "blob",
					"name": "iPv6Address",
					"help": "IPv6 Address",
					"length": 16
				},
				{
					"type": "integer",
					"name": "endPoint",
					"help": "End Point",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(IpAssociationV1)?.command === this.command;
		}

		constructor(data: Buffer | IpAssociationV1IpAssociationReportData) {
			super(IpAssociationReport, data);
		}
	};

	public static readonly IpAssociationRemove = class IpAssociationRemove extends CommandPacket<IpAssociationV1IpAssociationRemoveData> {
		public static readonly CommandClass = IpAssociationV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "IpAssociationRemove",
			"help": "IP Association Remove",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "groupingIdentifier",
					"help": "Grouping Identifier",
					"length": 1
				},
				{
					"type": "blob",
					"name": "iPv6Address",
					"help": "IPv6 Address",
					"length": 16
				},
				{
					"type": "integer",
					"name": "endPoint",
					"help": "End Point",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(IpAssociationV1)?.command === this.command;
		}

		constructor(data: Buffer | IpAssociationV1IpAssociationRemoveData) {
			super(IpAssociationRemove, data);
		}
	};
}

export namespace IpAssociationV1 {
	export type IpAssociationSet = InstanceType<typeof IpAssociationV1.IpAssociationSet>;
	export type IpAssociationGet = InstanceType<typeof IpAssociationV1.IpAssociationGet>;
	export type IpAssociationReport = InstanceType<typeof IpAssociationV1.IpAssociationReport>;
	export type IpAssociationRemove = InstanceType<typeof IpAssociationV1.IpAssociationRemove>;
}
