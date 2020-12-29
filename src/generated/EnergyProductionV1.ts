/**
 * Command Class Energy Production, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum EnergyProductionV1Commands {
	EnergyProductionGet = 0x02,
	EnergyProductionReport = 0x03,
}

export interface EnergyProductionV1EnergyProductionGetData {
	parameterNumber: ParameterNumberEnum; // 1 byte enum value
}

export interface EnergyProductionV1EnergyProductionReportData {
	parameterNumber: ParameterNumberEnum; // 1 byte enum value
	// TODO param level type bitfield
	// TODO param value type blob
}

export class EnergyProductionV1 extends CommandClassPacket<EnergyProductionV1Commands> {
	public static readonly commandClass = CommandClasses.EnergyProduction; // 0x90 (144)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(EnergyProductionV1, commandAndPayload);
	}

	public static readonly EnergyProductionGet = class EnergyProductionGet extends CommandPacket<EnergyProductionV1EnergyProductionGetData> {
		public static readonly CommandClass = EnergyProductionV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "EnergyProductionGet",
			"help": "Energy Production Get",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "parameterNumber",
					"help": "Parameter Number",
					"length": 1,
					"values": {
						"0": "Instant energy production",
						"1": "Total energy production",
						"2": "Energy production today",
						"3": "Total production time"
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(EnergyProductionV1)?.command === this.command;
		}

		constructor(data: Buffer | EnergyProductionV1EnergyProductionGetData) {
			super(EnergyProductionGet, data);
		}
	};

	public static readonly EnergyProductionReport = class EnergyProductionReport extends CommandPacket<EnergyProductionV1EnergyProductionReportData> {
		public static readonly CommandClass = EnergyProductionV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "EnergyProductionReport",
			"help": "Energy Production Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "parameterNumber",
					"help": "Parameter Number",
					"length": 1,
					"values": {
						"0": "Instant energy production",
						"1": "Total energy production",
						"2": "Energy production today",
						"3": "Total production time"
					}
				},
				{
					"type": "bitfield",
					"name": "level",
					"help": "Level",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Size",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Scale",
							"mask": 24,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Precision",
							"mask": 224,
							"shift": 5
						}
					]
				},
				{
					"type": "blob",
					"name": "value",
					"help": "Value",
					"length": {
						"name": "Level",
						"mask": 7,
						"shift": 0
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(EnergyProductionV1)?.command === this.command;
		}

		constructor(data: Buffer | EnergyProductionV1EnergyProductionReportData) {
			super(EnergyProductionReport, data);
		}
	};
}

export namespace EnergyProductionV1 {
	export type EnergyProductionGet = InstanceType<typeof EnergyProductionV1.EnergyProductionGet>;
	export type EnergyProductionReport = InstanceType<typeof EnergyProductionV1.EnergyProductionReport>;
}

export enum ParameterNumberEnum {
	InstantEnergyProduction = 0x0,
	TotalEnergyProduction = 0x1,
	EnergyProductionToday = 0x2,
	TotalProductionTime = 0x3,
}
