/**
 * Command Class Irrigation, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum IrrigationV1Commands {
	IrrigationSystemInfoGet = 0x01,
	IrrigationSystemInfoReport = 0x02,
	IrrigationSystemStatusGet = 0x03,
	IrrigationSystemStatusReport = 0x04,
	IrrigationSystemConfigSet = 0x05,
	IrrigationSystemConfigGet = 0x06,
	IrrigationSystemConfigReport = 0x07,
	IrrigationValveInfoGet = 0x08,
	IrrigationValveInfoReport = 0x09,
	IrrigationValveConfigSet = 0x0a,
	IrrigationValveConfigGet = 0x0b,
	IrrigationValveConfigReport = 0x0c,
	IrrigationValveRun = 0x0d,
	IrrigationValveTableSet = 0x0e,
	IrrigationValveTableGet = 0x0f,
	IrrigationValveTableReport = 0x10,
	IrrigationValveTableRun = 0x11,
	IrrigationSystemShutoff = 0x12,
}

export interface IrrigationV1IrrigationSystemInfoReportData {
	masterValve: boolean; // properties1[0]
	totalNumberOfValves: number; // 1 byte unsigned integer
	totalNumberOfValveTables: number; // 1 byte unsigned integer
	valveTableMaxSize: number; // properties2[3..0]
}

export interface IrrigationV1IrrigationSystemStatusReportData {
	systemVoltage: number; // 1 byte unsigned integer
	sensorStatus: SensorStatusEnum; // 1 byte enum value
	flowPrecision: number; // properties1[7..5]
	flowScale: number; // properties1[4..3]
	flowValue: Buffer; // variable length
	pressurePrecision: number; // properties2[7..5]
	pressureScale: number; // properties2[4..3]
	pressureValue: Buffer; // variable length
	shutoffDuration: number; // 1 byte unsigned integer
	systemErrorStatus: Set<SystemErrorStatusEnum>; // 1 bytes
	masterValve: boolean; // properties3[0]
	valveId: number; // 1 byte unsigned integer
}

export interface IrrigationV1IrrigationSystemConfigSetData {
	masterValveDelay: number; // 1 byte unsigned integer
	highPressureThresholdPrecision: number; // properties1[7..5]
	highPressureThresholdScale: number; // properties1[4..3]
	highPressureThresholdValue: Buffer; // variable length
	lowPressureThresholdPrecision: number; // properties2[7..5]
	lowPressureThresholdScale: number; // properties2[4..3]
	lowPressureThresholdValue: Buffer; // variable length
	sensorPolarity: Set<SensorPolarityEnum>; // 1 bytes
}

export interface IrrigationV1IrrigationSystemConfigReportData {
	masterValveDelay: number; // 1 byte unsigned integer
	highPressureThresholdPrecision: number; // properties1[7..5]
	highPressureThresholdScale: number; // properties1[4..3]
	highPressureThresholdValue: Buffer; // variable length
	lowPressureThresholdPrecision: number; // properties2[7..5]
	lowPressureThresholdScale: number; // properties2[4..3]
	lowPressureThresholdValue: Buffer; // variable length
	sensorPolarity: Set<SensorPolarityEnum>; // 1 bytes
}

export interface IrrigationV1IrrigationValveInfoGetData {
	masterValve: boolean; // properties1[0]
	valveId: number; // 1 byte unsigned integer
}

export interface IrrigationV1IrrigationValveInfoReportData {
	connected: boolean; // properties1[1]
	master: boolean; // properties1[0]
	valveId: number; // 1 byte unsigned integer
	nominalCurrent: number; // 1 byte unsigned integer
	valveErrorStatus: Set<ValveErrorStatusEnum>; // 1 bytes
}

export interface IrrigationV1IrrigationValveConfigSetData {
	masterValve: boolean; // properties1[0]
	valveId: number; // 1 byte unsigned integer
	nominalCurrentHighThreshold: number; // 1 byte unsigned integer
	nominalCurrentLowThreshold: number; // 1 byte unsigned integer
	maximumFlowPrecision: number; // properties2[7..5]
	maximumFlowScale: number; // properties2[4..3]
	maximumFlowValue: Buffer; // variable length
	flowHighThresholdPrecision: number; // properties3[7..5]
	flowHighThresholdScale: number; // properties3[4..3]
	flowHighThresholdValue: Buffer; // variable length
	flowLowThresholdPrecision: number; // properties4[7..5]
	flowLowThresholdScale: number; // properties4[4..3]
	flowLowThresholdValue: Buffer; // variable length
	sensorUsage: Set<SensorUsageEnum>; // 1 bytes
}

export interface IrrigationV1IrrigationValveConfigGetData {
	masterValve: boolean; // properties1[0]
	valveId: number; // 1 byte unsigned integer
}

export interface IrrigationV1IrrigationValveConfigReportData {
	masterValve: boolean; // properties1[0]
	valveId: number; // 1 byte unsigned integer
	nominalCurrentHighThreshold: number; // 1 byte unsigned integer
	nominalCurrentLowThreshold: number; // 1 byte unsigned integer
	maximumFlowPrecision: number; // properties2[7..5]
	maximumFlowScale: number; // properties2[4..3]
	maximumFlowValue: Buffer; // variable length
	flowHighThresholdPrecision: number; // properties3[7..5]
	flowHighThresholdScale: number; // properties3[4..3]
	flowHighThresholdValue: Buffer; // variable length
	flowLowThresholdPrecision: number; // properties4[7..5]
	flowLowThresholdScale: number; // properties4[4..3]
	flowLowThresholdValue: Buffer; // variable length
	sensorUsage: Set<SensorUsageEnum>; // 1 bytes
}

export interface IrrigationV1IrrigationValveRunData {
	masterValve: boolean; // properties1[0]
	valveId: number; // 1 byte unsigned integer
	duration: number; // 2 byte unsigned integer
}

export interface IrrigationV1IrrigationValveTableSetData {
	valveTableId: number; // 1 byte unsigned integer
	vg1: Array<{ // automatic length
		valveId: number; // 1 byte unsigned integer
		duration: number; // 2 byte unsigned integer
	}>;
}

export interface IrrigationV1IrrigationValveTableGetData {
	valveTableId: number; // 1 byte unsigned integer
}

export interface IrrigationV1IrrigationValveTableReportData {
	valveTableId: number; // 1 byte unsigned integer
	vg1: Array<{ // automatic length
		valveId: number; // 1 byte unsigned integer
		duration: number; // 2 byte unsigned integer
	}>;
}

export interface IrrigationV1IrrigationValveTableRunData {
	valveTableId: Buffer; // automatic length
}

export interface IrrigationV1IrrigationSystemShutoffData {
	duration: number; // 1 byte unsigned integer
}

export enum SensorStatusEnum {
	FlowSensorDetected = 0x0,
	PressureSensorDetected = 0x1,
	RainSensorDetected = 0x2,
	MoistureSensorDetected = 0x3,
}

export enum SystemErrorStatusEnum {
	NotProgrammed = 0x0,
	EmergencyShutdown = 0x1,
	HighThresholdTriggered = 0x2,
	LowThresholdTriggered = 0x3,
	ValveErrors = 0x4,
}

export enum SensorPolarityEnum {
	RainSensorPolarity = 0x0,
	MoistureSensorPolarity = 0x1,
	Valid = 0x7,
}

export enum ValveErrorStatusEnum {
	ShortCircuit = 0x0,
	CurrentHighThreshold = 0x1,
	CurrentLowThreshold = 0x2,
	MaximumFlow = 0x3,
	FlowHighThreshold = 0x4,
	FlowLowThreshold = 0x5,
}

export enum SensorUsageEnum {
	UseRainSensor = 0x0,
	UseMoistureSensor = 0x1,
}

export class IrrigationV1 extends CommandClassPacket<IrrigationV1Commands> {
	public static readonly commandClass: number = CommandClasses.Irrigation; // 0x6b (107)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(IrrigationV1, commandAndPayload);
	}
}

export class IrrigationSystemInfoGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof IrrigationV1 = IrrigationV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "IrrigationSystemInfoGet",
		"help": "Irrigation System Info Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IrrigationV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(IrrigationSystemInfoGet, data);
	}
};

export class IrrigationSystemInfoReport extends CommandPacket<IrrigationV1IrrigationSystemInfoReportData> {
	public static readonly CommandClass: typeof IrrigationV1 = IrrigationV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "IrrigationSystemInfoReport",
		"help": "Irrigation System Info Report",
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
						"name": "reserved3",
						"mask": 224,
						"shift": 5,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "reserved2",
						"mask": 24,
						"shift": 3,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "reserved1",
						"mask": 6,
						"shift": 1,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "masterValve",
						"mask": 1,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "totalNumberOfValves",
				"help": "Total Number of Valves",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "totalNumberOfValveTables",
				"help": "Total Number of Valve Tables",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "properties2",
				"help": "Properties2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 240,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "valveTableMaxSize",
						"mask": 15,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IrrigationV1)?.command === this.command;
	}

	public constructor(data: Buffer | IrrigationV1IrrigationSystemInfoReportData) {
		super(IrrigationSystemInfoReport, data);
	}
};

export class IrrigationSystemStatusGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof IrrigationV1 = IrrigationV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "IrrigationSystemStatusGet",
		"help": "Irrigation System Status Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IrrigationV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(IrrigationSystemStatusGet, data);
	}
};

export class IrrigationSystemStatusReport extends CommandPacket<IrrigationV1IrrigationSystemStatusReportData> {
	public static readonly CommandClass: typeof IrrigationV1 = IrrigationV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "IrrigationSystemStatusReport",
		"help": "Irrigation System Status Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "systemVoltage",
				"help": "System Voltage",
				"length": 1
			},
			{
				"type": "Enum",
				"name": "sensorStatus",
				"help": "Sensor Status",
				"length": 1,
				"values": {
					"0": {
						"name": "FlowSensorDetected",
						"help": "Flow Sensor Detected"
					},
					"1": {
						"name": "PressureSensorDetected",
						"help": "Pressure Sensor Detected"
					},
					"2": {
						"name": "RainSensorDetected",
						"help": "Rain Sensor Detected"
					},
					"3": {
						"name": "MoistureSensorDetected",
						"help": "Moisture Sensor Detected"
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
						"name": "flowPrecision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "flowScale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "flowSize",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"flowValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "flowValue",
				"help": "Flow Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.flowSize"
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
						"name": "pressurePrecision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "pressureScale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "pressureSize",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"pressureValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "pressureValue",
				"help": "Pressure Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties2.pressureSize"
					}
				}
			},
			{
				"type": "Integer",
				"name": "shutoffDuration",
				"help": "Shutoff Duration",
				"length": 1
			},
			{
				"type": "Bitmask",
				"name": "systemErrorStatus",
				"help": "System Error Status",
				"length": 1,
				"values": {
					"0": {
						"name": "NotProgrammed",
						"help": "not programmed"
					},
					"1": {
						"name": "EmergencyShutdown",
						"help": "emergency shutdown"
					},
					"2": {
						"name": "HighThresholdTriggered",
						"help": "high threshold triggered"
					},
					"3": {
						"name": "LowThresholdTriggered",
						"help": "low threshold triggered"
					},
					"4": {
						"name": "ValveErrors",
						"help": "valve errors"
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
						"name": "reserved",
						"mask": 254,
						"shift": 1,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "masterValve",
						"mask": 1,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "valveId",
				"help": "Valve ID",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IrrigationV1)?.command === this.command;
	}

	public constructor(data: Buffer | IrrigationV1IrrigationSystemStatusReportData) {
		super(IrrigationSystemStatusReport, data);
	}
};

export class IrrigationSystemConfigSet extends CommandPacket<IrrigationV1IrrigationSystemConfigSetData> {
	public static readonly CommandClass: typeof IrrigationV1 = IrrigationV1;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "IrrigationSystemConfigSet",
		"help": "Irrigation System Config Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "masterValveDelay",
				"help": "Master Valve Delay",
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
						"name": "highPressureThresholdPrecision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "highPressureThresholdScale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "highPressureThresholdSize",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"highPressureThresholdValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "highPressureThresholdValue",
				"help": "High Pressure Threshold Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.highPressureThresholdSize"
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
						"name": "lowPressureThresholdPrecision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "lowPressureThresholdScale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "lowPressureThresholdSize",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"lowPressureThresholdValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "lowPressureThresholdValue",
				"help": "Low Pressure Threshold Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties2.lowPressureThresholdSize"
					}
				}
			},
			{
				"type": "Bitmask",
				"name": "sensorPolarity",
				"help": "Sensor Polarity",
				"length": 1,
				"values": {
					"0": {
						"name": "RainSensorPolarity",
						"help": "Rain Sensor Polarity"
					},
					"1": {
						"name": "MoistureSensorPolarity",
						"help": "Moisture Sensor Polarity"
					},
					"7": {
						"name": "Valid",
						"help": "Valid"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IrrigationV1)?.command === this.command;
	}

	public constructor(data: Buffer | IrrigationV1IrrigationSystemConfigSetData) {
		super(IrrigationSystemConfigSet, data);
	}
};

export class IrrigationSystemConfigGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof IrrigationV1 = IrrigationV1;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 6,
		"name": "IrrigationSystemConfigGet",
		"help": "Irrigation System Config Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IrrigationV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(IrrigationSystemConfigGet, data);
	}
};

export class IrrigationSystemConfigReport extends CommandPacket<IrrigationV1IrrigationSystemConfigReportData> {
	public static readonly CommandClass: typeof IrrigationV1 = IrrigationV1;
	public static readonly command: number = 0x07; // 7
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 7,
		"name": "IrrigationSystemConfigReport",
		"help": "Irrigation System Config Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "masterValveDelay",
				"help": "Master Valve Delay",
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
						"name": "highPressureThresholdPrecision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "highPressureThresholdScale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "highPressureThresholdSize",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"highPressureThresholdValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "highPressureThresholdValue",
				"help": "High Pressure Threshold Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.highPressureThresholdSize"
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
						"name": "lowPressureThresholdPrecision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "lowPressureThresholdScale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "lowPressureThresholdSize",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"lowPressureThresholdValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "lowPressureThresholdValue",
				"help": "Low Pressure Threshold Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties2.lowPressureThresholdSize"
					}
				}
			},
			{
				"type": "Bitmask",
				"name": "sensorPolarity",
				"help": "Sensor Polarity",
				"length": 1,
				"values": {
					"0": {
						"name": "RainSensorPolarity",
						"help": "Rain Sensor Polarity"
					},
					"1": {
						"name": "MoistureSensorPolarity",
						"help": "Moisture Sensor Polarity"
					},
					"7": {
						"name": "Valid",
						"help": "Valid"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IrrigationV1)?.command === this.command;
	}

	public constructor(data: Buffer | IrrigationV1IrrigationSystemConfigReportData) {
		super(IrrigationSystemConfigReport, data);
	}
};

export class IrrigationValveInfoGet extends CommandPacket<IrrigationV1IrrigationValveInfoGetData> {
	public static readonly CommandClass: typeof IrrigationV1 = IrrigationV1;
	public static readonly command: number = 0x08; // 8
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 8,
		"name": "IrrigationValveInfoGet",
		"help": "Irrigation Valve Info Get",
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
						"name": "reserved",
						"mask": 254,
						"shift": 1,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "masterValve",
						"mask": 1,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "valveId",
				"help": "Valve ID",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IrrigationV1)?.command === this.command;
	}

	public constructor(data: Buffer | IrrigationV1IrrigationValveInfoGetData) {
		super(IrrigationValveInfoGet, data);
	}
};

export class IrrigationValveInfoReport extends CommandPacket<IrrigationV1IrrigationValveInfoReportData> {
	public static readonly CommandClass: typeof IrrigationV1 = IrrigationV1;
	public static readonly command: number = 0x09; // 9
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 9,
		"name": "IrrigationValveInfoReport",
		"help": "Irrigation Valve Info Report",
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
						"name": "reserved",
						"mask": 252,
						"shift": 2,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "connected",
						"mask": 2,
						"shift": 1
					},
					{
						"fieldType": "Boolean",
						"name": "master",
						"mask": 1,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "valveId",
				"help": "Valve ID",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "nominalCurrent",
				"help": "Nominal Current",
				"length": 1
			},
			{
				"type": "Bitmask",
				"name": "valveErrorStatus",
				"help": "Valve Error Status",
				"length": 1,
				"values": {
					"0": {
						"name": "ShortCircuit",
						"help": "short circuit"
					},
					"1": {
						"name": "CurrentHighThreshold",
						"help": "current high threshold"
					},
					"2": {
						"name": "CurrentLowThreshold",
						"help": "current low threshold"
					},
					"3": {
						"name": "MaximumFlow",
						"help": "maximum flow"
					},
					"4": {
						"name": "FlowHighThreshold",
						"help": "flow high threshold"
					},
					"5": {
						"name": "FlowLowThreshold",
						"help": "flow low threshold"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IrrigationV1)?.command === this.command;
	}

	public constructor(data: Buffer | IrrigationV1IrrigationValveInfoReportData) {
		super(IrrigationValveInfoReport, data);
	}
};

export class IrrigationValveConfigSet extends CommandPacket<IrrigationV1IrrigationValveConfigSetData> {
	public static readonly CommandClass: typeof IrrigationV1 = IrrigationV1;
	public static readonly command: number = 0x0a; // 10
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 10,
		"name": "IrrigationValveConfigSet",
		"help": "Irrigation Valve Config Set",
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
						"name": "reserved",
						"mask": 254,
						"shift": 1,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "masterValve",
						"mask": 1,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "valveId",
				"help": "Valve ID",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "nominalCurrentHighThreshold",
				"help": "Nominal Current High Threshold",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "nominalCurrentLowThreshold",
				"help": "Nominal Current Low Threshold",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "properties2",
				"help": "Properties2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "maximumFlowPrecision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "maximumFlowScale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "maximumFlowSize",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"maximumFlowValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "maximumFlowValue",
				"help": "Maximum Flow Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties2.maximumFlowSize"
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
						"name": "flowHighThresholdPrecision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "flowHighThresholdScale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "flowHighThresholdSize",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"flowHighThresholdValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "flowHighThresholdValue",
				"help": "Flow High Threshold Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties3.flowHighThresholdSize"
					}
				}
			},
			{
				"type": "Bitfield",
				"name": "properties4",
				"help": "Properties4",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "flowLowThresholdPrecision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "flowLowThresholdScale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "flowLowThresholdSize",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"flowLowThresholdValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "flowLowThresholdValue",
				"help": "Flow Low Threshold Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties4.flowLowThresholdSize"
					}
				}
			},
			{
				"type": "Bitmask",
				"name": "sensorUsage",
				"help": "Sensor Usage",
				"length": 1,
				"values": {
					"0": {
						"name": "UseRainSensor",
						"help": "Use Rain Sensor"
					},
					"1": {
						"name": "UseMoistureSensor",
						"help": "Use Moisture Sensor"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IrrigationV1)?.command === this.command;
	}

	public constructor(data: Buffer | IrrigationV1IrrigationValveConfigSetData) {
		super(IrrigationValveConfigSet, data);
	}
};

export class IrrigationValveConfigGet extends CommandPacket<IrrigationV1IrrigationValveConfigGetData> {
	public static readonly CommandClass: typeof IrrigationV1 = IrrigationV1;
	public static readonly command: number = 0x0b; // 11
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 11,
		"name": "IrrigationValveConfigGet",
		"help": "Irrigation Valve Config Get",
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
						"name": "reserved",
						"mask": 254,
						"shift": 1,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "masterValve",
						"mask": 1,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "valveId",
				"help": "Valve ID",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IrrigationV1)?.command === this.command;
	}

	public constructor(data: Buffer | IrrigationV1IrrigationValveConfigGetData) {
		super(IrrigationValveConfigGet, data);
	}
};

export class IrrigationValveConfigReport extends CommandPacket<IrrigationV1IrrigationValveConfigReportData> {
	public static readonly CommandClass: typeof IrrigationV1 = IrrigationV1;
	public static readonly command: number = 0x0c; // 12
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 12,
		"name": "IrrigationValveConfigReport",
		"help": "Irrigation Valve Config Report",
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
						"name": "reserved",
						"mask": 254,
						"shift": 1,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "masterValve",
						"mask": 1,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "valveId",
				"help": "Valve ID",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "nominalCurrentHighThreshold",
				"help": "Nominal Current High Threshold",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "nominalCurrentLowThreshold",
				"help": "Nominal Current Low Threshold",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "properties2",
				"help": "Properties2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "maximumFlowPrecision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "maximumFlowScale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "maximumFlowSize",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"maximumFlowValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "maximumFlowValue",
				"help": "Maximum Flow Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties2.maximumFlowSize"
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
						"name": "flowHighThresholdPrecision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "flowHighThresholdScale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "flowHighThresholdSize",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"flowHighThresholdValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "flowHighThresholdValue",
				"help": "Flow High Threshold Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties3.flowHighThresholdSize"
					}
				}
			},
			{
				"type": "Bitfield",
				"name": "properties4",
				"help": "Properties4",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "flowLowThresholdPrecision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "flowLowThresholdScale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "flowLowThresholdSize",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"flowLowThresholdValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "flowLowThresholdValue",
				"help": "Flow Low Threshold Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties4.flowLowThresholdSize"
					}
				}
			},
			{
				"type": "Bitmask",
				"name": "sensorUsage",
				"help": "Sensor Usage",
				"length": 1,
				"values": {
					"0": {
						"name": "UseRainSensor",
						"help": "Use Rain Sensor"
					},
					"1": {
						"name": "UseMoistureSensor",
						"help": "Use Moisture Sensor"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IrrigationV1)?.command === this.command;
	}

	public constructor(data: Buffer | IrrigationV1IrrigationValveConfigReportData) {
		super(IrrigationValveConfigReport, data);
	}
};

export class IrrigationValveRun extends CommandPacket<IrrigationV1IrrigationValveRunData> {
	public static readonly CommandClass: typeof IrrigationV1 = IrrigationV1;
	public static readonly command: number = 0x0d; // 13
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 13,
		"name": "IrrigationValveRun",
		"help": "Irrigation Valve Run",
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
						"name": "reserved",
						"mask": 254,
						"shift": 1,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "masterValve",
						"mask": 1,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "valveId",
				"help": "Valve ID",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "duration",
				"help": "Duration",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IrrigationV1)?.command === this.command;
	}

	public constructor(data: Buffer | IrrigationV1IrrigationValveRunData) {
		super(IrrigationValveRun, data);
	}
};

export class IrrigationValveTableSet extends CommandPacket<IrrigationV1IrrigationValveTableSetData> {
	public static readonly CommandClass: typeof IrrigationV1 = IrrigationV1;
	public static readonly command: number = 0x0e; // 14
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 14,
		"name": "IrrigationValveTableSet",
		"help": "Irrigation Valve Table Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "valveTableId",
				"help": "Valve Table ID",
				"length": 1
			},
			{
				"type": "Group",
				"name": "vg1",
				"help": "vg1",
				"length": {
					"lengthType": "Auto"
				},
				"params": [
					{
						"type": "Integer",
						"name": "valveId",
						"help": "Valve ID",
						"length": 1
					},
					{
						"type": "Integer",
						"name": "duration",
						"help": "Duration",
						"length": 2
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IrrigationV1)?.command === this.command;
	}

	public constructor(data: Buffer | IrrigationV1IrrigationValveTableSetData) {
		super(IrrigationValveTableSet, data);
	}
};

export class IrrigationValveTableGet extends CommandPacket<IrrigationV1IrrigationValveTableGetData> {
	public static readonly CommandClass: typeof IrrigationV1 = IrrigationV1;
	public static readonly command: number = 0x0f; // 15
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 15,
		"name": "IrrigationValveTableGet",
		"help": "Irrigation Valve Table Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "valveTableId",
				"help": "Valve Table ID",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IrrigationV1)?.command === this.command;
	}

	public constructor(data: Buffer | IrrigationV1IrrigationValveTableGetData) {
		super(IrrigationValveTableGet, data);
	}
};

export class IrrigationValveTableReport extends CommandPacket<IrrigationV1IrrigationValveTableReportData> {
	public static readonly CommandClass: typeof IrrigationV1 = IrrigationV1;
	public static readonly command: number = 0x10; // 16
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 16,
		"name": "IrrigationValveTableReport",
		"help": "Irrigation Valve Table Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "valveTableId",
				"help": "Valve Table ID",
				"length": 1
			},
			{
				"type": "Group",
				"name": "vg1",
				"help": "vg1",
				"length": {
					"lengthType": "Auto"
				},
				"params": [
					{
						"type": "Integer",
						"name": "valveId",
						"help": "Valve ID",
						"length": 1
					},
					{
						"type": "Integer",
						"name": "duration",
						"help": "Duration",
						"length": 2
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IrrigationV1)?.command === this.command;
	}

	public constructor(data: Buffer | IrrigationV1IrrigationValveTableReportData) {
		super(IrrigationValveTableReport, data);
	}
};

export class IrrigationValveTableRun extends CommandPacket<IrrigationV1IrrigationValveTableRunData> {
	public static readonly CommandClass: typeof IrrigationV1 = IrrigationV1;
	public static readonly command: number = 0x11; // 17
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 17,
		"name": "IrrigationValveTableRun",
		"help": "Irrigation Valve Table Run",
		"status": "Active",
		"params": [
			{
				"type": "Blob",
				"name": "valveTableId",
				"help": "Valve Table ID",
				"length": {
					"lengthType": "Auto"
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IrrigationV1)?.command === this.command;
	}

	public constructor(data: Buffer | IrrigationV1IrrigationValveTableRunData) {
		super(IrrigationValveTableRun, data);
	}
};

export class IrrigationSystemShutoff extends CommandPacket<IrrigationV1IrrigationSystemShutoffData> {
	public static readonly CommandClass: typeof IrrigationV1 = IrrigationV1;
	public static readonly command: number = 0x12; // 18
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 18,
		"name": "IrrigationSystemShutoff",
		"help": "Irrigation System Shutoff",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "duration",
				"help": "Duration",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(IrrigationV1)?.command === this.command;
	}

	public constructor(data: Buffer | IrrigationV1IrrigationSystemShutoffData) {
		super(IrrigationSystemShutoff, data);
	}
};
