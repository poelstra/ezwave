import CommandClasses from "../generated/CommandClasses";
import { decodeCommandAndPayload } from "./decode";
import { encodeCommandAndPayload } from "./encode";
import { CommandMatcher, Packet } from "./packet";
import { CommandDefinition } from "./types";

export interface CommandClassDescriptor extends CommandMatcher {
	commandClass: CommandClasses;
	commandMask?: number;
}

export type OldCommandCodec<T extends object | void> = {
	CommandClass: CommandClassDescriptor;
	command: number;
	encode(payload: T): Buffer;
	decode(commandAndPayload: Buffer): T;
};

export type CommandCodec = {
	CommandClass: CommandClassDescriptor;
	command: number;
	definition: CommandDefinition;
};

export abstract class CommandClassPacket<C extends number> extends Packet {
	public readonly command: C;

	constructor(
		CommandClass: CommandClassDescriptor,
		commandAndPayload: Buffer
	) {
		super(CommandClass.commandClass, commandAndPayload);
		const mask = CommandClass.commandMask ?? 0xff;
		this.command = (this.commandAndPayload[0] & mask) as C;
	}
}

export abstract class OldCommandPacket<T extends object | void> extends Packet {
	public readonly command: number; // TODO make enum
	public readonly data: T; // TODO make 'immutable'

	constructor(codec: OldCommandCodec<T>, data: T | Buffer) {
		super(
			codec.CommandClass.commandClass,
			Buffer.isBuffer(data) ? data : codec.encode(data)
		);
		this.command = codec.command;
		this.data = Buffer.isBuffer(data) ? codec.decode(data) : data;
	}
}

export abstract class CommandPacket<T extends object | void> extends Packet {
	public readonly command: number; // TODO make enum
	public readonly data: T; // TODO make 'immutable'

	constructor(codec: CommandCodec, data: T | Buffer) {
		super(
			codec.CommandClass.commandClass,
			Buffer.isBuffer(data)
				? data
				: encodeCommandAndPayload(codec.definition, data)
		);
		this.command = codec.command;
		this.data = Buffer.isBuffer(data)
			? decodeCommandAndPayload(codec.definition, data)
			: data;
	}
}
