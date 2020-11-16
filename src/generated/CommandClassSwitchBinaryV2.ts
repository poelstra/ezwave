/* Auto-generated */

export class CommandClassSwitchBinaryV2 {
	public static readonly commandClass = 0x25; // (37);
	public static readonly definition = {"id":37,"name":"COMMAND_CLASS_SWITCH_BINARY","status":"active","version":2,"commands":[{"id":2,"name":"SWITCH_BINARY_GET","status":"active","params":[]},{"id":3,"name":"SWITCH_BINARY_REPORT","status":"active","params":[{"type":"enum","name":"Current Value","length":1,"values":{"0":"off/disable","255":"on/enable"}},{"type":"enum","name":"Target Value","length":1,"values":{"0":"off/disable","255":"on/enable"}},{"type":"enum","name":"Duration","length":1,"values":{"0":"Already at the Target Value","254":"Unknown duration","255":"Reserved"}}]},{"id":1,"name":"SWITCH_BINARY_SET","status":"active","params":[{"type":"enum","name":"Target Value","length":1,"values":{"0":"off/disable","255":"on/enable"}},{"type":"enum","name":"Duration","length":1,"values":{"0":"Instantly","255":"Default"}}]}]};
}

export interface SwitchBinaryGet {
	_commandClass: 0x25; // (37)
	_command: 0x2; // (2)
}

export interface SwitchBinaryReport {
	_commandClass: 0x25; // (37)
	_command: 0x3; // (3)
	currentValue: CurrentValueEnum; // 1 byte enum value
	targetValue: TargetValueEnum; // 1 byte enum value
	duration: DurationEnum; // 1 byte enum value
}

export interface SwitchBinarySet {
	_commandClass: 0x25; // (37)
	_command: 0x1; // (1)
	targetValue: TargetValueEnum; // 1 byte enum value
	duration: Duration2Enum; // 1 byte enum value
}

export enum CurrentValueEnum {
	OffDisable = 0x0,
	OnEnable = 0xff,
}

export enum TargetValueEnum {
	OffDisable = 0x0,
	OnEnable = 0xff,
}

export enum DurationEnum {
	AlreadyAtTheTargetValue = 0x0,
	UnknownDuration = 0xfe,
	Reserved = 0xff,
}

export enum Duration2Enum {
	Instantly = 0x0,
	Default = 0xff,
}
