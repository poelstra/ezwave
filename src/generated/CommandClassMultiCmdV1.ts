/* Auto-generated */

export class CommandClassMultiCmdV1 {
	public static readonly commandClass = 0x8f; // (143);
	public static readonly definition = {"id":143,"name":"COMMAND_CLASS_MULTI_CMD","status":"active","version":1,"commands":[{"id":1,"name":"MULTI_CMD_ENCAP","status":"active","params":[{"type":"integer","name":"Number of Commands","length":1},{"type":"group","name":"Encapsulated_Command","length":{"name":"Number of Commands","mask":255,"shift":0},"params":[{"type":"integer","name":"Command Length","length":1},{"type":"integer","name":"Command Class","length":1,"valueType":"CMD_CLASS_REF"},{"type":"integer","name":"Command","length":1,"valueType":"CMD_REF"},{"type":"blob","name":"Data","length":{"name":"Command Length","mask":255,"shift":0},"blobType":"CMD_DATA","includeBytesBefore":2}]}]}]};
}

export interface MultiCmdEncap {
	_commandClass: 0x8f; // (143)
	_command: 0x1; // (1)
	numberOfCommands: number; // 1 byte unsigned integer
	// TODO param Encapsulated_Command type group
}
