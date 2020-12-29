/**
 * Command Class Switch Multilevel, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum SwitchMultilevelV2Commands {
	SwitchMultilevelGet = 0x02,
	SwitchMultilevelReport = 0x03,
	SwitchMultilevelSet = 0x01,
	SwitchMultilevelStartLevelChange = 0x04,
	SwitchMultilevelStopLevelChange = 0x05,
}

export interface SwitchMultilevelV2SwitchMultilevelReportData {
	value: number; // 1 byte unsigned integer
}

export interface SwitchMultilevelV2SwitchMultilevelSetData {
	value: number; // 1 byte unsigned integer
	dimmingDuration: number; // 1 byte unsigned integer
}

export interface SwitchMultilevelV2SwitchMultilevelStartLevelChangeData {
	// TODO param properties1 type bitfield
	startLevel: number; // 1 byte unsigned integer
	dimmingDuration: number; // 1 byte unsigned integer
}

export class SwitchMultilevelV2 extends CommandClassPacket<SwitchMultilevelV2Commands> {
	public static readonly commandClass = CommandClasses.SwitchMultilevel; // 0x26 (38)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SwitchMultilevelV2, commandAndPayload);
	}

	public static readonly SwitchMultilevelGet = class SwitchMultilevelGet extends CommandPacket<void> {
		public static readonly CommandClass = SwitchMultilevelV2;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "SwitchMultilevelGet",
			"help": "Switch Multilevel Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SwitchMultilevelGet, data);
		}
	};

	public static readonly SwitchMultilevelReport = class SwitchMultilevelReport extends CommandPacket<SwitchMultilevelV2SwitchMultilevelReportData> {
		public static readonly CommandClass = SwitchMultilevelV2;
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
			return packet.tryAs(SwitchMultilevelV2)?.command === this.command;
		}

		constructor(data: Buffer | SwitchMultilevelV2SwitchMultilevelReportData) {
			super(SwitchMultilevelReport, data);
		}
	};

	public static readonly SwitchMultilevelSet = class SwitchMultilevelSet extends CommandPacket<SwitchMultilevelV2SwitchMultilevelSetData> {
		public static readonly CommandClass = SwitchMultilevelV2;
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
				},
				{
					"type": "integer",
					"name": "dimmingDuration",
					"help": "Dimming Duration",
					"length": 1,
					"values": {
						"0": "Instantly",
						"255": "Factory default"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV2)?.command === this.command;
		}

		constructor(data: Buffer | SwitchMultilevelV2SwitchMultilevelSetData) {
			super(SwitchMultilevelSet, data);
		}
	};

	public static readonly SwitchMultilevelStartLevelChange = class SwitchMultilevelStartLevelChange extends CommandPacket<SwitchMultilevelV2SwitchMultilevelStartLevelChangeData> {
		public static readonly CommandClass = SwitchMultilevelV2;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "SwitchMultilevelStartLevelChange",
			"help": "Switch Multilevel Start Level Change",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
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
				},
				{
					"type": "integer",
					"name": "dimmingDuration",
					"help": "Dimming Duration",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV2)?.command === this.command;
		}

		constructor(data: Buffer | SwitchMultilevelV2SwitchMultilevelStartLevelChangeData) {
			super(SwitchMultilevelStartLevelChange, data);
		}
	};

	public static readonly SwitchMultilevelStopLevelChange = class SwitchMultilevelStopLevelChange extends CommandPacket<void> {
		public static readonly CommandClass = SwitchMultilevelV2;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "SwitchMultilevelStopLevelChange",
			"help": "Switch Multilevel Stop Level Change",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SwitchMultilevelStopLevelChange, data);
		}
	};
}

export namespace SwitchMultilevelV2 {
	export type SwitchMultilevelGet = InstanceType<typeof SwitchMultilevelV2.SwitchMultilevelGet>;
	export type SwitchMultilevelReport = InstanceType<typeof SwitchMultilevelV2.SwitchMultilevelReport>;
	export type SwitchMultilevelSet = InstanceType<typeof SwitchMultilevelV2.SwitchMultilevelSet>;
	export type SwitchMultilevelStartLevelChange = InstanceType<typeof SwitchMultilevelV2.SwitchMultilevelStartLevelChange>;
	export type SwitchMultilevelStopLevelChange = InstanceType<typeof SwitchMultilevelV2.SwitchMultilevelStopLevelChange>;
}
