/**
 * Converter for 'official' ZWave XML specification into something more easily
 * usable.
 *
 * The XML document contains pretty detailed information about every command of
 * every command class, including all versions of them. For example, it specifies
 * all possible bit fields, enum values, their names, etc.
 *
 * However, it uses a badly documented structure, has confusing names for its types,
 * needs a bit of heuristics to determine what they actually mean in certain cases,
 * etc.
 *
 * So, this converter aims to convert the XML document into a JSON structure that's
 * easier to use for packet encoders/decoders, and is also easy to use for self-
 * documenting API's, packet sniffers, etc.
 *
 * The current XML file (ZWave_cmd_classes.xml) was obtained from:
 * https://www.silabs.com/documents/login/software/zw-classcmd-20171229.zip
 *
 * Or see:
 * https://www.silabs.com/support/resources.p-wireless_z-wave?query=Z-Wave%20Device%20and%20Command%20Classes%20Definition%20Files
 */

// TODO Handle bitmasks
// TODO Handle marker type, or rewrite it to something else
// TODO ValueType is used on IntegerParameter and EnumParameter, but will likely only appear in certain combinations

// TODO
// encaptype CMD_DATA and CMD_ENCAP is always a VARIANT
// CMD_DATA is ALWAYS preceded by a CMD_CLASS_REF and CMD_REF param
// There is one instance of CMD_ENCAP, which is NOT preceded by CMD_CLASS_REF or CMD_REF
// => It seems that CMD_ENCAP means one Buffer including class and cmd, and
//    CMD_DATA being just the data part. So sizechange=-2 for this seems incorrect.
// May want to just convert CMD_ENCAP to separate fields, just like CMD_DATA
// Or, because of cmd_mask and generally easier handling, convert all of them to
// CMD_ENCAP.

// TODO
// All CMD_REFs are preceded by a CMD_CLASS_REF, which determines the range of valid
// values for the CMD_REF param itself. For GEN_DEV_REF and SPEC_DEV_REF, a special construct
// exists that selects the right enum.

import * as assert from "assert";
import main from "async-main";
import * as Case from "case";
import * as parser from "fast-xml-parser";
import { promises as pfs } from "fs";
import * as path from "path";
import "source-map-support/register";
import * as jsonSpec from "../commands/jsonSpec";
import * as spec from "../commands/spec";
import {
	convertToJsonCommand,
	convertToJsonParams,
	isBitfieldElement,
	isParameter,
	convertFromJsonCommandClasses,
} from "../commands/specHelpers";

function toArray<T>(value: MaybeArray<T>): T[] {
	if (value === undefined) {
		return [];
	}
	if (Array.isArray(value)) {
		return value;
	}
	return [value];
}

type MaybeArray<T> = T | T[] | undefined;

interface ZwClassesXml {
	zw_classes: {
		version: string;
		bas_dev: MaybeArray<BasicDevice>;
		gen_dev: MaybeArray<GenericDevice>;
		cmd_class: MaybeArray<CommandClass>;
	};
}

interface BasicDevice {
	read_only: boolean;
	name: string;
	key: number;
	help: string;
	comment: string;
}

interface GenericDevice {
	read_only: boolean;
	name: string;
	key: number;
	help: string;
	comment: string;
	spec_dev: MaybeArray<SpecificDevice>;
}

interface SpecificDevice {
	name: string;
	key: number;
	help: string;
	comment: string;
}

interface CommandClass {
	key: number;
	version: number;
	name: string;
	help: string;
	read_only: boolean;
	comment: string; // Mostly contains "[DEPRECATED]", "[OBSOLETED]" or nothing, sometimes a document reference (which doesn't exist)
	cmd: MaybeArray<Command>;
}

interface Command {
	key: number;
	name: string;
	help: string;
	comment: string;
	param: MaybeArray<Param>;
	variant_group: MaybeArray<VariantGroup>;
	cmd_mask?: number;
	support_mode?: SupportMode; // Some command classes seem only superficially specified, and are missing this field (and parameter definitions)
}

interface VariantGroup {
	key: number;
	name: string; // Only "vg", "vg1", "Statistics" really used
	comment?: string;
	variantKey: number;
	paramOffs: number;
	sizemask: number;
	sizeoffs: number;
	param: MaybeArray<Param>;
	optionaloffs?: number;
	optionalmask?: number;
	moretofollowoffs?: number;
	moretofollowmask?: number;
}

enum SupportMode {
	Tx = "TX",
	Rx = "RX",
	TxRx = "TX_RX",
}

enum ParamType {
	BYTE = "BYTE",
	WORD = "WORD",
	DWORD = "DWORD",
	BIT_24 = "BIT_24",
	ARRAY = "ARRAY",
	BITMASK = "BITMASK",
	STRUCT_BYTE = "STRUCT_BYTE",
	MULTI_ARRAY = "MULTI_ARRAY",
	CONST = "CONST",
	VARIANT = "VARIANT",
	MARKER = "MARKER",
}

type Param =
	| ByteParam
	| WordParam
	| DwordParam
	| Bit24Param
	| ArrayParam
	| BitmaskParam
	| StructByteParam
	| MultiArrayParam
	| ConstParam
	| VariantParam
	| MarkerParam;

interface ParamBase {
	key: number;
	name: string;
	comment?: string;
	type: ParamType;
	encaptype?: Encaptype; // TODO Is this on param or one of its subtypes?
	optionaloffs?: number;
	optionalmask?: number;
}

enum Encaptype {
	CmdClassRef = "CMD_CLASS_REF",
	CmdData = "CMD_DATA",
	CmdEncap = "CMD_ENCAP",
	CmdRef = "CMD_REF",
	BasDevRef = "BAS_DEV_REF",
	GenDevRef = "GEN_DEV_REF",
	NodeNumber = "NODE_NUMBER",
	SpecDevRef = "SPEC_DEV_REF",
}

interface ByteParam extends ParamBase {
	type: ParamType.BYTE;
	bitflag: MaybeArray<ValueDef>;
}

interface WordParam extends ParamBase {
	type: ParamType.WORD;
}

interface DwordParam extends ParamBase {
	type: ParamType.DWORD;
}

interface Bit24Param extends ParamBase {
	type: ParamType.BIT_24;
}

interface ArrayParam extends ParamBase {
	type: ParamType.ARRAY;
	arrayattrib: Arrayattrib; // .len = [0..254] for fixed length, 255 for arraylen field
	arraylen?: Arraylen; // never used in current specs
}

interface Arrayattrib {
	key: number; // should be 0
	len: number;
	is_ascii?: boolean;
}

// An arraylen-tag is specified in INS10680-Instruction-for-Z-Wave-XML-Editor-User-Guide
// but doesn't seem to actually exist.
interface Arraylen {
	key: number; // should be 1
	paramoffs: number;
	lenmask: number;
	lenoffs?: number;
}

interface BitmaskParam extends ParamBase {
	type: ParamType.BITMASK;
	bitmask: Bitmask;
	bitflag: MaybeArray<ValueDef>;
}

/**
 * Common type used for both 'enum-like' and 'bitmask-like' values.
 */
interface ValueDef {
	key: number; // Defines order among other fields in same param
	flagname: string; // Name, e.g. "External Alarm"
	flagmask: number; // Value of bit as mask, or 'raw' index, depending on context
}

interface Bitmask {
	key: number; // Defines order among other fields in same param
	paramoffs: number;
	lenmask: number;
	lenoffs?: number; // absent means 0 offset
	len?: number;
}

interface StructByteParam extends ParamBase {
	type: ParamType.STRUCT_BYTE;
	// Bitfield, bitflag and fieldenum can all be present, `key` property determines order
	bitflag: MaybeArray<ValueDef>; // Represents a number of single-bit flags
	bitfield: MaybeArray<Bitfield>; // Represents a number of multi-bit fields
	fieldenum: MaybeArray<Fieldenum>;
	cmd_mask?: number;
}

interface Bitfield {
	key: number; // Defines order among other fields in same param
	fieldname: string; // E.g. "Not Used"
	fieldmask: number; // Value of bit field as mask (e.g. 112)
	shifter?: number; // Number of times to shift right after masking to obtain actual value (e.g. 4), absent means 0
}

interface Fieldenum {
	key: number; // Defines order among other fields in same param
	fieldname: string;
	fieldmask: number;
	shifter?: number;
	fieldenum: MaybeArray<FieldenumElement>;
}

interface FieldenumElement {
	key?: number;
	value: string;
}

interface MultiArrayParam extends ParamBase {
	type: ParamType.MULTI_ARRAY;
	multi_array: MaybeArray<MultiArrayElement>;
}

type MultiArrayElement = MultiArrayParamDescLoc | MultiArrayParamBitFlags;

interface MultiArrayParamDescLoc {
	paramdescloc: Paramdescloc;
}

interface Paramdescloc {
	key: number;
	param: number;
	paramdesc: number;
	paramstart: number;
}

interface MultiArrayParamBitFlags {
	bitflag: MaybeArray<ValueDef>;
}

interface ConstParam extends ParamBase {
	type: ParamType.CONST;
	const: MaybeArray<ValueDef>;
}

interface VariantParam extends ParamBase {
	type: ParamType.VARIANT;
	variant: Variant;
	skipfield?: boolean;
}

interface MarkerParam extends ParamBase {
	type: ParamType.MARKER;
	const: MaybeArray<Const>;
}

interface Const {
	key: number;
	flagname: string;
	flagmask: number;
}

interface Variant {
	paramoffs: number;
	signed: boolean;
	sizemask: number;
	sizeoffs?: number; // Means 0 if absent
	is_ascii?: boolean;
	sizechange?: number; // E.g. -1 or -2, means to include one or two previous bytes
}

function isReserved(name: string): boolean {
	// Reserved names are e.g. Reserved, reserved11, ReservedA.
	// But should not match e.g. ReservedByAdministrator or CmdReservedIds.
	return /^[Rr]eserved[A-F]?[0-9]*$/.test(name) || /^res[0-9]*$/.test(name);
}

function makeEnumValue(name: string): spec.EnumValue {
	return {
		name: Case.pascal(name),
		help: name,
	};
}

function generateBitfields(
	param: StructByteParam
): spec.BitfieldElement<spec.RefMode.Json>[] {
	let result: spec.BitfieldElement<spec.RefMode.Json>[] = [];
	for (const flag of toArray(param.bitflag)) {
		// Remap key to just append at end in case of duplicate, e.g.
		// necessary for COMMAND_CLASS_ZIP:COMMAND_ZIP_PACKET
		const key = !result[flag.key] ? flag.key : result.length;

		const elementName = Case.camel(flag.flagname);
		result[key] = {
			fieldType: spec.BitfieldElementType.Boolean,
			name: elementName,
			mask: flag.flagmask,
			shift: Math.log2(flag.flagmask),
			reserved: isReserved(elementName) ? true : undefined,
			parent: undefined,
		};
	}
	for (const field of toArray(param.bitfield)) {
		const key = !result[field.key] ? field.key : result.length;
		const elementName = Case.camel(field.fieldname);
		result[key] = {
			fieldType: spec.BitfieldElementType.Integer,
			name: elementName,
			mask: field.fieldmask,
			shift: field.shifter ?? 0,
			reserved: isReserved(elementName) ? true : undefined,
			parent: undefined,
		};
	}
	for (const enm of toArray(param.fieldenum)) {
		const values = createKeyValues();
		// Enums are either auto-numbered, or specifically numbered
		// Convert into explicitly numbered elements
		let size = 0;
		for (const val of toArray(enm.fieldenum)) {
			if (val.key !== undefined) {
				values[val.key] = makeEnumValue(val.value);
			} else {
				values[size] = makeEnumValue(val.value);
			}
			size++;
		}
		const key = !result[enm.key] ? enm.key : result.length;
		const elementName = Case.camel(enm.fieldname);
		result[key] = {
			fieldType: spec.BitfieldElementType.Enum,
			name: elementName,
			mask: enm.fieldmask,
			shift: enm.shifter ?? 0,
			reserved: isReserved(elementName) ? true : undefined,
			values,
			parent: undefined,
		};
	}

	// Filter gaps (e.g. some param definitions skip entries)
	// TODO check consequences
	result = result.filter((elem) => elem);

	// Sanity check
	for (const field of result) {
		const len = Math.log2((field.mask >> field.shift) + 1);
		assert((Math.pow(2, len) - 1) << field.shift === field.mask);
	}

	return result;
}

function shiftFromMask(mask: number): number {
	for (let i = 0; i < 8; i++) {
		const test = 1 << i;
		if (mask & test) {
			return i;
		}
	}
	throw new Error("invalid mask");
}

function buildParamRef(
	key: number,
	mask: number | undefined,
	shift: number | undefined,
	numericOnly: boolean,
	mainMap: Map<number, Param>,
	groupMap?: Map<number, Param>,
	groupName?: string
): spec.Ref {
	const isParentReference = key >= 128 ? true : undefined; // Less noisy in JSON
	if (isParentReference && !groupMap) {
		throw new Error(`invalid parent parameter reference, not in a group`);
	}

	if (isParentReference) {
		key -= 128;
	}

	const map = groupMap && !isParentReference ? groupMap : mainMap;

	const param = map.get(key);
	if (param === undefined) {
		throw new Error(
			`cannot find parameter ${key} in ${
				map === groupMap ? "group" : "main"
			} map`
		);
	}

	let bitfieldName: string | undefined;
	if (mask !== undefined && mask !== 255) {
		if (param.type !== ParamType.STRUCT_BYTE) {
			throw new Error("parameter reference must be struct byte");
		}
		let fieldName: string | undefined;
		if (param.bitfield) {
			const bitfields = toArray(param.bitfield);
			const bitfield = bitfields.find((bf) => bf.fieldmask === mask);
			if (bitfield) {
				fieldName = bitfield.fieldname;
			}
		}
		if (!fieldName && numericOnly) {
			throw new Error(`numeric parameter reference expected`);
		}
		if (!fieldName && param.bitflag) {
			const bitflags = toArray(param.bitflag);
			const bitflag = bitflags.find((bf) => bf.flagmask === mask);
			if (bitflag) {
				fieldName = bitflag.flagname;
			}
		}
		if (!fieldName) {
			throw new Error(
				"no integer bitfield or boolean bitflag defined for mask"
			);
		}
		bitfieldName = Case.camel(fieldName);
	} else {
		assert(shift === undefined || shift === 0);
		bitfieldName = undefined;
	}

	let refName: string = Case.camel(param.name);
	if (groupName && !isParentReference) {
		refName = `${Case.camel(groupName)}.${refName}`;
	}
	if (bitfieldName) {
		refName = `${refName}.${bitfieldName}`;
	}
	return {
		ref: refName,
	};
}

function buildLocalParamRef(
	key: number,
	mask: number | undefined,
	shift: number | undefined,
	numericOnly: boolean,
	mainMap: Map<number, Param>,
	groupMap?: Map<number, Param>,
	groupName?: string
): spec.Ref {
	assert(key >= 0, "expected local reference");
	const ref = buildParamRef(
		key,
		mask,
		shift,
		numericOnly,
		mainMap,
		groupMap,
		groupName
	);
	return ref;
}

function generateParameter(
	param: Param | VariantGroup,
	mainIdMap: Map<number, Param>,
	groupIdMap?: Map<number, Param>,
	groupName?: string
): spec.Parameter<spec.RefMode.Json> {
	let optional: spec.Ref | undefined;
	if (
		typeof param.optionalmask === "number" &&
		typeof param.optionaloffs === "number"
	) {
		// optionaloffs is parameter ID, optionalmask is AND-mask, if result is >0, param is present
		optional = buildParamRef(
			param.optionaloffs,
			param.optionalmask,
			undefined,
			false,
			mainIdMap,
			groupIdMap,
			groupName
		);
	}

	const paramName = Case.camel(param.name);
	const paramBase: Omit<
		spec.ParameterBase<spec.RefMode.Json>,
		"type" | "length"
	> = {
		name: paramName,
		help: param.name,
		optional,
	};

	if ("type" in param) {
		const reserved = isReserved(paramName);
		// Only integer parameters (and bitfield elements) can be reserved
		// according to our type definitions, so make sure no other types
		// can be marked as reserved in the XML.
		assert(
			!reserved ||
				param.type === ParamType.BYTE ||
				param.type === ParamType.BIT_24 ||
				param.type === ParamType.WORD
		);

		switch (param.type) {
			case ParamType.BYTE:
				{
					// A BYTE can define some 'special' values, but it can just as well
					// be any other value, i.e. if the value happens to be one of the
					// enum values, use it, otherwise just display the number itself.
					let values: spec.EnumValues | undefined;
					if (param.bitflag) {
						values = createKeyValues();
						for (const flag of toArray(param.bitflag)) {
							values[flag.flagmask] = makeEnumValue(
								flag.flagname
							);
						}
					}
					return {
						type: spec.ParameterType.Integer,
						...paramBase,
						length: 1,
						valueType: encaptypeToValueType(param.encaptype),
						values,
						reserved: reserved ? true : undefined,
					};
				}
				break;

			case ParamType.CONST:
				{
					// Similar to a BYTE, but with fixed set of values,
					// in which only the given values have a defined meaning.
					// Note: it's still possible for the parsed value to not
					// be in this list, e.g. when parsing a newer version packet.
					const values = createKeyValues();
					for (const enm of toArray(param.const)) {
						values[enm.flagmask] = makeEnumValue(enm.flagname);
					}
					return {
						type: spec.ParameterType.Enum,
						...paramBase,
						length: 1,
						valueType: encaptypeToValueType(param.encaptype),
						values,
					};
				}
				break;

			case ParamType.WORD:
				return {
					type: spec.ParameterType.Integer,
					...paramBase,
					length: 2,
				};
				break;

			case ParamType.BIT_24:
				return {
					type: spec.ParameterType.Integer,
					...paramBase,
					length: 3,
				};
				break;

			case ParamType.DWORD:
				return {
					type: spec.ParameterType.Integer,
					...paramBase,
					length: 4,
				};
				break;

			case ParamType.ARRAY:
				{
					const attr = param.arrayattrib;
					if (param.arraylen !== undefined) {
						// An arraylen-tag is specified in INS10680-Instruction-for-Z-Wave-XML-Editor-User-Guide
						// but doesn't seem to actually exist.
						throw new Error("unsupported `arraylen`");
					}
					assert(attr.key === 0);
					assert(attr.len > 0 && attr.len < 255);
					assert(!param.encaptype);

					if (attr.is_ascii) {
						return {
							type: spec.ParameterType.Text,
							...paramBase,
							length: attr.len,
						};
					} else {
						return {
							type: spec.ParameterType.Blob,
							...paramBase,
							length: attr.len,
						};
					}
				}
				break;

			case ParamType.VARIANT:
				{
					// VARIANT can be a string, a blob or a list of values.
					// Its length is either until the end of the packet (paramoffs=255),
					// or given by another parameter (paramoffs<255).
					const attr = param.variant;
					if (attr.paramoffs === 255) {
						assert(
							attr.sizemask === 0 && (attr.sizeoffs ?? 0) === 0
						);
					}

					let length: spec.LengthInfo<spec.RefMode.Json>;
					if (attr.paramoffs === 255) {
						length = {
							lengthType: spec.LengthType.Automatic,
							endOffset: 0, // Assigned later
						};
					} else {
						length = {
							lengthType: spec.LengthType.ParameterReference,
							from: buildParamRef(
								attr.paramoffs,
								attr.sizemask,
								attr.sizeoffs ?? 0,
								true,
								mainIdMap,
								groupIdMap,
								groupName
							),
							offset: attr.sizechange
								? -attr.sizechange
								: undefined,
						};
					}
					if (attr.is_ascii) {
						return {
							type: spec.ParameterType.Text,
							...paramBase,
							length,
						};
					} else {
						const valueType = encaptypeToValueType(param.encaptype);
						if (valueType) {
							return {
								type: spec.ParameterType.EnumArray,
								...paramBase,
								length,
								valueType,
							};
						} else {
							const blobType = encapTypeToBlobType(
								param.encaptype
							);
							return {
								type: spec.ParameterType.Blob,
								...paramBase,
								length,
								blobType,
							};
						}
					}
				}
				break;

			case ParamType.STRUCT_BYTE:
				{
					return {
						type: spec.ParameterType.Bitfield,
						...paramBase,
						length: 1,
						fields: generateBitfields(param),
						cmdMask: param.cmd_mask,
					};
				}
				break;

			/* case ParamType.BITMASK:
				{
					// Sometimes the flagmasks are more like enums, sometimes more like 'real' bit mask (i.e. 0x01, 0x02, 0x04, 0x08)
					// HEURISTIC algorithm:
					// - If len === 1, and first element has value 0, all flags are enum style
					// - If len === 1, and first element !== 0, all flags are mask style
					// - If len === undefined, all flags are mask style (even if first value !== 0)
					// - If len !== undefined (and not 1), error (because we don't know what may happen)
					// This is verified by hand, by looking at all bitmasks in current XML vs docs
					const values = new Map<number, string>();
					for (const flag of toArray(param.bitflag)) {
						values.set(flag.flagmask, flag.flagname);
					}
					let bitmaskLength: string;
					let enumText = "";
					if (values.size > 0) {
						const enumName = registerEnum(param.name, values);
						enumText = `, see ${enumName}`;
					}
					if (param.bitmask.len !== undefined) {
						assert(param.bitmask.len === 1, "fixed-length bitmask other than 1 byte not supported yet");
						assert(param.bitmask.lenmask === 0 && param.bitmask.lenoffs === 0 && param.bitmask.paramoffs === 255);
						bitmaskLength = `1 byte`;
						if (!values.has(0)) {
							// Values are given as bitmasks, convert back to enum style
							const maskValues = new Map<number, string>();
							values.clear();
							for (const flag of toArray(param.bitflag)) {
								maskValues.set(flag.flagmask, flag.flagname);
								values.set(Math.log2(flag.flagmask), flag.flagname);
							}
							// Register original masks as separate enum
							const maskEnumName = registerEnum(param.name + "Mask", maskValues);
							enumText += ` and ${maskEnumName}`;
						}
					} else if (param.bitmask.paramoffs === 255) {
						bitmaskLength = `length according to message length`;
					} else {
						const bm = param.bitmask;
						bitmaskLength = `length by param[${bm.paramoffs}] & ${bm.lenmask} >> ${bm.lenoffs}`;
					}
					const bitmaskType = "number" + (param.bitmask.len === 1 ? "" : "[]");
					//contents.push(`${indent}${Case.camel(param.name)}: ${bitmaskType}; // ${param.type}, ${bitmaskLength}${enumText}`);
				}
				break;*/

			case ParamType.MULTI_ARRAY:
				{
					const elems = toArray(param.multi_array);
					const descloc = (elems.find(
						(elem) => (elem as any).paramdescloc
					) as MultiArrayParamDescLoc).paramdescloc;
					assert(
						descloc &&
							descloc.key === 0 &&
							descloc.paramdesc === 255 &&
							descloc.param === descloc.paramstart
					);
					const valueType = encaptypeToValueType(param.encaptype);
					assert(valueType === undefined); // With valuetype is no longer used in current spec
					let enums:
						| { [enumIndex: number]: spec.EnumValues }
						| undefined;
					if (!valueType) {
						// XML configuration looks like a bunch of these:
						// <param key="0x03" name="Profile2" type="MULTI_ARRAY">
						//   <multi_array>
						//     <paramdescloc key="0x00" param="2" paramdesc="255" paramstart="2" />
						//   </multi_array>
						//   <multi_array>
						//     <bitflag key="0x00" flagname="Profile General NA" flagmask="0x00" />
						//     <bitflag key="0x00" flagname="Profile General Lifeline" flagmask="0x01" />
						//   </multi_array>
						// ...
						enums = Object.create(null);
						// Remove the <paramdescloc> element
						const bitflags = elems.filter(
							(elem) => (elem as any).bitflag
						) as MultiArrayParamBitFlags[];
						// Keep only the <bitflag> tags
						const valuedefs = bitflags.map((elem) =>
							toArray(elem.bitflag)
						) as ValueDef[][];
						// Iterate over each enum
						for (const e of valuedefs) {
							let key: number | undefined;
							// Iterate over each enum's key-value
							for (const v of e) {
								if (key === undefined) {
									key = v.key;
									enums![key] = createKeyValues();
								} else {
									assert(v.key === key);
								}
								enums![key][v.flagmask] = makeEnumValue(
									v.flagname
								);
							}
						}
					}
					// A multi-array is basically a union of enums, where the specific enum is chosen based on
					// the value of another parameter (i.e. descloc.param)
					return {
						type: spec.ParameterType.EnumUnion,
						...paramBase,
						length: 1,
						reference: buildParamRef(
							descloc.param,
							undefined, // mask/shift can probably exist here, but at least currently aren't
							undefined,
							true,
							mainIdMap,
							groupIdMap,
							groupName
						),
						enums,
						valueType,
					};
				}
				break;

			case ParamType.MARKER:
			default:
				console.log("TODO", param.type);
				return {
					type: spec.ParameterType.Integer,
					...paramBase,
					length: 0,
				};
		}
	} else {
		// Variant group
		// Nested set of params (only once, i.e. there cannot be a variant-group-in-variant-group)
		// paramOffs, sizemask, sizeoffs determine how many times the group is present, or determined
		// from message length (paramOffs === 255).
		// Alternatively, moretofollowoffs and moretofollowmask can be used to denote number of
		// groups (paramOffs === 255).
		// optionaloffs and optionalmask determine whether the group is present at all.
		// paramOffs and optionaloffs indicate a parameter ID in the 'root' params,
		// moretofollowoffs indicates a parameter ID in the group itself.
		// Note: Size of each element can be dynamic, i.e. it can depend on presence of e.g. VARIANT
		// inside the group (e.g. COMMAND_CLASS_MULTI_CMD:MULTI_CMD_ENCAP)
		const groupIdMap = new Map<number, Param>();
		toArray(param.param).forEach((p) => groupIdMap.set(p.key, p));

		const params = toArray(param.param).map((p) =>
			generateParameter(p, mainIdMap, groupIdMap, param.name)
		) as spec.LocalParameter<spec.RefMode.Json>[];
		let moreToFollow: spec.Ref | undefined;
		let length: spec.LengthInfo<spec.RefMode.Json>;
		if (param.paramOffs === 255) {
			if (
				typeof param.moretofollowoffs === "number" &&
				typeof param.moretofollowmask === "number"
			) {
				moreToFollow = buildLocalParamRef(
					param.moretofollowoffs,
					param.moretofollowmask,
					undefined,
					false,
					mainIdMap,
					groupIdMap,
					param.name
				);
				length = {
					lengthType: spec.LengthType.MoreToFollow,
				};
			} else {
				length = {
					lengthType: spec.LengthType.Automatic,
					endOffset: 0, // Assigned later
				};
			}
		} else {
			assert(
				param.moretofollowoffs === undefined &&
					param.moretofollowmask === undefined
			);
			assert(typeof param.sizeoffs === "number");
			// Note: for groups, length is indicated as number of elements, not bytes
			length = {
				lengthType: spec.LengthType.ParameterReference,
				from: buildParamRef(
					param.paramOffs,
					param.sizemask,
					param.sizeoffs,
					true,
					mainIdMap
					// paramOffs is always in main group, so don't pass in groupIdMap
				),
			};
		}
		return {
			type: spec.ParameterType.ParameterGroup,
			...paramBase,
			length,
			moreToFollow,
			params,
		};
	}
}

function generateCommand(
	cmdClass: CommandClass,
	cmd: Command
): jsonSpec.CommandDefinition {
	//console.log(cmdClass.name, cmd.name);

	// Convert params and VariantGroups to a single array of params, in the right order
	let params: Array<Param | VariantGroup> = [];
	for (const param of toArray(cmd.param)) {
		assert(
			!params[param.key],
			`duplicate parameter key for command 0x${cmdClass.key.toString(
				16
			)}:0x${cmd.key.toString(16)}`
		);
		params[param.key] = param;
	}
	for (const param of toArray(cmd.variant_group)) {
		assert(
			!params[param.key],
			`duplicate parameter key for command 0x${cmdClass.key.toString(
				16
			)}:0x${cmd.key.toString(16)}`
		);
		params[param.key] = param;
	}

	// Skip undefined parameters (e.g. for COMMAND_CLASS_SECURITY:SECURITY_MESSAGE_ENCAPSULATION)
	// Note: each param carries a 'key' to keep the references correct
	params = params.filter((elem) => elem);

	const idMap = new Map<number, Param>();
	params
		.filter((x: Param | VariantGroup): x is Param => "type" in x)
		.forEach((param) => idMap.set(param.key, param));

	const convertedParams = params.map((p) => generateParameter(p, idMap));

	let command: jsonSpec.CommandDefinition = {
		command: cmd.key,
		name: Case.pascal(cmd.name),
		help: cmd.help,
		status: commentToStatus(cmd.comment),
		cmdMask: cmd.cmd_mask,
		params: convertedParams,
	};

	// Add cmdMask, if necessary
	if (typeof cmd.cmd_mask === "number") {
		// TODO In practice, it seems that all commands in a command
		// class that use this trick all share the same cmdMask,
		// so it's probably better to move it to the CommandClass
		// instead.
		command.cmdMask = cmd.cmd_mask;
		const paramMask = ~cmd.cmd_mask & 0xff;
		if (command.params.length > 0) {
			const firstParam = command.params[0];
			assert(
				firstParam.type === "bitfield" &&
					firstParam.cmdMask === paramMask,
				"First parameter of cmdMask'ed command must have inverse mask"
			);
		}
	}

	return command;
}

function generateCommandClass(
	cmdClass: CommandClass
): jsonSpec.CommandClassDefinition {
	const commands = toArray(cmdClass.cmd).map((cmd) => {
		try {
			return generateCommand(cmdClass, cmd);
		} catch (err) {
			console.warn(
				`Error while parsing command ${cmdClass.name}:${cmd.name}`
			);
			throw err;
		}
	});
	const className =
		cmdClass.name === "ZWAVE_CMD_CLASS"
			? "ZWAVE"
			: cmdClass.name.slice("COMMAND_CLASS_".length);
	return {
		commandClass: cmdClass.key,
		name: Case.pascal(className),
		help: cmdClass.help,
		status: commentToStatus(cmdClass.comment),
		version: cmdClass.version,
		commands: commands,
	};
}

function commentToStatus(comment: string | undefined): spec.ObsolescenceStatus {
	switch (comment) {
		case "[OBSOLETED]":
			return spec.ObsolescenceStatus.Obsolete;
		case "[DEPRECATED]":
			return spec.ObsolescenceStatus.Deprecated;
		default:
			return spec.ObsolescenceStatus.Active;
	}
}

function encapTypeToBlobType(encaptype?: string): spec.BlobType | undefined {
	if (!encaptype) {
		return undefined;
	}
	switch (encaptype) {
		case "CMD_DATA":
			return spec.BlobType.CmdData;
		case "CMD_ENCAP":
			return spec.BlobType.CmdEncapsulation;
		default:
			throw new Error("Unsupported blob encaptype");
	}
}

function encaptypeToValueType(encaptype?: string): spec.ValueType | undefined {
	if (!encaptype) {
		return undefined;
	}
	switch (encaptype) {
		case "NODE_NUMBER":
			return spec.ValueType.NodeNumber;
		case "CMD_CLASS_REF":
			return spec.ValueType.CommandClass;
		case "CMD_REF":
			return spec.ValueType.Command;
		case "BAS_DEV_REF":
			return spec.ValueType.BasicDevice;
		case "GEN_DEV_REF":
			return spec.ValueType.GenericDevice;
		case "SPEC_DEV_REF":
			return spec.ValueType.SpecificDevice;
		case "CMD_DATA":
		case "CMD_ENCAP":
			// known, but a blob type, not value type
			return undefined;
		default:
			throw new Error(`Unsupported encaptype '${encaptype}'`);
	}
}

function createKeyValues(): spec.EnumValues {
	return Object.create(null);
}

function fixDuplicateParamKey(xml: ZwClassesXml): void {
	const cmdClasses = toArray(xml.zw_classes.cmd_class).filter(
		(c) => c.name === "COMMAND_CLASS_WINDOW_COVERING"
	);
	if (!cmdClasses.length) {
		throw new Error("Can't find COMMAND_CLASS_WINDOW_COVERING");
	}
	for (const cmdClass of cmdClasses) {
		const cmd = toArray(cmdClass.cmd).find(
			(c) => c.name === "WINDOW_COVERING_REPORT"
		);
		if (!cmd) {
			throw new Error(
				"Can't find COMMAND_CLASS_WINDOW_COVERING:WINDOW_COVERING_REPORT"
			);
		}
		const wrongParam = toArray(cmd.param)[3];
		if (wrongParam.key === 2) {
			wrongParam.key = 3;
		}
	}
}

function forEachCommand(
	defs: spec.CommandsByClassByVersion,
	callback: (
		commandClass: spec.CommandClassDefinition,
		command: spec.CommandDefinition
	) => void
): void {
	for (const versions of defs.values()) {
		for (const cmdClass of versions.values()) {
			for (const cmd of cmdClass.commands) {
				callback(cmdClass, cmd);
			}
		}
	}
}

function getParam(
	paramName: string,
	params: Array<spec.LocalParameter | spec.ParameterGroup>
): spec.LocalParameter | spec.ParameterGroup {
	const param = params.find((p) => p.name === paramName);
	if (!param) {
		throw new Error("parameter not found");
	}
	return param;
}

type Fixer = (
	command: spec.CommandDefinition,
	cmdClass: spec.CommandClassDefinition
) => void;

/**
 * The referenced optional parameter is actually a size field, so don't just look
 * at the packet length, but use the explicit size field.
 * Also, when optional ref is referring to an integer parameter, the integer parameter is
 * generated as an explicit field by the decoder, and a required field for the encoder,
 * but it should be derived from the number of elements present.
 */
function fixUseDynamicLengthInsteadOfOptional(
	param: spec.LocalParameter | spec.ParameterGroup
): void {
	if (
		typeof param.length === "object" &&
		param.length.lengthType === spec.LengthType.Automatic &&
		param.optional
	) {
		param.length = {
			lengthType: spec.LengthType.ParameterReference,
			from: param.optional,
		};
		param.optional = undefined;
	}
}

/**
 * Security S0 defines sequence info explicitly in the XML, but in fact
 * these bytes are embedded in the encrypted payload, together with the
 * encapsulated commandclass.
 * This function corrects that.
 */
function collapseEncryptedPayload(command: spec.CommandDefinition) {
	const prop1 = getParam("properties1", command.params);
	const prop1Index = command.params.indexOf(prop1);
	command.params.splice(prop1Index, 1);
	const payload = getParam("command", command.params);
	payload.name = "encryptedPayload";
	payload.help = "Encrypted Payload";
}

function collapseCommandEncapsulation(command: spec.CommandDefinition) {
	const commandClassParam = getParam("commandClass", command.params);
	const index = command.params.indexOf(commandClassParam);
	command.params.splice(index, 2);
	const encapParam = getParam("parameter", command.params);
	if (encapParam.type !== spec.ParameterType.Blob) {
		throw new Error("unexpected parameter type");
	}
	encapParam.name = "command";
	encapParam.help = "Encapsulated command";
	encapParam.blobType = spec.BlobType.CmdEncapsulation;
}

function renameParam(oldName: string, newName: string, newHelp: string): Fixer {
	return (cmd: spec.CommandDefinition) => {
		const param = getParam(oldName, cmd.params);
		param.name = newName;
		param.help = newHelp;
	};
}

function removeByteSuffix(cmd: spec.CommandDefinition): void {
	for (const param of cmd.params) {
		if (/Byte$/.test(param.name)) {
			param.name = param.name.slice(0, -4);
			param.help = param.help.slice(0, -4);
		}
		if (param.type === spec.ParameterType.ParameterGroup) {
			for (const groupParam of param.params) {
				if (/Byte$/.test(groupParam.name)) {
					groupParam.name = groupParam.name.slice(0, -4);
					groupParam.help = groupParam.help.slice(0, -4);
				}
			}
		}
	}
}

function applyFixes(defs: spec.CommandsByClassByVersion): void {
	const commandFixers: {
		[className: string]: {
			[commandName: string]: Fixer | Fixer[];
		};
	} = {
		MultiChannel: {
			MultiChannelCmdEncap: collapseCommandEncapsulation,
			MultiInstanceCmdEncap: collapseCommandEncapsulation,
		},
		Security: {
			SecurityMessageEncapsulation: collapseEncryptedPayload,
			SecurityMessageEncapsulationNonceGet: collapseEncryptedPayload,
		},
		UserCode: {
			ExtendedUserCodeReport: (cmd) => {
				fixUseDynamicLengthInsteadOfOptional(
					getParam("vg1", cmd.params)
				);
			},
		},
	};
	const alwaysFixers: Fixer[] = [removeByteSuffix];

	forEachCommand(defs, (cmdClass, command) => {
		for (const fixer of alwaysFixers) {
			fixer(command, cmdClass);
		}
		const fixers = commandFixers[cmdClass.name]?.[command.name];
		if (Array.isArray(fixers)) {
			for (const fixer of fixers) {
				fixer(command, cmdClass);
			}
		} else if (fixers) {
			fixers(command, cmdClass);
		}
	});
}

function isNumericParamOrField(
	x: spec.Parameter | spec.BitfieldElement
): boolean {
	return (
		(isParameter(x) && x.type === spec.ParameterType.Integer) ||
		(isBitfieldElement(x) &&
			x.fieldType === spec.BitfieldElementType.Integer)
	);
}

function addRef<T>(existing: T[] | undefined, element: T): T[] {
	return existing ? [...existing, element] : [element];
}

function assignSourceReferences(defs: spec.CommandsByClassByVersion): void {
	forEachCommand(defs, (cmdClass, cmd) => {
		for (const param of cmd.params) {
			if (param.optional) {
				assert(
					(isParameter(param.optional) &&
						param.optional.type === spec.ParameterType.Integer) ||
						(isBitfieldElement(param.optional) &&
							(param.optional.fieldType ===
								spec.BitfieldElementType.Integer ||
								param.optional.fieldType ===
									spec.BitfieldElementType.Boolean))
				);
				param.optional.presenceOf = addRef(
					param.optional.presenceOf,
					param
				);
			}
			if (
				typeof param.length === "object" &&
				param.length.lengthType === spec.LengthType.ParameterReference
			) {
				assert(isNumericParamOrField(param.length.from));
				param.length.from.lengthOf = addRef(
					param.length.from.lengthOf,
					param
				);
			}
			if (param.type === spec.ParameterType.ParameterGroup) {
				if (param.moreToFollow) {
					assert(
						param.moreToFollow.fieldType ===
							spec.BitfieldElementType.Boolean
					);
					param.moreToFollow.isMoreToFollowFlag = true;
				}

				// Traverse group
				for (const groupParam of param.params) {
					if (groupParam.optional) {
						assert(
							(isParameter(groupParam.optional) &&
								groupParam.optional.type ===
									spec.ParameterType.Integer) ||
								(isBitfieldElement(groupParam.optional) &&
									(groupParam.optional.fieldType ===
										spec.BitfieldElementType.Integer ||
										groupParam.optional.fieldType ===
											spec.BitfieldElementType.Boolean))
						);
						groupParam.optional.presenceOf = addRef(
							groupParam.optional.presenceOf,
							groupParam
						);
					}
					if (
						typeof groupParam.length === "object" &&
						groupParam.length.lengthType ===
							spec.LengthType.ParameterReference
					) {
						assert(isNumericParamOrField(groupParam.length.from));
						groupParam.length.from.lengthOf = addRef(
							groupParam.length.from.lengthOf,
							groupParam
						);
					}
				}
			}
		}
	});
}

interface ExplicitFieldOverrides {
	[cmdClass: string]: {
		[command: string]: {
			[refName: string]: boolean;
		};
	};
}

function assignAutogenerated(defs: spec.CommandsByClassByVersion): void {
	const hasExplicitOverrides: ExplicitFieldOverrides = {
		Zwave: {
			NodeInfo: {
				controller: true,
			},
		},
	};
	const handleParam = (
		names: { [name: string]: boolean } | undefined,
		param: spec.LocalParameter | spec.ParameterGroup,
		groupPrefix: string
	) => {
		if (param.type === spec.ParameterType.Integer) {
			if (names?.[`${groupPrefix}${param.name}`]) {
				// If explicitly marked as non-autogenerated, make that
				// explicit in the output, too.
				param.isAutogenerated = false;
			} else {
				// Integers can only be autogenerated when they indicate
				// the length of another field, not just their presence
				if (param.lengthOf) {
					param.isAutogenerated = true;
				}
			}
		}
		if (param.type === spec.ParameterType.Bitfield) {
			for (const field of param.fields) {
				if (names?.[`${groupPrefix}${field.name}`]) {
					field.isAutogenerated = false;
				} else {
					switch (field.fieldType) {
						case spec.BitfieldElementType.Integer:
							// Integers can only be autogenerated when they indicate
							// the length of another field, not just their presence
							if (field.lengthOf) {
								field.isAutogenerated = true;
							}
							break;
						case spec.BitfieldElementType.Boolean:
							// Booleans can be autogenerated when they indicate presence
							if (field.presenceOf) {
								field.isAutogenerated = true;
							}
							break;
						default:
						// Enums are never autogenerated
					}
				}
			}
		}
	};
	forEachCommand(defs, (cmdClass, cmd) => {
		const paramOverrides = hasExplicitOverrides[cmdClass.name]?.[cmd.name];
		for (const param of cmd.params) {
			handleParam(paramOverrides, param, "");
			if (param.type === spec.ParameterType.ParameterGroup) {
				for (const groupParam of param.params) {
					handleParam(paramOverrides, param, `${param.name}.`);
				}
			}
		}
	});
}

function determineEndOffset(
	cmdClass: spec.CommandClassDefinition,
	cmd: spec.CommandDefinition,
	param: spec.LocalParameter | spec.ParameterGroup,
	params: Array<spec.LocalParameter | spec.ParameterGroup>
): void {
	if (
		typeof param.length !== "object" ||
		param.length.lengthType !== spec.LengthType.Automatic
	) {
		return;
	}
	const remainingParams = params.slice(params.indexOf(param) + 1);
	if (remainingParams.length === 0) {
		return;
	}
	const nonAutomaticLengthParams = remainingParams.filter(
		(p) =>
			typeof p.length === "number" ||
			p.length.lengthType !== spec.LengthType.Automatic
	);
	const fixedSizes = nonAutomaticLengthParams
		.map((p) => p.length)
		.filter((len): len is number => typeof len === "number" && len > 0);
	if (fixedSizes.length !== nonAutomaticLengthParams.length) {
		console.log(
			`TODO ${cmdClass.name}:${cmd.name} handle after-auto-length parameters`,
			nonAutomaticLengthParams
		);
		param.length.endOffset = -1;
		return;
	}
	param.length.endOffset = fixedSizes.reduce((sum, len) => sum + len, 0);
}

function determineEndOffsets(defs: spec.CommandsByClassByVersion): void {
	forEachCommand(defs, (cmdClass, cmd) => {
		for (const param of cmd.params) {
			determineEndOffset(cmdClass, cmd, param, cmd.params);
			if (param.type === spec.ParameterType.ParameterGroup) {
				for (const groupParam of param.params) {
					determineEndOffset(cmdClass, cmd, groupParam, param.params);
				}
			}
		}
	});
}

async function xml2json(xmlString: string): Promise<jsonSpec.ZwaveSpec> {
	// Convert to (somewhat) easier to use JSON-representation-of-XML
	const xml = parser.parse(xmlString, {
		attributeNamePrefix: "",
		ignoreAttributes: false,
		parseAttributeValue: true,
	}) as ZwClassesXml;

	// Apply fixups on XML definition
	fixDuplicateParamKey(xml);

	// Convert XML definition of each class into our own JSON definition
	const classes = toArray(xml.zw_classes.cmd_class).map(generateCommandClass);

	// Build commandclass+version map and convert from JSON to native in-memory
	// representation (i.e. using 'real' references instead of reference strings)
	const commandsByClassByVersion = convertFromJsonCommandClasses(classes);

	applyFixes(commandsByClassByVersion);
	assignSourceReferences(commandsByClassByVersion);
	assignAutogenerated(commandsByClassByVersion);
	determineEndOffsets(commandsByClassByVersion);

	const newClasses: spec.CommandClassDefinition[] = [];
	for (const versions of commandsByClassByVersion.values()) {
		for (const cmdClass of versions.values()) {
			newClasses.push(cmdClass);
		}
	}

	// Generate final output JSON structure, by adding header and stripping out unwanted members
	const spec: jsonSpec.ZwaveSpec = {
		xmlVersion: xml.zw_classes.version,
		jsonVersion: jsonSpec.JSON_VERSION,
		classes: newClasses.map((cmdClassFull) => {
			const { commandsById, ...cmdClass } = cmdClassFull;
			return {
				...cmdClass,
				commands: cmdClass.commands.map(convertToJsonCommand),
			};
		}),
	};
	return spec;
}

main(async () => {
	const rootDir = path.resolve(".");

	// Read official ZWave XML specification
	const xmlFilename = path.resolve(rootDir, "spec", "ZWave_cmd_classes.xml");
	const xmlString = (await pfs.readFile(xmlFilename)).toString();

	// Read official ZWave XML specification
	const json = await xml2json(xmlString);

	const jsonFilename = path.resolve(
		rootDir,
		"src",
		"generated",
		"zwave.json"
	);
	await pfs.writeFile(jsonFilename, JSON.stringify(json, undefined, "\t"));
});
