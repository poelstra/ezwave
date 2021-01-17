/**
 * Security S0 packet encapsulation helpers.
 *
 * Allows to encapsulate and 'decapsulate' a Z-Wave packet into/from
 * an encrypted Security S0 packet.
 */

import { Packet } from "../commands/packet";
import {
	SecurityV1,
	SecurityV1SecurityMessageEncapsulationData,
	SecurityV1SecurityMessageEncapsulationNonceGetData,
} from "../commands/classes/SecurityV1";
import { CryptoManager } from "./cryptoManager";
import { INonceLookup } from "./nonceStore";

export class SecurityS0Codec {
	private _crypto: CryptoManager;
	private _nonceStore: INonceLookup;

	constructor(crypto: CryptoManager, nonceStore: INonceLookup) {
		this._crypto = crypto;
		this._nonceStore = nonceStore;
	}

	public encapsulate(
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
		const encryptedPayload = this._crypto.aesEncrypt(
			initVector,
			plainPayload
		);

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
		const mac = this._crypto.computeMac(authenticationDataRaw);

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

	public decapsulate(
		packet:
			| SecurityV1.SecurityMessageEncapsulation
			| SecurityV1.SecurityMessageEncapsulationNonceGet,
		sourceNode: number,
		destNode: number
	): Packet {
		const secCmd = packet.command;
		const senderNonce = packet.data.initializationVector;
		const encryptedPayload = packet.data.encryptedPayload;
		const nonceIdentifier = packet.data.receiversNonceIdentifier;
		const receiverNonce = this._nonceStore.getAndRelease(nonceIdentifier)
			?.data;
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
		const mac = this._crypto.computeMac(authenticationDataRaw);

		if (!mac.equals(packet.data.messageAuthenticationCode)) {
			throw new Error("cannot decode: mac mismatch");
		}

		const decryptedPayload = this._crypto.aesDecrypt(
			initVector,
			encryptedPayload
		);
		// TODO handle sequenceInfo
		const sequenceInfo = decryptedPayload[0];
		const message = decryptedPayload.slice(1);

		return new Packet(message);
	}
}
