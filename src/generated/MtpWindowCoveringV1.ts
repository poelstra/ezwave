/**
 * Command Class Mtp Window Covering, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum MtpWindowCoveringV1Commands {
	MoveToPositionGet = 0x02,
	MoveToPositionReport = 0x03,
	MoveToPositionSet = 0x01,
}

export interface MtpWindowCoveringV1MoveToPositionReportData {
	value: number; // 1 byte unsigned integer
}

export interface MtpWindowCoveringV1MoveToPositionSetData {
	value: number; // 1 byte unsigned integer
}

// Obsolete
export class MtpWindowCoveringV1 extends CommandClassPacket<MtpWindowCoveringV1Commands> {
	public static readonly commandClass = CommandClasses.MtpWindowCovering; // 0x51 (81)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(MtpWindowCoveringV1, commandAndPayload);
	}

	public static readonly MoveToPositionGet = class MoveToPositionGet extends CommandPacket<void> {
		public static readonly CommandClass = MtpWindowCoveringV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "MoveToPositionGet",
			"help": "Move To Position Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MtpWindowCoveringV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(MoveToPositionGet, data);
		}
	};

	public static readonly MoveToPositionReport = class MoveToPositionReport extends CommandPacket<MtpWindowCoveringV1MoveToPositionReportData> {
		public static readonly CommandClass = MtpWindowCoveringV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "MoveToPositionReport",
			"help": "Move To Position Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "value",
					"help": "Value",
					"length": 1,
					"values": {
						"0": {
							"name": "Close",
							"help": "close"
						},
						"255": {
							"name": "Open",
							"help": "open"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MtpWindowCoveringV1)?.command === this.command;
		}

		constructor(data: Buffer | MtpWindowCoveringV1MoveToPositionReportData) {
			super(MoveToPositionReport, data);
		}
	};

	public static readonly MoveToPositionSet = class MoveToPositionSet extends CommandPacket<MtpWindowCoveringV1MoveToPositionSetData> {
		public static readonly CommandClass = MtpWindowCoveringV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "MoveToPositionSet",
			"help": "Move To Position Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "value",
					"help": "Value",
					"length": 1,
					"values": {
						"0": {
							"name": "Close",
							"help": "close"
						},
						"255": {
							"name": "Open",
							"help": "open"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MtpWindowCoveringV1)?.command === this.command;
		}

		constructor(data: Buffer | MtpWindowCoveringV1MoveToPositionSetData) {
			super(MoveToPositionSet, data);
		}
	};
}

export namespace MtpWindowCoveringV1 {
	export type MoveToPositionGet = InstanceType<typeof MtpWindowCoveringV1.MoveToPositionGet>;
	export type MoveToPositionReport = InstanceType<typeof MtpWindowCoveringV1.MoveToPositionReport>;
	export type MoveToPositionSet = InstanceType<typeof MtpWindowCoveringV1.MoveToPositionSet>;
}
