import { Packet } from "../commands/packet";
import { DestinationType } from "../serialapi/serialapi";

export interface Endpoint {
	nodeId: number;
	channel?: number;
}

export interface LayerEvent<T extends Packet> {
	packetType: DestinationType; // TODO remove dependency on Host?
	endpoint: Endpoint;
	packet: T;
}

export interface LayerCommand {
	endpoint: Endpoint;
	packet: Packet;
	afterSend?: () => void;
	secure?: boolean; // TODO probably move elsewhere
}

// TODO change return type to handle ack/no ack cases, in addition to not trying to send at all?
//      Or should no-ack case be returned as an exception? Or should ignore also be signalled as an exception?
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
