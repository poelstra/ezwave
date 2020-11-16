/* Auto-generated */

export class CommandClassAvRendererStatusV1 {
	public static readonly commandClass = 0x96; // (150);
	public static readonly definition = {"id":150,"name":"COMMAND_CLASS_AV_RENDERER_STATUS","status":"active","version":1,"commands":[{"id":1,"name":"AV_RENDERER_STATUS_GET","status":"active","params":[]},{"id":2,"name":"AV_RENDERER_STATUS_REPORT","status":"active","params":[]}]};
}

export interface AvRendererStatusGet {
	_commandClass: 0x96; // (150)
	_command: 0x1; // (1)
}

export interface AvRendererStatusReport {
	_commandClass: 0x96; // (150)
	_command: 0x2; // (2)
}
