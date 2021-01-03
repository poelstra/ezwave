/**
 * Command Class Tariff Config, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum TariffConfigV1Commands {
	TariffTblRemove = 0x03,
	TariffTblSet = 0x02,
	TariffTblSupplierSet = 0x01,
}

export interface TariffConfigV1TariffTblRemoveData {
	rateParameterSetID: Buffer; // variable length
}

export interface TariffConfigV1TariffTblSetData {
	rateParameterSetID: number; // 1 byte unsigned integer
	tariffPrecision: number; // properties1[7..5]
	tariffValue: number; // 4 byte unsigned integer
}

export interface TariffConfigV1TariffTblSupplierSetData {
	year: number; // 2 byte unsigned integer
	month: number; // 1 byte unsigned integer
	day: number; // 1 byte unsigned integer
	hourLocalTime: number; // 1 byte unsigned integer
	minuteLocalTime: number; // 1 byte unsigned integer
	secondLocalTime: number; // 1 byte unsigned integer
	currency: number; // 3 byte unsigned integer
	standingChargePrecision: number; // properties1[7..5]
	standingChargePeriod: number; // properties1[4..0]
	standingChargeValue: number; // 4 byte unsigned integer
	supplierCharacter: Buffer; // variable length
}

export class TariffConfigV1 extends CommandClassPacket<TariffConfigV1Commands> {
	public static readonly commandClass = CommandClasses.TariffConfig; // 0x4a (74)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(TariffConfigV1, commandAndPayload);
	}

	public static readonly TariffTblRemove = class TariffTblRemove extends CommandPacket<TariffConfigV1TariffTblRemoveData> {
		public static readonly CommandClass = TariffConfigV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "TariffTblRemove",
			"help": "Tariff Tbl Remove",
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
							"name": "reserved",
							"mask": 192,
							"shift": 6,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "rateParameterSetIDs",
							"mask": 63,
							"shift": 0,
							"lengthOf": {
								"refs": [
									{
										"name": "rateParameterSetID"
									}
								]
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "rateParameterSetID",
					"help": "Rate Parameter Set ID",
					"length": {
						"lengthType": "ref",
						"ref": "properties1",
						"bitfield": {
							"mask": 63,
							"shift": 0,
							"name": "rateParameterSetIDs"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TariffConfigV1)?.command === this.command;
		}

		constructor(data: Buffer | TariffConfigV1TariffTblRemoveData) {
			super(TariffTblRemove, data);
		}
	};

	public static readonly TariffTblSet = class TariffTblSet extends CommandPacket<TariffConfigV1TariffTblSetData> {
		public static readonly CommandClass = TariffConfigV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "TariffTblSet",
			"help": "Tariff Tbl Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "rateParameterSetID",
					"help": "Rate Parameter Set ID",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "tariffPrecision",
							"mask": 224,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "reserved",
							"mask": 31,
							"shift": 0,
							"reserved": true
						}
					]
				},
				{
					"type": "integer",
					"name": "tariffValue",
					"help": "Tariff Value",
					"length": 4
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TariffConfigV1)?.command === this.command;
		}

		constructor(data: Buffer | TariffConfigV1TariffTblSetData) {
			super(TariffTblSet, data);
		}
	};

	public static readonly TariffTblSupplierSet = class TariffTblSupplierSet extends CommandPacket<TariffConfigV1TariffTblSupplierSetData> {
		public static readonly CommandClass = TariffConfigV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "TariffTblSupplierSet",
			"help": "Tariff Tbl Supplier Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "year",
					"help": "Year",
					"length": 2
				},
				{
					"type": "integer",
					"name": "month",
					"help": "Month",
					"length": 1
				},
				{
					"type": "integer",
					"name": "day",
					"help": "Day",
					"length": 1
				},
				{
					"type": "integer",
					"name": "hourLocalTime",
					"help": "Hour Local Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "minuteLocalTime",
					"help": "Minute Local Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "secondLocalTime",
					"help": "Second Local Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "currency",
					"help": "Currency",
					"length": 3
				},
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "standingChargePrecision",
							"mask": 224,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "standingChargePeriod",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "standingChargeValue",
					"help": "Standing Charge Value",
					"length": 4
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved",
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "numberOfSupplierCharacters",
							"mask": 31,
							"shift": 0,
							"lengthOf": {
								"refs": [
									{
										"name": "supplierCharacter"
									}
								]
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "supplierCharacter",
					"help": "Supplier Character",
					"length": {
						"lengthType": "ref",
						"ref": "properties2",
						"bitfield": {
							"mask": 31,
							"shift": 0,
							"name": "numberOfSupplierCharacters"
						}
					}
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TariffConfigV1)?.command === this.command;
		}

		constructor(data: Buffer | TariffConfigV1TariffTblSupplierSetData) {
			super(TariffTblSupplierSet, data);
		}
	};
}

export namespace TariffConfigV1 {
	export type TariffTblRemove = InstanceType<typeof TariffConfigV1.TariffTblRemove>;
	export type TariffTblSet = InstanceType<typeof TariffConfigV1.TariffTblSet>;
	export type TariffTblSupplierSet = InstanceType<typeof TariffConfigV1.TariffTblSupplierSet>;
}
