/**
 * Command Class Entry Control, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

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
	keySupportedBitMaskLength: number; // 1 byte unsigned integer
	// TODO param keySupportedBitMask type bitmask or marker
}

export interface EntryControlV1EntryControlEventSupportedReportData {
	dataTypeSupportedBitMaskLength: number; // properties1[1..0]
	// TODO param dataTypeSupportedBitMask type bitmask or marker
	eventSupportedBitMaskLength: number; // properties2[4..0]
	// TODO param eventTypeSupportedBitMask type bitmask or marker
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

export class EntryControlV1 extends CommandClassPacket<EntryControlV1Commands> {
	public static readonly commandClass = CommandClasses.EntryControl; // 0x6f (111)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(EntryControlV1, commandAndPayload);
	}

	public static readonly EntryControlNotification = class EntryControlNotification extends CommandPacket<EntryControlV1EntryControlNotificationData> {
		public static readonly CommandClass = EntryControlV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "EntryControlNotification",
			"help": "Entry Control Notification",
			"status": "active",
			"params": [
				{
					"type": "integer",
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
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "reserved",
							"mask": 252,
							"shift": 2,
							"reserved": true
						},
						{
							"fieldType": "enum",
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
					"type": "enum",
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
					"type": "integer",
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
					"type": "blob",
					"name": "eventData",
					"help": "Event Data",
					"optional": {
						"ref": "sequenceNumber"
					},
					"length": {
						"lengthType": "ref",
						"from": {
							"ref": "eventDataLength"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(EntryControlV1)?.command === this.command;
		}

		constructor(data: Buffer | EntryControlV1EntryControlNotificationData) {
			super(EntryControlNotification, data);
		}
	};

	public static readonly EntryControlKeySupportedGet = class EntryControlKeySupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = EntryControlV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "EntryControlKeySupportedGet",
			"help": "Entry Control Key Supported Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(EntryControlV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(EntryControlKeySupportedGet, data);
		}
	};

	// TODO This command is not yet fully supported by the decoder/encoder
	public static readonly EntryControlKeySupportedReport = class EntryControlKeySupportedReport extends CommandPacket<EntryControlV1EntryControlKeySupportedReportData> {
		public static readonly CommandClass = EntryControlV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "EntryControlKeySupportedReport",
			"help": "Entry Control Key Supported Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "keySupportedBitMaskLength",
					"help": "Key Supported Bit Mask Length",
					"length": 1
				},
				{
					"type": "integer",
					"name": "keySupportedBitMask",
					"help": "Key Supported Bit Mask",
					"length": 0
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(EntryControlV1)?.command === this.command;
		}

		constructor(data: Buffer | EntryControlV1EntryControlKeySupportedReportData) {
			super(EntryControlKeySupportedReport, data);
		}
	};

	public static readonly EntryControlEventSupportedGet = class EntryControlEventSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = EntryControlV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "EntryControlEventSupportedGet",
			"help": "Entry Control Event Supported Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(EntryControlV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(EntryControlEventSupportedGet, data);
		}
	};

	// TODO This command is not yet fully supported by the decoder/encoder
	public static readonly EntryControlEventSupportedReport = class EntryControlEventSupportedReport extends CommandPacket<EntryControlV1EntryControlEventSupportedReportData> {
		public static readonly CommandClass = EntryControlV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "EntryControlEventSupportedReport",
			"help": "Entry Control Event Supported Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "reserved1",
							"mask": 252,
							"shift": 2,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "dataTypeSupportedBitMaskLength",
							"mask": 3,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "dataTypeSupportedBitMask",
					"help": "Data Type Supported Bit Mask",
					"length": 0
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "reserved2",
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "eventSupportedBitMaskLength",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "eventTypeSupportedBitMask",
					"help": "Event Type Supported Bit Mask",
					"length": 0
				},
				{
					"type": "integer",
					"name": "keyCachedSizeSupportedMinimum",
					"help": "Key Cached Size supported Minimum",
					"length": 1
				},
				{
					"type": "integer",
					"name": "keyCachedSizeSupportedMaximum",
					"help": "Key Cached Size supported Maximum",
					"length": 1
				},
				{
					"type": "integer",
					"name": "keyCachedTimeoutSupportedMinimum",
					"help": "Key Cached Timeout supported Minimum",
					"length": 1
				},
				{
					"type": "integer",
					"name": "keyCachedTimeoutSupportedMaximum",
					"help": "Key Cached Timeout supported Maximum",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(EntryControlV1)?.command === this.command;
		}

		constructor(data: Buffer | EntryControlV1EntryControlEventSupportedReportData) {
			super(EntryControlEventSupportedReport, data);
		}
	};

	public static readonly EntryControlConfigurationSet = class EntryControlConfigurationSet extends CommandPacket<EntryControlV1EntryControlConfigurationSetData> {
		public static readonly CommandClass = EntryControlV1;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "EntryControlConfigurationSet",
			"help": "Entry Control Configuration Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "keyCacheSize",
					"help": "Key Cache Size",
					"length": 1
				},
				{
					"type": "integer",
					"name": "keyCacheTimeout",
					"help": "Key Cache Timeout",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(EntryControlV1)?.command === this.command;
		}

		constructor(data: Buffer | EntryControlV1EntryControlConfigurationSetData) {
			super(EntryControlConfigurationSet, data);
		}
	};

	public static readonly EntryControlConfigurationGet = class EntryControlConfigurationGet extends CommandPacket<void> {
		public static readonly CommandClass = EntryControlV1;
		public static readonly command = 0x07;
		public static readonly definition = convertFromJsonCommand({
			"command": 7,
			"name": "EntryControlConfigurationGet",
			"help": "Entry Control Configuration Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(EntryControlV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(EntryControlConfigurationGet, data);
		}
	};

	public static readonly EntryControlConfigurationReport = class EntryControlConfigurationReport extends CommandPacket<EntryControlV1EntryControlConfigurationReportData> {
		public static readonly CommandClass = EntryControlV1;
		public static readonly command = 0x08;
		public static readonly definition = convertFromJsonCommand({
			"command": 8,
			"name": "EntryControlConfigurationReport",
			"help": "Entry Control Configuration Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "keyCacheSize",
					"help": "Key Cache Size",
					"length": 1
				},
				{
					"type": "integer",
					"name": "keyCacheTimeout",
					"help": "Key Cache Timeout",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(EntryControlV1)?.command === this.command;
		}

		constructor(data: Buffer | EntryControlV1EntryControlConfigurationReportData) {
			super(EntryControlConfigurationReport, data);
		}
	};
}

export namespace EntryControlV1 {
	export type EntryControlNotification = InstanceType<typeof EntryControlV1.EntryControlNotification>;
	export type EntryControlKeySupportedGet = InstanceType<typeof EntryControlV1.EntryControlKeySupportedGet>;
	export type EntryControlKeySupportedReport = InstanceType<typeof EntryControlV1.EntryControlKeySupportedReport>;
	export type EntryControlEventSupportedGet = InstanceType<typeof EntryControlV1.EntryControlEventSupportedGet>;
	export type EntryControlEventSupportedReport = InstanceType<typeof EntryControlV1.EntryControlEventSupportedReport>;
	export type EntryControlConfigurationSet = InstanceType<typeof EntryControlV1.EntryControlConfigurationSet>;
	export type EntryControlConfigurationGet = InstanceType<typeof EntryControlV1.EntryControlConfigurationGet>;
	export type EntryControlConfigurationReport = InstanceType<typeof EntryControlV1.EntryControlConfigurationReport>;
}
