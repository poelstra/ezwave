/**
 * Command Class Humidity Control Setpoint, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

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
	// TODO param bitMask type bitmask or marker
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
	public static readonly commandClass = CommandClasses.HumidityControlSetpoint; // 0x64 (100)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(HumidityControlSetpointV2, commandAndPayload);
	}

	public static readonly HumidityControlSetpointSet = class HumidityControlSetpointSet extends CommandPacket<HumidityControlSetpointV2HumidityControlSetpointSetData> {
		public static readonly CommandClass = HumidityControlSetpointV2;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "HumidityControlSetpointSet",
			"help": "Humidity Control Setpoint Set",
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
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "precision",
							"mask": 224,
							"shift": 5
						},
						{
							"type": "enum",
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
						"lengthType": "ref",
						"ref": "properties2",
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
			return packet.tryAs(HumidityControlSetpointV2)?.command === this.command;
		}

		constructor(data: Buffer | HumidityControlSetpointV2HumidityControlSetpointSetData) {
			super(HumidityControlSetpointSet, data);
		}
	};

	public static readonly HumidityControlSetpointGet = class HumidityControlSetpointGet extends CommandPacket<HumidityControlSetpointV2HumidityControlSetpointGetData> {
		public static readonly CommandClass = HumidityControlSetpointV2;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "HumidityControlSetpointGet",
			"help": "Humidity Control Setpoint Get",
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
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlSetpointV2)?.command === this.command;
		}

		constructor(data: Buffer | HumidityControlSetpointV2HumidityControlSetpointGetData) {
			super(HumidityControlSetpointGet, data);
		}
	};

	public static readonly HumidityControlSetpointReport = class HumidityControlSetpointReport extends CommandPacket<HumidityControlSetpointV2HumidityControlSetpointReportData> {
		public static readonly CommandClass = HumidityControlSetpointV2;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "HumidityControlSetpointReport",
			"help": "Humidity Control Setpoint Report",
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
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "precision",
							"mask": 224,
							"shift": 5
						},
						{
							"type": "enum",
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
						"lengthType": "ref",
						"ref": "properties2",
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
			return packet.tryAs(HumidityControlSetpointV2)?.command === this.command;
		}

		constructor(data: Buffer | HumidityControlSetpointV2HumidityControlSetpointReportData) {
			super(HumidityControlSetpointReport, data);
		}
	};

	public static readonly HumidityControlSetpointSupportedGet = class HumidityControlSetpointSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = HumidityControlSetpointV2;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "HumidityControlSetpointSupportedGet",
			"help": "Humidity Control Setpoint Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlSetpointV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(HumidityControlSetpointSupportedGet, data);
		}
	};

	public static readonly HumidityControlSetpointSupportedReport = class HumidityControlSetpointSupportedReport extends CommandPacket<HumidityControlSetpointV2HumidityControlSetpointSupportedReportData> {
		public static readonly CommandClass = HumidityControlSetpointV2;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "HumidityControlSetpointSupportedReport",
			"help": "Humidity Control Setpoint Supported Report",
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
			return packet.tryAs(HumidityControlSetpointV2)?.command === this.command;
		}

		constructor(data: Buffer | HumidityControlSetpointV2HumidityControlSetpointSupportedReportData) {
			super(HumidityControlSetpointSupportedReport, data);
		}
	};

	public static readonly HumidityControlSetpointScaleSupportedGet = class HumidityControlSetpointScaleSupportedGet extends CommandPacket<HumidityControlSetpointV2HumidityControlSetpointScaleSupportedGetData> {
		public static readonly CommandClass = HumidityControlSetpointV2;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "HumidityControlSetpointScaleSupportedGet",
			"help": "Humidity Control Setpoint Scale Supported Get",
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
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlSetpointV2)?.command === this.command;
		}

		constructor(data: Buffer | HumidityControlSetpointV2HumidityControlSetpointScaleSupportedGetData) {
			super(HumidityControlSetpointScaleSupportedGet, data);
		}
	};

	public static readonly HumidityControlSetpointScaleSupportedReport = class HumidityControlSetpointScaleSupportedReport extends CommandPacket<HumidityControlSetpointV2HumidityControlSetpointScaleSupportedReportData> {
		public static readonly CommandClass = HumidityControlSetpointV2;
		public static readonly command = 0x07;
		public static readonly definition = {
			"command": 7,
			"name": "HumidityControlSetpointScaleSupportedReport",
			"help": "Humidity Control Setpoint Scale Supported Report",
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
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlSetpointV2)?.command === this.command;
		}

		constructor(data: Buffer | HumidityControlSetpointV2HumidityControlSetpointScaleSupportedReportData) {
			super(HumidityControlSetpointScaleSupportedReport, data);
		}
	};

	public static readonly HumidityControlSetpointCapabilitiesGet = class HumidityControlSetpointCapabilitiesGet extends CommandPacket<HumidityControlSetpointV2HumidityControlSetpointCapabilitiesGetData> {
		public static readonly CommandClass = HumidityControlSetpointV2;
		public static readonly command = 0x08;
		public static readonly definition = {
			"command": 8,
			"name": "HumidityControlSetpointCapabilitiesGet",
			"help": "Humidity Control Setpoint Capabilities Get",
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
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlSetpointV2)?.command === this.command;
		}

		constructor(data: Buffer | HumidityControlSetpointV2HumidityControlSetpointCapabilitiesGetData) {
			super(HumidityControlSetpointCapabilitiesGet, data);
		}
	};

	public static readonly HumidityControlSetpointCapabilitiesReport = class HumidityControlSetpointCapabilitiesReport extends CommandPacket<HumidityControlSetpointV2HumidityControlSetpointCapabilitiesReportData> {
		public static readonly CommandClass = HumidityControlSetpointV2;
		public static readonly command = 0x09;
		public static readonly definition = {
			"command": 9,
			"name": "HumidityControlSetpointCapabilitiesReport",
			"help": "Humidity Control Setpoint Capabilities Report",
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
							"type": "enum",
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
							"type": "integer",
							"name": "size1",
							"mask": 7,
							"shift": 0,
							"lengthOf": {
								"refs": [
									{
										"name": "minimumValue"
									}
								]
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "minimumValue",
					"help": "Minimum Value",
					"length": {
						"lengthType": "ref",
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
							"type": "enum",
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
							"type": "integer",
							"name": "size2",
							"mask": 7,
							"shift": 0,
							"lengthOf": {
								"refs": [
									{
										"name": "maximumValue"
									}
								]
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "maximumValue",
					"help": "Maximum Value",
					"length": {
						"lengthType": "ref",
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
			return packet.tryAs(HumidityControlSetpointV2)?.command === this.command;
		}

		constructor(data: Buffer | HumidityControlSetpointV2HumidityControlSetpointCapabilitiesReportData) {
			super(HumidityControlSetpointCapabilitiesReport, data);
		}
	};
}

export namespace HumidityControlSetpointV2 {
	export type HumidityControlSetpointSet = InstanceType<typeof HumidityControlSetpointV2.HumidityControlSetpointSet>;
	export type HumidityControlSetpointGet = InstanceType<typeof HumidityControlSetpointV2.HumidityControlSetpointGet>;
	export type HumidityControlSetpointReport = InstanceType<typeof HumidityControlSetpointV2.HumidityControlSetpointReport>;
	export type HumidityControlSetpointSupportedGet = InstanceType<typeof HumidityControlSetpointV2.HumidityControlSetpointSupportedGet>;
	export type HumidityControlSetpointSupportedReport = InstanceType<typeof HumidityControlSetpointV2.HumidityControlSetpointSupportedReport>;
	export type HumidityControlSetpointScaleSupportedGet = InstanceType<typeof HumidityControlSetpointV2.HumidityControlSetpointScaleSupportedGet>;
	export type HumidityControlSetpointScaleSupportedReport = InstanceType<typeof HumidityControlSetpointV2.HumidityControlSetpointScaleSupportedReport>;
	export type HumidityControlSetpointCapabilitiesGet = InstanceType<typeof HumidityControlSetpointV2.HumidityControlSetpointCapabilitiesGet>;
	export type HumidityControlSetpointCapabilitiesReport = InstanceType<typeof HumidityControlSetpointV2.HumidityControlSetpointCapabilitiesReport>;
}
