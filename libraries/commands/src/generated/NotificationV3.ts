/**
 * Command Class Notification, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	eventParameter: Buffer; // variable length
	sequenceNumber: number; // 1 byte unsigned integer
}

export interface NotificationV3NotificationSetData {
	notificationType: NotificationTypeEnum; // 1 byte enum value
	notificationStatus: number; // 1 byte unsigned integer
}

export interface NotificationV3NotificationSupportedReportData {
	v1Alarm: boolean; // properties1[7]
	bitMask: Set<BitMaskEnum>; // variable length
}

export interface NotificationV3EventSupportedGetData {
	notificationType: NotificationTypeEnum; // 1 byte enum value
}

export interface NotificationV3EventSupportedReportData {
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
	Burglar = 0x7,
	PowerManagement = 0x8,
	System = 0x9,
	Emergency = 0xa,
	Clock = 0xb,
	First = 0xff,
}

export enum BitMaskEnum {
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
	public static readonly version = 3;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(NotificationV3, commandAndPayload);
	}
}

export class NotificationGet extends CommandPacket<NotificationV3NotificationGetData> {
	public static readonly CommandClass = NotificationV3;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
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
				"type": "Integer",
				"name": "event",
				"help": "Event",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(NotificationV3)?.command === this.command;
	}

	public constructor(data: Buffer | NotificationV3NotificationGetData) {
		super(NotificationGet, data);
	}
};

export class NotificationReport extends CommandPacket<NotificationV3NotificationReportData> {
	public static readonly CommandClass = NotificationV3;
	public static readonly command = 0x05; // 5
	public static readonly definition = convertFromJsonCommand({
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
				"type": "Integer",
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

	static matches(packet: Packet): boolean {
		return packet.tryAs(NotificationV3)?.command === this.command;
	}

	public constructor(data: Buffer | NotificationV3NotificationReportData) {
		super(NotificationReport, data);
	}
};

export class NotificationSet extends CommandPacket<NotificationV3NotificationSetData> {
	public static readonly CommandClass = NotificationV3;
	public static readonly command = 0x06; // 6
	public static readonly definition = convertFromJsonCommand({
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
				"type": "Integer",
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(NotificationV3)?.command === this.command;
	}

	public constructor(data: Buffer | NotificationV3NotificationSetData) {
		super(NotificationSet, data);
	}
};

export class NotificationSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass = NotificationV3;
	public static readonly command = 0x07; // 7
	public static readonly definition = convertFromJsonCommand({
		"command": 7,
		"name": "NotificationSupportedGet",
		"help": "Notification Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(NotificationV3)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(NotificationSupportedGet, data);
	}
};

export class NotificationSupportedReport extends CommandPacket<NotificationV3NotificationSupportedReportData> {
	public static readonly CommandClass = NotificationV3;
	public static readonly command = 0x08; // 8
	public static readonly definition = convertFromJsonCommand({
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(NotificationV3)?.command === this.command;
	}

	public constructor(data: Buffer | NotificationV3NotificationSupportedReportData) {
		super(NotificationSupportedReport, data);
	}
};

export class EventSupportedGet extends CommandPacket<NotificationV3EventSupportedGetData> {
	public static readonly CommandClass = NotificationV3;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(NotificationV3)?.command === this.command;
	}

	public constructor(data: Buffer | NotificationV3EventSupportedGetData) {
		super(EventSupportedGet, data);
	}
};

export class EventSupportedReport extends CommandPacket<NotificationV3EventSupportedReportData> {
	public static readonly CommandClass = NotificationV3;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
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

	static matches(packet: Packet): boolean {
		return packet.tryAs(NotificationV3)?.command === this.command;
	}

	public constructor(data: Buffer | NotificationV3EventSupportedReportData) {
		super(EventSupportedReport, data);
	}
};
