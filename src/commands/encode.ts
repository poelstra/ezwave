import {
	BitfieldElementType,
	BitfieldParameter,
	BlobParameter,
	CommandDefinition,
	EnumParameter,
	IntegerParameter,
	LocalParameterReference,
	Parameter,
	ParameterGroup,
	ParameterReference,
	ParameterType,
	TextParameter,
} from "./types";

const MAX_SIZE = 2048; // Based on maximum frame size that can be encapsulated in any Z-Wave transport.

/**
 * Error thrown when encoder encounters an error in the
 * encoder definition.
 *
 * For example, invalid parameter references, nested groups, etc.
 */
export class EncodeDefinitionError extends Error {}

/**
 * Error thrown when encoder encounters an error in the
 * packet data (command and/or payload).
 */
export class EncodeDataError extends Error {}

export function encodeCommandAndPayload(
	commandDef: CommandDefinition,
	payload: object | void
): Buffer {
	if (payload === undefined) {
		return Buffer.from([commandDef.command]);
	}

	const commandAndPayload = Buffer.alloc(MAX_SIZE);

	let pos = commandDef.cmdMask !== undefined ? 0 : 1;
	for (const param of commandDef.params) {
		const slice = commandAndPayload.slice(pos);
		pos += encodeParam(param, slice, payload as EncodedPacket);
	}

	if (commandDef.cmdMask !== undefined) {
		commandAndPayload[0] =
			commandAndPayload[0] | (commandDef.command & commandDef.cmdMask);
	} else {
		commandAndPayload[0] = commandDef.command;
	}

	return commandAndPayload.slice(0, pos);
}

interface EncodedPacket {
	[name: string]: unknown;
}

function resolveReference(
	ref: ParameterReference | LocalParameterReference,
	currentContext: EncodedPacket,
	parentContext?: EncodedPacket
): number | boolean {
	const isParentReference =
		"isParentReference" in ref && ref.isParentReference;
	const ctx = isParentReference ? parentContext : currentContext;
	if (!ctx) {
		throw new EncodeDefinitionError(
			"parent reference while not encoding in a group"
		);
	}
	const fieldName = ref.bitfield?.name ?? ref.ref;
	const fieldValue = ctx[fieldName];
	if (fieldValue === undefined) {
		throw new EncodeDataError("field reference does not exist");
	}
	if (typeof fieldValue !== "number" && typeof fieldValue !== "boolean") {
		const refName = `${ref.ref}${
			ref.bitfield ? `.${ref.bitfield.name}` : ""
		}`;
		throw new EncodeDataError(
			`wrong type for field reference '${refName}', expected number or boolean, got '${typeof fieldValue}'`
		);
	}
	return fieldValue;
}

function resolveNumericReference(
	ref: ParameterReference | LocalParameterReference,
	currentContext: EncodedPacket,
	parentContext?: EncodedPacket
): number {
	const fieldValue = resolveReference(ref, currentContext, parentContext);
	if (typeof fieldValue !== "number") {
		throw new EncodeDataError(
			"wrong type for field reference, expected number"
		);
	}
	return fieldValue;
}

function isValuePresent(value: unknown): boolean {
	if (value === undefined) {
		return false;
	}
	if (Array.isArray(value)) {
		return value.length > 0;
	}
	return true;
}

function encodeParam(
	param: Parameter | ParameterGroup,
	slice: Buffer,
	data: EncodedPacket,
	parent?: EncodedPacket
): number {
	// Skip optional param if necessary
	if (param.optional) {
		// Note: the absence of this param will already be encoded
		// in the relevant bitfield, and it is verified that the
		// presence of all parameters indicated by that field are
		// the same.
		if (!isValuePresent(data[param.name])) {
			return 0;
		}
	}

	switch (param.type) {
		case ParameterType.Integer:
			return encodeInteger(param, slice, data, data);

		case ParameterType.Enum:
			return encodeEnum(param, slice, data);

		case ParameterType.Bitfield:
			return encodeBitfield(param, slice, data, data);

		case ParameterType.Blob:
			return encodeBlob(param, slice, data, data);

		case ParameterType.Text:
			return encodeText(param, slice, data, data);

		default:
			throw new Error(
				`missing implementation for parameter type ${param.type}`
			);
	}
}

function ensureBooleanValue(value: unknown, name: string): boolean {
	if (value === undefined) {
		throw new EncodeDataError(`missing parameter value for ${name}`);
	}
	if (typeof value !== "boolean") {
		throw new EncodeDataError(
			`wrong parameter type for ${name}, expected boolean, got ${typeof value}`
		);
	}
	return value;
}

function ensureNumericValue(
	value: unknown,
	name: string,
	min: number,
	max: number
): number {
	if (value === undefined) {
		throw new EncodeDataError(`missing parameter value for ${name}`);
	}
	if (typeof value !== "number") {
		throw new EncodeDataError(
			`wrong parameter type for ${name}, expected number, got ${typeof value}`
		);
	}
	const integerValue = Math.floor(value);
	if (!(integerValue >= min && integerValue <= max)) {
		throw new EncodeDataError(
			`invalid value for ${name}, expected [${min}..${max}], got ${integerValue}`
		);
	}
	return value;
}

function encodeInteger(
	param: IntegerParameter,
	slice: Buffer,
	localCtx: EncodedPacket,
	parentCtx: EncodedPacket
): number {
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

	if (param.lengthOf) {
		if (param.lengthOf.isExplicit) {
			rawValue = ensureNumericValue(
				localCtx[param.name],
				param.name,
				0,
				maxValue
			);
		}
		// There can be multiple refs, and they all need to
		// have the same size, but some fields can be optional.
		for (const ref of param.lengthOf.refs) {
			const sourceCtx: EncodedPacket | undefined = ref.group
				? (parentCtx[ref.group] as EncodedPacket | undefined)
				: localCtx;
			if (!sourceCtx) {
				// Group is optional and missing
				continue;
			}
			const sourceValue = sourceCtx[ref.name];
			if (!sourceValue) {
				// Referenced parameter is optional and missing
				continue;
			}

			const length = getValueLength(sourceValue);
			if (rawValue === undefined) {
				rawValue = length;
			} else if (length !== rawValue) {
				if (param.lengthOf.isExplicit) {
					throw new EncodeDataError(
						`bitfield element ${param.name}.${param.name} indicates parameter ${ref.name} must have length ${rawValue} but it is has length ${length}`
					);
				}
				throw new EncodeDataError(
					`cannot determine value for bitfield element ${param.name}.${param.name}: all referenced fields must have the same length`
				);
			}
		}
	} else {
		rawValue = param.reserved ? 0 : localCtx[param.name];
	}

	const integerValue = ensureNumericValue(rawValue, param.name, 0, maxValue);

	slice.writeUIntBE(integerValue, 0, length);
	return length;
}

function encodeEnum(
	param: EnumParameter,
	slice: Buffer,
	data: EncodedPacket
): number {
	const rawValue = data[param.name];
	const integerValue = ensureNumericValue(rawValue, param.name, 0, 255);

	slice.writeUInt8(integerValue, 0);
	return 1;
}

function getValueLength(value: unknown): number {
	if (!value) {
		return 0;
	}
	if (Array.isArray(value) || value === "string" || Buffer.isBuffer(value)) {
		return value.length;
	}
	throw new Error(
		`missing implementation for deriving length of ${typeof value}`
	);
}

function encodeBitfield(
	param: BitfieldParameter,
	slice: Buffer,
	localCtx: EncodedPacket,
	parentCtx: EncodedPacket,
	isLastGroupElement?: boolean
): number {
	let value = 0;
	for (const field of param.fields) {
		if (field.reserved) {
			continue;
		}

		let fieldValue: unknown;
		if (field.presenceOf) {
			if (field.presenceOf.isExplicit) {
				fieldValue = ensureBooleanValue(
					localCtx[field.name],
					field.name
				);
			}

			// There can be multiple refs, and they need to either
			// all be there, or none of them.
			for (const ref of field.presenceOf.refs) {
				const sourceValue = localCtx[ref.name];
				const isPresent = isValuePresent(sourceValue);
				if (fieldValue === undefined) {
					fieldValue = isPresent;
				} else if (isPresent !== fieldValue) {
					if (field.presenceOf.isExplicit) {
						throw new EncodeDataError(
							`bitfield element ${param.name}.${
								field.name
							} indicates ${ref.name} must be ${
								fieldValue ? "present" : "absent"
							} but it is not`
						);
					}
					throw new EncodeDataError(
						`cannot determine value for bitfield element ${param.name}.${field.name}: all referenced optional fields must be either present or not present`
					);
				}
			}
		} else if (field.lengthOf) {
			if (field.lengthOf.isExplicit) {
				fieldValue = ensureNumericValue(
					localCtx[field.name],
					field.name,
					0,
					field.mask >> field.shift
				);
			}
			// There can be multiple refs, and they all need to
			// have the same size, but some fields can be optional.
			for (const ref of field.lengthOf.refs) {
				const sourceCtx: EncodedPacket | undefined = ref.group
					? (parentCtx[ref.group] as EncodedPacket | undefined)
					: localCtx;
				if (!sourceCtx) {
					// Group is optional and missing
					continue;
				}
				const sourceValue = sourceCtx[ref.name];
				if (!sourceValue) {
					// Referenced parameter is optional and missing
					continue;
				}

				const length = getValueLength(sourceValue);
				if (fieldValue === undefined) {
					fieldValue = length;
				} else if (length !== fieldValue) {
					if (field.lengthOf.isExplicit) {
						throw new EncodeDataError(
							`bitfield element ${param.name}.${field.name} indicates parameter ${ref.name} must have length ${fieldValue} but it is has length ${length}`
						);
					}
					throw new EncodeDataError(
						`cannot determine value for bitfield element ${param.name}.${field.name}: all referenced fields must have the same length`
					);
				}
			}
		} else if (field.isMoreToFollowFlag) {
			fieldValue = !isLastGroupElement;
		} else {
			fieldValue = localCtx[field.name];
		}

		let rawValue: number;
		switch (field.type) {
			case BitfieldElementType.Boolean:
				rawValue = ensureBooleanValue(fieldValue, field.name) ? 1 : 0;
				break;
			case BitfieldElementType.Integer:
				rawValue = ensureNumericValue(
					fieldValue,
					field.name,
					0,
					field.mask >> field.shift
				);
				break;
			case BitfieldElementType.Enum:
				// TODO also verify whether value exists in given enum?
				rawValue = ensureNumericValue(
					fieldValue,
					field.name,
					0,
					field.mask >> field.shift
				);
				break;
			default:
				throw new EncodeDefinitionError("unsupported bitfield type");
		}
		value |= rawValue << field.shift;
	}

	slice.writeUInt8(value, 0);
	return 1;
}

function encodeBlob(
	param: BlobParameter,
	slice: Buffer,
	localCtx: EncodedPacket,
	parentCtx: EncodedPacket
): number {
	const value = localCtx[param.name];
	if (!Buffer.isBuffer(value)) {
		throw new EncodeDataError(
			`invalid value for parameter ${
				param.name
			}, expected Buffer, got ${typeof value}`
		);
	}
	if (value.length > slice.length) {
		throw new EncodeDataError(`parameter ${param.name} too long`);
	}
	return value.copy(slice);
}

function encodeText(
	param: TextParameter,
	slice: Buffer,
	localCtx: EncodedPacket,
	parentCtx: EncodedPacket
): number {
	const value = localCtx[param.name];
	if (typeof value !== "string") {
		throw new EncodeDataError(
			`invalid value for parameter ${
				param.name
			}, expected string, got ${typeof value}`
		);
	}
	// TODO explicit error when string is too long
	// TODO check encoding in spec
	// TODO Check fixed-length fields (pad with zeroes?)
	return slice.write(value, "ascii");
}
