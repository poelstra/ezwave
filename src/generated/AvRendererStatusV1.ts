/**
 * Command Class Av Renderer Status, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum AvRendererStatusV1Commands {
	AvRendererStatusGet = 0x01,
	AvRendererStatusReport = 0x02,
}

export class AvRendererStatusV1 extends CommandClassPacket<AvRendererStatusV1Commands> {
	public static readonly commandClass = CommandClasses.AvRendererStatus; // 0x96 (150)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(AvRendererStatusV1, commandAndPayload);
	}

	public static readonly AvRendererStatusGet = class AvRendererStatusGet extends CommandPacket<void> {
		public static readonly CommandClass = AvRendererStatusV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "AvRendererStatusGet",
			"help": "Av Renderer Status Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AvRendererStatusV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AvRendererStatusGet, data);
		}
	};

	public static readonly AvRendererStatusReport = class AvRendererStatusReport extends CommandPacket<void> {
		public static readonly CommandClass = AvRendererStatusV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "AvRendererStatusReport",
			"help": "Av Renderer Status Report",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AvRendererStatusV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AvRendererStatusReport, data);
		}
	};
}

export namespace AvRendererStatusV1 {
	export type AvRendererStatusGet = InstanceType<typeof AvRendererStatusV1.AvRendererStatusGet>;
	export type AvRendererStatusReport = InstanceType<typeof AvRendererStatusV1.AvRendererStatusReport>;
}
