/**
 * Command Class Non Interoperable, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum NonInteroperableV1Commands {
}

export class NonInteroperableV1 extends CommandClassPacket<NonInteroperableV1Commands> {
	public static readonly commandClass = CommandClasses.NonInteroperable; // 0xf0 (240)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(NonInteroperableV1, commandAndPayload);
	}
}

