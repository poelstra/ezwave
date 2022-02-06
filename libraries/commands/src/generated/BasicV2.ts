/**
 * Command Class Basic, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum BasicV2Commands {
	BasicGet = 0x02,
	BasicReport = 0x03,
	BasicSet = 0x01,
}

export interface BasicV2BasicReportData {
	currentValue: number; // 1 byte unsigned integer
	targetValue: number; // 1 byte unsigned integer
	duration: number; // 1 byte unsigned integer
}

export interface BasicV2BasicSetData {
	value: number; // 1 byte unsigned integer
}

export class BasicV2 extends CommandClassPacket<BasicV2Commands> {
	public static readonly commandClass = CommandClasses.Basic; // 0x20 (32)
	public static readonly version = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(BasicV2, commandAndPayload);
	}
}

export class BasicGet extends CommandPacket<void> {
	public static readonly CommandClass = BasicV2;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "BasicGet",
		"help": "Basic Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(BasicV2)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(BasicGet, data);
	}
};

export class BasicReport extends CommandPacket<BasicV2BasicReportData> {
	public static readonly CommandClass = BasicV2;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "BasicReport",
		"help": "Basic Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "currentValue",
				"help": "Current Value",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "targetValue",
				"help": "Target Value",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "duration",
				"help": "Duration",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(BasicV2)?.command === this.command;
	}

	constructor(data: Buffer | BasicV2BasicReportData) {
		super(BasicReport, data);
	}
};

export class BasicSet extends CommandPacket<BasicV2BasicSetData> {
	public static readonly CommandClass = BasicV2;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
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

	static matches(packet: Packet): boolean {
		return packet.tryAs(BasicV2)?.command === this.command;
	}

	constructor(data: Buffer | BasicV2BasicSetData) {
		super(BasicSet, data);
	}
};
