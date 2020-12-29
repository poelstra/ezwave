/**
 * Command Class Thermostat Setback, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum ThermostatSetbackV1Commands {
	ThermostatSetbackGet = 0x02,
	ThermostatSetbackReport = 0x03,
	ThermostatSetbackSet = 0x01,
}

export interface ThermostatSetbackV1ThermostatSetbackReportData {
	// TODO param properties1 type bitfield
	setbackState: number; // 1 byte unsigned integer
}

export interface ThermostatSetbackV1ThermostatSetbackSetData {
	// TODO param properties1 type bitfield
	setbackState: number; // 1 byte unsigned integer
}

export class ThermostatSetbackV1 extends CommandClassPacket<ThermostatSetbackV1Commands> {
	public static readonly commandClass = CommandClasses.ThermostatSetback; // 0x47 (71)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ThermostatSetbackV1, commandAndPayload);
	}

	public static readonly ThermostatSetbackGet = class ThermostatSetbackGet extends CommandPacket<void> {
		public static readonly CommandClass = ThermostatSetbackV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "ThermostatSetbackGet",
			"help": "Thermostat Setback Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatSetbackV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(ThermostatSetbackGet, data);
		}
	};

	public static readonly ThermostatSetbackReport = class ThermostatSetbackReport extends CommandPacket<ThermostatSetbackV1ThermostatSetbackReportData> {
		public static readonly CommandClass = ThermostatSetbackV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "ThermostatSetbackReport",
			"help": "Thermostat Setback Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "enum",
							"name": "Setback Type",
							"mask": 3,
							"shift": 0,
							"values": {
								"0": "No override",
								"1": "Temporary override",
								"2": "Permanent override",
								"3": "Reserved"
							}
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 252,
							"shift": 2
						}
					]
				},
				{
					"type": "integer",
					"name": "setbackState",
					"help": "Setback State",
					"length": 1,
					"values": {
						"121": "Frost Protection",
						"122": "Energy Saving Mode",
						"123": "Reserved",
						"124": "Reserved",
						"125": "Reserved",
						"126": "Reserved",
						"127": "Unused State"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatSetbackV1)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatSetbackV1ThermostatSetbackReportData) {
			super(ThermostatSetbackReport, data);
		}
	};

	public static readonly ThermostatSetbackSet = class ThermostatSetbackSet extends CommandPacket<ThermostatSetbackV1ThermostatSetbackSetData> {
		public static readonly CommandClass = ThermostatSetbackV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "ThermostatSetbackSet",
			"help": "Thermostat Setback Set",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "enum",
							"name": "Setback Type",
							"mask": 3,
							"shift": 0,
							"values": {
								"0": "No override",
								"1": "Temporary override",
								"2": "Permanent override",
								"3": "Reserved"
							}
						},
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 252,
							"shift": 2
						}
					]
				},
				{
					"type": "integer",
					"name": "setbackState",
					"help": "Setback State",
					"length": 1,
					"values": {
						"121": "Frost Protection",
						"122": "Energy Saving Mode",
						"123": "Reserved",
						"124": "Reserved",
						"125": "Reserved",
						"126": "Reserved",
						"127": "Unused State"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(ThermostatSetbackV1)?.command === this.command;
		}

		constructor(data: Buffer | ThermostatSetbackV1ThermostatSetbackSetData) {
			super(ThermostatSetbackSet, data);
		}
	};
}

export namespace ThermostatSetbackV1 {
	export type ThermostatSetbackGet = InstanceType<typeof ThermostatSetbackV1.ThermostatSetbackGet>;
	export type ThermostatSetbackReport = InstanceType<typeof ThermostatSetbackV1.ThermostatSetbackReport>;
	export type ThermostatSetbackSet = InstanceType<typeof ThermostatSetbackV1.ThermostatSetbackSet>;
}
