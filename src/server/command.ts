export class Command {
	public commandClass: number;
	public command: number;
	public payload: Buffer;

	constructor(commandClass: number, command: number, payload?: Buffer | number[]) {
		this.commandClass = commandClass;
		this.command = command;
		this.payload = Buffer.isBuffer(payload) ? payload : Buffer.from(payload || []);
	}

	public getBuffer(): Buffer {
		if (this.commandClass <= 0xF0) {
			// Single-byte command class
			return Buffer.from([
				this.commandClass,
				this.command,
				...this.payload
			]);
		} else {
			// Double-byte command class
			return Buffer.from([
				(this.commandClass & 0xFF00) >> 8,
				this.commandClass & 0xFF,
				this.command,
				...this.payload
			]);
		}
	}
}
