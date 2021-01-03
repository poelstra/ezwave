/**
 * Command Class Barrier Operator, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

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
	// TODO param bitMask type bitmask or marker
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

export enum SubsystemStateEnum {
	Off = 0x0,
	On = 0xff,
}

export class BarrierOperatorV1 extends CommandClassPacket<BarrierOperatorV1Commands> {
	public static readonly commandClass = CommandClasses.BarrierOperator; // 0x66 (102)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(BarrierOperatorV1, commandAndPayload);
	}

	public static readonly BarrierOperatorSet = class BarrierOperatorSet extends CommandPacket<BarrierOperatorV1BarrierOperatorSetData> {
		public static readonly CommandClass = BarrierOperatorV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "BarrierOperatorSet",
			"help": "Barrier Operator Set",
			"status": "active",
			"params": [
				{
					"type": "enum",
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
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(BarrierOperatorV1)?.command === this.command;
		}

		constructor(data: Buffer | BarrierOperatorV1BarrierOperatorSetData) {
			super(BarrierOperatorSet, data);
		}
	};

	public static readonly BarrierOperatorGet = class BarrierOperatorGet extends CommandPacket<void> {
		public static readonly CommandClass = BarrierOperatorV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "BarrierOperatorGet",
			"help": "Barrier Operator Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(BarrierOperatorV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(BarrierOperatorGet, data);
		}
	};

	public static readonly BarrierOperatorReport = class BarrierOperatorReport extends CommandPacket<BarrierOperatorV1BarrierOperatorReportData> {
		public static readonly CommandClass = BarrierOperatorV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "BarrierOperatorReport",
			"help": "Barrier Operator Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
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
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(BarrierOperatorV1)?.command === this.command;
		}

		constructor(data: Buffer | BarrierOperatorV1BarrierOperatorReportData) {
			super(BarrierOperatorReport, data);
		}
	};

	public static readonly BarrierOperatorSignalSupportedGet = class BarrierOperatorSignalSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = BarrierOperatorV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "BarrierOperatorSignalSupportedGet",
			"help": "Barrier Operator Signal Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(BarrierOperatorV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(BarrierOperatorSignalSupportedGet, data);
		}
	};

	// TODO This command is not yet fully supported by the decoder/encoder
	public static readonly BarrierOperatorSignalSupportedReport = class BarrierOperatorSignalSupportedReport extends CommandPacket<BarrierOperatorV1BarrierOperatorSignalSupportedReportData> {
		public static readonly CommandClass = BarrierOperatorV1;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "BarrierOperatorSignalSupportedReport",
			"help": "Barrier Operator Signal Supported Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "bitMask",
					"help": "Bit Mask",
					"length": 0
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(BarrierOperatorV1)?.command === this.command;
		}

		constructor(data: Buffer | BarrierOperatorV1BarrierOperatorSignalSupportedReportData) {
			super(BarrierOperatorSignalSupportedReport, data);
		}
	};

	public static readonly BarrierOperatorSignalSet = class BarrierOperatorSignalSet extends CommandPacket<BarrierOperatorV1BarrierOperatorSignalSetData> {
		public static readonly CommandClass = BarrierOperatorV1;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "BarrierOperatorSignalSet",
			"help": "Barrier Operator Signal Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
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
					"type": "enum",
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
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(BarrierOperatorV1)?.command === this.command;
		}

		constructor(data: Buffer | BarrierOperatorV1BarrierOperatorSignalSetData) {
			super(BarrierOperatorSignalSet, data);
		}
	};

	public static readonly BarrierOperatorSignalGet = class BarrierOperatorSignalGet extends CommandPacket<BarrierOperatorV1BarrierOperatorSignalGetData> {
		public static readonly CommandClass = BarrierOperatorV1;
		public static readonly command = 0x07;
		public static readonly definition = {
			"command": 7,
			"name": "BarrierOperatorSignalGet",
			"help": "Barrier Operator Signal Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
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
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(BarrierOperatorV1)?.command === this.command;
		}

		constructor(data: Buffer | BarrierOperatorV1BarrierOperatorSignalGetData) {
			super(BarrierOperatorSignalGet, data);
		}
	};

	public static readonly BarrierOperatorSignalReport = class BarrierOperatorSignalReport extends CommandPacket<BarrierOperatorV1BarrierOperatorSignalReportData> {
		public static readonly CommandClass = BarrierOperatorV1;
		public static readonly command = 0x08;
		public static readonly definition = {
			"command": 8,
			"name": "BarrierOperatorSignalReport",
			"help": "Barrier Operator Signal Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
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
					"type": "enum",
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
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(BarrierOperatorV1)?.command === this.command;
		}

		constructor(data: Buffer | BarrierOperatorV1BarrierOperatorSignalReportData) {
			super(BarrierOperatorSignalReport, data);
		}
	};
}

export namespace BarrierOperatorV1 {
	export type BarrierOperatorSet = InstanceType<typeof BarrierOperatorV1.BarrierOperatorSet>;
	export type BarrierOperatorGet = InstanceType<typeof BarrierOperatorV1.BarrierOperatorGet>;
	export type BarrierOperatorReport = InstanceType<typeof BarrierOperatorV1.BarrierOperatorReport>;
	export type BarrierOperatorSignalSupportedGet = InstanceType<typeof BarrierOperatorV1.BarrierOperatorSignalSupportedGet>;
	export type BarrierOperatorSignalSupportedReport = InstanceType<typeof BarrierOperatorV1.BarrierOperatorSignalSupportedReport>;
	export type BarrierOperatorSignalSet = InstanceType<typeof BarrierOperatorV1.BarrierOperatorSignalSet>;
	export type BarrierOperatorSignalGet = InstanceType<typeof BarrierOperatorV1.BarrierOperatorSignalGet>;
	export type BarrierOperatorSignalReport = InstanceType<typeof BarrierOperatorV1.BarrierOperatorSignalReport>;
}
