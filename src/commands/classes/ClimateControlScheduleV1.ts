/**
 * Command Class Climate Control Schedule, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum ClimateControlScheduleV1Commands {
	ScheduleChangedGet = 0x04,
	ScheduleChangedReport = 0x05,
	ScheduleGet = 0x02,
	ScheduleOverrideGet = 0x07,
	ScheduleOverrideReport = 0x08,
	ScheduleOverrideSet = 0x06,
	ScheduleReport = 0x03,
	ScheduleSet = 0x01,
}

export interface ClimateControlScheduleV1ScheduleChangedReportData {
	changeCounter: number; // 1 byte unsigned integer
}

export interface ClimateControlScheduleV1ScheduleGetData {
	weekday: number; // properties1[2..0]
}

export interface ClimateControlScheduleV1ScheduleOverrideReportData {
	overrideType: number; // properties1[1..0]
	overrideState: OverrideStateEnum; // 1 byte enum value
}

export interface ClimateControlScheduleV1ScheduleOverrideSetData {
	overrideType: number; // properties1[1..0]
	overrideState: OverrideStateEnum; // 1 byte enum value
}

export interface ClimateControlScheduleV1ScheduleReportData {
	weekday: number; // properties1[2..0]
	switchpoint0: number; // 3 byte unsigned integer
	switchpoint1: number; // 3 byte unsigned integer
	switchpoint2: number; // 3 byte unsigned integer
	switchpoint3: number; // 3 byte unsigned integer
	switchpoint4: number; // 3 byte unsigned integer
	switchpoint5: number; // 3 byte unsigned integer
	switchpoint6: number; // 3 byte unsigned integer
	switchpoint7: number; // 3 byte unsigned integer
	switchpoint8: number; // 3 byte unsigned integer
}

export interface ClimateControlScheduleV1ScheduleSetData {
	weekday: number; // properties1[2..0]
	switchpoint0: number; // 3 byte unsigned integer
	switchpoint1: number; // 3 byte unsigned integer
	switchpoint2: number; // 3 byte unsigned integer
	switchpoint3: number; // 3 byte unsigned integer
	switchpoint4: number; // 3 byte unsigned integer
	switchpoint5: number; // 3 byte unsigned integer
	switchpoint6: number; // 3 byte unsigned integer
	switchpoint7: number; // 3 byte unsigned integer
	switchpoint8: number; // 3 byte unsigned integer
}

export enum OverrideStateEnum {
	NoOverride = 0x0,
	TemporaryOverride = 0x1,
	PermanentOverride = 0x2,
	Reserved = 0x3,
}

// Deprecated
export class ClimateControlScheduleV1 extends CommandClassPacket<ClimateControlScheduleV1Commands> {
	public static readonly commandClass = CommandClasses.ClimateControlSchedule; // 0x46 (70)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ClimateControlScheduleV1, commandAndPayload);
	}

	public static readonly ScheduleChangedGet = class ScheduleChangedGet extends CommandPacket<void> {
		public static readonly CommandClass = ClimateControlScheduleV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "ScheduleChangedGet",
			"help": "Schedule Changed Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ClimateControlScheduleV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ScheduleChangedGet, data);
		}
	};

	public static readonly ScheduleChangedReport = class ScheduleChangedReport extends CommandPacket<ClimateControlScheduleV1ScheduleChangedReportData> {
		public static readonly CommandClass = ClimateControlScheduleV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "ScheduleChangedReport",
			"help": "Schedule Changed Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "changeCounter",
					"help": "ChangeCounter",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ClimateControlScheduleV1)?.command === this.command;
		}

		constructor(data: Buffer | ClimateControlScheduleV1ScheduleChangedReportData) {
			super(ScheduleChangedReport, data);
		}
	};

	public static readonly ScheduleGet = class ScheduleGet extends CommandPacket<ClimateControlScheduleV1ScheduleGetData> {
		public static readonly CommandClass = ClimateControlScheduleV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "ScheduleGet",
			"help": "Schedule Get",
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
							"mask": 248,
							"shift": 3,
							"reserved": true
						},
						{
							"fieldType": "Integer",
							"name": "weekday",
							"mask": 7,
							"shift": 0
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ClimateControlScheduleV1)?.command === this.command;
		}

		constructor(data: Buffer | ClimateControlScheduleV1ScheduleGetData) {
			super(ScheduleGet, data);
		}
	};

	public static readonly ScheduleOverrideGet = class ScheduleOverrideGet extends CommandPacket<void> {
		public static readonly CommandClass = ClimateControlScheduleV1;
		public static readonly command = 0x07;
		public static readonly definition = convertFromJsonCommand({
			"command": 7,
			"name": "ScheduleOverrideGet",
			"help": "Schedule Override Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ClimateControlScheduleV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ScheduleOverrideGet, data);
		}
	};

	public static readonly ScheduleOverrideReport = class ScheduleOverrideReport extends CommandPacket<ClimateControlScheduleV1ScheduleOverrideReportData> {
		public static readonly CommandClass = ClimateControlScheduleV1;
		public static readonly command = 0x08;
		public static readonly definition = convertFromJsonCommand({
			"command": 8,
			"name": "ScheduleOverrideReport",
			"help": "Schedule Override Report",
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
							"mask": 252,
							"shift": 2,
							"reserved": true
						},
						{
							"fieldType": "Integer",
							"name": "overrideType",
							"mask": 3,
							"shift": 0
						}
					]
				},
				{
					"type": "Enum",
					"name": "overrideState",
					"help": "Override State",
					"length": 1,
					"values": {
						"0": {
							"name": "NoOverride",
							"help": "No override"
						},
						"1": {
							"name": "TemporaryOverride",
							"help": "Temporary override"
						},
						"2": {
							"name": "PermanentOverride",
							"help": "Permanent override"
						},
						"3": {
							"name": "Reserved",
							"help": "Reserved"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ClimateControlScheduleV1)?.command === this.command;
		}

		constructor(data: Buffer | ClimateControlScheduleV1ScheduleOverrideReportData) {
			super(ScheduleOverrideReport, data);
		}
	};

	public static readonly ScheduleOverrideSet = class ScheduleOverrideSet extends CommandPacket<ClimateControlScheduleV1ScheduleOverrideSetData> {
		public static readonly CommandClass = ClimateControlScheduleV1;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "ScheduleOverrideSet",
			"help": "Schedule Override Set",
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
							"mask": 252,
							"shift": 2,
							"reserved": true
						},
						{
							"fieldType": "Integer",
							"name": "overrideType",
							"mask": 3,
							"shift": 0
						}
					]
				},
				{
					"type": "Enum",
					"name": "overrideState",
					"help": "Override State",
					"length": 1,
					"values": {
						"0": {
							"name": "NoOverride",
							"help": "No override"
						},
						"1": {
							"name": "TemporaryOverride",
							"help": "Temporary override"
						},
						"2": {
							"name": "PermanentOverride",
							"help": "Permanent override"
						},
						"3": {
							"name": "Reserved",
							"help": "Reserved"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ClimateControlScheduleV1)?.command === this.command;
		}

		constructor(data: Buffer | ClimateControlScheduleV1ScheduleOverrideSetData) {
			super(ScheduleOverrideSet, data);
		}
	};

	public static readonly ScheduleReport = class ScheduleReport extends CommandPacket<ClimateControlScheduleV1ScheduleReportData> {
		public static readonly CommandClass = ClimateControlScheduleV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "ScheduleReport",
			"help": "Schedule Report",
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
							"mask": 248,
							"shift": 3,
							"reserved": true
						},
						{
							"fieldType": "Integer",
							"name": "weekday",
							"mask": 7,
							"shift": 0
						}
					]
				},
				{
					"type": "Integer",
					"name": "switchpoint0",
					"help": "Switchpoint 0",
					"length": 3
				},
				{
					"type": "Integer",
					"name": "switchpoint1",
					"help": "Switchpoint 1",
					"length": 3
				},
				{
					"type": "Integer",
					"name": "switchpoint2",
					"help": "Switchpoint 2",
					"length": 3
				},
				{
					"type": "Integer",
					"name": "switchpoint3",
					"help": "Switchpoint 3",
					"length": 3
				},
				{
					"type": "Integer",
					"name": "switchpoint4",
					"help": "Switchpoint 4",
					"length": 3
				},
				{
					"type": "Integer",
					"name": "switchpoint5",
					"help": "Switchpoint 5",
					"length": 3
				},
				{
					"type": "Integer",
					"name": "switchpoint6",
					"help": "Switchpoint 6",
					"length": 3
				},
				{
					"type": "Integer",
					"name": "switchpoint7",
					"help": "Switchpoint 7",
					"length": 3
				},
				{
					"type": "Integer",
					"name": "switchpoint8",
					"help": "Switchpoint 8",
					"length": 3
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ClimateControlScheduleV1)?.command === this.command;
		}

		constructor(data: Buffer | ClimateControlScheduleV1ScheduleReportData) {
			super(ScheduleReport, data);
		}
	};

	public static readonly ScheduleSet = class ScheduleSet extends CommandPacket<ClimateControlScheduleV1ScheduleSetData> {
		public static readonly CommandClass = ClimateControlScheduleV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "ScheduleSet",
			"help": "Schedule Set",
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
							"mask": 248,
							"shift": 3,
							"reserved": true
						},
						{
							"fieldType": "Integer",
							"name": "weekday",
							"mask": 7,
							"shift": 0
						}
					]
				},
				{
					"type": "Integer",
					"name": "switchpoint0",
					"help": "Switchpoint 0",
					"length": 3
				},
				{
					"type": "Integer",
					"name": "switchpoint1",
					"help": "Switchpoint 1",
					"length": 3
				},
				{
					"type": "Integer",
					"name": "switchpoint2",
					"help": "Switchpoint 2",
					"length": 3
				},
				{
					"type": "Integer",
					"name": "switchpoint3",
					"help": "Switchpoint 3",
					"length": 3
				},
				{
					"type": "Integer",
					"name": "switchpoint4",
					"help": "Switchpoint 4",
					"length": 3
				},
				{
					"type": "Integer",
					"name": "switchpoint5",
					"help": "Switchpoint 5",
					"length": 3
				},
				{
					"type": "Integer",
					"name": "switchpoint6",
					"help": "Switchpoint 6",
					"length": 3
				},
				{
					"type": "Integer",
					"name": "switchpoint7",
					"help": "Switchpoint 7",
					"length": 3
				},
				{
					"type": "Integer",
					"name": "switchpoint8",
					"help": "Switchpoint 8",
					"length": 3
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ClimateControlScheduleV1)?.command === this.command;
		}

		constructor(data: Buffer | ClimateControlScheduleV1ScheduleSetData) {
			super(ScheduleSet, data);
		}
	};
}

export namespace ClimateControlScheduleV1 {
	export type ScheduleChangedGet = InstanceType<typeof ClimateControlScheduleV1.ScheduleChangedGet>;
	export type ScheduleChangedReport = InstanceType<typeof ClimateControlScheduleV1.ScheduleChangedReport>;
	export type ScheduleGet = InstanceType<typeof ClimateControlScheduleV1.ScheduleGet>;
	export type ScheduleOverrideGet = InstanceType<typeof ClimateControlScheduleV1.ScheduleOverrideGet>;
	export type ScheduleOverrideReport = InstanceType<typeof ClimateControlScheduleV1.ScheduleOverrideReport>;
	export type ScheduleOverrideSet = InstanceType<typeof ClimateControlScheduleV1.ScheduleOverrideSet>;
	export type ScheduleReport = InstanceType<typeof ClimateControlScheduleV1.ScheduleReport>;
	export type ScheduleSet = InstanceType<typeof ClimateControlScheduleV1.ScheduleSet>;
}
