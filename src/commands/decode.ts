import {
	BitfieldElementType,
	BitfieldParameter,
	CommandDefinition,
	EnumParameter,
	IntegerParameter,
	LocalParameterReference,
	Parameter,
	ParameterGroup,
	ParameterReference,
	ParameterType,
} from "./types";

/**
 * Error thrown when decoder encounters an error in the
 * decoder definition.
 *
 * For example, invalid parameter references, nested groups, etc.
 */
export class DecodeDefinitionError extends Error {}

/**
 * Error thrown when decoder encounters an error in the
 * packet data (command and/or payload).
 */
export class DecodeDataError extends Error {}

/**
 * Error thrown when decoder encounters an unexpected end of packet.
 *
 * This can happen due to e.g. a truncated integer or group, or when
 * a packet ends after a group element and the previous element indicated
 * more elements should follow.
 */
export class DecodeUnexpectedEndOfPacketError extends DecodeDataError {
	constructor() {
		super("unexpected end of packet");
	}
}

export function decodeCommandAndPayload<T extends object | void>(
	commandDef: CommandDefinition,
	commandAndPayload: Buffer
): T {
	// Decode command
	const commandId = commandAndPayload[0] & (commandDef.cmdMask ?? 0xff);
	if (commandId !== commandDef.command) {
		throw new Error(
			`cannot decode packet: expected command ${commandDef.command}, got ${commandId}`
		);
	}

	// Determine payload start: use command byte as data byte in case of
	// commandMask being used.
	let pos = commandDef.cmdMask !== undefined ? 0 : 1;
	const result = Object.create(null);
	for (const param of commandDef.params) {
		pos += decodeParam(commandAndPayload, pos, param, result);
	}
	return result;
}

interface DecodedPacket {
	[name: string]: unknown;
}

function resolveReference(
	ref: ParameterReference | LocalParameterReference,
	currentContext: DecodedPacket,
	parentContext?: DecodedPacket
): number | boolean {
	const isParentReference =
		"isParentReference" in ref && ref.isParentReference;
	const ctx = isParentReference ? parentContext : currentContext;
	if (!ctx) {
		throw new DecodeDefinitionError(
			"parent reference while not decoding in a group"
		);
	}
	const fieldName = ref.bitfield?.name ?? ref.ref;
	const fieldValue = ctx[fieldName];
	if (fieldValue === undefined) {
		throw new DecodeDefinitionError("field reference does not exist");
	}
	if (typeof fieldValue !== "number" && typeof fieldValue !== "boolean") {
		throw new DecodeDefinitionError(
			"wrong type for field reference, expected number or boolean"
		);
	}
	return fieldValue;
}

function resolveNumericReference(
	ref: ParameterReference | LocalParameterReference,
	currentContext: DecodedPacket,
	parentContext?: DecodedPacket
): number {
	const fieldValue = resolveReference(ref, currentContext, parentContext);
	if (typeof fieldValue !== "number") {
		throw new DecodeDefinitionError(
			"wrong type for field reference, expected number"
		);
	}
	return fieldValue;
}

function decodeParam(
	packet: Buffer,
	pos: number,
	param: Parameter | ParameterGroup,
	result: DecodedPacket,
	parent?: DecodedPacket
): number {
	// Skip optional param if necessary
	if (param.optional) {
		const isOptionalPresent = resolveReference(
			param.optional,
			result,
			parent
		);
		if (!isOptionalPresent) {
			return 0;
		}
	}

	// Determine length of buffer and create slice
	let length: number;
	if (
		param.length === "auto" ||
		param.type === ParameterType.ParameterGroup
	) {
		length = packet.length - pos;
	} else if (typeof param.length === "number") {
		length = param.length;
	} else {
		length = resolveNumericReference(param.length, result, parent);
	}
	const slice = packet.slice(pos, pos + length);

	// TODO only allow this when it is expected that these could be missing
	// (i.e. only when a newer version decodes packet from older version)
	// For now, we allow any parameter to be missing if it is completely missing,
	// and we're not halfway of e.g. parsing a group.
	const allowMissing = parent === undefined;
	if (slice.length === 0 && length > 0) {
		// If the whole expected parameter is missing, it could be fine
		if (!allowMissing) {
			throw new DecodeUnexpectedEndOfPacketError();
		}
	} else if (slice.length < length) {
		// If the parameter is partially missing, it's wrong in any case
		throw new DecodeUnexpectedEndOfPacketError();
	}

	switch (param.type) {
		case ParameterType.Integer:
			return decodeInteger(param, slice, result);

		case ParameterType.Enum:
			return decodeEnum(param, slice, result);

		case ParameterType.ParameterGroup:
			return decodeGroup(param, slice, result, parent);

		case ParameterType.Bitfield:
			return decodeBitfield(param, slice, result);

		default:
			throw new Error(
				`missing implementation for parameter type ${param.type}`
			);
	}
}

function decodeInteger(
	param: IntegerParameter,
	slice: Buffer,
	result: DecodedPacket
): number {
	let value: number;
	const length = param.length as number;
	if (slice.length === 0) {
		value = 0;
	} else {
		value = slice.readUIntBE(0, length);
	}
	if (!param.reserved) {
		result[param.name] = value;
	}
	return length;
}

function decodeEnum(
	param: EnumParameter,
	slice: Buffer,
	result: DecodedPacket
): number {
	let value: number;
	if (slice.length === 0) {
		value = 0;
	} else {
		value = slice.readUInt8(0);
	}
	result[param.name] = value;
	return 1;
}

function decodeGroup(
	param: ParameterGroup,
	slice: Buffer,
	result: DecodedPacket,
	parent: DecodedPacket | undefined
): number {
	if (parent) {
		throw new DecodeDefinitionError("nested groups not supported");
	}

	let groupLength: number | "auto";
	if (typeof param.length === "number") {
		groupLength = param.length;
	} else if (typeof param.length === "object") {
		groupLength = resolveNumericReference(param.length, result);
	} else {
		// Number of groups determined by end of packet, or
		// moreToFollow field.
		groupLength = "auto";
	}

	let oldProcessed = -1;
	let processed = 0;
	const groupResult: DecodedPacket[] = [];
	while (true) {
		if (oldProcessed === processed) {
			// Prevent against infinite loops in case of programming errors.
			// We have to keep making progress, which is guaranteed to end the
			// parsing, because the packet length is finite.
			throw new DecodeDataError(
				"decoder does not make progress while parsing packet"
			);
		}
		oldProcessed = processed;
		if (groupLength !== "auto" && groupResult.length === groupLength) {
			break;
		}
		if (processed >= slice.length) {
			// End of packet, allowed when packet length is used to
			// determine number of groups, otherwise it's an error.
			if (param.moreToFollow) {
				throw new DecodeUnexpectedEndOfPacketError();
			}
			break;
		}
		const groupElement = Object.create(null);
		for (const groupParam of param.params) {
			processed += decodeParam(
				slice,
				processed,
				groupParam,
				groupElement,
				result
			);
			if (processed >= slice.length) {
				// Decoder started decoding after end of packet
				// (which could be OK when e.g. parsing older version of
				// a command, but not in the middle of a group).
				throw new DecodeUnexpectedEndOfPacketError();
			}
		}
		groupResult.push(groupElement);
		if (param.moreToFollow) {
			// i.e. groupLength === "auto"
			const moreToFollow = !!resolveReference(
				param.moreToFollow,
				groupElement
			);
			if (!moreToFollow) {
				break;
			}
		}
	}
	result[param.name] = groupResult;
	return processed;
}

function decodeBitfield(
	param: BitfieldParameter,
	slice: Buffer,
	result: DecodedPacket
): number {
	let value: number;
	if (slice.length === 0) {
		value = 0;
	} else {
		value = slice.readUInt8(0);
	}
	for (const field of param.fields) {
		if (field.reserved) {
			continue;
		}
		const fieldValue = (value & field.mask) >> field.shift;
		result[field.name] =
			field.type === BitfieldElementType.Boolean
				? !!fieldValue
				: fieldValue;
	}
	return 1;
}
