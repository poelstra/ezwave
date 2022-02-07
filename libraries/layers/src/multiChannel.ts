import { Packet } from "@ezwave/codec";
import { MultiChannelV3 } from "@ezwave/commands";
import debug from "debug";
import {
	DispatchNext,
	Layer,
	LayerCommand,
	LayerEvent,
	Sender,
	SendNext,
} from "./layer";
import { layerCommandToString, layerEventToString } from "./print";
import { Requester } from "./requester";

const log: debug.Debugger = debug("zwave:layers:multichannel");

export class MultiChannelLayer implements Layer {
	private _requester = new Requester();

	public async dispatch(
		event: LayerEvent<Packet>,
		next: DispatchNext,
		sender: Sender
	): Promise<void> {
		this._requester.dispatch(event);

		// Encapsulation is decoded and handled, EncapNonceGet is replied to afterwards
		const encapPacket = event.packet.tryAs(
			MultiChannelV3.MultiChannelCmdEncap
		);

		// Non-encapsulated packet, just pass through (but allow sender to still encapsulate
		// messages if necessary)
		if (!encapPacket) {
			sender = this._makeMultiChannelSender(sender);
			return next(event, sender);
		}

		// Encapsulated packet, decode it and forward decoded event
		// TODO Handle bitaddress...
		const decodedEvent: LayerEvent<Packet> = {
			packetType: event.packetType,
			endpoint: {
				nodeId: event.endpoint.nodeId,
				channel: encapPacket.data.sourceEndPoint,
			},
			packet: encapPacket.data.command,
		};

		// TODO Force sends to always go back to the same channel?
		sender = this._makeMultiChannelSender(sender);

		log("decoded", layerEventToString(decodedEvent));
		return next(decodedEvent, sender);
	}

	public async send(
		command: LayerCommand,
		next: SendNext,
		send: Sender
	): Promise<boolean> {
		const secureSend = this._makeMultiChannelSender(send);
		return await next(command, secureSend);
	}

	private _makeMultiChannelSender(upstreamSender: Sender): Sender {
		return {
			send: (command) => this._multiChannelSend(command, upstreamSender),
			// TODO Packet overhead is tricky to compute like this
			// TODO Packet overhead depends on whether we actually need to encapsulate
			packetCapacity: () => upstreamSender.packetCapacity() - 5,
		};
	}

	private async _multiChannelSend(
		command: LayerCommand,
		send: Sender
	): Promise<boolean> {
		if (command.endpoint.channel) {
			// TODO make source endpoint configurable
			const encapsulated = new MultiChannelV3.MultiChannelCmdEncap({
				sourceEndPoint: 0,
				destinationEndPoint: command.endpoint.channel,
				bitAddress: false,
				command: command.packet,
			});
			const encapsulatedCmd: LayerCommand = {
				...command,
				endpoint: { nodeId: command.endpoint.nodeId, channel: 0 },
				packet: encapsulated,
			};
			log("encoded", layerCommandToString(encapsulatedCmd));
			return send.send(encapsulatedCmd);
		} else {
			return send.send(command);
		}
	}
}
