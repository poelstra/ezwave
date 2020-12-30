/**
 * Command Class Humidity Control Mode, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum HumidityControlModeV2Commands {
	HumidityControlModeSet = 0x01,
	HumidityControlModeGet = 0x02,
	HumidityControlModeReport = 0x03,
	HumidityControlModeSupportedGet = 0x04,
	HumidityControlModeSupportedReport = 0x05,
}

export interface HumidityControlModeV2HumidityControlModeSetData {
	mode: ModeEnum; // properties1[3..0]
}

export interface HumidityControlModeV2HumidityControlModeReportData {
	mode: ModeEnum; // properties1[3..0]
}

export interface HumidityControlModeV2HumidityControlModeSupportedReportData {
	// TODO param bitMask type bitmask or marker
}

export enum ModeEnum {
	Off = 0x0,
	Humidify = 0x1,
	Dehumidify = 0x2,
	Auto = 0x3,
}

export class HumidityControlModeV2 extends CommandClassPacket<HumidityControlModeV2Commands> {
	public static readonly commandClass = CommandClasses.HumidityControlMode; // 0x6d (109)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(HumidityControlModeV2, commandAndPayload);
	}

	public static readonly HumidityControlModeSet = class HumidityControlModeSet extends CommandPacket<HumidityControlModeV2HumidityControlModeSetData> {
		public static readonly CommandClass = HumidityControlModeV2;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "HumidityControlModeSet",
			"help": "Humidity Control Mode Set",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"type": "enum",
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
								},
								"3": {
									"name": "Auto",
									"help": "Auto"
								}
							}
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlModeV2)?.command === this.command;
		}

		constructor(data: Buffer | HumidityControlModeV2HumidityControlModeSetData) {
			super(HumidityControlModeSet, data);
		}
	};

	public static readonly HumidityControlModeGet = class HumidityControlModeGet extends CommandPacket<void> {
		public static readonly CommandClass = HumidityControlModeV2;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "HumidityControlModeGet",
			"help": "Humidity Control Mode Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlModeV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(HumidityControlModeGet, data);
		}
	};

	public static readonly HumidityControlModeReport = class HumidityControlModeReport extends CommandPacket<HumidityControlModeV2HumidityControlModeReportData> {
		public static readonly CommandClass = HumidityControlModeV2;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "HumidityControlModeReport",
			"help": "Humidity Control Mode Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"type": "enum",
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
								},
								"3": {
									"name": "Auto",
									"help": "Auto"
								}
							}
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlModeV2)?.command === this.command;
		}

		constructor(data: Buffer | HumidityControlModeV2HumidityControlModeReportData) {
			super(HumidityControlModeReport, data);
		}
	};

	public static readonly HumidityControlModeSupportedGet = class HumidityControlModeSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = HumidityControlModeV2;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "HumidityControlModeSupportedGet",
			"help": "Humidity Control Mode Supported Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(HumidityControlModeV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(HumidityControlModeSupportedGet, data);
		}
	};

	public static readonly HumidityControlModeSupportedReport = class HumidityControlModeSupportedReport extends CommandPacket<HumidityControlModeV2HumidityControlModeSupportedReportData> {
		public static readonly CommandClass = HumidityControlModeV2;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "HumidityControlModeSupportedReport",
			"help": "Humidity Control Mode Supported Report",
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
			return packet.tryAs(HumidityControlModeV2)?.command === this.command;
		}

		constructor(data: Buffer | HumidityControlModeV2HumidityControlModeSupportedReportData) {
			super(HumidityControlModeSupportedReport, data);
		}
	};
}

export namespace HumidityControlModeV2 {
	export type HumidityControlModeSet = InstanceType<typeof HumidityControlModeV2.HumidityControlModeSet>;
	export type HumidityControlModeGet = InstanceType<typeof HumidityControlModeV2.HumidityControlModeGet>;
	export type HumidityControlModeReport = InstanceType<typeof HumidityControlModeV2.HumidityControlModeReport>;
	export type HumidityControlModeSupportedGet = InstanceType<typeof HumidityControlModeV2.HumidityControlModeSupportedGet>;
	export type HumidityControlModeSupportedReport = InstanceType<typeof HumidityControlModeV2.HumidityControlModeSupportedReport>;
}
