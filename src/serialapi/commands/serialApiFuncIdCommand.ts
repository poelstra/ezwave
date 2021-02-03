import { SerialApiCallbackCommand } from "./serialApiCallbackCommand";
import { SerialApiCommandCode } from "./serialApiCommandCode";

export abstract class SerialApiFuncIdCommand<
	T,
	R
> extends SerialApiCallbackCommand<T, R> {
	/**
	 * Parse payload that was returned to the correct funcId.
	 * @param payload Payload of message, with funcId already stripped off.
	 */
	protected abstract parsePayload(payload: Buffer): R;

	public tryParseCallback(
		command: SerialApiCommandCode,
		params: Buffer,
		transactionId: number
	): R | undefined {
		if (command !== this.command) {
			return;
		}
		if (params.length < 1) {
			return;
		}
		// Spec: INS13954, 4.3.3.1.7
		if (params[0] !== transactionId) {
			return;
		}
		const payload = params.slice(1);
		return this.parsePayload(payload);
	}
}
