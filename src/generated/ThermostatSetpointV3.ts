/**
 * Command Class Thermostat Setpoint, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ThermostatSetpointV3Commands {
	ThermostatSetpointGet = 0x02,
	ThermostatSetpointReport = 0x03,
	ThermostatSetpointSet = 0x01,
	ThermostatSetpointSupportedGet = 0x04,
	ThermostatSetpointSupportedReport = 0x05,
	ThermostatSetpointCapabilitiesGet = 0x09,
	ThermostatSetpointCapabilitiesReport = 0x0a,
}

export interface ThermostatSetpointV3ThermostatSetpointGetData {
	// TODO param level type bitfield
}

export interface ThermostatSetpointV3ThermostatSetpointReportData {
	// TODO param level type bitfield
	// TODO param level2 type bitfield
	// TODO param value type blob
}

export interface ThermostatSetpointV3ThermostatSetpointSetData {
	// TODO param level type bitfield
	// TODO param level2 type bitfield
	// TODO param value type blob
}

export interface ThermostatSetpointV3ThermostatSetpointSupportedReportData {
	bitMask: number; // 0 byte unsigned integer
}

export interface ThermostatSetpointV3ThermostatSetpointCapabilitiesGetData {
	// TODO param properties1 type bitfield
}

export interface ThermostatSetpointV3ThermostatSetpointCapabilitiesReportData {
	// TODO param properties1 type bitfield
	// TODO param properties2 type bitfield
	// TODO param minValue type blob
	// TODO param properties3 type bitfield
	// TODO param maxValue type blob
}

export class ThermostatSetpointV3 extends CommandClassPacket<ThermostatSetpointV3Commands> {
	public static readonly commandClass = CommandClasses.ThermostatSetpoint; // 0x43 (67)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ThermostatSetpointV3, commandAndPayload);
	}

	public static readonly ThermostatSetpointGet = class ThermostatSetpointGet extends CommandPacket<ThermostatSetpointV3ThermostatSetpointGetData> {
		public static readonly CommandClass = ThermostatSetpointV3;
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
								"10": "Auto changeover",
								"11": "Energy Save Heating",
								"12": "Energy Save Cooling",
								"13": "Away Heating",
								"14": "Away Cooling",
								"15": "Full Power"
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
			return packet.tryAs(ThermostatSetpointV3)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatSetpointV3ThermostatSetpointGetData) {
			super(ThermostatSetpointGet, data);
		}
	};

	public static readonly ThermostatSetpointReport = class ThermostatSetpointReport extends CommandPacket<ThermostatSetpointV3ThermostatSetpointReportData> {
		public static readonly CommandClass = ThermostatSetpointV3;
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
								"10": "Auto changeover",
								"11": "Energy Save Heating",
								"12": "Energy Save Cooling",
								"13": "Away Heating",
								"14": "Away Cooling",
								"15": "Full Power"
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
			return packet.tryAs(ThermostatSetpointV3)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatSetpointV3ThermostatSetpointReportData) {
			super(ThermostatSetpointReport, data);
		}
	};

	public static readonly ThermostatSetpointSet = class ThermostatSetpointSet extends CommandPacket<ThermostatSetpointV3ThermostatSetpointSetData> {
		public static readonly CommandClass = ThermostatSetpointV3;
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
								"10": "Auto changeover",
								"11": "Energy Save Heating",
								"12": "Energy Save Cooling",
								"13": "Away Heating",
								"14": "Away Cooling",
								"15": "Full Power"
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
			return packet.tryAs(ThermostatSetpointV3)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatSetpointV3ThermostatSetpointSetData) {
			super(ThermostatSetpointSet, data);
		}
	};

	public static readonly ThermostatSetpointSupportedGet = class ThermostatSetpointSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = ThermostatSetpointV3;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "ThermostatSetpointSupportedGet",
			"help": "Thermostat Setpoint Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatSetpointV3)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ThermostatSetpointSupportedGet, data);
		}
	};

	public static readonly ThermostatSetpointSupportedReport = class ThermostatSetpointSupportedReport extends CommandPacket<ThermostatSetpointV3ThermostatSetpointSupportedReportData> {
		public static readonly CommandClass = ThermostatSetpointV3;
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
			return packet.tryAs(ThermostatSetpointV3)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatSetpointV3ThermostatSetpointSupportedReportData) {
			super(ThermostatSetpointSupportedReport, data);
		}
	};

	public static readonly ThermostatSetpointCapabilitiesGet = class ThermostatSetpointCapabilitiesGet extends CommandPacket<ThermostatSetpointV3ThermostatSetpointCapabilitiesGetData> {
		public static readonly CommandClass = ThermostatSetpointV3;
		public static readonly command = 0x09;
		public static readonly definition = {
			"command": 9,
			"name": "ThermostatSetpointCapabilitiesGet",
			"help": "Thermostat Setpoint Capabilities Get",
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
								"10": "Auto changeover",
								"11": "Energy Save Heating",
								"12": "Energy Save Cooling",
								"13": "Away Heating",
								"14": "Away Cooling",
								"15": "Full Power"
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
			return packet.tryAs(ThermostatSetpointV3)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatSetpointV3ThermostatSetpointCapabilitiesGetData) {
			super(ThermostatSetpointCapabilitiesGet, data);
		}
	};

	public static readonly ThermostatSetpointCapabilitiesReport = class ThermostatSetpointCapabilitiesReport extends CommandPacket<ThermostatSetpointV3ThermostatSetpointCapabilitiesReportData> {
		public static readonly CommandClass = ThermostatSetpointV3;
		public static readonly command = 0x0a;
		public static readonly definition = {
			"command": 10,
			"name": "ThermostatSetpointCapabilitiesReport",
			"help": "Thermostat Setpoint Capabilities Report",
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
								"10": "Auto changeover",
								"11": "Energy Save Heating",
								"12": "Energy Save Cooling",
								"13": "Away Heating",
								"14": "Away Cooling",
								"15": "Full Power"
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
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Size1",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Scale1",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Precision1",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "minValue",
					"help": "Min Value",
					"length": {
						"name": "Properties2",
						"mask": 7,
						"shift": 0
					}
				},
				{
					"type": "bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Size2",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Scale2",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Precision2",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "maxValue",
					"help": "MaxValue",
					"length": {
						"name": "Properties3",
						"mask": 7,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatSetpointV3)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatSetpointV3ThermostatSetpointCapabilitiesReportData) {
			super(ThermostatSetpointCapabilitiesReport, data);
		}
	};
}

export namespace ThermostatSetpointV3 {
	export type ThermostatSetpointGet = InstanceType<typeof ThermostatSetpointV3.ThermostatSetpointGet>;
	export type ThermostatSetpointReport = InstanceType<typeof ThermostatSetpointV3.ThermostatSetpointReport>;
	export type ThermostatSetpointSet = InstanceType<typeof ThermostatSetpointV3.ThermostatSetpointSet>;
	export type ThermostatSetpointSupportedGet = InstanceType<typeof ThermostatSetpointV3.ThermostatSetpointSupportedGet>;
	export type ThermostatSetpointSupportedReport = InstanceType<typeof ThermostatSetpointV3.ThermostatSetpointSupportedReport>;
	export type ThermostatSetpointCapabilitiesGet = InstanceType<typeof ThermostatSetpointV3.ThermostatSetpointCapabilitiesGet>;
	export type ThermostatSetpointCapabilitiesReport = InstanceType<typeof ThermostatSetpointV3.ThermostatSetpointCapabilitiesReport>;
}
