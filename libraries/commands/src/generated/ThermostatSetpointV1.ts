/**
 * Command Class Thermostat Setpoint, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	bitMask: Set<BitMaskEnum>; // automatic length
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

export enum BitMaskEnum {
	None = 0x0,
	Heating = 0x1,
	Cooling = 0x2,
	Furnace = 0x7,
	DryAir = 0x8,
	MoistAir = 0x9,
	AutoChangeover = 0xa,
}

export class ThermostatSetpointV1 extends CommandClassPacket<ThermostatSetpointV1Commands> {
	public static readonly commandClass: number = CommandClasses.ThermostatSetpoint; // 0x43 (67)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ThermostatSetpointV1, commandAndPayload);
	}
}

export class ThermostatSetpointGet extends CommandPacket<ThermostatSetpointV1ThermostatSetpointGetData> {
	public static readonly CommandClass: typeof ThermostatSetpointV1 = ThermostatSetpointV1;
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
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatSetpointV1)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatSetpointV1ThermostatSetpointGetData) {
		super(ThermostatSetpointGet, data);
	}
};

export class ThermostatSetpointReport extends CommandPacket<ThermostatSetpointV1ThermostatSetpointReportData> {
	public static readonly CommandClass: typeof ThermostatSetpointV1 = ThermostatSetpointV1;
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
		return packet.tryAs(ThermostatSetpointV1)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatSetpointV1ThermostatSetpointReportData) {
		super(ThermostatSetpointReport, data);
	}
};

export class ThermostatSetpointSet extends CommandPacket<ThermostatSetpointV1ThermostatSetpointSetData> {
	public static readonly CommandClass: typeof ThermostatSetpointV1 = ThermostatSetpointV1;
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
		return packet.tryAs(ThermostatSetpointV1)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatSetpointV1ThermostatSetpointSetData) {
		super(ThermostatSetpointSet, data);
	}
};

export class ThermostatSetpointSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof ThermostatSetpointV1 = ThermostatSetpointV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "ThermostatSetpointSupportedGet",
		"help": "Thermostat Setpoint Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatSetpointV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ThermostatSetpointSupportedGet, data);
	}
};

export class ThermostatSetpointSupportedReport extends CommandPacket<ThermostatSetpointV1ThermostatSetpointSupportedReportData> {
	public static readonly CommandClass: typeof ThermostatSetpointV1 = ThermostatSetpointV1;
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
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatSetpointV1)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatSetpointV1ThermostatSetpointSupportedReportData) {
		super(ThermostatSetpointSupportedReport, data);
	}
};
