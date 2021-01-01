/**
 * Command Class Switch Color, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum SwitchColorV2Commands {
	SwitchColorSupportedGet = 0x01,
	SwitchColorSupportedReport = 0x02,
	SwitchColorGet = 0x03,
	SwitchColorReport = 0x04,
	SwitchColorSet = 0x05,
	SwitchColorStartLevelChange = 0x06,
	SwitchColorStopLevelChange = 0x07,
}

export interface SwitchColorV2SwitchColorSupportedReportData {
	colorComponentMask: number; // 2 byte unsigned integer
}

export interface SwitchColorV2SwitchColorGetData {
	colorComponentID: number; // 1 byte unsigned integer
}

export interface SwitchColorV2SwitchColorReportData {
	colorComponentID: number; // 1 byte unsigned integer
	value: number; // 1 byte unsigned integer
}

export interface SwitchColorV2SwitchColorSetData {
	colorComponentCount: number; // properties1[4..0]
	// TODO param vg1 type group
	duration: number; // 1 byte unsigned integer
}

export interface SwitchColorV2SwitchColorStartLevelChangeData {
	upDown: boolean; // properties1[6]
	ignoreStartState: boolean; // properties1[5]
	colorComponentID: number; // 1 byte unsigned integer
	startLevel: number; // 1 byte unsigned integer
}

export interface SwitchColorV2SwitchColorStopLevelChangeData {
	colorComponentID: number; // 1 byte unsigned integer
}

export class SwitchColorV2 extends CommandClassPacket<SwitchColorV2Commands> {
	public static readonly commandClass = CommandClasses.SwitchColor; // 0x33 (51)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SwitchColorV2, commandAndPayload);
	}

	public static readonly SwitchColorSupportedGet = class SwitchColorSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = SwitchColorV2;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "SwitchColorSupportedGet",
			"help": "Color Switch Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchColorV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SwitchColorSupportedGet, data);
		}
	};

	public static readonly SwitchColorSupportedReport = class SwitchColorSupportedReport extends CommandPacket<SwitchColorV2SwitchColorSupportedReportData> {
		public static readonly CommandClass = SwitchColorV2;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "SwitchColorSupportedReport",
			"help": "Color Switch Supported Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "colorComponentMask",
					"help": "Color Component mask",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchColorV2)?.command === this.command;
		}

		constructor(data: Buffer | SwitchColorV2SwitchColorSupportedReportData) {
			super(SwitchColorSupportedReport, data);
		}
	};

	public static readonly SwitchColorGet = class SwitchColorGet extends CommandPacket<SwitchColorV2SwitchColorGetData> {
		public static readonly CommandClass = SwitchColorV2;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "SwitchColorGet",
			"help": "Color Switch Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "colorComponentID",
					"help": "Color Component ID",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchColorV2)?.command === this.command;
		}

		constructor(data: Buffer | SwitchColorV2SwitchColorGetData) {
			super(SwitchColorGet, data);
		}
	};

	public static readonly SwitchColorReport = class SwitchColorReport extends CommandPacket<SwitchColorV2SwitchColorReportData> {
		public static readonly CommandClass = SwitchColorV2;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "SwitchColorReport",
			"help": "Color Switch Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "colorComponentID",
					"help": "Color Component ID",
					"length": 1
				},
				{
					"type": "integer",
					"name": "value",
					"help": "Value",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchColorV2)?.command === this.command;
		}

		constructor(data: Buffer | SwitchColorV2SwitchColorReportData) {
			super(SwitchColorReport, data);
		}
	};

	public static readonly SwitchColorSet = class SwitchColorSet extends CommandPacket<SwitchColorV2SwitchColorSetData> {
		public static readonly CommandClass = SwitchColorV2;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "SwitchColorSet",
			"help": "Color Switch Set",
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
							"name": "reserved",
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "colorComponentCount",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"ref": "properties1",
						"bitfield": {
							"mask": 31,
							"shift": 0,
							"name": "colorComponentCount"
						}
					},
					"params": [
						{
							"type": "integer",
							"name": "colorComponentID",
							"help": "Color Component ID",
							"length": 1
						},
						{
							"type": "integer",
							"name": "value",
							"help": "Value",
							"length": 1
						}
					]
				},
				{
					"type": "integer",
					"name": "duration",
					"help": "Duration",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchColorV2)?.command === this.command;
		}

		constructor(data: Buffer | SwitchColorV2SwitchColorSetData) {
			super(SwitchColorSet, data);
		}
	};

	public static readonly SwitchColorStartLevelChange = class SwitchColorStartLevelChange extends CommandPacket<SwitchColorV2SwitchColorStartLevelChangeData> {
		public static readonly CommandClass = SwitchColorV2;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "SwitchColorStartLevelChange",
			"help": "Color Switch Start Level Change",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "res2",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"type": "boolean",
							"name": "upDown",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "boolean",
							"name": "ignoreStartState",
							"mask": 32,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "res1",
							"mask": 31,
							"shift": 0,
							"reserved": true
						}
					]
				},
				{
					"type": "integer",
					"name": "colorComponentID",
					"help": "Color Component ID",
					"length": 1
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
			return packet.tryAs(SwitchColorV2)?.command === this.command;
		}

		constructor(data: Buffer | SwitchColorV2SwitchColorStartLevelChangeData) {
			super(SwitchColorStartLevelChange, data);
		}
	};

	public static readonly SwitchColorStopLevelChange = class SwitchColorStopLevelChange extends CommandPacket<SwitchColorV2SwitchColorStopLevelChangeData> {
		public static readonly CommandClass = SwitchColorV2;
		public static readonly command = 0x07;
		public static readonly definition = {
			"command": 7,
			"name": "SwitchColorStopLevelChange",
			"help": "Color Switch Stop Level Change",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "colorComponentID",
					"help": "Color Component ID",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchColorV2)?.command === this.command;
		}

		constructor(data: Buffer | SwitchColorV2SwitchColorStopLevelChangeData) {
			super(SwitchColorStopLevelChange, data);
		}
	};
}

export namespace SwitchColorV2 {
	export type SwitchColorSupportedGet = InstanceType<typeof SwitchColorV2.SwitchColorSupportedGet>;
	export type SwitchColorSupportedReport = InstanceType<typeof SwitchColorV2.SwitchColorSupportedReport>;
	export type SwitchColorGet = InstanceType<typeof SwitchColorV2.SwitchColorGet>;
	export type SwitchColorReport = InstanceType<typeof SwitchColorV2.SwitchColorReport>;
	export type SwitchColorSet = InstanceType<typeof SwitchColorV2.SwitchColorSet>;
	export type SwitchColorStartLevelChange = InstanceType<typeof SwitchColorV2.SwitchColorStartLevelChange>;
	export type SwitchColorStopLevelChange = InstanceType<typeof SwitchColorV2.SwitchColorStopLevelChange>;
}
