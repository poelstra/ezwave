/**
 * Command Class Zensor Net, version 1.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket, Packet } from "@ezwave/codec";
import { CommandClasses, convertFromJsonCommand, JsonCommandDefinition } from "@ezwave/spec";

export enum ZensorNetV1Commands {
	BindAccept = 0x02,
	BindComplete = 0x03,
	BindRequest = 0x01,
}

export class ZensorNetV1 extends CommandClassPacket<ZensorNetV1Commands> {
	public static readonly commandClass = CommandClasses.ZensorNet; // 0x02 (2)
	public static readonly version = 1;

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(ZensorNetV1, commandAndPayload);
	}

	public static readonly BindAccept = class BindAccept extends CommandPacket<void> {
		public static readonly CommandClass = ZensorNetV1;
		public static readonly command = 0x02;
		public static readonly definition = convertFromJsonCommand({
			"command": 2,
			"name": "BindAccept",
			"help": "Bind Accept",
			"status": "Active",
			"params": []
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZensorNetV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(BindAccept, data);
		}
	};

	public static readonly BindComplete = class BindComplete extends CommandPacket<void> {
		public static readonly CommandClass = ZensorNetV1;
		public static readonly command = 0x03;
		public static readonly definition = convertFromJsonCommand({
			"command": 3,
			"name": "BindComplete",
			"help": "Bind Complete",
			"status": "Active",
			"params": []
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZensorNetV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(BindComplete, data);
		}
	};

	public static readonly BindRequest = class BindRequest extends CommandPacket<void> {
		public static readonly CommandClass = ZensorNetV1;
		public static readonly command = 0x01;
		public static readonly definition = convertFromJsonCommand({
			"command": 1,
			"name": "BindRequest",
			"help": "Bind Request",
			"status": "Active",
			"params": []
		} as JsonCommandDefinition);

		static matches(packet: Packet): boolean {
			return packet.tryAs(ZensorNetV1)?.command === this.command;
		}

		constructor(data: Buffer | void) {
			super(BindRequest, data);
		}
	};
}

export namespace ZensorNetV1 {
	export type BindAccept = InstanceType<typeof ZensorNetV1.BindAccept>;
	export type BindComplete = InstanceType<typeof ZensorNetV1.BindComplete>;
	export type BindRequest = InstanceType<typeof ZensorNetV1.BindRequest>;
}
