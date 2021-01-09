/**
 * Command Class Manufacturer Proprietary, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum ManufacturerProprietaryV1Commands {
}

export class ManufacturerProprietaryV1 extends CommandClassPacket<ManufacturerProprietaryV1Commands> {
	public static readonly commandClass = CommandClasses.ManufacturerProprietary; // 0x91 (145)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ManufacturerProprietaryV1, commandAndPayload);
	}

}

export namespace ManufacturerProprietaryV1 {
}
