/**
 * Command Class Supervision, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum SupervisionV1Commands {
	SupervisionGet = 0x01,
	SupervisionReport = 0x02,
}

export interface SupervisionV1SupervisionGetData {
	statusUpdates: boolean; // properties1[7]
	sessionId: number; // properties1[5..0]
	encapsulatedCommand: Packet; // variable length
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
	public static readonly commandClass: number = CommandClasses.Supervision; // 0x6c (108)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(SupervisionV1, commandAndPayload);
	}
}

export class SupervisionGet extends CommandPacket<SupervisionV1SupervisionGetData> {
	public static readonly CommandClass: typeof SupervisionV1 = SupervisionV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "SupervisionGet",
		"help": "Supervision Get",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "statusUpdates",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Boolean",
						"name": "reserved",
						"mask": 64,
						"shift": 6,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "sessionId",
						"mask": 63,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
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
				"type": "Blob",
				"name": "encapsulatedCommand",
				"help": "Encapsulated Command",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "encapsulatedCommandLength"
					}
				},
				"blobType": "CommandEncapsulation"
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SupervisionV1)?.command === this.command;
	}

	public constructor(data: Buffer | SupervisionV1SupervisionGetData) {
		super(SupervisionGet, data);
	}
};

export class SupervisionReport extends CommandPacket<SupervisionV1SupervisionReportData> {
	public static readonly CommandClass: typeof SupervisionV1 = SupervisionV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "SupervisionReport",
		"help": "Supervision Report",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "moreStatusUpdates",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Boolean",
						"name": "reserved",
						"mask": 64,
						"shift": 6,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "sessionId",
						"mask": 63,
						"shift": 0
					}
				]
			},
			{
				"type": "Enum",
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
				"type": "Integer",
				"name": "duration",
				"help": "Duration",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(SupervisionV1)?.command === this.command;
	}

	public constructor(data: Buffer | SupervisionV1SupervisionReportData) {
		super(SupervisionReport, data);
	}
};
