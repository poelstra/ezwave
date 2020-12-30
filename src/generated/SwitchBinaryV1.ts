/**
 * Command Class Switch Binary, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum SwitchBinaryV1Commands {
	SwitchBinaryGet = 0x02,
	SwitchBinaryReport = 0x03,
	SwitchBinarySet = 0x01,
}

export interface SwitchBinaryV1SwitchBinaryReportData {
	value: number; // 1 byte unsigned integer
}

export interface SwitchBinaryV1SwitchBinarySetData {
	switchValue: number; // 1 byte unsigned integer
}

export class SwitchBinaryV1 extends CommandClassPacket<SwitchBinaryV1Commands> {
	public static readonly commandClass = CommandClasses.SwitchBinary; // 0x25 (37)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SwitchBinaryV1, commandAndPayload);
	}

	public static readonly SwitchBinaryGet = class SwitchBinaryGet extends CommandPacket<void> {
		public static readonly CommandClass = SwitchBinaryV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "SwitchBinaryGet",
			"help": "Switch Binary Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchBinaryV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SwitchBinaryGet, data);
		}
	};

	public static readonly SwitchBinaryReport = class SwitchBinaryReport extends CommandPacket<SwitchBinaryV1SwitchBinaryReportData> {
		public static readonly CommandClass = SwitchBinaryV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "SwitchBinaryReport",
			"help": "Switch Binary Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "value",
					"help": "Value",
					"length": 1,
					"values": {
						"0": {
							"name": "OffDisable",
							"help": "off/disable"
						},
						"255": {
							"name": "OnEnable",
							"help": "on/enable"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchBinaryV1)?.command === this.command;
		}

		constructor(data: Buffer | SwitchBinaryV1SwitchBinaryReportData) {
			super(SwitchBinaryReport, data);
		}
	};

	public static readonly SwitchBinarySet = class SwitchBinarySet extends CommandPacket<SwitchBinaryV1SwitchBinarySetData> {
		public static readonly CommandClass = SwitchBinaryV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "SwitchBinarySet",
			"help": "Switch Binary Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "switchValue",
					"help": "Switch Value",
					"length": 1,
					"values": {
						"0": {
							"name": "OffDisable",
							"help": "off/disable"
						},
						"255": {
							"name": "OnEnable",
							"help": "on/enable"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchBinaryV1)?.command === this.command;
		}

		constructor(data: Buffer | SwitchBinaryV1SwitchBinarySetData) {
			super(SwitchBinarySet, data);
		}
	};
}

export namespace SwitchBinaryV1 {
	export type SwitchBinaryGet = InstanceType<typeof SwitchBinaryV1.SwitchBinaryGet>;
	export type SwitchBinaryReport = InstanceType<typeof SwitchBinaryV1.SwitchBinaryReport>;
	export type SwitchBinarySet = InstanceType<typeof SwitchBinaryV1.SwitchBinarySet>;
}
