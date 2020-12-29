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
	// TODO param level type bitfield
	// TODO param manufacturerData type blob
}

export interface ThermostatModeV3ThermostatModeSetData {
	// TODO param level type bitfield
	// TODO param manufacturerData type blob
}

export interface ThermostatModeV3ThermostatModeSupportedReportData {
	bitMask: number; // 0 byte unsigned integer
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
							"type": "enum",
							"name": "Mode",
							"mask": 31,
							"shift": 0,
							"values": {
								"0": "Off",
								"1": "Heat",
								"2": "Cool",
								"3": "Auto",
								"4": "Auxiliary Heat",
								"5": "Resume",
								"6": "Fan Only",
								"7": "Furnace",
								"8": "Dry Air",
								"9": "Moist Air",
								"10": "Auto Changeover",
								"11": "Energy Save Heat",
								"12": "Energy Save Cool",
								"13": "AWAY",
								"14": "Reserved",
								"15": "FULL POWER",
								"16": "Reserved0",
								"17": "Reserved1",
								"18": "Reserved2",
								"19": "Reserved3",
								"20": "Reserved4",
								"21": "Reserved5",
								"22": "Reserved6",
								"23": "Reserved7",
								"24": "Reserved8",
								"25": "Reserved9",
								"26": "ReservedA",
								"27": "ReservedB",
								"28": "ReservedC",
								"29": "ReservedD",
								"30": "ReservedE",
								"31": "MANUFACTURER SPECIFC"
							}
						},
						{
							"type": "integer",
							"name": "No of Manufacturer Data fields",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "manufacturerData",
					"help": "Manufacturer Data",
					"length": {
						"name": "Level",
						"mask": 224,
						"shift": 5
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
							"type": "enum",
							"name": "Mode",
							"mask": 31,
							"shift": 0,
							"values": {
								"0": "Off",
								"1": "Heat",
								"2": "Cool",
								"3": "Auto",
								"4": "Auxiliary Heat",
								"5": "Resume",
								"6": "Fan Only",
								"7": "Furnace",
								"8": "Dry Air",
								"9": "Moist Air",
								"10": "Auto Changeover",
								"11": "Energy Save Heat",
								"12": "Energy Save Cool",
								"13": "AWAY",
								"14": "Reserved",
								"15": "FULL POWER",
								"16": "Reserved0",
								"17": "Reserved1",
								"18": "Reserved2",
								"19": "Reserved3",
								"20": "Reserved4",
								"21": "Reserved5",
								"22": "Reserved6",
								"23": "Reserved7",
								"24": "Reserved8",
								"25": "Reserved9",
								"26": "ReservedA",
								"27": "ReservedB",
								"28": "ReservedC",
								"29": "ReservedD",
								"30": "ReservedE",
								"31": "MANUFACTURER SPECIFC"
							}
						},
						{
							"type": "integer",
							"name": "No of Manufacturer Data fields",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "manufacturerData",
					"help": "Manufacturer Data",
					"length": {
						"name": "Level",
						"mask": 224,
						"shift": 5
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
