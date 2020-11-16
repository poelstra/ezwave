/* Auto-generated */

export class CommandClassZensorNetV1 {
	public static readonly commandClass = 0x2; // (2);
	public static readonly definition = {"id":2,"name":"COMMAND_CLASS_ZENSOR_NET","status":"active","version":1,"commands":[{"id":2,"name":"BIND_ACCEPT","status":"active","params":[]},{"id":3,"name":"BIND_COMPLETE","status":"active","params":[]},{"id":1,"name":"BIND_REQUEST","status":"active","params":[]}]};
}

export interface BindAccept {
	_commandClass: 0x2; // (2)
	_command: 0x2; // (2)
}

export interface BindComplete {
	_commandClass: 0x2; // (2)
	_command: 0x3; // (3)
}

export interface BindRequest {
	_commandClass: 0x2; // (2)
	_command: 0x1; // (1)
}
