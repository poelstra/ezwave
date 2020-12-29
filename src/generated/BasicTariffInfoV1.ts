/**
 * Command Class Basic Tariff Info, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum BasicTariffInfoV1Commands {
	BasicTariffInfoGet = 0x01,
	BasicTariffInfoReport = 0x02,
}

export interface BasicTariffInfoV1BasicTariffInfoReportData {
	// TODO param properties1 type bitfield
	// TODO param properties2 type bitfield
	e1RateConsumptionRegister: number; // 4 byte unsigned integer
	e1TimeForNextRateHours: number; // 1 byte unsigned integer
	e1TimeForNextRateMinutes: number; // 1 byte unsigned integer
	e1TimeForNextRateSeconds: number; // 1 byte unsigned integer
	// TODO param properties3 type bitfield
	e2RateConsumptionRegister: number; // 4 byte unsigned integer
}

export class BasicTariffInfoV1 extends CommandClassPacket<BasicTariffInfoV1Commands> {
	public static readonly commandClass = CommandClasses.BasicTariffInfo; // 0x36 (54)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(BasicTariffInfoV1, commandAndPayload);
	}

	public static readonly BasicTariffInfoGet = class BasicTariffInfoGet extends CommandPacket<void> {
		public static readonly CommandClass = BasicTariffInfoV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "BasicTariffInfoGet",
			"help": "Basic Tariff Info Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(BasicTariffInfoV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(BasicTariffInfoGet, data);
		}
	};

	public static readonly BasicTariffInfoReport = class BasicTariffInfoReport extends CommandPacket<BasicTariffInfoV1BasicTariffInfoReportData> {
		public static readonly CommandClass = BasicTariffInfoV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "BasicTariffInfoReport",
			"help": "Basic Tariff Info Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Total No. Import Rates",
							"mask": 15,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved1",
							"mask": 112,
							"shift": 4
						},
						{
							"type": "boolean",
							"name": "Dual",
							"mask": 128,
							"shift": 7
						}
					]
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "E1 Current Rate in Use",
							"mask": 15,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved2",
							"mask": 240,
							"shift": 4
						}
					]
				},
				{
					"type": "integer",
					"name": "e1RateConsumptionRegister",
					"help": "E1 Rate Consumption Register",
					"length": 4
				},
				{
					"type": "integer",
					"name": "e1TimeForNextRateHours",
					"help": "E1 Time for Next Rate Hours",
					"length": 1
				},
				{
					"type": "integer",
					"name": "e1TimeForNextRateMinutes",
					"help": "E1 Time for Next Rate Minutes",
					"length": 1
				},
				{
					"type": "integer",
					"name": "e1TimeForNextRateSeconds",
					"help": "E1 Time for Next Rate Seconds",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "E2 Current Rate in Use",
							"mask": 15,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Reserved3",
							"mask": 240,
							"shift": 4
						}
					]
				},
				{
					"type": "integer",
					"name": "e2RateConsumptionRegister",
					"help": "E2 Rate Consumption Register",
					"length": 4
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(BasicTariffInfoV1)?.command === this.command;
		}

		constructor(data: Buffer | BasicTariffInfoV1BasicTariffInfoReportData) {
			super(BasicTariffInfoReport, data);
		}
	};
}

export namespace BasicTariffInfoV1 {
	export type BasicTariffInfoGet = InstanceType<typeof BasicTariffInfoV1.BasicTariffInfoGet>;
	export type BasicTariffInfoReport = InstanceType<typeof BasicTariffInfoV1.BasicTariffInfoReport>;
}
