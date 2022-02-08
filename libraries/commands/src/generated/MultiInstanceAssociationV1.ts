/**
 * Command Class Multi Instance Association, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum MultiInstanceAssociationV1Commands {
	MultiInstanceAssociationGet = 0x02,
	MultiInstanceAssociationGroupingsGet = 0x05,
	MultiInstanceAssociationGroupingsReport = 0x06,
	MultiInstanceAssociationRemove = 0x04,
	MultiInstanceAssociationReport = 0x03,
	MultiInstanceAssociationSet = 0x01,
}

export interface MultiInstanceAssociationV1MultiInstanceAssociationGetData {
	groupingIdentifier: number; // 1 byte unsigned integer
}

export interface MultiInstanceAssociationV1MultiInstanceAssociationGroupingsReportData {
	supportedGroupings: number; // 1 byte unsigned integer
}

export interface MultiInstanceAssociationV1MultiInstanceAssociationRemoveData {
	nodeIds: number[]; // automatic length
	vg: Array<{ // variable length
		multiInstanceNodeId: number; // 1 byte unsigned integer
		instance: number; // 1 byte unsigned integer
	}>;
}

export interface MultiInstanceAssociationV1MultiInstanceAssociationReportData {
	maxNodesSupported: number; // 1 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	nodeIds: number[]; // automatic length
	vg: Array<{ // variable length
		multiInstanceNodeId: number; // 1 byte unsigned integer
		instance: number; // 1 byte unsigned integer
	}>;
}

export interface MultiInstanceAssociationV1MultiInstanceAssociationSetData {
	nodeIds: number[]; // automatic length
	vg: Array<{ // variable length
		multiInstanceNodeId: number; // 1 byte unsigned integer
		instance: number; // 1 byte unsigned integer
	}>;
}

// This (version of the) command class is Obsolete
export class MultiInstanceAssociationV1 extends CommandClassPacket<MultiInstanceAssociationV1Commands> {
	public static readonly commandClass: number = CommandClasses.MultiInstanceAssociation; // 0x8e (142)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(MultiInstanceAssociationV1, commandAndPayload);
	}
}

export class MultiInstanceAssociationGet extends CommandPacket<MultiInstanceAssociationV1MultiInstanceAssociationGetData> {
	public static readonly CommandClass: typeof MultiInstanceAssociationV1 = MultiInstanceAssociationV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "MultiInstanceAssociationGet",
		"help": "Multi Instance Association Get",
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
		return packet.tryAs(MultiInstanceAssociationV1)?.command === this.command;
	}

	public constructor(data: Buffer | MultiInstanceAssociationV1MultiInstanceAssociationGetData) {
		super(MultiInstanceAssociationGet, data);
	}
};

export class MultiInstanceAssociationGroupingsGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof MultiInstanceAssociationV1 = MultiInstanceAssociationV1;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "MultiInstanceAssociationGroupingsGet",
		"help": "Multi Instance Association Groupings Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MultiInstanceAssociationV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(MultiInstanceAssociationGroupingsGet, data);
	}
};

export class MultiInstanceAssociationGroupingsReport extends CommandPacket<MultiInstanceAssociationV1MultiInstanceAssociationGroupingsReportData> {
	public static readonly CommandClass: typeof MultiInstanceAssociationV1 = MultiInstanceAssociationV1;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 6,
		"name": "MultiInstanceAssociationGroupingsReport",
		"help": "Multi Instance Association Groupings Report",
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
		return packet.tryAs(MultiInstanceAssociationV1)?.command === this.command;
	}

	public constructor(data: Buffer | MultiInstanceAssociationV1MultiInstanceAssociationGroupingsReportData) {
		super(MultiInstanceAssociationGroupingsReport, data);
	}
};

export class MultiInstanceAssociationRemove extends CommandPacket<MultiInstanceAssociationV1MultiInstanceAssociationRemoveData> {
	public static readonly CommandClass: typeof MultiInstanceAssociationV1 = MultiInstanceAssociationV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "MultiInstanceAssociationRemove",
		"help": "Multi Instance Association Remove",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "groupingIdentifier",
				"help": "Grouping identifier",
				"length": 1,
				"lengthOf": {
					"refs": [
						"vg"
					]
				},
				"isAutogenerated": true
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
					"lengthType": "Ref",
					"from": {
						"ref": "groupingIdentifier"
					}
				},
				"params": [
					{
						"type": "Integer",
						"name": "multiInstanceNodeId",
						"help": "Multi Instance Node ID",
						"length": 1,
						"valueType": "NodeNumber"
					},
					{
						"type": "Integer",
						"name": "instance",
						"help": "Instance",
						"length": 1
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MultiInstanceAssociationV1)?.command === this.command;
	}

	public constructor(data: Buffer | MultiInstanceAssociationV1MultiInstanceAssociationRemoveData) {
		super(MultiInstanceAssociationRemove, data);
	}
};

export class MultiInstanceAssociationReport extends CommandPacket<MultiInstanceAssociationV1MultiInstanceAssociationReportData> {
	public static readonly CommandClass: typeof MultiInstanceAssociationV1 = MultiInstanceAssociationV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "MultiInstanceAssociationReport",
		"help": "Multi Instance Association Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "groupingIdentifier",
				"help": "Grouping Identifier",
				"length": 1,
				"lengthOf": {
					"refs": [
						"vg"
					]
				},
				"isAutogenerated": true
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
					"lengthType": "Ref",
					"from": {
						"ref": "groupingIdentifier"
					}
				},
				"params": [
					{
						"type": "Integer",
						"name": "multiInstanceNodeId",
						"help": "Multi Instance Node ID",
						"length": 1,
						"valueType": "NodeNumber"
					},
					{
						"type": "Integer",
						"name": "instance",
						"help": "Instance",
						"length": 1
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MultiInstanceAssociationV1)?.command === this.command;
	}

	public constructor(data: Buffer | MultiInstanceAssociationV1MultiInstanceAssociationReportData) {
		super(MultiInstanceAssociationReport, data);
	}
};

export class MultiInstanceAssociationSet extends CommandPacket<MultiInstanceAssociationV1MultiInstanceAssociationSetData> {
	public static readonly CommandClass: typeof MultiInstanceAssociationV1 = MultiInstanceAssociationV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "MultiInstanceAssociationSet",
		"help": "Multi Instance Association Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "groupingIdentifier",
				"help": "Grouping identifier",
				"length": 1,
				"lengthOf": {
					"refs": [
						"vg"
					]
				},
				"isAutogenerated": true
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
					"lengthType": "Ref",
					"from": {
						"ref": "groupingIdentifier"
					}
				},
				"params": [
					{
						"type": "Integer",
						"name": "multiInstanceNodeId",
						"help": "Multi Instance Node ID",
						"length": 1,
						"valueType": "NodeNumber"
					},
					{
						"type": "Integer",
						"name": "instance",
						"help": "Instance",
						"length": 1
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MultiInstanceAssociationV1)?.command === this.command;
	}

	public constructor(data: Buffer | MultiInstanceAssociationV1MultiInstanceAssociationSetData) {
		super(MultiInstanceAssociationSet, data);
	}
};
