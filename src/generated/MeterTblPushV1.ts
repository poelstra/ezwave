/**
 * Command Class Meter Tbl Push, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum MeterTblPushV1Commands {
	MeterTblPushConfigurationGet = 0x02,
	MeterTblPushConfigurationReport = 0x03,
	MeterTblPushConfigurationSet = 0x01,
}

export interface MeterTblPushV1MeterTblPushConfigurationReportData {
	ps: boolean; // properties1[4]
	operatingStatusPushMode: number; // properties1[3..0]
	pushDataset: number; // 3 byte unsigned integer
	intervalMonths: number; // 1 byte unsigned integer
	intervalDays: number; // 1 byte unsigned integer
	intervalHours: number; // 1 byte unsigned integer
	intervalMinutes: number; // 1 byte unsigned integer
	pushNodeId: number; // 1 byte unsigned integer
}

export interface MeterTblPushV1MeterTblPushConfigurationSetData {
	ps: boolean; // properties1[4]
	operatingStatusPushMode: number; // properties1[3..0]
	pushDataset: number; // 3 byte unsigned integer
	intervalMonths: number; // 1 byte unsigned integer
	intervalDays: number; // 1 byte unsigned integer
	intervalHours: number; // 1 byte unsigned integer
	intervalMinutes: number; // 1 byte unsigned integer
	pushNodeId: number; // 1 byte unsigned integer
}

export class MeterTblPushV1 extends CommandClassPacket<MeterTblPushV1Commands> {
	public static readonly commandClass = CommandClasses.MeterTblPush; // 0x3e (62)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(MeterTblPushV1, commandAndPayload);
	}

	public static readonly MeterTblPushConfigurationGet = class MeterTblPushConfigurationGet extends CommandPacket<void> {
		public static readonly CommandClass = MeterTblPushV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "MeterTblPushConfigurationGet",
			"help": "Meter Tbl Push Configuration Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterTblPushV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(MeterTblPushConfigurationGet, data);
		}
	};

	public static readonly MeterTblPushConfigurationReport = class MeterTblPushConfigurationReport extends CommandPacket<MeterTblPushV1MeterTblPushConfigurationReportData> {
		public static readonly CommandClass = MeterTblPushV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "MeterTblPushConfigurationReport",
			"help": "Meter Tbl Push Configuration Report",
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
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"fieldType": "boolean",
							"name": "ps",
							"mask": 16,
							"shift": 4
						},
						{
							"fieldType": "integer",
							"name": "operatingStatusPushMode",
							"mask": 15,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "pushDataset",
					"help": "Push Dataset",
					"length": 3
				},
				{
					"type": "integer",
					"name": "intervalMonths",
					"help": "Interval Months",
					"length": 1
				},
				{
					"type": "integer",
					"name": "intervalDays",
					"help": "Interval Days",
					"length": 1
				},
				{
					"type": "integer",
					"name": "intervalHours",
					"help": "Interval Hours",
					"length": 1
				},
				{
					"type": "integer",
					"name": "intervalMinutes",
					"help": "Interval Minutes",
					"length": 1
				},
				{
					"type": "integer",
					"name": "pushNodeId",
					"help": "Push Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterTblPushV1)?.command === this.command;
		}

		constructor(data: Buffer | MeterTblPushV1MeterTblPushConfigurationReportData) {
			super(MeterTblPushConfigurationReport, data);
		}
	};

	public static readonly MeterTblPushConfigurationSet = class MeterTblPushConfigurationSet extends CommandPacket<MeterTblPushV1MeterTblPushConfigurationSetData> {
		public static readonly CommandClass = MeterTblPushV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "MeterTblPushConfigurationSet",
			"help": "Meter Tbl Push Configuration Set",
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
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"fieldType": "boolean",
							"name": "ps",
							"mask": 16,
							"shift": 4
						},
						{
							"fieldType": "integer",
							"name": "operatingStatusPushMode",
							"mask": 15,
							"shift": 0
						}
					]
				},
				{
					"type": "integer",
					"name": "pushDataset",
					"help": "Push Dataset",
					"length": 3
				},
				{
					"type": "integer",
					"name": "intervalMonths",
					"help": "Interval Months",
					"length": 1
				},
				{
					"type": "integer",
					"name": "intervalDays",
					"help": "Interval Days",
					"length": 1
				},
				{
					"type": "integer",
					"name": "intervalHours",
					"help": "Interval Hours",
					"length": 1
				},
				{
					"type": "integer",
					"name": "intervalMinutes",
					"help": "Interval Minutes",
					"length": 1
				},
				{
					"type": "integer",
					"name": "pushNodeId",
					"help": "Push Node ID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(MeterTblPushV1)?.command === this.command;
		}

		constructor(data: Buffer | MeterTblPushV1MeterTblPushConfigurationSetData) {
			super(MeterTblPushConfigurationSet, data);
		}
	};
}

export namespace MeterTblPushV1 {
	export type MeterTblPushConfigurationGet = InstanceType<typeof MeterTblPushV1.MeterTblPushConfigurationGet>;
	export type MeterTblPushConfigurationReport = InstanceType<typeof MeterTblPushV1.MeterTblPushConfigurationReport>;
	export type MeterTblPushConfigurationSet = InstanceType<typeof MeterTblPushV1.MeterTblPushConfigurationSet>;
}