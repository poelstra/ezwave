import { Queue } from "@ezwave/shared";
import debug from "debug";
import { inspect } from "util";
import { Events } from "./events";
import {
	ICommandSession,
	ICommandSessionRunner,
	TransactionRunner,
} from "./ICommandSession";
import { IProtocolManager } from "./protocolManager";
import { SerialApiCommandCode } from "./serialApiCommandCode";

const log: debug.Debugger = debug("zwave:serialapi:data");

const closedProtocolManager: IProtocolManager = {
	async transaction() {
		throw new Error("transaction closed");
	},
	async send() {
		throw new Error("transaction closed");
	},
	async request() {
		throw new Error("transaction closed");
	},
	getEvents() {
		throw new Error("transaction closed");
	},
};

/**
 * Implementation of @see ICommandSession, as used internally
 * by @see SerialApi.
 */
export class CommandSession implements ICommandSession {
	private _protocolManager: IProtocolManager;
	private _sessionQueue = new Queue();
	private _sessions = new Set<CommandSession>();
	private _events = new Set<Events<any>>();
	private _closed: Error | undefined;
	private _id = 0; // id used for logging in next execute() statement
	private _idPrefix: string; // in order to visualize nested sessions

	public constructor(
		protocolManager: IProtocolManager,
		idPrefix: string = ""
	) {
		this._protocolManager = protocolManager;
		this._idPrefix = idPrefix;
	}

	public async transaction<T>(cb: TransactionRunner<T>): Promise<T> {
		this._checkActive();
		return this._protocolManager.transaction((transactionId) =>
			cb(transactionId)
		);
	}

	public async send(
		command: SerialApiCommandCode,
		params?: Buffer
	): Promise<void> {
		this._checkActive();
		return this._protocolManager.send(command, params);
	}

	public async request(
		command: SerialApiCommandCode,
		params?: Buffer
	): Promise<Buffer> {
		this._checkActive();
		return this._protocolManager.request(command, params);
	}

	public async execute<T>(runner: ICommandSessionRunner<T>): Promise<T> {
		const currentId = `${this._idPrefix}${this._id++}`;
		log(`execute begin id=${currentId} runner=${runner.toString()}`);
		try {
			this._checkActive();
			const result = await this._sessionQueue.add(async () => {
				// Need an extra check here, because it may have taken a while
				// until this callback is invoked.
				this._checkActive();
				const child = new CommandSession(
					this._protocolManager,
					`${currentId}.`
				);
				this._sessions.add(child);
				try {
					const runnerResult = await runner.run(child);
					child.close(new Error("transaction closed"));
					return runnerResult;
				} catch (err) {
					child.close(err as Error);
					throw err;
				} finally {
					this._sessions.delete(child);
				}
			});
			log(`execute ok id=${currentId} result=${inspect(result)}`);
			return result;
		} catch (err) {
			log(`execute failed id=${currentId} error=${inspect(err)}`);
			throw err;
		}
	}

	public getEvents<T>(
		mapper: (command: SerialApiCommandCode, params: Buffer) => T | undefined
	): Events<T> {
		this._checkActive();
		const events: Events<T> = this._protocolManager.getEvents(mapper, () =>
			this._events.delete(events)
		);
		this._events.add(events);
		return events;
	}

	close(reason: Error) {
		this._closed = reason;
		this._protocolManager = closedProtocolManager;
		for (const events of this._events) {
			events.close(reason);
		}
		this._events.clear();
		for (const child of this._sessions) {
			child.close(reason);
		}
		this._sessions.clear();
		this._sessionQueue.abortPending(reason);
	}

	private _checkActive(): void {
		if (this._closed) {
			throw this._closed;
		}
	}
}
