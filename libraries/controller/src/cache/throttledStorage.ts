import { delay } from "@ezwave/shared";
import assert from "assert";
import { JsonValue } from "../types";
import { Storage } from "./storage";

export class ThrottledStorage<T extends JsonValue> implements Storage<T> {
	private _backend: Storage<T>;
	private _saveQueue: Map<string, ThrottleItem<T>> = new Map();
	private _delay: number;
	private _closing: boolean = false;

	public constructor(
		storageBackend: Storage<T>,
		throttleDelay: number = 100
	) {
		this._backend = storageBackend;
		this._delay = throttleDelay;
	}

	public async close(): Promise<void> {
		// Prevent new writes
		this._closing = true;
		// Wait for pending ones
		for (const item of this._saveQueue.values()) {
			await item.promise;
		}
	}

	public async save(key: string, value: T): Promise<void> {
		if (this._closing) {
			throw new Error("ThrottledStorage is closing or closed");
		}

		const doSave = async (): Promise<void> => {
			await delay(this._delay);
			const item = this._saveQueue.get(key);
			assert(item);
			if (!item.needsSave) {
				// TODO Can this actually happen?
				return;
			}
			// Mark existing record as 'in-progress'.
			// If another save is requested while saving, it will
			// be chained after the current write (after another throttleDelay).
			item.needsSave = false;
			await this._backend.save(key, item.latestValue);
		};

		// Get or create pending action record for this key
		let item = this._saveQueue.get(key);
		if (!item) {
			// No save action currently scheduled, just create a new one.
			item = {
				needsSave: true,
				latestValue: value,
				promise: doSave(),
			};
			this._saveQueue.set(key, item);
		} else if (item.needsSave) {
			// Last item still needs to be saved, just overwrite it with
			// latest, and piggy-back on the existing write.
			item.latestValue = value;
		} else {
			// Last item is already being save to disk, so we
			// need to schedule the next write after it.
			item = {
				needsSave: true,
				latestValue: value,
				promise: item.promise.finally(doSave),
			};
		}

		try {
			await item.promise;
		} finally {
			// If there are no pending saves anymore, we can safely remove
			// the record for this key, otherwise keep it until the scheduled
			// save is done with it
			if (!item.needsSave) {
				this._saveQueue.delete(key);
			}
		}
	}

	public async load(key: string): Promise<T | undefined> {
		const item = this._saveQueue.get(key);
		if (item) {
			return item.latestValue;
		}
		return this._backend.load(key);
	}
}

interface ThrottleItem<T> {
	needsSave: boolean;
	latestValue: T;
	promise: Promise<void>;
}
