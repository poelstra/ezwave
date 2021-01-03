/**
 * Command Class Sensor Multilevel, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum SensorMultilevelV1Commands {
	SensorMultilevelGet = 0x04,
	SensorMultilevelReport = 0x05,
}

export interface SensorMultilevelV1SensorMultilevelReportData {
	sensorType: SensorTypeEnum; // 1 byte enum value
	precision: number; // level[7..5]
	scale: number; // level[4..3]
	sensorValue: Buffer; // variable length
}

export enum SensorTypeEnum {
	TemperatureVersion1 = 0x1,
	GeneralPurposeValueVersion1 = 0x2,
	LuminanceVersion1 = 0x3,
}

export class SensorMultilevelV1 extends CommandClassPacket<SensorMultilevelV1Commands> {
	public static readonly commandClass = CommandClasses.SensorMultilevel; // 0x31 (49)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SensorMultilevelV1, commandAndPayload);
	}

	public static readonly SensorMultilevelGet = class SensorMultilevelGet extends CommandPacket<void> {
		public static readonly CommandClass = SensorMultilevelV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "SensorMultilevelGet",
			"help": "Sensor Multilevel Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SensorMultilevelV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SensorMultilevelGet, data);
		}
	};

	public static readonly SensorMultilevelReport = class SensorMultilevelReport extends CommandPacket<SensorMultilevelV1SensorMultilevelReportData> {
		public static readonly CommandClass = SensorMultilevelV1;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "SensorMultilevelReport",
			"help": "Sensor Multilevel Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "sensorType",
					"help": "Sensor Type",
					"length": 1,
					"values": {
						"1": {
							"name": "TemperatureVersion1",
							"help": "Temperature (version 1)"
						},
						"2": {
							"name": "GeneralPurposeValueVersion1",
							"help": "General purpose value (version 1)"
						},
						"3": {
							"name": "LuminanceVersion1",
							"help": "Luminance (version 1)"
						}
					}
				},
				{
					"type": "bitfield",
					"name": "level",
					"help": "Level",
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
										"name": "sensorValue"
									}
								]
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "sensorValue",
					"help": "Sensor Value",
					"length": {
						"lengthType": "ref",
						"ref": "level",
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
			return packet.tryAs(SensorMultilevelV1)?.command === this.command;
		}

		constructor(data: Buffer | SensorMultilevelV1SensorMultilevelReportData) {
			super(SensorMultilevelReport, data);
		}
	};
}

export namespace SensorMultilevelV1 {
	export type SensorMultilevelGet = InstanceType<typeof SensorMultilevelV1.SensorMultilevelGet>;
	export type SensorMultilevelReport = InstanceType<typeof SensorMultilevelV1.SensorMultilevelReport>;
}
