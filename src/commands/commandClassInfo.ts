import CommandClasses from "./classes/CommandClasses";

export interface CommandClassInfo {
	supported: CommandClasses[];
	controlled: CommandClasses[];
}

export function isSingleByteClass(commandClass: CommandClasses): boolean {
	return commandClass <= 0xf0;
}

/**
 * Parse list of single/multi-byte commandclasses into lists of supported
 * and controlled commandclasses.
 */
export function parseCommandClassInfo(params: Buffer): CommandClassInfo {
	const classes = parseCommandClasses(params);
	const markIndexRaw = classes.indexOf(CommandClasses.Mark);
	const markIndex = markIndexRaw < 0 ? classes.length : markIndexRaw;
	const supported = classes.slice(0, markIndex);
	const controlled = classes.slice(markIndex + 1);
	if (controlled.indexOf(CommandClasses.Mark) >= 0) {
		throw new Error(
			"invalid list of command classes: multiple markers found"
		);
	}
	return {
		supported,
		controlled,
	};
}

export function parseCommandClasses(params: Buffer): CommandClasses[] {
	let i = 0;
	const classes: CommandClasses[] = [];
	while (i < params.length) {
		const isSingle = isSingleByteClass(params[i]);
		if (!isSingle && i + 1 >= params.length) {
			throw new Error(
				"invalid list of command classes: truncated multi-byte class"
			);
		}
		const commandClassId = isSingle ? params[i] : params.readUInt16BE(i);
		classes.push(commandClassId);
		i += isSingle ? 1 : 2;
	}
	return classes;
}

export function encodeCommandClasses(classes: CommandClasses[]): Buffer {
	const totalLength = classes
		.map((cls) => (isSingleByteClass(cls) ? 1 : 2))
		.reduce((a, b) => a + b, 0);
	const buffer = Buffer.alloc(totalLength);
	let offset = 0;
	for (const cls of classes) {
		if (isSingleByteClass(cls)) {
			buffer.writeUInt8(cls, offset);
			offset += 1;
		} else {
			buffer.writeUInt16BE(cls, offset);
			offset += 2;
		}
	}
	return buffer;
}
