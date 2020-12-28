import CommandClasses from "../generated/CommandClasses";
import { CommandMatcher, Packet } from "./packet";

export interface CommandClassDescriptor extends CommandMatcher {
	commandClass: CommandClasses;
	commandMask?: number;
}

export type CommandCodec<T extends object | void> = {
	CommandClass: CommandClassDescriptor;
	command: number;
	encode(payload: T): Buffer;
	decode(commandAndPayload: Buffer): T;
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

export abstract class CommandPacket<T extends object | void> extends Packet {
	public readonly command: number; // TODO make enum
	public readonly data: T; // TODO make 'immutable'

	constructor(codec: CommandCodec<T>, data: T | Buffer) {
		super(
			codec.CommandClass.commandClass,
			Buffer.isBuffer(data) ? data : codec.encode(data)
		);
		this.command = codec.command;
		this.data = Buffer.isBuffer(data) ? codec.decode(data) : data;
	}
}
