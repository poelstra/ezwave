/**
 * Command Class Switch Color, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum SwitchColorV1Commands {
	SwitchColorSupportedGet = 0x01,
	SwitchColorSupportedReport = 0x02,
	SwitchColorGet = 0x03,
	SwitchColorReport = 0x04,
	SwitchColorSet = 0x05,
	SwitchColorStartLevelChange = 0x06,
	SwitchColorStopLevelChange = 0x07,
}

export interface SwitchColorV1SwitchColorSupportedReportData {
	colorComponentMask: number; // 2 byte unsigned integer
}

export interface SwitchColorV1SwitchColorGetData {
	colorComponentId: number; // 1 byte unsigned integer
}

export interface SwitchColorV1SwitchColorReportData {
	colorComponentId: number; // 1 byte unsigned integer
	value: number; // 1 byte unsigned integer
}

export interface SwitchColorV1SwitchColorSetData {
	vg1: Array<{ // variable length
		colorComponentId: number; // 1 byte unsigned integer
		value: number; // 1 byte unsigned integer
	}>;
}

export interface SwitchColorV1SwitchColorStartLevelChangeData {
	upDown: boolean; // properties1[6]
	ignoreStartState: boolean; // properties1[5]
	colorComponentId: number; // 1 byte unsigned integer
	startLevel: number; // 1 byte unsigned integer
}

export interface SwitchColorV1SwitchColorStopLevelChangeData {
	colorComponentId: number; // 1 byte unsigned integer
}

export class SwitchColorV1 extends CommandClassPacket<SwitchColorV1Commands> {
	public static readonly commandClass = CommandClasses.SwitchColor; // 0x33 (51)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SwitchColorV1, commandAndPayload);
	}

	public static readonly SwitchColorSupportedGet = class SwitchColorSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = SwitchColorV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "SwitchColorSupportedGet",
			"help": "Color Switch Supported Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchColorV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SwitchColorSupportedGet, data);
		}
	};

	public static readonly SwitchColorSupportedReport = class SwitchColorSupportedReport extends CommandPacket<SwitchColorV1SwitchColorSupportedReportData> {
		public static readonly CommandClass = SwitchColorV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "SwitchColorSupportedReport",
			"help": "Color Switch Supported Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "colorComponentMask",
					"help": "Color Component mask",
					"length": 2
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchColorV1)?.command === this.command;
		}

		constructor(data: Buffer | SwitchColorV1SwitchColorSupportedReportData) {
			super(SwitchColorSupportedReport, data);
		}
	};

	public static readonly SwitchColorGet = class SwitchColorGet extends CommandPacket<SwitchColorV1SwitchColorGetData> {
		public static readonly CommandClass = SwitchColorV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "SwitchColorGet",
			"help": "Color Switch Get",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "colorComponentId",
					"help": "Color Component ID",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchColorV1)?.command === this.command;
		}

		constructor(data: Buffer | SwitchColorV1SwitchColorGetData) {
			super(SwitchColorGet, data);
		}
	};

	public static readonly SwitchColorReport = class SwitchColorReport extends CommandPacket<SwitchColorV1SwitchColorReportData> {
		public static readonly CommandClass = SwitchColorV1;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "SwitchColorReport",
			"help": "Color Switch Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "colorComponentId",
					"help": "Color Component ID",
					"length": 1
				},
				{
					"type": "integer",
					"name": "value",
					"help": "Value",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchColorV1)?.command === this.command;
		}

		constructor(data: Buffer | SwitchColorV1SwitchColorReportData) {
			super(SwitchColorReport, data);
		}
	};

	public static readonly SwitchColorSet = class SwitchColorSet extends CommandPacket<SwitchColorV1SwitchColorSetData> {
		public static readonly CommandClass = SwitchColorV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "SwitchColorSet",
			"help": "Color Switch Set",
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
							"fieldType": "integer",
							"name": "colorComponentCount",
							"mask": 31,
							"shift": 0,
							"lengthOf": {
								"refs": [
									"vg1"
								]
							},
							"isAutogenerated": true
						}
					]
				},
				{
					"type": "group",
					"name": "vg1",
					"help": "vg1",
					"length": {
						"lengthType": "ref",
						"from": {
							"ref": "properties1.colorComponentCount"
						}
					},
					"params": [
						{
							"type": "integer",
							"name": "colorComponentId",
							"help": "Color Component ID",
							"length": 1
						},
						{
							"type": "integer",
							"name": "value",
							"help": "Value",
							"length": 1
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchColorV1)?.command === this.command;
		}

		constructor(data: Buffer | SwitchColorV1SwitchColorSetData) {
			super(SwitchColorSet, data);
		}
	};

	public static readonly SwitchColorStartLevelChange = class SwitchColorStartLevelChange extends CommandPacket<SwitchColorV1SwitchColorStartLevelChangeData> {
		public static readonly CommandClass = SwitchColorV1;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "SwitchColorStartLevelChange",
			"help": "Color Switch Start Level Change",
			"status": "active",
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"fieldType": "boolean",
							"name": "res2",
							"mask": 128,
							"shift": 7,
							"reserved": true
						},
						{
							"fieldType": "boolean",
							"name": "upDown",
							"mask": 64,
							"shift": 6
						},
						{
							"fieldType": "boolean",
							"name": "ignoreStartState",
							"mask": 32,
							"shift": 5
						},
						{
							"fieldType": "integer",
							"name": "res1",
							"mask": 31,
							"shift": 0,
							"reserved": true
						}
					]
				},
				{
					"type": "integer",
					"name": "colorComponentId",
					"help": "Color Component ID",
					"length": 1
				},
				{
					"type": "integer",
					"name": "startLevel",
					"help": "Start Level",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchColorV1)?.command === this.command;
		}

		constructor(data: Buffer | SwitchColorV1SwitchColorStartLevelChangeData) {
			super(SwitchColorStartLevelChange, data);
		}
	};

	public static readonly SwitchColorStopLevelChange = class SwitchColorStopLevelChange extends CommandPacket<SwitchColorV1SwitchColorStopLevelChangeData> {
		public static readonly CommandClass = SwitchColorV1;
		public static readonly command = 0x07;
		public static readonly definition = convertFromJsonCommand({
			"command": 7,
			"name": "SwitchColorStopLevelChange",
			"help": "Color Switch Stop Level Change",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "colorComponentId",
					"help": "Color Component ID",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchColorV1)?.command === this.command;
		}

		constructor(data: Buffer | SwitchColorV1SwitchColorStopLevelChangeData) {
			super(SwitchColorStopLevelChange, data);
		}
	};
}

export namespace SwitchColorV1 {
	export type SwitchColorSupportedGet = InstanceType<typeof SwitchColorV1.SwitchColorSupportedGet>;
	export type SwitchColorSupportedReport = InstanceType<typeof SwitchColorV1.SwitchColorSupportedReport>;
	export type SwitchColorGet = InstanceType<typeof SwitchColorV1.SwitchColorGet>;
	export type SwitchColorReport = InstanceType<typeof SwitchColorV1.SwitchColorReport>;
	export type SwitchColorSet = InstanceType<typeof SwitchColorV1.SwitchColorSet>;
	export type SwitchColorStartLevelChange = InstanceType<typeof SwitchColorV1.SwitchColorStartLevelChange>;
	export type SwitchColorStopLevelChange = InstanceType<typeof SwitchColorV1.SwitchColorStopLevelChange>;
}
