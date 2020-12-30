/**
 * Command Class Security Panel Mode, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum SecurityPanelModeV1Commands {
	SecurityPanelModeGet = 0x03,
	SecurityPanelModeReport = 0x04,
	SecurityPanelModeSet = 0x05,
	SecurityPanelModeSupportedGet = 0x01,
	SecurityPanelModeSupportedReport = 0x02,
}

export interface SecurityPanelModeV1SecurityPanelModeReportData {
	mode: number; // 1 byte unsigned integer
}

export interface SecurityPanelModeV1SecurityPanelModeSetData {
	mode: number; // 1 byte unsigned integer
}

export interface SecurityPanelModeV1SecurityPanelModeSupportedReportData {
	supportedModeBitMask: number; // 2 byte unsigned integer
}

export class SecurityPanelModeV1 extends CommandClassPacket<SecurityPanelModeV1Commands> {
	public static readonly commandClass = CommandClasses.SecurityPanelMode; // 0x24 (36)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SecurityPanelModeV1, commandAndPayload);
	}

	public static readonly SecurityPanelModeGet = class SecurityPanelModeGet extends CommandPacket<void> {
		public static readonly CommandClass = SecurityPanelModeV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "SecurityPanelModeGet",
			"help": "Security Panel Mode Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityPanelModeV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SecurityPanelModeGet, data);
		}
	};

	public static readonly SecurityPanelModeReport = class SecurityPanelModeReport extends CommandPacket<SecurityPanelModeV1SecurityPanelModeReportData> {
		public static readonly CommandClass = SecurityPanelModeV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "SecurityPanelModeReport",
			"help": "Security Panel Mode Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "mode",
					"help": "MODE",
					"length": 1,
					"values": {
						"1": {
							"name": "ArmHome",
							"help": "Arm Home"
						},
						"2": {
							"name": "ArmAwayNoDelay",
							"help": "Arm Away, No Delay"
						},
						"3": {
							"name": "ArmAwayDelayed",
							"help": "Arm Away, Delayed"
						},
						"4": {
							"name": "Disarm",
							"help": "Disarm"
						},
						"5": {
							"name": "AlarmTrigger",
							"help": "Alarm Trigger"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityPanelModeV1)?.command === this.command;
		}

		constructor(data: Buffer | SecurityPanelModeV1SecurityPanelModeReportData) {
			super(SecurityPanelModeReport, data);
		}
	};

	public static readonly SecurityPanelModeSet = class SecurityPanelModeSet extends CommandPacket<SecurityPanelModeV1SecurityPanelModeSetData> {
		public static readonly CommandClass = SecurityPanelModeV1;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "SecurityPanelModeSet",
			"help": "Security Panel Mode Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "mode",
					"help": "MODE",
					"length": 1,
					"values": {
						"1": {
							"name": "ArmHome",
							"help": "Arm Home"
						},
						"2": {
							"name": "ArmAwayNoDelay",
							"help": "Arm Away, No Delay"
						},
						"3": {
							"name": "ArmAwayDelayed",
							"help": "Arm Away, Delayed"
						},
						"4": {
							"name": "Disarm",
							"help": "Disarm"
						},
						"5": {
							"name": "AlarmTrigger",
							"help": "Alarm Trigger"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityPanelModeV1)?.command === this.command;
		}

		constructor(data: Buffer | SecurityPanelModeV1SecurityPanelModeSetData) {
			super(SecurityPanelModeSet, data);
		}
	};

	public static readonly SecurityPanelModeSupportedGet = class SecurityPanelModeSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = SecurityPanelModeV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "SecurityPanelModeSupportedGet",
			"help": "Security Panel Mode Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityPanelModeV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SecurityPanelModeSupportedGet, data);
		}
	};

	public static readonly SecurityPanelModeSupportedReport = class SecurityPanelModeSupportedReport extends CommandPacket<SecurityPanelModeV1SecurityPanelModeSupportedReportData> {
		public static readonly CommandClass = SecurityPanelModeV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "SecurityPanelModeSupportedReport",
			"help": "Security Panel Mode Supported Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "supportedModeBitMask",
					"help": "Supported Mode Bit Mask",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityPanelModeV1)?.command === this.command;
		}

		constructor(data: Buffer | SecurityPanelModeV1SecurityPanelModeSupportedReportData) {
			super(SecurityPanelModeSupportedReport, data);
		}
	};
}

export namespace SecurityPanelModeV1 {
	export type SecurityPanelModeGet = InstanceType<typeof SecurityPanelModeV1.SecurityPanelModeGet>;
	export type SecurityPanelModeReport = InstanceType<typeof SecurityPanelModeV1.SecurityPanelModeReport>;
	export type SecurityPanelModeSet = InstanceType<typeof SecurityPanelModeV1.SecurityPanelModeSet>;
	export type SecurityPanelModeSupportedGet = InstanceType<typeof SecurityPanelModeV1.SecurityPanelModeSupportedGet>;
	export type SecurityPanelModeSupportedReport = InstanceType<typeof SecurityPanelModeV1.SecurityPanelModeSupportedReport>;
}
