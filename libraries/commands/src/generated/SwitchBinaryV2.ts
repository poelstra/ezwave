/**
 * Command Class Switch Binary, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandClasses, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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

export class SwitchBinaryV2 extends CommandClassPacket<SwitchBinaryV2Commands> {
	public static readonly commandClass = CommandClasses.SwitchBinary; // 0x25 (37)
	public static readonly version = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SwitchBinaryV2, commandAndPayload);
	}

	public static readonly SwitchBinaryGet = class SwitchBinaryGet extends CommandPacket<void> {
		public static readonly CommandClass = SwitchBinaryV2;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "SwitchBinaryGet",
			"help": "Switch Binary Get",
			"status": "Active",
			"params": []
		} as JsonCommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "SwitchBinaryReport",
			"help": "Switch Binary Report",
			"status": "Active",
			"params": [
				{
					"type": "Enum",
					"name": "currentValue",
					"help": "Current Value",
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
				},
				{
					"type": "Enum",
					"name": "targetValue",
					"help": "Target Value",
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
				},
				{
					"type": "Enum",
					"name": "duration",
					"help": "Duration",
					"length": 1,
					"values": {
						"0": {
							"name": "AlreadyAtTheTargetValue",
							"help": "Already at the Target Value"
						},
						"254": {
							"name": "UnknownDuration",
							"help": "Unknown duration"
						},
						"255": {
							"name": "Reserved",
							"help": "Reserved"
						}
					}
				}
			]
		} as JsonCommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "SwitchBinarySet",
			"help": "Switch Binary Set",
			"status": "Active",
			"params": [
				{
					"type": "Enum",
					"name": "targetValue",
					"help": "Target Value",
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
				},
				{
					"type": "Enum",
					"name": "duration",
					"help": "Duration",
					"length": 1,
					"values": {
						"0": {
							"name": "Instantly",
							"help": "Instantly"
						},
						"255": {
							"name": "Default",
							"help": "Default"
						}
					}
				}
			]
		} as JsonCommandDefinition);

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
