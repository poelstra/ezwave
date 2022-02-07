import { Packet } from "@ezwave/codec";
import { SecurityV1 } from "@ezwave/commands";
import { CryptoManager } from "./cryptoManager";
import { bufferToNonce, INonceLookup, Nonce } from "./nonceStore";
import { SecurityS0Codec } from "./securityS0Codec";

const networkKey = Buffer.from("101112131415161718191a1b1c1d1e1f", "hex");

class FakeNonceLookup implements INonceLookup {
	private _nonce: Nonce | undefined;

	public constructor(data: Buffer) {
		this._nonce = bufferToNonce(data);
	}

	getAndRelease(nonceId: number): Nonce | undefined {
		if (!this._nonce) {
			throw new Error("nonce already released");
		}
		if (nonceId !== this._nonce.id)
			throw new Error("unexpected receiverNonceId");
		const result = this._nonce;
		this._nonce = undefined;
		return result;
	}
}

describe("SecurityS0Codec", () => {
	const crypto = new CryptoManager(networkKey);
	// prettier-ignore
	const receiverNonce = Buffer.from([0x3a, 0xc5, 0xe3, 0xb8, 0x74, 0xcd, 0x30, 0xc6]);
	const nonceLookup = new FakeNonceLookup(receiverNonce);
	const codec = new SecurityS0Codec(crypto, nonceLookup);

	it("encrypts packet correctly", () => {
		// prettier-ignore
		const senderNonce = Buffer.from([0x83, 0xb1, 0x84, 0x5f, 0x7f, 0x3c, 0xd6, 0x9f]);
		const packet = new Packet(
			Buffer.from([
				0x60, // COMMAND_CLASS_MULTI_CHANNEL
				0x0d, // MULTI_CHANNEL_CMD_ENCAP
				0x01, // source
				0x01, // destination
				0x26, // class: COMMAND_CLASS_SWITCH_MULTILEVEL
				0x03, // command: SWITCH_MULTILEVEL_REPORT
				0x00, // data: level 0
			])
		);

		const actual = codec.encapsulate(
			packet,
			23,
			1,
			senderNonce,
			receiverNonce,
			false
		);

		// prettier-ignore
		const expected = Buffer.from([
			0x98, // COMMAND_CLASS_SECURITY = 0x98
			0x81, // SECURITY_MESSAGE_ENCAPSULATION
			0x83, 0xb1, 0x84, 0x5f, 0x7f, 0x3c, 0xd6, 0x9f, // sender nonce
			0x99, 0xdd, 0xbc, 0xd0, 0xfb, 0x8b, 0xc1, 0x66, // encrypted seq info + data
			0x3a, // nonce id
			0xcf, 0xd3, 0x66, 0xfd, 0xf2, 0xee, 0x19, 0x49, // mac
		]);
		expect(actual.serialize()).toEqual(expected);
	});

	it("decrypts packet correctly", () => {
		const crypto = new CryptoManager(networkKey);

		// prettier-ignore
		const encrypted = new Packet(Buffer.from([
			0x98, // COMMAND_CLASS_SECURITY = 0x98
			0x81, // SECURITY_MESSAGE_ENCAPSULATION
			0x83, 0xb1, 0x84, 0x5f, 0x7f, 0x3c, 0xd6, 0x9f, // sender nonce
			0x99, 0xdd, 0xbc, 0xd0, 0xfb, 0x8b, 0xc1, 0x66, // encrypted seq info + data
			0x3a, // nonce id
			0xcf, 0xd3, 0x66, 0xfd, 0xf2, 0xee, 0x19, 0x49, // mac
		])).as(SecurityV1.SecurityMessageEncapsulation);

		const actual = codec.decapsulate(encrypted, 23, 1);
		const expected = Buffer.from([
			0x60, // COMMAND_CLASS_MULTI_CHANNEL
			0x0d, // MULTI_CHANNEL_CMD_ENCAP
			0x01, // source
			0x01, // destination
			0x26, // class: COMMAND_CLASS_SWITCH_MULTILEVEL
			0x03, // command: SWITCH_MULTILEVEL_REPORT
			0x00, // data: level 0
		]);

		expect(actual.serialize()).toEqual(expected);
	});
});
