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

	public constructor(buffer: Buffer);
	public constructor(commandClass: number, commandAndPayload: Buffer);
	public constructor(
		bufferOrClass: Buffer | number,
		commandAndPayload?: Buffer
	) {
		if (Buffer.isBuffer(bufferOrClass)) {
			const buffer = bufferOrClass;
			if (buffer.length < 1) {
				throw new Error(
					"unexpected end-of-packet: missing command class"
				);
			}
			const isSimpleClass = buffer[0] <= 0xf0;
			if (!isSimpleClass && buffer.length < 2) {
				throw new Error(
					"unexpected end-of-packet: truncated multi-byte command class"
				);
			}
			this.commandClass = isSimpleClass
				? buffer[0]
				: buffer.readUInt16BE(0);
			const offset = isSimpleClass ? 1 : 2;
			this.commandAndPayload = buffer.slice(offset);
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
		// Some command classes (e.g. NOP) do not have a command, which
		// could also happen on invalid packets.
		if (this.commandAndPayload.length > 0) {
			throw new Error(
				`cannot convert packet into requested command class or command, got 0x${this.commandClass.toString(
					16
				)}:0x${this.commandAndPayload[0].toString(16)}`
			);
		} else {
			throw new Error(
				`cannot convert packet into requested command class, got 0x${this.commandClass.toString(
					16
				)}`
			);
		}
	}
}
