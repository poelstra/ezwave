/**
 * Command Class Dcp Monitor, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourLocalTime: number; // 1 byte unsigned integer
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
	dcpId: number; // 1 byte unsigned integer
	numberOfDc: number; // properties1[1..0]
	vg1: Array<{ // variable length
		genericDeviceClass: number; // 1 byte unsigned integer
		specificDeviceClass: number; // 1 byte unsigned integer
	}>;
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
	public static readonly commandClass: number = CommandClasses.DcpMonitor; // 0x3b (59)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(DcpMonitorV1, commandAndPayload);
	}
}

export class DcpEventStatusGet extends CommandPacket<DcpMonitorV1DcpEventStatusGetData> {
	public static readonly CommandClass: typeof DcpMonitorV1 = DcpMonitorV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "DcpEventStatusGet",
		"help": "Dcp Event Status Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "year",
				"help": "Year",
				"length": 2
			},
			{
				"type": "Integer",
				"name": "month",
				"help": "Month",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "day",
				"help": "Day",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "hourLocalTime",
				"help": "Hour Local Time",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "minuteLocalTime",
				"help": "Minute Local Time",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "secondLocalTime",
				"help": "Second Local Time",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DcpMonitorV1)?.command === this.command;
	}

	public constructor(data: Buffer | DcpMonitorV1DcpEventStatusGetData) {
		super(DcpEventStatusGet, data);
	}
};

export class DcpEventStatusReport extends CommandPacket<DcpMonitorV1DcpEventStatusReportData> {
	public static readonly CommandClass: typeof DcpMonitorV1 = DcpMonitorV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "DcpEventStatusReport",
		"help": "Dcp Event Status Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "year",
				"help": "Year",
				"length": 2
			},
			{
				"type": "Integer",
				"name": "month",
				"help": "Month",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "day",
				"help": "Day",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "hourLocalTime",
				"help": "Hour Local Time",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "minuteLocalTime",
				"help": "Minute Local Time",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "secondLocalTime",
				"help": "Second Local Time",
				"length": 1
			},
			{
				"type": "Integer",
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DcpMonitorV1)?.command === this.command;
	}

	public constructor(data: Buffer | DcpMonitorV1DcpEventStatusReportData) {
		super(DcpEventStatusReport, data);
	}
};

export class DcpListGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof DcpMonitorV1 = DcpMonitorV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "DcpListGet",
		"help": "Dcp List Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DcpMonitorV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(DcpListGet, data);
	}
};

export class DcpListReport extends CommandPacket<DcpMonitorV1DcpListReportData> {
	public static readonly CommandClass: typeof DcpMonitorV1 = DcpMonitorV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "DcpListReport",
		"help": "Dcp List Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "reportsToFollow",
				"help": "Reports to Follow",
				"length": 1,
				"lengthOf": {
					"refs": [
						"vg1"
					]
				},
				"isAutogenerated": true
			},
			{
				"type": "Integer",
				"name": "year",
				"help": "Year",
				"length": 2
			},
			{
				"type": "Integer",
				"name": "month",
				"help": "Month",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "day",
				"help": "Day",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "hourLocalTime",
				"help": "Hour Local Time",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "minuteLocalTime",
				"help": "Minute Local Time",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "secondLocalTime",
				"help": "Second Local Time",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "dcpId",
				"help": "DCP ID",
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
						"name": "reserved",
						"mask": 252,
						"shift": 2,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "numberOfDc",
						"mask": 3,
						"shift": 0
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
						"ref": "reportsToFollow"
					}
				},
				"params": [
					{
						"type": "Integer",
						"name": "genericDeviceClass",
						"help": "Generic Device Class",
						"length": 1,
						"valueType": "GenericDevice"
					},
					{
						"type": "Integer",
						"name": "specificDeviceClass",
						"help": "Specific Device Class",
						"length": 1,
						"valueType": "SpecificDevice"
					}
				]
			},
			{
				"type": "Integer",
				"name": "startYear",
				"help": "Start Year",
				"length": 2
			},
			{
				"type": "Integer",
				"name": "startMonth",
				"help": "Start Month",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "startDay",
				"help": "Start Day",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "startHourLocalTime",
				"help": "Start Hour Local Time",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "startMinuteLocalTime",
				"help": "Start Minute Local Time",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "startSecondLocalTime",
				"help": "Start Second Local Time",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "durationHourTime",
				"help": "Duration Hour Time",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "durationMinuteTime",
				"help": "Duration Minute Time",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "durationSecondTime",
				"help": "Duration Second Time",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "eventPriority",
				"help": "Event Priority",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "loadShedding",
				"help": "Load shedding",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "startAssociationGroup",
				"help": "Start Association Group",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "stopAssociationGroup",
				"help": "Stop Association Group",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "randomizationInterval",
				"help": "Randomization interval",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DcpMonitorV1)?.command === this.command;
	}

	public constructor(data: Buffer | DcpMonitorV1DcpListReportData) {
		super(DcpListReport, data);
	}
};
