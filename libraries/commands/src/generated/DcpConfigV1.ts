/**
 * Command Class Dcp Config, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum DcpConfigV1Commands {
	DcpListRemove = 0x04,
	DcpListSet = 0x03,
	DcpListSupportedGet = 0x01,
	DcpListSupportedReport = 0x02,
}

export interface DcpConfigV1DcpListRemoveData {
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourLocalTime: number; // 1 byte unsigned integer
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
}

export interface DcpConfigV1DcpListSetData {
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourLocalTime: number; // 1 byte unsigned integer
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
	dcpRateId: number; // 1 byte unsigned integer
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

export interface DcpConfigV1DcpListSupportedReportData {
	dcpListSize: number; // 1 byte unsigned integer
	freeDcpListEntries: number; // 1 byte unsigned integer
}

export class DcpConfigV1 extends CommandClassPacket<DcpConfigV1Commands> {
	public static readonly commandClass: number = CommandClasses.DcpConfig; // 0x3a (58)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(DcpConfigV1, commandAndPayload);
	}
}

export class DcpListRemove extends CommandPacket<DcpConfigV1DcpListRemoveData> {
	public static readonly CommandClass: typeof DcpConfigV1 = DcpConfigV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "DcpListRemove",
		"help": "Dcp List Remove",
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
		return packet.tryAs(DcpConfigV1)?.command === this.command;
	}

	public constructor(data: Buffer | DcpConfigV1DcpListRemoveData) {
		super(DcpListRemove, data);
	}
};

export class DcpListSet extends CommandPacket<DcpConfigV1DcpListSetData> {
	public static readonly CommandClass: typeof DcpConfigV1 = DcpConfigV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "DcpListSet",
		"help": "Dcp List Set",
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
				"name": "dcpRateId",
				"help": "DCP Rate ID",
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
						"ref": "properties1.numberOfDc"
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
		return packet.tryAs(DcpConfigV1)?.command === this.command;
	}

	public constructor(data: Buffer | DcpConfigV1DcpListSetData) {
		super(DcpListSet, data);
	}
};

export class DcpListSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof DcpConfigV1 = DcpConfigV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "DcpListSupportedGet",
		"help": "Dcp List Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DcpConfigV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(DcpListSupportedGet, data);
	}
};

export class DcpListSupportedReport extends CommandPacket<DcpConfigV1DcpListSupportedReportData> {
	public static readonly CommandClass: typeof DcpConfigV1 = DcpConfigV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "DcpListSupportedReport",
		"help": "Dcp List Supported Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "dcpListSize",
				"help": "DCP List Size",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "freeDcpListEntries",
				"help": "Free DCP List entries",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(DcpConfigV1)?.command === this.command;
	}

	public constructor(data: Buffer | DcpConfigV1DcpListSupportedReportData) {
		super(DcpListSupportedReport, data);
	}
};
