/**
 * Command Class Switch Toggle Binary, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum SwitchToggleBinaryV1Commands {
	SwitchToggleBinarySet = 0x01,
	SwitchToggleBinaryGet = 0x02,
	SwitchToggleBinaryReport = 0x03,
}

export interface SwitchToggleBinaryV1SwitchToggleBinaryReportData {
	value: number; // 1 byte unsigned integer
}

// Deprecated
export class SwitchToggleBinaryV1 extends CommandClassPacket<SwitchToggleBinaryV1Commands> {
	public static readonly commandClass = CommandClasses.SwitchToggleBinary; // 0x28 (40)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SwitchToggleBinaryV1, commandAndPayload);
	}

	public static readonly SwitchToggleBinarySet = class SwitchToggleBinarySet extends CommandPacket<void> {
		public static readonly CommandClass = SwitchToggleBinaryV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "SwitchToggleBinarySet",
			"help": "Switch Toggle Binary Set",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchToggleBinaryV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SwitchToggleBinarySet, data);
		}
	};

	public static readonly SwitchToggleBinaryGet = class SwitchToggleBinaryGet extends CommandPacket<void> {
		public static readonly CommandClass = SwitchToggleBinaryV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "SwitchToggleBinaryGet",
			"help": "Switch Toggle Binary Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchToggleBinaryV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SwitchToggleBinaryGet, data);
		}
	};

	public static readonly SwitchToggleBinaryReport = class SwitchToggleBinaryReport extends CommandPacket<SwitchToggleBinaryV1SwitchToggleBinaryReportData> {
		public static readonly CommandClass = SwitchToggleBinaryV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "SwitchToggleBinaryReport",
			"help": "Switch Toggle Binary Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "value",
					"help": "Value",
					"length": 1,
					"values": {
						"0": {
							"name": "Off",
							"help": "off"
						},
						"255": {
							"name": "On",
							"help": "on"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchToggleBinaryV1)?.command === this.command;
		}

		constructor(data: Buffer | SwitchToggleBinaryV1SwitchToggleBinaryReportData) {
			super(SwitchToggleBinaryReport, data);
		}
	};
}

export namespace SwitchToggleBinaryV1 {
	export type SwitchToggleBinarySet = InstanceType<typeof SwitchToggleBinaryV1.SwitchToggleBinarySet>;
	export type SwitchToggleBinaryGet = InstanceType<typeof SwitchToggleBinaryV1.SwitchToggleBinaryGet>;
	export type SwitchToggleBinaryReport = InstanceType<typeof SwitchToggleBinaryV1.SwitchToggleBinaryReport>;
}
