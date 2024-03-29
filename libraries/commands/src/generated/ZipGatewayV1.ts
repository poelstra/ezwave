/**
 * Command Class Z/IP Gateway, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	ipv6Address: Buffer; // 16 bytes
	port: number; // 2 byte unsigned integer
	peerName: Buffer; // variable length
}

export interface ZipGatewayV1GatewayPeerGetData {
	peerProfile: number; // 1 byte unsigned integer
}

export interface ZipGatewayV1GatewayPeerReportData {
	peerProfile: number; // 1 byte unsigned integer
	peerCount: number; // 1 byte unsigned integer
	ipv6Address: Buffer; // 16 bytes
	port: number; // 2 byte unsigned integer
	peerName: Buffer; // variable length
}

export interface ZipGatewayV1GatewayLockSetData {
	show: boolean; // properties1[1]
	lock: boolean; // properties1[0]
}

export interface ZipGatewayV1UnsolicitedDestinationSetData {
	unsolicitedIpv6Destination: Buffer; // 16 bytes
	unsolicitedDestinationPort: number; // 2 byte unsigned integer
}

export interface ZipGatewayV1UnsolicitedDestinationReportData {
	unsolicitedIpv6Destination: Buffer; // 16 bytes
	unsolicitedDestinationPort: number; // 2 byte unsigned integer
}

export interface ZipGatewayV1CommandApplicationNodeInfoSetData {
	nonSecureCommandClass: Buffer; // automatic length
	securityScheme0CommandClass: Buffer; // automatic length
}

export interface ZipGatewayV1CommandApplicationNodeInfoReportData {
	nonSecureCommandClass: Buffer; // automatic length
	securityScheme0CommandClass: Buffer; // automatic length
}

export enum ModeEnum {
	StandAlone = 0x1,
	Portal = 0x2,
}

export class ZipGatewayV1 extends CommandClassPacket<ZipGatewayV1Commands> {
	public static readonly commandClass: number = CommandClasses.ZipGateway; // 0x5f (95)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ZipGatewayV1, commandAndPayload);
	}
}

export class GatewayModeSet extends CommandPacket<ZipGatewayV1GatewayModeSetData> {
	public static readonly CommandClass: typeof ZipGatewayV1 = ZipGatewayV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "GatewayModeSet",
		"help": "Gateway Mode Set",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ZipGatewayV1)?.command === this.command;
	}

	public constructor(data: Buffer | ZipGatewayV1GatewayModeSetData) {
		super(GatewayModeSet, data);
	}
};

export class GatewayModeGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof ZipGatewayV1 = ZipGatewayV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "GatewayModeGet",
		"help": "Gateway Mode Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ZipGatewayV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(GatewayModeGet, data);
	}
};

export class GatewayModeReport extends CommandPacket<ZipGatewayV1GatewayModeReportData> {
	public static readonly CommandClass: typeof ZipGatewayV1 = ZipGatewayV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "GatewayModeReport",
		"help": "Gateway Mode Report",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ZipGatewayV1)?.command === this.command;
	}

	public constructor(data: Buffer | ZipGatewayV1GatewayModeReportData) {
		super(GatewayModeReport, data);
	}
};

export class GatewayPeerSet extends CommandPacket<ZipGatewayV1GatewayPeerSetData> {
	public static readonly CommandClass: typeof ZipGatewayV1 = ZipGatewayV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "GatewayPeerSet",
		"help": "Gateway Peer Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "peerProfile",
				"help": "Peer Profile",
				"length": 1
			},
			{
				"type": "Blob",
				"name": "ipv6Address",
				"help": "IPv6 Address",
				"length": 16
			},
			{
				"type": "Integer",
				"name": "port",
				"help": "Port",
				"length": 2
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 192,
						"shift": 6,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "peerNameLength",
						"mask": 63,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"peerName"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "peerName",
				"help": "Peer Name",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.peerNameLength"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ZipGatewayV1)?.command === this.command;
	}

	public constructor(data: Buffer | ZipGatewayV1GatewayPeerSetData) {
		super(GatewayPeerSet, data);
	}
};

export class GatewayPeerGet extends CommandPacket<ZipGatewayV1GatewayPeerGetData> {
	public static readonly CommandClass: typeof ZipGatewayV1 = ZipGatewayV1;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "GatewayPeerGet",
		"help": "Gateway Peer Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "peerProfile",
				"help": "Peer Profile",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ZipGatewayV1)?.command === this.command;
	}

	public constructor(data: Buffer | ZipGatewayV1GatewayPeerGetData) {
		super(GatewayPeerGet, data);
	}
};

export class GatewayPeerReport extends CommandPacket<ZipGatewayV1GatewayPeerReportData> {
	public static readonly CommandClass: typeof ZipGatewayV1 = ZipGatewayV1;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 6,
		"name": "GatewayPeerReport",
		"help": "Gateway Peer Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "peerProfile",
				"help": "Peer Profile",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "peerCount",
				"help": "Peer Count",
				"length": 1
			},
			{
				"type": "Blob",
				"name": "ipv6Address",
				"help": "IPv6 Address",
				"length": 16
			},
			{
				"type": "Integer",
				"name": "port",
				"help": "Port",
				"length": 2
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 192,
						"shift": 6,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "peerNameLength",
						"mask": 63,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"peerName"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "peerName",
				"help": "Peer Name",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.peerNameLength"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ZipGatewayV1)?.command === this.command;
	}

	public constructor(data: Buffer | ZipGatewayV1GatewayPeerReportData) {
		super(GatewayPeerReport, data);
	}
};

export class GatewayLockSet extends CommandPacket<ZipGatewayV1GatewayLockSetData> {
	public static readonly CommandClass: typeof ZipGatewayV1 = ZipGatewayV1;
	public static readonly command: number = 0x07; // 7
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 7,
		"name": "GatewayLockSet",
		"help": "Gateway Lock Set",
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
						"name": "show",
						"mask": 2,
						"shift": 1
					},
					{
						"fieldType": "Boolean",
						"name": "lock",
						"mask": 1,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ZipGatewayV1)?.command === this.command;
	}

	public constructor(data: Buffer | ZipGatewayV1GatewayLockSetData) {
		super(GatewayLockSet, data);
	}
};

export class UnsolicitedDestinationSet extends CommandPacket<ZipGatewayV1UnsolicitedDestinationSetData> {
	public static readonly CommandClass: typeof ZipGatewayV1 = ZipGatewayV1;
	public static readonly command: number = 0x08; // 8
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 8,
		"name": "UnsolicitedDestinationSet",
		"help": "Unsolicited Destination Set",
		"status": "Active",
		"params": [
			{
				"type": "Blob",
				"name": "unsolicitedIpv6Destination",
				"help": "Unsolicited IPv6 Destination",
				"length": 16
			},
			{
				"type": "Integer",
				"name": "unsolicitedDestinationPort",
				"help": "Unsolicited Destination Port",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ZipGatewayV1)?.command === this.command;
	}

	public constructor(data: Buffer | ZipGatewayV1UnsolicitedDestinationSetData) {
		super(UnsolicitedDestinationSet, data);
	}
};

export class UnsolicitedDestinationGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof ZipGatewayV1 = ZipGatewayV1;
	public static readonly command: number = 0x09; // 9
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 9,
		"name": "UnsolicitedDestinationGet",
		"help": "Unsolicited Destination Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ZipGatewayV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(UnsolicitedDestinationGet, data);
	}
};

export class UnsolicitedDestinationReport extends CommandPacket<ZipGatewayV1UnsolicitedDestinationReportData> {
	public static readonly CommandClass: typeof ZipGatewayV1 = ZipGatewayV1;
	public static readonly command: number = 0x0a; // 10
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 10,
		"name": "UnsolicitedDestinationReport",
		"help": "Unsolicited Destination Report",
		"status": "Active",
		"params": [
			{
				"type": "Blob",
				"name": "unsolicitedIpv6Destination",
				"help": "Unsolicited IPv6 Destination",
				"length": 16
			},
			{
				"type": "Integer",
				"name": "unsolicitedDestinationPort",
				"help": "Unsolicited Destination Port",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ZipGatewayV1)?.command === this.command;
	}

	public constructor(data: Buffer | ZipGatewayV1UnsolicitedDestinationReportData) {
		super(UnsolicitedDestinationReport, data);
	}
};

export class CommandApplicationNodeInfoSet extends CommandPacket<ZipGatewayV1CommandApplicationNodeInfoSetData> {
	public static readonly CommandClass: typeof ZipGatewayV1 = ZipGatewayV1;
	public static readonly command: number = 0x0b; // 11
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 11,
		"name": "CommandApplicationNodeInfoSet",
		"help": "Application Node Info Set",
		"status": "Active",
		"params": [
			{
				"type": "Blob",
				"name": "nonSecureCommandClass",
				"help": "Non-Secure Command Class",
				"length": {
					"lengthType": "Auto",
					"markers": [
						241,
						0
					]
				}
			},
			{
				"type": "Blob",
				"name": "securityScheme0CommandClass",
				"help": "Security Scheme 0 Command Class",
				"length": {
					"lengthType": "Auto"
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ZipGatewayV1)?.command === this.command;
	}

	public constructor(data: Buffer | ZipGatewayV1CommandApplicationNodeInfoSetData) {
		super(CommandApplicationNodeInfoSet, data);
	}
};

export class CommandApplicationNodeInfoGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof ZipGatewayV1 = ZipGatewayV1;
	public static readonly command: number = 0x0c; // 12
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 12,
		"name": "CommandApplicationNodeInfoGet",
		"help": "Application Node Info Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ZipGatewayV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(CommandApplicationNodeInfoGet, data);
	}
};

export class CommandApplicationNodeInfoReport extends CommandPacket<ZipGatewayV1CommandApplicationNodeInfoReportData> {
	public static readonly CommandClass: typeof ZipGatewayV1 = ZipGatewayV1;
	public static readonly command: number = 0x0d; // 13
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 13,
		"name": "CommandApplicationNodeInfoReport",
		"help": "Application Node Info Report",
		"status": "Active",
		"params": [
			{
				"type": "Blob",
				"name": "nonSecureCommandClass",
				"help": "Non-Secure Command Class",
				"length": {
					"lengthType": "Auto",
					"markers": [
						241,
						0
					]
				}
			},
			{
				"type": "Blob",
				"name": "securityScheme0CommandClass",
				"help": "Security Scheme 0 Command Class",
				"length": {
					"lengthType": "Auto"
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ZipGatewayV1)?.command === this.command;
	}

	public constructor(data: Buffer | ZipGatewayV1CommandApplicationNodeInfoReportData) {
		super(CommandApplicationNodeInfoReport, data);
	}
};
