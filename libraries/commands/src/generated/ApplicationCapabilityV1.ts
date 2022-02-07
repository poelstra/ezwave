/**
 * Command Class Application Capability, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ApplicationCapabilityV1, commandAndPayload);
	}
}

export class CommandCommandClassNotSupported extends CommandPacket<ApplicationCapabilityV1CommandCommandClassNotSupportedData> {
	public static readonly CommandClass = ApplicationCapabilityV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "CommandCommandClassNotSupported",
		"help": "Command Command Class Not Supported",
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
						"name": "dynamic",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 127,
						"shift": 0,
						"reserved": true
					}
				]
			},
			{
				"type": "Integer",
				"name": "offendingCommandClass",
				"help": "Offending Command Class",
				"length": 1,
				"valueType": "CommandClass"
			},
			{
				"type": "Integer",
				"name": "offendingCommand",
				"help": "Offending Command",
				"length": 1,
				"valueType": "Command"
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ApplicationCapabilityV1)?.command === this.command;
	}

	public constructor(data: Buffer | ApplicationCapabilityV1CommandCommandClassNotSupportedData) {
		super(CommandCommandClassNotSupported, data);
	}
};
