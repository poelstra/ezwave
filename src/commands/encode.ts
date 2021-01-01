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

function encodeParam(
	param: Parameter | ParameterGroup,
	slice: Buffer,
	data: EncodedPacket,
	parent?: EncodedPacket
): number {
	// Skip optional param if necessary
	if (param.optional) {
		const isOptionalPresent = resolveReference(
			param.optional,
			data,
			parent
		);
		if (!isOptionalPresent) {
			// TODO Make this automatic. In that case, don't even put the referenced property in decoded data.
			if (data[param.name] !== undefined) {
				throw new EncodeDataError(
					`parameter ${param.name} is optional and marked as absent, but value is defined`
				);
			}
			return 0;
		}
	}

	switch (param.type) {
		case ParameterType.Integer:
			return encodeInteger(param, slice, data);

		case ParameterType.Enum:
			return encodeEnum(param, slice, data);

		case ParameterType.Bitfield:
			return encodeBitfield(param, slice, data);

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
	data: EncodedPacket
): number {
	const length = param.length as number;
	const rawValue = param.reserved ? 0 : data[param.name];
	const maxValue =
		length === 1
			? 0xff
			: length === 2
			? 0xffff
			: length === 3
			? 0xffffff
			: 0xffffffff;
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

function encodeBitfield(
	param: BitfieldParameter,
	slice: Buffer,
	data: EncodedPacket
): number {
	let value = 0;
	for (const field of param.fields) {
		if (field.reserved) {
			continue;
		}
		const fieldValue = data[field.name];

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
