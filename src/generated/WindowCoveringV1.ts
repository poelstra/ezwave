/**
 * Command Class Window Covering, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum WindowCoveringV1Commands {
	WindowCoveringSupportedGet = 0x01,
	WindowCoveringSupportedReport = 0x02,
	WindowCoveringGet = 0x03,
	WindowCoveringReport = 0x04,
	WindowCoveringSet = 0x05,
	WindowCoveringStartLevelChange = 0x06,
	WindowCoveringStopLevelChange = 0x07,
}

export interface WindowCoveringV1WindowCoveringSupportedReportData {
	// TODO param properties1 type bitfield
	parameterMask: number; // 0 byte unsigned integer
}

export interface WindowCoveringV1WindowCoveringGetData {
	parameterID: ParameterIDEnum; // 1 byte enum value
}

export interface WindowCoveringV1WindowCoveringReportData {
	parameterID: ParameterIDEnum; // 1 byte enum value
	currentValue: number; // 1 byte unsigned integer
	targetValue: number; // 1 byte unsigned integer
	duration: number; // 1 byte unsigned integer
}

export interface WindowCoveringV1WindowCoveringSetData {
	// TODO param properties1 type bitfield
	// TODO param vg1 type group
	duration: number; // 1 byte unsigned integer
}

export interface WindowCoveringV1WindowCoveringStartLevelChangeData {
	// TODO param properties1 type bitfield
	parameterID: ParameterIDEnum; // 1 byte enum value
	duration: number; // 1 byte unsigned integer
}

export interface WindowCoveringV1WindowCoveringStopLevelChangeData {
	parameterID: ParameterIDEnum; // 1 byte enum value
}

export class WindowCoveringV1 extends CommandClassPacket<WindowCoveringV1Commands> {
	public static readonly commandClass = CommandClasses.WindowCovering; // 0x6a (106)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(WindowCoveringV1, commandAndPayload);
	}

	public static readonly WindowCoveringSupportedGet = class WindowCoveringSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = WindowCoveringV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "WindowCoveringSupportedGet",
			"help": "Window Covering Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(WindowCoveringV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(WindowCoveringSupportedGet, data);
		}
	};

	public static readonly WindowCoveringSupportedReport = class WindowCoveringSupportedReport extends CommandPacket<WindowCoveringV1WindowCoveringSupportedReportData> {
		public static readonly CommandClass = WindowCoveringV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "WindowCoveringSupportedReport",
			"help": "Window Covering Supported Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Number of Parameter Mask bytes",
							"mask": 15,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 240,
							"shift": 4
						}
					]
				},
				{
					"type": "integer",
					"name": "parameterMask",
					"help": "Parameter Mask",
					"length": 0
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(WindowCoveringV1)?.command === this.command;
		}

		constructor(data: Buffer | WindowCoveringV1WindowCoveringSupportedReportData) {
			super(WindowCoveringSupportedReport, data);
		}
	};

	public static readonly WindowCoveringGet = class WindowCoveringGet extends CommandPacket<WindowCoveringV1WindowCoveringGetData> {
		public static readonly CommandClass = WindowCoveringV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "WindowCoveringGet",
			"help": "Window Covering Get",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "parameterID",
					"help": "Parameter ID",
					"length": 1,
					"values": {
						"0": "out_left 1",
						"1": "out_left 2",
						"2": "out_right 1",
						"3": "out_right 2",
						"4": "in_left 1",
						"5": "in_left 2",
						"6": "in_right 1",
						"7": "in_right 2",
						"8": "in_right_left 1",
						"9": "in_right_left 2",
						"10": "Vertical slats angle 1",
						"11": "Vertical slats angle 2",
						"12": "out_bottom 1",
						"13": "out_bottom 2",
						"14": "out_top 1",
						"15": "out_top 2",
						"16": "in_bottom 1",
						"17": "in_bottom 2",
						"18": "in_top 2",
						"19": "in_top_bottom 1",
						"20": "in_top_bottom 2",
						"21": "Horizontal slats angle 1",
						"22": "Horizontal slats angle 2"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(WindowCoveringV1)?.command === this.command;
		}

		constructor(data: Buffer | WindowCoveringV1WindowCoveringGetData) {
			super(WindowCoveringGet, data);
		}
	};

	public static readonly WindowCoveringReport = class WindowCoveringReport extends CommandPacket<WindowCoveringV1WindowCoveringReportData> {
		public static readonly CommandClass = WindowCoveringV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "WindowCoveringReport",
			"help": "Window Covering Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "parameterID",
					"help": "Parameter ID",
					"length": 1,
					"values": {
						"0": "out_left 1",
						"1": "out_left 2",
						"2": "out_right 1",
						"3": "out_right 2",
						"4": "in_left 1",
						"5": "in_left 2",
						"6": "in_right 1",
						"7": "in_right 2",
						"8": "in_right_left 1",
						"9": "in_right_left 2",
						"10": "Vertical slats angle 1",
						"11": "Vertical slats angle 2",
						"12": "out_bottom 1",
						"13": "out_bottom 2",
						"14": "out_top 1",
						"15": "out_top 2",
						"16": "in_bottom 1",
						"17": "in_bottom 2",
						"18": "in_top 2",
						"19": "in_top_bottom 1",
						"20": "in_top_bottom 2",
						"21": "Horizontal slats angle 1",
						"22": "Horizontal slats angle 2"
					}
				},
				{
					"type": "integer",
					"name": "currentValue",
					"help": "Current Value",
					"length": 1
				},
				{
					"type": "integer",
					"name": "targetValue",
					"help": "Target Value",
					"length": 1
				},
				{
					"type": "integer",
					"name": "duration",
					"help": "Duration",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(WindowCoveringV1)?.command === this.command;
		}

		constructor(data: Buffer | WindowCoveringV1WindowCoveringReportData) {
			super(WindowCoveringReport, data);
		}
	};

	public static readonly WindowCoveringSet = class WindowCoveringSet extends CommandPacket<WindowCoveringV1WindowCoveringSetData> {
		public static readonly CommandClass = WindowCoveringV1;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "WindowCoveringSet",
			"help": "Window Covering Set",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Parameter Count",
							"mask": 31,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"name": "Properties1",
						"mask": 31,
						"shift": 0
					},
					"params": [
						{
							"type": "enum",
							"name": "parameterID",
							"help": "Parameter ID",
							"length": 1,
							"values": {
								"0": "out_left 1",
								"1": "out_left 2",
								"2": "out_right 1",
								"3": "out_right 2",
								"4": "in_left 1",
								"5": "in_left 2",
								"6": "in_right 1",
								"7": "in_right 2",
								"8": "in_right_left 1",
								"9": "in_right_left 2",
								"10": "Vertical slats angle 1",
								"11": "Vertical slats angle 2",
								"12": "out_bottom 1",
								"13": "out_bottom 2",
								"14": "out_top 1",
								"15": "out_top 2",
								"16": "in_bottom 1",
								"17": "in_bottom 2",
								"18": "in_top 2",
								"19": "in_top_bottom 1",
								"20": "in_top_bottom 2",
								"21": "Horizontal slats angle 1",
								"22": "Horizontal slats angle 2"
							}
						},
						{
							"type": "integer",
							"name": "value",
							"help": "Value",
							"length": 1
						}
					]
				},
				{
					"type": "integer",
					"name": "duration",
					"help": "Duration",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(WindowCoveringV1)?.command === this.command;
		}

		constructor(data: Buffer | WindowCoveringV1WindowCoveringSetData) {
			super(WindowCoveringSet, data);
		}
	};

	public static readonly WindowCoveringStartLevelChange = class WindowCoveringStartLevelChange extends CommandPacket<WindowCoveringV1WindowCoveringStartLevelChangeData> {
		public static readonly CommandClass = WindowCoveringV1;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "WindowCoveringStartLevelChange",
			"help": "Window Covering Start Level Change",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Res1",
							"mask": 63,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Up Down",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "boolean",
							"name": "Res2",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "enum",
					"name": "parameterID",
					"help": "Parameter ID",
					"length": 1,
					"values": {
						"0": "out_left 1",
						"1": "out_left 2",
						"2": "out_right 1",
						"3": "out_right 2",
						"4": "in_left 1",
						"5": "in_left 2",
						"6": "in_right 1",
						"7": "in_right 2",
						"8": "in_right_left 1",
						"9": "in_right_left 2",
						"10": "Vertical slats angle 1",
						"11": "Vertical slats angle 2",
						"12": "out_bottom 1",
						"13": "out_bottom 2",
						"14": "out_top 1",
						"15": "out_top 2",
						"16": "in_bottom 1",
						"17": "in_bottom 2",
						"18": "in_top 2",
						"19": "in_top_bottom 1",
						"20": "in_top_bottom 2",
						"21": "Horizontal slats angle 1",
						"22": "Horizontal slats angle 2"
					}
				},
				{
					"type": "integer",
					"name": "duration",
					"help": "Duration",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(WindowCoveringV1)?.command === this.command;
		}

		constructor(data: Buffer | WindowCoveringV1WindowCoveringStartLevelChangeData) {
			super(WindowCoveringStartLevelChange, data);
		}
	};

	public static readonly WindowCoveringStopLevelChange = class WindowCoveringStopLevelChange extends CommandPacket<WindowCoveringV1WindowCoveringStopLevelChangeData> {
		public static readonly CommandClass = WindowCoveringV1;
		public static readonly command = 0x07;
		public static readonly definition = {
			"command": 7,
			"name": "WindowCoveringStopLevelChange",
			"help": "Window Covering Stop Level Change",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "parameterID",
					"help": "Parameter ID",
					"length": 1,
					"values": {
						"0": "out_left 1",
						"1": "out_left 2",
						"2": "out_right 1",
						"3": "out_right 2",
						"4": "in_left 1",
						"5": "in_left 2",
						"6": "in_right 1",
						"7": "in_right 2",
						"8": "in_right_left 1",
						"9": "in_right_left 2",
						"10": "Vertical slats angle 1",
						"11": "Vertical slats angle 2",
						"12": "out_bottom 1",
						"13": "out_bottom 2",
						"14": "out_top 1",
						"15": "out_top 2",
						"16": "in_bottom 1",
						"17": "in_bottom 2",
						"18": "in_top 2",
						"19": "in_top_bottom 1",
						"20": "in_top_bottom 2",
						"21": "Horizontal slats angle 1",
						"22": "Horizontal slats angle 2"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(WindowCoveringV1)?.command === this.command;
		}

		constructor(data: Buffer | WindowCoveringV1WindowCoveringStopLevelChangeData) {
			super(WindowCoveringStopLevelChange, data);
		}
	};
}

export namespace WindowCoveringV1 {
	export type WindowCoveringSupportedGet = InstanceType<typeof WindowCoveringV1.WindowCoveringSupportedGet>;
	export type WindowCoveringSupportedReport = InstanceType<typeof WindowCoveringV1.WindowCoveringSupportedReport>;
	export type WindowCoveringGet = InstanceType<typeof WindowCoveringV1.WindowCoveringGet>;
	export type WindowCoveringReport = InstanceType<typeof WindowCoveringV1.WindowCoveringReport>;
	export type WindowCoveringSet = InstanceType<typeof WindowCoveringV1.WindowCoveringSet>;
	export type WindowCoveringStartLevelChange = InstanceType<typeof WindowCoveringV1.WindowCoveringStartLevelChange>;
	export type WindowCoveringStopLevelChange = InstanceType<typeof WindowCoveringV1.WindowCoveringStopLevelChange>;
}

export enum ParameterIDEnum {
	OutLeft1 = 0x0,
	OutLeft2 = 0x1,
	OutRight1 = 0x2,
	OutRight2 = 0x3,
	InLeft1 = 0x4,
	InLeft2 = 0x5,
	InRight1 = 0x6,
	InRight2 = 0x7,
	InRightLeft1 = 0x8,
	InRightLeft2 = 0x9,
	VerticalSlatsAngle1 = 0xa,
	VerticalSlatsAngle2 = 0xb,
	OutBottom1 = 0xc,
	OutBottom2 = 0xd,
	OutTop1 = 0xe,
	OutTop2 = 0xf,
	InBottom1 = 0x10,
	InBottom2 = 0x11,
	InTop2 = 0x12,
	InTopBottom1 = 0x13,
	InTopBottom2 = 0x14,
	HorizontalSlatsAngle1 = 0x15,
	HorizontalSlatsAngle2 = 0x16,
}
