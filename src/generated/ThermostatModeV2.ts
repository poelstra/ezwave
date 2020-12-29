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
	// TODO param level type bitfield
}

export interface ThermostatModeV2ThermostatModeSetData {
	// TODO param level type bitfield
}

export interface ThermostatModeV2ThermostatModeSupportedReportData {
	bitMask: number; // 0 byte unsigned integer
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
								"13": "AWAY"
							}
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 224,
							"shift": 5
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
								"13": "AWAY"
							}
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 224,
							"shift": 5
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
