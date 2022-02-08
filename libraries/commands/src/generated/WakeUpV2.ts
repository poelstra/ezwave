/**
 * Command Class Wake Up, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandDefinition, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum WakeUpV2Commands {
	WakeUpIntervalCapabilitiesGet = 0x09,
	WakeUpIntervalCapabilitiesReport = 0x0a,
	WakeUpIntervalGet = 0x05,
	WakeUpIntervalReport = 0x06,
	WakeUpIntervalSet = 0x04,
	WakeUpNoMoreInformation = 0x08,
	WakeUpNotification = 0x07,
}

export interface WakeUpV2WakeUpIntervalCapabilitiesReportData {
	minimumWakeUpIntervalSeconds: number; // 3 byte unsigned integer
	maximumWakeUpIntervalSeconds: number; // 3 byte unsigned integer
	defaultWakeUpIntervalSeconds: number; // 3 byte unsigned integer
	wakeUpIntervalStepSeconds: number; // 3 byte unsigned integer
}

export interface WakeUpV2WakeUpIntervalReportData {
	seconds: number; // 3 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
}

export interface WakeUpV2WakeUpIntervalSetData {
	seconds: number; // 3 byte unsigned integer
	nodeId: number; // 1 byte unsigned integer
}

export class WakeUpV2 extends CommandClassPacket<WakeUpV2Commands> {
	public static readonly commandClass: number = CommandClasses.WakeUp; // 0x84 (132)
	public static readonly version: number = 2;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(WakeUpV2, commandAndPayload);
	}
}

export class WakeUpIntervalCapabilitiesGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof WakeUpV2 = WakeUpV2;
	public static readonly command: number = 0x09; // 9
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 9,
		"name": "WakeUpIntervalCapabilitiesGet",
		"help": "Wake Up Interval Capabilities Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(WakeUpV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(WakeUpIntervalCapabilitiesGet, data);
	}
};

export class WakeUpIntervalCapabilitiesReport extends CommandPacket<WakeUpV2WakeUpIntervalCapabilitiesReportData> {
	public static readonly CommandClass: typeof WakeUpV2 = WakeUpV2;
	public static readonly command: number = 0x0a; // 10
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 10,
		"name": "WakeUpIntervalCapabilitiesReport",
		"help": "Wake Up Interval Capabilities Report",
		"status": "Active",
		"params": [
			{
				"type": "Integer",
				"name": "minimumWakeUpIntervalSeconds",
				"help": "Minimum Wake Up Interval Seconds",
				"length": 3
			},
			{
				"type": "Integer",
				"name": "maximumWakeUpIntervalSeconds",
				"help": "Maximum Wake Up Interval Seconds",
				"length": 3
			},
			{
				"type": "Integer",
				"name": "defaultWakeUpIntervalSeconds",
				"help": "Default Wake Up Interval Seconds",
				"length": 3
			},
			{
				"type": "Integer",
				"name": "wakeUpIntervalStepSeconds",
				"help": "Wake Up Interval Step Seconds",
				"length": 3
			}
		]
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(WakeUpV2)?.command === this.command;
	}

	public constructor(data: Buffer | WakeUpV2WakeUpIntervalCapabilitiesReportData) {
		super(WakeUpIntervalCapabilitiesReport, data);
	}
};

export class WakeUpIntervalGet extends CommandPacket<void> {
	public static readonly CommandClass: typeof WakeUpV2 = WakeUpV2;
	public static readonly command: number = 0x05; // 5
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 5,
		"name": "WakeUpIntervalGet",
		"help": "Wake Up Interval Get",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(WakeUpV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(WakeUpIntervalGet, data);
	}
};

export class WakeUpIntervalReport extends CommandPacket<WakeUpV2WakeUpIntervalReportData> {
	public static readonly CommandClass: typeof WakeUpV2 = WakeUpV2;
	public static readonly command: number = 0x06; // 6
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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

	public static matches(packet: Packet): boolean {
		return packet.tryAs(WakeUpV2)?.command === this.command;
	}

	public constructor(data: Buffer | WakeUpV2WakeUpIntervalReportData) {
		super(WakeUpIntervalReport, data);
	}
};

export class WakeUpIntervalSet extends CommandPacket<WakeUpV2WakeUpIntervalSetData> {
	public static readonly CommandClass: typeof WakeUpV2 = WakeUpV2;
	public static readonly command: number = 0x04; // 4
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
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

	public static matches(packet: Packet): boolean {
		return packet.tryAs(WakeUpV2)?.command === this.command;
	}

	public constructor(data: Buffer | WakeUpV2WakeUpIntervalSetData) {
		super(WakeUpIntervalSet, data);
	}
};

export class WakeUpNoMoreInformation extends CommandPacket<void> {
	public static readonly CommandClass: typeof WakeUpV2 = WakeUpV2;
	public static readonly command: number = 0x08; // 8
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 8,
		"name": "WakeUpNoMoreInformation",
		"help": "Wake Up No More Information",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(WakeUpV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(WakeUpNoMoreInformation, data);
	}
};

export class WakeUpNotification extends CommandPacket<void> {
	public static readonly CommandClass: typeof WakeUpV2 = WakeUpV2;
	public static readonly command: number = 0x07; // 7
	public static readonly definition: CommandDefinition = convertFromJsonCommand({
		"command": 7,
		"name": "WakeUpNotification",
		"help": "Wake Up Notification",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	public static matches(packet: Packet): boolean {
		return packet.tryAs(WakeUpV2)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(WakeUpNotification, data);
	}
};
