import { RequestRunner } from "../RequestRunner";
import { SimpleRequestBuilder } from "../requests";
import { SerialApiCommandCode } from "../serialApiCommandCode";

export function zwSendDataAbortBuilder(): SimpleRequestBuilder {
	return () => ({
		command: SerialApiCommandCode.ZW_SEND_DATA_ABORT,
	});
}

export class ZwSendDataAbort extends RequestRunner<
	typeof zwSendDataAbortBuilder
> {
	public constructor() {
		super(zwSendDataAbortBuilder, undefined);
	}
}
