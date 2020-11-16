/* Auto-generated */

export class CommandClassDeviceResetLocallyV1 {
	public static readonly commandClass = 0x5a; // (90);
	public static readonly definition = {"id":90,"name":"COMMAND_CLASS_DEVICE_RESET_LOCALLY","status":"active","version":1,"commands":[{"id":1,"name":"DEVICE_RESET_LOCALLY_NOTIFICATION","status":"active","params":[]}]};
}

export interface DeviceResetLocallyNotification {
	_commandClass: 0x5a; // (90)
	_command: 0x1; // (1)
}
