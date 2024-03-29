import { Events } from "./events";
import { SerialApiCommandCode } from "./serialApiCommandCode";

/**
 * Single session runner for processing one or more Serial API
 * command(s).
 *
 * An instance of an ICommandSessionRunner object can be passed
 * to `SerialApi#execute()`, and (once other commands have finished
 * executing), its `.run()` method will be called with a command session.
 *
 * The command session will be valid until the `.run()` method returns,
 * and allows access to send/receive data on the Z-Wave Serial API.
 *
 * While the `.run()` method is executing, no other session runners
 * can access the API, except 'nested' session runners that are
 * started from within this session by calling `session.execute()`.
 *
 * Note that a serial command needs to completely finish within the
 * scope of this call, including the processing of any callbacks etc.
 *
 * For example, when doing a node inclusion, all events including
 * inclusion start, fail, cleanup, etc. will need to be handled inside
 * that session, and the final result of the session should be the result
 * of the inclusion (e.g. NodeInfo frame, or thrown error).
 * Communication that must be performed as part of the inclusion itself
 * (such as controller replication) can be handed off to a nested session,
 * but any additional communication (such as node interview, security
 * bootstrap etc) are better handled outside of this session.
 *
 * It is possible to call callbacks or emit events from the session
 * runner (see e.g. `afterSend` callback in `ZwSendData()`), but make
 * sure that they e.g. do not call (or rather, await) `serialapi.execute()`,
 * as that will lead to a dead-lock.
 */
export interface ICommandSessionRunner<T> {
	/**
	 * Execute Serial API command(s).
	 *
	 * @see ICommandSessionRunner class for more information.
	 *
	 * @param session Unique command session, valid for duration of this run.
	 * @return Result of command(s) execution.
	 */
	run(session: ICommandSession): Promise<T>;

	/**
	 * Provide developer-readable representation of this command runner.
	 *
	 * This is used in e.g. debug logging of the Serial API class.
	 *
	 * @example
	 * ```ts
	 * toString() {
	 *    return `<SomeZWaveCommand data=${util.inspect(this.data)}>`;
	 * }
	 * ```
	 *
	 * @returns Developer-readable representation of this object.
	 */
	toString(): string;
}

/**
 * Some Z-Wave Serial API commands expect a `funcId` to be passed, and will
 * respond with a RES or REQ callback carrying the same `funcId`.
 *
 * A guaranteed unique transaction ID (funcId) can be generated by the
 * `ICommandSession#transaction()` method, and will be passed to the
 * `TransactionRunner`. The ID will remain valid as long as the runner
 * is running.
 *
 * Note that a single ID should only be used for a single `ICommandSession#request()`,
 * and should not be re-used for multiple requests.
 */
export type TransactionRunner<T> = (transactionId: number) => Promise<T>;

/**
 * A command session gives access to the Z-Wave Serial API to send
 * and receive commands and events.
 *
 * A unique session is generated for each call to `SerialApi#execute()`
 * (or `ICommandSession#execute()` for a nested session). The session
 * remains valid for the duration of the session runner (@see ICommandSessionRunner).
 *
 * Any method on this interface will throw an error when used after the
 * session's runner has completed.
 *
 * @see RequestRunner for a convenient wrapper around the low-level
 * serial API methods provided here.
 *
 * @example
 * ```ts
 * // Simplified example of:
 * // - sending a REQ (HOST->ZW)
 * // - waiting for its RES (ZW->HOST) (we ignore its result here)
 * // - waiting for its REQ (ZW->HOST)
 * // - returning true when REQ's payload was 1
 * // Note how we register the REQ handler just before sending the request,
 * // to ensure we don't miss the callback.
 * class DemoCommand {
 *     run(session: ICommandSession): Promise<boolean> {
 *         return session.transaction(async (funcId) => {
 *             const parseEvent = (command: number, params: Buffer) => {
 *                 if (command === someCommand && params[0] === funcId) {
 *                     return params[1];
 *                 }
 *             };
 *             const events = session.getEvents(parseEvent);
 *             const response = await session.request(someCommand, someParams);
 *             const callback = events.get(10000); // 10s timeout waiting for parsed event
 *             return callback === 1;
 *         });
 *     }
 *
 *     toString() {
 *         // For clear debug logging of the Serial API sessions
 *         return `<DemoCommand someParams=[01 02]>`;
 *     }
 * }
 *
 * await serialApi.execute(new DemoCommand()); // boolean
 * ```
 */
export interface ICommandSession {
	/**
	 * Compute a unique ID for use in Z-Wave Serial API calls that need
	 * a 'funcId'. The computed ID will be passed to the given callback,
	 * and remains valid as long as the callback is running.
	 *
	 * The ID should be used only once, any other request needs to use
	 * a newly generated ID.
	 *
	 * @param cb Callback called with unique transaction ID in range [1..255].
	 * @returns Result of the callback.
	 */
	transaction<T>(cb: TransactionRunner<T>): Promise<T>;

	/**
	 * Send given command and parameters (if any) as REQ message to Serial API.
	 *
	 * The method will throw an error when the session is closed, the command
	 * is not supported by the Z-Wave chip, or could otherwise not be sent
	 * to it.
	 *
	 * @param command Supported Serial API command.
	 * @param params (Optional) Buffer of additional parameters for `command`.
	 * @returns When command has been received by Z-Wave chip.
	 */
	send(command: SerialApiCommandCode, params?: Buffer): Promise<void>;

	/**
	 * Send given command and parameters (if any) as REQ message to Serial API,
	 * and wait for corresponding RES message to be received.
	 *
	 * The method will throw an error when the session is closed, the command
	 * is not supported by the Z-Wave chip, could otherwise not be sent
	 * to it, or its result could not be received (e.g. timed out).
	 *
	 * @param command Supported Serial API command.
	 * @param params (Optional) Buffer of additional parameters for `command`.
	 * @returns Payload of received RES message.
	 */
	request(command: SerialApiCommandCode, params?: Buffer): Promise<Buffer>;

	/**
	 * Register a listener for REQ messages emitted by the Z-Wave chip (typically
	 * 'callbacks').
	 *
	 * The `mapper` will be called for each received REQ message, and should either
	 * return `undefined` if the message was not relevant (different command, different
	 * funcId, etc), or a valid decoded event.
	 *
	 * Returns an object that allows retrieving any events that were successfully
	 * decoded by the `mapper`.
	 *
	 * If the `mapper` throws an error, and/or the session is closed, the events
	 * object will be closed with that error/reason, causing any `.get()` on it to fail
	 * with that error.
	 *
	 * @param mapper Callback called for every received REQ message from Z-Wave chip.
	 *     When the mapper returns `undefined`, the event is ignored. When it returns
	 *     any other value, that value will be added to the returned events.
	 * @returns Events object on which `.get(timeout?)` can be called to obtain any
	 *     events parsed by the `mapper`. The events object will be closed when the
	 *     mapper throws an error, or the session is closed.
	 */
	getEvents<T>(
		mapper: (command: SerialApiCommandCode, params: Buffer) => T | undefined
	): Events<T>;

	/**
	 * Fork this session into a new session, and run the given runner with that
	 * session.
	 *
	 * That session will also (simultaneously) have access to the Serial API, so it
	 * should only be used to execute commands that are known to be safe within the
	 * context of any commands currently being run (e.g. handling controller
	 * replication as part of an inclusion process).
	 *
	 * The runner will only be started once any previously forked runner has completed,
	 * and the current session is not closed yet (i.e. our runner has not completed).
	 *
	 * The forked session will be closed when its runner exits.
	 *
	 * @param runner Object with a `.run(session)` method that will be called with the
	 *     forked `ICommandSession`.
	 * @returns Result of `runner.run()` method.
	 */
	execute<T>(runner: ICommandSessionRunner<T>): Promise<T>;
}
