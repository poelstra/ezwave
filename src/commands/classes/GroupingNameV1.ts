/**
 * Command Class Grouping Name, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum GroupingNameV1Commands {
	GroupingNameGet = 0x02,
	GroupingNameReport = 0x03,
	GroupingNameSet = 0x01,
}

export interface GroupingNameV1GroupingNameGetData {
	groupingIdentifier: number; // 1 byte unsigned integer
}

export interface GroupingNameV1GroupingNameReportData {
	groupingIdentifier: number; // 1 byte unsigned integer
	charPresentation: number; // properties1[2..0]
	groupingName: string; // 16 bytes
}

export interface GroupingNameV1GroupingNameSetData {
	groupingIdentifier: number; // 1 byte unsigned integer
	charPresentation: number; // properties1[2..0]
	groupingName: string; // 16 bytes
}

// Deprecated
export class GroupingNameV1 extends CommandClassPacket<GroupingNameV1Commands> {
	public static readonly commandClass = CommandClasses.GroupingName; // 0x7b (123)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(GroupingNameV1, commandAndPayload);
	}

	public static readonly GroupingNameGet = class GroupingNameGet extends CommandPacket<GroupingNameV1GroupingNameGetData> {
		public static readonly CommandClass = GroupingNameV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "GroupingNameGet",
			"help": "Grouping Name Get",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "groupingIdentifier",
					"help": "Grouping identifier",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(GroupingNameV1)?.command === this.command;
		}

		constructor(data: Buffer | GroupingNameV1GroupingNameGetData) {
			super(GroupingNameGet, data);
		}
	};

	public static readonly GroupingNameReport = class GroupingNameReport extends CommandPacket<GroupingNameV1GroupingNameReportData> {
		public static readonly CommandClass = GroupingNameV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "GroupingNameReport",
			"help": "Grouping Name Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "groupingIdentifier",
					"help": "Grouping identifier",
					"length": 1
				},
				{
					"type": "Bitfield",
					"name": "properties1",
					"help": "Properties1",
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
					"name": "groupingName",
					"help": "Grouping Name",
					"length": 16
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(GroupingNameV1)?.command === this.command;
		}

		constructor(data: Buffer | GroupingNameV1GroupingNameReportData) {
			super(GroupingNameReport, data);
		}
	};

	public static readonly GroupingNameSet = class GroupingNameSet extends CommandPacket<GroupingNameV1GroupingNameSetData> {
		public static readonly CommandClass = GroupingNameV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "GroupingNameSet",
			"help": "Grouping Name Set",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "groupingIdentifier",
					"help": "Grouping identifier",
					"length": 1
				},
				{
					"type": "Bitfield",
					"name": "properties1",
					"help": "Properties1",
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
					"name": "groupingName",
					"help": "Grouping Name",
					"length": 16
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(GroupingNameV1)?.command === this.command;
		}

		constructor(data: Buffer | GroupingNameV1GroupingNameSetData) {
			super(GroupingNameSet, data);
		}
	};
}

export namespace GroupingNameV1 {
	export type GroupingNameGet = InstanceType<typeof GroupingNameV1.GroupingNameGet>;
	export type GroupingNameReport = InstanceType<typeof GroupingNameV1.GroupingNameReport>;
	export type GroupingNameSet = InstanceType<typeof GroupingNameV1.GroupingNameSet>;
}
