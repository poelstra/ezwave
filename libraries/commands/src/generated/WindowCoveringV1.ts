/**
 * Command Class Window Covering, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	parameterMask: Set<number>; // variable length
}

export interface WindowCoveringV1WindowCoveringGetData {
	parameterId: ParameterIdEnum; // 1 byte enum value
}

export interface WindowCoveringV1WindowCoveringReportData {
	parameterId: ParameterIdEnum; // 1 byte enum value
	currentValue: number; // 1 byte unsigned integer
	targetValue: number; // 1 byte unsigned integer
	duration: number; // 1 byte unsigned integer
}

export interface WindowCoveringV1WindowCoveringSetData {
	vg1: Array<{ // variable length
		parameterId: ParameterIdEnum; // 1 byte enum value
		value: number; // 1 byte unsigned integer
	}>;
	duration: number; // 1 byte unsigned integer
}

export interface WindowCoveringV1WindowCoveringStartLevelChangeData {
	upDown: boolean; // properties1[6]
	parameterId: ParameterIdEnum; // 1 byte enum value
	duration: number; // 1 byte unsigned integer
}

export interface WindowCoveringV1WindowCoveringStopLevelChangeData {
	parameterId: ParameterIdEnum; // 1 byte enum value
}

export enum ParameterIdEnum {
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

export class WindowCoveringV1 extends CommandClassPacket<WindowCoveringV1Commands> {
	public static readonly commandClass = CommandClasses.WindowCovering; // 0x6a (106)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(WindowCoveringV1, commandAndPayload);
	}
}

export class WindowCoveringSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass = WindowCoveringV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "WindowCoveringSupportedGet",
		"help": "Window Covering Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(WindowCoveringV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(WindowCoveringSupportedGet, data);
	}
};

export class WindowCoveringSupportedReport extends CommandPacket<WindowCoveringV1WindowCoveringSupportedReportData> {
	public static readonly CommandClass = WindowCoveringV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "WindowCoveringSupportedReport",
		"help": "Window Covering Supported Report",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 240,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "numberOfParameterMaskBytes",
						"mask": 15,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"parameterMask"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Bitmask",
				"name": "parameterMask",
				"help": "Parameter Mask",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.numberOfParameterMaskBytes"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(WindowCoveringV1)?.command === this.command;
	}

	public constructor(data: Buffer | WindowCoveringV1WindowCoveringSupportedReportData) {
		super(WindowCoveringSupportedReport, data);
	}
};

export class WindowCoveringGet extends CommandPacket<WindowCoveringV1WindowCoveringGetData> {
	public static readonly CommandClass = WindowCoveringV1;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "WindowCoveringGet",
		"help": "Window Covering Get",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "parameterId",
				"help": "Parameter ID",
				"length": 1,
				"values": {
					"0": {
						"name": "OutLeft1",
						"help": "out_left 1"
					},
					"1": {
						"name": "OutLeft2",
						"help": "out_left 2"
					},
					"2": {
						"name": "OutRight1",
						"help": "out_right 1"
					},
					"3": {
						"name": "OutRight2",
						"help": "out_right 2"
					},
					"4": {
						"name": "InLeft1",
						"help": "in_left 1"
					},
					"5": {
						"name": "InLeft2",
						"help": "in_left 2"
					},
					"6": {
						"name": "InRight1",
						"help": "in_right 1"
					},
					"7": {
						"name": "InRight2",
						"help": "in_right 2"
					},
					"8": {
						"name": "InRightLeft1",
						"help": "in_right_left 1"
					},
					"9": {
						"name": "InRightLeft2",
						"help": "in_right_left 2"
					},
					"10": {
						"name": "VerticalSlatsAngle1",
						"help": "Vertical slats angle 1"
					},
					"11": {
						"name": "VerticalSlatsAngle2",
						"help": "Vertical slats angle 2"
					},
					"12": {
						"name": "OutBottom1",
						"help": "out_bottom 1"
					},
					"13": {
						"name": "OutBottom2",
						"help": "out_bottom 2"
					},
					"14": {
						"name": "OutTop1",
						"help": "out_top 1"
					},
					"15": {
						"name": "OutTop2",
						"help": "out_top 2"
					},
					"16": {
						"name": "InBottom1",
						"help": "in_bottom 1"
					},
					"17": {
						"name": "InBottom2",
						"help": "in_bottom 2"
					},
					"18": {
						"name": "InTop2",
						"help": "in_top 2"
					},
					"19": {
						"name": "InTopBottom1",
						"help": "in_top_bottom 1"
					},
					"20": {
						"name": "InTopBottom2",
						"help": "in_top_bottom 2"
					},
					"21": {
						"name": "HorizontalSlatsAngle1",
						"help": "Horizontal slats angle 1"
					},
					"22": {
						"name": "HorizontalSlatsAngle2",
						"help": "Horizontal slats angle 2"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(WindowCoveringV1)?.command === this.command;
	}

	public constructor(data: Buffer | WindowCoveringV1WindowCoveringGetData) {
		super(WindowCoveringGet, data);
	}
};

export class WindowCoveringReport extends CommandPacket<WindowCoveringV1WindowCoveringReportData> {
	public static readonly CommandClass = WindowCoveringV1;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
		"command": 4,
		"name": "WindowCoveringReport",
		"help": "Window Covering Report",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "parameterId",
				"help": "Parameter ID",
				"length": 1,
				"values": {
					"0": {
						"name": "OutLeft1",
						"help": "out_left 1"
					},
					"1": {
						"name": "OutLeft2",
						"help": "out_left 2"
					},
					"2": {
						"name": "OutRight1",
						"help": "out_right 1"
					},
					"3": {
						"name": "OutRight2",
						"help": "out_right 2"
					},
					"4": {
						"name": "InLeft1",
						"help": "in_left 1"
					},
					"5": {
						"name": "InLeft2",
						"help": "in_left 2"
					},
					"6": {
						"name": "InRight1",
						"help": "in_right 1"
					},
					"7": {
						"name": "InRight2",
						"help": "in_right 2"
					},
					"8": {
						"name": "InRightLeft1",
						"help": "in_right_left 1"
					},
					"9": {
						"name": "InRightLeft2",
						"help": "in_right_left 2"
					},
					"10": {
						"name": "VerticalSlatsAngle1",
						"help": "Vertical slats angle 1"
					},
					"11": {
						"name": "VerticalSlatsAngle2",
						"help": "Vertical slats angle 2"
					},
					"12": {
						"name": "OutBottom1",
						"help": "out_bottom 1"
					},
					"13": {
						"name": "OutBottom2",
						"help": "out_bottom 2"
					},
					"14": {
						"name": "OutTop1",
						"help": "out_top 1"
					},
					"15": {
						"name": "OutTop2",
						"help": "out_top 2"
					},
					"16": {
						"name": "InBottom1",
						"help": "in_bottom 1"
					},
					"17": {
						"name": "InBottom2",
						"help": "in_bottom 2"
					},
					"18": {
						"name": "InTop2",
						"help": "in_top 2"
					},
					"19": {
						"name": "InTopBottom1",
						"help": "in_top_bottom 1"
					},
					"20": {
						"name": "InTopBottom2",
						"help": "in_top_bottom 2"
					},
					"21": {
						"name": "HorizontalSlatsAngle1",
						"help": "Horizontal slats angle 1"
					},
					"22": {
						"name": "HorizontalSlatsAngle2",
						"help": "Horizontal slats angle 2"
					}
				}
			},
			{
				"type": "Integer",
				"name": "currentValue",
				"help": "Current Value",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "targetValue",
				"help": "Target Value",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "duration",
				"help": "Duration",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(WindowCoveringV1)?.command === this.command;
	}

	public constructor(data: Buffer | WindowCoveringV1WindowCoveringReportData) {
		super(WindowCoveringReport, data);
	}
};

export class WindowCoveringSet extends CommandPacket<WindowCoveringV1WindowCoveringSetData> {
	public static readonly CommandClass = WindowCoveringV1;
	public static readonly command = 0x05; // 5
	public static readonly definition = convertFromJsonCommand({
		"command": 5,
		"name": "WindowCoveringSet",
		"help": "Window Covering Set",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 224,
						"shift": 5,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "parameterCount",
						"mask": 31,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"vg1"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Group",
				"name": "vg1",
				"help": "vg1",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.parameterCount"
					}
				},
				"params": [
					{
						"type": "Enum",
						"name": "parameterId",
						"help": "Parameter ID",
						"length": 1,
						"values": {
							"0": {
								"name": "OutLeft1",
								"help": "out_left 1"
							},
							"1": {
								"name": "OutLeft2",
								"help": "out_left 2"
							},
							"2": {
								"name": "OutRight1",
								"help": "out_right 1"
							},
							"3": {
								"name": "OutRight2",
								"help": "out_right 2"
							},
							"4": {
								"name": "InLeft1",
								"help": "in_left 1"
							},
							"5": {
								"name": "InLeft2",
								"help": "in_left 2"
							},
							"6": {
								"name": "InRight1",
								"help": "in_right 1"
							},
							"7": {
								"name": "InRight2",
								"help": "in_right 2"
							},
							"8": {
								"name": "InRightLeft1",
								"help": "in_right_left 1"
							},
							"9": {
								"name": "InRightLeft2",
								"help": "in_right_left 2"
							},
							"10": {
								"name": "VerticalSlatsAngle1",
								"help": "Vertical slats angle 1"
							},
							"11": {
								"name": "VerticalSlatsAngle2",
								"help": "Vertical slats angle 2"
							},
							"12": {
								"name": "OutBottom1",
								"help": "out_bottom 1"
							},
							"13": {
								"name": "OutBottom2",
								"help": "out_bottom 2"
							},
							"14": {
								"name": "OutTop1",
								"help": "out_top 1"
							},
							"15": {
								"name": "OutTop2",
								"help": "out_top 2"
							},
							"16": {
								"name": "InBottom1",
								"help": "in_bottom 1"
							},
							"17": {
								"name": "InBottom2",
								"help": "in_bottom 2"
							},
							"18": {
								"name": "InTop2",
								"help": "in_top 2"
							},
							"19": {
								"name": "InTopBottom1",
								"help": "in_top_bottom 1"
							},
							"20": {
								"name": "InTopBottom2",
								"help": "in_top_bottom 2"
							},
							"21": {
								"name": "HorizontalSlatsAngle1",
								"help": "Horizontal slats angle 1"
							},
							"22": {
								"name": "HorizontalSlatsAngle2",
								"help": "Horizontal slats angle 2"
							}
						}
					},
					{
						"type": "Integer",
						"name": "value",
						"help": "Value",
						"length": 1
					}
				]
			},
			{
				"type": "Integer",
				"name": "duration",
				"help": "Duration",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(WindowCoveringV1)?.command === this.command;
	}

	public constructor(data: Buffer | WindowCoveringV1WindowCoveringSetData) {
		super(WindowCoveringSet, data);
	}
};

export class WindowCoveringStartLevelChange extends CommandPacket<WindowCoveringV1WindowCoveringStartLevelChangeData> {
	public static readonly CommandClass = WindowCoveringV1;
	public static readonly command = 0x06; // 6
	public static readonly definition = convertFromJsonCommand({
		"command": 6,
		"name": "WindowCoveringStartLevelChange",
		"help": "Window Covering Start Level Change",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "res2",
						"mask": 128,
						"shift": 7,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "upDown",
						"mask": 64,
						"shift": 6
					},
					{
						"fieldType": "Integer",
						"name": "res1",
						"mask": 63,
						"shift": 0,
						"reserved": true
					}
				]
			},
			{
				"type": "Enum",
				"name": "parameterId",
				"help": "Parameter ID",
				"length": 1,
				"values": {
					"0": {
						"name": "OutLeft1",
						"help": "out_left 1"
					},
					"1": {
						"name": "OutLeft2",
						"help": "out_left 2"
					},
					"2": {
						"name": "OutRight1",
						"help": "out_right 1"
					},
					"3": {
						"name": "OutRight2",
						"help": "out_right 2"
					},
					"4": {
						"name": "InLeft1",
						"help": "in_left 1"
					},
					"5": {
						"name": "InLeft2",
						"help": "in_left 2"
					},
					"6": {
						"name": "InRight1",
						"help": "in_right 1"
					},
					"7": {
						"name": "InRight2",
						"help": "in_right 2"
					},
					"8": {
						"name": "InRightLeft1",
						"help": "in_right_left 1"
					},
					"9": {
						"name": "InRightLeft2",
						"help": "in_right_left 2"
					},
					"10": {
						"name": "VerticalSlatsAngle1",
						"help": "Vertical slats angle 1"
					},
					"11": {
						"name": "VerticalSlatsAngle2",
						"help": "Vertical slats angle 2"
					},
					"12": {
						"name": "OutBottom1",
						"help": "out_bottom 1"
					},
					"13": {
						"name": "OutBottom2",
						"help": "out_bottom 2"
					},
					"14": {
						"name": "OutTop1",
						"help": "out_top 1"
					},
					"15": {
						"name": "OutTop2",
						"help": "out_top 2"
					},
					"16": {
						"name": "InBottom1",
						"help": "in_bottom 1"
					},
					"17": {
						"name": "InBottom2",
						"help": "in_bottom 2"
					},
					"18": {
						"name": "InTop2",
						"help": "in_top 2"
					},
					"19": {
						"name": "InTopBottom1",
						"help": "in_top_bottom 1"
					},
					"20": {
						"name": "InTopBottom2",
						"help": "in_top_bottom 2"
					},
					"21": {
						"name": "HorizontalSlatsAngle1",
						"help": "Horizontal slats angle 1"
					},
					"22": {
						"name": "HorizontalSlatsAngle2",
						"help": "Horizontal slats angle 2"
					}
				}
			},
			{
				"type": "Integer",
				"name": "duration",
				"help": "Duration",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(WindowCoveringV1)?.command === this.command;
	}

	public constructor(data: Buffer | WindowCoveringV1WindowCoveringStartLevelChangeData) {
		super(WindowCoveringStartLevelChange, data);
	}
};

export class WindowCoveringStopLevelChange extends CommandPacket<WindowCoveringV1WindowCoveringStopLevelChangeData> {
	public static readonly CommandClass = WindowCoveringV1;
	public static readonly command = 0x07; // 7
	public static readonly definition = convertFromJsonCommand({
		"command": 7,
		"name": "WindowCoveringStopLevelChange",
		"help": "Window Covering Stop Level Change",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "parameterId",
				"help": "Parameter ID",
				"length": 1,
				"values": {
					"0": {
						"name": "OutLeft1",
						"help": "out_left 1"
					},
					"1": {
						"name": "OutLeft2",
						"help": "out_left 2"
					},
					"2": {
						"name": "OutRight1",
						"help": "out_right 1"
					},
					"3": {
						"name": "OutRight2",
						"help": "out_right 2"
					},
					"4": {
						"name": "InLeft1",
						"help": "in_left 1"
					},
					"5": {
						"name": "InLeft2",
						"help": "in_left 2"
					},
					"6": {
						"name": "InRight1",
						"help": "in_right 1"
					},
					"7": {
						"name": "InRight2",
						"help": "in_right 2"
					},
					"8": {
						"name": "InRightLeft1",
						"help": "in_right_left 1"
					},
					"9": {
						"name": "InRightLeft2",
						"help": "in_right_left 2"
					},
					"10": {
						"name": "VerticalSlatsAngle1",
						"help": "Vertical slats angle 1"
					},
					"11": {
						"name": "VerticalSlatsAngle2",
						"help": "Vertical slats angle 2"
					},
					"12": {
						"name": "OutBottom1",
						"help": "out_bottom 1"
					},
					"13": {
						"name": "OutBottom2",
						"help": "out_bottom 2"
					},
					"14": {
						"name": "OutTop1",
						"help": "out_top 1"
					},
					"15": {
						"name": "OutTop2",
						"help": "out_top 2"
					},
					"16": {
						"name": "InBottom1",
						"help": "in_bottom 1"
					},
					"17": {
						"name": "InBottom2",
						"help": "in_bottom 2"
					},
					"18": {
						"name": "InTop2",
						"help": "in_top 2"
					},
					"19": {
						"name": "InTopBottom1",
						"help": "in_top_bottom 1"
					},
					"20": {
						"name": "InTopBottom2",
						"help": "in_top_bottom 2"
					},
					"21": {
						"name": "HorizontalSlatsAngle1",
						"help": "Horizontal slats angle 1"
					},
					"22": {
						"name": "HorizontalSlatsAngle2",
						"help": "Horizontal slats angle 2"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(WindowCoveringV1)?.command === this.command;
	}

	public constructor(data: Buffer | WindowCoveringV1WindowCoveringStopLevelChangeData) {
		super(WindowCoveringStopLevelChange, data);
	}
};
