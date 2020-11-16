/* Auto-generated */

// obsolete
export class CommandClassZwaveplusInfoV1 {
	public static readonly commandClass = 0x5e; // (94);
	public static readonly definition = {"id":94,"name":"COMMAND_CLASS_ZWAVEPLUS_INFO","status":"obsolete","version":1,"commands":[{"id":1,"name":"ZWAVEPLUS_INFO_GET","status":"active","params":[]},{"id":2,"name":"ZWAVEPLUS_INFO_REPORT","status":"active","params":[{"type":"integer","name":"Z-Wave+ Version","length":1},{"type":"enum","name":"Role Type","length":1,"values":{"0":"ROLE_TYPE_CONTROLLER_CENTRAL_STATIC","1":"ROLE_TYPE_CONTROLLER_SUB_STATIC","2":"ROLE_TYPE_CONTROLLER_PORTABLE","3":"ROLE_TYPE_CONTROLLER_PORTABLE_REPORTING","4":"ROLE_TYPE_SLAVE_PORTABLE","5":"ROLE_TYPE_SLAVE_ALWAYS_ON","6":"ROLE_TYPE_SLAVE_SLEEPING_REPORTING","7":"ROLE_TYPE_SLAVE_SLEEPING_LISTENING"}},{"type":"enum","name":"Node Type","length":1,"values":{"0":"NODE_TYPE_ZWAVEPLUS_NODE","1":"NODE_TYPE_ZWAVEPLUS_FOR_IP_ROUTER","2":"NODE_TYPE_ZWAVEPLUS_FOR_IP_GATEWAY","3":"NODE_TYPE_ZWAVEPLUS_FOR_IP_CLIENT_IP_NODE","4":"NODE_TYPE_ZWAVEPLUS_FOR_IP_CLIENT_ZWAVE_NODE"}}]}]};
}

export interface ZwaveplusInfoGet {
	_commandClass: 0x5e; // (94)
	_command: 0x1; // (1)
}

export interface ZwaveplusInfoReport {
	_commandClass: 0x5e; // (94)
	_command: 0x2; // (2)
	zWaveVersion: number; // 1 byte unsigned integer
	roleType: RoleTypeEnum; // 1 byte enum value
	nodeType: NodeTypeEnum; // 1 byte enum value
}

export enum RoleTypeEnum {
	RoleTypeControllerCentralStatic = 0x0,
	RoleTypeControllerSubStatic = 0x1,
	RoleTypeControllerPortable = 0x2,
	RoleTypeControllerPortableReporting = 0x3,
	RoleTypeSlavePortable = 0x4,
	RoleTypeSlaveAlwaysOn = 0x5,
	RoleTypeSlaveSleepingReporting = 0x6,
	RoleTypeSlaveSleepingListening = 0x7,
}

export enum NodeTypeEnum {
	NodeTypeZwaveplusNode = 0x0,
	NodeTypeZwaveplusForIpRouter = 0x1,
	NodeTypeZwaveplusForIpGateway = 0x2,
	NodeTypeZwaveplusForIpClientIpNode = 0x3,
	NodeTypeZwaveplusForIpClientZwaveNode = 0x4,
}
