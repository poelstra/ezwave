/**
 * Command Class Av Content Search Md, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandClasses, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum AvContentSearchMdV1Commands {
	AvContentSearchMdGet = 0x01,
	AvContentSearchMdReport = 0x02,
}

export class AvContentSearchMdV1 extends CommandClassPacket<AvContentSearchMdV1Commands> {
	public static readonly commandClass = CommandClasses.AvContentSearchMd; // 0x97 (151)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(AvContentSearchMdV1, commandAndPayload);
	}

	public static readonly AvContentSearchMdGet = class AvContentSearchMdGet extends CommandPacket<void> {
		public static readonly CommandClass = AvContentSearchMdV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "AvContentSearchMdGet",
			"help": "Av Content Search Md Get",
			"status": "Active",
			"params": []
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AvContentSearchMdV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AvContentSearchMdGet, data);
		}
	};

	public static readonly AvContentSearchMdReport = class AvContentSearchMdReport extends CommandPacket<void> {
		public static readonly CommandClass = AvContentSearchMdV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "AvContentSearchMdReport",
			"help": "Av Content Search Md Report",
			"status": "Active",
			"params": []
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AvContentSearchMdV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AvContentSearchMdReport, data);
		}
	};
}

export namespace AvContentSearchMdV1 {
	export type AvContentSearchMdGet = InstanceType<typeof AvContentSearchMdV1.AvContentSearchMdGet>;
	export type AvContentSearchMdReport = InstanceType<typeof AvContentSearchMdV1.AvContentSearchMdReport>;
}
