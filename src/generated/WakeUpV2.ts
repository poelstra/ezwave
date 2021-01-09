/**
 * Command Class Wake Up, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

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
	nodeID: number; // 1 byte unsigned integer
}

export interface WakeUpV2WakeUpIntervalSetData {
	seconds: number; // 3 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export class WakeUpV2 extends CommandClassPacket<WakeUpV2Commands> {
	public static readonly commandClass = CommandClasses.WakeUp; // 0x84 (132)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(WakeUpV2, commandAndPayload);
	}

	public static readonly WakeUpIntervalCapabilitiesGet = class WakeUpIntervalCapabilitiesGet extends CommandPacket<void> {
		public static readonly CommandClass = WakeUpV2;
		public static readonly command = 0x09;
		public static readonly definition = convertFromJsonCommand({
			"command": 9,
			"name": "WakeUpIntervalCapabilitiesGet",
			"help": "Wake Up Interval Capabilities Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(WakeUpV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(WakeUpIntervalCapabilitiesGet, data);
		}
	};

	public static readonly WakeUpIntervalCapabilitiesReport = class WakeUpIntervalCapabilitiesReport extends CommandPacket<WakeUpV2WakeUpIntervalCapabilitiesReportData> {
		public static readonly CommandClass = WakeUpV2;
		public static readonly command = 0x0a;
		public static readonly definition = convertFromJsonCommand({
			"command": 10,
			"name": "WakeUpIntervalCapabilitiesReport",
			"help": "Wake Up Interval Capabilities Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "minimumWakeUpIntervalSeconds",
					"help": "Minimum Wake Up Interval Seconds",
					"length": 3
				},
				{
					"type": "integer",
					"name": "maximumWakeUpIntervalSeconds",
					"help": "Maximum Wake Up Interval Seconds",
					"length": 3
				},
				{
					"type": "integer",
					"name": "defaultWakeUpIntervalSeconds",
					"help": "Default Wake Up Interval Seconds",
					"length": 3
				},
				{
					"type": "integer",
					"name": "wakeUpIntervalStepSeconds",
					"help": "Wake Up Interval Step Seconds",
					"length": 3
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(WakeUpV2)?.command === this.command;
		}

		constructor(data: Buffer | WakeUpV2WakeUpIntervalCapabilitiesReportData) {
			super(WakeUpIntervalCapabilitiesReport, data);
		}
	};

	public static readonly WakeUpIntervalGet = class WakeUpIntervalGet extends CommandPacket<void> {
		public static readonly CommandClass = WakeUpV2;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "WakeUpIntervalGet",
			"help": "Wake Up Interval Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(WakeUpV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(WakeUpIntervalGet, data);
		}
	};

	public static readonly WakeUpIntervalReport = class WakeUpIntervalReport extends CommandPacket<WakeUpV2WakeUpIntervalReportData> {
		public static readonly CommandClass = WakeUpV2;
		public static readonly command = 0x06;
		public static readonly definition = convertFromJsonCommand({
			"command": 6,
			"name": "WakeUpIntervalReport",
			"help": "Wake Up Interval Report",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "seconds",
					"help": "Seconds",
					"length": 3
				},
				{
					"type": "integer",
					"name": "nodeID",
					"help": "NodeID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(WakeUpV2)?.command === this.command;
		}

		constructor(data: Buffer | WakeUpV2WakeUpIntervalReportData) {
			super(WakeUpIntervalReport, data);
		}
	};

	public static readonly WakeUpIntervalSet = class WakeUpIntervalSet extends CommandPacket<WakeUpV2WakeUpIntervalSetData> {
		public static readonly CommandClass = WakeUpV2;
		public static readonly command = 0x04;
		public static readonly definition = convertFromJsonCommand({
			"command": 4,
			"name": "WakeUpIntervalSet",
			"help": "Wake Up Interval Set",
			"status": "active",
			"params": [
				{
					"type": "integer",
					"name": "seconds",
					"help": "Seconds",
					"length": 3
				},
				{
					"type": "integer",
					"name": "nodeID",
					"help": "NodeID",
					"length": 1,
					"valueType": "NODE_NUMBER"
				}
			]
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(WakeUpV2)?.command === this.command;
		}

		constructor(data: Buffer | WakeUpV2WakeUpIntervalSetData) {
			super(WakeUpIntervalSet, data);
		}
	};

	public static readonly WakeUpNoMoreInformation = class WakeUpNoMoreInformation extends CommandPacket<void> {
		public static readonly CommandClass = WakeUpV2;
		public static readonly command = 0x08;
		public static readonly definition = convertFromJsonCommand({
			"command": 8,
			"name": "WakeUpNoMoreInformation",
			"help": "Wake Up No More Information",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(WakeUpV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(WakeUpNoMoreInformation, data);
		}
	};

	public static readonly WakeUpNotification = class WakeUpNotification extends CommandPacket<void> {
		public static readonly CommandClass = WakeUpV2;
		public static readonly command = 0x07;
		public static readonly definition = convertFromJsonCommand({
			"command": 7,
			"name": "WakeUpNotification",
			"help": "Wake Up Notification",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(WakeUpV2)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(WakeUpNotification, data);
		}
	};
}

export namespace WakeUpV2 {
	export type WakeUpIntervalCapabilitiesGet = InstanceType<typeof WakeUpV2.WakeUpIntervalCapabilitiesGet>;
	export type WakeUpIntervalCapabilitiesReport = InstanceType<typeof WakeUpV2.WakeUpIntervalCapabilitiesReport>;
	export type WakeUpIntervalGet = InstanceType<typeof WakeUpV2.WakeUpIntervalGet>;
	export type WakeUpIntervalReport = InstanceType<typeof WakeUpV2.WakeUpIntervalReport>;
	export type WakeUpIntervalSet = InstanceType<typeof WakeUpV2.WakeUpIntervalSet>;
	export type WakeUpNoMoreInformation = InstanceType<typeof WakeUpV2.WakeUpNoMoreInformation>;
	export type WakeUpNotification = InstanceType<typeof WakeUpV2.WakeUpNotification>;
}
