/**
 * Command Class Thermostat Operating State, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ThermostatOperatingStateV2Commands {
	ThermostatOperatingStateGet = 0x02,
	ThermostatOperatingStateReport = 0x03,
	ThermostatOperatingStateLoggingSupportedGet = 0x01,
	ThermostatOperatingLoggingSupportedReport = 0x04,
	ThermostatOperatingStateLoggingGet = 0x05,
	ThermostatOperatingStateLoggingReport = 0x06,
}

export interface ThermostatOperatingStateV2ThermostatOperatingStateReportData {
	// TODO param properties1 type bitfield
}

export interface ThermostatOperatingStateV2ThermostatOperatingLoggingSupportedReportData {
	bitMask: number; // 0 byte unsigned integer
}

export interface ThermostatOperatingStateV2ThermostatOperatingStateLoggingGetData {
	bitMask: number; // 0 byte unsigned integer
}

export interface ThermostatOperatingStateV2ThermostatOperatingStateLoggingReportData {
	reportsToFollow: number; // 1 byte unsigned integer
	// TODO param vg1 type group
}

export class ThermostatOperatingStateV2 extends CommandClassPacket<ThermostatOperatingStateV2Commands> {
	public static readonly commandClass = CommandClasses.ThermostatOperatingState; // 0x42 (66)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ThermostatOperatingStateV2, commandAndPayload);
	}

	public static readonly ThermostatOperatingStateGet = class ThermostatOperatingStateGet extends CommandPacket<void> {
		public static readonly CommandClass = ThermostatOperatingStateV2;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "ThermostatOperatingStateGet",
			"help": "Thermostat Operating State Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatOperatingStateV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ThermostatOperatingStateGet, data);
		}
	};

	public static readonly ThermostatOperatingStateReport = class ThermostatOperatingStateReport extends CommandPacket<ThermostatOperatingStateV2ThermostatOperatingStateReportData> {
		public static readonly CommandClass = ThermostatOperatingStateV2;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "ThermostatOperatingStateReport",
			"help": "Thermostat Operating State Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "enum",
							"name": "Operating State",
							"mask": 15,
							"shift": 0,
							"values": {
								"0": "Idle",
								"1": "Heating",
								"2": "Cooling",
								"3": "Fan Only",
								"4": "Pending Heat",
								"5": "Pending Cool",
								"6": "Vent/Economizer",
								"7": "Aux Heating",
								"8": "2nd Stage Heating",
								"9": "2nd Stage Cooling",
								"10": "2nd Stage Aux Heat",
								"11": "3rd Stage Aux Heat"
							}
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 240,
							"shift": 4
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatOperatingStateV2)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatOperatingStateV2ThermostatOperatingStateReportData) {
			super(ThermostatOperatingStateReport, data);
		}
	};

	public static readonly ThermostatOperatingStateLoggingSupportedGet = class ThermostatOperatingStateLoggingSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = ThermostatOperatingStateV2;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "ThermostatOperatingStateLoggingSupportedGet",
			"help": "Thermostat Operating State Logging Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatOperatingStateV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ThermostatOperatingStateLoggingSupportedGet, data);
		}
	};

	public static readonly ThermostatOperatingLoggingSupportedReport = class ThermostatOperatingLoggingSupportedReport extends CommandPacket<ThermostatOperatingStateV2ThermostatOperatingLoggingSupportedReportData> {
		public static readonly CommandClass = ThermostatOperatingStateV2;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "ThermostatOperatingLoggingSupportedReport",
			"help": "Thermostat Operating State Logging Supported Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "bitMask",
					"help": "Bit Mask",
					"length": 0
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatOperatingStateV2)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatOperatingStateV2ThermostatOperatingLoggingSupportedReportData) {
			super(ThermostatOperatingLoggingSupportedReport, data);
		}
	};

	public static readonly ThermostatOperatingStateLoggingGet = class ThermostatOperatingStateLoggingGet extends CommandPacket<ThermostatOperatingStateV2ThermostatOperatingStateLoggingGetData> {
		public static readonly CommandClass = ThermostatOperatingStateV2;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "ThermostatOperatingStateLoggingGet",
			"help": "Thermostat Operating State Logging Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "bitMask",
					"help": "Bit Mask",
					"length": 0
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatOperatingStateV2)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatOperatingStateV2ThermostatOperatingStateLoggingGetData) {
			super(ThermostatOperatingStateLoggingGet, data);
		}
	};

	public static readonly ThermostatOperatingStateLoggingReport = class ThermostatOperatingStateLoggingReport extends CommandPacket<ThermostatOperatingStateV2ThermostatOperatingStateLoggingReportData> {
		public static readonly CommandClass = ThermostatOperatingStateV2;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "ThermostatOperatingStateLoggingReport",
			"help": "Thermostat Operating State Logging Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "reportsToFollow",
					"help": "Reports to Follow",
					"length": 1
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"name": "Reports to Follow",
						"mask": 255,
						"shift": 0
					},
					"params": [
						{
							"type": "bitfield",
							"name": "properties1",
							"help": "Properties1",
							"length": 1,
							"fields": [
								{
									"type": "integer",
									"name": "Operating State Log Type",
									"mask": 15,
									"shift": 0
								},
								{
									"type": "integer",
									"name": "Reserved",
									"mask": 240,
									"shift": 4
								}
							]
						},
						{
							"type": "integer",
							"name": "usageTodayHours",
							"help": "Usage Today (Hours)",
							"length": 1
						},
						{
							"type": "integer",
							"name": "usageTodayMinutes",
							"help": "Usage Today (Minutes)",
							"length": 1
						},
						{
							"type": "integer",
							"name": "usageYesterdayHours",
							"help": "Usage Yesterday (Hours)",
							"length": 1
						},
						{
							"type": "integer",
							"name": "usageYesterdayMinutes",
							"help": "Usage Yesterday (Minutes)",
							"length": 1
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatOperatingStateV2)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatOperatingStateV2ThermostatOperatingStateLoggingReportData) {
			super(ThermostatOperatingStateLoggingReport, data);
		}
	};
}

export namespace ThermostatOperatingStateV2 {
	export type ThermostatOperatingStateGet = InstanceType<typeof ThermostatOperatingStateV2.ThermostatOperatingStateGet>;
	export type ThermostatOperatingStateReport = InstanceType<typeof ThermostatOperatingStateV2.ThermostatOperatingStateReport>;
	export type ThermostatOperatingStateLoggingSupportedGet = InstanceType<typeof ThermostatOperatingStateV2.ThermostatOperatingStateLoggingSupportedGet>;
	export type ThermostatOperatingLoggingSupportedReport = InstanceType<typeof ThermostatOperatingStateV2.ThermostatOperatingLoggingSupportedReport>;
	export type ThermostatOperatingStateLoggingGet = InstanceType<typeof ThermostatOperatingStateV2.ThermostatOperatingStateLoggingGet>;
	export type ThermostatOperatingStateLoggingReport = InstanceType<typeof ThermostatOperatingStateV2.ThermostatOperatingStateLoggingReport>;
}
