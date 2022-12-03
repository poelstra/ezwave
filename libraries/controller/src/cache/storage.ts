import { JsonValue } from "../types";

export interface Storage<T extends JsonValue> {
	/**
	 * Save `value` to storage under given `key` as identifier.
	 * Note: `value` needs to be JSON serializable.
	 * Previous contents (if any) will be overwritten.
	 *
	 * @param key   Identifier to use for later retrieval
	 * @param value Data to persist
	 * @returns Promise that resolves when data is persisted
	 */
	save(key: string, value: T): Promise<void>;

	/**
	 * Load data for given `key` from storage.
	 * Returns a JSON deserialized representation of the data, or `undefined` if
	 * the key could not be found.
	 *
	 * @param key Identifier of the data as used by `save()`
	 * @returns Promise that resolves with the data, or `undefined` if not found
	 */
	load(key: string): Promise<T | undefined>;
}
