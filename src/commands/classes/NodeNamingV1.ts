/**
 * Command Class Node Naming, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum NodeNamingV1Commands {
	NodeNamingNodeLocationReport = 0x06,
	NodeNamingNodeLocationSet = 0x04,
	NodeNamingNodeLocationGet = 0x05,
	NodeNamingNodeNameGet = 0x02,
	NodeNamingNodeNameReport = 0x03,
	NodeNamingNodeNameSet = 0x01,
}

export interface NodeNamingV1NodeNamingNodeLocationReportData {
	charPresentation: number; // level[2..0]
	nodeLocationChar: string; // 16 bytes
}

export interface NodeNamingV1NodeNamingNodeLocationSetData {
	charPresentation: number; // level[2..0]
	nodeLocationChar: string; // 16 bytes
}

export interface NodeNamingV1NodeNamingNodeNameReportData {
	charPresentation: number; // level[2..0]
	nodeNameChar: string; // 16 bytes
}

export interface NodeNamingV1NodeNamingNodeNameSetData {
	charPresentation: number; // level[2..0]
	nodeNameChar: string; // 16 bytes
}

export class NodeNamingV1 extends CommandClassPacket<NodeNamingV1Commands> {
	public static readonly commandClass = CommandClasses.NodeNaming; // 0x77 (119)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(NodeNamingV1, commandAndPayload);
	}

	public static readonly NodeNamingNodeLocationReport = class NodeNamingNodeLocationReport extends CommandPacket<NodeNamingV1NodeNamingNodeLocationReportData> {
		public static readonly CommandClass = NodeNamingV1;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "NodeNamingNodeLocationReport",
			"help": "Node Naming Node Location  Report",
			"status": "Active",
			"params": [
				{
					"type": "Bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"fieldType": "Integer",
							"name": "reserved",
							"mask": 248,
							"shift": 3,
							"reserved": true
						},
						{
							"fieldType": "Integer",
							"name": "charPresentation",
							"mask": 7,
							"shift": 0
						}
					]
				},
				{
					"type": "Text",
					"name": "nodeLocationChar",
					"help": "Node location char",
					"length": 16
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NodeNamingV1)?.command === this.command;
		}

		constructor(data: Buffer | NodeNamingV1NodeNamingNodeLocationReportData) {
			super(NodeNamingNodeLocationReport, data);
		}
	};

	public static readonly NodeNamingNodeLocationSet = class NodeNamingNodeLocationSet extends CommandPacket<NodeNamingV1NodeNamingNodeLocationSetData> {
		public static readonly CommandClass = NodeNamingV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "NodeNamingNodeLocationSet",
			"help": "Node Naming Node Location  Set",
			"status": "Active",
			"params": [
				{
					"type": "Bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"fieldType": "Integer",
							"name": "reserved",
							"mask": 248,
							"shift": 3,
							"reserved": true
						},
						{
							"fieldType": "Integer",
							"name": "charPresentation",
							"mask": 7,
							"shift": 0
						}
					]
				},
				{
					"type": "Text",
					"name": "nodeLocationChar",
					"help": "Node location char",
					"length": 16
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NodeNamingV1)?.command === this.command;
		}

		constructor(data: Buffer | NodeNamingV1NodeNamingNodeLocationSetData) {
			super(NodeNamingNodeLocationSet, data);
		}
	};

	public static readonly NodeNamingNodeLocationGet = class NodeNamingNodeLocationGet extends CommandPacket<void> {
		public static readonly CommandClass = NodeNamingV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "NodeNamingNodeLocationGet",
			"help": "Node Naming Node Location Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NodeNamingV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(NodeNamingNodeLocationGet, data);
		}
	};

	public static readonly NodeNamingNodeNameGet = class NodeNamingNodeNameGet extends CommandPacket<void> {
		public static readonly CommandClass = NodeNamingV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "NodeNamingNodeNameGet",
			"help": "Node Naming Node Name Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NodeNamingV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(NodeNamingNodeNameGet, data);
		}
	};

	public static readonly NodeNamingNodeNameReport = class NodeNamingNodeNameReport extends CommandPacket<NodeNamingV1NodeNamingNodeNameReportData> {
		public static readonly CommandClass = NodeNamingV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "NodeNamingNodeNameReport",
			"help": "Node Naming Node Name Report",
			"status": "Active",
			"params": [
				{
					"type": "Bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"fieldType": "Integer",
							"name": "reserved",
							"mask": 248,
							"shift": 3,
							"reserved": true
						},
						{
							"fieldType": "Integer",
							"name": "charPresentation",
							"mask": 7,
							"shift": 0
						}
					]
				},
				{
					"type": "Text",
					"name": "nodeNameChar",
					"help": "Node name char",
					"length": 16
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NodeNamingV1)?.command === this.command;
		}

		constructor(data: Buffer | NodeNamingV1NodeNamingNodeNameReportData) {
			super(NodeNamingNodeNameReport, data);
		}
	};

	public static readonly NodeNamingNodeNameSet = class NodeNamingNodeNameSet extends CommandPacket<NodeNamingV1NodeNamingNodeNameSetData> {
		public static readonly CommandClass = NodeNamingV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "NodeNamingNodeNameSet",
			"help": "Node Naming Node Name Set",
			"status": "Active",
			"params": [
				{
					"type": "Bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"fieldType": "Integer",
							"name": "reserved",
							"mask": 248,
							"shift": 3,
							"reserved": true
						},
						{
							"fieldType": "Integer",
							"name": "charPresentation",
							"mask": 7,
							"shift": 0
						}
					]
				},
				{
					"type": "Text",
					"name": "nodeNameChar",
					"help": "Node name char",
					"length": 16
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(NodeNamingV1)?.command === this.command;
		}

		constructor(data: Buffer | NodeNamingV1NodeNamingNodeNameSetData) {
			super(NodeNamingNodeNameSet, data);
		}
	};
}

export namespace NodeNamingV1 {
	export type NodeNamingNodeLocationReport = InstanceType<typeof NodeNamingV1.NodeNamingNodeLocationReport>;
	export type NodeNamingNodeLocationSet = InstanceType<typeof NodeNamingV1.NodeNamingNodeLocationSet>;
	export type NodeNamingNodeLocationGet = InstanceType<typeof NodeNamingV1.NodeNamingNodeLocationGet>;
	export type NodeNamingNodeNameGet = InstanceType<typeof NodeNamingV1.NodeNamingNodeNameGet>;
	export type NodeNamingNodeNameReport = InstanceType<typeof NodeNamingV1.NodeNamingNodeNameReport>;
	export type NodeNamingNodeNameSet = InstanceType<typeof NodeNamingV1.NodeNamingNodeNameSet>;
}
