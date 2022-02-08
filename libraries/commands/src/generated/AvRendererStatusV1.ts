/**
 * Command Class Av Renderer Status, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum AvRendererStatusV1Commands {
	AvRendererStatusGet = 0x01,
	AvRendererStatusReport = 0x02,
}

export class AvRendererStatusV1 extends CommandClassPacket<AvRendererStatusV1Commands> {
	public static readonly commandClass: number = CommandClasses.AvRendererStatus; // 0x96 (150)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(AvRendererStatusV1, commandAndPayload);
	}
}

export class AvRendererStatusGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof AvRendererStatusV1 = AvRendererStatusV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "AvRendererStatusGet",
		"help": "Av Renderer Status Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AvRendererStatusV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(AvRendererStatusGet, data);
	}
};

export class AvRendererStatusReport extends CommandPacket<void> {
	public static readonly CommandClass: typeof AvRendererStatusV1 = AvRendererStatusV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "AvRendererStatusReport",
		"help": "Av Renderer Status Report",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AvRendererStatusV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(AvRendererStatusReport, data);
	}
};
