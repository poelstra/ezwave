import { SerialApiCommandCode } from "./serialApiCommandCode";
import { SerialApiSimpleCommand } from "./serialApiSimpleCommand";

export abstract class SerialApiCallbackCommand<
	T,
	R
> extends SerialApiSimpleCommand<T> {
	public readonly timeout: number;

	constructor(command: SerialApiCommandCode, request: T, timeout: number) {
		super(command, request);
		this.timeout = timeout;
	}

	public abstract verifyResponse?(response: Buffer): void;

	public abstract tryParseCallback(
		command: SerialApiCommandCode,
		params: Buffer,
		transactionId: number
	): R | undefined;
}

export function verifyTransmitResponse(
	this: SerialApiCallbackCommand<any, any>,
	response: Buffer
): void {
	if (response.length < 1) {
		throw new Error(
			`command ${
				SerialApiCommandCode[this.command]
			} failed: got zero-length response from Z-Wave Serial device`
		);
	}
	if (response[0] === 0) {
		throw new Error(
			`command ${
				SerialApiCommandCode[this.command]
			} failed: request could not be queued`
		);
	}
}

export type CallbackTypeOf<T> = T extends SerialApiCallbackCommand<any, infer R>
	? R
	: never;

export function isCallbackCommand(
	command: unknown
): command is SerialApiCallbackCommand<unknown, unknown> {
	return (
		command && typeof command === "object" && "tryParseCallback" in command
	);
}
