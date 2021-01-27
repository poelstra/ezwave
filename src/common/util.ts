export function noop(): void {
	/* no-operation */
}

export function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface Deferred<T> {
	resolve: (value: T | PromiseLike<T>) => void;
	reject: (reason: Error) => void;
	promise: Promise<T>;
}

// There can only be one simultaneous call to defer() at any
// one time, so we can create the closure once and re-use it.
let deferResolve: Deferred<any>["resolve"];
let deferReject: Deferred<any>["reject"];
let deferExecutor = (res: typeof deferResolve, rej: typeof deferReject) => {
	deferResolve = res;
	deferReject = rej;
};

export function defer<T>(): Deferred<T> {
	return {
		promise: new Promise(deferExecutor),
		resolve: deferResolve,
		reject: deferReject,
	};
}

export function never(): Promise<never> {
	return new Promise(noop);
}

export function toHex(value: number, minWidth: number = 0): string {
	return value.toString(16).padStart(minWidth, "0");
}

export function bufferToString(buffer: Buffer): string {
	return [...buffer].map((n) => toHex(n, 2)).join(" ");
}

export interface EnumType {
	[key: number]: string;
}

export function enumToString(key: number, enumType: EnumType): string {
	const name = enumType[key];
	if (name !== undefined) {
		return name;
	}
	return `0x${toHex(key)}`;
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

export async function timeout<T>(
	promise: PromiseLike<T>,
	timeoutInMs: number,
	message?: string
): Promise<T> {
	// Create the error early (i.e. not inside timeout handler), to get good stack trace on timeout
	const error = new Error(message ?? "request timed out");
	return new Promise((resolve, reject) => {
		const timer = new Timer(timeoutInMs, () => reject(error));
		timer.start();
		promise.then(
			(value) => {
				timer.stop();
				resolve(value);
			},
			(err) => {
				timer.stop();
				reject(err);
			}
		);
	});
}

export class InterruptibleSleep {
	private _trigger = defer<void>();

	public async sleep(timeoutInMs: number): Promise<void> {
		let handle: NodeJS.Timer;
		try {
			await Promise.race([
				this._trigger.promise,
				new Promise(
					(resolve) => (handle = setTimeout(resolve, timeoutInMs))
				),
			]);
		} finally {
			clearTimeout(handle!);
		}
	}

	public interrupt(): void {
		this._trigger.resolve();
		this._trigger = defer();
	}
}
