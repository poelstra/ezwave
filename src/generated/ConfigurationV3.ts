/**
 * Command Class Configuration, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ConfigurationV3Commands {
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
}

export interface ConfigurationV3ConfigurationBulkGetData {
	parameterOffset: number; // 2 byte unsigned integer
	numberOfParameters: number; // 1 byte unsigned integer
}

export interface ConfigurationV3ConfigurationBulkReportData {
	parameterOffset: number; // 2 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	default: boolean; // properties1[7]
	handshake: boolean; // properties1[6]
	// TODO param vg type group
}

export interface ConfigurationV3ConfigurationBulkSetData {
	parameterOffset: number; // 2 byte unsigned integer
	default: boolean; // properties1[7]
	handshake: boolean; // properties1[6]
	// TODO param vg type group
}

export interface ConfigurationV3ConfigurationGetData {
	parameterNumber: number; // 1 byte unsigned integer
}

export interface ConfigurationV3ConfigurationReportData {
	parameterNumber: number; // 1 byte unsigned integer
	// TODO param configurationValue type blob
}

export interface ConfigurationV3ConfigurationSetData {
	parameterNumber: number; // 1 byte unsigned integer
	default: boolean; // level[7]
	// TODO param configurationValue type blob
}

export interface ConfigurationV3ConfigurationNameGetData {
	parameterNumber: number; // 2 byte unsigned integer
}

export interface ConfigurationV3ConfigurationNameReportData {
	parameterNumber: number; // 2 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	// TODO param name type blob
}

export interface ConfigurationV3ConfigurationInfoGetData {
	parameterNumber: number; // 2 byte unsigned integer
}

export interface ConfigurationV3ConfigurationInfoReportData {
	parameterNumber: number; // 2 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	// TODO param info type blob
}

export interface ConfigurationV3ConfigurationPropertiesGetData {
	parameterNumber: number; // 2 byte unsigned integer
}

export interface ConfigurationV3ConfigurationPropertiesReportData {
	parameterNumber: number; // 2 byte unsigned integer
	format: FormatEnum; // properties1[5..3]
	// TODO param minValue type blob
	// TODO param maxValue type blob
	// TODO param defaultValue type blob
	nextParameterNumber: number; // 2 byte unsigned integer
}

export enum FormatEnum {
	SignedInteger = 0x0,
	UnsignedInteger = 0x1,
	Enumerated = 0x2,
	BitField = 0x3,
}

export class ConfigurationV3 extends CommandClassPacket<ConfigurationV3Commands> {
	public static readonly commandClass = CommandClasses.Configuration; // 0x70 (112)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ConfigurationV3, commandAndPayload);
	}

	public static readonly ConfigurationBulkGet = class ConfigurationBulkGet extends CommandPacket<ConfigurationV3ConfigurationBulkGetData> {
		public static readonly CommandClass = ConfigurationV3;
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
			return packet.tryAs(ConfigurationV3)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV3ConfigurationBulkGetData) {
			super(ConfigurationBulkGet, data);
		}
	};

	public static readonly ConfigurationBulkReport = class ConfigurationBulkReport extends CommandPacket<ConfigurationV3ConfigurationBulkReportData> {
		public static readonly CommandClass = ConfigurationV3;
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
			return packet.tryAs(ConfigurationV3)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV3ConfigurationBulkReportData) {
			super(ConfigurationBulkReport, data);
		}
	};

	public static readonly ConfigurationBulkSet = class ConfigurationBulkSet extends CommandPacket<ConfigurationV3ConfigurationBulkSetData> {
		public static readonly CommandClass = ConfigurationV3;
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
			return packet.tryAs(ConfigurationV3)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV3ConfigurationBulkSetData) {
			super(ConfigurationBulkSet, data);
		}
	};

	public static readonly ConfigurationGet = class ConfigurationGet extends CommandPacket<ConfigurationV3ConfigurationGetData> {
		public static readonly CommandClass = ConfigurationV3;
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
			return packet.tryAs(ConfigurationV3)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV3ConfigurationGetData) {
			super(ConfigurationGet, data);
		}
	};

	public static readonly ConfigurationReport = class ConfigurationReport extends CommandPacket<ConfigurationV3ConfigurationReportData> {
		public static readonly CommandClass = ConfigurationV3;
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
			return packet.tryAs(ConfigurationV3)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV3ConfigurationReportData) {
			super(ConfigurationReport, data);
		}
	};

	public static readonly ConfigurationSet = class ConfigurationSet extends CommandPacket<ConfigurationV3ConfigurationSetData> {
		public static readonly CommandClass = ConfigurationV3;
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
			return packet.tryAs(ConfigurationV3)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV3ConfigurationSetData) {
			super(ConfigurationSet, data);
		}
	};

	public static readonly ConfigurationNameGet = class ConfigurationNameGet extends CommandPacket<ConfigurationV3ConfigurationNameGetData> {
		public static readonly CommandClass = ConfigurationV3;
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
			return packet.tryAs(ConfigurationV3)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV3ConfigurationNameGetData) {
			super(ConfigurationNameGet, data);
		}
	};

	public static readonly ConfigurationNameReport = class ConfigurationNameReport extends CommandPacket<ConfigurationV3ConfigurationNameReportData> {
		public static readonly CommandClass = ConfigurationV3;
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
			return packet.tryAs(ConfigurationV3)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV3ConfigurationNameReportData) {
			super(ConfigurationNameReport, data);
		}
	};

	public static readonly ConfigurationInfoGet = class ConfigurationInfoGet extends CommandPacket<ConfigurationV3ConfigurationInfoGetData> {
		public static readonly CommandClass = ConfigurationV3;
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
			return packet.tryAs(ConfigurationV3)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV3ConfigurationInfoGetData) {
			super(ConfigurationInfoGet, data);
		}
	};

	public static readonly ConfigurationInfoReport = class ConfigurationInfoReport extends CommandPacket<ConfigurationV3ConfigurationInfoReportData> {
		public static readonly CommandClass = ConfigurationV3;
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
			return packet.tryAs(ConfigurationV3)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV3ConfigurationInfoReportData) {
			super(ConfigurationInfoReport, data);
		}
	};

	public static readonly ConfigurationPropertiesGet = class ConfigurationPropertiesGet extends CommandPacket<ConfigurationV3ConfigurationPropertiesGetData> {
		public static readonly CommandClass = ConfigurationV3;
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
			return packet.tryAs(ConfigurationV3)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV3ConfigurationPropertiesGetData) {
			super(ConfigurationPropertiesGet, data);
		}
	};

	public static readonly ConfigurationPropertiesReport = class ConfigurationPropertiesReport extends CommandPacket<ConfigurationV3ConfigurationPropertiesReportData> {
		public static readonly CommandClass = ConfigurationV3;
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
							"type": "integer",
							"name": "reserved",
							"mask": 192,
							"shift": 6,
							"reserved": true
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
							"shift": 0,
							"lengthOf": {
								"refs": [
									{
										"name": "minValue"
									},
									{
										"name": "maxValue"
									},
									{
										"name": "defaultValue"
									}
								]
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "minValue",
					"help": "Min Value",
					"length": {
						"ref": "properties1",
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
						"ref": "properties1",
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
						"ref": "properties1",
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
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ConfigurationV3)?.command === this.command;
		}

		constructor(data: Buffer | ConfigurationV3ConfigurationPropertiesReportData) {
			super(ConfigurationPropertiesReport, data);
		}
	};
}

export namespace ConfigurationV3 {
	export type ConfigurationBulkGet = InstanceType<typeof ConfigurationV3.ConfigurationBulkGet>;
	export type ConfigurationBulkReport = InstanceType<typeof ConfigurationV3.ConfigurationBulkReport>;
	export type ConfigurationBulkSet = InstanceType<typeof ConfigurationV3.ConfigurationBulkSet>;
	export type ConfigurationGet = InstanceType<typeof ConfigurationV3.ConfigurationGet>;
	export type ConfigurationReport = InstanceType<typeof ConfigurationV3.ConfigurationReport>;
	export type ConfigurationSet = InstanceType<typeof ConfigurationV3.ConfigurationSet>;
	export type ConfigurationNameGet = InstanceType<typeof ConfigurationV3.ConfigurationNameGet>;
	export type ConfigurationNameReport = InstanceType<typeof ConfigurationV3.ConfigurationNameReport>;
	export type ConfigurationInfoGet = InstanceType<typeof ConfigurationV3.ConfigurationInfoGet>;
	export type ConfigurationInfoReport = InstanceType<typeof ConfigurationV3.ConfigurationInfoReport>;
	export type ConfigurationPropertiesGet = InstanceType<typeof ConfigurationV3.ConfigurationPropertiesGet>;
	export type ConfigurationPropertiesReport = InstanceType<typeof ConfigurationV3.ConfigurationPropertiesReport>;
}
