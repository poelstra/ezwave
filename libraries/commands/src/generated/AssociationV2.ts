/**
 * Command Class Association, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum AssociationV2Commands {
	AssociationGet = 0x02,
	AssociationGroupingsGet = 0x05,
	AssociationGroupingsReport = 0x06,
	AssociationRemove = 0x04,
	AssociationReport = 0x03,
	AssociationSet = 0x01,
	AssociationSpecificGroupGet = 0x0b,
	AssociationSpecificGroupReport = 0x0c,
}

export interface AssociationV2AssociationGetData {
	groupingIdentifier: number; // 1 byte unsigned integer
}

export interface AssociationV2AssociationGroupingsReportData {
	supportedGroupings: number; // 1 byte unsigned integer
}

export interface AssociationV2AssociationRemoveData {
	groupingIdentifier: number; // 1 byte unsigned integer
	nodeIds: number[]; // automatic length
}

export interface AssociationV2AssociationReportData {
	groupingIdentifier: number; // 1 byte unsigned integer
	maxNodesSupported: number; // 1 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	nodeIds: number[]; // automatic length
}

export interface AssociationV2AssociationSetData {
	groupingIdentifier: number; // 1 byte unsigned integer
	nodeIds: number[]; // automatic length
}

export interface AssociationV2AssociationSpecificGroupReportData {
	group: number; // 1 byte unsigned integer
}

export class AssociationV2 extends CommandClassPacket<AssociationV2Commands> {
	public static readonly commandClass: number = CommandClasses.Association; // 0x85 (133)
	public static readonly version: number = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(AssociationV2, commandAndPayload);
	}
}

export class AssociationGet extends CommandPacket<AssociationV2AssociationGetData> {
	public static readonly CommandClass: typeof AssociationV2 = AssociationV2;
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
		return packet.tryAs(AssociationV2)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationV2AssociationGetData) {
		super(AssociationGet, data);
	}
};

export class AssociationGroupingsGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof AssociationV2 = AssociationV2;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "AssociationGroupingsGet",
		"help": "Association Groupings Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AssociationV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(AssociationGroupingsGet, data);
	}
};

export class AssociationGroupingsReport extends CommandPacket<AssociationV2AssociationGroupingsReportData> {
	public static readonly CommandClass: typeof AssociationV2 = AssociationV2;
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
		return packet.tryAs(AssociationV2)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationV2AssociationGroupingsReportData) {
		super(AssociationGroupingsReport, data);
	}
};

export class AssociationRemove extends CommandPacket<AssociationV2AssociationRemoveData> {
	public static readonly CommandClass: typeof AssociationV2 = AssociationV2;
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
		return packet.tryAs(AssociationV2)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationV2AssociationRemoveData) {
		super(AssociationRemove, data);
	}
};

export class AssociationReport extends CommandPacket<AssociationV2AssociationReportData> {
	public static readonly CommandClass: typeof AssociationV2 = AssociationV2;
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
		return packet.tryAs(AssociationV2)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationV2AssociationReportData) {
		super(AssociationReport, data);
	}
};

export class AssociationSet extends CommandPacket<AssociationV2AssociationSetData> {
	public static readonly CommandClass: typeof AssociationV2 = AssociationV2;
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
		return packet.tryAs(AssociationV2)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationV2AssociationSetData) {
		super(AssociationSet, data);
	}
};

export class AssociationSpecificGroupGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof AssociationV2 = AssociationV2;
	public static readonly command: number = 0x0b; // 11
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 11,
		"name": "AssociationSpecificGroupGet",
		"help": "Association Specific Group Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AssociationV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(AssociationSpecificGroupGet, data);
	}
};

export class AssociationSpecificGroupReport extends CommandPacket<AssociationV2AssociationSpecificGroupReportData> {
	public static readonly CommandClass: typeof AssociationV2 = AssociationV2;
	public static readonly command: number = 0x0c; // 12
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 12,
		"name": "AssociationSpecificGroupReport",
		"help": "Association Specific Group Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "group",
				"help": "Group",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AssociationV2)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationV2AssociationSpecificGroupReportData) {
		super(AssociationSpecificGroupReport, data);
	}
};
