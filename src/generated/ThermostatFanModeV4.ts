/**
 * Command Class Thermostat Fan Mode, version 4.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ThermostatFanModeV4Commands {
	ThermostatFanModeGet = 0x02,
	ThermostatFanModeReport = 0x03,
	ThermostatFanModeSet = 0x01,
	ThermostatFanModeSupportedGet = 0x04,
	ThermostatFanModeSupportedReport = 0x05,
}

export interface ThermostatFanModeV4ThermostatFanModeReportData {
	// TODO param properties1 type bitfield
}

export interface ThermostatFanModeV4ThermostatFanModeSetData {
	// TODO param properties1 type bitfield
}

export interface ThermostatFanModeV4ThermostatFanModeSupportedReportData {
	bitMask: number; // 0 byte unsigned integer
}

export class ThermostatFanModeV4 extends CommandClassPacket<ThermostatFanModeV4Commands> {
	public static readonly commandClass = CommandClasses.ThermostatFanMode; // 0x44 (68)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ThermostatFanModeV4, commandAndPayload);
	}

	public static readonly ThermostatFanModeGet = class ThermostatFanModeGet extends CommandPacket<void> {
		public static readonly CommandClass = ThermostatFanModeV4;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "ThermostatFanModeGet",
			"help": "Thermostat Fan Mode Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatFanModeV4)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ThermostatFanModeGet, data);
		}
	};

	public static readonly ThermostatFanModeReport = class ThermostatFanModeReport extends CommandPacket<ThermostatFanModeV4ThermostatFanModeReportData> {
		public static readonly CommandClass = ThermostatFanModeV4;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "ThermostatFanModeReport",
			"help": "Thermostat Fan Mode Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "enum",
							"name": "Fan Mode",
							"mask": 15,
							"shift": 0,
							"values": {
								"0": "Auto Low",
								"1": "Low",
								"2": "Auto High",
								"3": "High",
								"4": "Auto Medium",
								"5": "Medium",
								"6": "Circulation",
								"7": "Humidity",
								"8": "Left Right",
								"9": "Up Down",
								"10": "Quiet",
								"11": "ReservedB",
								"12": "ReservedC",
								"13": "ReservedD",
								"14": "ReservedE",
								"15": "ReservedF"
							}
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 112,
							"shift": 4
						},
						{
							"type": "boolean",
							"name": "Off",
							"mask": 128,
							"shift": 7
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatFanModeV4)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatFanModeV4ThermostatFanModeReportData) {
			super(ThermostatFanModeReport, data);
		}
	};

	public static readonly ThermostatFanModeSet = class ThermostatFanModeSet extends CommandPacket<ThermostatFanModeV4ThermostatFanModeSetData> {
		public static readonly CommandClass = ThermostatFanModeV4;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "ThermostatFanModeSet",
			"help": "Thermostat Fan Mode Set",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "enum",
							"name": "Fan Mode",
							"mask": 15,
							"shift": 0,
							"values": {
								"0": "Auto Low",
								"1": "Low",
								"2": "Auto High",
								"3": "High",
								"4": "Auto Medium",
								"5": "Medium",
								"6": "Circulation",
								"7": "Humidity",
								"8": "Left Right",
								"9": "Up Down",
								"10": "Quiet",
								"11": "ReservedB",
								"12": "ReservedC",
								"13": "ReservedD",
								"14": "ReservedE",
								"15": "ReservedF"
							}
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 112,
							"shift": 4
						},
						{
							"type": "boolean",
							"name": "Off",
							"mask": 128,
							"shift": 7
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatFanModeV4)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatFanModeV4ThermostatFanModeSetData) {
			super(ThermostatFanModeSet, data);
		}
	};

	public static readonly ThermostatFanModeSupportedGet = class ThermostatFanModeSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = ThermostatFanModeV4;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "ThermostatFanModeSupportedGet",
			"help": "Thermostat Fan Mode Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatFanModeV4)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ThermostatFanModeSupportedGet, data);
		}
	};

	public static readonly ThermostatFanModeSupportedReport = class ThermostatFanModeSupportedReport extends CommandPacket<ThermostatFanModeV4ThermostatFanModeSupportedReportData> {
		public static readonly CommandClass = ThermostatFanModeV4;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "ThermostatFanModeSupportedReport",
			"help": "Thermostat Fan Mode Supported Report",
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
			return packet.tryAs(ThermostatFanModeV4)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatFanModeV4ThermostatFanModeSupportedReportData) {
			super(ThermostatFanModeSupportedReport, data);
		}
	};
}

export namespace ThermostatFanModeV4 {
	export type ThermostatFanModeGet = InstanceType<typeof ThermostatFanModeV4.ThermostatFanModeGet>;
	export type ThermostatFanModeReport = InstanceType<typeof ThermostatFanModeV4.ThermostatFanModeReport>;
	export type ThermostatFanModeSet = InstanceType<typeof ThermostatFanModeV4.ThermostatFanModeSet>;
	export type ThermostatFanModeSupportedGet = InstanceType<typeof ThermostatFanModeV4.ThermostatFanModeSupportedGet>;
	export type ThermostatFanModeSupportedReport = InstanceType<typeof ThermostatFanModeV4.ThermostatFanModeSupportedReport>;
}
