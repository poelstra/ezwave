/**
 * Command Class Sensor Alarm, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum SensorAlarmV1Commands {
	SensorAlarmGet = 0x01,
	SensorAlarmReport = 0x02,
	SensorAlarmSupportedGet = 0x03,
	SensorAlarmSupportedReport = 0x04,
}

export interface SensorAlarmV1SensorAlarmGetData {
	sensorType: number; // 1 byte unsigned integer
}

export interface SensorAlarmV1SensorAlarmReportData {
	sourceNodeID: number; // 1 byte unsigned integer
	sensorType: number; // 1 byte unsigned integer
	sensorState: number; // 1 byte unsigned integer
	seconds: number; // 2 byte unsigned integer
}

export interface SensorAlarmV1SensorAlarmSupportedReportData {
	numberOfBitMasks: number; // 1 byte unsigned integer
	// TODO param bitMask type blob
}

export class SensorAlarmV1 extends CommandClassPacket<SensorAlarmV1Commands> {
	public static readonly commandClass = CommandClasses.SensorAlarm; // 0x9c (156)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SensorAlarmV1, commandAndPayload);
	}

	public static readonly SensorAlarmGet = class SensorAlarmGet extends CommandPacket<SensorAlarmV1SensorAlarmGetData> {
		public static readonly CommandClass = SensorAlarmV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "SensorAlarmGet",
			"help": "Sensor Alarm Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "sensorType",
					"help": "Sensor Type",
					"length": 1,
					"values": {
						"0": {
							"name": "GeneralPurposeAlarm",
							"help": "General Purpose Alarm"
						},
						"1": {
							"name": "SmokeAlarm",
							"help": "Smoke Alarm"
						},
						"2": {
							"name": "COAlarm",
							"help": "CO Alarm"
						},
						"3": {
							"name": "CO2Alarm",
							"help": "CO2 Alarm"
						},
						"4": {
							"name": "HeatAlarm",
							"help": "Heat Alarm"
						},
						"5": {
							"name": "WaterLeakAlarm",
							"help": "Water Leak Alarm"
						},
						"255": {
							"name": "ReturnFirstAlarmOnSupportedList",
							"help": "Return first Alarm on supported list"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SensorAlarmV1)?.command === this.command;
		}

		constructor(data: Buffer | SensorAlarmV1SensorAlarmGetData) {
			super(SensorAlarmGet, data);
		}
	};

	public static readonly SensorAlarmReport = class SensorAlarmReport extends CommandPacket<SensorAlarmV1SensorAlarmReportData> {
		public static readonly CommandClass = SensorAlarmV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "SensorAlarmReport",
			"help": "Sensor Alarm Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "sourceNodeID",
					"help": "Source Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "integer",
					"name": "sensorType",
					"help": "Sensor Type",
					"length": 1,
					"values": {
						"0": {
							"name": "GeneralPurposeAlarm",
							"help": "General Purpose Alarm"
						},
						"1": {
							"name": "SmokeAlarm",
							"help": "Smoke Alarm"
						},
						"2": {
							"name": "COAlarm",
							"help": "CO Alarm"
						},
						"3": {
							"name": "CO2Alarm",
							"help": "CO2 Alarm"
						},
						"4": {
							"name": "HeatAlarm",
							"help": "Heat Alarm"
						},
						"5": {
							"name": "WaterLeakAlarm",
							"help": "Water Leak Alarm"
						},
						"255": {
							"name": "ReturnFirstAlarmOnSupportedList",
							"help": "Return first Alarm on supported list"
						}
					}
				},
				{
					"type": "integer",
					"name": "sensorState",
					"help": "Sensor State",
					"length": 1,
					"values": {
						"0": {
							"name": "NoAlarm",
							"help": "no alarm"
						},
						"255": {
							"name": "Alarm",
							"help": "alarm"
						}
					}
				},
				{
					"type": "integer",
					"name": "seconds",
					"help": "Seconds",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SensorAlarmV1)?.command === this.command;
		}

		constructor(data: Buffer | SensorAlarmV1SensorAlarmReportData) {
			super(SensorAlarmReport, data);
		}
	};

	public static readonly SensorAlarmSupportedGet = class SensorAlarmSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = SensorAlarmV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "SensorAlarmSupportedGet",
			"help": "Sensor Alarm Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SensorAlarmV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SensorAlarmSupportedGet, data);
		}
	};

	public static readonly SensorAlarmSupportedReport = class SensorAlarmSupportedReport extends CommandPacket<SensorAlarmV1SensorAlarmSupportedReportData> {
		public static readonly CommandClass = SensorAlarmV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "SensorAlarmSupportedReport",
			"help": "Sensor Alarm Supported Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "numberOfBitMasks",
					"help": "Number of Bit Masks",
					"length": 1
				},
				{
					"type": "blob",
					"name": "bitMask",
					"help": "Bit Mask",
					"length": {
						"name": "Number of Bit Masks"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SensorAlarmV1)?.command === this.command;
		}

		constructor(data: Buffer | SensorAlarmV1SensorAlarmSupportedReportData) {
			super(SensorAlarmSupportedReport, data);
		}
	};
}

export namespace SensorAlarmV1 {
	export type SensorAlarmGet = InstanceType<typeof SensorAlarmV1.SensorAlarmGet>;
	export type SensorAlarmReport = InstanceType<typeof SensorAlarmV1.SensorAlarmReport>;
	export type SensorAlarmSupportedGet = InstanceType<typeof SensorAlarmV1.SensorAlarmSupportedGet>;
	export type SensorAlarmSupportedReport = InstanceType<typeof SensorAlarmV1.SensorAlarmSupportedReport>;
}
