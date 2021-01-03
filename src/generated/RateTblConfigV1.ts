/**
 * Command Class Rate Tbl Config, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum RateTblConfigV1Commands {
	RateTblRemove = 0x02,
	RateTblSet = 0x01,
}

export interface RateTblConfigV1RateTblRemoveData {
	rateParameterSetID: Buffer; // variable length
}

export interface RateTblConfigV1RateTblSetData {
	rateParameterSetID: number; // 1 byte unsigned integer
	rateType: number; // properties1[6..5]
	rateCharacter: Buffer; // variable length
	startHourLocalTime: number; // 1 byte unsigned integer
	startMinuteLocalTime: number; // 1 byte unsigned integer
	durationMinute: number; // 2 byte unsigned integer
	consumptionPrecision: number; // properties2[7..5]
	consumptionScale: number; // properties2[4..0]
	minConsumptionValue: number; // 4 byte unsigned integer
	maxConsumptionValue: number; // 4 byte unsigned integer
	maxDemandPrecision: number; // properties3[7..5]
	maxDemandScale: number; // properties3[4..0]
	maxDemandValue: number; // 4 byte unsigned integer
	dCPRateID: number; // 1 byte unsigned integer
}

export class RateTblConfigV1 extends CommandClassPacket<RateTblConfigV1Commands> {
	public static readonly commandClass = CommandClasses.RateTblConfig; // 0x48 (72)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(RateTblConfigV1, commandAndPayload);
	}

	public static readonly RateTblRemove = class RateTblRemove extends CommandPacket<RateTblConfigV1RateTblRemoveData> {
		public static readonly CommandClass = RateTblConfigV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "RateTblRemove",
			"help": "Rate Tbl Remove",
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
			return packet.tryAs(RateTblConfigV1)?.command === this.command;
		}

		constructor(data: Buffer | RateTblConfigV1RateTblRemoveData) {
			super(RateTblRemove, data);
		}
	};

	public static readonly RateTblSet = class RateTblSet extends CommandPacket<RateTblConfigV1RateTblSetData> {
		public static readonly CommandClass = RateTblConfigV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "RateTblSet",
			"help": "Rate Tbl Set",
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
							"type": "boolean",
							"name": "reserved",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"type": "integer",
							"name": "rateType",
							"mask": 96,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "numberOfRateChar",
							"mask": 31,
							"shift": 0,
							"lengthOf": {
								"refs": [
									{
										"name": "rateCharacter"
									}
								]
							}
						}
					]
				},
				{
					"type": "blob",
					"name": "rateCharacter",
					"help": "Rate Character",
					"length": {
						"lengthType": "ref",
						"ref": "properties1",
						"bitfield": {
							"mask": 31,
							"shift": 0,
							"name": "numberOfRateChar"
						}
					}
				},
				{
					"type": "integer",
					"name": "startHourLocalTime",
					"help": "Start Hour Local Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "startMinuteLocalTime",
					"help": "Start Minute Local Time",
					"length": 1
				},
				{
					"type": "integer",
					"name": "durationMinute",
					"help": "Duration Minute",
					"length": 2
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "consumptionPrecision",
							"mask": 224,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "consumptionScale",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "minConsumptionValue",
					"help": "Min Consumption Value",
					"length": 4
				},
				{
					"type": "integer",
					"name": "maxConsumptionValue",
					"help": "Max Consumption Value",
					"length": 4
				},
				{
					"type": "bitfield",
					"name": "properties3",
					"help": "Properties3",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "maxDemandPrecision",
							"mask": 224,
							"shift": 5
						},
						{
							"type": "integer",
							"name": "maxDemandScale",
							"mask": 31,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "maxDemandValue",
					"help": "Max Demand Value",
					"length": 4
				},
				{
					"type": "integer",
					"name": "dCPRateID",
					"help": "DCP Rate ID",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(RateTblConfigV1)?.command === this.command;
		}

		constructor(data: Buffer | RateTblConfigV1RateTblSetData) {
			super(RateTblSet, data);
		}
	};
}

export namespace RateTblConfigV1 {
	export type RateTblRemove = InstanceType<typeof RateTblConfigV1.RateTblRemove>;
	export type RateTblSet = InstanceType<typeof RateTblConfigV1.RateTblSet>;
}
