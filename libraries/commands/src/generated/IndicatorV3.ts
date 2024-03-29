/**
 * Command Class Indicator, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum IndicatorV3Commands {
	IndicatorGet = 0x02,
	IndicatorReport = 0x03,
	IndicatorSet = 0x01,
	IndicatorSupportedGet = 0x04,
	IndicatorSupportedReport = 0x05,
}

export interface IndicatorV3IndicatorGetData {
	indicatorId: IndicatorIdEnum; // 1 byte enum value
}

export interface IndicatorV3IndicatorReportData {
	indicator0Value: number; // 1 byte unsigned integer
	vg1: Array<{ // variable length
		indicatorId: IndicatorIdEnum; // 1 byte enum value
		propertyId: PropertyIdEnum; // 1 byte enum value
		value: number; // 1 byte unsigned integer
	}>;
}

export interface IndicatorV3IndicatorSetData {
	indicator0Value: number; // 1 byte unsigned integer
	vg1: Array<{ // variable length
		indicatorId: IndicatorIdEnum; // 1 byte enum value
		propertyId: PropertyIdEnum; // 1 byte enum value
		value: number; // 1 byte unsigned integer
	}>;
}

export interface IndicatorV3IndicatorSupportedGetData {
	indicatorId: IndicatorIdEnum; // 1 byte enum value
}

export interface IndicatorV3IndicatorSupportedReportData {
	indicatorId: IndicatorIdEnum; // 1 byte enum value
	nextIndicatorId: NextIndicatorIdEnum; // 1 byte enum value
	propertySupportedBitMask: Set<PropertySupportedBitMaskEnum>; // variable length
}

export enum IndicatorIdEnum {
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

export enum PropertyIdEnum {
	Multilevel = 0x1,
	Binary = 0x2,
	OnOffPeriod = 0x3,
	OnOffCycles = 0x4,
	OneTimeOnOffPeriod = 0x5,
	LowPower = 0x10,
}

export enum NextIndicatorIdEnum {
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

export enum PropertySupportedBitMaskEnum {
	Multilevel = 0x1,
	Binary = 0x2,
	OnOffPeriod = 0x3,
	OnOffCycles = 0x4,
	OneTimeOnOffPeriod = 0x5,
	LowPower = 0x10,
}

export class IndicatorV3 extends CommandClassPacket<IndicatorV3Commands> {
	public static readonly commandClass: number = CommandClasses.Indicator; // 0x87 (135)
	public static readonly version: number = 3;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(IndicatorV3, commandAndPayload);
	}
}

export class IndicatorGet extends CommandPacket<IndicatorV3IndicatorGetData> {
	public static readonly CommandClass: typeof IndicatorV3 = IndicatorV3;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "IndicatorGet",
		"help": "Indicator Get",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "indicatorId",
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IndicatorV3)?.command === this.command;
	}

	public constructor(data: Buffer | IndicatorV3IndicatorGetData) {
		super(IndicatorGet, data);
	}
};

export class IndicatorReport extends CommandPacket<IndicatorV3IndicatorReportData> {
	public static readonly CommandClass: typeof IndicatorV3 = IndicatorV3;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "IndicatorReport",
		"help": "Indicator Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
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
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 224,
						"shift": 5,
						"reserved": true
					},
					{
						"fieldType": "Integer",
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
				"type": "Group",
				"name": "vg1",
				"help": "vg1",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.indicatorObjectCount"
					}
				},
				"params": [
					{
						"type": "Enum",
						"name": "indicatorId",
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
						"type": "Enum",
						"name": "propertyId",
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
						"type": "Integer",
						"name": "value",
						"help": "Value",
						"length": 1
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IndicatorV3)?.command === this.command;
	}

	public constructor(data: Buffer | IndicatorV3IndicatorReportData) {
		super(IndicatorReport, data);
	}
};

export class IndicatorSet extends CommandPacket<IndicatorV3IndicatorSetData> {
	public static readonly CommandClass: typeof IndicatorV3 = IndicatorV3;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "IndicatorSet",
		"help": "Indicator Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
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
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 224,
						"shift": 5,
						"reserved": true
					},
					{
						"fieldType": "Integer",
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
				"type": "Group",
				"name": "vg1",
				"help": "vg1",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.indicatorObjectCount"
					}
				},
				"params": [
					{
						"type": "Enum",
						"name": "indicatorId",
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
						"type": "Enum",
						"name": "propertyId",
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
						"type": "Integer",
						"name": "value",
						"help": "Value",
						"length": 1
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IndicatorV3)?.command === this.command;
	}

	public constructor(data: Buffer | IndicatorV3IndicatorSetData) {
		super(IndicatorSet, data);
	}
};

export class IndicatorSupportedGet extends CommandPacket<IndicatorV3IndicatorSupportedGetData> {
	public static readonly CommandClass: typeof IndicatorV3 = IndicatorV3;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "IndicatorSupportedGet",
		"help": "Indicator Supported Get",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "indicatorId",
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IndicatorV3)?.command === this.command;
	}

	public constructor(data: Buffer | IndicatorV3IndicatorSupportedGetData) {
		super(IndicatorSupportedGet, data);
	}
};

export class IndicatorSupportedReport extends CommandPacket<IndicatorV3IndicatorSupportedReportData> {
	public static readonly CommandClass: typeof IndicatorV3 = IndicatorV3;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "IndicatorSupportedReport",
		"help": "Indicator Supported Report",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "indicatorId",
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
				"type": "Enum",
				"name": "nextIndicatorId",
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
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 224,
						"shift": 5,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "propertySupportedBitMaskLength",
						"mask": 31,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"propertySupportedBitMask"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Bitmask",
				"name": "propertySupportedBitMask",
				"help": "Property Supported Bit Mask",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.propertySupportedBitMaskLength"
					}
				},
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
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IndicatorV3)?.command === this.command;
	}

	public constructor(data: Buffer | IndicatorV3IndicatorSupportedReportData) {
		super(IndicatorSupportedReport, data);
	}
};
