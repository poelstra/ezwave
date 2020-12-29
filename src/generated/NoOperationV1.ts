/**
 * NOP, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum NoOperationV1Commands {
}

export class NoOperationV1 extends CommandClassPacket<NoOperationV1Commands> {
	public static readonly commandClass = CommandClasses.NoOperation; // 0x00 (0)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(NoOperationV1, commandAndPayload);
	}

}

export namespace NoOperationV1 {
}
