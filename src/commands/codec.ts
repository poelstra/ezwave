/**
 * Encoder / decoder helpers.
 */

import {
	BitfieldElement,
	IntegerParameter,
	Parameter,
	ParameterGroup,
	ParamRefLengthInfo,
} from "./spec";
import { getReferencePath, isParameter, KeyValues } from "./specHelpers";

/**
 * Error thrown when encoder/decoder encounters an error in the
 * command/parameter definition.
 *
 * For example, invalid parameter references, nested groups, etc.
 */
export class CodecDefinitionError extends Error {}

/**
 * Error thrown when encoder/decoder encounters an error in the
 * packet data (command and/or payload).
 */
export class CodecDataError extends Error {}

/**
 * Error thrown when decoder encounters an unexpected end of packet.
 *
 * This can happen due to e.g. a truncated integer or group, or when
 * a packet ends after a group element and the previous element indicated
 * more elements should follow.
 */
export class CodecUnexpectedEndOfPacketError extends CodecDataError {
	constructor() {
		super("unexpected end of packet");
	}
}

export function isValuePresent(value: unknown): boolean {
	if (value === undefined) {
		return false;
	}
	if (Array.isArray(value)) {
		return value.length > 0;
	}
	return true;
}

export function ensureBooleanValue(
	value: unknown,
	paramOrField: Parameter | BitfieldElement
): boolean {
	if (value === undefined) {
		throw new CodecDataError(
			`missing parameter value for ${getReferencePath(paramOrField)}`
		);
	}
	if (typeof value !== "boolean") {
		throw new CodecDataError(
			`wrong parameter type for ${getReferencePath(
				paramOrField
			)}, expected boolean, got ${typeof value}`
		);
	}
	return value;
}

export function ensureNumericValue(
	value: unknown,
	paramOrField: Parameter | BitfieldElement,
	min: number,
	max: number
): number {
	if (value === undefined) {
		throw new CodecDataError(
			`missing parameter value for ${getReferencePath(paramOrField)}`
		);
	}
	if (typeof value !== "number") {
		throw new CodecDataError(
			`wrong parameter type for ${getReferencePath(
				paramOrField
			)}, expected number, got ${typeof value}`
		);
	}
	const integerValue = Math.floor(value);
	if (!(integerValue >= min && integerValue <= max)) {
		throw new CodecDataError(
			`invalid value for ${getReferencePath(
				paramOrField
			)}, expected [${min}..${max}], got ${integerValue}`
		);
	}
	return value;
}

export function getParamLength(
	integerParamOrField: IntegerParameter | BitfieldElement,
	context: Context
): number {
	const lengthOf = isParameter(integerParamOrField)
		? integerParamOrField.lengthOf
		: integerParamOrField.lengthOf;
	if (!lengthOf) {
		throw new Error("programming error: missing lengthOf");
	}
	// Determine length of first present value that we can find,
	// all encoded values will check their own length later
	for (const ref of lengthOf) {
		const values = context.getValues(ref);
		const value = values.find((v) => v !== undefined);
		let rawLength: number;
		if (
			Array.isArray(value) ||
			value === "string" ||
			Buffer.isBuffer(value)
		) {
			rawLength = value.length;
		} else {
			throw new CodecDataError(
				`cannot determine value of ${getReferencePath(
					integerParamOrField
				)}: cannot determine length of ${getReferencePath(ref)}`
			);
		}

		const refParamLength = ref.length as ParamRefLengthInfo;
		const valueLength = rawLength + (refParamLength.offset ?? 0);

		return valueLength;
	}

	throw new Error(
		`cannot determine length for ${getReferencePath(
			integerParamOrField
		)}: no values found`
	);
}

export function getParamPresence(
	booleanField: BitfieldElement,
	context: Context
): boolean {
	if (!booleanField.presenceOf) {
		throw new Error("programming error: missing presenceOf");
	}
	// Determine length of first present value that we can find,
	// all encoded values will check their own length later
	for (const ref of booleanField.presenceOf) {
		const values = context.getValues(ref);
		const value = values.find((v) => v !== undefined);
		if (value) {
			return true;
		}
	}
	return false;
}

export class Context {
	auto = new Map<Parameter | BitfieldElement, number | boolean>();
	data: KeyValues;
	group: GroupInfo | undefined;

	constructor(data: KeyValues) {
		this.data = data;
	}

	setValue(ref: Parameter | BitfieldElement, value: unknown): void {
		const paramOfRef = isParameter(ref) ? ref : ref.parent;
		let data: KeyValues;
		if (paramOfRef.group) {
			if (!this.group) {
				throw new CodecDefinitionError(
					`attempt to set value of group parameter ${getReferencePath(
						ref
					)} while not in a group`
				);
			}
			if (paramOfRef.group !== this.group.param) {
				throw new CodecDefinitionError(
					`attempt to set value from group parameter ${getReferencePath(
						ref
					)} while in group ${getReferencePath(this.group.param)}`
				);
			}
			if (!this.group.data) {
				throw new CodecDefinitionError("missing group element");
			}
			data = this.group.data;
		} else {
			data = this.data;
		}

		// The ref can be a bitfield element or parameter, but its name
		// is used directly in the payload (i.e. bitfields are not encoded
		// as an object, but its values directly in the payload).
		data[ref.name] = value;
	}

	/**
	 * Obtain single value of parameter or bitfield reference, either an
	 * auto-generated value, or a value from the payload data.
	 *
	 * For example, when asking for "field1", it will return data["field1"],
	 * irrespective of whether currently inside a group or not.
	 * When asking for "group1.field1" when encoding a group, we must
	 * be encoding group "group1".
	 */
	getValue(
		ref: Parameter | BitfieldElement,
		includeAutomatic: boolean = true
	): unknown {
		if (includeAutomatic) {
			const autoValue = this.auto.get(ref);
			if (autoValue !== undefined) {
				return autoValue;
			}
		}

		const paramOfRef = isParameter(ref) ? ref : ref.parent;
		let data: KeyValues;
		if (paramOfRef.group) {
			if (!this.group) {
				throw new CodecDefinitionError(
					`attempt to get value from group parameter ${getReferencePath(
						ref
					)} while not in a group`
				);
			}
			if (paramOfRef.group !== this.group.param) {
				throw new CodecDefinitionError(
					`attempt to get value from group parameter ${getReferencePath(
						ref
					)} while in group ${getReferencePath(this.group.param)}`
				);
			}
			if (!this.group.data) {
				throw new CodecDefinitionError("missing group element");
			}
			data = this.group.data;
		} else {
			data = this.data;
		}

		// The ref can be a bitfield element or parameter, but its name
		// is used directly in the payload (i.e. bitfields are not encoded
		// as an object, but its values directly in the payload).
		const value = data[ref.name];
		return value;
	}

	getNumericValue(ref: IntegerParameter | BitfieldElement): number {
		let maxValue: number;
		if (isParameter(ref)) {
			maxValue =
				ref.length === 1
					? 0xff
					: ref.length === 2
					? 0xffff
					: ref.length === 3
					? 0xffffff
					: 0xffffffff;
		} else {
			maxValue = ref.mask >> ref.shift;
		}
		return ensureNumericValue(this.getValue(ref), ref, 0, maxValue);
	}

	/**
	 * Obtain one or more values of parameter or bitfield reference,
	 * either auto-generated or from payload data.
	 *
	 * If asked for a non-group value, that value is returned.
	 * If asked for a group value, the value of that parameter in all
	 * elements of the group is returned. It does not matter whether
	 * the group is currently being decoded.
	 */
	getValues(ref: Parameter | BitfieldElement): unknown[] {
		const autoValue = this.auto.get(ref);
		if (autoValue !== undefined) {
			return [autoValue];
		}

		const paramOfRef = isParameter(ref) ? ref : ref.parent;
		if (paramOfRef.group) {
			const groupElements = this.data[
				paramOfRef.group.name
			] as KeyValues[];
			return groupElements.map((elem) => elem[ref.name]);
		} else {
			return [this.data[ref.name]];
		}
	}

	enterGroup(
		group: ParameterGroup,
		autoCreate: boolean = false
	): KeyValues[] {
		if (this.group) {
			throw new CodecDefinitionError(
				"attempt to enter group while already in group"
			);
		}
		let elements = this.data[group.name] as KeyValues[];
		if (!elements && autoCreate) {
			elements = [];
			this.data[group.name] = elements;
		}
		if (!elements) {
			throw new CodecDataError(
				`missing group data for ${getReferencePath(group)}`
			);
		}
		this.group = {
			param: group,
			elements,
			data: elements[0],
		};
		return elements;
	}

	selectGroupElement(index: number): void {
		if (!this.group) {
			throw new CodecDefinitionError("not in a group");
		}
		this.group.data = this.group.elements[index];
		if (!this.group.data) {
			throw new CodecDataError(
				`missing group element ${index} in group ${getReferencePath(
					this.group.param
				)}`
			);
		}
	}

	leaveGroup(): void {
		if (!this.group) {
			throw new CodecDefinitionError(
				"attempt to leave group while not in group"
			);
		}
		this.group = undefined;
	}

	addGroupElement(element: KeyValues): void {
		if (!this.group) {
			throw new CodecDefinitionError(
				"attempt to add group element while not in group"
			);
		}
		this.group.data = element;
		this.group.elements.push(this.group.data);
	}

	setAutoValue(
		param: IntegerParameter | BitfieldElement,
		value: number | boolean
	): void {
		this.auto.set(param, value);
	}
}

interface GroupInfo {
	param: ParameterGroup;
	elements: KeyValues[];
	data?: KeyValues;
}
