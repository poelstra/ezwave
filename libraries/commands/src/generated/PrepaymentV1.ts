/**
 * Command Class Prepayment, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum PrepaymentV1Commands {
	PrepaymentBalanceGet = 0x01,
	PrepaymentBalanceReport = 0x02,
	PrepaymentSupportedGet = 0x03,
	PrepaymentSupportedReport = 0x04,
}

export interface PrepaymentV1PrepaymentBalanceGetData {
	balanceType: BalanceTypeEnum; // properties1[7..6]
}

export interface PrepaymentV1PrepaymentBalanceReportData {
	balanceType: number; // properties1[7..6]
	meterType: number; // properties1[5..0]
	balancePrecision: number; // properties2[7..5]
	scale: number; // properties2[4..0]
	balanceValue: number; // 4 byte unsigned integer
	debtPrecision: number; // properties3[7..5]
	debt: number; // 4 byte unsigned integer
	emerCreditPrecision: number; // properties4[7..5]
	emerCredit: number; // 4 byte unsigned integer
	currency: number; // 3 byte unsigned integer
	debtRecoveryPercentage: number; // 1 byte unsigned integer
}

export interface PrepaymentV1PrepaymentSupportedReportData {
	typesSupported: number; // properties1[3..0]
}

export enum BalanceTypeEnum {
	Utility = 0x0,
	Monetary = 0x1,
}

export class PrepaymentV1 extends CommandClassPacket<PrepaymentV1Commands> {
	public static readonly commandClass: number = CommandClasses.Prepayment; // 0x3f (63)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(PrepaymentV1, commandAndPayload);
	}
}

export class PrepaymentBalanceGet extends CommandPacket<PrepaymentV1PrepaymentBalanceGetData> {
	public static readonly CommandClass: typeof PrepaymentV1 = PrepaymentV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "PrepaymentBalanceGet",
		"help": "Prepayment Balance Get",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Enum",
						"name": "balanceType",
						"mask": 192,
						"shift": 6,
						"values": {
							"0": {
								"name": "Utility",
								"help": "Utility"
							},
							"1": {
								"name": "Monetary",
								"help": "Monetary"
							}
						}
					},
					{
						"fieldType": "Integer",
						"name": "reserved",
						"mask": 63,
						"shift": 0,
						"reserved": true
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(PrepaymentV1)?.command === this.command;
	}

	public constructor(data: Buffer | PrepaymentV1PrepaymentBalanceGetData) {
		super(PrepaymentBalanceGet, data);
	}
};

export class PrepaymentBalanceReport extends CommandPacket<PrepaymentV1PrepaymentBalanceReportData> {
	public static readonly CommandClass: typeof PrepaymentV1 = PrepaymentV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "PrepaymentBalanceReport",
		"help": "Prepayment Balance Report",
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
						"name": "balanceType",
						"mask": 192,
						"shift": 6
					},
					{
						"fieldType": "Integer",
						"name": "meterType",
						"mask": 63,
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
						"name": "balancePrecision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "scale",
						"mask": 31,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "balanceValue",
				"help": "Balance Value",
				"length": 4
			},
			{
				"type": "Bitfield",
				"name": "properties3",
				"help": "Properties3",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "debtPrecision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "reserved1",
						"mask": 31,
						"shift": 0,
						"reserved": true
					}
				]
			},
			{
				"type": "Integer",
				"name": "debt",
				"help": "Debt",
				"length": 4
			},
			{
				"type": "Bitfield",
				"name": "properties4",
				"help": "Properties4",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "emerCreditPrecision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "reserved2",
						"mask": 31,
						"shift": 0,
						"reserved": true
					}
				]
			},
			{
				"type": "Integer",
				"name": "emerCredit",
				"help": "Emer Credit",
				"length": 4
			},
			{
				"type": "Integer",
				"name": "currency",
				"help": "Currency",
				"length": 3
			},
			{
				"type": "Integer",
				"name": "debtRecoveryPercentage",
				"help": "Debt Recovery Percentage",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(PrepaymentV1)?.command === this.command;
	}

	public constructor(data: Buffer | PrepaymentV1PrepaymentBalanceReportData) {
		super(PrepaymentBalanceReport, data);
	}
};

export class PrepaymentSupportedGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof PrepaymentV1 = PrepaymentV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "PrepaymentSupportedGet",
		"help": "Prepayment Supported Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(PrepaymentV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(PrepaymentSupportedGet, data);
	}
};

export class PrepaymentSupportedReport extends CommandPacket<PrepaymentV1PrepaymentSupportedReportData> {
	public static readonly CommandClass: typeof PrepaymentV1 = PrepaymentV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "PrepaymentSupportedReport",
		"help": "Prepayment Supported Report",
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
						"mask": 240,
						"shift": 4,
						"reserved": true
					},
					{
						"fieldType": "Integer",
						"name": "typesSupported",
						"mask": 15,
						"shift": 0
					}
				]
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(PrepaymentV1)?.command === this.command;
	}

	public constructor(data: Buffer | PrepaymentV1PrepaymentSupportedReportData) {
		super(PrepaymentSupportedReport, data);
	}
};
