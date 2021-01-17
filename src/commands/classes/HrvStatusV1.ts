/**
 * Command Class Hrv Status, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

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
	precision: number; // properties1[7..5]
	scale: number; // properties1[4..3]
	size: number; // properties1[2..0]
	value: Buffer; // automatic length
}

export interface HrvStatusV1HrvStatusSupportedReportData {
	bitMask: Set<BitMaskEnum>; // automatic length
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

export enum BitMaskEnum {
	OutdoorAirTemperature = 0x0,
	SupplyAirTemperature = 0x1,
	ExhaustAirTemperature = 0x2,
	DischargeAirTemperature = 0x3,
	RoomTemperature = 0x4,
	RelativeHumidityInRoom = 0x5,
	RemainingFilterLife = 0x6,
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
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "HrvStatusGet",
			"help": "Hrv Status Get",
			"status": "Active",
			"params": [
				{
					"type": "Enum",
					"name": "statusParameter",
					"help": "Status Parameter",
					"length": 1,
					"values": {
						"0": {
							"name": "OutdoorAirTemperature",
							"help": "Outdoor Air temperature"
						},
						"1": {
							"name": "SupplyAirTemperature",
							"help": "Supply Air temperature"
						},
						"2": {
							"name": "ExhaustAirTemperature",
							"help": "Exhaust Air temperature"
						},
						"3": {
							"name": "DischargeAirTemperature",
							"help": "Discharge Air temperature"
						},
						"4": {
							"name": "RoomTemperature",
							"help": "Room temperature"
						},
						"5": {
							"name": "RelativeHumidityInRoom",
							"help": "Relative Humidity in room"
						},
						"6": {
							"name": "RemainingFilterLife",
							"help": "Remaining filter life"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "HrvStatusReport",
			"help": "Hrv Status Report",
			"status": "Active",
			"params": [
				{
					"type": "Enum",
					"name": "statusParameter",
					"help": "Status Parameter",
					"length": 1,
					"values": {
						"0": {
							"name": "OutdoorAirTemperature",
							"help": "Outdoor Air temperature"
						},
						"1": {
							"name": "SupplyAirTemperature",
							"help": "Supply Air temperature"
						},
						"2": {
							"name": "ExhaustAirTemperature",
							"help": "Exhaust Air temperature"
						},
						"3": {
							"name": "DischargeAirTemperature",
							"help": "Discharge Air temperature"
						},
						"4": {
							"name": "RoomTemperature",
							"help": "Room temperature"
						},
						"5": {
							"name": "RelativeHumidityInRoom",
							"help": "Relative Humidity in room"
						},
						"6": {
							"name": "RemainingFilterLife",
							"help": "Remaining filter life"
						}
					}
				},
				{
					"type": "Bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "Integer",
							"name": "precision",
							"mask": 224,
							"shift": 5
						},
						{
							"fieldType": "Integer",
							"name": "scale",
							"mask": 24,
							"shift": 3
						},
						{
							"fieldType": "Integer",
							"name": "size",
							"mask": 7,
							"shift": 0
						}
					]
				},
				{
					"type": "Blob",
					"name": "value",
					"help": "Value",
					"length": {
						"lengthType": "Auto"
					}
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "HrvStatusSupportedGet",
			"help": "Hrv Status Supported Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "HrvStatusSupportedReport",
			"help": "Hrv Status Supported Report",
			"status": "Active",
			"params": [
				{
					"type": "Bitmask",
					"name": "bitMask",
					"help": "Bit Mask",
					"length": {
						"lengthType": "Auto"
					},
					"values": {
						"0": {
							"name": "OutdoorAirTemperature",
							"help": "Outdoor Air temperature"
						},
						"1": {
							"name": "SupplyAirTemperature",
							"help": "Supply Air temperature"
						},
						"2": {
							"name": "ExhaustAirTemperature",
							"help": "Exhaust Air temperature"
						},
						"3": {
							"name": "DischargeAirTemperature",
							"help": "Discharge Air temperature"
						},
						"4": {
							"name": "RoomTemperature",
							"help": "Room temperature"
						},
						"5": {
							"name": "RelativeHumidityInRoom",
							"help": "Relative Humidity in room"
						},
						"6": {
							"name": "RemainingFilterLife",
							"help": "Remaining filter life"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

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
