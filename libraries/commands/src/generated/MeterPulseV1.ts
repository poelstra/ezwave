/**
 * Command Class Meter Pulse, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum MeterPulseV1Commands {
	MeterPulseGet = 0x04,
	MeterPulseReport = 0x05,
}

export interface MeterPulseV1MeterPulseReportData {
	pulseCount: number; // 4 byte unsigned integer
}

// This (version of the) command class is Deprecated
export class MeterPulseV1 extends CommandClassPacket<MeterPulseV1Commands> {
	public static readonly commandClass: number = CommandClasses.MeterPulse; // 0x35 (53)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(MeterPulseV1, commandAndPayload);
	}
}

export class MeterPulseGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof MeterPulseV1 = MeterPulseV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "MeterPulseGet",
		"help": "Meter Pulse Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MeterPulseV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(MeterPulseGet, data);
	}
};

export class MeterPulseReport extends CommandPacket<MeterPulseV1MeterPulseReportData> {
	public static readonly CommandClass: typeof MeterPulseV1 = MeterPulseV1;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "MeterPulseReport",
		"help": "Meter Pulse Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "pulseCount",
				"help": "Pulse Count",
				"length": 4
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MeterPulseV1)?.command === this.command;
	}

	public constructor(data: Buffer | MeterPulseV1MeterPulseReportData) {
		super(MeterPulseReport, data);
	}
};
