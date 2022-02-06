/**
 * Command Class Manufacturer Proprietary, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum ManufacturerProprietaryV1Commands {
}

export class ManufacturerProprietaryV1 extends CommandClassPacket<ManufacturerProprietaryV1Commands> {
	public static readonly commandClass = CommandClasses.ManufacturerProprietary; // 0x91 (145)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ManufacturerProprietaryV1, commandAndPayload);
	}
}

