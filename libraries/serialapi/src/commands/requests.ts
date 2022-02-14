import { Events } from "./events";
import { ICommandSession } from "./ICommandSession";

/**
 * Z-Wave Serial API REQ command.
 *
 * Typically sent using @see RequestRunner.
 * The result of executing a SimpleRequest will be `void`.
 */
export interface SimpleRequest {
	/**
	 * Command to send.
	 */
	command: number;

	/**
	 * Optional parameters to command.
	 */
	params?: Buffer;
}

/**
 * Z-Wave Serial API REQ (HOST->ZW) and RES (ZW->HOST) command.
 *
 * Typically sent using @see RequestRunner.
 * The result of executing a ResponseRequest will be `R`.
 */
export interface ResponseRequest<R> extends SimpleRequest {
	/**
	 * Convert RES payload into parsed representation.
	 */
	parseResponse: (params: Buffer) => R;
}

/**
 * Z-Wave Serial API REQ (HOST->ZW), optionally RES (ZW->HOST),
 * followed by one or more REQ (ZW->HOST) events command.
 *
 * Typically sent using @see RequestRunner.
 * The result of executing a CallbackRequest will be `R`.
 */
export interface CallbackRequest<C, R> extends SimpleRequest {
	/**
	 * If given, expect and parse response of RES payload.
	 * Aborts command if an error is thrown, continues to wait for
	 * events otherwise.
	 */
	parseResponse?: (params: Buffer) => void;

	/**
	 * Called for every REQ message emitted by Z-Wave chip.
	 * When it returns `undefined`, the message is ignored.
	 * Otherwise, the returned value is added to the events object
	 * that is passed to `handleEvents()`.
	 * If the parser throws an error, the events object is closed
	 * with that error, and the command is aborted.
	 */
	tryParseEvent: (command: number, buffer: Buffer) => C | undefined;

	/**
	 * Callback called after command was successfully sent, and `parseResponse()`
	 * (if defined) completed successfully.
	 *
	 * It is passed an events object on which `.get(timeout?)` can be called
	 * to retrieve any events decoded by `tryParseEvent()`.
	 * It is passed the currently executing command session, which allows to
	 * e.g. execute nested command sessions as necessary.
	 *
	 * The return value of `handleEvents()` will be the final result of the
	 * command session.
	 */
	handleEvents: (events: Events<C>, session: ICommandSession) => Promise<R>;
}

export type AnyRequest<C, R> =
	| SimpleRequest
	| ResponseRequest<R>
	| CallbackRequest<C, R>;

export type SimpleRequestBuilder = () => SimpleRequest;

export type ResponseRequestBuilder<R> = (
	transactionId: number
) => ResponseRequest<R>;

export type CallbackRequestBuilder<C, R> = (
	transactionId: number
) => CallbackRequest<C, R>;

export function isSimpleRequest(
	request: AnyRequest<unknown, unknown>
): request is SimpleRequest {
	return !("parseResponse" in request) && !("tryParseCallback" in request);
}

export function isResponseRequest<R>(
	request: AnyRequest<unknown, R>
): request is ResponseRequest<R> {
	return "parseResponse" in request && !("tryParseEvent" in request);
}

export function isCallbackRequest<C, R>(
	request: AnyRequest<C, R>
): request is CallbackRequest<C, R> {
	return "tryParseEvent" in request;
}

// prettier-ignore
export type SimpleRequestBuilderFactory<T> = (data: T) => SimpleRequestBuilder;
// prettier-ignore
export type ResponseRequestBuilderFactory<T, R> = (data: T) => ResponseRequestBuilder<R>;
// prettier-ignore
export type CallbackRequestBuilderFactory<T, C, R> = (data: T) => CallbackRequestBuilder<C, R>;

export type AnyRequestBuilderFactory =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	| SimpleRequestBuilderFactory<any>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	| ResponseRequestBuilderFactory<any, any>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	| CallbackRequestBuilderFactory<any, any, any>;

export type BuilderFactoryDataTypeOf<F> =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	F extends CallbackRequestBuilderFactory<infer T, any, any>
		? T
		: // eslint-disable-next-line @typescript-eslint/no-explicit-any
		F extends ResponseRequestBuilderFactory<infer T, any>
		? T
		: F extends SimpleRequestBuilderFactory<infer T>
		? T
		: never;

export type BuilderFactoryResultTypeOf<F> =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	F extends CallbackRequestBuilderFactory<any, any, infer R>
		? R
		: // eslint-disable-next-line @typescript-eslint/no-explicit-any
		F extends ResponseRequestBuilderFactory<any, infer R>
		? R
		: // eslint-disable-next-line @typescript-eslint/no-explicit-any
		F extends SimpleRequestBuilderFactory<any>
		? void
		: never;
