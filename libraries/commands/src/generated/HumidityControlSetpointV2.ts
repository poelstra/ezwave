/**
 * Command Class Humidity Control Setpoint, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum HumidityControlSetpointV2Commands {
	HumidityControlSetpointSet = 0x01,
	HumidityControlSetpointGet = 0x02,
	HumidityControlSetpointReport = 0x03,
	HumidityControlSetpointSupportedGet = 0x04,
	HumidityControlSetpointSupportedReport = 0x05,
	HumidityControlSetpointScaleSupportedGet = 0x06,
	HumidityControlSetpointScaleSupportedReport = 0x07,
	HumidityControlSetpointCapabilitiesGet = 0x08,
	HumidityControlSetpointCapabilitiesReport = 0x09,
}

export interface HumidityControlSetpointV2HumidityControlSetpointSetData {
	setpointType: SetpointTypeEnum; // properties1[3..0]
	precision: number; // properties2[7..5]
	scale: ScaleEnum; // properties2[4..3]
	value: Buffer; // variable length
}

export interface HumidityControlSetpointV2HumidityControlSetpointGetData {
	setpointType: SetpointTypeEnum; // properties1[3..0]
}

export interface HumidityControlSetpointV2HumidityControlSetpointReportData {
	setpointType: SetpointTypeEnum; // properties1[3..0]
	precision: number; // properties2[7..5]
	scale: ScaleEnum; // properties2[4..3]
	value: Buffer; // variable length
}

export interface HumidityControlSetpointV2HumidityControlSetpointSupportedReportData {
	bitMask: Set<BitMaskEnum>; // 1 bytes
}

export interface HumidityControlSetpointV2HumidityControlSetpointScaleSupportedGetData {
	setpointType: SetpointTypeEnum; // properties1[3..0]
}

export interface HumidityControlSetpointV2HumidityControlSetpointScaleSupportedReportData {
	scaleBitMask: ScaleBitMaskEnum; // properties1[3..0]
}

export interface HumidityControlSetpointV2HumidityControlSetpointCapabilitiesGetData {
	setpointType: SetpointTypeEnum; // properties1[3..0]
}

export interface HumidityControlSetpointV2HumidityControlSetpointCapabilitiesReportData {
	setpointType: SetpointTypeEnum; // properties1[3..0]
	precision1: number; // properties2[7..5]
	scale1: Scale1Enum; // properties2[4..3]
	minimumValue: Buffer; // variable length
	precision2: number; // properties3[7..5]
	scale2: Scale2Enum; // properties3[4..3]
	maximumValue: Buffer; // variable length
}

export enum SetpointTypeEnum {
	Humidifier = 0x1,
	Dehumidifier = 0x2,
	Auto = 0x3,
}

export enum ScaleEnum {
	Percentage = 0x0,
	Absolute = 0x1,
}

export enum BitMaskEnum {
	Humidifier = 0x1,
	Dehumidifier = 0x2,
	Auto = 0x3,
}

export enum ScaleBitMaskEnum {
	Percentage = 0x0,
	Absolute = 0x1,
}

export enum Scale1Enum {
	Percentage = 0x0,
	Absolute = 0x1,
}

export enum Scale2Enum {
	Percentage = 0x0,
	Absolute = 0x1,
}

export class HumidityControlSetpointV2 extends CommandClassPacket<HumidityControlSetpointV2Commands> {
	public static readonly commandClass: number = CommandClasses.HumidityControlSetpoint; // 0x64 (100)
	public static readonly version: number = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(HumidityControlSetpointV2, commandAndPayload);
	}
}

export class HumidityControlSetpointSet extends CommandPacket<HumidityControlSetpointV2HumidityControlSetpointSetData> {
	public static readonly CommandClass: typeof HumidityControlSetpointV2 = HumidityControlSetpointV2;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "HumidityControlSetpointSet",
		"help": "Humidity Control Setpoint Set",
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
							"1": {
								"name": "Humidifier",
								"help": "Humidifier"
							},
							"2": {
								"name": "Dehumidifier",
								"help": "Dehumidifier"
							},
							"3": {
								"name": "Auto",
								"help": "Auto"
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
						"name": "precision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Enum",
						"name": "scale",
						"mask": 24,
						"shift": 3,
						"values": {
							"0": {
								"name": "Percentage",
								"help": "Percentage"
							},
							"1": {
								"name": "Absolute",
								"help": "Absolute"
							}
						}
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
						"ref": "properties2.size"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(HumidityControlSetpointV2)?.command === this.command;
	}

	public constructor(data: Buffer | HumidityControlSetpointV2HumidityControlSetpointSetData) {
		super(HumidityControlSetpointSet, data);
	}
};

export class HumidityControlSetpointGet extends CommandPacket<HumidityControlSetpointV2HumidityControlSetpointGetData> {
	public static readonly CommandClass: typeof HumidityControlSetpointV2 = HumidityControlSetpointV2;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "HumidityControlSetpointGet",
		"help": "Humidity Control Setpoint Get",
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
							"1": {
								"name": "Humidifier",
								"help": "Humidifier"
							},
							"2": {
								"name": "Dehumidifier",
								"help": "Dehumidifier"
							},
							"3": {
								"name": "Auto",
								"help": "Auto"
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(HumidityControlSetpointV2)?.command === this.command;
	}

	public constructor(data: Buffer | HumidityControlSetpointV2HumidityControlSetpointGetData) {
		super(HumidityControlSetpointGet, data);
	}
};

export class HumidityControlSetpointReport extends CommandPacket<HumidityControlSetpointV2HumidityControlSetpointReportData> {
	public static readonly CommandClass: typeof HumidityControlSetpointV2 = HumidityControlSetpointV2;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "HumidityControlSetpointReport",
		"help": "Humidity Control Setpoint Report",
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
							"1": {
								"name": "Humidifier",
								"help": "Humidifier"
							},
							"2": {
								"name": "Dehumidifier",
								"help": "Dehumidifier"
							},
							"3": {
								"name": "Auto",
								"help": "Auto"
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
						"name": "precision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Enum",
						"name": "scale",
						"mask": 24,
						"shift": 3,
						"values": {
							"0": {
								"name": "Percentage",
								"help": "Percentage"
							},
							"1": {
								"name": "Absolute",
								"help": "Absolute"
							}
						}
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
						"ref": "properties2.size"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(HumidityControlSetpointV2)?.command === this.command;
	}

	public constructor(data: Buffer | HumidityControlSetpointV2HumidityControlSetpointReportData) {
		super(HumidityControlSetpointReport, data);
	}
};

export class HumidityControlSetpointSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof HumidityControlSetpointV2 = HumidityControlSetpointV2;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "HumidityControlSetpointSupportedGet",
		"help": "Humidity Control Setpoint Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(HumidityControlSetpointV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(HumidityControlSetpointSupportedGet, data);
	}
};

export class HumidityControlSetpointSupportedReport extends CommandPacket<HumidityControlSetpointV2HumidityControlSetpointSupportedReportData> {
	public static readonly CommandClass: typeof HumidityControlSetpointV2 = HumidityControlSetpointV2;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "HumidityControlSetpointSupportedReport",
		"help": "Humidity Control Setpoint Supported Report",
		"status": "Active",
		"params": [
			{
				"type": "Bitmask",
				"name": "bitMask",
				"help": "Bit Mask",
				"length": 1,
				"values": {
					"1": {
						"name": "Humidifier",
						"help": "Humidifier"
					},
					"2": {
						"name": "Dehumidifier",
						"help": "Dehumidifier"
					},
					"3": {
						"name": "Auto",
						"help": "Auto"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(HumidityControlSetpointV2)?.command === this.command;
	}

	public constructor(data: Buffer | HumidityControlSetpointV2HumidityControlSetpointSupportedReportData) {
		super(HumidityControlSetpointSupportedReport, data);
	}
};

export class HumidityControlSetpointScaleSupportedGet extends CommandPacket<HumidityControlSetpointV2HumidityControlSetpointScaleSupportedGetData> {
	public static readonly CommandClass: typeof HumidityControlSetpointV2 = HumidityControlSetpointV2;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 6,
		"name": "HumidityControlSetpointScaleSupportedGet",
		"help": "Humidity Control Setpoint Scale Supported Get",
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
							"1": {
								"name": "Humidifier",
								"help": "Humidifier"
							},
							"2": {
								"name": "Dehumidifier",
								"help": "Dehumidifier"
							},
							"3": {
								"name": "Auto",
								"help": "Auto"
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(HumidityControlSetpointV2)?.command === this.command;
	}

	public constructor(data: Buffer | HumidityControlSetpointV2HumidityControlSetpointScaleSupportedGetData) {
		super(HumidityControlSetpointScaleSupportedGet, data);
	}
};

export class HumidityControlSetpointScaleSupportedReport extends CommandPacket<HumidityControlSetpointV2HumidityControlSetpointScaleSupportedReportData> {
	public static readonly CommandClass: typeof HumidityControlSetpointV2 = HumidityControlSetpointV2;
	public static readonly command: number = 0x07; // 7
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 7,
		"name": "HumidityControlSetpointScaleSupportedReport",
		"help": "Humidity Control Setpoint Scale Supported Report",
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
						"name": "scaleBitMask",
						"mask": 15,
						"shift": 0,
						"values": {
							"0": {
								"name": "Percentage",
								"help": "Percentage"
							},
							"1": {
								"name": "Absolute",
								"help": "Absolute"
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(HumidityControlSetpointV2)?.command === this.command;
	}

	public constructor(data: Buffer | HumidityControlSetpointV2HumidityControlSetpointScaleSupportedReportData) {
		super(HumidityControlSetpointScaleSupportedReport, data);
	}
};

export class HumidityControlSetpointCapabilitiesGet extends CommandPacket<HumidityControlSetpointV2HumidityControlSetpointCapabilitiesGetData> {
	public static readonly CommandClass: typeof HumidityControlSetpointV2 = HumidityControlSetpointV2;
	public static readonly command: number = 0x08; // 8
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 8,
		"name": "HumidityControlSetpointCapabilitiesGet",
		"help": "Humidity Control Setpoint Capabilities Get",
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
							"1": {
								"name": "Humidifier",
								"help": "Humidifier"
							},
							"2": {
								"name": "Dehumidifier",
								"help": "Dehumidifier"
							},
							"3": {
								"name": "Auto",
								"help": "Auto"
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(HumidityControlSetpointV2)?.command === this.command;
	}

	public constructor(data: Buffer | HumidityControlSetpointV2HumidityControlSetpointCapabilitiesGetData) {
		super(HumidityControlSetpointCapabilitiesGet, data);
	}
};

export class HumidityControlSetpointCapabilitiesReport extends CommandPacket<HumidityControlSetpointV2HumidityControlSetpointCapabilitiesReportData> {
	public static readonly CommandClass: typeof HumidityControlSetpointV2 = HumidityControlSetpointV2;
	public static readonly command: number = 0x09; // 9
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 9,
		"name": "HumidityControlSetpointCapabilitiesReport",
		"help": "Humidity Control Setpoint Capabilities Report",
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
							"1": {
								"name": "Humidifier",
								"help": "Humidifier"
							},
							"2": {
								"name": "Dehumidifier",
								"help": "Dehumidifier"
							},
							"3": {
								"name": "Auto",
								"help": "Auto"
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
						"fieldType": "Enum",
						"name": "scale1",
						"mask": 24,
						"shift": 3,
						"values": {
							"0": {
								"name": "Percentage",
								"help": "Percentage"
							},
							"1": {
								"name": "Absolute",
								"help": "Absolute"
							}
						}
					},
					{
						"fieldType": "Integer",
						"name": "size1",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"minimumValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "minimumValue",
				"help": "Minimum Value",
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
						"fieldType": "Enum",
						"name": "scale2",
						"mask": 24,
						"shift": 3,
						"values": {
							"0": {
								"name": "Percentage",
								"help": "Percentage"
							},
							"1": {
								"name": "Absolute",
								"help": "Absolute"
							}
						}
					},
					{
						"fieldType": "Integer",
						"name": "size2",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"maximumValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "maximumValue",
				"help": "Maximum Value",
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
		return packet.tryAs(HumidityControlSetpointV2)?.command === this.command;
	}

	public constructor(data: Buffer | HumidityControlSetpointV2HumidityControlSetpointCapabilitiesReportData) {
		super(HumidityControlSetpointCapabilitiesReport, data);
	}
};
