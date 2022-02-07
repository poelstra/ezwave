/**
 * Command Class Thermostat Fan Mode, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	bitMask: Set<BitMaskEnum>; // automatic length
}

export enum FanModeEnum {
	AutoLow = 0x0,
	Low = 0x1,
	AutoHigh = 0x2,
	High = 0x3,
	AutoMedium = 0x4,
	Medium = 0x5,
}

export enum BitMaskEnum {
	Auto = 0x0,
	Low = 0x1,
	AutoHigh = 0x2,
	High = 0x3,
	AutoMedium = 0x4,
	Medium = 0x5,
}

export class ThermostatFanModeV2 extends CommandClassPacket<ThermostatFanModeV2Commands> {
	public static readonly commandClass = CommandClasses.ThermostatFanMode; // 0x44 (68)
	public static readonly version = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ThermostatFanModeV2, commandAndPayload);
	}
}

export class ThermostatFanModeGet extends CommandPacket<void> {
	public static readonly CommandClass = ThermostatFanModeV2;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "ThermostatFanModeGet",
		"help": "Thermostat Fan Mode Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatFanModeV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ThermostatFanModeGet, data);
	}
};

export class ThermostatFanModeReport extends CommandPacket<ThermostatFanModeV2ThermostatFanModeReportData> {
	public static readonly CommandClass = ThermostatFanModeV2;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "ThermostatFanModeReport",
		"help": "Thermostat Fan Mode Report",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "level",
				"help": "Level",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 240,
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
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatFanModeV2)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatFanModeV2ThermostatFanModeReportData) {
		super(ThermostatFanModeReport, data);
	}
};

export class ThermostatFanModeSet extends CommandPacket<ThermostatFanModeV2ThermostatFanModeSetData> {
	public static readonly CommandClass = ThermostatFanModeV2;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "ThermostatFanModeSet",
		"help": "Thermostat Fan Mode Set",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "level",
				"help": "Level",
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
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatFanModeV2)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatFanModeV2ThermostatFanModeSetData) {
		super(ThermostatFanModeSet, data);
	}
};

export class ThermostatFanModeSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass = ThermostatFanModeV2;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
		"command": 4,
		"name": "ThermostatFanModeSupportedGet",
		"help": "Thermostat Fan Mode Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatFanModeV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ThermostatFanModeSupportedGet, data);
	}
};

export class ThermostatFanModeSupportedReport extends CommandPacket<ThermostatFanModeV2ThermostatFanModeSupportedReportData> {
	public static readonly CommandClass = ThermostatFanModeV2;
	public static readonly command = 0x05; // 5
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
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatFanModeV2)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatFanModeV2ThermostatFanModeSupportedReportData) {
		super(ThermostatFanModeSupportedReport, data);
	}
};
