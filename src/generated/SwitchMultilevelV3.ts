/**
 * Command Class Switch Multilevel, version 3.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum SwitchMultilevelV3Commands {
	SwitchMultilevelGet = 0x02,
	SwitchMultilevelReport = 0x03,
	SwitchMultilevelSet = 0x01,
	SwitchMultilevelStartLevelChange = 0x04,
	SwitchMultilevelStopLevelChange = 0x05,
	SwitchMultilevelSupportedGet = 0x06,
	SwitchMultilevelSupportedReport = 0x07,
}

export interface SwitchMultilevelV3SwitchMultilevelReportData {
	value: number; // 1 byte unsigned integer
}

export interface SwitchMultilevelV3SwitchMultilevelSetData {
	value: number; // 1 byte unsigned integer
	dimmingDuration: number; // 1 byte unsigned integer
}

export interface SwitchMultilevelV3SwitchMultilevelStartLevelChangeData {
	upDown: UpDownEnum; // properties1[7..6]
	ignoreStartLevel: boolean; // properties1[5]
	incDec: IncDecEnum; // properties1[4..3]
	startLevel: number; // 1 byte unsigned integer
	dimmingDuration: number; // 1 byte unsigned integer
	stepSize: number; // 1 byte unsigned integer
}

export interface SwitchMultilevelV3SwitchMultilevelSupportedReportData {
	primarySwitchType: number; // properties1[4..0]
	secondarySwitchType: number; // properties2[4..0]
}

export enum UpDownEnum {
	Up = 0x0,
	Down = 0x1,
	Reserved = 0x2,
	None = 0x3,
}

export enum IncDecEnum {
	Increment = 0x0,
	Decrement = 0x1,
	Reserved = 0x2,
	None = 0x3,
}

export class SwitchMultilevelV3 extends CommandClassPacket<SwitchMultilevelV3Commands> {
	public static readonly commandClass = CommandClasses.SwitchMultilevel; // 0x26 (38)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(SwitchMultilevelV3, commandAndPayload);
	}

	public static readonly SwitchMultilevelGet = class SwitchMultilevelGet extends CommandPacket<void> {
		public static readonly CommandClass = SwitchMultilevelV3;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "SwitchMultilevelGet",
			"help": "Switch Multilevel Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV3)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SwitchMultilevelGet, data);
		}
	};

	public static readonly SwitchMultilevelReport = class SwitchMultilevelReport extends CommandPacket<SwitchMultilevelV3SwitchMultilevelReportData> {
		public static readonly CommandClass = SwitchMultilevelV3;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "SwitchMultilevelReport",
			"help": "Switch Multilevel Report",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "value",
					"help": "Value",
					"length": 1,
					"values": {
						"0": {
							"name": "OffDisable",
							"help": "off/disable"
						},
						"255": {
							"name": "OnEnable",
							"help": "on/enable"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV3)?.command === this.command;
		}

		constructor(data: Buffer | SwitchMultilevelV3SwitchMultilevelReportData) {
			super(SwitchMultilevelReport, data);
		}
	};

	public static readonly SwitchMultilevelSet = class SwitchMultilevelSet extends CommandPacket<SwitchMultilevelV3SwitchMultilevelSetData> {
		public static readonly CommandClass = SwitchMultilevelV3;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "SwitchMultilevelSet",
			"help": "Switch Multilevel Set",
			"status": "Active",
			"params": [
				{
					"type": "Integer",
					"name": "value",
					"help": "Value",
					"length": 1,
					"values": {
						"0": {
							"name": "OffDisable",
							"help": "off/disable"
						},
						"255": {
							"name": "OnEnable",
							"help": "on/enable"
						}
					}
				},
				{
					"type": "Integer",
					"name": "dimmingDuration",
					"help": "Dimming Duration",
					"length": 1,
					"values": {
						"0": {
							"name": "Instantly",
							"help": "Instantly"
						},
						"255": {
							"name": "FactoryDefault",
							"help": "Factory default"
						}
					}
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV3)?.command === this.command;
		}

		constructor(data: Buffer | SwitchMultilevelV3SwitchMultilevelSetData) {
			super(SwitchMultilevelSet, data);
		}
	};

	public static readonly SwitchMultilevelStartLevelChange = class SwitchMultilevelStartLevelChange extends CommandPacket<SwitchMultilevelV3SwitchMultilevelStartLevelChangeData> {
		public static readonly CommandClass = SwitchMultilevelV3;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "SwitchMultilevelStartLevelChange",
			"help": "Switch Multilevel Start Level Change",
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
							"name": "upDown",
							"mask": 192,
							"shift": 6,
							"values": {
								"0": {
									"name": "Up",
									"help": "Up"
								},
								"1": {
									"name": "Down",
									"help": "Down"
								},
								"2": {
									"name": "Reserved",
									"help": "Reserved"
								},
								"3": {
									"name": "None",
									"help": "None"
								}
							}
						},
						{
							"fieldType": "Boolean",
							"name": "ignoreStartLevel",
							"mask": 32,
							"shift": 5
						},
						{
							"fieldType": "Enum",
							"name": "incDec",
							"mask": 24,
							"shift": 3,
							"values": {
								"0": {
									"name": "Increment",
									"help": "Increment"
								},
								"1": {
									"name": "Decrement",
									"help": "Decrement"
								},
								"2": {
									"name": "Reserved",
									"help": "Reserved"
								},
								"3": {
									"name": "None",
									"help": "None"
								}
							}
						},
						{
							"fieldType": "Integer",
							"name": "reserved",
							"mask": 7,
							"shift": 0,
							"reserved": true
						}
					]
				},
				{
					"type": "Integer",
					"name": "startLevel",
					"help": "Start Level",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "dimmingDuration",
					"help": "Dimming Duration",
					"length": 1
				},
				{
					"type": "Integer",
					"name": "stepSize",
					"help": "Step Size",
					"length": 1
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV3)?.command === this.command;
		}

		constructor(data: Buffer | SwitchMultilevelV3SwitchMultilevelStartLevelChangeData) {
			super(SwitchMultilevelStartLevelChange, data);
		}
	};

	public static readonly SwitchMultilevelStopLevelChange = class SwitchMultilevelStopLevelChange extends CommandPacket<void> {
		public static readonly CommandClass = SwitchMultilevelV3;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "SwitchMultilevelStopLevelChange",
			"help": "Switch Multilevel Stop Level Change",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV3)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SwitchMultilevelStopLevelChange, data);
		}
	};

	public static readonly SwitchMultilevelSupportedGet = class SwitchMultilevelSupportedGet extends CommandPacket<void> {
		public static readonly CommandClass = SwitchMultilevelV3;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "SwitchMultilevelSupportedGet",
			"help": "Switch Multilevel Supported Get",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV3)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(SwitchMultilevelSupportedGet, data);
		}
	};

	public static readonly SwitchMultilevelSupportedReport = class SwitchMultilevelSupportedReport extends CommandPacket<SwitchMultilevelV3SwitchMultilevelSupportedReportData> {
		public static readonly CommandClass = SwitchMultilevelV3;
		public static readonly command = 0x07;
		public static readonly definition = convertFromJsonCommand({
			"command": 7,
			"name": "SwitchMultilevelSupportedReport",
			"help": "Switch Multilevel Supported Report",
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
							"name": "reserved1",
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"fieldType": "Integer",
							"name": "primarySwitchType",
							"mask": 31,
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
							"mask": 224,
							"shift": 5,
							"reserved": true
						},
						{
							"fieldType": "Integer",
							"name": "secondarySwitchType",
							"mask": 31,
							"shift": 0
						}
					]
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(SwitchMultilevelV3)?.command === this.command;
		}

		constructor(data: Buffer | SwitchMultilevelV3SwitchMultilevelSupportedReportData) {
			super(SwitchMultilevelSupportedReport, data);
		}
	};
}

export namespace SwitchMultilevelV3 {
	export type SwitchMultilevelGet = InstanceType<typeof SwitchMultilevelV3.SwitchMultilevelGet>;
	export type SwitchMultilevelReport = InstanceType<typeof SwitchMultilevelV3.SwitchMultilevelReport>;
	export type SwitchMultilevelSet = InstanceType<typeof SwitchMultilevelV3.SwitchMultilevelSet>;
	export type SwitchMultilevelStartLevelChange = InstanceType<typeof SwitchMultilevelV3.SwitchMultilevelStartLevelChange>;
	export type SwitchMultilevelStopLevelChange = InstanceType<typeof SwitchMultilevelV3.SwitchMultilevelStopLevelChange>;
	export type SwitchMultilevelSupportedGet = InstanceType<typeof SwitchMultilevelV3.SwitchMultilevelSupportedGet>;
	export type SwitchMultilevelSupportedReport = InstanceType<typeof SwitchMultilevelV3.SwitchMultilevelSupportedReport>;
}
