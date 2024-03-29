import { defer, Deferred, delay } from "@ezwave/shared";
import { EventEmitter, once } from "events";
import MHubClient, { Headers, Message } from "mhub";

export interface HubEvents {
	on(event: "subscribe", listener: () => void): void;
}

export type SubscribeCallback = (
	message: Message,
	subscriptionId: string
) => void | Promise<void>;

interface Subscription {
	node: string;
	pattern?: string;
	id: string;
}

export class Hub extends EventEmitter implements HubEvents {
	private _hub: MHubClient;
	private _user: string;
	private _pass: string;
	private _subscriptions: Subscription[] = [];
	private _connected: boolean = false;
	private _connectedDeferred: Deferred<void> = defer();
	private _callbacks: Map<string, SubscribeCallback> = new Map();

	public constructor(url: string, user: string, pass: string) {
		super();
		this._user = user;
		this._pass = pass;
		this._hub = new MHubClient(url, { noImplicitConnect: true });
		this._hub.on("error", () => {
			// no-op, already handled elsewhere, but need to 'handle' these errors
			// to prevent NodeJS EventEmitter errors
		});
		this._hub.on("message", (message, id) => {
			const dumpError = (err: unknown): void =>
				console.warn("Hub dispatch failed", err);
			const sub = this._callbacks.get(id);
			if (sub) {
				try {
					const result = sub(message, id);
					if (result) {
						result.catch(dumpError);
					}
				} catch (err) {
					dumpError(err);
				}
			}
		});
	}

	public async subscribe(
		nodeName: string,
		pattern: string,
		callback: SubscribeCallback
	): Promise<void> {
		const sub: Subscription = {
			node: nodeName,
			pattern: pattern,
			id: `__auto_${this._subscriptions.length}`,
		};
		this._callbacks.set(sub.id, callback);
		this._subscriptions.push(sub);
		if (this._connected) {
			await this._hub.subscribe(sub.node, sub.pattern, sub.id);
		}
	}

	public publish(
		nodeName: string,
		topic: string,
		data?: unknown,
		headers?: Headers
	): Promise<void>;
	public publish(nodeName: string, message: Message): Promise<void>;
	public async publish(nodeName: string, ...args: unknown[]): Promise<void> {
		await this._connectedDeferred.promise;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		await (this._hub.publish as any)(nodeName, ...args);
	}

	public async run(): Promise<never> {
		let lastSuccess = false;
		// eslint-disable-next-line no-constant-condition
		while (true) {
			try {
				console.log(`Hub connecting to ${this._hub.url} ...`);
				await this._hub.connect();
				console.log(`Hub logging in...`);
				await this._hub.login(this._user, this._pass);
				console.log(`Hub subscribing...`);
				this._connected = true;
				this._connectedDeferred.resolve();
				for (const sub of this._subscriptions) {
					await this._hub.subscribe(sub.node, sub.pattern, sub.id);
				}
				console.log(`Hub connected.`);
				await once(this._hub, "close");
				console.log(`Hub disconnected.`);
			} catch (err) {
				console.error("Hub connect error", err);
			}
			this._connected = false;
			// TODO This should probably only be done if was connected before,
			// otherwise some initial publishes may be pending forever
			this._connectedDeferred = defer();
			try {
				await this._hub.close();
			} catch {
				// ignore follow-up error
			}
			if (!lastSuccess) {
				// Quick reconnect on first error, otherwise wait a bit
				await delay(3000);
			}
			lastSuccess = false;
		}
	}
}
