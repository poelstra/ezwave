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

import "source-map-support/register";

import main from "async-main";
import * as parser from "fast-xml-parser";
import { promises as pfs } from "fs";
import * as path from "path";
import * as assert from "assert";
import * as types from "./types";

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
}

interface VariantGroup {
	key: number;
	name: string; // Only "vg", "vg1", "Statistics" really used
	typehashcode: ParamType.VARIANT_GROUP; // Seems to be always 0x0D, so more of a ParamType
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

enum ParamType {
	BYTE = 0x01,
	WORD = 0x02,
	DWORD = 0x03,
	BIT_24 = 0x04,
	ARRAY = 0x05,
	BITMASK = 0x06,
	STRUCT_BYTE = 0x07,
	ENUM = 0x08,
	ENUM_ARRAY = 0x09,
	MULTI_ARRAY = 0x0a,
	CONST = 0x0b,
	VARIANT = 0x0c,
	VARIANT_GROUP = 0x0d, // carried in variant_group tag, instead of param tag, yet useful to have it defined here
	MARKER = 0x0e,
}

type Param =
	| ByteParam
	| WordParam
	| DwordParam
	| Bit24Param
	| ArrayParam
	| BitmaskParam
	| StructByteParam
	| EnumParam
	| EnumArrayParam
	| MultiArrayParam
	| ConstParam
	| VariantParam
	| MarkerParam;

interface ParamBase {
	//typehashcode: ParamType;
	key: number;
	name: string;
	comment?: string;
	type: keyof typeof ParamType;
	encaptype?: Encaptype; // TODO Is this on param or one of its subtypes?
	optionaloffs?: number;
	optionalmask?: number;
}

enum Encaptype {
	CmdClassRef = "CMD_CLASS_REF",
	CmdData = "CMD_DATA",
	CmdEncap = "CMD_ENCAP",
	CmdRef = "CMD_REF",
	GenDevRef = "GEN_DEV_REF",
	NodeNumber = "NODE_NUMBER",
	SpecDevRef = "SPEC_DEV_REF",
}

interface ByteParam extends ParamBase {
	type: "BYTE";
	typehashcode: ParamType.BYTE;
	valueattrib: Valueattrib;
	bitflag: MaybeArray<ValueDef>; // Present if valueattrib.hasdefines === true
}

interface Valueattrib {
	key: 0; // Always zero
	hasdefines: boolean;
	showhex: boolean;
}

interface WordParam extends ParamBase {
	type: "WORD";
	typehashcode: ParamType.WORD;
	word: Valueattrib; // word.hasdefines should be false
}

interface DwordParam extends ParamBase {
	type: "DWORD";
	typehashcode: ParamType.DWORD;
	dword: Valueattrib; // dword.hasdefines should be false
}

interface Bit24Param extends ParamBase {
	type: "BIT_24";
	typehashcode: ParamType.BIT_24;
	bit_24: Valueattrib; // bit_24.hasdefines should be false
}

interface ArrayParam extends ParamBase {
	type: "ARRAY";
	typehashcode: ParamType.ARRAY;
	arrayattrib: Arrayattrib; // .len = [0..254] for fixed length, 255 for arraylen field
	arraylen?: Arraylen; // never used in current specs
}

interface Arrayattrib {
	key: number; // should be 0
	len: number;
	is_ascii: boolean;
	showhex?: boolean;
}

interface Arraylen {
	// Never used in current specs
	key: number; // should be 1
	paramoffs: number;
	lenmask: number;
	lenoffs: number;
}

interface BitmaskParam extends ParamBase {
	type: "BITMASK";
	typehashcode: ParamType.BITMASK;
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
	lenoffs: number;
	len?: number;
}

interface StructByteParam extends ParamBase {
	type: "STRUCT_BYTE";
	typehashcode: ParamType.STRUCT_BYTE;
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
	shifter: number; // Number of times to shift right after masking to obtain actual value (e.g. 4)
}

interface Fieldenum {
	key: number; // Defines order among other fields in same param
	fieldname: string;
	fieldmask: number;
	shifter: number;
	fieldenum: MaybeArray<FieldenumElement>;
}

interface FieldenumElement {
	key?: number;
	value: string;
}

interface EnumParam extends ParamBase {
	type: "ENUM";
	typehashcode: ParamType.ENUM;
	enum: MaybeArray<EnumElement>;
}

interface EnumElement {
	key: number; // TODO not sure if key could be optional
	name: string;
}

interface EnumArrayParam extends ParamBase {
	type: "ENUM_ARRAY";
	typehashcode: ParamType.ENUM_ARRAY;
	enum: MaybeArray<EnumElement>;
}

interface MultiArrayParam extends ParamBase {
	type: "MULTI_ARRAY";
	typehashcode: ParamType.MULTI_ARRAY;
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
	type: "CONST";
	typehashcode: ParamType.CONST;
	const: MaybeArray<ValueDef>;
}

interface VariantParam extends ParamBase {
	type: "VARIANT";
	typehashcode: ParamType.VARIANT;
	variant: Variant;
	skipfield?: boolean;
}

interface MarkerParam extends ParamBase {
	type: "MARKER";
	typehashcode: ParamType.MARKER;
	const: MaybeArray<Const>;
}

interface Const {
	key: number;
	flagname: string;
	flagmask: number;
}

interface Variant {
	paramoffs: number;
	showhex: boolean;
	signed: boolean;
	sizemask: number;
	sizeoffs: number;
	is_ascii?: boolean;
	sizechange?: number; // E.g. -1 or -2, means to include one or two previous bytes
}

function generateBitfields(param: StructByteParam): types.BitfieldElement[] {
	let result: types.BitfieldElement[] = [];
	for (const flag of toArray(param.bitflag)) {
		// Remap key to just append at end in case of duplicate, e.g.
		// necessary for COMMAND_CLASS_ZIP:COMMAND_ZIP_PACKET
		const key = !result[flag.key] ? flag.key : result.length;
		result[key] = {
			type: types.BitfieldElementType.Boolean,
			name: flag.flagname,
			mask: flag.flagmask,
			shift: Math.log2(flag.flagmask),
		};
	}
	for (const field of toArray(param.bitfield)) {
		const key = !result[field.key] ? field.key : result.length;
		result[key] = {
			type: types.BitfieldElementType.Integer,
			name: field.fieldname,
			mask: field.fieldmask,
			shift: field.shifter,
		};
	}
	for (const enm of toArray(param.fieldenum)) {
		const values = createKeyValues();
		// Enums are either auto-numbered, or specifically numbered
		// Convert into explicitly numbered elements
		let size = 0;
		for (const val of toArray(enm.fieldenum)) {
			if (val.key !== undefined) {
				values[val.key] = val.value;
			} else {
				values[size] = val.value;
			}
			size++;
		}
		const key = !result[enm.key] ? enm.key : result.length;
		result[key] = {
			type: types.BitfieldElementType.Enum,
			name: enm.fieldname,
			mask: enm.fieldmask,
			shift: enm.shifter,
			values,
		};
	}

	// Filter gaps (e.g. some param definitions skip entries)
	// TODO check consequences
	result = result.filter(elem => elem);

	// Sanity check
	for (const field of result) {
		const len = Math.log2((field.mask >> field.shift) + 1);
		assert((Math.pow(2, len) - 1) << field.shift === field.mask);
	}

	return result;
}

function buildParamRef(
	key: number,
	mainMap: Map<number, string>,
	groupMap?: Map<number, string>
): types.ParameterReference {
	const isParentReference = key >= 128 ? true : undefined; // Less noisy in JSON
	if (isParentReference && !groupMap) {
		throw new Error(`invalid parent parameter reference, not in a group`);
	}

	if (isParentReference) {
		key -= 128;
	}

	const map = groupMap && !isParentReference ? groupMap : mainMap;

	const name = map.get(key);
	if (name === undefined) {
		throw new Error(
			`cannot find parameter ${key} in ${
				map === groupMap ? "group" : "main"
			} map`
		);
	}

	return {
		name,
		isParentReference,
	};
}

function generateParameter(
	param: Param | VariantGroup,
	mainIdMap: Map<number, string>,
	groupIdMap?: Map<number, string>
): types.Parameter | types.ParameterGroup {
	let optional: types.OptionalInfo | undefined;
	if (
		typeof param.optionalmask === "number" &&
		typeof param.optionaloffs === "number"
	) {
		// optionaloffs is parameter ID, optionalmask is AND-mask, if result is >0, param is present
		optional = {
			...buildParamRef(param.optionaloffs, mainIdMap, groupIdMap),
			mask: param.optionalmask,
		};
	}

	const paramBase = {
		name: param.name,
		optional,
	};

	switch (param.typehashcode) {
		case ParamType.BYTE:
			{
				// If the value happens to be one of the enum values, use it, otherwise
				// just display the number itself
				let values: types.KeyValues | undefined;
				if (param.valueattrib.hasdefines) {
					values = createKeyValues();
					for (const flag of toArray(param.bitflag)) {
						values![flag.flagmask] = flag.flagname;
					}
				}
				return {
					type: "integer",
					...paramBase,
					length: 1,
					valueType: encaptypeToValueType(param.encaptype),
					values,
				};
			}
			break;

		case ParamType.ENUM:
			{
				// ENUM is old version of CONST
				const values = createKeyValues();
				for (const enm of toArray(param.enum)) {
					values[enm.key] = enm.name;
				}
				return {
					type: "enum",
					...paramBase,
					length: 1,
					optional,
					valueType: encaptypeToValueType(param.encaptype),
					values,
				};
			}
			break;

		case ParamType.CONST:
			{
				// CONST is newer (more flexible because flagmask is decoupled from key) version of ENUM
				const values = createKeyValues();
				for (const enm of toArray(param.const)) {
					values[enm.flagmask] = enm.flagname;
				}
				return {
					type: "enum",
					...paramBase,
					length: 1,
					optional,
					valueType: encaptypeToValueType(param.encaptype),
					values,
				};
			}
			break;

		case ParamType.WORD:
			return {
				type: "integer",
				...paramBase,
				length: 2,
				optional,
			};
			break;

		case ParamType.BIT_24:
			return {
				type: "integer",
				...paramBase,
				length: 3,
				optional,
			};
			break;

		case ParamType.DWORD:
			return {
				type: "integer",
				...paramBase,
				length: 4,
				optional,
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
				assert(attr.is_ascii === !attr.showhex);
				assert(attr.len > 0 && attr.len < 255);
				assert(!param.encaptype);

				if (attr.is_ascii) {
					return {
						type: "text",
						...paramBase,
						length: attr.len,
						optional,
					};
				} else {
					return {
						type: "blob",
						...paramBase,
						length: attr.len,
						optional,
					};
				}
			}
			break;

		case ParamType.VARIANT:
			{
				const attr = param.variant;
				assert(attr.signed === true); // Seems to be unused?
				if (attr.paramoffs === 255) {
					assert(attr.sizemask === 0 && attr.sizeoffs === 0);
				}

				let length: types.LengthInfo;
				if (attr.paramoffs === 255) {
					length = "auto";
				} else {
					length = {
						...buildParamRef(attr.paramoffs, mainIdMap, groupIdMap),
						mask: attr.sizemask,
						shift: attr.sizeoffs,
					};
				}
				if (attr.is_ascii) {
					return {
						type: "text",
						...paramBase,
						length,
						optional,
					};
				} else {
					const valueType = encaptypeToValueType(param.encaptype);
					if (valueType) {
						return {
							type: "enumarray",
							...paramBase,
							length,
							valueType,
							optional,
						};
					} else {
						const blobType = encapTypeToBlobType(param.encaptype);
						return {
							type: "blob",
							...paramBase,
							length,
							blobType,
							optional,
							includeBytesBefore: param.variant.sizechange
								? -param.variant.sizechange
								: undefined,
						};
					}
				}
			}
			break;

		case ParamType.STRUCT_BYTE:
			{
				return {
					type: "bitfield",
					...paramBase,
					length: 1,
					optional,
					fields: generateBitfields(param),
					cmdMask: param.cmd_mask,
				};
			}
			break;

		/*		case ParamType.BITMASK:
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

		case ParamType.ENUM_ARRAY:
			{
				// This is only used in (ZWAVE_CMD_CLASS:NODE_INFO), and is basically equivalent
				// to a VARIANT with paramoffs==255 and encaptype CMD_CLASS_REF
				const valueType = encaptypeToValueType(param.encaptype);
				assert(valueType, "only ENUM_ARRAY with encaptype supported");
				/* Ignore the actual enum values, as they're simply the command classes.
				const values = createKeyValues();
				for (const enm of toArray(param.enum)) {
					values[enm.key] = enm.name;
				}*/
				return {
					type: "enumarray",
					...paramBase,
					length: "auto",
					optional,
					valueType: valueType!,
				};
			}
			break;

		case ParamType.MULTI_ARRAY:
			{
				const elems = toArray(param.multi_array);
				const descloc = (elems.find(
					elem => (elem as any).paramdescloc
				) as MultiArrayParamDescLoc).paramdescloc;
				assert(
					descloc &&
						descloc.key === 0 &&
						descloc.paramdesc === 255 &&
						descloc.param === descloc.paramstart
				);
				const valueType = encaptypeToValueType(param.encaptype);
				let enums: { [enumIndex: number]: types.KeyValues } | undefined;
				if (!valueType) {
					// XML configuration looks like a bunch of these:
					// <multi_array>
					//   <bitflag key="0x05" flagname="SPECIFIC_TYPE_NOT_USED" flagmask="0x00" />
					//   <bitflag key="0x05" flagname="SPECIFIC_TYPE_SIMPLE_DISPLAY" flagmask="0x01" />
					// </multi_array>
					enums = Object.create(null);
					// Remove the <paramdescloc> element
					const bitflags = elems.filter(
						elem => (elem as any).bitflag
					) as MultiArrayParamBitFlags[];
					// Keep only the <bitflag> tags
					const valuedefs = bitflags.map(elem =>
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
							enums![key][v.flagmask] = v.flagname;
						}
					}
				}
				// A multi-array is basically a union of enums, where the specific enum is chosen based on
				// the value of another parameter (i.e. descloc.param)
				return {
					type: "enumunion",
					...paramBase,
					length: 1,
					optional,
					reference: buildParamRef(
						descloc.param,
						mainIdMap,
						groupIdMap
					),
					enums,
					valueType,
				};
			}
			break;

		case ParamType.VARIANT_GROUP:
			{
				// Nested set of params (only once, i.e. there cannot be a variant-group-in-variant-group)
				// paramOffs, sizemask, sizeoffs determine how many times the group is present, or determined
				// from message length (paramOffs === 255).
				// Alternatively, moretofollowoffs and moretofollowmask can be used to denote number of
				// groups (paramOffs === 255).
				// optionaloffs and optionalmask determine whether the group is present at all.
				// paramOffs and optionaloffs indicate a parameter ID in the 'root' params,
				// moretofollowoffs indicates a parameter ID in the group itself.
				// Note: Size of each element is dynamic, i.e. it can depend on presence of e.g. VARIANT
				// inside the group (e.g. COMMAND_CLASS_MULTI_CMD:MULTI_CMD_ENCAP)
				assert(
					param.variantKey === 0,
					"only single groups supported yet"
				); // TODO Check what happens if we have more than one

				const groupIdMap = new Map<number, string>();
				toArray(param.param).forEach(p =>
					groupIdMap.set(p.key, p.name)
				);

				const params = toArray(param.param).map(p =>
					generateParameter(p, mainIdMap, groupIdMap)
				) as types.Parameter[];
				let moreToFollow: types.MoreToFollowInfo | undefined;
				let length: types.LengthInfo;
				if (param.paramOffs === 255) {
					length = "auto";
					if (
						typeof param.moretofollowoffs === "number" &&
						typeof param.moretofollowmask === "number"
					) {
						moreToFollow = {
							name: buildParamRef(
								param.moretofollowoffs,
								mainIdMap,
								groupIdMap
							).name,
							mask: param.moretofollowmask,
						};
					}
				} else {
					assert(
						param.moretofollowoffs === undefined &&
							param.moretofollowmask === undefined
					);
					// Note: for groups, length is indicated as number of elements, not bytes
					length = {
						...buildParamRef(param.paramOffs, mainIdMap), // paramOffs is always in main group
						mask: param.sizemask,
						shift: param.sizeoffs,
					};
				}
				return {
					type: "group",
					...paramBase,
					length,
					moreToFollow,
					optional,
					params,
				};
			}
			break;

		case ParamType.MARKER:
		default:
			//contents.push(`// TODO param type ${param.typehashcode}`);
			console.log("TODO", param.typehashcode);
			return {
				type: "integer",
				...paramBase,
				length: 0,
			};
	}
}

function generateCommand(cmdClass: CommandClass, cmd: Command): types.Command {
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
	params = params.filter(elem => elem);

	const idMap = new Map<number, string>();
	params.forEach(param => idMap.set(param.key, param.name));

	let command: types.Command = {
		id: cmd.key,
		name: cmd.name,
		status: commentToStatus(cmd.comment),
		cmdMask: cmd.cmd_mask,
		params: params.map(p => generateParameter(p, idMap)),
	};

	// Add cmdMask, if necessary
	if (typeof cmd.cmd_mask === "number") {
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

function generateCommandClass(cmdClass: CommandClass): types.CommandClass {
	const commands = toArray(cmdClass.cmd).map(cmd =>
		generateCommand(cmdClass, cmd)
	);
	return {
		id: cmdClass.key,
		name: cmdClass.name,
		status: commentToStatus(cmdClass.comment),
		version: cmdClass.version,
		commands: commands,
	};
}

function commentToStatus(comment: string | undefined): types.Status {
	switch (comment) {
		case "[OBSOLETED]":
			return types.Status.Obsolete;
		case "[DEPRECATED]":
			return types.Status.Deprecated;
		default:
			return types.Status.Active;
	}
}

function encapTypeToBlobType(encaptype?: string): types.BlobType | undefined {
	if (!encaptype) {
		return undefined;
	}
	switch (encaptype) {
		case "CMD_DATA":
			return types.BlobType.CmdData;
		case "CMD_ENCAP":
			return types.BlobType.CmdEncapsulation;
		default:
			throw new Error("Unsupported blob encaptype");
	}
}

function encaptypeToValueType(encaptype?: string): types.ValueType | undefined {
	if (!encaptype) {
		return undefined;
	}
	switch (encaptype) {
		case "NODE_NUMBER":
			return types.ValueType.NodeNumber;
		case "CMD_CLASS_REF":
			return types.ValueType.CommandClass;
		case "CMD_REF":
			return types.ValueType.Command;
		case "GEN_DEV_REF":
			return types.ValueType.GenericDevice;
		case "SPEC_DEV_REF":
			return types.ValueType.SpecificDevice;
		case "CMD_DATA":
		case "CMD_ENCAP":
			// known, but a blob type, not value type
			return undefined;
		default:
			throw new Error("Unsupported encaptype");
	}
}

function createKeyValues(): types.KeyValues {
	return Object.create(null);
}

function fixDuplicateParamKey(xml: ZwClassesXml): void {
	// TODO Fix COMMAND_CLASS_WINDOW_COVERING:WINDOW_COVERING_REPORT having
	// a duplicate parameter key
	const cmdClasses = toArray(xml.zw_classes.cmd_class).filter(
		c => c.name === "COMMAND_CLASS_WINDOW_COVERING"
	);
	if (!cmdClasses.length) {
		throw new Error("Can't find COMMAND_CLASS_WINDOW_COVERING");
	}
	for (const cmdClass of cmdClasses) {
		const cmd = toArray(cmdClass.cmd).find(
			c => c.name === "WINDOW_COVERING_REPORT"
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

async function xml2json(xmlString: string): Promise<types.ZwaveSpec> {
	// Convert to (somewhat) easier to use JSON
	const xml = parser.parse(xmlString, {
		attributeNamePrefix: "",
		ignoreAttributes: false,
		parseAttributeValue: true,
	}) as ZwClassesXml;

	fixDuplicateParamKey(xml);

	// Iterate over JSON structure, generate our own structure
	const spec: types.ZwaveSpec = {
		xmlVersion: xml.zw_classes.version,
		jsonVersion: types.JSON_VERSION,
		classes: toArray(xml.zw_classes.cmd_class).map(generateCommandClass),
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
