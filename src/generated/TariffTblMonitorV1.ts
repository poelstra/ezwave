/**
 * Command Class Tariff Tbl Monitor, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum TariffTblMonitorV1Commands {
	TariffTblCostGet = 0x05,
	TariffTblCostReport = 0x06,
	TariffTblGet = 0x03,
	TariffTblReport = 0x04,
	TariffTblSupplierGet = 0x01,
	TariffTblSupplierReport = 0x02,
}

export interface TariffTblMonitorV1TariffTblCostGetData {
	rateParameterSetID: number; // 1 byte unsigned integer
	startYear: number; // 2 byte unsigned integer
	startMonth: number; // 1 byte unsigned integer
	startDay: number; // 1 byte unsigned integer
	startHourLocalTime: number; // 1 byte unsigned integer
	startMinuteLocalTime: number; // 1 byte unsigned integer
	stopYear: number; // 2 byte unsigned integer
	stopMonth: number; // 1 byte unsigned integer
	stopDay: number; // 1 byte unsigned integer
	stopHourLocalTime: number; // 1 byte unsigned integer
	stopMinuteLocalTime: number; // 1 byte unsigned integer
}

export interface TariffTblMonitorV1TariffTblCostReportData {
	rateParameterSetID: number; // 1 byte unsigned integer
	rateType: number; // properties1[1..0]
	startYear: number; // 2 byte unsigned integer
	startMonth: number; // 1 byte unsigned integer
	startDay: number; // 1 byte unsigned integer
	startHourLocalTime: number; // 1 byte unsigned integer
	startMinuteLocalTime: number; // 1 byte unsigned integer
	stopYear: number; // 2 byte unsigned integer
	stopMonth: number; // 1 byte unsigned integer
	stopDay: number; // 1 byte unsigned integer
	stopHourLocalTime: number; // 1 byte unsigned integer
	stopMinuteLocalTime: number; // 1 byte unsigned integer
	currency: number; // 3 byte unsigned integer
	costPrecision: number; // properties2[7..5]
	costValue: number; // 4 byte unsigned integer
}

export interface TariffTblMonitorV1TariffTblGetData {
	rateParameterSetID: number; // 1 byte unsigned integer
}

export interface TariffTblMonitorV1TariffTblReportData {
	rateParameterSetID: number; // 1 byte unsigned integer
	tariffPrecision: number; // properties1[7..5]
	tariffValue: number; // 4 byte unsigned integer
}

export interface TariffTblMonitorV1TariffTblSupplierReportData {
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourLocalTime: number; // 1 byte unsigned integer
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
	currency: number; // 3 byte unsigned integer
	standingChargePrecision: number; // properties1[7..5]
	standingChargePeriod: number; // properties1[4..0]
	standingChargeValue: number; // 4 byte unsigned integer
	numberOfSupplierCharacters: number; // properties2[4..0]
	// TODO param supplierCharacter type blob
}

export class TariffTblMonitorV1 extends CommandClassPacket<TariffTblMonitorV1Commands> {
	public static readonly commandClass = CommandClasses.TariffTblMonitor; // 0x4b (75)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(TariffTblMonitorV1, commandAndPayload);
	}

	public static readonly TariffTblCostGet = class TariffTblCostGet extends CommandPacket<TariffTblMonitorV1TariffTblCostGetData> {
		public static readonly CommandClass = TariffTblMonitorV1;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "TariffTblCostGet",
			"help": "Tariff Tbl Cost Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "rateParameterSetID",
					"help": "Rate Parameter Set ID",
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
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TariffTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | TariffTblMonitorV1TariffTblCostGetData) {
			super(TariffTblCostGet, data);
		}
	};

	public static readonly TariffTblCostReport = class TariffTblCostReport extends CommandPacket<TariffTblMonitorV1TariffTblCostReportData> {
		public static readonly CommandClass = TariffTblMonitorV1;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "TariffTblCostReport",
			"help": "Tariff Tbl Cost Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "rateParameterSetID",
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
							"type": "integer",
							"name": "reserved1",
							"mask": 252,
							"shift": 2,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "rateType",
							"mask": 3,
							"shift": 0
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
					"name": "currency",
					"help": "Currency",
					"length": 3
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "costPrecision",
							"mask": 224,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "reserved2",
							"mask": 31,
							"shift": 0,
							"reserved": true
						}
					]
				},
				{
					"type": "integer",
					"name": "costValue",
					"help": "Cost Value",
					"length": 4
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TariffTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | TariffTblMonitorV1TariffTblCostReportData) {
			super(TariffTblCostReport, data);
		}
	};

	public static readonly TariffTblGet = class TariffTblGet extends CommandPacket<TariffTblMonitorV1TariffTblGetData> {
		public static readonly CommandClass = TariffTblMonitorV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "TariffTblGet",
			"help": "Tariff Tbl Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "rateParameterSetID",
					"help": "Rate Parameter Set ID",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TariffTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | TariffTblMonitorV1TariffTblGetData) {
			super(TariffTblGet, data);
		}
	};

	public static readonly TariffTblReport = class TariffTblReport extends CommandPacket<TariffTblMonitorV1TariffTblReportData> {
		public static readonly CommandClass = TariffTblMonitorV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "TariffTblReport",
			"help": "Tariff Tbl Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "rateParameterSetID",
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
							"type": "integer",
							"name": "tariffPrecision",
							"mask": 224,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "reserved",
							"mask": 31,
							"shift": 0,
							"reserved": true
						}
					]
				},
				{
					"type": "integer",
					"name": "tariffValue",
					"help": "Tariff Value",
					"length": 4
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TariffTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | TariffTblMonitorV1TariffTblReportData) {
			super(TariffTblReport, data);
		}
	};

	public static readonly TariffTblSupplierGet = class TariffTblSupplierGet extends CommandPacket<void> {
		public static readonly CommandClass = TariffTblMonitorV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "TariffTblSupplierGet",
			"help": "Tariff Tbl Supplier Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TariffTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(TariffTblSupplierGet, data);
		}
	};

	public static readonly TariffTblSupplierReport = class TariffTblSupplierReport extends CommandPacket<TariffTblMonitorV1TariffTblSupplierReportData> {
		public static readonly CommandClass = TariffTblMonitorV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "TariffTblSupplierReport",
			"help": "Tariff Tbl Supplier Report",
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
					"name": "currency",
					"help": "Currency",
					"length": 3
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "standingChargePrecision",
							"mask": 224,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "standingChargePeriod",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "standingChargeValue",
					"help": "Standing Charge Value",
					"length": 4
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved",
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "numberOfSupplierCharacters",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "blob",
					"name": "supplierCharacter",
					"help": "Supplier Character",
					"length": {
						"ref": "properties2",
						"bitfield": {
							"mask": 31,
							"shift": 0,
							"name": "numberOfSupplierCharacters"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TariffTblMonitorV1)?.command === this.command;
		}

		constructor(data: Buffer | TariffTblMonitorV1TariffTblSupplierReportData) {
			super(TariffTblSupplierReport, data);
		}
	};
}

export namespace TariffTblMonitorV1 {
	export type TariffTblCostGet = InstanceType<typeof TariffTblMonitorV1.TariffTblCostGet>;
	export type TariffTblCostReport = InstanceType<typeof TariffTblMonitorV1.TariffTblCostReport>;
	export type TariffTblGet = InstanceType<typeof TariffTblMonitorV1.TariffTblGet>;
	export type TariffTblReport = InstanceType<typeof TariffTblMonitorV1.TariffTblReport>;
	export type TariffTblSupplierGet = InstanceType<typeof TariffTblMonitorV1.TariffTblSupplierGet>;
	export type TariffTblSupplierReport = InstanceType<typeof TariffTblMonitorV1.TariffTblSupplierReport>;
}
