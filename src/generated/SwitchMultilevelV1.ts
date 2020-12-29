/**
 * Command Class Switch Multilevel, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum SwitchMultilevelV1Commands {
	SwitchMultilevelGet = 0x02,
	SwitchMultilevelReport = 0x03,
	SwitchMultilevelSet = 0x01,
	SwitchMultilevelStartLevelChange = 0x04,
	SwitchMultilevelStopLevelChange = 0x05,
}

export interface SwitchMultilevelV1SwitchMultilevelReportData {
	value: number; // 1 byte unsigned integer
}

export interface SwitchMultilevelV1SwitchMultilevelSetData {
	value: number; // 1 byte unsigned integer
}

export interface SwitchMultilevelV1SwitchMultilevelStartLevelChangeData {
	// TODO param level type bitfield
	startLevel: number; // 1 byte unsigned integer
}

export class SwitchMultilevelV1 extends CommandClassPacket<SwitchMultilevelV1Commands> {
	public static readonly commandClass = CommandClasses.SwitchMultilevel; // 0x26 (38)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SwitchMultilevelV1, commandAndPayload);
	}

	public static readonly SwitchMultilevelGet = class SwitchMultilevelGet extends CommandPacket<void> {
		public static readonly CommandClass = SwitchMultilevelV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "SwitchMultilevelGet",
			"help": "Switch Multilevel Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SwitchMultilevelGet, data);
		}
	};

	public static readonly SwitchMultilevelReport = class SwitchMultilevelReport extends CommandPacket<SwitchMultilevelV1SwitchMultilevelReportData> {
		public static readonly CommandClass = SwitchMultilevelV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "SwitchMultilevelReport",
			"help": "Switch Multilevel Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "value",
					"help": "Value",
					"length": 1,
					"values": {
						"0": "off/disable",
						"255": "on/enable"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV1)?.command === this.command;
		}

		constructor(data: Buffer | SwitchMultilevelV1SwitchMultilevelReportData) {
			super(SwitchMultilevelReport, data);
		}
	};

	public static readonly SwitchMultilevelSet = class SwitchMultilevelSet extends CommandPacket<SwitchMultilevelV1SwitchMultilevelSetData> {
		public static readonly CommandClass = SwitchMultilevelV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "SwitchMultilevelSet",
			"help": "Switch Multilevel Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "value",
					"help": "Value",
					"length": 1,
					"values": {
						"0": "off/disable",
						"255": "on/enable"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV1)?.command === this.command;
		}

		constructor(data: Buffer | SwitchMultilevelV1SwitchMultilevelSetData) {
			super(SwitchMultilevelSet, data);
		}
	};

	public static readonly SwitchMultilevelStartLevelChange = class SwitchMultilevelStartLevelChange extends CommandPacket<SwitchMultilevelV1SwitchMultilevelStartLevelChangeData> {
		public static readonly CommandClass = SwitchMultilevelV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "SwitchMultilevelStartLevelChange",
			"help": "Switch Multilevel Start Level Change",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Reserved1",
							"mask": 31,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Ignore Start Level",
							"mask": 32,
							"shift": 5
						},
						{
							"type": "boolean",
							"name": "Up/ Down",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "boolean",
							"name": "Reserved2",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "integer",
					"name": "startLevel",
					"help": "Start Level",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV1)?.command === this.command;
		}

		constructor(data: Buffer | SwitchMultilevelV1SwitchMultilevelStartLevelChangeData) {
			super(SwitchMultilevelStartLevelChange, data);
		}
	};

	public static readonly SwitchMultilevelStopLevelChange = class SwitchMultilevelStopLevelChange extends CommandPacket<void> {
		public static readonly CommandClass = SwitchMultilevelV1;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "SwitchMultilevelStopLevelChange",
			"help": "Switch Multilevel Stop Level Change",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SwitchMultilevelStopLevelChange, data);
		}
	};
}

export namespace SwitchMultilevelV1 {
	export type SwitchMultilevelGet = InstanceType<typeof SwitchMultilevelV1.SwitchMultilevelGet>;
	export type SwitchMultilevelReport = InstanceType<typeof SwitchMultilevelV1.SwitchMultilevelReport>;
	export type SwitchMultilevelSet = InstanceType<typeof SwitchMultilevelV1.SwitchMultilevelSet>;
	export type SwitchMultilevelStartLevelChange = InstanceType<typeof SwitchMultilevelV1.SwitchMultilevelStartLevelChange>;
	export type SwitchMultilevelStopLevelChange = InstanceType<typeof SwitchMultilevelV1.SwitchMultilevelStopLevelChange>;
}
