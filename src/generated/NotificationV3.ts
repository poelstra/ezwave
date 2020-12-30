/**
 * Command Class Notification, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum NotificationV3Commands {
	NotificationGet = 0x04,
	NotificationReport = 0x05,
	NotificationSet = 0x06,
	NotificationSupportedGet = 0x07,
	NotificationSupportedReport = 0x08,
	EventSupportedGet = 0x01,
	EventSupportedReport = 0x02,
}

export interface NotificationV3NotificationGetData {
	v1AlarmType: number; // 1 byte unsigned integer
	notificationType: NotificationTypeEnum; // 1 byte enum value
	event: number; // 1 byte unsigned integer
}

export interface NotificationV3NotificationReportData {
	v1AlarmType: number; // 1 byte unsigned integer
	v1AlarmLevel: number; // 1 byte unsigned integer
	notificationStatus: number; // 1 byte unsigned integer
	notificationType: NotificationTypeEnum; // 1 byte enum value
	event: number; // 1 byte unsigned integer
	sequence: boolean; // properties1[7]
	eventParametersLength: number; // properties1[4..0]
	// TODO param eventParameter type blob
	sequenceNumber: number; // 1 byte unsigned integer
}

export interface NotificationV3NotificationSetData {
	notificationType: NotificationTypeEnum; // 1 byte enum value
	notificationStatus: number; // 1 byte unsigned integer
}

export interface NotificationV3NotificationSupportedReportData {
	v1Alarm: boolean; // properties1[7]
	numberOfBitMasks: number; // properties1[4..0]
	// TODO param bitMask type bitmask or marker
}

export interface NotificationV3EventSupportedGetData {
	notificationType: NotificationTypeEnum; // 1 byte enum value
}

export interface NotificationV3EventSupportedReportData {
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
	Burglar = 0x7,
	PowerManagement = 0x8,
	System = 0x9,
	Emergency = 0xa,
	Clock = 0xb,
	First = 0xff,
}

// Deprecated
export class NotificationV3 extends CommandClassPacket<NotificationV3Commands> {
	public static readonly commandClass = CommandClasses.Notification; // 0x71 (113)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(NotificationV3, commandAndPayload);
	}

	public static readonly NotificationGet = class NotificationGet extends CommandPacket<NotificationV3NotificationGetData> {
		public static readonly CommandClass = NotificationV3;
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
							"name": "Burglar",
							"help": "Burglar"
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
			return packet.tryAs(NotificationV3)?.command === this.command;
		}

		constructor(data: Buffer | NotificationV3NotificationGetData) {
			super(NotificationGet, data);
		}
	};

	public static readonly NotificationReport = class NotificationReport extends CommandPacket<NotificationV3NotificationReportData> {
		public static readonly CommandClass = NotificationV3;
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
					"type": "integer",
					"name": "notificationStatus",
					"help": "Notification Status",
					"length": 1,
					"values": {
						"0": {
							"name": "Off",
							"help": "Off"
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
							"name": "Burglar",
							"help": "Burglar"
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
						"name": "Properties1",
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
			return packet.tryAs(NotificationV3)?.command === this.command;
		}

		constructor(data: Buffer | NotificationV3NotificationReportData) {
			super(NotificationReport, data);
		}
	};

	public static readonly NotificationSet = class NotificationSet extends CommandPacket<NotificationV3NotificationSetData> {
		public static readonly CommandClass = NotificationV3;
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
							"name": "Burglar",
							"help": "Burglar"
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
						"255": {
							"name": "First",
							"help": "First"
						}
					}
				},
				{
					"type": "integer",
					"name": "notificationStatus",
					"help": "Notification Status",
					"length": 1,
					"values": {
						"0": {
							"name": "Off",
							"help": "Off"
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
			return packet.tryAs(NotificationV3)?.command === this.command;
		}

		constructor(data: Buffer | NotificationV3NotificationSetData) {
			super(NotificationSet, data);
		}
	};

	public static readonly NotificationSupportedGet = class NotificationSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = NotificationV3;
		public static readonly command = 0x07;
		public static readonly definition = {
			"command": 7,
			"name": "NotificationSupportedGet",
			"help": "Notification Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NotificationV3)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(NotificationSupportedGet, data);
		}
	};

	public static readonly NotificationSupportedReport = class NotificationSupportedReport extends CommandPacket<NotificationV3NotificationSupportedReportData> {
		public static readonly CommandClass = NotificationV3;
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
			return packet.tryAs(NotificationV3)?.command === this.command;
		}

		constructor(data: Buffer | NotificationV3NotificationSupportedReportData) {
			super(NotificationSupportedReport, data);
		}
	};

	public static readonly EventSupportedGet = class EventSupportedGet extends CommandPacket<NotificationV3EventSupportedGetData> {
		public static readonly CommandClass = NotificationV3;
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
							"name": "Burglar",
							"help": "Burglar"
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
						"255": {
							"name": "First",
							"help": "First"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(NotificationV3)?.command === this.command;
		}

		constructor(data: Buffer | NotificationV3EventSupportedGetData) {
			super(EventSupportedGet, data);
		}
	};

	public static readonly EventSupportedReport = class EventSupportedReport extends CommandPacket<NotificationV3EventSupportedReportData> {
		public static readonly CommandClass = NotificationV3;
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
							"name": "Burglar",
							"help": "Burglar"
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
			return packet.tryAs(NotificationV3)?.command === this.command;
		}

		constructor(data: Buffer | NotificationV3EventSupportedReportData) {
			super(EventSupportedReport, data);
		}
	};
}

export namespace NotificationV3 {
	export type NotificationGet = InstanceType<typeof NotificationV3.NotificationGet>;
	export type NotificationReport = InstanceType<typeof NotificationV3.NotificationReport>;
	export type NotificationSet = InstanceType<typeof NotificationV3.NotificationSet>;
	export type NotificationSupportedGet = InstanceType<typeof NotificationV3.NotificationSupportedGet>;
	export type NotificationSupportedReport = InstanceType<typeof NotificationV3.NotificationSupportedReport>;
	export type EventSupportedGet = InstanceType<typeof NotificationV3.EventSupportedGet>;
	export type EventSupportedReport = InstanceType<typeof NotificationV3.EventSupportedReport>;
}
