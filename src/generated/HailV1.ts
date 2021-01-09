/**
 * Command Class Hail, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum HailV1Commands {
	Hail = 0x01,
}

// Obsolete
export class HailV1 extends CommandClassPacket<HailV1Commands> {
	public static readonly commandClass = CommandClasses.Hail; // 0x82 (130)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(HailV1, commandAndPayload);
	}

	public static readonly Hail = class Hail extends CommandPacket<void> {
		public static readonly CommandClass = HailV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "Hail",
			"help": "Hail",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HailV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(Hail, data);
		}
	};
}

export namespace HailV1 {
	export type Hail = InstanceType<typeof HailV1.Hail>;
}
