/**
 * Command Class Version, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum VersionV1Commands {
	VersionCommandClassGet = 0x13,
	VersionCommandClassReport = 0x14,
	VersionGet = 0x11,
	VersionReport = 0x12,
}

export interface VersionV1VersionCommandClassGetData {
	requestedCommandClass: number; // 1 byte unsigned integer
}

export interface VersionV1VersionCommandClassReportData {
	requestedCommandClass: number; // 1 byte unsigned integer
	commandClassVersion: number; // 1 byte unsigned integer
}

export interface VersionV1VersionReportData {
	zWaveLibraryType: number; // 1 byte unsigned integer
	zWaveProtocolVersion: number; // 1 byte unsigned integer
	zWaveProtocolSubVersion: number; // 1 byte unsigned integer
	applicationVersion: number; // 1 byte unsigned integer
	applicationSubVersion: number; // 1 byte unsigned integer
}

export class VersionV1 extends CommandClassPacket<VersionV1Commands> {
	public static readonly commandClass = CommandClasses.Version; // 0x86 (134)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(VersionV1, commandAndPayload);
	}

	public static readonly VersionCommandClassGet = class VersionCommandClassGet extends CommandPacket<VersionV1VersionCommandClassGetData> {
		public static readonly CommandClass = VersionV1;
		public static readonly command = 0x13;
		public static readonly definition = {
			"command": 19,
			"name": "VersionCommandClassGet",
			"help": "Version Command Class Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "requestedCommandClass",
					"help": "Requested Command Class",
					"length": 1,
					"valueType": "CMD_CLASS_REF"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(VersionV1)?.command === this.command;
		}

		constructor(data: Buffer | VersionV1VersionCommandClassGetData) {
			super(VersionCommandClassGet, data);
		}
	};

	public static readonly VersionCommandClassReport = class VersionCommandClassReport extends CommandPacket<VersionV1VersionCommandClassReportData> {
		public static readonly CommandClass = VersionV1;
		public static readonly command = 0x14;
		public static readonly definition = {
			"command": 20,
			"name": "VersionCommandClassReport",
			"help": "Version Command Class Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "requestedCommandClass",
					"help": "Requested Command Class",
					"length": 1,
					"valueType": "CMD_CLASS_REF"
				},
				{
					"type": "integer",
					"name": "commandClassVersion",
					"help": "Command Class Version",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(VersionV1)?.command === this.command;
		}

		constructor(data: Buffer | VersionV1VersionCommandClassReportData) {
			super(VersionCommandClassReport, data);
		}
	};

	public static readonly VersionGet = class VersionGet extends CommandPacket<void> {
		public static readonly CommandClass = VersionV1;
		public static readonly command = 0x11;
		public static readonly definition = {
			"command": 17,
			"name": "VersionGet",
			"help": "Version Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(VersionV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(VersionGet, data);
		}
	};

	public static readonly VersionReport = class VersionReport extends CommandPacket<VersionV1VersionReportData> {
		public static readonly CommandClass = VersionV1;
		public static readonly command = 0x12;
		public static readonly definition = {
			"command": 18,
			"name": "VersionReport",
			"help": "Version Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "zWaveLibraryType",
					"help": "Z-Wave Library Type",
					"length": 1
				},
				{
					"type": "integer",
					"name": "zWaveProtocolVersion",
					"help": "Z-Wave Protocol Version",
					"length": 1
				},
				{
					"type": "integer",
					"name": "zWaveProtocolSubVersion",
					"help": "Z-Wave Protocol Sub Version",
					"length": 1
				},
				{
					"type": "integer",
					"name": "applicationVersion",
					"help": "Application Version",
					"length": 1
				},
				{
					"type": "integer",
					"name": "applicationSubVersion",
					"help": "Application Sub Version",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(VersionV1)?.command === this.command;
		}

		constructor(data: Buffer | VersionV1VersionReportData) {
			super(VersionReport, data);
		}
	};
}

export namespace VersionV1 {
	export type VersionCommandClassGet = InstanceType<typeof VersionV1.VersionCommandClassGet>;
	export type VersionCommandClassReport = InstanceType<typeof VersionV1.VersionCommandClassReport>;
	export type VersionGet = InstanceType<typeof VersionV1.VersionGet>;
	export type VersionReport = InstanceType<typeof VersionV1.VersionReport>;
}
