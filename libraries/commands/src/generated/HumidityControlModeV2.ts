/**
 * Command Class Humidity Control Mode, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	bitMask: Set<BitMaskEnum>; // 1 bytes
}

export enum ModeEnum {
	Off = 0x0,
	Humidify = 0x1,
	Dehumidify = 0x2,
	Auto = 0x3,
}

export enum BitMaskEnum {
	Off = 0x0,
	Humidify = 0x1,
	Dehumidify = 0x2,
	Auto = 0x3,
}

export class HumidityControlModeV2 extends CommandClassPacket<HumidityControlModeV2Commands> {
	public static readonly commandClass: number = CommandClasses.HumidityControlMode; // 0x6d (109)
	public static readonly version: number = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(HumidityControlModeV2, commandAndPayload);
	}
}

export class HumidityControlModeSet extends CommandPacket<HumidityControlModeV2HumidityControlModeSetData> {
	public static readonly CommandClass: typeof HumidityControlModeV2 = HumidityControlModeV2;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(HumidityControlModeV2)?.command === this.command;
	}

	public constructor(data: Buffer | HumidityControlModeV2HumidityControlModeSetData) {
		super(HumidityControlModeSet, data);
	}
};

export class HumidityControlModeGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof HumidityControlModeV2 = HumidityControlModeV2;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "HumidityControlModeGet",
		"help": "Humidity Control Mode Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(HumidityControlModeV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(HumidityControlModeGet, data);
	}
};

export class HumidityControlModeReport extends CommandPacket<HumidityControlModeV2HumidityControlModeReportData> {
	public static readonly CommandClass: typeof HumidityControlModeV2 = HumidityControlModeV2;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(HumidityControlModeV2)?.command === this.command;
	}

	public constructor(data: Buffer | HumidityControlModeV2HumidityControlModeReportData) {
		super(HumidityControlModeReport, data);
	}
};

export class HumidityControlModeSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof HumidityControlModeV2 = HumidityControlModeV2;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "HumidityControlModeSupportedGet",
		"help": "Humidity Control Mode Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(HumidityControlModeV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(HumidityControlModeSupportedGet, data);
	}
};

export class HumidityControlModeSupportedReport extends CommandPacket<HumidityControlModeV2HumidityControlModeSupportedReportData> {
	public static readonly CommandClass: typeof HumidityControlModeV2 = HumidityControlModeV2;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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
					},
					"3": {
						"name": "Auto",
						"help": "Auto"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(HumidityControlModeV2)?.command === this.command;
	}

	public constructor(data: Buffer | HumidityControlModeV2HumidityControlModeSupportedReportData) {
		super(HumidityControlModeSupportedReport, data);
	}
};
