import { SerialApiCommandCode } from "./serialApiCommandCode";

export abstract class SerialApiSimpleCommand<T> {
	public readonly command: SerialApiCommandCode;
	public readonly request: T;

	constructor(command: SerialApiCommandCode, request: T) {
		this.command = command;
		this.request = request;
	}

	public abstract serializeRequest(
		transactionId: number
	): T extends void ? undefined : Buffer;
}

export class SerialApiSimpleVoidCommand extends SerialApiSimpleCommand<void> {
	public serializeRequest(): undefined {
		return undefined;
	}
}
