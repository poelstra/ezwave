/**
 * Command Class Alarm, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum AlarmV2Commands {
	AlarmGet = 0x04,
	AlarmReport = 0x05,
	AlarmSet = 0x06,
	AlarmTypeSupportedGet = 0x07,
	AlarmTypeSupportedReport = 0x08,
}

export interface AlarmV2AlarmGetData {
	alarmType: number; // 1 byte unsigned integer
	zWaveAlarmType: ZWaveAlarmTypeEnum; // 1 byte enum value
}

export interface AlarmV2AlarmReportData {
	alarmType: number; // 1 byte unsigned integer
	alarmLevel: number; // 1 byte unsigned integer
	zensorNetSourceNodeID: number; // 1 byte unsigned integer
	zWaveAlarmStatus: number; // 1 byte unsigned integer
	zWaveAlarmType: ZWaveAlarmTypeEnum; // 1 byte enum value
	zWaveAlarmEvent: number; // 1 byte unsigned integer
	numberOfEventParameters: number; // 1 byte unsigned integer
	// TODO param eventParameter type blob
}

export interface AlarmV2AlarmSetData {
	zWaveAlarmType: ZWaveAlarmTypeEnum; // 1 byte enum value
	zWaveAlarmStatus: number; // 1 byte unsigned integer
}

export interface AlarmV2AlarmTypeSupportedReportData {
	v1Alarm: boolean; // properties1[7]
	numberOfBitMasks: number; // properties1[4..0]
	// TODO param bitMask type bitmask or marker
}

export enum ZWaveAlarmTypeEnum {
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

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(AlarmV2, commandAndPayload);
	}

	public static readonly AlarmGet = class AlarmGet extends CommandPacket<AlarmV2AlarmGetData> {
		public static readonly CommandClass = AlarmV2;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "AlarmGet",
			"help": "Alarm Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "alarmType",
					"help": "Alarm Type",
					"length": 1
				},
				{
					"type": "enum",
					"name": "zWaveAlarmType",
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
		} as CommandDefinition;

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
		public static readonly definition = {
			"command": 5,
			"name": "AlarmReport",
			"help": "Alarm Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "alarmType",
					"help": "Alarm Type",
					"length": 1
				},
				{
					"type": "integer",
					"name": "alarmLevel",
					"help": "Alarm Level",
					"length": 1
				},
				{
					"type": "integer",
					"name": "zensorNetSourceNodeID",
					"help": "Zensor Net Source Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "integer",
					"name": "zWaveAlarmStatus",
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
					"type": "enum",
					"name": "zWaveAlarmType",
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
					"type": "integer",
					"name": "zWaveAlarmEvent",
					"help": "ZWave Alarm Event",
					"length": 1
				},
				{
					"type": "integer",
					"name": "numberOfEventParameters",
					"help": "Number of Event Parameters",
					"length": 1
				},
				{
					"type": "blob",
					"name": "eventParameter",
					"help": "Event Parameter",
					"length": {
						"ref": "numberOfEventParameters"
					}
				}
			]
		} as CommandDefinition;

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
		public static readonly definition = {
			"command": 6,
			"name": "AlarmSet",
			"help": "Alarm Set",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "zWaveAlarmType",
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
					"type": "integer",
					"name": "zWaveAlarmStatus",
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
		} as CommandDefinition;

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
		public static readonly definition = {
			"command": 7,
			"name": "AlarmTypeSupportedGet",
			"help": "Alarm Type Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

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
		public static readonly definition = {
			"command": 8,
			"name": "AlarmTypeSupportedReport",
			"help": "Alarm Type Supported Report",
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
