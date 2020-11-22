import * as assert from "assert";
import * as types from "../codegen/types";

export interface DecodedPacket {
	[name: string]: any;
}

interface Context {
	[name: string]: number;
}

function decodeParam(
	packet: Buffer,
	pos: number,
	param: types.Parameter | types.ParameterGroup,
	result: DecodedPacket,
	context: Context,
	parentContext?: Context
): number {
	// Skip optional param if necessary
	if (param.optional) {
		const ctx =
			(param.optional.isParentReference && parentContext) || context;
		if ((ctx[param.optional.name] & param.optional.mask) === 0) {
			return 0;
		}
	}

	// Determine length of buffer and create slice
	let length: number;
	if (param.length === "auto") {
		length = packet.length - pos;
	} else if (typeof param.length === "number") {
		length = param.length;
	} else {
		const ctx =
			(param.length.isParentReference && parentContext) || context;
		length = ctx[param.length.name];
		if (length === undefined) {
			throw new Error("cannot determine parameter length");
		}
		length = (length & param.length.mask) >> param.length.shift;
	}
	const slice = packet.slice(pos, pos + length);

	switch (param.type) {
		case "integer":
			{
				let value: number;
				if (slice.length === 0) {
					length = 0;
					value = 0;
				} else if (slice.length === length) {
					value = slice.readUIntBE(0, length);
				} else {
					throw new Error("unexpected end of packet");
				}
				result[param.name] = value;
				context[param.name] = value;
				return length;
			}
			break;

		case "enum":
			{
				const value = slice.length > 0 ? slice.readUInt8(0) : 0;
				result[param.name] = value;
				return 1;
			}
			break;

		case "group":
			{
				if (parentContext) {
					throw new Error("nested groups not supported");
				}
				let processed = 0;
				const groupResult: any[] = [];
				const nextElement = () => {
					const groupElement = Object.create(null);
					const groupContext: Context = Object.create(null);
					for (const groupParam of param.params) {
						processed += decodeParam(
							packet,
							pos + processed,
							groupParam,
							groupElement,
							groupContext,
							context
						);
					}
					groupResult.push(groupElement);
					return groupContext;
				};
				while (true) {
					// Have to 'redo' a bit of the length logic, because above code
					// assumes byte lengths mostly
					if (typeof param.length === "number") {
						if (groupResult.length === param.length) {
							break;
						}
					} else if (typeof param.length === "object") {
						assert(param.length.isParentReference === false);
						const count =
							(context[param.length.name] & param.length.mask) >>
							param.length.shift;
						if (groupResult.length === count) {
							break;
						}
					}
					if (pos + processed >= packet.length) {
						// No more bytes to process
						break;
					}
					const groupContext = nextElement();
					if (param.moreToFollow) {
						// i.e. param.length === "auto"
						if (
							(groupContext[param.moreToFollow.name] &
								param.moreToFollow.mask) ===
							0
						) {
							break;
						}
					}
				}
				result[param.name] = groupResult;
				return processed;
			}
			break;

		default:
			throw new Error(
				`missing implementation for parameter type ${param.type}`
			);
	}
}

export function decodePacket(
	cmdClass: types.CommandClass,
	packet: Buffer
): DecodedPacket {
	// Decode and verify command class
	const isSingleByteClass = packet[0] <= 0xf0;
	const commandClassId = isSingleByteClass
		? packet[0]
		: (packet[1] << 8) | packet[0];
	if (commandClassId !== cmdClass.id) {
		throw new Error("command class mismatch");
	}

	// Decode command
	const commandId = isSingleByteClass ? packet[1] : packet[2];
	let command: types.Command | undefined = cmdClass.commands[commandId - 1]; // This could fail, e.g. for sparse, unknown or masked commands
	if (!command || command.id !== commandId) {
		// Most common path failed, do manual search
		command = cmdClass.commands.find(
			(cmd) => cmd.id === (commandId & (cmd.cmdMask || 0xff))
		);
	}
	if (!command) {
		throw new Error("command not found");
	}

	// Determine payload start: if multi-byte, one byte more, if have command mask, one byte less
	let pos =
		2 +
		(isSingleByteClass ? 0 : 1) +
		(command.cmdMask !== undefined ? -1 : 0);
	const result = Object.create(null);
	const context: Context = Object.create(null);
	for (const param of command.params) {
		pos += decodeParam(packet, pos, param, result, context);
	}
	return result;
}