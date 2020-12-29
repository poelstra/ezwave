/**
 * Command Class Battery, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum BatteryV1Commands {
	BatteryGet = 0x02,
	BatteryReport = 0x03,
}

export interface BatteryV1BatteryReportData {
	batteryLevel: number; // 1 byte unsigned integer
}

export class BatteryV1 extends CommandClassPacket<BatteryV1Commands> {
	public static readonly commandClass = CommandClasses.Battery; // 0x80 (128)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(BatteryV1, commandAndPayload);
	}

	public static readonly BatteryGet = class BatteryGet extends CommandPacket<void> {
		public static readonly CommandClass = BatteryV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "BatteryGet",
			"help": "Battery Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(BatteryV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(BatteryGet, data);
		}
	};

	public static readonly BatteryReport = class BatteryReport extends CommandPacket<BatteryV1BatteryReportData> {
		public static readonly CommandClass = BatteryV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "BatteryReport",
			"help": "Battery Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "batteryLevel",
					"help": "Battery Level",
					"length": 1,
					"values": {
						"255": "battery low warning"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(BatteryV1)?.command === this.command;
		}

		constructor(data: Buffer | BatteryV1BatteryReportData) {
			super(BatteryReport, data);
		}
	};
}

export namespace BatteryV1 {
	export type BatteryGet = InstanceType<typeof BatteryV1.BatteryGet>;
	export type BatteryReport = InstanceType<typeof BatteryV1.BatteryReport>;
}
