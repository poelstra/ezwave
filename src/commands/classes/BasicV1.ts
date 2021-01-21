/**
 * Command Class Basic, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

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
	public static readonly commandClass = CommandClasses.Basic; // 0x20 (32)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(BasicV1, commandAndPayload);
	}

	public static readonly BasicGet = class BasicGet extends CommandPacket<void> {
		public static readonly CommandClass = BasicV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "BasicGet",
			"help": "Basic Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(BasicV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(BasicGet, data);
		}
	};

	public static readonly BasicReport = class BasicReport extends CommandPacket<BasicV1BasicReportData> {
		public static readonly CommandClass = BasicV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(BasicV1)?.command === this.command;
		}

		constructor(data: Buffer | BasicV1BasicReportData) {
			super(BasicReport, data);
		}
	};

	public static readonly BasicSet = class BasicSet extends CommandPacket<BasicV1BasicSetData> {
		public static readonly CommandClass = BasicV1;
		public static readonly command = 0x01;
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(BasicV1)?.command === this.command;
		}

		constructor(data: Buffer | BasicV1BasicSetData) {
			super(BasicSet, data);
		}
	};
}

export namespace BasicV1 {
	export type BasicGet = InstanceType<typeof BasicV1.BasicGet>;
	export type BasicReport = InstanceType<typeof BasicV1.BasicReport>;
	export type BasicSet = InstanceType<typeof BasicV1.BasicSet>;
}
