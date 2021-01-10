/**
 * Command Class Meter Tbl Monitor, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum MeterTblMonitorV1Commands {
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

export interface MeterTblMonitorV1MeterTblStatusReportData {
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

export interface MeterTblMonitorV1MeterTblStatusDateGetData {
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

export interface MeterTblMonitorV1MeterTblStatusDepthGetData {
	statusEventLogDepth: number; // 1 byte unsigned integer
}

export interface MeterTblMonitorV1MeterTblStatusSupportedReportData {
	supportedOperatingStatus: number; // 3 byte unsigned integer
	statusEventLogDepth: number; // 1 byte unsigned integer
}

export interface MeterTblMonitorV1MeterTblCurrentDataGetData {
	datasetRequested: number; // 3 byte unsigned integer
}

export interface MeterTblMonitorV1MeterTblCurrentDataReportData {
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

export interface MeterTblMonitorV1MeterTblHistoricalDataGetData {
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

export interface MeterTblMonitorV1MeterTblHistoricalDataReportData {
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

export interface MeterTblMonitorV1MeterTblReportData {
	rateType: number; // properties1[7..6]
	meterType: number; // properties1[5..0]
	payMeter: PayMeterEnum; // properties2[3..0]
	datasetSupported: number; // 3 byte unsigned integer
	datasetHistorySupported: number; // 3 byte unsigned integer
	dataHistorySupported: number; // 3 byte unsigned integer
}

export interface MeterTblMonitorV1MeterTblTableIdReportData {
	meterIdCharacter: Buffer; // variable length
}

export interface MeterTblMonitorV1MeterTblTablePointAdmNoReportData {
	meterPointAdmNumberCharacter: Buffer; // variable length
}

export enum PayMeterEnum {
	Reserved = 0x0,
	Creditmeter = 0x1,
	PrepaymentMeter = 0x2,
	PrepaymentMeterDebt = 0x3,
}

export class MeterTblMonitorV1 extends CommandClassPacket<MeterTblMonitorV1Commands> {
	public static readonly commandClass = CommandClasses.MeterTblMonitor; // 0x3d (61)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(MeterTblMonitorV1, commandAndPayload);
	}

	public static readonly MeterTblStatusReport = class MeterTblStatusReport extends CommandPacket<MeterTblMonitorV1MeterTblStatusReportData> {
		public static readonly CommandClass = MeterTblMonitorV1;
		public static readonly command = 0x0b;
		public static readonly definition = convertFromJsonCommand({
			"command": 11,
			"name": "MeterTblStatusReport",
			"help": "Meter Tbl  Status  Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
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
					"type": "integer",
					"name": "currentOperatingStatus",
					"help": "Current Operating Status",
					"length": 3
				},
				{
					"type": "group",
					"name": "vg",
					"help": "vg",
					"length": {
						"lengthType": "ref",
						"from": {
							"ref": "reportsToFollow"
						}
					},
					"params": [
						{
							"type": "bitfield",
							"name": "properties1",
							"help": "Properties1",
							"length": 1,
							"fields": [
								{
									"fieldType": "boolean",
									"name": "type",
									"mask": 128,
									"shift": 7
								},
								{
									"fieldType": "integer",
									"name": "reserved",
									"mask": 96,
									"shift": 5,
									"reserved": true
								},
								{
									"fieldType": "integer",
									"name": "operatingStatusEventId",
									"mask": 31,
									"shift": 0
								}
							]
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
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | MeterTblMonitorV1MeterTblStatusReportData) {
			super(MeterTblStatusReport, data);
		}
	};

	public static readonly MeterTblStatusDateGet = class MeterTblStatusDateGet extends CommandPacket<MeterTblMonitorV1MeterTblStatusDateGetData> {
		public static readonly CommandClass = MeterTblMonitorV1;
		public static readonly command = 0x0a;
		public static readonly definition = convertFromJsonCommand({
			"command": 10,
			"name": "MeterTblStatusDateGet",
			"help": "Meter Tbl  Status Date Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "maximumReports",
					"help": "Maximum Reports",
					"length": 1
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
					"name": "stopYear",
					"help": "Stop Year",
					"length": 2
				},
				{
					"type": "integer",
					"name": "stopMonth",
					"help": "Stop Month",
					"length": 1
				},
				{
					"type": "integer",
					"name": "stopDay",
					"help": "Stop Day",
					"length": 1
				},
				{
					"type": "integer",
					"name": "stopHourLocalTime",
					"help": "Stop Hour Local Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "stopMinuteLocalTime",
					"help": "Stop Minute Local Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "stopSecondLocalTime",
					"help": "Stop Second Local Time",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | MeterTblMonitorV1MeterTblStatusDateGetData) {
			super(MeterTblStatusDateGet, data);
		}
	};

	public static readonly MeterTblStatusDepthGet = class MeterTblStatusDepthGet extends CommandPacket<MeterTblMonitorV1MeterTblStatusDepthGetData> {
		public static readonly CommandClass = MeterTblMonitorV1;
		public static readonly command = 0x09;
		public static readonly definition = convertFromJsonCommand({
			"command": 9,
			"name": "MeterTblStatusDepthGet",
			"help": "Meter Tbl  Status Depth Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "statusEventLogDepth",
					"help": "Status Event Log Depth",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | MeterTblMonitorV1MeterTblStatusDepthGetData) {
			super(MeterTblStatusDepthGet, data);
		}
	};

	public static readonly MeterTblStatusSupportedGet = class MeterTblStatusSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = MeterTblMonitorV1;
		public static readonly command = 0x07;
		public static readonly definition = convertFromJsonCommand({
			"command": 7,
			"name": "MeterTblStatusSupportedGet",
			"help": "Meter Tbl  Status Supported Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(MeterTblStatusSupportedGet, data);
		}
	};

	public static readonly MeterTblStatusSupportedReport = class MeterTblStatusSupportedReport extends CommandPacket<MeterTblMonitorV1MeterTblStatusSupportedReportData> {
		public static readonly CommandClass = MeterTblMonitorV1;
		public static readonly command = 0x08;
		public static readonly definition = convertFromJsonCommand({
			"command": 8,
			"name": "MeterTblStatusSupportedReport",
			"help": "Meter Tbl  Status Supported Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "supportedOperatingStatus",
					"help": "Supported Operating Status",
					"length": 3
				},
				{
					"type": "integer",
					"name": "statusEventLogDepth",
					"help": "Status Event Log Depth",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | MeterTblMonitorV1MeterTblStatusSupportedReportData) {
			super(MeterTblStatusSupportedReport, data);
		}
	};

	public static readonly MeterTblCurrentDataGet = class MeterTblCurrentDataGet extends CommandPacket<MeterTblMonitorV1MeterTblCurrentDataGetData> {
		public static readonly CommandClass = MeterTblMonitorV1;
		public static readonly command = 0x0c;
		public static readonly definition = convertFromJsonCommand({
			"command": 12,
			"name": "MeterTblCurrentDataGet",
			"help": "Meter Tbl Current Data Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "datasetRequested",
					"help": "Dataset Requested",
					"length": 3
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | MeterTblMonitorV1MeterTblCurrentDataGetData) {
			super(MeterTblCurrentDataGet, data);
		}
	};

	public static readonly MeterTblCurrentDataReport = class MeterTblCurrentDataReport extends CommandPacket<MeterTblMonitorV1MeterTblCurrentDataReportData> {
		public static readonly CommandClass = MeterTblMonitorV1;
		public static readonly command = 0x0d;
		public static readonly definition = convertFromJsonCommand({
			"command": 13,
			"name": "MeterTblCurrentDataReport",
			"help": "Meter Tbl Current Data Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
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
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "reserved",
							"mask": 252,
							"shift": 2,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "rateType",
							"mask": 3,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "dataset",
					"help": "Dataset",
					"length": 3
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
					"type": "group",
					"name": "vg",
					"help": "vg",
					"length": {
						"lengthType": "ref",
						"from": {
							"ref": "reportsToFollow"
						}
					},
					"params": [
						{
							"type": "bitfield",
							"name": "properties1",
							"help": "Properties1",
							"length": 1,
							"fields": [
								{
									"fieldType": "integer",
									"name": "currentPrecision",
									"mask": 224,
									"shift": 5
								},
								{
									"fieldType": "integer",
									"name": "currentScale",
									"mask": 31,
									"shift": 0
								}
							]
						},
						{
							"type": "integer",
							"name": "currentValue",
							"help": "Current Value",
							"length": 4
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | MeterTblMonitorV1MeterTblCurrentDataReportData) {
			super(MeterTblCurrentDataReport, data);
		}
	};

	public static readonly MeterTblHistoricalDataGet = class MeterTblHistoricalDataGet extends CommandPacket<MeterTblMonitorV1MeterTblHistoricalDataGetData> {
		public static readonly CommandClass = MeterTblMonitorV1;
		public static readonly command = 0x0e;
		public static readonly definition = convertFromJsonCommand({
			"command": 14,
			"name": "MeterTblHistoricalDataGet",
			"help": "Meter Tbl Historical Data Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "maximumReports",
					"help": "Maximum Reports",
					"length": 1
				},
				{
					"type": "integer",
					"name": "historicalDatasetRequested",
					"help": "Historical Dataset Requested",
					"length": 3
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
					"name": "stopYear",
					"help": "Stop Year",
					"length": 2
				},
				{
					"type": "integer",
					"name": "stopMonth",
					"help": "Stop Month",
					"length": 1
				},
				{
					"type": "integer",
					"name": "stopDay",
					"help": "Stop Day",
					"length": 1
				},
				{
					"type": "integer",
					"name": "stopHourLocalTime",
					"help": "Stop Hour Local Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "stopMinuteLocalTime",
					"help": "Stop Minute Local Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "stopSecondLocalTime",
					"help": "Stop Second Local Time",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | MeterTblMonitorV1MeterTblHistoricalDataGetData) {
			super(MeterTblHistoricalDataGet, data);
		}
	};

	public static readonly MeterTblHistoricalDataReport = class MeterTblHistoricalDataReport extends CommandPacket<MeterTblMonitorV1MeterTblHistoricalDataReportData> {
		public static readonly CommandClass = MeterTblMonitorV1;
		public static readonly command = 0x0f;
		public static readonly definition = convertFromJsonCommand({
			"command": 15,
			"name": "MeterTblHistoricalDataReport",
			"help": "Meter Tbl Historical Data Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
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
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "reserved",
							"mask": 252,
							"shift": 2,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "rateType",
							"mask": 3,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "dataset",
					"help": "Dataset",
					"length": 3
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
					"type": "group",
					"name": "vg",
					"help": "vg",
					"length": {
						"lengthType": "ref",
						"from": {
							"ref": "reportsToFollow"
						}
					},
					"params": [
						{
							"type": "bitfield",
							"name": "properties1",
							"help": "Properties1",
							"length": 1,
							"fields": [
								{
									"fieldType": "integer",
									"name": "historicalPrecision",
									"mask": 224,
									"shift": 5
								},
								{
									"fieldType": "integer",
									"name": "historicalScale",
									"mask": 31,
									"shift": 0
								}
							]
						},
						{
							"type": "integer",
							"name": "historicalValue",
							"help": "Historical Value",
							"length": 4
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | MeterTblMonitorV1MeterTblHistoricalDataReportData) {
			super(MeterTblHistoricalDataReport, data);
		}
	};

	public static readonly MeterTblReport = class MeterTblReport extends CommandPacket<MeterTblMonitorV1MeterTblReportData> {
		public static readonly CommandClass = MeterTblMonitorV1;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "MeterTblReport",
			"help": "Meter Tbl Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "rateType",
							"mask": 192,
							"shift": 6
						},
						{
							"fieldType": "integer",
							"name": "meterType",
							"mask": 63,
							"shift": 0
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
							"fieldType": "integer",
							"name": "reserved",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"fieldType": "enum",
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
					"type": "integer",
					"name": "datasetSupported",
					"help": "Dataset Supported",
					"length": 3
				},
				{
					"type": "integer",
					"name": "datasetHistorySupported",
					"help": "Dataset History Supported",
					"length": 3
				},
				{
					"type": "integer",
					"name": "dataHistorySupported",
					"help": "Data History Supported",
					"length": 3
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | MeterTblMonitorV1MeterTblReportData) {
			super(MeterTblReport, data);
		}
	};

	public static readonly MeterTblTableCapabilityGet = class MeterTblTableCapabilityGet extends CommandPacket<void> {
		public static readonly CommandClass = MeterTblMonitorV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "MeterTblTableCapabilityGet",
			"help": "Meter Tbl Table Capability Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(MeterTblTableCapabilityGet, data);
		}
	};

	public static readonly MeterTblTableIdGet = class MeterTblTableIdGet extends CommandPacket<void> {
		public static readonly CommandClass = MeterTblMonitorV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "MeterTblTableIdGet",
			"help": "Meter Tbl Table Id Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(MeterTblTableIdGet, data);
		}
	};

	public static readonly MeterTblTableIdReport = class MeterTblTableIdReport extends CommandPacket<MeterTblMonitorV1MeterTblTableIdReportData> {
		public static readonly CommandClass = MeterTblMonitorV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "MeterTblTableIdReport",
			"help": "Meter Tbl Table Id Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "reserved",
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"fieldType": "integer",
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
					"type": "blob",
					"name": "meterIdCharacter",
					"help": "Meter ID Character",
					"length": {
						"lengthType": "ref",
						"from": {
							"ref": "properties1.numberOfCharacters"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | MeterTblMonitorV1MeterTblTableIdReportData) {
			super(MeterTblTableIdReport, data);
		}
	};

	public static readonly MeterTblTablePointAdmNoGet = class MeterTblTablePointAdmNoGet extends CommandPacket<void> {
		public static readonly CommandClass = MeterTblMonitorV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "MeterTblTablePointAdmNoGet",
			"help": "Meter Tbl Table Point Adm No Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(MeterTblTablePointAdmNoGet, data);
		}
	};

	public static readonly MeterTblTablePointAdmNoReport = class MeterTblTablePointAdmNoReport extends CommandPacket<MeterTblMonitorV1MeterTblTablePointAdmNoReportData> {
		public static readonly CommandClass = MeterTblMonitorV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "MeterTblTablePointAdmNoReport",
			"help": "Meter Tbl Table Point Adm No Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "reserved",
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"fieldType": "integer",
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
					"type": "blob",
					"name": "meterPointAdmNumberCharacter",
					"help": "Meter Point Adm Number Character",
					"length": {
						"lengthType": "ref",
						"from": {
							"ref": "properties1.numberOfCharacters"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | MeterTblMonitorV1MeterTblTablePointAdmNoReportData) {
			super(MeterTblTablePointAdmNoReport, data);
		}
	};
}

export namespace MeterTblMonitorV1 {
	export type MeterTblStatusReport = InstanceType<typeof MeterTblMonitorV1.MeterTblStatusReport>;
	export type MeterTblStatusDateGet = InstanceType<typeof MeterTblMonitorV1.MeterTblStatusDateGet>;
	export type MeterTblStatusDepthGet = InstanceType<typeof MeterTblMonitorV1.MeterTblStatusDepthGet>;
	export type MeterTblStatusSupportedGet = InstanceType<typeof MeterTblMonitorV1.MeterTblStatusSupportedGet>;
	export type MeterTblStatusSupportedReport = InstanceType<typeof MeterTblMonitorV1.MeterTblStatusSupportedReport>;
	export type MeterTblCurrentDataGet = InstanceType<typeof MeterTblMonitorV1.MeterTblCurrentDataGet>;
	export type MeterTblCurrentDataReport = InstanceType<typeof MeterTblMonitorV1.MeterTblCurrentDataReport>;
	export type MeterTblHistoricalDataGet = InstanceType<typeof MeterTblMonitorV1.MeterTblHistoricalDataGet>;
	export type MeterTblHistoricalDataReport = InstanceType<typeof MeterTblMonitorV1.MeterTblHistoricalDataReport>;
	export type MeterTblReport = InstanceType<typeof MeterTblMonitorV1.MeterTblReport>;
	export type MeterTblTableCapabilityGet = InstanceType<typeof MeterTblMonitorV1.MeterTblTableCapabilityGet>;
	export type MeterTblTableIdGet = InstanceType<typeof MeterTblMonitorV1.MeterTblTableIdGet>;
	export type MeterTblTableIdReport = InstanceType<typeof MeterTblMonitorV1.MeterTblTableIdReport>;
	export type MeterTblTablePointAdmNoGet = InstanceType<typeof MeterTblMonitorV1.MeterTblTablePointAdmNoGet>;
	export type MeterTblTablePointAdmNoReport = InstanceType<typeof MeterTblMonitorV1.MeterTblTablePointAdmNoReport>;
}
