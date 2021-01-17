/**
 * Command Class Thermostat Setback, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum ThermostatSetbackV1Commands {
	ThermostatSetbackGet = 0x02,
	ThermostatSetbackReport = 0x03,
	ThermostatSetbackSet = 0x01,
}

export interface ThermostatSetbackV1ThermostatSetbackReportData {
	setbackType: SetbackTypeEnum; // properties1[1..0]
	setbackState: number; // 1 byte unsigned integer
}

export interface ThermostatSetbackV1ThermostatSetbackSetData {
	setbackType: SetbackTypeEnum; // properties1[1..0]
	setbackState: number; // 1 byte unsigned integer
}

export enum SetbackTypeEnum {
	NoOverride = 0x0,
	TemporaryOverride = 0x1,
	PermanentOverride = 0x2,
	Reserved = 0x3,
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
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "ThermostatSetbackGet",
			"help": "Thermostat Setback Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "ThermostatSetbackReport",
			"help": "Thermostat Setback Report",
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
							"mask": 252,
							"shift": 2,
							"reserved": true
						},
						{
							"fieldType": "Enum",
							"name": "setbackType",
							"mask": 3,
							"shift": 0,
							"values": {
								"0": {
									"name": "NoOverride",
									"help": "No override"
								},
								"1": {
									"name": "TemporaryOverride",
									"help": "Temporary override"
								},
								"2": {
									"name": "PermanentOverride",
									"help": "Permanent override"
								},
								"3": {
									"name": "Reserved",
									"help": "Reserved"
								}
							}
						}
					]
				},
				{
					"type": "Integer",
					"name": "setbackState",
					"help": "Setback State",
					"length": 1,
					"values": {
						"121": {
							"name": "FrostProtection",
							"help": "Frost Protection"
						},
						"122": {
							"name": "EnergySavingMode",
							"help": "Energy Saving Mode"
						},
						"123": {
							"name": "Reserved",
							"help": "Reserved"
						},
						"124": {
							"name": "Reserved",
							"help": "Reserved"
						},
						"125": {
							"name": "Reserved",
							"help": "Reserved"
						},
						"126": {
							"name": "Reserved",
							"help": "Reserved"
						},
						"127": {
							"name": "UnusedState",
							"help": "Unused State"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

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
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "ThermostatSetbackSet",
			"help": "Thermostat Setback Set",
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
							"mask": 252,
							"shift": 2,
							"reserved": true
						},
						{
							"fieldType": "Enum",
							"name": "setbackType",
							"mask": 3,
							"shift": 0,
							"values": {
								"0": {
									"name": "NoOverride",
									"help": "No override"
								},
								"1": {
									"name": "TemporaryOverride",
									"help": "Temporary override"
								},
								"2": {
									"name": "PermanentOverride",
									"help": "Permanent override"
								},
								"3": {
									"name": "Reserved",
									"help": "Reserved"
								}
							}
						}
					]
				},
				{
					"type": "Integer",
					"name": "setbackState",
					"help": "Setback State",
					"length": 1,
					"values": {
						"121": {
							"name": "FrostProtection",
							"help": "Frost Protection"
						},
						"122": {
							"name": "EnergySavingMode",
							"help": "Energy Saving Mode"
						},
						"123": {
							"name": "Reserved",
							"help": "Reserved"
						},
						"124": {
							"name": "Reserved",
							"help": "Reserved"
						},
						"125": {
							"name": "Reserved",
							"help": "Reserved"
						},
						"126": {
							"name": "Reserved",
							"help": "Reserved"
						},
						"127": {
							"name": "UnusedState",
							"help": "Unused State"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

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
