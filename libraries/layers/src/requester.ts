import { Packet } from "@ezwave/codec";
import { defer, Timer } from "@ezwave/shared";
import { Endpoint } from "./endpoint";
import { LayerCommand, LayerEvent, Send } from "./layer";

export type Mapper<T extends Packet> = (
	event: LayerEvent<Packet>
) => undefined | T;

type Resolver<T extends Packet> = (
	event: LayerEvent<T> | Promise<never>
) => void;

interface Waiter<T extends Packet> {
	endpoint: Endpoint;
	mapper: Mapper<T>;
	resolve: Resolver<T>;
}

export interface RequesterOptions {
	/**
	 * Default request timeout in milliseconds, measured from when request is
	 * actually sent on network.
	 */
	requestTimeout?: number;
}

const DEFAULT_REQUESTER_OPTIONS: Required<RequesterOptions> = {
	// This is mostly there to ensure the stack doesn't get hung up if someone forgets to
	// pass an explicit timeout. For requests that are known to take long, set an explicit
	// timeout.
	requestTimeout: 20 * 1000,
};

export class Requester {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private _waits: Set<Waiter<any>> = new Set();
	private _options: Required<RequesterOptions>;

	public constructor(options?: RequesterOptions) {
		this._options = { ...DEFAULT_REQUESTER_OPTIONS, ...options };
	}

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
			try {
				// Map event to wanted packet type, resolve to it if successful
				const mapped = waiter.mapper(event);
				if (mapped) {
					waiter.resolve({
						...event,
						packet: mapped,
					});
				}
			} catch (err) {
				// Errors in the mapper itself need to be passed back
				// to original requester
				waiter.resolve(Promise.reject(err));
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
		const timeoutError = new Error("request timeout"); // created in the main control flow to ensure proper stack trace
		const timer = new Timer(
			command.requestTimeout ?? this._options.requestTimeout,
			() => d.reject(timeoutError)
		);
		const packetSentCallback = (): void => {
			this._waits.add(waiter);
			timer?.start();
		};
		const originalAfterSend = command.afterSend;
		const afterSend = originalAfterSend
			? () => {
					packetSentCallback();
					originalAfterSend();
			  }
			: packetSentCallback;

		try {
			const sent = await send({ ...command, afterSend });
			if (!sent) {
				return undefined;
			}
			return await d.promise;
		} finally {
			this._waits.delete(waiter);
			timer?.stop();
		}
	}
}
