import {
	BitfieldElementType,
	BitfieldParameter,
	BitmaskParameter,
	BlobParameter,
	BlobType,
	CommandDefinition,
	EnumParameter,
	EnumUnionParameter,
	getReferencePath,
	IntegerParameter,
	LengthType,
	LocalParameter,
	Parameter,
	ParameterGroup,
	ParameterType,
	TextParameter,
} from "@ezwave/spec";
import {
	bufferToSet,
	CodecDataError,
	CodecDefinitionError,
	CodecUnexpectedEndOfPacketError,
	Context,
	getBitOffsetForBitmaskType,
} from "./codec";
import { parseCommandClasses } from "./commandClassInfo";
import { Packet } from "./packet";

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
	const payload =
		commandDef.cmdMask !== undefined
			? commandAndPayload
			: commandAndPayload.slice(1);
	return decodeParams(commandDef.params, payload);
}

export function decodeParams<T extends object | void>(
	params: Parameter[],
	payload: Buffer
): T {
	const context = new Context(Object.create(null));

	// Determine payload start: use command byte as data byte in case of
	// commandMask being used.
	let pos = 0;
	for (const param of params) {
		pos += decodeParam(payload, pos, param, context, params);
	}
	return context.data as T;
}

function findMarkers(markers: number[], slice: Buffer): number {
	return slice.indexOf(Buffer.from(markers));
}

function decodeParam(
	packet: Buffer,
	pos: number,
	param: LocalParameter | ParameterGroup,
	context: Context,
	params: Parameter[]
): number {
	// Skip optional param if necessary
	if (param.optional) {
		const shouldBePresent = !!context.getValue(param.optional);
		if (!shouldBePresent) {
			return 0;
		}
	}

	// Determine length of buffer and create slice
	let length: number;
	let skipMarkers = 0;
	if (typeof param.length === "number") {
		length = param.length;
	} else if (param.length.lengthType === LengthType.Automatic) {
		if (param.length.markers) {
			const markerIndex = findMarkers(
				param.length.markers,
				packet.slice(pos)
			);
			if (markerIndex < 0) {
				throw new CodecUnexpectedEndOfPacketError(
					`end-of-parameter marker not found while decoding parameter ${getReferencePath(
						param
					)}`
				);
			}
			skipMarkers = param.length.markers.length;
			length = markerIndex;
		} else {
			const endOffset = getRemainingParameterLengths(
				param,
				context,
				params
			);
			length = packet.length - pos - endOffset;
		}
	} else if (
		param.type === ParameterType.ParameterGroup ||
		param.length.lengthType === LengthType.MoreToFollow
	) {
		// For non-automatic-size parameter groups, the length is given in
		// number of elements, not bytes. So just give the rest of the packet
		// to the group parser and let it use whatever it needs.
		length = packet.length - pos;
	} else {
		// Parameter reference-based length
		length =
			context.getNumericValue(param.length.from) -
			(param.length.offset ?? 0);
	}
	const slice = packet.slice(pos, pos + length);

	// TODO only allow this when it is expected that these could be missing
	// (i.e. only when a newer version decodes packet from older version)
	// For now, we allow any parameter to be missing if it is completely missing,
	// and we're not halfway of e.g. parsing a group.
	const allowMissing = !context.group;
	if (slice.length === 0 && length > 0) {
		// If the whole expected parameter is missing, it could be fine
		if (!allowMissing) {
			throw new CodecUnexpectedEndOfPacketError();
		}
	} else if (slice.length < length) {
		// If the parameter is partially missing, it's wrong in any case
		throw new CodecUnexpectedEndOfPacketError();
	}

	let decodedBytes: number;
	switch (param.type) {
		case ParameterType.Integer:
			decodedBytes = decodeInteger(param, slice, context);
			break;

		case ParameterType.Enum:
			decodedBytes = decodeEnum(param, slice, context);
			break;

		case ParameterType.EnumUnion:
			decodedBytes = decodeEnumUnion(param, slice, context);
			break;

		case ParameterType.ParameterGroup:
			decodedBytes = decodeGroup(param, slice, context);
			break;

		case ParameterType.Bitfield:
			decodedBytes = decodeBitfield(param, slice, context);
			break;

		case ParameterType.Blob:
			decodedBytes = decodeBlob(param, slice, context);
			break;

		case ParameterType.Text:
			decodedBytes = decodeText(param, slice, context);
			break;

		case ParameterType.Bitmask:
			decodedBytes = decodeBitmask(param, slice, context);
			break;

		default:
			throw new Error(`unknown parameter type`);
	}

	return decodedBytes + skipMarkers;
}

/**
 * In case a parameter is set to have automatic length, this means the parameter
 * takes up 'the rest of the packet'. However, if there are parameters after the
 * current one, any space they take up must be left for them.
 * This function computes the total length of all of these parameters.
 */
function getRemainingParameterLengths(
	param: Parameter,
	context: Context,
	params: Parameter[]
): number {
	const isLast = params[params.length - 1] === param;
	if (isLast) {
		// Trivial case
		return 0;
	}

	const index = params.indexOf(param);
	if (index < 0) {
		throw new CodecDefinitionError("cannot determine index of parameter");
	}

	let endOffset = 0;
	const remainingParams = params.slice(index + 1);
	for (const rem of remainingParams) {
		if (rem.optional) {
			const shouldBePresent = !!context.getValue(rem.optional);
			if (!shouldBePresent) {
				continue;
			}
		}
		const len = rem.length;
		if (typeof len === "number") {
			endOffset += len;
		} else {
			switch (len.lengthType) {
				case LengthType.ParameterReference:
					endOffset +=
						context.getNumericValue(len.from) - (len.offset ?? 0);
					break;
				case LengthType.Automatic:
					throw new CodecDefinitionError(
						`cannot determine remaining parameter lengths for ${getReferencePath(
							param
						)}: parameter ${getReferencePath(
							rem
						)} also has automatic length`
					);
				case LengthType.MoreToFollow:
					throw new CodecDefinitionError(
						`cannot determine remaining parameter lengths for ${getReferencePath(
							param
						)}: parameter ${getReferencePath(
							rem
						)} also has more-to-follow length`
					);
				default:
					throw new CodecDefinitionError(
						`cannot determine remaining parameter lengths for ${getReferencePath(
							param
						)}: parameter ${getReferencePath(
							rem
						)} has unsupported length type`
					);
			}
		}
	}
	return endOffset;
}

function decodeInteger(
	param: IntegerParameter,
	slice: Buffer,
	context: Context
): number {
	let value: number;
	const length = param.length as number;
	if (slice.length === 0) {
		value = 0;
	} else {
		value = slice.readUIntBE(0, length);
	}
	if (param.isAutogenerated) {
		context.setAutoValue(param, value);
	} else if (!param.reserved) {
		context.setValue(param, value);
	}
	return length;
}

function decodeEnum(
	param: EnumParameter,
	slice: Buffer,
	context: Context
): number {
	let value: number;
	if (slice.length === 0) {
		value = 0;
	} else {
		value = slice.readUInt8(0);
	}
	context.setValue(param, value);
	return 1;
}

function decodeEnumUnion(
	param: EnumUnionParameter,
	slice: Buffer,
	context: Context
): number {
	let value: number;
	if (slice.length === 0) {
		value = 0;
	} else {
		value = slice.readUInt8(0);
	}
	context.setValue(param, value);
	return 1;
}

function decodeGroup(
	param: ParameterGroup,
	slice: Buffer,
	context: Context
): number {
	const groupElements = context.enterGroup(param, true);

	let groupLength: number | "auto";
	if (typeof param.length === "number") {
		groupLength = param.length;
	} else if (param.length.lengthType === LengthType.ParameterReference) {
		groupLength = context.getNumericValue(param.length.from);
	} else {
		// Number of groups determined by end of packet, or
		// moreToFollow field.
		groupLength = "auto";
	}

	let oldProcessed = -1;
	let processed = 0;
	while (true) {
		if (oldProcessed === processed) {
			// Prevent against infinite loops in case of programming errors.
			// We have to keep making progress, which is guaranteed to end the
			// parsing, because the packet length is finite.
			throw new CodecDataError(
				"decoder does not make progress while parsing packet"
			);
		}
		oldProcessed = processed;
		if (groupLength !== "auto" && groupElements.length === groupLength) {
			break;
		}
		if (processed >= slice.length) {
			// End of packet, allowed when packet length is used to
			// determine number of groups, otherwise it's an error.
			if (param.moreToFollow) {
				throw new CodecUnexpectedEndOfPacketError();
			}
			break;
		}
		const groupElement = Object.create(null);
		context.addGroupElement(groupElement);
		for (const groupParam of param.params) {
			if (processed >= slice.length) {
				// Decoder started decoding after end of packet
				// (which could be OK when e.g. parsing older version of
				// a command, but not in the middle of a group).
				throw new CodecUnexpectedEndOfPacketError();
			}
			processed += decodeParam(
				slice,
				processed,
				groupParam,
				context,
				param.params
			);
		}
		if (param.moreToFollow) {
			// i.e. groupLength === "auto"
			const moreToFollow = context.getValue(param.moreToFollow);
			if (!moreToFollow) {
				break;
			}
		}
	}
	context.leaveGroup();
	return processed;
}

function decodeBitfield(
	param: BitfieldParameter,
	slice: Buffer,
	context: Context
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
		const rawValue = (value & field.mask) >> field.shift;
		const fieldValue =
			field.fieldType === BitfieldElementType.Boolean
				? !!rawValue
				: rawValue;
		if (field.isAutogenerated) {
			context.setAutoValue(field, fieldValue);
		} else {
			context.setValue(field, fieldValue);
		}
	}
	return 1;
}

function decodeBlob(
	param: BlobParameter,
	slice: Buffer,
	context: Context
): number {
	switch (param.blobType) {
		case BlobType.NodeIds:
			// Convert buffer to array of bytes
			context.setValue(param, [...slice]);
			break;

		case BlobType.CommandClasses:
			context.setValue(param, parseCommandClasses(slice));
			break;

		case BlobType.CommandEncapsulation:
			context.setValue(param, new Packet(slice));
			break;

		default:
			context.setValue(param, slice);
	}
	return slice.length;
}

function decodeText(
	param: TextParameter,
	slice: Buffer,
	context: Context
): number {
	const value = slice.toString("ascii");
	const nullByteIndex = value.indexOf("\u0000");
	if (nullByteIndex > -1) {
		context.setValue(param, value.slice(0, nullByteIndex));
	} else {
		context.setValue(param, value);
	}
	return slice.length;
}

function decodeBitmask(
	param: BitmaskParameter,
	slice: Buffer,
	context: Context
): number {
	const bitOffset = getBitOffsetForBitmaskType(param.bitmaskType);
	const value = bufferToSet(slice, bitOffset);
	context.setValue(param, value);
	return slice.length;
}
