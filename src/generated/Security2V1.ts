/**
 * Command Class Security 2, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum Security2V1Commands {
	Security2NonceGet = 0x01,
	Security2NonceReport = 0x02,
	Security2MessageEncapsulation = 0x03,
	KexGet = 0x04,
	KexReport = 0x05,
	KexSet = 0x06,
	KexFail = 0x07,
	PublicKeyReport = 0x08,
	Security2NetworkKeyGet = 0x09,
	Security2NetworkKeyReport = 0x0a,
	Security2NetworkKeyVerify = 0x0b,
	Security2TransferEnd = 0x0c,
	Security2CommandsSupportedGet = 0x0d,
	Security2CommandsSupportedReport = 0x0e,
}

export interface Security2V1Security2NonceGetData {
	sequenceNumber: number; // 1 byte unsigned integer
}

export interface Security2V1Security2NonceReportData {
	sequenceNumber: number; // 1 byte unsigned integer
	mos: boolean; // properties1[1]
	sos: boolean; // properties1[0]
	// TODO param receiversEntropyInput type blob
}

export interface Security2V1Security2MessageEncapsulationData {
	sequenceNumber: number; // 1 byte unsigned integer
	encryptedExtension: boolean; // properties1[1]
	extension: boolean; // properties1[0]
	// TODO param vg1 type group
	// TODO param cCMCiphertextObject type blob
}

export interface Security2V1KexReportData {
	requestCSA: boolean; // properties1[1]
	echo: boolean; // properties1[0]
	supportedKEXSchemes: number; // 1 byte unsigned integer
	supportedECDHProfiles: number; // 1 byte unsigned integer
	// TODO param requestedKeys type bitmask or marker
}

export interface Security2V1KexSetData {
	requestCSA: boolean; // properties1[1]
	echo: boolean; // properties1[0]
	selectedKEXScheme: number; // 1 byte unsigned integer
	selectedECDHProfile: number; // 1 byte unsigned integer
	// TODO param grantedKeys type bitmask or marker
}

export interface Security2V1KexFailData {
	kEXFailType: KEXFailTypeEnum; // 1 byte enum value
}

export interface Security2V1PublicKeyReportData {
	includingNode: boolean; // properties1[0]
	// TODO param eCDHPublicKey type blob
}

export interface Security2V1Security2NetworkKeyGetData {
	requestedKey: number; // 1 byte unsigned integer
}

export interface Security2V1Security2NetworkKeyReportData {
	grantedKey: number; // 1 byte unsigned integer
	// TODO param networkKey type blob
}

export interface Security2V1Security2TransferEndData {
	keyVerified: boolean; // properties1[1]
	keyRequestComplete: boolean; // properties1[0]
}

export interface Security2V1Security2CommandsSupportedReportData {
	// TODO param commandClass type enumarray
}

export enum KEXFailTypeEnum {
	KexKey = 0x1,
	KexScheme = 0x2,
	KexCurves = 0x3,
	Decrypt = 0x5,
	Cancel = 0x6,
	Auth = 0x7,
	KeyGet = 0x8,
	KeyVerify = 0x9,
	KeyReport = 0xa,
}

export class Security2V1 extends CommandClassPacket<Security2V1Commands> {
	public static readonly commandClass = CommandClasses.Security2; // 0x9f (159)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(Security2V1, commandAndPayload);
	}

	public static readonly Security2NonceGet = class Security2NonceGet extends CommandPacket<Security2V1Security2NonceGetData> {
		public static readonly CommandClass = Security2V1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "Security2NonceGet",
			"help": "S2 Nonce Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "sequenceNumber",
					"help": "Sequence Number",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(Security2V1)?.command === this.command;
		}

		constructor(data: Buffer | Security2V1Security2NonceGetData) {
			super(Security2NonceGet, data);
		}
	};

	public static readonly Security2NonceReport = class Security2NonceReport extends CommandPacket<Security2V1Security2NonceReportData> {
		public static readonly CommandClass = Security2V1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "Security2NonceReport",
			"help": "S2 Nonce Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "sequenceNumber",
					"help": "Sequence Number",
					"length": 1
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
							"mask": 252,
							"shift": 2,
							"reserved": true
						},
						{
							"type": "boolean",
							"name": "mos",
							"mask": 2,
							"shift": 1
						},
						{
							"type": "boolean",
							"name": "sos",
							"mask": 1,
							"shift": 0
						}
					]
				},
				{
					"type": "blob",
					"name": "receiversEntropyInput",
					"help": "Receivers Entropy Input",
					"length": "auto"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(Security2V1)?.command === this.command;
		}

		constructor(data: Buffer | Security2V1Security2NonceReportData) {
			super(Security2NonceReport, data);
		}
	};

	public static readonly Security2MessageEncapsulation = class Security2MessageEncapsulation extends CommandPacket<Security2V1Security2MessageEncapsulationData> {
		public static readonly CommandClass = Security2V1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "Security2MessageEncapsulation",
			"help": "S2 Message Encapsulation",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "sequenceNumber",
					"help": "Sequence Number",
					"length": 1
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
							"mask": 252,
							"shift": 2,
							"reserved": true
						},
						{
							"type": "boolean",
							"name": "encryptedExtension",
							"mask": 2,
							"shift": 1
						},
						{
							"type": "boolean",
							"name": "extension",
							"mask": 1,
							"shift": 0
						}
					]
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"optional": {
						"name": "Properties1",
						"bitfield": {
							"mask": 1,
							"shift": 0,
							"name": "extension"
						}
					},
					"length": "auto",
					"moreToFollow": {
						"name": "Properties1",
						"bitfield": {
							"mask": 128,
							"shift": 7,
							"name": "moreToFollow"
						}
					},
					"params": [
						{
							"type": "integer",
							"name": "extensionLength",
							"help": "Extension Length",
							"length": 1
						},
						{
							"type": "bitfield",
							"name": "properties1",
							"help": "Properties1",
							"length": 1,
							"fields": [
								{
									"type": "integer",
									"name": "type",
									"mask": 63,
									"shift": 0
								},
								{
									"type": "boolean",
									"name": "critical",
									"mask": 64,
									"shift": 6
								},
								{
									"type": "boolean",
									"name": "moreToFollow",
									"mask": 128,
									"shift": 7
								}
							]
						},
						{
							"type": "blob",
							"name": "extension",
							"help": "Extension",
							"length": {
								"name": "Extension Length"
							},
							"includeBytesBefore": 2
						}
					]
				},
				{
					"type": "blob",
					"name": "cCMCiphertextObject",
					"help": "CCM Ciphertext Object",
					"length": "auto"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(Security2V1)?.command === this.command;
		}

		constructor(data: Buffer | Security2V1Security2MessageEncapsulationData) {
			super(Security2MessageEncapsulation, data);
		}
	};

	public static readonly KexGet = class KexGet extends CommandPacket<void> {
		public static readonly CommandClass = Security2V1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "KexGet",
			"help": "KEX Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(Security2V1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(KexGet, data);
		}
	};

	public static readonly KexReport = class KexReport extends CommandPacket<Security2V1KexReportData> {
		public static readonly CommandClass = Security2V1;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "KexReport",
			"help": "KEX Report",
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
							"name": "requestCSA",
							"mask": 2,
							"shift": 1
						},
						{
							"type": "boolean",
							"name": "echo",
							"mask": 1,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "supportedKEXSchemes",
					"help": "Supported KEX Schemes",
					"length": 1
				},
				{
					"type": "integer",
					"name": "supportedECDHProfiles",
					"help": "Supported ECDH Profiles",
					"length": 1
				},
				{
					"type": "integer",
					"name": "requestedKeys",
					"help": "Requested Keys",
					"length": 0
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(Security2V1)?.command === this.command;
		}

		constructor(data: Buffer | Security2V1KexReportData) {
			super(KexReport, data);
		}
	};

	public static readonly KexSet = class KexSet extends CommandPacket<Security2V1KexSetData> {
		public static readonly CommandClass = Security2V1;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "KexSet",
			"help": "KEX Set",
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
							"name": "requestCSA",
							"mask": 2,
							"shift": 1
						},
						{
							"type": "boolean",
							"name": "echo",
							"mask": 1,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "selectedKEXScheme",
					"help": "Selected KEX Scheme",
					"length": 1
				},
				{
					"type": "integer",
					"name": "selectedECDHProfile",
					"help": "Selected ECDH Profile",
					"length": 1
				},
				{
					"type": "integer",
					"name": "grantedKeys",
					"help": "Granted Keys",
					"length": 0
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(Security2V1)?.command === this.command;
		}

		constructor(data: Buffer | Security2V1KexSetData) {
			super(KexSet, data);
		}
	};

	public static readonly KexFail = class KexFail extends CommandPacket<Security2V1KexFailData> {
		public static readonly CommandClass = Security2V1;
		public static readonly command = 0x07;
		public static readonly definition = {
			"command": 7,
			"name": "KexFail",
			"help": "KEX Fail",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "kEXFailType",
					"help": "KEX Fail Type",
					"length": 1,
					"values": {
						"1": {
							"name": "KexKey",
							"help": "KEX_KEY"
						},
						"2": {
							"name": "KexScheme",
							"help": "KEX_SCHEME"
						},
						"3": {
							"name": "KexCurves",
							"help": "KEX_CURVES"
						},
						"5": {
							"name": "Decrypt",
							"help": "DECRYPT"
						},
						"6": {
							"name": "Cancel",
							"help": "CANCEL"
						},
						"7": {
							"name": "Auth",
							"help": "AUTH"
						},
						"8": {
							"name": "KeyGet",
							"help": "KEY_GET"
						},
						"9": {
							"name": "KeyVerify",
							"help": "KEY_VERIFY"
						},
						"10": {
							"name": "KeyReport",
							"help": "KEY_REPORT"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(Security2V1)?.command === this.command;
		}

		constructor(data: Buffer | Security2V1KexFailData) {
			super(KexFail, data);
		}
	};

	public static readonly PublicKeyReport = class PublicKeyReport extends CommandPacket<Security2V1PublicKeyReportData> {
		public static readonly CommandClass = Security2V1;
		public static readonly command = 0x08;
		public static readonly definition = {
			"command": 8,
			"name": "PublicKeyReport",
			"help": "Public Key Report",
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
							"mask": 254,
							"shift": 1,
							"reserved": true
						},
						{
							"type": "boolean",
							"name": "includingNode",
							"mask": 1,
							"shift": 0
						}
					]
				},
				{
					"type": "blob",
					"name": "eCDHPublicKey",
					"help": "ECDH Public Key",
					"length": "auto"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(Security2V1)?.command === this.command;
		}

		constructor(data: Buffer | Security2V1PublicKeyReportData) {
			super(PublicKeyReport, data);
		}
	};

	public static readonly Security2NetworkKeyGet = class Security2NetworkKeyGet extends CommandPacket<Security2V1Security2NetworkKeyGetData> {
		public static readonly CommandClass = Security2V1;
		public static readonly command = 0x09;
		public static readonly definition = {
			"command": 9,
			"name": "Security2NetworkKeyGet",
			"help": "S2 Network Key Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "requestedKey",
					"help": "Requested Key",
					"length": 1,
					"values": {
						"0": {
							"name": "Unauthenticated",
							"help": "Unauthenticated"
						},
						"1": {
							"name": "Authenticated",
							"help": "Authenticated"
						},
						"2": {
							"name": "Access",
							"help": "Access"
						},
						"7": {
							"name": "S0",
							"help": "S0"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(Security2V1)?.command === this.command;
		}

		constructor(data: Buffer | Security2V1Security2NetworkKeyGetData) {
			super(Security2NetworkKeyGet, data);
		}
	};

	public static readonly Security2NetworkKeyReport = class Security2NetworkKeyReport extends CommandPacket<Security2V1Security2NetworkKeyReportData> {
		public static readonly CommandClass = Security2V1;
		public static readonly command = 0x0a;
		public static readonly definition = {
			"command": 10,
			"name": "Security2NetworkKeyReport",
			"help": "S2 Network Key Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "grantedKey",
					"help": "Granted Key",
					"length": 1,
					"values": {
						"0": {
							"name": "Unauthenticated",
							"help": "Unauthenticated"
						},
						"1": {
							"name": "Authenticated",
							"help": "Authenticated"
						},
						"2": {
							"name": "Access",
							"help": "Access"
						},
						"7": {
							"name": "S0",
							"help": "S0"
						}
					}
				},
				{
					"type": "blob",
					"name": "networkKey",
					"help": "Network Key",
					"length": 16
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(Security2V1)?.command === this.command;
		}

		constructor(data: Buffer | Security2V1Security2NetworkKeyReportData) {
			super(Security2NetworkKeyReport, data);
		}
	};

	public static readonly Security2NetworkKeyVerify = class Security2NetworkKeyVerify extends CommandPacket<void> {
		public static readonly CommandClass = Security2V1;
		public static readonly command = 0x0b;
		public static readonly definition = {
			"command": 11,
			"name": "Security2NetworkKeyVerify",
			"help": "S2 Network Key Verify",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(Security2V1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(Security2NetworkKeyVerify, data);
		}
	};

	public static readonly Security2TransferEnd = class Security2TransferEnd extends CommandPacket<Security2V1Security2TransferEndData> {
		public static readonly CommandClass = Security2V1;
		public static readonly command = 0x0c;
		public static readonly definition = {
			"command": 12,
			"name": "Security2TransferEnd",
			"help": "S2 Transfer End",
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
							"name": "keyVerified",
							"mask": 2,
							"shift": 1
						},
						{
							"type": "boolean",
							"name": "keyRequestComplete",
							"mask": 1,
							"shift": 0
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(Security2V1)?.command === this.command;
		}

		constructor(data: Buffer | Security2V1Security2TransferEndData) {
			super(Security2TransferEnd, data);
		}
	};

	public static readonly Security2CommandsSupportedGet = class Security2CommandsSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = Security2V1;
		public static readonly command = 0x0d;
		public static readonly definition = {
			"command": 13,
			"name": "Security2CommandsSupportedGet",
			"help": "S2 Commands Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(Security2V1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(Security2CommandsSupportedGet, data);
		}
	};

	public static readonly Security2CommandsSupportedReport = class Security2CommandsSupportedReport extends CommandPacket<Security2V1Security2CommandsSupportedReportData> {
		public static readonly CommandClass = Security2V1;
		public static readonly command = 0x0e;
		public static readonly definition = {
			"command": 14,
			"name": "Security2CommandsSupportedReport",
			"help": "S2 Commands Supported Report",
			"status": "active",
			"params": [
				{
					"type": "enumarray",
					"name": "commandClass",
					"help": "Command Class",
					"length": "auto",
					"valueType": "CMD_CLASS_REF"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(Security2V1)?.command === this.command;
		}

		constructor(data: Buffer | Security2V1Security2CommandsSupportedReportData) {
			super(Security2CommandsSupportedReport, data);
		}
	};
}

export namespace Security2V1 {
	export type Security2NonceGet = InstanceType<typeof Security2V1.Security2NonceGet>;
	export type Security2NonceReport = InstanceType<typeof Security2V1.Security2NonceReport>;
	export type Security2MessageEncapsulation = InstanceType<typeof Security2V1.Security2MessageEncapsulation>;
	export type KexGet = InstanceType<typeof Security2V1.KexGet>;
	export type KexReport = InstanceType<typeof Security2V1.KexReport>;
	export type KexSet = InstanceType<typeof Security2V1.KexSet>;
	export type KexFail = InstanceType<typeof Security2V1.KexFail>;
	export type PublicKeyReport = InstanceType<typeof Security2V1.PublicKeyReport>;
	export type Security2NetworkKeyGet = InstanceType<typeof Security2V1.Security2NetworkKeyGet>;
	export type Security2NetworkKeyReport = InstanceType<typeof Security2V1.Security2NetworkKeyReport>;
	export type Security2NetworkKeyVerify = InstanceType<typeof Security2V1.Security2NetworkKeyVerify>;
	export type Security2TransferEnd = InstanceType<typeof Security2V1.Security2TransferEnd>;
	export type Security2CommandsSupportedGet = InstanceType<typeof Security2V1.Security2CommandsSupportedGet>;
	export type Security2CommandsSupportedReport = InstanceType<typeof Security2V1.Security2CommandsSupportedReport>;
}
