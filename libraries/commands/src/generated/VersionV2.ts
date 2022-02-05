/**
 * Command Class Version, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandClasses, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	vg: Array<{ // variable length
		firmwareVersion: number; // 1 byte unsigned integer
		firmwareSubVersion: number; // 1 byte unsigned integer
	}>;
}

export class VersionV2 extends CommandClassPacket<VersionV2Commands> {
	public static readonly commandClass = CommandClasses.Version; // 0x86 (134)
	public static readonly version = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(VersionV2, commandAndPayload);
	}

	public static readonly VersionCommandClassGet = class VersionCommandClassGet extends CommandPacket<VersionV2VersionCommandClassGetData> {
		public static readonly CommandClass = VersionV2;
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
		} as JsonCommandDefinition);

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
		} as JsonCommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 17,
			"name": "VersionGet",
			"help": "Version Get",
			"status": "Active",
			"params": []
		} as JsonCommandDefinition);

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
					"name": "firmware0Version",
					"help": "Firmware 0 Version",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "firmware0SubVersion",
					"help": "Firmware 0 Sub Version",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "hardwareVersion",
					"help": "Hardware Version",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "numberOfFirmwareTargets",
					"help": "Number of firmware targets",
					"length": 1,
					"lengthOf": {
						"refs": [
							"vg"
						]
					},
					"isAutogenerated": true
				},
				{
					"type": "Group",
					"name": "vg",
					"help": "vg",
					"length": {
						"lengthType": "Ref",
						"from": {
							"ref": "numberOfFirmwareTargets"
						}
					},
					"params": [
						{
							"type": "Integer",
							"name": "firmwareVersion",
							"help": "Firmware Version",
							"length": 1
						},
						{
							"type": "Integer",
							"name": "firmwareSubVersion",
							"help": "Firmware Sub Version",
							"length": 1
						}
					]
				}
			]
		} as JsonCommandDefinition);

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
