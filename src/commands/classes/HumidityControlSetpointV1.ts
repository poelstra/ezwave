/**
 * Command Class Humidity Control Setpoint, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum HumidityControlSetpointV1Commands {
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

export interface HumidityControlSetpointV1HumidityControlSetpointSetData {
	setpointType: SetpointTypeEnum; // properties1[3..0]
	precision: number; // properties2[7..5]
	scale: ScaleEnum; // properties2[4..3]
	value: Buffer; // variable length
}

export interface HumidityControlSetpointV1HumidityControlSetpointGetData {
	setpointType: SetpointTypeEnum; // properties1[3..0]
}

export interface HumidityControlSetpointV1HumidityControlSetpointReportData {
	setpointType: SetpointTypeEnum; // properties1[3..0]
	precision: number; // properties2[7..5]
	scale: ScaleEnum; // properties2[4..3]
	value: Buffer; // variable length
}

export interface HumidityControlSetpointV1HumidityControlSetpointSupportedReportData {
	bitMask: Set<BitMaskEnum>; // 1 bytes
}

export interface HumidityControlSetpointV1HumidityControlSetpointScaleSupportedGetData {
	setpointType: SetpointTypeEnum; // properties1[3..0]
}

export interface HumidityControlSetpointV1HumidityControlSetpointScaleSupportedReportData {
	scaleBitMask: ScaleBitMaskEnum; // properties1[3..0]
}

export interface HumidityControlSetpointV1HumidityControlSetpointCapabilitiesGetData {
	setpointType: SetpointTypeEnum; // properties1[3..0]
}

export interface HumidityControlSetpointV1HumidityControlSetpointCapabilitiesReportData {
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
}

export enum ScaleEnum {
	Percentage = 0x0,
	Absolute = 0x1,
}

export enum BitMaskEnum {
	Humidifier = 0x0,
	Dehumidifier = 0x1,
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

export class HumidityControlSetpointV1 extends CommandClassPacket<HumidityControlSetpointV1Commands> {
	public static readonly commandClass = CommandClasses.HumidityControlSetpoint; // 0x64 (100)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(HumidityControlSetpointV1, commandAndPayload);
	}

	public static readonly HumidityControlSetpointSet = class HumidityControlSetpointSet extends CommandPacket<HumidityControlSetpointV1HumidityControlSetpointSetData> {
		public static readonly CommandClass = HumidityControlSetpointV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlSetpointV1)?.command === this.command;
		}

		constructor(data: Buffer | HumidityControlSetpointV1HumidityControlSetpointSetData) {
			super(HumidityControlSetpointSet, data);
		}
	};

	public static readonly HumidityControlSetpointGet = class HumidityControlSetpointGet extends CommandPacket<HumidityControlSetpointV1HumidityControlSetpointGetData> {
		public static readonly CommandClass = HumidityControlSetpointV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
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
								}
							}
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlSetpointV1)?.command === this.command;
		}

		constructor(data: Buffer | HumidityControlSetpointV1HumidityControlSetpointGetData) {
			super(HumidityControlSetpointGet, data);
		}
	};

	public static readonly HumidityControlSetpointReport = class HumidityControlSetpointReport extends CommandPacket<HumidityControlSetpointV1HumidityControlSetpointReportData> {
		public static readonly CommandClass = HumidityControlSetpointV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlSetpointV1)?.command === this.command;
		}

		constructor(data: Buffer | HumidityControlSetpointV1HumidityControlSetpointReportData) {
			super(HumidityControlSetpointReport, data);
		}
	};

	public static readonly HumidityControlSetpointSupportedGet = class HumidityControlSetpointSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = HumidityControlSetpointV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "HumidityControlSetpointSupportedGet",
			"help": "Humidity Control Setpoint Supported Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlSetpointV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(HumidityControlSetpointSupportedGet, data);
		}
	};

	public static readonly HumidityControlSetpointSupportedReport = class HumidityControlSetpointSupportedReport extends CommandPacket<HumidityControlSetpointV1HumidityControlSetpointSupportedReportData> {
		public static readonly CommandClass = HumidityControlSetpointV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
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
						"0": {
							"name": "Humidifier",
							"help": "Humidifier"
						},
						"1": {
							"name": "Dehumidifier",
							"help": "Dehumidifier"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlSetpointV1)?.command === this.command;
		}

		constructor(data: Buffer | HumidityControlSetpointV1HumidityControlSetpointSupportedReportData) {
			super(HumidityControlSetpointSupportedReport, data);
		}
	};

	public static readonly HumidityControlSetpointScaleSupportedGet = class HumidityControlSetpointScaleSupportedGet extends CommandPacket<HumidityControlSetpointV1HumidityControlSetpointScaleSupportedGetData> {
		public static readonly CommandClass = HumidityControlSetpointV1;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
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
								}
							}
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlSetpointV1)?.command === this.command;
		}

		constructor(data: Buffer | HumidityControlSetpointV1HumidityControlSetpointScaleSupportedGetData) {
			super(HumidityControlSetpointScaleSupportedGet, data);
		}
	};

	public static readonly HumidityControlSetpointScaleSupportedReport = class HumidityControlSetpointScaleSupportedReport extends CommandPacket<HumidityControlSetpointV1HumidityControlSetpointScaleSupportedReportData> {
		public static readonly CommandClass = HumidityControlSetpointV1;
		public static readonly command = 0x07;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlSetpointV1)?.command === this.command;
		}

		constructor(data: Buffer | HumidityControlSetpointV1HumidityControlSetpointScaleSupportedReportData) {
			super(HumidityControlSetpointScaleSupportedReport, data);
		}
	};

	public static readonly HumidityControlSetpointCapabilitiesGet = class HumidityControlSetpointCapabilitiesGet extends CommandPacket<HumidityControlSetpointV1HumidityControlSetpointCapabilitiesGetData> {
		public static readonly CommandClass = HumidityControlSetpointV1;
		public static readonly command = 0x08;
		public static readonly definition = convertFromJsonCommand({
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
								}
							}
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlSetpointV1)?.command === this.command;
		}

		constructor(data: Buffer | HumidityControlSetpointV1HumidityControlSetpointCapabilitiesGetData) {
			super(HumidityControlSetpointCapabilitiesGet, data);
		}
	};

	public static readonly HumidityControlSetpointCapabilitiesReport = class HumidityControlSetpointCapabilitiesReport extends CommandPacket<HumidityControlSetpointV1HumidityControlSetpointCapabilitiesReportData> {
		public static readonly CommandClass = HumidityControlSetpointV1;
		public static readonly command = 0x09;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlSetpointV1)?.command === this.command;
		}

		constructor(data: Buffer | HumidityControlSetpointV1HumidityControlSetpointCapabilitiesReportData) {
			super(HumidityControlSetpointCapabilitiesReport, data);
		}
	};
}

export namespace HumidityControlSetpointV1 {
	export type HumidityControlSetpointSet = InstanceType<typeof HumidityControlSetpointV1.HumidityControlSetpointSet>;
	export type HumidityControlSetpointGet = InstanceType<typeof HumidityControlSetpointV1.HumidityControlSetpointGet>;
	export type HumidityControlSetpointReport = InstanceType<typeof HumidityControlSetpointV1.HumidityControlSetpointReport>;
	export type HumidityControlSetpointSupportedGet = InstanceType<typeof HumidityControlSetpointV1.HumidityControlSetpointSupportedGet>;
	export type HumidityControlSetpointSupportedReport = InstanceType<typeof HumidityControlSetpointV1.HumidityControlSetpointSupportedReport>;
	export type HumidityControlSetpointScaleSupportedGet = InstanceType<typeof HumidityControlSetpointV1.HumidityControlSetpointScaleSupportedGet>;
	export type HumidityControlSetpointScaleSupportedReport = InstanceType<typeof HumidityControlSetpointV1.HumidityControlSetpointScaleSupportedReport>;
	export type HumidityControlSetpointCapabilitiesGet = InstanceType<typeof HumidityControlSetpointV1.HumidityControlSetpointCapabilitiesGet>;
	export type HumidityControlSetpointCapabilitiesReport = InstanceType<typeof HumidityControlSetpointV1.HumidityControlSetpointCapabilitiesReport>;
}
