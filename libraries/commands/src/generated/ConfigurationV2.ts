/**
 * Command Class Configuration, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	vg: Array<{ // variable length
		parameter: Buffer; // variable length
	}>;
}

export interface ConfigurationV2ConfigurationBulkSetData {
	parameterOffset: number; // 2 byte unsigned integer
	default: boolean; // properties1[7]
	handshake: boolean; // properties1[6]
	vg: Array<{ // variable length
		parameter: Buffer; // variable length
	}>;
}

export interface ConfigurationV2ConfigurationGetData {
	parameterNumber: number; // 1 byte unsigned integer
}

export interface ConfigurationV2ConfigurationReportData {
	parameterNumber: number; // 1 byte unsigned integer
	configurationValue: Buffer; // variable length
}

export interface ConfigurationV2ConfigurationSetData {
	parameterNumber: number; // 1 byte unsigned integer
	default: boolean; // level[7]
	configurationValue: Buffer; // variable length
}

export class ConfigurationV2 extends CommandClassPacket<ConfigurationV2Commands> {
	public static readonly commandClass: number = CommandClasses.Configuration; // 0x70 (112)
	public static readonly version: number = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ConfigurationV2, commandAndPayload);
	}
}

export class ConfigurationBulkGet extends CommandPacket<ConfigurationV2ConfigurationBulkGetData> {
	public static readonly CommandClass: typeof ConfigurationV2 = ConfigurationV2;
	public static readonly command: number = 0x08; // 8
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 8,
		"name": "ConfigurationBulkGet",
		"help": "Configuration Bulk Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "parameterOffset",
				"help": "Parameter Offset",
				"length": 2
			},
			{
				"type": "Integer",
				"name": "numberOfParameters",
				"help": "Number of Parameters",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ConfigurationV2)?.command === this.command;
	}

	public constructor(data: Buffer | ConfigurationV2ConfigurationBulkGetData) {
		super(ConfigurationBulkGet, data);
	}
};

export class ConfigurationBulkReport extends CommandPacket<ConfigurationV2ConfigurationBulkReportData> {
	public static readonly CommandClass: typeof ConfigurationV2 = ConfigurationV2;
	public static readonly command: number = 0x09; // 9
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 9,
		"name": "ConfigurationBulkReport",
		"help": "Configuration Bulk Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "parameterOffset",
				"help": "Parameter Offset",
				"length": 2
			},
			{
				"type": "Integer",
				"name": "numberOfParameters",
				"help": "Number of Parameters",
				"length": 1,
				"lengthOf": {
					"refs": [
						"vg"
					]
				},
				"isAutogenerated": true
			},
			{
				"type": "Integer",
				"name": "reportsToFollow",
				"help": "Reports to follow",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "default",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Boolean",
						"name": "handshake",
						"mask": 64,
						"shift": 6
					},
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 56,
						"shift": 3,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "size",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"vg.parameter"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Group",
				"name": "vg",
				"help": "vg",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "numberOfParameters"
					}
				},
				"params": [
					{
						"type": "Blob",
						"name": "parameter",
						"help": "Parameter",
						"length": {
							"lengthType": "Ref",
							"from": {
								"ref": "properties1.size"
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ConfigurationV2)?.command === this.command;
	}

	public constructor(data: Buffer | ConfigurationV2ConfigurationBulkReportData) {
		super(ConfigurationBulkReport, data);
	}
};

export class ConfigurationBulkSet extends CommandPacket<ConfigurationV2ConfigurationBulkSetData> {
	public static readonly CommandClass: typeof ConfigurationV2 = ConfigurationV2;
	public static readonly command: number = 0x07; // 7
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 7,
		"name": "ConfigurationBulkSet",
		"help": "Configuration Bulk Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "parameterOffset",
				"help": "Parameter Offset",
				"length": 2
			},
			{
				"type": "Integer",
				"name": "numberOfParameters",
				"help": "Number of Parameters",
				"length": 1,
				"lengthOf": {
					"refs": [
						"vg"
					]
				},
				"isAutogenerated": true
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "default",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Boolean",
						"name": "handshake",
						"mask": 64,
						"shift": 6
					},
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 56,
						"shift": 3,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "size",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"vg.parameter"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Group",
				"name": "vg",
				"help": "vg",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "numberOfParameters"
					}
				},
				"params": [
					{
						"type": "Blob",
						"name": "parameter",
						"help": "Parameter",
						"length": {
							"lengthType": "Ref",
							"from": {
								"ref": "properties1.size"
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ConfigurationV2)?.command === this.command;
	}

	public constructor(data: Buffer | ConfigurationV2ConfigurationBulkSetData) {
		super(ConfigurationBulkSet, data);
	}
};

export class ConfigurationGet extends CommandPacket<ConfigurationV2ConfigurationGetData> {
	public static readonly CommandClass: typeof ConfigurationV2 = ConfigurationV2;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "ConfigurationGet",
		"help": "Configuration Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "parameterNumber",
				"help": "Parameter Number",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ConfigurationV2)?.command === this.command;
	}

	public constructor(data: Buffer | ConfigurationV2ConfigurationGetData) {
		super(ConfigurationGet, data);
	}
};

export class ConfigurationReport extends CommandPacket<ConfigurationV2ConfigurationReportData> {
	public static readonly CommandClass: typeof ConfigurationV2 = ConfigurationV2;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 6,
		"name": "ConfigurationReport",
		"help": "Configuration Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "parameterNumber",
				"help": "Parameter Number",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "level",
				"help": "Level",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 248,
						"shift": 3,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "size",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"configurationValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "configurationValue",
				"help": "Configuration Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "level.size"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ConfigurationV2)?.command === this.command;
	}

	public constructor(data: Buffer | ConfigurationV2ConfigurationReportData) {
		super(ConfigurationReport, data);
	}
};

export class ConfigurationSet extends CommandPacket<ConfigurationV2ConfigurationSetData> {
	public static readonly CommandClass: typeof ConfigurationV2 = ConfigurationV2;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "ConfigurationSet",
		"help": "Configuration Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "parameterNumber",
				"help": "Parameter Number",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "level",
				"help": "Level",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "default",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 120,
						"shift": 3,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "size",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"configurationValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "configurationValue",
				"help": "Configuration Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "level.size"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ConfigurationV2)?.command === this.command;
	}

	public constructor(data: Buffer | ConfigurationV2ConfigurationSetData) {
		super(ConfigurationSet, data);
	}
};
