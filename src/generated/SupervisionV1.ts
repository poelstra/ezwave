/**
 * Command Class Supervision, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum SupervisionV1Commands {
	SupervisionGet = 0x01,
	SupervisionReport = 0x02,
}

export interface SupervisionV1SupervisionGetData {
	statusUpdates: boolean; // properties1[7]
	sessionId: number; // properties1[5..0]
	encapsulatedCommand: Buffer; // variable length
}

export interface SupervisionV1SupervisionReportData {
	moreStatusUpdates: boolean; // properties1[7]
	sessionId: number; // properties1[5..0]
	status: StatusEnum; // 1 byte enum value
	duration: number; // 1 byte unsigned integer
}

export enum StatusEnum {
	NoSupport = 0x0,
	Working = 0x1,
	Fail = 0x2,
	Busy = 0x3,
	Success = 0xff,
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
		public static readonly definition = convertFromJsonCommand({
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
							"fieldType": "boolean",
							"name": "statusUpdates",
							"mask": 128,
							"shift": 7
						},
						{
							"fieldType": "boolean",
							"name": "reserved",
							"mask": 64,
							"shift": 6,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "sessionId",
							"mask": 63,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "encapsulatedCommandLength",
					"help": "Encapsulated Command Length",
					"length": 1,
					"lengthOf": {
						"refs": [
							"encapsulatedCommand"
						]
					},
					"isAutogenerated": true
				},
				{
					"type": "blob",
					"name": "encapsulatedCommand",
					"help": "Encapsulated Command",
					"length": {
						"lengthType": "ref",
						"from": {
							"ref": "encapsulatedCommandLength"
						}
					},
					"blobType": "CMD_ENCAP"
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
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
							"fieldType": "boolean",
							"name": "moreStatusUpdates",
							"mask": 128,
							"shift": 7
						},
						{
							"fieldType": "boolean",
							"name": "reserved",
							"mask": 64,
							"shift": 6,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "sessionId",
							"mask": 63,
							"shift": 0
						}
					]
				},
				{
					"type": "enum",
					"name": "status",
					"help": "Status",
					"length": 1,
					"values": {
						"0": {
							"name": "NoSupport",
							"help": "NO_SUPPORT"
						},
						"1": {
							"name": "Working",
							"help": "WORKING"
						},
						"2": {
							"name": "Fail",
							"help": "FAIL"
						},
						"3": {
							"name": "Busy",
							"help": "BUSY"
						},
						"255": {
							"name": "Success",
							"help": "SUCCESS"
						}
					}
				},
				{
					"type": "integer",
					"name": "duration",
					"help": "Duration",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

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