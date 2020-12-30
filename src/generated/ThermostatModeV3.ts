/**
 * Command Class Thermostat Mode, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ThermostatModeV3Commands {
	ThermostatModeGet = 0x02,
	ThermostatModeReport = 0x03,
	ThermostatModeSet = 0x01,
	ThermostatModeSupportedGet = 0x04,
	ThermostatModeSupportedReport = 0x05,
}

export interface ThermostatModeV3ThermostatModeReportData {
	noOfManufacturerDataFields: number; // level[7..5]
	mode: ModeEnum; // level[4..0]
	// TODO param manufacturerData type blob
}

export interface ThermostatModeV3ThermostatModeSetData {
	noOfManufacturerDataFields: number; // level[7..5]
	mode: ModeEnum; // level[4..0]
	// TODO param manufacturerData type blob
}

export interface ThermostatModeV3ThermostatModeSupportedReportData {
	// TODO param bitMask type bitmask or marker
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
	Reserved = 0xe,
	FullPower = 0xf,
	Reserved0 = 0x10,
	Reserved1 = 0x11,
	Reserved2 = 0x12,
	Reserved3 = 0x13,
	Reserved4 = 0x14,
	Reserved5 = 0x15,
	Reserved6 = 0x16,
	Reserved7 = 0x17,
	Reserved8 = 0x18,
	Reserved9 = 0x19,
	ReservedA = 0x1a,
	ReservedB = 0x1b,
	ReservedC = 0x1c,
	ReservedD = 0x1d,
	ReservedE = 0x1e,
	ManufacturerSpecifc = 0x1f,
}

export class ThermostatModeV3 extends CommandClassPacket<ThermostatModeV3Commands> {
	public static readonly commandClass = CommandClasses.ThermostatMode; // 0x40 (64)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ThermostatModeV3, commandAndPayload);
	}

	public static readonly ThermostatModeGet = class ThermostatModeGet extends CommandPacket<void> {
		public static readonly CommandClass = ThermostatModeV3;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "ThermostatModeGet",
			"help": "Thermostat Mode Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatModeV3)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ThermostatModeGet, data);
		}
	};

	public static readonly ThermostatModeReport = class ThermostatModeReport extends CommandPacket<ThermostatModeV3ThermostatModeReportData> {
		public static readonly CommandClass = ThermostatModeV3;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "ThermostatModeReport",
			"help": "Thermostat Mode Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "noOfManufacturerDataFields",
							"mask": 224,
							"shift": 5
						},
						{
							"type": "enum",
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
								},
								"14": {
									"name": "Reserved",
									"help": "Reserved"
								},
								"15": {
									"name": "FullPower",
									"help": "FULL POWER"
								},
								"16": {
									"name": "Reserved0",
									"help": "Reserved0"
								},
								"17": {
									"name": "Reserved1",
									"help": "Reserved1"
								},
								"18": {
									"name": "Reserved2",
									"help": "Reserved2"
								},
								"19": {
									"name": "Reserved3",
									"help": "Reserved3"
								},
								"20": {
									"name": "Reserved4",
									"help": "Reserved4"
								},
								"21": {
									"name": "Reserved5",
									"help": "Reserved5"
								},
								"22": {
									"name": "Reserved6",
									"help": "Reserved6"
								},
								"23": {
									"name": "Reserved7",
									"help": "Reserved7"
								},
								"24": {
									"name": "Reserved8",
									"help": "Reserved8"
								},
								"25": {
									"name": "Reserved9",
									"help": "Reserved9"
								},
								"26": {
									"name": "ReservedA",
									"help": "ReservedA"
								},
								"27": {
									"name": "ReservedB",
									"help": "ReservedB"
								},
								"28": {
									"name": "ReservedC",
									"help": "ReservedC"
								},
								"29": {
									"name": "ReservedD",
									"help": "ReservedD"
								},
								"30": {
									"name": "ReservedE",
									"help": "ReservedE"
								},
								"31": {
									"name": "ManufacturerSpecifc",
									"help": "MANUFACTURER SPECIFC"
								}
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "manufacturerData",
					"help": "Manufacturer Data",
					"length": {
						"name": "Level",
						"bitfield": {
							"mask": 224,
							"shift": 5,
							"name": "noOfManufacturerDataFields"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatModeV3)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatModeV3ThermostatModeReportData) {
			super(ThermostatModeReport, data);
		}
	};

	public static readonly ThermostatModeSet = class ThermostatModeSet extends CommandPacket<ThermostatModeV3ThermostatModeSetData> {
		public static readonly CommandClass = ThermostatModeV3;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "ThermostatModeSet",
			"help": "Thermostat Mode Set",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "noOfManufacturerDataFields",
							"mask": 224,
							"shift": 5
						},
						{
							"type": "enum",
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
								},
								"14": {
									"name": "Reserved",
									"help": "Reserved"
								},
								"15": {
									"name": "FullPower",
									"help": "FULL POWER"
								},
								"16": {
									"name": "Reserved0",
									"help": "Reserved0"
								},
								"17": {
									"name": "Reserved1",
									"help": "Reserved1"
								},
								"18": {
									"name": "Reserved2",
									"help": "Reserved2"
								},
								"19": {
									"name": "Reserved3",
									"help": "Reserved3"
								},
								"20": {
									"name": "Reserved4",
									"help": "Reserved4"
								},
								"21": {
									"name": "Reserved5",
									"help": "Reserved5"
								},
								"22": {
									"name": "Reserved6",
									"help": "Reserved6"
								},
								"23": {
									"name": "Reserved7",
									"help": "Reserved7"
								},
								"24": {
									"name": "Reserved8",
									"help": "Reserved8"
								},
								"25": {
									"name": "Reserved9",
									"help": "Reserved9"
								},
								"26": {
									"name": "ReservedA",
									"help": "ReservedA"
								},
								"27": {
									"name": "ReservedB",
									"help": "ReservedB"
								},
								"28": {
									"name": "ReservedC",
									"help": "ReservedC"
								},
								"29": {
									"name": "ReservedD",
									"help": "ReservedD"
								},
								"30": {
									"name": "ReservedE",
									"help": "ReservedE"
								},
								"31": {
									"name": "ManufacturerSpecifc",
									"help": "MANUFACTURER SPECIFC"
								}
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "manufacturerData",
					"help": "Manufacturer Data",
					"length": {
						"name": "Level",
						"bitfield": {
							"mask": 224,
							"shift": 5,
							"name": "noOfManufacturerDataFields"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatModeV3)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatModeV3ThermostatModeSetData) {
			super(ThermostatModeSet, data);
		}
	};

	public static readonly ThermostatModeSupportedGet = class ThermostatModeSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = ThermostatModeV3;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "ThermostatModeSupportedGet",
			"help": "Thermostat Mode Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatModeV3)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ThermostatModeSupportedGet, data);
		}
	};

	public static readonly ThermostatModeSupportedReport = class ThermostatModeSupportedReport extends CommandPacket<ThermostatModeV3ThermostatModeSupportedReportData> {
		public static readonly CommandClass = ThermostatModeV3;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "ThermostatModeSupportedReport",
			"help": "Thermostat Mode Supported Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "bitMask",
					"help": "Bit Mask",
					"length": 0
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatModeV3)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatModeV3ThermostatModeSupportedReportData) {
			super(ThermostatModeSupportedReport, data);
		}
	};
}

export namespace ThermostatModeV3 {
	export type ThermostatModeGet = InstanceType<typeof ThermostatModeV3.ThermostatModeGet>;
	export type ThermostatModeReport = InstanceType<typeof ThermostatModeV3.ThermostatModeReport>;
	export type ThermostatModeSet = InstanceType<typeof ThermostatModeV3.ThermostatModeSet>;
	export type ThermostatModeSupportedGet = InstanceType<typeof ThermostatModeV3.ThermostatModeSupportedGet>;
	export type ThermostatModeSupportedReport = InstanceType<typeof ThermostatModeV3.ThermostatModeSupportedReport>;
}
