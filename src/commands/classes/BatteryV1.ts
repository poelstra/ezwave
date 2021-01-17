/**
 * Command Class Battery, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

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
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "BatteryGet",
			"help": "Battery Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "BatteryReport",
			"help": "Battery Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "batteryLevel",
					"help": "Battery Level",
					"length": 1,
					"values": {
						"255": {
							"name": "BatteryLowWarning",
							"help": "battery low warning"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

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
