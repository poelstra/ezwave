/**
 * Command Class Version, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum VersionV2Commands {
	VersionCommandClassGet = 0x13,
	VersionCommandClassReport = 0x14,
	VersionGet = 0x11,
	VersionReport = 0x12,
}

export interface VersionV2VersionCommandClassGetData {
	requestedCommandClass: number; // 1 byte unsigned integer
}

export interface VersionV2VersionCommandClassReportData {
	requestedCommandClass: number; // 1 byte unsigned integer
	commandClassVersion: number; // 1 byte unsigned integer
}

export interface VersionV2VersionReportData {
	zWaveLibraryType: number; // 1 byte unsigned integer
	zWaveProtocolVersion: number; // 1 byte unsigned integer
	zWaveProtocolSubVersion: number; // 1 byte unsigned integer
	firmware0Version: number; // 1 byte unsigned integer
	firmware0SubVersion: number; // 1 byte unsigned integer
	hardwareVersion: number; // 1 byte unsigned integer
	// TODO param vg type group
}

export class VersionV2 extends CommandClassPacket<VersionV2Commands> {
	public static readonly commandClass = CommandClasses.Version; // 0x86 (134)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(VersionV2, commandAndPayload);
	}

	public static readonly VersionCommandClassGet = class VersionCommandClassGet extends CommandPacket<VersionV2VersionCommandClassGetData> {
		public static readonly CommandClass = VersionV2;
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
			return packet.tryAs(VersionV2)?.command === this.command;
		}

		constructor(data: Buffer | VersionV2VersionCommandClassGetData) {
			super(VersionCommandClassGet, data);
		}
	};

	public static readonly VersionCommandClassReport = class VersionCommandClassReport extends CommandPacket<VersionV2VersionCommandClassReportData> {
		public static readonly CommandClass = VersionV2;
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
			return packet.tryAs(VersionV2)?.command === this.command;
		}

		constructor(data: Buffer | VersionV2VersionCommandClassReportData) {
			super(VersionCommandClassReport, data);
		}
	};

	public static readonly VersionGet = class VersionGet extends CommandPacket<void> {
		public static readonly CommandClass = VersionV2;
		public static readonly command = 0x11;
		public static readonly definition = {
			"command": 17,
			"name": "VersionGet",
			"help": "Version Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(VersionV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(VersionGet, data);
		}
	};

	public static readonly VersionReport = class VersionReport extends CommandPacket<VersionV2VersionReportData> {
		public static readonly CommandClass = VersionV2;
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
					"name": "firmware0Version",
					"help": "Firmware 0 Version",
					"length": 1
				},
				{
					"type": "integer",
					"name": "firmware0SubVersion",
					"help": "Firmware 0 Sub Version",
					"length": 1
				},
				{
					"type": "integer",
					"name": "hardwareVersion",
					"help": "Hardware Version",
					"length": 1
				},
				{
					"type": "integer",
					"name": "numberOfFirmwareTargets",
					"help": "Number of firmware targets",
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
					"type": "group",
					"name": "vg",
					"help": "vg",
					"length": {
						"lengthType": "ref",
						"ref": "numberOfFirmwareTargets"
					},
					"params": [
						{
							"type": "integer",
							"name": "firmwareVersion",
							"help": "Firmware Version",
							"length": 1
						},
						{
							"type": "integer",
							"name": "firmwareSubVersion",
							"help": "Firmware Sub Version",
							"length": 1
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(VersionV2)?.command === this.command;
		}

		constructor(data: Buffer | VersionV2VersionReportData) {
			super(VersionReport, data);
		}
	};
}

export namespace VersionV2 {
	export type VersionCommandClassGet = InstanceType<typeof VersionV2.VersionCommandClassGet>;
	export type VersionCommandClassReport = InstanceType<typeof VersionV2.VersionCommandClassReport>;
	export type VersionGet = InstanceType<typeof VersionV2.VersionGet>;
	export type VersionReport = InstanceType<typeof VersionV2.VersionReport>;
}
