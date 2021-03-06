/**
 * Command Class Alarm, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum AlarmV2Commands {
	AlarmGet = 0x04,
	AlarmReport = 0x05,
	AlarmSet = 0x06,
	AlarmTypeSupportedGet = 0x07,
	AlarmTypeSupportedReport = 0x08,
}

export interface AlarmV2AlarmGetData {
	alarmType: number; // 1 byte unsigned integer
	zwaveAlarmType: ZwaveAlarmTypeEnum; // 1 byte enum value
}

export interface AlarmV2AlarmReportData {
	alarmType: number; // 1 byte unsigned integer
	alarmLevel: number; // 1 byte unsigned integer
	zensorNetSourceNodeId: number; // 1 byte unsigned integer
	zwaveAlarmStatus: number; // 1 byte unsigned integer
	zwaveAlarmType: ZwaveAlarmTypeEnum; // 1 byte enum value
	zwaveAlarmEvent: number; // 1 byte unsigned integer
	eventParameter: Buffer; // variable length
}

export interface AlarmV2AlarmSetData {
	zwaveAlarmType: ZwaveAlarmTypeEnum; // 1 byte enum value
	zwaveAlarmStatus: number; // 1 byte unsigned integer
}

export interface AlarmV2AlarmTypeSupportedReportData {
	v1Alarm: boolean; // properties1[7]
	bitMask: Set<BitMaskEnum>; // variable length
}

export enum ZwaveAlarmTypeEnum {
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
export class AlarmV2 extends CommandClassPacket<AlarmV2Commands> {
	public static readonly commandClass = CommandClasses.Alarm; // 0x71 (113)
	public static readonly version = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(AlarmV2, commandAndPayload);
	}

	public static readonly AlarmGet = class AlarmGet extends CommandPacket<AlarmV2AlarmGetData> {
		public static readonly CommandClass = AlarmV2;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "AlarmGet",
			"help": "Alarm Get",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "alarmType",
					"help": "Alarm Type",
					"length": 1
				},
				{
					"type": "Enum",
					"name": "zwaveAlarmType",
					"help": "ZWave Alarm Type",
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AlarmV2)?.command === this.command;
		}

		constructor(data: Buffer | AlarmV2AlarmGetData) {
			super(AlarmGet, data);
		}
	};

	public static readonly AlarmReport = class AlarmReport extends CommandPacket<AlarmV2AlarmReportData> {
		public static readonly CommandClass = AlarmV2;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "AlarmReport",
			"help": "Alarm Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "alarmType",
					"help": "Alarm Type",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "alarmLevel",
					"help": "Alarm Level",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "zensorNetSourceNodeId",
					"help": "Zensor Net Source Node ID",
					"length": 1,
					"valueType": "NodeNumber"
				},
				{
					"type": "Integer",
					"name": "zwaveAlarmStatus",
					"help": "ZWave Alarm Status",
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
					"name": "zwaveAlarmType",
					"help": "ZWave Alarm Type",
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
					"name": "zwaveAlarmEvent",
					"help": "ZWave Alarm Event",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "numberOfEventParameters",
					"help": "Number of Event Parameters",
					"length": 1,
					"lengthOf": {
						"refs": [
							"eventParameter"
						]
					},
					"isAutogenerated": true
				},
				{
					"type": "Blob",
					"name": "eventParameter",
					"help": "Event Parameter",
					"length": {
						"lengthType": "Ref",
						"from": {
							"ref": "numberOfEventParameters"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AlarmV2)?.command === this.command;
		}

		constructor(data: Buffer | AlarmV2AlarmReportData) {
			super(AlarmReport, data);
		}
	};

	public static readonly AlarmSet = class AlarmSet extends CommandPacket<AlarmV2AlarmSetData> {
		public static readonly CommandClass = AlarmV2;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "AlarmSet",
			"help": "Alarm Set",
			"status": "Active",
			"params": [
				{
					"type": "Enum",
					"name": "zwaveAlarmType",
					"help": "ZWave Alarm Type",
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
					"name": "zwaveAlarmStatus",
					"help": "ZWave Alarm Status",
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AlarmV2)?.command === this.command;
		}

		constructor(data: Buffer | AlarmV2AlarmSetData) {
			super(AlarmSet, data);
		}
	};

	public static readonly AlarmTypeSupportedGet = class AlarmTypeSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = AlarmV2;
		public static readonly command = 0x07;
		public static readonly definition = convertFromJsonCommand({
			"command": 7,
			"name": "AlarmTypeSupportedGet",
			"help": "Alarm Type Supported Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AlarmV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(AlarmTypeSupportedGet, data);
		}
	};

	public static readonly AlarmTypeSupportedReport = class AlarmTypeSupportedReport extends CommandPacket<AlarmV2AlarmTypeSupportedReportData> {
		public static readonly CommandClass = AlarmV2;
		public static readonly command = 0x08;
		public static readonly definition = convertFromJsonCommand({
			"command": 8,
			"name": "AlarmTypeSupportedReport",
			"help": "Alarm Type Supported Report",
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(AlarmV2)?.command === this.command;
		}

		constructor(data: Buffer | AlarmV2AlarmTypeSupportedReportData) {
			super(AlarmTypeSupportedReport, data);
		}
	};
}

export namespace AlarmV2 {
	export type AlarmGet = InstanceType<typeof AlarmV2.AlarmGet>;
	export type AlarmReport = InstanceType<typeof AlarmV2.AlarmReport>;
	export type AlarmSet = InstanceType<typeof AlarmV2.AlarmSet>;
	export type AlarmTypeSupportedGet = InstanceType<typeof AlarmV2.AlarmTypeSupportedGet>;
	export type AlarmTypeSupportedReport = InstanceType<typeof AlarmV2.AlarmTypeSupportedReport>;
}
