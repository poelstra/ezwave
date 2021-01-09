/**
 * Command Class Mark, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum MarkV1Commands {
}

export class MarkV1 extends CommandClassPacket<MarkV1Commands> {
	public static readonly commandClass = CommandClasses.Mark; // 0xef (239)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(MarkV1, commandAndPayload);
	}

}

export namespace MarkV1 {
}
