/**
 * Command Class Meter, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum MeterV1Commands {
	MeterGet = 0x01,
	MeterReport = 0x02,
}

export interface MeterV1MeterReportData {
	meterType: MeterTypeEnum; // 1 byte enum value
	// TODO param properties1 type bitfield
	// TODO param meterValue type blob
}

export class MeterV1 extends CommandClassPacket<MeterV1Commands> {
	public static readonly commandClass = CommandClasses.Meter; // 0x32 (50)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(MeterV1, commandAndPayload);
	}

	public static readonly MeterGet = class MeterGet extends CommandPacket<void> {
		public static readonly CommandClass = MeterV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "MeterGet",
			"help": "Meter Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(MeterGet, data);
		}
	};

	public static readonly MeterReport = class MeterReport extends CommandPacket<MeterV1MeterReportData> {
		public static readonly CommandClass = MeterV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "MeterReport",
			"help": "Meter Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "meterType",
					"help": "Meter Type",
					"length": 1,
					"values": {
						"1": "Electric meter",
						"2": "Gas meter",
						"3": "Water meter"
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
					"name": "meterValue",
					"help": "Meter Value",
					"length": {
						"name": "Properties1",
						"mask": 7,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterV1)?.command === this.command;
		}

		constructor(data: Buffer | MeterV1MeterReportData) {
			super(MeterReport, data);
		}
	};
}

export namespace MeterV1 {
	export type MeterGet = InstanceType<typeof MeterV1.MeterGet>;
	export type MeterReport = InstanceType<typeof MeterV1.MeterReport>;
}

export enum MeterTypeEnum {
	ElectricMeter = 0x1,
	GasMeter = 0x2,
	WaterMeter = 0x3,
}
