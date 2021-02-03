import { SerialApiSimpleCommand } from "./serialApiSimpleCommand";

export abstract class SerialApiResponseCommand<
	T,
	R
> extends SerialApiSimpleCommand<T> {
	public abstract parseResponse(response: Buffer): R;
}

export abstract class SerialApiResponseVoidCommand<
	R
> extends SerialApiResponseCommand<void, R> {
	public serializeRequest(): undefined {
		return undefined;
	}
}

export type ResponseTypeOf<T> = T extends SerialApiResponseCommand<any, infer R>
	? R
	: never;

export function isResponseCommand(
	command: unknown
): command is SerialApiResponseCommand<unknown, unknown> {
	return command && typeof command === "object" && "parseResponse" in command;
}
