/**
 * Command Class Remote Association, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum RemoteAssociationV1Commands {
	RemoteAssociationConfigurationGet = 0x02,
	RemoteAssociationConfigurationReport = 0x03,
	RemoteAssociationConfigurationSet = 0x01,
}

export interface RemoteAssociationV1RemoteAssociationConfigurationGetData {
	localGroupingIdentifier: number; // 1 byte unsigned integer
}

export interface RemoteAssociationV1RemoteAssociationConfigurationReportData {
	localGroupingIdentifier: number; // 1 byte unsigned integer
	remoteNodeId: number; // 1 byte unsigned integer
	remoteGroupingIdentifier: number; // 1 byte unsigned integer
}

export interface RemoteAssociationV1RemoteAssociationConfigurationSetData {
	localGroupingIdentifier: number; // 1 byte unsigned integer
	remoteNodeId: number; // 1 byte unsigned integer
	remoteGroupingIdentifier: number; // 1 byte unsigned integer
}

// This (version of the) command class is Obsolete
export class RemoteAssociationV1 extends CommandClassPacket<RemoteAssociationV1Commands> {
	public static readonly commandClass: number = CommandClasses.RemoteAssociation; // 0x7d (125)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(RemoteAssociationV1, commandAndPayload);
	}
}

export class RemoteAssociationConfigurationGet extends CommandPacket<RemoteAssociationV1RemoteAssociationConfigurationGetData> {
	public static readonly CommandClass: typeof RemoteAssociationV1 = RemoteAssociationV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "RemoteAssociationConfigurationGet",
		"help": "Remote Association Configuration Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "localGroupingIdentifier",
				"help": "Local Grouping identifier",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(RemoteAssociationV1)?.command === this.command;
	}

	public constructor(data: Buffer | RemoteAssociationV1RemoteAssociationConfigurationGetData) {
		super(RemoteAssociationConfigurationGet, data);
	}
};

export class RemoteAssociationConfigurationReport extends CommandPacket<RemoteAssociationV1RemoteAssociationConfigurationReportData> {
	public static readonly CommandClass: typeof RemoteAssociationV1 = RemoteAssociationV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "RemoteAssociationConfigurationReport",
		"help": "Remote Association Configuration Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "localGroupingIdentifier",
				"help": "Local Grouping identifier",
				"length": 1,
				"values": {
					"0": {
						"name": "EraseAllLin",
						"help": "erase all lin"
					}
				}
			},
			{
				"type": "Integer",
				"name": "remoteNodeId",
				"help": "Remote NodeID",
				"length": 1,
				"valueType": "NodeNumber",
				"values": {
					"0": {
						"name": "RemoveALink",
						"help": "remove a link"
					}
				}
			},
			{
				"type": "Integer",
				"name": "remoteGroupingIdentifier",
				"help": "Remote Grouping identifier",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(RemoteAssociationV1)?.command === this.command;
	}

	public constructor(data: Buffer | RemoteAssociationV1RemoteAssociationConfigurationReportData) {
		super(RemoteAssociationConfigurationReport, data);
	}
};

export class RemoteAssociationConfigurationSet extends CommandPacket<RemoteAssociationV1RemoteAssociationConfigurationSetData> {
	public static readonly CommandClass: typeof RemoteAssociationV1 = RemoteAssociationV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "RemoteAssociationConfigurationSet",
		"help": "Remote Association Configuration Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "localGroupingIdentifier",
				"help": "Local Grouping identifier",
				"length": 1,
				"values": {
					"0": {
						"name": "EraseAllLin",
						"help": "erase all lin"
					}
				}
			},
			{
				"type": "Integer",
				"name": "remoteNodeId",
				"help": "Remote NodeID",
				"length": 1,
				"valueType": "NodeNumber",
				"values": {
					"0": {
						"name": "RemoveALink",
						"help": "remove a link"
					}
				}
			},
			{
				"type": "Integer",
				"name": "remoteGroupingIdentifier",
				"help": "Remote Grouping identifier",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(RemoteAssociationV1)?.command === this.command;
	}

	public constructor(data: Buffer | RemoteAssociationV1RemoteAssociationConfigurationSetData) {
		super(RemoteAssociationConfigurationSet, data);
	}
};
