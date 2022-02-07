/**
 * Command Class Switch Multilevel, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum SwitchMultilevelV1Commands {
	SwitchMultilevelGet = 0x02,
	SwitchMultilevelReport = 0x03,
	SwitchMultilevelSet = 0x01,
	SwitchMultilevelStartLevelChange = 0x04,
	SwitchMultilevelStopLevelChange = 0x05,
}

export interface SwitchMultilevelV1SwitchMultilevelReportData {
	value: number; // 1 byte unsigned integer
}

export interface SwitchMultilevelV1SwitchMultilevelSetData {
	value: number; // 1 byte unsigned integer
}

export interface SwitchMultilevelV1SwitchMultilevelStartLevelChangeData {
	upDown: boolean; // level[6]
	ignoreStartLevel: boolean; // level[5]
	startLevel: number; // 1 byte unsigned integer
}

export class SwitchMultilevelV1 extends CommandClassPacket<SwitchMultilevelV1Commands> {
	public static readonly commandClass = CommandClasses.SwitchMultilevel; // 0x26 (38)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(SwitchMultilevelV1, commandAndPayload);
	}
}

export class SwitchMultilevelGet extends CommandPacket<void> {
	public static readonly CommandClass = SwitchMultilevelV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "SwitchMultilevelGet",
		"help": "Switch Multilevel Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchMultilevelV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(SwitchMultilevelGet, data);
	}
};

export class SwitchMultilevelReport extends CommandPacket<SwitchMultilevelV1SwitchMultilevelReportData> {
	public static readonly CommandClass = SwitchMultilevelV1;
	public static readonly command = 0x03; // 3
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
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchMultilevelV1)?.command === this.command;
	}

	public constructor(data: Buffer | SwitchMultilevelV1SwitchMultilevelReportData) {
		super(SwitchMultilevelReport, data);
	}
};

export class SwitchMultilevelSet extends CommandPacket<SwitchMultilevelV1SwitchMultilevelSetData> {
	public static readonly CommandClass = SwitchMultilevelV1;
	public static readonly command = 0x01; // 1
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
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchMultilevelV1)?.command === this.command;
	}

	public constructor(data: Buffer | SwitchMultilevelV1SwitchMultilevelSetData) {
		super(SwitchMultilevelSet, data);
	}
};

export class SwitchMultilevelStartLevelChange extends CommandPacket<SwitchMultilevelV1SwitchMultilevelStartLevelChangeData> {
	public static readonly CommandClass = SwitchMultilevelV1;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
		"command": 4,
		"name": "SwitchMultilevelStartLevelChange",
		"help": "Switch Multilevel Start Level Change",
		"status": "Active",
		"params": [
			{
				"type": "Bitfield",
				"name": "level",
				"help": "Level",
				"length": 1,
				"fields": [
					{
						"fieldType": "Boolean",
						"name": "reserved2",
						"mask": 128,
						"shift": 7,
						"reserved": true
					},
					{
						"fieldType": "Boolean",
						"name": "upDown",
						"mask": 64,
						"shift": 6
					},
					{
						"fieldType": "Boolean",
						"name": "ignoreStartLevel",
						"mask": 32,
						"shift": 5
					},
					{
						"fieldType": "Integer",
						"name": "reserved1",
						"mask": 31,
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
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchMultilevelV1)?.command === this.command;
	}

	public constructor(data: Buffer | SwitchMultilevelV1SwitchMultilevelStartLevelChangeData) {
		super(SwitchMultilevelStartLevelChange, data);
	}
};

export class SwitchMultilevelStopLevelChange extends CommandPacket<void> {
	public static readonly CommandClass = SwitchMultilevelV1;
	public static readonly command = 0x05; // 5
	public static readonly definition = convertFromJsonCommand({
		"command": 5,
		"name": "SwitchMultilevelStopLevelChange",
		"help": "Switch Multilevel Stop Level Change",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchMultilevelV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(SwitchMultilevelStopLevelChange, data);
	}
};
