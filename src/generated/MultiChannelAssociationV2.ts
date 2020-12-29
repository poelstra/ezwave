/**
 * Command Class Multi Channel Association, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum MultiChannelAssociationV2Commands {
	MultiChannelAssociationGet = 0x02,
	MultiChannelAssociationGroupingsGet = 0x05,
	MultiChannelAssociationGroupingsReport = 0x06,
	MultiChannelAssociationRemove = 0x04,
	MultiChannelAssociationReport = 0x03,
	MultiChannelAssociationSet = 0x01,
}

export interface MultiChannelAssociationV2MultiChannelAssociationGetData {
	groupingIdentifier: number; // 1 byte unsigned integer
}

export interface MultiChannelAssociationV2MultiChannelAssociationGroupingsReportData {
	supportedGroupings: number; // 1 byte unsigned integer
}

export interface MultiChannelAssociationV2MultiChannelAssociationRemoveData {
	groupingIdentifier: number; // 1 byte unsigned integer
	// TODO param nodeID type enumarray
	marker: number; // 0 byte unsigned integer
	// TODO param vg type group
}

export interface MultiChannelAssociationV2MultiChannelAssociationReportData {
	groupingIdentifier: number; // 1 byte unsigned integer
	maxNodesSupported: number; // 1 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	// TODO param nodeID type enumarray
	marker: number; // 0 byte unsigned integer
	// TODO param vg type group
}

export interface MultiChannelAssociationV2MultiChannelAssociationSetData {
	groupingIdentifier: number; // 1 byte unsigned integer
	// TODO param nodeID type enumarray
	marker: number; // 0 byte unsigned integer
	// TODO param vg type group
}

export class MultiChannelAssociationV2 extends CommandClassPacket<MultiChannelAssociationV2Commands> {
	public static readonly commandClass = CommandClasses.MultiChannelAssociation; // 0x8e (142)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(MultiChannelAssociationV2, commandAndPayload);
	}

	public static readonly MultiChannelAssociationGet = class MultiChannelAssociationGet extends CommandPacket<MultiChannelAssociationV2MultiChannelAssociationGetData> {
		public static readonly CommandClass = MultiChannelAssociationV2;
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
			return packet.tryAs(MultiChannelAssociationV2)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelAssociationV2MultiChannelAssociationGetData) {
			super(MultiChannelAssociationGet, data);
		}
	};

	public static readonly MultiChannelAssociationGroupingsGet = class MultiChannelAssociationGroupingsGet extends CommandPacket<void> {
		public static readonly CommandClass = MultiChannelAssociationV2;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "MultiChannelAssociationGroupingsGet",
			"help": "Multi Channel Association Groupings Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiChannelAssociationV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(MultiChannelAssociationGroupingsGet, data);
		}
	};

	public static readonly MultiChannelAssociationGroupingsReport = class MultiChannelAssociationGroupingsReport extends CommandPacket<MultiChannelAssociationV2MultiChannelAssociationGroupingsReportData> {
		public static readonly CommandClass = MultiChannelAssociationV2;
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
			return packet.tryAs(MultiChannelAssociationV2)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelAssociationV2MultiChannelAssociationGroupingsReportData) {
			super(MultiChannelAssociationGroupingsReport, data);
		}
	};

	public static readonly MultiChannelAssociationRemove = class MultiChannelAssociationRemove extends CommandPacket<MultiChannelAssociationV2MultiChannelAssociationRemoveData> {
		public static readonly CommandClass = MultiChannelAssociationV2;
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
									"name": "End Point",
									"mask": 127,
									"shift": 0
								},
								{
									"type": "boolean",
									"name": "Bit address",
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
			return packet.tryAs(MultiChannelAssociationV2)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelAssociationV2MultiChannelAssociationRemoveData) {
			super(MultiChannelAssociationRemove, data);
		}
	};

	public static readonly MultiChannelAssociationReport = class MultiChannelAssociationReport extends CommandPacket<MultiChannelAssociationV2MultiChannelAssociationReportData> {
		public static readonly CommandClass = MultiChannelAssociationV2;
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
									"name": "End Point",
									"mask": 127,
									"shift": 0
								},
								{
									"type": "boolean",
									"name": "Bit address",
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
			return packet.tryAs(MultiChannelAssociationV2)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelAssociationV2MultiChannelAssociationReportData) {
			super(MultiChannelAssociationReport, data);
		}
	};

	public static readonly MultiChannelAssociationSet = class MultiChannelAssociationSet extends CommandPacket<MultiChannelAssociationV2MultiChannelAssociationSetData> {
		public static readonly CommandClass = MultiChannelAssociationV2;
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
									"name": "End Point",
									"mask": 127,
									"shift": 0
								},
								{
									"type": "boolean",
									"name": "Bit address",
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
			return packet.tryAs(MultiChannelAssociationV2)?.command === this.command;
		}

		constructor(data: Buffer | MultiChannelAssociationV2MultiChannelAssociationSetData) {
			super(MultiChannelAssociationSet, data);
		}
	};
}

export namespace MultiChannelAssociationV2 {
	export type MultiChannelAssociationGet = InstanceType<typeof MultiChannelAssociationV2.MultiChannelAssociationGet>;
	export type MultiChannelAssociationGroupingsGet = InstanceType<typeof MultiChannelAssociationV2.MultiChannelAssociationGroupingsGet>;
	export type MultiChannelAssociationGroupingsReport = InstanceType<typeof MultiChannelAssociationV2.MultiChannelAssociationGroupingsReport>;
	export type MultiChannelAssociationRemove = InstanceType<typeof MultiChannelAssociationV2.MultiChannelAssociationRemove>;
	export type MultiChannelAssociationReport = InstanceType<typeof MultiChannelAssociationV2.MultiChannelAssociationReport>;
	export type MultiChannelAssociationSet = InstanceType<typeof MultiChannelAssociationV2.MultiChannelAssociationSet>;
}
