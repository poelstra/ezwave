import { inspect } from "util";
import { ICommandSession, ICommandSessionRunner } from "./ICommandSession";
import {
	AnyRequest,
	BuilderFactoryDataTypeOf,
	BuilderFactoryResultTypeOf,
	CallbackRequestBuilderFactory,
	isCallbackRequest,
	isResponseRequest,
	ResponseRequestBuilderFactory,
	SimpleRequestBuilderFactory,
} from "./requests";

// TODO The concept of one RequestRunner to run all types of requests is nice,
// but it's way too convoluted to specify, with all the many-leveled generics etc.
// Need to change this to a simpler mechanism.

/**
 * Convert (stateless) Z-Wave request objects into a `ICommandSessionRunner`
 * that can be executed by the Serial API.
 *
 * This separation ensures that Z-Wave serial API commands are easy to test,
 * yet with this converter also easy to use in the Serial API.
 *
 * This class is intented to be overriden by a command-specific class,
 * @see ZwSendDataAbort for a trivial example, and @see ZwSendData for a
 * more elaborate one.
 *
 * @see ICommandSessionRunner and @see ICommandSession for more details on
 * how to execute a session runner like this.
 *
 * @param F Type of function that, when called with `data`, yields a function
 *    that can then be called with a `funcId` (transaction ID) to obtain a
 *    Z-Wave Serial API command object (either simple, response, or callback
 *    request).
 */
export class RequestRunner<
	F extends  // eslint-disable-next-line @typescript-eslint/no-explicit-any
		| SimpleRequestBuilderFactory<any>
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		| ResponseRequestBuilderFactory<any, any>
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		| CallbackRequestBuilderFactory<any, any, any>
> implements ICommandSessionRunner<BuilderFactoryResultTypeOf<F>>
{
	/**
	 * Request-specific data passed to request builder factory.
	 */
	public readonly data: BuilderFactoryDataTypeOf<F>;

	private readonly _requestBuilderFactory: F;

	/**
	 * Construct RequestRunner.
	 *
	 * @param requestBuilderFactory Function that, when called with `data`, yields a function
	 *    that can then be called with a `funcId` (transaction ID) to obtain a
	 *    Z-Wave Serial API command object (either simple, response, or callback
	 *    request).
	 * @param data Argument passed to `requestBuilderFactory` when the runner is run.
	 */
	protected constructor(
		requestBuilderFactory: F,
		data: BuilderFactoryDataTypeOf<F>
	) {
		this._requestBuilderFactory = requestBuilderFactory;
		this.data = data;
	}

	/**
	 * @inheritdoc
	 */
	public run(
		session: ICommandSession
	): Promise<BuilderFactoryResultTypeOf<F>> {
		return session.transaction(async (transactionId) => {
			const request = this._requestBuilderFactory(this.data)(
				transactionId
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			) as AnyRequest<any, any>;
			if (isCallbackRequest(request)) {
				const events = session.getEvents(request.tryParseEvent);
				if (request.parseResponse) {
					const responseBuffer = await session.request(
						request.command,
						request.params
					);
					request.parseResponse(responseBuffer);
				} else {
					await session.send(request.command, request.params);
				}
				return request.handleEvents(events, session);
			} else if (isResponseRequest(request)) {
				const responseBuffer = await session.request(
					request.command,
					request.params
				);
				return request.parseResponse(responseBuffer);
			} else {
				return session.send(request.command, request.params);
			}
		});
	}

	/**
	 * @inheritdoc
	 */
	public toString(): string {
		return `<${this.constructor.name} data=${inspect(this.data)}>`;
	}
}
