import { appendStack, defer, neverRejects } from ".";

/**
 * Simple promise-based callback queue with option to cancel remaining requests.
 * (In-progress requests need to be determined in another way.)
 */
export class Queue {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private _entries: Entry<any>[] = [];
	private _inProgress: number = 0;
	private readonly _concurrency: number = 1;

	public async add<T>(callback: () => T | Promise<T>): Promise<T> {
		// Provide (much) more meaningful stack trace in case of failures
		// while running pump
		const trace = new Error();
		const d = defer<T>();
		this._entries.push({
			callback,
			resolve: d.resolve,
			reject: d.reject,
		});
		neverRejects(this._pump());
		try {
			return await d.promise;
		} catch (err) {
			appendStack(err, trace);
			throw err;
		}
	}

	public abortPending(error: Error): void {
		for (const entry of this._entries) {
			entry.reject(error);
		}
		this._entries = [];
	}

	private async _pump(): Promise<void> {
		if (this._inProgress >= this._concurrency) {
			return;
		}
		const entry = this._entries.shift();
		if (!entry) {
			return;
		}
		try {
			this._inProgress++;
			const callback = entry.callback;
			const result = await callback();
			entry.resolve(result);
		} catch (err) {
			entry.reject(err as Error);
		} finally {
			this._inProgress--;
			neverRejects(this._pump());
		}
	}
}

interface Entry<T> {
	callback: () => T | Promise<T>;
	resolve: (value: T | PromiseLike<T>) => void;
	reject: (err: Error) => void;
}
