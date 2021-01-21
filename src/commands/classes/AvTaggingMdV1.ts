/**
 * Command Class Av Tagging Md, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum AvTaggingMdV1Commands {
	AvTaggingMdGet = 0x01,
	AvTaggingMdReport = 0x02,
}

export class AvTaggingMdV1 extends CommandClassPacket<AvTaggingMdV1Commands> {
	public static readonly commandClass = CommandClasses.AvTaggingMd; // 0x99 (153)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(AvTaggingMdV1, commandAndPayload);
	}

	public static readonly AvTaggingMdGet = class AvTaggingMdGet extends CommandPacket<void> {
		public static readonly CommandClass = AvTaggingMdV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "AvTaggingMdGet",
			"help": "Av Tagging Md Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AvTaggingMdV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AvTaggingMdGet, data);
		}
	};

	public static readonly AvTaggingMdReport = class AvTaggingMdReport extends CommandPacket<void> {
		public static readonly CommandClass = AvTaggingMdV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "AvTaggingMdReport",
			"help": "Av Tagging Md Report",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AvTaggingMdV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AvTaggingMdReport, data);
		}
	};
}

export namespace AvTaggingMdV1 {
	export type AvTaggingMdGet = InstanceType<typeof AvTaggingMdV1.AvTaggingMdGet>;
	export type AvTaggingMdReport = InstanceType<typeof AvTaggingMdV1.AvTaggingMdReport>;
}
