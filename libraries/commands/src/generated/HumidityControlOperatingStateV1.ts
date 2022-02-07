/**
 * Command Class Humidity Control Operating State, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum HumidityControlOperatingStateV1Commands {
	HumidityControlOperatingStateGet = 0x01,
	HumidityControlOperatingStateReport = 0x02,
}

export interface HumidityControlOperatingStateV1HumidityControlOperatingStateReportData {
	operatingState: OperatingStateEnum; // properties1[3..0]
}

export enum OperatingStateEnum {
	Idle = 0x0,
	Humidifying = 0x1,
	Dehumidifying = 0x2,
}

export class HumidityControlOperatingStateV1 extends CommandClassPacket<HumidityControlOperatingStateV1Commands> {
	public static readonly commandClass = CommandClasses.HumidityControlOperatingState; // 0x6e (110)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(HumidityControlOperatingStateV1, commandAndPayload);
	}
}

export class HumidityControlOperatingStateGet extends CommandPacket<void> {
	public static readonly CommandClass = HumidityControlOperatingStateV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "HumidityControlOperatingStateGet",
		"help": "Humidity Control Operating State Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(HumidityControlOperatingStateV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(HumidityControlOperatingStateGet, data);
	}
};

export class HumidityControlOperatingStateReport extends CommandPacket<HumidityControlOperatingStateV1HumidityControlOperatingStateReportData> {
	public static readonly CommandClass = HumidityControlOperatingStateV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "HumidityControlOperatingStateReport",
		"help": "Humidity Control Operating State Report",
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
						"name": "operatingState",
						"mask": 15,
						"shift": 0,
						"values": {
							"0": {
								"name": "Idle",
								"help": "Idle"
							},
							"1": {
								"name": "Humidifying",
								"help": "Humidifying"
							},
							"2": {
								"name": "Dehumidifying",
								"help": "Dehumidifying"
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(HumidityControlOperatingStateV1)?.command === this.command;
	}

	public constructor(data: Buffer | HumidityControlOperatingStateV1HumidityControlOperatingStateReportData) {
		super(HumidityControlOperatingStateReport, data);
	}
};
