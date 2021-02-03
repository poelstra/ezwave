import { SerialApiCommandCode } from "./serialApiCommandCode";
import { SerialApiFuncIdCommand } from "./serialApiFuncIdCommand";

export type EventTypeOf<T> = T extends SerialApiTransactionCommand<
	any,
	infer E,
	any
>
	? E
	: never;

export type TransactionResultTypeOf<T> = T extends SerialApiTransactionCommand<
	any,
	any,
	infer R
>
	? R
	: never;

// TODO
export type TransactionSender = (command: any) => Promise<void>;

export type TransactionEventGetter<E> = (timeout: number) => Promise<E>;

export abstract class SerialApiTransactionCommand<
	T,
	E,
	R
> extends SerialApiFuncIdCommand<T, E> {
	constructor(command: SerialApiCommandCode, request: T) {
		super(command, request, Infinity);
	}

	public abstract execute(
		sender: TransactionSender,
		getEvent: TransactionEventGetter<E>
	): Promise<R>;
}

export function isTransactionCommand(
	command: unknown
): command is SerialApiTransactionCommand<unknown, unknown, unknown> {
	return command && typeof command === "object" && "execute" in command;
}
