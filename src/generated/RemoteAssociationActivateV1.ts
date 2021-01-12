/**
 * Command Class Remote Association Activate, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum RemoteAssociationActivateV1Commands {
	RemoteAssociationActivate = 0x01,
}

export interface RemoteAssociationActivateV1RemoteAssociationActivateData {
	groupingIdentifier: number; // 1 byte unsigned integer
}

// Obsolete
export class RemoteAssociationActivateV1 extends CommandClassPacket<RemoteAssociationActivateV1Commands> {
	public static readonly commandClass = CommandClasses.RemoteAssociationActivate; // 0x7c (124)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(RemoteAssociationActivateV1, commandAndPayload);
	}

	public static readonly RemoteAssociationActivate = class RemoteAssociationActivate extends CommandPacket<RemoteAssociationActivateV1RemoteAssociationActivateData> {
		public static readonly CommandClass = RemoteAssociationActivateV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(RemoteAssociationActivateV1)?.command === this.command;
		}

		constructor(data: Buffer | RemoteAssociationActivateV1RemoteAssociationActivateData) {
			super(RemoteAssociationActivate, data);
		}
	};
}

export namespace RemoteAssociationActivateV1 {
	export type RemoteAssociationActivate = InstanceType<typeof RemoteAssociationActivateV1.RemoteAssociationActivate>;
}
