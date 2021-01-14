import { encodeCommandClasses } from "../server/commandClassInfo";
import {
	CodecDataError,
	CodecDefinitionError,
	Context,
	ensureBooleanValue,
	ensureNumericValue,
	getParamLength,
	getParamPresence,
	isValuePresent,
	setToBuffer,
} from "./codec";
import { Packet } from "./packet";
import {
	BitfieldElementType,
	BitfieldParameter,
	BitmaskParameter,
	BlobParameter,
	BlobType,
	CommandDefinition,
	EnumParameter,
	EnumUnionParameter,
	IntegerParameter,
	LengthType,
	LocalParameter,
	ParameterGroup,
	ParameterType,
	TextParameter,
} from "./spec";
import { getReferencePath, KeyValues } from "./specHelpers";

export function encodeCommandAndPayload(
	commandDef: CommandDefinition,
	payload: object | void
): Buffer {
	if (payload === undefined) {
		return Buffer.from([commandDef.command]);
	}

	const context = new Context(payload as KeyValues);
	const buffers = commandDef.params.map((param) =>
		encodeParam(param, context)
	);

	if (commandDef.cmdMask !== undefined) {
		const result = Buffer.concat(buffers);
		result[0] = result[0] | (commandDef.command & commandDef.cmdMask);
		return result;
	} else {
		buffers.unshift(Buffer.from([commandDef.command]));
		return Buffer.concat(buffers);
	}
}

const EMPTY_BUFFER = Buffer.alloc(0);

function encodeParam(
	param: LocalParameter | ParameterGroup,
	context: Context
): Buffer {
	// Skip optional param if necessary
	if (param.optional) {
		const shouldBePresent = !!context.getValue(param.optional);
		const isPresent = isValuePresent(context.getValue(param));
		const isAutogenerated =
			"isAutogenerated" in param && param.isAutogenerated;
		if (isPresent !== shouldBePresent && !isAutogenerated) {
			throw new CodecDataError(
				`optional parameter ${getReferencePath(param)} should be ${
					shouldBePresent ? "present" : "absent"
				} but it is not`
			);
		}
		if (!shouldBePresent) {
			return EMPTY_BUFFER;
		}
	}

	switch (param.type) {
		case ParameterType.Integer:
			return encodeInteger(param, context);

		case ParameterType.Enum:
			return encodeEnum(param, context);

		case ParameterType.EnumUnion:
			return encodeEnumUnion(param, context);

		case ParameterType.Bitfield:
			return encodeBitfield(param, context);

		case ParameterType.Blob:
			return encodeBlob(param, context);

		case ParameterType.Text:
			return encodeText(param, context);

		case ParameterType.ParameterGroup:
			return encodeGroup(param, context);

		case ParameterType.Bitmask:
			return encodeBitmask(param, context);

		default:
			throw new Error(`unknown parameter type`);
	}
}

function encodeInteger(param: IntegerParameter, context: Context): Buffer {
	const length = param.length as number;
	let rawValue: unknown;

	const maxValue =
		length === 1
			? 0xff
			: length === 2
			? 0xffff
			: length === 3
			? 0xffffff
			: 0xffffffff;

	if (param.isAutogenerated) {
		if (!param.lengthOf) {
			throw new Error(
				"can only auto-generated integer parameter when it encodes a length"
			);
		}
		rawValue = getParamLength(param, context);
	} else if (param.reserved) {
		rawValue = 0;
	} else {
		rawValue = context.getValue(param);
	}

	const integerValue = ensureNumericValue(rawValue, param, 0, maxValue);
	if (param.isAutogenerated) {
		context.setAutoValue(param, integerValue);
	}

	const buffer = Buffer.alloc(length);
	buffer.writeUIntBE(integerValue, 0, length);
	return buffer;
}

function encodeEnum(param: EnumParameter, context: Context): Buffer {
	const rawValue = context.getValue(param);
	const integerValue = ensureNumericValue(rawValue, param, 0, 255);
	// TODO could also check whether enum value actually exists (for this CC version)
	return Buffer.from([integerValue]);
}

function encodeEnumUnion(param: EnumUnionParameter, context: Context): Buffer {
	const rawValue = context.getValue(param);
	const integerValue = ensureNumericValue(rawValue, param, 0, 255);
	// TODO could also check whether enum value actually exists (for this CC version)
	return Buffer.from([integerValue]);
}

function encodeBitfield(param: BitfieldParameter, context: Context): Buffer {
	let value = 0;
	for (const field of param.fields) {
		if (field.reserved) {
			continue;
		}

		let rawValue: unknown;
		if (field.isAutogenerated) {
			if (field.lengthOf) {
				rawValue = getParamLength(field, context);
			} else if (field.presenceOf) {
				rawValue = getParamPresence(field, context);
			} else {
				throw new CodecDefinitionError(
					`cannot auto-generate value for ${getReferencePath(field)}`
				);
			}
		} else if (field.isMoreToFollowFlag) {
			const group = context.group!;
			const isLastElement =
				group.data === group.elements[group.elements.length - 1];
			rawValue = !isLastElement;
		} else {
			rawValue = context.getValue(field);
		}

		let fieldValue: number;
		switch (field.fieldType) {
			case BitfieldElementType.Boolean:
				fieldValue = ensureBooleanValue(rawValue, field) ? 1 : 0;
				break;
			case BitfieldElementType.Integer:
				fieldValue = ensureNumericValue(
					rawValue,
					field,
					0,
					field.mask >> field.shift
				);
				break;
			case BitfieldElementType.Enum:
				// TODO also verify whether value exists in given enum?
				fieldValue = ensureNumericValue(
					rawValue,
					field,
					0,
					field.mask >> field.shift
				);
				break;
			default:
				throw new CodecDefinitionError("unsupported bitfield type");
		}
		if (field.isAutogenerated) {
			context.setAutoValue(field, fieldValue);
		}
		value |= fieldValue << field.shift;
	}

	return Buffer.from([value]);
}

function encodeBlob(param: BlobParameter, context: Context): Buffer {
	const value = context.getValue(param);

	let buffer: Buffer;
	switch (param.blobType) {
		case BlobType.NodeIds:
		case BlobType.CommandClasses:
			if (!Array.isArray(value)) {
				throw new CodecDataError(
					`invalid value for parameter ${getReferencePath(
						param
					)}, expected array, got ${typeof value}`
				);
			}

			value.forEach((v) => ensureNumericValue(v, param, 0, 255));
			buffer = encodeCommandClasses(value);
			break;

		case BlobType.CommandEncapsulation:
			if (!(value instanceof Packet)) {
				throw new CodecDataError(
					`invalid value for parameter ${getReferencePath(
						param
					)}, expected Packet, got ${typeof value}`
				);
			}
			buffer = value.serialize();
			break;

		default:
			if (!Buffer.isBuffer(value)) {
				throw new CodecDataError(
					`invalid value for parameter ${getReferencePath(
						param
					)}, expected Buffer, got ${typeof value}`
				);
			}
			buffer = value;
	}

	validateLength(buffer, param, context);

	const length = param.length;
	if (
		typeof length === "object" &&
		length.lengthType === LengthType.Automatic &&
		length.markers
	) {
		return Buffer.concat([buffer, Buffer.from(length.markers)]);
	} else {
		return buffer;
	}
}

function encodeText(param: TextParameter, context: Context): Buffer {
	const value = context.getValue(param);
	if (typeof value !== "string") {
		throw new CodecDataError(
			`invalid value for parameter ${getReferencePath(
				param
			)}, expected string, got ${typeof value}`
		);
	}

	// TODO Check fixed-length fields (pad with zeroes?)
	const buffer = Buffer.from(value, "ascii");

	validateLength(buffer, param, context);
	return buffer;
}

function validateLength(
	value: Buffer | unknown[],
	param: TextParameter | BlobParameter,
	context: Context
): void {
	let expectedLength: number;
	if (typeof param.length === "number") {
		expectedLength = param.length;
	} else {
		switch (param.length.lengthType) {
			case LengthType.Automatic:
				expectedLength = value.length;
				break;
			case LengthType.ParameterReference:
				expectedLength =
					context.getNumericValue(param.length.from) -
					(param.length.offset ?? 0);
				break;
			default:
				throw new CodecDefinitionError(
					`cannot determine length of parameter ${getReferencePath(
						param
					)}`
				);
		}
	}

	if (value.length !== expectedLength) {
		throw new CodecDataError(
			`expected parameter ${getReferencePath(
				param
			)} to have length ${expectedLength}, got ${value.length}`
		);
	}
}

function encodeGroup(param: ParameterGroup, context: Context): Buffer {
	const value = context.getValue(param);
	if (!Array.isArray(value)) {
		throw new CodecDataError(
			`invalid value for parameter ${getReferencePath(
				param
			)}, expected array, got ${typeof value}`
		);
	}

	let expectedLength: number | undefined;
	if (typeof param.length === "number") {
		expectedLength = param.length;
	} else {
		switch (param.length.lengthType) {
			case LengthType.Automatic:
				expectedLength = undefined;
				break;
			case LengthType.ParameterReference:
				if (param.length.offset !== undefined) {
					throw new CodecDefinitionError(
						"length offset should be zero for groups"
					);
				}
				expectedLength = context.getNumericValue(param.length.from);
				break;
			case LengthType.MoreToFollow:
				expectedLength = undefined;
				break;
			default:
				throw new CodecDefinitionError(
					`cannot determine length of parameter ${getReferencePath(
						param
					)}`
				);
		}
	}

	if (expectedLength !== undefined && value.length !== expectedLength) {
		throw new CodecDataError(
			`expected group ${getReferencePath(
				param
			)} to have length ${expectedLength}, got ${value.length}`
		);
	}

	const elements = context.enterGroup(param);
	const buffers = elements.map((_, index) => {
		context.selectGroupElement(index);
		return Buffer.concat(
			param.params.map((param) => encodeParam(param, context))
		);
	});
	context.leaveGroup();
	return Buffer.concat(buffers);
}

function encodeBitmask(param: BitmaskParameter, context: Context): Buffer {
	const bits = context.getValue(param);
	if (!(bits instanceof Set)) {
		throw new CodecDataError(
			`invalid value for parameter ${getReferencePath(
				param
			)}, expected Set<number>, got ${typeof bits}`
		);
	}

	let expectedLength: number | undefined;
	if (typeof param.length === "number") {
		expectedLength = param.length;
	} else {
		switch (param.length.lengthType) {
			case LengthType.Automatic:
				expectedLength = undefined;
				break;
			case LengthType.ParameterReference:
				if (param.length.offset !== undefined) {
					throw new CodecDefinitionError(
						"length offset should be zero for bitmasks"
					);
				}
				expectedLength = context.getNumericValue(param.length.from);
				break;
			default:
				throw new CodecDefinitionError(
					`cannot determine length of parameter ${getReferencePath(
						param
					)}`
				);
		}
	}

	const buffer = setToBuffer(bits);
	const actualLength = buffer.length;

	if (expectedLength !== undefined && actualLength !== expectedLength) {
		throw new CodecDataError(
			`expected bitmask ${getReferencePath(
				param
			)} to have length ${expectedLength} bytes, got ${actualLength} bytes`
		);
	}

	return buffer;
}
