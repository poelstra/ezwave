/**
 * Command Class Switch Color, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum SwitchColorV3Commands {
	SwitchColorSupportedGet = 0x01,
	SwitchColorSupportedReport = 0x02,
	SwitchColorGet = 0x03,
	SwitchColorReport = 0x04,
	SwitchColorSet = 0x05,
	SwitchColorStartLevelChange = 0x06,
	SwitchColorStopLevelChange = 0x07,
}

export interface SwitchColorV3SwitchColorSupportedReportData {
	colorComponentMask: number; // 2 byte unsigned integer
}

export interface SwitchColorV3SwitchColorGetData {
	colorComponentId: number; // 1 byte unsigned integer
}

export interface SwitchColorV3SwitchColorReportData {
	colorComponentId: number; // 1 byte unsigned integer
	currentValue: number; // 1 byte unsigned integer
	targetValue: number; // 1 byte unsigned integer
	duration: DurationEnum; // 1 byte enum value
}

export interface SwitchColorV3SwitchColorSetData {
	vg1: Array<{ // variable length
		colorComponentId: number; // 1 byte unsigned integer
		value: number; // 1 byte unsigned integer
	}>;
	duration: Duration2Enum; // 1 byte enum value
}

export interface SwitchColorV3SwitchColorStartLevelChangeData {
	upDown: boolean; // properties1[6]
	ignoreStartState: boolean; // properties1[5]
	colorComponentId: number; // 1 byte unsigned integer
	startLevel: number; // 1 byte unsigned integer
	duration: Duration2Enum; // 1 byte enum value
}

export interface SwitchColorV3SwitchColorStopLevelChangeData {
	colorComponentId: number; // 1 byte unsigned integer
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

export class SwitchColorV3 extends CommandClassPacket<SwitchColorV3Commands> {
	public static readonly commandClass: number = CommandClasses.SwitchColor; // 0x33 (51)
	public static readonly version: number = 3;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(SwitchColorV3, commandAndPayload);
	}
}

export class SwitchColorSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof SwitchColorV3 = SwitchColorV3;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "SwitchColorSupportedGet",
		"help": "Color Switch Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchColorV3)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(SwitchColorSupportedGet, data);
	}
};

export class SwitchColorSupportedReport extends CommandPacket<SwitchColorV3SwitchColorSupportedReportData> {
	public static readonly CommandClass: typeof SwitchColorV3 = SwitchColorV3;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "SwitchColorSupportedReport",
		"help": "Color Switch Supported Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "colorComponentMask",
				"help": "Color Component mask",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchColorV3)?.command === this.command;
	}

	public constructor(data: Buffer | SwitchColorV3SwitchColorSupportedReportData) {
		super(SwitchColorSupportedReport, data);
	}
};

export class SwitchColorGet extends CommandPacket<SwitchColorV3SwitchColorGetData> {
	public static readonly CommandClass: typeof SwitchColorV3 = SwitchColorV3;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "SwitchColorGet",
		"help": "Color Switch Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "colorComponentId",
				"help": "Color Component ID",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchColorV3)?.command === this.command;
	}

	public constructor(data: Buffer | SwitchColorV3SwitchColorGetData) {
		super(SwitchColorGet, data);
	}
};

export class SwitchColorReport extends CommandPacket<SwitchColorV3SwitchColorReportData> {
	public static readonly CommandClass: typeof SwitchColorV3 = SwitchColorV3;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "SwitchColorReport",
		"help": "Color Switch Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "colorComponentId",
				"help": "Color Component ID",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "currentValue",
				"help": "Current Value",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "targetValue",
				"help": "Target Value",
				"length": 1
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
		return packet.tryAs(SwitchColorV3)?.command === this.command;
	}

	public constructor(data: Buffer | SwitchColorV3SwitchColorReportData) {
		super(SwitchColorReport, data);
	}
};

export class SwitchColorSet extends CommandPacket<SwitchColorV3SwitchColorSetData> {
	public static readonly CommandClass: typeof SwitchColorV3 = SwitchColorV3;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "SwitchColorSet",
		"help": "Color Switch Set",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 224,
						"shift": 5,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "colorComponentCount",
						"mask": 31,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"vg1"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Group",
				"name": "vg1",
				"help": "vg1",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.colorComponentCount"
					}
				},
				"params": [
					{
						"type": "Integer",
						"name": "colorComponentId",
						"help": "Color Component ID",
						"length": 1
					},
					{
						"type": "Integer",
						"name": "value",
						"help": "Value",
						"length": 1
					}
				]
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
		return packet.tryAs(SwitchColorV3)?.command === this.command;
	}

	public constructor(data: Buffer | SwitchColorV3SwitchColorSetData) {
		super(SwitchColorSet, data);
	}
};

export class SwitchColorStartLevelChange extends CommandPacket<SwitchColorV3SwitchColorStartLevelChangeData> {
	public static readonly CommandClass: typeof SwitchColorV3 = SwitchColorV3;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 6,
		"name": "SwitchColorStartLevelChange",
		"help": "Color Switch Start Level Change",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "res2",
						"mask": 128,
						"shift": 7,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "upDown",
						"mask": 64,
						"shift": 6
					},
					{
						"fieldType": "Boolean",
						"name": "ignoreStartState",
						"mask": 32,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "res1",
						"mask": 31,
						"shift": 0,
						"reserved": true
					}
				]
			},
			{
				"type": "Integer",
				"name": "colorComponentId",
				"help": "Color Component ID",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "startLevel",
				"help": "Start Level",
				"length": 1
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
		return packet.tryAs(SwitchColorV3)?.command === this.command;
	}

	public constructor(data: Buffer | SwitchColorV3SwitchColorStartLevelChangeData) {
		super(SwitchColorStartLevelChange, data);
	}
};

export class SwitchColorStopLevelChange extends CommandPacket<SwitchColorV3SwitchColorStopLevelChangeData> {
	public static readonly CommandClass: typeof SwitchColorV3 = SwitchColorV3;
	public static readonly command: number = 0x07; // 7
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 7,
		"name": "SwitchColorStopLevelChange",
		"help": "Color Switch Stop Level Change",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "colorComponentId",
				"help": "Color Component ID",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchColorV3)?.command === this.command;
	}

	public constructor(data: Buffer | SwitchColorV3SwitchColorStopLevelChangeData) {
		super(SwitchColorStopLevelChange, data);
	}
};
