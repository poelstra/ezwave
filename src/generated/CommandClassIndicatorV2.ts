/* Auto-generated */

export class CommandClassIndicatorV2 {
	public static readonly commandClass = 0x87; // (135);
	public static readonly definition = {"id":135,"name":"COMMAND_CLASS_INDICATOR","status":"active","version":2,"commands":[{"id":2,"name":"INDICATOR_GET","status":"active","params":[{"type":"enum","name":"Indicator ID","length":1,"values":{"0":"NA","1":"ARMED","2":"NOT_ARMED","3":"READY","4":"FAULT","5":"BUSY","6":"ENTER_ID","7":"ENTER_PIN","8":"OK","9":"NOT_OK","32":"ZONE1_ARMED","33":"ZONE2_ARMED","34":"ZONE3_ARMED","35":"ZONE4_ARMED","36":"ZONE5_ARMED","37":"ZONE6_ARMED","48":"LCD_BACKLIGHT","64":"BUTTON_BACKLIGHT_LETTERS","65":"BUTTON_BACKLIGHT_DIGITS","66":"BUTTON_BACKLIGHT_COMMAND","67":"BUTTON1_INDICATION","68":"BUTTON2_INDICATION","69":"BUTTON3_INDICATION","70":"BUTTON4_INDICATION","71":"BUTTON5_INDICATION","72":"BUTTON6_INDICATION","73":"BUTTON7_INDICATION","74":"BUTTON8_INDICATION","75":"BUTTON9_INDICATION","76":"BUTTON10_INDICATION","77":"BUTTON11_INDICATION","78":"BUTTON12_INDICATION","240":"Buzzer"}}]},{"id":3,"name":"INDICATOR_REPORT","status":"active","params":[{"type":"integer","name":"Indicator 0 Value","length":1,"values":{"0":"off/disable","255":"on/enable"}},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Indicator Object Count","mask":31,"shift":0},{"type":"int","name":"Reserved","mask":224,"shift":5}]},{"type":"group","name":"vg1","length":{"name":"Properties1","mask":31,"shift":0},"params":[{"type":"enum","name":"Indicator ID","length":1,"values":{"0":"NA","1":"ARMED","2":"NOT_ARMED","3":"READY","4":"FAULT","5":"BUSY","6":"ENTER_ID","7":"ENTER_PIN","8":"OK","9":"NOT_OK","32":"ZONE1_ARMED","33":"ZONE2_ARMED","34":"ZONE3_ARMED","35":"ZONE4_ARMED","36":"ZONE5_ARMED","37":"ZONE6_ARMED","48":"LCD_BACKLIGHT","64":"BUTTON_BACKLIGHT_LETTERS","65":"BUTTON_BACKLIGHT_DIGITS","66":"BUTTON_BACKLIGHT_COMMAND","67":"BUTTON1_INDICATION","68":"BUTTON2_INDICATION","69":"BUTTON3_INDICATION","70":"BUTTON4_INDICATION","71":"BUTTON5_INDICATION","72":"BUTTON6_INDICATION","73":"BUTTON7_INDICATION","74":"BUTTON8_INDICATION","75":"BUTTON9_INDICATION","76":"BUTTON10_INDICATION","77":"BUTTON11_INDICATION","78":"BUTTON12_INDICATION","240":"Buzzer"}},{"type":"enum","name":"Property ID","length":1,"values":{"1":"Multilevel","2":"Binary","3":"On_Off_Period","4":"On_Off_Cycles","16":"Low_power"}},{"type":"integer","name":"Value","length":1}]}]},{"id":1,"name":"INDICATOR_SET","status":"active","params":[{"type":"integer","name":"Indicator 0 Value","length":1,"values":{"0":"off/disable","255":"on/enable"}},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Indicator Object Count","mask":31,"shift":0},{"type":"int","name":"Reserved","mask":224,"shift":5}]},{"type":"group","name":"vg1","length":{"name":"Properties1","mask":31,"shift":0},"params":[{"type":"enum","name":"Indicator ID","length":1,"values":{"0":"NA","1":"ARMED","2":"NOT_ARMED","3":"READY","4":"FAULT","5":"BUSY","6":"ENTER_ID","7":"ENTER_PIN","8":"OK","9":"NOT_OK","32":"ZONE1_ARMED","33":"ZONE2_ARMED","34":"ZONE3_ARMED","35":"ZONE4_ARMED","36":"ZONE5_ARMED","37":"ZONE6_ARMED","48":"LCD_BACKLIGHT","64":"BUTTON_BACKLIGHT_LETTERS","65":"BUTTON_BACKLIGHT_DIGITS","66":"BUTTON_BACKLIGHT_COMMAND","67":"BUTTON1_INDICATION","68":"BUTTON2_INDICATION","69":"BUTTON3_INDICATION","70":"BUTTON4_INDICATION","71":"BUTTON5_INDICATION","72":"BUTTON6_INDICATION","73":"BUTTON7_INDICATION","74":"BUTTON8_INDICATION","75":"BUTTON9_INDICATION","76":"BUTTON10_INDICATION","77":"BUTTON11_INDICATION","78":"BUTTON12_INDICATION","240":"Buzzer"}},{"type":"enum","name":"Property ID","length":1,"values":{"1":"Multilevel","2":"Binary","3":"On_Off_Period","4":"On_Off_Cycles","16":"Low_power"}},{"type":"integer","name":"Value","length":1}]}]},{"id":4,"name":"INDICATOR_SUPPORTED_GET","status":"active","params":[{"type":"enum","name":"Indicator ID","length":1,"values":{"0":"NA","1":"ARMED","2":"NOT_ARMED","3":"READY","4":"FAULT","5":"BUSY","6":"ENTER_ID","7":"ENTER_PIN","8":"OK","9":"NOT_OK","32":"ZONE1_ARMED","33":"ZONE2_ARMED","34":"ZONE3_ARMED","35":"ZONE4_ARMED","36":"ZONE5_ARMED","37":"ZONE6_ARMED","48":"LCD_BACKLIGHT","64":"BUTTON_BACKLIGHT_LETTERS","65":"BUTTON_BACKLIGHT_DIGITS","66":"BUTTON_BACKLIGHT_COMMAND","67":"BUTTON1_INDICATION","68":"BUTTON2_INDICATION","69":"BUTTON3_INDICATION","70":"BUTTON4_INDICATION","71":"BUTTON5_INDICATION","72":"BUTTON6_INDICATION","73":"BUTTON7_INDICATION","74":"BUTTON8_INDICATION","75":"BUTTON9_INDICATION","76":"BUTTON10_INDICATION","77":"BUTTON11_INDICATION","78":"BUTTON12_INDICATION","240":"Buzzer"}}]},{"id":5,"name":"INDICATOR_SUPPORTED_REPORT","status":"active","params":[{"type":"enum","name":"Indicator ID","length":1,"values":{"0":"NA","1":"ARMED","2":"NOT_ARMED","3":"READY","4":"FAULT","5":"BUSY","6":"ENTER_ID","7":"ENTER_PIN","8":"OK","9":"NOT_OK","32":"ZONE1_ARMED","33":"ZONE2_ARMED","34":"ZONE3_ARMED","35":"ZONE4_ARMED","36":"ZONE5_ARMED","37":"ZONE6_ARMED","48":"LCD_BACKLIGHT","64":"BUTTON_BACKLIGHT_LETTERS","65":"BUTTON_BACKLIGHT_DIGITS","66":"BUTTON_BACKLIGHT_COMMAND","67":"BUTTON1_INDICATION","68":"BUTTON2_INDICATION","69":"BUTTON3_INDICATION","70":"BUTTON4_INDICATION","71":"BUTTON5_INDICATION","72":"BUTTON6_INDICATION","73":"BUTTON7_INDICATION","74":"BUTTON8_INDICATION","75":"BUTTON9_INDICATION","76":"BUTTON10_INDICATION","77":"BUTTON11_INDICATION","78":"BUTTON12_INDICATION","240":"Buzzer"}},{"type":"enum","name":"Next Indicator ID","length":1,"values":{"0":"NA","1":"ARMED","2":"NOT_ARMED","3":"READY","4":"FAULT","5":"BUSY","6":"ENTER_ID","7":"ENTER_PIN","8":"OK","9":"NOT_OK","32":"ZONE1_ARMED","33":"ZONE2_ARMED","34":"ZONE3_ARMED","35":"ZONE4_ARMED","36":"ZONE5_ARMED","37":"ZONE6_ARMED","48":"LCD_BACKLIGHT","64":"BUTTON_BACKLIGHT_LETTERS","65":"BUTTON_BACKLIGHT_DIGITS","66":"BUTTON_BACKLIGHT_COMMAND","67":"BUTTON1_INDICATION","68":"BUTTON2_INDICATION","69":"BUTTON3_INDICATION","70":"BUTTON4_INDICATION","71":"BUTTON5_INDICATION","72":"BUTTON6_INDICATION","73":"BUTTON7_INDICATION","74":"BUTTON8_INDICATION","75":"BUTTON9_INDICATION","76":"BUTTON10_INDICATION","77":"BUTTON11_INDICATION","78":"BUTTON12_INDICATION","240":"Buzzer"}},{"type":"bitfield","name":"Properties1","length":1,"fields":[{"type":"int","name":"Property Supported Bit Mask Length","mask":31,"shift":0},{"type":"int","name":"Reserved","mask":224,"shift":5}]},{"type":"integer","name":"Property Supported Bit Mask","length":0}]}]};
}

export interface IndicatorGet {
	_commandClass: 0x87; // (135)
	_command: 0x2; // (2)
	indicatorID: IndicatorIDEnum; // 1 byte enum value
}

export interface IndicatorReport {
	_commandClass: 0x87; // (135)
	_command: 0x3; // (3)
	indicator0Value: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param vg1 type group
}

export interface IndicatorSet {
	_commandClass: 0x87; // (135)
	_command: 0x1; // (1)
	indicator0Value: number; // 1 byte unsigned integer
	// TODO param Properties1 type bitfield
	// TODO param vg1 type group
}

export interface IndicatorSupportedGet {
	_commandClass: 0x87; // (135)
	_command: 0x4; // (4)
	indicatorID: IndicatorIDEnum; // 1 byte enum value
}

export interface IndicatorSupportedReport {
	_commandClass: 0x87; // (135)
	_command: 0x5; // (5)
	indicatorID: IndicatorIDEnum; // 1 byte enum value
	nextIndicatorID: NextIndicatorIDEnum; // 1 byte enum value
	// TODO param Properties1 type bitfield
	propertySupportedBitMask: number; // 0 byte unsigned integer
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
