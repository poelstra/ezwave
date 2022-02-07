/**
 * Command Class Thermostat Operating State, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum ThermostatOperatingStateV1Commands {
	ThermostatOperatingStateGet = 0x02,
	ThermostatOperatingStateReport = 0x03,
}

export interface ThermostatOperatingStateV1ThermostatOperatingStateReportData {
	operatingState: OperatingStateEnum; // level[3..0]
}

export enum OperatingStateEnum {
	Idle = 0x0,
	Heating = 0x1,
	Cooling = 0x2,
	FanOnly = 0x3,
	PendingHeat = 0x4,
	PendingCool = 0x5,
	VentEconomizer = 0x6,
}

export class ThermostatOperatingStateV1 extends CommandClassPacket<ThermostatOperatingStateV1Commands> {
	public static readonly commandClass = CommandClasses.ThermostatOperatingState; // 0x42 (66)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ThermostatOperatingStateV1, commandAndPayload);
	}
}

export class ThermostatOperatingStateGet extends CommandPacket<void> {
	public static readonly CommandClass = ThermostatOperatingStateV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "ThermostatOperatingStateGet",
		"help": "Thermostat Operating State Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatOperatingStateV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ThermostatOperatingStateGet, data);
	}
};

export class ThermostatOperatingStateReport extends CommandPacket<ThermostatOperatingStateV1ThermostatOperatingStateReportData> {
	public static readonly CommandClass = ThermostatOperatingStateV1;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "ThermostatOperatingStateReport",
		"help": "Thermostat Operating State Report",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "level",
				"help": "Level",
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
								"name": "Heating",
								"help": "Heating"
							},
							"2": {
								"name": "Cooling",
								"help": "Cooling"
							},
							"3": {
								"name": "FanOnly",
								"help": "Fan Only"
							},
							"4": {
								"name": "PendingHeat",
								"help": "Pending Heat"
							},
							"5": {
								"name": "PendingCool",
								"help": "Pending Cool"
							},
							"6": {
								"name": "VentEconomizer",
								"help": "Vent/Economizer"
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatOperatingStateV1)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatOperatingStateV1ThermostatOperatingStateReportData) {
		super(ThermostatOperatingStateReport, data);
	}
};
