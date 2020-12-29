/**
 * Command Class Transport Service, version 2.
 *
 * Auto-generated, do not edit.
 */

import { CommandClassPacket, CommandPacket } from "../commands/command";
import { Packet } from "../commands/packet";
import { CommandDefinition } from "../commands/types";
import CommandClasses from "../generated/CommandClasses";

export enum TransportServiceV2Commands {
	CommandFirstSegment = 0xc0,
	CommandSegmentComplete = 0xe8,
	CommandSegmentRequest = 0xc8,
	CommandSegmentWait = 0xf0,
	CommandSubsequentSegment = 0xe0,
}

export interface TransportServiceV2CommandFirstSegmentData {
	// TODO param properties1 type bitfield
	datagramSize2: number; // 1 byte unsigned integer
	// TODO param properties2 type bitfield
	headerExtensionLength?: number; // 1 byte unsigned integer
	// TODO param headerExtension type blob
	// TODO param payload type blob
	frameCheckSequence: number; // 2 byte unsigned integer
}

export interface TransportServiceV2CommandSegmentCompleteData {
	// TODO param properties1 type bitfield
	// TODO param properties2 type bitfield
}

export interface TransportServiceV2CommandSegmentRequestData {
	// TODO param properties1 type bitfield
	// TODO param properties2 type bitfield
	datagramOffset2: number; // 1 byte unsigned integer
}

export interface TransportServiceV2CommandSegmentWaitData {
	// TODO param properties1 type bitfield
	pendingFragments: number; // 1 byte unsigned integer
}

export interface TransportServiceV2CommandSubsequentSegmentData {
	// TODO param properties1 type bitfield
	datagramSize2: number; // 1 byte unsigned integer
	// TODO param properties2 type bitfield
	datagramOffset2: number; // 1 byte unsigned integer
	headerExtensionLength?: number; // 1 byte unsigned integer
	// TODO param headerExtension type blob
	// TODO param payload type blob
	frameCheckSequence: number; // 2 byte unsigned integer
}

export class TransportServiceV2 extends CommandClassPacket<TransportServiceV2Commands> {
	public static readonly commandClass = CommandClasses.TransportService; // 0x55 (85)

	public static matches(packet: Packet): boolean {
		return packet.commandClass === this.commandClass;
	}

	constructor(commandAndPayload: Buffer) {
		super(TransportServiceV2, commandAndPayload);
	}

	public static readonly CommandFirstSegment = class CommandFirstSegment extends CommandPacket<TransportServiceV2CommandFirstSegmentData> {
		public static readonly CommandClass = TransportServiceV2;
		public static readonly command = 0xc0;
		public static readonly definition = {
			"command": 192,
			"name": "CommandFirstSegment",
			"help": "First Segment",
			"status": "active",
			"cmdMask": 248,
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "datagram_size_1",
							"mask": 7,
							"shift": 0
						}
					],
					"cmdMask": 7
				},
				{
					"type": "integer",
					"name": "datagramSize2",
					"help": "datagram_size_2",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "Reserved",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "Ext",
							"mask": 8,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Session ID",
							"mask": 240,
							"shift": 4
						}
					]
				},
				{
					"type": "integer",
					"name": "headerExtensionLength",
					"help": "Header Extension Length",
					"optional": {
						"name": "Properties2",
						"mask": 8
					},
					"length": 1
				},
				{
					"type": "blob",
					"name": "headerExtension",
					"help": "Header Extension",
					"optional": {
						"name": "Properties2",
						"mask": 8
					},
					"length": {
						"name": "Header Extension Length",
						"mask": 255,
						"shift": 0
					}
				},
				{
					"type": "blob",
					"name": "payload",
					"help": "Payload",
					"length": "auto"
				},
				{
					"type": "integer",
					"name": "frameCheckSequence",
					"help": "Frame Check Sequence",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TransportServiceV2)?.command === this.command;
		}

		constructor(data: Buffer | TransportServiceV2CommandFirstSegmentData) {
			super(CommandFirstSegment, data);
		}
	};

	public static readonly CommandSegmentComplete = class CommandSegmentComplete extends CommandPacket<TransportServiceV2CommandSegmentCompleteData> {
		public static readonly CommandClass = TransportServiceV2;
		public static readonly command = 0xe8;
		public static readonly definition = {
			"command": 232,
			"name": "CommandSegmentComplete",
			"help": "Segment Complete",
			"status": "active",
			"cmdMask": 248,
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved",
							"mask": 7,
							"shift": 0
						}
					],
					"cmdMask": 7
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved2",
							"mask": 15,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Session ID",
							"mask": 240,
							"shift": 4
						}
					]
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TransportServiceV2)?.command === this.command;
		}

		constructor(data: Buffer | TransportServiceV2CommandSegmentCompleteData) {
			super(CommandSegmentComplete, data);
		}
	};

	public static readonly CommandSegmentRequest = class CommandSegmentRequest extends CommandPacket<TransportServiceV2CommandSegmentRequestData> {
		public static readonly CommandClass = TransportServiceV2;
		public static readonly command = 0xc8;
		public static readonly definition = {
			"command": 200,
			"name": "CommandSegmentRequest",
			"help": "Segment Request",
			"status": "active",
			"cmdMask": 248,
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved",
							"mask": 7,
							"shift": 0
						}
					],
					"cmdMask": 7
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "datagram_offset_1",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "boolean",
							"name": "reserved2",
							"mask": 8,
							"shift": 3
						},
						{
							"type": "integer",
							"name": "Session ID",
							"mask": 240,
							"shift": 4
						}
					]
				},
				{
					"type": "integer",
					"name": "datagramOffset2",
					"help": "datagram_offset_2",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TransportServiceV2)?.command === this.command;
		}

		constructor(data: Buffer | TransportServiceV2CommandSegmentRequestData) {
			super(CommandSegmentRequest, data);
		}
	};

	public static readonly CommandSegmentWait = class CommandSegmentWait extends CommandPacket<TransportServiceV2CommandSegmentWaitData> {
		public static readonly CommandClass = TransportServiceV2;
		public static readonly command = 0xf0;
		public static readonly definition = {
			"command": 240,
			"name": "CommandSegmentWait",
			"help": "Segment Wait",
			"status": "active",
			"cmdMask": 248,
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "reserved",
							"mask": 7,
							"shift": 0
						}
					],
					"cmdMask": 7
				},
				{
					"type": "integer",
					"name": "pendingFragments",
					"help": "pending_fragments",
					"length": 1
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TransportServiceV2)?.command === this.command;
		}

		constructor(data: Buffer | TransportServiceV2CommandSegmentWaitData) {
			super(CommandSegmentWait, data);
		}
	};

	public static readonly CommandSubsequentSegment = class CommandSubsequentSegment extends CommandPacket<TransportServiceV2CommandSubsequentSegmentData> {
		public static readonly CommandClass = TransportServiceV2;
		public static readonly command = 0xe0;
		public static readonly definition = {
			"command": 224,
			"name": "CommandSubsequentSegment",
			"help": "Subsequent Segment",
			"status": "active",
			"cmdMask": 248,
			"params": [
				{
					"type": "bitfield",
					"name": "properties1",
					"help": "Properties1",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "datagram_size_1",
							"mask": 7,
							"shift": 0
						}
					],
					"cmdMask": 7
				},
				{
					"type": "integer",
					"name": "datagramSize2",
					"help": "datagram_size_2",
					"length": 1
				},
				{
					"type": "bitfield",
					"name": "properties2",
					"help": "Properties2",
					"length": 1,
					"fields": [
						{
							"type": "integer",
							"name": "datagram_offset_1",
							"mask": 7,
							"shift": 0
						},
						{
							"type": "integer",
							"name": "Session ID",
							"mask": 240,
							"shift": 4
						},
						{
							"type": "boolean",
							"name": "Ext",
							"mask": 8,
							"shift": 3
						}
					]
				},
				{
					"type": "integer",
					"name": "datagramOffset2",
					"help": "datagram_offset_2",
					"length": 1
				},
				{
					"type": "integer",
					"name": "headerExtensionLength",
					"help": "Header Extension Length",
					"optional": {
						"name": "Properties2",
						"mask": 8
					},
					"length": 1
				},
				{
					"type": "blob",
					"name": "headerExtension",
					"help": "Header Extension",
					"optional": {
						"name": "Properties2",
						"mask": 8
					},
					"length": {
						"name": "Header Extension Length",
						"mask": 255,
						"shift": 0
					}
				},
				{
					"type": "blob",
					"name": "payload",
					"help": "Payload",
					"length": "auto"
				},
				{
					"type": "integer",
					"name": "frameCheckSequence",
					"help": "Frame Check Sequence",
					"length": 2
				}
			]
		} as CommandDefinition;

		static matches(packet: Packet): boolean {
			return packet.tryAs(TransportServiceV2)?.command === this.command;
		}

		constructor(data: Buffer | TransportServiceV2CommandSubsequentSegmentData) {
			super(CommandSubsequentSegment, data);
		}
	};
}

export namespace TransportServiceV2 {
	export type CommandFirstSegment = InstanceType<typeof TransportServiceV2.CommandFirstSegment>;
	export type CommandSegmentComplete = InstanceType<typeof TransportServiceV2.CommandSegmentComplete>;
	export type CommandSegmentRequest = InstanceType<typeof TransportServiceV2.CommandSegmentRequest>;
	export type CommandSegmentWait = InstanceType<typeof TransportServiceV2.CommandSegmentWait>;
	export type CommandSubsequentSegment = InstanceType<typeof TransportServiceV2.CommandSubsequentSegment>;
}
