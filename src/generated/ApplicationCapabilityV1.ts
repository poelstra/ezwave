/**
 * Command Class Application Capability, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ApplicationCapabilityV1Commands {
	CommandCommandClassNotSupported = 0x01,
}

export interface ApplicationCapabilityV1CommandCommandClassNotSupportedData {
	dynamic: boolean; // properties1[7]
	offendingCommandClass: number; // 1 byte unsigned integer
	offendingCommand: number; // 1 byte unsigned integer
}

// Obsolete
export class ApplicationCapabilityV1 extends CommandClassPacket<ApplicationCapabilityV1Commands> {
	public static readonly commandClass = CommandClasses.ApplicationCapability; // 0x57 (87)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ApplicationCapabilityV1, commandAndPayload);
	}

	public static readonly CommandCommandClassNotSupported = class CommandCommandClassNotSupported extends CommandPacket<ApplicationCapabilityV1CommandCommandClassNotSupportedData> {
		public static readonly CommandClass = ApplicationCapabilityV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "CommandCommandClassNotSupported",
			"help": "Command Command Class Not Supported",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "dynamic",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "reserved",
							"mask": 127,
							"shift": 0,
							"reserved": true
						}
					]
				},
				{
					"type": "integer",
					"name": "offendingCommandClass",
					"help": "Offending Command Class",
					"length": 1,
					"valueType": "CMD_CLASS_REF"
				},
				{
					"type": "integer",
					"name": "offendingCommand",
					"help": "Offending Command",
					"length": 1,
					"valueType": "CMD_REF"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ApplicationCapabilityV1)?.command === this.command;
		}

		constructor(data: Buffer | ApplicationCapabilityV1CommandCommandClassNotSupportedData) {
			super(CommandCommandClassNotSupported, data);
		}
	};
}

export namespace ApplicationCapabilityV1 {
	export type CommandCommandClassNotSupported = InstanceType<typeof ApplicationCapabilityV1.CommandCommandClassNotSupported>;
}
