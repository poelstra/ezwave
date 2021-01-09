/**
 * Command Class Wake Up, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import * as jsonSpec from "../commands/jsonSpec";
import { Packet } from "../commands/packet";
import { convertFromJsonCommand } from "../commands/specHelpers";
import CommandClasses from "../generated/CommandClasses";

export enum WakeUpV1Commands {
	WakeUpIntervalGet = 0x05,
	WakeUpIntervalReport = 0x06,
	WakeUpIntervalSet = 0x04,
	WakeUpNoMoreInformation = 0x08,
	WakeUpNotification = 0x07,
}

export interface WakeUpV1WakeUpIntervalReportData {
	seconds: number; // 3 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export interface WakeUpV1WakeUpIntervalSetData {
	seconds: number; // 3 byte unsigned integer
	nodeID: number; // 1 byte unsigned integer
}

export class WakeUpV1 extends CommandClassPacket<WakeUpV1Commands> {
	public static readonly commandClass = CommandClasses.WakeUp; // 0x84 (132)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(WakeUpV1, commandAndPayload);
	}

	public static readonly WakeUpIntervalGet = class WakeUpIntervalGet extends CommandPacket<void> {
		public static readonly CommandClass = WakeUpV1;
		public static readonly command = 0x05;
		public static readonly definition = convertFromJsonCommand({
			"command": 5,
			"name": "WakeUpIntervalGet",
			"help": "Wake Up Interval Get",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(WakeUpV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(WakeUpIntervalGet, data);
		}
	};

	public static readonly WakeUpIntervalReport = class WakeUpIntervalReport extends CommandPacket<WakeUpV1WakeUpIntervalReportData> {
		public static readonly CommandClass = WakeUpV1;
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
			return packet.tryAs(WakeUpV1)?.command === this.command;
		}

		constructor(data: Buffer | WakeUpV1WakeUpIntervalReportData) {
			super(WakeUpIntervalReport, data);
		}
	};

	public static readonly WakeUpIntervalSet = class WakeUpIntervalSet extends CommandPacket<WakeUpV1WakeUpIntervalSetData> {
		public static readonly CommandClass = WakeUpV1;
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
			return packet.tryAs(WakeUpV1)?.command === this.command;
		}

		constructor(data: Buffer | WakeUpV1WakeUpIntervalSetData) {
			super(WakeUpIntervalSet, data);
		}
	};

	public static readonly WakeUpNoMoreInformation = class WakeUpNoMoreInformation extends CommandPacket<void> {
		public static readonly CommandClass = WakeUpV1;
		public static readonly command = 0x08;
		public static readonly definition = convertFromJsonCommand({
			"command": 8,
			"name": "WakeUpNoMoreInformation",
			"help": "Wake Up No More Information",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(WakeUpV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(WakeUpNoMoreInformation, data);
		}
	};

	public static readonly WakeUpNotification = class WakeUpNotification extends CommandPacket<void> {
		public static readonly CommandClass = WakeUpV1;
		public static readonly command = 0x07;
		public static readonly definition = convertFromJsonCommand({
			"command": 7,
			"name": "WakeUpNotification",
			"help": "Wake Up Notification",
			"status": "active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(WakeUpV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(WakeUpNotification, data);
		}
	};
}

export namespace WakeUpV1 {
	export type WakeUpIntervalGet = InstanceType<typeof WakeUpV1.WakeUpIntervalGet>;
	export type WakeUpIntervalReport = InstanceType<typeof WakeUpV1.WakeUpIntervalReport>;
	export type WakeUpIntervalSet = InstanceType<typeof WakeUpV1.WakeUpIntervalSet>;
	export type WakeUpNoMoreInformation = InstanceType<typeof WakeUpV1.WakeUpNoMoreInformation>;
	export type WakeUpNotification = InstanceType<typeof WakeUpV1.WakeUpNotification>;
}
