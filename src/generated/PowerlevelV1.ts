/**
 * Command Class Powerlevel, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum PowerlevelV1Commands {
	PowerlevelGet = 0x02,
	PowerlevelReport = 0x03,
	PowerlevelSet = 0x01,
	PowerlevelTestNodeGet = 0x05,
	PowerlevelTestNodeReport = 0x06,
	PowerlevelTestNodeSet = 0x04,
}

export interface PowerlevelV1PowerlevelReportData {
	powerLevel: PowerLevelEnum; // 1 byte enum value
	timeout: number; // 1 byte unsigned integer
}

export interface PowerlevelV1PowerlevelSetData {
	powerLevel: PowerLevelEnum; // 1 byte enum value
	timeout: number; // 1 byte unsigned integer
}

export interface PowerlevelV1PowerlevelTestNodeReportData {
	testNodeID: TestNodeIDEnum; // 1 byte enum value
	statusOfOperation: StatusOfOperationEnum; // 1 byte enum value
	testFrameCount: number; // 2 byte unsigned integer
}

export interface PowerlevelV1PowerlevelTestNodeSetData {
	testNodeID: number; // 1 byte unsigned integer
	powerLevel: PowerLevelEnum; // 1 byte enum value
	testFrameCount: number; // 2 byte unsigned integer
}

export class PowerlevelV1 extends CommandClassPacket<PowerlevelV1Commands> {
	public static readonly commandClass = CommandClasses.Powerlevel; // 0x73 (115)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(PowerlevelV1, commandAndPayload);
	}

	public static readonly PowerlevelGet = class PowerlevelGet extends CommandPacket<void> {
		public static readonly CommandClass = PowerlevelV1;
		public static readonly command = 0x02;
		public static readonly definition = {
			"command": 2,
			"name": "PowerlevelGet",
			"help": "Powerlevel Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(PowerlevelV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(PowerlevelGet, data);
		}
	};

	public static readonly PowerlevelReport = class PowerlevelReport extends CommandPacket<PowerlevelV1PowerlevelReportData> {
		public static readonly CommandClass = PowerlevelV1;
		public static readonly command = 0x03;
		public static readonly definition = {
			"command": 3,
			"name": "PowerlevelReport",
			"help": "Powerlevel Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "powerLevel",
					"help": "Power level",
					"length": 1,
					"values": {
						"0": "NormalPower",
						"1": "minus1dBm",
						"2": "minus2dBm",
						"3": "minus3dBm",
						"4": "minus4dBm",
						"5": "minus5dBm",
						"6": "minus6dBm",
						"7": "minus7dBm",
						"8": "minus8dBm",
						"9": "minus9dBm"
					}
				},
				{
					"type": "integer",
					"name": "timeout",
					"help": "Timeout",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(PowerlevelV1)?.command === this.command;
		}

		constructor(data: Buffer | PowerlevelV1PowerlevelReportData) {
			super(PowerlevelReport, data);
		}
	};

	public static readonly PowerlevelSet = class PowerlevelSet extends CommandPacket<PowerlevelV1PowerlevelSetData> {
		public static readonly CommandClass = PowerlevelV1;
		public static readonly command = 0x01;
		public static readonly definition = {
			"command": 1,
			"name": "PowerlevelSet",
			"help": "Powerlevel Set",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "powerLevel",
					"help": "Power level",
					"length": 1,
					"values": {
						"0": "NormalPower",
						"1": "minus1dBm",
						"2": "minus2dBm",
						"3": "minus3dBm",
						"4": "minus4dBm",
						"5": "minus5dBm",
						"6": "minus6dBm",
						"7": "minus7dBm",
						"8": "minus8dBm",
						"9": "minus9dBm"
					}
				},
				{
					"type": "integer",
					"name": "timeout",
					"help": "Timeout",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(PowerlevelV1)?.command === this.command;
		}

		constructor(data: Buffer | PowerlevelV1PowerlevelSetData) {
			super(PowerlevelSet, data);
		}
	};

	public static readonly PowerlevelTestNodeGet = class PowerlevelTestNodeGet extends CommandPacket<void> {
		public static readonly CommandClass = PowerlevelV1;
		public static readonly command = 0x05;
		public static readonly definition = {
			"command": 5,
			"name": "PowerlevelTestNodeGet",
			"help": "Powerlevel Test Node Get",
			"status": "active",
			"params": []
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(PowerlevelV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(PowerlevelTestNodeGet, data);
		}
	};

	public static readonly PowerlevelTestNodeReport = class PowerlevelTestNodeReport extends CommandPacket<PowerlevelV1PowerlevelTestNodeReportData> {
		public static readonly CommandClass = PowerlevelV1;
		public static readonly command = 0x06;
		public static readonly definition = {
			"command": 6,
			"name": "PowerlevelTestNodeReport",
			"help": "Powerlevel Test Node Report",
			"status": "active",
			"params": [
				{
					"type": "enum",
					"name": "testNodeID",
					"help": "Test NodeID",
					"length": 1,
					"valueType": "NODE_NUMBER",
					"values": {
						"0": "ZW_TEST_NOT_A_NODEID"
					}
				},
				{
					"type": "enum",
					"name": "statusOfOperation",
					"help": "Status of operation",
					"length": 1,
					"values": {
						"0": "ZW_TEST_FAILED",
						"1": "ZW_TEST_SUCCES",
						"2": "ZW_TEST_INPROGRESS"
					}
				},
				{
					"type": "integer",
					"name": "testFrameCount",
					"help": "Test Frame Count",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(PowerlevelV1)?.command === this.command;
		}

		constructor(data: Buffer | PowerlevelV1PowerlevelTestNodeReportData) {
			super(PowerlevelTestNodeReport, data);
		}
	};

	public static readonly PowerlevelTestNodeSet = class PowerlevelTestNodeSet extends CommandPacket<PowerlevelV1PowerlevelTestNodeSetData> {
		public static readonly CommandClass = PowerlevelV1;
		public static readonly command = 0x04;
		public static readonly definition = {
			"command": 4,
			"name": "PowerlevelTestNodeSet",
			"help": "Powerlevel Test Node Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "testNodeID",
					"help": "Test NodeID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				},
				{
					"type": "enum",
					"name": "powerLevel",
					"help": "Power level",
					"length": 1,
					"values": {
						"0": "NormalPower",
						"1": "minus1dBm",
						"2": "minus2dBm",
						"3": "minus3dBm",
						"4": "minus4dBm",
						"5": "minus5dBm",
						"6": "minus6dBm",
						"7": "minus7dBm",
						"8": "minus8dBm",
						"9": "minus9dBm"
					}
				},
				{
					"type": "integer",
					"name": "testFrameCount",
					"help": "Test frame count",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(PowerlevelV1)?.command === this.command;
		}

		constructor(data: Buffer | PowerlevelV1PowerlevelTestNodeSetData) {
			super(PowerlevelTestNodeSet, data);
		}
	};
}

export namespace PowerlevelV1 {
	export type PowerlevelGet = InstanceType<typeof PowerlevelV1.PowerlevelGet>;
	export type PowerlevelReport = InstanceType<typeof PowerlevelV1.PowerlevelReport>;
	export type PowerlevelSet = InstanceType<typeof PowerlevelV1.PowerlevelSet>;
	export type PowerlevelTestNodeGet = InstanceType<typeof PowerlevelV1.PowerlevelTestNodeGet>;
	export type PowerlevelTestNodeReport = InstanceType<typeof PowerlevelV1.PowerlevelTestNodeReport>;
	export type PowerlevelTestNodeSet = InstanceType<typeof PowerlevelV1.PowerlevelTestNodeSet>;
}

export enum PowerLevelEnum {
	NormalPower = 0x0,
	Minus1dBm = 0x1,
	Minus2dBm = 0x2,
	Minus3dBm = 0x3,
	Minus4dBm = 0x4,
	Minus5dBm = 0x5,
	Minus6dBm = 0x6,
	Minus7dBm = 0x7,
	Minus8dBm = 0x8,
	Minus9dBm = 0x9,
}

export enum TestNodeIDEnum {
	ZwTestNotANodeid = 0x0,
}

export enum StatusOfOperationEnum {
	ZwTestFailed = 0x0,
	ZwTestSucces = 0x1,
	ZwTestInprogress = 0x2,
}
