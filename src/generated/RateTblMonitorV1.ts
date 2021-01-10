/**
 * Command Class Rate Tbl Monitor, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum RateTblMonitorV1Commands {
	RateTblActiveRateGet = 0x05,
	RateTblActiveRateReport = 0x06,
	RateTblCurrentDataGet = 0x07,
	RateTblCurrentDataReport = 0x08,
	RateTblGet = 0x03,
	RateTblHistoricalDataGet = 0x09,
	RateTblHistoricalDataReport = 0x0a,
	RateTblReport = 0x04,
	RateTblSupportedGet = 0x01,
	RateTblSupportedReport = 0x02,
}

export interface RateTblMonitorV1RateTblActiveRateReportData {
	rateParameterSetId: number; // 1 byte unsigned integer
}

export interface RateTblMonitorV1RateTblCurrentDataGetData {
	rateParameterSetId: number; // 1 byte unsigned integer
	datasetRequested: number; // 3 byte unsigned integer
}

export interface RateTblMonitorV1RateTblCurrentDataReportData {
	rateParameterSetId: number; // 1 byte unsigned integer
	dataset: number; // 3 byte unsigned integer
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourLocalTime: number; // 1 byte unsigned integer
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
	// TODO param vg type group
}

export interface RateTblMonitorV1RateTblGetData {
	rateParameterSetId: number; // 1 byte unsigned integer
}

export interface RateTblMonitorV1RateTblHistoricalDataGetData {
	maximumReports: number; // 1 byte unsigned integer
	rateParameterSetId: number; // 1 byte unsigned integer
	datasetRequested: number; // 3 byte unsigned integer
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

export interface RateTblMonitorV1RateTblHistoricalDataReportData {
	rateParameterSetId: number; // 1 byte unsigned integer
	dataset: number; // 3 byte unsigned integer
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourLocalTime: number; // 1 byte unsigned integer
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
	// TODO param vg type group
}

export interface RateTblMonitorV1RateTblReportData {
	rateParameterSetId: number; // 1 byte unsigned integer
	rateType: number; // properties1[6..5]
	rateCharacter: Buffer; // variable length
	startHourLocalTime: number; // 1 byte unsigned integer
	startMinuteLocalTime: number; // 1 byte unsigned integer
	durationMinute: number; // 2 byte unsigned integer
	consumptionPrecision: number; // properties2[7..5]
	consumptionScale: number; // properties2[4..0]
	minConsumptionValue: number; // 4 byte unsigned integer
	maxConsumptionValue: number; // 4 byte unsigned integer
	maxDemandPrecision: number; // properties3[7..5]
	maxDemandScale: number; // properties3[4..0]
	maxDemandValue: number; // 4 byte unsigned integer
	dcpRateId: number; // 1 byte unsigned integer
}

export interface RateTblMonitorV1RateTblSupportedReportData {
	ratesSupported: number; // 1 byte unsigned integer
	parameterSetSupportedBitMask: number; // 2 byte unsigned integer
}

export class RateTblMonitorV1 extends CommandClassPacket<RateTblMonitorV1Commands> {
	public static readonly commandClass = CommandClasses.RateTblMonitor; // 0x49 (73)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(RateTblMonitorV1, commandAndPayload);
	}

	public static readonly RateTblActiveRateGet = class RateTblActiveRateGet extends CommandPacket<void> {
		public static readonly CommandClass = RateTblMonitorV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "RateTblActiveRateGet",
			"help": "Rate Tbl Active Rate  Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(RateTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(RateTblActiveRateGet, data);
		}
	};

	public static readonly RateTblActiveRateReport = class RateTblActiveRateReport extends CommandPacket<RateTblMonitorV1RateTblActiveRateReportData> {
		public static readonly CommandClass = RateTblMonitorV1;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "RateTblActiveRateReport",
			"help": "Rate Tbl Active Rate  Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "rateParameterSetId",
					"help": "Rate Parameter Set ID",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(RateTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | RateTblMonitorV1RateTblActiveRateReportData) {
			super(RateTblActiveRateReport, data);
		}
	};

	public static readonly RateTblCurrentDataGet = class RateTblCurrentDataGet extends CommandPacket<RateTblMonitorV1RateTblCurrentDataGetData> {
		public static readonly CommandClass = RateTblMonitorV1;
		public static readonly command = 0x07;
		public static readonly definition = convertFromJsonCommand({
			"command": 7,
			"name": "RateTblCurrentDataGet",
			"help": "Rate Tbl Current Data Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "rateParameterSetId",
					"help": "Rate Parameter Set ID",
					"length": 1
				},
				{
					"type": "integer",
					"name": "datasetRequested",
					"help": "Dataset Requested",
					"length": 3
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(RateTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | RateTblMonitorV1RateTblCurrentDataGetData) {
			super(RateTblCurrentDataGet, data);
		}
	};

	// TODO This command is not yet fully supported by the decoder/encoder
	public static readonly RateTblCurrentDataReport = class RateTblCurrentDataReport extends CommandPacket<RateTblMonitorV1RateTblCurrentDataReportData> {
		public static readonly CommandClass = RateTblMonitorV1;
		public static readonly command = 0x08;
		public static readonly definition = convertFromJsonCommand({
			"command": 8,
			"name": "RateTblCurrentDataReport",
			"help": "Rate Tbl Current Data Report",
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
					"type": "integer",
					"name": "rateParameterSetId",
					"help": "Rate Parameter Set ID",
					"length": 1
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
									"name": "currentScale",
									"mask": 31,
									"shift": 0
								},
								{
									"fieldType": "integer",
									"name": "currentPrecision",
									"mask": 224,
									"shift": 5
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
			return packet.tryAs(RateTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | RateTblMonitorV1RateTblCurrentDataReportData) {
			super(RateTblCurrentDataReport, data);
		}
	};

	public static readonly RateTblGet = class RateTblGet extends CommandPacket<RateTblMonitorV1RateTblGetData> {
		public static readonly CommandClass = RateTblMonitorV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "RateTblGet",
			"help": "Rate Tbl Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "rateParameterSetId",
					"help": "Rate Parameter Set ID",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(RateTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | RateTblMonitorV1RateTblGetData) {
			super(RateTblGet, data);
		}
	};

	public static readonly RateTblHistoricalDataGet = class RateTblHistoricalDataGet extends CommandPacket<RateTblMonitorV1RateTblHistoricalDataGetData> {
		public static readonly CommandClass = RateTblMonitorV1;
		public static readonly command = 0x09;
		public static readonly definition = convertFromJsonCommand({
			"command": 9,
			"name": "RateTblHistoricalDataGet",
			"help": "Rate Tbl Historical Data Get",
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
					"name": "rateParameterSetId",
					"help": "Rate Parameter Set ID",
					"length": 1
				},
				{
					"type": "integer",
					"name": "datasetRequested",
					"help": "Dataset Requested",
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
			return packet.tryAs(RateTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | RateTblMonitorV1RateTblHistoricalDataGetData) {
			super(RateTblHistoricalDataGet, data);
		}
	};

	// TODO This command is not yet fully supported by the decoder/encoder
	public static readonly RateTblHistoricalDataReport = class RateTblHistoricalDataReport extends CommandPacket<RateTblMonitorV1RateTblHistoricalDataReportData> {
		public static readonly CommandClass = RateTblMonitorV1;
		public static readonly command = 0x0a;
		public static readonly definition = convertFromJsonCommand({
			"command": 10,
			"name": "RateTblHistoricalDataReport",
			"help": "Rate Tbl Historical Data Report",
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
					"type": "integer",
					"name": "rateParameterSetId",
					"help": "Rate Parameter Set ID",
					"length": 1
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
									"name": "historicalScale",
									"mask": 31,
									"shift": 0
								},
								{
									"fieldType": "integer",
									"name": "historicalPrecision",
									"mask": 224,
									"shift": 5
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
			return packet.tryAs(RateTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | RateTblMonitorV1RateTblHistoricalDataReportData) {
			super(RateTblHistoricalDataReport, data);
		}
	};

	public static readonly RateTblReport = class RateTblReport extends CommandPacket<RateTblMonitorV1RateTblReportData> {
		public static readonly CommandClass = RateTblMonitorV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "RateTblReport",
			"help": "Rate Tbl Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "rateParameterSetId",
					"help": "Rate Parameter Set ID",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "boolean",
							"name": "reserved",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "rateType",
							"mask": 96,
							"shift": 5
						},
						{
							"fieldType": "integer",
							"name": "numberOfRateChar",
							"mask": 31,
							"shift": 0,
							"lengthOf": {
								"refs": [
									"rateCharacter"
								]
							},
							"isAutogenerated": true
						}
					]
				},
				{
					"type": "blob",
					"name": "rateCharacter",
					"help": "Rate Character",
					"length": {
						"lengthType": "ref",
						"from": {
							"ref": "properties1.numberOfRateChar"
						}
					}
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
					"name": "durationMinute",
					"help": "Duration Minute",
					"length": 2
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "consumptionPrecision",
							"mask": 224,
							"shift": 5
						},
						{
							"fieldType": "integer",
							"name": "consumptionScale",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "minConsumptionValue",
					"help": "Min Consumption Value",
					"length": 4
				},
				{
					"type": "integer",
					"name": "maxConsumptionValue",
					"help": "Max Consumption Value",
					"length": 4
				},
				{
					"type": "bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "maxDemandPrecision",
							"mask": 224,
							"shift": 5
						},
						{
							"fieldType": "integer",
							"name": "maxDemandScale",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "maxDemandValue",
					"help": "Max Demand Value",
					"length": 4
				},
				{
					"type": "integer",
					"name": "dcpRateId",
					"help": "DCP Rate ID",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(RateTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | RateTblMonitorV1RateTblReportData) {
			super(RateTblReport, data);
		}
	};

	public static readonly RateTblSupportedGet = class RateTblSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = RateTblMonitorV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "RateTblSupportedGet",
			"help": "Rate Tbl Supported Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(RateTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(RateTblSupportedGet, data);
		}
	};

	public static readonly RateTblSupportedReport = class RateTblSupportedReport extends CommandPacket<RateTblMonitorV1RateTblSupportedReportData> {
		public static readonly CommandClass = RateTblMonitorV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "RateTblSupportedReport",
			"help": "Rate Tbl Supported Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "ratesSupported",
					"help": "Rates Supported",
					"length": 1
				},
				{
					"type": "integer",
					"name": "parameterSetSupportedBitMask",
					"help": "Parameter Set Supported Bit Mask",
					"length": 2
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(RateTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | RateTblMonitorV1RateTblSupportedReportData) {
			super(RateTblSupportedReport, data);
		}
	};
}

export namespace RateTblMonitorV1 {
	export type RateTblActiveRateGet = InstanceType<typeof RateTblMonitorV1.RateTblActiveRateGet>;
	export type RateTblActiveRateReport = InstanceType<typeof RateTblMonitorV1.RateTblActiveRateReport>;
	export type RateTblCurrentDataGet = InstanceType<typeof RateTblMonitorV1.RateTblCurrentDataGet>;
	export type RateTblCurrentDataReport = InstanceType<typeof RateTblMonitorV1.RateTblCurrentDataReport>;
	export type RateTblGet = InstanceType<typeof RateTblMonitorV1.RateTblGet>;
	export type RateTblHistoricalDataGet = InstanceType<typeof RateTblMonitorV1.RateTblHistoricalDataGet>;
	export type RateTblHistoricalDataReport = InstanceType<typeof RateTblMonitorV1.RateTblHistoricalDataReport>;
	export type RateTblReport = InstanceType<typeof RateTblMonitorV1.RateTblReport>;
	export type RateTblSupportedGet = InstanceType<typeof RateTblMonitorV1.RateTblSupportedGet>;
	export type RateTblSupportedReport = InstanceType<typeof RateTblMonitorV1.RateTblSupportedReport>;
}
