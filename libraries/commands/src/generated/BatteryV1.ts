/**
 * Command Class Battery, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum BatteryV1Commands {
	BatteryGet = 0x02,
	BatteryReport = 0x03,
}

export interface BatteryV1BatteryReportData {
	batteryLevel: number; // 1 byte unsigned integer
}

export class BatteryV1 extends CommandClassPacket<BatteryV1Commands> {
	public static readonly commandClass: number = CommandClasses.Battery; // 0x80 (128)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(BatteryV1, commandAndPayload);
	}
}

export class BatteryGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof BatteryV1 = BatteryV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "BatteryGet",
		"help": "Battery Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(BatteryV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(BatteryGet, data);
	}
};

export class BatteryReport extends CommandPacket<BatteryV1BatteryReportData> {
	public static readonly CommandClass: typeof BatteryV1 = BatteryV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(BatteryV1)?.command === this.command;
	}

	public constructor(data: Buffer | BatteryV1BatteryReportData) {
		super(BatteryReport, data);
	}
};
