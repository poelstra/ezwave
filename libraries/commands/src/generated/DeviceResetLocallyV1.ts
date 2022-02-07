/**
 * Command Class Device Reset Locally, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClasses, CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum DeviceResetLocallyV1Commands {
	DeviceResetLocallyNotification = 0x01,
}

export class DeviceResetLocallyV1 extends CommandClassPacket<DeviceResetLocallyV1Commands> {
	public static readonly commandClass = CommandClasses.DeviceResetLocally; // 0x5a (90)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	public constructor(commandAndPayload: Buffer) {
		super(DeviceResetLocallyV1, commandAndPayload);
	}
}

export class DeviceResetLocallyNotification extends CommandPacket<void> {
	public static readonly CommandClass = DeviceResetLocallyV1;
	public static readonly command = 0x01; // 1
	public static readonly definition = convertFromJsonCommand({
		"command": 1,
		"name": "DeviceResetLocallyNotification",
		"help": "Device Reset Locally Notification",
		"status": "Active",
		"params": []
	} as JsonCommandDefinition);

	static matches(packet: Packet): boolean {
		return packet.tryAs(DeviceResetLocallyV1)?.command === this.command;
	}

	public constructor(data: Buffer | void) {
		super(DeviceResetLocallyNotification, data);
	}
};
