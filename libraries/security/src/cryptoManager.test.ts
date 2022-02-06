import { CryptoManager } from "./cryptoManager";

const networkKey = Buffer.from("101112131415161718191a1b1c1d1e1f", "hex");

describe("Crypto", () => {
	it("encrypts one-way correctly", () => {
		const actual = CryptoManager.aesEncodeRaw(networkKey, CryptoManager.v0);
		const expected = "eda330f90eecd16c003e5fb09bcff358";
		expect(actual.toString("hex")).toBe(expected);
	});

	it("encrypts plaintext correctly", () => {
		const iv = Buffer.from("000102030405060708090a0b0c0d0e0f", "hex");
		const plaintext = Buffer.from("abcdef", "hex");
		const crypto = new CryptoManager(networkKey);
		expect(crypto.aesEncrypt(iv, plaintext).toString("hex")).toBe("7e4db6");
	});

	it("computes MAC correctly", () => {
		const crypto = new CryptoManager(networkKey);
		const authenticationData = Buffer.from("abcdef01234567890", "hex");
		const actual = crypto.computeMac(authenticationData);
		expect(actual.toString("hex")).toBe("5a6c6488cbecfffd");
	});
});
