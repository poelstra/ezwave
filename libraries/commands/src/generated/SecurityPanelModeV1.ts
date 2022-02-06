/**
 * Command Class Security Panel Mode, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SecurityPanelModeV1, commandAndPayload);
	}
}

export class SecurityPanelModeGet extends CommandPacket<void> {
	public static readonly CommandClass = SecurityPanelModeV1;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "SecurityPanelModeGet",
		"help": "Security Panel Mode Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SecurityPanelModeV1)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(SecurityPanelModeGet, data);
	}
};

export class SecurityPanelModeReport extends CommandPacket<SecurityPanelModeV1SecurityPanelModeReportData> {
	public static readonly CommandClass = SecurityPanelModeV1;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
		"command": 4,
		"name": "SecurityPanelModeReport",
		"help": "Security Panel Mode Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SecurityPanelModeV1)?.command === this.command;
	}

	constructor(data: Buffer | SecurityPanelModeV1SecurityPanelModeReportData) {
		super(SecurityPanelModeReport, data);
	}
};

export class SecurityPanelModeSet extends CommandPacket<SecurityPanelModeV1SecurityPanelModeSetData> {
	public static readonly CommandClass = SecurityPanelModeV1;
	public static readonly command = 0x05; // 5
	public static readonly definition = convertFromJsonCommand({
		"command": 5,
		"name": "SecurityPanelModeSet",
		"help": "Security Panel Mode Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SecurityPanelModeV1)?.command === this.command;
	}

	constructor(data: Buffer | SecurityPanelModeV1SecurityPanelModeSetData) {
		super(SecurityPanelModeSet, data);
	}
};

export class SecurityPanelModeSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass = SecurityPanelModeV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "SecurityPanelModeSupportedGet",
		"help": "Security Panel Mode Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SecurityPanelModeV1)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(SecurityPanelModeSupportedGet, data);
	}
};

export class SecurityPanelModeSupportedReport extends CommandPacket<SecurityPanelModeV1SecurityPanelModeSupportedReportData> {
	public static readonly CommandClass = SecurityPanelModeV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "SecurityPanelModeSupportedReport",
		"help": "Security Panel Mode Supported Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "supportedModeBitMask",
				"help": "Supported Mode Bit Mask",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SecurityPanelModeV1)?.command === this.command;
	}

	constructor(data: Buffer | SecurityPanelModeV1SecurityPanelModeSupportedReportData) {
		super(SecurityPanelModeSupportedReport, data);
	}
};
