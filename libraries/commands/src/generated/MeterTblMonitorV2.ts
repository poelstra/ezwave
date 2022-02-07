/**
 * Command Class Meter Tbl Monitor, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum MeterTblMonitorV2Commands {
	MeterTblStatusReport = 0x0b,
	MeterTblStatusDateGet = 0x0a,
	MeterTblStatusDepthGet = 0x09,
	MeterTblStatusSupportedGet = 0x07,
	MeterTblStatusSupportedReport = 0x08,
	MeterTblCurrentDataGet = 0x0c,
	MeterTblCurrentDataReport = 0x0d,
	MeterTblHistoricalDataGet = 0x0e,
	MeterTblHistoricalDataReport = 0x0f,
	MeterTblReport = 0x06,
	MeterTblTableCapabilityGet = 0x05,
	MeterTblTableIdGet = 0x03,
	MeterTblTableIdReport = 0x04,
	MeterTblTablePointAdmNoGet = 0x01,
	MeterTblTablePointAdmNoReport = 0x02,
}

export interface MeterTblMonitorV2MeterTblStatusReportData {
	currentOperatingStatus: number; // 3 byte unsigned integer
	vg: Array<{ // variable length
		type: boolean; // properties1[7]
		operatingStatusEventId: number; // properties1[4..0]
		year: number; // 2 byte unsigned integer
		month: number; // 1 byte unsigned integer
		day: number; // 1 byte unsigned integer
		hourLocalTime: number; // 1 byte unsigned integer
		minuteLocalTime: number; // 1 byte unsigned integer
		secondLocalTime: number; // 1 byte unsigned integer
	}>;
}

export interface MeterTblMonitorV2MeterTblStatusDateGetData {
	maximumReports: number; // 1 byte unsigned integer
	startYear: number; // 2 byte unsigned integer
	startMonth: number; // 1 byte unsigned integer
	startDay: number; // 1 byte unsigned integer
	startHourLocalTime: number; // 1 byte unsigned integer
	startMinuteLocalTime: number; // 1 byte unsigned integer
	startSecondLocalTime: number; // 1 byte unsigned integer
	stopYear: number; // 2 byte unsigned integer
	stopMonth: number; // 1 byte unsigned integer
	stopDay: number; // 1 byte unsigned integer
	stopHourLocalTime: number; // 1 byte unsigned integer
	stopMinuteLocalTime: number; // 1 byte unsigned integer
	stopSecondLocalTime: number; // 1 byte unsigned integer
}

export interface MeterTblMonitorV2MeterTblStatusDepthGetData {
	statusEventLogDepth: number; // 1 byte unsigned integer
}

export interface MeterTblMonitorV2MeterTblStatusSupportedReportData {
	supportedOperatingStatus: number; // 3 byte unsigned integer
	statusEventLogDepth: number; // 1 byte unsigned integer
}

export interface MeterTblMonitorV2MeterTblCurrentDataGetData {
	datasetRequested: number; // 3 byte unsigned integer
}

export interface MeterTblMonitorV2MeterTblCurrentDataReportData {
	operatingStatusIndication: boolean; // properties1[7]
	rateType: number; // properties1[1..0]
	dataset: number; // 3 byte unsigned integer
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourLocalTime: number; // 1 byte unsigned integer
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
	vg: Array<{ // variable length
		currentPrecision: number; // properties1[7..5]
		currentScale: number; // properties1[4..0]
		currentValue: number; // 4 byte unsigned integer
	}>;
}

export interface MeterTblMonitorV2MeterTblHistoricalDataGetData {
	maximumReports: number; // 1 byte unsigned integer
	historicalDatasetRequested: number; // 3 byte unsigned integer
	startYear: number; // 2 byte unsigned integer
	startMonth: number; // 1 byte unsigned integer
	startDay: number; // 1 byte unsigned integer
	startHourLocalTime: number; // 1 byte unsigned integer
	startMinuteLocalTime: number; // 1 byte unsigned integer
	startSecondLocalTime: number; // 1 byte unsigned integer
	stopYear: number; // 2 byte unsigned integer
	stopMonth: number; // 1 byte unsigned integer
	stopDay: number; // 1 byte unsigned integer
	stopHourLocalTime: number; // 1 byte unsigned integer
	stopMinuteLocalTime: number; // 1 byte unsigned integer
	stopSecondLocalTime: number; // 1 byte unsigned integer
}

export interface MeterTblMonitorV2MeterTblHistoricalDataReportData {
	operatingStatusIndication: boolean; // properties1[7]
	rateType: number; // properties1[1..0]
	dataset: number; // 3 byte unsigned integer
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourLocalTime: number; // 1 byte unsigned integer
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
	vg: Array<{ // variable length
		historicalPrecision: number; // properties1[7..5]
		historicalScale: number; // properties1[4..0]
		historicalValue: number; // 4 byte unsigned integer
	}>;
}

export interface MeterTblMonitorV2MeterTblReportData {
	rateType: number; // properties1[7..6]
	meterType: number; // properties1[5..0]
	payMeter: PayMeterEnum; // properties2[3..0]
	datasetSupported: number; // 3 byte unsigned integer
	datasetHistorySupported: number; // 3 byte unsigned integer
	dataHistorySupported: number; // 3 byte unsigned integer
}

export interface MeterTblMonitorV2MeterTblTableIdReportData {
	meterIdCharacter: Buffer; // variable length
}

export interface MeterTblMonitorV2MeterTblTablePointAdmNoReportData {
	meterPointAdmNumberCharacter: Buffer; // variable length
}

export enum PayMeterEnum {
	Reserved = 0x0,
	Creditmeter = 0x1,
	PrepaymentMeter = 0x2,
	PrepaymentMeterDebt = 0x3,
}

export class MeterTblMonitorV2 extends CommandClassPacket<MeterTblMonitorV2Commands> {
	public static readonly commandClass = CommandClasses.MeterTblMonitor; // 0x3d (61)
	public static readonly version = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(MeterTblMonitorV2, commandAndPayload);
	}
}

export class MeterTblStatusReport extends CommandPacket<MeterTblMonitorV2MeterTblStatusReportData> {
	public static readonly CommandClass = MeterTblMonitorV2;
	public static readonly command = 0x0b; // 11
	public static readonly definition = convertFromJsonCommand({
		"command": 11,
		"name": "MeterTblStatusReport",
		"help": "Meter Tbl  Status  Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "reportsToFollow",
				"help": "Reports to follow",
				"length": 1,
				"lengthOf": {
					"refs": [
						"vg"
					]
				},
				"isAutogenerated": true
			},
			{
				"type": "Integer",
				"name": "currentOperatingStatus",
				"help": "Current Operating Status",
				"length": 3
			},
			{
				"type": "Group",
				"name": "vg",
				"help": "vg",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "reportsToFollow"
					}
				},
				"params": [
					{
						"type": "Bitfield",
						"name": "properties1",
						"help": "Properties1",
						"length": 1,
						"fields": [
							{
								"fieldType": "Boolean",
								"name": "type",
								"mask": 128,
								"shift": 7
							},
							{
								"fieldType": "Integer",
								"name": "reserved",
								"mask": 96,
								"shift": 5,
								"reserved": true
							},
							{
								"fieldType": "Integer",
								"name": "operatingStatusEventId",
								"mask": 31,
								"shift": 0
							}
						]
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
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterTblMonitorV2)?.command === this.command;
	}

	public constructor(data: Buffer | MeterTblMonitorV2MeterTblStatusReportData) {
		super(MeterTblStatusReport, data);
	}
};

export class MeterTblStatusDateGet extends CommandPacket<MeterTblMonitorV2MeterTblStatusDateGetData> {
	public static readonly CommandClass = MeterTblMonitorV2;
	public static readonly command = 0x0a; // 10
	public static readonly definition = convertFromJsonCommand({
		"command": 10,
		"name": "MeterTblStatusDateGet",
		"help": "Meter Tbl  Status Date Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "maximumReports",
				"help": "Maximum Reports",
				"length": 1
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
				"name": "stopYear",
				"help": "Stop Year",
				"length": 2
			},
			{
				"type": "Integer",
				"name": "stopMonth",
				"help": "Stop Month",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "stopDay",
				"help": "Stop Day",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "stopHourLocalTime",
				"help": "Stop Hour Local Time",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "stopMinuteLocalTime",
				"help": "Stop Minute Local Time",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "stopSecondLocalTime",
				"help": "Stop Second Local Time",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterTblMonitorV2)?.command === this.command;
	}

	public constructor(data: Buffer | MeterTblMonitorV2MeterTblStatusDateGetData) {
		super(MeterTblStatusDateGet, data);
	}
};

export class MeterTblStatusDepthGet extends CommandPacket<MeterTblMonitorV2MeterTblStatusDepthGetData> {
	public static readonly CommandClass = MeterTblMonitorV2;
	public static readonly command = 0x09; // 9
	public static readonly definition = convertFromJsonCommand({
		"command": 9,
		"name": "MeterTblStatusDepthGet",
		"help": "Meter Tbl  Status Depth Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "statusEventLogDepth",
				"help": "Status Event Log Depth",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterTblMonitorV2)?.command === this.command;
	}

	public constructor(data: Buffer | MeterTblMonitorV2MeterTblStatusDepthGetData) {
		super(MeterTblStatusDepthGet, data);
	}
};

export class MeterTblStatusSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass = MeterTblMonitorV2;
	public static readonly command = 0x07; // 7
	public static readonly definition = convertFromJsonCommand({
		"command": 7,
		"name": "MeterTblStatusSupportedGet",
		"help": "Meter Tbl  Status Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterTblMonitorV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(MeterTblStatusSupportedGet, data);
	}
};

export class MeterTblStatusSupportedReport extends CommandPacket<MeterTblMonitorV2MeterTblStatusSupportedReportData> {
	public static readonly CommandClass = MeterTblMonitorV2;
	public static readonly command = 0x08; // 8
	public static readonly definition = convertFromJsonCommand({
		"command": 8,
		"name": "MeterTblStatusSupportedReport",
		"help": "Meter Tbl  Status Supported Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "supportedOperatingStatus",
				"help": "Supported Operating Status",
				"length": 3
			},
			{
				"type": "Integer",
				"name": "statusEventLogDepth",
				"help": "Status Event Log Depth",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterTblMonitorV2)?.command === this.command;
	}

	public constructor(data: Buffer | MeterTblMonitorV2MeterTblStatusSupportedReportData) {
		super(MeterTblStatusSupportedReport, data);
	}
};

export class MeterTblCurrentDataGet extends CommandPacket<MeterTblMonitorV2MeterTblCurrentDataGetData> {
	public static readonly CommandClass = MeterTblMonitorV2;
	public static readonly command = 0x0c; // 12
	public static readonly definition = convertFromJsonCommand({
		"command": 12,
		"name": "MeterTblCurrentDataGet",
		"help": "Meter Tbl Current Data Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "datasetRequested",
				"help": "Dataset Requested",
				"length": 3
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterTblMonitorV2)?.command === this.command;
	}

	public constructor(data: Buffer | MeterTblMonitorV2MeterTblCurrentDataGetData) {
		super(MeterTblCurrentDataGet, data);
	}
};

export class MeterTblCurrentDataReport extends CommandPacket<MeterTblMonitorV2MeterTblCurrentDataReportData> {
	public static readonly CommandClass = MeterTblMonitorV2;
	public static readonly command = 0x0d; // 13
	public static readonly definition = convertFromJsonCommand({
		"command": 13,
		"name": "MeterTblCurrentDataReport",
		"help": "Meter Tbl Current Data Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "reportsToFollow",
				"help": "Reports to Follow",
				"length": 1,
				"lengthOf": {
					"refs": [
						"vg"
					]
				},
				"isAutogenerated": true
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "operatingStatusIndication",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 124,
						"shift": 2,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "rateType",
						"mask": 3,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "dataset",
				"help": "Dataset",
				"length": 3
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
				"type": "Group",
				"name": "vg",
				"help": "vg",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "reportsToFollow"
					}
				},
				"params": [
					{
						"type": "Bitfield",
						"name": "properties1",
						"help": "Properties1",
						"length": 1,
						"fields": [
							{
								"fieldType": "Integer",
								"name": "currentPrecision",
								"mask": 224,
								"shift": 5
							},
							{
								"fieldType": "Integer",
								"name": "currentScale",
								"mask": 31,
								"shift": 0
							}
						]
					},
					{
						"type": "Integer",
						"name": "currentValue",
						"help": "Current Value",
						"length": 4
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterTblMonitorV2)?.command === this.command;
	}

	public constructor(data: Buffer | MeterTblMonitorV2MeterTblCurrentDataReportData) {
		super(MeterTblCurrentDataReport, data);
	}
};

export class MeterTblHistoricalDataGet extends CommandPacket<MeterTblMonitorV2MeterTblHistoricalDataGetData> {
	public static readonly CommandClass = MeterTblMonitorV2;
	public static readonly command = 0x0e; // 14
	public static readonly definition = convertFromJsonCommand({
		"command": 14,
		"name": "MeterTblHistoricalDataGet",
		"help": "Meter Tbl Historical Data Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "maximumReports",
				"help": "Maximum Reports",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "historicalDatasetRequested",
				"help": "Historical Dataset Requested",
				"length": 3
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
				"name": "stopYear",
				"help": "Stop Year",
				"length": 2
			},
			{
				"type": "Integer",
				"name": "stopMonth",
				"help": "Stop Month",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "stopDay",
				"help": "Stop Day",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "stopHourLocalTime",
				"help": "Stop Hour Local Time",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "stopMinuteLocalTime",
				"help": "Stop Minute Local Time",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "stopSecondLocalTime",
				"help": "Stop Second Local Time",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterTblMonitorV2)?.command === this.command;
	}

	public constructor(data: Buffer | MeterTblMonitorV2MeterTblHistoricalDataGetData) {
		super(MeterTblHistoricalDataGet, data);
	}
};

export class MeterTblHistoricalDataReport extends CommandPacket<MeterTblMonitorV2MeterTblHistoricalDataReportData> {
	public static readonly CommandClass = MeterTblMonitorV2;
	public static readonly command = 0x0f; // 15
	public static readonly definition = convertFromJsonCommand({
		"command": 15,
		"name": "MeterTblHistoricalDataReport",
		"help": "Meter Tbl Historical Data Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "reportsToFollow",
				"help": "Reports to Follow",
				"length": 1,
				"lengthOf": {
					"refs": [
						"vg"
					]
				},
				"isAutogenerated": true
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "operatingStatusIndication",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 124,
						"shift": 2,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "rateType",
						"mask": 3,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "dataset",
				"help": "Dataset",
				"length": 3
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
				"type": "Group",
				"name": "vg",
				"help": "vg",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "reportsToFollow"
					}
				},
				"params": [
					{
						"type": "Bitfield",
						"name": "properties1",
						"help": "Properties1",
						"length": 1,
						"fields": [
							{
								"fieldType": "Integer",
								"name": "historicalPrecision",
								"mask": 224,
								"shift": 5
							},
							{
								"fieldType": "Integer",
								"name": "historicalScale",
								"mask": 31,
								"shift": 0
							}
						]
					},
					{
						"type": "Integer",
						"name": "historicalValue",
						"help": "Historical Value",
						"length": 4
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterTblMonitorV2)?.command === this.command;
	}

	public constructor(data: Buffer | MeterTblMonitorV2MeterTblHistoricalDataReportData) {
		super(MeterTblHistoricalDataReport, data);
	}
};

export class MeterTblReport extends CommandPacket<MeterTblMonitorV2MeterTblReportData> {
	public static readonly CommandClass = MeterTblMonitorV2;
	public static readonly command = 0x06; // 6
	public static readonly definition = convertFromJsonCommand({
		"command": 6,
		"name": "MeterTblReport",
		"help": "Meter Tbl Report",
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
						"name": "rateType",
						"mask": 192,
						"shift": 6
					},
					{
						"fieldType": "Integer",
						"name": "meterType",
						"mask": 63,
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
						"name": "reserved",
						"mask": 240,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Enum",
						"name": "payMeter",
						"mask": 15,
						"shift": 0,
						"values": {
							"0": {
								"name": "Reserved",
								"help": "Reserved"
							},
							"1": {
								"name": "Creditmeter",
								"help": "Creditmeter"
							},
							"2": {
								"name": "PrepaymentMeter",
								"help": "Prepayment meter"
							},
							"3": {
								"name": "PrepaymentMeterDebt",
								"help": "Prepayment meter debt"
							}
						}
					}
				]
			},
			{
				"type": "Integer",
				"name": "datasetSupported",
				"help": "Dataset Supported",
				"length": 3
			},
			{
				"type": "Integer",
				"name": "datasetHistorySupported",
				"help": "Dataset History Supported",
				"length": 3
			},
			{
				"type": "Integer",
				"name": "dataHistorySupported",
				"help": "Data History Supported",
				"length": 3
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterTblMonitorV2)?.command === this.command;
	}

	public constructor(data: Buffer | MeterTblMonitorV2MeterTblReportData) {
		super(MeterTblReport, data);
	}
};

export class MeterTblTableCapabilityGet extends CommandPacket<void> {
	public static readonly CommandClass = MeterTblMonitorV2;
	public static readonly command = 0x05; // 5
	public static readonly definition = convertFromJsonCommand({
		"command": 5,
		"name": "MeterTblTableCapabilityGet",
		"help": "Meter Tbl Table Capability Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterTblMonitorV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(MeterTblTableCapabilityGet, data);
	}
};

export class MeterTblTableIdGet extends CommandPacket<void> {
	public static readonly CommandClass = MeterTblMonitorV2;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "MeterTblTableIdGet",
		"help": "Meter Tbl Table Id Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterTblMonitorV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(MeterTblTableIdGet, data);
	}
};

export class MeterTblTableIdReport extends CommandPacket<MeterTblMonitorV2MeterTblTableIdReportData> {
	public static readonly CommandClass = MeterTblMonitorV2;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
		"command": 4,
		"name": "MeterTblTableIdReport",
		"help": "Meter Tbl Table Id Report",
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
						"name": "numberOfCharacters",
						"mask": 31,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"meterIdCharacter"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "meterIdCharacter",
				"help": "Meter ID Character",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.numberOfCharacters"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterTblMonitorV2)?.command === this.command;
	}

	public constructor(data: Buffer | MeterTblMonitorV2MeterTblTableIdReportData) {
		super(MeterTblTableIdReport, data);
	}
};

export class MeterTblTablePointAdmNoGet extends CommandPacket<void> {
	public static readonly CommandClass = MeterTblMonitorV2;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "MeterTblTablePointAdmNoGet",
		"help": "Meter Tbl Table Point Adm No Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterTblMonitorV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(MeterTblTablePointAdmNoGet, data);
	}
};

export class MeterTblTablePointAdmNoReport extends CommandPacket<MeterTblMonitorV2MeterTblTablePointAdmNoReportData> {
	public static readonly CommandClass = MeterTblMonitorV2;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "MeterTblTablePointAdmNoReport",
		"help": "Meter Tbl Table Point Adm No Report",
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
						"name": "numberOfCharacters",
						"mask": 31,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"meterPointAdmNumberCharacter"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "meterPointAdmNumberCharacter",
				"help": "Meter Point Adm Number Character",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.numberOfCharacters"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterTblMonitorV2)?.command === this.command;
	}

	public constructor(data: Buffer | MeterTblMonitorV2MeterTblTablePointAdmNoReportData) {
		super(MeterTblTablePointAdmNoReport, data);
	}
};
