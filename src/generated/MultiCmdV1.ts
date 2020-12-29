/**
 * Command Class Multi Cmd, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum MultiCmdV1Commands {
	MultiCmdEncap = 0x01,
}

export interface MultiCmdV1MultiCmdEncapData {
	numberOfCommands: number; // 1 byte unsigned integer
	// TODO param encapsulatedCommand type group
}

export class MultiCmdV1 extends CommandClassPacket<MultiCmdV1Commands> {
	public static readonly commandClass = CommandClasses.MultiCmd; // 0x8f (143)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(MultiCmdV1, commandAndPayload);
	}

	public static readonly MultiCmdEncap = class MultiCmdEncap extends CommandPacket<MultiCmdV1MultiCmdEncapData> {
		public static readonly CommandClass = MultiCmdV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "MultiCmdEncap",
			"help": "Multi Cmd Encap",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "numberOfCommands",
					"help": "Number of Commands",
					"length": 1
				},
				{
					"type": "group",
					"name": "encapsulatedCommand",
					"help": "Encapsulated_Command",
					"length": {
						"name": "Number of Commands",
						"mask": 255,
						"shift": 0
					},
					"params": [
						{
							"type": "integer",
							"name": "commandLength",
							"help": "Command Length",
							"length": 1
						},
						{
							"type": "integer",
							"name": "commandClass",
							"help": "Command Class",
							"length": 1,
							"valueType": "CMD_CLASS_REF"
						},
						{
							"type": "integer",
							"name": "command",
							"help": "Command",
							"length": 1,
							"valueType": "CMD_REF"
						},
						{
							"type": "blob",
							"name": "data",
							"help": "Data",
							"length": {
								"name": "Command Length",
								"mask": 255,
								"shift": 0
							},
							"blobType": "CMD_DATA",
							"includeBytesBefore": 2
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(MultiCmdV1)?.command === this.command;
		}

		constructor(data: Buffer | MultiCmdV1MultiCmdEncapData) {
			super(MultiCmdEncap, data);
		}
	};
}

export namespace MultiCmdV1 {
	export type MultiCmdEncap = InstanceType<typeof MultiCmdV1.MultiCmdEncap>;
}
