/**
 * Command Class Notification, version 7.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum NotificationV7Commands {
	NotificationGet = 0x04,
	NotificationReport = 0x05,
	NotificationSet = 0x06,
	NotificationSupportedGet = 0x07,
	NotificationSupportedReport = 0x08,
	EventSupportedGet = 0x01,
	EventSupportedReport = 0x02,
}

export interface NotificationV7NotificationGetData {
	v1AlarmType: number; // 1 byte unsigned integer
	notificationType: NotificationTypeEnum; // 1 byte enum value
	event: number; // 1 byte unsigned integer
}

export interface NotificationV7NotificationReportData {
	v1AlarmType: number; // 1 byte unsigned integer
	v1AlarmLevel: number; // 1 byte unsigned integer
	notificationStatus: NotificationStatusEnum; // 1 byte enum value
	notificationType: NotificationTypeEnum; // 1 byte enum value
	event: number; // 1 byte unsigned integer
	sequence: boolean; // properties1[7]
	eventParametersLength: number; // properties1[4..0]
	// TODO param eventParameter type blob
	sequenceNumber: number; // 1 byte unsigned integer
}

export interface NotificationV7NotificationSetData {
	notificationType: NotificationTypeEnum; // 1 byte enum value
	notificationStatus: NotificationStatusEnum; // 1 byte enum value
}

export interface NotificationV7NotificationSupportedReportData {
	v1Alarm: boolean; // properties1[7]
	numberOfBitMasks: number; // properties1[4..0]
	// TODO param bitMask type bitmask or marker
}

export interface NotificationV7EventSupportedGetData {
	notificationType: NotificationTypeEnum; // 1 byte enum value
}

export interface NotificationV7EventSupportedReportData {
	notificationType: NotificationTypeEnum; // 1 byte enum value
	numberOfBitMasks: number; // properties1[4..0]
	// TODO param bitMask type bitmask or marker
}

export enum NotificationTypeEnum {
	Reserved = 0x0,
	Smoke = 0x1,
	Co = 0x2,
	Co2 = 0x3,
	Heat = 0x4,
	Water = 0x5,
	AccessControl = 0x6,
	HomeSecurity = 0x7,
	PowerManagement = 0x8,
	System = 0x9,
	Emergency = 0xa,
	Clock = 0xb,
	Appliance = 0xc,
	HomeHealth = 0xd,
	Siren = 0xe,
	WaterValve = 0xf,
	WeatherAlarm = 0x10,
	Irrigation = 0x11,
	GasAlarm = 0x12,
	First = 0xff,
}

export enum NotificationStatusEnum {
	Off = 0x0,
	NoPendingNotifications = 0xfe,
	On = 0xff,
}

// Deprecated
export class NotificationV7 extends CommandClassPacket<NotificationV7Commands> {
	public static readonly commandClass = CommandClasses.Notification; // 0x71 (113)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(NotificationV7, commandAndPayload);
	}

	public static readonly NotificationGet = class NotificationGet extends CommandPacket<NotificationV7NotificationGetData> {
		public static readonly CommandClass = NotificationV7;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "NotificationGet",
			"help": "Notification Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "v1AlarmType",
					"help": "V1 Alarm Type",
					"length": 1
				},
				{
					"type": "enum",
					"name": "notificationType",
					"help": "Notification Type",
					"length": 1,
					"values": {
						"0": {
							"name": "Reserved",
							"help": "Reserved"
						},
						"1": {
							"name": "Smoke",
							"help": "Smoke"
						},
						"2": {
							"name": "Co",
							"help": "CO"
						},
						"3": {
							"name": "Co2",
							"help": "CO2"
						},
						"4": {
							"name": "Heat",
							"help": "Heat"
						},
						"5": {
							"name": "Water",
							"help": "Water"
						},
						"6": {
							"name": "AccessControl",
							"help": "Access Control"
						},
						"7": {
							"name": "HomeSecurity",
							"help": "Home Security"
						},
						"8": {
							"name": "PowerManagement",
							"help": "Power Management"
						},
						"9": {
							"name": "System",
							"help": "System"
						},
						"10": {
							"name": "Emergency",
							"help": "Emergency"
						},
						"11": {
							"name": "Clock",
							"help": "Clock"
						},
						"12": {
							"name": "Appliance",
							"help": "Appliance"
						},
						"13": {
							"name": "HomeHealth",
							"help": "Home Health"
						},
						"14": {
							"name": "Siren",
							"help": "Siren"
						},
						"15": {
							"name": "WaterValve",
							"help": "Water Valve"
						},
						"16": {
							"name": "WeatherAlarm",
							"help": "Weather Alarm"
						},
						"17": {
							"name": "Irrigation",
							"help": "Irrigation"
						},
						"18": {
							"name": "GasAlarm",
							"help": "Gas Alarm"
						},
						"255": {
							"name": "First",
							"help": "First"
						}
					}
				},
				{
					"type": "integer",
					"name": "event",
					"help": "Event",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NotificationV7)?.command === this.command;
		}

		constructor(data: Buffer | NotificationV7NotificationGetData) {
			super(NotificationGet, data);
		}
	};

	public static readonly NotificationReport = class NotificationReport extends CommandPacket<NotificationV7NotificationReportData> {
		public static readonly CommandClass = NotificationV7;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "NotificationReport",
			"help": "Notification Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "v1AlarmType",
					"help": "V1 Alarm Type",
					"length": 1
				},
				{
					"type": "integer",
					"name": "v1AlarmLevel",
					"help": "V1 Alarm Level",
					"length": 1
				},
				{
					"type": "integer",
					"name": "reserved",
					"help": "Reserved",
					"length": 1,
					"reserved": true
				},
				{
					"type": "enum",
					"name": "notificationStatus",
					"help": "Notification Status",
					"length": 1,
					"values": {
						"0": {
							"name": "Off",
							"help": "Off"
						},
						"254": {
							"name": "NoPendingNotifications",
							"help": "No pending notifications"
						},
						"255": {
							"name": "On",
							"help": "On"
						}
					}
				},
				{
					"type": "enum",
					"name": "notificationType",
					"help": "Notification Type",
					"length": 1,
					"values": {
						"0": {
							"name": "Reserved",
							"help": "Reserved"
						},
						"1": {
							"name": "Smoke",
							"help": "Smoke"
						},
						"2": {
							"name": "Co",
							"help": "CO"
						},
						"3": {
							"name": "Co2",
							"help": "CO2"
						},
						"4": {
							"name": "Heat",
							"help": "Heat"
						},
						"5": {
							"name": "Water",
							"help": "Water"
						},
						"6": {
							"name": "AccessControl",
							"help": "Access Control"
						},
						"7": {
							"name": "HomeSecurity",
							"help": "Home Security"
						},
						"8": {
							"name": "PowerManagement",
							"help": "Power Management"
						},
						"9": {
							"name": "System",
							"help": "System"
						},
						"10": {
							"name": "Emergency",
							"help": "Emergency"
						},
						"11": {
							"name": "Clock",
							"help": "Clock"
						},
						"12": {
							"name": "Appliance",
							"help": "Appliance"
						},
						"13": {
							"name": "HomeHealth",
							"help": "Home Health"
						},
						"14": {
							"name": "Siren",
							"help": "Siren"
						},
						"15": {
							"name": "WaterValve",
							"help": "Water Valve"
						},
						"16": {
							"name": "WeatherAlarm",
							"help": "Weather Alarm"
						},
						"17": {
							"name": "Irrigation",
							"help": "Irrigation"
						},
						"18": {
							"name": "GasAlarm",
							"help": "Gas Alarm"
						},
						"255": {
							"name": "First",
							"help": "First"
						}
					}
				},
				{
					"type": "integer",
					"name": "event",
					"help": "Event",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "sequence",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "reserved2",
							"mask": 96,
							"shift": 5,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "eventParametersLength",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "blob",
					"name": "eventParameter",
					"help": "Event Parameter",
					"length": {
						"ref": "properties1",
						"bitfield": {
							"mask": 31,
							"shift": 0,
							"name": "eventParametersLength"
						}
					}
				},
				{
					"type": "integer",
					"name": "sequenceNumber",
					"help": "Sequence Number",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NotificationV7)?.command === this.command;
		}

		constructor(data: Buffer | NotificationV7NotificationReportData) {
			super(NotificationReport, data);
		}
	};

	public static readonly NotificationSet = class NotificationSet extends CommandPacket<NotificationV7NotificationSetData> {
		public static readonly CommandClass = NotificationV7;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "NotificationSet",
			"help": "Notification Set",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "notificationType",
					"help": "Notification Type",
					"length": 1,
					"values": {
						"0": {
							"name": "Reserved",
							"help": "Reserved"
						},
						"1": {
							"name": "Smoke",
							"help": "Smoke"
						},
						"2": {
							"name": "Co",
							"help": "CO"
						},
						"3": {
							"name": "Co2",
							"help": "CO2"
						},
						"4": {
							"name": "Heat",
							"help": "Heat"
						},
						"5": {
							"name": "Water",
							"help": "Water"
						},
						"6": {
							"name": "AccessControl",
							"help": "Access Control"
						},
						"7": {
							"name": "HomeSecurity",
							"help": "Home Security"
						},
						"8": {
							"name": "PowerManagement",
							"help": "Power Management"
						},
						"9": {
							"name": "System",
							"help": "System"
						},
						"10": {
							"name": "Emergency",
							"help": "Emergency"
						},
						"11": {
							"name": "Clock",
							"help": "Clock"
						},
						"12": {
							"name": "Appliance",
							"help": "Appliance"
						},
						"13": {
							"name": "HomeHealth",
							"help": "Home Health"
						},
						"14": {
							"name": "Siren",
							"help": "Siren"
						},
						"15": {
							"name": "WaterValve",
							"help": "Water Valve"
						},
						"16": {
							"name": "WeatherAlarm",
							"help": "Weather Alarm"
						},
						"17": {
							"name": "Irrigation",
							"help": "Irrigation"
						},
						"18": {
							"name": "GasAlarm",
							"help": "Gas Alarm"
						},
						"255": {
							"name": "First",
							"help": "First"
						}
					}
				},
				{
					"type": "enum",
					"name": "notificationStatus",
					"help": "Notification Status",
					"length": 1,
					"values": {
						"0": {
							"name": "Off",
							"help": "Off"
						},
						"254": {
							"name": "NoPendingNotifications",
							"help": "No pending notifications"
						},
						"255": {
							"name": "On",
							"help": "On"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NotificationV7)?.command === this.command;
		}

		constructor(data: Buffer | NotificationV7NotificationSetData) {
			super(NotificationSet, data);
		}
	};

	public static readonly NotificationSupportedGet = class NotificationSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = NotificationV7;
		public static readonly command = 0x07;
		public static readonly definition = {
			"command": 7,
			"name": "NotificationSupportedGet",
			"help": "Notification Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NotificationV7)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(NotificationSupportedGet, data);
		}
	};

	public static readonly NotificationSupportedReport = class NotificationSupportedReport extends CommandPacket<NotificationV7NotificationSupportedReportData> {
		public static readonly CommandClass = NotificationV7;
		public static readonly command = 0x08;
		public static readonly definition = {
			"command": 8,
			"name": "NotificationSupportedReport",
			"help": "Notification Supported Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "v1Alarm",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "reserved",
							"mask": 96,
							"shift": 5,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "numberOfBitMasks",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "bitMask",
					"help": "Bit Mask",
					"length": 0
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NotificationV7)?.command === this.command;
		}

		constructor(data: Buffer | NotificationV7NotificationSupportedReportData) {
			super(NotificationSupportedReport, data);
		}
	};

	public static readonly EventSupportedGet = class EventSupportedGet extends CommandPacket<NotificationV7EventSupportedGetData> {
		public static readonly CommandClass = NotificationV7;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "EventSupportedGet",
			"help": "Event Supported Get",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "notificationType",
					"help": "Notification Type",
					"length": 1,
					"values": {
						"0": {
							"name": "Reserved",
							"help": "Reserved"
						},
						"1": {
							"name": "Smoke",
							"help": "Smoke"
						},
						"2": {
							"name": "Co",
							"help": "CO"
						},
						"3": {
							"name": "Co2",
							"help": "CO2"
						},
						"4": {
							"name": "Heat",
							"help": "Heat"
						},
						"5": {
							"name": "Water",
							"help": "Water"
						},
						"6": {
							"name": "AccessControl",
							"help": "Access Control"
						},
						"7": {
							"name": "HomeSecurity",
							"help": "Home Security"
						},
						"8": {
							"name": "PowerManagement",
							"help": "Power Management"
						},
						"9": {
							"name": "System",
							"help": "System"
						},
						"10": {
							"name": "Emergency",
							"help": "Emergency"
						},
						"11": {
							"name": "Clock",
							"help": "Clock"
						},
						"12": {
							"name": "Appliance",
							"help": "Appliance"
						},
						"13": {
							"name": "HomeHealth",
							"help": "Home Health"
						},
						"14": {
							"name": "Siren",
							"help": "Siren"
						},
						"15": {
							"name": "WaterValve",
							"help": "Water Valve"
						},
						"16": {
							"name": "WeatherAlarm",
							"help": "Weather Alarm"
						},
						"17": {
							"name": "Irrigation",
							"help": "Irrigation"
						},
						"18": {
							"name": "GasAlarm",
							"help": "Gas Alarm"
						},
						"255": {
							"name": "First",
							"help": "First"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NotificationV7)?.command === this.command;
		}

		constructor(data: Buffer | NotificationV7EventSupportedGetData) {
			super(EventSupportedGet, data);
		}
	};

	public static readonly EventSupportedReport = class EventSupportedReport extends CommandPacket<NotificationV7EventSupportedReportData> {
		public static readonly CommandClass = NotificationV7;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "EventSupportedReport",
			"help": "Event Supported Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "notificationType",
					"help": "Notification Type",
					"length": 1,
					"values": {
						"0": {
							"name": "Reserved",
							"help": "Reserved"
						},
						"1": {
							"name": "Smoke",
							"help": "Smoke"
						},
						"2": {
							"name": "Co",
							"help": "CO"
						},
						"3": {
							"name": "Co2",
							"help": "CO2"
						},
						"4": {
							"name": "Heat",
							"help": "Heat"
						},
						"5": {
							"name": "Water",
							"help": "Water"
						},
						"6": {
							"name": "AccessControl",
							"help": "Access Control"
						},
						"7": {
							"name": "HomeSecurity",
							"help": "Home Security"
						},
						"8": {
							"name": "PowerManagement",
							"help": "Power Management"
						},
						"9": {
							"name": "System",
							"help": "System"
						},
						"10": {
							"name": "Emergency",
							"help": "Emergency"
						},
						"11": {
							"name": "Clock",
							"help": "Clock"
						},
						"12": {
							"name": "Appliance",
							"help": "Appliance"
						},
						"13": {
							"name": "HomeHealth",
							"help": "Home Health"
						},
						"14": {
							"name": "Siren",
							"help": "Siren"
						},
						"15": {
							"name": "WaterValve",
							"help": "Water Valve"
						},
						"16": {
							"name": "WeatherAlarm",
							"help": "Weather Alarm"
						},
						"17": {
							"name": "Irrigation",
							"help": "Irrigation"
						},
						"18": {
							"name": "GasAlarm",
							"help": "Gas Alarm"
						},
						"255": {
							"name": "First",
							"help": "First"
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
							"type": "integer",
							"name": "reserved",
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "numberOfBitMasks",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "bitMask",
					"help": "Bit Mask",
					"length": 0
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NotificationV7)?.command === this.command;
		}

		constructor(data: Buffer | NotificationV7EventSupportedReportData) {
			super(EventSupportedReport, data);
		}
	};
}

export namespace NotificationV7 {
	export type NotificationGet = InstanceType<typeof NotificationV7.NotificationGet>;
	export type NotificationReport = InstanceType<typeof NotificationV7.NotificationReport>;
	export type NotificationSet = InstanceType<typeof NotificationV7.NotificationSet>;
	export type NotificationSupportedGet = InstanceType<typeof NotificationV7.NotificationSupportedGet>;
	export type NotificationSupportedReport = InstanceType<typeof NotificationV7.NotificationSupportedReport>;
	export type EventSupportedGet = InstanceType<typeof NotificationV7.EventSupportedGet>;
	export type EventSupportedReport = InstanceType<typeof NotificationV7.EventSupportedReport>;
}
