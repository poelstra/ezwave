/**
 * Command Class Schedule, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum ScheduleV1Commands {
	ScheduleSupportedGet = 0x01,
	ScheduleSupportedReport = 0x02,
	CommandScheduleSet = 0x03,
	CommandScheduleGet = 0x04,
	CommandScheduleReport = 0x05,
	ScheduleRemove = 0x06,
	ScheduleStateSet = 0x07,
	ScheduleStateGet = 0x08,
	ScheduleStateReport = 0x09,
}

export interface ScheduleV1ScheduleSupportedReportData {
	numberOfSupportedScheduleId: number; // 1 byte unsigned integer
	supportEnableDisable: boolean; // properties1[7]
	fallbackSupport: boolean; // properties1[6]
	startTimeSupport: number; // properties1[5..0]
	vg1: Array<{ // variable length
		supportedCc: number; // 1 byte unsigned integer
		supportedCommand: number; // properties2[1..0]
	}>;
	overrideSupport: boolean; // properties3[7]
	supportedOverrideTypes: number; // properties3[6..0]
}

export interface ScheduleV1CommandScheduleSetData {
	scheduleId: number; // 1 byte unsigned integer
	userIdentifier: number; // 1 byte unsigned integer
	startYear: number; // 1 byte unsigned integer
	startMonth: number; // properties1[3..0]
	startDayOfMonth: number; // properties2[4..0]
	startWeekday: number; // properties3[6..0]
	durationType: number; // properties4[7..5]
	startHour: number; // properties4[4..0]
	startMinute: number; // properties5[5..0]
	duration: number; // 2 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	vg1: Array<{ // variable length
		cmd: Buffer; // variable length
	}>;
}

export interface ScheduleV1CommandScheduleGetData {
	scheduleId: number; // 1 byte unsigned integer
}

export interface ScheduleV1CommandScheduleReportData {
	scheduleId: number; // 1 byte unsigned integer
	userIdentifier: number; // 1 byte unsigned integer
	startYear: number; // 1 byte unsigned integer
	activeId: number; // properties1[7..4]
	startMonth: number; // properties1[3..0]
	startDayOfMonth: number; // properties2[4..0]
	startWeekday: number; // properties3[6..0]
	durationType: number; // properties4[7..5]
	startHour: number; // properties4[4..0]
	startMinute: number; // properties5[5..0]
	duration: number; // 2 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	vg1: Array<{ // variable length
		cmd: Buffer; // variable length
	}>;
}

export interface ScheduleV1ScheduleRemoveData {
	scheduleId: number; // 1 byte unsigned integer
}

export interface ScheduleV1ScheduleStateSetData {
	scheduleId: number; // 1 byte unsigned integer
	scheduleState: number; // 1 byte unsigned integer
}

export interface ScheduleV1ScheduleStateReportData {
	numberOfSupportedScheduleId: number; // 1 byte unsigned integer
	reportsToFollow: number; // properties1[7..1]
	override: boolean; // properties1[0]
	vg1: Array<{ // automatic length
		activeId2: number; // properties2[7..4]
		activeId1: number; // properties2[3..0]
	}>;
}

export class ScheduleV1 extends CommandClassPacket<ScheduleV1Commands> {
	public static readonly commandClass: number = CommandClasses.Schedule; // 0x53 (83)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ScheduleV1, commandAndPayload);
	}
}

export class ScheduleSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof ScheduleV1 = ScheduleV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "ScheduleSupportedGet",
		"help": "Schedule Support Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ScheduleSupportedGet, data);
	}
};

export class ScheduleSupportedReport extends CommandPacket<ScheduleV1ScheduleSupportedReportData> {
	public static readonly CommandClass: typeof ScheduleV1 = ScheduleV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "ScheduleSupportedReport",
		"help": "Schedule Support Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "numberOfSupportedScheduleId",
				"help": "Number of Supported Schedule ID",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "supportEnableDisable",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Boolean",
						"name": "fallbackSupport",
						"mask": 64,
						"shift": 6
					},
					{
						"fieldType": "Integer",
						"name": "startTimeSupport",
						"mask": 63,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "numberOfSupportedCc",
				"help": "Number of supported CC",
				"length": 1,
				"lengthOf": {
					"refs": [
						"vg1"
					]
				},
				"isAutogenerated": true
			},
			{
				"type": "Group",
				"name": "vg1",
				"help": "vg1",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "numberOfSupportedCc"
					}
				},
				"params": [
					{
						"type": "Integer",
						"name": "supportedCc",
						"help": "Supported CC",
						"length": 1
					},
					{
						"type": "Bitfield",
						"name": "properties2",
						"help": "Properties2",
						"length": 1,
						"fields": [
							{
								"fieldType": "Integer",
								"name": "reserved",
								"mask": 252,
								"shift": 2,
								"reserved": true
							},
							{
								"fieldType": "Integer",
								"name": "supportedCommand",
								"mask": 3,
								"shift": 0
							}
						]
					}
				]
			},
			{
				"type": "Bitfield",
				"name": "properties3",
				"help": "Properties3",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "overrideSupport",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "supportedOverrideTypes",
						"mask": 127,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleV1)?.command === this.command;
	}

	public constructor(data: Buffer | ScheduleV1ScheduleSupportedReportData) {
		super(ScheduleSupportedReport, data);
	}
};

export class CommandScheduleSet extends CommandPacket<ScheduleV1CommandScheduleSetData> {
	public static readonly CommandClass: typeof ScheduleV1 = ScheduleV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "CommandScheduleSet",
		"help": "Schedule Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "scheduleId",
				"help": "Schedule ID",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "userIdentifier",
				"help": "User Identifier",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "startYear",
				"help": "Start Year",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved1",
						"mask": 240,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "startMonth",
						"mask": 15,
						"shift": 0
					}
				]
			},
			{
				"type": "Bitfield",
				"name": "properties2",
				"help": "Properties2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved2",
						"mask": 224,
						"shift": 5,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "startDayOfMonth",
						"mask": 31,
						"shift": 0
					}
				]
			},
			{
				"type": "Bitfield",
				"name": "properties3",
				"help": "Properties3",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "res",
						"mask": 128,
						"shift": 7,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "startWeekday",
						"mask": 127,
						"shift": 0
					}
				]
			},
			{
				"type": "Bitfield",
				"name": "properties4",
				"help": "Properties4",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "durationType",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "startHour",
						"mask": 31,
						"shift": 0
					}
				]
			},
			{
				"type": "Bitfield",
				"name": "properties5",
				"help": "Properties5",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved3",
						"mask": 192,
						"shift": 6,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "startMinute",
						"mask": 63,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "duration",
				"help": "Duration ",
				"length": 2
			},
			{
				"type": "Integer",
				"name": "reportsToFollow",
				"help": "Reports to Follow",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "numberOfCmdToFollow",
				"help": "Number of Cmd to Follow",
				"length": 1,
				"lengthOf": {
					"refs": [
						"vg1"
					]
				},
				"isAutogenerated": true
			},
			{
				"type": "Group",
				"name": "vg1",
				"help": "vg1",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "numberOfCmdToFollow"
					}
				},
				"params": [
					{
						"type": "Integer",
						"name": "cmdLength",
						"help": "Cmd Length",
						"length": 1,
						"lengthOf": {
							"refs": [
								"vg1.cmd"
							]
						},
						"isAutogenerated": true
					},
					{
						"type": "Blob",
						"name": "cmd",
						"help": "Cmd ",
						"length": {
							"lengthType": "Ref",
							"from": {
								"ref": "vg1.cmdLength"
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleV1)?.command === this.command;
	}

	public constructor(data: Buffer | ScheduleV1CommandScheduleSetData) {
		super(CommandScheduleSet, data);
	}
};

export class CommandScheduleGet extends CommandPacket<ScheduleV1CommandScheduleGetData> {
	public static readonly CommandClass: typeof ScheduleV1 = ScheduleV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "CommandScheduleGet",
		"help": "Schedule Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "scheduleId",
				"help": "Schedule ID",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleV1)?.command === this.command;
	}

	public constructor(data: Buffer | ScheduleV1CommandScheduleGetData) {
		super(CommandScheduleGet, data);
	}
};

export class CommandScheduleReport extends CommandPacket<ScheduleV1CommandScheduleReportData> {
	public static readonly CommandClass: typeof ScheduleV1 = ScheduleV1;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "CommandScheduleReport",
		"help": "Schedule Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "scheduleId",
				"help": "Schedule ID",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "userIdentifier",
				"help": "User Identifier",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "startYear",
				"help": "Start Year",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "activeId",
						"mask": 240,
						"shift": 4
					},
					{
						"fieldType": "Integer",
						"name": "startMonth",
						"mask": 15,
						"shift": 0
					}
				]
			},
			{
				"type": "Bitfield",
				"name": "properties2",
				"help": "Properties2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved2",
						"mask": 224,
						"shift": 5,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "startDayOfMonth",
						"mask": 31,
						"shift": 0
					}
				]
			},
			{
				"type": "Bitfield",
				"name": "properties3",
				"help": "Properties3",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "res",
						"mask": 128,
						"shift": 7,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "startWeekday",
						"mask": 127,
						"shift": 0
					}
				]
			},
			{
				"type": "Bitfield",
				"name": "properties4",
				"help": "Properties4",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "durationType",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "startHour",
						"mask": 31,
						"shift": 0
					}
				]
			},
			{
				"type": "Bitfield",
				"name": "properties5",
				"help": "Properties5",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved3",
						"mask": 192,
						"shift": 6,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "startMinute",
						"mask": 63,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "duration",
				"help": "Duration ",
				"length": 2
			},
			{
				"type": "Integer",
				"name": "reportsToFollow",
				"help": "Reports to Follow",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "numberOfCmdToFollow",
				"help": "Number of Cmd to Follow",
				"length": 1,
				"lengthOf": {
					"refs": [
						"vg1"
					]
				},
				"isAutogenerated": true
			},
			{
				"type": "Group",
				"name": "vg1",
				"help": "vg1",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "numberOfCmdToFollow"
					}
				},
				"params": [
					{
						"type": "Integer",
						"name": "cmdLength",
						"help": "Cmd Length",
						"length": 1,
						"lengthOf": {
							"refs": [
								"vg1.cmd"
							]
						},
						"isAutogenerated": true
					},
					{
						"type": "Blob",
						"name": "cmd",
						"help": "Cmd ",
						"length": {
							"lengthType": "Ref",
							"from": {
								"ref": "vg1.cmdLength"
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleV1)?.command === this.command;
	}

	public constructor(data: Buffer | ScheduleV1CommandScheduleReportData) {
		super(CommandScheduleReport, data);
	}
};

export class ScheduleRemove extends CommandPacket<ScheduleV1ScheduleRemoveData> {
	public static readonly CommandClass: typeof ScheduleV1 = ScheduleV1;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 6,
		"name": "ScheduleRemove",
		"help": "Schedule Remove",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "scheduleId",
				"help": "Schedule ID",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleV1)?.command === this.command;
	}

	public constructor(data: Buffer | ScheduleV1ScheduleRemoveData) {
		super(ScheduleRemove, data);
	}
};

export class ScheduleStateSet extends CommandPacket<ScheduleV1ScheduleStateSetData> {
	public static readonly CommandClass: typeof ScheduleV1 = ScheduleV1;
	public static readonly command: number = 0x07; // 7
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 7,
		"name": "ScheduleStateSet",
		"help": "Schedule State Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "scheduleId",
				"help": "Schedule ID",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "scheduleState",
				"help": "Schedule State",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleV1)?.command === this.command;
	}

	public constructor(data: Buffer | ScheduleV1ScheduleStateSetData) {
		super(ScheduleStateSet, data);
	}
};

export class ScheduleStateGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof ScheduleV1 = ScheduleV1;
	public static readonly command: number = 0x08; // 8
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 8,
		"name": "ScheduleStateGet",
		"help": "Schedule State Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ScheduleStateGet, data);
	}
};

export class ScheduleStateReport extends CommandPacket<ScheduleV1ScheduleStateReportData> {
	public static readonly CommandClass: typeof ScheduleV1 = ScheduleV1;
	public static readonly command: number = 0x09; // 9
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 9,
		"name": "ScheduleStateReport",
		"help": "Schedule State Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "numberOfSupportedScheduleId",
				"help": "Number of Supported Schedule ID",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reportsToFollow",
						"mask": 254,
						"shift": 1
					},
					{
						"fieldType": "Boolean",
						"name": "override",
						"mask": 1,
						"shift": 0
					}
				]
			},
			{
				"type": "Group",
				"name": "vg1",
				"help": "vg1",
				"length": {
					"lengthType": "Auto"
				},
				"params": [
					{
						"type": "Bitfield",
						"name": "properties2",
						"help": "Properties2",
						"length": 1,
						"fields": [
							{
								"fieldType": "Integer",
								"name": "activeId2",
								"mask": 240,
								"shift": 4
							},
							{
								"fieldType": "Integer",
								"name": "activeId1",
								"mask": 15,
								"shift": 0
							}
						]
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(ScheduleV1)?.command === this.command;
	}

	public constructor(data: Buffer | ScheduleV1ScheduleStateReportData) {
		super(ScheduleStateReport, data);
	}
};
