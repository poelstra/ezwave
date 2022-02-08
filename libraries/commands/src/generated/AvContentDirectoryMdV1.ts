/**
 * Command Class Av Content Directory Md, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum AvContentDirectoryMdV1Commands {
	AvContentBrowseMdByLetterGet = 0x03,
	AvContentBrowseMdByLetterReport = 0x04,
	AvContentBrowseMdChildCountGet = 0x05,
	AvContentBrowseMdChildCountReport = 0x06,
	AvContentBrowseMdGet = 0x01,
	AvContentBrowseMdReport = 0x02,
	AvMatchItemToRendererMdGet = 0x07,
	AvMatchItemToRendererMdReport = 0x08,
}

export class AvContentDirectoryMdV1 extends CommandClassPacket<AvContentDirectoryMdV1Commands> {
	public static readonly commandClass: number = CommandClasses.AvContentDirectoryMd; // 0x95 (149)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(AvContentDirectoryMdV1, commandAndPayload);
	}
}

export class AvContentBrowseMdByLetterGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof AvContentDirectoryMdV1 = AvContentDirectoryMdV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "AvContentBrowseMdByLetterGet",
		"help": "Av Content Browse Md By Letter Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AvContentDirectoryMdV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(AvContentBrowseMdByLetterGet, data);
	}
};

export class AvContentBrowseMdByLetterReport extends CommandPacket<void> {
	public static readonly CommandClass: typeof AvContentDirectoryMdV1 = AvContentDirectoryMdV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "AvContentBrowseMdByLetterReport",
		"help": "Av Content Browse Md By Letter Report",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AvContentDirectoryMdV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(AvContentBrowseMdByLetterReport, data);
	}
};

export class AvContentBrowseMdChildCountGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof AvContentDirectoryMdV1 = AvContentDirectoryMdV1;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "AvContentBrowseMdChildCountGet",
		"help": "Av Content Browse Md Child Count Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AvContentDirectoryMdV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(AvContentBrowseMdChildCountGet, data);
	}
};

export class AvContentBrowseMdChildCountReport extends CommandPacket<void> {
	public static readonly CommandClass: typeof AvContentDirectoryMdV1 = AvContentDirectoryMdV1;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 6,
		"name": "AvContentBrowseMdChildCountReport",
		"help": "Av Content Browse Md Child Count Report",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AvContentDirectoryMdV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(AvContentBrowseMdChildCountReport, data);
	}
};

export class AvContentBrowseMdGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof AvContentDirectoryMdV1 = AvContentDirectoryMdV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "AvContentBrowseMdGet",
		"help": "Av Content Browse Md Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AvContentDirectoryMdV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(AvContentBrowseMdGet, data);
	}
};

export class AvContentBrowseMdReport extends CommandPacket<void> {
	public static readonly CommandClass: typeof AvContentDirectoryMdV1 = AvContentDirectoryMdV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "AvContentBrowseMdReport",
		"help": "Av Content Browse Md Report",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AvContentDirectoryMdV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(AvContentBrowseMdReport, data);
	}
};

export class AvMatchItemToRendererMdGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof AvContentDirectoryMdV1 = AvContentDirectoryMdV1;
	public static readonly command: number = 0x07; // 7
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 7,
		"name": "AvMatchItemToRendererMdGet",
		"help": "Av Match Item To Renderer Md Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AvContentDirectoryMdV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(AvMatchItemToRendererMdGet, data);
	}
};

export class AvMatchItemToRendererMdReport extends CommandPacket<void> {
	public static readonly CommandClass: typeof AvContentDirectoryMdV1 = AvContentDirectoryMdV1;
	public static readonly command: number = 0x08; // 8
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 8,
		"name": "AvMatchItemToRendererMdReport",
		"help": "Av Match Item To Renderer Md Report",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(AvContentDirectoryMdV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(AvMatchItemToRendererMdReport, data);
	}
};
