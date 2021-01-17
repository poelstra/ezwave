/**
 * Command Class Version, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

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
	vg: Array<{ // variable length
		firmwareVersion: number; // 1 byte unsigned integer
		firmwareSubVersion: number; // 1 byte unsigned integer
	}>;
}

export interface VersionV3VersionCapabilitiesReportData {
	zWaveSoftware: boolean; // properties1[2]
	commandClass: boolean; // properties1[1]
	version: boolean; // properties1[0]
}

export interface VersionV3VersionZwaveSoftwareReportData {
	sdkVersion: number; // 3 byte unsigned integer
	applicationFrameworkApiVersion: number; // 3 byte unsigned integer
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
			return packet.tryAs(VersionV3)?.command === this.command;
		}

		constructor(data: Buffer | VersionV3VersionCommandClassGetData) {
			super(VersionCommandClassGet, data);
		}
	};

	public static readonly VersionCommandClassReport = class VersionCommandClassReport extends CommandPacket<VersionV3VersionCommandClassReportData> {
		public static readonly CommandClass = VersionV3;
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
			return packet.tryAs(VersionV3)?.command === this.command;
		}

		constructor(data: Buffer | VersionV3VersionCommandClassReportData) {
			super(VersionCommandClassReport, data);
		}
	};

	public static readonly VersionGet = class VersionGet extends CommandPacket<void> {
		public static readonly CommandClass = VersionV3;
		public static readonly command = 0x11;
		public static readonly definition = convertFromJsonCommand({
			"command": 17,
			"name": "VersionGet",
			"help": "Version Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

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
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 21,
			"name": "VersionCapabilitiesGet",
			"help": "Version Capabilities Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 22,
			"name": "VersionCapabilitiesReport",
			"help": "Version Capabilities Report",
			"status": "Active",
			"params": [
				{
					"type": "Bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "Integer",
							"name": "reserved1",
							"mask": 248,
							"shift": 3,
							"reserved": true
						},
						{
							"fieldType": "Boolean",
							"name": "zWaveSoftware",
							"mask": 4,
							"shift": 2
						},
						{
							"fieldType": "Boolean",
							"name": "commandClass",
							"mask": 2,
							"shift": 1
						},
						{
							"fieldType": "Boolean",
							"name": "version",
							"mask": 1,
							"shift": 0
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 23,
			"name": "VersionZwaveSoftwareGet",
			"help": "Version Z-Wave Software Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 24,
			"name": "VersionZwaveSoftwareReport",
			"help": "Version Z-Wave Software Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "sdkVersion",
					"help": "SDK version",
					"length": 3
				},
				{
					"type": "Integer",
					"name": "applicationFrameworkApiVersion",
					"help": "Application Framework API Version",
					"length": 3
				},
				{
					"type": "Integer",
					"name": "applicationFrameworkBuildNumber",
					"help": "Application Framework Build Number",
					"length": 2
				},
				{
					"type": "Integer",
					"name": "hostInterfaceVersion",
					"help": "Host Interface Version",
					"length": 3
				},
				{
					"type": "Integer",
					"name": "hostInterfaceBuildNumber",
					"help": "Host Interface Build Number",
					"length": 2
				},
				{
					"type": "Integer",
					"name": "zWaveProtocolVersion",
					"help": "Z-Wave Protocol Version",
					"length": 3
				},
				{
					"type": "Integer",
					"name": "zWaveProtocolBuildNumber",
					"help": "Z-Wave Protocol Build Number",
					"length": 2
				},
				{
					"type": "Integer",
					"name": "applicationVersion",
					"help": "Application Version",
					"length": 3
				},
				{
					"type": "Integer",
					"name": "applicationBuildNumber",
					"help": "Application Build Number",
					"length": 2
				}
			]
		} as jsonSpec.CommandDefinition);

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
