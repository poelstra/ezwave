/**
 * Command Class Dcp Monitor, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum DcpMonitorV1Commands {
	DcpEventStatusGet = 0x03,
	DcpEventStatusReport = 0x04,
	DcpListGet = 0x01,
	DcpListReport = 0x02,
}

export interface DcpMonitorV1DcpEventStatusGetData {
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourLocalTime: number; // 1 byte unsigned integer
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
}

export interface DcpMonitorV1DcpEventStatusReportData {
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourLocalTime: number; // 1 byte unsigned integer
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
	eventStatus: number; // 1 byte unsigned integer
}

export interface DcpMonitorV1DcpListReportData {
	reportsToFollow: number; // 1 byte unsigned integer
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourLocalTime: number; // 1 byte unsigned integer
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
	dcpId: number; // 1 byte unsigned integer
	numberOfDC: number; // properties1[1..0]
	// TODO param vg1 type group
	startYear: number; // 2 byte unsigned integer
	startMonth: number; // 1 byte unsigned integer
	startDay: number; // 1 byte unsigned integer
	startHourLocalTime: number; // 1 byte unsigned integer
	startMinuteLocalTime: number; // 1 byte unsigned integer
	startSecondLocalTime: number; // 1 byte unsigned integer
	durationHourTime: number; // 1 byte unsigned integer
	durationMinuteTime: number; // 1 byte unsigned integer
	durationSecondTime: number; // 1 byte unsigned integer
	eventPriority: number; // 1 byte unsigned integer
	loadShedding: number; // 1 byte unsigned integer
	startAssociationGroup: number; // 1 byte unsigned integer
	stopAssociationGroup: number; // 1 byte unsigned integer
	randomizationInterval: number; // 1 byte unsigned integer
}

export class DcpMonitorV1 extends CommandClassPacket<DcpMonitorV1Commands> {
	public static readonly commandClass = CommandClasses.DcpMonitor; // 0x3b (59)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(DcpMonitorV1, commandAndPayload);
	}

	public static readonly DcpEventStatusGet = class DcpEventStatusGet extends CommandPacket<DcpMonitorV1DcpEventStatusGetData> {
		public static readonly CommandClass = DcpMonitorV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "DcpEventStatusGet",
			"help": "Dcp Event Status Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "year",
					"help": "Year",
					"length": 2
				},
				{
					"type": "integer",
					"name": "month",
					"help": "Month",
					"length": 1
				},
				{
					"type": "integer",
					"name": "day",
					"help": "Day",
					"length": 1
				},
				{
					"type": "integer",
					"name": "hourLocalTime",
					"help": "Hour Local Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "minuteLocalTime",
					"help": "Minute Local Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "secondLocalTime",
					"help": "Second Local Time",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(DcpMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | DcpMonitorV1DcpEventStatusGetData) {
			super(DcpEventStatusGet, data);
		}
	};

	public static readonly DcpEventStatusReport = class DcpEventStatusReport extends CommandPacket<DcpMonitorV1DcpEventStatusReportData> {
		public static readonly CommandClass = DcpMonitorV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "DcpEventStatusReport",
			"help": "Dcp Event Status Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "year",
					"help": "Year",
					"length": 2
				},
				{
					"type": "integer",
					"name": "month",
					"help": "Month",
					"length": 1
				},
				{
					"type": "integer",
					"name": "day",
					"help": "Day",
					"length": 1
				},
				{
					"type": "integer",
					"name": "hourLocalTime",
					"help": "Hour Local Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "minuteLocalTime",
					"help": "Minute Local Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "secondLocalTime",
					"help": "Second Local Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "eventStatus",
					"help": "Event status",
					"length": 1,
					"values": {
						"0": {
							"name": "Reserved",
							"help": "Reserved"
						},
						"1": {
							"name": "EventStarted",
							"help": "Event Started"
						},
						"2": {
							"name": "EventCompleted",
							"help": "Event Completed"
						},
						"3": {
							"name": "EventRejected",
							"help": "Event Rejected"
						},
						"4": {
							"name": "EventNotApplicable",
							"help": "Event not Applicable"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(DcpMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | DcpMonitorV1DcpEventStatusReportData) {
			super(DcpEventStatusReport, data);
		}
	};

	public static readonly DcpListGet = class DcpListGet extends CommandPacket<void> {
		public static readonly CommandClass = DcpMonitorV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "DcpListGet",
			"help": "Dcp List Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(DcpMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(DcpListGet, data);
		}
	};

	public static readonly DcpListReport = class DcpListReport extends CommandPacket<DcpMonitorV1DcpListReportData> {
		public static readonly CommandClass = DcpMonitorV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "DcpListReport",
			"help": "Dcp List Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "reportsToFollow",
					"help": "Reports to Follow",
					"length": 1
				},
				{
					"type": "integer",
					"name": "year",
					"help": "Year",
					"length": 2
				},
				{
					"type": "integer",
					"name": "month",
					"help": "Month",
					"length": 1
				},
				{
					"type": "integer",
					"name": "day",
					"help": "Day",
					"length": 1
				},
				{
					"type": "integer",
					"name": "hourLocalTime",
					"help": "Hour Local Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "minuteLocalTime",
					"help": "Minute Local Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "secondLocalTime",
					"help": "Second Local Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "dcpId",
					"help": "DCP ID",
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
							"name": "reserved",
							"mask": 252,
							"shift": 2,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "numberOfDC",
							"mask": 3,
							"shift": 0
						}
					]
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"ref": "reportsToFollow"
					},
					"params": [
						{
							"type": "integer",
							"name": "genericDeviceClass",
							"help": "Generic Device Class",
							"length": 1,
							"valueType": "GEN_DEV_REF"
						},
						{
							"type": "integer",
							"name": "specificDeviceClass",
							"help": "Specific Device Class",
							"length": 1,
							"valueType": "SPEC_DEV_REF"
						}
					]
				},
				{
					"type": "integer",
					"name": "startYear",
					"help": "Start Year",
					"length": 2
				},
				{
					"type": "integer",
					"name": "startMonth",
					"help": "Start Month",
					"length": 1
				},
				{
					"type": "integer",
					"name": "startDay",
					"help": "Start Day",
					"length": 1
				},
				{
					"type": "integer",
					"name": "startHourLocalTime",
					"help": "Start Hour Local Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "startMinuteLocalTime",
					"help": "Start Minute Local Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "startSecondLocalTime",
					"help": "Start Second Local Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "durationHourTime",
					"help": "Duration Hour Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "durationMinuteTime",
					"help": "Duration Minute Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "durationSecondTime",
					"help": "Duration Second Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "eventPriority",
					"help": "Event Priority",
					"length": 1
				},
				{
					"type": "integer",
					"name": "loadShedding",
					"help": "Load shedding",
					"length": 1
				},
				{
					"type": "integer",
					"name": "startAssociationGroup",
					"help": "Start Association Group",
					"length": 1
				},
				{
					"type": "integer",
					"name": "stopAssociationGroup",
					"help": "Stop Association Group",
					"length": 1
				},
				{
					"type": "integer",
					"name": "randomizationInterval",
					"help": "Randomization interval",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(DcpMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | DcpMonitorV1DcpListReportData) {
			super(DcpListReport, data);
		}
	};
}

export namespace DcpMonitorV1 {
	export type DcpEventStatusGet = InstanceType<typeof DcpMonitorV1.DcpEventStatusGet>;
	export type DcpEventStatusReport = InstanceType<typeof DcpMonitorV1.DcpEventStatusReport>;
	export type DcpListGet = InstanceType<typeof DcpMonitorV1.DcpListGet>;
	export type DcpListReport = InstanceType<typeof DcpMonitorV1.DcpListReport>;
}
