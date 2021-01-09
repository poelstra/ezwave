/**
 * Command Class Prepayment Encapsulation, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum PrepaymentEncapsulationV1Commands {
	CmdEncapsulation = 0x01,
}

export interface PrepaymentEncapsulationV1CmdEncapsulationData {
	data: Buffer; // automatic length
}

export class PrepaymentEncapsulationV1 extends CommandClassPacket<PrepaymentEncapsulationV1Commands> {
	public static readonly commandClass = CommandClasses.PrepaymentEncapsulation; // 0x41 (65)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(PrepaymentEncapsulationV1, commandAndPayload);
	}

	public static readonly CmdEncapsulation = class CmdEncapsulation extends CommandPacket<PrepaymentEncapsulationV1CmdEncapsulationData> {
		public static readonly CommandClass = PrepaymentEncapsulationV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "CmdEncapsulation",
			"help": "Cmd Encapsulation",
			"status": "active",
			"params": [
				{
					"type": "blob",
					"name": "data",
					"help": "Data",
					"length": {
						"lengthType": "auto",
						"endOffset": 0
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(PrepaymentEncapsulationV1)?.command === this.command;
		}

		constructor(data: Buffer | PrepaymentEncapsulationV1CmdEncapsulationData) {
			super(CmdEncapsulation, data);
		}
	};
}

export namespace PrepaymentEncapsulationV1 {
	export type CmdEncapsulation = InstanceType<typeof PrepaymentEncapsulationV1.CmdEncapsulation>;
}
