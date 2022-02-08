/**
 * Command Class Powerlevel, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

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
	testNodeId: TestNodeIdEnum; // 1 byte enum value
	statusOfOperation: StatusOfOperationEnum; // 1 byte enum value
	testFrameCount: number; // 2 byte unsigned integer
}

export interface PowerlevelV1PowerlevelTestNodeSetData {
	testNodeId: number; // 1 byte unsigned integer
	powerLevel: PowerLevelEnum; // 1 byte enum value
	testFrameCount: number; // 2 byte unsigned integer
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

export enum TestNodeIdEnum {
	ZwTestNotANodeid = 0x0,
}

export enum StatusOfOperationEnum {
	ZwTestFailed = 0x0,
	ZwTestSucces = 0x1,
	ZwTestInprogress = 0x2,
}

export class PowerlevelV1 extends CommandClassPacket<PowerlevelV1Commands> {
	public static readonly commandClass: number = CommandClasses.Powerlevel; // 0x73 (115)
	public static readonly version: number = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(PowerlevelV1, commandAndPayload);
	}
}

export class PowerlevelGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof PowerlevelV1 = PowerlevelV1;
	public static readonly command: number = 0x02; // 2
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 2,
		"name": "PowerlevelGet",
		"help": "Powerlevel Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(PowerlevelV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(PowerlevelGet, data);
	}
};

export class PowerlevelReport extends CommandPacket<PowerlevelV1PowerlevelReportData> {
	public static readonly CommandClass: typeof PowerlevelV1 = PowerlevelV1;
	public static readonly command: number = 0x03; // 3
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 3,
		"name": "PowerlevelReport",
		"help": "Powerlevel Report",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "powerLevel",
				"help": "Power level",
				"length": 1,
				"values": {
					"0": {
						"name": "NormalPower",
						"help": "NormalPower"
					},
					"1": {
						"name": "Minus1dBm",
						"help": "minus1dBm"
					},
					"2": {
						"name": "Minus2dBm",
						"help": "minus2dBm"
					},
					"3": {
						"name": "Minus3dBm",
						"help": "minus3dBm"
					},
					"4": {
						"name": "Minus4dBm",
						"help": "minus4dBm"
					},
					"5": {
						"name": "Minus5dBm",
						"help": "minus5dBm"
					},
					"6": {
						"name": "Minus6dBm",
						"help": "minus6dBm"
					},
					"7": {
						"name": "Minus7dBm",
						"help": "minus7dBm"
					},
					"8": {
						"name": "Minus8dBm",
						"help": "minus8dBm"
					},
					"9": {
						"name": "Minus9dBm",
						"help": "minus9dBm"
					}
				}
			},
			{
				"type": "Integer",
				"name": "timeout",
				"help": "Timeout",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(PowerlevelV1)?.command === this.command;
	}

	public constructor(data: Buffer | PowerlevelV1PowerlevelReportData) {
		super(PowerlevelReport, data);
	}
};

export class PowerlevelSet extends CommandPacket<PowerlevelV1PowerlevelSetData> {
	public static readonly CommandClass: typeof PowerlevelV1 = PowerlevelV1;
	public static readonly command: number = 0x01; // 1
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 1,
		"name": "PowerlevelSet",
		"help": "Powerlevel Set",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "powerLevel",
				"help": "Power level",
				"length": 1,
				"values": {
					"0": {
						"name": "NormalPower",
						"help": "NormalPower"
					},
					"1": {
						"name": "Minus1dBm",
						"help": "minus1dBm"
					},
					"2": {
						"name": "Minus2dBm",
						"help": "minus2dBm"
					},
					"3": {
						"name": "Minus3dBm",
						"help": "minus3dBm"
					},
					"4": {
						"name": "Minus4dBm",
						"help": "minus4dBm"
					},
					"5": {
						"name": "Minus5dBm",
						"help": "minus5dBm"
					},
					"6": {
						"name": "Minus6dBm",
						"help": "minus6dBm"
					},
					"7": {
						"name": "Minus7dBm",
						"help": "minus7dBm"
					},
					"8": {
						"name": "Minus8dBm",
						"help": "minus8dBm"
					},
					"9": {
						"name": "Minus9dBm",
						"help": "minus9dBm"
					}
				}
			},
			{
				"type": "Integer",
				"name": "timeout",
				"help": "Timeout",
				"length": 1
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(PowerlevelV1)?.command === this.command;
	}

	public constructor(data: Buffer | PowerlevelV1PowerlevelSetData) {
		super(PowerlevelSet, data);
	}
};

export class PowerlevelTestNodeGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof PowerlevelV1 = PowerlevelV1;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "PowerlevelTestNodeGet",
		"help": "Powerlevel Test Node Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(PowerlevelV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(PowerlevelTestNodeGet, data);
	}
};

export class PowerlevelTestNodeReport extends CommandPacket<PowerlevelV1PowerlevelTestNodeReportData> {
	public static readonly CommandClass: typeof PowerlevelV1 = PowerlevelV1;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 6,
		"name": "PowerlevelTestNodeReport",
		"help": "Powerlevel Test Node Report",
		"status": "Active",
		"params": [
			{
				"type": "Enum",
				"name": "testNodeId",
				"help": "Test NodeID",
				"length": 1,
				"valueType": "NodeNumber",
				"values": {
					"0": {
						"name": "ZwTestNotANodeid",
						"help": "ZW_TEST_NOT_A_NODEID"
					}
				}
			},
			{
				"type": "Enum",
				"name": "statusOfOperation",
				"help": "Status of operation",
				"length": 1,
				"values": {
					"0": {
						"name": "ZwTestFailed",
						"help": "ZW_TEST_FAILED"
					},
					"1": {
						"name": "ZwTestSucces",
						"help": "ZW_TEST_SUCCES"
					},
					"2": {
						"name": "ZwTestInprogress",
						"help": "ZW_TEST_INPROGRESS"
					}
				}
			},
			{
				"type": "Integer",
				"name": "testFrameCount",
				"help": "Test Frame Count",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(PowerlevelV1)?.command === this.command;
	}

	public constructor(data: Buffer | PowerlevelV1PowerlevelTestNodeReportData) {
		super(PowerlevelTestNodeReport, data);
	}
};

export class PowerlevelTestNodeSet extends CommandPacket<PowerlevelV1PowerlevelTestNodeSetData> {
	public static readonly CommandClass: typeof PowerlevelV1 = PowerlevelV1;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 4,
		"name": "PowerlevelTestNodeSet",
		"help": "Powerlevel Test Node Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "testNodeId",
				"help": "Test NodeID",
				"length": 1,
				"valueType": "NodeNumber"
			},
			{
				"type": "Enum",
				"name": "powerLevel",
				"help": "Power level",
				"length": 1,
				"values": {
					"0": {
						"name": "NormalPower",
						"help": "NormalPower"
					},
					"1": {
						"name": "Minus1dBm",
						"help": "minus1dBm"
					},
					"2": {
						"name": "Minus2dBm",
						"help": "minus2dBm"
					},
					"3": {
						"name": "Minus3dBm",
						"help": "minus3dBm"
					},
					"4": {
						"name": "Minus4dBm",
						"help": "minus4dBm"
					},
					"5": {
						"name": "Minus5dBm",
						"help": "minus5dBm"
					},
					"6": {
						"name": "Minus6dBm",
						"help": "minus6dBm"
					},
					"7": {
						"name": "Minus7dBm",
						"help": "minus7dBm"
					},
					"8": {
						"name": "Minus8dBm",
						"help": "minus8dBm"
					},
					"9": {
						"name": "Minus9dBm",
						"help": "minus9dBm"
					}
				}
			},
			{
				"type": "Integer",
				"name": "testFrameCount",
				"help": "Test frame count",
				"length": 2
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(PowerlevelV1)?.command === this.command;
	}

	public constructor(data: Buffer | PowerlevelV1PowerlevelTestNodeSetData) {
		super(PowerlevelTestNodeSet, data);
	}
};
