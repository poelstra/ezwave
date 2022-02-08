/**
 * NOP, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum NoOperationV1Commands {
}

export class NoOperationV1 extends CommandClassPacket<NoOperationV1Commands> {
	public static readonly commandClass: number = CommandClasses.NoOperation; // 0x00 (0)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(NoOperationV1, commandAndPayload);
	}
}

