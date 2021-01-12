import * as assert from "assert";
import main from "async-main";
import { Parser } from "binary-parser";
import * as Case from "case";
import { promises as pfs } from "fs";
import * as path from "path";
import "source-map-support/register";
import * as jsonSpec from "../commands/jsonSpec";
import * as spec from "../commands/spec";
import {
	convertToJsonCommand,
	convertToJsonParams,
	convertFromJsonCommandClass,
	getReferencePath,
} from "../commands/specHelpers";

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

function createKeyValues(): spec.EnumValues {
	return Object.create(null);
}

function sortKeyValues(keyValues: spec.EnumValues): spec.EnumValues {
	const keys = Object.keys(keyValues).sort();
	const result = createKeyValues();
	for (const key of keys) {
		result[key] = keyValues[key];
	}
	return result;
}

function jsonifyCommandDefinition(command: spec.CommandDefinition): Lines {
	const jsonCommand = convertToJsonCommand(command);
	return JSON.stringify(jsonCommand, undefined, "\t").split("\n");
}

function indent(lines: string[]): string[] {
	return lines.map((line) => (line === "" ? "" : `\t${line}`));
}

function getLengthString(
	length: spec.LengthInfo,
	units: string = "bytes"
): string {
	if (typeof length === "number") {
		return `${length} ${units}`;
	} else {
		switch (length.lengthType) {
			case spec.LengthType.Automatic:
				return `automatic length`;

			case spec.LengthType.ParameterReference:
				// TODO If reference points to an explicit length prop,
				// mention that property.
				// const l = length;
				// return `length based on ${
				// 	l.isParentReference ? "../" : ""
				// }${l.ref}${
				// 	l.bitfield ? `.${l.bitfield.name}` : ""
				// }`;
				return `variable length`;

			case spec.LengthType.MoreToFollow:
				return `length based on MoreToFollow flag`;

			default:
				throw new Error("unexpected length type");
		}
	}
}

class CommandClassGenerator {
	public static generate(cmdClass: spec.CommandClassDefinition): Lines {
		return new CommandClassGenerator(cmdClass)._generate();
	}

	private _class: spec.CommandClassDefinition;

	private _enums = new Map<string, spec.EnumValues>();
	private _enumsCanonical = new Map<string, string>();
	private _incompleteCommands = new Set<number>();

	private constructor(cmdClass: spec.CommandClassDefinition) {
		this._class = cmdClass;
	}

	private _registerEnum(name: string, values: spec.EnumValues): string {
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
			`import * as jsonSpec from "../commands/jsonSpec";`,
			`import { Packet } from "../commands/packet";`,
			`import { convertFromJsonCommand } from "../commands/specHelpers";`,
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

		if (this._class.status !== spec.ObsolescenceStatus.Active) {
			contents.push(
				"// " + spec.OBSOLESCENCE_STATUS_TO_STRING[this._class.status]
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
			const isIncomplete = this._incompleteCommands.has(command.command);
			if (isIncomplete) {
				contents.push(
					`// TODO This command is not yet fully supported by the decoder/encoder`
				);
			}
			contents.push(
				`public static readonly ${command.name} = class ${commandName} extends CommandPacket<${dataName}> {`
			);
			contents.push(
				...indent([
					`public static readonly CommandClass = ${className};`,
					`public static readonly command = 0x${command.command
						.toString(16)
						.padStart(2, "0")};`,
					`public static readonly definition = convertFromJsonCommand(${jsonifyCommandDefinition(
						command
					).join("\n\t\t")} as jsonSpec.CommandDefinition);`,
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
		cmd: spec.CommandDefinition
	): Lines {
		if (cmd.params.length === 0) {
			return [];
		}

		const contents: Lines = [];

		if (cmd.status !== spec.ObsolescenceStatus.Active) {
			contents.push(
				"// " + spec.OBSOLESCENCE_STATUS_TO_STRING[cmd.status]
			);
		}

		const typeName = `${className}${cmd.name}Data`;
		contents.push(`export interface ${typeName} {`);
		for (const param of cmd.params) {
			contents.push(...this._generateParam(cmd, param));
		}
		contents.push(`}`, ``);

		return contents;
	}

	private _generateParam(
		cmd: spec.CommandDefinition,
		param: spec.LocalParameter | spec.ParameterGroup
	): string[] {
		const contents: string[] = [];

		const isOptional = param.optional !== undefined;
		switch (param.type) {
			case spec.ParameterType.Integer:
				{
					if (!param.reserved && !param.isAutogenerated) {
						contents.push(
							`\t${param.name}${
								isOptional ? "?" : ""
							}: number; // ${param.length} byte unsigned integer`
						);
					}
				}
				break;

			case spec.ParameterType.Enum:
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

			case spec.ParameterType.Bitfield:
				{
					const msbFirstFields = param.fields.sort(
						(f1, f2) => f2.shift - f1.shift
					);
					for (const field of msbFirstFields) {
						if (field.reserved || field.isAutogenerated) {
							continue;
						}
						const len = Math.log2((field.mask >> field.shift) + 1);
						let type: string;
						switch (field.fieldType) {
							case spec.BitfieldElementType.Boolean:
								type = "boolean";
								break;
							case spec.BitfieldElementType.Integer:
								type = "number";
								break;
							case spec.BitfieldElementType.Enum:
								type = this._registerEnum(
									field.name,
									field.values!
								);
								break;
							default:
								throw new Error("unknown bitfield type");
						}
						const bits =
							field.fieldType === spec.BitfieldElementType.Boolean
								? `${field.shift}`
								: `${field.shift + len - 1}..${field.shift}`;
						contents.push(
							`\t${field.name}: ${type}; // ${param.name}[${bits}]`
						);
					}
				}
				break;

			case spec.ParameterType.Blob:
			case spec.ParameterType.Text:
				{
					let typeStr: string;
					if (param.type === spec.ParameterType.Text) {
						typeStr = "string";
					} else {
						switch (param.blobType) {
							case spec.BlobType.NodeIds:
								typeStr = "number[]";
								break;

							case spec.BlobType.CommandClasses:
								typeStr = "CommandClasses[]";
								break;

							case spec.BlobType.CommandEncapsulation:
								typeStr = "Packet";
								break;

							default:
								typeStr = "Buffer";
						}
					}
					const lengthStr = getLengthString(param.length);
					contents.push(
						`\t${param.name}${
							isOptional ? "?" : ""
						}: ${typeStr}; // ${lengthStr}`
					);
				}
				break;

			case spec.ParameterType.ParameterGroup:
				{
					const lengthStr = getLengthString(param.length, "elements");
					contents.push(
						`\t${param.name}${
							isOptional ? "?" : ""
						}: Array<{ // ${lengthStr}`
					);
					for (const groupParam of param.params) {
						contents.push(
							...indent(this._generateParam(cmd, groupParam))
						);
					}
					contents.push(`\t}>;`);
				}
				break;

			case spec.ParameterType.EnumUnion:
				{
					const ref = param.reference;
					let typeNames: string[] = [];
					for (const [enumRefKey, enumValues] of Object.entries(
						param.enums
					)) {
						// Make the name of enum itself based on the name of the value
						// used to index this enumunion.
						const inputName = ref.values[enumRefKey].name;
						const enumName = this._registerEnum(
							inputName,
							enumValues
						);
						typeNames.push(enumName);
					}
					contents.push(
						`\t${param.name}${
							isOptional ? "?" : ""
						}: ${typeNames.join(
							" | "
						)}; // enum chosen by ${getReferencePath(ref)}, 1 byte`
					);
				}
				break;

			case spec.ParameterType.Bitmask:
				{
					let typeName: string = "number";
					if (param.values) {
						const enumName = this._registerEnum(
							param.name,
							param.values
						);
						typeName = enumName;
					}
					const lengthStr = getLengthString(param.length);
					contents.push(
						`\t${param.name}${
							isOptional ? "?" : ""
						}: Set<${typeName}>; // ${lengthStr}`
					);
				}
				break;

			default:
				// console.log("TODO", param.type);
				// this._incompleteCommands.add(cmd.command);
				// contents.push(
				// 	`\t// TODO param ${param.name} type ${param.type}`
				// );
				throw new Error("unknown parameter type");
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
	const spec = JSON.parse(jsonText) as jsonSpec.ZwaveSpec;
	assert(
		spec.jsonVersion === jsonSpec.JSON_VERSION,
		"Unsupported JSON spec version"
	);

	const classes = spec.classes.map(convertFromJsonCommandClass);

	// Iterate over JSON structure, generate our own structure
	for (const cmdClass of classes) {
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
	const classesMap = new Map<string, number>();
	for (const cmdClass of spec.classes) {
		classesMap.set(cmdClass.name, cmdClass.commandClass);
	}
	const classesContents = [
		`/**`,
		` * List of all Z-Wave command classes.`,
		` */`,
		``,
		`export enum CommandClasses {`,
		`\t${mapMap(
			classesMap,
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
