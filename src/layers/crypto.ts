/**
 * Cryptographic computations as necessary by Z-Wave Security S0.
 *
 * Reference: SDS10865-Z-Wave-Application-Security-Layer-S0
 */

import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { Packet } from "../commands/packet";
import { bufferToString } from "../common/util";
import {
	SecurityV1,
	SecurityV1SecurityMessageEncapsulationData,
	SecurityV1SecurityMessageEncapsulationNonceGetData,
} from "../generated/SecurityV1";

export type NonceId = number;

export interface Nonce {
	/**
	 * Unique identifier for this nonce (same as first byte of data).
	 */
	id: NonceId;

	/**
	 * 8 byte random vector
	 */
	data: Buffer;
}

type NodeId = number;

interface NonceEntry {
	/**
	 * Generated nonce.
	 */
	nonce: Nonce;

	/**
	 * Node ID that originally requested this nonce.
	 */
	requestingNode: NodeId;

	/**
	 * Timeout timer.
	 */
	timer: NodeJS.Timer;
}

export function createNonce(): Nonce {
	const data = randomBytes(8);
	return {
		id: data[0],
		data,
	};
}

// SDS10865-Z-Wave-Application-Security-Layer-S0 says that capacity
// is limited to max 128 entries.
export const MAX_NONCE_CAPACITY = 128;

// SDS13783-Z-Wave-Transport-Encapsulation-Command-Class-Specification specifies
// nonce timer timeout has to be in the range 3..20 seconds, with recommended time
// of 10 seconds (SDS10865-Z-Wave-Application-Security-Layer-S0, section 5).
export const MIN_NONCE_TIMEOUT = 3000;
export const DEFAULT_NONCE_TIMEOUT = 10000;
export const MAX_NONCE_TIMEOUT = 20000;

/**
 * Store for nonces sent out to other nodes, such that they can
 * send back encrypted messages to us.
 *
 * See SDS10865-Z-Wave-Application-Security-Layer-S0, sections 5.2.1.1 and 5.3
 */
export class NonceStore {
	private _available: number;
	private _nonces = new Map<NonceId, NonceEntry>();
	private _nodeNonces = new Map<NodeId, Set<NonceEntry>>();

	/**
	 * Create a new nonce store with the given capacity.
	 * @param capacity Maximum number of outstanding nonces. Must be in range [1..128].
	 */
	constructor(capacity: number = MAX_NONCE_CAPACITY) {
		if (!(capacity >= 1 && capacity <= MAX_NONCE_CAPACITY)) {
			throw new Error(
				`invalid nonce store capacity, expected [1..${MAX_NONCE_CAPACITY}]`
			);
		}
		this._available = capacity;
	}

	/**
	 * Forget all generated nonces, stopping all expiry timers.
	 */
	public clear(): void {
		this._nodeNonces.clear();
		for (const [, entry] of this._nonces) {
			this._release(entry, "cleared");
		}
		this._nonces.clear();
	}

	/**
	 * Determine whether a new nonce can be generated.
	 * When there are too many outstanding nonces, existing
	 * nonces need to be released either by receiving a message
	 * containing a nonce id that we gave out before, or
	 * by nonces being expired.
	 */
	public canGenerateNonce(): boolean {
		return this._available > 0;
	}

	/**
	 * Generate a nonce for the given node.
	 * Throws an error if there is no capacity left to store new nonces.
	 *
	 * If no encapsulated message is received for this nonce before the
	 * timeout expires, the nonce is automatically released.
	 *
	 * @see canGenerateNonce()
	 * @param requestingNode Node id of node requesting a nonce.
	 * @param timeoutInMs Optional maximum lifetime of nonce in milliseconds, must be in range 3000..20000ms. Defaults to DEFAULT_NONCE_TIMEOUT.
	 * @returns Generated nonce.
	 */
	public generate(
		requestingNode: number,
		timeoutInMs: number = DEFAULT_NONCE_TIMEOUT
	): Nonce {
		if (
			!(
				timeoutInMs >= MIN_NONCE_TIMEOUT &&
				timeoutInMs <= MAX_NONCE_TIMEOUT
			)
		) {
			throw new Error(
				`invalid nonce timeout, must be in range [${MIN_NONCE_TIMEOUT}..${MAX_NONCE_TIMEOUT}]ms`
			);
		}
		if (!this.canGenerateNonce()) {
			throw new Error("cannot generate nonce, no capacity");
		}
		// The spec indicates that any source node can generate
		// only a single encapsulated message, and they need a
		// valid nonce for that. Is also explicitly indicates
		// that upon receiving ANY encapsulated message from that
		// node, ALL nonces previously sent to that node
		// then need to be invalidated (even if the MAC check
		// failed).
		// It seems a bit strange then, that there is no limit
		// to the number of 'outstanding' nonce to any given
		// node: one node is now able to occupy the whole table
		// of nonces (until an encapsulated message is received
		// from that node, which then frees up all entries).
		// Perhaps a few entries would make sense in case of
		// certain message reordering, but full capacity?!
		// Anyway, let's just do what the spec says...
		let nonce: Nonce;
		do {
			nonce = createNonce();
		} while (this._nonces.has(nonce.id));

		let nodeNonces = this._nodeNonces.get(requestingNode);
		if (!nodeNonces) {
			nodeNonces = new Set();
			this._nodeNonces.set(requestingNode, nodeNonces);
		}

		const nonceEntry: NonceEntry = {
			requestingNode,
			nonce,
			timer: setTimeout(
				() => this._handleNonceTimedOut(nonceEntry),
				timeoutInMs
			),
		};
		nodeNonces.add(nonceEntry);
		this._nonces.set(nonce.id, nonceEntry);

		console.log(
			"NONCE",
			`generated requestingNode=${
				nonceEntry.requestingNode
			} nonceId=0x${nonceEntry.nonce.id.toString(
				16
			)} data=[${bufferToString(nonceEntry.nonce.data)}]`
		);
		return nonce;
	}

	/**
	 * Lookup nonce based on its ID and return it if found.
	 * Returns `undefined` if the nonce is not found (e.g. because it
	 * expired, or because it was already used before).
	 *
	 * The found nonce, and all other nonces previously handed out to the
	 * same node, will be released.
	 *
	 * @param nonceId ID of nonce to look up.
	 * @returns Nonce if it was found, or `undefined` if it wasn't found.
	 */
	public getAndRelease(nonceId: NonceId): Nonce | undefined {
		const nonceEntry = this._nonces.get(nonceId);
		if (!nonceEntry) {
			return undefined;
		}
		this._releaseAll(nonceEntry);
		return nonceEntry.nonce;
	}

	/**
	 * Release given entry, and all other nonces for the same requestingNode.
	 */
	private _releaseAll(nonceEntry: NonceEntry): void {
		const nodeNonces = this._nodeNonces.get(nonceEntry.requestingNode);
		if (!nodeNonces) {
			throw new Error("internal error: NonceStore corrupted");
		}
		// Clear list of entries for requesting node
		this._nodeNonces.delete(nonceEntry.requestingNode);
		// Clear each entry for that requesting node
		for (const entry of nodeNonces) {
			this._release(entry, entry === nonceEntry ? "used" : "lost");
		}
	}

	private _release(nonceEntry: NonceEntry, reason: string): void {
		clearTimeout(nonceEntry.timer);
		this._nonces.delete(nonceEntry.nonce.id);
		this._nodeNonces.get(nonceEntry.requestingNode)?.delete(nonceEntry);
		// TODO make an event out of this
		console.log(
			"NONCE",
			`released requestingNode=${
				nonceEntry.requestingNode
			} nonceId=0x${nonceEntry.nonce.id.toString(16)} reason=${reason}`
		);
	}

	private _handleNonceTimedOut(nonceEntry: NonceEntry): void {
		this._release(nonceEntry, "expired");
	}
}

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

	// TODO move to SecurityS0 layer
	public encapsulateS0(
		packet: Packet,
		sourceNode: number,
		destNode: number,
		senderNonce: Buffer,
		receiverNonce: Buffer,
		requestNextNonce: boolean
	):
		| SecurityV1.SecurityMessageEncapsulation
		| SecurityV1.SecurityMessageEncapsulationNonceGet {
		const initVector = Buffer.concat([senderNonce, receiverNonce]);

		const sequenceInfo = 0; // TODO sequence stuff
		const plainPayload = Buffer.concat([
			Buffer.from([sequenceInfo]),
			packet.serialize(),
		]);
		const encryptedPayload = this.aesEncrypt(initVector, plainPayload);

		const secCmd = requestNextNonce
			? SecurityV1.SecurityMessageEncapsulationNonceGet.command
			: SecurityV1.SecurityMessageEncapsulation.command;
		const authenticationDataRaw = Buffer.from([
			...initVector,
			secCmd,
			sourceNode,
			destNode,
			encryptedPayload.length,
			...encryptedPayload,
		]);
		const nonceIdentifier = receiverNonce[0];
		const mac = this.computeMac(authenticationDataRaw);

		const data:
			| SecurityV1SecurityMessageEncapsulationData
			| SecurityV1SecurityMessageEncapsulationNonceGetData = {
			initializationVector: senderNonce,
			encryptedPayload,
			receiversNonceIdentifier: nonceIdentifier,
			messageAuthenticationCode: mac,
		};
		return requestNextNonce
			? new SecurityV1.SecurityMessageEncapsulationNonceGet(data)
			: new SecurityV1.SecurityMessageEncapsulation(data);
	}

	// TODO move to SecurityS0 layer
	public decapsulateS0(
		packet:
			| SecurityV1.SecurityMessageEncapsulation
			| SecurityV1.SecurityMessageEncapsulationNonceGet,
		sourceNode: number,
		destNode: number,
		nonceLookup: (id: number) => Buffer | undefined
	): Packet {
		const secCmd = packet.command;
		const senderNonce = packet.data.initializationVector;
		const encryptedPayload = packet.data.encryptedPayload;
		const nonceIdentifier = packet.data.receiversNonceIdentifier;
		const receiverNonce = nonceLookup(nonceIdentifier);
		if (!receiverNonce) {
			// If the packet is retransmitted (e.g. because the ack was lost),
			// we will already have expired the previous nonce.
			// Perhaps we need to make an explicit check for this in the future,
			// just for better error/warning reporting.
			throw new Error(
				"cannot decode: missing receiver nonce (could be retransmission)"
			);
		}
		const initVector = Buffer.concat([senderNonce, receiverNonce]);

		const authenticationDataRaw = Buffer.from([
			...initVector,
			secCmd,
			sourceNode,
			destNode,
			encryptedPayload.length,
			...encryptedPayload,
		]);
		const mac = this.computeMac(authenticationDataRaw);

		if (!mac.equals(packet.data.messageAuthenticationCode)) {
			throw new Error("cannot decode: mac mismatch");
		}

		const decryptedPayload = this.aesDecrypt(initVector, encryptedPayload);
		const sequenceInfo = decryptedPayload[0];
		const message = decryptedPayload.slice(1);

		return new Packet(message);
	}
}
