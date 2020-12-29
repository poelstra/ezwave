/**
 * Command Class Thermostat Operating State, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ThermostatOperatingStateV1Commands {
	ThermostatOperatingStateGet = 0x02,
	ThermostatOperatingStateReport = 0x03,
}

export interface ThermostatOperatingStateV1ThermostatOperatingStateReportData {
	// TODO param level type bitfield
}

export class ThermostatOperatingStateV1 extends CommandClassPacket<ThermostatOperatingStateV1Commands> {
	public static readonly commandClass = CommandClasses.ThermostatOperatingState; // 0x42 (66)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ThermostatOperatingStateV1, commandAndPayload);
	}

	public static readonly ThermostatOperatingStateGet = class ThermostatOperatingStateGet extends CommandPacket<void> {
		public static readonly CommandClass = ThermostatOperatingStateV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "ThermostatOperatingStateGet",
			"help": "Thermostat Operating State Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatOperatingStateV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ThermostatOperatingStateGet, data);
		}
	};

	public static readonly ThermostatOperatingStateReport = class ThermostatOperatingStateReport extends CommandPacket<ThermostatOperatingStateV1ThermostatOperatingStateReportData> {
		public static readonly CommandClass = ThermostatOperatingStateV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "ThermostatOperatingStateReport",
			"help": "Thermostat Operating State Report",
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
							"name": "Operating State",
							"mask": 15,
							"shift": 0,
							"values": {
								"0": "Idle",
								"1": "Heating",
								"2": "Cooling",
								"3": "Fan Only",
								"4": "Pending Heat",
								"5": "Pending Cool",
								"6": "Vent/Economizer"
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
			return packet.tryAs(ThermostatOperatingStateV1)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatOperatingStateV1ThermostatOperatingStateReportData) {
			super(ThermostatOperatingStateReport, data);
		}
	};
}

export namespace ThermostatOperatingStateV1 {
	export type ThermostatOperatingStateGet = InstanceType<typeof ThermostatOperatingStateV1.ThermostatOperatingStateGet>;
	export type ThermostatOperatingStateReport = InstanceType<typeof ThermostatOperatingStateV1.ThermostatOperatingStateReport>;
}
