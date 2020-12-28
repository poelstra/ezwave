export interface CommandMatcher {
	matches(packet: Packet): boolean;
}

export interface CommandPacketConstructor<T extends Packet>
	extends CommandMatcher {
	new (commandAndPayload: Buffer): T;
}

export class Packet {
	public readonly commandClass: number;
	public readonly commandAndPayload: Buffer;

	constructor(buffer: Buffer);
	constructor(commandClass: number, commandAndPayload: Buffer);
	constructor(bufferOrClass: Buffer | number, commandAndPayload?: Buffer) {
		if (Buffer.isBuffer(bufferOrClass)) {
			const buffer = bufferOrClass;
			const isSimpleClass = buffer[0] <= 0xf0;
			this.commandClass = isSimpleClass
				? buffer[0]
				: buffer.readUInt16BE(0);
			this.commandAndPayload = buffer.slice(isSimpleClass ? 1 : 2);
		} else {
			this.commandClass = bufferOrClass;
			this.commandAndPayload = commandAndPayload!;
		}
	}

	public serialize(): Buffer {
		if (this.commandClass <= 0xf0) {
			// Single-byte command class
			return Buffer.from([this.commandClass, ...this.commandAndPayload]);
		} else {
			// Double-byte command class
			return Buffer.from([
				(this.commandClass & 0xff00) >> 8,
				this.commandClass & 0xff,
				...this.commandAndPayload,
			]);
		}
	}

	public is(command: CommandMatcher): boolean {
		return command.matches(this);
	}

	public tryAs<C extends CommandPacketConstructor<InstanceType<C>>>(
		CommandPacketConstructor: C
	): InstanceType<C> | undefined {
		if (!this.is(CommandPacketConstructor)) {
			return undefined;
		}

		return new CommandPacketConstructor(this.commandAndPayload);
	}

	public as<C extends CommandPacketConstructor<InstanceType<C>>>(
		CommandPacketConstructor: C
	): InstanceType<C> {
		const instance = this.tryAs(CommandPacketConstructor);
		if (instance) {
			return instance;
		}
		throw new Error(`cannot convert packet into requested command class`);
	}
}
