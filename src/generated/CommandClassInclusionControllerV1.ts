/* Auto-generated */

export class CommandClassInclusionControllerV1 {
	public static readonly commandClass = 0x74; // (116);
	public static readonly definition = {"id":116,"name":"COMMAND_CLASS_INCLUSION_CONTROLLER","status":"active","version":1,"commands":[{"id":1,"name":"INITIATE","status":"active","params":[{"type":"integer","name":"Node ID","length":1,"valueType":"NODE_NUMBER"},{"type":"enum","name":"Step ID","length":1,"values":{"1":"PROXY_INCLUSION","2":"S0_INCLUSION","3":"PROXY_INCLUSION_REPLACE"}}]},{"id":2,"name":"COMPLETE","status":"active","params":[{"type":"enum","name":"Step ID","length":1,"values":{"1":"PROXY_INCLUSION","2":"S0_INCLUSION","3":"PROXY_INCLUSION_REPLACE"}},{"type":"enum","name":"Status","length":1,"values":{"1":"STEP_OK","2":"STEP_USER_REJECTED","3":"STEP_FAILED","4":"STEP_NOT_SUPPORTED"}}]}]};
}

export interface Initiate {
	_commandClass: 0x74; // (116)
	_command: 0x1; // (1)
	nodeID: number; // 1 byte unsigned integer
	stepID: StepIDEnum; // 1 byte enum value
}

export interface Complete {
	_commandClass: 0x74; // (116)
	_command: 0x2; // (2)
	stepID: StepIDEnum; // 1 byte enum value
	status: StatusEnum; // 1 byte enum value
}

export enum StepIDEnum {
	ProxyInclusion = 0x1,
	S0Inclusion = 0x2,
	ProxyInclusionReplace = 0x3,
}

export enum StatusEnum {
	StepOk = 0x1,
	StepUserRejected = 0x2,
	StepFailed = 0x3,
	StepNotSupported = 0x4,
}
