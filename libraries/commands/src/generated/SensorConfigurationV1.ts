/**
 * Command Class Sensor Configuration, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum SensorConfigurationV1Commands {
	SensorTriggerLevelGet = 0x02,
	SensorTriggerLevelReport = 0x03,
	SensorTriggerLevelSet = 0x01,
}

export interface SensorConfigurationV1SensorTriggerLevelReportData {
	sensorType: number; // 1 byte unsigned integer
	precision: number; // properties1[7..5]
	scale: number; // properties1[4..3]
	triggerValue: Buffer; // variable length
}

export interface SensorConfigurationV1SensorTriggerLevelSetData {
	default: boolean; // properties1[7]
	current: boolean; // properties1[6]
	sensorType: number; // 1 byte unsigned integer
	precision: number; // properties2[7..5]
	scale: number; // properties2[4..3]
	triggerValue: Buffer; // variable length
}

// Obsolete
export class SensorConfigurationV1 extends CommandClassPacket<SensorConfigurationV1Commands> {
	public static readonly commandClass = CommandClasses.SensorConfiguration; // 0x9e (158)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SensorConfigurationV1, commandAndPayload);
	}
}

export class SensorTriggerLevelGet extends CommandPacket<void> {
	public static readonly CommandClass = SensorConfigurationV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "SensorTriggerLevelGet",
		"help": "Sensor Trigger Level Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SensorConfigurationV1)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(SensorTriggerLevelGet, data);
	}
};

export class SensorTriggerLevelReport extends CommandPacket<SensorConfigurationV1SensorTriggerLevelReportData> {
	public static readonly CommandClass = SensorConfigurationV1;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "SensorTriggerLevelReport",
		"help": "Sensor Trigger Level Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "sensorType",
				"help": "Sensor Type",
				"length": 1,
				"values": {
					"1": {
						"name": "Temperature",
						"help": "Temperature"
					},
					"2": {
						"name": "GeneralPurposeValue",
						"help": "General purpose value"
					},
					"3": {
						"name": "Luminance",
						"help": "Luminance"
					},
					"4": {
						"name": "Power",
						"help": "Power"
					},
					"5": {
						"name": "RelativeHumidity",
						"help": "Relative humidity"
					},
					"6": {
						"name": "Velocity",
						"help": "Velocity"
					},
					"7": {
						"name": "Direction",
						"help": "Direction"
					},
					"8": {
						"name": "AtmosphericPressure",
						"help": "Atmospheric pressure"
					},
					"9": {
						"name": "BarometricPressure",
						"help": "Barometric pressure"
					},
					"10": {
						"name": "SolarRadiation",
						"help": "Solar radiation"
					},
					"11": {
						"name": "DewPoint",
						"help": "Dew point"
					},
					"12": {
						"name": "RainRate",
						"help": "Rain rate"
					},
					"13": {
						"name": "TideLevel",
						"help": "Tide level"
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
								"triggerValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "triggerValue",
				"help": "Trigger Value",
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
		return packet.tryAs(SensorConfigurationV1)?.command === this.command;
	}

	constructor(data: Buffer | SensorConfigurationV1SensorTriggerLevelReportData) {
		super(SensorTriggerLevelReport, data);
	}
};

export class SensorTriggerLevelSet extends CommandPacket<SensorConfigurationV1SensorTriggerLevelSetData> {
	public static readonly CommandClass = SensorConfigurationV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "SensorTriggerLevelSet",
		"help": "Sensor Trigger Level Set",
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
						"name": "default",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Boolean",
						"name": "current",
						"mask": 64,
						"shift": 6
					},
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 63,
						"shift": 0,
						"reserved": true
					}
				]
			},
			{
				"type": "Integer",
				"name": "sensorType",
				"help": "Sensor Type",
				"length": 1,
				"values": {
					"1": {
						"name": "Temperature",
						"help": "Temperature"
					},
					"2": {
						"name": "GeneralPurposeValue",
						"help": "General purpose value"
					},
					"3": {
						"name": "Luminance",
						"help": "Luminance"
					},
					"4": {
						"name": "Power",
						"help": "Power"
					},
					"5": {
						"name": "RelativeHumidity",
						"help": "Relative humidity"
					},
					"6": {
						"name": "Velocity",
						"help": "Velocity"
					},
					"7": {
						"name": "Direction",
						"help": "Direction"
					},
					"8": {
						"name": "AtmosphericPressure",
						"help": "Atmospheric pressure"
					},
					"9": {
						"name": "BarometricPressure",
						"help": "Barometric pressure"
					},
					"10": {
						"name": "SolarRadiation",
						"help": "Solar radiation"
					},
					"11": {
						"name": "DewPoint",
						"help": "Dew point"
					},
					"12": {
						"name": "RainRate",
						"help": "Rain rate"
					},
					"13": {
						"name": "TideLevel",
						"help": "Tide level"
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
								"triggerValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "triggerValue",
				"help": "Trigger Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties2.size"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SensorConfigurationV1)?.command === this.command;
	}

	constructor(data: Buffer | SensorConfigurationV1SensorTriggerLevelSetData) {
		super(SensorTriggerLevelSet, data);
	}
};