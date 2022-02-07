/**
 * Command Class Switch Toggle Multilevel, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum SwitchToggleMultilevelV1Commands {
	SwitchToggleMultilevelSet = 0x01,
	SwitchToggleMultilevelGet = 0x02,
	SwitchToggleMultilevelReport = 0x03,
	SwitchToggleMultilevelStartLevelChange = 0x04,
	SwitchToggleMultilevelStopLevelChange = 0x05,
}

export interface SwitchToggleMultilevelV1SwitchToggleMultilevelReportData {
	value: number; // 1 byte unsigned integer
}

export interface SwitchToggleMultilevelV1SwitchToggleMultilevelStartLevelChangeData {
	rollOver: boolean; // level[7]
	ignoreStartLevel: boolean; // level[5]
	startLevel: number; // 1 byte unsigned integer
}

// Deprecated
export class SwitchToggleMultilevelV1 extends CommandClassPacket<SwitchToggleMultilevelV1Commands> {
	public static readonly commandClass = CommandClasses.SwitchToggleMultilevel; // 0x29 (41)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(SwitchToggleMultilevelV1, commandAndPayload);
	}
}

export class SwitchToggleMultilevelSet extends CommandPacket<void> {
	public static readonly CommandClass = SwitchToggleMultilevelV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "SwitchToggleMultilevelSet",
		"help": "Switch Toggle Multilevel Set",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchToggleMultilevelV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(SwitchToggleMultilevelSet, data);
	}
};

export class SwitchToggleMultilevelGet extends CommandPacket<void> {
	public static readonly CommandClass = SwitchToggleMultilevelV1;
	public static readonly command = 0x02; // 2
	public static readonly definition = convertFromJsonCommand({
		"command": 2,
		"name": "SwitchToggleMultilevelGet",
		"help": "Switch Toggle Multilevel Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchToggleMultilevelV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(SwitchToggleMultilevelGet, data);
	}
};

export class SwitchToggleMultilevelReport extends CommandPacket<SwitchToggleMultilevelV1SwitchToggleMultilevelReportData> {
	public static readonly CommandClass = SwitchToggleMultilevelV1;
	public static readonly command = 0x03; // 3
	public static readonly definition = convertFromJsonCommand({
		"command": 3,
		"name": "SwitchToggleMultilevelReport",
		"help": "Switch Toggle Multilevel Report",
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
		return packet.tryAs(SwitchToggleMultilevelV1)?.command === this.command;
	}

	public constructor(data: Buffer | SwitchToggleMultilevelV1SwitchToggleMultilevelReportData) {
		super(SwitchToggleMultilevelReport, data);
	}
};

export class SwitchToggleMultilevelStartLevelChange extends CommandPacket<SwitchToggleMultilevelV1SwitchToggleMultilevelStartLevelChangeData> {
	public static readonly CommandClass = SwitchToggleMultilevelV1;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
		"command": 4,
		"name": "SwitchToggleMultilevelStartLevelChange",
		"help": "Switch Toggle Multilevel Start Level Change",
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
						"name": "rollOver",
						"mask": 128,
						"shift": 7
					},
					{
						"fieldType": "Boolean",
						"name": "reserved2",
						"mask": 64,
						"shift": 6,
						"reserved": true
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
		return packet.tryAs(SwitchToggleMultilevelV1)?.command === this.command;
	}

	public constructor(data: Buffer | SwitchToggleMultilevelV1SwitchToggleMultilevelStartLevelChangeData) {
		super(SwitchToggleMultilevelStartLevelChange, data);
	}
};

export class SwitchToggleMultilevelStopLevelChange extends CommandPacket<void> {
	public static readonly CommandClass = SwitchToggleMultilevelV1;
	public static readonly command = 0x05; // 5
	public static readonly definition = convertFromJsonCommand({
		"command": 5,
		"name": "SwitchToggleMultilevelStopLevelChange",
		"help": "Switch Toggle Multilevel Stop Level Change",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(SwitchToggleMultilevelV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(SwitchToggleMultilevelStopLevelChange, data);
	}
};
