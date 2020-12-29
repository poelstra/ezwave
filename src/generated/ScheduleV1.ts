/**
 * Command Class Schedule, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

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
	numberOfSupportedScheduleID: number; // 1 byte unsigned integer
	// TODO param properties1 type bitfield
	numberOfSupportedCC: number; // 1 byte unsigned integer
	// TODO param vg1 type group
	// TODO param properties3 type bitfield
}

export interface ScheduleV1CommandScheduleSetData {
	scheduleID: number; // 1 byte unsigned integer
	userIdentifier: number; // 1 byte unsigned integer
	startYear: number; // 1 byte unsigned integer
	// TODO param properties1 type bitfield
	// TODO param properties2 type bitfield
	// TODO param properties3 type bitfield
	// TODO param properties4 type bitfield
	// TODO param properties5 type bitfield
	durationByte: number; // 2 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	numberOfCmdToFollow: number; // 1 byte unsigned integer
	// TODO param vg1 type group
}

export interface ScheduleV1CommandScheduleGetData {
	scheduleID: number; // 1 byte unsigned integer
}

export interface ScheduleV1CommandScheduleReportData {
	scheduleID: number; // 1 byte unsigned integer
	userIdentifier: number; // 1 byte unsigned integer
	startYear: number; // 1 byte unsigned integer
	// TODO param properties1 type bitfield
	// TODO param properties2 type bitfield
	// TODO param properties3 type bitfield
	// TODO param properties4 type bitfield
	// TODO param properties5 type bitfield
	durationByte: number; // 2 byte unsigned integer
	reportsToFollow: number; // 1 byte unsigned integer
	numberOfCmdToFollow: number; // 1 byte unsigned integer
	// TODO param vg1 type group
}

export interface ScheduleV1ScheduleRemoveData {
	scheduleID: number; // 1 byte unsigned integer
}

export interface ScheduleV1ScheduleStateSetData {
	scheduleID: number; // 1 byte unsigned integer
	scheduleState: number; // 1 byte unsigned integer
}

export interface ScheduleV1ScheduleStateReportData {
	numberOfSupportedScheduleID: number; // 1 byte unsigned integer
	// TODO param properties1 type bitfield
	// TODO param vg1 type group
}

export class ScheduleV1 extends CommandClassPacket<ScheduleV1Commands> {
	public static readonly commandClass = CommandClasses.Schedule; // 0x53 (83)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ScheduleV1, commandAndPayload);
	}

	public static readonly ScheduleSupportedGet = class ScheduleSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = ScheduleV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "ScheduleSupportedGet",
			"help": "Schedule Support Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ScheduleSupportedGet, data);
		}
	};

	public static readonly ScheduleSupportedReport = class ScheduleSupportedReport extends CommandPacket<ScheduleV1ScheduleSupportedReportData> {
		public static readonly CommandClass = ScheduleV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "ScheduleSupportedReport",
			"help": "Schedule Support Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "numberOfSupportedScheduleID",
					"help": "Number of Supported Schedule ID",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Start Time Support",
							"mask": 63,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Fallback Support",
							"mask": 64,
							"shift": 6
						},
						{
							"type": "boolean",
							"name": "Support Enable/Disable",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "integer",
					"name": "numberOfSupportedCC",
					"help": "Number of supported CC",
					"length": 1
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"name": "Number of supported CC",
						"mask": 255,
						"shift": 0
					},
					"params": [
						{
							"type": "integer",
							"name": "supportedCC",
							"help": "Supported CC",
							"length": 1
						},
						{
							"type": "bitfield",
							"name": "properties2",
							"help": "Properties2",
							"length": 1,
							"fields": [
								{
									"type": "integer",
									"name": "Supported Command",
									"mask": 3,
									"shift": 0
								},
								{
									"type": "integer",
									"name": "Reserved",
									"mask": 252,
									"shift": 2
								}
							]
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Supported Override Types",
							"mask": 127,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Override Support",
							"mask": 128,
							"shift": 7
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleV1)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV1ScheduleSupportedReportData) {
			super(ScheduleSupportedReport, data);
		}
	};

	public static readonly CommandScheduleSet = class CommandScheduleSet extends CommandPacket<ScheduleV1CommandScheduleSetData> {
		public static readonly CommandClass = ScheduleV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "CommandScheduleSet",
			"help": "Schedule Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "scheduleID",
					"help": "Schedule ID",
					"length": 1
				},
				{
					"type": "integer",
					"name": "userIdentifier",
					"help": "User Identifier",
					"length": 1
				},
				{
					"type": "integer",
					"name": "startYear",
					"help": "Start Year",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Start Month",
							"mask": 15,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved1",
							"mask": 240,
							"shift": 4
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Start Day of Month",
							"mask": 31,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved2",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Start Weekday",
							"mask": 127,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Res.",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties4",
					"help": "Properties4",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Start Hour",
							"mask": 31,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Duration Type",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties5",
					"help": "Properties5",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Start Minute",
							"mask": 63,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved3",
							"mask": 192,
							"shift": 6
						}
					]
				},
				{
					"type": "integer",
					"name": "durationByte",
					"help": "Duration Byte",
					"length": 2
				},
				{
					"type": "integer",
					"name": "reportsToFollow",
					"help": "Reports to Follow",
					"length": 1
				},
				{
					"type": "integer",
					"name": "numberOfCmdToFollow",
					"help": "Number of Cmd to Follow",
					"length": 1
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"name": "Number of Cmd to Follow",
						"mask": 255,
						"shift": 0
					},
					"params": [
						{
							"type": "integer",
							"name": "cmdLength",
							"help": "Cmd Length",
							"length": 1
						},
						{
							"type": "blob",
							"name": "cmdByte",
							"help": "Cmd Byte",
							"length": {
								"name": "Cmd Length",
								"mask": 255,
								"shift": 0
							}
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleV1)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV1CommandScheduleSetData) {
			super(CommandScheduleSet, data);
		}
	};

	public static readonly CommandScheduleGet = class CommandScheduleGet extends CommandPacket<ScheduleV1CommandScheduleGetData> {
		public static readonly CommandClass = ScheduleV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "CommandScheduleGet",
			"help": "Schedule Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "scheduleID",
					"help": "Schedule ID",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleV1)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV1CommandScheduleGetData) {
			super(CommandScheduleGet, data);
		}
	};

	public static readonly CommandScheduleReport = class CommandScheduleReport extends CommandPacket<ScheduleV1CommandScheduleReportData> {
		public static readonly CommandClass = ScheduleV1;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "CommandScheduleReport",
			"help": "Schedule Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "scheduleID",
					"help": "Schedule ID",
					"length": 1
				},
				{
					"type": "integer",
					"name": "userIdentifier",
					"help": "User Identifier",
					"length": 1
				},
				{
					"type": "integer",
					"name": "startYear",
					"help": "Start Year",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Start Month",
							"mask": 15,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Active_ID",
							"mask": 240,
							"shift": 4
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Start Day of Month",
							"mask": 31,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved2",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Start Weekday",
							"mask": 127,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Res.",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties4",
					"help": "Properties4",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Start Hour",
							"mask": 31,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Duration Type",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties5",
					"help": "Properties5",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Start Minute",
							"mask": 63,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved3",
							"mask": 192,
							"shift": 6
						}
					]
				},
				{
					"type": "integer",
					"name": "durationByte",
					"help": "Duration Byte",
					"length": 2
				},
				{
					"type": "integer",
					"name": "reportsToFollow",
					"help": "Reports to Follow",
					"length": 1
				},
				{
					"type": "integer",
					"name": "numberOfCmdToFollow",
					"help": "Number of Cmd to Follow",
					"length": 1
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"name": "Number of Cmd to Follow",
						"mask": 255,
						"shift": 0
					},
					"params": [
						{
							"type": "integer",
							"name": "cmdLength",
							"help": "Cmd Length",
							"length": 1
						},
						{
							"type": "blob",
							"name": "cmdByte",
							"help": "Cmd Byte",
							"length": {
								"name": "Cmd Length",
								"mask": 255,
								"shift": 0
							}
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleV1)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV1CommandScheduleReportData) {
			super(CommandScheduleReport, data);
		}
	};

	public static readonly ScheduleRemove = class ScheduleRemove extends CommandPacket<ScheduleV1ScheduleRemoveData> {
		public static readonly CommandClass = ScheduleV1;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "ScheduleRemove",
			"help": "Schedule Remove",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "scheduleID",
					"help": "Schedule ID",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleV1)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV1ScheduleRemoveData) {
			super(ScheduleRemove, data);
		}
	};

	public static readonly ScheduleStateSet = class ScheduleStateSet extends CommandPacket<ScheduleV1ScheduleStateSetData> {
		public static readonly CommandClass = ScheduleV1;
		public static readonly command = 0x07;
		public static readonly definition = {
			"command": 7,
			"name": "ScheduleStateSet",
			"help": "Schedule State Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "scheduleID",
					"help": "Schedule ID",
					"length": 1
				},
				{
					"type": "integer",
					"name": "scheduleState",
					"help": "Schedule State",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleV1)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV1ScheduleStateSetData) {
			super(ScheduleStateSet, data);
		}
	};

	public static readonly ScheduleStateGet = class ScheduleStateGet extends CommandPacket<void> {
		public static readonly CommandClass = ScheduleV1;
		public static readonly command = 0x08;
		public static readonly definition = {
			"command": 8,
			"name": "ScheduleStateGet",
			"help": "Schedule State Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ScheduleStateGet, data);
		}
	};

	public static readonly ScheduleStateReport = class ScheduleStateReport extends CommandPacket<ScheduleV1ScheduleStateReportData> {
		public static readonly CommandClass = ScheduleV1;
		public static readonly command = 0x09;
		public static readonly definition = {
			"command": 9,
			"name": "ScheduleStateReport",
			"help": "Schedule State Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "numberOfSupportedScheduleID",
					"help": "Number of Supported Schedule ID",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "boolean",
							"name": "Override",
							"mask": 1,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reports to Follow",
							"mask": 254,
							"shift": 1
						}
					]
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": "auto",
					"params": [
						{
							"type": "bitfield",
							"name": "properties2",
							"help": "Properties2",
							"length": 1,
							"fields": [
								{
									"type": "integer",
									"name": "Active_ID 1",
									"mask": 15,
									"shift": 0
								},
								{
									"type": "integer",
									"name": "Active_ID 2",
									"mask": 240,
									"shift": 4
								}
							]
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ScheduleV1)?.command === this.command;
		}

		constructor(data: Buffer | ScheduleV1ScheduleStateReportData) {
			super(ScheduleStateReport, data);
		}
	};
}

export namespace ScheduleV1 {
	export type ScheduleSupportedGet = InstanceType<typeof ScheduleV1.ScheduleSupportedGet>;
	export type ScheduleSupportedReport = InstanceType<typeof ScheduleV1.ScheduleSupportedReport>;
	export type CommandScheduleSet = InstanceType<typeof ScheduleV1.CommandScheduleSet>;
	export type CommandScheduleGet = InstanceType<typeof ScheduleV1.CommandScheduleGet>;
	export type CommandScheduleReport = InstanceType<typeof ScheduleV1.CommandScheduleReport>;
	export type ScheduleRemove = InstanceType<typeof ScheduleV1.ScheduleRemove>;
	export type ScheduleStateSet = InstanceType<typeof ScheduleV1.ScheduleStateSet>;
	export type ScheduleStateGet = InstanceType<typeof ScheduleV1.ScheduleStateGet>;
	export type ScheduleStateReport = InstanceType<typeof ScheduleV1.ScheduleStateReport>;
}
