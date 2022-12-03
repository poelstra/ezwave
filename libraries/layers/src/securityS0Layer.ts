// TODO Move this layer to @ezwave/security

import { Packet } from "@ezwave/codec";
import { SecurityV1 } from "@ezwave/commands";
import {
	DEFAULT_NONCE_TIMEOUT,
	NonceStore,
	SecurityS0Codec,
} from "@ezwave/security";
import { bufferToString, toHex } from "@ezwave/shared";
import { randomBytes } from "crypto";
import debug from "debug";
import {
	DispatchNext,
	Layer,
	LayerCommand,
	LayerEvent,
	Sender,
	SendNext,
} from "./layer";
import {
	endPointToString,
	layerCommandToString,
	layerEventToString,
} from "./print";
import { Requester } from "./requester";

const log: debug.Debugger = debug("zwave:layers:securitys0");

/**
 * Timeout (in milliseconds) for NonceGet.
 *
 * SDS13783-Z-Wave-Transport-Encapsulation-Command-Class-Specification, section 3.5.2 says:
 * "The duration of this timer will depend on the application it is trying to protect."
 *
 * Let's set it to the same as the default nonce timeout (10s).
 */
const NONCE_REQUEST_TIMEOUT: number = DEFAULT_NONCE_TIMEOUT;

export class SecurityS0Layer implements Layer {
	private _requester: Requester;
	private _nonceStore: NonceStore;
	private _codec: SecurityS0Codec;

	public constructor(codec: SecurityS0Codec, nonceStore: NonceStore) {
		this._nonceStore = nonceStore;
		this._codec = codec;
		this._requester = new Requester();
	}

	public async dispatch(
		event: LayerEvent<Packet>,
		next: DispatchNext,
		sender: Sender
	): Promise<void> {
		this._requester.dispatch(event);

		// NonceGet is just responded to, not passed through
		if (event.packet.is(SecurityV1.SecurityNonceGet)) {
			return this._handleSecurityNonceGet(event, sender);
		}

		// NonceReport is handled in _secureSend, not passed through
		if (event.packet.is(SecurityV1.SecurityNonceReport)) {
			return;
		}

		// Encapsulation is decoded and handled, EncapNonceGet is replied to afterwards
		const encapPacket =
			event.packet.tryAs(SecurityV1.SecurityMessageEncapsulation) ??
			event.packet.tryAs(SecurityV1.SecurityMessageEncapsulationNonceGet);

		// Non-secure packet, just pass through (but allow sender to still encrypt
		// messages if necessary)
		if (!encapPacket) {
			sender = this._makeSecureSender(sender);
			return next(event, sender);
		}

		// Encapsulated packet, decode it and forward decoded event
		const decoded = this._codec.decapsulate(
			encapPacket,
			event.endpoint.nodeId,
			1
		);
		const decodedEvent: LayerEvent<Packet> = {
			destinationType: event.destinationType,
			endpoint: event.endpoint,
			packet: decoded,
			secure: true,
		};

		if (event.packet.is(SecurityV1.SecurityMessageEncapsulationNonceGet)) {
			// It doesn't seem to be mentioned in the docs, but at least one of my devices doesn't
			// send back e.g. a Report to a Get when receiving a MessageEncapsulationNonceGet (only
			// the nonce report is sent). Let's mimick that behavior here.
			await this._handleSecurityNonceGet(event, sender);
			sender = {
				send(_command: LayerCommand) {
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

		log("decoded", layerEventToString(decodedEvent));
		return next(decodedEvent, sender);
	}

	public async send(
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
			log(`fetch nonce, endpoint=${endPointToString(command.endpoint)}`);
			const nonceEvent = await this._requester.sendAndWaitFor(
				{
					endpoint: command.endpoint,
					packet: new SecurityV1.SecurityNonceGet(),
					requestTimeout: Math.min(
						command.requestTimeout ?? Infinity,
						NONCE_REQUEST_TIMEOUT
					),
				},
				send.send,
				(evt) => evt.packet.tryAs(SecurityV1.SecurityNonceReport)
			);
			if (!nonceEvent) {
				// Send was suppressed, stop further processing.
				return false;
			}
			const destination = command.endpoint.nodeId;
			const senderNonce = randomBytes(8);
			const encapsulated = this._codec.encapsulate(
				command.packet,
				1,
				destination,
				senderNonce,
				nonceEvent.packet.data.nonce,
				false
			);
			const encapCmd: LayerCommand = {
				...command,
				packet: encapsulated,
			};
			log(
				`received nonce, encoded command`,
				layerCommandToString(encapCmd)
			);
			return send.send(encapCmd);
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
			const nonceCmd: LayerCommand = {
				endpoint: { nodeId: event.endpoint.nodeId },
				packet: new SecurityV1.SecurityNonceReport({
					nonce: nonce.data,
				}),
			};
			log(
				`send nonce report to=${endPointToString(
					nonceCmd.endpoint
				)} nonceId=${toHex(nonce.id, 2)} nonce=[${bufferToString(
					nonce.data
				)}]`
			);
			await send.send(nonceCmd);
		} else {
			log(
				`warn`,
				`received nonce get request from ${event.endpoint}, but nonce store is full, ignoring request`
			);
		}
	}
}
