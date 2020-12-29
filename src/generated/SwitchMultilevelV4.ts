/**
 * Command Class Switch Multilevel, version 4.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum SwitchMultilevelV4Commands {
	SwitchMultilevelGet = 0x02,
	SwitchMultilevelReport = 0x03,
	SwitchMultilevelSet = 0x01,
	SwitchMultilevelStartLevelChange = 0x04,
	SwitchMultilevelStopLevelChange = 0x05,
	SwitchMultilevelSupportedGet = 0x06,
	SwitchMultilevelSupportedReport = 0x07,
}

export interface SwitchMultilevelV4SwitchMultilevelReportData {
	currentValue: number; // 1 byte unsigned integer
	targetValue: number; // 1 byte unsigned integer
	duration: DurationEnum; // 1 byte enum value
}

export interface SwitchMultilevelV4SwitchMultilevelSetData {
	value: number; // 1 byte unsigned integer
	dimmingDuration: DimmingDurationEnum; // 1 byte enum value
}

export interface SwitchMultilevelV4SwitchMultilevelStartLevelChangeData {
	// TODO param properties1 type bitfield
	startLevel: number; // 1 byte unsigned integer
	dimmingDuration: number; // 1 byte unsigned integer
	stepSize: number; // 1 byte unsigned integer
}

export interface SwitchMultilevelV4SwitchMultilevelSupportedReportData {
	// TODO param properties1 type bitfield
	// TODO param properties2 type bitfield
}

export class SwitchMultilevelV4 extends CommandClassPacket<SwitchMultilevelV4Commands> {
	public static readonly commandClass = CommandClasses.SwitchMultilevel; // 0x26 (38)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SwitchMultilevelV4, commandAndPayload);
	}

	public static readonly SwitchMultilevelGet = class SwitchMultilevelGet extends CommandPacket<void> {
		public static readonly CommandClass = SwitchMultilevelV4;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "SwitchMultilevelGet",
			"help": "Switch Multilevel Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV4)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SwitchMultilevelGet, data);
		}
	};

	public static readonly SwitchMultilevelReport = class SwitchMultilevelReport extends CommandPacket<SwitchMultilevelV4SwitchMultilevelReportData> {
		public static readonly CommandClass = SwitchMultilevelV4;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "SwitchMultilevelReport",
			"help": "Switch Multilevel Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "currentValue",
					"help": "Current Value",
					"length": 1,
					"values": {
						"0": "off/disable",
						"255": "on/enable"
					}
				},
				{
					"type": "integer",
					"name": "targetValue",
					"help": "Target Value",
					"length": 1
				},
				{
					"type": "enum",
					"name": "duration",
					"help": "Duration",
					"length": 1,
					"values": {
						"0": "Already at the Target Value",
						"254": "Unknown duration",
						"255": "Reserved"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV4)?.command === this.command;
		}

		constructor(data: Buffer | SwitchMultilevelV4SwitchMultilevelReportData) {
			super(SwitchMultilevelReport, data);
		}
	};

	public static readonly SwitchMultilevelSet = class SwitchMultilevelSet extends CommandPacket<SwitchMultilevelV4SwitchMultilevelSetData> {
		public static readonly CommandClass = SwitchMultilevelV4;
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
					"type": "enum",
					"name": "dimmingDuration",
					"help": "Dimming Duration",
					"length": 1,
					"values": {
						"0": "Instantly",
						"255": "Default"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV4)?.command === this.command;
		}

		constructor(data: Buffer | SwitchMultilevelV4SwitchMultilevelSetData) {
			super(SwitchMultilevelSet, data);
		}
	};

	public static readonly SwitchMultilevelStartLevelChange = class SwitchMultilevelStartLevelChange extends CommandPacket<SwitchMultilevelV4SwitchMultilevelStartLevelChangeData> {
		public static readonly CommandClass = SwitchMultilevelV4;
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
							"name": "Reserved",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "enum",
							"name": "Inc Dec",
							"mask": 24,
							"shift": 3,
							"values": {
								"0": "Increment",
								"1": "Decrement",
								"2": "Reserved",
								"3": "None"
							}
						},
						{
							"type": "boolean",
							"name": "Ignore Start Level",
							"mask": 32,
							"shift": 5
						},
						{
							"type": "enum",
							"name": "Up Down",
							"mask": 192,
							"shift": 6,
							"values": {
								"0": "Up",
								"1": "Down",
								"2": "Reserved",
								"3": "None"
							}
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
				},
				{
					"type": "integer",
					"name": "stepSize",
					"help": "Step Size",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV4)?.command === this.command;
		}

		constructor(data: Buffer | SwitchMultilevelV4SwitchMultilevelStartLevelChangeData) {
			super(SwitchMultilevelStartLevelChange, data);
		}
	};

	public static readonly SwitchMultilevelStopLevelChange = class SwitchMultilevelStopLevelChange extends CommandPacket<void> {
		public static readonly CommandClass = SwitchMultilevelV4;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "SwitchMultilevelStopLevelChange",
			"help": "Switch Multilevel Stop Level Change",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV4)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SwitchMultilevelStopLevelChange, data);
		}
	};

	public static readonly SwitchMultilevelSupportedGet = class SwitchMultilevelSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = SwitchMultilevelV4;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "SwitchMultilevelSupportedGet",
			"help": "Switch Multilevel Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV4)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SwitchMultilevelSupportedGet, data);
		}
	};

	public static readonly SwitchMultilevelSupportedReport = class SwitchMultilevelSupportedReport extends CommandPacket<SwitchMultilevelV4SwitchMultilevelSupportedReportData> {
		public static readonly CommandClass = SwitchMultilevelV4;
		public static readonly command = 0x07;
		public static readonly definition = {
			"command": 7,
			"name": "SwitchMultilevelSupportedReport",
			"help": "Switch Multilevel Supported Report",
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
							"name": "Primary Switch Type",
							"mask": 31,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved1",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Secondary Switch Type",
							"mask": 31,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved2",
							"mask": 224,
							"shift": 5
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV4)?.command === this.command;
		}

		constructor(data: Buffer | SwitchMultilevelV4SwitchMultilevelSupportedReportData) {
			super(SwitchMultilevelSupportedReport, data);
		}
	};
}

export namespace SwitchMultilevelV4 {
	export type SwitchMultilevelGet = InstanceType<typeof SwitchMultilevelV4.SwitchMultilevelGet>;
	export type SwitchMultilevelReport = InstanceType<typeof SwitchMultilevelV4.SwitchMultilevelReport>;
	export type SwitchMultilevelSet = InstanceType<typeof SwitchMultilevelV4.SwitchMultilevelSet>;
	export type SwitchMultilevelStartLevelChange = InstanceType<typeof SwitchMultilevelV4.SwitchMultilevelStartLevelChange>;
	export type SwitchMultilevelStopLevelChange = InstanceType<typeof SwitchMultilevelV4.SwitchMultilevelStopLevelChange>;
	export type SwitchMultilevelSupportedGet = InstanceType<typeof SwitchMultilevelV4.SwitchMultilevelSupportedGet>;
	export type SwitchMultilevelSupportedReport = InstanceType<typeof SwitchMultilevelV4.SwitchMultilevelSupportedReport>;
}

export enum DurationEnum {
	AlreadyAtTheTargetValue = 0x0,
	UnknownDuration = 0xfe,
	Reserved = 0xff,
}

export enum DimmingDurationEnum {
	Instantly = 0x0,
	Default = 0xff,
}
