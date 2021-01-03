/**
 * Command Class Z/IP Portal, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ZipPortalV1Commands {
	GatewayConfigurationSet = 0x01,
	GatewayConfigurationStatus = 0x02,
	GatewayConfigurationGet = 0x03,
	GatewayConfigurationReport = 0x04,
}

export interface ZipPortalV1GatewayConfigurationSetData {
	lANIPv6Address: Buffer; // 16 bytes
	lANIPv6PrefixLength: number; // 1 byte unsigned integer
	portalIPv6Prefix: Buffer; // 16 bytes
	portalIPv6PrefixLength: number; // 1 byte unsigned integer
	defaultGatewayIPv6Address: Buffer; // 16 bytes
	pANIPv6Prefix: Buffer; // 16 bytes
}

export interface ZipPortalV1GatewayConfigurationStatusData {
	status: number; // 1 byte unsigned integer
}

export interface ZipPortalV1GatewayConfigurationReportData {
	lANIPv6Address: Buffer; // 16 bytes
	lANIPv6PrefixLength: number; // 1 byte unsigned integer
	portalIPv6Prefix: Buffer; // 16 bytes
	portalIPv6PrefixLength: number; // 1 byte unsigned integer
	defaultGatewayIPv6Address: Buffer; // 16 bytes
	pANIPv6Prefix: Buffer; // 16 bytes
}

export class ZipPortalV1 extends CommandClassPacket<ZipPortalV1Commands> {
	public static readonly commandClass = CommandClasses.ZipPortal; // 0x61 (97)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ZipPortalV1, commandAndPayload);
	}

	public static readonly GatewayConfigurationSet = class GatewayConfigurationSet extends CommandPacket<ZipPortalV1GatewayConfigurationSetData> {
		public static readonly CommandClass = ZipPortalV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "GatewayConfigurationSet",
			"help": "Gateway Configuration Set",
			"status": "active",
			"params": [
				{
					"type": "blob",
					"name": "lANIPv6Address",
					"help": "LAN IPv6 Address",
					"length": 16
				},
				{
					"type": "integer",
					"name": "lANIPv6PrefixLength",
					"help": "LAN IPv6 Prefix Length",
					"length": 1
				},
				{
					"type": "blob",
					"name": "portalIPv6Prefix",
					"help": "Portal IPv6 Prefix",
					"length": 16
				},
				{
					"type": "integer",
					"name": "portalIPv6PrefixLength",
					"help": "Portal IPv6 Prefix Length",
					"length": 1
				},
				{
					"type": "blob",
					"name": "defaultGatewayIPv6Address",
					"help": "Default Gateway IPv6 Address",
					"length": 16
				},
				{
					"type": "blob",
					"name": "pANIPv6Prefix",
					"help": "PAN IPv6 Prefix",
					"length": 16
				}
			]
		} as CommandDefinition;

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
		public static readonly definition = {
			"command": 2,
			"name": "GatewayConfigurationStatus",
			"help": "Gateway Configuration Status",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "status",
					"help": "Status",
					"length": 1
				}
			]
		} as CommandDefinition;

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
		public static readonly definition = {
			"command": 3,
			"name": "GatewayConfigurationGet",
			"help": "Gateway Configuration Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

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
		public static readonly definition = {
			"command": 4,
			"name": "GatewayConfigurationReport",
			"help": "Gateway Configuration Report",
			"status": "active",
			"params": [
				{
					"type": "blob",
					"name": "lANIPv6Address",
					"help": "LAN IPv6 Address",
					"length": 16
				},
				{
					"type": "integer",
					"name": "lANIPv6PrefixLength",
					"help": "LAN IPv6 Prefix Length",
					"length": 1
				},
				{
					"type": "blob",
					"name": "portalIPv6Prefix",
					"help": "Portal IPv6 Prefix",
					"length": 16
				},
				{
					"type": "integer",
					"name": "portalIPv6PrefixLength",
					"help": "Portal IPv6 Prefix Length",
					"length": 1
				},
				{
					"type": "blob",
					"name": "defaultGatewayIPv6Address",
					"help": "Default Gateway IPv6 Address",
					"length": 16
				},
				{
					"type": "blob",
					"name": "pANIPv6Prefix",
					"help": "PAN IPv6 Prefix",
					"length": 16
				}
			]
		} as CommandDefinition;

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
