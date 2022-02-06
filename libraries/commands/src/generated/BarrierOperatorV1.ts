/**
 * Command Class Barrier Operator, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum BarrierOperatorV1Commands {
	BarrierOperatorSet = 0x01,
	BarrierOperatorGet = 0x02,
	BarrierOperatorReport = 0x03,
	BarrierOperatorSignalSupportedGet = 0x04,
	BarrierOperatorSignalSupportedReport = 0x05,
	BarrierOperatorSignalSet = 0x06,
	BarrierOperatorSignalGet = 0x07,
	BarrierOperatorSignalReport = 0x08,
}

export interface BarrierOperatorV1BarrierOperatorSetData {
	targetValue: TargetValueEnum; // 1 byte enum value
}

export interface BarrierOperatorV1BarrierOperatorReportData {
	state: StateEnum; // 1 byte enum value
}

export interface BarrierOperatorV1BarrierOperatorSignalSupportedReportData {
	bitMask: Set<BitMaskEnum>; // automatic length
}

export interface BarrierOperatorV1BarrierOperatorSignalSetData {
	subsystemType: number; // 1 byte unsigned integer
	subsystemState: SubsystemStateEnum; // 1 byte enum value
}

export interface BarrierOperatorV1BarrierOperatorSignalGetData {
	subsystemType: number; // 1 byte unsigned integer
}

export interface BarrierOperatorV1BarrierOperatorSignalReportData {
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

export enum BitMaskEnum {
	AudibleNotification = 0x0,
	VisualNotification = 0x1,
}

export enum SubsystemStateEnum {
	Off = 0x0,
	On = 0xff,
}

export class BarrierOperatorV1 extends CommandClassPacket<BarrierOperatorV1Commands> {
	public static readonly commandClass = CommandClasses.BarrierOperator; // 0x66 (102)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(BarrierOperatorV1, commandAndPayload);
	}
}

export class BarrierOperatorSet extends CommandPacket<BarrierOperatorV1BarrierOperatorSetData> {
	public static readonly CommandClass = BarrierOperatorV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "BarrierOperatorSet",
		"help": "Barrier Operator Set",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "targetValue",
				"help": "Target Value",
				"length": 1,
				"values": {
					"0": {
						"name": "Close",
						"help": "CLOSE"
					},
					"255": {
						"name": "Open",
						"help": "OPEN"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(BarrierOperatorV1)?.command === this.command;
	}

	constructor(data: Buffer | BarrierOperatorV1BarrierOperatorSetData) {
		super(BarrierOperatorSet, data);
	}
};

export class BarrierOperatorGet extends CommandPacket<void> {
	public static readonly CommandClass = BarrierOperatorV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "BarrierOperatorGet",
		"help": "Barrier Operator Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(BarrierOperatorV1)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(BarrierOperatorGet, data);
	}
};

export class BarrierOperatorReport extends CommandPacket<BarrierOperatorV1BarrierOperatorReportData> {
	public static readonly CommandClass = BarrierOperatorV1;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "BarrierOperatorReport",
		"help": "Barrier Operator Report",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "state",
				"help": "State",
				"length": 1,
				"values": {
					"0": {
						"name": "Closed",
						"help": "Closed"
					},
					"252": {
						"name": "Closing",
						"help": "Closing"
					},
					"253": {
						"name": "Stopped",
						"help": "Stopped"
					},
					"254": {
						"name": "Opening",
						"help": "Opening"
					},
					"255": {
						"name": "Open",
						"help": "Open"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(BarrierOperatorV1)?.command === this.command;
	}

	constructor(data: Buffer | BarrierOperatorV1BarrierOperatorReportData) {
		super(BarrierOperatorReport, data);
	}
};

export class BarrierOperatorSignalSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass = BarrierOperatorV1;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
		"command": 4,
		"name": "BarrierOperatorSignalSupportedGet",
		"help": "Barrier Operator Signal Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(BarrierOperatorV1)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(BarrierOperatorSignalSupportedGet, data);
	}
};

export class BarrierOperatorSignalSupportedReport extends CommandPacket<BarrierOperatorV1BarrierOperatorSignalSupportedReportData> {
	public static readonly CommandClass = BarrierOperatorV1;
	public static readonly command = 0x05; // 5
	public static readonly definition = convertFromJsonCommand({
		"command": 5,
		"name": "BarrierOperatorSignalSupportedReport",
		"help": "Barrier Operator Signal Supported Report",
		"status": "Active",
		"params": [
			{
				"type": "Bitmask",
				"name": "bitMask",
				"help": "Bit Mask",
				"length": {
					"lengthType": "Auto"
				},
				"values": {
					"0": {
						"name": "AudibleNotification",
						"help": "Audible Notification"
					},
					"1": {
						"name": "VisualNotification",
						"help": "Visual Notification"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(BarrierOperatorV1)?.command === this.command;
	}

	constructor(data: Buffer | BarrierOperatorV1BarrierOperatorSignalSupportedReportData) {
		super(BarrierOperatorSignalSupportedReport, data);
	}
};

export class BarrierOperatorSignalSet extends CommandPacket<BarrierOperatorV1BarrierOperatorSignalSetData> {
	public static readonly CommandClass = BarrierOperatorV1;
	public static readonly command = 0x06; // 6
	public static readonly definition = convertFromJsonCommand({
		"command": 6,
		"name": "BarrierOperatorSignalSet",
		"help": "Barrier Operator Signal Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "subsystemType",
				"help": "Subsystem Type",
				"length": 1,
				"values": {
					"0": {
						"name": "NotSupported",
						"help": "NOT SUPPORTED"
					},
					"1": {
						"name": "AudibleNotification",
						"help": "Audible Notification"
					},
					"2": {
						"name": "VisualNotification",
						"help": "Visual Notification"
					}
				}
			},
			{
				"type": "Enum",
				"name": "subsystemState",
				"help": "Subsystem State",
				"length": 1,
				"values": {
					"0": {
						"name": "Off",
						"help": "OFF"
					},
					"255": {
						"name": "On",
						"help": "ON"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(BarrierOperatorV1)?.command === this.command;
	}

	constructor(data: Buffer | BarrierOperatorV1BarrierOperatorSignalSetData) {
		super(BarrierOperatorSignalSet, data);
	}
};

export class BarrierOperatorSignalGet extends CommandPacket<BarrierOperatorV1BarrierOperatorSignalGetData> {
	public static readonly CommandClass = BarrierOperatorV1;
	public static readonly command = 0x07; // 7
	public static readonly definition = convertFromJsonCommand({
		"command": 7,
		"name": "BarrierOperatorSignalGet",
		"help": "Barrier Operator Signal Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "subsystemType",
				"help": "Subsystem Type",
				"length": 1,
				"values": {
					"0": {
						"name": "NotSupported",
						"help": "NOT SUPPORTED"
					},
					"1": {
						"name": "AudibleNotification",
						"help": "Audible Notification"
					},
					"2": {
						"name": "VisualNotification",
						"help": "Visual Notification"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(BarrierOperatorV1)?.command === this.command;
	}

	constructor(data: Buffer | BarrierOperatorV1BarrierOperatorSignalGetData) {
		super(BarrierOperatorSignalGet, data);
	}
};

export class BarrierOperatorSignalReport extends CommandPacket<BarrierOperatorV1BarrierOperatorSignalReportData> {
	public static readonly CommandClass = BarrierOperatorV1;
	public static readonly command = 0x08; // 8
	public static readonly definition = convertFromJsonCommand({
		"command": 8,
		"name": "BarrierOperatorSignalReport",
		"help": "Barrier Operator Signal Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "subsystemType",
				"help": "Subsystem Type",
				"length": 1,
				"values": {
					"0": {
						"name": "NotSupported",
						"help": "NOT SUPPORTED"
					},
					"1": {
						"name": "AudibleNotification",
						"help": "Audible Notification"
					},
					"2": {
						"name": "VisualNotification",
						"help": "Visual Notification"
					}
				}
			},
			{
				"type": "Enum",
				"name": "subsystemState",
				"help": "Subsystem State",
				"length": 1,
				"values": {
					"0": {
						"name": "Off",
						"help": "OFF"
					},
					"255": {
						"name": "On",
						"help": "ON"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(BarrierOperatorV1)?.command === this.command;
	}

	constructor(data: Buffer | BarrierOperatorV1BarrierOperatorSignalReportData) {
		super(BarrierOperatorSignalReport, data);
	}
};
