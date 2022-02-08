/**
 * Command Class Configuration, version 4.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	reportsToFollow: number; // 1 byte unsigned integer
	default: boolean; // properties1[7]
	handshake: boolean; // properties1[6]
	vg: Array<{ // variable length
		parameter: Buffer; // variable length
	}>;
}

export interface ConfigurationV4ConfigurationBulkSetData {
	parameterOffset: number; // 2 byte unsigned integer
	default: boolean; // properties1[7]
	handshake: boolean; // properties1[6]
	vg: Array<{ // variable length
		parameter: Buffer; // variable length
	}>;
}

export interface ConfigurationV4ConfigurationGetData {
	parameterNumber: number; // 1 byte unsigned integer
}

export interface ConfigurationV4ConfigurationReportData {
	parameterNumber: number; // 1 byte unsigned integer
	configurationValue: Buffer; // variable length
}

export interface ConfigurationV4ConfigurationSetData {
	parameterNumber: number; // 1 byte unsigned integer
	default: boolean; // level[7]
	configurationValue: Buffer; // variable length
}

export interface ConfigurationV4ConfigurationNameGetData {
	parameterNumber: number; // 2 byte unsigned integer
}

export interface ConfigurationV4ConfigurationNameReportData {
	parameterNumber: number; // 2 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	name: Buffer; // automatic length
}

export interface ConfigurationV4ConfigurationInfoGetData {
	parameterNumber: number; // 2 byte unsigned integer
}

export interface ConfigurationV4ConfigurationInfoReportData {
	parameterNumber: number; // 2 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	info: Buffer; // automatic length
}

export interface ConfigurationV4ConfigurationPropertiesGetData {
	parameterNumber: number; // 2 byte unsigned integer
}

export interface ConfigurationV4ConfigurationPropertiesReportData {
	parameterNumber: number; // 2 byte unsigned integer
	alteringCapabilities: boolean; // properties1[7]
	readonly: boolean; // properties1[6]
	format: FormatEnum; // properties1[5..3]
	minValue: Buffer; // variable length
	maxValue: Buffer; // variable length
	defaultValue: Buffer; // variable length
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
	public static readonly commandClass: number = CommandClasses.Configuration; // 0x70 (112)
	public static readonly version: number = 4;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ConfigurationV4, commandAndPayload);
	}
}

export class ConfigurationBulkGet extends CommandPacket<ConfigurationV4ConfigurationBulkGetData> {
	public static readonly CommandClass: typeof ConfigurationV4 = ConfigurationV4;
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
		return packet.tryAs(ConfigurationV4)?.command === this.command;
	}

	public constructor(data: Buffer | ConfigurationV4ConfigurationBulkGetData) {
		super(ConfigurationBulkGet, data);
	}
};

export class ConfigurationBulkReport extends CommandPacket<ConfigurationV4ConfigurationBulkReportData> {
	public static readonly CommandClass: typeof ConfigurationV4 = ConfigurationV4;
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
		return packet.tryAs(ConfigurationV4)?.command === this.command;
	}

	public constructor(data: Buffer | ConfigurationV4ConfigurationBulkReportData) {
		super(ConfigurationBulkReport, data);
	}
};

export class ConfigurationBulkSet extends CommandPacket<ConfigurationV4ConfigurationBulkSetData> {
	public static readonly CommandClass: typeof ConfigurationV4 = ConfigurationV4;
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
		return packet.tryAs(ConfigurationV4)?.command === this.command;
	}

	public constructor(data: Buffer | ConfigurationV4ConfigurationBulkSetData) {
		super(ConfigurationBulkSet, data);
	}
};

export class ConfigurationGet extends CommandPacket<ConfigurationV4ConfigurationGetData> {
	public static readonly CommandClass: typeof ConfigurationV4 = ConfigurationV4;
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
		return packet.tryAs(ConfigurationV4)?.command === this.command;
	}

	public constructor(data: Buffer | ConfigurationV4ConfigurationGetData) {
		super(ConfigurationGet, data);
	}
};

export class ConfigurationReport extends CommandPacket<ConfigurationV4ConfigurationReportData> {
	public static readonly CommandClass: typeof ConfigurationV4 = ConfigurationV4;
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
		return packet.tryAs(ConfigurationV4)?.command === this.command;
	}

	public constructor(data: Buffer | ConfigurationV4ConfigurationReportData) {
		super(ConfigurationReport, data);
	}
};

export class ConfigurationSet extends CommandPacket<ConfigurationV4ConfigurationSetData> {
	public static readonly CommandClass: typeof ConfigurationV4 = ConfigurationV4;
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
		return packet.tryAs(ConfigurationV4)?.command === this.command;
	}

	public constructor(data: Buffer | ConfigurationV4ConfigurationSetData) {
		super(ConfigurationSet, data);
	}
};

export class ConfigurationNameGet extends CommandPacket<ConfigurationV4ConfigurationNameGetData> {
	public static readonly CommandClass: typeof ConfigurationV4 = ConfigurationV4;
	public static readonly command: number = 0x0a; // 10
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 10,
		"name": "ConfigurationNameGet",
		"help": "Configuration Name Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "parameterNumber",
				"help": "Parameter Number",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ConfigurationV4)?.command === this.command;
	}

	public constructor(data: Buffer | ConfigurationV4ConfigurationNameGetData) {
		super(ConfigurationNameGet, data);
	}
};

export class ConfigurationNameReport extends CommandPacket<ConfigurationV4ConfigurationNameReportData> {
	public static readonly CommandClass: typeof ConfigurationV4 = ConfigurationV4;
	public static readonly command: number = 0x0b; // 11
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 11,
		"name": "ConfigurationNameReport",
		"help": "Configuration Name Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "parameterNumber",
				"help": "Parameter Number",
				"length": 2
			},
			{
				"type": "Integer",
				"name": "reportsToFollow",
				"help": "Reports to follow",
				"length": 1
			},
			{
				"type": "Blob",
				"name": "name",
				"help": "Name",
				"length": {
					"lengthType": "Auto"
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ConfigurationV4)?.command === this.command;
	}

	public constructor(data: Buffer | ConfigurationV4ConfigurationNameReportData) {
		super(ConfigurationNameReport, data);
	}
};

export class ConfigurationInfoGet extends CommandPacket<ConfigurationV4ConfigurationInfoGetData> {
	public static readonly CommandClass: typeof ConfigurationV4 = ConfigurationV4;
	public static readonly command: number = 0x0c; // 12
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 12,
		"name": "ConfigurationInfoGet",
		"help": "Configuration Info Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "parameterNumber",
				"help": "Parameter Number",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ConfigurationV4)?.command === this.command;
	}

	public constructor(data: Buffer | ConfigurationV4ConfigurationInfoGetData) {
		super(ConfigurationInfoGet, data);
	}
};

export class ConfigurationInfoReport extends CommandPacket<ConfigurationV4ConfigurationInfoReportData> {
	public static readonly CommandClass: typeof ConfigurationV4 = ConfigurationV4;
	public static readonly command: number = 0x0d; // 13
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 13,
		"name": "ConfigurationInfoReport",
		"help": "Configuration Info Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "parameterNumber",
				"help": "Parameter Number",
				"length": 2
			},
			{
				"type": "Integer",
				"name": "reportsToFollow",
				"help": "Reports to follow",
				"length": 1
			},
			{
				"type": "Blob",
				"name": "info",
				"help": "Info",
				"length": {
					"lengthType": "Auto"
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ConfigurationV4)?.command === this.command;
	}

	public constructor(data: Buffer | ConfigurationV4ConfigurationInfoReportData) {
		super(ConfigurationInfoReport, data);
	}
};

export class ConfigurationPropertiesGet extends CommandPacket<ConfigurationV4ConfigurationPropertiesGetData> {
	public static readonly CommandClass: typeof ConfigurationV4 = ConfigurationV4;
	public static readonly command: number = 0x0e; // 14
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 14,
		"name": "ConfigurationPropertiesGet",
		"help": "Configuration Properties Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "parameterNumber",
				"help": "Parameter Number",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ConfigurationV4)?.command === this.command;
	}

	public constructor(data: Buffer | ConfigurationV4ConfigurationPropertiesGetData) {
		super(ConfigurationPropertiesGet, data);
	}
};

export class ConfigurationPropertiesReport extends CommandPacket<ConfigurationV4ConfigurationPropertiesReportData> {
	public static readonly CommandClass: typeof ConfigurationV4 = ConfigurationV4;
	public static readonly command: number = 0x0f; // 15
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 15,
		"name": "ConfigurationPropertiesReport",
		"help": "Configuration Properties Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "parameterNumber",
				"help": "Parameter Number",
				"length": 2
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "alteringCapabilities",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Boolean",
						"name": "readonly",
						"mask": 64,
						"shift": 6
					},
					{
						"fieldType": "Enum",
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
						"fieldType": "Integer",
						"name": "size",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"minValue",
								"maxValue",
								"defaultValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "minValue",
				"help": "Min Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.size"
					}
				}
			},
			{
				"type": "Blob",
				"name": "maxValue",
				"help": "Max Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.size"
					}
				}
			},
			{
				"type": "Blob",
				"name": "defaultValue",
				"help": "Default Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.size"
					}
				}
			},
			{
				"type": "Integer",
				"name": "nextParameterNumber",
				"help": "Next Parameter Number",
				"length": 2
			},
			{
				"type": "Bitfield",
				"name": "properties2",
				"help": "Properties2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved1",
						"mask": 252,
						"shift": 2,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "noBulkSupport",
						"mask": 2,
						"shift": 1
					},
					{
						"fieldType": "Boolean",
						"name": "advanced",
						"mask": 1,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ConfigurationV4)?.command === this.command;
	}

	public constructor(data: Buffer | ConfigurationV4ConfigurationPropertiesReportData) {
		super(ConfigurationPropertiesReport, data);
	}
};

export class ConfigurationDefaultReset extends CommandPacket<void> {
	public static readonly CommandClass: typeof ConfigurationV4 = ConfigurationV4;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "ConfigurationDefaultReset",
		"help": "Configuration Default Reset",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ConfigurationV4)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ConfigurationDefaultReset, data);
	}
};
