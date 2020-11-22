import CommandClasses from "../generated/CommandClasses";

export interface CommandClassInfo {
	supported: CommandClasses[];
	controlled: CommandClasses[];
}

/**
 * Parse list of single/multi-byte commandclasses into lists of supported
 * and controlled commandclasses.
 */
export function parseCommandClasses(params: Buffer): CommandClassInfo {
	let i = 0;
	const supported: CommandClasses[] = [];
	const controlled: CommandClasses[] = [];
	let seenMark = false;
	while (i < params.length) {
		const isSingleByteClass = params[i] <= 0xf0;
		if (!isSingleByteClass && i + 1 >= params.length) {
			throw new Error(
				"invalid list of command classes: truncated multi-byte class"
			);
		}
		const commandClassId = isSingleByteClass
			? params[i]
			: (params[i + 1] << 8) | params[i];
		if (commandClassId === CommandClasses.COMMAND_CLASS_MARK) {
			if (seenMark) {
				throw new Error(
					"invalid list of command classes: multiple markers found"
				);
			}
			seenMark = true;
		} else {
			if (seenMark) {
				controlled.push(commandClassId);
			} else {
				supported.push(commandClassId);
			}
		}
		i += isSingleByteClass ? 1 : 2;
	}
	return {
		supported,
		controlled,
	};
}

export class Command {
	public commandClass: number;
	public command: number;
	public payload: Buffer;

	constructor(
		commandClass: number,
		command: number,
		payload?: Buffer | number[]
	) {
		this.commandClass = commandClass;
		this.command = command;
		this.payload = Buffer.isBuffer(payload)
			? payload
			: Buffer.from(payload || []);
	}

	public getBuffer(): Buffer {
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
}
