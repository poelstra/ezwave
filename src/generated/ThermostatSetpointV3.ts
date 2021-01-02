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
	setpointType: SetpointTypeEnum; // level[3..0]
}

export interface ThermostatSetpointV3ThermostatSetpointReportData {
	setpointType: SetpointTypeEnum; // level[3..0]
	precision: number; // level2[7..5]
	scale: number; // level2[4..3]
	// TODO param value type blob
}

export interface ThermostatSetpointV3ThermostatSetpointSetData {
	setpointType: SetpointTypeEnum; // level[3..0]
	precision: number; // level2[7..5]
	scale: number; // level2[4..3]
	// TODO param value type blob
}

export interface ThermostatSetpointV3ThermostatSetpointSupportedReportData {
	// TODO param bitMask type bitmask or marker
}

export interface ThermostatSetpointV3ThermostatSetpointCapabilitiesGetData {
	setpointType: SetpointTypeEnum; // properties1[3..0]
}

export interface ThermostatSetpointV3ThermostatSetpointCapabilitiesReportData {
	setpointType: SetpointTypeEnum; // properties1[3..0]
	precision1: number; // properties2[7..5]
	scale1: number; // properties2[4..3]
	// TODO param minValue type blob
	precision2: number; // properties3[7..5]
	scale2: number; // properties3[4..3]
	// TODO param maxValue type blob
}

export enum SetpointTypeEnum {
	NotSupported = 0x0,
	Heating1 = 0x1,
	Cooling1 = 0x2,
	NotSupported1 = 0x3,
	NotSupported2 = 0x4,
	NotSupported3 = 0x5,
	NotSupported4 = 0x6,
	Furnace = 0x7,
	DryAir = 0x8,
	MoistAir = 0x9,
	AutoChangeover = 0xa,
	EnergySaveHeating = 0xb,
	EnergySaveCooling = 0xc,
	AwayHeating = 0xd,
	AwayCooling = 0xe,
	FullPower = 0xf,
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
							"type": "integer",
							"name": "reserved",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"type": "enum",
							"name": "setpointType",
							"mask": 15,
							"shift": 0,
							"values": {
								"0": {
									"name": "NotSupported",
									"help": "not supported"
								},
								"1": {
									"name": "Heating1",
									"help": "Heating 1"
								},
								"2": {
									"name": "Cooling1",
									"help": "Cooling 1"
								},
								"3": {
									"name": "NotSupported1",
									"help": "not supported1"
								},
								"4": {
									"name": "NotSupported2",
									"help": "not supported2"
								},
								"5": {
									"name": "NotSupported3",
									"help": "not supported3"
								},
								"6": {
									"name": "NotSupported4",
									"help": "not supported4"
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
									"help": "Auto changeover"
								},
								"11": {
									"name": "EnergySaveHeating",
									"help": "Energy Save Heating"
								},
								"12": {
									"name": "EnergySaveCooling",
									"help": "Energy Save Cooling"
								},
								"13": {
									"name": "AwayHeating",
									"help": "Away Heating"
								},
								"14": {
									"name": "AwayCooling",
									"help": "Away Cooling"
								},
								"15": {
									"name": "FullPower",
									"help": "Full Power"
								}
							}
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
							"type": "integer",
							"name": "reserved",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"type": "enum",
							"name": "setpointType",
							"mask": 15,
							"shift": 0,
							"values": {
								"0": {
									"name": "NotSupported",
									"help": "not supported"
								},
								"1": {
									"name": "Heating1",
									"help": "Heating 1"
								},
								"2": {
									"name": "Cooling1",
									"help": "Cooling 1"
								},
								"3": {
									"name": "NotSupported1",
									"help": "not supported1"
								},
								"4": {
									"name": "NotSupported2",
									"help": "not supported2"
								},
								"5": {
									"name": "NotSupported3",
									"help": "not supported3"
								},
								"6": {
									"name": "NotSupported4",
									"help": "not supported4"
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
									"help": "Auto changeover"
								},
								"11": {
									"name": "EnergySaveHeating",
									"help": "Energy Save Heating"
								},
								"12": {
									"name": "EnergySaveCooling",
									"help": "Energy Save Cooling"
								},
								"13": {
									"name": "AwayHeating",
									"help": "Away Heating"
								},
								"14": {
									"name": "AwayCooling",
									"help": "Away Cooling"
								},
								"15": {
									"name": "FullPower",
									"help": "Full Power"
								}
							}
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
							"name": "precision",
							"mask": 224,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "size",
							"mask": 7,
							"shift": 0,
							"lengthOf": {
								"refs": [
									{
										"name": "value"
									}
								]
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "value",
					"help": "Value",
					"length": {
						"ref": "level2",
						"bitfield": {
							"mask": 7,
							"shift": 0,
							"name": "size"
						}
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
							"type": "integer",
							"name": "reserved",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"type": "enum",
							"name": "setpointType",
							"mask": 15,
							"shift": 0,
							"values": {
								"0": {
									"name": "NotSupported",
									"help": "not supported"
								},
								"1": {
									"name": "Heating1",
									"help": "Heating 1"
								},
								"2": {
									"name": "Cooling1",
									"help": "Cooling 1"
								},
								"3": {
									"name": "NotSupported1",
									"help": "not supported1"
								},
								"4": {
									"name": "NotSupported2",
									"help": "not supported2"
								},
								"5": {
									"name": "NotSupported3",
									"help": "not supported3"
								},
								"6": {
									"name": "NotSupported4",
									"help": "not supported4"
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
									"help": "Auto changeover"
								},
								"11": {
									"name": "EnergySaveHeating",
									"help": "Energy Save Heating"
								},
								"12": {
									"name": "EnergySaveCooling",
									"help": "Energy Save Cooling"
								},
								"13": {
									"name": "AwayHeating",
									"help": "Away Heating"
								},
								"14": {
									"name": "AwayCooling",
									"help": "Away Cooling"
								},
								"15": {
									"name": "FullPower",
									"help": "Full Power"
								}
							}
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
							"name": "precision",
							"mask": 224,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "size",
							"mask": 7,
							"shift": 0,
							"lengthOf": {
								"refs": [
									{
										"name": "value"
									}
								]
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "value",
					"help": "Value",
					"length": {
						"ref": "level2",
						"bitfield": {
							"mask": 7,
							"shift": 0,
							"name": "size"
						}
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
							"type": "integer",
							"name": "reserved",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"type": "enum",
							"name": "setpointType",
							"mask": 15,
							"shift": 0,
							"values": {
								"0": {
									"name": "NotSupported",
									"help": "not supported"
								},
								"1": {
									"name": "Heating1",
									"help": "Heating 1"
								},
								"2": {
									"name": "Cooling1",
									"help": "Cooling 1"
								},
								"3": {
									"name": "NotSupported1",
									"help": "not supported1"
								},
								"4": {
									"name": "NotSupported2",
									"help": "not supported2"
								},
								"5": {
									"name": "NotSupported3",
									"help": "not supported3"
								},
								"6": {
									"name": "NotSupported4",
									"help": "not supported4"
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
									"help": "Auto changeover"
								},
								"11": {
									"name": "EnergySaveHeating",
									"help": "Energy Save Heating"
								},
								"12": {
									"name": "EnergySaveCooling",
									"help": "Energy Save Cooling"
								},
								"13": {
									"name": "AwayHeating",
									"help": "Away Heating"
								},
								"14": {
									"name": "AwayCooling",
									"help": "Away Cooling"
								},
								"15": {
									"name": "FullPower",
									"help": "Full Power"
								}
							}
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
							"type": "integer",
							"name": "reserved",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"type": "enum",
							"name": "setpointType",
							"mask": 15,
							"shift": 0,
							"values": {
								"0": {
									"name": "NotSupported",
									"help": "not supported"
								},
								"1": {
									"name": "Heating1",
									"help": "Heating 1"
								},
								"2": {
									"name": "Cooling1",
									"help": "Cooling 1"
								},
								"3": {
									"name": "NotSupported1",
									"help": "not supported1"
								},
								"4": {
									"name": "NotSupported2",
									"help": "not supported2"
								},
								"5": {
									"name": "NotSupported3",
									"help": "not supported3"
								},
								"6": {
									"name": "NotSupported4",
									"help": "not supported4"
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
									"help": "Auto changeover"
								},
								"11": {
									"name": "EnergySaveHeating",
									"help": "Energy Save Heating"
								},
								"12": {
									"name": "EnergySaveCooling",
									"help": "Energy Save Cooling"
								},
								"13": {
									"name": "AwayHeating",
									"help": "Away Heating"
								},
								"14": {
									"name": "AwayCooling",
									"help": "Away Cooling"
								},
								"15": {
									"name": "FullPower",
									"help": "Full Power"
								}
							}
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
							"name": "precision1",
							"mask": 224,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "scale1",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "size1",
							"mask": 7,
							"shift": 0,
							"lengthOf": {
								"refs": [
									{
										"name": "minValue"
									}
								]
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "minValue",
					"help": "Min Value",
					"length": {
						"ref": "properties2",
						"bitfield": {
							"mask": 7,
							"shift": 0,
							"name": "size1"
						}
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
							"name": "precision2",
							"mask": 224,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "scale2",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "size2",
							"mask": 7,
							"shift": 0,
							"lengthOf": {
								"refs": [
									{
										"name": "maxValue"
									}
								]
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "maxValue",
					"help": "MaxValue",
					"length": {
						"ref": "properties3",
						"bitfield": {
							"mask": 7,
							"shift": 0,
							"name": "size2"
						}
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
