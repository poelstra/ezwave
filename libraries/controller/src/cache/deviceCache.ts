import { JsonValue } from "../types";
import { Cache } from "./cache";
import { Storage } from "./storage";

export class DeviceCache implements Cache<number, JsonValue> {
	private _storage: Storage<JsonValue>;

	public constructor(storage: Storage<JsonValue>) {
		this._storage = storage;
	}

	public async get(key: number): Promise<JsonValue | undefined> {
		return this._storage.load(key.toString());
	}

	public async set(key: number, value: JsonValue): Promise<void> {
		return this._storage.save(key.toString(), value);
	}

	public async delete(key: number): Promise<void> {
		// TODO implement
		throw new Error("Method not implemented.");
	}
}
