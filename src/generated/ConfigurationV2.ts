/**
 * Command Class Configuration, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ConfigurationV2Commands {
	ConfigurationBulkGet = 0x08,
	ConfigurationBulkReport = 0x09,
	ConfigurationBulkSet = 0x07,
	ConfigurationGet = 0x05,
	ConfigurationReport = 0x06,
	ConfigurationSet = 0x04,
}

export interface ConfigurationV2ConfigurationBulkGetData {
	parameterOffset: number; // 2 byte unsigned integer
	numberOfParameters: number; // 1 byte unsigned integer
}

export interface ConfigurationV2ConfigurationBulkReportData {
	parameterOffset: number; // 2 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	default: boolean; // properties1[7]
	handshake: boolean; // properties1[6]
	// TODO param vg type group
}

export interface ConfigurationV2ConfigurationBulkSetData {
	parameterOffset: number; // 2 byte unsigned integer
	default: boolean; // properties1[7]
	handshake: boolean; // properties1[6]
	// TODO param vg type group
}

export interface ConfigurationV2ConfigurationGetData {
	parameterNumber: number; // 1 byte unsigned integer
}

export interface ConfigurationV2ConfigurationReportData {
	parameterNumber: number; // 1 byte unsigned integer
	// TODO param configurationValue type blob
}

export interface ConfigurationV2ConfigurationSetData {
	parameterNumber: number; // 1 byte unsigned integer
	default: boolean; // level[7]
	// TODO param configurationValue type blob
}

export class ConfigurationV2 extends CommandClassPacket<ConfigurationV2Commands> {
	public static readonly commandClass = CommandClasses.Configuration; // 0x70 (112)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ConfigurationV2, commandAndPayload);
	}

	public static readonly ConfigurationBulkGet = class ConfigurationBulkGet extends CommandPacket<ConfigurationV2ConfigurationBulkGetData> {
		public static readonly CommandClass = ConfigurationV2;
		public static readonly command = 0x08;
		public static readonly definition = {
			"command": 8,
			"name": "ConfigurationBulkGet",
			"help": "Configuration Bulk Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "parameterOffset",
					"help": "Parameter Offset",
					"length": 2
				},
				{
					"type": "integer",
					"name": "numberOfParameters",
					"help": "Number of Parameters",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ConfigurationV2)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV2ConfigurationBulkGetData) {
			super(ConfigurationBulkGet, data);
		}
	};

	public static readonly ConfigurationBulkReport = class ConfigurationBulkReport extends CommandPacket<ConfigurationV2ConfigurationBulkReportData> {
		public static readonly CommandClass = ConfigurationV2;
		public static readonly command = 0x09;
		public static readonly definition = {
			"command": 9,
			"name": "ConfigurationBulkReport",
			"help": "Configuration Bulk Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "parameterOffset",
					"help": "Parameter Offset",
					"length": 2
				},
				{
					"type": "integer",
					"name": "numberOfParameters",
					"help": "Number of Parameters",
					"length": 1,
					"lengthOf": {
						"refs": [
							{
								"name": "vg"
							}
						]
					}
				},
				{
					"type": "integer",
					"name": "reportsToFollow",
					"help": "Reports to follow",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "default",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "boolean",
							"name": "handshake",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "integer",
							"name": "reserved",
							"mask": 56,
							"shift": 3,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "size",
							"mask": 7,
							"shift": 0,
							"lengthOf": {
								"refs": [
									{
										"group": "vg",
										"name": "parameter"
									}
								]
							}
						}
					]
				},
				{
					"type": "group",
					"name": "vg",
					"help": "vg",
					"length": {
						"ref": "numberOfParameters"
					},
					"params": [
						{
							"type": "blob",
							"name": "parameter",
							"help": "Parameter",
							"length": {
								"ref": "properties1",
								"isParentReference": true,
								"bitfield": {
									"mask": 7,
									"shift": 0,
									"name": "size"
								}
							}
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ConfigurationV2)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV2ConfigurationBulkReportData) {
			super(ConfigurationBulkReport, data);
		}
	};

	public static readonly ConfigurationBulkSet = class ConfigurationBulkSet extends CommandPacket<ConfigurationV2ConfigurationBulkSetData> {
		public static readonly CommandClass = ConfigurationV2;
		public static readonly command = 0x07;
		public static readonly definition = {
			"command": 7,
			"name": "ConfigurationBulkSet",
			"help": "Configuration Bulk Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "parameterOffset",
					"help": "Parameter Offset",
					"length": 2
				},
				{
					"type": "integer",
					"name": "numberOfParameters",
					"help": "Number of Parameters",
					"length": 1,
					"lengthOf": {
						"refs": [
							{
								"name": "vg"
							}
						]
					}
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "default",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "boolean",
							"name": "handshake",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "integer",
							"name": "reserved",
							"mask": 56,
							"shift": 3,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "size",
							"mask": 7,
							"shift": 0,
							"lengthOf": {
								"refs": [
									{
										"group": "vg",
										"name": "parameter"
									}
								]
							}
						}
					]
				},
				{
					"type": "group",
					"name": "vg",
					"help": "vg",
					"length": {
						"ref": "numberOfParameters"
					},
					"params": [
						{
							"type": "blob",
							"name": "parameter",
							"help": "Parameter",
							"length": {
								"ref": "properties1",
								"isParentReference": true,
								"bitfield": {
									"mask": 7,
									"shift": 0,
									"name": "size"
								}
							}
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ConfigurationV2)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV2ConfigurationBulkSetData) {
			super(ConfigurationBulkSet, data);
		}
	};

	public static readonly ConfigurationGet = class ConfigurationGet extends CommandPacket<ConfigurationV2ConfigurationGetData> {
		public static readonly CommandClass = ConfigurationV2;
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
			return packet.tryAs(ConfigurationV2)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV2ConfigurationGetData) {
			super(ConfigurationGet, data);
		}
	};

	public static readonly ConfigurationReport = class ConfigurationReport extends CommandPacket<ConfigurationV2ConfigurationReportData> {
		public static readonly CommandClass = ConfigurationV2;
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
							"name": "reserved",
							"mask": 248,
							"shift": 3,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "size",
							"mask": 7,
							"shift": 0,
							"lengthOf": {
								"refs": [
									{
										"name": "configurationValue"
									}
								]
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "configurationValue",
					"help": "Configuration Value",
					"length": {
						"ref": "level",
						"bitfield": {
							"mask": 7,
							"shift": 0,
							"name": "size"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ConfigurationV2)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV2ConfigurationReportData) {
			super(ConfigurationReport, data);
		}
	};

	public static readonly ConfigurationSet = class ConfigurationSet extends CommandPacket<ConfigurationV2ConfigurationSetData> {
		public static readonly CommandClass = ConfigurationV2;
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
							"type": "boolean",
							"name": "default",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "integer",
							"name": "reserved",
							"mask": 120,
							"shift": 3,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "size",
							"mask": 7,
							"shift": 0,
							"lengthOf": {
								"refs": [
									{
										"name": "configurationValue"
									}
								]
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "configurationValue",
					"help": "Configuration Value",
					"length": {
						"ref": "level",
						"bitfield": {
							"mask": 7,
							"shift": 0,
							"name": "size"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ConfigurationV2)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV2ConfigurationSetData) {
			super(ConfigurationSet, data);
		}
	};
}

export namespace ConfigurationV2 {
	export type ConfigurationBulkGet = InstanceType<typeof ConfigurationV2.ConfigurationBulkGet>;
	export type ConfigurationBulkReport = InstanceType<typeof ConfigurationV2.ConfigurationBulkReport>;
	export type ConfigurationBulkSet = InstanceType<typeof ConfigurationV2.ConfigurationBulkSet>;
	export type ConfigurationGet = InstanceType<typeof ConfigurationV2.ConfigurationGet>;
	export type ConfigurationReport = InstanceType<typeof ConfigurationV2.ConfigurationReport>;
	export type ConfigurationSet = InstanceType<typeof ConfigurationV2.ConfigurationSet>;
}
