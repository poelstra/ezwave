/**
 * Command Class Thermostat Mode, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum ThermostatModeV2Commands {
	ThermostatModeGet = 0x02,
	ThermostatModeReport = 0x03,
	ThermostatModeSet = 0x01,
	ThermostatModeSupportedGet = 0x04,
	ThermostatModeSupportedReport = 0x05,
}

export interface ThermostatModeV2ThermostatModeReportData {
	mode: ModeEnum; // level[4..0]
}

export interface ThermostatModeV2ThermostatModeSetData {
	mode: ModeEnum; // level[4..0]
}

export interface ThermostatModeV2ThermostatModeSupportedReportData {
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
	EnergySaveHeat = 0xb,
	EnergySaveCool = 0xc,
	Away = 0xd,
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
	EnergySaveHeat = 0xb,
	EnergySaveCool = 0xc,
	Away = 0xd,
}

export class ThermostatModeV2 extends CommandClassPacket<ThermostatModeV2Commands> {
	public static readonly commandClass = CommandClasses.ThermostatMode; // 0x40 (64)
	public static readonly version = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ThermostatModeV2, commandAndPayload);
	}
}

export class ThermostatModeGet extends CommandPacket<void> {
	public static readonly CommandClass = ThermostatModeV2;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "ThermostatModeGet",
		"help": "Thermostat Mode Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatModeV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ThermostatModeGet, data);
	}
};

export class ThermostatModeReport extends CommandPacket<ThermostatModeV2ThermostatModeReportData> {
	public static readonly CommandClass = ThermostatModeV2;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
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
							},
							"11": {
								"name": "EnergySaveHeat",
								"help": "Energy Save Heat"
							},
							"12": {
								"name": "EnergySaveCool",
								"help": "Energy Save Cool"
							},
							"13": {
								"name": "Away",
								"help": "AWAY"
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatModeV2)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatModeV2ThermostatModeReportData) {
		super(ThermostatModeReport, data);
	}
};

export class ThermostatModeSet extends CommandPacket<ThermostatModeV2ThermostatModeSetData> {
	public static readonly CommandClass = ThermostatModeV2;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
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
							},
							"11": {
								"name": "EnergySaveHeat",
								"help": "Energy Save Heat"
							},
							"12": {
								"name": "EnergySaveCool",
								"help": "Energy Save Cool"
							},
							"13": {
								"name": "Away",
								"help": "AWAY"
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatModeV2)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatModeV2ThermostatModeSetData) {
		super(ThermostatModeSet, data);
	}
};

export class ThermostatModeSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass = ThermostatModeV2;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
		"command": 4,
		"name": "ThermostatModeSupportedGet",
		"help": "Thermostat Mode Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatModeV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ThermostatModeSupportedGet, data);
	}
};

export class ThermostatModeSupportedReport extends CommandPacket<ThermostatModeV2ThermostatModeSupportedReportData> {
	public static readonly CommandClass = ThermostatModeV2;
	public static readonly command = 0x05; // 5
	public static readonly definition = convertFromJsonCommand({
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
					},
					"11": {
						"name": "EnergySaveHeat",
						"help": "Energy Save Heat"
					},
					"12": {
						"name": "EnergySaveCool",
						"help": "Energy Save Cool"
					},
					"13": {
						"name": "Away",
						"help": "AWAY"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatModeV2)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatModeV2ThermostatModeSupportedReportData) {
		super(ThermostatModeSupportedReport, data);
	}
};
