/**
 * Command Class Protection, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum ProtectionV2Commands {
	ProtectionEcGet = 0x07,
	ProtectionEcReport = 0x08,
	ProtectionEcSet = 0x06,
	ProtectionGet = 0x02,
	ProtectionReport = 0x03,
	ProtectionSet = 0x01,
	ProtectionSupportedGet = 0x04,
	ProtectionSupportedReport = 0x05,
	ProtectionTimeoutGet = 0x0a,
	ProtectionTimeoutReport = 0x0b,
	ProtectionTimeoutSet = 0x09,
}

export interface ProtectionV2ProtectionEcReportData {
	nodeId: number; // 1 byte unsigned integer
}

export interface ProtectionV2ProtectionEcSetData {
	nodeId: number; // 1 byte unsigned integer
}

export interface ProtectionV2ProtectionReportData {
	localProtectionState: number; // level[3..0]
	rfProtectionState: number; // level2[3..0]
}

export interface ProtectionV2ProtectionSetData {
	localProtectionState: number; // level[3..0]
	rfProtectionState: number; // level2[3..0]
}

export interface ProtectionV2ProtectionSupportedReportData {
	exclusiveControl: boolean; // level[1]
	timeout: boolean; // level[0]
	localProtectionState: number; // 2 byte unsigned integer
	rfProtectionState: number; // 2 byte unsigned integer
}

export interface ProtectionV2ProtectionTimeoutReportData {
	timeout: number; // 1 byte unsigned integer
}

export interface ProtectionV2ProtectionTimeoutSetData {
	timeout: number; // 1 byte unsigned integer
}

export class ProtectionV2 extends CommandClassPacket<ProtectionV2Commands> {
	public static readonly commandClass = CommandClasses.Protection; // 0x75 (117)
	public static readonly version = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ProtectionV2, commandAndPayload);
	}
}

export class ProtectionEcGet extends CommandPacket<void> {
	public static readonly CommandClass = ProtectionV2;
	public static readonly command = 0x07; // 7
	public static readonly definition = convertFromJsonCommand({
		"command": 7,
		"name": "ProtectionEcGet",
		"help": "Protection Ec Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ProtectionV2)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(ProtectionEcGet, data);
	}
};

export class ProtectionEcReport extends CommandPacket<ProtectionV2ProtectionEcReportData> {
	public static readonly CommandClass = ProtectionV2;
	public static readonly command = 0x08; // 8
	public static readonly definition = convertFromJsonCommand({
		"command": 8,
		"name": "ProtectionEcReport",
		"help": "Protection Ec Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "nodeId",
				"help": "Node ID",
				"length": 1,
				"valueType": "NodeNumber"
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ProtectionV2)?.command === this.command;
	}

	constructor(data: Buffer | ProtectionV2ProtectionEcReportData) {
		super(ProtectionEcReport, data);
	}
};

export class ProtectionEcSet extends CommandPacket<ProtectionV2ProtectionEcSetData> {
	public static readonly CommandClass = ProtectionV2;
	public static readonly command = 0x06; // 6
	public static readonly definition = convertFromJsonCommand({
		"command": 6,
		"name": "ProtectionEcSet",
		"help": "Protection Ec Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "nodeId",
				"help": "Node ID",
				"length": 1,
				"valueType": "NodeNumber"
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ProtectionV2)?.command === this.command;
	}

	constructor(data: Buffer | ProtectionV2ProtectionEcSetData) {
		super(ProtectionEcSet, data);
	}
};

export class ProtectionGet extends CommandPacket<void> {
	public static readonly CommandClass = ProtectionV2;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "ProtectionGet",
		"help": "Protection Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ProtectionV2)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(ProtectionGet, data);
	}
};

export class ProtectionReport extends CommandPacket<ProtectionV2ProtectionReportData> {
	public static readonly CommandClass = ProtectionV2;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "ProtectionReport",
		"help": "Protection Report",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "level",
				"help": "Level",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved1",
						"mask": 240,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "localProtectionState",
						"mask": 15,
						"shift": 0
					}
				]
			},
			{
				"type": "Bitfield",
				"name": "level2",
				"help": "Level2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved2",
						"mask": 240,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "rfProtectionState",
						"mask": 15,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ProtectionV2)?.command === this.command;
	}

	constructor(data: Buffer | ProtectionV2ProtectionReportData) {
		super(ProtectionReport, data);
	}
};

export class ProtectionSet extends CommandPacket<ProtectionV2ProtectionSetData> {
	public static readonly CommandClass = ProtectionV2;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "ProtectionSet",
		"help": "Protection Set",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "level",
				"help": "Level",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved1",
						"mask": 240,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "localProtectionState",
						"mask": 15,
						"shift": 0
					}
				]
			},
			{
				"type": "Bitfield",
				"name": "level2",
				"help": "Level2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved2",
						"mask": 240,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "rfProtectionState",
						"mask": 15,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ProtectionV2)?.command === this.command;
	}

	constructor(data: Buffer | ProtectionV2ProtectionSetData) {
		super(ProtectionSet, data);
	}
};

export class ProtectionSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass = ProtectionV2;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
		"command": 4,
		"name": "ProtectionSupportedGet",
		"help": "Protection Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ProtectionV2)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(ProtectionSupportedGet, data);
	}
};

export class ProtectionSupportedReport extends CommandPacket<ProtectionV2ProtectionSupportedReportData> {
	public static readonly CommandClass = ProtectionV2;
	public static readonly command = 0x05; // 5
	public static readonly definition = convertFromJsonCommand({
		"command": 5,
		"name": "ProtectionSupportedReport",
		"help": "Protection Supported Report",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "level",
				"help": "Level",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 252,
						"shift": 2,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "exclusiveControl",
						"mask": 2,
						"shift": 1
					},
					{
						"fieldType": "Boolean",
						"name": "timeout",
						"mask": 1,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "localProtectionState",
				"help": "Local Protection State",
				"length": 2
			},
			{
				"type": "Integer",
				"name": "rfProtectionState",
				"help": "RF Protection State",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ProtectionV2)?.command === this.command;
	}

	constructor(data: Buffer | ProtectionV2ProtectionSupportedReportData) {
		super(ProtectionSupportedReport, data);
	}
};

export class ProtectionTimeoutGet extends CommandPacket<void> {
	public static readonly CommandClass = ProtectionV2;
	public static readonly command = 0x0a; // 10
	public static readonly definition = convertFromJsonCommand({
		"command": 10,
		"name": "ProtectionTimeoutGet",
		"help": "Protection Timeout Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ProtectionV2)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(ProtectionTimeoutGet, data);
	}
};

export class ProtectionTimeoutReport extends CommandPacket<ProtectionV2ProtectionTimeoutReportData> {
	public static readonly CommandClass = ProtectionV2;
	public static readonly command = 0x0b; // 11
	public static readonly definition = convertFromJsonCommand({
		"command": 11,
		"name": "ProtectionTimeoutReport",
		"help": "Protection Timeout Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "timeout",
				"help": "Timeout",
				"length": 1,
				"values": {
					"0": {
						"name": "NoTimerIsSet",
						"help": "No timer is set"
					},
					"255": {
						"name": "NoTimeoutIsSet",
						"help": "No Timeout is set"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ProtectionV2)?.command === this.command;
	}

	constructor(data: Buffer | ProtectionV2ProtectionTimeoutReportData) {
		super(ProtectionTimeoutReport, data);
	}
};

export class ProtectionTimeoutSet extends CommandPacket<ProtectionV2ProtectionTimeoutSetData> {
	public static readonly CommandClass = ProtectionV2;
	public static readonly command = 0x09; // 9
	public static readonly definition = convertFromJsonCommand({
		"command": 9,
		"name": "ProtectionTimeoutSet",
		"help": "Protection Timeout Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "timeout",
				"help": "Timeout",
				"length": 1,
				"values": {
					"0": {
						"name": "NoTimerIsSet",
						"help": "No timer is set"
					},
					"255": {
						"name": "NoTimeout",
						"help": "No Timeout"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ProtectionV2)?.command === this.command;
	}

	constructor(data: Buffer | ProtectionV2ProtectionTimeoutSetData) {
		super(ProtectionTimeoutSet, data);
	}
};
