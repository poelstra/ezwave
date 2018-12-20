import main from "async-main";
import * as parser from "fast-xml-parser";
import { promises as pfs, existsSync } from "fs";
import * as path from "path";
import "source-map-support/register";
import * as Case from "case";
import * as assert from "assert";

// TODO Handle cmd_mask.
// Seems to be used in some commands to re-use a few bits of the command field itself
// as the first parameter. In practice, I've only seen a command mask of 248 (i.e. the MSB 5 bits)
// for the command, and then a cmd_mask of 7 (i.e. LSB 3 bits) on the first parameter.

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
	}
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
	comment: string;
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
	MULTI_ARRAY = 0x0A,
	CONST = 0x0B,
	VARIANT = 0x0C,
	VARIANT_GROUP = 0x0D, // carried in variant_group tag, instead of param tag, yet useful to have it defined here
	MARKER = 0x0E,
}

type Param = ByteParam | WordParam | DwordParam | Bit24Param | ArrayParam | BitmaskParam |
		StructByteParam | EnumParam | EnumArrayParam | MultiArrayParam |
		ConstParam | VariantParam | MarkerParam;

interface ParamBase {
	//typehashcode: ParamType;
	key: number;
	name: string;
	comment?: string;
	type: keyof typeof ParamType;
	encaptype?: Encaptype; // TODO Is this on param or one of its subtypes?
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
	bitflag: MaybeArray<BitflagElement>; // Present if valueattrib.hasdefines === true
	optionaloffs?: number;
	optionalmask?: number;
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

interface Arraylen { // Never used in current specs
	key: number; // should be 1
	paramoffs: number;
	lenmask: number;
	lenoffs: number;
}

interface BitmaskParam extends ParamBase {
	type: "BITMASK";
	typehashcode: ParamType.BITMASK;
	bitmask: Bitmask;
	bitflag: MaybeArray<BitflagElement>;
}

interface BitflagElement {
	key: number; // Defines order among other fields in same param
	flagname: string; // Name, e.g. "External Alarm"
	flagmask: number; // Value of bit as mask (i.e. 1, 2, 4, 8, ...)
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
	bitflag: MaybeArray<BitflagElement>; // Represents a number of single-bit flags
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
	optionaloffs?: number;
	optionalmask?: number;
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
	bitflag: MaybeArray<BitflagElement>;
}

interface ConstParam extends ParamBase {
	type: "CONST";
	typehashcode: ParamType.CONST;
	const: MaybeArray<BitflagElement>;
}

interface VariantParam extends ParamBase {
	type: "VARIANT";
	typehashcode: ParamType.VARIANT;
	variant: Variant;
	optionaloffs?: number;
	optionalmask?: number;
	skipfield?: boolean;
}

interface MarkerParam extends ParamBase {
	type: "MARKER";
	typehashcode: ParamType.MARKER;
	"const": MaybeArray<Const>;
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
}

function strip(txt: string): string {
	const lines = txt.split("\n");
	lines.shift();
	const indent = lines[0].length - lines[0].trimLeft().length;
	return lines.map((line) => line.substring(indent)).join("\n");
}

function mapMap<K, V, R>(map: Map<K, V>, cb: (value: V, key: K, map: Map<K, V>) => R): R[] {
	let result: R[] = [];
	map.forEach((v, k, m) => result.push(cb(v, k, m)));
	return result;
}

interface SimpleStructByteElement {
	type: StructByteElementType;
	name: string;
	shift: number;
	mask: number;
	values?: Map<number, string>; // Present if type is Enum
}

enum StructByteElementType {
	Flag,
	Field,
	Enum,
}

function simplifyStructByteParam(param: StructByteParam): SimpleStructByteElement[] {
	const result: SimpleStructByteElement[] = [];
	for (const flag of toArray(param.bitflag)) {
		// Remap key to just append at end in case of duplicate, e.g.
		// necessary for COMMAND_CLASS_ZIP:COMMAND_ZIP_PACKET
		const key = !result[flag.key] ? flag.key : result.length;
		result[key] = {
			type: StructByteElementType.Flag,
			name: flag.flagname,
			shift: Math.log2(flag.flagmask),
			mask: flag.flagmask,
		};
	}
	for (const field of toArray(param.bitfield)) {
		const key = !result[field.key] ? field.key : result.length;
		result[key] = {
			type: StructByteElementType.Field,
			name: field.fieldname,
			shift: field.shifter,
			mask: field.fieldmask,
		};
	}
	for (const enm of toArray(param.fieldenum)) {
		const values = new Map<number, string>();
		// Enums are either auto-numbered, or specifically numbered
		// Convert into explicitly numbered elements
		for (const val of toArray(enm.fieldenum)) {
			if (val.key !== undefined) {
				values.set(val.key, val.value);
			} else {
				values.set(values.size, val.value);
			}
		}
		const key = !result[enm.key] ? enm.key : result.length;
		result[key] = {
			type: StructByteElementType.Enum,
			name: enm.fieldname,
			shift: enm.shifter,
			mask: enm.fieldmask,
			values,
		};
	}
	// Filter gaps (e.g. some param definitions skip entries)
	return result.filter((elem) => elem);
}

async function generateCommandClass(outDir: string, cmdClass: CommandClass): Promise<void> {
	const className = `${Case.pascal(cmdClass.name)}V${cmdClass.version}`;
	const contents: string[] = [];

	// Prepare for enums
	type EnumValues = Map<number, string>;
	const enums = new Map<string, EnumValues>();
	const registerEnum = (name: string, values: EnumValues): string => {
		// Create unique name
		name = Case.pascal(name);
		const origName = name;
		for (let i = 0; enums.has(name); i++) {
			name = `${origName}${i}`;
		}
		name = name + "Enum";
		enums.set(name, values);
		return name;
	};

	// Generate command class
	contents.push(strip(`
		/* Auto-generated */

		// ${cmdClass.comment}
		export class ${className} {
			readonly commandClass = 0x${cmdClass.key.toString(16)}; // (${cmdClass.key});
		}
	`));

	// Output command frames
	for (const cmd of toArray(cmdClass.cmd)) {
		// Convert params and VariantGroups to a single array of params, in the right order
		let params: Array<Param | VariantGroup> = [];
		for (const param of toArray(cmd.param)) {
			//assert(!params[param.key], `duplicate parameter key for command 0x${cmdClass.key.toString(16)}:0x${cmd.key.toString(16)}`);
			// Remap key to just append at end in case of duplicate, e.g.
			// necessary for COMMAND_CLASS_ZIP:COMMAND_ZIP_PACKET
			const key = !params[param.key] ? param.key : params.length;
			params[key] = param;
		}
		for (const param of toArray(cmd.variant_group)) {
			//assert(!params[param.key], `duplicate parameter key for command 0x${cmdClass.key.toString(16)}:0x${cmd.key.toString(16)}`);
			const key = !params[param.key] ? param.key : params.length;
			params[key] = param;
		}
		// Skip undefined parameters (e.g. for COMMAND_CLASS_SECURITY:SECURITY_MESSAGE_ENCAPSULATION)
		params = params.filter((elem) => elem);
		
		const processParams = (params: Array<Param | VariantGroup>, indent = "\t"): void => {
			for (const param of params) {
				switch (param.typehashcode) {
					case ParamType.BYTE:
					case ParamType.WORD:
					case ParamType.DWORD:
					case ParamType.BIT_24:
					case ParamType.ENUM:
					case ParamType.CONST:
						{
							let isOptional = false;
							if ((param.typehashcode === ParamType.BYTE || param.typehashcode === ParamType.ENUM) &&
								param.optionalmask !== undefined) {
								isOptional = true;
								// optionaloffs is parameter ID, optionalmask is AND-mask, if result is >0, param is present
							}
							let numType = "number";
							if (param.typehashcode === ParamType.BYTE && param.valueattrib.hasdefines) {
								const values = new Map<number, string>();
								for (const flag of toArray(param.bitflag)) {
									values.set(flag.flagmask, flag.flagname);
								}
								// If the value happens to be one of the enum values, use it, otherwise
								// just display the number itself
								numType = registerEnum(param.name, values) + " | number";
							}
							if (param.typehashcode === ParamType.ENUM) {
								// ENUM is old version of CONST
								const values = new Map<number, string>();
								for (const enm of toArray(param.enum)) {
									values.set(enm.key, enm.name);
								}
								numType = registerEnum(param.name, values);
							}
							if (param.typehashcode === ParamType.CONST) {
								// CONST is newer (more flexible because flagmask is decoupled from key) version of ENUM
								const values = new Map<number, string>();
								for (const enm of toArray(param.const)) {
									values.set(enm.flagmask, enm.flagname);
								}
								numType = registerEnum(param.name, values);
							}
							contents.push(`${indent}${Case.camel(param.name)}${isOptional ? "?" : ""}: ${numType}; // ${param.type}`);
						}
						break;
					case ParamType.ARRAY:
						{
							let arrayType = param.arrayattrib.is_ascii ? "string" : "Buffer";
							if (param.arraylen !== undefined) {
								throw new Error("unsupported `arraylen`");
							}
							contents.push(`${indent}${Case.camel(param.name)}: ${arrayType}; // ${param.type}, ${param.arrayattrib.len} bytes`);
						}
						break;
					case ParamType.BITMASK:
						{
							// Sometimes the flagmasks are more like enums, sometimes more like 'real' bit mask (i.e. 0x01, 0x02, 0x04, 0x08)
							// HEURISTIC algorithm:
							// - If len === 1, and first element has value 0, all flags are enum style
							// - If len === 1, and first element !== 0, all flags are mask style
							// - If len === undefined, all flags are mask style (even if first value !== 0)
							// - If len !== undefined (and not 1), error (because we don't know what may happen)
							// This is verified by hand, by looking at all bitmasks in current XML
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
							contents.push(`${indent}${Case.camel(param.name)}: ${bitmaskType}; // ${param.type}, ${bitmaskLength}${enumText}`);
						}
						break;
					case ParamType.STRUCT_BYTE:
						{
							contents.push(`${indent}${Case.camel(param.name)}: { // ${param.type}`);
							const fields = simplifyStructByteParam(param);
							for (const field of fields) {
								const len = Math.log2((field.mask >> field.shift) + 1);
								assert((Math.pow(2, len) - 1) << field.shift === field.mask);
								let type: string;
								switch (field.type) {
									case StructByteElementType.Flag:
										type = "boolean";
										break;
									case StructByteElementType.Field:
										type = "number";
										break;
									case StructByteElementType.Enum:
										type = registerEnum(field.name, field.values!);
										break;
									default:
										throw new Error("unknown field type");
								};
								const bits = field.type === StructByteElementType.Flag ? `bit ${field.shift}` : `bits ${field.shift + len - 1}..${field.shift}`;
								contents.push(
									`${indent}\t${Case.camel(field.name)}: ${type}; // ${bits}`
								);
							}
							contents.push(`${indent}};`);
						}
						break;
					case ParamType.ENUM_ARRAY:
						{
							// TODO Not sure this is the right interpretation, but it seems it's
							// basically just a hardcoded list of enums, and only used once in a
							// kind of placeholder command class (i.e 0x01, ZWAVE_CMD_CLASS)
							const values = new Map<number, string>();
							for (const enm of toArray(param.enum)) {
								values.set(enm.key, enm.name);
							}
							const enumType = registerEnum(param.name, values);
							contents.push(`${indent}${Case.camel(param.name)}: ${enumType}[]; // ${param.type}`);
						}
						break;
					case ParamType.MULTI_ARRAY:
						{
							const descloc = (toArray(param.multi_array).find((elem) => (elem as any).paramdescloc) as MultiArrayParamDescLoc).paramdescloc;
							assert(descloc && descloc.key === 0 && descloc.paramdesc === 255 && descloc.param === descloc.paramstart);
							// A multi-array is basically a union of enums, where the specific enum is chosen based on
							// the value of another parameter (i.e. descloc.param)
							// TODO Generate all the enums, with names based on the enum values of the respective parameter,
							// then create the union of all these enums
							contents.push(`${indent}${Case.camel(param.name)}: number; // ${param.type}`);
						}
						break;
					case ParamType.VARIANT:
						{
							const v = param.variant;
							// This is basically a variable-length Buffer or string
							// TODO Handle sizechange (can be e.g. -1 or -2), apparently means to
							// include that number of previous bytes into the payload
							let variantType = v.is_ascii ? "string" : "Buffer";
							const isOptional = param.optionalmask !== undefined; // optionaloffs = param ID, mask = AND mask, present if result after mask > 0
							const lengthStr = v.paramoffs === 255 ? `according to message length` : `by param[${v.paramoffs}] & ${v.sizemask} >> ${v.sizeoffs}`;
							contents.push(`${indent}${Case.camel(param.name)}${isOptional ? "?" : ""}: ${variantType}; // ${param.type}, length ${lengthStr}`);
						}
						break;
					case ParamType.VARIANT_GROUP:
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
						assert(param.variantKey === 0);
						contents.push(`${indent}${Case.camel(param.name)}: Array<{ // VARIANT_GROUP`);
						const nestedParams = toArray(param.param);
						processParams(nestedParams, `${indent}\t`);
						contents.push(`${indent}}>;`);
						break;
					case ParamType.MARKER:
					default:
						contents.push(`// TODO param type ${param.typehashcode}`);
				}
			}
		};

		if (cmd.comment) {
			contents.push(`// ${cmd.comment}`);
		}
		contents.push(`export interface ${Case.pascal(cmd.name)} { // Command 0x${cmd.key.toString(16)} (${cmd.key})`);
		processParams(params);
		contents.push(`}`, "");
	}

	// Output enums
	for (const [name, values] of enums) {
		contents.push(`export enum ${name} {`);
		const names = new Set<string>();
		for (const [i, n] of values) {
			let validName = Case.pascal(n);
			if (!/^[a-zA-Z_]/.test(validName)) {
				validName = "_" + validName; // Invalid identifier, prefix it
			}
			// Create unique name by appending number, if necessary
			let uniqueName = validName;
			for (let i = 0; names.has(uniqueName); i++) {
				uniqueName = `${validName}${i}`;
			}
			names.add(uniqueName);

			contents.push(`\t${uniqueName} = 0x${i.toString(16)},`);
		}
		contents.push(`}`, "");
	}

	const filename = path.resolve(outDir, `${className}.ts`);
	await pfs.writeFile(filename, contents.join("\n"));
}

main(async () => {
	const rootDir = path.resolve(".");

	// Read official ZWave XML specification
	const xml = (await pfs.readFile(path.resolve(rootDir, "spec", "ZWave_cmd_classes.xml"))).toString();

	// Convert to somewhat easier to use JSON
	const parsed = parser.parse(xml, {
		attributeNamePrefix: "",
		ignoreAttributes: false,
		parseAttributeValue: true,
	}) as ZwClassesXml;
	//await pfs.writeFile("./generated/ZWave_cmd_classes.json", JSON.stringify(parsed));

	// Create output directory, if necessary
	const outDir = path.resolve(rootDir, "generated");
	if (!existsSync(outDir)) {
		await pfs.mkdir(outDir);
	}

	// Iterate over JSON structure, generate our own structure
	const classes = new Map<string, number>();
	for (const cmdClass of toArray(parsed.zw_classes.cmd_class)) {
		classes.set(cmdClass.name, cmdClass.key);

		await generateCommandClass(outDir, cmdClass);
	}

	const classesContents = strip(`
		/* Auto-generated */
		enum CommandClasses {
			${mapMap(classes, (v, k) => `${k} = 0x${v.toString(16).padStart(2, "0")}`).join(",\n\t\t\t")}
		};
		export default CommandClasses;
	`);
	await pfs.writeFile(path.resolve(outDir, "CommandClasses.ts"), classesContents);
});
