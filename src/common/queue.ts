/**
 * Simple promise-based callback queue with option to cancel remaining requests.
 * (In-progress requests need to be determined in another way.)
 */

interface Entry<T> {
	callback: () => T | Promise<T>;
	resolve: (value: T | PromiseLike<T>) => void;
	reject: (err: Error) => void;
}

export class Queue {
	private _entries: Entry<any>[] = [];
	private _inProgress = 0;
	private readonly _concurrency = 1;

	public add<T>(callback: () => T | Promise<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			this._entries.push({
				callback,
				resolve,
				reject,
			});
			this._pump();
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
			entry.reject(err);
		} finally {
			this._inProgress--;
			this._pump();
		}
	}
}
