/**
 * Command Class Av Tagging Md, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum AvTaggingMdV1Commands {
	AvTaggingMdGet = 0x01,
	AvTaggingMdReport = 0x02,
}

export class AvTaggingMdV1 extends CommandClassPacket<AvTaggingMdV1Commands> {
	public static readonly commandClass: number = CommandClasses.AvTaggingMd; // 0x99 (153)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(AvTaggingMdV1, commandAndPayload);
	}
}

export class AvTaggingMdGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof AvTaggingMdV1 = AvTaggingMdV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "AvTaggingMdGet",
		"help": "Av Tagging Md Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AvTaggingMdV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(AvTaggingMdGet, data);
	}
};

export class AvTaggingMdReport extends CommandPacket<void> {
	public static readonly CommandClass: typeof AvTaggingMdV1 = AvTaggingMdV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "AvTaggingMdReport",
		"help": "Av Tagging Md Report",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AvTaggingMdV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(AvTaggingMdReport, data);
	}
};
