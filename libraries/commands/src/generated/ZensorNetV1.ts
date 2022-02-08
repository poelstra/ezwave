/**
 * Command Class Zensor Net, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum ZensorNetV1Commands {
	BindAccept = 0x02,
	BindComplete = 0x03,
	BindRequest = 0x01,
}

export class ZensorNetV1 extends CommandClassPacket<ZensorNetV1Commands> {
	public static readonly commandClass: number = CommandClasses.ZensorNet; // 0x02 (2)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ZensorNetV1, commandAndPayload);
	}
}

export class BindAccept extends CommandPacket<void> {
	public static readonly CommandClass: typeof ZensorNetV1 = ZensorNetV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "BindAccept",
		"help": "Bind Accept",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ZensorNetV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(BindAccept, data);
	}
};

export class BindComplete extends CommandPacket<void> {
	public static readonly CommandClass: typeof ZensorNetV1 = ZensorNetV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "BindComplete",
		"help": "Bind Complete",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ZensorNetV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(BindComplete, data);
	}
};

export class BindRequest extends CommandPacket<void> {
	public static readonly CommandClass: typeof ZensorNetV1 = ZensorNetV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "BindRequest",
		"help": "Bind Request",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ZensorNetV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(BindRequest, data);
	}
};
