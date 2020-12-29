/**
 * Command Class Supervision, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum SupervisionV1Commands {
	SupervisionGet = 0x01,
	SupervisionReport = 0x02,
}

export interface SupervisionV1SupervisionGetData {
	// TODO param properties1 type bitfield
	encapsulatedCommandLength: number; // 1 byte unsigned integer
	// TODO param encapsulatedCommand type blob
}

export interface SupervisionV1SupervisionReportData {
	// TODO param properties1 type bitfield
	status: StatusEnum; // 1 byte enum value
	duration: number; // 1 byte unsigned integer
}

export class SupervisionV1 extends CommandClassPacket<SupervisionV1Commands> {
	public static readonly commandClass = CommandClasses.Supervision; // 0x6c (108)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SupervisionV1, commandAndPayload);
	}

	public static readonly SupervisionGet = class SupervisionGet extends CommandPacket<SupervisionV1SupervisionGetData> {
		public static readonly CommandClass = SupervisionV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "SupervisionGet",
			"help": "Supervision Get",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Session ID",
							"mask": 63,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Reserved",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "boolean",
							"name": "Status Updates",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "integer",
					"name": "encapsulatedCommandLength",
					"help": "Encapsulated Command Length",
					"length": 1
				},
				{
					"type": "blob",
					"name": "encapsulatedCommand",
					"help": "Encapsulated Command",
					"length": {
						"name": "Encapsulated Command Length",
						"mask": 255,
						"shift": 0
					},
					"blobType": "CMD_ENCAP"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SupervisionV1)?.command === this.command;
		}

		constructor(data: Buffer | SupervisionV1SupervisionGetData) {
			super(SupervisionGet, data);
		}
	};

	public static readonly SupervisionReport = class SupervisionReport extends CommandPacket<SupervisionV1SupervisionReportData> {
		public static readonly CommandClass = SupervisionV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "SupervisionReport",
			"help": "Supervision Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Session ID",
							"mask": 63,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Reserved",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "boolean",
							"name": "More Status Updates",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "enum",
					"name": "status",
					"help": "Status",
					"length": 1,
					"values": {
						"0": "NO_SUPPORT",
						"1": "WORKING",
						"2": "FAIL",
						"3": "BUSY",
						"255": "SUCCESS"
					}
				},
				{
					"type": "integer",
					"name": "duration",
					"help": "Duration",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(SupervisionV1)?.command === this.command;
		}

		constructor(data: Buffer | SupervisionV1SupervisionReportData) {
			super(SupervisionReport, data);
		}
	};
}

export namespace SupervisionV1 {
	export type SupervisionGet = InstanceType<typeof SupervisionV1.SupervisionGet>;
	export type SupervisionReport = InstanceType<typeof SupervisionV1.SupervisionReport>;
}

export enum StatusEnum {
	NoSupport = 0x0,
	Working = 0x1,
	Fail = 0x2,
	Busy = 0x3,
	Success = 0xff,
}
