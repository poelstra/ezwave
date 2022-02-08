/**
 * Command Class Mark, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum MarkV1Commands {
}

export class MarkV1 extends CommandClassPacket<MarkV1Commands> {
	public static readonly commandClass: number = CommandClasses.Mark; // 0xef (239)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(MarkV1, commandAndPayload);
	}
}

