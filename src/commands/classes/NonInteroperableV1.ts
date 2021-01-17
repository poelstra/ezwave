/**
 * Command Class Non Interoperable, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum NonInteroperableV1Commands {
}

export class NonInteroperableV1 extends CommandClassPacket<NonInteroperableV1Commands> {
	public static readonly commandClass = CommandClasses.NonInteroperable; // 0xf0 (240)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(NonInteroperableV1, commandAndPayload);
	}

}

export namespace NonInteroperableV1 {
}
