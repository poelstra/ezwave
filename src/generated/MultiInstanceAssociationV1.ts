/**
 * Command Class Multi Instance Association, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

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
	groupingIdentifier: number; // 1 byte unsigned integer
	// TODO param nodeID type enumarray
	// TODO param marker type bitmask or marker
	// TODO param vg type group
}

export interface MultiInstanceAssociationV1MultiInstanceAssociationReportData {
	groupingIdentifier: number; // 1 byte unsigned integer
	maxNodesSupported: number; // 1 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	// TODO param nodeID type enumarray
	// TODO param marker type bitmask or marker
	// TODO param vg type group
}

export interface MultiInstanceAssociationV1MultiInstanceAssociationSetData {
	groupingIdentifier: number; // 1 byte unsigned integer
	// TODO param nodeID type enumarray
	// TODO param marker type bitmask or marker
	// TODO param vg type group
}

// Obsolete
export class MultiInstanceAssociationV1 extends CommandClassPacket<MultiInstanceAssociationV1Commands> {
	public static readonly commandClass = CommandClasses.MultiInstanceAssociation; // 0x8e (142)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(MultiInstanceAssociationV1, commandAndPayload);
	}

	public static readonly MultiInstanceAssociationGet = class MultiInstanceAssociationGet extends CommandPacket<MultiInstanceAssociationV1MultiInstanceAssociationGetData> {
		public static readonly CommandClass = MultiInstanceAssociationV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "MultiInstanceAssociationGet",
			"help": "Multi Instance Association Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "groupingIdentifier",
					"help": "Grouping Identifier",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiInstanceAssociationV1)?.command === this.command;
		}

		constructor(data: Buffer | MultiInstanceAssociationV1MultiInstanceAssociationGetData) {
			super(MultiInstanceAssociationGet, data);
		}
	};

	public static readonly MultiInstanceAssociationGroupingsGet = class MultiInstanceAssociationGroupingsGet extends CommandPacket<void> {
		public static readonly CommandClass = MultiInstanceAssociationV1;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "MultiInstanceAssociationGroupingsGet",
			"help": "Multi Instance Association Groupings Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiInstanceAssociationV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(MultiInstanceAssociationGroupingsGet, data);
		}
	};

	public static readonly MultiInstanceAssociationGroupingsReport = class MultiInstanceAssociationGroupingsReport extends CommandPacket<MultiInstanceAssociationV1MultiInstanceAssociationGroupingsReportData> {
		public static readonly CommandClass = MultiInstanceAssociationV1;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "MultiInstanceAssociationGroupingsReport",
			"help": "Multi Instance Association Groupings Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "supportedGroupings",
					"help": "Supported Groupings",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiInstanceAssociationV1)?.command === this.command;
		}

		constructor(data: Buffer | MultiInstanceAssociationV1MultiInstanceAssociationGroupingsReportData) {
			super(MultiInstanceAssociationGroupingsReport, data);
		}
	};

	public static readonly MultiInstanceAssociationRemove = class MultiInstanceAssociationRemove extends CommandPacket<MultiInstanceAssociationV1MultiInstanceAssociationRemoveData> {
		public static readonly CommandClass = MultiInstanceAssociationV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "MultiInstanceAssociationRemove",
			"help": "Multi Instance Association Remove",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "groupingIdentifier",
					"help": "Grouping identifier",
					"length": 1
				},
				{
					"type": "enumarray",
					"name": "nodeID",
					"help": "Node ID",
					"length": "auto",
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "integer",
					"name": "marker",
					"help": "Marker",
					"length": 0
				},
				{
					"type": "group",
					"name": "vg",
					"help": "vg",
					"length": {
						"name": "groupingIdentifier"
					},
					"params": [
						{
							"type": "integer",
							"name": "multiInstanceNodeID",
							"help": "Multi Instance Node ID",
							"length": 1,
							"valueType": "NODE_NUMBER"
						},
						{
							"type": "integer",
							"name": "instance",
							"help": "Instance",
							"length": 1
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiInstanceAssociationV1)?.command === this.command;
		}

		constructor(data: Buffer | MultiInstanceAssociationV1MultiInstanceAssociationRemoveData) {
			super(MultiInstanceAssociationRemove, data);
		}
	};

	public static readonly MultiInstanceAssociationReport = class MultiInstanceAssociationReport extends CommandPacket<MultiInstanceAssociationV1MultiInstanceAssociationReportData> {
		public static readonly CommandClass = MultiInstanceAssociationV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "MultiInstanceAssociationReport",
			"help": "Multi Instance Association Report",
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
					"name": "maxNodesSupported",
					"help": "Max Nodes Supported",
					"length": 1
				},
				{
					"type": "integer",
					"name": "reportsToFollow",
					"help": "Reports to Follow",
					"length": 1
				},
				{
					"type": "enumarray",
					"name": "nodeID",
					"help": "Node ID",
					"length": "auto",
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "integer",
					"name": "marker",
					"help": "Marker",
					"length": 0
				},
				{
					"type": "group",
					"name": "vg",
					"help": "vg",
					"length": {
						"name": "groupingIdentifier"
					},
					"params": [
						{
							"type": "integer",
							"name": "multiInstanceNodeID",
							"help": "Multi Instance Node ID",
							"length": 1,
							"valueType": "NODE_NUMBER"
						},
						{
							"type": "integer",
							"name": "instance",
							"help": "Instance",
							"length": 1
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiInstanceAssociationV1)?.command === this.command;
		}

		constructor(data: Buffer | MultiInstanceAssociationV1MultiInstanceAssociationReportData) {
			super(MultiInstanceAssociationReport, data);
		}
	};

	public static readonly MultiInstanceAssociationSet = class MultiInstanceAssociationSet extends CommandPacket<MultiInstanceAssociationV1MultiInstanceAssociationSetData> {
		public static readonly CommandClass = MultiInstanceAssociationV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "MultiInstanceAssociationSet",
			"help": "Multi Instance Association Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "groupingIdentifier",
					"help": "Grouping identifier",
					"length": 1
				},
				{
					"type": "enumarray",
					"name": "nodeID",
					"help": "Node ID",
					"length": "auto",
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "integer",
					"name": "marker",
					"help": "Marker",
					"length": 0
				},
				{
					"type": "group",
					"name": "vg",
					"help": "vg",
					"length": {
						"name": "groupingIdentifier"
					},
					"params": [
						{
							"type": "integer",
							"name": "multiInstanceNodeID",
							"help": "Multi Instance Node ID",
							"length": 1,
							"valueType": "NODE_NUMBER"
						},
						{
							"type": "integer",
							"name": "instance",
							"help": "Instance",
							"length": 1
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiInstanceAssociationV1)?.command === this.command;
		}

		constructor(data: Buffer | MultiInstanceAssociationV1MultiInstanceAssociationSetData) {
			super(MultiInstanceAssociationSet, data);
		}
	};
}

export namespace MultiInstanceAssociationV1 {
	export type MultiInstanceAssociationGet = InstanceType<typeof MultiInstanceAssociationV1.MultiInstanceAssociationGet>;
	export type MultiInstanceAssociationGroupingsGet = InstanceType<typeof MultiInstanceAssociationV1.MultiInstanceAssociationGroupingsGet>;
	export type MultiInstanceAssociationGroupingsReport = InstanceType<typeof MultiInstanceAssociationV1.MultiInstanceAssociationGroupingsReport>;
	export type MultiInstanceAssociationRemove = InstanceType<typeof MultiInstanceAssociationV1.MultiInstanceAssociationRemove>;
	export type MultiInstanceAssociationReport = InstanceType<typeof MultiInstanceAssociationV1.MultiInstanceAssociationReport>;
	export type MultiInstanceAssociationSet = InstanceType<typeof MultiInstanceAssociationV1.MultiInstanceAssociationSet>;
}
