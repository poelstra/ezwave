/**
 * Command Class Z/IP Portal, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	public static readonly commandClass: number = CommandClasses.ZipPortal; // 0x61 (97)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ZipPortalV1, commandAndPayload);
	}
}

export class GatewayConfigurationSet extends CommandPacket<ZipPortalV1GatewayConfigurationSetData> {
	public static readonly CommandClass: typeof ZipPortalV1 = ZipPortalV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ZipPortalV1)?.command === this.command;
	}

	public constructor(data: Buffer | ZipPortalV1GatewayConfigurationSetData) {
		super(GatewayConfigurationSet, data);
	}
};

export class GatewayConfigurationStatus extends CommandPacket<ZipPortalV1GatewayConfigurationStatusData> {
	public static readonly CommandClass: typeof ZipPortalV1 = ZipPortalV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ZipPortalV1)?.command === this.command;
	}

	public constructor(data: Buffer | ZipPortalV1GatewayConfigurationStatusData) {
		super(GatewayConfigurationStatus, data);
	}
};

export class GatewayConfigurationGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof ZipPortalV1 = ZipPortalV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "GatewayConfigurationGet",
		"help": "Gateway Configuration Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ZipPortalV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(GatewayConfigurationGet, data);
	}
};

export class GatewayConfigurationReport extends CommandPacket<ZipPortalV1GatewayConfigurationReportData> {
	public static readonly CommandClass: typeof ZipPortalV1 = ZipPortalV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ZipPortalV1)?.command === this.command;
	}

	public constructor(data: Buffer | ZipPortalV1GatewayConfigurationReportData) {
		super(GatewayConfigurationReport, data);
	}
};
