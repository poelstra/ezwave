/**
 * Command Class Humidity Control Mode, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(HumidityControlModeV1, commandAndPayload);
	}
}

export class HumidityControlModeSet extends CommandPacket<HumidityControlModeV1HumidityControlModeSetData> {
	public static readonly CommandClass = HumidityControlModeV1;
	public static readonly command = 0x01; // 1
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(HumidityControlModeV1)?.command === this.command;
	}

	public constructor(data: Buffer | HumidityControlModeV1HumidityControlModeSetData) {
		super(HumidityControlModeSet, data);
	}
};

export class HumidityControlModeGet extends CommandPacket<void> {
	public static readonly CommandClass = HumidityControlModeV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "HumidityControlModeGet",
		"help": "Humidity Control Mode Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(HumidityControlModeV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(HumidityControlModeGet, data);
	}
};

export class HumidityControlModeReport extends CommandPacket<HumidityControlModeV1HumidityControlModeReportData> {
	public static readonly CommandClass = HumidityControlModeV1;
	public static readonly command = 0x03; // 3
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(HumidityControlModeV1)?.command === this.command;
	}

	public constructor(data: Buffer | HumidityControlModeV1HumidityControlModeReportData) {
		super(HumidityControlModeReport, data);
	}
};

export class HumidityControlModeSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass = HumidityControlModeV1;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
		"command": 4,
		"name": "HumidityControlModeSupportedGet",
		"help": "Humidity Control Mode Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(HumidityControlModeV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(HumidityControlModeSupportedGet, data);
	}
};

export class HumidityControlModeSupportedReport extends CommandPacket<HumidityControlModeV1HumidityControlModeSupportedReportData> {
	public static readonly CommandClass = HumidityControlModeV1;
	public static readonly command = 0x05; // 5
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(HumidityControlModeV1)?.command === this.command;
	}

	public constructor(data: Buffer | HumidityControlModeV1HumidityControlModeSupportedReportData) {
		super(HumidityControlModeSupportedReport, data);
	}
};
