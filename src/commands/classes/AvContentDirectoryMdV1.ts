/**
 * Command Class Av Content Directory Md, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

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
	public static readonly commandClass = CommandClasses.AvContentDirectoryMd; // 0x95 (149)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(AvContentDirectoryMdV1, commandAndPayload);
	}

	public static readonly AvContentBrowseMdByLetterGet = class AvContentBrowseMdByLetterGet extends CommandPacket<void> {
		public static readonly CommandClass = AvContentDirectoryMdV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "AvContentBrowseMdByLetterGet",
			"help": "Av Content Browse Md By Letter Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AvContentDirectoryMdV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AvContentBrowseMdByLetterGet, data);
		}
	};

	public static readonly AvContentBrowseMdByLetterReport = class AvContentBrowseMdByLetterReport extends CommandPacket<void> {
		public static readonly CommandClass = AvContentDirectoryMdV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "AvContentBrowseMdByLetterReport",
			"help": "Av Content Browse Md By Letter Report",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AvContentDirectoryMdV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AvContentBrowseMdByLetterReport, data);
		}
	};

	public static readonly AvContentBrowseMdChildCountGet = class AvContentBrowseMdChildCountGet extends CommandPacket<void> {
		public static readonly CommandClass = AvContentDirectoryMdV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "AvContentBrowseMdChildCountGet",
			"help": "Av Content Browse Md Child Count Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AvContentDirectoryMdV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AvContentBrowseMdChildCountGet, data);
		}
	};

	public static readonly AvContentBrowseMdChildCountReport = class AvContentBrowseMdChildCountReport extends CommandPacket<void> {
		public static readonly CommandClass = AvContentDirectoryMdV1;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "AvContentBrowseMdChildCountReport",
			"help": "Av Content Browse Md Child Count Report",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AvContentDirectoryMdV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AvContentBrowseMdChildCountReport, data);
		}
	};

	public static readonly AvContentBrowseMdGet = class AvContentBrowseMdGet extends CommandPacket<void> {
		public static readonly CommandClass = AvContentDirectoryMdV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "AvContentBrowseMdGet",
			"help": "Av Content Browse Md Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AvContentDirectoryMdV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AvContentBrowseMdGet, data);
		}
	};

	public static readonly AvContentBrowseMdReport = class AvContentBrowseMdReport extends CommandPacket<void> {
		public static readonly CommandClass = AvContentDirectoryMdV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "AvContentBrowseMdReport",
			"help": "Av Content Browse Md Report",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AvContentDirectoryMdV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AvContentBrowseMdReport, data);
		}
	};

	public static readonly AvMatchItemToRendererMdGet = class AvMatchItemToRendererMdGet extends CommandPacket<void> {
		public static readonly CommandClass = AvContentDirectoryMdV1;
		public static readonly command = 0x07;
		public static readonly definition = convertFromJsonCommand({
			"command": 7,
			"name": "AvMatchItemToRendererMdGet",
			"help": "Av Match Item To Renderer Md Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AvContentDirectoryMdV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AvMatchItemToRendererMdGet, data);
		}
	};

	public static readonly AvMatchItemToRendererMdReport = class AvMatchItemToRendererMdReport extends CommandPacket<void> {
		public static readonly CommandClass = AvContentDirectoryMdV1;
		public static readonly command = 0x08;
		public static readonly definition = convertFromJsonCommand({
			"command": 8,
			"name": "AvMatchItemToRendererMdReport",
			"help": "Av Match Item To Renderer Md Report",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AvContentDirectoryMdV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AvMatchItemToRendererMdReport, data);
		}
	};
}

export namespace AvContentDirectoryMdV1 {
	export type AvContentBrowseMdByLetterGet = InstanceType<typeof AvContentDirectoryMdV1.AvContentBrowseMdByLetterGet>;
	export type AvContentBrowseMdByLetterReport = InstanceType<typeof AvContentDirectoryMdV1.AvContentBrowseMdByLetterReport>;
	export type AvContentBrowseMdChildCountGet = InstanceType<typeof AvContentDirectoryMdV1.AvContentBrowseMdChildCountGet>;
	export type AvContentBrowseMdChildCountReport = InstanceType<typeof AvContentDirectoryMdV1.AvContentBrowseMdChildCountReport>;
	export type AvContentBrowseMdGet = InstanceType<typeof AvContentDirectoryMdV1.AvContentBrowseMdGet>;
	export type AvContentBrowseMdReport = InstanceType<typeof AvContentDirectoryMdV1.AvContentBrowseMdReport>;
	export type AvMatchItemToRendererMdGet = InstanceType<typeof AvContentDirectoryMdV1.AvMatchItemToRendererMdGet>;
	export type AvMatchItemToRendererMdReport = InstanceType<typeof AvContentDirectoryMdV1.AvMatchItemToRendererMdReport>;
}
