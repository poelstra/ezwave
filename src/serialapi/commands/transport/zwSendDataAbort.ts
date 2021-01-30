import { SerialApiCommandCode } from "../../serialApiCommandCode";
import { SerialApiSimpleVoidCommand } from "../../serialApiSimpleCommand";

export class ZwSendDataAbortCommand extends SerialApiSimpleVoidCommand {
	constructor() {
		super(SerialApiCommandCode.ZW_SEND_DATA_ABORT);
	}
}
