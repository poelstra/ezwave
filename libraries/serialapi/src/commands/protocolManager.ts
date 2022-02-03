import { Queue } from "@ezwave/shared";
import { enumToString } from "@ezwave/shared";
import { IProtocol } from "../protocol";
import { Events } from "./events";
import { TransactionRunner } from "./ICommandSession";
import { SerialApiCommandCode } from "./serialApiCommandCode";

/**
 * Interface used internally by @see CommandSession.
 */
export interface IProtocolManager {
	transaction<T>(cb: TransactionRunner<T>): Promise<T>;

	send(command: SerialApiCommandCode, params?: Buffer): Promise<void>;

	request(command: SerialApiCommandCode, params?: Buffer): Promise<Buffer>;

	getEvents<T>(
		mapper: (
			command: SerialApiCommandCode,
			params: Buffer
		) => T | undefined,
		onClose?: () => void
	): Events<T>;
}

/**
 * Class used internally by @see SerialApi.
 */
export class ProtocolManager implements IProtocolManager {
	private _requests = new Queue();
	private _currentId = 0;
	private _transactionIds = new Set<number>();
	private _protocol: IProtocol;
	private _supportedFunctions = new Set<SerialApiCommandCode>();

	constructor(protocol: IProtocol) {
		// TODO it's probably cleaner to not directly pass in the
		// protocol, and instead pass in an explicit object with
		// send/request/etc such that SerialApi can check
		// supportedFunctions itself
		this._protocol = protocol;
	}

	public setSupportedFunctions(functions: Set<SerialApiCommandCode>): void {
		this._supportedFunctions = new Set(functions);
	}

	public async transaction<T>(cb: TransactionRunner<T>): Promise<T> {
		const transactionId = this._getTransactionId();
		try {
			return await cb(transactionId);
		} finally {
			this._releaseTransactionId(transactionId);
		}
	}

	public send(command: SerialApiCommandCode, params?: Buffer): Promise<void> {
		this._verifyCommandSupported(command);
		return this._requests.add(() => this._protocol.send(command, params));
	}

	public request(
		command: SerialApiCommandCode,
		params?: Buffer
	): Promise<Buffer> {
		this._verifyCommandSupported(command);
		return this._requests.add(() =>
			this._protocol.request(command, params)
		);
	}

	public getEvents<T>(
		mapper: (
			command: SerialApiCommandCode,
			params: Buffer
		) => T | undefined,
		onClose?: () => void
	): Events<T> {
		let events: Events<T>;
		const handler = (command: SerialApiCommandCode, params: Buffer) => {
			const event = mapper(command, params);
			if (event) {
				events.add(event);
			}
		};
		events = new Events(() => {
			this._protocol.off("callback", handler);
			onClose?.();
		});
		this._protocol.on("callback", handler);
		return events;
	}

	private _getTransactionId(): number {
		for (let i = 1; i < 0xff; i++) {
			this._currentId++;
			if (this._currentId > 0xff) {
				// Note: not 0, because that means we don't want feedback
				this._currentId = 1;
			}
			if (!this._transactionIds.has(this._currentId)) {
				this._transactionIds.add(this._currentId);
				return this._currentId;
			}
		}
		throw new Error("too many pending transactions");
	}

	private _releaseTransactionId(id: number): void {
		this._transactionIds.delete(id);
	}

	private _verifyCommandSupported(command: SerialApiCommandCode): void {
		if (!this._supportedFunctions.has(command)) {
			throw new Error(
				`Serial API command ${enumToString(
					command,
					SerialApiCommandCode
				)} not supported by device`
			);
		}
	}
}
