/**
 * Command Class Basic Tariff Info, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum BasicTariffInfoV1Commands {
	BasicTariffInfoGet = 0x01,
	BasicTariffInfoReport = 0x02,
}

export interface BasicTariffInfoV1BasicTariffInfoReportData {
	dual: boolean; // properties1[7]
	totalNoImportRates: number; // properties1[3..0]
	e1CurrentRateInUse: number; // properties2[3..0]
	e1RateConsumptionRegister: number; // 4 byte unsigned integer
	e1TimeForNextRateHours: number; // 1 byte unsigned integer
	e1TimeForNextRateMinutes: number; // 1 byte unsigned integer
	e1TimeForNextRateSeconds: number; // 1 byte unsigned integer
	e2CurrentRateInUse: number; // properties3[3..0]
	e2RateConsumptionRegister: number; // 4 byte unsigned integer
}

export class BasicTariffInfoV1 extends CommandClassPacket<BasicTariffInfoV1Commands> {
	public static readonly commandClass = CommandClasses.BasicTariffInfo; // 0x36 (54)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(BasicTariffInfoV1, commandAndPayload);
	}
}

export class BasicTariffInfoGet extends CommandPacket<void> {
	public static readonly CommandClass = BasicTariffInfoV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "BasicTariffInfoGet",
		"help": "Basic Tariff Info Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(BasicTariffInfoV1)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(BasicTariffInfoGet, data);
	}
};

export class BasicTariffInfoReport extends CommandPacket<BasicTariffInfoV1BasicTariffInfoReportData> {
	public static readonly CommandClass = BasicTariffInfoV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "BasicTariffInfoReport",
		"help": "Basic Tariff Info Report",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "dual",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Integer",
						"name": "reserved1",
						"mask": 112,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "totalNoImportRates",
						"mask": 15,
						"shift": 0
					}
				]
			},
			{
				"type": "Bitfield",
				"name": "properties2",
				"help": "Properties2",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved2",
						"mask": 240,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "e1CurrentRateInUse",
						"mask": 15,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "e1RateConsumptionRegister",
				"help": "E1 Rate Consumption Register",
				"length": 4
			},
			{
				"type": "Integer",
				"name": "e1TimeForNextRateHours",
				"help": "E1 Time for Next Rate Hours",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "e1TimeForNextRateMinutes",
				"help": "E1 Time for Next Rate Minutes",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "e1TimeForNextRateSeconds",
				"help": "E1 Time for Next Rate Seconds",
				"length": 1
			},
			{
				"type": "Bitfield",
				"name": "properties3",
				"help": "Properties3",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "reserved3",
						"mask": 240,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "e2CurrentRateInUse",
						"mask": 15,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "e2RateConsumptionRegister",
				"help": "E2 Rate Consumption Register",
				"length": 4
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(BasicTariffInfoV1)?.command === this.command;
	}

	constructor(data: Buffer | BasicTariffInfoV1BasicTariffInfoReportData) {
		super(BasicTariffInfoReport, data);
	}
};
