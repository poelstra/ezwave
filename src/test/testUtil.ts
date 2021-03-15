import { Duplex } from "stream";

export class DuplexSource<T> extends Duplex {
	/**
	 * List of all received chunks so far.
	 */
	public received: T[] = [];

	/**
	 * List of all end, close, and error events on ourselves so far.
	 */
	public events: string[] = [];

	constructor() {
		super({
			objectMode: true,
			// Somewhere between Node 12 and Node 14, Duplex streams started
			// emitting "close" when ending the stream. The tests are written
			// to explicitly distinguish between ended and closed streams,
			// so prevent auto-destroy. It's still fine if actual implementations
			// use autoDestroy though.
			autoDestroy: false,
		});
		// end event is registered when our sink ends us (i.e. _final())
		this.on("close", () => this.events.push("close"));
		this.on("error", () => this.events.push("error"));
	}

	/**
	 * Clear list of received buffers.
	 */
	public clear(): void {
		this.received = [];
	}

	/**
	 * Emit the given chunk from the Duplex stream.
	 */
	public send(chunk: T): void {
		this.push(chunk);
	}

	/**
	 * Indicate that no further chunks will be emitted from this Duplex stream.
	 */
	public sendEnd(): void {
		this.push(null);
	}

	_read(size: number): void {
		/* no-op */
	}

	_write(
		chunk: any,
		encoding: string,
		callback: (error?: Error | null) => void
	): void {
		this.received.push(chunk);
		callback();
	}

	_final(callback: (error?: Error | null) => void): void {
		this.events.push("end");
		callback();
	}
}

export class DuplexSink<T> {
	/**
	 * List of all received chunks so far.
	 */
	public received: T[] = [];

	/**
	 * List of all end, close, and error events on the source stream so far.
	 */
	public events: string[] = [];

	private _source: Duplex;

	constructor(source: Duplex) {
		this._source = source;

		this._source.on("data", (chunk) => this.received.push(chunk));
		this._source.on("end", () => this.events.push("end")); // EOF from source
		this._source.on("close", () => this.events.push("close"));
		this._source.on("error", () => this.events.push("error"));
	}

	/**
	 * Clear list of received buffers.
	 */
	public clear(): void {
		this.received = [];
		this.events = [];
	}

	/**
	 * Emit the given chunk to the source Duplex stream.
	 */
	public send(chunk: T): void {
		this._source.write(chunk);
	}

	/**
	 * Indicate no further chunks will be emitted to the source Duplex stream
	 */
	public end(): void {
		this._source.end();
	}

	public destroy(err?: Error): void {
		this._source.destroy(err);
	}
}
