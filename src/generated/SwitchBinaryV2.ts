/**
 * Command Class Switch Binary, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum SwitchBinaryV2Commands {
	SwitchBinaryGet = 0x02,
	SwitchBinaryReport = 0x03,
	SwitchBinarySet = 0x01,
}

export interface SwitchBinaryV2SwitchBinaryReportData {
	currentValue: CurrentValueEnum; // 1 byte enum value
	targetValue: TargetValueEnum; // 1 byte enum value
	duration: DurationEnum; // 1 byte enum value
}

export interface SwitchBinaryV2SwitchBinarySetData {
	targetValue: TargetValueEnum; // 1 byte enum value
	duration: Duration2Enum; // 1 byte enum value
}

export class SwitchBinaryV2 extends CommandClassPacket<SwitchBinaryV2Commands> {
	public static readonly commandClass = CommandClasses.SwitchBinary; // 0x25 (37)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SwitchBinaryV2, commandAndPayload);
	}

	public static readonly SwitchBinaryGet = class SwitchBinaryGet extends CommandPacket<void> {
		public static readonly CommandClass = SwitchBinaryV2;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "SwitchBinaryGet",
			"help": "Switch Binary Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchBinaryV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SwitchBinaryGet, data);
		}
	};

	public static readonly SwitchBinaryReport = class SwitchBinaryReport extends CommandPacket<SwitchBinaryV2SwitchBinaryReportData> {
		public static readonly CommandClass = SwitchBinaryV2;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "SwitchBinaryReport",
			"help": "Switch Binary Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "currentValue",
					"help": "Current Value",
					"length": 1,
					"values": {
						"0": "off/disable",
						"255": "on/enable"
					}
				},
				{
					"type": "enum",
					"name": "targetValue",
					"help": "Target Value",
					"length": 1,
					"values": {
						"0": "off/disable",
						"255": "on/enable"
					}
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
			return packet.tryAs(SwitchBinaryV2)?.command === this.command;
		}

		constructor(data: Buffer | SwitchBinaryV2SwitchBinaryReportData) {
			super(SwitchBinaryReport, data);
		}
	};

	public static readonly SwitchBinarySet = class SwitchBinarySet extends CommandPacket<SwitchBinaryV2SwitchBinarySetData> {
		public static readonly CommandClass = SwitchBinaryV2;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "SwitchBinarySet",
			"help": "Switch Binary Set",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "targetValue",
					"help": "Target Value",
					"length": 1,
					"values": {
						"0": "off/disable",
						"255": "on/enable"
					}
				},
				{
					"type": "enum",
					"name": "duration",
					"help": "Duration",
					"length": 1,
					"values": {
						"0": "Instantly",
						"255": "Default"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchBinaryV2)?.command === this.command;
		}

		constructor(data: Buffer | SwitchBinaryV2SwitchBinarySetData) {
			super(SwitchBinarySet, data);
		}
	};
}

export namespace SwitchBinaryV2 {
	export type SwitchBinaryGet = InstanceType<typeof SwitchBinaryV2.SwitchBinaryGet>;
	export type SwitchBinaryReport = InstanceType<typeof SwitchBinaryV2.SwitchBinaryReport>;
	export type SwitchBinarySet = InstanceType<typeof SwitchBinaryV2.SwitchBinarySet>;
}

export enum CurrentValueEnum {
	OffDisable = 0x0,
	OnEnable = 0xff,
}

export enum TargetValueEnum {
	OffDisable = 0x0,
	OnEnable = 0xff,
}

export enum DurationEnum {
	AlreadyAtTheTargetValue = 0x0,
	UnknownDuration = 0xfe,
	Reserved = 0xff,
}

export enum Duration2Enum {
	Instantly = 0x0,
	Default = 0xff,
}
