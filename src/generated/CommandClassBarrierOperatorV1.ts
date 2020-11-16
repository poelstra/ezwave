/* Auto-generated */

export class CommandClassBarrierOperatorV1 {
	public static readonly commandClass = 0x66; // (102);
	public static readonly definition = {"id":102,"name":"COMMAND_CLASS_BARRIER_OPERATOR","status":"active","version":1,"commands":[{"id":1,"name":"BARRIER_OPERATOR_SET","status":"active","params":[{"type":"enum","name":"Target Value","length":1,"values":{"0":"CLOSE","255":"OPEN"}}]},{"id":2,"name":"BARRIER_OPERATOR_GET","status":"active","params":[]},{"id":3,"name":"BARRIER_OPERATOR_REPORT","status":"active","params":[{"type":"enum","name":"State","length":1,"values":{"0":"Closed","252":"Closing","253":"Stopped","254":"Opening","255":"Open"}}]},{"id":4,"name":"BARRIER_OPERATOR_SIGNAL_SUPPORTED_GET","status":"active","params":[]},{"id":5,"name":"BARRIER_OPERATOR_SIGNAL_SUPPORTED_REPORT","status":"active","params":[{"type":"integer","name":"Bit Mask","length":0}]},{"id":6,"name":"BARRIER_OPERATOR_SIGNAL_SET","status":"active","params":[{"type":"integer","name":"Subsystem Type","length":1,"values":{"0":"NOT SUPPORTED","1":"Audible Notification","2":"Visual Notification"}},{"type":"enum","name":"Subsystem State","length":1,"values":{"0":"OFF","255":"ON"}}]},{"id":7,"name":"BARRIER_OPERATOR_SIGNAL_GET","status":"active","params":[{"type":"integer","name":"Subsystem Type","length":1,"values":{"0":"NOT SUPPORTED","1":"Audible Notification","2":"Visual Notification"}}]},{"id":8,"name":"BARRIER_OPERATOR_SIGNAL_REPORT","status":"active","params":[{"type":"integer","name":"Subsystem Type","length":1,"values":{"0":"NOT SUPPORTED","1":"Audible Notification","2":"Visual Notification"}},{"type":"enum","name":"Subsystem State","length":1,"values":{"0":"OFF","255":"ON"}}]}]};
}

export interface BarrierOperatorSet {
	_commandClass: 0x66; // (102)
	_command: 0x1; // (1)
	targetValue: TargetValueEnum; // 1 byte enum value
}

export interface BarrierOperatorGet {
	_commandClass: 0x66; // (102)
	_command: 0x2; // (2)
}

export interface BarrierOperatorReport {
	_commandClass: 0x66; // (102)
	_command: 0x3; // (3)
	state: StateEnum; // 1 byte enum value
}

export interface BarrierOperatorSignalSupportedGet {
	_commandClass: 0x66; // (102)
	_command: 0x4; // (4)
}

export interface BarrierOperatorSignalSupportedReport {
	_commandClass: 0x66; // (102)
	_command: 0x5; // (5)
	bitMask: number; // 0 byte unsigned integer
}

export interface BarrierOperatorSignalSet {
	_commandClass: 0x66; // (102)
	_command: 0x6; // (6)
	subsystemType: number; // 1 byte unsigned integer
	subsystemState: SubsystemStateEnum; // 1 byte enum value
}

export interface BarrierOperatorSignalGet {
	_commandClass: 0x66; // (102)
	_command: 0x7; // (7)
	subsystemType: number; // 1 byte unsigned integer
}

export interface BarrierOperatorSignalReport {
	_commandClass: 0x66; // (102)
	_command: 0x8; // (8)
	subsystemType: number; // 1 byte unsigned integer
	subsystemState: SubsystemStateEnum; // 1 byte enum value
}

export enum TargetValueEnum {
	Close = 0x0,
	Open = 0xff,
}

export enum StateEnum {
	Closed = 0x0,
	Closing = 0xfc,
	Stopped = 0xfd,
	Opening = 0xfe,
	Open = 0xff,
}

export enum SubsystemStateEnum {
	Off = 0x0,
	On = 0xff,
}
