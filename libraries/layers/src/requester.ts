import { Packet } from "@ezwave/codec";
import { defer } from "@ezwave/shared";
import { Endpoint, LayerCommand, LayerEvent, Send } from "./layer";

export type Mapper<T extends Packet> = (
	event: LayerEvent<Packet>
) => undefined | T;

type Resolver<T extends Packet> = (event: LayerEvent<T>) => void;

interface Waiter<T extends Packet> {
	endpoint: Endpoint;
	mapper: Mapper<T>;
	resolve: Resolver<T>;
}

export class Requester {
	private _waits: Set<Waiter<any>> = new Set();

	public dispatch(event: LayerEvent<Packet>): void {
		const eventChan = event.endpoint.channel ?? 0;
		for (const waiter of this._waits) {
			// Filter out any message not coming from the node that command was issued to
			// TODO Requester now has to know about endpoints, which is not ideal
			if (event.endpoint.nodeId !== waiter.endpoint.nodeId) {
				continue;
			}
			if (eventChan !== (waiter.endpoint.channel ?? 0)) {
				continue;
			}
			// Map event to wanted packet type, resolve to it if successful
			const mapped = waiter.mapper(event);
			if (mapped) {
				waiter.resolve({
					...event,
					packet: mapped,
				});
				this._waits.delete(waiter);
			}
		}
	}

	public async sendAndWaitFor<T extends Packet>(
		command: LayerCommand,
		send: Send,
		mapper: Mapper<T>
	): Promise<LayerEvent<T> | undefined> {
		const d = defer<LayerEvent<T>>();
		const waiter: Waiter<T> = {
			endpoint: command.endpoint,
			mapper,
			resolve: d.resolve,
		};
		const enqueueWaiter = () => {
			this._waits.add(waiter);
		};
		const afterSend = command.afterSend
			? () => {
					enqueueWaiter();
					command.afterSend!();
			  }
			: enqueueWaiter;
		const sent = await send({ ...command, afterSend });
		if (!sent) {
			// Send was discarded, but theoretically it could be that afterSend
			// callback would be called already, so make sure to remove it.
			this._waits.delete(waiter);
			return undefined;
		}
		return d.promise;
	}
}
