/**
 * Command Class Version, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

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
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(VersionV1, commandAndPayload);
	}

	public static readonly VersionCommandClassGet = class VersionCommandClassGet extends CommandPacket<VersionV1VersionCommandClassGetData> {
		public static readonly CommandClass = VersionV1;
		public static readonly command = 0x13;
		public static readonly definition = convertFromJsonCommand({
			"command": 19,
			"name": "VersionCommandClassGet",
			"help": "Version Command Class Get",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "requestedCommandClass",
					"help": "Requested Command Class",
					"length": 1,
					"valueType": "CommandClass"
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 20,
			"name": "VersionCommandClassReport",
			"help": "Version Command Class Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "requestedCommandClass",
					"help": "Requested Command Class",
					"length": 1,
					"valueType": "CommandClass"
				},
				{
					"type": "Integer",
					"name": "commandClassVersion",
					"help": "Command Class Version",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 17,
			"name": "VersionGet",
			"help": "Version Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 18,
			"name": "VersionReport",
			"help": "Version Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "zWaveLibraryType",
					"help": "Z-Wave Library Type",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "zWaveProtocolVersion",
					"help": "Z-Wave Protocol Version",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "zWaveProtocolSubVersion",
					"help": "Z-Wave Protocol Sub Version",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "applicationVersion",
					"help": "Application Version",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "applicationSubVersion",
					"help": "Application Sub Version",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

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
