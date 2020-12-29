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
	// TODO param properties1 type bitfield
	// TODO param triggerValue type blob
}

export interface SensorConfigurationV1SensorTriggerLevelSetData {
	// TODO param properties1 type bitfield
	sensorType: number; // 1 byte unsigned integer
	// TODO param properties2 type bitfield
	// TODO param triggerValue type blob
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
						"1": "Temperature",
						"2": "General purpose value",
						"3": "Luminance",
						"4": "Power",
						"5": "Relative humidity",
						"6": "Velocity",
						"7": "Direction",
						"8": "Atmospheric pressure",
						"9": "Barometric pressure",
						"10": "Solar radiation",
						"11": "Dew point",
						"12": "Rain rate",
						"13": "Tide level"
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
					"name": "triggerValue",
					"help": "Trigger Value",
					"length": {
						"name": "Properties1",
						"mask": 7,
						"shift": 0
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
							"type": "integer",
							"name": "Reserved",
							"mask": 63,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Current",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "boolean",
							"name": "Default",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "integer",
					"name": "sensorType",
					"help": "Sensor Type",
					"length": 1,
					"values": {
						"1": "Temperature",
						"2": "General purpose value",
						"3": "Luminance",
						"4": "Power",
						"5": "Relative humidity",
						"6": "Velocity",
						"7": "Direction",
						"8": "Atmospheric pressure",
						"9": "Barometric pressure",
						"10": "Solar radiation",
						"11": "Dew point",
						"12": "Rain rate",
						"13": "Tide level"
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
					"name": "triggerValue",
					"help": "Trigger Value",
					"length": {
						"name": "Properties2",
						"mask": 7,
						"shift": 0
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
