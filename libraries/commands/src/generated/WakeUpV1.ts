/**
 * Command Class Wake Up, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum WakeUpV1Commands {
	WakeUpIntervalGet = 0x05,
	WakeUpIntervalReport = 0x06,
	WakeUpIntervalSet = 0x04,
	WakeUpNoMoreInformation = 0x08,
	WakeUpNotification = 0x07,
}

export interface WakeUpV1WakeUpIntervalReportData {
	seconds: number; // 3 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
}

export interface WakeUpV1WakeUpIntervalSetData {
	seconds: number; // 3 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
}

export class WakeUpV1 extends CommandClassPacket<WakeUpV1Commands> {
	public static readonly commandClass = CommandClasses.WakeUp; // 0x84 (132)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(WakeUpV1, commandAndPayload);
	}
}

export class WakeUpIntervalGet extends CommandPacket<void> {
	public static readonly CommandClass = WakeUpV1;
	public static readonly command = 0x05; // 5
	public static readonly definition = convertFromJsonCommand({
		"command": 5,
		"name": "WakeUpIntervalGet",
		"help": "Wake Up Interval Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(WakeUpV1)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(WakeUpIntervalGet, data);
	}
};

export class WakeUpIntervalReport extends CommandPacket<WakeUpV1WakeUpIntervalReportData> {
	public static readonly CommandClass = WakeUpV1;
	public static readonly command = 0x06; // 6
	public static readonly definition = convertFromJsonCommand({
		"command": 6,
		"name": "WakeUpIntervalReport",
		"help": "Wake Up Interval Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "seconds",
				"help": "Seconds",
				"length": 3
			},
			{
				"type": "Integer",
				"name": "nodeId",
				"help": "NodeID",
				"length": 1,
				"valueType": "NodeNumber"
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(WakeUpV1)?.command === this.command;
	}

	constructor(data: Buffer | WakeUpV1WakeUpIntervalReportData) {
		super(WakeUpIntervalReport, data);
	}
};

export class WakeUpIntervalSet extends CommandPacket<WakeUpV1WakeUpIntervalSetData> {
	public static readonly CommandClass = WakeUpV1;
	public static readonly command = 0x04; // 4
	public static readonly definition = convertFromJsonCommand({
		"command": 4,
		"name": "WakeUpIntervalSet",
		"help": "Wake Up Interval Set",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "seconds",
				"help": "Seconds",
				"length": 3
			},
			{
				"type": "Integer",
				"name": "nodeId",
				"help": "NodeID",
				"length": 1,
				"valueType": "NodeNumber"
			}
		]
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(WakeUpV1)?.command === this.command;
	}

	constructor(data: Buffer | WakeUpV1WakeUpIntervalSetData) {
		super(WakeUpIntervalSet, data);
	}
};

export class WakeUpNoMoreInformation extends CommandPacket<void> {
	public static readonly CommandClass = WakeUpV1;
	public static readonly command = 0x08; // 8
	public static readonly definition = convertFromJsonCommand({
		"command": 8,
		"name": "WakeUpNoMoreInformation",
		"help": "Wake Up No More Information",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(WakeUpV1)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(WakeUpNoMoreInformation, data);
	}
};

export class WakeUpNotification extends CommandPacket<void> {
	public static readonly CommandClass = WakeUpV1;
	public static readonly command = 0x07; // 7
	public static readonly definition = convertFromJsonCommand({
		"command": 7,
		"name": "WakeUpNotification",
		"help": "Wake Up Notification",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(WakeUpV1)?.command === this.command;
	}

	constructor(data: Buffer | void) {
		super(WakeUpNotification, data);
	}
};
