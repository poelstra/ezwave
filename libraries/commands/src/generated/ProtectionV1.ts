/**
 * Command Class Protection, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum ProtectionV1Commands {
	ProtectionGet = 0x02,
	ProtectionReport = 0x03,
	ProtectionSet = 0x01,
}

export interface ProtectionV1ProtectionReportData {
	protectionState: ProtectionStateEnum; // 1 byte enum value
}

export interface ProtectionV1ProtectionSetData {
	protectionState: ProtectionStateEnum; // 1 byte enum value
}

export enum ProtectionStateEnum {
	Unprotected = 0x0,
	ProtectionBySequence = 0x1,
	NoOperationPossible = 0x2,
}

export class ProtectionV1 extends CommandClassPacket<ProtectionV1Commands> {
	public static readonly commandClass = CommandClasses.Protection; // 0x75 (117)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ProtectionV1, commandAndPayload);
	}
}

export class ProtectionGet extends CommandPacket<void> {
	public static readonly CommandClass = ProtectionV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "ProtectionGet",
		"help": "Protection Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ProtectionV1)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(ProtectionGet, data);
	}
};

export class ProtectionReport extends CommandPacket<ProtectionV1ProtectionReportData> {
	public static readonly CommandClass = ProtectionV1;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "ProtectionReport",
		"help": "Protection Report",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "protectionState",
				"help": "Protection State",
				"length": 1,
				"values": {
					"0": {
						"name": "Unprotected",
						"help": "Unprotected"
					},
					"1": {
						"name": "ProtectionBySequence",
						"help": "Protection by sequence"
					},
					"2": {
						"name": "NoOperationPossible",
						"help": "No operation possible"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ProtectionV1)?.command === this.command;
	}

	constructor(data: Buffer | ProtectionV1ProtectionReportData) {
		super(ProtectionReport, data);
	}
};

export class ProtectionSet extends CommandPacket<ProtectionV1ProtectionSetData> {
	public static readonly CommandClass = ProtectionV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "ProtectionSet",
		"help": "Protection Set",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "protectionState",
				"help": "Protection State",
				"length": 1,
				"values": {
					"0": {
						"name": "Unprotected",
						"help": "Unprotected"
					},
					"1": {
						"name": "ProtectionBySequence",
						"help": "Protection by sequence"
					},
					"2": {
						"name": "NoOperationPossible",
						"help": "No operation possible"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ProtectionV1)?.command === this.command;
	}

	constructor(data: Buffer | ProtectionV1ProtectionSetData) {
		super(ProtectionSet, data);
	}
};
