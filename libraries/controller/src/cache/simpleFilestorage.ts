import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";
import { JsonValue } from "../types";
import { Storage } from "./storage";

export class SimpleFileStorage<T extends JsonValue> implements Storage<T> {
	private _rootDir: string;

	public constructor(rootDir: string) {
		this._rootDir = rootDir;
	}

	public async init(): Promise<void> {
		await mkdir(this._rootDir, { recursive: true });
	}

	public async save(key: string, value: T): Promise<void> {
		// First save it to a temp file, then move that over the original
		// to make it an atomic replace
		const realFile = this._getFilename(key);
		const tmpFile = realFile + ".tmp";
		const data = JSON.stringify(value, undefined, "\t");
		await writeFile(tmpFile, data + (data ? "\n" : ""), "utf8");
		await rename(tmpFile, realFile);
	}

	public async load(key: string): Promise<T | undefined> {
		let contents: string;
		try {
			contents = await readFile(this._getFilename(key), "utf8");
		} catch (err) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/consistent-type-assertions
			if ((<any>err).code === "ENOENT") {
				// Return `undefined` when key does not exist (yet)
				return;
			}
			throw err;
		}
		return JSON.parse(contents);
	}

	private _getFilename(key: string): string {
		return path.resolve(this._rootDir, key + ".json");
	}
}
