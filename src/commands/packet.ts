import CommandClasses from "../generated/CommandClasses";

export interface CommandClassDescriptor {
	commandClass: CommandClasses;
}

export interface CommandDescriptor extends CommandClassDescriptor {
	command: number;
}

export interface SpecificCommandClass<T extends Packet>
	extends CommandClassDescriptor {
	new (command: number, payload: Buffer): T;
}

export interface SpecificCommand<T extends Packet> extends CommandDescriptor {
	new (payload: Buffer): T;
}

export type CommandCodec<T extends object | void> = {
	commandClass: CommandClasses;
	command: number;
	version: number;
	encode(payload: T): Buffer;
	decode(buffer: Buffer): T;
};

function isSpecificCommand<T extends SpecificCommand<any>>(
	descriptor: T | SpecificCommandClass<any>
): descriptor is T {
	return "command" in descriptor;
}

export class Packet {
	public commandClass: number;
	public command: number;
	public payload: Buffer;

	public static from(packet: Buffer): Packet {
		const isSimpleClass = packet[0] <= 0xf0;
		const commandClass = isSimpleClass ? packet[0] : packet.readUInt16BE(0);
		const command = packet[isSimpleClass ? 1 : 2];
		const payload = packet.slice(isSimpleClass ? 2 : 3);
		return new Packet(commandClass, command, payload);
	}

	constructor(commandClass: number, command: number, payload: Buffer) {
		this.commandClass = commandClass;
		this.command = command;
		this.payload = payload;
	}

	public serialize(): Buffer {
		if (this.commandClass <= 0xf0) {
			// Single-byte command class
			return Buffer.from([
				this.commandClass,
				this.command,
				...this.payload,
			]);
		} else {
			// Double-byte command class
			return Buffer.from([
				(this.commandClass & 0xff00) >> 8,
				this.commandClass & 0xff,
				this.command,
				...this.payload,
			]);
		}
	}

	public is(command: CommandClassDescriptor | CommandDescriptor): boolean;
	public is(commandClass: CommandClasses, command?: number): boolean;
	public is(
		commandOrClass:
			| CommandClassDescriptor
			| CommandDescriptor
			| CommandClasses,
		numericCommand?: number
	): boolean {
		if (typeof commandOrClass !== "number") {
			const descriptor = commandOrClass;
			return this.is(
				descriptor.commandClass,
				"command" in descriptor ? descriptor.command : undefined
			);
		}
		const commandClass = commandOrClass;
		const command = numericCommand;
		if (this.commandClass !== commandClass) {
			return false;
		}
		if (command !== undefined && this.command !== command) {
			return false;
		}
		return true;
	}

	public tryAs<
		C extends
			| SpecificCommand<InstanceType<C>>
			| SpecificCommandClass<InstanceType<C>>
	>(SpecificCommandOrClass: C): InstanceType<C> | undefined {
		if (!this.is(SpecificCommandOrClass)) {
			return undefined;
		}

		if (isSpecificCommand(SpecificCommandOrClass)) {
			const SpecificCommand = SpecificCommandOrClass;
			return new SpecificCommand(this.payload);
		} else {
			const SpecificCommandClass = SpecificCommandOrClass as SpecificCommandClass<
				InstanceType<C>
			>;
			return new SpecificCommandClass(this.command, this.payload);
		}
	}

	public as<
		C extends
			| SpecificCommand<InstanceType<C>>
			| SpecificCommandClass<InstanceType<C>>
	>(SpecificCommandOrClass: C): InstanceType<C> {
		const instance = this.tryAs(SpecificCommandOrClass);
		if (instance) {
			return instance;
		}
		if (isSpecificCommand(SpecificCommandOrClass)) {
			throw new Error(
				`cannot convert command ${this.commandClass}.${this.command} into command ${SpecificCommandOrClass.commandClass}.${SpecificCommandOrClass.command}`
			);
		} else {
			throw new Error(
				`cannot convert command class ${this.commandClass} into command class ${SpecificCommandOrClass.commandClass}`
			);
		}
	}
}
