/**
 * Command Class Device Reset Locally, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../command";
import * as jsonSpec from "../jsonSpec";
import { Packet } from "../packet";
import { convertFromJsonCommand } from "../specHelpers";
import CommandClasses from "./CommandClasses";

export enum DeviceResetLocallyV1Commands {
	DeviceResetLocallyNotification = 0x01,
}

export class DeviceResetLocallyV1 extends CommandClassPacket<DeviceResetLocallyV1Commands> {
	public static readonly commandClass = CommandClasses.DeviceResetLocally; // 0x5a (90)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(DeviceResetLocallyV1, commandAndPayload);
	}

	public static readonly DeviceResetLocallyNotification = class DeviceResetLocallyNotification extends CommandPacket<void> {
		public static readonly CommandClass = DeviceResetLocallyV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "DeviceResetLocallyNotification",
			"help": "Device Reset Locally Notification",
			"status": "Active",
			"params": []
		} as jsonSpec.CommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(DeviceResetLocallyV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(DeviceResetLocallyNotification, data);
		}
	};
}

export namespace DeviceResetLocallyV1 {
	export type DeviceResetLocallyNotification = InstanceType<typeof DeviceResetLocallyV1.DeviceResetLocallyNotification>;
}
