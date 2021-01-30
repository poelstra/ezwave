import { SerialApiCommandCode } from "./serialApiCommandCode";
import { SerialApiSimpleCommand } from "./serialApiSimpleCommand";

export abstract class SerialApiCallbackCommand<
	T,
	R
> extends SerialApiSimpleCommand<T> {
	public abstract tryParseCallback(
		command: SerialApiCommandCode,
		params: Buffer,
		transactionId: number
	): R | undefined;
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
