/**
 * Command Class Thermostat Setpoint, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	value: Buffer; // variable length
}

export interface ThermostatSetpointV3ThermostatSetpointSetData {
	setpointType: SetpointTypeEnum; // level[3..0]
	precision: number; // level2[7..5]
	scale: number; // level2[4..3]
	value: Buffer; // variable length
}

export interface ThermostatSetpointV3ThermostatSetpointSupportedReportData {
	bitMask: Set<BitMaskEnum>; // automatic length
}

export interface ThermostatSetpointV3ThermostatSetpointCapabilitiesGetData {
	setpointType: SetpointTypeEnum; // properties1[3..0]
}

export interface ThermostatSetpointV3ThermostatSetpointCapabilitiesReportData {
	setpointType: SetpointTypeEnum; // properties1[3..0]
	precision1: number; // properties2[7..5]
	scale1: number; // properties2[4..3]
	minValue: Buffer; // variable length
	precision2: number; // properties3[7..5]
	scale2: number; // properties3[4..3]
	maxValue: Buffer; // variable length
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

export enum BitMaskEnum {
	None = 0x0,
	Heating = 0x1,
	Cooling = 0x2,
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
	public static readonly commandClass: number = CommandClasses.ThermostatSetpoint; // 0x43 (67)
	public static readonly version: number = 3;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ThermostatSetpointV3, commandAndPayload);
	}
}

export class ThermostatSetpointGet extends CommandPacket<ThermostatSetpointV3ThermostatSetpointGetData> {
	public static readonly CommandClass: typeof ThermostatSetpointV3 = ThermostatSetpointV3;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "ThermostatSetpointGet",
		"help": "Thermostat Setpoint Get",
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatSetpointV3)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatSetpointV3ThermostatSetpointGetData) {
		super(ThermostatSetpointGet, data);
	}
};

export class ThermostatSetpointReport extends CommandPacket<ThermostatSetpointV3ThermostatSetpointReportData> {
	public static readonly CommandClass: typeof ThermostatSetpointV3 = ThermostatSetpointV3;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "ThermostatSetpointReport",
		"help": "Thermostat Setpoint Report",
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
				"type": "Bitfield",
				"name": "level2",
				"help": "Level2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "precision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "scale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
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
				"type": "Blob",
				"name": "value",
				"help": "Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "level2.size"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatSetpointV3)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatSetpointV3ThermostatSetpointReportData) {
		super(ThermostatSetpointReport, data);
	}
};

export class ThermostatSetpointSet extends CommandPacket<ThermostatSetpointV3ThermostatSetpointSetData> {
	public static readonly CommandClass: typeof ThermostatSetpointV3 = ThermostatSetpointV3;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "ThermostatSetpointSet",
		"help": "Thermostat Setpoint Set",
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
				"type": "Bitfield",
				"name": "level2",
				"help": "Level2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "precision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "scale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
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
				"type": "Blob",
				"name": "value",
				"help": "Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "level2.size"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatSetpointV3)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatSetpointV3ThermostatSetpointSetData) {
		super(ThermostatSetpointSet, data);
	}
};

export class ThermostatSetpointSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof ThermostatSetpointV3 = ThermostatSetpointV3;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "ThermostatSetpointSupportedGet",
		"help": "Thermostat Setpoint Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatSetpointV3)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ThermostatSetpointSupportedGet, data);
	}
};

export class ThermostatSetpointSupportedReport extends CommandPacket<ThermostatSetpointV3ThermostatSetpointSupportedReportData> {
	public static readonly CommandClass: typeof ThermostatSetpointV3 = ThermostatSetpointV3;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "ThermostatSetpointSupportedReport",
		"help": "Thermostat Setpoint Supported Report",
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
						"name": "None",
						"help": "None"
					},
					"1": {
						"name": "Heating",
						"help": "Heating"
					},
					"2": {
						"name": "Cooling",
						"help": "Cooling"
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatSetpointV3)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatSetpointV3ThermostatSetpointSupportedReportData) {
		super(ThermostatSetpointSupportedReport, data);
	}
};

export class ThermostatSetpointCapabilitiesGet extends CommandPacket<ThermostatSetpointV3ThermostatSetpointCapabilitiesGetData> {
	public static readonly CommandClass: typeof ThermostatSetpointV3 = ThermostatSetpointV3;
	public static readonly command: number = 0x09; // 9
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 9,
		"name": "ThermostatSetpointCapabilitiesGet",
		"help": "Thermostat Setpoint Capabilities Get",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatSetpointV3)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatSetpointV3ThermostatSetpointCapabilitiesGetData) {
		super(ThermostatSetpointCapabilitiesGet, data);
	}
};

export class ThermostatSetpointCapabilitiesReport extends CommandPacket<ThermostatSetpointV3ThermostatSetpointCapabilitiesReportData> {
	public static readonly CommandClass: typeof ThermostatSetpointV3 = ThermostatSetpointV3;
	public static readonly command: number = 0x0a; // 10
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 10,
		"name": "ThermostatSetpointCapabilitiesReport",
		"help": "Thermostat Setpoint Capabilities Report",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
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
				"type": "Bitfield",
				"name": "properties2",
				"help": "Properties2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "precision1",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "scale1",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "size1",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"minValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "minValue",
				"help": "Min Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties2.size1"
					}
				}
			},
			{
				"type": "Bitfield",
				"name": "properties3",
				"help": "Properties3",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "precision2",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "scale2",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "size2",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"maxValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "maxValue",
				"help": "MaxValue",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties3.size2"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatSetpointV3)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatSetpointV3ThermostatSetpointCapabilitiesReportData) {
		super(ThermostatSetpointCapabilitiesReport, data);
	}
};
