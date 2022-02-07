/**
 * Command Class Chimney Fan, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	alarmStillActive1: boolean; // alarmEvent1[7]
	alarmTemperatureExceeded1: boolean; // alarmEvent1[3]
	sensorError1: boolean; // alarmEvent1[2]
	externalAlarm1: boolean; // alarmEvent1[1]
	alarmStillActive2: boolean; // alarmEvent2[7]
	alarmTemperatureExceeded2: boolean; // alarmEvent2[3]
	sensorError2: boolean; // alarmEvent2[2]
	externalAlarm2: boolean; // alarmEvent2[1]
	alarmStillActive3: boolean; // alarmEvent3[7]
	alarmTemperatureExceeded3: boolean; // alarmEvent3[3]
	sensorError3: boolean; // alarmEvent3[2]
	externalAlarm3: boolean; // alarmEvent3[1]
	alarmStillActive4: boolean; // alarmEvent4[7]
	alarmTemperatureExceeded4: boolean; // alarmEvent4[3]
	sensorError4: boolean; // alarmEvent4[2]
	externalAlarm4: boolean; // alarmEvent4[1]
	alarmStillActive5: boolean; // alarmEvent5[7]
	alarmTemperatureExceeded5: boolean; // alarmEvent5[3]
	sensorError5: boolean; // alarmEvent5[2]
	externalAlarm5: boolean; // alarmEvent5[1]
}

export interface ChimneyFanV1ChimneyFanAlarmLogSetData {
	message: MessageEnum; // 1 byte enum value
}

export interface ChimneyFanV1ChimneyFanAlarmStatusReportData {
	startTemperatureExceeded: boolean; // alarmStatus[7]
	speedChangeEnable: boolean; // alarmStatus[6]
	notUsed: number; // alarmStatus[5..4]
	alarmTemperatureExceeded: boolean; // alarmStatus[3]
	sensorError: boolean; // alarmStatus[2]
	externalAlarm: boolean; // alarmStatus[1]
	service: boolean; // alarmStatus[0]
}

export interface ChimneyFanV1ChimneyFanAlarmStatusSetData {
	notUsed2: number; // message[7..4]
	acknowledgeAlarmTemperatureExceeded: boolean; // message[3]
	acknowledgeSensorError: boolean; // message[2]
	acknowledgeExternalAlarm: boolean; // message[1]
	notUsed1: boolean; // message[0]
}

export interface ChimneyFanV1ChimneyFanAlarmTempReportData {
	precision: number; // properties1[7..5]
	scale: number; // properties1[4..3]
	value: Buffer; // variable length
}

export interface ChimneyFanV1ChimneyFanAlarmTempSetData {
	precision: number; // properties1[7..5]
	scale: number; // properties1[4..3]
	value: Buffer; // variable length
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
	precision1: number; // properties1[7..5]
	scale1: number; // properties1[4..3]
	startTemperature: Buffer; // variable length
	precision2: number; // properties2[7..5]
	scale2: number; // properties2[4..3]
	stopTemperature: Buffer; // variable length
	precision3: number; // properties3[7..5]
	scale3: number; // properties3[4..3]
	alarmTemperatureValue: Buffer; // variable length
}

export interface ChimneyFanV1ChimneyFanSetupSetData {
	mode: ModeEnum; // 1 byte enum value
	boostTime: number; // 1 byte unsigned integer
	stopTime: number; // 1 byte unsigned integer
	minSpeed: number; // 1 byte unsigned integer
	precision1: number; // properties1[7..5]
	scale1: number; // properties1[4..3]
	startTemperature: Buffer; // variable length
	precision2: number; // properties2[7..5]
	scale2: number; // properties2[4..3]
	stopTemperature: Buffer; // variable length
	precision3: number; // properties3[7..5]
	scale3: number; // properties3[4..3]
	alarmTemperatureValue: Buffer; // variable length
}

export interface ChimneyFanV1ChimneyFanSpeedReportData {
	speed: number; // 1 byte unsigned integer
}

export interface ChimneyFanV1ChimneyFanSpeedSetData {
	speed: number; // 1 byte unsigned integer
}

export interface ChimneyFanV1ChimneyFanStartTempReportData {
	precision: number; // properties1[7..5]
	scale: number; // properties1[4..3]
	value: Buffer; // variable length
}

export interface ChimneyFanV1ChimneyFanStartTempSetData {
	precision: number; // properties1[7..5]
	scale: number; // properties1[4..3]
	value: Buffer; // variable length
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
	startTemperatureExceeded: boolean; // alarmStatus[7]
	speedChangeEnable: boolean; // alarmStatus[6]
	notUsed: number; // alarmStatus[5..4]
	alarmTemperatureExceeded: boolean; // alarmStatus[3]
	sensorError: boolean; // alarmStatus[2]
	externalAlarm: boolean; // alarmStatus[1]
	service: boolean; // alarmStatus[0]
	precision: number; // properties1[7..5]
	scale: number; // properties1[4..3]
	value: Buffer; // variable length
}

export interface ChimneyFanV1ChimneyFanStopTempReportData {
	precision: number; // properties1[7..5]
	scale: number; // properties1[4..3]
	value: Buffer; // variable length
}

export interface ChimneyFanV1ChimneyFanStopTempSetData {
	precision: number; // properties1[7..5]
	scale: number; // properties1[4..3]
	value: Buffer; // variable length
}

export interface ChimneyFanV1ChimneyFanStopTimeReportData {
	time: number; // 1 byte unsigned integer
}

export interface ChimneyFanV1ChimneyFanStopTimeSetData {
	time: number; // 1 byte unsigned integer
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

export class ChimneyFanV1 extends CommandClassPacket<ChimneyFanV1Commands> {
	public static readonly commandClass = CommandClasses.ChimneyFan; // 0x2a (42)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ChimneyFanV1, commandAndPayload);
	}
}

export class ChimneyFanAlarmLogGet extends CommandPacket<void> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x20; // 32
	public static readonly definition = convertFromJsonCommand({
		"command": 32,
		"name": "ChimneyFanAlarmLogGet",
		"help": "Chimney Fan Alarm Log Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ChimneyFanAlarmLogGet, data);
	}
};

export class ChimneyFanAlarmLogReport extends CommandPacket<ChimneyFanV1ChimneyFanAlarmLogReportData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x21; // 33
	public static readonly definition = convertFromJsonCommand({
		"command": 33,
		"name": "ChimneyFanAlarmLogReport",
		"help": "Chimney Fan Alarm Log Report",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "alarmEvent1",
				"help": "Alarm Event 1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "alarmStillActive1",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "reserved12",
						"mask": 112,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "alarmTemperatureExceeded1",
						"mask": 8,
						"shift": 3
					},
					{
						"fieldType": "Boolean",
						"name": "sensorError1",
						"mask": 4,
						"shift": 2
					},
					{
						"fieldType": "Boolean",
						"name": "externalAlarm1",
						"mask": 2,
						"shift": 1
					},
					{
						"fieldType": "Boolean",
						"name": "reserved11",
						"mask": 1,
						"shift": 0,
						"reserved": true
					}
				]
			},
			{
				"type": "Bitfield",
				"name": "alarmEvent2",
				"help": "Alarm Event 2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "alarmStillActive2",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "reserved22",
						"mask": 112,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "alarmTemperatureExceeded2",
						"mask": 8,
						"shift": 3
					},
					{
						"fieldType": "Boolean",
						"name": "sensorError2",
						"mask": 4,
						"shift": 2
					},
					{
						"fieldType": "Boolean",
						"name": "externalAlarm2",
						"mask": 2,
						"shift": 1
					},
					{
						"fieldType": "Boolean",
						"name": "reserved21",
						"mask": 1,
						"shift": 0,
						"reserved": true
					}
				]
			},
			{
				"type": "Bitfield",
				"name": "alarmEvent3",
				"help": "Alarm Event 3",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "alarmStillActive3",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "reserved32",
						"mask": 112,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "alarmTemperatureExceeded3",
						"mask": 8,
						"shift": 3
					},
					{
						"fieldType": "Boolean",
						"name": "sensorError3",
						"mask": 4,
						"shift": 2
					},
					{
						"fieldType": "Boolean",
						"name": "externalAlarm3",
						"mask": 2,
						"shift": 1
					},
					{
						"fieldType": "Boolean",
						"name": "reserved31",
						"mask": 1,
						"shift": 0,
						"reserved": true
					}
				]
			},
			{
				"type": "Bitfield",
				"name": "alarmEvent4",
				"help": "Alarm Event 4",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "alarmStillActive4",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "reserved42",
						"mask": 112,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "alarmTemperatureExceeded4",
						"mask": 8,
						"shift": 3
					},
					{
						"fieldType": "Boolean",
						"name": "sensorError4",
						"mask": 4,
						"shift": 2
					},
					{
						"fieldType": "Boolean",
						"name": "externalAlarm4",
						"mask": 2,
						"shift": 1
					},
					{
						"fieldType": "Boolean",
						"name": "reserved41",
						"mask": 1,
						"shift": 0,
						"reserved": true
					}
				]
			},
			{
				"type": "Bitfield",
				"name": "alarmEvent5",
				"help": "Alarm Event 5",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "alarmStillActive5",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "reserved52",
						"mask": 112,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "alarmTemperatureExceeded5",
						"mask": 8,
						"shift": 3
					},
					{
						"fieldType": "Boolean",
						"name": "sensorError5",
						"mask": 4,
						"shift": 2
					},
					{
						"fieldType": "Boolean",
						"name": "externalAlarm5",
						"mask": 2,
						"shift": 1
					},
					{
						"fieldType": "Boolean",
						"name": "reserved51",
						"mask": 1,
						"shift": 0,
						"reserved": true
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanAlarmLogReportData) {
		super(ChimneyFanAlarmLogReport, data);
	}
};

export class ChimneyFanAlarmLogSet extends CommandPacket<ChimneyFanV1ChimneyFanAlarmLogSetData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x1f; // 31
	public static readonly definition = convertFromJsonCommand({
		"command": 31,
		"name": "ChimneyFanAlarmLogSet",
		"help": "Chimney Fan Alarm Log Set",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "message",
				"help": "Message",
				"length": 1,
				"values": {
					"8": {
						"name": "ResetLog",
						"help": "Reset log"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanAlarmLogSetData) {
		super(ChimneyFanAlarmLogSet, data);
	}
};

export class ChimneyFanAlarmStatusGet extends CommandPacket<void> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x23; // 35
	public static readonly definition = convertFromJsonCommand({
		"command": 35,
		"name": "ChimneyFanAlarmStatusGet",
		"help": "Chimney Fan Alarm Status Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ChimneyFanAlarmStatusGet, data);
	}
};

export class ChimneyFanAlarmStatusReport extends CommandPacket<ChimneyFanV1ChimneyFanAlarmStatusReportData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x24; // 36
	public static readonly definition = convertFromJsonCommand({
		"command": 36,
		"name": "ChimneyFanAlarmStatusReport",
		"help": "Chimney Fan Alarm Status Report",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "alarmStatus",
				"help": "Alarm Status",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "startTemperatureExceeded",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Boolean",
						"name": "speedChangeEnable",
						"mask": 64,
						"shift": 6
					},
					{
						"fieldType": "Integer",
						"name": "notUsed",
						"mask": 48,
						"shift": 4
					},
					{
						"fieldType": "Boolean",
						"name": "alarmTemperatureExceeded",
						"mask": 8,
						"shift": 3
					},
					{
						"fieldType": "Boolean",
						"name": "sensorError",
						"mask": 4,
						"shift": 2
					},
					{
						"fieldType": "Boolean",
						"name": "externalAlarm",
						"mask": 2,
						"shift": 1
					},
					{
						"fieldType": "Boolean",
						"name": "service",
						"mask": 1,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanAlarmStatusReportData) {
		super(ChimneyFanAlarmStatusReport, data);
	}
};

export class ChimneyFanAlarmStatusSet extends CommandPacket<ChimneyFanV1ChimneyFanAlarmStatusSetData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x22; // 34
	public static readonly definition = convertFromJsonCommand({
		"command": 34,
		"name": "ChimneyFanAlarmStatusSet",
		"help": "Chimney Fan Alarm Status Set",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "message",
				"help": "Message",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "notUsed2",
						"mask": 240,
						"shift": 4
					},
					{
						"fieldType": "Boolean",
						"name": "acknowledgeAlarmTemperatureExceeded",
						"mask": 8,
						"shift": 3
					},
					{
						"fieldType": "Boolean",
						"name": "acknowledgeSensorError",
						"mask": 4,
						"shift": 2
					},
					{
						"fieldType": "Boolean",
						"name": "acknowledgeExternalAlarm",
						"mask": 2,
						"shift": 1
					},
					{
						"fieldType": "Boolean",
						"name": "notUsed1",
						"mask": 1,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanAlarmStatusSetData) {
		super(ChimneyFanAlarmStatusSet, data);
	}
};

export class ChimneyFanAlarmTempGet extends CommandPacket<void> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x0e; // 14
	public static readonly definition = convertFromJsonCommand({
		"command": 14,
		"name": "ChimneyFanAlarmTempGet",
		"help": "Chimney Fan Alarm Temp Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ChimneyFanAlarmTempGet, data);
	}
};

export class ChimneyFanAlarmTempReport extends CommandPacket<ChimneyFanV1ChimneyFanAlarmTempReportData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x0f; // 15
	public static readonly definition = convertFromJsonCommand({
		"command": 15,
		"name": "ChimneyFanAlarmTempReport",
		"help": "Chimney Fan Alarm Temp Report",
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
						"name": "precision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "scale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "size",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"value"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "value",
				"help": "Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.size"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanAlarmTempReportData) {
		super(ChimneyFanAlarmTempReport, data);
	}
};

export class ChimneyFanAlarmTempSet extends CommandPacket<ChimneyFanV1ChimneyFanAlarmTempSetData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x0d; // 13
	public static readonly definition = convertFromJsonCommand({
		"command": 13,
		"name": "ChimneyFanAlarmTempSet",
		"help": "Chimney Fan Alarm Temp Set",
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
						"name": "precision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "scale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "size",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"value"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "value",
				"help": "Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.size"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanAlarmTempSetData) {
		super(ChimneyFanAlarmTempSet, data);
	}
};

export class ChimneyFanBoostTimeGet extends CommandPacket<void> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x11; // 17
	public static readonly definition = convertFromJsonCommand({
		"command": 17,
		"name": "ChimneyFanBoostTimeGet",
		"help": "Chimney Fan Boost Time Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ChimneyFanBoostTimeGet, data);
	}
};

export class ChimneyFanBoostTimeReport extends CommandPacket<ChimneyFanV1ChimneyFanBoostTimeReportData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x12; // 18
	public static readonly definition = convertFromJsonCommand({
		"command": 18,
		"name": "ChimneyFanBoostTimeReport",
		"help": "Chimney Fan Boost Time Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "time",
				"help": "Time",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanBoostTimeReportData) {
		super(ChimneyFanBoostTimeReport, data);
	}
};

export class ChimneyFanBoostTimeSet extends CommandPacket<ChimneyFanV1ChimneyFanBoostTimeSetData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x10; // 16
	public static readonly definition = convertFromJsonCommand({
		"command": 16,
		"name": "ChimneyFanBoostTimeSet",
		"help": "Chimney Fan Boost Time Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "time",
				"help": "Time",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanBoostTimeSetData) {
		super(ChimneyFanBoostTimeSet, data);
	}
};

export class ChimneyFanDefaultSet extends CommandPacket<void> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x28; // 40
	public static readonly definition = convertFromJsonCommand({
		"command": 40,
		"name": "ChimneyFanDefaultSet",
		"help": "Chimney Fan Default Set",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ChimneyFanDefaultSet, data);
	}
};

export class ChimneyFanMinSpeedGet extends CommandPacket<void> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x26; // 38
	public static readonly definition = convertFromJsonCommand({
		"command": 38,
		"name": "ChimneyFanMinSpeedGet",
		"help": "Chimney Fan Min Speed Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ChimneyFanMinSpeedGet, data);
	}
};

export class ChimneyFanMinSpeedReport extends CommandPacket<ChimneyFanV1ChimneyFanMinSpeedReportData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x27; // 39
	public static readonly definition = convertFromJsonCommand({
		"command": 39,
		"name": "ChimneyFanMinSpeedReport",
		"help": "Chimney Fan Min Speed Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "minSpeed",
				"help": "Min Speed",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanMinSpeedReportData) {
		super(ChimneyFanMinSpeedReport, data);
	}
};

export class ChimneyFanMinSpeedSet extends CommandPacket<ChimneyFanV1ChimneyFanMinSpeedSetData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x25; // 37
	public static readonly definition = convertFromJsonCommand({
		"command": 37,
		"name": "ChimneyFanMinSpeedSet",
		"help": "Chimney Fan Min Speed Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "minSpeed",
				"help": "Min Speed",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanMinSpeedSetData) {
		super(ChimneyFanMinSpeedSet, data);
	}
};

export class ChimneyFanModeGet extends CommandPacket<void> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x17; // 23
	public static readonly definition = convertFromJsonCommand({
		"command": 23,
		"name": "ChimneyFanModeGet",
		"help": "Chimney Fan Mode Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ChimneyFanModeGet, data);
	}
};

export class ChimneyFanModeReport extends CommandPacket<ChimneyFanV1ChimneyFanModeReportData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x18; // 24
	public static readonly definition = convertFromJsonCommand({
		"command": 24,
		"name": "ChimneyFanModeReport",
		"help": "Chimney Fan Mode Report",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "mode",
				"help": "Mode",
				"length": 1,
				"values": {
					"0": {
						"name": "Off",
						"help": "Off"
					},
					"255": {
						"name": "On",
						"help": "ON"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanModeReportData) {
		super(ChimneyFanModeReport, data);
	}
};

export class ChimneyFanModeSet extends CommandPacket<ChimneyFanV1ChimneyFanModeSetData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x16; // 22
	public static readonly definition = convertFromJsonCommand({
		"command": 22,
		"name": "ChimneyFanModeSet",
		"help": "Chimney Fan Mode Set",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "mode",
				"help": "Mode",
				"length": 1,
				"values": {
					"0": {
						"name": "Off",
						"help": "Off"
					},
					"255": {
						"name": "On",
						"help": "ON"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanModeSetData) {
		super(ChimneyFanModeSet, data);
	}
};

export class ChimneyFanSetupGet extends CommandPacket<void> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x1a; // 26
	public static readonly definition = convertFromJsonCommand({
		"command": 26,
		"name": "ChimneyFanSetupGet",
		"help": "Chimney Fan Setup Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ChimneyFanSetupGet, data);
	}
};

export class ChimneyFanSetupReport extends CommandPacket<ChimneyFanV1ChimneyFanSetupReportData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x1b; // 27
	public static readonly definition = convertFromJsonCommand({
		"command": 27,
		"name": "ChimneyFanSetupReport",
		"help": "Chimney Fan Setup Report",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "mode",
				"help": "Mode",
				"length": 1,
				"values": {
					"0": {
						"name": "Off",
						"help": "Off"
					},
					"255": {
						"name": "On",
						"help": "ON"
					}
				}
			},
			{
				"type": "Integer",
				"name": "boostTime",
				"help": "Boost Time",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "stopTime",
				"help": "Stop Time",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "minSpeed",
				"help": "Min. Speed",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "precision1",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "scale1",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "size1",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"startTemperature"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "startTemperature",
				"help": "Start Temperature",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.size1"
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
						"name": "precision2",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "scale2",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "size2",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"stopTemperature"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "stopTemperature",
				"help": "Stop Temperature",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties2.size2"
					}
				}
			},
			{
				"type": "Bitfield",
				"name": "properties3",
				"help": "Properties3",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "precision3",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "scale3",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "size3",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"alarmTemperatureValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "alarmTemperatureValue",
				"help": "Alarm Temperature Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties3.size3"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanSetupReportData) {
		super(ChimneyFanSetupReport, data);
	}
};

export class ChimneyFanSetupSet extends CommandPacket<ChimneyFanV1ChimneyFanSetupSetData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x19; // 25
	public static readonly definition = convertFromJsonCommand({
		"command": 25,
		"name": "ChimneyFanSetupSet",
		"help": "Chimney Fan Setup Set",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "mode",
				"help": "Mode",
				"length": 1,
				"values": {
					"0": {
						"name": "Off",
						"help": "Off"
					},
					"255": {
						"name": "On",
						"help": "ON"
					}
				}
			},
			{
				"type": "Integer",
				"name": "boostTime",
				"help": "Boost Time",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "stopTime",
				"help": "Stop Time",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "minSpeed",
				"help": "Min. Speed",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "precision1",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "scale1",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "size1",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"startTemperature"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "startTemperature",
				"help": "Start Temperature",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.size1"
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
						"name": "precision2",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "scale2",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "size2",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"stopTemperature"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "stopTemperature",
				"help": "Stop Temperature",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties2.size2"
					}
				}
			},
			{
				"type": "Bitfield",
				"name": "properties3",
				"help": "Properties3",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "precision3",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "scale3",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "size3",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"alarmTemperatureValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "alarmTemperatureValue",
				"help": "Alarm Temperature Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties3.size3"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanSetupSetData) {
		super(ChimneyFanSetupSet, data);
	}
};

export class ChimneyFanSpeedGet extends CommandPacket<void> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x05; // 5
	public static readonly definition = convertFromJsonCommand({
		"command": 5,
		"name": "ChimneyFanSpeedGet",
		"help": "Chimney Fan Speed Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ChimneyFanSpeedGet, data);
	}
};

export class ChimneyFanSpeedReport extends CommandPacket<ChimneyFanV1ChimneyFanSpeedReportData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x06; // 6
	public static readonly definition = convertFromJsonCommand({
		"command": 6,
		"name": "ChimneyFanSpeedReport",
		"help": "Chimney Fan Speed Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "speed",
				"help": "Speed",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanSpeedReportData) {
		super(ChimneyFanSpeedReport, data);
	}
};

export class ChimneyFanSpeedSet extends CommandPacket<ChimneyFanV1ChimneyFanSpeedSetData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
		"command": 4,
		"name": "ChimneyFanSpeedSet",
		"help": "Chimney Fan Speed Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "speed",
				"help": "Speed",
				"length": 1,
				"values": {
					"101": {
						"name": "SpeedDown",
						"help": "Speed down"
					},
					"200": {
						"name": "SpeedUp",
						"help": "Speed up"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanSpeedSetData) {
		super(ChimneyFanSpeedSet, data);
	}
};

export class ChimneyFanStartTempGet extends CommandPacket<void> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x08; // 8
	public static readonly definition = convertFromJsonCommand({
		"command": 8,
		"name": "ChimneyFanStartTempGet",
		"help": "Chimney Fan Start Temp Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ChimneyFanStartTempGet, data);
	}
};

export class ChimneyFanStartTempReport extends CommandPacket<ChimneyFanV1ChimneyFanStartTempReportData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x09; // 9
	public static readonly definition = convertFromJsonCommand({
		"command": 9,
		"name": "ChimneyFanStartTempReport",
		"help": "Chimney Fan Start Temp Report",
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
						"name": "precision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "scale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "size",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"value"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "value",
				"help": "Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.size"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanStartTempReportData) {
		super(ChimneyFanStartTempReport, data);
	}
};

export class ChimneyFanStartTempSet extends CommandPacket<ChimneyFanV1ChimneyFanStartTempSetData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x07; // 7
	public static readonly definition = convertFromJsonCommand({
		"command": 7,
		"name": "ChimneyFanStartTempSet",
		"help": "Chimney Fan Start Temp Set",
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
						"name": "precision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "scale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "size",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"value"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "value",
				"help": "Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.size"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanStartTempSetData) {
		super(ChimneyFanStartTempSet, data);
	}
};

export class ChimneyFanStateGet extends CommandPacket<void> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "ChimneyFanStateGet",
		"help": "Chimney Fan State Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ChimneyFanStateGet, data);
	}
};

export class ChimneyFanStateReport extends CommandPacket<ChimneyFanV1ChimneyFanStateReportData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "ChimneyFanStateReport",
		"help": "Chimney Fan State Report",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "state",
				"help": "State",
				"length": 1,
				"values": {
					"0": {
						"name": "Off",
						"help": "Off"
					},
					"1": {
						"name": "Boost",
						"help": "Boost"
					},
					"2": {
						"name": "Exhaust",
						"help": "Exhaust"
					},
					"3": {
						"name": "Reload",
						"help": "Reload"
					},
					"4": {
						"name": "Venting",
						"help": "Venting"
					},
					"5": {
						"name": "Stop",
						"help": "Stop"
					},
					"6": {
						"name": "VentingEX",
						"help": "Venting_EX"
					},
					"7": {
						"name": "Service",
						"help": "Service"
					},
					"8": {
						"name": "SensorFailure",
						"help": "Sensor Failure"
					},
					"9": {
						"name": "ChimneyFire",
						"help": "Chimney Fire"
					},
					"10": {
						"name": "ExternalAlarm",
						"help": "External alarm"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanStateReportData) {
		super(ChimneyFanStateReport, data);
	}
};

export class ChimneyFanStateSet extends CommandPacket<ChimneyFanV1ChimneyFanStateSetData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "ChimneyFanStateSet",
		"help": "Chimney Fan State Set",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "state",
				"help": "State",
				"length": 1,
				"values": {
					"1": {
						"name": "NextState",
						"help": "Next State"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanStateSetData) {
		super(ChimneyFanStateSet, data);
	}
};

export class ChimneyFanStatusGet extends CommandPacket<void> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x1d; // 29
	public static readonly definition = convertFromJsonCommand({
		"command": 29,
		"name": "ChimneyFanStatusGet",
		"help": "Chimney Fan Status Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ChimneyFanStatusGet, data);
	}
};

export class ChimneyFanStatusReport extends CommandPacket<ChimneyFanV1ChimneyFanStatusReportData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x1e; // 30
	public static readonly definition = convertFromJsonCommand({
		"command": 30,
		"name": "ChimneyFanStatusReport",
		"help": "Chimney Fan Status Report",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "state",
				"help": "State",
				"length": 1,
				"values": {
					"0": {
						"name": "Off",
						"help": "Off"
					},
					"1": {
						"name": "Boost",
						"help": "Boost"
					},
					"2": {
						"name": "Exhaust",
						"help": "Exhaust"
					},
					"3": {
						"name": "Reload",
						"help": "Reload"
					},
					"4": {
						"name": "Venting",
						"help": "Venting"
					},
					"5": {
						"name": "Stop",
						"help": "Stop"
					},
					"6": {
						"name": "VentingEX",
						"help": "Venting_EX"
					},
					"7": {
						"name": "Service",
						"help": "Service"
					},
					"8": {
						"name": "SensorFailure",
						"help": "Sensor Failure"
					},
					"9": {
						"name": "ChimneyFire",
						"help": "Chimney Fire"
					},
					"10": {
						"name": "ExternalAlarm",
						"help": "External alarm"
					}
				}
			},
			{
				"type": "Integer",
				"name": "speed",
				"help": "Speed",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "alarmStatus",
				"help": "Alarm Status",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "startTemperatureExceeded",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Boolean",
						"name": "speedChangeEnable",
						"mask": 64,
						"shift": 6
					},
					{
						"fieldType": "Integer",
						"name": "notUsed",
						"mask": 48,
						"shift": 4
					},
					{
						"fieldType": "Boolean",
						"name": "alarmTemperatureExceeded",
						"mask": 8,
						"shift": 3
					},
					{
						"fieldType": "Boolean",
						"name": "sensorError",
						"mask": 4,
						"shift": 2
					},
					{
						"fieldType": "Boolean",
						"name": "externalAlarm",
						"mask": 2,
						"shift": 1
					},
					{
						"fieldType": "Boolean",
						"name": "service",
						"mask": 1,
						"shift": 0
					}
				]
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "precision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "scale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "size",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"value"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "value",
				"help": "Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.size"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanStatusReportData) {
		super(ChimneyFanStatusReport, data);
	}
};

export class ChimneyFanStopTempGet extends CommandPacket<void> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x0b; // 11
	public static readonly definition = convertFromJsonCommand({
		"command": 11,
		"name": "ChimneyFanStopTempGet",
		"help": "Chimney Fan Stop Temp Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ChimneyFanStopTempGet, data);
	}
};

export class ChimneyFanStopTempReport extends CommandPacket<ChimneyFanV1ChimneyFanStopTempReportData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x0c; // 12
	public static readonly definition = convertFromJsonCommand({
		"command": 12,
		"name": "ChimneyFanStopTempReport",
		"help": "Chimney Fan Stop Temp Report",
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
						"name": "precision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "scale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "size",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"value"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "value",
				"help": "Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.size"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanStopTempReportData) {
		super(ChimneyFanStopTempReport, data);
	}
};

export class ChimneyFanStopTempSet extends CommandPacket<ChimneyFanV1ChimneyFanStopTempSetData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x0a; // 10
	public static readonly definition = convertFromJsonCommand({
		"command": 10,
		"name": "ChimneyFanStopTempSet",
		"help": "Chimney Fan Stop Temp Set",
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
						"name": "precision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "scale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "size",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"value"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "value",
				"help": "Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.size"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanStopTempSetData) {
		super(ChimneyFanStopTempSet, data);
	}
};

export class ChimneyFanStopTimeGet extends CommandPacket<void> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x14; // 20
	public static readonly definition = convertFromJsonCommand({
		"command": 20,
		"name": "ChimneyFanStopTimeGet",
		"help": "Chimney Fan Stop Time Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ChimneyFanStopTimeGet, data);
	}
};

export class ChimneyFanStopTimeReport extends CommandPacket<ChimneyFanV1ChimneyFanStopTimeReportData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x15; // 21
	public static readonly definition = convertFromJsonCommand({
		"command": 21,
		"name": "ChimneyFanStopTimeReport",
		"help": "Chimney Fan Stop Time Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "time",
				"help": "Time",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanStopTimeReportData) {
		super(ChimneyFanStopTimeReport, data);
	}
};

export class ChimneyFanStopTimeSet extends CommandPacket<ChimneyFanV1ChimneyFanStopTimeSetData> {
	public static readonly CommandClass = ChimneyFanV1;
	public static readonly command = 0x13; // 19
	public static readonly definition = convertFromJsonCommand({
		"command": 19,
		"name": "ChimneyFanStopTimeSet",
		"help": "Chimney Fan Stop Time Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "time",
				"help": "Time",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ChimneyFanV1)?.command === this.command;
	}

	public constructor(data: Buffer | ChimneyFanV1ChimneyFanStopTimeSetData) {
		super(ChimneyFanStopTimeSet, data);
	}
};
