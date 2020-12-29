/**
 * Command Class Chimney Fan, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ChimneyFanV1Commands {
	ChimneyFanAlarmLogGet = 0x20,
	ChimneyFanAlarmLogReport = 0x21,
	ChimneyFanAlarmLogSet = 0x1f,
	ChimneyFanAlarmStatusGet = 0x23,
	ChimneyFanAlarmStatusReport = 0x24,
	ChimneyFanAlarmStatusSet = 0x22,
	ChimneyFanAlarmTempGet = 0x0e,
	ChimneyFanAlarmTempReport = 0x0f,
	ChimneyFanAlarmTempSet = 0x0d,
	ChimneyFanBoostTimeGet = 0x11,
	ChimneyFanBoostTimeReport = 0x12,
	ChimneyFanBoostTimeSet = 0x10,
	ChimneyFanDefaultSet = 0x28,
	ChimneyFanMinSpeedGet = 0x26,
	ChimneyFanMinSpeedReport = 0x27,
	ChimneyFanMinSpeedSet = 0x25,
	ChimneyFanModeGet = 0x17,
	ChimneyFanModeReport = 0x18,
	ChimneyFanModeSet = 0x16,
	ChimneyFanSetupGet = 0x1a,
	ChimneyFanSetupReport = 0x1b,
	ChimneyFanSetupSet = 0x19,
	ChimneyFanSpeedGet = 0x05,
	ChimneyFanSpeedReport = 0x06,
	ChimneyFanSpeedSet = 0x04,
	ChimneyFanStartTempGet = 0x08,
	ChimneyFanStartTempReport = 0x09,
	ChimneyFanStartTempSet = 0x07,
	ChimneyFanStateGet = 0x02,
	ChimneyFanStateReport = 0x03,
	ChimneyFanStateSet = 0x01,
	ChimneyFanStatusGet = 0x1d,
	ChimneyFanStatusReport = 0x1e,
	ChimneyFanStopTempGet = 0x0b,
	ChimneyFanStopTempReport = 0x0c,
	ChimneyFanStopTempSet = 0x0a,
	ChimneyFanStopTimeGet = 0x14,
	ChimneyFanStopTimeReport = 0x15,
	ChimneyFanStopTimeSet = 0x13,
}

export interface ChimneyFanV1ChimneyFanAlarmLogReportData {
	// TODO param alarmEvent1 type bitfield
	// TODO param alarmEvent2 type bitfield
	// TODO param alarmEvent3 type bitfield
	// TODO param alarmEvent4 type bitfield
	// TODO param alarmEvent5 type bitfield
}

export interface ChimneyFanV1ChimneyFanAlarmLogSetData {
	message: MessageEnum; // 1 byte enum value
}

export interface ChimneyFanV1ChimneyFanAlarmStatusReportData {
	// TODO param alarmStatus type bitfield
}

export interface ChimneyFanV1ChimneyFanAlarmStatusSetData {
	// TODO param message type bitfield
}

export interface ChimneyFanV1ChimneyFanAlarmTempReportData {
	// TODO param properties1 type bitfield
	// TODO param value type blob
}

export interface ChimneyFanV1ChimneyFanAlarmTempSetData {
	// TODO param properties1 type bitfield
	// TODO param value type blob
}

export interface ChimneyFanV1ChimneyFanBoostTimeReportData {
	time: number; // 1 byte unsigned integer
}

export interface ChimneyFanV1ChimneyFanBoostTimeSetData {
	time: number; // 1 byte unsigned integer
}

export interface ChimneyFanV1ChimneyFanMinSpeedReportData {
	minSpeed: number; // 1 byte unsigned integer
}

export interface ChimneyFanV1ChimneyFanMinSpeedSetData {
	minSpeed: number; // 1 byte unsigned integer
}

export interface ChimneyFanV1ChimneyFanModeReportData {
	mode: ModeEnum; // 1 byte enum value
}

export interface ChimneyFanV1ChimneyFanModeSetData {
	mode: ModeEnum; // 1 byte enum value
}

export interface ChimneyFanV1ChimneyFanSetupReportData {
	mode: ModeEnum; // 1 byte enum value
	boostTime: number; // 1 byte unsigned integer
	stopTime: number; // 1 byte unsigned integer
	minSpeed: number; // 1 byte unsigned integer
	// TODO param properties1 type bitfield
	// TODO param startTemperature type blob
	// TODO param properties2 type bitfield
	// TODO param stopTemperature type blob
	// TODO param properties3 type bitfield
	// TODO param alarmTemperatureValue type blob
}

export interface ChimneyFanV1ChimneyFanSetupSetData {
	mode: ModeEnum; // 1 byte enum value
	boostTime: number; // 1 byte unsigned integer
	stopTime: number; // 1 byte unsigned integer
	minSpeed: number; // 1 byte unsigned integer
	// TODO param properties1 type bitfield
	// TODO param startTemperature type blob
	// TODO param properties2 type bitfield
	// TODO param stopTemperature type blob
	// TODO param properties3 type bitfield
	// TODO param alarmTemperatureValue type blob
}

export interface ChimneyFanV1ChimneyFanSpeedReportData {
	speed: number; // 1 byte unsigned integer
}

export interface ChimneyFanV1ChimneyFanSpeedSetData {
	speed: number; // 1 byte unsigned integer
}

export interface ChimneyFanV1ChimneyFanStartTempReportData {
	// TODO param properties1 type bitfield
	// TODO param value type blob
}

export interface ChimneyFanV1ChimneyFanStartTempSetData {
	// TODO param properties1 type bitfield
	// TODO param value type blob
}

export interface ChimneyFanV1ChimneyFanStateReportData {
	state: StateEnum; // 1 byte enum value
}

export interface ChimneyFanV1ChimneyFanStateSetData {
	state: State2Enum; // 1 byte enum value
}

export interface ChimneyFanV1ChimneyFanStatusReportData {
	state: StateEnum; // 1 byte enum value
	speed: number; // 1 byte unsigned integer
	// TODO param alarmStatus type bitfield
	// TODO param properties1 type bitfield
	// TODO param value type blob
}

export interface ChimneyFanV1ChimneyFanStopTempReportData {
	// TODO param properties1 type bitfield
	// TODO param value type blob
}

export interface ChimneyFanV1ChimneyFanStopTempSetData {
	// TODO param properties1 type bitfield
	// TODO param value type blob
}

export interface ChimneyFanV1ChimneyFanStopTimeReportData {
	time: number; // 1 byte unsigned integer
}

export interface ChimneyFanV1ChimneyFanStopTimeSetData {
	time: number; // 1 byte unsigned integer
}

export class ChimneyFanV1 extends CommandClassPacket<ChimneyFanV1Commands> {
	public static readonly commandClass = CommandClasses.ChimneyFan; // 0x2a (42)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ChimneyFanV1, commandAndPayload);
	}

	public static readonly ChimneyFanAlarmLogGet = class ChimneyFanAlarmLogGet extends CommandPacket<void> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x20;
		public static readonly definition = {
			"command": 32,
			"name": "ChimneyFanAlarmLogGet",
			"help": "Chimney Fan Alarm Log Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ChimneyFanAlarmLogGet, data);
		}
	};

	public static readonly ChimneyFanAlarmLogReport = class ChimneyFanAlarmLogReport extends CommandPacket<ChimneyFanV1ChimneyFanAlarmLogReportData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x21;
		public static readonly definition = {
			"command": 33,
			"name": "ChimneyFanAlarmLogReport",
			"help": "Chimney Fan Alarm Log Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "alarmEvent1",
					"help": "Alarm Event 1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "Reserved11",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "External Alarm 1",
							"mask": 2,
							"shift": 1
						},
						{
							"type": "boolean",
							"name": "Sensor Error 1",
							"mask": 4,
							"shift": 2
						},
						{
							"type": "boolean",
							"name": "Alarm Temperature Exceeded 1",
							"mask": 8,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Reserved12",
							"mask": 112,
							"shift": 4
						},
						{
							"type": "boolean",
							"name": "Alarm still active 1",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "bitfield",
					"name": "alarmEvent2",
					"help": "Alarm Event 2",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "Reserved21",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "External Alarm 2",
							"mask": 2,
							"shift": 1
						},
						{
							"type": "boolean",
							"name": "Sensor Error 2",
							"mask": 4,
							"shift": 2
						},
						{
							"type": "boolean",
							"name": "Alarm Temperature Exceeded 2",
							"mask": 8,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Reserved22",
							"mask": 112,
							"shift": 4
						},
						{
							"type": "boolean",
							"name": "Alarm still active 2",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "bitfield",
					"name": "alarmEvent3",
					"help": "Alarm Event 3",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "Reserved31",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "External Alarm 3",
							"mask": 2,
							"shift": 1
						},
						{
							"type": "boolean",
							"name": "Sensor Error 3",
							"mask": 4,
							"shift": 2
						},
						{
							"type": "boolean",
							"name": "Alarm Temperature Exceeded 3",
							"mask": 8,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Reserved32",
							"mask": 112,
							"shift": 4
						},
						{
							"type": "boolean",
							"name": "Alarm still active 3",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "bitfield",
					"name": "alarmEvent4",
					"help": "Alarm Event 4",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "Reserved41",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "External Alarm 4",
							"mask": 2,
							"shift": 1
						},
						{
							"type": "boolean",
							"name": "Sensor Error 4",
							"mask": 4,
							"shift": 2
						},
						{
							"type": "boolean",
							"name": "Alarm Temperature Exceeded 4",
							"mask": 8,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Reserved42",
							"mask": 112,
							"shift": 4
						},
						{
							"type": "boolean",
							"name": "Alarm still active 4",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "bitfield",
					"name": "alarmEvent5",
					"help": "Alarm Event 5",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "Reserved51",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "External Alarm 5",
							"mask": 2,
							"shift": 1
						},
						{
							"type": "boolean",
							"name": "Sensor Error 5",
							"mask": 4,
							"shift": 2
						},
						{
							"type": "boolean",
							"name": "Alarm Temperature Exceeded 5",
							"mask": 8,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Reserved52",
							"mask": 112,
							"shift": 4
						},
						{
							"type": "boolean",
							"name": "Alarm still active 5",
							"mask": 128,
							"shift": 7
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanAlarmLogReportData) {
			super(ChimneyFanAlarmLogReport, data);
		}
	};

	public static readonly ChimneyFanAlarmLogSet = class ChimneyFanAlarmLogSet extends CommandPacket<ChimneyFanV1ChimneyFanAlarmLogSetData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x1f;
		public static readonly definition = {
			"command": 31,
			"name": "ChimneyFanAlarmLogSet",
			"help": "Chimney Fan Alarm Log Set",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "message",
					"help": "Message",
					"length": 1,
					"values": {
						"8": "Reset log"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanAlarmLogSetData) {
			super(ChimneyFanAlarmLogSet, data);
		}
	};

	public static readonly ChimneyFanAlarmStatusGet = class ChimneyFanAlarmStatusGet extends CommandPacket<void> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x23;
		public static readonly definition = {
			"command": 35,
			"name": "ChimneyFanAlarmStatusGet",
			"help": "Chimney Fan Alarm Status Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ChimneyFanAlarmStatusGet, data);
		}
	};

	public static readonly ChimneyFanAlarmStatusReport = class ChimneyFanAlarmStatusReport extends CommandPacket<ChimneyFanV1ChimneyFanAlarmStatusReportData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x24;
		public static readonly definition = {
			"command": 36,
			"name": "ChimneyFanAlarmStatusReport",
			"help": "Chimney Fan Alarm Status Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "alarmStatus",
					"help": "Alarm Status",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "Service",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "External Alarm",
							"mask": 2,
							"shift": 1
						},
						{
							"type": "boolean",
							"name": "Sensor Error",
							"mask": 4,
							"shift": 2
						},
						{
							"type": "boolean",
							"name": "Alarm Temperature Exceeded",
							"mask": 8,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Not Used",
							"mask": 48,
							"shift": 4
						},
						{
							"type": "boolean",
							"name": "Speed change Enable",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "boolean",
							"name": "Start Temperature Exceeded",
							"mask": 128,
							"shift": 7
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanAlarmStatusReportData) {
			super(ChimneyFanAlarmStatusReport, data);
		}
	};

	public static readonly ChimneyFanAlarmStatusSet = class ChimneyFanAlarmStatusSet extends CommandPacket<ChimneyFanV1ChimneyFanAlarmStatusSetData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x22;
		public static readonly definition = {
			"command": 34,
			"name": "ChimneyFanAlarmStatusSet",
			"help": "Chimney Fan Alarm Status Set",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "message",
					"help": "Message",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "Not Used1",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Acknowledge External Alarm",
							"mask": 2,
							"shift": 1
						},
						{
							"type": "boolean",
							"name": "Acknowledge Sensor Error",
							"mask": 4,
							"shift": 2
						},
						{
							"type": "boolean",
							"name": "Acknowledge Alarm Temperature Exceeded",
							"mask": 8,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Not Used2",
							"mask": 240,
							"shift": 4
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanAlarmStatusSetData) {
			super(ChimneyFanAlarmStatusSet, data);
		}
	};

	public static readonly ChimneyFanAlarmTempGet = class ChimneyFanAlarmTempGet extends CommandPacket<void> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x0e;
		public static readonly definition = {
			"command": 14,
			"name": "ChimneyFanAlarmTempGet",
			"help": "Chimney Fan Alarm Temp Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ChimneyFanAlarmTempGet, data);
		}
	};

	public static readonly ChimneyFanAlarmTempReport = class ChimneyFanAlarmTempReport extends CommandPacket<ChimneyFanV1ChimneyFanAlarmTempReportData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x0f;
		public static readonly definition = {
			"command": 15,
			"name": "ChimneyFanAlarmTempReport",
			"help": "Chimney Fan Alarm Temp Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "value",
					"help": "Value",
					"length": {
						"name": "Properties1",
						"mask": 7,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanAlarmTempReportData) {
			super(ChimneyFanAlarmTempReport, data);
		}
	};

	public static readonly ChimneyFanAlarmTempSet = class ChimneyFanAlarmTempSet extends CommandPacket<ChimneyFanV1ChimneyFanAlarmTempSetData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x0d;
		public static readonly definition = {
			"command": 13,
			"name": "ChimneyFanAlarmTempSet",
			"help": "Chimney Fan Alarm Temp Set",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "value",
					"help": "Value",
					"length": {
						"name": "Properties1",
						"mask": 7,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanAlarmTempSetData) {
			super(ChimneyFanAlarmTempSet, data);
		}
	};

	public static readonly ChimneyFanBoostTimeGet = class ChimneyFanBoostTimeGet extends CommandPacket<void> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x11;
		public static readonly definition = {
			"command": 17,
			"name": "ChimneyFanBoostTimeGet",
			"help": "Chimney Fan Boost Time Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ChimneyFanBoostTimeGet, data);
		}
	};

	public static readonly ChimneyFanBoostTimeReport = class ChimneyFanBoostTimeReport extends CommandPacket<ChimneyFanV1ChimneyFanBoostTimeReportData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x12;
		public static readonly definition = {
			"command": 18,
			"name": "ChimneyFanBoostTimeReport",
			"help": "Chimney Fan Boost Time Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "time",
					"help": "Time",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanBoostTimeReportData) {
			super(ChimneyFanBoostTimeReport, data);
		}
	};

	public static readonly ChimneyFanBoostTimeSet = class ChimneyFanBoostTimeSet extends CommandPacket<ChimneyFanV1ChimneyFanBoostTimeSetData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x10;
		public static readonly definition = {
			"command": 16,
			"name": "ChimneyFanBoostTimeSet",
			"help": "Chimney Fan Boost Time Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "time",
					"help": "Time",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanBoostTimeSetData) {
			super(ChimneyFanBoostTimeSet, data);
		}
	};

	public static readonly ChimneyFanDefaultSet = class ChimneyFanDefaultSet extends CommandPacket<void> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x28;
		public static readonly definition = {
			"command": 40,
			"name": "ChimneyFanDefaultSet",
			"help": "Chimney Fan Default Set",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ChimneyFanDefaultSet, data);
		}
	};

	public static readonly ChimneyFanMinSpeedGet = class ChimneyFanMinSpeedGet extends CommandPacket<void> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x26;
		public static readonly definition = {
			"command": 38,
			"name": "ChimneyFanMinSpeedGet",
			"help": "Chimney Fan Min Speed Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ChimneyFanMinSpeedGet, data);
		}
	};

	public static readonly ChimneyFanMinSpeedReport = class ChimneyFanMinSpeedReport extends CommandPacket<ChimneyFanV1ChimneyFanMinSpeedReportData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x27;
		public static readonly definition = {
			"command": 39,
			"name": "ChimneyFanMinSpeedReport",
			"help": "Chimney Fan Min Speed Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "minSpeed",
					"help": "Min Speed",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanMinSpeedReportData) {
			super(ChimneyFanMinSpeedReport, data);
		}
	};

	public static readonly ChimneyFanMinSpeedSet = class ChimneyFanMinSpeedSet extends CommandPacket<ChimneyFanV1ChimneyFanMinSpeedSetData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x25;
		public static readonly definition = {
			"command": 37,
			"name": "ChimneyFanMinSpeedSet",
			"help": "Chimney Fan Min Speed Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "minSpeed",
					"help": "Min Speed",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanMinSpeedSetData) {
			super(ChimneyFanMinSpeedSet, data);
		}
	};

	public static readonly ChimneyFanModeGet = class ChimneyFanModeGet extends CommandPacket<void> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x17;
		public static readonly definition = {
			"command": 23,
			"name": "ChimneyFanModeGet",
			"help": "Chimney Fan Mode Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ChimneyFanModeGet, data);
		}
	};

	public static readonly ChimneyFanModeReport = class ChimneyFanModeReport extends CommandPacket<ChimneyFanV1ChimneyFanModeReportData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x18;
		public static readonly definition = {
			"command": 24,
			"name": "ChimneyFanModeReport",
			"help": "Chimney Fan Mode Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "mode",
					"help": "Mode",
					"length": 1,
					"values": {
						"0": "Off",
						"255": "ON"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanModeReportData) {
			super(ChimneyFanModeReport, data);
		}
	};

	public static readonly ChimneyFanModeSet = class ChimneyFanModeSet extends CommandPacket<ChimneyFanV1ChimneyFanModeSetData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x16;
		public static readonly definition = {
			"command": 22,
			"name": "ChimneyFanModeSet",
			"help": "Chimney Fan Mode Set",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "mode",
					"help": "Mode",
					"length": 1,
					"values": {
						"0": "Off",
						"255": "ON"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanModeSetData) {
			super(ChimneyFanModeSet, data);
		}
	};

	public static readonly ChimneyFanSetupGet = class ChimneyFanSetupGet extends CommandPacket<void> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x1a;
		public static readonly definition = {
			"command": 26,
			"name": "ChimneyFanSetupGet",
			"help": "Chimney Fan Setup Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ChimneyFanSetupGet, data);
		}
	};

	public static readonly ChimneyFanSetupReport = class ChimneyFanSetupReport extends CommandPacket<ChimneyFanV1ChimneyFanSetupReportData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x1b;
		public static readonly definition = {
			"command": 27,
			"name": "ChimneyFanSetupReport",
			"help": "Chimney Fan Setup Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "mode",
					"help": "Mode",
					"length": 1,
					"values": {
						"0": "Off",
						"255": "ON"
					}
				},
				{
					"type": "integer",
					"name": "boostTime",
					"help": "Boost Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "stopTime",
					"help": "Stop Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "minSpeed",
					"help": "Min. Speed",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Size 1",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Scale 1",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Precision 1",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "startTemperature",
					"help": "Start Temperature",
					"length": {
						"name": "Properties1",
						"mask": 7,
						"shift": 0
					}
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Size 2",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Scale 2",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Precision 2",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "stopTemperature",
					"help": "Stop Temperature",
					"length": {
						"name": "Properties2",
						"mask": 7,
						"shift": 0
					}
				},
				{
					"type": "bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Size 3",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Scale 3",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Precision 3",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "alarmTemperatureValue",
					"help": "Alarm Temperature Value",
					"length": {
						"name": "Properties3",
						"mask": 7,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanSetupReportData) {
			super(ChimneyFanSetupReport, data);
		}
	};

	public static readonly ChimneyFanSetupSet = class ChimneyFanSetupSet extends CommandPacket<ChimneyFanV1ChimneyFanSetupSetData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x19;
		public static readonly definition = {
			"command": 25,
			"name": "ChimneyFanSetupSet",
			"help": "Chimney Fan Setup Set",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "mode",
					"help": "Mode",
					"length": 1,
					"values": {
						"0": "Off",
						"255": "ON"
					}
				},
				{
					"type": "integer",
					"name": "boostTime",
					"help": "Boost Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "stopTime",
					"help": "Stop Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "minSpeed",
					"help": "Min. Speed",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Size 1",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Scale 1",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Precision 1",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "startTemperature",
					"help": "Start Temperature",
					"length": {
						"name": "Properties1",
						"mask": 7,
						"shift": 0
					}
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Size 2",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Scale 2",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Precision 2",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "stopTemperature",
					"help": "Stop Temperature",
					"length": {
						"name": "Properties2",
						"mask": 7,
						"shift": 0
					}
				},
				{
					"type": "bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Size 3",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Scale 3",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Precision 3",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "alarmTemperatureValue",
					"help": "Alarm Temperature Value",
					"length": {
						"name": "Properties3",
						"mask": 7,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanSetupSetData) {
			super(ChimneyFanSetupSet, data);
		}
	};

	public static readonly ChimneyFanSpeedGet = class ChimneyFanSpeedGet extends CommandPacket<void> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "ChimneyFanSpeedGet",
			"help": "Chimney Fan Speed Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ChimneyFanSpeedGet, data);
		}
	};

	public static readonly ChimneyFanSpeedReport = class ChimneyFanSpeedReport extends CommandPacket<ChimneyFanV1ChimneyFanSpeedReportData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "ChimneyFanSpeedReport",
			"help": "Chimney Fan Speed Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "speed",
					"help": "Speed",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanSpeedReportData) {
			super(ChimneyFanSpeedReport, data);
		}
	};

	public static readonly ChimneyFanSpeedSet = class ChimneyFanSpeedSet extends CommandPacket<ChimneyFanV1ChimneyFanSpeedSetData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "ChimneyFanSpeedSet",
			"help": "Chimney Fan Speed Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "speed",
					"help": "Speed",
					"length": 1,
					"values": {
						"101": "Speed down",
						"200": "Speed up"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanSpeedSetData) {
			super(ChimneyFanSpeedSet, data);
		}
	};

	public static readonly ChimneyFanStartTempGet = class ChimneyFanStartTempGet extends CommandPacket<void> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x08;
		public static readonly definition = {
			"command": 8,
			"name": "ChimneyFanStartTempGet",
			"help": "Chimney Fan Start Temp Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ChimneyFanStartTempGet, data);
		}
	};

	public static readonly ChimneyFanStartTempReport = class ChimneyFanStartTempReport extends CommandPacket<ChimneyFanV1ChimneyFanStartTempReportData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x09;
		public static readonly definition = {
			"command": 9,
			"name": "ChimneyFanStartTempReport",
			"help": "Chimney Fan Start Temp Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "value",
					"help": "Value",
					"length": {
						"name": "Properties1",
						"mask": 7,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanStartTempReportData) {
			super(ChimneyFanStartTempReport, data);
		}
	};

	public static readonly ChimneyFanStartTempSet = class ChimneyFanStartTempSet extends CommandPacket<ChimneyFanV1ChimneyFanStartTempSetData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x07;
		public static readonly definition = {
			"command": 7,
			"name": "ChimneyFanStartTempSet",
			"help": "Chimney Fan Start Temp Set",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "value",
					"help": "Value",
					"length": {
						"name": "Properties1",
						"mask": 7,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanStartTempSetData) {
			super(ChimneyFanStartTempSet, data);
		}
	};

	public static readonly ChimneyFanStateGet = class ChimneyFanStateGet extends CommandPacket<void> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "ChimneyFanStateGet",
			"help": "Chimney Fan State Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ChimneyFanStateGet, data);
		}
	};

	public static readonly ChimneyFanStateReport = class ChimneyFanStateReport extends CommandPacket<ChimneyFanV1ChimneyFanStateReportData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "ChimneyFanStateReport",
			"help": "Chimney Fan State Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "state",
					"help": "State",
					"length": 1,
					"values": {
						"0": "Off",
						"1": "Boost",
						"2": "Exhaust",
						"3": "Reload",
						"4": "Venting",
						"5": "Stop",
						"6": "Venting_EX",
						"7": "Service",
						"8": "Sensor Failure",
						"9": "Chimney Fire",
						"10": "External alarm"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanStateReportData) {
			super(ChimneyFanStateReport, data);
		}
	};

	public static readonly ChimneyFanStateSet = class ChimneyFanStateSet extends CommandPacket<ChimneyFanV1ChimneyFanStateSetData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "ChimneyFanStateSet",
			"help": "Chimney Fan State Set",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "state",
					"help": "State",
					"length": 1,
					"values": {
						"1": "Next State"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanStateSetData) {
			super(ChimneyFanStateSet, data);
		}
	};

	public static readonly ChimneyFanStatusGet = class ChimneyFanStatusGet extends CommandPacket<void> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x1d;
		public static readonly definition = {
			"command": 29,
			"name": "ChimneyFanStatusGet",
			"help": "Chimney Fan Status Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ChimneyFanStatusGet, data);
		}
	};

	public static readonly ChimneyFanStatusReport = class ChimneyFanStatusReport extends CommandPacket<ChimneyFanV1ChimneyFanStatusReportData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x1e;
		public static readonly definition = {
			"command": 30,
			"name": "ChimneyFanStatusReport",
			"help": "Chimney Fan Status Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "state",
					"help": "State",
					"length": 1,
					"values": {
						"0": "Off",
						"1": "Boost",
						"2": "Exhaust",
						"3": "Reload",
						"4": "Venting",
						"5": "Stop",
						"6": "Venting_EX",
						"7": "Service",
						"8": "Sensor Failure",
						"9": "Chimney Fire",
						"10": "External alarm"
					}
				},
				{
					"type": "integer",
					"name": "speed",
					"help": "Speed",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "alarmStatus",
					"help": "Alarm Status",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "Service",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "External Alarm",
							"mask": 2,
							"shift": 1
						},
						{
							"type": "boolean",
							"name": "Sensor Error",
							"mask": 4,
							"shift": 2
						},
						{
							"type": "boolean",
							"name": "Alarm Temperature Exceeded",
							"mask": 8,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Not Used",
							"mask": 48,
							"shift": 4
						},
						{
							"type": "boolean",
							"name": "Speed change Enable",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "boolean",
							"name": "Start Temperature Exceeded",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "value",
					"help": "Value",
					"length": {
						"name": "Properties1",
						"mask": 7,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanStatusReportData) {
			super(ChimneyFanStatusReport, data);
		}
	};

	public static readonly ChimneyFanStopTempGet = class ChimneyFanStopTempGet extends CommandPacket<void> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x0b;
		public static readonly definition = {
			"command": 11,
			"name": "ChimneyFanStopTempGet",
			"help": "Chimney Fan Stop Temp Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ChimneyFanStopTempGet, data);
		}
	};

	public static readonly ChimneyFanStopTempReport = class ChimneyFanStopTempReport extends CommandPacket<ChimneyFanV1ChimneyFanStopTempReportData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x0c;
		public static readonly definition = {
			"command": 12,
			"name": "ChimneyFanStopTempReport",
			"help": "Chimney Fan Stop Temp Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "value",
					"help": "Value",
					"length": {
						"name": "Properties1",
						"mask": 7,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanStopTempReportData) {
			super(ChimneyFanStopTempReport, data);
		}
	};

	public static readonly ChimneyFanStopTempSet = class ChimneyFanStopTempSet extends CommandPacket<ChimneyFanV1ChimneyFanStopTempSetData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x0a;
		public static readonly definition = {
			"command": 10,
			"name": "ChimneyFanStopTempSet",
			"help": "Chimney Fan Stop Temp Set",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "value",
					"help": "Value",
					"length": {
						"name": "Properties1",
						"mask": 7,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanStopTempSetData) {
			super(ChimneyFanStopTempSet, data);
		}
	};

	public static readonly ChimneyFanStopTimeGet = class ChimneyFanStopTimeGet extends CommandPacket<void> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x14;
		public static readonly definition = {
			"command": 20,
			"name": "ChimneyFanStopTimeGet",
			"help": "Chimney Fan Stop Time Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ChimneyFanStopTimeGet, data);
		}
	};

	public static readonly ChimneyFanStopTimeReport = class ChimneyFanStopTimeReport extends CommandPacket<ChimneyFanV1ChimneyFanStopTimeReportData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x15;
		public static readonly definition = {
			"command": 21,
			"name": "ChimneyFanStopTimeReport",
			"help": "Chimney Fan Stop Time Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "time",
					"help": "Time",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanStopTimeReportData) {
			super(ChimneyFanStopTimeReport, data);
		}
	};

	public static readonly ChimneyFanStopTimeSet = class ChimneyFanStopTimeSet extends CommandPacket<ChimneyFanV1ChimneyFanStopTimeSetData> {
		public static readonly CommandClass = ChimneyFanV1;
		public static readonly command = 0x13;
		public static readonly definition = {
			"command": 19,
			"name": "ChimneyFanStopTimeSet",
			"help": "Chimney Fan Stop Time Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "time",
					"help": "Time",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ChimneyFanV1)?.command === this.command;
		}

		constructor(data: Buffer | ChimneyFanV1ChimneyFanStopTimeSetData) {
			super(ChimneyFanStopTimeSet, data);
		}
	};
}

export namespace ChimneyFanV1 {
	export type ChimneyFanAlarmLogGet = InstanceType<typeof ChimneyFanV1.ChimneyFanAlarmLogGet>;
	export type ChimneyFanAlarmLogReport = InstanceType<typeof ChimneyFanV1.ChimneyFanAlarmLogReport>;
	export type ChimneyFanAlarmLogSet = InstanceType<typeof ChimneyFanV1.ChimneyFanAlarmLogSet>;
	export type ChimneyFanAlarmStatusGet = InstanceType<typeof ChimneyFanV1.ChimneyFanAlarmStatusGet>;
	export type ChimneyFanAlarmStatusReport = InstanceType<typeof ChimneyFanV1.ChimneyFanAlarmStatusReport>;
	export type ChimneyFanAlarmStatusSet = InstanceType<typeof ChimneyFanV1.ChimneyFanAlarmStatusSet>;
	export type ChimneyFanAlarmTempGet = InstanceType<typeof ChimneyFanV1.ChimneyFanAlarmTempGet>;
	export type ChimneyFanAlarmTempReport = InstanceType<typeof ChimneyFanV1.ChimneyFanAlarmTempReport>;
	export type ChimneyFanAlarmTempSet = InstanceType<typeof ChimneyFanV1.ChimneyFanAlarmTempSet>;
	export type ChimneyFanBoostTimeGet = InstanceType<typeof ChimneyFanV1.ChimneyFanBoostTimeGet>;
	export type ChimneyFanBoostTimeReport = InstanceType<typeof ChimneyFanV1.ChimneyFanBoostTimeReport>;
	export type ChimneyFanBoostTimeSet = InstanceType<typeof ChimneyFanV1.ChimneyFanBoostTimeSet>;
	export type ChimneyFanDefaultSet = InstanceType<typeof ChimneyFanV1.ChimneyFanDefaultSet>;
	export type ChimneyFanMinSpeedGet = InstanceType<typeof ChimneyFanV1.ChimneyFanMinSpeedGet>;
	export type ChimneyFanMinSpeedReport = InstanceType<typeof ChimneyFanV1.ChimneyFanMinSpeedReport>;
	export type ChimneyFanMinSpeedSet = InstanceType<typeof ChimneyFanV1.ChimneyFanMinSpeedSet>;
	export type ChimneyFanModeGet = InstanceType<typeof ChimneyFanV1.ChimneyFanModeGet>;
	export type ChimneyFanModeReport = InstanceType<typeof ChimneyFanV1.ChimneyFanModeReport>;
	export type ChimneyFanModeSet = InstanceType<typeof ChimneyFanV1.ChimneyFanModeSet>;
	export type ChimneyFanSetupGet = InstanceType<typeof ChimneyFanV1.ChimneyFanSetupGet>;
	export type ChimneyFanSetupReport = InstanceType<typeof ChimneyFanV1.ChimneyFanSetupReport>;
	export type ChimneyFanSetupSet = InstanceType<typeof ChimneyFanV1.ChimneyFanSetupSet>;
	export type ChimneyFanSpeedGet = InstanceType<typeof ChimneyFanV1.ChimneyFanSpeedGet>;
	export type ChimneyFanSpeedReport = InstanceType<typeof ChimneyFanV1.ChimneyFanSpeedReport>;
	export type ChimneyFanSpeedSet = InstanceType<typeof ChimneyFanV1.ChimneyFanSpeedSet>;
	export type ChimneyFanStartTempGet = InstanceType<typeof ChimneyFanV1.ChimneyFanStartTempGet>;
	export type ChimneyFanStartTempReport = InstanceType<typeof ChimneyFanV1.ChimneyFanStartTempReport>;
	export type ChimneyFanStartTempSet = InstanceType<typeof ChimneyFanV1.ChimneyFanStartTempSet>;
	export type ChimneyFanStateGet = InstanceType<typeof ChimneyFanV1.ChimneyFanStateGet>;
	export type ChimneyFanStateReport = InstanceType<typeof ChimneyFanV1.ChimneyFanStateReport>;
	export type ChimneyFanStateSet = InstanceType<typeof ChimneyFanV1.ChimneyFanStateSet>;
	export type ChimneyFanStatusGet = InstanceType<typeof ChimneyFanV1.ChimneyFanStatusGet>;
	export type ChimneyFanStatusReport = InstanceType<typeof ChimneyFanV1.ChimneyFanStatusReport>;
	export type ChimneyFanStopTempGet = InstanceType<typeof ChimneyFanV1.ChimneyFanStopTempGet>;
	export type ChimneyFanStopTempReport = InstanceType<typeof ChimneyFanV1.ChimneyFanStopTempReport>;
	export type ChimneyFanStopTempSet = InstanceType<typeof ChimneyFanV1.ChimneyFanStopTempSet>;
	export type ChimneyFanStopTimeGet = InstanceType<typeof ChimneyFanV1.ChimneyFanStopTimeGet>;
	export type ChimneyFanStopTimeReport = InstanceType<typeof ChimneyFanV1.ChimneyFanStopTimeReport>;
	export type ChimneyFanStopTimeSet = InstanceType<typeof ChimneyFanV1.ChimneyFanStopTimeSet>;
}

export enum MessageEnum {
	ResetLog = 0x8,
}

export enum ModeEnum {
	Off = 0x0,
	On = 0xff,
}

export enum StateEnum {
	Off = 0x0,
	Boost = 0x1,
	Exhaust = 0x2,
	Reload = 0x3,
	Venting = 0x4,
	Stop = 0x5,
	VentingEX = 0x6,
	Service = 0x7,
	SensorFailure = 0x8,
	ChimneyFire = 0x9,
	ExternalAlarm = 0xa,
}

export enum State2Enum {
	NextState = 0x1,
}
