/**
 * Command Class Switch All, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum SwitchAllV1Commands {
	SwitchAllGet = 0x02,
	SwitchAllOff = 0x05,
	SwitchAllOn = 0x04,
	SwitchAllReport = 0x03,
	SwitchAllSet = 0x01,
}

export interface SwitchAllV1SwitchAllReportData {
	mode: ModeEnum; // 1 byte enum value
}

export interface SwitchAllV1SwitchAllSetData {
	mode: ModeEnum; // 1 byte enum value
}

export enum ModeEnum {
	ExcludedFromTheAllOnAllOffFunctionality = 0x0,
	ExcludedFromTheAllOnFunctionalityButNotAllOff = 0x1,
	ExcludedFromTheAllOffFunctionalityButNotAllOn = 0x2,
	IncludedInTheAllOnAllOffFunctionality = 0xff,
}

export class SwitchAllV1 extends CommandClassPacket<SwitchAllV1Commands> {
	public static readonly commandClass: number = CommandClasses.SwitchAll; // 0x27 (39)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(SwitchAllV1, commandAndPayload);
	}
}

export class SwitchAllGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof SwitchAllV1 = SwitchAllV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "SwitchAllGet",
		"help": "Switch All Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchAllV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(SwitchAllGet, data);
	}
};

export class SwitchAllOff extends CommandPacket<void> {
	public static readonly CommandClass: typeof SwitchAllV1 = SwitchAllV1;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "SwitchAllOff",
		"help": "Switch All Off",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchAllV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(SwitchAllOff, data);
	}
};

export class SwitchAllOn extends CommandPacket<void> {
	public static readonly CommandClass: typeof SwitchAllV1 = SwitchAllV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "SwitchAllOn",
		"help": "Switch All On",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchAllV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(SwitchAllOn, data);
	}
};

export class SwitchAllReport extends CommandPacket<SwitchAllV1SwitchAllReportData> {
	public static readonly CommandClass: typeof SwitchAllV1 = SwitchAllV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "SwitchAllReport",
		"help": "Switch All Report",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "mode",
				"help": "Mode",
				"length": 1,
				"values": {
					"0": {
						"name": "ExcludedFromTheAllOnAllOffFunctionality",
						"help": "excluded from the all on/all off functionality"
					},
					"1": {
						"name": "ExcludedFromTheAllOnFunctionalityButNotAllOff",
						"help": "excluded from the all on functionality but not all off"
					},
					"2": {
						"name": "ExcludedFromTheAllOffFunctionalityButNotAllOn",
						"help": "excluded from the all off functionality but not all on"
					},
					"255": {
						"name": "IncludedInTheAllOnAllOffFunctionality",
						"help": "included in the all on/all off functionality"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchAllV1)?.command === this.command;
	}

	public constructor(data: Buffer | SwitchAllV1SwitchAllReportData) {
		super(SwitchAllReport, data);
	}
};

export class SwitchAllSet extends CommandPacket<SwitchAllV1SwitchAllSetData> {
	public static readonly CommandClass: typeof SwitchAllV1 = SwitchAllV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "SwitchAllSet",
		"help": "Switch All Set",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "mode",
				"help": "Mode",
				"length": 1,
				"values": {
					"0": {
						"name": "ExcludedFromTheAllOnAllOffFunctionality",
						"help": "excluded from the all on/all off functionality"
					},
					"1": {
						"name": "ExcludedFromTheAllOnFunctionalityButNotAllOff",
						"help": "excluded from the all on functionality but not all off"
					},
					"2": {
						"name": "ExcludedFromTheAllOffFunctionalityButNotAllOn",
						"help": "excluded from the all off functionality but not all on"
					},
					"255": {
						"name": "IncludedInTheAllOnAllOffFunctionality",
						"help": "included in the all on/all off functionality"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchAllV1)?.command === this.command;
	}

	public constructor(data: Buffer | SwitchAllV1SwitchAllSetData) {
		super(SwitchAllSet, data);
	}
};
