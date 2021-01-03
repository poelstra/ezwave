/**
 * Command Class Thermostat Mode, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

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
}

export class ThermostatModeV2 extends CommandClassPacket<ThermostatModeV2Commands> {
	public static readonly commandClass = CommandClasses.ThermostatMode; // 0x40 (64)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ThermostatModeV2, commandAndPayload);
	}

	public static readonly ThermostatModeGet = class ThermostatModeGet extends CommandPacket<void> {
		public static readonly CommandClass = ThermostatModeV2;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "ThermostatModeGet",
			"help": "Thermostat Mode Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatModeV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ThermostatModeGet, data);
		}
	};

	public static readonly ThermostatModeReport = class ThermostatModeReport extends CommandPacket<ThermostatModeV2ThermostatModeReportData> {
		public static readonly CommandClass = ThermostatModeV2;
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
							"name": "reserved",
							"mask": 224,
							"shift": 5,
							"reserved": true
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
								}
							}
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatModeV2)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatModeV2ThermostatModeReportData) {
			super(ThermostatModeReport, data);
		}
	};

	public static readonly ThermostatModeSet = class ThermostatModeSet extends CommandPacket<ThermostatModeV2ThermostatModeSetData> {
		public static readonly CommandClass = ThermostatModeV2;
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
							"name": "reserved",
							"mask": 224,
							"shift": 5,
							"reserved": true
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
								}
							}
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatModeV2)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatModeV2ThermostatModeSetData) {
			super(ThermostatModeSet, data);
		}
	};

	public static readonly ThermostatModeSupportedGet = class ThermostatModeSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = ThermostatModeV2;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "ThermostatModeSupportedGet",
			"help": "Thermostat Mode Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatModeV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ThermostatModeSupportedGet, data);
		}
	};

	// TODO This command is not yet fully supported by the decoder/encoder
	public static readonly ThermostatModeSupportedReport = class ThermostatModeSupportedReport extends CommandPacket<ThermostatModeV2ThermostatModeSupportedReportData> {
		public static readonly CommandClass = ThermostatModeV2;
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
			return packet.tryAs(ThermostatModeV2)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatModeV2ThermostatModeSupportedReportData) {
			super(ThermostatModeSupportedReport, data);
		}
	};
}

export namespace ThermostatModeV2 {
	export type ThermostatModeGet = InstanceType<typeof ThermostatModeV2.ThermostatModeGet>;
	export type ThermostatModeReport = InstanceType<typeof ThermostatModeV2.ThermostatModeReport>;
	export type ThermostatModeSet = InstanceType<typeof ThermostatModeV2.ThermostatModeSet>;
	export type ThermostatModeSupportedGet = InstanceType<typeof ThermostatModeV2.ThermostatModeSupportedGet>;
	export type ThermostatModeSupportedReport = InstanceType<typeof ThermostatModeV2.ThermostatModeSupportedReport>;
}
