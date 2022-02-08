/**
 * Command Class Remote Association Activate, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum RemoteAssociationActivateV1Commands {
	RemoteAssociationActivate = 0x01,
}

export interface RemoteAssociationActivateV1RemoteAssociationActivateData {
	groupingIdentifier: number; // 1 byte unsigned integer
}

// This (version of the) command class is Obsolete
export class RemoteAssociationActivateV1 extends CommandClassPacket<RemoteAssociationActivateV1Commands> {
	public static readonly commandClass: number = CommandClasses.RemoteAssociationActivate; // 0x7c (124)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(RemoteAssociationActivateV1, commandAndPayload);
	}
}

export class RemoteAssociationActivate extends CommandPacket<RemoteAssociationActivateV1RemoteAssociationActivateData> {
	public static readonly CommandClass: typeof RemoteAssociationActivateV1 = RemoteAssociationActivateV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "RemoteAssociationActivate",
		"help": "Remote Association Activate",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "groupingIdentifier",
				"help": "Grouping identifier",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(RemoteAssociationActivateV1)?.command === this.command;
	}

	public constructor(data: Buffer | RemoteAssociationActivateV1RemoteAssociationActivateData) {
		super(RemoteAssociationActivate, data);
	}
};
