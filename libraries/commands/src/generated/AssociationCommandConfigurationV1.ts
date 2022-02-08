/**
 * Command Class Association Command Configuration, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	public static readonly commandClass: number = CommandClasses.AssociationCommandConfiguration; // 0x9b (155)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(AssociationCommandConfigurationV1, commandAndPayload);
	}
}

export class CommandConfigurationGet extends CommandPacket<AssociationCommandConfigurationV1CommandConfigurationGetData> {
	public static readonly CommandClass: typeof AssociationCommandConfigurationV1 = AssociationCommandConfigurationV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "CommandConfigurationGet",
		"help": "Command Configuration Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "groupingIdentifier",
				"help": "Grouping identifier",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "nodeId",
				"help": "Node ID",
				"length": 1,
				"valueType": "NodeNumber"
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AssociationCommandConfigurationV1)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationCommandConfigurationV1CommandConfigurationGetData) {
		super(CommandConfigurationGet, data);
	}
};

export class CommandConfigurationReport extends CommandPacket<AssociationCommandConfigurationV1CommandConfigurationReportData> {
	public static readonly CommandClass: typeof AssociationCommandConfigurationV1 = AssociationCommandConfigurationV1;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "CommandConfigurationReport",
		"help": "Command Configuration Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "groupingIdentifier",
				"help": "Grouping identifier",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "nodeId",
				"help": "Node ID",
				"length": 1,
				"valueType": "NodeNumber"
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "first",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 112,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "reportsToFollow",
						"mask": 15,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "commandLength",
				"help": "Command length",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "commandClassIdentifier",
				"help": "Command Class identifier",
				"length": 1,
				"valueType": "CommandClass"
			},
			{
				"type": "Integer",
				"name": "commandIdentifier",
				"help": "Command identifier",
				"length": 1,
				"valueType": "Command"
			},
			{
				"type": "Blob",
				"name": "command",
				"help": "Command ",
				"length": {
					"lengthType": "Auto"
				},
				"blobType": "CommandData"
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AssociationCommandConfigurationV1)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationCommandConfigurationV1CommandConfigurationReportData) {
		super(CommandConfigurationReport, data);
	}
};

export class CommandConfigurationSet extends CommandPacket<AssociationCommandConfigurationV1CommandConfigurationSetData> {
	public static readonly CommandClass: typeof AssociationCommandConfigurationV1 = AssociationCommandConfigurationV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "CommandConfigurationSet",
		"help": "Command Configuration Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "groupingIdentifier",
				"help": "Grouping identifier",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "nodeId",
				"help": "Node ID",
				"length": 1,
				"valueType": "NodeNumber"
			},
			{
				"type": "Integer",
				"name": "commandLength",
				"help": "Command length",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "commandClassIdentifier",
				"help": "Command Class identifier",
				"length": 1,
				"valueType": "CommandClass"
			},
			{
				"type": "Integer",
				"name": "commandIdentifier",
				"help": "Command identifier",
				"length": 1,
				"valueType": "Command"
			},
			{
				"type": "Blob",
				"name": "command",
				"help": "Command ",
				"length": {
					"lengthType": "Auto"
				},
				"blobType": "CommandData"
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AssociationCommandConfigurationV1)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationCommandConfigurationV1CommandConfigurationSetData) {
		super(CommandConfigurationSet, data);
	}
};

export class CommandRecordsSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof AssociationCommandConfigurationV1 = AssociationCommandConfigurationV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "CommandRecordsSupportedGet",
		"help": "Command Records Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AssociationCommandConfigurationV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(CommandRecordsSupportedGet, data);
	}
};

export class CommandRecordsSupportedReport extends CommandPacket<AssociationCommandConfigurationV1CommandRecordsSupportedReportData> {
	public static readonly CommandClass: typeof AssociationCommandConfigurationV1 = AssociationCommandConfigurationV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "CommandRecordsSupportedReport",
		"help": "Command Records Supported Report",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "maxCommandLength",
						"mask": 252,
						"shift": 2
					},
					{
						"fieldType": "Boolean",
						"name": "vC",
						"mask": 2,
						"shift": 1
					},
					{
						"fieldType": "Boolean",
						"name": "confCmd",
						"mask": 1,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "freeCommandRecords",
				"help": "Free Command records",
				"length": 2
			},
			{
				"type": "Integer",
				"name": "maxCommandRecords",
				"help": "Max Command records",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AssociationCommandConfigurationV1)?.command === this.command;
	}

	public constructor(data: Buffer | AssociationCommandConfigurationV1CommandRecordsSupportedReportData) {
		super(CommandRecordsSupportedReport, data);
	}
};
