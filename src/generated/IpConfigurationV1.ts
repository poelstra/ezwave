/**
 * Command Class Ip Configuration, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum IpConfigurationV1Commands {
	IpConfigurationGet = 0x02,
	IpConfigurationRelease = 0x04,
	IpConfigurationRenew = 0x05,
	IpConfigurationReport = 0x03,
	IpConfigurationSet = 0x01,
}

export interface IpConfigurationV1IpConfigurationReportData {
	autoIp: boolean; // properties1[1]
	autoDns: boolean; // properties1[0]
	ipAddress: number; // 4 byte unsigned integer
	subnetMask: number; // 4 byte unsigned integer
	gateway: number; // 4 byte unsigned integer
	dns1: number; // 4 byte unsigned integer
	dns2: number; // 4 byte unsigned integer
	leaseTime: number; // 4 byte unsigned integer
}

export interface IpConfigurationV1IpConfigurationSetData {
	autoIp: boolean; // properties1[1]
	autoDns: boolean; // properties1[0]
	ipAddress: number; // 4 byte unsigned integer
	subnetMask: number; // 4 byte unsigned integer
	gateway: number; // 4 byte unsigned integer
	dns1: number; // 4 byte unsigned integer
	dns2: number; // 4 byte unsigned integer
}

// Obsolete
export class IpConfigurationV1 extends CommandClassPacket<IpConfigurationV1Commands> {
	public static readonly commandClass = CommandClasses.IpConfiguration; // 0x9a (154)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(IpConfigurationV1, commandAndPayload);
	}

	public static readonly IpConfigurationGet = class IpConfigurationGet extends CommandPacket<void> {
		public static readonly CommandClass = IpConfigurationV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "IpConfigurationGet",
			"help": "Ip Configuration Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(IpConfigurationV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(IpConfigurationGet, data);
		}
	};

	public static readonly IpConfigurationRelease = class IpConfigurationRelease extends CommandPacket<void> {
		public static readonly CommandClass = IpConfigurationV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "IpConfigurationRelease",
			"help": "Ip Configuration Release",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(IpConfigurationV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(IpConfigurationRelease, data);
		}
	};

	public static readonly IpConfigurationRenew = class IpConfigurationRenew extends CommandPacket<void> {
		public static readonly CommandClass = IpConfigurationV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "IpConfigurationRenew",
			"help": "Ip Configuration Renew",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(IpConfigurationV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(IpConfigurationRenew, data);
		}
	};

	public static readonly IpConfigurationReport = class IpConfigurationReport extends CommandPacket<IpConfigurationV1IpConfigurationReportData> {
		public static readonly CommandClass = IpConfigurationV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "IpConfigurationReport",
			"help": "Ip Configuration Report",
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
							"name": "reserved",
							"mask": 252,
							"shift": 2,
							"reserved": true
						},
						{
							"fieldType": "Boolean",
							"name": "autoIp",
							"mask": 2,
							"shift": 1
						},
						{
							"fieldType": "Boolean",
							"name": "autoDns",
							"mask": 1,
							"shift": 0
						}
					]
				},
				{
					"type": "Integer",
					"name": "ipAddress",
					"help": "IP Address",
					"length": 4
				},
				{
					"type": "Integer",
					"name": "subnetMask",
					"help": "Subnet Mask",
					"length": 4
				},
				{
					"type": "Integer",
					"name": "gateway",
					"help": "Gateway",
					"length": 4
				},
				{
					"type": "Integer",
					"name": "dns1",
					"help": "DNS1",
					"length": 4
				},
				{
					"type": "Integer",
					"name": "dns2",
					"help": "DNS2",
					"length": 4
				},
				{
					"type": "Integer",
					"name": "leaseTime",
					"help": "LeaseTime",
					"length": 4
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(IpConfigurationV1)?.command === this.command;
		}

		constructor(data: Buffer | IpConfigurationV1IpConfigurationReportData) {
			super(IpConfigurationReport, data);
		}
	};

	public static readonly IpConfigurationSet = class IpConfigurationSet extends CommandPacket<IpConfigurationV1IpConfigurationSetData> {
		public static readonly CommandClass = IpConfigurationV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "IpConfigurationSet",
			"help": "Ip Configuration Set",
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
							"name": "reserved",
							"mask": 252,
							"shift": 2,
							"reserved": true
						},
						{
							"fieldType": "Boolean",
							"name": "autoIp",
							"mask": 2,
							"shift": 1
						},
						{
							"fieldType": "Boolean",
							"name": "autoDns",
							"mask": 1,
							"shift": 0
						}
					]
				},
				{
					"type": "Integer",
					"name": "ipAddress",
					"help": "IP Address",
					"length": 4
				},
				{
					"type": "Integer",
					"name": "subnetMask",
					"help": "Subnet Mask",
					"length": 4
				},
				{
					"type": "Integer",
					"name": "gateway",
					"help": "Gateway",
					"length": 4
				},
				{
					"type": "Integer",
					"name": "dns1",
					"help": "DNS1",
					"length": 4
				},
				{
					"type": "Integer",
					"name": "dns2",
					"help": "DNS2",
					"length": 4
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(IpConfigurationV1)?.command === this.command;
		}

		constructor(data: Buffer | IpConfigurationV1IpConfigurationSetData) {
			super(IpConfigurationSet, data);
		}
	};
}

export namespace IpConfigurationV1 {
	export type IpConfigurationGet = InstanceType<typeof IpConfigurationV1.IpConfigurationGet>;
	export type IpConfigurationRelease = InstanceType<typeof IpConfigurationV1.IpConfigurationRelease>;
	export type IpConfigurationRenew = InstanceType<typeof IpConfigurationV1.IpConfigurationRenew>;
	export type IpConfigurationReport = InstanceType<typeof IpConfigurationV1.IpConfigurationReport>;
	export type IpConfigurationSet = InstanceType<typeof IpConfigurationV1.IpConfigurationSet>;
}
