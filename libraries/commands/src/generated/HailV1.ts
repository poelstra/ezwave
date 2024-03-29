/**
 * Command Class Hail, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum HailV1Commands {
	Hail = 0x01,
}

// This (version of the) command class is Obsolete
export class HailV1 extends CommandClassPacket<HailV1Commands> {
	public static readonly commandClass: number = CommandClasses.Hail; // 0x82 (130)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(HailV1, commandAndPayload);
	}
}

export class Hail extends CommandPacket<void> {
	public static readonly CommandClass: typeof HailV1 = HailV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "Hail",
		"help": "Hail",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(HailV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(Hail, data);
	}
};
