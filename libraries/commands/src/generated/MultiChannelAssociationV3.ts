/**
 * Command Class Multi Channel Association, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum MultiChannelAssociationV3Commands {
	MultiChannelAssociationGet = 0x02,
	MultiChannelAssociationGroupingsGet = 0x05,
	MultiChannelAssociationGroupingsReport = 0x06,
	MultiChannelAssociationRemove = 0x04,
	MultiChannelAssociationReport = 0x03,
	MultiChannelAssociationSet = 0x01,
}

export interface MultiChannelAssociationV3MultiChannelAssociationGetData {
	groupingIdentifier: number; // 1 byte unsigned integer
}

export interface MultiChannelAssociationV3MultiChannelAssociationGroupingsReportData {
	supportedGroupings: number; // 1 byte unsigned integer
}

export interface MultiChannelAssociationV3MultiChannelAssociationRemoveData {
	groupingIdentifier: number; // 1 byte unsigned integer
	nodeIds: number[]; // automatic length
	vg: Array<{ // automatic length
		multiChannelNodeId: number; // 1 byte unsigned integer
		bitAddress: boolean; // properties1[7]
		endPoint: number; // properties1[6..0]
	}>;
}

export interface MultiChannelAssociationV3MultiChannelAssociationReportData {
	groupingIdentifier: number; // 1 byte unsigned integer
	maxNodesSupported: number; // 1 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	nodeIds: number[]; // automatic length
	vg: Array<{ // automatic length
		multiChannelNodeId: number; // 1 byte unsigned integer
		bitAddress: boolean; // properties1[7]
		endPoint: number; // properties1[6..0]
	}>;
}

export interface MultiChannelAssociationV3MultiChannelAssociationSetData {
	groupingIdentifier: number; // 1 byte unsigned integer
	nodeIds: number[]; // automatic length
	vg: Array<{ // automatic length
		multiChannelNodeId: number; // 1 byte unsigned integer
		bitAddress: boolean; // properties1[7]
		endPoint: number; // properties1[6..0]
	}>;
}

export class MultiChannelAssociationV3 extends CommandClassPacket<MultiChannelAssociationV3Commands> {
	public static readonly commandClass: number = CommandClasses.MultiChannelAssociation; // 0x8e (142)
	public static readonly version: number = 3;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(MultiChannelAssociationV3, commandAndPayload);
	}
}

export class MultiChannelAssociationGet extends CommandPacket<MultiChannelAssociationV3MultiChannelAssociationGetData> {
	public static readonly CommandClass: typeof MultiChannelAssociationV3 = MultiChannelAssociationV3;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "MultiChannelAssociationGet",
		"help": "Multi Channel Association Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "groupingIdentifier",
				"help": "Grouping Identifier",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MultiChannelAssociationV3)?.command === this.command;
	}

	public constructor(data: Buffer | MultiChannelAssociationV3MultiChannelAssociationGetData) {
		super(MultiChannelAssociationGet, data);
	}
};

export class MultiChannelAssociationGroupingsGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof MultiChannelAssociationV3 = MultiChannelAssociationV3;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "MultiChannelAssociationGroupingsGet",
		"help": "Multi Channel Association Groupings Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MultiChannelAssociationV3)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(MultiChannelAssociationGroupingsGet, data);
	}
};

export class MultiChannelAssociationGroupingsReport extends CommandPacket<MultiChannelAssociationV3MultiChannelAssociationGroupingsReportData> {
	public static readonly CommandClass: typeof MultiChannelAssociationV3 = MultiChannelAssociationV3;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 6,
		"name": "MultiChannelAssociationGroupingsReport",
		"help": "Multi Channel Association Groupings Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "supportedGroupings",
				"help": "Supported Groupings",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MultiChannelAssociationV3)?.command === this.command;
	}

	public constructor(data: Buffer | MultiChannelAssociationV3MultiChannelAssociationGroupingsReportData) {
		super(MultiChannelAssociationGroupingsReport, data);
	}
};

export class MultiChannelAssociationRemove extends CommandPacket<MultiChannelAssociationV3MultiChannelAssociationRemoveData> {
	public static readonly CommandClass: typeof MultiChannelAssociationV3 = MultiChannelAssociationV3;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "MultiChannelAssociationRemove",
		"help": "Multi Channel Association Remove",
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
				"name": "nodeIds",
				"help": "Node IDs",
				"length": {
					"lengthType": "Auto",
					"markers": [
						0
					]
				},
				"blobType": "NodeIds"
			},
			{
				"type": "Group",
				"name": "vg",
				"help": "vg",
				"length": {
					"lengthType": "Auto"
				},
				"params": [
					{
						"type": "Integer",
						"name": "multiChannelNodeId",
						"help": "Multi Channel Node ID",
						"length": 1,
						"valueType": "NodeNumber"
					},
					{
						"type": "Bitfield",
						"name": "properties1",
						"help": "Properties1",
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
								"name": "endPoint",
								"mask": 127,
								"shift": 0
							}
						]
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MultiChannelAssociationV3)?.command === this.command;
	}

	public constructor(data: Buffer | MultiChannelAssociationV3MultiChannelAssociationRemoveData) {
		super(MultiChannelAssociationRemove, data);
	}
};

export class MultiChannelAssociationReport extends CommandPacket<MultiChannelAssociationV3MultiChannelAssociationReportData> {
	public static readonly CommandClass: typeof MultiChannelAssociationV3 = MultiChannelAssociationV3;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "MultiChannelAssociationReport",
		"help": "Multi Channel Association Report",
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
				"name": "maxNodesSupported",
				"help": "Max Nodes Supported",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "reportsToFollow",
				"help": "Reports to Follow",
				"length": 1
			},
			{
				"type": "Blob",
				"name": "nodeIds",
				"help": "Node IDs",
				"length": {
					"lengthType": "Auto",
					"markers": [
						0
					]
				},
				"blobType": "NodeIds"
			},
			{
				"type": "Group",
				"name": "vg",
				"help": "vg",
				"length": {
					"lengthType": "Auto"
				},
				"params": [
					{
						"type": "Integer",
						"name": "multiChannelNodeId",
						"help": "Multi Channel Node ID",
						"length": 1,
						"valueType": "NodeNumber"
					},
					{
						"type": "Bitfield",
						"name": "properties1",
						"help": "Properties1",
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
								"name": "endPoint",
								"mask": 127,
								"shift": 0
							}
						]
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MultiChannelAssociationV3)?.command === this.command;
	}

	public constructor(data: Buffer | MultiChannelAssociationV3MultiChannelAssociationReportData) {
		super(MultiChannelAssociationReport, data);
	}
};

export class MultiChannelAssociationSet extends CommandPacket<MultiChannelAssociationV3MultiChannelAssociationSetData> {
	public static readonly CommandClass: typeof MultiChannelAssociationV3 = MultiChannelAssociationV3;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "MultiChannelAssociationSet",
		"help": "Multi Channel Association Set",
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
				"name": "nodeIds",
				"help": "Node IDs",
				"length": {
					"lengthType": "Auto",
					"markers": [
						0
					]
				},
				"blobType": "NodeIds"
			},
			{
				"type": "Group",
				"name": "vg",
				"help": "vg",
				"length": {
					"lengthType": "Auto"
				},
				"params": [
					{
						"type": "Integer",
						"name": "multiChannelNodeId",
						"help": "Multi Channel Node ID",
						"length": 1,
						"valueType": "NodeNumber"
					},
					{
						"type": "Bitfield",
						"name": "properties1",
						"help": "Properties1",
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
								"name": "endPoint",
								"mask": 127,
								"shift": 0
							}
						]
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MultiChannelAssociationV3)?.command === this.command;
	}

	public constructor(data: Buffer | MultiChannelAssociationV3MultiChannelAssociationSetData) {
		super(MultiChannelAssociationSet, data);
	}
};
