/**
 * Command Class Association, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

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
	public static readonly commandClass = CommandClasses.Association; // 0x85 (133)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(AssociationV1, commandAndPayload);
	}

	public static readonly AssociationGet = class AssociationGet extends CommandPacket<AssociationV1AssociationGetData> {
		public static readonly CommandClass = AssociationV1;
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
			return packet.tryAs(AssociationV1)?.command === this.command;
		}

		constructor(data: Buffer | AssociationV1AssociationGetData) {
			super(AssociationGet, data);
		}
	};

	public static readonly AssociationGroupingsGet = class AssociationGroupingsGet extends CommandPacket<void> {
		public static readonly CommandClass = AssociationV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "AssociationGroupingsGet",
			"help": "Association Groupings Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AssociationV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AssociationGroupingsGet, data);
		}
	};

	public static readonly AssociationGroupingsReport = class AssociationGroupingsReport extends CommandPacket<AssociationV1AssociationGroupingsReportData> {
		public static readonly CommandClass = AssociationV1;
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
			return packet.tryAs(AssociationV1)?.command === this.command;
		}

		constructor(data: Buffer | AssociationV1AssociationGroupingsReportData) {
			super(AssociationGroupingsReport, data);
		}
	};

	public static readonly AssociationRemove = class AssociationRemove extends CommandPacket<AssociationV1AssociationRemoveData> {
		public static readonly CommandClass = AssociationV1;
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
			return packet.tryAs(AssociationV1)?.command === this.command;
		}

		constructor(data: Buffer | AssociationV1AssociationRemoveData) {
			super(AssociationRemove, data);
		}
	};

	public static readonly AssociationReport = class AssociationReport extends CommandPacket<AssociationV1AssociationReportData> {
		public static readonly CommandClass = AssociationV1;
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
			return packet.tryAs(AssociationV1)?.command === this.command;
		}

		constructor(data: Buffer | AssociationV1AssociationReportData) {
			super(AssociationReport, data);
		}
	};

	public static readonly AssociationSet = class AssociationSet extends CommandPacket<AssociationV1AssociationSetData> {
		public static readonly CommandClass = AssociationV1;
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
			return packet.tryAs(AssociationV1)?.command === this.command;
		}

		constructor(data: Buffer | AssociationV1AssociationSetData) {
			super(AssociationSet, data);
		}
	};
}

export namespace AssociationV1 {
	export type AssociationGet = InstanceType<typeof AssociationV1.AssociationGet>;
	export type AssociationGroupingsGet = InstanceType<typeof AssociationV1.AssociationGroupingsGet>;
	export type AssociationGroupingsReport = InstanceType<typeof AssociationV1.AssociationGroupingsReport>;
	export type AssociationRemove = InstanceType<typeof AssociationV1.AssociationRemove>;
	export type AssociationReport = InstanceType<typeof AssociationV1.AssociationReport>;
	export type AssociationSet = InstanceType<typeof AssociationV1.AssociationSet>;
}
