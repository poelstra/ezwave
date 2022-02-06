/**
 * Command Class Switch Toggle Binary, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum SwitchToggleBinaryV1Commands {
	SwitchToggleBinarySet = 0x01,
	SwitchToggleBinaryGet = 0x02,
	SwitchToggleBinaryReport = 0x03,
}

export interface SwitchToggleBinaryV1SwitchToggleBinaryReportData {
	value: number; // 1 byte unsigned integer
}

// Deprecated
export class SwitchToggleBinaryV1 extends CommandClassPacket<SwitchToggleBinaryV1Commands> {
	public static readonly commandClass = CommandClasses.SwitchToggleBinary; // 0x28 (40)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SwitchToggleBinaryV1, commandAndPayload);
	}
}

export class SwitchToggleBinarySet extends CommandPacket<void> {
	public static readonly CommandClass = SwitchToggleBinaryV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "SwitchToggleBinarySet",
		"help": "Switch Toggle Binary Set",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchToggleBinaryV1)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(SwitchToggleBinarySet, data);
	}
};

export class SwitchToggleBinaryGet extends CommandPacket<void> {
	public static readonly CommandClass = SwitchToggleBinaryV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "SwitchToggleBinaryGet",
		"help": "Switch Toggle Binary Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchToggleBinaryV1)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(SwitchToggleBinaryGet, data);
	}
};

export class SwitchToggleBinaryReport extends CommandPacket<SwitchToggleBinaryV1SwitchToggleBinaryReportData> {
	public static readonly CommandClass = SwitchToggleBinaryV1;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "SwitchToggleBinaryReport",
		"help": "Switch Toggle Binary Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "value",
				"help": "Value",
				"length": 1,
				"values": {
					"0": {
						"name": "Off",
						"help": "off"
					},
					"255": {
						"name": "On",
						"help": "on"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchToggleBinaryV1)?.command === this.command;
	}

	constructor(data: Buffer | SwitchToggleBinaryV1SwitchToggleBinaryReportData) {
		super(SwitchToggleBinaryReport, data);
	}
};
