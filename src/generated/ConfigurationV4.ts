/**
 * Command Class Configuration, version 4.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ConfigurationV4Commands {
	ConfigurationBulkGet = 0x08,
	ConfigurationBulkReport = 0x09,
	ConfigurationBulkSet = 0x07,
	ConfigurationGet = 0x05,
	ConfigurationReport = 0x06,
	ConfigurationSet = 0x04,
	ConfigurationNameGet = 0x0a,
	ConfigurationNameReport = 0x0b,
	ConfigurationInfoGet = 0x0c,
	ConfigurationInfoReport = 0x0d,
	ConfigurationPropertiesGet = 0x0e,
	ConfigurationPropertiesReport = 0x0f,
	ConfigurationDefaultReset = 0x01,
}

export interface ConfigurationV4ConfigurationBulkGetData {
	parameterOffset: number; // 2 byte unsigned integer
	numberOfParameters: number; // 1 byte unsigned integer
}

export interface ConfigurationV4ConfigurationBulkReportData {
	parameterOffset: number; // 2 byte unsigned integer
	numberOfParameters: number; // 1 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	default: boolean; // properties1[7]
	handshake: boolean; // properties1[6]
	size: number; // properties1[2..0]
	// TODO param vg type group
}

export interface ConfigurationV4ConfigurationBulkSetData {
	parameterOffset: number; // 2 byte unsigned integer
	numberOfParameters: number; // 1 byte unsigned integer
	default: boolean; // properties1[7]
	handshake: boolean; // properties1[6]
	size: number; // properties1[2..0]
	// TODO param vg type group
}

export interface ConfigurationV4ConfigurationGetData {
	parameterNumber: number; // 1 byte unsigned integer
}

export interface ConfigurationV4ConfigurationReportData {
	parameterNumber: number; // 1 byte unsigned integer
	size: number; // level[2..0]
	// TODO param configurationValue type blob
}

export interface ConfigurationV4ConfigurationSetData {
	parameterNumber: number; // 1 byte unsigned integer
	default: boolean; // level[7]
	size: number; // level[2..0]
	// TODO param configurationValue type blob
}

export interface ConfigurationV4ConfigurationNameGetData {
	parameterNumber: number; // 2 byte unsigned integer
}

export interface ConfigurationV4ConfigurationNameReportData {
	parameterNumber: number; // 2 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	// TODO param name type blob
}

export interface ConfigurationV4ConfigurationInfoGetData {
	parameterNumber: number; // 2 byte unsigned integer
}

export interface ConfigurationV4ConfigurationInfoReportData {
	parameterNumber: number; // 2 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	// TODO param info type blob
}

export interface ConfigurationV4ConfigurationPropertiesGetData {
	parameterNumber: number; // 2 byte unsigned integer
}

export interface ConfigurationV4ConfigurationPropertiesReportData {
	parameterNumber: number; // 2 byte unsigned integer
	alteringCapabilities: boolean; // properties1[7]
	readonly: boolean; // properties1[6]
	format: FormatEnum; // properties1[5..3]
	size: number; // properties1[2..0]
	// TODO param minValue type blob
	// TODO param maxValue type blob
	// TODO param defaultValue type blob
	nextParameterNumber: number; // 2 byte unsigned integer
	noBulkSupport: boolean; // properties2[1]
	advanced: boolean; // properties2[0]
}

export enum FormatEnum {
	SignedInteger = 0x0,
	UnsignedInteger = 0x1,
	Enumerated = 0x2,
	BitField = 0x3,
}

export class ConfigurationV4 extends CommandClassPacket<ConfigurationV4Commands> {
	public static readonly commandClass = CommandClasses.Configuration; // 0x70 (112)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ConfigurationV4, commandAndPayload);
	}

	public static readonly ConfigurationBulkGet = class ConfigurationBulkGet extends CommandPacket<ConfigurationV4ConfigurationBulkGetData> {
		public static readonly CommandClass = ConfigurationV4;
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
			return packet.tryAs(ConfigurationV4)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV4ConfigurationBulkGetData) {
			super(ConfigurationBulkGet, data);
		}
	};

	public static readonly ConfigurationBulkReport = class ConfigurationBulkReport extends CommandPacket<ConfigurationV4ConfigurationBulkReportData> {
		public static readonly CommandClass = ConfigurationV4;
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
					"length": 1
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
							"shift": 0
						}
					]
				},
				{
					"type": "group",
					"name": "vg",
					"help": "vg",
					"length": {
						"name": "Number of Parameters"
					},
					"params": [
						{
							"type": "blob",
							"name": "parameter",
							"help": "Parameter",
							"length": {
								"name": "Properties1",
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
			return packet.tryAs(ConfigurationV4)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV4ConfigurationBulkReportData) {
			super(ConfigurationBulkReport, data);
		}
	};

	public static readonly ConfigurationBulkSet = class ConfigurationBulkSet extends CommandPacket<ConfigurationV4ConfigurationBulkSetData> {
		public static readonly CommandClass = ConfigurationV4;
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
							"shift": 0
						}
					]
				},
				{
					"type": "group",
					"name": "vg",
					"help": "vg",
					"length": {
						"name": "Number of Parameters"
					},
					"params": [
						{
							"type": "blob",
							"name": "parameter",
							"help": "Parameter",
							"length": {
								"name": "Properties1",
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
			return packet.tryAs(ConfigurationV4)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV4ConfigurationBulkSetData) {
			super(ConfigurationBulkSet, data);
		}
	};

	public static readonly ConfigurationGet = class ConfigurationGet extends CommandPacket<ConfigurationV4ConfigurationGetData> {
		public static readonly CommandClass = ConfigurationV4;
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
			return packet.tryAs(ConfigurationV4)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV4ConfigurationGetData) {
			super(ConfigurationGet, data);
		}
	};

	public static readonly ConfigurationReport = class ConfigurationReport extends CommandPacket<ConfigurationV4ConfigurationReportData> {
		public static readonly CommandClass = ConfigurationV4;
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
							"shift": 0
						}
					]
				},
				{
					"type": "blob",
					"name": "configurationValue",
					"help": "Configuration Value",
					"length": {
						"name": "Level",
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
			return packet.tryAs(ConfigurationV4)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV4ConfigurationReportData) {
			super(ConfigurationReport, data);
		}
	};

	public static readonly ConfigurationSet = class ConfigurationSet extends CommandPacket<ConfigurationV4ConfigurationSetData> {
		public static readonly CommandClass = ConfigurationV4;
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
							"shift": 0
						}
					]
				},
				{
					"type": "blob",
					"name": "configurationValue",
					"help": "Configuration Value",
					"length": {
						"name": "Level",
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
			return packet.tryAs(ConfigurationV4)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV4ConfigurationSetData) {
			super(ConfigurationSet, data);
		}
	};

	public static readonly ConfigurationNameGet = class ConfigurationNameGet extends CommandPacket<ConfigurationV4ConfigurationNameGetData> {
		public static readonly CommandClass = ConfigurationV4;
		public static readonly command = 0x0a;
		public static readonly definition = {
			"command": 10,
			"name": "ConfigurationNameGet",
			"help": "Configuration Name Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "parameterNumber",
					"help": "Parameter Number",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ConfigurationV4)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV4ConfigurationNameGetData) {
			super(ConfigurationNameGet, data);
		}
	};

	public static readonly ConfigurationNameReport = class ConfigurationNameReport extends CommandPacket<ConfigurationV4ConfigurationNameReportData> {
		public static readonly CommandClass = ConfigurationV4;
		public static readonly command = 0x0b;
		public static readonly definition = {
			"command": 11,
			"name": "ConfigurationNameReport",
			"help": "Configuration Name Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "parameterNumber",
					"help": "Parameter Number",
					"length": 2
				},
				{
					"type": "integer",
					"name": "reportsToFollow",
					"help": "Reports to follow",
					"length": 1
				},
				{
					"type": "blob",
					"name": "name",
					"help": "Name",
					"length": "auto"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ConfigurationV4)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV4ConfigurationNameReportData) {
			super(ConfigurationNameReport, data);
		}
	};

	public static readonly ConfigurationInfoGet = class ConfigurationInfoGet extends CommandPacket<ConfigurationV4ConfigurationInfoGetData> {
		public static readonly CommandClass = ConfigurationV4;
		public static readonly command = 0x0c;
		public static readonly definition = {
			"command": 12,
			"name": "ConfigurationInfoGet",
			"help": "Configuration Info Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "parameterNumber",
					"help": "Parameter Number",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ConfigurationV4)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV4ConfigurationInfoGetData) {
			super(ConfigurationInfoGet, data);
		}
	};

	public static readonly ConfigurationInfoReport = class ConfigurationInfoReport extends CommandPacket<ConfigurationV4ConfigurationInfoReportData> {
		public static readonly CommandClass = ConfigurationV4;
		public static readonly command = 0x0d;
		public static readonly definition = {
			"command": 13,
			"name": "ConfigurationInfoReport",
			"help": "Configuration Info Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "parameterNumber",
					"help": "Parameter Number",
					"length": 2
				},
				{
					"type": "integer",
					"name": "reportsToFollow",
					"help": "Reports to follow",
					"length": 1
				},
				{
					"type": "blob",
					"name": "info",
					"help": "Info",
					"length": "auto"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ConfigurationV4)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV4ConfigurationInfoReportData) {
			super(ConfigurationInfoReport, data);
		}
	};

	public static readonly ConfigurationPropertiesGet = class ConfigurationPropertiesGet extends CommandPacket<ConfigurationV4ConfigurationPropertiesGetData> {
		public static readonly CommandClass = ConfigurationV4;
		public static readonly command = 0x0e;
		public static readonly definition = {
			"command": 14,
			"name": "ConfigurationPropertiesGet",
			"help": "Configuration Properties Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "parameterNumber",
					"help": "Parameter Number",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ConfigurationV4)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV4ConfigurationPropertiesGetData) {
			super(ConfigurationPropertiesGet, data);
		}
	};

	public static readonly ConfigurationPropertiesReport = class ConfigurationPropertiesReport extends CommandPacket<ConfigurationV4ConfigurationPropertiesReportData> {
		public static readonly CommandClass = ConfigurationV4;
		public static readonly command = 0x0f;
		public static readonly definition = {
			"command": 15,
			"name": "ConfigurationPropertiesReport",
			"help": "Configuration Properties Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "parameterNumber",
					"help": "Parameter Number",
					"length": 2
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "alteringCapabilities",
							"mask": 128,
							"shift": 7
						},
						{
							"type": "boolean",
							"name": "readonly",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "enum",
							"name": "format",
							"mask": 56,
							"shift": 3,
							"values": {
								"0": {
									"name": "SignedInteger",
									"help": "Signed Integer"
								},
								"1": {
									"name": "UnsignedInteger",
									"help": "Unsigned Integer"
								},
								"2": {
									"name": "Enumerated",
									"help": "Enumerated"
								},
								"3": {
									"name": "BitField",
									"help": "Bit field"
								}
							}
						},
						{
							"type": "integer",
							"name": "size",
							"mask": 7,
							"shift": 0
						}
					]
				},
				{
					"type": "blob",
					"name": "minValue",
					"help": "Min Value",
					"length": {
						"name": "Properties1",
						"bitfield": {
							"mask": 7,
							"shift": 0,
							"name": "size"
						}
					}
				},
				{
					"type": "blob",
					"name": "maxValue",
					"help": "Max Value",
					"length": {
						"name": "Properties1",
						"bitfield": {
							"mask": 7,
							"shift": 0,
							"name": "size"
						}
					}
				},
				{
					"type": "blob",
					"name": "defaultValue",
					"help": "Default Value",
					"length": {
						"name": "Properties1",
						"bitfield": {
							"mask": 7,
							"shift": 0,
							"name": "size"
						}
					}
				},
				{
					"type": "integer",
					"name": "nextParameterNumber",
					"help": "Next Parameter Number",
					"length": 2
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved1",
							"mask": 252,
							"shift": 2,
							"reserved": true
						},
						{
							"type": "boolean",
							"name": "noBulkSupport",
							"mask": 2,
							"shift": 1
						},
						{
							"type": "boolean",
							"name": "advanced",
							"mask": 1,
							"shift": 0
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ConfigurationV4)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV4ConfigurationPropertiesReportData) {
			super(ConfigurationPropertiesReport, data);
		}
	};

	public static readonly ConfigurationDefaultReset = class ConfigurationDefaultReset extends CommandPacket<void> {
		public static readonly CommandClass = ConfigurationV4;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "ConfigurationDefaultReset",
			"help": "Configuration Default Reset",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ConfigurationV4)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ConfigurationDefaultReset, data);
		}
	};
}

export namespace ConfigurationV4 {
	export type ConfigurationBulkGet = InstanceType<typeof ConfigurationV4.ConfigurationBulkGet>;
	export type ConfigurationBulkReport = InstanceType<typeof ConfigurationV4.ConfigurationBulkReport>;
	export type ConfigurationBulkSet = InstanceType<typeof ConfigurationV4.ConfigurationBulkSet>;
	export type ConfigurationGet = InstanceType<typeof ConfigurationV4.ConfigurationGet>;
	export type ConfigurationReport = InstanceType<typeof ConfigurationV4.ConfigurationReport>;
	export type ConfigurationSet = InstanceType<typeof ConfigurationV4.ConfigurationSet>;
	export type ConfigurationNameGet = InstanceType<typeof ConfigurationV4.ConfigurationNameGet>;
	export type ConfigurationNameReport = InstanceType<typeof ConfigurationV4.ConfigurationNameReport>;
	export type ConfigurationInfoGet = InstanceType<typeof ConfigurationV4.ConfigurationInfoGet>;
	export type ConfigurationInfoReport = InstanceType<typeof ConfigurationV4.ConfigurationInfoReport>;
	export type ConfigurationPropertiesGet = InstanceType<typeof ConfigurationV4.ConfigurationPropertiesGet>;
	export type ConfigurationPropertiesReport = InstanceType<typeof ConfigurationV4.ConfigurationPropertiesReport>;
	export type ConfigurationDefaultReset = InstanceType<typeof ConfigurationV4.ConfigurationDefaultReset>;
}
