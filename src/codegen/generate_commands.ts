import "source-map-support/register";
import main from "async-main";
import { promises as pfs, existsSync } from "fs";
import * as path from "path";
import * as Case from "case";
import * as assert from "assert";

import * as types from "../commands/types";

/**
 * 'Map' over all key/values of a Map, and return an array of all the results.
 */
function mapMap<K, V, R>(
	map: Map<K, V>,
	cb: (value: V, key: K, map: Map<K, V>) => R
): R[] {
	let result: R[] = [];
	map.forEach((v, k, m) => result.push(cb(v, k, m)));
	return result;
}

/**
 * Having undefined lines is easier for conditional generation.
 */
type Lines = (string | undefined)[];

function createKeyValues(): types.EnumValues {
	return Object.create(null);
}

function sortKeyValues(keyValues: types.EnumValues): types.EnumValues {
	const keys = Object.keys(keyValues).sort();
	const result = createKeyValues();
	for (const key of keys) {
		result[key] = keyValues[key];
	}
	return result;
}

function jsonify(value: unknown): Lines {
	return JSON.stringify(value, undefined, "\t").split("\n");
}

function indent(lines: string[]): string[] {
	return lines.map((line) => (line === "" ? "" : `\t${line}`));
}

class CommandClassGenerator {
	public static generate(cmdClass: types.CommandClassDefinition): Lines {
		return new CommandClassGenerator(cmdClass)._generate();
	}

	private _class: types.CommandClassDefinition;

	private _enums = new Map<string, types.EnumValues>();
	private _enumsCanonical = new Map<string, string>();

	private constructor(cmdClass: types.CommandClassDefinition) {
		this._class = cmdClass;
	}

	private _registerEnum(name: string, values: types.EnumValues): string {
		// Create unique name, unless it's the same enum
		const origName = Case.pascal(name);
		name = `${origName}Enum`;
		const canonicalEnum = JSON.stringify(sortKeyValues(values));
		for (let i = 2; this._enumsCanonical.has(name); i++) {
			// If it happens to be the exact same enum, it's OK to re-use it
			if (this._enumsCanonical.get(name) === canonicalEnum) {
				break;
			}
			// Renumber, starting with ....2 seems to make more sense
			// TODO Prefix both enums with name of command instead? Seems more logical than StatusEnum, Status2Enum, Status3Enum
			name = `${origName}${i}Enum`;
			// TODO check whether these enums are indeed really different, and if so,
			// need a proper name, or they are actually quite similar and need to be
			// merged into one
			//console.log("### NOT SAME", this._class.name, name);
		}
		this._enumsCanonical.set(name, canonicalEnum);
		this._enums.set(name, values);
		return name;
	}

	private _generateCommandsEnum(className: string): Lines {
		const lines: Lines = [];
		lines.push(`export enum ${className}Commands {`);
		for (const cmd of this._class.commands) {
			lines.push(
				`\t${cmd.name} = 0x${cmd.command
					.toString(16)
					.padStart(2, "0")},`
			);
		}
		lines.push(`}`);
		return lines;
	}

	private _generate(): Lines {
		const contents: Lines = [];

		// Header
		contents.push(
			`/**`,
			` * ${this._class.help}, version ${this._class.version}.`,
			` *`,
			` * Auto-generated, do not edit.`,
			` */`,
			``,
			`import { CommandClassPacket, CommandPacket } from "../commands/command";`,
			`import { Packet } from "../commands/packet";`,
			`import { CommandDefinition } from "../commands/types";`,
			`import CommandClasses from "../generated/CommandClasses";`,
			``
		);

		const className = `${this._class.name}V${this._class.version}`;
		contents.push(...this._generateCommandsEnum(className), ``);

		for (const cmd of this._class.commands) {
			contents.push(
				...this._generateCommandDataInterface(className, cmd)
			);
		}

		contents.push(...this._generateEnums());

		contents.push(...this._generateCommandClass(className), ``);
		contents.push(...this._generateNamespace(className), ``);

		return contents;
	}

	private _generateEnums(): string[] {
		const contents: string[] = [];

		for (const [name, values] of this._enums) {
			contents.push(`export enum ${name} {`);
			const names = new Set<string>();
			for (const indexStr in values) {
				const index = parseInt(indexStr, 10);
				const valueName = values[index];
				let validName = valueName.name;
				if (!/^[a-zA-Z_]/.test(validName)) {
					// TODO move this logic to xml2json
					validName = "_" + validName; // Invalid identifier, prefix it
				}
				// Create unique name by appending number, if necessary
				let uniqueName = validName;
				for (let i = 0; names.has(uniqueName); i++) {
					uniqueName = `${validName}${i}`;
				}
				names.add(uniqueName);

				contents.push(`\t${uniqueName} = 0x${index.toString(16)},`);
			}
			contents.push(`}`, ``);
		}

		return contents;
	}

	private _generateCommandClass(className: string): Lines {
		const contents: Lines = [];

		if (this._class.status !== types.ObsolescenceStatus.Active) {
			contents.push(
				"// " + types.OBSOLESCENCE_STATUS_TO_STRING[this._class.status]
			);
		}

		contents.push(
			`export class ${className} extends CommandClassPacket<${className}Commands> {`
		);
		contents.push(
			...indent([
				`public static readonly commandClass = CommandClasses.${
					this._class.name
				}; // 0x${this._class.commandClass
					.toString(16)
					.padStart(2, "0")} (${this._class.commandClass})`,
				``,
				`public static matches(packet: Packet): boolean {`,
				`\treturn packet.commandClass === this.commandClass;`,
				`}`,
				``,
				`constructor(commandAndPayload: Buffer) {`,
				`\tsuper(${className}, commandAndPayload);`,
				`}`,
				``,
				...this._generateCommands(className),
			])
		);
		contents.push(`}`);

		return contents;
	}

	private _generateCommands(className: string): string[] {
		const contents: string[] = [];

		for (const command of this._class.commands) {
			const commandName = `${command.name}`;
			const dataName =
				command.params.length === 0
					? `void`
					: `${className}${command.name}Data`;
			contents.push(
				`public static readonly ${command.name} = class ${commandName} extends CommandPacket<${dataName}> {`
			);
			contents.push(
				...indent([
					`public static readonly CommandClass = ${className};`,
					`public static readonly command = 0x${command.command
						.toString(16)
						.padStart(2, "0")};`,
					`public static readonly definition = ${jsonify(
						command
					).join("\n\t\t")} as CommandDefinition;`,
					``,
					`static matches(packet: Packet): boolean {`,
					`	return packet.tryAs(${className})?.command === this.command;`,
					`}`,
					``,
					`constructor(data: Buffer | ${dataName}) {`,
					`	super(${commandName}, data);`,
					`}`,
				])
			);
			contents.push(`};`);
			contents.push(``);
		}

		return contents.slice(0, -1); // strip last empty line
	}

	private _generateCommandDataInterface(
		className: string,
		cmd: types.CommandDefinition
	): Lines {
		if (cmd.params.length === 0) {
			return [];
		}

		const contents: Lines = [];

		if (cmd.status !== types.ObsolescenceStatus.Active) {
			contents.push(
				"// " + types.OBSOLESCENCE_STATUS_TO_STRING[cmd.status]
			);
		}

		const typeName = `${className}${cmd.name}Data`;
		contents.push(`export interface ${typeName} {`);
		for (const param of cmd.params) {
			contents.push(...this._generateParam(param));
		}
		contents.push(`}`, ``);

		return contents;
	}

	private _generateParam(
		param: types.Parameter | types.ParameterGroup
	): Lines {
		const contents: Lines = [];

		const isOptional = param.optional !== undefined;
		switch (param.type) {
			case types.ParameterType.Integer:
				{
					if (param.length === 0) {
						// TODO remove me
						contents.push(
							`\t// TODO param ${param.name} type bitmask or marker`
						);
					} else {
						const isExplicit =
							(param.lengthOf && param.lengthOf.isExplicit) ||
							(param.presenceOf && param.presenceOf.isExplicit);
						const autoGenerated =
							!isExplicit &&
							((param.lengthOf && !param.lengthOf.isExplicit) ||
								(param.presenceOf &&
									!param.presenceOf.isExplicit));
						if (!param.reserved && !autoGenerated) {
							contents.push(
								`\t${param.name}${
									isOptional ? "?" : ""
								}: number; // ${
									param.length
								} byte unsigned integer`
							);
						}
					}
				}
				break;

			case types.ParameterType.Enum:
				{
					const enumName = this._registerEnum(
						param.name,
						param.values
					);
					contents.push(
						`\t${param.name}${
							isOptional ? "?" : ""
						}: ${enumName}; // 1 byte enum value`
					);
				}
				break;

			case types.ParameterType.Bitfield:
				{
					const msbFirstFields = param.fields.sort(
						(f1, f2) => f2.shift - f1.shift
					);
					for (const field of msbFirstFields) {
						const isExplicit =
							(field.lengthOf && field.lengthOf.isExplicit) ||
							(field.presenceOf && field.presenceOf.isExplicit);
						const autoGenerated =
							!isExplicit &&
							((field.lengthOf && !field.lengthOf.isExplicit) ||
								(field.presenceOf &&
									!field.presenceOf.isExplicit) ||
								field.isMoreToFollowFlag);
						if (field.reserved || autoGenerated) {
							continue;
						}
						const len = Math.log2((field.mask >> field.shift) + 1);
						let type: string;
						switch (field.type) {
							case types.BitfieldElementType.Boolean:
								type = "boolean";
								break;
							case types.BitfieldElementType.Integer:
								type = "number";
								break;
							case types.BitfieldElementType.Enum:
								type = this._registerEnum(
									field.name,
									field.values!
								);
								break;
							default:
								throw new Error("unknown bitfield type");
						}
						const bits =
							field.type === types.BitfieldElementType.Boolean
								? `${field.shift}`
								: `${field.shift + len - 1}..${field.shift}`;
						contents.push(
							`\t${field.name}: ${type}; // ${param.name}[${bits}]`
						);
					}
				}
				break;

			/* case ParamType.ARRAY:
				{
					const attr = param.arrayattrib;
					let arrayType = attr.is_ascii ? "string" : "Buffer";
					if (param.arraylen !== undefined) {
						throw new Error("unsupported `arraylen`");
					}
					assert(attr.key === 0);
					assert(attr.is_ascii === !attr.showhex);
					assert(attr.len > 0 && attr.len < 255);
					contents.push(`\t${param.name}: ${arrayType}; // ${param.type}, ${param.arrayattrib.len} bytes`);
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
					contents.push(`\t${param.name}: ${bitmaskType}; // ${param.type}, ${bitmaskLength}${enumText}`);
				}
				break;
			case ParamType.ENUM_ARRAY:
				{
					// This is only used in (ZWAVE_CMD_CLASS:NODE_INFO), and is basically equivalent
					// to a VARIANT with paramoffs==255 and encaptype CMD_CLASS_REF
					const values = new Map<number, string>();
					for (const enm of toArray(param.enum)) {
						values.set(enm.key, enm.name);
					}
					const enumType = registerEnum(param.name, values);
					contents.push(`\t${param.name}: ${enumType}[]; // ${param.type}`);
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
					contents.push(`\t${param.name}: number; // ${param.type}`);
				}
				break;
			case ParamType.VARIANT:
				{
					const v = param.variant;
					assert(v.signed === true); // Seems to be unused?
					if (v.paramoffs === 255) {
						assert(v.sizemask === 0 && v.sizeoffs === 0);
					}
					// This is basically a variable-length Buffer or string
					// TODO Handle sizechange (can be e.g. -1 or -2), apparently means to
					// include that number of previous bytes into the payload
					let variantType = v.is_ascii ? "string" : "Buffer";
					const isOptional = param.optionalmask !== undefined; // optionaloffs = param ID, mask = AND mask, present if result after mask > 0
					const lengthStr = v.paramoffs === 255 ? `according to message length` : `by param[${v.paramoffs}] & ${v.sizemask} >> ${v.sizeoffs}`;
					contents.push(`\t${param.name}${isOptional ? "?" : ""}: ${variantType}; // ${param.type}, length ${lengthStr}`);
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
				contents.push(`\t${param.name}: Array<{ // VARIANT_GROUP`);
				const nestedParams = toArray(param.param);
				processParams(nestedParams, `\t\t`);
				contents.push(`\t}>;`);
				break;
			case ParamType.MARKER:*/
			default:
				contents.push(
					`\t// TODO param ${param.name} type ${param.type}`
				);
		}
		return contents;
	}

	private _generateNamespace(className: string): Lines {
		const contents: Lines = [];

		contents.push(`export namespace ${className} {`);
		contents.push(
			...this._class.commands.map(
				(command) =>
					`\texport type ${command.name} = InstanceType<typeof ${className}.${command.name}>;`
			)
		);
		contents.push(`}`);

		return contents;
	}
}

main(async () => {
	const rootDir = path.resolve(".");
	const outDir = path.resolve(rootDir, "src", "generated");

	// Read JSON ZWave specification
	const jsonText = await pfs.readFile(
		path.resolve(rootDir, "src", "generated", "zwave.json"),
		"utf8"
	);
	const spec = JSON.parse(jsonText) as types.ZwaveSpec;

	assert(
		spec.jsonVersion === types.JSON_VERSION,
		"Unsupported JSON spec version"
	);

	// Iterate over JSON structure, generate our own structure
	for (const cmdClass of spec.classes) {
		const lines = CommandClassGenerator.generate(cmdClass);

		const className = `${cmdClass.name}V${cmdClass.version}`;
		const filename = path.resolve(outDir, `${className}.ts`);
		await pfs.writeFile(
			filename,
			lines.filter((l) => l !== undefined).join("\n")
		);
	}

	// Build an enum of all available command classes.
	// Note: COMMAND_CLASS_ALARM was renamed to COMMAND_CLASS_NOTIFICATION,
	// so this Map has key and value 'reversed' to what you'd expect.
	const classes = new Map<string, number>();
	for (const cmdClass of spec.classes) {
		classes.set(cmdClass.name, cmdClass.commandClass);
	}
	const classesContents = [
		`/**`,
		` * List of all Z-Wave command classes.`,
		` */`,
		``,
		`export enum CommandClasses {`,
		`\t${mapMap(
			classes,
			(v, k) =>
				`${k} = 0x${v
					.toString(16)
					.padStart(2, "0")}, // (${v.toString()})`
		).join("\n\t")}`,
		`};`,
		``,
		`export default CommandClasses;`,
	].join("\n");
	await pfs.writeFile(
		path.resolve(outDir, "CommandClasses.ts"),
		classesContents
	);
});
