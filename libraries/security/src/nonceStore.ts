/**
 * Store for nonces sent out to other nodes, such that they can
 * send back encrypted messages to us.
 *
 * See SDS10865-Z-Wave-Application-Security-Layer-S0, sections 5.2.1.1 and 5.3
 */

import { bufferToString } from "@ezwave/shared";
import { randomBytes } from "crypto";
import debug from "debug";

const log: debug.Debugger = debug("zwave:security:noncestore");

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

/**
 * Create new cryptographically-safe random nonce.
 */
export function createNonce(): Nonce {
	const data = randomBytes(8);
	return bufferToNonce(data);
}

/**
 * Convert 8-bytes buffer to Nonce.
 */
export function bufferToNonce(data: Buffer): Nonce {
	if (data.length !== 8) {
		throw new Error("invalid nonce length");
	}
	return {
		id: data[0],
		data,
	};
}

// SDS10865-Z-Wave-Application-Security-Layer-S0 says that capacity
// is limited to max 128 entries.
export const MAX_NONCE_CAPACITY: number = 128;

// SDS13783-Z-Wave-Transport-Encapsulation-Command-Class-Specification specifies
// nonce timer timeout has to be in the range 3..20 seconds, with recommended time
// of 10 seconds (SDS10865-Z-Wave-Application-Security-Layer-S0, section 5).
export const MIN_NONCE_TIMEOUT: number = 3000;
export const DEFAULT_NONCE_TIMEOUT: number = 10000;
export const MAX_NONCE_TIMEOUT: number = 20000;

export interface INonceLookup {
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
	getAndRelease(nonceId: NonceId): Nonce | undefined;
}

/**
 * Store for nonces sent out to other nodes, such that they can
 * send back encrypted messages to us.
 *
 * See SDS10865-Z-Wave-Application-Security-Layer-S0, sections 5.2.1.1 and 5.3
 */
export class NonceStore implements INonceLookup {
	private _available: number;
	private _nonces: Map<NonceId, NonceEntry> = new Map();
	private _nodeNonces: Map<NodeId, Set<NonceEntry>> = new Map();

	/**
	 * Create a new nonce store with the given capacity.
	 * @param capacity Maximum number of outstanding nonces. Must be in range [1..128].
	 */
	public constructor(capacity: number = MAX_NONCE_CAPACITY) {
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

		log(
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
		log(
			`released requestingNode=${
				nonceEntry.requestingNode
			} nonceId=0x${nonceEntry.nonce.id.toString(16)} reason=${reason}`
		);
	}

	private _handleNonceTimedOut(nonceEntry: NonceEntry): void {
		this._release(nonceEntry, "expired");
	}
}
