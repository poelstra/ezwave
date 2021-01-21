/**
 * Command Class Remote Association, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

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

// Obsolete
export class RemoteAssociationV1 extends CommandClassPacket<RemoteAssociationV1Commands> {
	public static readonly commandClass = CommandClasses.RemoteAssociation; // 0x7d (125)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(RemoteAssociationV1, commandAndPayload);
	}

	public static readonly RemoteAssociationConfigurationGet = class RemoteAssociationConfigurationGet extends CommandPacket<RemoteAssociationV1RemoteAssociationConfigurationGetData> {
		public static readonly CommandClass = RemoteAssociationV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(RemoteAssociationV1)?.command === this.command;
		}

		constructor(data: Buffer | RemoteAssociationV1RemoteAssociationConfigurationGetData) {
			super(RemoteAssociationConfigurationGet, data);
		}
	};

	public static readonly RemoteAssociationConfigurationReport = class RemoteAssociationConfigurationReport extends CommandPacket<RemoteAssociationV1RemoteAssociationConfigurationReportData> {
		public static readonly CommandClass = RemoteAssociationV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(RemoteAssociationV1)?.command === this.command;
		}

		constructor(data: Buffer | RemoteAssociationV1RemoteAssociationConfigurationReportData) {
			super(RemoteAssociationConfigurationReport, data);
		}
	};

	public static readonly RemoteAssociationConfigurationSet = class RemoteAssociationConfigurationSet extends CommandPacket<RemoteAssociationV1RemoteAssociationConfigurationSetData> {
		public static readonly CommandClass = RemoteAssociationV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(RemoteAssociationV1)?.command === this.command;
		}

		constructor(data: Buffer | RemoteAssociationV1RemoteAssociationConfigurationSetData) {
			super(RemoteAssociationConfigurationSet, data);
		}
	};
}

export namespace RemoteAssociationV1 {
	export type RemoteAssociationConfigurationGet = InstanceType<typeof RemoteAssociationV1.RemoteAssociationConfigurationGet>;
	export type RemoteAssociationConfigurationReport = InstanceType<typeof RemoteAssociationV1.RemoteAssociationConfigurationReport>;
	export type RemoteAssociationConfigurationSet = InstanceType<typeof RemoteAssociationV1.RemoteAssociationConfigurationSet>;
}
