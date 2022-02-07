/**
 * Command Class Security 2, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	receiversEntropyInput: Buffer; // automatic length
}

export interface Security2V1Security2MessageEncapsulationData {
	sequenceNumber: number; // 1 byte unsigned integer
	encryptedExtension: boolean; // properties1[1]
	vg1?: Array<{ // length based on MoreToFollow flag
		moreToFollow: boolean; // properties1[7]
		critical: boolean; // properties1[6]
		type: number; // properties1[5..0]
		extension: Buffer; // variable length
	}>;
	ccmCiphertextObject: Buffer; // automatic length
}

export interface Security2V1KexReportData {
	requestCsa: boolean; // properties1[1]
	echo: boolean; // properties1[0]
	supportedKexSchemes: number; // 1 byte unsigned integer
	supportedEcdhProfiles: number; // 1 byte unsigned integer
	requestedKeys: Set<RequestedKeysEnum>; // 1 bytes
}

export interface Security2V1KexSetData {
	requestCsa: boolean; // properties1[1]
	echo: boolean; // properties1[0]
	selectedKexScheme: number; // 1 byte unsigned integer
	selectedEcdhProfile: number; // 1 byte unsigned integer
	grantedKeys: Set<GrantedKeysEnum>; // 1 bytes
}

export interface Security2V1KexFailData {
	kexFailType: KexFailTypeEnum; // 1 byte enum value
}

export interface Security2V1PublicKeyReportData {
	includingNode: boolean; // properties1[0]
	ecdhPublicKey: Buffer; // automatic length
}

export interface Security2V1Security2NetworkKeyGetData {
	requestedKey: number; // 1 byte unsigned integer
}

export interface Security2V1Security2NetworkKeyReportData {
	grantedKey: number; // 1 byte unsigned integer
	networkKey: Buffer; // 16 bytes
}

export interface Security2V1Security2TransferEndData {
	keyVerified: boolean; // properties1[1]
	keyRequestComplete: boolean; // properties1[0]
}

export interface Security2V1Security2CommandsSupportedReportData {
	commandClasses: CommandClasses[]; // automatic length
}

export enum RequestedKeysEnum {
	Unauthenticated = 0x0,
	Authenticated = 0x1,
	Access = 0x2,
	S0 = 0x7,
}

export enum GrantedKeysEnum {
	Unauthenticated = 0x0,
	Authenticated = 0x1,
	Access = 0x2,
	S0 = 0x7,
}

export enum KexFailTypeEnum {
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
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(Security2V1, commandAndPayload);
	}
}

export class Security2NonceGet extends CommandPacket<Security2V1Security2NonceGetData> {
	public static readonly CommandClass = Security2V1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "Security2NonceGet",
		"help": "S2 Nonce Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "sequenceNumber",
				"help": "Sequence Number",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(Security2V1)?.command === this.command;
	}

	public constructor(data: Buffer | Security2V1Security2NonceGetData) {
		super(Security2NonceGet, data);
	}
};

export class Security2NonceReport extends CommandPacket<Security2V1Security2NonceReportData> {
	public static readonly CommandClass = Security2V1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "Security2NonceReport",
		"help": "S2 Nonce Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "sequenceNumber",
				"help": "Sequence Number",
				"length": 1
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
						"mask": 252,
						"shift": 2,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "mos",
						"mask": 2,
						"shift": 1
					},
					{
						"fieldType": "Boolean",
						"name": "sos",
						"mask": 1,
						"shift": 0
					}
				]
			},
			{
				"type": "Blob",
				"name": "receiversEntropyInput",
				"help": "Receivers Entropy Input",
				"length": {
					"lengthType": "Auto"
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(Security2V1)?.command === this.command;
	}

	public constructor(data: Buffer | Security2V1Security2NonceReportData) {
		super(Security2NonceReport, data);
	}
};

export class Security2MessageEncapsulation extends CommandPacket<Security2V1Security2MessageEncapsulationData> {
	public static readonly CommandClass = Security2V1;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "Security2MessageEncapsulation",
		"help": "S2 Message Encapsulation",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "sequenceNumber",
				"help": "Sequence Number",
				"length": 1
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
						"mask": 252,
						"shift": 2,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "encryptedExtension",
						"mask": 2,
						"shift": 1
					},
					{
						"fieldType": "Boolean",
						"name": "extension",
						"mask": 1,
						"shift": 0,
						"presenceOf": {
							"refs": [
								"vg1"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Group",
				"name": "vg1",
				"help": "vg1",
				"optional": {
					"ref": "properties1.extension"
				},
				"length": {
					"lengthType": "MoreToFollow"
				},
				"moreToFollow": {
					"ref": "vg1.properties1.moreToFollow"
				},
				"params": [
					{
						"type": "Integer",
						"name": "extensionLength",
						"help": "Extension Length",
						"length": 1,
						"lengthOf": {
							"refs": [
								"vg1.extension"
							]
						},
						"isAutogenerated": true
					},
					{
						"type": "Bitfield",
						"name": "properties1",
						"help": "Properties1",
						"length": 1,
						"fields": [
							{
								"fieldType": "Boolean",
								"name": "moreToFollow",
								"mask": 128,
								"shift": 7,
								"isMoreToFollowFlag": true
							},
							{
								"fieldType": "Boolean",
								"name": "critical",
								"mask": 64,
								"shift": 6
							},
							{
								"fieldType": "Integer",
								"name": "type",
								"mask": 63,
								"shift": 0
							}
						]
					},
					{
						"type": "Blob",
						"name": "extension",
						"help": "Extension",
						"length": {
							"lengthType": "Ref",
							"from": {
								"ref": "vg1.extensionLength"
							},
							"offset": 2
						}
					}
				]
			},
			{
				"type": "Blob",
				"name": "ccmCiphertextObject",
				"help": "CCM Ciphertext Object",
				"length": {
					"lengthType": "Auto"
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(Security2V1)?.command === this.command;
	}

	public constructor(data: Buffer | Security2V1Security2MessageEncapsulationData) {
		super(Security2MessageEncapsulation, data);
	}
};

export class KexGet extends CommandPacket<void> {
	public static readonly CommandClass = Security2V1;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
		"command": 4,
		"name": "KexGet",
		"help": "KEX Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(Security2V1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(KexGet, data);
	}
};

export class KexReport extends CommandPacket<Security2V1KexReportData> {
	public static readonly CommandClass = Security2V1;
	public static readonly command = 0x05; // 5
	public static readonly definition = convertFromJsonCommand({
		"command": 5,
		"name": "KexReport",
		"help": "KEX Report",
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
						"name": "requestCsa",
						"mask": 2,
						"shift": 1
					},
					{
						"fieldType": "Boolean",
						"name": "echo",
						"mask": 1,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "supportedKexSchemes",
				"help": "Supported KEX Schemes",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "supportedEcdhProfiles",
				"help": "Supported ECDH Profiles",
				"length": 1
			},
			{
				"type": "Bitmask",
				"name": "requestedKeys",
				"help": "Requested Keys",
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(Security2V1)?.command === this.command;
	}

	public constructor(data: Buffer | Security2V1KexReportData) {
		super(KexReport, data);
	}
};

export class KexSet extends CommandPacket<Security2V1KexSetData> {
	public static readonly CommandClass = Security2V1;
	public static readonly command = 0x06; // 6
	public static readonly definition = convertFromJsonCommand({
		"command": 6,
		"name": "KexSet",
		"help": "KEX Set",
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
						"name": "requestCsa",
						"mask": 2,
						"shift": 1
					},
					{
						"fieldType": "Boolean",
						"name": "echo",
						"mask": 1,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "selectedKexScheme",
				"help": "Selected KEX Scheme",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "selectedEcdhProfile",
				"help": "Selected ECDH Profile",
				"length": 1
			},
			{
				"type": "Bitmask",
				"name": "grantedKeys",
				"help": "Granted Keys",
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(Security2V1)?.command === this.command;
	}

	public constructor(data: Buffer | Security2V1KexSetData) {
		super(KexSet, data);
	}
};

export class KexFail extends CommandPacket<Security2V1KexFailData> {
	public static readonly CommandClass = Security2V1;
	public static readonly command = 0x07; // 7
	public static readonly definition = convertFromJsonCommand({
		"command": 7,
		"name": "KexFail",
		"help": "KEX Fail",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "kexFailType",
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(Security2V1)?.command === this.command;
	}

	public constructor(data: Buffer | Security2V1KexFailData) {
		super(KexFail, data);
	}
};

export class PublicKeyReport extends CommandPacket<Security2V1PublicKeyReportData> {
	public static readonly CommandClass = Security2V1;
	public static readonly command = 0x08; // 8
	public static readonly definition = convertFromJsonCommand({
		"command": 8,
		"name": "PublicKeyReport",
		"help": "Public Key Report",
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
						"mask": 254,
						"shift": 1,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "includingNode",
						"mask": 1,
						"shift": 0
					}
				]
			},
			{
				"type": "Blob",
				"name": "ecdhPublicKey",
				"help": "ECDH Public Key",
				"length": {
					"lengthType": "Auto"
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(Security2V1)?.command === this.command;
	}

	public constructor(data: Buffer | Security2V1PublicKeyReportData) {
		super(PublicKeyReport, data);
	}
};

export class Security2NetworkKeyGet extends CommandPacket<Security2V1Security2NetworkKeyGetData> {
	public static readonly CommandClass = Security2V1;
	public static readonly command = 0x09; // 9
	public static readonly definition = convertFromJsonCommand({
		"command": 9,
		"name": "Security2NetworkKeyGet",
		"help": "S2 Network Key Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(Security2V1)?.command === this.command;
	}

	public constructor(data: Buffer | Security2V1Security2NetworkKeyGetData) {
		super(Security2NetworkKeyGet, data);
	}
};

export class Security2NetworkKeyReport extends CommandPacket<Security2V1Security2NetworkKeyReportData> {
	public static readonly CommandClass = Security2V1;
	public static readonly command = 0x0a; // 10
	public static readonly definition = convertFromJsonCommand({
		"command": 10,
		"name": "Security2NetworkKeyReport",
		"help": "S2 Network Key Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
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
				"type": "Blob",
				"name": "networkKey",
				"help": "Network Key",
				"length": 16
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(Security2V1)?.command === this.command;
	}

	public constructor(data: Buffer | Security2V1Security2NetworkKeyReportData) {
		super(Security2NetworkKeyReport, data);
	}
};

export class Security2NetworkKeyVerify extends CommandPacket<void> {
	public static readonly CommandClass = Security2V1;
	public static readonly command = 0x0b; // 11
	public static readonly definition = convertFromJsonCommand({
		"command": 11,
		"name": "Security2NetworkKeyVerify",
		"help": "S2 Network Key Verify",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(Security2V1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(Security2NetworkKeyVerify, data);
	}
};

export class Security2TransferEnd extends CommandPacket<Security2V1Security2TransferEndData> {
	public static readonly CommandClass = Security2V1;
	public static readonly command = 0x0c; // 12
	public static readonly definition = convertFromJsonCommand({
		"command": 12,
		"name": "Security2TransferEnd",
		"help": "S2 Transfer End",
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
						"name": "keyVerified",
						"mask": 2,
						"shift": 1
					},
					{
						"fieldType": "Boolean",
						"name": "keyRequestComplete",
						"mask": 1,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(Security2V1)?.command === this.command;
	}

	public constructor(data: Buffer | Security2V1Security2TransferEndData) {
		super(Security2TransferEnd, data);
	}
};

export class Security2CommandsSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass = Security2V1;
	public static readonly command = 0x0d; // 13
	public static readonly definition = convertFromJsonCommand({
		"command": 13,
		"name": "Security2CommandsSupportedGet",
		"help": "S2 Commands Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(Security2V1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(Security2CommandsSupportedGet, data);
	}
};

export class Security2CommandsSupportedReport extends CommandPacket<Security2V1Security2CommandsSupportedReportData> {
	public static readonly CommandClass = Security2V1;
	public static readonly command = 0x0e; // 14
	public static readonly definition = convertFromJsonCommand({
		"command": 14,
		"name": "Security2CommandsSupportedReport",
		"help": "S2 Commands Supported Report",
		"status": "Active",
		"params": [
			{
				"type": "Blob",
				"name": "commandClasses",
				"help": "Command Classes",
				"length": {
					"lengthType": "Auto"
				},
				"blobType": "CommandClasses"
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(Security2V1)?.command === this.command;
	}

	public constructor(data: Buffer | Security2V1Security2CommandsSupportedReportData) {
		super(Security2CommandsSupportedReport, data);
	}
};
