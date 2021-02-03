import { SerialApiCommandCode } from "./serialApiCommandCode";
import { SerialApiFuncIdCommand } from "./serialApiFuncIdCommand";

export abstract class SerialApiTransmitCallbackCommand<
	T,
	R
> extends SerialApiFuncIdCommand<T, R> {
	public verifyResponse(response: Buffer): void {
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
}
