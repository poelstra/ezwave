/**
 * Hand-crafted version of SecurityV1 command class, to be
 * auto-generated in the future.
 *
 * This implementation mainly serves to get a good understanding of
 * final necessary implementation.
 *
 * Note: not all commands have been implemented on this implementation,
 * and decoding/encoding is also 'by hand' for now. All of this will
 * automatically start working correctly when auto-generated.
 */

import CommandClasses from "../../generated/CommandClasses";
import { CommandPacket, CommandClassPacket } from "../command";

const emptyBuffer = Buffer.alloc(0);

// TODO encryptedPayload is in original spec split into two fields,
// but that's totally inconvenient because they both belong to one single
// encrypted payload. So probably need to tweak the code generator for this one.
export interface SecurityV1MessageEncapsulationData {
	initializationVector: Buffer; // 8 bytes blob
	encryptedPayload: Buffer; // 1 byte frame, auto length message contents
	receiversNonceIdentifier: number; // 1 byte unsigned integer
	messageAuthenticationCode: Buffer; // 8 bytes blob
}

// TODO: These classes now need to be exported, because directly referring
// to their type is too cumbersome otherwise: InstanceType<typeof SecurityV1["MessageEncapsulation"]>
export class SecurityV1MessageEncapsulation extends CommandPacket<
	SecurityV1MessageEncapsulationData
> {
	static commandClass = CommandClasses.COMMAND_CLASS_SECURITY;
	static command = 0x81; // (129)
	static version = 1;
	static encode = (payload: SecurityV1MessageEncapsulationData) => {
		return Buffer.concat([
			payload.initializationVector,
			payload.encryptedPayload,
			Buffer.from([payload.receiversNonceIdentifier]),
			payload.messageAuthenticationCode,
		]);
	};
	static decode = (buffer: Buffer): SecurityV1MessageEncapsulationData => ({
		initializationVector: buffer.slice(0, 8),
		encryptedPayload: buffer.slice(8, -9),
		receiversNonceIdentifier: buffer.slice(-9)[0],
		messageAuthenticationCode: buffer.slice(-8),
	});

	constructor(payload: Buffer | SecurityV1MessageEncapsulationData) {
		super(SecurityV1MessageEncapsulation, payload);
	}
}

// This will be 'expanded' on auto-generation
export type SecurityV1MessageEncapsulationNonceGetData = SecurityV1MessageEncapsulationData;

export class SecurityV1MessageEncapsulationNonceGet extends CommandPacket<
	SecurityV1MessageEncapsulationNonceGetData
> {
	static commandClass = CommandClasses.COMMAND_CLASS_SECURITY;
	static command = 0xc1; // (193)
	static version = 1;
	static encode = SecurityV1MessageEncapsulation.encode; // this will be expanded on auto-generation
	static decode = SecurityV1MessageEncapsulation.decode; // this will be expanded on auto-generation

	constructor(payload: Buffer | SecurityV1MessageEncapsulationNonceGetData) {
		super(SecurityV1MessageEncapsulationNonceGet, payload);
	}
}

export interface SecurityV1NonceReportData {
	nonce: Buffer; // 8 byte blob
}

export class SecurityV1NonceReport extends CommandPacket<
	SecurityV1NonceReportData
> {
	static commandClass = CommandClasses.COMMAND_CLASS_SECURITY;
	static command = 0x80; // (128)
	static version = 1;
	static encode = (payload: SecurityV1NonceReportData) => {
		if (payload.nonce === undefined) {
			throw new Error("missing nonce");
		}
		if (!Buffer.isBuffer(payload.nonce) || payload.nonce.length !== 8) {
			throw new Error("invalid nonce, 8 bytes Buffer expected");
		}
		return payload.nonce;
	};
	static decode = (buffer: Buffer): SecurityV1NonceReportData => ({
		nonce: buffer.slice(0, 8),
	});

	constructor(payload: Buffer | SecurityV1NonceReportData) {
		super(SecurityV1NonceReport, payload);
	}
}

export type SecurityV1NonceGetData = void;

export class SecurityV1NonceGet extends CommandPacket<SecurityV1NonceGetData> {
	static commandClass = CommandClasses.COMMAND_CLASS_SECURITY;
	static command = 0x40; // (64)
	static version = 1;
	static encode = (payload: SecurityV1NonceGetData) => {
		return emptyBuffer;
	};
	static decode = (buffer: Buffer): SecurityV1NonceGetData => undefined;

	constructor(payload: Buffer | SecurityV1NonceGetData) {
		super(SecurityV1NonceGet, payload);
	}
}

export class SecurityV1 extends CommandClassPacket {
	static commandClass = CommandClasses.COMMAND_CLASS_SECURITY;

	constructor(command: number, payload: Buffer) {
		super(SecurityV1.commandClass, command, payload);
	}

	public static MessageEncapsulation = SecurityV1MessageEncapsulation;
	public static MessageEncapsulationNonceGet = SecurityV1MessageEncapsulationNonceGet;
	public static NonceGet = SecurityV1NonceGet;
	public static NonceReport = SecurityV1NonceReport;
}
