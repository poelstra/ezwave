/**
 * Command Class Thermostat Fan Mode, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum ThermostatFanModeV3Commands {
	ThermostatFanModeGet = 0x02,
	ThermostatFanModeReport = 0x03,
	ThermostatFanModeSet = 0x01,
	ThermostatFanModeSupportedGet = 0x04,
	ThermostatFanModeSupportedReport = 0x05,
}

export interface ThermostatFanModeV3ThermostatFanModeReportData {
	off: boolean; // properties1[7]
	fanMode: FanModeEnum; // properties1[3..0]
}

export interface ThermostatFanModeV3ThermostatFanModeSetData {
	off: boolean; // properties1[7]
	fanMode: FanModeEnum; // properties1[3..0]
}

export interface ThermostatFanModeV3ThermostatFanModeSupportedReportData {
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
}

export class ThermostatFanModeV3 extends CommandClassPacket<ThermostatFanModeV3Commands> {
	public static readonly commandClass: number = CommandClasses.ThermostatFanMode; // 0x44 (68)
	public static readonly version: number = 3;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ThermostatFanModeV3, commandAndPayload);
	}
}

export class ThermostatFanModeGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof ThermostatFanModeV3 = ThermostatFanModeV3;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "ThermostatFanModeGet",
		"help": "Thermostat Fan Mode Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatFanModeV3)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ThermostatFanModeGet, data);
	}
};

export class ThermostatFanModeReport extends CommandPacket<ThermostatFanModeV3ThermostatFanModeReportData> {
	public static readonly CommandClass: typeof ThermostatFanModeV3 = ThermostatFanModeV3;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatFanModeV3)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatFanModeV3ThermostatFanModeReportData) {
		super(ThermostatFanModeReport, data);
	}
};

export class ThermostatFanModeSet extends CommandPacket<ThermostatFanModeV3ThermostatFanModeSetData> {
	public static readonly CommandClass: typeof ThermostatFanModeV3 = ThermostatFanModeV3;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatFanModeV3)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatFanModeV3ThermostatFanModeSetData) {
		super(ThermostatFanModeSet, data);
	}
};

export class ThermostatFanModeSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof ThermostatFanModeV3 = ThermostatFanModeV3;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "ThermostatFanModeSupportedGet",
		"help": "Thermostat Fan Mode Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatFanModeV3)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ThermostatFanModeSupportedGet, data);
	}
};

export class ThermostatFanModeSupportedReport extends CommandPacket<ThermostatFanModeV3ThermostatFanModeSupportedReportData> {
	public static readonly CommandClass: typeof ThermostatFanModeV3 = ThermostatFanModeV3;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatFanModeV3)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatFanModeV3ThermostatFanModeSupportedReportData) {
		super(ThermostatFanModeSupportedReport, data);
	}
};
