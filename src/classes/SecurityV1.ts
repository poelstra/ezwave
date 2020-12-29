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

import CommandClasses from "../generated/CommandClasses";
import { OldCommandPacket, CommandClassPacket } from "../commands/command";
import { Packet } from "../commands/packet";

export enum SecurityV1Commands {
	MessageEncapsulation = 0x81,
	MessageEncapsulationNonceGet = 0xc1,
	NonceGet = 0x40,
	NonceReport = 0x80,
}

// TODO encryptedPayload is in original spec split into two fields,
// but that's totally inconvenient because they both belong to one single
// encrypted payload. So probably need to tweak the code generator for this one.
export interface SecurityV1MessageEncapsulationData {
	initializationVector: Buffer; // 8 bytes blob
	encryptedPayload: Buffer; // 1 byte frame, auto length message contents
	receiversNonceIdentifier: number; // 1 byte unsigned integer
	messageAuthenticationCode: Buffer; // 8 bytes blob
}

// This will be 'expanded' on auto-generation
export type SecurityV1MessageEncapsulationNonceGetData = SecurityV1MessageEncapsulationData;

export interface SecurityV1NonceReportData {
	nonce: Buffer; // 8 byte blob
}

export type SecurityV1NonceGetData = void;

export class SecurityV1 extends CommandClassPacket<SecurityV1Commands> {
	static commandClass = CommandClasses.Security;

	static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SecurityV1, commandAndPayload);
	}

	public static MessageEncapsulation = class SecurityV1MessageEncapsulation extends OldCommandPacket<SecurityV1MessageEncapsulationData> {
		static CommandClass = SecurityV1;
		static command = 0x81; // (129)

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityV1)?.command === this.command;
		}

		static encode(payload: SecurityV1MessageEncapsulationData) {
			return Buffer.concat([
				Buffer.from([this.command]),
				payload.initializationVector,
				payload.encryptedPayload,
				Buffer.from([payload.receiversNonceIdentifier]),
				payload.messageAuthenticationCode,
			]);
		}

		static decode = (
			buffer: Buffer
		): SecurityV1MessageEncapsulationData => ({
			initializationVector: buffer.slice(1, 9),
			encryptedPayload: buffer.slice(9, -9),
			receiversNonceIdentifier: buffer.slice(-9)[0],
			messageAuthenticationCode: buffer.slice(-8),
		});

		constructor(data: Buffer | SecurityV1MessageEncapsulationData) {
			super(SecurityV1MessageEncapsulation, data);
		}
	};

	public static MessageEncapsulationNonceGet = class SecurityV1MessageEncapsulationNonceGet extends OldCommandPacket<SecurityV1MessageEncapsulationNonceGetData> {
		static CommandClass = SecurityV1;
		static command = 0xc1; // (193)

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityV1)?.command === this.command;
		}

		static encode = SecurityV1.MessageEncapsulation.encode; // this will be expanded on auto-generation
		static decode = SecurityV1.MessageEncapsulation.decode; // this will be expanded on auto-generation

		constructor(data: Buffer | SecurityV1MessageEncapsulationNonceGetData) {
			super(SecurityV1MessageEncapsulationNonceGet, data);
		}
	};

	public static NonceGet = class SecurityV1NonceGet extends OldCommandPacket<SecurityV1NonceGetData> {
		static CommandClass = SecurityV1;
		static command = 0x40; // (64)

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityV1)?.command === this.command;
		}

		static encode(payload: SecurityV1NonceGetData) {
			return Buffer.from([this.command]);
		}

		static decode = (buffer: Buffer): SecurityV1NonceGetData => undefined;

		constructor(data: Buffer | SecurityV1NonceGetData) {
			super(SecurityV1NonceGet, data);
		}
	};

	public static NonceReport = class SecurityV1NonceReport extends OldCommandPacket<SecurityV1NonceReportData> {
		static CommandClass = SecurityV1;
		static command = 0x80; // (128)

		static matches(packet: Packet): boolean {
			return packet.tryAs(SecurityV1)?.command === this.command;
		}

		static encode(payload: SecurityV1NonceReportData) {
			if (payload.nonce === undefined) {
				throw new Error("missing nonce");
			}
			if (!Buffer.isBuffer(payload.nonce) || payload.nonce.length !== 8) {
				throw new Error("invalid nonce, 8 bytes Buffer expected");
			}
			return Buffer.from([this.command, ...payload.nonce]);
		}

		static decode = (buffer: Buffer): SecurityV1NonceReportData => ({
			nonce: buffer.slice(1, 9),
		});

		constructor(data: Buffer | SecurityV1NonceReportData) {
			super(SecurityV1NonceReport, data);
		}
	};
}

export namespace SecurityV1 {
	export type MessageEncapsulation = InstanceType<
		typeof SecurityV1.MessageEncapsulation
	>;
	export type MessageEncapsulationNonceGet = InstanceType<
		typeof SecurityV1.MessageEncapsulationNonceGet
	>;
	export type NonceGet = InstanceType<typeof SecurityV1.NonceGet>;
	export type NonceReport = InstanceType<typeof SecurityV1.NonceReport>;
}
