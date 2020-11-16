/* Auto-generated */

export class CommandClassPrepaymentEncapsulationV1 {
	public static readonly commandClass = 0x41; // (65);
	public static readonly definition = {"id":65,"name":"COMMAND_CLASS_PREPAYMENT_ENCAPSULATION","status":"active","version":1,"commands":[{"id":1,"name":"CMD_ENCAPSULATION","status":"active","params":[{"type":"blob","name":"Data","length":"auto"}]}]};
}

export interface CmdEncapsulation {
	_commandClass: 0x41; // (65)
	_command: 0x1; // (1)
	// TODO param Data type blob
}
