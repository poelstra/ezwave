/**
 * Command Class Z/IP Gateway, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ZipGatewayV1Commands {
	GatewayModeSet = 0x01,
	GatewayModeGet = 0x02,
	GatewayModeReport = 0x03,
	GatewayPeerSet = 0x04,
	GatewayPeerGet = 0x05,
	GatewayPeerReport = 0x06,
	GatewayLockSet = 0x07,
	UnsolicitedDestinationSet = 0x08,
	UnsolicitedDestinationGet = 0x09,
	UnsolicitedDestinationReport = 0x0a,
	CommandApplicationNodeInfoSet = 0x0b,
	CommandApplicationNodeInfoGet = 0x0c,
	CommandApplicationNodeInfoReport = 0x0d,
}

export interface ZipGatewayV1GatewayModeSetData {
	mode: ModeEnum; // 1 byte enum value
}

export interface ZipGatewayV1GatewayModeReportData {
	mode: ModeEnum; // 1 byte enum value
}

export interface ZipGatewayV1GatewayPeerSetData {
	peerProfile: number; // 1 byte unsigned integer
	iPv6Address: Buffer; // 16 bytes
	port: number; // 2 byte unsigned integer
	peerName: Buffer; // variable length
}

export interface ZipGatewayV1GatewayPeerGetData {
	peerProfile: number; // 1 byte unsigned integer
}

export interface ZipGatewayV1GatewayPeerReportData {
	peerProfile: number; // 1 byte unsigned integer
	peerCount: number; // 1 byte unsigned integer
	iPv6Address: Buffer; // 16 bytes
	port: number; // 2 byte unsigned integer
	peerName: Buffer; // variable length
}

export interface ZipGatewayV1GatewayLockSetData {
	show: boolean; // properties1[1]
	lock: boolean; // properties1[0]
}

export interface ZipGatewayV1UnsolicitedDestinationSetData {
	unsolicitedIPv6Destination: Buffer; // 16 bytes
	unsolicitedDestinationPort: number; // 2 byte unsigned integer
}

export interface ZipGatewayV1UnsolicitedDestinationReportData {
	unsolicitedIPv6Destination: Buffer; // 16 bytes
	unsolicitedDestinationPort: number; // 2 byte unsigned integer
}

export interface ZipGatewayV1CommandApplicationNodeInfoSetData {
	nonSecureCommandClass: Buffer; // automatic length
	// TODO param securityScheme0MARK type bitmask or marker
	securityScheme0CommandClass: Buffer; // automatic length
}

export interface ZipGatewayV1CommandApplicationNodeInfoReportData {
	nonSecureCommandClass: Buffer; // automatic length
	// TODO param securityScheme0MARK type bitmask or marker
	securityScheme0CommandClass: Buffer; // automatic length
}

export enum ModeEnum {
	StandAlone = 0x1,
	Portal = 0x2,
}

export class ZipGatewayV1 extends CommandClassPacket<ZipGatewayV1Commands> {
	public static readonly commandClass = CommandClasses.ZipGateway; // 0x5f (95)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ZipGatewayV1, commandAndPayload);
	}

	public static readonly GatewayModeSet = class GatewayModeSet extends CommandPacket<ZipGatewayV1GatewayModeSetData> {
		public static readonly CommandClass = ZipGatewayV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "GatewayModeSet",
			"help": "Gateway Mode Set",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "mode",
					"help": "Mode",
					"length": 1,
					"values": {
						"1": {
							"name": "StandAlone",
							"help": "Stand-alone"
						},
						"2": {
							"name": "Portal",
							"help": "Portal"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipGatewayV1)?.command === this.command;
		}

		constructor(data: Buffer | ZipGatewayV1GatewayModeSetData) {
			super(GatewayModeSet, data);
		}
	};

	public static readonly GatewayModeGet = class GatewayModeGet extends CommandPacket<void> {
		public static readonly CommandClass = ZipGatewayV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "GatewayModeGet",
			"help": "Gateway Mode Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipGatewayV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(GatewayModeGet, data);
		}
	};

	public static readonly GatewayModeReport = class GatewayModeReport extends CommandPacket<ZipGatewayV1GatewayModeReportData> {
		public static readonly CommandClass = ZipGatewayV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "GatewayModeReport",
			"help": "Gateway Mode Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "mode",
					"help": "Mode",
					"length": 1,
					"values": {
						"1": {
							"name": "StandAlone",
							"help": "Stand-alone"
						},
						"2": {
							"name": "Portal",
							"help": "Portal"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipGatewayV1)?.command === this.command;
		}

		constructor(data: Buffer | ZipGatewayV1GatewayModeReportData) {
			super(GatewayModeReport, data);
		}
	};

	public static readonly GatewayPeerSet = class GatewayPeerSet extends CommandPacket<ZipGatewayV1GatewayPeerSetData> {
		public static readonly CommandClass = ZipGatewayV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "GatewayPeerSet",
			"help": "Gateway Peer Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "peerProfile",
					"help": "Peer Profile",
					"length": 1
				},
				{
					"type": "blob",
					"name": "iPv6Address",
					"help": "IPv6 Address",
					"length": 16
				},
				{
					"type": "integer",
					"name": "port",
					"help": "Port",
					"length": 2
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved",
							"mask": 192,
							"shift": 6,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "peerNameLength",
							"mask": 63,
							"shift": 0,
							"lengthOf": {
								"refs": [
									{
										"name": "peerName"
									}
								]
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "peerName",
					"help": "Peer Name",
					"length": {
						"lengthType": "ref",
						"ref": "properties1",
						"bitfield": {
							"mask": 63,
							"shift": 0,
							"name": "peerNameLength"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipGatewayV1)?.command === this.command;
		}

		constructor(data: Buffer | ZipGatewayV1GatewayPeerSetData) {
			super(GatewayPeerSet, data);
		}
	};

	public static readonly GatewayPeerGet = class GatewayPeerGet extends CommandPacket<ZipGatewayV1GatewayPeerGetData> {
		public static readonly CommandClass = ZipGatewayV1;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "GatewayPeerGet",
			"help": "Gateway Peer Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "peerProfile",
					"help": "Peer Profile",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipGatewayV1)?.command === this.command;
		}

		constructor(data: Buffer | ZipGatewayV1GatewayPeerGetData) {
			super(GatewayPeerGet, data);
		}
	};

	public static readonly GatewayPeerReport = class GatewayPeerReport extends CommandPacket<ZipGatewayV1GatewayPeerReportData> {
		public static readonly CommandClass = ZipGatewayV1;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "GatewayPeerReport",
			"help": "Gateway Peer Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "peerProfile",
					"help": "Peer Profile",
					"length": 1
				},
				{
					"type": "integer",
					"name": "peerCount",
					"help": "Peer Count",
					"length": 1
				},
				{
					"type": "blob",
					"name": "iPv6Address",
					"help": "IPv6 Address",
					"length": 16
				},
				{
					"type": "integer",
					"name": "port",
					"help": "Port",
					"length": 2
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved",
							"mask": 192,
							"shift": 6,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "peerNameLength",
							"mask": 63,
							"shift": 0,
							"lengthOf": {
								"refs": [
									{
										"name": "peerName"
									}
								]
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "peerName",
					"help": "Peer Name",
					"length": {
						"lengthType": "ref",
						"ref": "properties1",
						"bitfield": {
							"mask": 63,
							"shift": 0,
							"name": "peerNameLength"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipGatewayV1)?.command === this.command;
		}

		constructor(data: Buffer | ZipGatewayV1GatewayPeerReportData) {
			super(GatewayPeerReport, data);
		}
	};

	public static readonly GatewayLockSet = class GatewayLockSet extends CommandPacket<ZipGatewayV1GatewayLockSetData> {
		public static readonly CommandClass = ZipGatewayV1;
		public static readonly command = 0x07;
		public static readonly definition = {
			"command": 7,
			"name": "GatewayLockSet",
			"help": "Gateway Lock Set",
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
							"name": "reserved",
							"mask": 252,
							"shift": 2,
							"reserved": true
						},
						{
							"type": "boolean",
							"name": "show",
							"mask": 2,
							"shift": 1
						},
						{
							"type": "boolean",
							"name": "lock",
							"mask": 1,
							"shift": 0
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipGatewayV1)?.command === this.command;
		}

		constructor(data: Buffer | ZipGatewayV1GatewayLockSetData) {
			super(GatewayLockSet, data);
		}
	};

	public static readonly UnsolicitedDestinationSet = class UnsolicitedDestinationSet extends CommandPacket<ZipGatewayV1UnsolicitedDestinationSetData> {
		public static readonly CommandClass = ZipGatewayV1;
		public static readonly command = 0x08;
		public static readonly definition = {
			"command": 8,
			"name": "UnsolicitedDestinationSet",
			"help": "Unsolicited Destination Set",
			"status": "active",
			"params": [
				{
					"type": "blob",
					"name": "unsolicitedIPv6Destination",
					"help": "Unsolicited IPv6 Destination",
					"length": 16
				},
				{
					"type": "integer",
					"name": "unsolicitedDestinationPort",
					"help": "Unsolicited Destination Port",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipGatewayV1)?.command === this.command;
		}

		constructor(data: Buffer | ZipGatewayV1UnsolicitedDestinationSetData) {
			super(UnsolicitedDestinationSet, data);
		}
	};

	public static readonly UnsolicitedDestinationGet = class UnsolicitedDestinationGet extends CommandPacket<void> {
		public static readonly CommandClass = ZipGatewayV1;
		public static readonly command = 0x09;
		public static readonly definition = {
			"command": 9,
			"name": "UnsolicitedDestinationGet",
			"help": "Unsolicited Destination Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipGatewayV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(UnsolicitedDestinationGet, data);
		}
	};

	public static readonly UnsolicitedDestinationReport = class UnsolicitedDestinationReport extends CommandPacket<ZipGatewayV1UnsolicitedDestinationReportData> {
		public static readonly CommandClass = ZipGatewayV1;
		public static readonly command = 0x0a;
		public static readonly definition = {
			"command": 10,
			"name": "UnsolicitedDestinationReport",
			"help": "Unsolicited Destination Report",
			"status": "active",
			"params": [
				{
					"type": "blob",
					"name": "unsolicitedIPv6Destination",
					"help": "Unsolicited IPv6 Destination",
					"length": 16
				},
				{
					"type": "integer",
					"name": "unsolicitedDestinationPort",
					"help": "Unsolicited Destination Port",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipGatewayV1)?.command === this.command;
		}

		constructor(data: Buffer | ZipGatewayV1UnsolicitedDestinationReportData) {
			super(UnsolicitedDestinationReport, data);
		}
	};

	public static readonly CommandApplicationNodeInfoSet = class CommandApplicationNodeInfoSet extends CommandPacket<ZipGatewayV1CommandApplicationNodeInfoSetData> {
		public static readonly CommandClass = ZipGatewayV1;
		public static readonly command = 0x0b;
		public static readonly definition = {
			"command": 11,
			"name": "CommandApplicationNodeInfoSet",
			"help": "Application Node Info Set",
			"status": "active",
			"params": [
				{
					"type": "blob",
					"name": "nonSecureCommandClass",
					"help": "Non-Secure Command Class",
					"length": {
						"lengthType": "auto",
						"endOffset": 0
					}
				},
				{
					"type": "integer",
					"name": "securityScheme0MARK",
					"help": "Security Scheme 0 MARK",
					"length": 0
				},
				{
					"type": "blob",
					"name": "securityScheme0CommandClass",
					"help": "Security Scheme 0 Command Class",
					"length": {
						"lengthType": "auto",
						"endOffset": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipGatewayV1)?.command === this.command;
		}

		constructor(data: Buffer | ZipGatewayV1CommandApplicationNodeInfoSetData) {
			super(CommandApplicationNodeInfoSet, data);
		}
	};

	public static readonly CommandApplicationNodeInfoGet = class CommandApplicationNodeInfoGet extends CommandPacket<void> {
		public static readonly CommandClass = ZipGatewayV1;
		public static readonly command = 0x0c;
		public static readonly definition = {
			"command": 12,
			"name": "CommandApplicationNodeInfoGet",
			"help": "Application Node Info Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipGatewayV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(CommandApplicationNodeInfoGet, data);
		}
	};

	public static readonly CommandApplicationNodeInfoReport = class CommandApplicationNodeInfoReport extends CommandPacket<ZipGatewayV1CommandApplicationNodeInfoReportData> {
		public static readonly CommandClass = ZipGatewayV1;
		public static readonly command = 0x0d;
		public static readonly definition = {
			"command": 13,
			"name": "CommandApplicationNodeInfoReport",
			"help": "Application Node Info Report",
			"status": "active",
			"params": [
				{
					"type": "blob",
					"name": "nonSecureCommandClass",
					"help": "Non-Secure Command Class",
					"length": {
						"lengthType": "auto",
						"endOffset": 0
					}
				},
				{
					"type": "integer",
					"name": "securityScheme0MARK",
					"help": "Security Scheme 0 MARK",
					"length": 0
				},
				{
					"type": "blob",
					"name": "securityScheme0CommandClass",
					"help": "Security Scheme 0 Command Class",
					"length": {
						"lengthType": "auto",
						"endOffset": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZipGatewayV1)?.command === this.command;
		}

		constructor(data: Buffer | ZipGatewayV1CommandApplicationNodeInfoReportData) {
			super(CommandApplicationNodeInfoReport, data);
		}
	};
}

export namespace ZipGatewayV1 {
	export type GatewayModeSet = InstanceType<typeof ZipGatewayV1.GatewayModeSet>;
	export type GatewayModeGet = InstanceType<typeof ZipGatewayV1.GatewayModeGet>;
	export type GatewayModeReport = InstanceType<typeof ZipGatewayV1.GatewayModeReport>;
	export type GatewayPeerSet = InstanceType<typeof ZipGatewayV1.GatewayPeerSet>;
	export type GatewayPeerGet = InstanceType<typeof ZipGatewayV1.GatewayPeerGet>;
	export type GatewayPeerReport = InstanceType<typeof ZipGatewayV1.GatewayPeerReport>;
	export type GatewayLockSet = InstanceType<typeof ZipGatewayV1.GatewayLockSet>;
	export type UnsolicitedDestinationSet = InstanceType<typeof ZipGatewayV1.UnsolicitedDestinationSet>;
	export type UnsolicitedDestinationGet = InstanceType<typeof ZipGatewayV1.UnsolicitedDestinationGet>;
	export type UnsolicitedDestinationReport = InstanceType<typeof ZipGatewayV1.UnsolicitedDestinationReport>;
	export type CommandApplicationNodeInfoSet = InstanceType<typeof ZipGatewayV1.CommandApplicationNodeInfoSet>;
	export type CommandApplicationNodeInfoGet = InstanceType<typeof ZipGatewayV1.CommandApplicationNodeInfoGet>;
	export type CommandApplicationNodeInfoReport = InstanceType<typeof ZipGatewayV1.CommandApplicationNodeInfoReport>;
}
