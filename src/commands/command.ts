import { CommandCodec, Packet } from "./packet";

export class CommandClassPacket extends Packet {}

export class CommandPacket<T extends object | void> extends Packet {
	// TODO make data 'immutable'
	public readonly data: T;

	constructor(codec: CommandCodec<T>, data: T | Buffer) {
		super(
			codec.commandClass,
			codec.command,
			Buffer.isBuffer(data) ? data : codec.encode(data)
		);
		this.data = Buffer.isBuffer(data) ? codec.decode(data) : data;
	}
}
