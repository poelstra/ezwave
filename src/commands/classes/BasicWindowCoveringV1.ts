/**
 * Command Class Basic Window Covering, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum BasicWindowCoveringV1Commands {
	BasicWindowCoveringStartLevelChange = 0x01,
	BasicWindowCoveringStopLevelChange = 0x02,
}

export interface BasicWindowCoveringV1BasicWindowCoveringStartLevelChangeData {
	openClose: boolean; // level[6]
}

// Obsolete
export class BasicWindowCoveringV1 extends CommandClassPacket<BasicWindowCoveringV1Commands> {
	public static readonly commandClass = CommandClasses.BasicWindowCovering; // 0x50 (80)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(BasicWindowCoveringV1, commandAndPayload);
	}

	public static readonly BasicWindowCoveringStartLevelChange = class BasicWindowCoveringStartLevelChange extends CommandPacket<BasicWindowCoveringV1BasicWindowCoveringStartLevelChangeData> {
		public static readonly CommandClass = BasicWindowCoveringV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "BasicWindowCoveringStartLevelChange",
			"help": "Basic Window Covering Start Level Change",
			"status": "Active",
			"params": [
				{
					"type": "Bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"fieldType": "Boolean",
							"name": "reserved2",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"fieldType": "Boolean",
							"name": "openClose",
							"mask": 64,
							"shift": 6
						},
						{
							"fieldType": "Integer",
							"name": "reserved1",
							"mask": 63,
							"shift": 0,
							"reserved": true
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(BasicWindowCoveringV1)?.command === this.command;
		}

		constructor(data: Buffer | BasicWindowCoveringV1BasicWindowCoveringStartLevelChangeData) {
			super(BasicWindowCoveringStartLevelChange, data);
		}
	};

	public static readonly BasicWindowCoveringStopLevelChange = class BasicWindowCoveringStopLevelChange extends CommandPacket<void> {
		public static readonly CommandClass = BasicWindowCoveringV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "BasicWindowCoveringStopLevelChange",
			"help": "Basic Window Covering Stop Level Change",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(BasicWindowCoveringV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(BasicWindowCoveringStopLevelChange, data);
		}
	};
}

export namespace BasicWindowCoveringV1 {
	export type BasicWindowCoveringStartLevelChange = InstanceType<typeof BasicWindowCoveringV1.BasicWindowCoveringStartLevelChange>;
	export type BasicWindowCoveringStopLevelChange = InstanceType<typeof BasicWindowCoveringV1.BasicWindowCoveringStopLevelChange>;
}
