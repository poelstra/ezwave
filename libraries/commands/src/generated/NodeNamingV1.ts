/**
 * Command Class Node Naming, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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

	public constructor(commandAndPayload: Buffer) {
		super(NodeNamingV1, commandAndPayload);
	}
}

export class NodeNamingNodeLocationReport extends CommandPacket<NodeNamingV1NodeNamingNodeLocationReportData> {
	public static readonly CommandClass = NodeNamingV1;
	public static readonly command = 0x06; // 6
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(NodeNamingV1)?.command === this.command;
	}

	public constructor(data: Buffer | NodeNamingV1NodeNamingNodeLocationReportData) {
		super(NodeNamingNodeLocationReport, data);
	}
};

export class NodeNamingNodeLocationSet extends CommandPacket<NodeNamingV1NodeNamingNodeLocationSetData> {
	public static readonly CommandClass = NodeNamingV1;
	public static readonly command = 0x04; // 4
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(NodeNamingV1)?.command === this.command;
	}

	public constructor(data: Buffer | NodeNamingV1NodeNamingNodeLocationSetData) {
		super(NodeNamingNodeLocationSet, data);
	}
};

export class NodeNamingNodeLocationGet extends CommandPacket<void> {
	public static readonly CommandClass = NodeNamingV1;
	public static readonly command = 0x05; // 5
	public static readonly definition = convertFromJsonCommand({
		"command": 5,
		"name": "NodeNamingNodeLocationGet",
		"help": "Node Naming Node Location Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(NodeNamingV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(NodeNamingNodeLocationGet, data);
	}
};

export class NodeNamingNodeNameGet extends CommandPacket<void> {
	public static readonly CommandClass = NodeNamingV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "NodeNamingNodeNameGet",
		"help": "Node Naming Node Name Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(NodeNamingV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(NodeNamingNodeNameGet, data);
	}
};

export class NodeNamingNodeNameReport extends CommandPacket<NodeNamingV1NodeNamingNodeNameReportData> {
	public static readonly CommandClass = NodeNamingV1;
	public static readonly command = 0x03; // 3
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(NodeNamingV1)?.command === this.command;
	}

	public constructor(data: Buffer | NodeNamingV1NodeNamingNodeNameReportData) {
		super(NodeNamingNodeNameReport, data);
	}
};

export class NodeNamingNodeNameSet extends CommandPacket<NodeNamingV1NodeNamingNodeNameSetData> {
	public static readonly CommandClass = NodeNamingV1;
	public static readonly command = 0x01; // 1
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(NodeNamingV1)?.command === this.command;
	}

	public constructor(data: Buffer | NodeNamingV1NodeNamingNodeNameSetData) {
		super(NodeNamingNodeNameSet, data);
	}
};
