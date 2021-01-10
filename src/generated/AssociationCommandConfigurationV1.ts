/**
 * Command Class Association Command Configuration, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum AssociationCommandConfigurationV1Commands {
	CommandConfigurationGet = 0x04,
	CommandConfigurationReport = 0x05,
	CommandConfigurationSet = 0x03,
	CommandRecordsSupportedGet = 0x01,
	CommandRecordsSupportedReport = 0x02,
}

export interface AssociationCommandConfigurationV1CommandConfigurationGetData {
	groupingIdentifier: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
}

export interface AssociationCommandConfigurationV1CommandConfigurationReportData {
	groupingIdentifier: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
	first: boolean; // properties1[7]
	reportsToFollow: number; // properties1[3..0]
	commandLength: number; // 1 byte unsigned integer
	commandClassIdentifier: number; // 1 byte unsigned integer
	commandIdentifier: number; // 1 byte unsigned integer
	command: Buffer; // automatic length
}

export interface AssociationCommandConfigurationV1CommandConfigurationSetData {
	groupingIdentifier: number; // 1 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
	commandLength: number; // 1 byte unsigned integer
	commandClassIdentifier: number; // 1 byte unsigned integer
	commandIdentifier: number; // 1 byte unsigned integer
	command: Buffer; // automatic length
}

export interface AssociationCommandConfigurationV1CommandRecordsSupportedReportData {
	maxCommandLength: number; // properties1[7..2]
	vC: boolean; // properties1[1]
	confCmd: boolean; // properties1[0]
	freeCommandRecords: number; // 2 byte unsigned integer
	maxCommandRecords: number; // 2 byte unsigned integer
}

export class AssociationCommandConfigurationV1 extends CommandClassPacket<AssociationCommandConfigurationV1Commands> {
	public static readonly commandClass = CommandClasses.AssociationCommandConfiguration; // 0x9b (155)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(AssociationCommandConfigurationV1, commandAndPayload);
	}

	public static readonly CommandConfigurationGet = class CommandConfigurationGet extends CommandPacket<AssociationCommandConfigurationV1CommandConfigurationGetData> {
		public static readonly CommandClass = AssociationCommandConfigurationV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "CommandConfigurationGet",
			"help": "Command Configuration Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "groupingIdentifier",
					"help": "Grouping identifier",
					"length": 1
				},
				{
					"type": "integer",
					"name": "nodeId",
					"help": "Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AssociationCommandConfigurationV1)?.command === this.command;
		}

		constructor(data: Buffer | AssociationCommandConfigurationV1CommandConfigurationGetData) {
			super(CommandConfigurationGet, data);
		}
	};

	public static readonly CommandConfigurationReport = class CommandConfigurationReport extends CommandPacket<AssociationCommandConfigurationV1CommandConfigurationReportData> {
		public static readonly CommandClass = AssociationCommandConfigurationV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "CommandConfigurationReport",
			"help": "Command Configuration Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "groupingIdentifier",
					"help": "Grouping identifier",
					"length": 1
				},
				{
					"type": "integer",
					"name": "nodeId",
					"help": "Node ID",
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
							"fieldType": "boolean",
							"name": "first",
							"mask": 128,
							"shift": 7
						},
						{
							"fieldType": "integer",
							"name": "reserved",
							"mask": 112,
							"shift": 4,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "reportsToFollow",
							"mask": 15,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "commandLength",
					"help": "Command length",
					"length": 1
				},
				{
					"type": "integer",
					"name": "commandClassIdentifier",
					"help": "Command Class identifier",
					"length": 1,
					"valueType": "CMD_CLASS_REF"
				},
				{
					"type": "integer",
					"name": "commandIdentifier",
					"help": "Command identifier",
					"length": 1,
					"valueType": "CMD_REF"
				},
				{
					"type": "blob",
					"name": "command",
					"help": "Command ",
					"length": {
						"lengthType": "auto",
						"endOffset": 0
					},
					"blobType": "CMD_DATA"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AssociationCommandConfigurationV1)?.command === this.command;
		}

		constructor(data: Buffer | AssociationCommandConfigurationV1CommandConfigurationReportData) {
			super(CommandConfigurationReport, data);
		}
	};

	public static readonly CommandConfigurationSet = class CommandConfigurationSet extends CommandPacket<AssociationCommandConfigurationV1CommandConfigurationSetData> {
		public static readonly CommandClass = AssociationCommandConfigurationV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "CommandConfigurationSet",
			"help": "Command Configuration Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "groupingIdentifier",
					"help": "Grouping identifier",
					"length": 1
				},
				{
					"type": "integer",
					"name": "nodeId",
					"help": "Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "integer",
					"name": "commandLength",
					"help": "Command length",
					"length": 1
				},
				{
					"type": "integer",
					"name": "commandClassIdentifier",
					"help": "Command Class identifier",
					"length": 1,
					"valueType": "CMD_CLASS_REF"
				},
				{
					"type": "integer",
					"name": "commandIdentifier",
					"help": "Command identifier",
					"length": 1,
					"valueType": "CMD_REF"
				},
				{
					"type": "blob",
					"name": "command",
					"help": "Command ",
					"length": {
						"lengthType": "auto",
						"endOffset": 0
					},
					"blobType": "CMD_DATA"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AssociationCommandConfigurationV1)?.command === this.command;
		}

		constructor(data: Buffer | AssociationCommandConfigurationV1CommandConfigurationSetData) {
			super(CommandConfigurationSet, data);
		}
	};

	public static readonly CommandRecordsSupportedGet = class CommandRecordsSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = AssociationCommandConfigurationV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "CommandRecordsSupportedGet",
			"help": "Command Records Supported Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AssociationCommandConfigurationV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(CommandRecordsSupportedGet, data);
		}
	};

	public static readonly CommandRecordsSupportedReport = class CommandRecordsSupportedReport extends CommandPacket<AssociationCommandConfigurationV1CommandRecordsSupportedReportData> {
		public static readonly CommandClass = AssociationCommandConfigurationV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "CommandRecordsSupportedReport",
			"help": "Command Records Supported Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "maxCommandLength",
							"mask": 252,
							"shift": 2
						},
						{
							"fieldType": "boolean",
							"name": "vC",
							"mask": 2,
							"shift": 1
						},
						{
							"fieldType": "boolean",
							"name": "confCmd",
							"mask": 1,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "freeCommandRecords",
					"help": "Free Command records",
					"length": 2
				},
				{
					"type": "integer",
					"name": "maxCommandRecords",
					"help": "Max Command records",
					"length": 2
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AssociationCommandConfigurationV1)?.command === this.command;
		}

		constructor(data: Buffer | AssociationCommandConfigurationV1CommandRecordsSupportedReportData) {
			super(CommandRecordsSupportedReport, data);
		}
	};
}

export namespace AssociationCommandConfigurationV1 {
	export type CommandConfigurationGet = InstanceType<typeof AssociationCommandConfigurationV1.CommandConfigurationGet>;
	export type CommandConfigurationReport = InstanceType<typeof AssociationCommandConfigurationV1.CommandConfigurationReport>;
	export type CommandConfigurationSet = InstanceType<typeof AssociationCommandConfigurationV1.CommandConfigurationSet>;
	export type CommandRecordsSupportedGet = InstanceType<typeof AssociationCommandConfigurationV1.CommandRecordsSupportedGet>;
	export type CommandRecordsSupportedReport = InstanceType<typeof AssociationCommandConfigurationV1.CommandRecordsSupportedReport>;
}
