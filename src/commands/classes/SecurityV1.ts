/**
 * Command Class Security, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum SecurityV1Commands {
	NetworkKeySet = 0x06,
	NetworkKeyVerify = 0x07,
	SecurityCommandsSupportedGet = 0x02,
	SecurityCommandsSupportedReport = 0x03,
	SecurityMessageEncapsulation = 0x81,
	SecurityMessageEncapsulationNonceGet = 0xc1,
	SecurityNonceGet = 0x40,
	SecurityNonceReport = 0x80,
	SecuritySchemeGet = 0x04,
	SecuritySchemeInherit = 0x08,
	SecuritySchemeReport = 0x05,
}

export interface SecurityV1NetworkKeySetData {
	networkKey: Buffer; // automatic length
}

export interface SecurityV1SecurityCommandsSupportedReportData {
	reportsToFollow: number; // 1 byte unsigned integer
	supportedCommandClasses: CommandClasses[]; // automatic length
	controlledCommandClasses: CommandClasses[]; // automatic length
}

export interface SecurityV1SecurityMessageEncapsulationData {
	initializationVector: Buffer; // 8 bytes
	encryptedPayload: Buffer; // automatic length
	receiversNonceIdentifier: number; // 1 byte unsigned integer
	messageAuthenticationCode: Buffer; // 8 bytes
}

export interface SecurityV1SecurityMessageEncapsulationNonceGetData {
	initializationVector: Buffer; // 8 bytes
	encryptedPayload: Buffer; // automatic length
	receiversNonceIdentifier: number; // 1 byte unsigned integer
	messageAuthenticationCode: Buffer; // 8 bytes
}

export interface SecurityV1SecurityNonceReportData {
	nonce: Buffer; // automatic length
}

export interface SecurityV1SecuritySchemeGetData {
	supportedSecuritySchemes: number; // 1 byte unsigned integer
}

export interface SecurityV1SecuritySchemeInheritData {
	supportedSecuritySchemes: number; // 1 byte unsigned integer
}

export interface SecurityV1SecuritySchemeReportData {
	supportedSecuritySchemes: number; // 1 byte unsigned integer
}

export class SecurityV1 extends CommandClassPacket<SecurityV1Commands> {
	public static readonly commandClass = CommandClasses.Security; // 0x98 (152)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SecurityV1, commandAndPayload);
	}

	public static readonly NetworkKeySet = class NetworkKeySet extends CommandPacket<SecurityV1NetworkKeySetData> {
		public static readonly CommandClass = SecurityV1;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "NetworkKeySet",
			"help": "Network Key Set",
			"status": "Active",
			"params": [
				{
					"type": "Blob",
					"name": "networkKey",
					"help": "Network Key ",
					"length": {
						"lengthType": "Auto"
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityV1)?.command === this.command;
		}

		constructor(data: Buffer | SecurityV1NetworkKeySetData) {
			super(NetworkKeySet, data);
		}
	};

	public static readonly NetworkKeyVerify = class NetworkKeyVerify extends CommandPacket<void> {
		public static readonly CommandClass = SecurityV1;
		public static readonly command = 0x07;
		public static readonly definition = convertFromJsonCommand({
			"command": 7,
			"name": "NetworkKeyVerify",
			"help": "Network Key Verify",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(NetworkKeyVerify, data);
		}
	};

	public static readonly SecurityCommandsSupportedGet = class SecurityCommandsSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = SecurityV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "SecurityCommandsSupportedGet",
			"help": "Security Commands Supported Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SecurityCommandsSupportedGet, data);
		}
	};

	public static readonly SecurityCommandsSupportedReport = class SecurityCommandsSupportedReport extends CommandPacket<SecurityV1SecurityCommandsSupportedReportData> {
		public static readonly CommandClass = SecurityV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "SecurityCommandsSupportedReport",
			"help": "Security Commands Supported Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "reportsToFollow",
					"help": "Reports to follow",
					"length": 1
				},
				{
					"type": "Blob",
					"name": "supportedCommandClasses",
					"help": "Supported Command Classes",
					"length": {
						"lengthType": "Auto",
						"markers": [
							239
						]
					},
					"blobType": "CommandClasses"
				},
				{
					"type": "Blob",
					"name": "controlledCommandClasses",
					"help": "Controlled Command Classes",
					"length": {
						"lengthType": "Auto"
					},
					"blobType": "CommandClasses"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityV1)?.command === this.command;
		}

		constructor(data: Buffer | SecurityV1SecurityCommandsSupportedReportData) {
			super(SecurityCommandsSupportedReport, data);
		}
	};

	public static readonly SecurityMessageEncapsulation = class SecurityMessageEncapsulation extends CommandPacket<SecurityV1SecurityMessageEncapsulationData> {
		public static readonly CommandClass = SecurityV1;
		public static readonly command = 0x81;
		public static readonly definition = convertFromJsonCommand({
			"command": 129,
			"name": "SecurityMessageEncapsulation",
			"help": "Security Message Encapsulation",
			"status": "Active",
			"params": [
				{
					"type": "Blob",
					"name": "initializationVector",
					"help": "Initialization Vector ",
					"length": 8
				},
				{
					"type": "Blob",
					"name": "encryptedPayload",
					"help": "Encrypted Payload",
					"length": {
						"lengthType": "Auto"
					}
				},
				{
					"type": "Integer",
					"name": "receiversNonceIdentifier",
					"help": "Receivers nonce Identifier",
					"length": 1
				},
				{
					"type": "Blob",
					"name": "messageAuthenticationCode",
					"help": "Message Authentication Code ",
					"length": 8
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityV1)?.command === this.command;
		}

		constructor(data: Buffer | SecurityV1SecurityMessageEncapsulationData) {
			super(SecurityMessageEncapsulation, data);
		}
	};

	public static readonly SecurityMessageEncapsulationNonceGet = class SecurityMessageEncapsulationNonceGet extends CommandPacket<SecurityV1SecurityMessageEncapsulationNonceGetData> {
		public static readonly CommandClass = SecurityV1;
		public static readonly command = 0xc1;
		public static readonly definition = convertFromJsonCommand({
			"command": 193,
			"name": "SecurityMessageEncapsulationNonceGet",
			"help": "Security Message Encapsulation Nonce Get",
			"status": "Active",
			"params": [
				{
					"type": "Blob",
					"name": "initializationVector",
					"help": "Initialization Vector ",
					"length": 8
				},
				{
					"type": "Blob",
					"name": "encryptedPayload",
					"help": "Encrypted Payload",
					"length": {
						"lengthType": "Auto"
					}
				},
				{
					"type": "Integer",
					"name": "receiversNonceIdentifier",
					"help": "Receivers nonce Identifier",
					"length": 1
				},
				{
					"type": "Blob",
					"name": "messageAuthenticationCode",
					"help": "Message Authentication Code ",
					"length": 8
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityV1)?.command === this.command;
		}

		constructor(data: Buffer | SecurityV1SecurityMessageEncapsulationNonceGetData) {
			super(SecurityMessageEncapsulationNonceGet, data);
		}
	};

	public static readonly SecurityNonceGet = class SecurityNonceGet extends CommandPacket<void> {
		public static readonly CommandClass = SecurityV1;
		public static readonly command = 0x40;
		public static readonly definition = convertFromJsonCommand({
			"command": 64,
			"name": "SecurityNonceGet",
			"help": "Security Nonce Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SecurityNonceGet, data);
		}
	};

	public static readonly SecurityNonceReport = class SecurityNonceReport extends CommandPacket<SecurityV1SecurityNonceReportData> {
		public static readonly CommandClass = SecurityV1;
		public static readonly command = 0x80;
		public static readonly definition = convertFromJsonCommand({
			"command": 128,
			"name": "SecurityNonceReport",
			"help": "Security Nonce Report",
			"status": "Active",
			"params": [
				{
					"type": "Blob",
					"name": "nonce",
					"help": "Nonce ",
					"length": {
						"lengthType": "Auto"
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityV1)?.command === this.command;
		}

		constructor(data: Buffer | SecurityV1SecurityNonceReportData) {
			super(SecurityNonceReport, data);
		}
	};

	public static readonly SecuritySchemeGet = class SecuritySchemeGet extends CommandPacket<SecurityV1SecuritySchemeGetData> {
		public static readonly CommandClass = SecurityV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "SecuritySchemeGet",
			"help": "Security Scheme Get",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "supportedSecuritySchemes",
					"help": "Supported Security Schemes",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityV1)?.command === this.command;
		}

		constructor(data: Buffer | SecurityV1SecuritySchemeGetData) {
			super(SecuritySchemeGet, data);
		}
	};

	public static readonly SecuritySchemeInherit = class SecuritySchemeInherit extends CommandPacket<SecurityV1SecuritySchemeInheritData> {
		public static readonly CommandClass = SecurityV1;
		public static readonly command = 0x08;
		public static readonly definition = convertFromJsonCommand({
			"command": 8,
			"name": "SecuritySchemeInherit",
			"help": "Security Scheme Inherit",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "supportedSecuritySchemes",
					"help": "Supported Security Schemes",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityV1)?.command === this.command;
		}

		constructor(data: Buffer | SecurityV1SecuritySchemeInheritData) {
			super(SecuritySchemeInherit, data);
		}
	};

	public static readonly SecuritySchemeReport = class SecuritySchemeReport extends CommandPacket<SecurityV1SecuritySchemeReportData> {
		public static readonly CommandClass = SecurityV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "SecuritySchemeReport",
			"help": "Security Scheme Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "supportedSecuritySchemes",
					"help": "Supported Security Schemes",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityV1)?.command === this.command;
		}

		constructor(data: Buffer | SecurityV1SecuritySchemeReportData) {
			super(SecuritySchemeReport, data);
		}
	};
}

export namespace SecurityV1 {
	export type NetworkKeySet = InstanceType<typeof SecurityV1.NetworkKeySet>;
	export type NetworkKeyVerify = InstanceType<typeof SecurityV1.NetworkKeyVerify>;
	export type SecurityCommandsSupportedGet = InstanceType<typeof SecurityV1.SecurityCommandsSupportedGet>;
	export type SecurityCommandsSupportedReport = InstanceType<typeof SecurityV1.SecurityCommandsSupportedReport>;
	export type SecurityMessageEncapsulation = InstanceType<typeof SecurityV1.SecurityMessageEncapsulation>;
	export type SecurityMessageEncapsulationNonceGet = InstanceType<typeof SecurityV1.SecurityMessageEncapsulationNonceGet>;
	export type SecurityNonceGet = InstanceType<typeof SecurityV1.SecurityNonceGet>;
	export type SecurityNonceReport = InstanceType<typeof SecurityV1.SecurityNonceReport>;
	export type SecuritySchemeGet = InstanceType<typeof SecurityV1.SecuritySchemeGet>;
	export type SecuritySchemeInherit = InstanceType<typeof SecurityV1.SecuritySchemeInherit>;
	export type SecuritySchemeReport = InstanceType<typeof SecurityV1.SecuritySchemeReport>;
}
