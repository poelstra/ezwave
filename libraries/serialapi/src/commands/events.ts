import { defer, timeout } from "@ezwave/shared";

export class Events<T> {
	private _events: T[] = [];
	private _getters: Array<(value: T | PromiseLike<T>) => void> = [];
	private _closed: Error | undefined;
	private _onClose: (() => void) | undefined;

	public constructor(onClose?: () => void) {
		this._onClose = onClose;
	}

	public add(event: T): void {
		if (this._closed) {
			return;
		}
		if (this._getters.length > 0) {
			const getter = this._getters.shift()!;
			getter(event);
			return;
		}
		this._events.push(event);
	}

	public async get(timeoutInMs?: number): Promise<T> {
		if (this._closed) {
			throw this._closed;
		}
		if (this._events.length > 0) {
			return this._events.shift()!;
		}
		const d = defer<T>();
		this._getters.push(d.resolve);
		if (!timeoutInMs) {
			return d.promise;
		}
		try {
			return await timeout(d.promise, timeoutInMs);
		} finally {
			// Remove timed-out getter, if necessary, to prevent
			// event getting lost (can still happen, it's a race
			// condition even if we would make it perfect here)
			const index = this._getters.indexOf(d.resolve);
			if (index >= 0) {
				this._getters.splice(index, 1);
			}
		}
	}

	public close(reason: Error): void {
		this._closed = reason;
		this._events = [];
		const getters = this._getters;
		this._getters = [];
		for (const getter of getters) {
			getter(Promise.reject(reason));
		}
		this._onClose?.();
	}
}
