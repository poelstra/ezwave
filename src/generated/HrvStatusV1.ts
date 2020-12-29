/**
 * Command Class Hrv Status, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum HrvStatusV1Commands {
	HrvStatusGet = 0x01,
	HrvStatusReport = 0x02,
	HrvStatusSupportedGet = 0x03,
	HrvStatusSupportedReport = 0x04,
}

export interface HrvStatusV1HrvStatusGetData {
	statusParameter: StatusParameterEnum; // 1 byte enum value
}

export interface HrvStatusV1HrvStatusReportData {
	statusParameter: StatusParameterEnum; // 1 byte enum value
	// TODO param properties1 type bitfield
	// TODO param value type blob
}

export interface HrvStatusV1HrvStatusSupportedReportData {
	bitMask: number; // 0 byte unsigned integer
}

export class HrvStatusV1 extends CommandClassPacket<HrvStatusV1Commands> {
	public static readonly commandClass = CommandClasses.HrvStatus; // 0x37 (55)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(HrvStatusV1, commandAndPayload);
	}

	public static readonly HrvStatusGet = class HrvStatusGet extends CommandPacket<HrvStatusV1HrvStatusGetData> {
		public static readonly CommandClass = HrvStatusV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "HrvStatusGet",
			"help": "Hrv Status Get",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "statusParameter",
					"help": "Status Parameter",
					"length": 1,
					"values": {
						"0": "Outdoor Air temperature",
						"1": "Supply Air temperature",
						"2": "Exhaust Air temperature",
						"3": "Discharge Air temperature",
						"4": "Room temperature",
						"5": "Relative Humidity in room",
						"6": "Remaining filter life"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(HrvStatusV1)?.command === this.command;
		}

		constructor(data: Buffer | HrvStatusV1HrvStatusGetData) {
			super(HrvStatusGet, data);
		}
	};

	public static readonly HrvStatusReport = class HrvStatusReport extends CommandPacket<HrvStatusV1HrvStatusReportData> {
		public static readonly CommandClass = HrvStatusV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "HrvStatusReport",
			"help": "Hrv Status Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "statusParameter",
					"help": "Status Parameter",
					"length": 1,
					"values": {
						"0": "Outdoor Air temperature",
						"1": "Supply Air temperature",
						"2": "Exhaust Air temperature",
						"3": "Discharge Air temperature",
						"4": "Room temperature",
						"5": "Relative Humidity in room",
						"6": "Remaining filter life"
					}
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "value",
					"help": "Value",
					"length": "auto"
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(HrvStatusV1)?.command === this.command;
		}

		constructor(data: Buffer | HrvStatusV1HrvStatusReportData) {
			super(HrvStatusReport, data);
		}
	};

	public static readonly HrvStatusSupportedGet = class HrvStatusSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = HrvStatusV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "HrvStatusSupportedGet",
			"help": "Hrv Status Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(HrvStatusV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(HrvStatusSupportedGet, data);
		}
	};

	public static readonly HrvStatusSupportedReport = class HrvStatusSupportedReport extends CommandPacket<HrvStatusV1HrvStatusSupportedReportData> {
		public static readonly CommandClass = HrvStatusV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "HrvStatusSupportedReport",
			"help": "Hrv Status Supported Report",
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
			return packet.tryAs(HrvStatusV1)?.command === this.command;
		}

		constructor(data: Buffer | HrvStatusV1HrvStatusSupportedReportData) {
			super(HrvStatusSupportedReport, data);
		}
	};
}

export namespace HrvStatusV1 {
	export type HrvStatusGet = InstanceType<typeof HrvStatusV1.HrvStatusGet>;
	export type HrvStatusReport = InstanceType<typeof HrvStatusV1.HrvStatusReport>;
	export type HrvStatusSupportedGet = InstanceType<typeof HrvStatusV1.HrvStatusSupportedGet>;
	export type HrvStatusSupportedReport = InstanceType<typeof HrvStatusV1.HrvStatusSupportedReport>;
}

export enum StatusParameterEnum {
	OutdoorAirTemperature = 0x0,
	SupplyAirTemperature = 0x1,
	ExhaustAirTemperature = 0x2,
	DischargeAirTemperature = 0x3,
	RoomTemperature = 0x4,
	RelativeHumidityInRoom = 0x5,
	RemainingFilterLife = 0x6,
}
