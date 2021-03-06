/**
 * Command Class Clock, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum ClockV1Commands {
	ClockGet = 0x05,
	ClockReport = 0x06,
	ClockSet = 0x04,
}

export interface ClockV1ClockReportData {
	weekday: number; // level[7..5]
	hour: number; // level[4..0]
	minute: number; // 1 byte unsigned integer
}

export interface ClockV1ClockSetData {
	weekday: number; // level[7..5]
	hour: number; // level[4..0]
	minute: number; // 1 byte unsigned integer
}

export class ClockV1 extends CommandClassPacket<ClockV1Commands> {
	public static readonly commandClass = CommandClasses.Clock; // 0x81 (129)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ClockV1, commandAndPayload);
	}

	public static readonly ClockGet = class ClockGet extends CommandPacket<void> {
		public static readonly CommandClass = ClockV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "ClockGet",
			"help": "Clock Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ClockV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ClockGet, data);
		}
	};

	public static readonly ClockReport = class ClockReport extends CommandPacket<ClockV1ClockReportData> {
		public static readonly CommandClass = ClockV1;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "ClockReport",
			"help": "Clock Report",
			"status": "Active",
			"params": [
				{
					"type": "Bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"fieldType": "Integer",
							"name": "weekday",
							"mask": 224,
							"shift": 5
						},
						{
							"fieldType": "Integer",
							"name": "hour",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "Integer",
					"name": "minute",
					"help": "Minute",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ClockV1)?.command === this.command;
		}

		constructor(data: Buffer | ClockV1ClockReportData) {
			super(ClockReport, data);
		}
	};

	public static readonly ClockSet = class ClockSet extends CommandPacket<ClockV1ClockSetData> {
		public static readonly CommandClass = ClockV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "ClockSet",
			"help": "Clock Set",
			"status": "Active",
			"params": [
				{
					"type": "Bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"fieldType": "Integer",
							"name": "weekday",
							"mask": 224,
							"shift": 5
						},
						{
							"fieldType": "Integer",
							"name": "hour",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "Integer",
					"name": "minute",
					"help": "Minute",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ClockV1)?.command === this.command;
		}

		constructor(data: Buffer | ClockV1ClockSetData) {
			super(ClockSet, data);
		}
	};
}

export namespace ClockV1 {
	export type ClockGet = InstanceType<typeof ClockV1.ClockGet>;
	export type ClockReport = InstanceType<typeof ClockV1.ClockReport>;
	export type ClockSet = InstanceType<typeof ClockV1.ClockSet>;
}
