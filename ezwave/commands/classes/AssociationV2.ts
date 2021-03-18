/**
 * Command Class Association, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

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
	public static readonly commandClass = CommandClasses.Association; // 0x85 (133)
	public static readonly version = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(AssociationV2, commandAndPayload);
	}

	public static readonly AssociationGet = class AssociationGet extends CommandPacket<AssociationV2AssociationGetData> {
		public static readonly CommandClass = AssociationV2;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AssociationV2)?.command === this.command;
		}

		constructor(data: Buffer | AssociationV2AssociationGetData) {
			super(AssociationGet, data);
		}
	};

	public static readonly AssociationGroupingsGet = class AssociationGroupingsGet extends CommandPacket<void> {
		public static readonly CommandClass = AssociationV2;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "AssociationGroupingsGet",
			"help": "Association Groupings Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AssociationV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AssociationGroupingsGet, data);
		}
	};

	public static readonly AssociationGroupingsReport = class AssociationGroupingsReport extends CommandPacket<AssociationV2AssociationGroupingsReportData> {
		public static readonly CommandClass = AssociationV2;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AssociationV2)?.command === this.command;
		}

		constructor(data: Buffer | AssociationV2AssociationGroupingsReportData) {
			super(AssociationGroupingsReport, data);
		}
	};

	public static readonly AssociationRemove = class AssociationRemove extends CommandPacket<AssociationV2AssociationRemoveData> {
		public static readonly CommandClass = AssociationV2;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AssociationV2)?.command === this.command;
		}

		constructor(data: Buffer | AssociationV2AssociationRemoveData) {
			super(AssociationRemove, data);
		}
	};

	public static readonly AssociationReport = class AssociationReport extends CommandPacket<AssociationV2AssociationReportData> {
		public static readonly CommandClass = AssociationV2;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AssociationV2)?.command === this.command;
		}

		constructor(data: Buffer | AssociationV2AssociationReportData) {
			super(AssociationReport, data);
		}
	};

	public static readonly AssociationSet = class AssociationSet extends CommandPacket<AssociationV2AssociationSetData> {
		public static readonly CommandClass = AssociationV2;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AssociationV2)?.command === this.command;
		}

		constructor(data: Buffer | AssociationV2AssociationSetData) {
			super(AssociationSet, data);
		}
	};

	public static readonly AssociationSpecificGroupGet = class AssociationSpecificGroupGet extends CommandPacket<void> {
		public static readonly CommandClass = AssociationV2;
		public static readonly command = 0x0b;
		public static readonly definition = convertFromJsonCommand({
			"command": 11,
			"name": "AssociationSpecificGroupGet",
			"help": "Association Specific Group Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AssociationV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AssociationSpecificGroupGet, data);
		}
	};

	public static readonly AssociationSpecificGroupReport = class AssociationSpecificGroupReport extends CommandPacket<AssociationV2AssociationSpecificGroupReportData> {
		public static readonly CommandClass = AssociationV2;
		public static readonly command = 0x0c;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AssociationV2)?.command === this.command;
		}

		constructor(data: Buffer | AssociationV2AssociationSpecificGroupReportData) {
			super(AssociationSpecificGroupReport, data);
		}
	};
}

export namespace AssociationV2 {
	export type AssociationGet = InstanceType<typeof AssociationV2.AssociationGet>;
	export type AssociationGroupingsGet = InstanceType<typeof AssociationV2.AssociationGroupingsGet>;
	export type AssociationGroupingsReport = InstanceType<typeof AssociationV2.AssociationGroupingsReport>;
	export type AssociationRemove = InstanceType<typeof AssociationV2.AssociationRemove>;
	export type AssociationReport = InstanceType<typeof AssociationV2.AssociationReport>;
	export type AssociationSet = InstanceType<typeof AssociationV2.AssociationSet>;
	export type AssociationSpecificGroupGet = InstanceType<typeof AssociationV2.AssociationSpecificGroupGet>;
	export type AssociationSpecificGroupReport = InstanceType<typeof AssociationV2.AssociationSpecificGroupReport>;
}
