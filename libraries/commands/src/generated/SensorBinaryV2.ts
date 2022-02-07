/**
 * Command Class Sensor Binary, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum SensorBinaryV2Commands {
	SensorBinaryGet = 0x02,
	SensorBinaryReport = 0x03,
	SensorBinarySupportedGetSensor = 0x01,
	SensorBinarySupportedSensorReport = 0x04,
}

export interface SensorBinaryV2SensorBinaryGetData {
	sensorType: number; // 1 byte unsigned integer
}

export interface SensorBinaryV2SensorBinaryReportData {
	sensorValue: SensorValueEnum; // 1 byte enum value
	sensorType: number; // 1 byte unsigned integer
}

export interface SensorBinaryV2SensorBinarySupportedSensorReportData {
	bitMask: Set<BitMaskEnum>; // automatic length
}

export enum SensorValueEnum {
	Idle = 0x0,
	DetectedAnEvent = 0xff,
}

export enum BitMaskEnum {
	Reserved = 0x0,
	General = 0x1,
	Smoke = 0x2,
	Co = 0x3,
	Co2 = 0x4,
	Heat = 0x5,
	Water = 0x6,
	Freeze = 0x7,
	Tamper = 0x8,
	Aux = 0x9,
	DoorWindow = 0xa,
	Tilt = 0xb,
	Motion = 0xc,
	GlassBreak = 0xd,
	First = 0xff,
}

// Deprecated
export class SensorBinaryV2 extends CommandClassPacket<SensorBinaryV2Commands> {
	public static readonly commandClass = CommandClasses.SensorBinary; // 0x30 (48)
	public static readonly version = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(SensorBinaryV2, commandAndPayload);
	}
}

export class SensorBinaryGet extends CommandPacket<SensorBinaryV2SensorBinaryGetData> {
	public static readonly CommandClass = SensorBinaryV2;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "SensorBinaryGet",
		"help": "Sensor Binary Get",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "sensorType",
				"help": "Sensor Type",
				"length": 1,
				"values": {
					"0": {
						"name": "Reserved",
						"help": "Reserved"
					},
					"1": {
						"name": "General",
						"help": "General"
					},
					"2": {
						"name": "Smoke",
						"help": "Smoke"
					},
					"3": {
						"name": "Co",
						"help": "CO"
					},
					"4": {
						"name": "Co2",
						"help": "CO2"
					},
					"5": {
						"name": "Heat",
						"help": "Heat"
					},
					"6": {
						"name": "Water",
						"help": "Water"
					},
					"7": {
						"name": "Freeze",
						"help": "Freeze"
					},
					"8": {
						"name": "Tamper",
						"help": "Tamper"
					},
					"9": {
						"name": "Aux",
						"help": "Aux"
					},
					"10": {
						"name": "DoorWindow",
						"help": "Door/Window"
					},
					"11": {
						"name": "Tilt",
						"help": "Tilt"
					},
					"12": {
						"name": "Motion",
						"help": "Motion"
					},
					"13": {
						"name": "GlassBreak",
						"help": "Glass Break"
					},
					"255": {
						"name": "First",
						"help": "First"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SensorBinaryV2)?.command === this.command;
	}

	public constructor(data: Buffer | SensorBinaryV2SensorBinaryGetData) {
		super(SensorBinaryGet, data);
	}
};

export class SensorBinaryReport extends CommandPacket<SensorBinaryV2SensorBinaryReportData> {
	public static readonly CommandClass = SensorBinaryV2;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "SensorBinaryReport",
		"help": "Sensor Binary Report",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "sensorValue",
				"help": "Sensor Value",
				"length": 1,
				"values": {
					"0": {
						"name": "Idle",
						"help": "idle"
					},
					"255": {
						"name": "DetectedAnEvent",
						"help": "detected an event"
					}
				}
			},
			{
				"type": "Integer",
				"name": "sensorType",
				"help": "Sensor Type",
				"length": 1,
				"values": {
					"0": {
						"name": "Reserved",
						"help": "Reserved"
					},
					"1": {
						"name": "General",
						"help": "General"
					},
					"2": {
						"name": "Smoke",
						"help": "Smoke"
					},
					"3": {
						"name": "Co",
						"help": "CO"
					},
					"4": {
						"name": "Co2",
						"help": "CO2"
					},
					"5": {
						"name": "Heat",
						"help": "Heat"
					},
					"6": {
						"name": "Water",
						"help": "Water"
					},
					"7": {
						"name": "Freeze",
						"help": "Freeze"
					},
					"8": {
						"name": "Tamper",
						"help": "Tamper"
					},
					"9": {
						"name": "Aux",
						"help": "Aux"
					},
					"10": {
						"name": "DoorWindow",
						"help": "Door/Window"
					},
					"11": {
						"name": "Tilt",
						"help": "Tilt"
					},
					"12": {
						"name": "Motion",
						"help": "Motion"
					},
					"13": {
						"name": "GlassBreak",
						"help": "Glass Break"
					},
					"255": {
						"name": "First",
						"help": "First"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SensorBinaryV2)?.command === this.command;
	}

	public constructor(data: Buffer | SensorBinaryV2SensorBinaryReportData) {
		super(SensorBinaryReport, data);
	}
};

export class SensorBinarySupportedGetSensor extends CommandPacket<void> {
	public static readonly CommandClass = SensorBinaryV2;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "SensorBinarySupportedGetSensor",
		"help": "Sensor Binary Supported Get Sensor",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SensorBinaryV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(SensorBinarySupportedGetSensor, data);
	}
};

export class SensorBinarySupportedSensorReport extends CommandPacket<SensorBinaryV2SensorBinarySupportedSensorReportData> {
	public static readonly CommandClass = SensorBinaryV2;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
		"command": 4,
		"name": "SensorBinarySupportedSensorReport",
		"help": "Sensor Binary Supported Sensor Report",
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
						"name": "Reserved",
						"help": "Reserved"
					},
					"1": {
						"name": "General",
						"help": "General"
					},
					"2": {
						"name": "Smoke",
						"help": "Smoke"
					},
					"3": {
						"name": "Co",
						"help": "CO"
					},
					"4": {
						"name": "Co2",
						"help": "CO2"
					},
					"5": {
						"name": "Heat",
						"help": "Heat"
					},
					"6": {
						"name": "Water",
						"help": "Water"
					},
					"7": {
						"name": "Freeze",
						"help": "Freeze"
					},
					"8": {
						"name": "Tamper",
						"help": "Tamper"
					},
					"9": {
						"name": "Aux",
						"help": "Aux"
					},
					"10": {
						"name": "DoorWindow",
						"help": "Door/Window"
					},
					"11": {
						"name": "Tilt",
						"help": "Tilt"
					},
					"12": {
						"name": "Motion",
						"help": "Motion"
					},
					"13": {
						"name": "GlassBreak",
						"help": "Glass Break"
					},
					"255": {
						"name": "First",
						"help": "First"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SensorBinaryV2)?.command === this.command;
	}

	public constructor(data: Buffer | SensorBinaryV2SensorBinarySupportedSensorReportData) {
		super(SensorBinarySupportedSensorReport, data);
	}
};
