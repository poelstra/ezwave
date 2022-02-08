/**
 * Command Class Ip Association, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum IpAssociationV1Commands {
	IpAssociationSet = 0x01,
	IpAssociationGet = 0x02,
	IpAssociationReport = 0x03,
	IpAssociationRemove = 0x04,
}

export interface IpAssociationV1IpAssociationSetData {
	groupingIdentifier: number; // 1 byte unsigned integer
	ipv6Address: Buffer; // 16 bytes
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
	ipv6Address: Buffer; // 16 bytes
	endPoint: number; // 1 byte unsigned integer
}

export interface IpAssociationV1IpAssociationRemoveData {
	groupingIdentifier: number; // 1 byte unsigned integer
	ipv6Address: Buffer; // 16 bytes
	endPoint: number; // 1 byte unsigned integer
}

export class IpAssociationV1 extends CommandClassPacket<IpAssociationV1Commands> {
	public static readonly commandClass: number = CommandClasses.IpAssociation; // 0x5c (92)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(IpAssociationV1, commandAndPayload);
	}
}

export class IpAssociationSet extends CommandPacket<IpAssociationV1IpAssociationSetData> {
	public static readonly CommandClass: typeof IpAssociationV1 = IpAssociationV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "IpAssociationSet",
		"help": "IP Association Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "groupingIdentifier",
				"help": "Grouping Identifier",
				"length": 1
			},
			{
				"type": "Blob",
				"name": "ipv6Address",
				"help": "IPv6 Address",
				"length": 16
			},
			{
				"type": "Integer",
				"name": "endPoint",
				"help": "End Point",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IpAssociationV1)?.command === this.command;
	}

	public constructor(data: Buffer | IpAssociationV1IpAssociationSetData) {
		super(IpAssociationSet, data);
	}
};

export class IpAssociationGet extends CommandPacket<IpAssociationV1IpAssociationGetData> {
	public static readonly CommandClass: typeof IpAssociationV1 = IpAssociationV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "IpAssociationGet",
		"help": "IP Association Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "groupingIdentifier",
				"help": "Grouping Identifier",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "index",
				"help": "Index",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IpAssociationV1)?.command === this.command;
	}

	public constructor(data: Buffer | IpAssociationV1IpAssociationGetData) {
		super(IpAssociationGet, data);
	}
};

export class IpAssociationReport extends CommandPacket<IpAssociationV1IpAssociationReportData> {
	public static readonly CommandClass: typeof IpAssociationV1 = IpAssociationV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "IpAssociationReport",
		"help": "IP Association Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "groupingIdentifier",
				"help": "Grouping Identifier",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "index",
				"help": "Index",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "actualNodes",
				"help": "Actual Nodes",
				"length": 1
			},
			{
				"type": "Blob",
				"name": "ipv6Address",
				"help": "IPv6 Address",
				"length": 16
			},
			{
				"type": "Integer",
				"name": "endPoint",
				"help": "End Point",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IpAssociationV1)?.command === this.command;
	}

	public constructor(data: Buffer | IpAssociationV1IpAssociationReportData) {
		super(IpAssociationReport, data);
	}
};

export class IpAssociationRemove extends CommandPacket<IpAssociationV1IpAssociationRemoveData> {
	public static readonly CommandClass: typeof IpAssociationV1 = IpAssociationV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "IpAssociationRemove",
		"help": "IP Association Remove",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "groupingIdentifier",
				"help": "Grouping Identifier",
				"length": 1
			},
			{
				"type": "Blob",
				"name": "ipv6Address",
				"help": "IPv6 Address",
				"length": 16
			},
			{
				"type": "Integer",
				"name": "endPoint",
				"help": "End Point",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IpAssociationV1)?.command === this.command;
	}

	public constructor(data: Buffer | IpAssociationV1IpAssociationRemoveData) {
		super(IpAssociationRemove, data);
	}
};
