/**
 * Command Class Lock, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum LockV1Commands {
	LockGet = 0x02,
	LockReport = 0x03,
	LockSet = 0x01,
}

export interface LockV1LockReportData {
	lockState: number; // 1 byte unsigned integer
}

export interface LockV1LockSetData {
	lockState: number; // 1 byte unsigned integer
}

// Deprecated
export class LockV1 extends CommandClassPacket<LockV1Commands> {
	public static readonly commandClass = CommandClasses.Lock; // 0x76 (118)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(LockV1, commandAndPayload);
	}

	public static readonly LockGet = class LockGet extends CommandPacket<void> {
		public static readonly CommandClass = LockV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "LockGet",
			"help": "Lock Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(LockV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(LockGet, data);
		}
	};

	public static readonly LockReport = class LockReport extends CommandPacket<LockV1LockReportData> {
		public static readonly CommandClass = LockV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "LockReport",
			"help": "Lock Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "lockState",
					"help": "Lock State",
					"length": 1,
					"values": {
						"0": "unlocked",
						"1": "locked"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(LockV1)?.command === this.command;
		}

		constructor(data: Buffer | LockV1LockReportData) {
			super(LockReport, data);
		}
	};

	public static readonly LockSet = class LockSet extends CommandPacket<LockV1LockSetData> {
		public static readonly CommandClass = LockV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "LockSet",
			"help": "Lock Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "lockState",
					"help": "Lock State",
					"length": 1,
					"values": {
						"0": "unlocked",
						"1": "locked"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(LockV1)?.command === this.command;
		}

		constructor(data: Buffer | LockV1LockSetData) {
			super(LockSet, data);
		}
	};
}

export namespace LockV1 {
	export type LockGet = InstanceType<typeof LockV1.LockGet>;
	export type LockReport = InstanceType<typeof LockV1.LockReport>;
	export type LockSet = InstanceType<typeof LockV1.LockSet>;
}
