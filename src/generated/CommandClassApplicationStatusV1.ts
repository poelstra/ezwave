/* Auto-generated */

export class CommandClassApplicationStatusV1 {
	public static readonly commandClass = 0x22; // (34);
	public static readonly definition = {"id":34,"name":"COMMAND_CLASS_APPLICATION_STATUS","status":"active","version":1,"commands":[{"id":1,"name":"APPLICATION_BUSY","status":"active","params":[{"type":"enum","name":"Status","length":1,"values":{"0":"Try again later","1":"Try again in Wait Time seconds","2":"Request queued, executed later"}},{"type":"integer","name":"Wait Time","length":1}]},{"id":2,"name":"APPLICATION_REJECTED_REQUEST","status":"active","params":[{"type":"integer","name":"Status","length":1}]}]};
}

export interface ApplicationBusy {
	_commandClass: 0x22; // (34)
	_command: 0x1; // (1)
	status: StatusEnum; // 1 byte enum value
	waitTime: number; // 1 byte unsigned integer
}

export interface ApplicationRejectedRequest {
	_commandClass: 0x22; // (34)
	_command: 0x2; // (2)
	status: number; // 1 byte unsigned integer
}

export enum StatusEnum {
	TryAgainLater = 0x0,
	TryAgainInWaitTimeSeconds = 0x1,
	RequestQueuedExecutedLater = 0x2,
}
