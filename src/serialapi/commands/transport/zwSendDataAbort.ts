import { SimpleRequestBuilder } from "../requests";
import { RequestRunner } from "../RequestRunner";
import { SerialApiCommandCode } from "../serialApiCommandCode";

export function zwSendDataAbortBuilder(): SimpleRequestBuilder {
	return () => ({
		command: SerialApiCommandCode.ZW_SEND_DATA_ABORT,
	});
}

export class ZwSendDataAbort extends RequestRunner<
	typeof zwSendDataAbortBuilder
> {
	constructor() {
		super(zwSendDataAbortBuilder, undefined);
	}
}
