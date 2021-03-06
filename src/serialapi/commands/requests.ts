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
	request: AnyRequest<any, any>
): request is SimpleRequest {
	return !("parseResponse" in request) && !("tryParseCallback" in request);
}

export function isResponseRequest<R>(
	request: AnyRequest<any, R>
): request is ResponseRequest<R> {
	return "parseResponse" in request && !("tryParseEvent" in request);
}

export function isCallbackRequest<C, R>(
	request: AnyRequest<C, R>
): request is CallbackRequest<C, R> {
	return "tryParseEvent" in request;
}

// prettier-ignore
export type SimpleRequestBuilderFactory<T> = (data: T) => (transactionId: number) => SimpleRequest;
// prettier-ignore
export type ResponseRequestBuilderFactory<T, R> = (data: T) => (transactionId: number) => ResponseRequest<R>;
// prettier-ignore
export type CallbackRequestBuilderFactory<T, C, R> = (data: T) => (transactionId: number) => CallbackRequest<C, R>;

export type AnyRequestBuilderFactory =
	| SimpleRequestBuilderFactory<any>
	| ResponseRequestBuilderFactory<any, any>
	| CallbackRequestBuilderFactory<any, any, any>;

export type BuilderFactoryDataTypeOf<
	F
> = F extends CallbackRequestBuilderFactory<infer T, any, any>
	? T
	: F extends ResponseRequestBuilderFactory<infer T, any>
	? T
	: F extends SimpleRequestBuilderFactory<infer T>
	? T
	: never;

export type BuilderFactoryResultTypeOf<
	F
> = F extends CallbackRequestBuilderFactory<any, any, infer T>
	? T
	: F extends ResponseRequestBuilderFactory<any, infer T>
	? T
	: F extends SimpleRequestBuilderFactory<any>
	? void
	: never;
