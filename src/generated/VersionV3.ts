/**
 * Command Class Version, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum VersionV3Commands {
	VersionCommandClassGet = 0x13,
	VersionCommandClassReport = 0x14,
	VersionGet = 0x11,
	VersionReport = 0x12,
	VersionCapabilitiesGet = 0x15,
	VersionCapabilitiesReport = 0x16,
	VersionZwaveSoftwareGet = 0x17,
	VersionZwaveSoftwareReport = 0x18,
}

export interface VersionV3VersionCommandClassGetData {
	requestedCommandClass: number; // 1 byte unsigned integer
}

export interface VersionV3VersionCommandClassReportData {
	requestedCommandClass: number; // 1 byte unsigned integer
	commandClassVersion: number; // 1 byte unsigned integer
}

export interface VersionV3VersionReportData {
	zWaveLibraryType: number; // 1 byte unsigned integer
	zWaveProtocolVersion: number; // 1 byte unsigned integer
	zWaveProtocolSubVersion: number; // 1 byte unsigned integer
	firmware0Version: number; // 1 byte unsigned integer
	firmware0SubVersion: number; // 1 byte unsigned integer
	hardwareVersion: number; // 1 byte unsigned integer
	numberOfFirmwareTargets: number; // 1 byte unsigned integer
	// TODO param vg type group
}

export interface VersionV3VersionCapabilitiesReportData {
	zWaveSoftware: boolean; // properties1[2]
	commandClass: boolean; // properties1[1]
	version: boolean; // properties1[0]
}

export interface VersionV3VersionZwaveSoftwareReportData {
	sDKVersion: number; // 3 byte unsigned integer
	applicationFrameworkAPIVersion: number; // 3 byte unsigned integer
	applicationFrameworkBuildNumber: number; // 2 byte unsigned integer
	hostInterfaceVersion: number; // 3 byte unsigned integer
	hostInterfaceBuildNumber: number; // 2 byte unsigned integer
	zWaveProtocolVersion: number; // 3 byte unsigned integer
	zWaveProtocolBuildNumber: number; // 2 byte unsigned integer
	applicationVersion: number; // 3 byte unsigned integer
	applicationBuildNumber: number; // 2 byte unsigned integer
}

export class VersionV3 extends CommandClassPacket<VersionV3Commands> {
	public static readonly commandClass = CommandClasses.Version; // 0x86 (134)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(VersionV3, commandAndPayload);
	}

	public static readonly VersionCommandClassGet = class VersionCommandClassGet extends CommandPacket<VersionV3VersionCommandClassGetData> {
		public static readonly CommandClass = VersionV3;
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
			return packet.tryAs(VersionV3)?.command === this.command;
		}

		constructor(data: Buffer | VersionV3VersionCommandClassGetData) {
			super(VersionCommandClassGet, data);
		}
	};

	public static readonly VersionCommandClassReport = class VersionCommandClassReport extends CommandPacket<VersionV3VersionCommandClassReportData> {
		public static readonly CommandClass = VersionV3;
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
			return packet.tryAs(VersionV3)?.command === this.command;
		}

		constructor(data: Buffer | VersionV3VersionCommandClassReportData) {
			super(VersionCommandClassReport, data);
		}
	};

	public static readonly VersionGet = class VersionGet extends CommandPacket<void> {
		public static readonly CommandClass = VersionV3;
		public static readonly command = 0x11;
		public static readonly definition = {
			"command": 17,
			"name": "VersionGet",
			"help": "Version Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(VersionV3)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(VersionGet, data);
		}
	};

	public static readonly VersionReport = class VersionReport extends CommandPacket<VersionV3VersionReportData> {
		public static readonly CommandClass = VersionV3;
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
					"length": 1
				},
				{
					"type": "group",
					"name": "vg",
					"help": "vg",
					"length": {
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
			return packet.tryAs(VersionV3)?.command === this.command;
		}

		constructor(data: Buffer | VersionV3VersionReportData) {
			super(VersionReport, data);
		}
	};

	public static readonly VersionCapabilitiesGet = class VersionCapabilitiesGet extends CommandPacket<void> {
		public static readonly CommandClass = VersionV3;
		public static readonly command = 0x15;
		public static readonly definition = {
			"command": 21,
			"name": "VersionCapabilitiesGet",
			"help": "Version Capabilities Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(VersionV3)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(VersionCapabilitiesGet, data);
		}
	};

	public static readonly VersionCapabilitiesReport = class VersionCapabilitiesReport extends CommandPacket<VersionV3VersionCapabilitiesReportData> {
		public static readonly CommandClass = VersionV3;
		public static readonly command = 0x16;
		public static readonly definition = {
			"command": 22,
			"name": "VersionCapabilitiesReport",
			"help": "Version Capabilities Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved1",
							"mask": 248,
							"shift": 3,
							"reserved": true
						},
						{
							"type": "boolean",
							"name": "zWaveSoftware",
							"mask": 4,
							"shift": 2
						},
						{
							"type": "boolean",
							"name": "commandClass",
							"mask": 2,
							"shift": 1
						},
						{
							"type": "boolean",
							"name": "version",
							"mask": 1,
							"shift": 0
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(VersionV3)?.command === this.command;
		}

		constructor(data: Buffer | VersionV3VersionCapabilitiesReportData) {
			super(VersionCapabilitiesReport, data);
		}
	};

	public static readonly VersionZwaveSoftwareGet = class VersionZwaveSoftwareGet extends CommandPacket<void> {
		public static readonly CommandClass = VersionV3;
		public static readonly command = 0x17;
		public static readonly definition = {
			"command": 23,
			"name": "VersionZwaveSoftwareGet",
			"help": "Version Z-Wave Software Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(VersionV3)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(VersionZwaveSoftwareGet, data);
		}
	};

	public static readonly VersionZwaveSoftwareReport = class VersionZwaveSoftwareReport extends CommandPacket<VersionV3VersionZwaveSoftwareReportData> {
		public static readonly CommandClass = VersionV3;
		public static readonly command = 0x18;
		public static readonly definition = {
			"command": 24,
			"name": "VersionZwaveSoftwareReport",
			"help": "Version Z-Wave Software Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "sDKVersion",
					"help": "SDK version",
					"length": 3
				},
				{
					"type": "integer",
					"name": "applicationFrameworkAPIVersion",
					"help": "Application Framework API Version",
					"length": 3
				},
				{
					"type": "integer",
					"name": "applicationFrameworkBuildNumber",
					"help": "Application Framework Build Number",
					"length": 2
				},
				{
					"type": "integer",
					"name": "hostInterfaceVersion",
					"help": "Host Interface Version",
					"length": 3
				},
				{
					"type": "integer",
					"name": "hostInterfaceBuildNumber",
					"help": "Host Interface Build Number",
					"length": 2
				},
				{
					"type": "integer",
					"name": "zWaveProtocolVersion",
					"help": "Z-Wave Protocol Version",
					"length": 3
				},
				{
					"type": "integer",
					"name": "zWaveProtocolBuildNumber",
					"help": "Z-Wave Protocol Build Number",
					"length": 2
				},
				{
					"type": "integer",
					"name": "applicationVersion",
					"help": "Application Version",
					"length": 3
				},
				{
					"type": "integer",
					"name": "applicationBuildNumber",
					"help": "Application Build Number",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(VersionV3)?.command === this.command;
		}

		constructor(data: Buffer | VersionV3VersionZwaveSoftwareReportData) {
			super(VersionZwaveSoftwareReport, data);
		}
	};
}

export namespace VersionV3 {
	export type VersionCommandClassGet = InstanceType<typeof VersionV3.VersionCommandClassGet>;
	export type VersionCommandClassReport = InstanceType<typeof VersionV3.VersionCommandClassReport>;
	export type VersionGet = InstanceType<typeof VersionV3.VersionGet>;
	export type VersionReport = InstanceType<typeof VersionV3.VersionReport>;
	export type VersionCapabilitiesGet = InstanceType<typeof VersionV3.VersionCapabilitiesGet>;
	export type VersionCapabilitiesReport = InstanceType<typeof VersionV3.VersionCapabilitiesReport>;
	export type VersionZwaveSoftwareGet = InstanceType<typeof VersionV3.VersionZwaveSoftwareGet>;
	export type VersionZwaveSoftwareReport = InstanceType<typeof VersionV3.VersionZwaveSoftwareReport>;
}
