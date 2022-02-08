/**
 * Command Class Multi Instance, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum MultiInstanceV1Commands {
	MultiInstanceCmdEncap = 0x06,
	MultiInstanceGet = 0x04,
	MultiInstanceReport = 0x05,
}

export interface MultiInstanceV1MultiInstanceCmdEncapData {
	instance: number; // 1 byte unsigned integer
	commandClass: number; // 1 byte unsigned integer
	command: number; // 1 byte unsigned integer
	parameter: Buffer; // automatic length
}

export interface MultiInstanceV1MultiInstanceGetData {
	commandClass: number; // 1 byte unsigned integer
}

export interface MultiInstanceV1MultiInstanceReportData {
	commandClass: number; // 1 byte unsigned integer
	instances: number; // 1 byte unsigned integer
}

// This (version of the) command class is Obsolete
export class MultiInstanceV1 extends CommandClassPacket<MultiInstanceV1Commands> {
	public static readonly commandClass: number = CommandClasses.MultiInstance; // 0x60 (96)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(MultiInstanceV1, commandAndPayload);
	}
}

export class MultiInstanceCmdEncap extends CommandPacket<MultiInstanceV1MultiInstanceCmdEncapData> {
	public static readonly CommandClass: typeof MultiInstanceV1 = MultiInstanceV1;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 6,
		"name": "MultiInstanceCmdEncap",
		"help": "Multi Instance Cmd Encap",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "instance",
				"help": "Instance",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "commandClass",
				"help": "Command Class",
				"length": 1,
				"valueType": "CommandClass"
			},
			{
				"type": "Integer",
				"name": "command",
				"help": "Command",
				"length": 1,
				"valueType": "Command"
			},
			{
				"type": "Blob",
				"name": "parameter",
				"help": "Parameter",
				"length": {
					"lengthType": "Auto"
				},
				"blobType": "CommandData"
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MultiInstanceV1)?.command === this.command;
	}

	public constructor(data: Buffer | MultiInstanceV1MultiInstanceCmdEncapData) {
		super(MultiInstanceCmdEncap, data);
	}
};

export class MultiInstanceGet extends CommandPacket<MultiInstanceV1MultiInstanceGetData> {
	public static readonly CommandClass: typeof MultiInstanceV1 = MultiInstanceV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "MultiInstanceGet",
		"help": "Multi Instance Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "commandClass",
				"help": "Command Class",
				"length": 1,
				"valueType": "CommandClass"
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MultiInstanceV1)?.command === this.command;
	}

	public constructor(data: Buffer | MultiInstanceV1MultiInstanceGetData) {
		super(MultiInstanceGet, data);
	}
};

export class MultiInstanceReport extends CommandPacket<MultiInstanceV1MultiInstanceReportData> {
	public static readonly CommandClass: typeof MultiInstanceV1 = MultiInstanceV1;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "MultiInstanceReport",
		"help": "Multi Instance Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "commandClass",
				"help": "Command Class",
				"length": 1,
				"valueType": "CommandClass"
			},
			{
				"type": "Integer",
				"name": "instances",
				"help": "Instances",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(MultiInstanceV1)?.command === this.command;
	}

	public constructor(data: Buffer | MultiInstanceV1MultiInstanceReportData) {
		super(MultiInstanceReport, data);
	}
};
