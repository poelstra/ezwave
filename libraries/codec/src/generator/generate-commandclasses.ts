/**
 * Generate CommandClasses enum based on JSON-version of Z-Wave spec.
 */

import * as spec from "@ezwave/spec";
import { ZwaveSpec } from "@ezwave/spec";
import assert from "assert";
import main from "async-main";
import { promises as pfs } from "fs";
import * as path from "path";

/**
 * 'Map' over all key/values of a Map, and return an array of all the results.
 */
function mapMap<K, V, R>(
	map: Map<K, V>,
	cb: (value: V, key: K, map: Map<K, V>) => R
): R[] {
	const result: R[] = [];
	map.forEach((v, k, m) => result.push(cb(v, k, m)));
	return result;
}

function generateCommandClassesEnum(json: spec.ZwaveSpec): string {
	// Build an enum of all available command classes.
	// Note: COMMAND_CLASS_ALARM was renamed to COMMAND_CLASS_NOTIFICATION,
	// so this Map has key and value 'reversed' to what you'd expect.
	const classesMap = new Map<string, number>();
	for (const cmdClass of json.classes) {
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

	return classesContents;
}

void main(async () => {
	// Read JSON ZWave specification
	// TODO Convert reading of the spec to a helper in @ezwave/spec
	const jsonSpec = require("@ezwave/spec/lib/zwave.json") as ZwaveSpec;
	assert(
		jsonSpec.jsonVersion === spec.JSON_VERSION,
		"Unsupported JSON spec version"
	);

	const classesContents = generateCommandClassesEnum(jsonSpec);

	const outDir = path.resolve(__dirname, "..", "generated");
	await pfs.mkdir(outDir, { recursive: true });
	await pfs.writeFile(
		path.resolve(outDir, "CommandClasses.ts"),
		classesContents
	);
});
