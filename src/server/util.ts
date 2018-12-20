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

export class Timer {
	private _timeout: number;
	private _onTimeout: () => void;
	private _handle: NodeJS.Timer | undefined;

	constructor(timeout: number, onTimeout: () => void) {
		this._timeout = timeout;
		this._onTimeout = onTimeout;
	}

	public start(): void {
		if (this._handle !== undefined) {
			return;
		}
		this._handle = setTimeout(
			() => {
				this._handle = undefined;
				const cb = this._onTimeout;
				cb();
			},
			this._timeout
		);
	}

	public stop(): void {
		if (this._handle !== undefined) {
			clearTimeout(this._handle);
			this._handle = undefined;
		}
	}
}
