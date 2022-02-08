/**
 * Command Class Rate Tbl Monitor, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	vg: Array<{ // variable length
		currentPrecision: number; // properties1[7..5]
		currentScale: number; // properties1[4..0]
		currentValue: number; // 4 byte unsigned integer
	}>;
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
	vg: Array<{ // variable length
		historicalPrecision: number; // properties1[7..5]
		historicalScale: number; // properties1[4..0]
		historicalValue: number; // 4 byte unsigned integer
	}>;
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
	public static readonly commandClass: number = CommandClasses.RateTblMonitor; // 0x49 (73)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(RateTblMonitorV1, commandAndPayload);
	}
}

export class RateTblActiveRateGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof RateTblMonitorV1 = RateTblMonitorV1;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "RateTblActiveRateGet",
		"help": "Rate Tbl Active Rate  Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(RateTblMonitorV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(RateTblActiveRateGet, data);
	}
};

export class RateTblActiveRateReport extends CommandPacket<RateTblMonitorV1RateTblActiveRateReportData> {
	public static readonly CommandClass: typeof RateTblMonitorV1 = RateTblMonitorV1;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 6,
		"name": "RateTblActiveRateReport",
		"help": "Rate Tbl Active Rate  Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "rateParameterSetId",
				"help": "Rate Parameter Set ID",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(RateTblMonitorV1)?.command === this.command;
	}

	public constructor(data: Buffer | RateTblMonitorV1RateTblActiveRateReportData) {
		super(RateTblActiveRateReport, data);
	}
};

export class RateTblCurrentDataGet extends CommandPacket<RateTblMonitorV1RateTblCurrentDataGetData> {
	public static readonly CommandClass: typeof RateTblMonitorV1 = RateTblMonitorV1;
	public static readonly command: number = 0x07; // 7
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 7,
		"name": "RateTblCurrentDataGet",
		"help": "Rate Tbl Current Data Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "rateParameterSetId",
				"help": "Rate Parameter Set ID",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "datasetRequested",
				"help": "Dataset Requested",
				"length": 3
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(RateTblMonitorV1)?.command === this.command;
	}

	public constructor(data: Buffer | RateTblMonitorV1RateTblCurrentDataGetData) {
		super(RateTblCurrentDataGet, data);
	}
};

export class RateTblCurrentDataReport extends CommandPacket<RateTblMonitorV1RateTblCurrentDataReportData> {
	public static readonly CommandClass: typeof RateTblMonitorV1 = RateTblMonitorV1;
	public static readonly command: number = 0x08; // 8
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 8,
		"name": "RateTblCurrentDataReport",
		"help": "Rate Tbl Current Data Report",
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
				"type": "Integer",
				"name": "rateParameterSetId",
				"help": "Rate Parameter Set ID",
				"length": 1
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

	public static matches(packet: Packet): boolean {
		return packet.tryAs(RateTblMonitorV1)?.command === this.command;
	}

	public constructor(data: Buffer | RateTblMonitorV1RateTblCurrentDataReportData) {
		super(RateTblCurrentDataReport, data);
	}
};

export class RateTblGet extends CommandPacket<RateTblMonitorV1RateTblGetData> {
	public static readonly CommandClass: typeof RateTblMonitorV1 = RateTblMonitorV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "RateTblGet",
		"help": "Rate Tbl Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "rateParameterSetId",
				"help": "Rate Parameter Set ID",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(RateTblMonitorV1)?.command === this.command;
	}

	public constructor(data: Buffer | RateTblMonitorV1RateTblGetData) {
		super(RateTblGet, data);
	}
};

export class RateTblHistoricalDataGet extends CommandPacket<RateTblMonitorV1RateTblHistoricalDataGetData> {
	public static readonly CommandClass: typeof RateTblMonitorV1 = RateTblMonitorV1;
	public static readonly command: number = 0x09; // 9
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 9,
		"name": "RateTblHistoricalDataGet",
		"help": "Rate Tbl Historical Data Get",
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
				"name": "rateParameterSetId",
				"help": "Rate Parameter Set ID",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "datasetRequested",
				"help": "Dataset Requested",
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

	public static matches(packet: Packet): boolean {
		return packet.tryAs(RateTblMonitorV1)?.command === this.command;
	}

	public constructor(data: Buffer | RateTblMonitorV1RateTblHistoricalDataGetData) {
		super(RateTblHistoricalDataGet, data);
	}
};

export class RateTblHistoricalDataReport extends CommandPacket<RateTblMonitorV1RateTblHistoricalDataReportData> {
	public static readonly CommandClass: typeof RateTblMonitorV1 = RateTblMonitorV1;
	public static readonly command: number = 0x0a; // 10
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 10,
		"name": "RateTblHistoricalDataReport",
		"help": "Rate Tbl Historical Data Report",
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
				"type": "Integer",
				"name": "rateParameterSetId",
				"help": "Rate Parameter Set ID",
				"length": 1
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

	public static matches(packet: Packet): boolean {
		return packet.tryAs(RateTblMonitorV1)?.command === this.command;
	}

	public constructor(data: Buffer | RateTblMonitorV1RateTblHistoricalDataReportData) {
		super(RateTblHistoricalDataReport, data);
	}
};

export class RateTblReport extends CommandPacket<RateTblMonitorV1RateTblReportData> {
	public static readonly CommandClass: typeof RateTblMonitorV1 = RateTblMonitorV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "RateTblReport",
		"help": "Rate Tbl Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "rateParameterSetId",
				"help": "Rate Parameter Set ID",
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
						"name": "reserved",
						"mask": 128,
						"shift": 7,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "rateType",
						"mask": 96,
						"shift": 5
					},
					{
						"fieldType": "Integer",
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
				"type": "Blob",
				"name": "rateCharacter",
				"help": "Rate Character",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.numberOfRateChar"
					}
				}
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
				"name": "durationMinute",
				"help": "Duration Minute",
				"length": 2
			},
			{
				"type": "Bitfield",
				"name": "properties2",
				"help": "Properties2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "consumptionPrecision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "consumptionScale",
						"mask": 31,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "minConsumptionValue",
				"help": "Min Consumption Value",
				"length": 4
			},
			{
				"type": "Integer",
				"name": "maxConsumptionValue",
				"help": "Max Consumption Value",
				"length": 4
			},
			{
				"type": "Bitfield",
				"name": "properties3",
				"help": "Properties3",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "maxDemandPrecision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "maxDemandScale",
						"mask": 31,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "maxDemandValue",
				"help": "Max Demand Value",
				"length": 4
			},
			{
				"type": "Integer",
				"name": "dcpRateId",
				"help": "DCP Rate ID",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(RateTblMonitorV1)?.command === this.command;
	}

	public constructor(data: Buffer | RateTblMonitorV1RateTblReportData) {
		super(RateTblReport, data);
	}
};

export class RateTblSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof RateTblMonitorV1 = RateTblMonitorV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "RateTblSupportedGet",
		"help": "Rate Tbl Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(RateTblMonitorV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(RateTblSupportedGet, data);
	}
};

export class RateTblSupportedReport extends CommandPacket<RateTblMonitorV1RateTblSupportedReportData> {
	public static readonly CommandClass: typeof RateTblMonitorV1 = RateTblMonitorV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "RateTblSupportedReport",
		"help": "Rate Tbl Supported Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "ratesSupported",
				"help": "Rates Supported",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "parameterSetSupportedBitMask",
				"help": "Parameter Set Supported Bit Mask",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(RateTblMonitorV1)?.command === this.command;
	}

	public constructor(data: Buffer | RateTblMonitorV1RateTblSupportedReportData) {
		super(RateTblSupportedReport, data);
	}
};
