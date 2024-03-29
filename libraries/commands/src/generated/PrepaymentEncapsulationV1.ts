/**
 * Command Class Prepayment Encapsulation, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum PrepaymentEncapsulationV1Commands {
	CmdEncapsulation = 0x01,
}

export interface PrepaymentEncapsulationV1CmdEncapsulationData {
	data: Buffer; // automatic length
}

export class PrepaymentEncapsulationV1 extends CommandClassPacket<PrepaymentEncapsulationV1Commands> {
	public static readonly commandClass: number = CommandClasses.PrepaymentEncapsulation; // 0x41 (65)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(PrepaymentEncapsulationV1, commandAndPayload);
	}
}

export class CmdEncapsulation extends CommandPacket<PrepaymentEncapsulationV1CmdEncapsulationData> {
	public static readonly CommandClass: typeof PrepaymentEncapsulationV1 = PrepaymentEncapsulationV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "CmdEncapsulation",
		"help": "Cmd Encapsulation",
		"status": "Active",
		"params": [
			{
				"type": "Blob",
				"name": "data",
				"help": "Data",
				"length": {
					"lengthType": "Auto"
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(PrepaymentEncapsulationV1)?.command === this.command;
	}

	public constructor(data: Buffer | PrepaymentEncapsulationV1CmdEncapsulationData) {
		super(CmdEncapsulation, data);
	}
};
