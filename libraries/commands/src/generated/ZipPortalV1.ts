/**
 * Command Class Z/IP Portal, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandClasses, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum ZipPortalV1Commands {
	GatewayConfigurationSet = 0x01,
	GatewayConfigurationStatus = 0x02,
	GatewayConfigurationGet = 0x03,
	GatewayConfigurationReport = 0x04,
}

export interface ZipPortalV1GatewayConfigurationSetData {
	lanIpv6Address: Buffer; // 16 bytes
	lanIpv6PrefixLength: number; // 1 byte unsigned integer
	portalIpv6Prefix: Buffer; // 16 bytes
	portalIpv6PrefixLength: number; // 1 byte unsigned integer
	defaultGatewayIpv6Address: Buffer; // 16 bytes
	panIpv6Prefix: Buffer; // 16 bytes
}

export interface ZipPortalV1GatewayConfigurationStatusData {
	status: number; // 1 byte unsigned integer
}

export interface ZipPortalV1GatewayConfigurationReportData {
	lanIpv6Address: Buffer; // 16 bytes
	lanIpv6PrefixLength: number; // 1 byte unsigned integer
	portalIpv6Prefix: Buffer; // 16 bytes
	portalIpv6PrefixLength: number; // 1 byte unsigned integer
	defaultGatewayIpv6Address: Buffer; // 16 bytes
	panIpv6Prefix: Buffer; // 16 bytes
}

export class ZipPortalV1 extends CommandClassPacket<ZipPortalV1Commands> {
	public static readonly commandClass = CommandClasses.ZipPortal; // 0x61 (97)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ZipPortalV1, commandAndPayload);
	}

	public static readonly GatewayConfigurationSet = class GatewayConfigurationSet extends CommandPacket<ZipPortalV1GatewayConfigurationSetData> {
		public static readonly CommandClass = ZipPortalV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "GatewayConfigurationSet",
			"help": "Gateway Configuration Set",
			"status": "Active",
			"params": [
				{
					"type": "Blob",
					"name": "lanIpv6Address",
					"help": "LAN IPv6 Address",
					"length": 16
				},
				{
					"type": "Integer",
					"name": "lanIpv6PrefixLength",
					"help": "LAN IPv6 Prefix Length",
					"length": 1
				},
				{
					"type": "Blob",
					"name": "portalIpv6Prefix",
					"help": "Portal IPv6 Prefix",
					"length": 16
				},
				{
					"type": "Integer",
					"name": "portalIpv6PrefixLength",
					"help": "Portal IPv6 Prefix Length",
					"length": 1
				},
				{
					"type": "Blob",
					"name": "defaultGatewayIpv6Address",
					"help": "Default Gateway IPv6 Address",
					"length": 16
				},
				{
					"type": "Blob",
					"name": "panIpv6Prefix",
					"help": "PAN IPv6 Prefix",
					"length": 16
				}
			]
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipPortalV1)?.command === this.command;
		}

		constructor(data: Buffer | ZipPortalV1GatewayConfigurationSetData) {
			super(GatewayConfigurationSet, data);
		}
	};

	public static readonly GatewayConfigurationStatus = class GatewayConfigurationStatus extends CommandPacket<ZipPortalV1GatewayConfigurationStatusData> {
		public static readonly CommandClass = ZipPortalV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "GatewayConfigurationStatus",
			"help": "Gateway Configuration Status",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "status",
					"help": "Status",
					"length": 1
				}
			]
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipPortalV1)?.command === this.command;
		}

		constructor(data: Buffer | ZipPortalV1GatewayConfigurationStatusData) {
			super(GatewayConfigurationStatus, data);
		}
	};

	public static readonly GatewayConfigurationGet = class GatewayConfigurationGet extends CommandPacket<void> {
		public static readonly CommandClass = ZipPortalV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "GatewayConfigurationGet",
			"help": "Gateway Configuration Get",
			"status": "Active",
			"params": []
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipPortalV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(GatewayConfigurationGet, data);
		}
	};

	public static readonly GatewayConfigurationReport = class GatewayConfigurationReport extends CommandPacket<ZipPortalV1GatewayConfigurationReportData> {
		public static readonly CommandClass = ZipPortalV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "GatewayConfigurationReport",
			"help": "Gateway Configuration Report",
			"status": "Active",
			"params": [
				{
					"type": "Blob",
					"name": "lanIpv6Address",
					"help": "LAN IPv6 Address",
					"length": 16
				},
				{
					"type": "Integer",
					"name": "lanIpv6PrefixLength",
					"help": "LAN IPv6 Prefix Length",
					"length": 1
				},
				{
					"type": "Blob",
					"name": "portalIpv6Prefix",
					"help": "Portal IPv6 Prefix",
					"length": 16
				},
				{
					"type": "Integer",
					"name": "portalIpv6PrefixLength",
					"help": "Portal IPv6 Prefix Length",
					"length": 1
				},
				{
					"type": "Blob",
					"name": "defaultGatewayIpv6Address",
					"help": "Default Gateway IPv6 Address",
					"length": 16
				},
				{
					"type": "Blob",
					"name": "panIpv6Prefix",
					"help": "PAN IPv6 Prefix",
					"length": 16
				}
			]
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipPortalV1)?.command === this.command;
		}

		constructor(data: Buffer | ZipPortalV1GatewayConfigurationReportData) {
			super(GatewayConfigurationReport, data);
		}
	};
}

export namespace ZipPortalV1 {
	export type GatewayConfigurationSet = InstanceType<typeof ZipPortalV1.GatewayConfigurationSet>;
	export type GatewayConfigurationStatus = InstanceType<typeof ZipPortalV1.GatewayConfigurationStatus>;
	export type GatewayConfigurationGet = InstanceType<typeof ZipPortalV1.GatewayConfigurationGet>;
	export type GatewayConfigurationReport = InstanceType<typeof ZipPortalV1.GatewayConfigurationReport>;
}
