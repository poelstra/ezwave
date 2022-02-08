/**
 * Command Class Switch Binary, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	public static readonly commandClass: number = CommandClasses.SwitchBinary; // 0x25 (37)
	public static readonly version: number = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(SwitchBinaryV2, commandAndPayload);
	}
}

export class SwitchBinaryGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof SwitchBinaryV2 = SwitchBinaryV2;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "SwitchBinaryGet",
		"help": "Switch Binary Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchBinaryV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(SwitchBinaryGet, data);
	}
};

export class SwitchBinaryReport extends CommandPacket<SwitchBinaryV2SwitchBinaryReportData> {
	public static readonly CommandClass: typeof SwitchBinaryV2 = SwitchBinaryV2;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchBinaryV2)?.command === this.command;
	}

	public constructor(data: Buffer | SwitchBinaryV2SwitchBinaryReportData) {
		super(SwitchBinaryReport, data);
	}
};

export class SwitchBinarySet extends CommandPacket<SwitchBinaryV2SwitchBinarySetData> {
	public static readonly CommandClass: typeof SwitchBinaryV2 = SwitchBinaryV2;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchBinaryV2)?.command === this.command;
	}

	public constructor(data: Buffer | SwitchBinaryV2SwitchBinarySetData) {
		super(SwitchBinarySet, data);
	}
};
