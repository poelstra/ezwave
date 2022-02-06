import * as spec from "@ezwave/spec";
import {
	convertFromJsonCommandClass,
	convertToJsonCommand,
	getReferencePath,
	ZwaveSpec,
} from "@ezwave/spec";
import assert from "assert";
import main from "async-main";
import * as Case from "case";
import { promises as pfs } from "fs";
import * as path from "path";
import "source-map-support/register";

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
			`import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";`,
			`import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";`,
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
		contents.push(...this._generateCommands(className), ``);

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

		// Whether the command byte is also used as a part of the payload,
		// and if so, which bits belong to the command itself.
		// TODO Move commandMask to the class, as all commands (must) have the
		// same mask in practice
		const commandMask: number | undefined =
			this._class.commands[0]?.cmdMask;

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
				`public static readonly version = ${this._class.version};`,
			])
		);
		if (commandMask) {
			contents.push(
				...indent([
					`public static readonly commandMask = 0x${commandMask.toString(
						16
					)};`,
				])
			);
		}
		contents.push(
			...indent([
				``,
				`public static matches(packet: Packet): boolean {`,
				`\treturn packet.commandClass === this.commandClass;`,
				`}`,
				``,
				`constructor(commandAndPayload: Buffer) {`,
				`\tsuper(${className}, commandAndPayload);`,
				`}`,
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
				`export class ${commandName} extends CommandPacket<${dataName}> {`
			);
			contents.push(
				...indent([
					`public static readonly CommandClass = ${className};`,
					`public static readonly command = 0x${command.command
						.toString(16)
						.padStart(2, "0")}; // ${command.command}`,
					`public static readonly definition = convertFromJsonCommand(${jsonifyCommandDefinition(
						command
					).join("\n\t")} as JsonCommandDefinition);`,
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
					if (param.bitmaskType) {
						switch (param.bitmaskType) {
							case spec.BitmaskType.NodeNumber:
								typeName = "number /* Node ID */";
								break;
							case spec.BitmaskType.EndpointNumber:
								typeName = "number /* Endpoint ID */";
								break;
							case spec.BitmaskType.AVCommand:
								typeName = "number /* AV Command number */";
								break;
						}
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
}

main(async () => {
	const srcDir = path.resolve(__dirname, "..");
	const outDir = path.resolve(srcDir, "generated");

	// Read JSON ZWave specification
	// TODO Convert reading of the spec to a helper in @ezwave/spec
	const jsonSpec = require("@ezwave/spec/lib/zwave.json") as ZwaveSpec;
	assert(
		jsonSpec.jsonVersion === spec.JSON_VERSION,
		"Unsupported JSON spec version"
	);

	await pfs.mkdir(outDir, { recursive: true });

	// Generate commandclass+version specific modules
	const classes = jsonSpec.classes.map(convertFromJsonCommandClass);
	for (const cmdClass of classes) {
		const lines = CommandClassGenerator.generate(cmdClass);

		const className = `${cmdClass.name}V${cmdClass.version}`;
		const filename = path.resolve(outDir, `${className}.ts`);
		await pfs.writeFile(
			filename,
			lines.filter((l) => l !== undefined).join("\n")
		);
	}

	// Generate index
	const indexExports = classes.map((cmdClass) => {
		const className = `${cmdClass.name}V${cmdClass.version}`;
		return `export * as ${className} from "./${className}";`;
	});
	await pfs.writeFile(
		path.resolve(outDir, "index.ts"),
		indexExports.join("\n")
	);
});
