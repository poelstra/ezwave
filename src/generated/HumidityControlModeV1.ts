/**
 * Command Class Humidity Control Mode, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum HumidityControlModeV1Commands {
	HumidityControlModeSet = 0x01,
	HumidityControlModeGet = 0x02,
	HumidityControlModeReport = 0x03,
	HumidityControlModeSupportedGet = 0x04,
	HumidityControlModeSupportedReport = 0x05,
}

export interface HumidityControlModeV1HumidityControlModeSetData {
	mode: ModeEnum; // properties1[3..0]
}

export interface HumidityControlModeV1HumidityControlModeReportData {
	mode: ModeEnum; // properties1[3..0]
}

export interface HumidityControlModeV1HumidityControlModeSupportedReportData {
	bitMask: Set<BitMaskEnum>; // 1 bytes
}

export enum ModeEnum {
	Off = 0x0,
	Humidify = 0x1,
	Dehumidify = 0x2,
}

export enum BitMaskEnum {
	Off = 0x0,
	Humidify = 0x1,
	Dehumidify = 0x2,
}

export class HumidityControlModeV1 extends CommandClassPacket<HumidityControlModeV1Commands> {
	public static readonly commandClass = CommandClasses.HumidityControlMode; // 0x6d (109)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(HumidityControlModeV1, commandAndPayload);
	}

	public static readonly HumidityControlModeSet = class HumidityControlModeSet extends CommandPacket<HumidityControlModeV1HumidityControlModeSetData> {
		public static readonly CommandClass = HumidityControlModeV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "HumidityControlModeSet",
			"help": "Humidity Control Mode Set",
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
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"fieldType": "Enum",
							"name": "mode",
							"mask": 15,
							"shift": 0,
							"values": {
								"0": {
									"name": "Off",
									"help": "Off"
								},
								"1": {
									"name": "Humidify",
									"help": "Humidify"
								},
								"2": {
									"name": "Dehumidify",
									"help": "Dehumidify"
								}
							}
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlModeV1)?.command === this.command;
		}

		constructor(data: Buffer | HumidityControlModeV1HumidityControlModeSetData) {
			super(HumidityControlModeSet, data);
		}
	};

	public static readonly HumidityControlModeGet = class HumidityControlModeGet extends CommandPacket<void> {
		public static readonly CommandClass = HumidityControlModeV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "HumidityControlModeGet",
			"help": "Humidity Control Mode Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlModeV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(HumidityControlModeGet, data);
		}
	};

	public static readonly HumidityControlModeReport = class HumidityControlModeReport extends CommandPacket<HumidityControlModeV1HumidityControlModeReportData> {
		public static readonly CommandClass = HumidityControlModeV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "HumidityControlModeReport",
			"help": "Humidity Control Mode Report",
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
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"fieldType": "Enum",
							"name": "mode",
							"mask": 15,
							"shift": 0,
							"values": {
								"0": {
									"name": "Off",
									"help": "Off"
								},
								"1": {
									"name": "Humidify",
									"help": "Humidify"
								},
								"2": {
									"name": "Dehumidify",
									"help": "Dehumidify"
								}
							}
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlModeV1)?.command === this.command;
		}

		constructor(data: Buffer | HumidityControlModeV1HumidityControlModeReportData) {
			super(HumidityControlModeReport, data);
		}
	};

	public static readonly HumidityControlModeSupportedGet = class HumidityControlModeSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = HumidityControlModeV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "HumidityControlModeSupportedGet",
			"help": "Humidity Control Mode Supported Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlModeV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(HumidityControlModeSupportedGet, data);
		}
	};

	public static readonly HumidityControlModeSupportedReport = class HumidityControlModeSupportedReport extends CommandPacket<HumidityControlModeV1HumidityControlModeSupportedReportData> {
		public static readonly CommandClass = HumidityControlModeV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "HumidityControlModeSupportedReport",
			"help": "Humidity Control Mode Supported Report",
			"status": "Active",
			"params": [
				{
					"type": "Bitmask",
					"name": "bitMask",
					"help": "Bit Mask",
					"length": 1,
					"values": {
						"0": {
							"name": "Off",
							"help": "Off"
						},
						"1": {
							"name": "Humidify",
							"help": "Humidify"
						},
						"2": {
							"name": "Dehumidify",
							"help": "Dehumidify"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlModeV1)?.command === this.command;
		}

		constructor(data: Buffer | HumidityControlModeV1HumidityControlModeSupportedReportData) {
			super(HumidityControlModeSupportedReport, data);
		}
	};
}

export namespace HumidityControlModeV1 {
	export type HumidityControlModeSet = InstanceType<typeof HumidityControlModeV1.HumidityControlModeSet>;
	export type HumidityControlModeGet = InstanceType<typeof HumidityControlModeV1.HumidityControlModeGet>;
	export type HumidityControlModeReport = InstanceType<typeof HumidityControlModeV1.HumidityControlModeReport>;
	export type HumidityControlModeSupportedGet = InstanceType<typeof HumidityControlModeV1.HumidityControlModeSupportedGet>;
	export type HumidityControlModeSupportedReport = InstanceType<typeof HumidityControlModeV1.HumidityControlModeSupportedReport>;
}
