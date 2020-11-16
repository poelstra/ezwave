export function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface Deferred<T> {
	resolve: (value: T | PromiseLike<T>) => void;
	reject: (reason: Error) => void;
	promise: Promise<T>;
}

export function defer<T>(): Deferred<T> {
	let resolve: Deferred<T>["resolve"];
	let reject: Deferred<T>["reject"];
	return {
		promise: new Promise((res, rej) => {
			resolve = res;
			reject = rej;
		}),
		resolve: resolve!,
		reject: reject!,
	};
}

export function bufferToString(buffer: Buffer): string {
	return [...buffer].map((n) => n.toString(16).padStart(2, "0")).join(" ");
}

/**
 * Simple timer management.
 *
 * When the timer is started, it will call the given
 * callback after the timeout expired (and if the timer
 * wasn't stopped before then).
 */
export class Timer {
	private _timeout: number;
	private _onTimeout: () => void;
	private _handle: NodeJS.Timer | undefined;

	/**
	 * Construct new timer, setting the timeout and callback
	 * to be used.
	 * The timer is not automatically started yet.
	 *
	 * The callback will be called when the timeout expires
	 * after the timer is started (and when it isn't stopped
	 * before the timeout).
	 *
	 * It is possible to start the timer again from the callback.
	 *
	 * @param Timeout Timeout in milliseconds
	 * @param onTimeout Callback to be called.
	 */
	constructor(timeout: number, onTimeout: () => void) {
		this._timeout = timeout;
		this._onTimeout = onTimeout;
	}

	/**
	 * Start the timer.
	 *
	 * If the timer is already running, the request is ignored.
	 *
	 * When the timeout expires, the callback passed to the
	 * constructor will be called. Note that the timer is
	 * in the stopped state when the callback is called, so
	 * it can be started again if needed.
	 */
	public start(): void {
		if (this._handle !== undefined) {
			return;
		}
		this._handle = setTimeout(() => {
			this._handle = undefined;
			const cb = this._onTimeout;
			cb();
		}, this._timeout);
	}

	/**
	 * Stop the timer.
	 *
	 * If the timer isn't running, the request is ignored.
	 * After stopping, the timer can be started again if
	 * needed.
	 */
	public stop(): void {
		if (this._handle !== undefined) {
			clearTimeout(this._handle);
			this._handle = undefined;
		}
	}
}
