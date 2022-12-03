import { neverRejects } from ".";

/**
 * Simple promise-based callback queue with option to cancel remaining requests.
 * (In-progress requests need to be determined in another way.)
 */
export class Queue {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private _entries: Entry<any>[] = [];
	private _inProgress: number = 0;
	private readonly _concurrency: number = 1;

	public add<T>(callback: () => T | Promise<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			this._entries.push({
				callback,
				resolve,
				reject,
			});
			neverRejects(this._pump());
		});
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
