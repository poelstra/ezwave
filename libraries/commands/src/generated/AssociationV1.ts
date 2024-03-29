/**
 * Command Class Association, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum AssociationV1Commands {
	AssociationGet = 0x02,
	AssociationGroupingsGet = 0x05,
	AssociationGroupingsReport = 0x06,
	AssociationRemove = 0x04,
	AssociationReport = 0x03,
	AssociationSet = 0x01,
}

export interface AssociationV1AssociationGetData {
	groupingIdentifier: number; // 1 byte unsigned integer
}

export interface AssociationV1AssociationGroupingsReportData {
	supportedGroupings: number; // 1 byte unsigned integer
}

export interface AssociationV1AssociationRemoveData {
	groupingIdentifier: number; // 1 byte unsigned integer
	nodeIds: number[]; // automatic length
}

export interface AssociationV1AssociationReportData {
	groupingIdentifier: number; // 1 byte unsigned integer
	maxNodesSupported: number; // 1 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	nodeIds: number[]; // automatic length
}

export interface AssociationV1AssociationSetData {
	groupingIdentifier: number; // 1 byte unsigned integer
	nodeIds: number[]; // automatic length
}

export class AssociationV1 extends CommandClassPacket<AssociationV1Commands> {
	public static readonly commandClass: number = CommandClasses.Association; // 0x85 (133)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(AssociationV1, commandAndPayload);
	}
}

export class AssociationGet extends CommandPacket<AssociationV1AssociationGetData> {
	public static readonly CommandClass: typeof AssociationV1 = AssociationV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "AssociationGet",
		"help": "Association Get",
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
		return packet.tryAs(AssociationV1)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationV1AssociationGetData) {
		super(AssociationGet, data);
	}
};

export class AssociationGroupingsGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof AssociationV1 = AssociationV1;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "AssociationGroupingsGet",
		"help": "Association Groupings Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AssociationV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(AssociationGroupingsGet, data);
	}
};

export class AssociationGroupingsReport extends CommandPacket<AssociationV1AssociationGroupingsReportData> {
	public static readonly CommandClass: typeof AssociationV1 = AssociationV1;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 6,
		"name": "AssociationGroupingsReport",
		"help": "Association Groupings Report",
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
		return packet.tryAs(AssociationV1)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationV1AssociationGroupingsReportData) {
		super(AssociationGroupingsReport, data);
	}
};

export class AssociationRemove extends CommandPacket<AssociationV1AssociationRemoveData> {
	public static readonly CommandClass: typeof AssociationV1 = AssociationV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "AssociationRemove",
		"help": "Association Remove",
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
					"lengthType": "Auto"
				},
				"blobType": "NodeIds"
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AssociationV1)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationV1AssociationRemoveData) {
		super(AssociationRemove, data);
	}
};

export class AssociationReport extends CommandPacket<AssociationV1AssociationReportData> {
	public static readonly CommandClass: typeof AssociationV1 = AssociationV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "AssociationReport",
		"help": "Association Report",
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
				"help": "NodeIDs",
				"length": {
					"lengthType": "Auto"
				},
				"blobType": "NodeIds"
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AssociationV1)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationV1AssociationReportData) {
		super(AssociationReport, data);
	}
};

export class AssociationSet extends CommandPacket<AssociationV1AssociationSetData> {
	public static readonly CommandClass: typeof AssociationV1 = AssociationV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "AssociationSet",
		"help": "Association Set",
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
					"lengthType": "Auto"
				},
				"blobType": "NodeIds"
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AssociationV1)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationV1AssociationSetData) {
		super(AssociationSet, data);
	}
};
