/**
 * Command Class Indicator, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum IndicatorV2Commands {
	IndicatorGet = 0x02,
	IndicatorReport = 0x03,
	IndicatorSet = 0x01,
	IndicatorSupportedGet = 0x04,
	IndicatorSupportedReport = 0x05,
}

export interface IndicatorV2IndicatorGetData {
	indicatorID: IndicatorIDEnum; // 1 byte enum value
}

export interface IndicatorV2IndicatorReportData {
	indicator0Value: number; // 1 byte unsigned integer
	// TODO param properties1 type bitfield
	// TODO param vg1 type group
}

export interface IndicatorV2IndicatorSetData {
	indicator0Value: number; // 1 byte unsigned integer
	// TODO param properties1 type bitfield
	// TODO param vg1 type group
}

export interface IndicatorV2IndicatorSupportedGetData {
	indicatorID: IndicatorIDEnum; // 1 byte enum value
}

export interface IndicatorV2IndicatorSupportedReportData {
	indicatorID: IndicatorIDEnum; // 1 byte enum value
	nextIndicatorID: NextIndicatorIDEnum; // 1 byte enum value
	// TODO param properties1 type bitfield
	propertySupportedBitMask: number; // 0 byte unsigned integer
}

export class IndicatorV2 extends CommandClassPacket<IndicatorV2Commands> {
	public static readonly commandClass = CommandClasses.Indicator; // 0x87 (135)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(IndicatorV2, commandAndPayload);
	}

	public static readonly IndicatorGet = class IndicatorGet extends CommandPacket<IndicatorV2IndicatorGetData> {
		public static readonly CommandClass = IndicatorV2;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "IndicatorGet",
			"help": "Indicator Get",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "indicatorID",
					"help": "Indicator ID",
					"length": 1,
					"values": {
						"0": "NA",
						"1": "ARMED",
						"2": "NOT_ARMED",
						"3": "READY",
						"4": "FAULT",
						"5": "BUSY",
						"6": "ENTER_ID",
						"7": "ENTER_PIN",
						"8": "OK",
						"9": "NOT_OK",
						"32": "ZONE1_ARMED",
						"33": "ZONE2_ARMED",
						"34": "ZONE3_ARMED",
						"35": "ZONE4_ARMED",
						"36": "ZONE5_ARMED",
						"37": "ZONE6_ARMED",
						"48": "LCD_BACKLIGHT",
						"64": "BUTTON_BACKLIGHT_LETTERS",
						"65": "BUTTON_BACKLIGHT_DIGITS",
						"66": "BUTTON_BACKLIGHT_COMMAND",
						"67": "BUTTON1_INDICATION",
						"68": "BUTTON2_INDICATION",
						"69": "BUTTON3_INDICATION",
						"70": "BUTTON4_INDICATION",
						"71": "BUTTON5_INDICATION",
						"72": "BUTTON6_INDICATION",
						"73": "BUTTON7_INDICATION",
						"74": "BUTTON8_INDICATION",
						"75": "BUTTON9_INDICATION",
						"76": "BUTTON10_INDICATION",
						"77": "BUTTON11_INDICATION",
						"78": "BUTTON12_INDICATION",
						"240": "Buzzer"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(IndicatorV2)?.command === this.command;
		}

		constructor(data: Buffer | IndicatorV2IndicatorGetData) {
			super(IndicatorGet, data);
		}
	};

	public static readonly IndicatorReport = class IndicatorReport extends CommandPacket<IndicatorV2IndicatorReportData> {
		public static readonly CommandClass = IndicatorV2;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "IndicatorReport",
			"help": "Indicator Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "indicator0Value",
					"help": "Indicator 0 Value",
					"length": 1,
					"values": {
						"0": "off/disable",
						"255": "on/enable"
					}
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Indicator Object Count",
							"mask": 31,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"name": "Properties1",
						"mask": 31,
						"shift": 0
					},
					"params": [
						{
							"type": "enum",
							"name": "indicatorID",
							"help": "Indicator ID",
							"length": 1,
							"values": {
								"0": "NA",
								"1": "ARMED",
								"2": "NOT_ARMED",
								"3": "READY",
								"4": "FAULT",
								"5": "BUSY",
								"6": "ENTER_ID",
								"7": "ENTER_PIN",
								"8": "OK",
								"9": "NOT_OK",
								"32": "ZONE1_ARMED",
								"33": "ZONE2_ARMED",
								"34": "ZONE3_ARMED",
								"35": "ZONE4_ARMED",
								"36": "ZONE5_ARMED",
								"37": "ZONE6_ARMED",
								"48": "LCD_BACKLIGHT",
								"64": "BUTTON_BACKLIGHT_LETTERS",
								"65": "BUTTON_BACKLIGHT_DIGITS",
								"66": "BUTTON_BACKLIGHT_COMMAND",
								"67": "BUTTON1_INDICATION",
								"68": "BUTTON2_INDICATION",
								"69": "BUTTON3_INDICATION",
								"70": "BUTTON4_INDICATION",
								"71": "BUTTON5_INDICATION",
								"72": "BUTTON6_INDICATION",
								"73": "BUTTON7_INDICATION",
								"74": "BUTTON8_INDICATION",
								"75": "BUTTON9_INDICATION",
								"76": "BUTTON10_INDICATION",
								"77": "BUTTON11_INDICATION",
								"78": "BUTTON12_INDICATION",
								"240": "Buzzer"
							}
						},
						{
							"type": "enum",
							"name": "propertyID",
							"help": "Property ID",
							"length": 1,
							"values": {
								"1": "Multilevel",
								"2": "Binary",
								"3": "On_Off_Period",
								"4": "On_Off_Cycles",
								"16": "Low_power"
							}
						},
						{
							"type": "integer",
							"name": "value",
							"help": "Value",
							"length": 1
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(IndicatorV2)?.command === this.command;
		}

		constructor(data: Buffer | IndicatorV2IndicatorReportData) {
			super(IndicatorReport, data);
		}
	};

	public static readonly IndicatorSet = class IndicatorSet extends CommandPacket<IndicatorV2IndicatorSetData> {
		public static readonly CommandClass = IndicatorV2;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "IndicatorSet",
			"help": "Indicator Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "indicator0Value",
					"help": "Indicator 0 Value",
					"length": 1,
					"values": {
						"0": "off/disable",
						"255": "on/enable"
					}
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Indicator Object Count",
							"mask": 31,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"name": "Properties1",
						"mask": 31,
						"shift": 0
					},
					"params": [
						{
							"type": "enum",
							"name": "indicatorID",
							"help": "Indicator ID",
							"length": 1,
							"values": {
								"0": "NA",
								"1": "ARMED",
								"2": "NOT_ARMED",
								"3": "READY",
								"4": "FAULT",
								"5": "BUSY",
								"6": "ENTER_ID",
								"7": "ENTER_PIN",
								"8": "OK",
								"9": "NOT_OK",
								"32": "ZONE1_ARMED",
								"33": "ZONE2_ARMED",
								"34": "ZONE3_ARMED",
								"35": "ZONE4_ARMED",
								"36": "ZONE5_ARMED",
								"37": "ZONE6_ARMED",
								"48": "LCD_BACKLIGHT",
								"64": "BUTTON_BACKLIGHT_LETTERS",
								"65": "BUTTON_BACKLIGHT_DIGITS",
								"66": "BUTTON_BACKLIGHT_COMMAND",
								"67": "BUTTON1_INDICATION",
								"68": "BUTTON2_INDICATION",
								"69": "BUTTON3_INDICATION",
								"70": "BUTTON4_INDICATION",
								"71": "BUTTON5_INDICATION",
								"72": "BUTTON6_INDICATION",
								"73": "BUTTON7_INDICATION",
								"74": "BUTTON8_INDICATION",
								"75": "BUTTON9_INDICATION",
								"76": "BUTTON10_INDICATION",
								"77": "BUTTON11_INDICATION",
								"78": "BUTTON12_INDICATION",
								"240": "Buzzer"
							}
						},
						{
							"type": "enum",
							"name": "propertyID",
							"help": "Property ID",
							"length": 1,
							"values": {
								"1": "Multilevel",
								"2": "Binary",
								"3": "On_Off_Period",
								"4": "On_Off_Cycles",
								"16": "Low_power"
							}
						},
						{
							"type": "integer",
							"name": "value",
							"help": "Value",
							"length": 1
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(IndicatorV2)?.command === this.command;
		}

		constructor(data: Buffer | IndicatorV2IndicatorSetData) {
			super(IndicatorSet, data);
		}
	};

	public static readonly IndicatorSupportedGet = class IndicatorSupportedGet extends CommandPacket<IndicatorV2IndicatorSupportedGetData> {
		public static readonly CommandClass = IndicatorV2;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "IndicatorSupportedGet",
			"help": "Indicator Supported Get",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "indicatorID",
					"help": "Indicator ID",
					"length": 1,
					"values": {
						"0": "NA",
						"1": "ARMED",
						"2": "NOT_ARMED",
						"3": "READY",
						"4": "FAULT",
						"5": "BUSY",
						"6": "ENTER_ID",
						"7": "ENTER_PIN",
						"8": "OK",
						"9": "NOT_OK",
						"32": "ZONE1_ARMED",
						"33": "ZONE2_ARMED",
						"34": "ZONE3_ARMED",
						"35": "ZONE4_ARMED",
						"36": "ZONE5_ARMED",
						"37": "ZONE6_ARMED",
						"48": "LCD_BACKLIGHT",
						"64": "BUTTON_BACKLIGHT_LETTERS",
						"65": "BUTTON_BACKLIGHT_DIGITS",
						"66": "BUTTON_BACKLIGHT_COMMAND",
						"67": "BUTTON1_INDICATION",
						"68": "BUTTON2_INDICATION",
						"69": "BUTTON3_INDICATION",
						"70": "BUTTON4_INDICATION",
						"71": "BUTTON5_INDICATION",
						"72": "BUTTON6_INDICATION",
						"73": "BUTTON7_INDICATION",
						"74": "BUTTON8_INDICATION",
						"75": "BUTTON9_INDICATION",
						"76": "BUTTON10_INDICATION",
						"77": "BUTTON11_INDICATION",
						"78": "BUTTON12_INDICATION",
						"240": "Buzzer"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(IndicatorV2)?.command === this.command;
		}

		constructor(data: Buffer | IndicatorV2IndicatorSupportedGetData) {
			super(IndicatorSupportedGet, data);
		}
	};

	public static readonly IndicatorSupportedReport = class IndicatorSupportedReport extends CommandPacket<IndicatorV2IndicatorSupportedReportData> {
		public static readonly CommandClass = IndicatorV2;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "IndicatorSupportedReport",
			"help": "Indicator Supported Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "indicatorID",
					"help": "Indicator ID",
					"length": 1,
					"values": {
						"0": "NA",
						"1": "ARMED",
						"2": "NOT_ARMED",
						"3": "READY",
						"4": "FAULT",
						"5": "BUSY",
						"6": "ENTER_ID",
						"7": "ENTER_PIN",
						"8": "OK",
						"9": "NOT_OK",
						"32": "ZONE1_ARMED",
						"33": "ZONE2_ARMED",
						"34": "ZONE3_ARMED",
						"35": "ZONE4_ARMED",
						"36": "ZONE5_ARMED",
						"37": "ZONE6_ARMED",
						"48": "LCD_BACKLIGHT",
						"64": "BUTTON_BACKLIGHT_LETTERS",
						"65": "BUTTON_BACKLIGHT_DIGITS",
						"66": "BUTTON_BACKLIGHT_COMMAND",
						"67": "BUTTON1_INDICATION",
						"68": "BUTTON2_INDICATION",
						"69": "BUTTON3_INDICATION",
						"70": "BUTTON4_INDICATION",
						"71": "BUTTON5_INDICATION",
						"72": "BUTTON6_INDICATION",
						"73": "BUTTON7_INDICATION",
						"74": "BUTTON8_INDICATION",
						"75": "BUTTON9_INDICATION",
						"76": "BUTTON10_INDICATION",
						"77": "BUTTON11_INDICATION",
						"78": "BUTTON12_INDICATION",
						"240": "Buzzer"
					}
				},
				{
					"type": "enum",
					"name": "nextIndicatorID",
					"help": "Next Indicator ID",
					"length": 1,
					"values": {
						"0": "NA",
						"1": "ARMED",
						"2": "NOT_ARMED",
						"3": "READY",
						"4": "FAULT",
						"5": "BUSY",
						"6": "ENTER_ID",
						"7": "ENTER_PIN",
						"8": "OK",
						"9": "NOT_OK",
						"32": "ZONE1_ARMED",
						"33": "ZONE2_ARMED",
						"34": "ZONE3_ARMED",
						"35": "ZONE4_ARMED",
						"36": "ZONE5_ARMED",
						"37": "ZONE6_ARMED",
						"48": "LCD_BACKLIGHT",
						"64": "BUTTON_BACKLIGHT_LETTERS",
						"65": "BUTTON_BACKLIGHT_DIGITS",
						"66": "BUTTON_BACKLIGHT_COMMAND",
						"67": "BUTTON1_INDICATION",
						"68": "BUTTON2_INDICATION",
						"69": "BUTTON3_INDICATION",
						"70": "BUTTON4_INDICATION",
						"71": "BUTTON5_INDICATION",
						"72": "BUTTON6_INDICATION",
						"73": "BUTTON7_INDICATION",
						"74": "BUTTON8_INDICATION",
						"75": "BUTTON9_INDICATION",
						"76": "BUTTON10_INDICATION",
						"77": "BUTTON11_INDICATION",
						"78": "BUTTON12_INDICATION",
						"240": "Buzzer"
					}
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Property Supported Bit Mask Length",
							"mask": 31,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "integer",
					"name": "propertySupportedBitMask",
					"help": "Property Supported Bit Mask",
					"length": 0
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(IndicatorV2)?.command === this.command;
		}

		constructor(data: Buffer | IndicatorV2IndicatorSupportedReportData) {
			super(IndicatorSupportedReport, data);
		}
	};
}

export namespace IndicatorV2 {
	export type IndicatorGet = InstanceType<typeof IndicatorV2.IndicatorGet>;
	export type IndicatorReport = InstanceType<typeof IndicatorV2.IndicatorReport>;
	export type IndicatorSet = InstanceType<typeof IndicatorV2.IndicatorSet>;
	export type IndicatorSupportedGet = InstanceType<typeof IndicatorV2.IndicatorSupportedGet>;
	export type IndicatorSupportedReport = InstanceType<typeof IndicatorV2.IndicatorSupportedReport>;
}

export enum IndicatorIDEnum {
	Na = 0x0,
	Armed = 0x1,
	NotArmed = 0x2,
	Ready = 0x3,
	Fault = 0x4,
	Busy = 0x5,
	EnterId = 0x6,
	EnterPin = 0x7,
	Ok = 0x8,
	NotOk = 0x9,
	Zone1Armed = 0x20,
	Zone2Armed = 0x21,
	Zone3Armed = 0x22,
	Zone4Armed = 0x23,
	Zone5Armed = 0x24,
	Zone6Armed = 0x25,
	LcdBacklight = 0x30,
	ButtonBacklightLetters = 0x40,
	ButtonBacklightDigits = 0x41,
	ButtonBacklightCommand = 0x42,
	Button1Indication = 0x43,
	Button2Indication = 0x44,
	Button3Indication = 0x45,
	Button4Indication = 0x46,
	Button5Indication = 0x47,
	Button6Indication = 0x48,
	Button7Indication = 0x49,
	Button8Indication = 0x4a,
	Button9Indication = 0x4b,
	Button10Indication = 0x4c,
	Button11Indication = 0x4d,
	Button12Indication = 0x4e,
	Buzzer = 0xf0,
}

export enum NextIndicatorIDEnum {
	Na = 0x0,
	Armed = 0x1,
	NotArmed = 0x2,
	Ready = 0x3,
	Fault = 0x4,
	Busy = 0x5,
	EnterId = 0x6,
	EnterPin = 0x7,
	Ok = 0x8,
	NotOk = 0x9,
	Zone1Armed = 0x20,
	Zone2Armed = 0x21,
	Zone3Armed = 0x22,
	Zone4Armed = 0x23,
	Zone5Armed = 0x24,
	Zone6Armed = 0x25,
	LcdBacklight = 0x30,
	ButtonBacklightLetters = 0x40,
	ButtonBacklightDigits = 0x41,
	ButtonBacklightCommand = 0x42,
	Button1Indication = 0x43,
	Button2Indication = 0x44,
	Button3Indication = 0x45,
	Button4Indication = 0x46,
	Button5Indication = 0x47,
	Button6Indication = 0x48,
	Button7Indication = 0x49,
	Button8Indication = 0x4a,
	Button9Indication = 0x4b,
	Button10Indication = 0x4c,
	Button11Indication = 0x4d,
	Button12Indication = 0x4e,
	Buzzer = 0xf0,
}
