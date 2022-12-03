import { Packet } from "@ezwave/codec";
import { DestinationType } from "@ezwave/serialapi";
import { Endpoint } from "./endpoint";

export interface LayerEvent<T extends Packet> {
	destinationType: DestinationType; // TODO remove dependency on Host?
	endpoint: Endpoint;
	packet: T;
	secure: boolean; // TODO This will become more complex with SecurityS2, find a more abstract approach
}

export interface LayerCommand {
	/**
	 * Node ID and (optionally) endpoint within node.
	 */
	endpoint: Endpoint;

	/**
	 * Z-Wave command class packet to send.
	 */
	packet: Packet;

	/**
	 * Optional callback to be called just after `packet` is
	 * actually transmitted on Z-Wave network.
	 *
	 * It may take a while before the request is actually transferred
	 * to the network, e.g. in case of security handshakes etc.
	 * Other responses may still be coming in, so this callback can be
	 * used to install e.g. response listeners at the latest point in
	 * time to increase the chance of receiving a response to the request
	 * that was sent, not just any earlier response that happened to
	 * match the response mapper.
	 */
	afterSend?: () => void;

	/**
	 * Whether to send the request securely.
	 */
	secure?: boolean; // TODO Maybe move elsewhere, or make it transparent to pass options to layers (e.g. S2 might require more than just a boolean)

	/**
	 * Timeout in milliseconds, measured from when request is
	 * actually sent on network.
	 *
	 * When unspecified, uses default timeout of layer, e.g. controller's main Requester.
	 */
	requestTimeout?: number;
}

// TODO change return type to handle ack/no ack cases, in addition to not trying to send at all?
//      Or should no-ack case be returned as an exception? Or should ignore also be signalled as an exception?
// TODO Document when/why a send can be ignored, and perhaps find a better/easier way to signal that
export type Send = (command: LayerCommand) => boolean | Promise<boolean>;

export type Dispatch = (event: LayerEvent<Packet>) => void | Promise<void>;

export interface Sender {
	send: Send;
	packetCapacity(): number;
}

export type DispatchNext = (
	event: LayerEvent<Packet>,
	send: Sender
) => void | Promise<void>;

export type SendNext = (
	command: LayerCommand,
	send: Sender
) => boolean | Promise<boolean>;

export interface Layer {
	dispatch?(
		event: LayerEvent<Packet>,
		next: DispatchNext,
		send: Sender
	): void | Promise<void>;

	send?(
		command: LayerCommand,
		next: SendNext,
		send: Sender
	): boolean | Promise<boolean>;
}
