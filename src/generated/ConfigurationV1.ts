/**
 * Command Class Configuration, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ConfigurationV1Commands {
	ConfigurationGet = 0x05,
	ConfigurationReport = 0x06,
	ConfigurationSet = 0x04,
}

export interface ConfigurationV1ConfigurationGetData {
	parameterNumber: number; // 1 byte unsigned integer
}

export interface ConfigurationV1ConfigurationReportData {
	parameterNumber: number; // 1 byte unsigned integer
	// TODO param level type bitfield
	// TODO param configurationValue type blob
}

export interface ConfigurationV1ConfigurationSetData {
	parameterNumber: number; // 1 byte unsigned integer
	// TODO param level type bitfield
	// TODO param configurationValue type blob
}

export class ConfigurationV1 extends CommandClassPacket<ConfigurationV1Commands> {
	public static readonly commandClass = CommandClasses.Configuration; // 0x70 (112)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ConfigurationV1, commandAndPayload);
	}

	public static readonly ConfigurationGet = class ConfigurationGet extends CommandPacket<ConfigurationV1ConfigurationGetData> {
		public static readonly CommandClass = ConfigurationV1;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "ConfigurationGet",
			"help": "Configuration Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "parameterNumber",
					"help": "Parameter Number",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ConfigurationV1)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV1ConfigurationGetData) {
			super(ConfigurationGet, data);
		}
	};

	public static readonly ConfigurationReport = class ConfigurationReport extends CommandPacket<ConfigurationV1ConfigurationReportData> {
		public static readonly CommandClass = ConfigurationV1;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "ConfigurationReport",
			"help": "Configuration Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "parameterNumber",
					"help": "Parameter Number",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 248,
							"shift": 3
						}
					]
				},
				{
					"type": "blob",
					"name": "configurationValue",
					"help": "Configuration Value",
					"length": {
						"name": "Level",
						"mask": 7,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ConfigurationV1)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV1ConfigurationReportData) {
			super(ConfigurationReport, data);
		}
	};

	public static readonly ConfigurationSet = class ConfigurationSet extends CommandPacket<ConfigurationV1ConfigurationSetData> {
		public static readonly CommandClass = ConfigurationV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "ConfigurationSet",
			"help": "Configuration Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "parameterNumber",
					"help": "Parameter Number",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 120,
							"shift": 3
						},
						{
							"type": "boolean",
							"name": "Default",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "blob",
					"name": "configurationValue",
					"help": "Configuration Value",
					"length": {
						"name": "Level",
						"mask": 7,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ConfigurationV1)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV1ConfigurationSetData) {
			super(ConfigurationSet, data);
		}
	};
}

export namespace ConfigurationV1 {
	export type ConfigurationGet = InstanceType<typeof ConfigurationV1.ConfigurationGet>;
	export type ConfigurationReport = InstanceType<typeof ConfigurationV1.ConfigurationReport>;
	export type ConfigurationSet = InstanceType<typeof ConfigurationV1.ConfigurationSet>;
}
