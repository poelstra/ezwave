/**
 * Command Class Thermostat Fan State, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum ThermostatFanStateV1Commands {
	ThermostatFanStateGet = 0x02,
	ThermostatFanStateReport = 0x03,
}

export interface ThermostatFanStateV1ThermostatFanStateReportData {
	fanOperatingState: FanOperatingStateEnum; // level[3..0]
}

export enum FanOperatingStateEnum {
	Idle = 0x0,
	Running = 0x1,
}

export class ThermostatFanStateV1 extends CommandClassPacket<ThermostatFanStateV1Commands> {
	public static readonly commandClass = CommandClasses.ThermostatFanState; // 0x45 (69)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(ThermostatFanStateV1, commandAndPayload);
	}
}

export class ThermostatFanStateGet extends CommandPacket<void> {
	public static readonly CommandClass = ThermostatFanStateV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "ThermostatFanStateGet",
		"help": "Thermostat Fan State Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatFanStateV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(ThermostatFanStateGet, data);
	}
};

export class ThermostatFanStateReport extends CommandPacket<ThermostatFanStateV1ThermostatFanStateReportData> {
	public static readonly CommandClass = ThermostatFanStateV1;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "ThermostatFanStateReport",
		"help": "Thermostat Fan State Report",
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
						"name": "fanOperatingState",
						"mask": 15,
						"shift": 0,
						"values": {
							"0": {
								"name": "Idle",
								"help": "Idle"
							},
							"1": {
								"name": "Running",
								"help": "Running"
							}
						}
					}
				]
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(ThermostatFanStateV1)?.command === this.command;
	}

	public constructor(data: Buffer | ThermostatFanStateV1ThermostatFanStateReportData) {
		super(ThermostatFanStateReport, data);
	}
};
