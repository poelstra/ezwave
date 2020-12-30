/**
 * Command Class Switch All, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

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
	public static readonly commandClass = CommandClasses.SwitchAll; // 0x27 (39)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SwitchAllV1, commandAndPayload);
	}

	public static readonly SwitchAllGet = class SwitchAllGet extends CommandPacket<void> {
		public static readonly CommandClass = SwitchAllV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "SwitchAllGet",
			"help": "Switch All Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchAllV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SwitchAllGet, data);
		}
	};

	public static readonly SwitchAllOff = class SwitchAllOff extends CommandPacket<void> {
		public static readonly CommandClass = SwitchAllV1;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "SwitchAllOff",
			"help": "Switch All Off",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchAllV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SwitchAllOff, data);
		}
	};

	public static readonly SwitchAllOn = class SwitchAllOn extends CommandPacket<void> {
		public static readonly CommandClass = SwitchAllV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "SwitchAllOn",
			"help": "Switch All On",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchAllV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SwitchAllOn, data);
		}
	};

	public static readonly SwitchAllReport = class SwitchAllReport extends CommandPacket<SwitchAllV1SwitchAllReportData> {
		public static readonly CommandClass = SwitchAllV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "SwitchAllReport",
			"help": "Switch All Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
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
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchAllV1)?.command === this.command;
		}

		constructor(data: Buffer | SwitchAllV1SwitchAllReportData) {
			super(SwitchAllReport, data);
		}
	};

	public static readonly SwitchAllSet = class SwitchAllSet extends CommandPacket<SwitchAllV1SwitchAllSetData> {
		public static readonly CommandClass = SwitchAllV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "SwitchAllSet",
			"help": "Switch All Set",
			"status": "active",
			"params": [
				{
					"type": "enum",
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
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchAllV1)?.command === this.command;
		}

		constructor(data: Buffer | SwitchAllV1SwitchAllSetData) {
			super(SwitchAllSet, data);
		}
	};
}

export namespace SwitchAllV1 {
	export type SwitchAllGet = InstanceType<typeof SwitchAllV1.SwitchAllGet>;
	export type SwitchAllOff = InstanceType<typeof SwitchAllV1.SwitchAllOff>;
	export type SwitchAllOn = InstanceType<typeof SwitchAllV1.SwitchAllOn>;
	export type SwitchAllReport = InstanceType<typeof SwitchAllV1.SwitchAllReport>;
	export type SwitchAllSet = InstanceType<typeof SwitchAllV1.SwitchAllSet>;
}
