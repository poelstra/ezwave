/**
 * Command Class Protection, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ProtectionV1Commands {
	ProtectionGet = 0x02,
	ProtectionReport = 0x03,
	ProtectionSet = 0x01,
}

export interface ProtectionV1ProtectionReportData {
	protectionState: ProtectionStateEnum; // 1 byte enum value
}

export interface ProtectionV1ProtectionSetData {
	protectionState: ProtectionStateEnum; // 1 byte enum value
}

export class ProtectionV1 extends CommandClassPacket<ProtectionV1Commands> {
	public static readonly commandClass = CommandClasses.Protection; // 0x75 (117)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ProtectionV1, commandAndPayload);
	}

	public static readonly ProtectionGet = class ProtectionGet extends CommandPacket<void> {
		public static readonly CommandClass = ProtectionV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "ProtectionGet",
			"help": "Protection Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ProtectionV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ProtectionGet, data);
		}
	};

	public static readonly ProtectionReport = class ProtectionReport extends CommandPacket<ProtectionV1ProtectionReportData> {
		public static readonly CommandClass = ProtectionV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "ProtectionReport",
			"help": "Protection Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "protectionState",
					"help": "Protection State",
					"length": 1,
					"values": {
						"0": "Unprotected",
						"1": "Protection by sequence",
						"2": "No operation possible"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ProtectionV1)?.command === this.command;
		}

		constructor(data: Buffer | ProtectionV1ProtectionReportData) {
			super(ProtectionReport, data);
		}
	};

	public static readonly ProtectionSet = class ProtectionSet extends CommandPacket<ProtectionV1ProtectionSetData> {
		public static readonly CommandClass = ProtectionV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "ProtectionSet",
			"help": "Protection Set",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "protectionState",
					"help": "Protection State",
					"length": 1,
					"values": {
						"0": "Unprotected",
						"1": "Protection by sequence",
						"2": "No operation possible"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ProtectionV1)?.command === this.command;
		}

		constructor(data: Buffer | ProtectionV1ProtectionSetData) {
			super(ProtectionSet, data);
		}
	};
}

export namespace ProtectionV1 {
	export type ProtectionGet = InstanceType<typeof ProtectionV1.ProtectionGet>;
	export type ProtectionReport = InstanceType<typeof ProtectionV1.ProtectionReport>;
	export type ProtectionSet = InstanceType<typeof ProtectionV1.ProtectionSet>;
}

export enum ProtectionStateEnum {
	Unprotected = 0x0,
	ProtectionBySequence = 0x1,
	NoOperationPossible = 0x2,
}
