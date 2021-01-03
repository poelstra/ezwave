/**
 * Command Class Sensor Configuration, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

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

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SensorConfigurationV1, commandAndPayload);
	}

	public static readonly SensorTriggerLevelGet = class SensorTriggerLevelGet extends CommandPacket<void> {
		public static readonly CommandClass = SensorConfigurationV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "SensorTriggerLevelGet",
			"help": "Sensor Trigger Level Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SensorConfigurationV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SensorTriggerLevelGet, data);
		}
	};

	public static readonly SensorTriggerLevelReport = class SensorTriggerLevelReport extends CommandPacket<SensorConfigurationV1SensorTriggerLevelReportData> {
		public static readonly CommandClass = SensorConfigurationV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "SensorTriggerLevelReport",
			"help": "Sensor Trigger Level Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
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
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "precision",
							"mask": 224,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "size",
							"mask": 7,
							"shift": 0,
							"lengthOf": {
								"refs": [
									{
										"name": "triggerValue"
									}
								]
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "triggerValue",
					"help": "Trigger Value",
					"length": {
						"lengthType": "ref",
						"ref": "properties1",
						"bitfield": {
							"mask": 7,
							"shift": 0,
							"name": "size"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SensorConfigurationV1)?.command === this.command;
		}

		constructor(data: Buffer | SensorConfigurationV1SensorTriggerLevelReportData) {
			super(SensorTriggerLevelReport, data);
		}
	};

	public static readonly SensorTriggerLevelSet = class SensorTriggerLevelSet extends CommandPacket<SensorConfigurationV1SensorTriggerLevelSetData> {
		public static readonly CommandClass = SensorConfigurationV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "SensorTriggerLevelSet",
			"help": "Sensor Trigger Level Set",
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
							"name": "default",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "boolean",
							"name": "current",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "integer",
							"name": "reserved",
							"mask": 63,
							"shift": 0,
							"reserved": true
						}
					]
				},
				{
					"type": "integer",
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
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "precision",
							"mask": 224,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "size",
							"mask": 7,
							"shift": 0,
							"lengthOf": {
								"refs": [
									{
										"name": "triggerValue"
									}
								]
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "triggerValue",
					"help": "Trigger Value",
					"length": {
						"lengthType": "ref",
						"ref": "properties2",
						"bitfield": {
							"mask": 7,
							"shift": 0,
							"name": "size"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SensorConfigurationV1)?.command === this.command;
		}

		constructor(data: Buffer | SensorConfigurationV1SensorTriggerLevelSetData) {
			super(SensorTriggerLevelSet, data);
		}
	};
}

export namespace SensorConfigurationV1 {
	export type SensorTriggerLevelGet = InstanceType<typeof SensorConfigurationV1.SensorTriggerLevelGet>;
	export type SensorTriggerLevelReport = InstanceType<typeof SensorConfigurationV1.SensorTriggerLevelReport>;
	export type SensorTriggerLevelSet = InstanceType<typeof SensorConfigurationV1.SensorTriggerLevelSet>;
}
