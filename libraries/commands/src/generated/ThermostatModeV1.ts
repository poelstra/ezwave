/**
 * Command Class Thermostat Mode, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum ThermostatModeV1Commands {
	ThermostatModeGet = 0x02,
	ThermostatModeReport = 0x03,
	ThermostatModeSet = 0x01,
	ThermostatModeSupportedGet = 0x04,
	ThermostatModeSupportedReport = 0x05,
}

export interface ThermostatModeV1ThermostatModeReportData {
	mode: ModeEnum; // level[4..0]
}

export interface ThermostatModeV1ThermostatModeSetData {
	mode: ModeEnum; // level[4..0]
}

export interface ThermostatModeV1ThermostatModeSupportedReportData {
	bitMask: Set<BitMaskEnum>; // automatic length
}

export enum ModeEnum {
	Off = 0x0,
	Heat = 0x1,
	Cool = 0x2,
	Auto = 0x3,
	AuxiliaryHeat = 0x4,
	Resume = 0x5,
	FanOnly = 0x6,
	Furnace = 0x7,
	DryAir = 0x8,
	MoistAir = 0x9,
	AutoChangeover = 0xa,
}

export enum BitMaskEnum {
	Off = 0x0,
	Heat = 0x1,
	Cool = 0x2,
	Auto = 0x3,
	AuxiliaryEmergencyHeat = 0x4,
	Resume = 0x5,
	FanOnly = 0x6,
	Furnace = 0x7,
	DryAir = 0x8,
	MoistAir = 0x9,
	AutoChangeover = 0xa,
}

export class ThermostatModeV1 extends CommandClassPacket<ThermostatModeV1Commands> {
	public static readonly commandClass: number = CommandClasses.ThermostatMode; // 0x40 (64)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ThermostatModeV1, commandAndPayload);
	}
}

export class ThermostatModeGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof ThermostatModeV1 = ThermostatModeV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "ThermostatModeGet",
		"help": "Thermostat Mode Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatModeV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ThermostatModeGet, data);
	}
};

export class ThermostatModeReport extends CommandPacket<ThermostatModeV1ThermostatModeReportData> {
	public static readonly CommandClass: typeof ThermostatModeV1 = ThermostatModeV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "ThermostatModeReport",
		"help": "Thermostat Mode Report",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "level",
				"help": "Level",
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
						"fieldType": "Enum",
						"name": "mode",
						"mask": 31,
						"shift": 0,
						"values": {
							"0": {
								"name": "Off",
								"help": "Off"
							},
							"1": {
								"name": "Heat",
								"help": "Heat"
							},
							"2": {
								"name": "Cool",
								"help": "Cool"
							},
							"3": {
								"name": "Auto",
								"help": "Auto"
							},
							"4": {
								"name": "AuxiliaryHeat",
								"help": "Auxiliary Heat"
							},
							"5": {
								"name": "Resume",
								"help": "Resume"
							},
							"6": {
								"name": "FanOnly",
								"help": "Fan Only"
							},
							"7": {
								"name": "Furnace",
								"help": "Furnace"
							},
							"8": {
								"name": "DryAir",
								"help": "Dry Air"
							},
							"9": {
								"name": "MoistAir",
								"help": "Moist Air"
							},
							"10": {
								"name": "AutoChangeover",
								"help": "Auto Changeover"
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatModeV1)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatModeV1ThermostatModeReportData) {
		super(ThermostatModeReport, data);
	}
};

export class ThermostatModeSet extends CommandPacket<ThermostatModeV1ThermostatModeSetData> {
	public static readonly CommandClass: typeof ThermostatModeV1 = ThermostatModeV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "ThermostatModeSet",
		"help": "Thermostat Mode Set",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "level",
				"help": "Level",
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
						"fieldType": "Enum",
						"name": "mode",
						"mask": 31,
						"shift": 0,
						"values": {
							"0": {
								"name": "Off",
								"help": "Off"
							},
							"1": {
								"name": "Heat",
								"help": "Heat"
							},
							"2": {
								"name": "Cool",
								"help": "Cool"
							},
							"3": {
								"name": "Auto",
								"help": "Auto"
							},
							"4": {
								"name": "AuxiliaryHeat",
								"help": "Auxiliary Heat"
							},
							"5": {
								"name": "Resume",
								"help": "Resume"
							},
							"6": {
								"name": "FanOnly",
								"help": "Fan Only"
							},
							"7": {
								"name": "Furnace",
								"help": "Furnace"
							},
							"8": {
								"name": "DryAir",
								"help": "Dry Air"
							},
							"9": {
								"name": "MoistAir",
								"help": "Moist Air"
							},
							"10": {
								"name": "AutoChangeover",
								"help": "Auto Changeover"
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatModeV1)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatModeV1ThermostatModeSetData) {
		super(ThermostatModeSet, data);
	}
};

export class ThermostatModeSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof ThermostatModeV1 = ThermostatModeV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "ThermostatModeSupportedGet",
		"help": "Thermostat Mode Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatModeV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ThermostatModeSupportedGet, data);
	}
};

export class ThermostatModeSupportedReport extends CommandPacket<ThermostatModeV1ThermostatModeSupportedReportData> {
	public static readonly CommandClass: typeof ThermostatModeV1 = ThermostatModeV1;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "ThermostatModeSupportedReport",
		"help": "Thermostat Mode Supported Report",
		"status": "Active",
		"params": [
			{
				"type": "Bitmask",
				"name": "bitMask",
				"help": "Bit Mask",
				"length": {
					"lengthType": "Auto"
				},
				"values": {
					"0": {
						"name": "Off",
						"help": "Off"
					},
					"1": {
						"name": "Heat",
						"help": "Heat"
					},
					"2": {
						"name": "Cool",
						"help": "Cool"
					},
					"3": {
						"name": "Auto",
						"help": "Auto"
					},
					"4": {
						"name": "AuxiliaryEmergencyHeat",
						"help": "Auxiliary/Emergency Heat"
					},
					"5": {
						"name": "Resume",
						"help": "Resume"
					},
					"6": {
						"name": "FanOnly",
						"help": "Fan Only"
					},
					"7": {
						"name": "Furnace",
						"help": "Furnace"
					},
					"8": {
						"name": "DryAir",
						"help": "Dry Air"
					},
					"9": {
						"name": "MoistAir",
						"help": "Moist Air"
					},
					"10": {
						"name": "AutoChangeover",
						"help": "Auto Changeover"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatModeV1)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatModeV1ThermostatModeSupportedReportData) {
		super(ThermostatModeSupportedReport, data);
	}
};
