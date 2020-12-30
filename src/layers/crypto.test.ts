import { describe, it } from "mocha";
import { expect } from "chai";

import { CryptoManager } from "./crypto";
import { Packet } from "../commands/packet";
import { SecurityV1 } from "../classes/SecurityV1";

const networkKey = Buffer.from("101112131415161718191a1b1c1d1e1f", "hex");

describe("Crypto", () => {
	it("encrypts one-way correctly", () => {
		const actual = CryptoManager.aesEncodeRaw(networkKey, CryptoManager.v0);
		const expected = "eda330f90eecd16c003e5fb09bcff358";
		expect(actual.toString("hex")).to.equal(expected);
	});

	it("encrypts plaintext correctly", () => {
		const iv = Buffer.from("000102030405060708090a0b0c0d0e0f", "hex");
		const plaintext = Buffer.from("abcdef", "hex");
		const crypto = new CryptoManager(networkKey);
		expect(crypto.aesEncrypt(iv, plaintext).toString("hex")).to.equal(
			"7e4db6"
		);
	});

	it("computes MAC correctly", () => {
		const crypto = new CryptoManager(networkKey);
		const authenticationData = Buffer.from("abcdef01234567890", "hex");
		const actual = crypto.computeMac(authenticationData);
		expect(actual.toString("hex")).to.equal("5a6c6488cbecfffd");
	});

	it("encrypts packet correctly", () => {
		const crypto = new CryptoManager(networkKey);

		// prettier-ignore
		const senderNonce = Buffer.from([0x83, 0xb1, 0x84, 0x5f, 0x7f, 0x3c, 0xd6, 0x9f]);
		// prettier-ignore
		const receiverNonce = Buffer.from([0x3a, 0xc5, 0xe3, 0xb8, 0x74, 0xcd, 0x30, 0xc6]);
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

		const actual = crypto.encapsulateS0(
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
		expect(actual.serialize()).to.deep.equal(expected);
	});

	it("decrypts packet correctly", () => {
		const crypto = new CryptoManager(networkKey);

		// prettier-ignore
		const senderNonce = Buffer.from([0x83, 0xb1, 0x84, 0x5f, 0x7f, 0x3c, 0xd6, 0x9f]);
		// prettier-ignore
		const receiverNonce = Buffer.from([0x3a, 0xc5, 0xe3, 0xb8, 0x74, 0xcd, 0x30, 0xc6]);
		// prettier-ignore
		const encrypted = new Packet(Buffer.from([
			0x98, // COMMAND_CLASS_SECURITY = 0x98
			0x81, // SECURITY_MESSAGE_ENCAPSULATION
			0x83, 0xb1, 0x84, 0x5f, 0x7f, 0x3c, 0xd6, 0x9f, // sender nonce
			0x99, 0xdd, 0xbc, 0xd0, 0xfb, 0x8b, 0xc1, 0x66, // encrypted seq info + data
			0x3a, // nonce id
			0xcf, 0xd3, 0x66, 0xfd, 0xf2, 0xee, 0x19, 0x49, // mac
		])).as(SecurityV1.MessageEncapsulation);
		const nonceLookup = (id: number) => {
			if (id !== 0x3a) throw new Error("unexpected receiverNonceId");
			return receiverNonce;
		};

		const actual = crypto.decapsulateS0(encrypted, 23, 1, nonceLookup);
		const expected = Buffer.from([
			0x60, // COMMAND_CLASS_MULTI_CHANNEL
			0x0d, // MULTI_CHANNEL_CMD_ENCAP
			0x01, // source
			0x01, // destination
			0x26, // class: COMMAND_CLASS_SWITCH_MULTILEVEL
			0x03, // command: SWITCH_MULTILEVEL_REPORT
			0x00, // data: level 0
		]);

		expect(actual.serialize()).to.deep.equal(expected);
	});
});
