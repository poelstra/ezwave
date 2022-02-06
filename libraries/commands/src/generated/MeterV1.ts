/**
 * Command Class Meter, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum MeterV1Commands {
	MeterGet = 0x01,
	MeterReport = 0x02,
}

export interface MeterV1MeterReportData {
	meterType: MeterTypeEnum; // 1 byte enum value
	precision: number; // properties1[7..5]
	scale: number; // properties1[4..3]
	meterValue: Buffer; // variable length
}

export enum MeterTypeEnum {
	ElectricMeter = 0x1,
	GasMeter = 0x2,
	WaterMeter = 0x3,
}

export class MeterV1 extends CommandClassPacket<MeterV1Commands> {
	public static readonly commandClass = CommandClasses.Meter; // 0x32 (50)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(MeterV1, commandAndPayload);
	}
}

export class MeterGet extends CommandPacket<void> {
	public static readonly CommandClass = MeterV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "MeterGet",
		"help": "Meter Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterV1)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(MeterGet, data);
	}
};

export class MeterReport extends CommandPacket<MeterV1MeterReportData> {
	public static readonly CommandClass = MeterV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "MeterReport",
		"help": "Meter Report",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "meterType",
				"help": "Meter Type",
				"length": 1,
				"values": {
					"1": {
						"name": "ElectricMeter",
						"help": "Electric meter"
					},
					"2": {
						"name": "GasMeter",
						"help": "Gas meter"
					},
					"3": {
						"name": "WaterMeter",
						"help": "Water meter"
					}
				}
			},
			{
				"type": "Bitfield",
				"name": "properties1",
				"help": "Properties1",
				"length": 1,
				"fields": [
					{
						"fieldType": "Integer",
						"name": "precision",
						"mask": 224,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "scale",
						"mask": 24,
						"shift": 3
					},
					{
						"fieldType": "Integer",
						"name": "size",
						"mask": 7,
						"shift": 0,
						"lengthOf": {
							"refs": [
								"meterValue"
							]
						},
						"isAutogenerated": true
					}
				]
			},
			{
				"type": "Blob",
				"name": "meterValue",
				"help": "Meter Value",
				"length": {
					"lengthType": "Ref",
					"from": {
						"ref": "properties1.size"
					}
				}
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(MeterV1)?.command === this.command;
	}

	constructor(data: Buffer | MeterV1MeterReportData) {
		super(MeterReport, data);
	}
};
