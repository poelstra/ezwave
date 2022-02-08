/**
 * Command Class Indicator, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum IndicatorV1Commands {
	IndicatorGet = 0x02,
	IndicatorReport = 0x03,
	IndicatorSet = 0x01,
}

export interface IndicatorV1IndicatorReportData {
	value: number; // 1 byte unsigned integer
}

export interface IndicatorV1IndicatorSetData {
	value: number; // 1 byte unsigned integer
}

export class IndicatorV1 extends CommandClassPacket<IndicatorV1Commands> {
	public static readonly commandClass: number = CommandClasses.Indicator; // 0x87 (135)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(IndicatorV1, commandAndPayload);
	}
}

export class IndicatorGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof IndicatorV1 = IndicatorV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "IndicatorGet",
		"help": "Indicator Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IndicatorV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(IndicatorGet, data);
	}
};

export class IndicatorReport extends CommandPacket<IndicatorV1IndicatorReportData> {
	public static readonly CommandClass: typeof IndicatorV1 = IndicatorV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "IndicatorReport",
		"help": "Indicator Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IndicatorV1)?.command === this.command;
	}

	public constructor(data: Buffer | IndicatorV1IndicatorReportData) {
		super(IndicatorReport, data);
	}
};

export class IndicatorSet extends CommandPacket<IndicatorV1IndicatorSetData> {
	public static readonly CommandClass: typeof IndicatorV1 = IndicatorV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "IndicatorSet",
		"help": "Indicator Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IndicatorV1)?.command === this.command;
	}

	public constructor(data: Buffer | IndicatorV1IndicatorSetData) {
		super(IndicatorSet, data);
	}
};
