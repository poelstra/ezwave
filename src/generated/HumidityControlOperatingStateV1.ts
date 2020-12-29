/**
 * Command Class Humidity Control Operating State, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum HumidityControlOperatingStateV1Commands {
	HumidityControlOperatingStateGet = 0x01,
	HumidityControlOperatingStateReport = 0x02,
}

export interface HumidityControlOperatingStateV1HumidityControlOperatingStateReportData {
	// TODO param properties1 type bitfield
}

export class HumidityControlOperatingStateV1 extends CommandClassPacket<HumidityControlOperatingStateV1Commands> {
	public static readonly commandClass = CommandClasses.HumidityControlOperatingState; // 0x6e (110)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(HumidityControlOperatingStateV1, commandAndPayload);
	}

	public static readonly HumidityControlOperatingStateGet = class HumidityControlOperatingStateGet extends CommandPacket<void> {
		public static readonly CommandClass = HumidityControlOperatingStateV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "HumidityControlOperatingStateGet",
			"help": "Humidity Control Operating State Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlOperatingStateV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(HumidityControlOperatingStateGet, data);
		}
	};

	public static readonly HumidityControlOperatingStateReport = class HumidityControlOperatingStateReport extends CommandPacket<HumidityControlOperatingStateV1HumidityControlOperatingStateReportData> {
		public static readonly CommandClass = HumidityControlOperatingStateV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "HumidityControlOperatingStateReport",
			"help": "Humidity Control Operating State Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "enum",
							"name": "Operating State",
							"mask": 15,
							"shift": 0,
							"values": {
								"0": "Idle",
								"1": "Humidifying",
								"2": "Dehumidifying"
							}
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 240,
							"shift": 4
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlOperatingStateV1)?.command === this.command;
		}

		constructor(data: Buffer | HumidityControlOperatingStateV1HumidityControlOperatingStateReportData) {
			super(HumidityControlOperatingStateReport, data);
		}
	};
}

export namespace HumidityControlOperatingStateV1 {
	export type HumidityControlOperatingStateGet = InstanceType<typeof HumidityControlOperatingStateV1.HumidityControlOperatingStateGet>;
	export type HumidityControlOperatingStateReport = InstanceType<typeof HumidityControlOperatingStateV1.HumidityControlOperatingStateReport>;
}
