/**
 * Command Class Indicator, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum IndicatorV3Commands {
	IndicatorGet = 0x02,
	IndicatorReport = 0x03,
	IndicatorSet = 0x01,
	IndicatorSupportedGet = 0x04,
	IndicatorSupportedReport = 0x05,
}

export interface IndicatorV3IndicatorGetData {
	indicatorID: IndicatorIDEnum; // 1 byte enum value
}

export interface IndicatorV3IndicatorReportData {
	indicator0Value: number; // 1 byte unsigned integer
	// TODO param vg1 type group
}

export interface IndicatorV3IndicatorSetData {
	indicator0Value: number; // 1 byte unsigned integer
	// TODO param vg1 type group
}

export interface IndicatorV3IndicatorSupportedGetData {
	indicatorID: IndicatorIDEnum; // 1 byte enum value
}

export interface IndicatorV3IndicatorSupportedReportData {
	indicatorID: IndicatorIDEnum; // 1 byte enum value
	nextIndicatorID: NextIndicatorIDEnum; // 1 byte enum value
	propertySupportedBitMaskLength: number; // properties1[4..0]
	// TODO param propertySupportedBitMask type bitmask or marker
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
	NodeIdentify = 0x50,
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
	NodeIdentify = 0x50,
	Buzzer = 0xf0,
}

export class IndicatorV3 extends CommandClassPacket<IndicatorV3Commands> {
	public static readonly commandClass = CommandClasses.Indicator; // 0x87 (135)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(IndicatorV3, commandAndPayload);
	}

	public static readonly IndicatorGet = class IndicatorGet extends CommandPacket<IndicatorV3IndicatorGetData> {
		public static readonly CommandClass = IndicatorV3;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
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
						"0": {
							"name": "Na",
							"help": "NA"
						},
						"1": {
							"name": "Armed",
							"help": "ARMED"
						},
						"2": {
							"name": "NotArmed",
							"help": "NOT_ARMED"
						},
						"3": {
							"name": "Ready",
							"help": "READY"
						},
						"4": {
							"name": "Fault",
							"help": "FAULT"
						},
						"5": {
							"name": "Busy",
							"help": "BUSY"
						},
						"6": {
							"name": "EnterId",
							"help": "ENTER_ID"
						},
						"7": {
							"name": "EnterPin",
							"help": "ENTER_PIN"
						},
						"8": {
							"name": "Ok",
							"help": "OK"
						},
						"9": {
							"name": "NotOk",
							"help": "NOT_OK"
						},
						"32": {
							"name": "Zone1Armed",
							"help": "ZONE1_ARMED"
						},
						"33": {
							"name": "Zone2Armed",
							"help": "ZONE2_ARMED"
						},
						"34": {
							"name": "Zone3Armed",
							"help": "ZONE3_ARMED"
						},
						"35": {
							"name": "Zone4Armed",
							"help": "ZONE4_ARMED"
						},
						"36": {
							"name": "Zone5Armed",
							"help": "ZONE5_ARMED"
						},
						"37": {
							"name": "Zone6Armed",
							"help": "ZONE6_ARMED"
						},
						"48": {
							"name": "LcdBacklight",
							"help": "LCD_BACKLIGHT"
						},
						"64": {
							"name": "ButtonBacklightLetters",
							"help": "BUTTON_BACKLIGHT_LETTERS"
						},
						"65": {
							"name": "ButtonBacklightDigits",
							"help": "BUTTON_BACKLIGHT_DIGITS"
						},
						"66": {
							"name": "ButtonBacklightCommand",
							"help": "BUTTON_BACKLIGHT_COMMAND"
						},
						"67": {
							"name": "Button1Indication",
							"help": "BUTTON1_INDICATION"
						},
						"68": {
							"name": "Button2Indication",
							"help": "BUTTON2_INDICATION"
						},
						"69": {
							"name": "Button3Indication",
							"help": "BUTTON3_INDICATION"
						},
						"70": {
							"name": "Button4Indication",
							"help": "BUTTON4_INDICATION"
						},
						"71": {
							"name": "Button5Indication",
							"help": "BUTTON5_INDICATION"
						},
						"72": {
							"name": "Button6Indication",
							"help": "BUTTON6_INDICATION"
						},
						"73": {
							"name": "Button7Indication",
							"help": "BUTTON7_INDICATION"
						},
						"74": {
							"name": "Button8Indication",
							"help": "BUTTON8_INDICATION"
						},
						"75": {
							"name": "Button9Indication",
							"help": "BUTTON9_INDICATION"
						},
						"76": {
							"name": "Button10Indication",
							"help": "BUTTON10_INDICATION"
						},
						"77": {
							"name": "Button11Indication",
							"help": "BUTTON11_INDICATION"
						},
						"78": {
							"name": "Button12Indication",
							"help": "BUTTON12_INDICATION"
						},
						"80": {
							"name": "NodeIdentify",
							"help": "Node Identify"
						},
						"240": {
							"name": "Buzzer",
							"help": "Buzzer"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(IndicatorV3)?.command === this.command;
		}

		constructor(data: Buffer | IndicatorV3IndicatorGetData) {
			super(IndicatorGet, data);
		}
	};

	// TODO This command is not yet fully supported by the decoder/encoder
	public static readonly IndicatorReport = class IndicatorReport extends CommandPacket<IndicatorV3IndicatorReportData> {
		public static readonly CommandClass = IndicatorV3;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
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
						"0": {
							"name": "OffDisable",
							"help": "off/disable"
						},
						"255": {
							"name": "OnEnable",
							"help": "on/enable"
						}
					}
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "reserved",
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "indicatorObjectCount",
							"mask": 31,
							"shift": 0,
							"lengthOf": {
								"refs": [
									"vg1"
								]
							},
							"isAutogenerated": true
						}
					]
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"lengthType": "ref",
						"from": {
							"ref": "properties1.indicatorObjectCount"
						}
					},
					"params": [
						{
							"type": "enum",
							"name": "indicatorID",
							"help": "Indicator ID",
							"length": 1,
							"values": {
								"0": {
									"name": "Na",
									"help": "NA"
								},
								"1": {
									"name": "Armed",
									"help": "ARMED"
								},
								"2": {
									"name": "NotArmed",
									"help": "NOT_ARMED"
								},
								"3": {
									"name": "Ready",
									"help": "READY"
								},
								"4": {
									"name": "Fault",
									"help": "FAULT"
								},
								"5": {
									"name": "Busy",
									"help": "BUSY"
								},
								"6": {
									"name": "EnterId",
									"help": "ENTER_ID"
								},
								"7": {
									"name": "EnterPin",
									"help": "ENTER_PIN"
								},
								"8": {
									"name": "Ok",
									"help": "OK"
								},
								"9": {
									"name": "NotOk",
									"help": "NOT_OK"
								},
								"32": {
									"name": "Zone1Armed",
									"help": "ZONE1_ARMED"
								},
								"33": {
									"name": "Zone2Armed",
									"help": "ZONE2_ARMED"
								},
								"34": {
									"name": "Zone3Armed",
									"help": "ZONE3_ARMED"
								},
								"35": {
									"name": "Zone4Armed",
									"help": "ZONE4_ARMED"
								},
								"36": {
									"name": "Zone5Armed",
									"help": "ZONE5_ARMED"
								},
								"37": {
									"name": "Zone6Armed",
									"help": "ZONE6_ARMED"
								},
								"48": {
									"name": "LcdBacklight",
									"help": "LCD_BACKLIGHT"
								},
								"64": {
									"name": "ButtonBacklightLetters",
									"help": "BUTTON_BACKLIGHT_LETTERS"
								},
								"65": {
									"name": "ButtonBacklightDigits",
									"help": "BUTTON_BACKLIGHT_DIGITS"
								},
								"66": {
									"name": "ButtonBacklightCommand",
									"help": "BUTTON_BACKLIGHT_COMMAND"
								},
								"67": {
									"name": "Button1Indication",
									"help": "BUTTON1_INDICATION"
								},
								"68": {
									"name": "Button2Indication",
									"help": "BUTTON2_INDICATION"
								},
								"69": {
									"name": "Button3Indication",
									"help": "BUTTON3_INDICATION"
								},
								"70": {
									"name": "Button4Indication",
									"help": "BUTTON4_INDICATION"
								},
								"71": {
									"name": "Button5Indication",
									"help": "BUTTON5_INDICATION"
								},
								"72": {
									"name": "Button6Indication",
									"help": "BUTTON6_INDICATION"
								},
								"73": {
									"name": "Button7Indication",
									"help": "BUTTON7_INDICATION"
								},
								"74": {
									"name": "Button8Indication",
									"help": "BUTTON8_INDICATION"
								},
								"75": {
									"name": "Button9Indication",
									"help": "BUTTON9_INDICATION"
								},
								"76": {
									"name": "Button10Indication",
									"help": "BUTTON10_INDICATION"
								},
								"77": {
									"name": "Button11Indication",
									"help": "BUTTON11_INDICATION"
								},
								"78": {
									"name": "Button12Indication",
									"help": "BUTTON12_INDICATION"
								},
								"80": {
									"name": "NodeIdentify",
									"help": "Node Identify"
								},
								"240": {
									"name": "Buzzer",
									"help": "Buzzer"
								}
							}
						},
						{
							"type": "enum",
							"name": "propertyID",
							"help": "Property ID",
							"length": 1,
							"values": {
								"1": {
									"name": "Multilevel",
									"help": "Multilevel"
								},
								"2": {
									"name": "Binary",
									"help": "Binary"
								},
								"3": {
									"name": "OnOffPeriod",
									"help": "On_Off_Period"
								},
								"4": {
									"name": "OnOffCycles",
									"help": "On_Off_Cycles"
								},
								"5": {
									"name": "OneTimeOnOffPeriod",
									"help": "One_Time_On_Off_Period"
								},
								"16": {
									"name": "LowPower",
									"help": "Low_power"
								}
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(IndicatorV3)?.command === this.command;
		}

		constructor(data: Buffer | IndicatorV3IndicatorReportData) {
			super(IndicatorReport, data);
		}
	};

	// TODO This command is not yet fully supported by the decoder/encoder
	public static readonly IndicatorSet = class IndicatorSet extends CommandPacket<IndicatorV3IndicatorSetData> {
		public static readonly CommandClass = IndicatorV3;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
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
						"0": {
							"name": "OffDisable",
							"help": "off/disable"
						},
						"255": {
							"name": "OnEnable",
							"help": "on/enable"
						}
					}
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "reserved",
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "indicatorObjectCount",
							"mask": 31,
							"shift": 0,
							"lengthOf": {
								"refs": [
									"vg1"
								]
							},
							"isAutogenerated": true
						}
					]
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"lengthType": "ref",
						"from": {
							"ref": "properties1.indicatorObjectCount"
						}
					},
					"params": [
						{
							"type": "enum",
							"name": "indicatorID",
							"help": "Indicator ID",
							"length": 1,
							"values": {
								"0": {
									"name": "Na",
									"help": "NA"
								},
								"1": {
									"name": "Armed",
									"help": "ARMED"
								},
								"2": {
									"name": "NotArmed",
									"help": "NOT_ARMED"
								},
								"3": {
									"name": "Ready",
									"help": "READY"
								},
								"4": {
									"name": "Fault",
									"help": "FAULT"
								},
								"5": {
									"name": "Busy",
									"help": "BUSY"
								},
								"6": {
									"name": "EnterId",
									"help": "ENTER_ID"
								},
								"7": {
									"name": "EnterPin",
									"help": "ENTER_PIN"
								},
								"8": {
									"name": "Ok",
									"help": "OK"
								},
								"9": {
									"name": "NotOk",
									"help": "NOT_OK"
								},
								"32": {
									"name": "Zone1Armed",
									"help": "ZONE1_ARMED"
								},
								"33": {
									"name": "Zone2Armed",
									"help": "ZONE2_ARMED"
								},
								"34": {
									"name": "Zone3Armed",
									"help": "ZONE3_ARMED"
								},
								"35": {
									"name": "Zone4Armed",
									"help": "ZONE4_ARMED"
								},
								"36": {
									"name": "Zone5Armed",
									"help": "ZONE5_ARMED"
								},
								"37": {
									"name": "Zone6Armed",
									"help": "ZONE6_ARMED"
								},
								"48": {
									"name": "LcdBacklight",
									"help": "LCD_BACKLIGHT"
								},
								"64": {
									"name": "ButtonBacklightLetters",
									"help": "BUTTON_BACKLIGHT_LETTERS"
								},
								"65": {
									"name": "ButtonBacklightDigits",
									"help": "BUTTON_BACKLIGHT_DIGITS"
								},
								"66": {
									"name": "ButtonBacklightCommand",
									"help": "BUTTON_BACKLIGHT_COMMAND"
								},
								"67": {
									"name": "Button1Indication",
									"help": "BUTTON1_INDICATION"
								},
								"68": {
									"name": "Button2Indication",
									"help": "BUTTON2_INDICATION"
								},
								"69": {
									"name": "Button3Indication",
									"help": "BUTTON3_INDICATION"
								},
								"70": {
									"name": "Button4Indication",
									"help": "BUTTON4_INDICATION"
								},
								"71": {
									"name": "Button5Indication",
									"help": "BUTTON5_INDICATION"
								},
								"72": {
									"name": "Button6Indication",
									"help": "BUTTON6_INDICATION"
								},
								"73": {
									"name": "Button7Indication",
									"help": "BUTTON7_INDICATION"
								},
								"74": {
									"name": "Button8Indication",
									"help": "BUTTON8_INDICATION"
								},
								"75": {
									"name": "Button9Indication",
									"help": "BUTTON9_INDICATION"
								},
								"76": {
									"name": "Button10Indication",
									"help": "BUTTON10_INDICATION"
								},
								"77": {
									"name": "Button11Indication",
									"help": "BUTTON11_INDICATION"
								},
								"78": {
									"name": "Button12Indication",
									"help": "BUTTON12_INDICATION"
								},
								"80": {
									"name": "NodeIdentify",
									"help": "Node Identify"
								},
								"240": {
									"name": "Buzzer",
									"help": "Buzzer"
								}
							}
						},
						{
							"type": "enum",
							"name": "propertyID",
							"help": "Property ID",
							"length": 1,
							"values": {
								"1": {
									"name": "Multilevel",
									"help": "Multilevel"
								},
								"2": {
									"name": "Binary",
									"help": "Binary"
								},
								"3": {
									"name": "OnOffPeriod",
									"help": "On_Off_Period"
								},
								"4": {
									"name": "OnOffCycles",
									"help": "On_Off_Cycles"
								},
								"5": {
									"name": "OneTimeOnOffPeriod",
									"help": "One_Time_On_Off_Period"
								},
								"16": {
									"name": "LowPower",
									"help": "Low_power"
								}
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(IndicatorV3)?.command === this.command;
		}

		constructor(data: Buffer | IndicatorV3IndicatorSetData) {
			super(IndicatorSet, data);
		}
	};

	public static readonly IndicatorSupportedGet = class IndicatorSupportedGet extends CommandPacket<IndicatorV3IndicatorSupportedGetData> {
		public static readonly CommandClass = IndicatorV3;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
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
						"0": {
							"name": "Na",
							"help": "NA"
						},
						"1": {
							"name": "Armed",
							"help": "ARMED"
						},
						"2": {
							"name": "NotArmed",
							"help": "NOT_ARMED"
						},
						"3": {
							"name": "Ready",
							"help": "READY"
						},
						"4": {
							"name": "Fault",
							"help": "FAULT"
						},
						"5": {
							"name": "Busy",
							"help": "BUSY"
						},
						"6": {
							"name": "EnterId",
							"help": "ENTER_ID"
						},
						"7": {
							"name": "EnterPin",
							"help": "ENTER_PIN"
						},
						"8": {
							"name": "Ok",
							"help": "OK"
						},
						"9": {
							"name": "NotOk",
							"help": "NOT_OK"
						},
						"32": {
							"name": "Zone1Armed",
							"help": "ZONE1_ARMED"
						},
						"33": {
							"name": "Zone2Armed",
							"help": "ZONE2_ARMED"
						},
						"34": {
							"name": "Zone3Armed",
							"help": "ZONE3_ARMED"
						},
						"35": {
							"name": "Zone4Armed",
							"help": "ZONE4_ARMED"
						},
						"36": {
							"name": "Zone5Armed",
							"help": "ZONE5_ARMED"
						},
						"37": {
							"name": "Zone6Armed",
							"help": "ZONE6_ARMED"
						},
						"48": {
							"name": "LcdBacklight",
							"help": "LCD_BACKLIGHT"
						},
						"64": {
							"name": "ButtonBacklightLetters",
							"help": "BUTTON_BACKLIGHT_LETTERS"
						},
						"65": {
							"name": "ButtonBacklightDigits",
							"help": "BUTTON_BACKLIGHT_DIGITS"
						},
						"66": {
							"name": "ButtonBacklightCommand",
							"help": "BUTTON_BACKLIGHT_COMMAND"
						},
						"67": {
							"name": "Button1Indication",
							"help": "BUTTON1_INDICATION"
						},
						"68": {
							"name": "Button2Indication",
							"help": "BUTTON2_INDICATION"
						},
						"69": {
							"name": "Button3Indication",
							"help": "BUTTON3_INDICATION"
						},
						"70": {
							"name": "Button4Indication",
							"help": "BUTTON4_INDICATION"
						},
						"71": {
							"name": "Button5Indication",
							"help": "BUTTON5_INDICATION"
						},
						"72": {
							"name": "Button6Indication",
							"help": "BUTTON6_INDICATION"
						},
						"73": {
							"name": "Button7Indication",
							"help": "BUTTON7_INDICATION"
						},
						"74": {
							"name": "Button8Indication",
							"help": "BUTTON8_INDICATION"
						},
						"75": {
							"name": "Button9Indication",
							"help": "BUTTON9_INDICATION"
						},
						"76": {
							"name": "Button10Indication",
							"help": "BUTTON10_INDICATION"
						},
						"77": {
							"name": "Button11Indication",
							"help": "BUTTON11_INDICATION"
						},
						"78": {
							"name": "Button12Indication",
							"help": "BUTTON12_INDICATION"
						},
						"80": {
							"name": "NodeIdentify",
							"help": "Node Identify"
						},
						"240": {
							"name": "Buzzer",
							"help": "Buzzer"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(IndicatorV3)?.command === this.command;
		}

		constructor(data: Buffer | IndicatorV3IndicatorSupportedGetData) {
			super(IndicatorSupportedGet, data);
		}
	};

	// TODO This command is not yet fully supported by the decoder/encoder
	public static readonly IndicatorSupportedReport = class IndicatorSupportedReport extends CommandPacket<IndicatorV3IndicatorSupportedReportData> {
		public static readonly CommandClass = IndicatorV3;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
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
						"0": {
							"name": "Na",
							"help": "NA"
						},
						"1": {
							"name": "Armed",
							"help": "ARMED"
						},
						"2": {
							"name": "NotArmed",
							"help": "NOT_ARMED"
						},
						"3": {
							"name": "Ready",
							"help": "READY"
						},
						"4": {
							"name": "Fault",
							"help": "FAULT"
						},
						"5": {
							"name": "Busy",
							"help": "BUSY"
						},
						"6": {
							"name": "EnterId",
							"help": "ENTER_ID"
						},
						"7": {
							"name": "EnterPin",
							"help": "ENTER_PIN"
						},
						"8": {
							"name": "Ok",
							"help": "OK"
						},
						"9": {
							"name": "NotOk",
							"help": "NOT_OK"
						},
						"32": {
							"name": "Zone1Armed",
							"help": "ZONE1_ARMED"
						},
						"33": {
							"name": "Zone2Armed",
							"help": "ZONE2_ARMED"
						},
						"34": {
							"name": "Zone3Armed",
							"help": "ZONE3_ARMED"
						},
						"35": {
							"name": "Zone4Armed",
							"help": "ZONE4_ARMED"
						},
						"36": {
							"name": "Zone5Armed",
							"help": "ZONE5_ARMED"
						},
						"37": {
							"name": "Zone6Armed",
							"help": "ZONE6_ARMED"
						},
						"48": {
							"name": "LcdBacklight",
							"help": "LCD_BACKLIGHT"
						},
						"64": {
							"name": "ButtonBacklightLetters",
							"help": "BUTTON_BACKLIGHT_LETTERS"
						},
						"65": {
							"name": "ButtonBacklightDigits",
							"help": "BUTTON_BACKLIGHT_DIGITS"
						},
						"66": {
							"name": "ButtonBacklightCommand",
							"help": "BUTTON_BACKLIGHT_COMMAND"
						},
						"67": {
							"name": "Button1Indication",
							"help": "BUTTON1_INDICATION"
						},
						"68": {
							"name": "Button2Indication",
							"help": "BUTTON2_INDICATION"
						},
						"69": {
							"name": "Button3Indication",
							"help": "BUTTON3_INDICATION"
						},
						"70": {
							"name": "Button4Indication",
							"help": "BUTTON4_INDICATION"
						},
						"71": {
							"name": "Button5Indication",
							"help": "BUTTON5_INDICATION"
						},
						"72": {
							"name": "Button6Indication",
							"help": "BUTTON6_INDICATION"
						},
						"73": {
							"name": "Button7Indication",
							"help": "BUTTON7_INDICATION"
						},
						"74": {
							"name": "Button8Indication",
							"help": "BUTTON8_INDICATION"
						},
						"75": {
							"name": "Button9Indication",
							"help": "BUTTON9_INDICATION"
						},
						"76": {
							"name": "Button10Indication",
							"help": "BUTTON10_INDICATION"
						},
						"77": {
							"name": "Button11Indication",
							"help": "BUTTON11_INDICATION"
						},
						"78": {
							"name": "Button12Indication",
							"help": "BUTTON12_INDICATION"
						},
						"80": {
							"name": "NodeIdentify",
							"help": "Node Identify"
						},
						"240": {
							"name": "Buzzer",
							"help": "Buzzer"
						}
					}
				},
				{
					"type": "enum",
					"name": "nextIndicatorID",
					"help": "Next Indicator ID",
					"length": 1,
					"values": {
						"0": {
							"name": "Na",
							"help": "NA"
						},
						"1": {
							"name": "Armed",
							"help": "ARMED"
						},
						"2": {
							"name": "NotArmed",
							"help": "NOT_ARMED"
						},
						"3": {
							"name": "Ready",
							"help": "READY"
						},
						"4": {
							"name": "Fault",
							"help": "FAULT"
						},
						"5": {
							"name": "Busy",
							"help": "BUSY"
						},
						"6": {
							"name": "EnterId",
							"help": "ENTER_ID"
						},
						"7": {
							"name": "EnterPin",
							"help": "ENTER_PIN"
						},
						"8": {
							"name": "Ok",
							"help": "OK"
						},
						"9": {
							"name": "NotOk",
							"help": "NOT_OK"
						},
						"32": {
							"name": "Zone1Armed",
							"help": "ZONE1_ARMED"
						},
						"33": {
							"name": "Zone2Armed",
							"help": "ZONE2_ARMED"
						},
						"34": {
							"name": "Zone3Armed",
							"help": "ZONE3_ARMED"
						},
						"35": {
							"name": "Zone4Armed",
							"help": "ZONE4_ARMED"
						},
						"36": {
							"name": "Zone5Armed",
							"help": "ZONE5_ARMED"
						},
						"37": {
							"name": "Zone6Armed",
							"help": "ZONE6_ARMED"
						},
						"48": {
							"name": "LcdBacklight",
							"help": "LCD_BACKLIGHT"
						},
						"64": {
							"name": "ButtonBacklightLetters",
							"help": "BUTTON_BACKLIGHT_LETTERS"
						},
						"65": {
							"name": "ButtonBacklightDigits",
							"help": "BUTTON_BACKLIGHT_DIGITS"
						},
						"66": {
							"name": "ButtonBacklightCommand",
							"help": "BUTTON_BACKLIGHT_COMMAND"
						},
						"67": {
							"name": "Button1Indication",
							"help": "BUTTON1_INDICATION"
						},
						"68": {
							"name": "Button2Indication",
							"help": "BUTTON2_INDICATION"
						},
						"69": {
							"name": "Button3Indication",
							"help": "BUTTON3_INDICATION"
						},
						"70": {
							"name": "Button4Indication",
							"help": "BUTTON4_INDICATION"
						},
						"71": {
							"name": "Button5Indication",
							"help": "BUTTON5_INDICATION"
						},
						"72": {
							"name": "Button6Indication",
							"help": "BUTTON6_INDICATION"
						},
						"73": {
							"name": "Button7Indication",
							"help": "BUTTON7_INDICATION"
						},
						"74": {
							"name": "Button8Indication",
							"help": "BUTTON8_INDICATION"
						},
						"75": {
							"name": "Button9Indication",
							"help": "BUTTON9_INDICATION"
						},
						"76": {
							"name": "Button10Indication",
							"help": "BUTTON10_INDICATION"
						},
						"77": {
							"name": "Button11Indication",
							"help": "BUTTON11_INDICATION"
						},
						"78": {
							"name": "Button12Indication",
							"help": "BUTTON12_INDICATION"
						},
						"80": {
							"name": "NodeIdentify",
							"help": "Node Identify"
						},
						"240": {
							"name": "Buzzer",
							"help": "Buzzer"
						}
					}
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "reserved",
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "propertySupportedBitMaskLength",
							"mask": 31,
							"shift": 0
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(IndicatorV3)?.command === this.command;
		}

		constructor(data: Buffer | IndicatorV3IndicatorSupportedReportData) {
			super(IndicatorSupportedReport, data);
		}
	};
}

export namespace IndicatorV3 {
	export type IndicatorGet = InstanceType<typeof IndicatorV3.IndicatorGet>;
	export type IndicatorReport = InstanceType<typeof IndicatorV3.IndicatorReport>;
	export type IndicatorSet = InstanceType<typeof IndicatorV3.IndicatorSet>;
	export type IndicatorSupportedGet = InstanceType<typeof IndicatorV3.IndicatorSupportedGet>;
	export type IndicatorSupportedReport = InstanceType<typeof IndicatorV3.IndicatorSupportedReport>;
}
