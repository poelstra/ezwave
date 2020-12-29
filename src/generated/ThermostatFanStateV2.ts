/**
 * Command Class Thermostat Fan State, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ThermostatFanStateV2Commands {
	ThermostatFanStateGet = 0x02,
	ThermostatFanStateReport = 0x03,
}

export interface ThermostatFanStateV2ThermostatFanStateReportData {
	// TODO param level type bitfield
}

export class ThermostatFanStateV2 extends CommandClassPacket<ThermostatFanStateV2Commands> {
	public static readonly commandClass = CommandClasses.ThermostatFanState; // 0x45 (69)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ThermostatFanStateV2, commandAndPayload);
	}

	public static readonly ThermostatFanStateGet = class ThermostatFanStateGet extends CommandPacket<void> {
		public static readonly CommandClass = ThermostatFanStateV2;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "ThermostatFanStateGet",
			"help": "Thermostat Fan State Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatFanStateV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ThermostatFanStateGet, data);
		}
	};

	public static readonly ThermostatFanStateReport = class ThermostatFanStateReport extends CommandPacket<ThermostatFanStateV2ThermostatFanStateReportData> {
		public static readonly CommandClass = ThermostatFanStateV2;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "ThermostatFanStateReport",
			"help": "Thermostat Fan State Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"type": "enum",
							"name": "Fan Operating State",
							"mask": 15,
							"shift": 0,
							"values": {
								"0": "Idle",
								"1": "Running",
								"2": "Running High",
								"3": "Running Medium",
								"4": "Circulation",
								"5": "Humidity Circulation",
								"6": "Right-Left Circulation",
								"7": "Up-Down Circulation",
								"8": "Quiet Circulation"
							}
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 240,
							"shift": 4
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatFanStateV2)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatFanStateV2ThermostatFanStateReportData) {
			super(ThermostatFanStateReport, data);
		}
	};
}

export namespace ThermostatFanStateV2 {
	export type ThermostatFanStateGet = InstanceType<typeof ThermostatFanStateV2.ThermostatFanStateGet>;
	export type ThermostatFanStateReport = InstanceType<typeof ThermostatFanStateV2.ThermostatFanStateReport>;
}
