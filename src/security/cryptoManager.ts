/**
 * Low-level cryptographic computations as necessary by Z-Wave Security S0
 * (and S2 in the future).
 *
 * Reference: SDS10865-Z-Wave-Application-Security-Layer-S0
 */

import { createCipheriv, createDecipheriv } from "crypto";

export class CryptoManager {
	public static readonly v0 = Buffer.alloc(16, 0x00);
	public static readonly v1 = Buffer.alloc(16, 0x55);
	public static readonly v2 = Buffer.alloc(16, 0xaa);

	/**
	 * Network key in controller.
	 */
	private readonly _networkKey: Buffer;

	/**
	 * Encryption key used for generating authentication data.
	 */
	private readonly _encryptionKeyA: Buffer;

	/**
	 * Encryption key used for encrypting messages.
	 */
	private readonly _encryptionKeyE: Buffer;

	/**
	 * Pad input to a multiple of the given block length.
	 * Note: if input is already a multiple, it will not be
	 * further padded.
	 * @param input Input buffer (any size)
	 * @param blockLength Block length (e.g. 16)
	 * @returns Input buffer padded with zero-bytes until it is a multiple of `blockLength`
	 */
	public static zeroPad(input: Buffer, blockLength: number): Buffer {
		const modSize = input.length % blockLength;
		if (modSize === 0) {
			return input;
		}
		return Buffer.concat([input, Buffer.alloc(blockLength - modSize)]);
	}

	/**
	 * One-way encoding of plain input using key.
	 * Cannot be used for decryption.
	 * @param key Encryption key to use (16 bytes)
	 * @param plain Plaintext value to encrypt (16 bytes)
	 * @returns Encrypted buffer (16 bytes)
	 */
	public static aesEncodeRaw(key: Buffer, plain: Buffer): Buffer {
		const cipher = createCipheriv("AES-128-ECB", key, null);
		return cipher.update(plain);
	}

	/**
	 * Create instance of CryptoManager.
	 *
	 * Automatically derives encryption and authentication keys
	 * to be used by encrypt, decrypt and MAC computation/verification.
	 *
	 * @param networkKey Controller's Z-Wave Network Key.
	 */
	constructor(networkKey: Buffer) {
		this._networkKey = networkKey;
		// Authentication key Ka
		this._encryptionKeyA = CryptoManager.aesEncodeRaw(
			networkKey,
			CryptoManager.v1
		);
		// Encryption key Ke
		this._encryptionKeyE = CryptoManager.aesEncodeRaw(
			networkKey,
			CryptoManager.v2
		);
	}

	/**
	 * AES-128-OFB encryption of plaintext using given initialization vector.
	 * The encryption key is automatically derived from the network key.
	 *
	 * @param iv Initialization vector (16 bytes)
	 * @param plain Plaintext value to encrypt (any size)
	 * @returns Encrypted buffer (same size as input)
	 */
	public aesEncrypt(iv: Buffer, plain: Buffer): Buffer {
		const cipher = createCipheriv("AES-128-OFB", this._encryptionKeyE, iv);
		return cipher.update(plain);
	}

	/**
	 * AES-128-OFB decryption of plaintext using given initialization vector.
	 * The encryption key is automatically derived from the network key.
	 *
	 * @param iv Initialization vector (16 bytes)
	 * @param encrypted Encrypted payload to decrypt (any size)
	 * @returns Decrypted buffer (same size as input)
	 */
	public aesDecrypt(iv: Buffer, encrypted: Buffer): Buffer {
		const cipher = createDecipheriv(
			"AES-128-OFB",
			this._encryptionKeyE,
			iv
		);
		return cipher.update(encrypted);
	}

	/**
	 * Compute Message Authentication Code to prove that encrypted
	 * message is unmodified and from authentic source.
	 *
	 * @param authenticationData Combination of sender identifaction and encrypted message, see SDS10865-Z-Wave-Application-Security-Layer-S0
	 * @returns Computed MAC (16 bytes)
	 */
	public computeMac(authenticationData: Buffer): Buffer {
		const cipher = createCipheriv(
			"AES-128-CBC",
			this._encryptionKeyA,
			CryptoManager.v0
		);
		cipher.setAutoPadding(false);
		const macEncoded = Buffer.concat([
			cipher.update(CryptoManager.zeroPad(authenticationData, 16)),
			cipher.final(),
		]);
		// First 8 bytes of last 16-byte block
		return macEncoded.slice(-16, -8);
	}
}
