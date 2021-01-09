/**
 * Command Class Protection, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

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
	nodeID: number; // 1 byte unsigned integer
}

export interface ProtectionV2ProtectionEcSetData {
	nodeID: number; // 1 byte unsigned integer
}

export interface ProtectionV2ProtectionReportData {
	localProtectionState: number; // level[3..0]
	rFProtectionState: number; // level2[3..0]
}

export interface ProtectionV2ProtectionSetData {
	localProtectionState: number; // level[3..0]
	rFProtectionState: number; // level2[3..0]
}

export interface ProtectionV2ProtectionSupportedReportData {
	exclusiveControl: boolean; // level[1]
	timeout: boolean; // level[0]
	localProtectionState: number; // 2 byte unsigned integer
	rFProtectionState: number; // 2 byte unsigned integer
}

export interface ProtectionV2ProtectionTimeoutReportData {
	timeout: number; // 1 byte unsigned integer
}

export interface ProtectionV2ProtectionTimeoutSetData {
	timeout: number; // 1 byte unsigned integer
}

export class ProtectionV2 extends CommandClassPacket<ProtectionV2Commands> {
	public static readonly commandClass = CommandClasses.Protection; // 0x75 (117)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ProtectionV2, commandAndPayload);
	}

	public static readonly ProtectionEcGet = class ProtectionEcGet extends CommandPacket<void> {
		public static readonly CommandClass = ProtectionV2;
		public static readonly command = 0x07;
		public static readonly definition = convertFromJsonCommand({
			"command": 7,
			"name": "ProtectionEcGet",
			"help": "Protection Ec Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ProtectionV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ProtectionEcGet, data);
		}
	};

	public static readonly ProtectionEcReport = class ProtectionEcReport extends CommandPacket<ProtectionV2ProtectionEcReportData> {
		public static readonly CommandClass = ProtectionV2;
		public static readonly command = 0x08;
		public static readonly definition = convertFromJsonCommand({
			"command": 8,
			"name": "ProtectionEcReport",
			"help": "Protection Ec Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "nodeID",
					"help": "Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ProtectionV2)?.command === this.command;
		}

		constructor(data: Buffer | ProtectionV2ProtectionEcReportData) {
			super(ProtectionEcReport, data);
		}
	};

	public static readonly ProtectionEcSet = class ProtectionEcSet extends CommandPacket<ProtectionV2ProtectionEcSetData> {
		public static readonly CommandClass = ProtectionV2;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "ProtectionEcSet",
			"help": "Protection Ec Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "nodeID",
					"help": "Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ProtectionV2)?.command === this.command;
		}

		constructor(data: Buffer | ProtectionV2ProtectionEcSetData) {
			super(ProtectionEcSet, data);
		}
	};

	public static readonly ProtectionGet = class ProtectionGet extends CommandPacket<void> {
		public static readonly CommandClass = ProtectionV2;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "ProtectionGet",
			"help": "Protection Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ProtectionV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ProtectionGet, data);
		}
	};

	public static readonly ProtectionReport = class ProtectionReport extends CommandPacket<ProtectionV2ProtectionReportData> {
		public static readonly CommandClass = ProtectionV2;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "ProtectionReport",
			"help": "Protection Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "reserved1",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "localProtectionState",
							"mask": 15,
							"shift": 0
						}
					]
				},
				{
					"type": "bitfield",
					"name": "level2",
					"help": "Level2",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "reserved2",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "rFProtectionState",
							"mask": 15,
							"shift": 0
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ProtectionV2)?.command === this.command;
		}

		constructor(data: Buffer | ProtectionV2ProtectionReportData) {
			super(ProtectionReport, data);
		}
	};

	public static readonly ProtectionSet = class ProtectionSet extends CommandPacket<ProtectionV2ProtectionSetData> {
		public static readonly CommandClass = ProtectionV2;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "ProtectionSet",
			"help": "Protection Set",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "reserved1",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "localProtectionState",
							"mask": 15,
							"shift": 0
						}
					]
				},
				{
					"type": "bitfield",
					"name": "level2",
					"help": "Level2",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "reserved2",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "rFProtectionState",
							"mask": 15,
							"shift": 0
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ProtectionV2)?.command === this.command;
		}

		constructor(data: Buffer | ProtectionV2ProtectionSetData) {
			super(ProtectionSet, data);
		}
	};

	public static readonly ProtectionSupportedGet = class ProtectionSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = ProtectionV2;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "ProtectionSupportedGet",
			"help": "Protection Supported Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ProtectionV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ProtectionSupportedGet, data);
		}
	};

	public static readonly ProtectionSupportedReport = class ProtectionSupportedReport extends CommandPacket<ProtectionV2ProtectionSupportedReportData> {
		public static readonly CommandClass = ProtectionV2;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "ProtectionSupportedReport",
			"help": "Protection Supported Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "reserved",
							"mask": 252,
							"shift": 2,
							"reserved": true
						},
						{
							"fieldType": "boolean",
							"name": "exclusiveControl",
							"mask": 2,
							"shift": 1
						},
						{
							"fieldType": "boolean",
							"name": "timeout",
							"mask": 1,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "localProtectionState",
					"help": "Local Protection State",
					"length": 2
				},
				{
					"type": "integer",
					"name": "rFProtectionState",
					"help": "RF Protection State",
					"length": 2
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ProtectionV2)?.command === this.command;
		}

		constructor(data: Buffer | ProtectionV2ProtectionSupportedReportData) {
			super(ProtectionSupportedReport, data);
		}
	};

	public static readonly ProtectionTimeoutGet = class ProtectionTimeoutGet extends CommandPacket<void> {
		public static readonly CommandClass = ProtectionV2;
		public static readonly command = 0x0a;
		public static readonly definition = convertFromJsonCommand({
			"command": 10,
			"name": "ProtectionTimeoutGet",
			"help": "Protection Timeout Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ProtectionV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ProtectionTimeoutGet, data);
		}
	};

	public static readonly ProtectionTimeoutReport = class ProtectionTimeoutReport extends CommandPacket<ProtectionV2ProtectionTimeoutReportData> {
		public static readonly CommandClass = ProtectionV2;
		public static readonly command = 0x0b;
		public static readonly definition = convertFromJsonCommand({
			"command": 11,
			"name": "ProtectionTimeoutReport",
			"help": "Protection Timeout Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ProtectionV2)?.command === this.command;
		}

		constructor(data: Buffer | ProtectionV2ProtectionTimeoutReportData) {
			super(ProtectionTimeoutReport, data);
		}
	};

	public static readonly ProtectionTimeoutSet = class ProtectionTimeoutSet extends CommandPacket<ProtectionV2ProtectionTimeoutSetData> {
		public static readonly CommandClass = ProtectionV2;
		public static readonly command = 0x09;
		public static readonly definition = convertFromJsonCommand({
			"command": 9,
			"name": "ProtectionTimeoutSet",
			"help": "Protection Timeout Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
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
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ProtectionV2)?.command === this.command;
		}

		constructor(data: Buffer | ProtectionV2ProtectionTimeoutSetData) {
			super(ProtectionTimeoutSet, data);
		}
	};
}

export namespace ProtectionV2 {
	export type ProtectionEcGet = InstanceType<typeof ProtectionV2.ProtectionEcGet>;
	export type ProtectionEcReport = InstanceType<typeof ProtectionV2.ProtectionEcReport>;
	export type ProtectionEcSet = InstanceType<typeof ProtectionV2.ProtectionEcSet>;
	export type ProtectionGet = InstanceType<typeof ProtectionV2.ProtectionGet>;
	export type ProtectionReport = InstanceType<typeof ProtectionV2.ProtectionReport>;
	export type ProtectionSet = InstanceType<typeof ProtectionV2.ProtectionSet>;
	export type ProtectionSupportedGet = InstanceType<typeof ProtectionV2.ProtectionSupportedGet>;
	export type ProtectionSupportedReport = InstanceType<typeof ProtectionV2.ProtectionSupportedReport>;
	export type ProtectionTimeoutGet = InstanceType<typeof ProtectionV2.ProtectionTimeoutGet>;
	export type ProtectionTimeoutReport = InstanceType<typeof ProtectionV2.ProtectionTimeoutReport>;
	export type ProtectionTimeoutSet = InstanceType<typeof ProtectionV2.ProtectionTimeoutSet>;
}
