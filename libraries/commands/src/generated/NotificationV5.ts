/**
 * Command Class Notification, version 5.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum NotificationV5Commands {
	NotificationGet = 0x04,
	NotificationReport = 0x05,
	NotificationSet = 0x06,
	NotificationSupportedGet = 0x07,
	NotificationSupportedReport = 0x08,
	EventSupportedGet = 0x01,
	EventSupportedReport = 0x02,
}

export interface NotificationV5NotificationGetData {
	v1AlarmType: number; // 1 byte unsigned integer
	notificationType: NotificationTypeEnum; // 1 byte enum value
	event: number; // 1 byte unsigned integer
}

export interface NotificationV5NotificationReportData {
	v1AlarmType: number; // 1 byte unsigned integer
	v1AlarmLevel: number; // 1 byte unsigned integer
	notificationStatus: NotificationStatusEnum; // 1 byte enum value
	notificationType: NotificationTypeEnum; // 1 byte enum value
	event: number; // 1 byte unsigned integer
	sequence: boolean; // properties1[7]
	eventParameter: Buffer; // variable length
	sequenceNumber: number; // 1 byte unsigned integer
}

export interface NotificationV5NotificationSetData {
	notificationType: NotificationTypeEnum; // 1 byte enum value
	notificationStatus: NotificationStatusEnum; // 1 byte enum value
}

export interface NotificationV5NotificationSupportedReportData {
	v1Alarm: boolean; // properties1[7]
	bitMask: Set<BitMaskEnum>; // variable length
}

export interface NotificationV5EventSupportedGetData {
	notificationType: NotificationTypeEnum; // 1 byte enum value
}

export interface NotificationV5EventSupportedReportData {
	notificationType: NotificationTypeEnum; // 1 byte enum value
	bitMask: Set<number>; // variable length
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
	First = 0xff,
}

export enum NotificationStatusEnum {
	Off = 0x0,
	NoPendingNotifications = 0xfe,
	On = 0xff,
}

export enum BitMaskEnum {
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
	First = 0xff,
}

// This (version of the) command class is Deprecated
export class NotificationV5 extends CommandClassPacket<NotificationV5Commands> {
	public static readonly commandClass: number = CommandClasses.Notification; // 0x71 (113)
	public static readonly version: number = 5;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(NotificationV5, commandAndPayload);
	}
}

export class NotificationGet extends CommandPacket<NotificationV5NotificationGetData> {
	public static readonly CommandClass: typeof NotificationV5 = NotificationV5;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "NotificationGet",
		"help": "Notification Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "v1AlarmType",
				"help": "V1 Alarm Type",
				"length": 1
			},
			{
				"type": "Enum",
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
					"255": {
						"name": "First",
						"help": "First"
					}
				}
			},
			{
				"type": "Integer",
				"name": "event",
				"help": "Event",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NotificationV5)?.command === this.command;
	}

	public constructor(data: Buffer | NotificationV5NotificationGetData) {
		super(NotificationGet, data);
	}
};

export class NotificationReport extends CommandPacket<NotificationV5NotificationReportData> {
	public static readonly CommandClass: typeof NotificationV5 = NotificationV5;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "NotificationReport",
		"help": "Notification Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "v1AlarmType",
				"help": "V1 Alarm Type",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "v1AlarmLevel",
				"help": "V1 Alarm Level",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "reserved",
				"help": "Reserved",
				"length": 1,
				"reserved": true
			},
			{
				"type": "Enum",
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
				"type": "Enum",
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
					"255": {
						"name": "First",
						"help": "First"
					}
				}
			},
			{
				"type": "Integer",
				"name": "event",
				"help": "Event",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "sequence",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "reserved2",
						"mask": 96,
						"shift": 5,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "eventParametersLength",
						"mask": 31,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"eventParameter"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "eventParameter",
				"help": "Event Parameter",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.eventParametersLength"
					}
				}
			},
			{
				"type": "Integer",
				"name": "sequenceNumber",
				"help": "Sequence Number",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NotificationV5)?.command === this.command;
	}

	public constructor(data: Buffer | NotificationV5NotificationReportData) {
		super(NotificationReport, data);
	}
};

export class NotificationSet extends CommandPacket<NotificationV5NotificationSetData> {
	public static readonly CommandClass: typeof NotificationV5 = NotificationV5;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 6,
		"name": "NotificationSet",
		"help": "Notification Set",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
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
					"255": {
						"name": "First",
						"help": "First"
					}
				}
			},
			{
				"type": "Enum",
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NotificationV5)?.command === this.command;
	}

	public constructor(data: Buffer | NotificationV5NotificationSetData) {
		super(NotificationSet, data);
	}
};

export class NotificationSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof NotificationV5 = NotificationV5;
	public static readonly command: number = 0x07; // 7
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 7,
		"name": "NotificationSupportedGet",
		"help": "Notification Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NotificationV5)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(NotificationSupportedGet, data);
	}
};

export class NotificationSupportedReport extends CommandPacket<NotificationV5NotificationSupportedReportData> {
	public static readonly CommandClass: typeof NotificationV5 = NotificationV5;
	public static readonly command: number = 0x08; // 8
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 8,
		"name": "NotificationSupportedReport",
		"help": "Notification Supported Report",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "v1Alarm",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 96,
						"shift": 5,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "numberOfBitMasks",
						"mask": 31,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"bitMask"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Bitmask",
				"name": "bitMask",
				"help": "Bit Mask",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.numberOfBitMasks"
					}
				},
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
					"255": {
						"name": "First",
						"help": "First"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NotificationV5)?.command === this.command;
	}

	public constructor(data: Buffer | NotificationV5NotificationSupportedReportData) {
		super(NotificationSupportedReport, data);
	}
};

export class EventSupportedGet extends CommandPacket<NotificationV5EventSupportedGetData> {
	public static readonly CommandClass: typeof NotificationV5 = NotificationV5;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "EventSupportedGet",
		"help": "Event Supported Get",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
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
					"255": {
						"name": "First",
						"help": "First"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NotificationV5)?.command === this.command;
	}

	public constructor(data: Buffer | NotificationV5EventSupportedGetData) {
		super(EventSupportedGet, data);
	}
};

export class EventSupportedReport extends CommandPacket<NotificationV5EventSupportedReportData> {
	public static readonly CommandClass: typeof NotificationV5 = NotificationV5;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "EventSupportedReport",
		"help": "Event Supported Report",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
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
					"255": {
						"name": "First",
						"help": "First"
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
						"name": "numberOfBitMasks",
						"mask": 31,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"bitMask"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Bitmask",
				"name": "bitMask",
				"help": "Bit Mask",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.numberOfBitMasks"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(NotificationV5)?.command === this.command;
	}

	public constructor(data: Buffer | NotificationV5EventSupportedReportData) {
		super(EventSupportedReport, data);
	}
};
