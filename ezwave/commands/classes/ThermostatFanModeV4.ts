/**
 * Command Class Thermostat Fan Mode, version 4.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum ThermostatFanModeV4Commands {
	ThermostatFanModeGet = 0x02,
	ThermostatFanModeReport = 0x03,
	ThermostatFanModeSet = 0x01,
	ThermostatFanModeSupportedGet = 0x04,
	ThermostatFanModeSupportedReport = 0x05,
}

export interface ThermostatFanModeV4ThermostatFanModeReportData {
	off: boolean; // properties1[7]
	fanMode: FanModeEnum; // properties1[3..0]
}

export interface ThermostatFanModeV4ThermostatFanModeSetData {
	off: boolean; // properties1[7]
	fanMode: FanModeEnum; // properties1[3..0]
}

export interface ThermostatFanModeV4ThermostatFanModeSupportedReportData {
	bitMask: Set<BitMaskEnum>; // automatic length
}

export enum FanModeEnum {
	AutoLow = 0x0,
	Low = 0x1,
	AutoHigh = 0x2,
	High = 0x3,
	AutoMedium = 0x4,
	Medium = 0x5,
	Circulation = 0x6,
	Humidity = 0x7,
	LeftRight = 0x8,
	UpDown = 0x9,
	Quiet = 0xa,
	ReservedB = 0xb,
	ReservedC = 0xc,
	ReservedD = 0xd,
	ReservedE = 0xe,
	ReservedF = 0xf,
}

export enum BitMaskEnum {
	Auto = 0x0,
	Low = 0x1,
	AutoHigh = 0x2,
	High = 0x3,
	AutoMedium = 0x4,
	Medium = 0x5,
	Circulation = 0x6,
	HumidityCirculation = 0x7,
	LeftRight = 0x8,
	UpDown = 0x9,
	Quiet = 0xa,
	ReservedB = 0xb,
	ReservedC = 0xc,
	ReservedD = 0xd,
	ReservedE = 0xe,
	ReservedF = 0xf,
}

export class ThermostatFanModeV4 extends CommandClassPacket<ThermostatFanModeV4Commands> {
	public static readonly commandClass = CommandClasses.ThermostatFanMode; // 0x44 (68)
	public static readonly version = 4;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ThermostatFanModeV4, commandAndPayload);
	}

	public static readonly ThermostatFanModeGet = class ThermostatFanModeGet extends CommandPacket<void> {
		public static readonly CommandClass = ThermostatFanModeV4;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "ThermostatFanModeGet",
			"help": "Thermostat Fan Mode Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "ThermostatFanModeReport",
			"help": "Thermostat Fan Mode Report",
			"status": "Active",
			"params": [
				{
					"type": "Bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "Boolean",
							"name": "off",
							"mask": 128,
							"shift": 7
						},
						{
							"fieldType": "Integer",
							"name": "reserved",
							"mask": 112,
							"shift": 4,
							"reserved": true
						},
						{
							"fieldType": "Enum",
							"name": "fanMode",
							"mask": 15,
							"shift": 0,
							"values": {
								"0": {
									"name": "AutoLow",
									"help": "Auto Low"
								},
								"1": {
									"name": "Low",
									"help": "Low"
								},
								"2": {
									"name": "AutoHigh",
									"help": "Auto High"
								},
								"3": {
									"name": "High",
									"help": "High"
								},
								"4": {
									"name": "AutoMedium",
									"help": "Auto Medium"
								},
								"5": {
									"name": "Medium",
									"help": "Medium"
								},
								"6": {
									"name": "Circulation",
									"help": "Circulation"
								},
								"7": {
									"name": "Humidity",
									"help": "Humidity"
								},
								"8": {
									"name": "LeftRight",
									"help": "Left Right"
								},
								"9": {
									"name": "UpDown",
									"help": "Up Down"
								},
								"10": {
									"name": "Quiet",
									"help": "Quiet"
								},
								"11": {
									"name": "ReservedB",
									"help": "ReservedB"
								},
								"12": {
									"name": "ReservedC",
									"help": "ReservedC"
								},
								"13": {
									"name": "ReservedD",
									"help": "ReservedD"
								},
								"14": {
									"name": "ReservedE",
									"help": "ReservedE"
								},
								"15": {
									"name": "ReservedF",
									"help": "ReservedF"
								}
							}
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "ThermostatFanModeSet",
			"help": "Thermostat Fan Mode Set",
			"status": "Active",
			"params": [
				{
					"type": "Bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "Boolean",
							"name": "off",
							"mask": 128,
							"shift": 7
						},
						{
							"fieldType": "Integer",
							"name": "reserved",
							"mask": 112,
							"shift": 4,
							"reserved": true
						},
						{
							"fieldType": "Enum",
							"name": "fanMode",
							"mask": 15,
							"shift": 0,
							"values": {
								"0": {
									"name": "AutoLow",
									"help": "Auto Low"
								},
								"1": {
									"name": "Low",
									"help": "Low"
								},
								"2": {
									"name": "AutoHigh",
									"help": "Auto High"
								},
								"3": {
									"name": "High",
									"help": "High"
								},
								"4": {
									"name": "AutoMedium",
									"help": "Auto Medium"
								},
								"5": {
									"name": "Medium",
									"help": "Medium"
								},
								"6": {
									"name": "Circulation",
									"help": "Circulation"
								},
								"7": {
									"name": "Humidity",
									"help": "Humidity"
								},
								"8": {
									"name": "LeftRight",
									"help": "Left Right"
								},
								"9": {
									"name": "UpDown",
									"help": "Up Down"
								},
								"10": {
									"name": "Quiet",
									"help": "Quiet"
								},
								"11": {
									"name": "ReservedB",
									"help": "ReservedB"
								},
								"12": {
									"name": "ReservedC",
									"help": "ReservedC"
								},
								"13": {
									"name": "ReservedD",
									"help": "ReservedD"
								},
								"14": {
									"name": "ReservedE",
									"help": "ReservedE"
								},
								"15": {
									"name": "ReservedF",
									"help": "ReservedF"
								}
							}
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "ThermostatFanModeSupportedGet",
			"help": "Thermostat Fan Mode Supported Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "ThermostatFanModeSupportedReport",
			"help": "Thermostat Fan Mode Supported Report",
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
							"name": "Auto",
							"help": "Auto"
						},
						"1": {
							"name": "Low",
							"help": "Low"
						},
						"2": {
							"name": "AutoHigh",
							"help": "Auto High"
						},
						"3": {
							"name": "High",
							"help": "High"
						},
						"4": {
							"name": "AutoMedium",
							"help": "Auto Medium"
						},
						"5": {
							"name": "Medium",
							"help": "Medium"
						},
						"6": {
							"name": "Circulation",
							"help": "Circulation"
						},
						"7": {
							"name": "HumidityCirculation",
							"help": "Humidity Circulation"
						},
						"8": {
							"name": "LeftRight",
							"help": "Left Right"
						},
						"9": {
							"name": "UpDown",
							"help": "Up Down"
						},
						"10": {
							"name": "Quiet",
							"help": "Quiet"
						},
						"11": {
							"name": "ReservedB",
							"help": "ReservedB"
						},
						"12": {
							"name": "ReservedC",
							"help": "ReservedC"
						},
						"13": {
							"name": "ReservedD",
							"help": "ReservedD"
						},
						"14": {
							"name": "ReservedE",
							"help": "ReservedE"
						},
						"15": {
							"name": "ReservedF",
							"help": "ReservedF"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

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
