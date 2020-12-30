/**
 * Command Class Multi Channel Association, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

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
	// TODO param nodeID type enumarray
	// TODO param marker type bitmask or marker
	// TODO param vg type group
}

export interface MultiChannelAssociationV3MultiChannelAssociationReportData {
	groupingIdentifier: number; // 1 byte unsigned integer
	maxNodesSupported: number; // 1 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	// TODO param nodeID type enumarray
	// TODO param marker type bitmask or marker
	// TODO param vg type group
}

export interface MultiChannelAssociationV3MultiChannelAssociationSetData {
	groupingIdentifier: number; // 1 byte unsigned integer
	// TODO param nodeID type enumarray
	// TODO param marker type bitmask or marker
	// TODO param vg type group
}

export class MultiChannelAssociationV3 extends CommandClassPacket<MultiChannelAssociationV3Commands> {
	public static readonly commandClass = CommandClasses.MultiChannelAssociation; // 0x8e (142)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(MultiChannelAssociationV3, commandAndPayload);
	}

	public static readonly MultiChannelAssociationGet = class MultiChannelAssociationGet extends CommandPacket<MultiChannelAssociationV3MultiChannelAssociationGetData> {
		public static readonly CommandClass = MultiChannelAssociationV3;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "MultiChannelAssociationGet",
			"help": "Multi Channel Association Get",
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
			return packet.tryAs(MultiChannelAssociationV3)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelAssociationV3MultiChannelAssociationGetData) {
			super(MultiChannelAssociationGet, data);
		}
	};

	public static readonly MultiChannelAssociationGroupingsGet = class MultiChannelAssociationGroupingsGet extends CommandPacket<void> {
		public static readonly CommandClass = MultiChannelAssociationV3;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "MultiChannelAssociationGroupingsGet",
			"help": "Multi Channel Association Groupings Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelAssociationV3)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(MultiChannelAssociationGroupingsGet, data);
		}
	};

	public static readonly MultiChannelAssociationGroupingsReport = class MultiChannelAssociationGroupingsReport extends CommandPacket<MultiChannelAssociationV3MultiChannelAssociationGroupingsReportData> {
		public static readonly CommandClass = MultiChannelAssociationV3;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "MultiChannelAssociationGroupingsReport",
			"help": "Multi Channel Association Groupings Report",
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
			return packet.tryAs(MultiChannelAssociationV3)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelAssociationV3MultiChannelAssociationGroupingsReportData) {
			super(MultiChannelAssociationGroupingsReport, data);
		}
	};

	public static readonly MultiChannelAssociationRemove = class MultiChannelAssociationRemove extends CommandPacket<MultiChannelAssociationV3MultiChannelAssociationRemoveData> {
		public static readonly CommandClass = MultiChannelAssociationV3;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "MultiChannelAssociationRemove",
			"help": "Multi Channel Association Remove",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "groupingIdentifier",
					"help": "Grouping Identifier",
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
					"length": "auto",
					"params": [
						{
							"type": "integer",
							"name": "multiChannelNodeID",
							"help": "Multi Channel Node ID",
							"length": 1,
							"valueType": "NODE_NUMBER"
						},
						{
							"type": "bitfield",
							"name": "properties1",
							"help": "Properties1",
							"length": 1,
							"fields": [
								{
									"type": "integer",
									"name": "endPoint",
									"mask": 127,
									"shift": 0
								},
								{
									"type": "boolean",
									"name": "bitAddress",
									"mask": 128,
									"shift": 7
								}
							]
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelAssociationV3)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelAssociationV3MultiChannelAssociationRemoveData) {
			super(MultiChannelAssociationRemove, data);
		}
	};

	public static readonly MultiChannelAssociationReport = class MultiChannelAssociationReport extends CommandPacket<MultiChannelAssociationV3MultiChannelAssociationReportData> {
		public static readonly CommandClass = MultiChannelAssociationV3;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "MultiChannelAssociationReport",
			"help": "Multi Channel Association Report",
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
					"length": "auto",
					"params": [
						{
							"type": "integer",
							"name": "multiChannelNodeID",
							"help": "Multi Channel Node ID",
							"length": 1,
							"valueType": "NODE_NUMBER"
						},
						{
							"type": "bitfield",
							"name": "properties1",
							"help": "Properties1",
							"length": 1,
							"fields": [
								{
									"type": "integer",
									"name": "endPoint",
									"mask": 127,
									"shift": 0
								},
								{
									"type": "boolean",
									"name": "bitAddress",
									"mask": 128,
									"shift": 7
								}
							]
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelAssociationV3)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelAssociationV3MultiChannelAssociationReportData) {
			super(MultiChannelAssociationReport, data);
		}
	};

	public static readonly MultiChannelAssociationSet = class MultiChannelAssociationSet extends CommandPacket<MultiChannelAssociationV3MultiChannelAssociationSetData> {
		public static readonly CommandClass = MultiChannelAssociationV3;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "MultiChannelAssociationSet",
			"help": "Multi Channel Association Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "groupingIdentifier",
					"help": "Grouping Identifier",
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
					"length": "auto",
					"params": [
						{
							"type": "integer",
							"name": "multiChannelNodeID",
							"help": "Multi Channel Node ID",
							"length": 1,
							"valueType": "NODE_NUMBER"
						},
						{
							"type": "bitfield",
							"name": "properties1",
							"help": "Properties1",
							"length": 1,
							"fields": [
								{
									"type": "integer",
									"name": "endPoint",
									"mask": 127,
									"shift": 0
								},
								{
									"type": "boolean",
									"name": "bitAddress",
									"mask": 128,
									"shift": 7
								}
							]
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelAssociationV3)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelAssociationV3MultiChannelAssociationSetData) {
			super(MultiChannelAssociationSet, data);
		}
	};
}

export namespace MultiChannelAssociationV3 {
	export type MultiChannelAssociationGet = InstanceType<typeof MultiChannelAssociationV3.MultiChannelAssociationGet>;
	export type MultiChannelAssociationGroupingsGet = InstanceType<typeof MultiChannelAssociationV3.MultiChannelAssociationGroupingsGet>;
	export type MultiChannelAssociationGroupingsReport = InstanceType<typeof MultiChannelAssociationV3.MultiChannelAssociationGroupingsReport>;
	export type MultiChannelAssociationRemove = InstanceType<typeof MultiChannelAssociationV3.MultiChannelAssociationRemove>;
	export type MultiChannelAssociationReport = InstanceType<typeof MultiChannelAssociationV3.MultiChannelAssociationReport>;
	export type MultiChannelAssociationSet = InstanceType<typeof MultiChannelAssociationV3.MultiChannelAssociationSet>;
}
