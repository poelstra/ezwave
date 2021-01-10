/**
 * Command Class Thermostat Setpoint, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum ThermostatSetpointV1Commands {
	ThermostatSetpointGet = 0x02,
	ThermostatSetpointReport = 0x03,
	ThermostatSetpointSet = 0x01,
	ThermostatSetpointSupportedGet = 0x04,
	ThermostatSetpointSupportedReport = 0x05,
}

export interface ThermostatSetpointV1ThermostatSetpointGetData {
	setpointType: SetpointTypeEnum; // level[3..0]
}

export interface ThermostatSetpointV1ThermostatSetpointReportData {
	setpointType: SetpointTypeEnum; // level[3..0]
	precision: number; // level2[7..5]
	scale: number; // level2[4..3]
	value: Buffer; // variable length
}

export interface ThermostatSetpointV1ThermostatSetpointSetData {
	setpointType: SetpointTypeEnum; // level[3..0]
	precision: number; // level2[7..5]
	scale: number; // level2[4..3]
	value: Buffer; // variable length
}

export interface ThermostatSetpointV1ThermostatSetpointSupportedReportData {
	// TODO param bitMask type bitmask
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
		public static readonly definition = convertFromJsonCommand({
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
							"fieldType": "integer",
							"name": "reserved",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"fieldType": "enum",
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
								}
							}
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
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
							"fieldType": "integer",
							"name": "reserved",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"fieldType": "enum",
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
							"fieldType": "integer",
							"name": "precision",
							"mask": 224,
							"shift": 5
						},
						{
							"fieldType": "integer",
							"name": "scale",
							"mask": 24,
							"shift": 3
						},
						{
							"fieldType": "integer",
							"name": "size",
							"mask": 7,
							"shift": 0,
							"lengthOf": {
								"refs": [
									"value"
								]
							},
							"isAutogenerated": true
						}
					]
				},
				{
					"type": "blob",
					"name": "value",
					"help": "Value",
					"length": {
						"lengthType": "ref",
						"from": {
							"ref": "level2.size"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
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
							"fieldType": "integer",
							"name": "reserved",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"fieldType": "enum",
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
							"fieldType": "integer",
							"name": "precision",
							"mask": 224,
							"shift": 5
						},
						{
							"fieldType": "integer",
							"name": "scale",
							"mask": 24,
							"shift": 3
						},
						{
							"fieldType": "integer",
							"name": "size",
							"mask": 7,
							"shift": 0,
							"lengthOf": {
								"refs": [
									"value"
								]
							},
							"isAutogenerated": true
						}
					]
				},
				{
					"type": "blob",
					"name": "value",
					"help": "Value",
					"length": {
						"lengthType": "ref",
						"from": {
							"ref": "level2.size"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "ThermostatSetpointSupportedGet",
			"help": "Thermostat Setpoint Supported Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatSetpointV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ThermostatSetpointSupportedGet, data);
		}
	};

	// TODO This command is not yet fully supported by the decoder/encoder
	public static readonly ThermostatSetpointSupportedReport = class ThermostatSetpointSupportedReport extends CommandPacket<ThermostatSetpointV1ThermostatSetpointSupportedReportData> {
		public static readonly CommandClass = ThermostatSetpointV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

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
