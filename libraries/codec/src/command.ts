import { CommandDefinition } from "@ezwave/spec";
import { decodeCommandAndPayload } from "./decode";
import { encodeCommandAndPayload } from "./encode";
import { CommandClasses } from "./generated/CommandClasses";
import { CommandMatcher, Packet } from "./packet";

export interface CommandClassDescriptor extends CommandMatcher {
	commandClass: CommandClasses;
	version: number;
	commandMask?: number;
}

export type CommandCodec = {
	CommandClass: CommandClassDescriptor;
	command: number;
	definition: CommandDefinition;
};

export abstract class CommandClassPacket<C extends number> extends Packet {
	public readonly command: C;
	public readonly version: number;

	public constructor(
		CommandClass: CommandClassDescriptor,
		commandAndPayload: Buffer
	) {
		super(CommandClass.commandClass, commandAndPayload);
		const mask = CommandClass.commandMask ?? 0xff;
		this.command = (this.commandAndPayload[0] & mask) as C;
		this.version = CommandClass.version;
	}
}

export abstract class CommandPacket<
	T extends object | void
> extends CommandClassPacket<number> {
	public readonly data: T; // TODO make 'immutable'

	public constructor(codec: CommandCodec, data: T | Buffer) {
		super(
			codec.CommandClass,
			Buffer.isBuffer(data)
				? data
				: encodeCommandAndPayload(codec.definition, data)
		);
		this.data = Buffer.isBuffer(data)
			? decodeCommandAndPayload(codec.definition, data)
			: data;
	}
}
