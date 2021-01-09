/**
 * Specification of ZWave JSON format.
 *
 * Only the few interfaces specific to the on-disk JSON version
 * are listed here, most types are shared between the runtime
 * types and on-disk types, and given in `spec.ts`.
 */

import { ObsolescenceStatus, Parameter, RefMode } from "./spec";

/**
 * Major version of Z-WAVE JSON schema.
 */
export const JSON_VERSION = 2;

export interface ZwaveSpec {
	xmlVersion: string; // 3-part version number of XML specification
	jsonVersion: number; // Single major version number of JSON format
	classes: CommandClassDefinition[];
	// TODO basic, generic and specific device types
}

export interface CommandClassDefinition {
	/**
	 * Numeric id of command class in Z-Wave packets.
	 */
	commandClass: number;

	/**
	 * Version of command class.
	 */
	version: number;

	/**
	 * Name of command class as identifier in e.g. code.
	 * Given as UpperCamelCase.
	 */
	name: string;

	/**
	 * Human-readable name of command class.
	 */
	help: string;

	/**
	 * Obsolescence status of command class.
	 */
	status: ObsolescenceStatus;

	/**
	 * List of all defined commands in this command class.
	 */
	commands: CommandDefinition[];
}

export interface CommandDefinition {
	/**
	 * Numeric id of command in Z-Wave packets.
	 */
	command: number;

	/**
	 * Name of command as identifier in e.g. code.
	 * Given as UpperCamelCase.
	 */
	name: string;

	/**
	 * Human-readable name of command.
	 */
	help: string;

	/**
	 * Obsolescence status of command.
	 */
	status: ObsolescenceStatus;

	params: Array<Parameter<RefMode.Json>>;

	/**
	 * If set, indicates a mask to apply to the command byte.
	 * Also, the first parameter of each command will then be
	 * a BitfieldParameter which starts reading its data from
	 * the command byte instead of the first payload byte.
	 */
	cmdMask?: number;
}
