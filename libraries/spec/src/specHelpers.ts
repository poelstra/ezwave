import assert from "assert";
import * as jsonSpec from "./jsonSpec";
import {
	BitfieldElement,
	CommandClassDefinition,
	CommandDefinition,
	CommandsByClassByVersion,
	Parameter,
	ParameterType,
	Ref,
	RefMode,
	Refs,
} from "./spec";

export function convertFromJsonCommandClasses(
	classes: jsonSpec.JsonCommandClassDefinition[]
): CommandsByClassByVersion {
	// Build commandclass+version map
	const commandsByClassByVersion: CommandsByClassByVersion = new Map();
	for (const cmdClass of classes) {
		let versions = commandsByClassByVersion.get(cmdClass.commandClass);
		if (!versions) {
			versions = new Map();
			commandsByClassByVersion.set(cmdClass.commandClass, versions);
		}
		assert(!versions.has(cmdClass.version));
		const parsedCmdClass = convertFromJsonCommandClass(cmdClass);
		versions.set(cmdClass.version, parsedCmdClass);
	}
	return commandsByClassByVersion;
}

export function convertFromJsonCommandClass(
	cmdClass: jsonSpec.JsonCommandClassDefinition
): CommandClassDefinition {
	const commands = cmdClass.commands.map(convertFromJsonCommand);
	return {
		...cmdClass,
		commands,
		commandsById: new Map(commands.map((cmd) => [cmd.command, cmd])),
	};
}

export function convertFromJsonCommand(
	cmd: jsonSpec.JsonCommandDefinition
): CommandDefinition {
	const params = convertFromJsonParams(cmd.params);
	return {
		...cmd,
		params,
		//paramsByName: new Map(params.map((p) => [p.name, p])),
	};
}

export function convertToJsonCommand(
	cmd: CommandDefinition
): jsonSpec.JsonCommandDefinition {
	const params = convertToJsonParams(cmd.params);
	return {
		...cmd,
		params,
	};
}

export function isParameter(x: Parameter | BitfieldElement): x is Parameter {
	return "type" in x;
}

export function isBitfieldElement(
	x: Parameter | BitfieldElement
): x is BitfieldElement {
	return "fieldType" in x;
}

export function getReferencePath(ref: Parameter | BitfieldElement): string {
	const paramOfRef = isParameter(ref) ? ref : ref.parent;
	let result: string = paramOfRef.name;
	if (paramOfRef.group) {
		result = `${paramOfRef.group.name}.${result}`;
	}
	if (isBitfieldElement(ref)) {
		result = `${result}.${ref.name}`;
	}
	return result;
}

export interface KeyValues {
	[name: string]: unknown;
}

function isRef(x: unknown): x is Ref {
	return typeof x === "object" && !!x && "ref" in x;
}

function isRefs(x: unknown): x is Refs {
	return typeof x === "object" && !!x && "refs" in x;
}

export function convertFromJsonParams(
	params: Parameter<RefMode.Json>[]
): Parameter<RefMode.Direct>[] {
	// We're going to be replacing the references with the
	// the actual objects, but we don't want to mutate the
	// inputs.
	// Also, the references cannot be assigned 'as-we-go',
	// because some may be back-references, and others may
	// be forward references.
	// So, just make a copy of everything first, and then
	// start replacing at will.
	params = deepCopy(params);
	const result = params as unknown as Parameter[];

	function resolveRef(path: string): Parameter | BitfieldElement {
		// path can be: myParam, myParam.myField, myGroup.myParam or myGroup.myParam.myField
		const [paramName, ...subNames] = path.split(".");
		let param = result.find((p) => p.name === paramName);
		if (!param) {
			throw new Error(
				`unresolved reference to '${path}': parameter ${paramName} not found`
			);
		}
		if (subNames.length === 0) {
			return param;
		}

		// Check whether first name was a group ref, resolve myParam in the group if necessary
		if (param.type === ParameterType.ParameterGroup) {
			const groupElementName = subNames.shift();
			param = param.params.find((p) => p.name === groupElementName);
			if (!param) {
				throw new Error(
					`unresolved reference to '${path}': group parameter ${groupElementName} not found`
				);
			}
		}
		if (subNames.length === 0) {
			return param;
		}

		if (param.type !== ParameterType.Bitfield) {
			// there are names left, but no possible parameter type that could be indexed by it: error
			throw new Error(
				`unresolved reference to '${path}': attempt to index bitfield reference in non-bitfield`
			);
		}

		const fieldName = subNames.shift();
		if (subNames.length > 0) {
			throw new Error(
				`invalid reference '${path}': too many path components`
			);
		}
		const field = param.fields.find((f) => f.name === fieldName);
		if (!field) {
			throw new Error(
				`unresolved reference to '${path}': bitfield element ${fieldName} not found`
			);
		}
		return field;
	}

	function replaceRefs(x: KeyValues): void {
		for (const key of Object.keys(x)) {
			const value = x[key];
			if (typeof value !== "object") {
				continue;
			}
			if (Array.isArray(value)) {
				value.forEach(replaceRefs);
			} else if (isRef(value)) {
				x[key] = resolveRef(value.ref);
			} else if (isRefs(value)) {
				x[key] = value.refs.map((ref) => resolveRef(ref));
			} else {
				replaceRefs(value as KeyValues);
			}
		}
	}

	function assignParents(params: Parameter[]): void {
		for (const param of params) {
			if (param.type === ParameterType.ParameterGroup) {
				assignParents(param.params);
				for (const gp of param.params) {
					gp.group = param;
				}
			} else if (param.type === ParameterType.Bitfield) {
				for (const field of param.fields) {
					field.parent = param;
				}
			}
		}
	}

	replaceRefs(result as unknown as KeyValues);
	assignParents(result);
	return result;
}

export function convertToJsonParams(
	params: Parameter<RefMode.Direct>[]
): Parameter<RefMode.Json>[] {
	params = deepCopyWithRefs(params);

	const names = new Map<Parameter | BitfieldElement, string>();
	for (const param of params) {
		names.set(param, param.name);
		if (param.type === ParameterType.Bitfield) {
			for (const field of param.fields) {
				names.set(field, `${param.name}.${field.name}`);
			}
		}
		if (param.type === ParameterType.ParameterGroup) {
			for (const groupParam of param.params) {
				names.set(groupParam, `${param.name}.${groupParam.name}`);
				if (groupParam.type === ParameterType.Bitfield) {
					for (const field of groupParam.fields) {
						names.set(
							field,
							`${param.name}.${groupParam.name}.${field.name}`
						);
					}
				}
			}
		}
	}

	function createRefs(x: KeyValues): void {
		for (const key of Object.keys(x)) {
			const value = x[key];
			if (typeof value !== "object") {
				continue;
			}
			if (Array.isArray(value)) {
				if (
					key === "params" &&
					x["type"] === ParameterType.ParameterGroup
				) {
					value.forEach(createRefs);
				} else if (
					key === "fields" &&
					x["type"] === ParameterType.Bitfield
				) {
					value.forEach(createRefs);
				} else if (value.some((v) => names.has(v))) {
					x[key] = {
						refs: value.map((v) => names.get(v)),
					};
				} else {
					value.forEach(createRefs);
				}
			} else if (names.has(value as any)) {
				x[key] = {
					ref: names.get(value as any),
				};
			} else {
				createRefs(value as KeyValues);
			}
		}
	}

	function removeParents(params: Parameter<RefMode.Json>[]): void {
		for (const param of params) {
			if (param.type === ParameterType.ParameterGroup) {
				removeParents(param.params);
				for (const gp of param.params) {
					delete gp.group;
				}
			} else if (param.type === ParameterType.Bitfield) {
				for (const field of param.fields) {
					//delete field.parent;
					field.parent = undefined;
				}
			}
		}
	}

	const result = params as Parameter<RefMode.Json>[];
	removeParents(result);
	params.forEach((param) => createRefs(param as unknown as KeyValues));
	return result;
}

function deepCopy<T>(x: T): T {
	switch (typeof x) {
		case "undefined":
		case "boolean":
		case "number":
		case "string":
			return x;
		case "object":
			if (x === null) {
				return null as any;
			}
			if (Array.isArray(x)) {
				return x.map((element) => deepCopy(element)) as any;
			}
			const result = {} as T;
			for (const key of Object.keys(x) as (keyof T)[]) {
				result[key] = deepCopy(x[key]);
			}
			return result;
		default:
			throw new Error("unsupported type for deepCopy");
	}
}

function deepCopyWithRefs<T>(x: T): T {
	const refs = new Map<unknown, unknown>();

	function doCopy<X>(x: X): X {
		switch (typeof x) {
			case "undefined":
			case "boolean":
			case "number":
			case "string":
				return x;
			case "object":
				if (x === null) {
					return null as any;
				}
				if (Array.isArray(x)) {
					return x.map((element) => doCopy(element)) as any;
				}
				if (refs.has(x)) {
					return refs.get(x) as X;
				}
				const result = {} as X;
				refs.set(x, result);
				for (const key of Object.keys(x) as (keyof X)[]) {
					result[key] = doCopy(x[key]);
				}
				return result;
			default:
				throw new Error("unsupported type for deepCopy");
		}
	}

	return doCopy(x);
}
