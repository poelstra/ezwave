/**
 * Command Class Thermostat Fan State, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum ThermostatFanStateV2Commands {
	ThermostatFanStateGet = 0x02,
	ThermostatFanStateReport = 0x03,
}

export interface ThermostatFanStateV2ThermostatFanStateReportData {
	fanOperatingState: FanOperatingStateEnum; // level[3..0]
}

export enum FanOperatingStateEnum {
	Idle = 0x0,
	Running = 0x1,
	RunningHigh = 0x2,
	RunningMedium = 0x3,
	Circulation = 0x4,
	HumidityCirculation = 0x5,
	RightLeftCirculation = 0x6,
	UpDownCirculation = 0x7,
	QuietCirculation = 0x8,
}

export class ThermostatFanStateV2 extends CommandClassPacket<ThermostatFanStateV2Commands> {
	public static readonly commandClass = CommandClasses.ThermostatFanState; // 0x45 (69)
	public static readonly version = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ThermostatFanStateV2, commandAndPayload);
	}

	public static readonly ThermostatFanStateGet = class ThermostatFanStateGet extends CommandPacket<void> {
		public static readonly CommandClass = ThermostatFanStateV2;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "ThermostatFanStateGet",
			"help": "Thermostat Fan State Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

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
								},
								"2": {
									"name": "RunningHigh",
									"help": "Running High"
								},
								"3": {
									"name": "RunningMedium",
									"help": "Running Medium"
								},
								"4": {
									"name": "Circulation",
									"help": "Circulation"
								},
								"5": {
									"name": "HumidityCirculation",
									"help": "Humidity Circulation"
								},
								"6": {
									"name": "RightLeftCirculation",
									"help": "Right-Left Circulation"
								},
								"7": {
									"name": "UpDownCirculation",
									"help": "Up-Down Circulation"
								},
								"8": {
									"name": "QuietCirculation",
									"help": "Quiet Circulation"
								}
							}
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

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
