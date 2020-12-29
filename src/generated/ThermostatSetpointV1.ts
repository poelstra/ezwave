/**
 * Command Class Thermostat Setpoint, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ThermostatSetpointV1Commands {
	ThermostatSetpointGet = 0x02,
	ThermostatSetpointReport = 0x03,
	ThermostatSetpointSet = 0x01,
	ThermostatSetpointSupportedGet = 0x04,
	ThermostatSetpointSupportedReport = 0x05,
}

export interface ThermostatSetpointV1ThermostatSetpointGetData {
	// TODO param level type bitfield
}

export interface ThermostatSetpointV1ThermostatSetpointReportData {
	// TODO param level type bitfield
	// TODO param level2 type bitfield
	// TODO param value type blob
}

export interface ThermostatSetpointV1ThermostatSetpointSetData {
	// TODO param level type bitfield
	// TODO param level2 type bitfield
	// TODO param value type blob
}

export interface ThermostatSetpointV1ThermostatSetpointSupportedReportData {
	bitMask: number; // 0 byte unsigned integer
}

export class ThermostatSetpointV1 extends CommandClassPacket<ThermostatSetpointV1Commands> {
	public static readonly commandClass = CommandClasses.ThermostatSetpoint; // 0x43 (67)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ThermostatSetpointV1, commandAndPayload);
	}

	public static readonly ThermostatSetpointGet = class ThermostatSetpointGet extends CommandPacket<ThermostatSetpointV1ThermostatSetpointGetData> {
		public static readonly CommandClass = ThermostatSetpointV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "ThermostatSetpointGet",
			"help": "Thermostat Setpoint Get",
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
							"name": "Setpoint Type",
							"mask": 15,
							"shift": 0,
							"values": {
								"0": "not supported",
								"1": "Heating 1",
								"2": "Cooling 1",
								"3": "not supported1",
								"4": "not supported2",
								"5": "not supported3",
								"6": "not supported4",
								"7": "Furnace",
								"8": "Dry Air",
								"9": "Moist Air",
								"10": "Auto changeover"
							}
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 240,
							"shift": 4
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatSetpointV1)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatSetpointV1ThermostatSetpointGetData) {
			super(ThermostatSetpointGet, data);
		}
	};

	public static readonly ThermostatSetpointReport = class ThermostatSetpointReport extends CommandPacket<ThermostatSetpointV1ThermostatSetpointReportData> {
		public static readonly CommandClass = ThermostatSetpointV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "ThermostatSetpointReport",
			"help": "Thermostat Setpoint Report",
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
							"name": "Setpoint Type",
							"mask": 15,
							"shift": 0,
							"values": {
								"0": "not supported",
								"1": "Heating 1",
								"2": "Cooling 1",
								"3": "not supported1",
								"4": "not supported2",
								"5": "not supported3",
								"6": "not supported4",
								"7": "Furnace",
								"8": "Dry Air",
								"9": "Moist Air",
								"10": "Auto changeover"
							}
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 240,
							"shift": 4
						}
					]
				},
				{
					"type": "bitfield",
					"name": "level2",
					"help": "Level2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "value",
					"help": "Value",
					"length": {
						"name": "Level2",
						"mask": 7,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatSetpointV1)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatSetpointV1ThermostatSetpointReportData) {
			super(ThermostatSetpointReport, data);
		}
	};

	public static readonly ThermostatSetpointSet = class ThermostatSetpointSet extends CommandPacket<ThermostatSetpointV1ThermostatSetpointSetData> {
		public static readonly CommandClass = ThermostatSetpointV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "ThermostatSetpointSet",
			"help": "Thermostat Setpoint Set",
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
							"name": "Setpoint Type",
							"mask": 15,
							"shift": 0,
							"values": {
								"0": "not supported",
								"1": "Heating 1",
								"2": "Cooling 1",
								"3": "not supported1",
								"4": "not supported2",
								"5": "not supported3",
								"6": "not supported4",
								"7": "Furnace",
								"8": "Dry Air",
								"9": "Moist Air",
								"10": "Auto changeover"
							}
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 240,
							"shift": 4
						}
					]
				},
				{
					"type": "bitfield",
					"name": "level2",
					"help": "Level2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "value",
					"help": "Value",
					"length": {
						"name": "Level2",
						"mask": 7,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatSetpointV1)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatSetpointV1ThermostatSetpointSetData) {
			super(ThermostatSetpointSet, data);
		}
	};

	public static readonly ThermostatSetpointSupportedGet = class ThermostatSetpointSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = ThermostatSetpointV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "ThermostatSetpointSupportedGet",
			"help": "Thermostat Setpoint Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatSetpointV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ThermostatSetpointSupportedGet, data);
		}
	};

	public static readonly ThermostatSetpointSupportedReport = class ThermostatSetpointSupportedReport extends CommandPacket<ThermostatSetpointV1ThermostatSetpointSupportedReportData> {
		public static readonly CommandClass = ThermostatSetpointV1;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "ThermostatSetpointSupportedReport",
			"help": "Thermostat Setpoint Supported Report",
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
			return packet.tryAs(ThermostatSetpointV1)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatSetpointV1ThermostatSetpointSupportedReportData) {
			super(ThermostatSetpointSupportedReport, data);
		}
	};
}

export namespace ThermostatSetpointV1 {
	export type ThermostatSetpointGet = InstanceType<typeof ThermostatSetpointV1.ThermostatSetpointGet>;
	export type ThermostatSetpointReport = InstanceType<typeof ThermostatSetpointV1.ThermostatSetpointReport>;
	export type ThermostatSetpointSet = InstanceType<typeof ThermostatSetpointV1.ThermostatSetpointSet>;
	export type ThermostatSetpointSupportedGet = InstanceType<typeof ThermostatSetpointV1.ThermostatSetpointSupportedGet>;
	export type ThermostatSetpointSupportedReport = InstanceType<typeof ThermostatSetpointV1.ThermostatSetpointSupportedReport>;
}
