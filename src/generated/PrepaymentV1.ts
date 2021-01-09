/**
 * Command Class Prepayment, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

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
	public static readonly commandClass = CommandClasses.Prepayment; // 0x3f (63)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(PrepaymentV1, commandAndPayload);
	}

	public static readonly PrepaymentBalanceGet = class PrepaymentBalanceGet extends CommandPacket<PrepaymentV1PrepaymentBalanceGetData> {
		public static readonly CommandClass = PrepaymentV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "PrepaymentBalanceGet",
			"help": "Prepayment Balance Get",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "enum",
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
							"fieldType": "integer",
							"name": "reserved",
							"mask": 63,
							"shift": 0,
							"reserved": true
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(PrepaymentV1)?.command === this.command;
		}

		constructor(data: Buffer | PrepaymentV1PrepaymentBalanceGetData) {
			super(PrepaymentBalanceGet, data);
		}
	};

	public static readonly PrepaymentBalanceReport = class PrepaymentBalanceReport extends CommandPacket<PrepaymentV1PrepaymentBalanceReportData> {
		public static readonly CommandClass = PrepaymentV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "PrepaymentBalanceReport",
			"help": "Prepayment Balance Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "balanceType",
							"mask": 192,
							"shift": 6
						},
						{
							"fieldType": "integer",
							"name": "meterType",
							"mask": 63,
							"shift": 0
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
							"fieldType": "integer",
							"name": "balancePrecision",
							"mask": 224,
							"shift": 5
						},
						{
							"fieldType": "integer",
							"name": "scale",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "balanceValue",
					"help": "Balance Value",
					"length": 4
				},
				{
					"type": "bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "debtPrecision",
							"mask": 224,
							"shift": 5
						},
						{
							"fieldType": "integer",
							"name": "reserved1",
							"mask": 31,
							"shift": 0,
							"reserved": true
						}
					]
				},
				{
					"type": "integer",
					"name": "debt",
					"help": "Debt",
					"length": 4
				},
				{
					"type": "bitfield",
					"name": "properties4",
					"help": "Properties4",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "emerCreditPrecision",
							"mask": 224,
							"shift": 5
						},
						{
							"fieldType": "integer",
							"name": "reserved2",
							"mask": 31,
							"shift": 0,
							"reserved": true
						}
					]
				},
				{
					"type": "integer",
					"name": "emerCredit",
					"help": "Emer Credit",
					"length": 4
				},
				{
					"type": "integer",
					"name": "currency",
					"help": "Currency",
					"length": 3
				},
				{
					"type": "integer",
					"name": "debtRecoveryPercentage",
					"help": "Debt Recovery Percentage",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(PrepaymentV1)?.command === this.command;
		}

		constructor(data: Buffer | PrepaymentV1PrepaymentBalanceReportData) {
			super(PrepaymentBalanceReport, data);
		}
	};

	public static readonly PrepaymentSupportedGet = class PrepaymentSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = PrepaymentV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "PrepaymentSupportedGet",
			"help": "Prepayment Supported Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(PrepaymentV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(PrepaymentSupportedGet, data);
		}
	};

	public static readonly PrepaymentSupportedReport = class PrepaymentSupportedReport extends CommandPacket<PrepaymentV1PrepaymentSupportedReportData> {
		public static readonly CommandClass = PrepaymentV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "PrepaymentSupportedReport",
			"help": "Prepayment Supported Report",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "integer",
							"name": "reserved",
							"mask": 240,
							"shift": 4,
							"reserved": true
						},
						{
							"fieldType": "integer",
							"name": "typesSupported",
							"mask": 15,
							"shift": 0
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(PrepaymentV1)?.command === this.command;
		}

		constructor(data: Buffer | PrepaymentV1PrepaymentSupportedReportData) {
			super(PrepaymentSupportedReport, data);
		}
	};
}

export namespace PrepaymentV1 {
	export type PrepaymentBalanceGet = InstanceType<typeof PrepaymentV1.PrepaymentBalanceGet>;
	export type PrepaymentBalanceReport = InstanceType<typeof PrepaymentV1.PrepaymentBalanceReport>;
	export type PrepaymentSupportedGet = InstanceType<typeof PrepaymentV1.PrepaymentSupportedGet>;
	export type PrepaymentSupportedReport = InstanceType<typeof PrepaymentV1.PrepaymentSupportedReport>;
}
