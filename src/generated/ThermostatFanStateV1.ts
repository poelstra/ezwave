/**
 * Command Class Thermostat Fan State, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

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

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ThermostatFanStateV1, commandAndPayload);
	}

	public static readonly ThermostatFanStateGet = class ThermostatFanStateGet extends CommandPacket<void> {
		public static readonly CommandClass = ThermostatFanStateV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "ThermostatFanStateGet",
			"help": "Thermostat Fan State Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatFanStateV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ThermostatFanStateGet, data);
		}
	};

	public static readonly ThermostatFanStateReport = class ThermostatFanStateReport extends CommandPacket<ThermostatFanStateV1ThermostatFanStateReportData> {
		public static readonly CommandClass = ThermostatFanStateV1;
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
							"type": "integer",
							"name": "reserved",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"type": "enum",
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
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatFanStateV1)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatFanStateV1ThermostatFanStateReportData) {
			super(ThermostatFanStateReport, data);
		}
	};
}

export namespace ThermostatFanStateV1 {
	export type ThermostatFanStateGet = InstanceType<typeof ThermostatFanStateV1.ThermostatFanStateGet>;
	export type ThermostatFanStateReport = InstanceType<typeof ThermostatFanStateV1.ThermostatFanStateReport>;
}
