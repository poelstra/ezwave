/**
 * Command Class Entry Control, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum EntryControlV1Commands {
	EntryControlNotification = 0x01,
	EntryControlKeySupportedGet = 0x02,
	EntryControlKeySupportedReport = 0x03,
	EntryControlEventSupportedGet = 0x04,
	EntryControlEventSupportedReport = 0x05,
	EntryControlConfigurationSet = 0x06,
	EntryControlConfigurationGet = 0x07,
	EntryControlConfigurationReport = 0x08,
}

export interface EntryControlV1EntryControlNotificationData {
	sequenceNumber: number; // 1 byte unsigned integer
	dataType: DataTypeEnum; // properties1[1..0]
	eventType: EventTypeEnum; // 1 byte enum value
	eventData?: Buffer; // variable length
}

export interface EntryControlV1EntryControlKeySupportedReportData {
	keySupportedBitMask: Set<number>; // variable length
}

export interface EntryControlV1EntryControlEventSupportedReportData {
	dataTypeSupportedBitMask: Set<DataTypeSupportedBitMaskEnum>; // variable length
	eventTypeSupportedBitMask: Set<EventTypeSupportedBitMaskEnum>; // variable length
	keyCachedSizeSupportedMinimum: number; // 1 byte unsigned integer
	keyCachedSizeSupportedMaximum: number; // 1 byte unsigned integer
	keyCachedTimeoutSupportedMinimum: number; // 1 byte unsigned integer
	keyCachedTimeoutSupportedMaximum: number; // 1 byte unsigned integer
}

export interface EntryControlV1EntryControlConfigurationSetData {
	keyCacheSize: number; // 1 byte unsigned integer
	keyCacheTimeout: number; // 1 byte unsigned integer
}

export interface EntryControlV1EntryControlConfigurationReportData {
	keyCacheSize: number; // 1 byte unsigned integer
	keyCacheTimeout: number; // 1 byte unsigned integer
}

export enum DataTypeEnum {
	Na = 0x0,
	Raw = 0x1,
	Ascii = 0x2,
	Md5 = 0x3,
}

export enum EventTypeEnum {
	Caching = 0x0,
	CachedKeys = 0x1,
	Enter = 0x2,
	DisarmAll = 0x3,
	ArmAll = 0x4,
	ArmAway = 0x5,
	ArmHome = 0x6,
	ExitDelay = 0x7,
	Arm1 = 0x8,
	Arm2 = 0x9,
	Arm3 = 0xa,
	Arm4 = 0xb,
	Arm5 = 0xc,
	Arm6 = 0xd,
	Rfid = 0xe,
	Bell = 0xf,
	Fire = 0x10,
	Police = 0x11,
	AlertPanic = 0x12,
	AlertMedical = 0x13,
	GateOpen = 0x14,
	GateClose = 0x15,
	Lock = 0x16,
	Unlock = 0x17,
	Test = 0x18,
	Cancel = 0x19,
}

export enum DataTypeSupportedBitMaskEnum {
	Na = 0x0,
	Raw = 0x1,
	Ascii = 0x2,
	Md5 = 0x3,
}

export enum EventTypeSupportedBitMaskEnum {
	Caching = 0x0,
	CachedKeys = 0x1,
	Enter = 0x2,
	DisarmAll = 0x3,
	ArmAll = 0x4,
	ArmAway = 0x5,
	ArmHome = 0x6,
	ExitDelay = 0x7,
	Arm1 = 0x8,
	Arm2 = 0x9,
	Arm3 = 0xa,
	Arm4 = 0xb,
	Arm5 = 0xc,
	Arm6 = 0xd,
	Rfid = 0xe,
	Bell = 0xf,
	Fire = 0x10,
	Police = 0x11,
	AlertPanic = 0x12,
	AlertMedical = 0x13,
	GateOpen = 0x14,
	GateClose = 0x15,
	Lock = 0x16,
	Unlock = 0x17,
	Test = 0x18,
	Cancel = 0x19,
}

export class EntryControlV1 extends CommandClassPacket<EntryControlV1Commands> {
	public static readonly commandClass: number = CommandClasses.EntryControl; // 0x6f (111)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(EntryControlV1, commandAndPayload);
	}
}

export class EntryControlNotification extends CommandPacket<EntryControlV1EntryControlNotificationData> {
	public static readonly CommandClass: typeof EntryControlV1 = EntryControlV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "EntryControlNotification",
		"help": "Entry Control Notification",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "sequenceNumber",
				"help": "Sequence Number",
				"length": 1,
				"presenceOf": {
					"refs": [
						"eventData"
					]
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
						"mask": 252,
						"shift": 2,
						"reserved": true
					},
					{
						"fieldType": "Enum",
						"name": "dataType",
						"mask": 3,
						"shift": 0,
						"values": {
							"0": {
								"name": "Na",
								"help": "NA"
							},
							"1": {
								"name": "Raw",
								"help": "RAW"
							},
							"2": {
								"name": "Ascii",
								"help": "ASCII"
							},
							"3": {
								"name": "Md5",
								"help": "MD5"
							}
						}
					}
				]
			},
			{
				"type": "Enum",
				"name": "eventType",
				"help": "Event Type",
				"length": 1,
				"values": {
					"0": {
						"name": "Caching",
						"help": "CACHING"
					},
					"1": {
						"name": "CachedKeys",
						"help": "CACHED_KEYS"
					},
					"2": {
						"name": "Enter",
						"help": "ENTER"
					},
					"3": {
						"name": "DisarmAll",
						"help": "DISARM_ALL"
					},
					"4": {
						"name": "ArmAll",
						"help": "ARM_ALL"
					},
					"5": {
						"name": "ArmAway",
						"help": "ARM_AWAY"
					},
					"6": {
						"name": "ArmHome",
						"help": "ARM_HOME"
					},
					"7": {
						"name": "ExitDelay",
						"help": "EXIT_DELAY"
					},
					"8": {
						"name": "Arm1",
						"help": "ARM_1"
					},
					"9": {
						"name": "Arm2",
						"help": "ARM_2"
					},
					"10": {
						"name": "Arm3",
						"help": "ARM_3"
					},
					"11": {
						"name": "Arm4",
						"help": "ARM_4"
					},
					"12": {
						"name": "Arm5",
						"help": "ARM_5"
					},
					"13": {
						"name": "Arm6",
						"help": "ARM_6"
					},
					"14": {
						"name": "Rfid",
						"help": "RFID"
					},
					"15": {
						"name": "Bell",
						"help": "BELL"
					},
					"16": {
						"name": "Fire",
						"help": "FIRE"
					},
					"17": {
						"name": "Police",
						"help": "POLICE"
					},
					"18": {
						"name": "AlertPanic",
						"help": "ALERT_PANIC"
					},
					"19": {
						"name": "AlertMedical",
						"help": "ALERT_MEDICAL"
					},
					"20": {
						"name": "GateOpen",
						"help": "GATE_OPEN"
					},
					"21": {
						"name": "GateClose",
						"help": "GATE_CLOSE"
					},
					"22": {
						"name": "Lock",
						"help": "LOCK"
					},
					"23": {
						"name": "Unlock",
						"help": "UNLOCK"
					},
					"24": {
						"name": "Test",
						"help": "TEST"
					},
					"25": {
						"name": "Cancel",
						"help": "CANCEL"
					}
				}
			},
			{
				"type": "Integer",
				"name": "eventDataLength",
				"help": "Event Data Length",
				"length": 1,
				"lengthOf": {
					"refs": [
						"eventData"
					]
				},
				"isAutogenerated": true
			},
			{
				"type": "Blob",
				"name": "eventData",
				"help": "Event Data",
				"optional": {
					"ref": "sequenceNumber"
				},
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "eventDataLength"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(EntryControlV1)?.command === this.command;
	}

	public constructor(data: Buffer | EntryControlV1EntryControlNotificationData) {
		super(EntryControlNotification, data);
	}
};

export class EntryControlKeySupportedGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof EntryControlV1 = EntryControlV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "EntryControlKeySupportedGet",
		"help": "Entry Control Key Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(EntryControlV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(EntryControlKeySupportedGet, data);
	}
};

export class EntryControlKeySupportedReport extends CommandPacket<EntryControlV1EntryControlKeySupportedReportData> {
	public static readonly CommandClass: typeof EntryControlV1 = EntryControlV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "EntryControlKeySupportedReport",
		"help": "Entry Control Key Supported Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "keySupportedBitMaskLength",
				"help": "Key Supported Bit Mask Length",
				"length": 1,
				"lengthOf": {
					"refs": [
						"keySupportedBitMask"
					]
				},
				"isAutogenerated": true
			},
			{
				"type": "Bitmask",
				"name": "keySupportedBitMask",
				"help": "Key Supported Bit Mask",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "keySupportedBitMaskLength"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(EntryControlV1)?.command === this.command;
	}

	public constructor(data: Buffer | EntryControlV1EntryControlKeySupportedReportData) {
		super(EntryControlKeySupportedReport, data);
	}
};

export class EntryControlEventSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof EntryControlV1 = EntryControlV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "EntryControlEventSupportedGet",
		"help": "Entry Control Event Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(EntryControlV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(EntryControlEventSupportedGet, data);
	}
};

export class EntryControlEventSupportedReport extends CommandPacket<EntryControlV1EntryControlEventSupportedReportData> {
	public static readonly CommandClass: typeof EntryControlV1 = EntryControlV1;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "EntryControlEventSupportedReport",
		"help": "Entry Control Event Supported Report",
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
						"name": "reserved1",
						"mask": 252,
						"shift": 2,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "dataTypeSupportedBitMaskLength",
						"mask": 3,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"dataTypeSupportedBitMask"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Bitmask",
				"name": "dataTypeSupportedBitMask",
				"help": "Data Type Supported Bit Mask",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.dataTypeSupportedBitMaskLength"
					}
				},
				"values": {
					"0": {
						"name": "Na",
						"help": "NA"
					},
					"1": {
						"name": "Raw",
						"help": "RAW"
					},
					"2": {
						"name": "Ascii",
						"help": "ASCII"
					},
					"3": {
						"name": "Md5",
						"help": "MD5"
					}
				}
			},
			{
				"type": "Bitfield",
				"name": "properties2",
				"help": "Properties2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved2",
						"mask": 224,
						"shift": 5,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "eventSupportedBitMaskLength",
						"mask": 31,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"eventTypeSupportedBitMask"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Bitmask",
				"name": "eventTypeSupportedBitMask",
				"help": "Event Type Supported Bit Mask",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties2.eventSupportedBitMaskLength"
					}
				},
				"values": {
					"0": {
						"name": "Caching",
						"help": "CACHING"
					},
					"1": {
						"name": "CachedKeys",
						"help": "CACHED_KEYS"
					},
					"2": {
						"name": "Enter",
						"help": "ENTER"
					},
					"3": {
						"name": "DisarmAll",
						"help": "DISARM_ALL"
					},
					"4": {
						"name": "ArmAll",
						"help": "ARM_ALL"
					},
					"5": {
						"name": "ArmAway",
						"help": "ARM_AWAY"
					},
					"6": {
						"name": "ArmHome",
						"help": "ARM_HOME"
					},
					"7": {
						"name": "ExitDelay",
						"help": "EXIT_DELAY"
					},
					"8": {
						"name": "Arm1",
						"help": "ARM_1"
					},
					"9": {
						"name": "Arm2",
						"help": "ARM_2"
					},
					"10": {
						"name": "Arm3",
						"help": "ARM_3"
					},
					"11": {
						"name": "Arm4",
						"help": "ARM_4"
					},
					"12": {
						"name": "Arm5",
						"help": "ARM_5"
					},
					"13": {
						"name": "Arm6",
						"help": "ARM_6"
					},
					"14": {
						"name": "Rfid",
						"help": "RFID"
					},
					"15": {
						"name": "Bell",
						"help": "BELL"
					},
					"16": {
						"name": "Fire",
						"help": "FIRE"
					},
					"17": {
						"name": "Police",
						"help": "POLICE"
					},
					"18": {
						"name": "AlertPanic",
						"help": "ALERT_PANIC"
					},
					"19": {
						"name": "AlertMedical",
						"help": "ALERT_MEDICAL"
					},
					"20": {
						"name": "GateOpen",
						"help": "GATE_OPEN"
					},
					"21": {
						"name": "GateClose",
						"help": "GATE_CLOSE"
					},
					"22": {
						"name": "Lock",
						"help": "LOCK"
					},
					"23": {
						"name": "Unlock",
						"help": "UNLOCK"
					},
					"24": {
						"name": "Test",
						"help": "TEST"
					},
					"25": {
						"name": "Cancel",
						"help": "CANCEL"
					}
				}
			},
			{
				"type": "Integer",
				"name": "keyCachedSizeSupportedMinimum",
				"help": "Key Cached Size supported Minimum",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "keyCachedSizeSupportedMaximum",
				"help": "Key Cached Size supported Maximum",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "keyCachedTimeoutSupportedMinimum",
				"help": "Key Cached Timeout supported Minimum",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "keyCachedTimeoutSupportedMaximum",
				"help": "Key Cached Timeout supported Maximum",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(EntryControlV1)?.command === this.command;
	}

	public constructor(data: Buffer | EntryControlV1EntryControlEventSupportedReportData) {
		super(EntryControlEventSupportedReport, data);
	}
};

export class EntryControlConfigurationSet extends CommandPacket<EntryControlV1EntryControlConfigurationSetData> {
	public static readonly CommandClass: typeof EntryControlV1 = EntryControlV1;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 6,
		"name": "EntryControlConfigurationSet",
		"help": "Entry Control Configuration Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "keyCacheSize",
				"help": "Key Cache Size",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "keyCacheTimeout",
				"help": "Key Cache Timeout",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(EntryControlV1)?.command === this.command;
	}

	public constructor(data: Buffer | EntryControlV1EntryControlConfigurationSetData) {
		super(EntryControlConfigurationSet, data);
	}
};

export class EntryControlConfigurationGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof EntryControlV1 = EntryControlV1;
	public static readonly command: number = 0x07; // 7
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 7,
		"name": "EntryControlConfigurationGet",
		"help": "Entry Control Configuration Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(EntryControlV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(EntryControlConfigurationGet, data);
	}
};

export class EntryControlConfigurationReport extends CommandPacket<EntryControlV1EntryControlConfigurationReportData> {
	public static readonly CommandClass: typeof EntryControlV1 = EntryControlV1;
	public static readonly command: number = 0x08; // 8
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 8,
		"name": "EntryControlConfigurationReport",
		"help": "Entry Control Configuration Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "keyCacheSize",
				"help": "Key Cache Size",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "keyCacheTimeout",
				"help": "Key Cache Timeout",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(EntryControlV1)?.command === this.command;
	}

	public constructor(data: Buffer | EntryControlV1EntryControlConfigurationReportData) {
		super(EntryControlConfigurationReport, data);
	}
};
