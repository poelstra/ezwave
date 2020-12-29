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
		if (commandClassId === CommandClasses.Mark) {
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
