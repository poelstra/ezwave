/**
 * Command Class Switch Binary, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum SwitchBinaryV1Commands {
	SwitchBinaryGet = 0x02,
	SwitchBinaryReport = 0x03,
	SwitchBinarySet = 0x01,
}

export interface SwitchBinaryV1SwitchBinaryReportData {
	value: number; // 1 byte unsigned integer
}

export interface SwitchBinaryV1SwitchBinarySetData {
	switchValue: number; // 1 byte unsigned integer
}

export class SwitchBinaryV1 extends CommandClassPacket<SwitchBinaryV1Commands> {
	public static readonly commandClass = CommandClasses.SwitchBinary; // 0x25 (37)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(SwitchBinaryV1, commandAndPayload);
	}
}

export class SwitchBinaryGet extends CommandPacket<void> {
	public static readonly CommandClass = SwitchBinaryV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "SwitchBinaryGet",
		"help": "Switch Binary Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchBinaryV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(SwitchBinaryGet, data);
	}
};

export class SwitchBinaryReport extends CommandPacket<SwitchBinaryV1SwitchBinaryReportData> {
	public static readonly CommandClass = SwitchBinaryV1;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "SwitchBinaryReport",
		"help": "Switch Binary Report",
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

	static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchBinaryV1)?.command === this.command;
	}

	public constructor(data: Buffer | SwitchBinaryV1SwitchBinaryReportData) {
		super(SwitchBinaryReport, data);
	}
};

export class SwitchBinarySet extends CommandPacket<SwitchBinaryV1SwitchBinarySetData> {
	public static readonly CommandClass = SwitchBinaryV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "SwitchBinarySet",
		"help": "Switch Binary Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "switchValue",
				"help": "Switch Value",
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

	static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchBinaryV1)?.command === this.command;
	}

	public constructor(data: Buffer | SwitchBinaryV1SwitchBinarySetData) {
		super(SwitchBinarySet, data);
	}
};
