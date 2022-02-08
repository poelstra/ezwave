/**
 * Command Class Basic, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum BasicV1Commands {
	BasicGet = 0x02,
	BasicReport = 0x03,
	BasicSet = 0x01,
}

export interface BasicV1BasicReportData {
	value: number; // 1 byte unsigned integer
}

export interface BasicV1BasicSetData {
	value: number; // 1 byte unsigned integer
}

export class BasicV1 extends CommandClassPacket<BasicV1Commands> {
	public static readonly commandClass: number = CommandClasses.Basic; // 0x20 (32)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(BasicV1, commandAndPayload);
	}
}

export class BasicGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof BasicV1 = BasicV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "BasicGet",
		"help": "Basic Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(BasicV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(BasicGet, data);
	}
};

export class BasicReport extends CommandPacket<BasicV1BasicReportData> {
	public static readonly CommandClass: typeof BasicV1 = BasicV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "BasicReport",
		"help": "Basic Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "value",
				"help": "Value",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(BasicV1)?.command === this.command;
	}

	public constructor(data: Buffer | BasicV1BasicReportData) {
		super(BasicReport, data);
	}
};

export class BasicSet extends CommandPacket<BasicV1BasicSetData> {
	public static readonly CommandClass: typeof BasicV1 = BasicV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "BasicSet",
		"help": "Basic Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "value",
				"help": "Value",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(BasicV1)?.command === this.command;
	}

	public constructor(data: Buffer | BasicV1BasicSetData) {
		super(BasicSet, data);
	}
};
