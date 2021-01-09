/**
 * Command Class Thermostat Fan Mode, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum ThermostatFanModeV2Commands {
	ThermostatFanModeGet = 0x02,
	ThermostatFanModeReport = 0x03,
	ThermostatFanModeSet = 0x01,
	ThermostatFanModeSupportedGet = 0x04,
	ThermostatFanModeSupportedReport = 0x05,
}

export interface ThermostatFanModeV2ThermostatFanModeReportData {
	fanMode: FanModeEnum; // level[3..0]
}

export interface ThermostatFanModeV2ThermostatFanModeSetData {
	off: boolean; // level[7]
	fanMode: FanModeEnum; // level[3..0]
}

export interface ThermostatFanModeV2ThermostatFanModeSupportedReportData {
	// TODO param bitMask type bitmask or marker
}

export enum FanModeEnum {
	AutoLow = 0x0,
	Low = 0x1,
	AutoHigh = 0x2,
	High = 0x3,
	AutoMedium = 0x4,
	Medium = 0x5,
}

export class ThermostatFanModeV2 extends CommandClassPacket<ThermostatFanModeV2Commands> {
	public static readonly commandClass = CommandClasses.ThermostatFanMode; // 0x44 (68)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ThermostatFanModeV2, commandAndPayload);
	}

	public static readonly ThermostatFanModeGet = class ThermostatFanModeGet extends CommandPacket<void> {
		public static readonly CommandClass = ThermostatFanModeV2;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "ThermostatFanModeGet",
			"help": "Thermostat Fan Mode Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatFanModeV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ThermostatFanModeGet, data);
		}
	};

	public static readonly ThermostatFanModeReport = class ThermostatFanModeReport extends CommandPacket<ThermostatFanModeV2ThermostatFanModeReportData> {
		public static readonly CommandClass = ThermostatFanModeV2;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "ThermostatFanModeReport",
			"help": "Thermostat Fan Mode Report",
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
								}
							}
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatFanModeV2)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatFanModeV2ThermostatFanModeReportData) {
			super(ThermostatFanModeReport, data);
		}
	};

	public static readonly ThermostatFanModeSet = class ThermostatFanModeSet extends CommandPacket<ThermostatFanModeV2ThermostatFanModeSetData> {
		public static readonly CommandClass = ThermostatFanModeV2;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "ThermostatFanModeSet",
			"help": "Thermostat Fan Mode Set",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"fieldType": "boolean",
							"name": "off",
							"mask": 128,
							"shift": 7
						},
						{
							"fieldType": "integer",
							"name": "reserved",
							"mask": 112,
							"shift": 4,
							"reserved": true
						},
						{
							"fieldType": "enum",
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
								}
							}
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatFanModeV2)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatFanModeV2ThermostatFanModeSetData) {
			super(ThermostatFanModeSet, data);
		}
	};

	public static readonly ThermostatFanModeSupportedGet = class ThermostatFanModeSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = ThermostatFanModeV2;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "ThermostatFanModeSupportedGet",
			"help": "Thermostat Fan Mode Supported Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatFanModeV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ThermostatFanModeSupportedGet, data);
		}
	};

	// TODO This command is not yet fully supported by the decoder/encoder
	public static readonly ThermostatFanModeSupportedReport = class ThermostatFanModeSupportedReport extends CommandPacket<ThermostatFanModeV2ThermostatFanModeSupportedReportData> {
		public static readonly CommandClass = ThermostatFanModeV2;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatFanModeV2)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatFanModeV2ThermostatFanModeSupportedReportData) {
			super(ThermostatFanModeSupportedReport, data);
		}
	};
}

export namespace ThermostatFanModeV2 {
	export type ThermostatFanModeGet = InstanceType<typeof ThermostatFanModeV2.ThermostatFanModeGet>;
	export type ThermostatFanModeReport = InstanceType<typeof ThermostatFanModeV2.ThermostatFanModeReport>;
	export type ThermostatFanModeSet = InstanceType<typeof ThermostatFanModeV2.ThermostatFanModeSet>;
	export type ThermostatFanModeSupportedGet = InstanceType<typeof ThermostatFanModeV2.ThermostatFanModeSupportedGet>;
	export type ThermostatFanModeSupportedReport = InstanceType<typeof ThermostatFanModeV2.ThermostatFanModeSupportedReport>;
}
