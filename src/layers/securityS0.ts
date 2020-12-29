import { randomBytes } from "crypto";
import { SecurityV1 } from "../classes/SecurityV1";
import { Packet } from "../commands/packet";
import { bufferToString } from "../common/util";
import { CryptoManager, NonceStore } from "../server/crypto";
import {
	DispatchNext,
	Layer,
	LayerCommand,
	LayerEvent,
	Sender,
	SendNext,
} from "./layer";
import { Requester } from "./requester";

export class SecurityS0Layer implements Layer {
	private _requester = new Requester();
	private _crypto: CryptoManager;
	private _nonceStore: NonceStore;

	constructor(crypto: CryptoManager, nonceStore: NonceStore) {
		this._crypto = crypto;
		this._nonceStore = nonceStore;
	}

	async dispatch(
		event: LayerEvent<Packet>,
		next: DispatchNext,
		sender: Sender
	): Promise<void> {
		this._requester.dispatch(event);

		// NonceGet is just responded to, not passed through
		if (event.packet.is(SecurityV1.NonceGet)) {
			return this._handleSecurityNonceGet(event, sender);
		}

		// NonceReport is handled in _secureSend, not passed through
		if (event.packet.is(SecurityV1.NonceReport)) {
			return;
		}

		// Encapsulation is decoded and handled, EncapNonceGet is replied to afterwards
		const encapPacket =
			event.packet.tryAs(SecurityV1.MessageEncapsulation) ??
			event.packet.tryAs(SecurityV1.MessageEncapsulationNonceGet);

		// Non-secure packet, just pass through (but allow sender to still encrypt
		// messages if necessary)
		if (!encapPacket) {
			sender = this._makeSecureSender(sender);
			return next(event, sender);
		}

		// Encapsulated packet, decode it and forward decoded event
		const decoded = this._crypto.decapsulateS0(
			encapPacket,
			event.endpoint.nodeId,
			1,
			(id) => this._nonceStore.getAndRelease(id)?.data
		);
		const decodedEvent: LayerEvent<Packet> = {
			packetType: event.packetType,
			endpoint: event.endpoint,
			packet: decoded,
		};

		if (event.packet.is(SecurityV1.MessageEncapsulationNonceGet)) {
			// It doesn't seem to be mentioned in the docs, but at least one of my devices doesn't
			// send back e.g. a Report to a Get when receiving a MessageEncapsulationNonceGet (only
			// the nonce report is sent). Let's mimick that behavior here.
			await this._handleSecurityNonceGet(event, sender);
			sender = {
				send(command) {
					return false;
				},
				packetCapacity() {
					return 0;
				},
			};
		} else {
			// TODO Force sends to always be secure (except in very special cases)
			sender = this._makeSecureSender(sender);
		}

		console.log("SecurityS0 decoded", decodedEvent);
		return next(decodedEvent, sender);
	}

	async send(
		command: LayerCommand,
		next: SendNext,
		send: Sender
	): Promise<boolean> {
		const secureSend = this._makeSecureSender(send);
		return await next(command, secureSend);
	}

	private _makeSecureSender(upstreamSender: Sender): Sender {
		return {
			send: (command) => this._secureSend(command, upstreamSender),
			packetCapacity: () => upstreamSender.packetCapacity() - 20,
		};
	}

	private async _secureSend(
		command: LayerCommand,
		send: Sender
	): Promise<boolean> {
		if (command.secure) {
			console.log(
				"SecurityS0 sending secure message, fetch nonce for",
				command
			);
			const nonceEvent = await this._requester.sendAndWaitFor(
				{
					endpoint: command.endpoint,
					packet: new SecurityV1.NonceGet(),
				},
				send.send,
				(evt) => evt.packet.tryAs(SecurityV1.NonceReport)
			);
			if (!nonceEvent) {
				// Send was suppressed, stop further processing.
				return false;
			}
			const destination = command.endpoint.nodeId;
			const senderNonce = randomBytes(8);
			const encapsulated = this._crypto.encapsulateS0(
				command.packet,
				1,
				destination,
				senderNonce,
				nonceEvent.packet.data.nonce,
				false
			);
			console.log("SecurityS0 got nonce, sending secure message");
			return send.send({
				...command,
				packet: encapsulated,
			});
		} else {
			return send.send(command);
		}
	}

	private async _handleSecurityNonceGet(
		event: LayerEvent<Packet>,
		send: Sender
	): Promise<void> {
		if (this._nonceStore.canGenerateNonce()) {
			const nonce = this._nonceStore.generate(event.endpoint.nodeId);
			console.log(
				`-> received S0 nonce get request, sending SECURITY_NONCE_REPORT nonce=[${bufferToString(
					nonce.data
				)}]`
			);
			await send.send({
				endpoint: { nodeId: event.endpoint.nodeId },
				packet: new SecurityV1.NonceReport({ nonce: nonce.data }),
			});
		} else {
			console.log(
				`-> received S0 nonce get request, but nonce store is full, ignoring request`
			);
		}
	}
}
