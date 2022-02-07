/**
 * Command Class Meter Tbl Push, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(MeterTblPushV1, commandAndPayload);
	}
}

export class MeterTblPushConfigurationGet extends CommandPacket<void> {
	public static readonly CommandClass = MeterTblPushV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "MeterTblPushConfigurationGet",
		"help": "Meter Tbl Push Configuration Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterTblPushV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(MeterTblPushConfigurationGet, data);
	}
};

export class MeterTblPushConfigurationReport extends CommandPacket<MeterTblPushV1MeterTblPushConfigurationReportData> {
	public static readonly CommandClass = MeterTblPushV1;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "MeterTblPushConfigurationReport",
		"help": "Meter Tbl Push Configuration Report",
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
						"mask": 224,
						"shift": 5,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "ps",
						"mask": 16,
						"shift": 4
					},
					{
						"fieldType": "Integer",
						"name": "operatingStatusPushMode",
						"mask": 15,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "pushDataset",
				"help": "Push Dataset",
				"length": 3
			},
			{
				"type": "Integer",
				"name": "intervalMonths",
				"help": "Interval Months",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "intervalDays",
				"help": "Interval Days",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "intervalHours",
				"help": "Interval Hours",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "intervalMinutes",
				"help": "Interval Minutes",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "pushNodeId",
				"help": "Push Node ID",
				"length": 1,
				"valueType": "NodeNumber"
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterTblPushV1)?.command === this.command;
	}

	public constructor(data: Buffer | MeterTblPushV1MeterTblPushConfigurationReportData) {
		super(MeterTblPushConfigurationReport, data);
	}
};

export class MeterTblPushConfigurationSet extends CommandPacket<MeterTblPushV1MeterTblPushConfigurationSetData> {
	public static readonly CommandClass = MeterTblPushV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "MeterTblPushConfigurationSet",
		"help": "Meter Tbl Push Configuration Set",
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
						"mask": 224,
						"shift": 5,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "ps",
						"mask": 16,
						"shift": 4
					},
					{
						"fieldType": "Integer",
						"name": "operatingStatusPushMode",
						"mask": 15,
						"shift": 0
					}
				]
			},
			{
				"type": "Integer",
				"name": "pushDataset",
				"help": "Push Dataset",
				"length": 3
			},
			{
				"type": "Integer",
				"name": "intervalMonths",
				"help": "Interval Months",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "intervalDays",
				"help": "Interval Days",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "intervalHours",
				"help": "Interval Hours",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "intervalMinutes",
				"help": "Interval Minutes",
				"length": 1
			},
			{
				"type": "Integer",
				"name": "pushNodeId",
				"help": "Push Node ID",
				"length": 1,
				"valueType": "NodeNumber"
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterTblPushV1)?.command === this.command;
	}

	public constructor(data: Buffer | MeterTblPushV1MeterTblPushConfigurationSetData) {
		super(MeterTblPushConfigurationSet, data);
	}
};
